import type { Page, TestInfo } from '@playwright/test';
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
  duration: number | string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

function endpointPath(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return url;
  }
}

export function startNetworkAudit(page: Page): { stop: () => Promise<NetworkEntry[]> } {
  const startedRequests = new Map<string, { startedAt: number; started: string }>();
  const entries: NetworkEntry[] = [];
  let requestNumber = 0;

  const onRequest = (request: import('@playwright/test').Request): void => {
    startedRequests.set(request.url() + requestNumber, {
      startedAt: Date.now(),
      started: new Date().toISOString(),
    });
    requestNumber += 1;
  };

  const onResponse = (response: import('@playwright/test').Response): void => {
    const request = response.request();
    const matchingRequest = [...startedRequests.entries()].find(([key]) => key.startsWith(request.url()));
    if (!matchingRequest) return;

    const [key, timing] = matchingRequest;
    startedRequests.delete(key);
    entries.push({
      requestNumber: entries.length + 1,
      started: timing.started,
      method: request.method(),
      type: request.resourceType(),
      endpoint: endpointPath(request.url()),
      url: request.url(),
      status: response.status(),
      duration: Date.now() - timing.startedAt,
    });
  };

  page.on('request', onRequest);
  page.on('response', onResponse);

  return {
    stop: async (): Promise<NetworkEntry[]> => {
      page.off('request', onRequest);
      page.off('response', onResponse);
      return entries;
    },
  };
}

export async function writeScenarioReport(
  testInfo: TestInfo,
  scenarioName: string,
  startTime: string,
  endTime: string,
  entries: NetworkEntry[],
): Promise<void> {
  const duration = new Date(endTime).getTime() - new Date(startTime).getTime();
  const internalEntries = entries.filter((entry) => entry.url.includes('vessel-planning-backend'));
  const externalEntries = entries.filter((entry) => !entry.url.includes('vessel-planning-backend'));
  const headers = ['Request #', 'Started', 'Method', 'Type', 'Endpoint', 'Status', 'Duration'];

  const renderTable = (title: string, tableEntries: NetworkEntry[]): string => `
    <section><h2>${escapeHtml(title)}</h2><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
    <tbody>${tableEntries.map((entry) => `<tr>${[
      entry.requestNumber, entry.started, entry.method, entry.type, entry.endpoint, entry.status, `${entry.duration} ms`,
    ].map((cell) => `<td>${escapeHtml(String(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;

  const report = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(scenarioName)}</title>
    <style>body{font:14px system-ui,sans-serif;margin:32px;color:#17202a}table{border-collapse:collapse;width:100%;margin-bottom:28px}th,td{border:1px solid #ccd3d8;padding:8px;text-align:left}th{background:#e8eef2}h1{margin-bottom:4px}small{color:#58636b}</style></head>
    <body><h1>${escapeHtml(scenarioName)}</h1><small>Started: ${escapeHtml(startTime)} | Ended: ${escapeHtml(endTime)} | Duration: ${duration} ms</small>
    ${renderTable('Internal Services', internalEntries)}${renderTable('External/Peripheral Services', externalEntries)}</body></html>`;

  const reportPath = path.join(testInfo.outputDir, 'reports', `${testInfo.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`);
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, report, 'utf8');
  await testInfo.attach('network-performance-report', { path: reportPath, contentType: 'text/html' });
  console.log(JSON.stringify({ scenarioName, startTime, endTime, duration, reportPath }));
}