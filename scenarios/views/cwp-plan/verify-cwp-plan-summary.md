# Scenario: Verify the CWP Plan Summary

## 1. Description
> This view scenario verifies that the plan summary section contains data in the CWP plan view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open CWP Plan View** scenario in `scenarios/navigation/open-cwp-plan.md`. | The CWP plan view is open and ready for summary validation. |
| 2 | Assert | Locate the plan summary using its `data-testid` value `vp-shared-plan-summary-plan-summary` and verify that it is visible. | The plan summary section is visible. |
| 3 | Assert | Within the plan summary, verify that text matching `LOA {non-zero-digit}` is visible. | LOA has a non-zero numeric value. |
| 4 | Assert | Within the plan summary, verify that text matching `Discharge {non-zero-digit}` is visible. | Discharge has a non-zero numeric value. |
| 5 | Assert | Within the plan summary, verify that text matching `Loading {non-zero-digit}` is visible. | Loading has a non-zero numeric value. |

---

## 3. Assertions

- **Assertion 1:** The element identified by `data-testid` value `vp-shared-plan-summary-plan-summary` is visible.
- **Assertion 2:** The plan summary shows a non-zero LOA value.
- **Assertion 3:** The plan summary shows a non-zero Discharge value.
- **Assertion 4:** The plan summary shows a non-zero Loading value.
