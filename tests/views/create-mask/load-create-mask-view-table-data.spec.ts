import { expect, test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../../support/navigation';
import { ScenarioObservability } from '../../support/scenario-observability';

test('Load table data in the create-mask view', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Load table data in the create-mask view',
	);

	try {
		await new VesselPlanningNavigation(page, scenario).openCreateMask();
		await scenario.assertThat(
			'The create-mask table is visible',
			() => expect(byTestId(page, 'vp-create-mask-table')).toBeVisible(),
		);
		await scenario.assertThat(
			'The create-mask loader is hidden or removed after table data loads',
			() => expect(byTestId(page, 'vp-shared-loader')).toBeHidden(),
		);
	} finally {
		await scenario.finish();
	}
});
