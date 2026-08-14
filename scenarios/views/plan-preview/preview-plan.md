# Scenario: Preview Plan

## 1. Description
> After opening a voyage, the user previews the plan by verifying that the Create Mask action, voyage summary, plan list, and plan editing mode controls have loaded correctly.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 0 | **Condition Check** | Verify that the reusable **Open Voyage** scenario has completed successfully and that the voyage is open in the next phase of the workflow. If the session is not authenticated, trigger the login flow and save the Storage State locally. | The user is authenticated and the opened voyage view is ready for plan preview. |
| 1 | Locate | Locate the button using its HTML `id` attribute. Use the placeholder `my-test-id-create-mask-button` until the real element ID is provided. | The button with the label `Create Mask` is present and visible. |
| 2 | Validate | Verify that the voyage summary header is loaded by locating it with its HTML `id` attribute. Use the placeholder `my-test-id-voyage-summary-header` until the real element ID is provided. | The voyage summary header is present and visible. |
| 3 | Validate | Read the voyage summary header text and verify that the ETB value is present in the format `ETB: {datetime}`, rather than only the label `ETB: `. | The header contains `ETB: ` followed by a non-empty datetime value. |
| 4 | Validate | Locate the plan list using its HTML `id` attribute. Use the placeholder `my-test-id-plan-list` until the real element ID is provided. | The plan list is present and the plan data has loaded. |
| 5 | Locate | Locate the three plan mode buttons by their HTML `id` attributes. Use the placeholders `my-test-id-exclusive-button`, `my-test-id-multi-edit-button`, and `my-test-id-read-only-button` until the real element IDs are provided. | The buttons labeled `Exclusive`, `Multi-edit`, and `Read-Only` are present and visible. |
| 6 | Validate | Inspect the background color of the three plan mode buttons. | At least one of the `Exclusive`, `Multi-edit`, or `Read-Only` buttons has a blue background color, indicating the active plan mode. |

---

## 3. Assertions

- **Assertion 1:** The `Create Mask` button is visible and is located by its HTML `id` attribute.
- **Assertion 2:** The voyage summary header is visible and is located by its HTML `id` attribute.
- **Assertion 3:** The voyage summary header contains `ETB: ` followed by a non-empty datetime value.
- **Assertion 4:** The plan list is visible and its data has loaded.
- **Assertion 5:** The `Exclusive`, `Multi-edit`, and `Read-Only` buttons are visible and are located by their HTML `id` attributes.
- **Assertion 6:** At least one of the three plan mode buttons has a blue background color.
