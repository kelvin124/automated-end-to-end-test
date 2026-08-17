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
	const firstExistingPlan = byTestId(page, 'vp-plan-preview-existing-plan-1');
	const autoUpdateControl = firstExistingPlan.locator(
		'div[data-testid="vp-plan-preview-auto-update-btn"]',
	);
	const stopAutoUpdateControl = firstExistingPlan.locator(
		'div[data-testid="vp-plan-preview-stop-auto-update-btn"]',
	);
	const autoUpdateSuccessMessage = page.getByText(/Auto calculate move time successfully\./);
	let autoUpdateEnabled = false;

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
			() => expect(firstExistingPlan).toBeVisible(),
		);

		await scenario.assertThat(
			'The Auto Update control is visible',
			() => expect(autoUpdateControl).toBeVisible(),
		);
		await autoUpdateControl.click();
		autoUpdateEnabled = true;
		await scenario.assertThat(
			'The Stop Auto Update control is visible',
			() => expect(stopAutoUpdateControl).toBeVisible(),
		);
		await scenario.assertThat(
			'The Auto Update loader is hidden or removed after the operation',
			() => expect(byTestId(page, 'vp-shared-loader')).toBeHidden(),
		);
		await scenario.assertThat(
			'The Auto Update success message is visible',
			() => expect(autoUpdateSuccessMessage).toBeVisible({ timeout: 30_000 }),
		);
	} finally {
		if (autoUpdateEnabled) {
			// Restore the plan state after validating the enabled state.
			await stopAutoUpdateControl.click();
			await scenario.assertThat(
				'The Auto Update control returns after cleanup',
				() => expect(autoUpdateControl).toBeVisible(),
			);
		}
		await scenario.finish();
	}
});
