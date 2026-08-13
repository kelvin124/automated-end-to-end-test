# Scenario: {{SCENARIO_DESCRIPTIVE_NAME}}

## 1. Description
> *Example: The user quickly searches for a specific vessel on the planning dashboard to review its current berthing schedule for better dispatch decision-making.*

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 0 | **Condition Check** | Verify if the current session is already authenticated. If not, trigger the login flow and save the Storage State locally. | A valid session is established before subsequent steps execute. |
| 1 | Navigate | Use the **NavigationHelper** to open the sidebar drawer menu. | The sidebar drawer menu successfully expands (becomes visible). |
| 2 | Route | Use the **NavigationHelper** to click the navigation link containing the exact text "Vessel Plan" to trigger SPA internal routing. | The page URL transitions to the vessel planning dashboard. |
| 3 | Wait | Poll the page and block execution until the target view completes hydration and loads data. | The static anchor text "Quick search" is fully visible in the primary content viewport. |
| 4 | Action | *(Add your specific business actions here, e.g., fill form, click button)* | *(Add the corresponding expected outcome here)* |

---

## 3. Assertions

- **Assertion 1:** The "Quick search" input field is visible on the screen.
- **Assertion 2:** The data table or list block loads at least one vessel record (if data exists).
- **Assertion 3:** *(Add other business-logic validations here)*
