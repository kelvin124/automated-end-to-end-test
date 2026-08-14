import { test } from '@playwright/test';
import { VesselPlanningNavigation } from '../support/navigation';
import { ScenarioObservability } from '../support/scenario-observability';

test('Open the create-mask view from plan preview', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open the create-mask view from plan preview',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openCreateMask();
	} finally {
		await scenario.finish();
	}
});
