import { expect, test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../../support/navigation';
import { assertRowCountStartsAtZeroAndLoads } from '../../support/row-count';
import { ScenarioObservability } from '../../support/scenario-observability';

test('Open and load the create-mask loading container list', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open and load the create-mask loading container list',
	);
	const loadingContainerList = byTestId(page, 'vp-create-mask-loading-cntr-list');

	try {
		await new VesselPlanningNavigation(page, scenario).openCreateMask();
		await scenario.assertThat(
			'LOADING CONTAINER LIST is visible',
			() => expect(page.getByText('LOADING CONTAINER LIST', { exact: true })).toBeVisible(),
		);
		await scenario.assertThat(
			'The loading container list is visible',
			() => expect(loadingContainerList).toBeVisible(),
		);
		await assertRowCountStartsAtZeroAndLoads(scenario, loadingContainerList, 'The loading container list');
	} finally {
		await scenario.finish();
	}
});
