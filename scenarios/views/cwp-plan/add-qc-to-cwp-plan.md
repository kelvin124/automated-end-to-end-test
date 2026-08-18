# Scenario: Add QC to CWP Plan

## 1. Description
> This view action scenario verifies that a user can add a QC to an open CWP plan.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready for QC configuration. |
| 2 | Count | Count elements whose `data-testid` value matches the pattern `qc-btn-{digit}`. | The initial QC control count is recorded. |
| 3 | Locate and click | Locate the Add QC control using its `data-testid` value `vp-view-cwp-plan-add-qc-btn`, then click it. | The QC settings interface opens. |
| 4 | Locate and click | Locate the QC settings save control using its `data-testid` value `vp-view-qc-setting-save`, then click it. | The QC is saved to the CWP plan. |
| 5 | Assert | Count elements whose `data-testid` value matches the pattern `qc-btn-{digit}` again and verify that the count is one greater than the initial count. | One QC control was added to the CWP plan. |

---

## 3. Assertions

- **Assertion 1:** The Add QC control identified by `data-testid` value `vp-view-cwp-plan-add-qc-btn` is visible.
- **Assertion 2:** The QC settings save control identified by `data-testid` value `vp-view-qc-setting-save` is visible after adding a QC.
- **Assertion 3:** The number of elements with a `data-testid` matching `qc-btn-{digit}` increases by one after saving.
