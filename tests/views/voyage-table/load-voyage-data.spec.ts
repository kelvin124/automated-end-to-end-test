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
	const voyageRowCount = page.locator('.ag-status-bar-left[role="status"]').first();

	try {
		const rowCountLoading = assertRowCountStartsAtZeroAndLoads(
			scenario,
			voyageRowCount,
			'The voyage table row count',
		);
		await new VesselPlanningNavigation(page, scenario).openSpa();
		await rowCountLoading;
	} finally {
		await scenario.finish();
	}
});
