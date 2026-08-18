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

test('Load existing plans in the plan-preview view', async ({ page }, testInfo) => {
	const scenario = new ScenarioObservability(
		page,
		testInfo,
		'Load existing plans in the plan-preview view',
	);
	const voyageSummary = byTestId(page, 'vp-view-plan-preview-voyage-summary-info');

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
			() => expect(byTestId(page, 'vp-view-plan-preview-existing-plan-1')).toBeVisible(),
		);
	} finally {
		await scenario.finish();
	}
});
