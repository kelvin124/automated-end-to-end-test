import { expect, test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../support/navigation';
import { ScenarioObservability } from '../support/scenario-observability';

test('Wait for the SPA loader to disappear', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Wait for the SPA loader to disappear',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openSpa();
		await scenario.assertThat(
			'The SPA loader is hidden or removed after the SPA opens',
			() => expect(byTestId(page, 'vp-shared-loader')).toBeHidden(),
		);
	} finally {
		await scenario.finish();
	}
});
