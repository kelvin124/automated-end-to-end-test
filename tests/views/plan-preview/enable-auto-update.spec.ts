import { expect, test } from '@playwright/test';
import { byTestId, VesselPlanningNavigation } from '../../support/navigation';
import { ScenarioObservability } from '../../support/scenario-observability';

function hasPositiveVoyageSummaryCounter(summary: string): boolean {
	const counters = summary.matchAll(
		/\b(?:Discharge|Loading|Restow|Shifting|Movins|Total)\s*:?\s*([\d,]+)/gi,
	);

	for (const counter of counters) {
		const value = Number(counter[1].replace(/,/g, ''));

		if (Number.isSafeInteger(value) && value > 0) {
			return true;
		}
	}

	return false;
}

test('Enable Auto Update for an existing plan', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Enable Auto Update for an existing plan',
	);
	const voyageSummary = byTestId(page, 'vp-plan-preview-voyage-summary-info');

	try {
		await new VesselPlanningNavigation(page, scenario).openPlanPreview();
		await scenario.assertThat(
			'At least one voyage-summary counter is greater than zero',
			async () => {
				await expect
					.poll(
						async () => hasPositiveVoyageSummaryCounter(await voyageSummary.innerText()),
						{ message: 'Expected a non-zero voyage-summary counter.' },
					)
					.toBe(true);
			},
		);
		await scenario.assertThat(
			'Existing Plans is visible',
			() => expect(page.getByText('Existing Plans', { exact: true })).toBeVisible(),
		);
		await scenario.assertThat(
			'The first existing plan is visible',
			() => expect(byTestId(page, 'vp-plan-preview-existing-plan-1')).toBeVisible(),
		);

		const autoUpdateControl = byTestId(page, 'vp-plan-preview-auto-update-btn');
		await scenario.assertThat(
			'The Auto Update control is visible',
			() => expect(autoUpdateControl).toBeVisible(),
		);
		await autoUpdateControl.click();
		await scenario.assertThat(
			'The Stop Auto Update control is visible',
			() => expect(byTestId(page, 'vp-plan-preview-stop-auto-update-btn')).toBeVisible(),
		);
		await scenario.assertThat(
			'The Auto Update loader is hidden or removed after the operation',
			() => expect(byTestId(page, 'vp-loader')).toBeHidden(),
		);
		await scenario.assertThat(
			'The Auto Update success message is visible',
			() => expect(page.getByText('Auto calculate move time successfully', { exact: true })).toBeVisible(),
		);
	} finally {
		await scenario.finish();
	}
});
