# Scenario: Enable Auto Update of a Plan

## 1. Description
> This view scenario verifies that Auto Update can be enabled for an existing plan in the plan-preview view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Load Existing Plans** scenario in `scenarios/views/plan-preview/load-existing-plans.md`. | Existing plans are loaded and ready for interaction. |
| 2 | Locate and click | Locate the Auto Update control using its `data-test-id` value `vp-plan-preview-auto-update-btn`, then click it. | Auto Update is enabled for the plan. |
| 3 | Assert | Locate the Stop Auto Update control using its `data-test-id` value `vp-plan-preview-stop-auto-update-btn` and verify that it is visible. | The Stop Auto Update control is visible. |
| 4 | Wait and assert | Locate the loader using its `data-test-id` value `vp-loader` and wait for it to become hidden or be removed. | The Auto Update loading operation has completed. |
| 5 | Assert | Verify that the text `Auto calculate move time successfully` is visible. | The Auto Update operation completed successfully. |

---

## 3. Assertions

- **Assertion 1:** The Stop Auto Update control identified by `data-test-id` value `vp-plan-preview-stop-auto-update-btn` is visible after Auto Update is enabled.
- **Assertion 2:** The loader identified by `data-test-id` value `vp-loader` is hidden or removed after the Auto Update operation.
- **Assertion 3:** The text `Auto calculate move time successfully` is visible.
