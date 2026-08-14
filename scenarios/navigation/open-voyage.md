# Scenario: Open Voyage

## 1. Description
> This navigation scenario verifies that a voyage can be opened and the application navigates to the next view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open SPA** scenario in `scenarios/navigation/open-spa.md`. | The targeted SPA is open and ready for voyage search. |
| 2 | Locate | Locate the voyage quick-search input using its `data-test-id` value `vp-voyage-table-quick-search-input`. | The voyage quick-search input is visible. |
| 3 | Input | Enter `KELV/KCVSL/KCVOY1` into the voyage quick-search input. | The input contains `KELV/KCVSL/KCVOY1`. |
| 4 | Action | Press Enter in the voyage quick-search input. | The voyage search is submitted and the matching voyage row is visible. |
| 5 | Action | Double-click the matching `KELV/KCVSL/KCVOY1` voyage row. | The application opens the voyage plan-preview view. |
| 6 | Assert | Verify that the text `Existing Plans` is visible. | The next voyage view is displayed. |

---

## 3. Assertions

- **Assertion 1:** The voyage quick-search input identified by `data-test-id` value `vp-voyage-table-quick-search-input` is visible.
- **Assertion 2:** The voyage quick-search input accepts `KELV/KCVSL/KCVOY1`.
- **Assertion 3:** The matching `KELV/KCVSL/KCVOY1` voyage row is visible after the search is submitted.
- **Assertion 4:** The text `Existing Plans` is visible after the matching voyage row is opened.
