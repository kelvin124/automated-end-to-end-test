# Scenario: Open Voyage

## 1. Description
> This navigation scenario verifies that a voyage can be opened and the application navigates to the next view.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open SPA** scenario in `scenarios/navigation/open-spa.md`. | The targeted SPA is open and ready for voyage search. |
| 2 | Locate | Locate the voyage quick-search input using its `data-test-id` value `vp-voyage-table-quick-search-input`. | The voyage quick-search input is visible. |
| 3 | Input | Enter `test-voyage` into the voyage quick-search input. | The input contains `test-voyage`. |
| 4 | Action | Press Enter in the voyage quick-search input. | The voyage search is submitted. |
| 5 | Assert | Verify that the text `Existing Plans` is visible. | The next voyage view is displayed. |

---

## 3. Assertions

- **Assertion 1:** The voyage quick-search input identified by `data-test-id` value `vp-voyage-table-quick-search-input` is visible.
- **Assertion 2:** The voyage quick-search input accepts `test-voyage`.
- **Assertion 3:** The text `Existing Plans` is visible after the search is submitted.
