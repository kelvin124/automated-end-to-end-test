# Scenario: Open Stowage Plan Yard Overview Tab

## 1. Description
> This navigation scenario verifies that a user can open the Yard Overview tab from the Stowage Plan overview.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Stowage Plan Overview Tab** scenario in `scenarios/navigation/open-stowage-plan-overview.md`. | The Stowage Plan overview tab is open and ready to switch to Yard Overview. |
| 2 | Locate and click | Locate the element with the exact text `Yard Overview`, then click it. | The Yard Overview tab begins loading. |
| 3 | Wait and assert | Locate the loader using its `data-testid` value `vp-shared-loader`; verify that it becomes visible, then becomes hidden or is removed. | The Yard Overview tab finishes loading. |
| 4 | Assert | Verify that at least one element has a `data-testid` value matching the pattern `vp-shared-stowage-plan-mini-stack-view-*`. | At least one mini-stack view is visible in the Yard Overview tab. |

---

## 3. Assertions

- **Assertion 1:** The `Yard Overview` tab control is visible.
- **Assertion 2:** The loader identified by `data-testid` value `vp-shared-loader` appears and then becomes hidden or is removed.
- **Assertion 3:** At least one element has a `data-testid` value matching `vp-shared-stowage-plan-mini-stack-view-*`.
