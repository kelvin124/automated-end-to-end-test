import { expect, type Locator } from '@playwright/test';
import { ScenarioObservability } from './scenario-observability';

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

export async function assertRowCountStartsAtZeroAndLoads(
	scenario: ScenarioObservability,
	container: Locator,
	description: string,
): Promise<void> {
	await scenario.assertThat(
		`${description} initially displays Rows: 0`,
		() => expect(container).toContainText(/Rows\s*:\s*0\b/i),
	);
	await scenario.assertThat(
		`${description} changes to a positive row count`,
		async () => {
			await expect
				.poll(
					async () => parsedRowCount(await container.innerText()),
					{ message: `Expected ${description.toLowerCase()} to contain a positive row count.` },
				)
				.toBeGreaterThan(0);
		},
	);
}
