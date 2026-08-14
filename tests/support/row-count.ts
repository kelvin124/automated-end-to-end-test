import { expect, type Locator, type Page } from '@playwright/test';
import { ScenarioObservability } from './scenario-observability';

type BrowserRowCountObservation = {
	observer: MutationObserver;
	seenPositive: boolean;
	seenZero: boolean;
};

type BrowserRowCountObservationWindow = typeof window & {
	__rowCountObservations?: Record<string, BrowserRowCountObservation>;
};

function parsedRowCount(text: string): number {
	const match = text.match(/Rows\s*:\s*([\d,]+)/i);

	if (!match) {
		return -1;
	}

	const normalizedCount = match[1].replace(/,/g, '');

	if (!/^\d+$/.test(normalizedCount)) {
		return -1;
	}

	const count = Number(normalizedCount);
	return Number.isSafeInteger(count) ? count : -1;
}

const rowCountPollingIntervals = [10, 10, 10, 10, 10, 20, 20, 50, 100, 250];

export class RowCountObservation {
	public constructor(
		private readonly page: Page,
		private readonly id: string,
	) {}

	public async dispose(): Promise<void> {
		await this.page.evaluate((id) => {
			const pageWindow = window as BrowserRowCountObservationWindow;
			const observations = pageWindow.__rowCountObservations;
			const observation = observations?.[id];

			if (!observations || !observation) {
				throw new Error(`Row-count observation "${id}" is unavailable.`);
			}

			observation.observer.disconnect();
			delete observations[id];
		}, this.id);
	}

	public async hasSeenZeroCount(): Promise<boolean> {
		return this.read('seenZero');
	}

	public async waitForPositiveCount(): Promise<void> {
		await this.waitFor('seenPositive');
	}

	private async waitFor(property: 'seenPositive' | 'seenZero'): Promise<void> {
		await this.page.waitForFunction(
			({ id, property }) => {
				const pageWindow = window as BrowserRowCountObservationWindow;
				return pageWindow.__rowCountObservations?.[id]?.[property] === true;
			},
			{ id: this.id, property },
			{ timeout: 15_000 },
		);
	}

	private async read(property: 'seenPositive' | 'seenZero'): Promise<boolean> {
		return this.page.evaluate(
			({ id, property }) => {
				const pageWindow = window as BrowserRowCountObservationWindow;
				const observation = pageWindow.__rowCountObservations?.[id];

				if (!observation) {
					throw new Error(`Row-count observation "${id}" is unavailable.`);
				}

				return observation[property];
			},
			{ id: this.id, property },
		);
	}
}

export async function observeRowCount(page: Page, selector: string): Promise<RowCountObservation> {
	const id = `row-count-${Date.now()}-${Math.random().toString(36).slice(2)}`;

	await page.evaluate(
		({ id, selector }) => {
			const pageWindow = window as BrowserRowCountObservationWindow;

			if (!pageWindow.__rowCountObservations) {
				pageWindow.__rowCountObservations = {};
			}

			let observation: BrowserRowCountObservation;
			const recordRowCount = (): void => {
				const text = document.querySelector(selector)?.textContent ?? '';
				const match = text.match(/Rows\s*:\s*([\d,]+)/i);

				if (!match) {
					return;
				}

				const normalizedCount = match[1].replace(/,/g, '');

				if (!/^\d+$/.test(normalizedCount)) {
					return;
				}

				const count = Number(normalizedCount);

				if (!Number.isSafeInteger(count)) {
					return;
				}

				observation.seenZero ||= count === 0;
				observation.seenPositive ||= count > 0;
			};

			observation = {
				observer: new MutationObserver(recordRowCount),
				seenPositive: false,
				seenZero: false,
			};
			observation.observer.observe(document.documentElement, {
				characterData: true,
				childList: true,
				subtree: true,
			});
			recordRowCount();
			pageWindow.__rowCountObservations[id] = observation;
		},
		{ id, selector },
	);

	return new RowCountObservation(page, id);
}

export async function assertRowCountStartsAtZeroAndLoads(
	scenario: ScenarioObservability,
	container: Locator,
	description: string,
): Promise<void> {
	await scenario.assertThat(
		`${description} initially displays Rows: 0`,
		async () => {
			await expect
				.poll(
					async () => {
						if ((await container.count()) === 0) {
							return false;
						}

						return parsedRowCount(await container.innerText()) === 0;
					},
					{
						message: `Expected ${description.toLowerCase()} to initially contain Rows: 0.`,
						intervals: rowCountPollingIntervals,
					},
				)
				.toBe(true);
		},
	);
	await scenario.assertThat(
		`${description} changes to a positive row count`,
		async () => {
			await expect
				.poll(
					async () => parsedRowCount(await container.innerText()),
					{
						message: `Expected ${description.toLowerCase()} to contain a positive row count.`,
						intervals: rowCountPollingIntervals,
					},
				)
				.toBeGreaterThan(0);
		},
	);
}
