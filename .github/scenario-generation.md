# Scenario Generation

## Scenario-Driven Testing

* Prioritize user behavior over generic DOM metrics or standalone web vitals.
* Build each scenario as a cohesive sequence of logical actions that a user performs to accomplish an objective.
* Make execution readable by documenting and outputting chronological steps in comments or test steps.
* Measure the elapsed time for every assertion independently and include it in the client-side assertion timing report.

## Reusable Navigation

* Do not hardcode or repeat view transitions, sidebar interactions, URL routing, or navigation menus in scenario files.
* Abstract navigation routes into reusable helper classes, configuration files, or custom utility hooks, and share them across scenarios.

## State-Based Authentication

* Do not perform login routines at the start of every scenario block.
* Authenticate once through a global setup routine or an equivalent orchestration workflow, then save and reuse storage state containing cookies, authorization headers, and local storage.
* Before running a scenario, validate that the stored session is present and unexpired. Refresh it through the global setup lifecycle when it is missing or expired.

## Scenario Documentation and Reuse

* Maintain scenario definitions under the root `scenarios/` folder.
* Place reusable navigation scenarios in `scenarios/navigation/` so other scenarios can compose and reuse them.
* Use `scenarios/template.md` as the required format when generating a new scenario.
