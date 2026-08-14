# Scenario: Load Create Mask View Table Data

## 1. Description
> This view scenario verifies that the create-mask table is visible and finishes loading after the create-mask view is opened.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Create Mask View** scenario in `scenarios/navigation/open-create-mask.md`. | The create-mask view is open and ready for table-data validation. |
| 2 | Assert | Locate the create-mask table using its `data-test-id` value `vp-create-mask-table` and verify that it is visible. | The create-mask table is visible. |
| 3 | Wait and assert | Locate the loader using its `data-test-id` value `vp-loader` and wait for it to become hidden or be removed. | Create-mask table data has finished loading. |

---

## 3. Assertions

- **Assertion 1:** The element identified by `data-test-id` value `vp-create-mask-table` is visible.
- **Assertion 2:** The loader identified by `data-test-id` value `vp-loader` is hidden or removed after the table data loads.
