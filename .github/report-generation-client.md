## Client-Side Assertion Timing Report

For every executed scenario, generate a separate client-side HTML report that records the elapsed time for each assertion. Assertion timing reflects the user experience of waiting for an expected view state, so every assertion must be measured independently.

## Assertion Timing Table

The client-side report must present one row for every assertion using this table:

| Assertion # | Assertion | Started | Completed | Duration | Result |
|---|---|---|---|---|---|
| Incremental Counter | Human-readable assertion description | Timestamp | Timestamp | In Milliseconds | Pass/Fail |

Start timing immediately before evaluating the assertion and stop timing when it passes or fails. Generate the client-side assertion timing report separately from the API report.

See `report-generation-api.md` for the corresponding API-reporting conventions.