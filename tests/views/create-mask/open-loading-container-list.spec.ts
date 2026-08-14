import { expect, test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../../support/navigation';
import { observeRowCount } from '../../support/row-count';
import { ScenarioObservability } from '../../support/scenario-observability';

test('Open and load the create-mask loading container list', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Open and load the create-mask loading container list',
	);
	const loadingContainerList = byTestId(page, 'vp-create-mask-loading-cntr-list');
	const loadingContainerListControl = page.locator(
		'div[data-test-id="vp-create-mask-all-ld-cntr-btn"]',
	);
	const loadingContainerRowCountSelector =
		'[data-test-id="vp-create-mask-loading-cntr-list"] .ag-status-bar-left[role="status"]';
	const loadingContainerRowCount = loadingContainerList.locator('.ag-status-bar-left[role="status"]');

	try {
		await new VesselPlanningNavigation(page, scenario).openCreateMask();
		await scenario.assertThat(
			'The loading container list control is visible',
			() => expect(loadingContainerListControl).toBeVisible(),
		);
		const rowCountObservation = await observeRowCount(page, loadingContainerRowCountSelector);
		await loadingContainerListControl.click();
		await scenario.assertThat(
			'LOADING CONTAINER LIST is visible',
			() => expect(page.getByText('LOADING CONTAINER LIST', { exact: true })).toBeVisible(),
		);
		await scenario.assertThat(
			'The loading container list is visible',
			() => expect(loadingContainerList).toBeVisible(),
		);
		await scenario.assertThat(
			'The loading container list reports a positive row count',
			() => rowCountObservation.waitForPositiveCount(),
		);
		await scenario.assertThat(
			'The loading container list starts at zero or is already populated from cache',
			async () => {
				if (await rowCountObservation.hasSeenZeroCount()) {
					return;
				}

				await expect(loadingContainerRowCount).toContainText(/Rows\s*:\s*[1-9][\d,]*/i);
			},
		);
		await rowCountObservation.dispose();
	} finally {
		await scenario.finish();
	}
});
