# Scenario: Open Stowage Plan Tab

## 1. Description
> This navigation scenario verifies that a user can open the Stowage Plan tab from the Stowage Plan overview.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Stowage Plan Overview Tab** scenario in `scenarios/navigation/open-stowage-plan-overview.md`. | The Stowage Plan overview tab is open and ready to switch to the Stowage Plan tab. |
| 2 | Locate and click | Locate the element with the exact text `Stowage plan`, then click it. | The Stowage Plan tab opens. |
| 3 | Assert | Verify that at least one element has a `data-testid` value matching the pattern `vp-shared-stowage-plan-mini-bay-view-full-*`. | At least one full mini-bay view is visible in the Stowage Plan tab. |
| 4 | Assert | Verify that the text `Stowage Plan Summary` is visible. | The Stowage Plan summary is displayed. |

---

## 3. Assertions

- **Assertion 1:** The `Stowage plan` tab control is visible.
- **Assertion 2:** At least one element has a `data-testid` value matching `vp-shared-stowage-plan-mini-bay-view-full-*`.
- **Assertion 3:** The text `Stowage Plan Summary` is visible.
