# Scenario: Open Loading Container List in Create Mask View

## 1. Description
> This view scenario verifies that the loading container list opens and loads container data in the create-mask view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Create Mask View** scenario in `scenarios/navigation/open-create-mask.md`. | The create-mask view is open and ready for loading-container-list validation. |
| 2 | Assert | Verify that the text `LOADING CONTAINER LIST` is visible. | The loading container list section is visible. |
| 3 | Assert | Locate the loading container list using its `data-test-id` value `vp-create-mask-loading-cntr-list` and verify that it is visible. | The loading container list is visible. |
| 4 | Wait and assert | Within the loading container list, verify that the row-count text changes from `Rows: 0` to `Rows: {positive integer}`. Remove the `Rows: ` prefix and any comma separators before parsing the count. | The parsed row count is a non-zero positive integer; for example, `Rows: 1,000` is parsed as `1000`. |

---

## 3. Assertions

- **Assertion 1:** The text `LOADING CONTAINER LIST` is visible.
- **Assertion 2:** The element identified by `data-test-id` value `vp-create-mask-loading-cntr-list` is visible.
- **Assertion 3:** The loading container row count changes from `Rows: 0` to a comma-normalized value greater than zero.
