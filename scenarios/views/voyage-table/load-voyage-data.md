# Scenario: Load Voyage Data

## 1. Description
> This view scenario verifies that voyage data loads after the SPA is opened.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open SPA** scenario in `scenarios/navigation/open-spa.md`. | The targeted SPA is open and ready for voyage-data validation. |
| 2 | Locate and validate | Locate the AG Grid voyage row-count status element using `.ag-status-bar-left[role="status"]`, because the live element does not expose a `data-testid`. Verify that its initial text is `Rows: 0`. | The row count initially displays `Rows: 0`. |
| 3 | Wait and assert | Wait for the row-count text to change to `Rows: {positive integer}`. Remove the `Rows: ` prefix and any comma separators before parsing the count. | The parsed count is a non-zero positive integer; for example, `Rows: 1,000` is parsed as `1000`. |

---

## 3. Assertions

- **Assertion 1:** The voyage row count initially displays `Rows: 0`.
- **Assertion 2:** The voyage row count changes to `Rows: {positive integer}` after data loads.
- **Assertion 3:** After removing comma separators, the parsed row count is greater than zero.
