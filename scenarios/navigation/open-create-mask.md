# Scenario: Open Create Mask View

## 1. Description
> This navigation scenario verifies that the create-mask view can be opened from the plan-preview view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Plan Preview** scenario in `scenarios/navigation/open-plan-preview.md`. | The plan-preview view is open and ready for navigation to Create Mask. |
| 2 | Locate and click | Locate the Create Mask control using its `data-test-id` value `vp-plan-preview-create-mask-btn`, then click it. | The application navigates to the create-mask view. |
| 3 | Assert | Locate the voyage summary information element using its `data-test-id` value `vp-create-mask-voyage-summary-info` and verify that it is visible. | The create-mask view is open. |

---

## 3. Assertions

- **Assertion 1:** The element identified by `data-test-id` value `vp-create-mask-voyage-summary-info` is visible after the Create Mask control is selected.
