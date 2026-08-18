# Scenario: Load Existing Plans

## 1. Description
> This view scenario verifies that existing plans have loaded in the plan-preview view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Plan Preview** scenario in `scenarios/navigation/open-plan-preview.md`. | The plan-preview view is open and ready for existing-plan validation. |
| 2 | Locate and validate | Locate the voyage summary information element using its `data-testid` value `vp-view-plan-preview-voyage-summary-info`. Verify that at least one numeric value for `Discharge`, `Loading`, `Restow`, `Shifting`, `Movins`, or `Total` is non-zero in the text `Discharge {digit} Loading {digit} Restow {digit} Shifting {digit} Mask 1 Movins {digit} Total {digit}`. | At least one voyage-summary counter is greater than zero. |
| 3 | Assert | Verify that the text `Existing Plans` is visible. | The Existing Plans section is visible. |
| 4 | Assert | Locate an existing plan using its `data-testid` value `vp-view-plan-preview-existing-plan-1` and verify that it is visible. | At least one existing plan is visible. |

---

## 3. Assertions

- **Assertion 1:** At least one voyage-summary counter for `Discharge`, `Loading`, `Restow`, `Shifting`, `Movins`, or `Total` is greater than zero.
- **Assertion 2:** The text `Existing Plans` is visible.
- **Assertion 3:** The element identified by `data-testid` value `vp-view-plan-preview-existing-plan-1` is visible.
