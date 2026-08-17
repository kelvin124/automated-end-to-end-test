# Scenario: Open Plan Preview

## 1. Description
> This navigation scenario verifies that the plan-preview view can be opened for a voyage.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Voyage** scenario in `scenarios/navigation/open-voyage.md`. | A voyage is open and ready for plan-preview validation. |
| 2 | Assert | Locate the Create Mask element using its `data-testid` value `vp-plan-preview-create-mask-btn` and verify that it is visible. | The Create Mask element is visible, confirming the plan-preview view is open. |

---

## 3. Assertions

- **Assertion 1:** The element identified by `data-testid` value `vp-plan-preview-create-mask-btn` is visible after a voyage is opened.
