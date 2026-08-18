# Scenario: Refresh CWP Plan

## 1. Description
> This view scenario verifies that a user can refresh an open CWP plan and see the completed refresh progress.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready to refresh. |
| 2 | Locate and click | Locate the refresh control using its `data-testid` value `vp-view-cwp-plan-refresh-btn`, then click it. | The CWP plan refresh begins. |
| 3 | Assert | Verify that the text `Refreshing 100%` is visible. | The CWP plan refresh reaches completion. |

---

## 3. Assertions

- **Assertion 1:** The refresh control identified by `data-testid` value `vp-view-cwp-plan-refresh-btn` is visible.
- **Assertion 2:** The text `Refreshing 100%` is visible after the refresh control is selected.
