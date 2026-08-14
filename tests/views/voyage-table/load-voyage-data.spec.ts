import { test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../../support/navigation';
import { assertRowCountStartsAtZeroAndLoads } from '../../support/row-count';
import { ScenarioObservability } from '../../support/scenario-observability';

test('Load voyage data in the voyage table', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Load voyage data in the voyage table',
	);
	const voyageRowCount = byTestId(page, 'my-test-id-voyage-row-count');

	try {
		await new VesselPlanningNavigation(page, scenario).openSpa();
		await assertRowCountStartsAtZeroAndLoads(scenario, voyageRowCount, 'The voyage table row count');
	} finally {
		await scenario.finish();
	}
});
