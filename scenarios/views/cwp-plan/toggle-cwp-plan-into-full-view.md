# Scenario: Toggle CWP Plan into Full View

## 1. Description
> This view action scenario verifies that a user can switch an open CWP plan from basic view to full view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open in basic view. |
| 2 | Locate and click | Locate the basic-view control using its `data-testid` value `vp-view-cwp-plan-basic-view-btn`, then click it. | The CWP plan begins switching to full view. |
| 3 | Wait and assert | Locate the loader using its `data-testid` value `vp-shared-loader`; verify that it becomes visible, then becomes hidden or is removed. | The full-view loading operation completes. |
| 4 | Assert | Locate the full-view control using its `data-testid` value `vp-view-cwp-plan-full-view-btn` and verify that it is visible. | The CWP plan is displayed in full view. |

---

## 3. Assertions

- **Assertion 1:** The basic-view control identified by `data-testid` value `vp-view-cwp-plan-basic-view-btn` is visible.
- **Assertion 2:** The loader identified by `data-testid` value `vp-shared-loader` appears and then becomes hidden or is removed.
- **Assertion 3:** The full-view control identified by `data-testid` value `vp-view-cwp-plan-full-view-btn` is visible after the transition.
