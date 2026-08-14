import { test } from '@playwright/test';
import { VesselPlanningNavigation } from '../support/navigation';
import { ScenarioObservability } from '../support/scenario-observability';

test('Open SPA and reach the Vessel Planning dashboard', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open the SPA and reach the Vessel Planning dashboard',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openSpa();
	} finally {
		await scenario.finish();
	}
});
