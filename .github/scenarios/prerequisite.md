# Scenario: Open the SPA (Prerequisite Baseline)
## Description
This is a critical prerequisite baseline scenario that initializes the application state. All subsequent test feature suites depend on this scenario to establish a valid starting session.

## Initial Navigation State
1. The browser navigates directly to the target application base URL.
2. The landing view displays only a primary navigation menu bar interface layout.

Step 0: Conditional Authentication Check
- Check State: Look at the current page view or storage status to see if the session is already authenticated.
- Condition: If the user is not logged in, the agent must:
    - Halt the main flow.
    - Ask the tester to perform the login or input valid credentials.
    - Complete the login action.
    - Save the authenticated credential state locally so it can be reused across other tests without logging in again.
- Fallback: If the user is already logged in, skip the login steps and proceed directly to Step 1.

# Executable Test Steps
Step 1: Open Sidebar Drawer Menu
- Locating Action: Find the element with the HTML ID idIcon that is nested inside a parent element with the HTML ID NavigationMenu.
- Trigger: Perform a standard click action to expand the main navigation overlay menu.

Step 2: Route to Vessel Planning Page
- Locating Action: Query the viewport to identify a visible navigation link or button element containing the precise text context "Vessel Plan".
- Trigger: Click the element to trigger internal router navigation to the planning dashboard interface.

Step 3: Await Application Hydration and Data Load
Block execution and poll the page until all three of the following environmental success criteria resolve simultaneously:
- Element Visibility: The static anchor text "Quick search" is fully visible inside the primary content viewport.
- Dynamic Row Mutated State: The placeholder loading summary string "Row: 0" has officially changed and updated to match the dynamic pattern "Rows: ${digit}".
- String Parsing Exception Rule: When evaluating the total numerical digit string count for values equal to or exceeding 1,000, account for a standard localization comma separator pattern (e.g., 1,000 or 12,500) and strip or ignore the comma character during structural integer validation loops.
