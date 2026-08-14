# Scenario: Open Voyage

## 1. Description
> The user opens a configured voyage from the voyage table to trigger navigation to the next phase of the voyage workflow. This reusable scenario can be called whenever a later scenario needs to begin from an opened voyage.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 0 | **Condition Check** | Verify if the current session is already authenticated. If not, trigger the login flow and save the Storage State locally. | A valid session is established before the voyage is opened. |
| 1 | Configure | Read the voyage ID from the `Voyage ID` value in `project-configurations.md`. The placeholder value is `dummy-voyage-id` and will be replaced later. | A configurable voyage ID is available for the scenario. |
| 2 | Locate | Use the voyage ID input element's HTML `id` attribute to locate the input field. The element ID should be provided as a placeholder in the format `my-test-id-{description}` and replaced with the real ID later. | The voyage ID input field is found. |
| 3 | Input | Enter the configured voyage ID into the voyage ID input field. | The input field contains the configured voyage ID. |
| 4 | Locate | Find the first table row containing the configured voyage ID by text, and ensure the matched row is the one associated with the voyage ID entered in Step 3. | The first matching voyage row is found. |
| 5 | Action | Double-click the first table row matched by the configured voyage ID. | The application navigates to the next phase of the voyage workflow. |

---

## 3. Assertions

- **Assertion 1:** The configured voyage ID is entered into the voyage ID input field located by its HTML `id` attribute.
- **Assertion 2:** The first table row selected by text contains the same voyage ID configured in `project-configurations.md`.
- **Assertion 3:** The matching first voyage row can be double-clicked successfully.
- **Assertion 4:** Double-clicking the voyage row triggers navigation to the next phase of the voyage workflow.