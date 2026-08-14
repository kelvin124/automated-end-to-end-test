# Scenario: Open SPA

## 1. Description
> This navigation scenario verifies that the targeted SPA can be opened after reaching the website.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Locate and click | Locate the element using the explicitly specified HTML ID selector `#NavigationMenu`, then click it. | The navigation menu is activated. |
| 2 | Locate and click | After Step 1, locate the element using the explicitly specified HTML ID selector `#idIcon`, then click it. | The navigation control is activated. |
| 3 | Assert | Verify that the text `Quick search` is visible. | The text `Quick search` is visible. |

---

## 3. Assertions

- **Assertion 1:** The text `Quick search` is visible after the navigation interactions.
