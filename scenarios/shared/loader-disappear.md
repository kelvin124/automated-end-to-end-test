# Scenario: Loader Disappear

## 1. Description
> This shared scenario verifies that the loader identified by the `data-testid` value `vp-loader` disappears after the SPA is opened.

---

## 2. Executable Test Steps

| Step | Action Type | Description | Expected Result / Assertion |
| :---: | :--- | :--- | :--- |
| 1 | Navigate | Run the reusable **Open SPA** scenario in `scenarios/navigation/open-spa.md`. | The targeted SPA is open and ready for validation. |
| 2 | Assert | Locate the loader using its `data-testid` value `vp-loader` and wait for it to become hidden or be removed. | The loader is no longer visible. |

---

## 3. Assertions

- **Assertion 1:** The loader identified by `data-testid` value `vp-loader` is hidden or removed after the SPA is opened.
