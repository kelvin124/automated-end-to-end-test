import type { Page, Request, TestInfo } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

type NetworkEntry = {
	requestNumber: number;
	started: string;
	method: string;
	type: string;
	endpoint: string;
	url: string;
	status: number | string;
	duration: number;
};

type AssertionEntry = {
	assertionNumber: number;
	assertion: string;
	started: string;
	completed: string;
	duration: number;
	result: 'Pass' | 'Fail';
};

type RequestTiming = Omit<NetworkEntry, 'status' | 'duration'> & {
	startedAt: number;
};

const networkHeaders = ['Request #', 'Started', 'Method', 'Type', 'Endpoint', 'Status', 'Duration'];
const assertionHeaders = ['Assertion #', 'Assertion', 'Started', 'Completed', 'Duration', 'Result'];

function escapeHtml(value: string): string {
	const entities: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
	};

	return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

function endpointPath(url: string): string {
	try {
		const parsedURL = new URL(url);
		return `${parsedURL.pathname}${parsedURL.search}`;
	} catch {
		return url;
	}
}

function completedNetworkEntry(
	timing: RequestTiming,
	status: NetworkEntry['status'],
	duration: number,
): NetworkEntry {
	const { startedAt: _startedAt, ...entry } = timing;
	return { ...entry, status, duration };
}

