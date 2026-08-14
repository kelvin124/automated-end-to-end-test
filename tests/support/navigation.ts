import { expect, type Locator, type Page } from '@playwright/test';
import { ScenarioObservability } from './scenario-observability';

const voyageSearchValue = 'KELV/KCVSL/KCVOY1';

export function byTestId(page: Page, testId: string): Locator {
	return page.locator(`[data-test-id="${testId}"]`);
}

export class VesselPlanningNavigation {
	public constructor(
		private readonly page: Page,
		private readonly scenario: ScenarioObservability,
	) {}

	public async openSpa(): Promise<void> {
		await this.page.goto('/');

		const navigationMenu = this.page.locator('#NavigationMenu');
		await this.scenario.assertThat(
			'The NavigationMenu control is visible',
			() => expect(navigationMenu).toBeVisible(),
		);

		const navigationIcon = navigationMenu.locator('#idIcon');
		await this.scenario.assertThat(
			'The navigation icon is visible after opening NavigationMenu',
			() => expect(navigationIcon).toBeVisible(),
		);
		await navigationIcon.click();

		const vesselPlanLink = this.page.getByText('Vessel Plan', { exact: true });
		await this.scenario.assertThat(
			'The Vessel Plan navigation link is visible',
			() => expect(vesselPlanLink).toBeVisible(),
		);
		await vesselPlanLink.click();

		await this.scenario.assertThat(
			'Quick search is visible on the Vessel Planning dashboard',
			() => expect(this.page.getByText(/quick\s*search/i)).toBeVisible(),
		);
	}

	public async openVoyage(): Promise<void> {
		await this.openSpa();

		const quickSearchInput = byTestId(this.page, 'vp-voyage-table-quick-search-input');
		await this.scenario.assertThat(
			'The voyage quick-search input is visible',
			() => expect(quickSearchInput).toBeVisible(),
		);
		await quickSearchInput.fill(voyageSearchValue);
		await this.scenario.assertThat(
			'The voyage quick-search input contains KELV/KCVSL/KCVOY1',
			() => expect(quickSearchInput).toHaveValue(voyageSearchValue),
		);
		await quickSearchInput.press('Enter');

		const matchingVoyageRow = this.page
			.locator('.ag-center-cols-container .ag-row')
			.filter({ hasText: voyageSearchValue });
		await this.scenario.assertThat(
			'The matching voyage row is visible after submitting the search',
			() => expect(matchingVoyageRow).toBeVisible(),
		);
		// AG Grid replaces the selected row between the two click events.
		await matchingVoyageRow.dblclick({ force: true, noWaitAfter: true });

		await this.scenario.assertThat(
			'Existing Plans is visible after opening the matching voyage',
			() => expect(this.page.getByText('Existing Plans', { exact: true })).toBeVisible(),
		);
	}

	public async openPlanPreview(): Promise<void> {
		await this.openVoyage();

		await this.scenario.assertThat(
			'The Create Mask control is visible in the plan-preview view',
			() => expect(byTestId(this.page, 'vp-plan-preview-create-mask-btn')).toBeVisible(),
		);
	}

	public async openCreateMask(): Promise<void> {
		await this.openPlanPreview();
		await byTestId(this.page, 'vp-plan-preview-create-mask-btn').click();

		await this.scenario.assertThat(
			'The create-mask voyage summary information is visible',
			() => expect(byTestId(this.page, 'vp-create-mask-voyage-summary-info')).toBeVisible(),
		);
	}
}
