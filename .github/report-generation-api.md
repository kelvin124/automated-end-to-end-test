## Real-Time Network Auditing & Performance Tracking
## 1. API Call Interception
For every executed scenario, use Playwright network interception utilities (page.on('request'), page.on('response')) to seamlessly record all underlying REST/GraphQL API activities happening during the test lifetime.
## 2. Dual-Category Performance HTML Report
Upon scenario completion, generate a clean, independent HTML file summarizing network performance metrics. The report must dynamically segment incoming traffic into exactly two distinct tables based on endpoint domain evaluation:

* Table A (Internal Services): Only contains APIs whose URLs match or contain the string "vessel-planning-backend".
* Table B (External/Peripheral Services): Contains all remaining APIs that do not include the string "vessel-planning-backend".

## 3. Absolute Report Schema Constraints
Both tables inside the generated HTML dashboard must format and expose data using this exact structural schema:

| Request # | Started | Method | Type | Endpoint | Status | Duration |
|---|---|---|---|---|---|---|
| Incremental Counter | Timestamp | GET/POST/etc. | Fetch/XHR/etc. | Target URL Path | HTTP Code | In Milliseconds |

------------------------------
## Mandatory Execution Metadata Logging
For every generated scenario script, you must guarantee code instrumentation that programmatically captures, evaluates, and logs the following analytical metadata points to stdout or test run artifacts:

   1. Scenario Name: A highly descriptive, human-readable name establishing why a user initiates the workflow.
   2. Start Time: ISO standard timestamp capturing when the user flow officially starts.
   3. End Time: ISO standard timestamp capturing when the scenario reaches completion or terminal state.
   4. Duration: The precise physical computation of total run length (End Time - Start Time).

## Mandatory Trace Capture
Every Playwright scenario must run with tracing enabled for the complete test lifecycle. Configure the test runner with `trace: 'on'` so a trace artifact is produced for successful and failed runs and can be inspected to verify exactly what was tested.

------------------------------
## Expected Code Output Format
When generating scripts, ensure you yield self-contained, strongly typed TypeScript Playwright configurations using page-object patterns where applicable, embedding detailed annotations detailing steps, API interception event attachments, and final evaluation blocks.
