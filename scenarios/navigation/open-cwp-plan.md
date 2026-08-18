# Scenario: Open CWP Plan View

## 1. Description
> This navigation scenario verifies that a plan can be opened from Existing Plans and that the CWP plan view is displayed.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Plan Preview** scenario in `scenarios/navigation/open-plan-preview.md`. | The plan-preview view is open and ready to open an existing plan. |
| 2 | Assert | Locate the existing plan using its `data-testid` value `vp-view-plan-preview-existing-plan-1` and verify that it is visible. | The existing plan is visible. |
| 3 | Action | Click the existing plan identified by `data-testid` value `vp-view-plan-preview-existing-plan-1`. | The application navigates to the CWP plan view. |
| 4 | Assert | Locate the CWP plan graph using its `data-testid` value `vp-view-cwp-plan-ship-cwp-graph` and verify that it is visible. | The CWP plan view is open. |

---

## 3. Assertions

- **Assertion 1:** The existing plan identified by `data-testid` value `vp-view-plan-preview-existing-plan-1` is visible.
- **Assertion 2:** The CWP plan graph identified by `data-testid` value `vp-view-cwp-plan-ship-cwp-graph` is visible after the existing plan is selected.
