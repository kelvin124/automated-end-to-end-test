import { test } from '@playwright/test';
import { VesselPlanningNavigation } from '../support/navigation';
import { ScenarioObservability } from '../support/scenario-observability';

test('Open the plan-preview view for a voyage', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open the plan-preview view for a voyage',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openPlanPreview();
	} finally {
		await scenario.finish();
	}
});
