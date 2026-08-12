import {
  expect,
  test as base,
  type Request,
  type Response,
} from '@playwright/test';

const apiResourceTypes = new Set(['fetch', 'xhr']);
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

type ApiCall = {
  durationMs?: number;
  failure?: string;
  method: string;
  resourceType: string;
  startedAt: string;
  status?: number;
  statusText?: string;
  url: string;
};

type TrackedApiCall = ApiCall & {
  startedAtMs: number;
};

function getApiUrl(request: Request) {
  const url = new URL(request.url());
  return `${url.origin}${url.pathname}`;
}

function getSummary(calls: ApiCall[]) {
  const completedCalls = calls.filter(
    (call): call is ApiCall & { durationMs: number } =>
      call.durationMs !== undefined,
  );
  const slowestCall = [...completedCalls].sort(
    (left, right) => right.durationMs - left.durationMs,
  )[0];

  return {
    averageDurationMs:
      completedCalls.length === 0
        ? null
        : Math.round(
            completedCalls.reduce(
              (total, call) => total + call.durationMs,
              0,
            ) / completedCalls.length,
          ),
    completed: completedCalls.length,
    failed: calls.filter((call) => call.failure !== undefined).length,
    httpErrors: calls.filter(
      (call) => call.status !== undefined && call.status >= 400,
    ).length,
    slowestCall: slowestCall
      ? {
          durationMs: slowestCall.durationMs,
          method: slowestCall.method,
          status: slowestCall.status,
          url: slowestCall.url,
        }
      : null,
    total: calls.length,
  };
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    return htmlEntities[character];
  });
}

function createPerformanceTable(
  summary: ReturnType<typeof getSummary>,
  calls: ApiCall[],
) {
  const slowestCall = summary.slowestCall
    ? `${summary.slowestCall.method} ${summary.slowestCall.url} (${
        summary.slowestCall.durationMs
      } ms${summary.slowestCall.status ? `, ${summary.slowestCall.status}` : ''})`
    : 'n/a';
  const summaryRows = [
    ['Total calls', summary.total],
    ['Completed calls', summary.completed],
    ['Failed calls', summary.failed],
    ['HTTP errors', summary.httpErrors],
    [
      'Average duration',
      summary.averageDurationMs === null
        ? 'n/a'
        : `${summary.averageDurationMs} ms`,
    ],
    ['Slowest call', slowestCall],
  ]
    .map(
      ([label, value]) =>
        `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const callRows =
    calls.length === 0
      ? '<tr><td colspan="6">No Fetch/XHR calls were made.</td></tr>'
      : calls
          .map((call) => {
            const status = call.failure
              ? `Failed: ${call.failure}`
              : call.status === undefined
                ? 'Pending'
                : `${call.status} ${call.statusText ?? ''}`.trim();

            return `<tr>
  <td>${escapeHtml(call.startedAt)}</td>
  <td>${escapeHtml(call.method)}</td>
  <td>${escapeHtml(call.resourceType)}</td>
  <td>${escapeHtml(call.url)}</td>
  <td>${escapeHtml(status)}</td>
  <td>${escapeHtml(
    call.durationMs === undefined ? 'Pending' : `${call.durationMs} ms`,
  )}</td>
</tr>`;
          })
          .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>API Performance</title>
  <style>
    body { color: #1f2328; font-family: Arial, sans-serif; margin: 24px; }
    table { border-collapse: collapse; margin: 16px 0 32px; width: 100%; }
    th, td { border: 1px solid #d0d7de; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #f6f8fa; }
    td:nth-child(4) { overflow-wrap: anywhere; }
  </style>
</head>
<body>
  <h1>API Performance</h1>
  <h2>Summary</h2>
  <table>${summaryRows}</table>
  <h2>Calls</h2>
  <table>
    <thead>
      <tr><th>Started</th><th>Method</th><th>Type</th><th>Endpoint</th><th>Status</th><th>Duration</th></tr>
    </thead>
    <tbody>${callRows}</tbody>
  </table>
</body>
</html>`;
}

export const test = base.extend<{ apiPerformance: void }>({
  apiPerformance: [
    async ({ context }, use, testInfo) => {
      const calls = new Map<Request, TrackedApiCall>();

      const onRequest = (request: Request) => {
        if (!apiResourceTypes.has(request.resourceType())) {
          return;
        }

        const startedAtMs = Date.now();
        calls.set(request, {
          method: request.method(),
          resourceType: request.resourceType(),
          startedAt: new Date(startedAtMs).toISOString(),
          startedAtMs,
          url: getApiUrl(request),
        });
      };

      const onResponse = (response: Response) => {
        const call = calls.get(response.request());
        if (!call) {
          return;
        }

        call.status = response.status();
        call.statusText = response.statusText();
      };

      const completeRequest = (request: Request) => {
        const call = calls.get(request);
        if (!call) {
          return;
        }

        call.durationMs = Date.now() - call.startedAtMs;
      };

      const failRequest = (request: Request) => {
        const call = calls.get(request);
        if (!call) {
          return;
        }

        call.durationMs = Date.now() - call.startedAtMs;
        call.failure = request.failure()?.errorText ?? 'Request failed';
      };

      context.on('request', onRequest);
      context.on('response', onResponse);
      context.on('requestfinished', completeRequest);
      context.on('requestfailed', failRequest);

      await use();

      context.off('request', onRequest);
      context.off('response', onResponse);
      context.off('requestfinished', completeRequest);
      context.off('requestfailed', failRequest);

      const apiCalls = [...calls.values()].map(({ startedAtMs, ...call }) => call);
      const summary = getSummary(apiCalls);

      testInfo.annotations.push({
        type: 'API performance',
        description: `${summary.total} Fetch/XHR calls; ${
          summary.averageDurationMs ?? 'n/a'
        } ms average`,
      });
      await testInfo.attach('api-performance.html', {
        body: Buffer.from(createPerformanceTable(summary, apiCalls)),
        contentType: 'text/html',
      });
      await testInfo.attach('api-performance.json', {
        body: Buffer.from(JSON.stringify({ summary, calls: apiCalls }, null, 2)),
        contentType: 'application/json',
      });
    },
    { auto: true },
  ],
});

export { expect };