function filenamePart(value: string): string {
	return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

function renderTable(headers: string[], rows: string[][]): string {
	const headerCells = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('');
	const bodyRows = rows.length === 0
		? `<tr><td colspan="${headers.length}">No entries recorded.</td></tr>`
		: rows
			.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
			.join('');

	return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
}

function reportDocument(title: string, metadata: string, content: string): string {
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
body{font:14px system-ui,sans-serif;margin:32px;color:#17202a}
table{border-collapse:collapse;width:100%;margin:12px 0 28px}
th,td{border:1px solid #ccd3d8;padding:8px;text-align:left;vertical-align:top}
th{background:#e8eef2}
h1{margin-bottom:4px}
small{color:#58636b}
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<small>${escapeHtml(metadata)}</small>
${content}
</body>
</html>`;
}

class NetworkAudit {
	private readonly requestTimings = new Map<Request, RequestTiming>();
	private readonly entries: NetworkEntry[] = [];
	private requestNumber = 0;

	public constructor(private readonly page: Page) {
		this.page.on('request', this.onRequest);
		this.page.on('response', this.onResponse);
		this.page.on('requestfailed', this.onRequestFailed);
	}

	public stop(): NetworkEntry[] {
		this.page.off('request', this.onRequest);
		this.page.off('response', this.onResponse);
		this.page.off('requestfailed', this.onRequestFailed);

		const stoppedAt = Date.now();

		for (const timing of this.requestTimings.values()) {
			this.entries.push(completedNetworkEntry(timing, 'Pending', stoppedAt - timing.startedAt));
		}

		this.requestTimings.clear();
		return this.entries.sort((left, right) => left.requestNumber - right.requestNumber);
	}

	private readonly onRequest = (request: Request): void => {
		const startedAt = Date.now();

		this.requestTimings.set(request, {
			requestNumber: this.requestNumber + 1,
			started: new Date(startedAt).toISOString(),
			startedAt,
			method: request.method(),
			type: request.resourceType(),
			endpoint: endpointPath(request.url()),
			url: request.url(),
		});
		this.requestNumber += 1;
	};

	private readonly onResponse = (response: import('@playwright/test').Response): void => {
		const request = response.request();
		const timing = this.requestTimings.get(request);

		if (!timing) {
			return;
		}

		this.requestTimings.delete(request);
		this.entries.push(completedNetworkEntry(timing, response.status(), Date.now() - timing.startedAt));
	};

	private readonly onRequestFailed = (request: Request): void => {
		const timing = this.requestTimings.get(request);

		if (!timing) {
			return;
		}

		this.requestTimings.delete(request);
		this.entries.push(
			completedNetworkEntry(timing, request.failure()?.errorText ?? 'Failed', Date.now() - timing.startedAt),
		);
	};
}

export class ScenarioObservability {
	private readonly startedAt = Date.now();
	private readonly startTime = new Date(this.startedAt).toISOString();
	private readonly networkAudit: NetworkAudit;
	private readonly assertions: AssertionEntry[] = [];
	private finished = false;

	public constructor(
		page: Page,
		private readonly testInfo: TestInfo,
		private readonly scenarioName: string,
	) {
		this.networkAudit = new NetworkAudit(page);
	}

	public async assertThat<T>(assertion: string, operation: () => Promise<T> | T): Promise<T> {
		const startedAt = Date.now();
		const started = new Date(startedAt).toISOString();

		try {
			const value = await operation();
			this.assertions.push({
				assertionNumber: this.assertions.length + 1,
				assertion,
				started,
				completed: new Date().toISOString(),
				duration: Date.now() - startedAt,
				result: 'Pass',
			});
			return value;
		} catch (error) {
			this.assertions.push({
				assertionNumber: this.assertions.length + 1,
				assertion,
				started,
				completed: new Date().toISOString(),
				duration: Date.now() - startedAt,
				result: 'Fail',
			});
			throw error;
		}
	}

	public async finish(): Promise<void> {
		if (this.finished) {
			return;
		}

		this.finished = true;
		const endTime = new Date().toISOString();
		const duration = Date.now() - this.startedAt;
		const networkEntries = this.networkAudit.stop();
		const internalEntries = networkEntries.filter((entry) => entry.url.includes('vessel-planning-backend'));
		const externalEntries = networkEntries.filter((entry) => !entry.url.includes('vessel-planning-backend'));
		const reportDirectory = this.testInfo.outputPath('reports');
		const reportName = filenamePart(this.testInfo.title) || 'scenario';
		const networkReportPath = path.join(reportDirectory, `${reportName}-network.html`);
		const assertionReportPath = path.join(reportDirectory, `${reportName}-assertions.html`);
		const metadata = `Started: ${this.startTime} | Ended: ${endTime} | Duration: ${duration} ms`;
		const networkReport = reportDocument(
			`${this.scenarioName} - Network Performance`,
			metadata,
			`<section><h2>Internal Services</h2>${renderTable(
				networkHeaders,
				internalEntries.map((entry) => [
					String(entry.requestNumber),
					entry.started,
					entry.method,
					entry.type,
					entry.endpoint,
					String(entry.status),
					`${entry.duration} ms`,
				]),
			)}</section>
<section><h2>External/Peripheral Services</h2>${renderTable(
				networkHeaders,
				externalEntries.map((entry) => [
					String(entry.requestNumber),
					entry.started,
					entry.method,
					entry.type,
					entry.endpoint,
					String(entry.status),
					`${entry.duration} ms`,
				]),
			)}</section>`,
		);
		const assertionReport = reportDocument(
			`${this.scenarioName} - Assertion Timing`,
			metadata,
			renderTable(
				assertionHeaders,
				this.assertions.map((entry) => [
					String(entry.assertionNumber),
					entry.assertion,
					entry.started,
					entry.completed,
					`${entry.duration} ms`,
					entry.result,
				]),
			),
		);

		await fs.mkdir(reportDirectory, { recursive: true });
		await Promise.all([
			fs.writeFile(networkReportPath, networkReport, 'utf8'),
			fs.writeFile(assertionReportPath, assertionReport, 'utf8'),
		]);
		await Promise.all([
			this.testInfo.attach('network-performance-report', {
				path: networkReportPath,
				contentType: 'text/html',
			}),
			this.testInfo.attach('assertion-timing-report', {
				path: assertionReportPath,
				contentType: 'text/html',
			}),
		]);
		console.log(JSON.stringify({
			scenarioName: this.scenarioName,
			startTime: this.startTime,
			endTime,
			duration,
			networkReportPath,
			assertionReportPath,
		}));
	}
}
