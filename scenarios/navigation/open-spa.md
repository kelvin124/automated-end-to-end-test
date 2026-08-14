# Scenario: Open the SPA (Prerequisite Baseline)

## 1. Description
> This is a critical prerequisite baseline scenario that initializes the application state. All subsequent test feature suites depend on this scenario to establish a valid starting session, eliminating redundant login routines.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 0 | **Condition Check** | Check the current page view or storage status to determine if the session is already authenticated. If not, halt the flow, perform login (or prompt the tester for credentials), and save the authenticated state locally. | Skip login if already authenticated; otherwise, produce a valid `storageState.json` file. |
| 1 | Navigate | Use the **NavigationHelper** (or locate) the element with ID `idIcon` nested inside the parent element with ID `NavigationMenu`. Perform a click to expand the main navigation overlay menu. | The sidebar drawer menu successfully expands. |
| 2 | Route | Use the **NavigationHelper** to query the viewport for a visible navigation link containing the precise text "Vessel Plan". Click it to trigger internal router navigation. | The page URL routes to the vessel planning dashboard. |
| 3 | Wait | Block execution and poll the page until the static anchor text "Quick search" is fully visible inside the primary content viewport. | The "Quick search" element is fully visible on the screen. |

---

## 3. Assertions

- **Assertion 1:** After Step 1, the sidebar drawer is in an expanded (visible) state.
- **Assertion 2:** After Step 3, the page URL contains `/vessel-planning` (or the corresponding route).
- **Assertion 3:** The "Quick search" text is present in the main content area and does not disappear due to rendering errors.
