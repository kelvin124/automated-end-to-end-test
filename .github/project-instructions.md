# Project Configuration Instructions

1. Static Test Runner Configuration
- Target File: Put structural and global framework behaviors directly within playwright.config.ts.
- Scope: This file must contain parameters that are mostly static and do not change between test runs.
- Core Property: Define the test folder lookup path using the testDir option.

2. Dynamic Runtime Configuration
- Target File: Put configurations that determine how to run the tests based on the tester's current needs into a separate file named project-configurations.md.
- Dynamic Parameters: This file should handle environment-specific options such as:
   - The URL of the SPA (Single Page Application).
   - What browser should be used for the current test run.

3. Scenario Lifecycle Management
* Centralized Tracking: Execute and maintain all test scripts strictly inside the designated /scenarios directory.
* Progress Observability: Keep `progress.md` at the root of the `/scenarios` directory. Its only purpose is to track which scenario Markdown files have been implemented.
* Progress Format: Use a table with exactly two columns: `Markdown File Name` and `Status`.

  ```md
  | Markdown File Name | Status |
  | --- | --- |
  | navigation/open-spa.md | Implemented |
  ```
