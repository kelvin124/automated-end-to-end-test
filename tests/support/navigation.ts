import { expect, type Page } from '@playwright/test';

export class NavigationMenu {
  public constructor(private readonly page: Page) {}

  public async open(): Promise<void> {
    await this.page.locator('#NavigationMenu').locator('#idIcon').click();
  }

  public async openVesselPlanning(): Promise<void> {
    await this.page.getByText('Vessel Plan', { exact: true }).click();
    await expect(this.page.getByText('Quick Search', { exact: true })).toBeVisible();
  }
}