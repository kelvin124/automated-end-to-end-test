# Scenario: Load Voyage Data

## 1. Description
> The user opens the first page of the SPA and waits for the voyage table to finish loading so the available voyage data can be reviewed.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 0 | **Condition Check** | Verify if the current session is already authenticated. If not, trigger the login flow and save the Storage State locally. | A valid session is established before the voyage data loads. |
| 1 | Navigate | Open the first page of the SPA where the voyage data table is displayed. | The voyage data table is visible and its row count initially displays `Rows: 0`. |
| 2 | Locate | Query the voyage table loader and row count using the `data-test-id` attributes `my-test-id-loader` and `my-test-id-voyage-row-count`. These are placeholder identifiers and will be replaced with the real values later. | Both target elements are found on the page. |
| 3 | Wait | Poll the element with the `data-test-id` attribute `my-test-id-loader` until the voyage data loading process completes. | The loader is no longer visible or has been removed from the page. |
| 4 | Validate | After the loader disappears, call `getText` on the element with the `data-test-id` attribute `my-test-id-voyage-row-count`. Verify that the returned text uses the format `Rows: <count>`, then remove the `Rows: ` prefix and any comma separators before parsing the count. | The parsed row count changes from `0` to a positive integer. Values such as `Rows: 1,000` or `Rows: 12,500` are parsed as `1000` and `12500`. |

---

## 3. Assertions

- **Assertion 1:** The voyage data table is visible on the first page of the SPA.
- **Assertion 2:** The voyage table loader is hidden or removed after data loading completes.
- **Assertion 3:** `getText` on the voyage row count element returns text in the format `Rows: <count>`.
- **Assertion 4:** After removing the `Rows: ` prefix and comma separators, the parsed voyage row count changes from `0` to a positive integer.