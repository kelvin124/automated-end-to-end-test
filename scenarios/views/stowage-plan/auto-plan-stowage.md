# Scenario: Auto Plan Stowage

## 1. Description
> This view action scenario verifies that a user can automatically create a stowage plan from the Stowage Plan tab.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open Stowage Plan Tab** scenario in `scenarios/navigation/open-stowage-plan-tab.md`. | The Stowage Plan tab is open and ready for auto-planning. |
| 2 | Locate and click | Locate the auto-plan control using its `data-testid` value `vp-view-stowage-plan-tab-auto-plan`, then click it. | The auto-plan workflow opens. |
| 3 | Locate and click | Locate the auto-plan create control using its `data-testid` value `vp-view-stowage-plan-tab-auto-plan-create`, then click it. | Stowage plan creation begins. |
| 4 | Wait and assert | Locate the loader using its `data-testid` value `vp-shared-loader`; verify that it becomes visible, then becomes hidden or is removed. | The auto-plan operation completes. |
| 5 | Assert | Verify that the text `Stowage plan succeed` is visible. | The stowage plan was created successfully. |

---

## 3. Assertions

- **Assertion 1:** The auto-plan control identified by `data-testid` value `vp-view-stowage-plan-tab-auto-plan` is visible.
- **Assertion 2:** The auto-plan create control identified by `data-testid` value `vp-view-stowage-plan-tab-auto-plan-create` is visible after opening the auto-plan workflow.
- **Assertion 3:** The loader identified by `data-testid` value `vp-shared-loader` appears and then becomes hidden or is removed.
- **Assertion 4:** The text `Stowage plan succeed` is visible after auto-plan creation completes.
