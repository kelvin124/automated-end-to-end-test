import { expect, type Locator, type Page } from '@playwright/test';
import type { PageMilestones } from '../fixtures/api-performance';

export class VesselPlanPage {
  private readonly navigationMenu: Locator;
  private readonly noRowsMessage: Locator;
  private readonly rowsCount: Locator;
  private readonly quickSearchLabel: Locator;

  constructor(
    private readonly page: Page,
    private readonly pageMilestones: PageMilestones,
  ) {
    this.navigationMenu = page.locator('#NavigationMenu');
    this.noRowsMessage = page.getByText('No Rows To show', { exact: true });
    this.rowsCount = page.locator(
      '.ag-status-panel-total-and-filtered-row-count [ref="eValue"]',
    );
    this.quickSearchLabel = page.getByText('Quick Search', { exact: true });
  }

  async open() {
    await expect(this.navigationMenu).toBeVisible({ timeout: 30_000 });
    this.pageMilestones.mark('navigation menu visible');
    await this.navigationMenu.locator('#idIcon').click();
    await this.page.getByText('Vessel Plan', { exact: true }).click();
    this.pageMilestones.mark('Vessel Plan opened');

    await this.waitForData();
    await expect(this.quickSearchLabel).toBeVisible();
    this.pageMilestones.mark('Vessel Plan ready');
  }

  async waitForData() {
    await expect(this.noRowsMessage).toBeHidden({ timeout: 30_000 });
    await expect(this.rowsCount).toHaveText(/^[1-9]\d{0,2}(?:,\d{3})*$/, {
      timeout: 30_000,
    });
    this.pageMilestones.mark('Vessel Plan data loaded');
  }

  async search(
    searchInput: Locator,
    value: string,
    resultsReady: Locator,
  ) {
    await searchInput.fill(value);
    await expect(resultsReady).toBeVisible({ timeout: 30_000 });
    this.pageMilestones.mark('Quick Search results updated');
  }

  async openEntry(entry: Locator, detailsReady: Locator) {
    await expect(entry).toBeVisible({ timeout: 30_000 });
    await entry.dblclick();
    await expect(detailsReady).toBeVisible({ timeout: 30_000 });
    this.pageMilestones.mark('Vessel Plan entry ready');
  }
}
