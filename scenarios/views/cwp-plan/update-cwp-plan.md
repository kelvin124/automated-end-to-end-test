# Scenario: Update CWP Plan

## 1. Description
> This view scenario verifies that a user can update an open CWP plan and receives a successful completion message.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready to update. |
| 2 | Locate and click | Locate the update control using its `data-testid` value `vp-view-cwp-plan-update-btn`, then click it. | The CWP plan update begins. |
| 3 | Assert | Verify that the text `Add/Delete Units succeed` is visible. | The CWP plan update completes successfully. |

---

## 3. Assertions

- **Assertion 1:** The update control identified by `data-testid` value `vp-view-cwp-plan-update-btn` is visible.
- **Assertion 2:** The text `Add/Delete Units succeed` is visible after the update control is selected.
