# Scenario: Open Stowage Plan Overview Tab

## 1. Description
> This navigation scenario verifies that a user can open the Stowage Plan overview tab from an open CWP plan.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready for navigation to the Stowage Plan. |
| 2 | Locate and click | Locate the Stowage Plan control using its `data-testid` value `vp-shared-side-menu-stowage-plan-btn`, then click it. | The Stowage Plan overview tab begins loading. |
| 3 | Wait and assert | Locate the loader using its `data-testid` value `vp-shared-loader`; verify that it becomes visible, then becomes hidden or is removed. | The Stowage Plan overview tab finishes loading. |
| 4 | Assert | Verify that at least one element has a `data-testid` value matching the pattern `vp-shared-stowage-plan-mini-bay-view-full-*`. | At least one full mini-bay view is visible in the Stowage Plan overview tab. |

---

## 3. Assertions

- **Assertion 1:** The Stowage Plan control identified by `data-testid` value `vp-shared-side-menu-stowage-plan-btn` is visible.
- **Assertion 2:** The loader identified by `data-testid` value `vp-shared-loader` appears and then becomes hidden or is removed.
- **Assertion 3:** At least one element has a `data-testid` value matching `vp-shared-stowage-plan-mini-bay-view-full-*`.
