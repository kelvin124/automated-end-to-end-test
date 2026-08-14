import { test } from '@playwright/test';
import { VesselPlanningNavigation } from '../support/navigation';
import { ScenarioObservability } from '../support/scenario-observability';

test('Open a voyage and reach its existing plans', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open a voyage and reach its existing plans',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openVoyage();
	} finally {
		await scenario.finish();
	}
});
