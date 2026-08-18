# Scenario: Generate a CWP Plan

## 1. Description
> This view action scenario verifies that a user can generate an open CWP plan through the auto-calculation workflow.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready for generation. |
| 2 | Locate and click | Locate the auto-calculate control using its `data-testid` value `vp-view-cwp-plan-auto-calculate-btn`, then click it. | The auto-calculate workflow opens. |
| 3 | Locate and click | Locate the auto-calculate update control using its `data-testid` value `vp-view-auto-calculate-update-btn`, then click it. | CWP plan generation begins. |
| 4 | Assert | Verify that the text `Auto Plan calculated successfully` is visible. | The CWP plan was generated successfully. |

---

## 3. Assertions

- **Assertion 1:** The auto-calculate control identified by `data-testid` value `vp-view-cwp-plan-auto-calculate-btn` is visible.
- **Assertion 2:** The auto-calculate update control identified by `data-testid` value `vp-view-auto-calculate-update-btn` is visible after opening the auto-calculate workflow.
- **Assertion 3:** The text `Auto Plan calculated successfully` is visible after starting CWP plan generation.
