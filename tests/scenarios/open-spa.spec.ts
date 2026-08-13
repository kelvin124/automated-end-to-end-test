import { expect, test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NavigationMenu } from '../support/navigation';
import { startNetworkAudit, writeScenarioReport } from '../support/scenario-observability';

const storageStatePath = path.join('playwright', '.auth', 'user.json');

test('Open SPA and reach the Vessel Planning dashboard', async ({ page }, testInfo) => {
  const scenarioName = 'Open the SPA and reach the Vessel Planning dashboard';
  const startTime = new Date().toISOString();
  const networkAudit = startNetworkAudit(page);

  try {
    await page.goto('/');

    // A missing state requires one interactive login; the resulting state is reused by later runs.
    try {
      await expect(page.locator('#NavigationMenu')).toBeVisible({ timeout: 5_000 });
    } catch {
      await page.pause();
      await fs.mkdir(path.dirname(storageStatePath), { recursive: true });
      await page.context().storageState({ path: storageStatePath });
    }

    const navigationMenu = new NavigationMenu(page);
    await navigationMenu.open();
    await navigationMenu.openVesselPlanning();
    await expect(page.getByText('Quick Search', { exact: true })).toBeVisible();
    await expect.poll(
      async () => page.locator('body').innerText(),
      { message: 'Expected the voyage table row summary to finish loading' },
    ).toMatch(/Rows\s*:\s*[\d,]+/);
  } finally {
    const endTime = new Date().toISOString();
    await writeScenarioReport(testInfo, scenarioName, startTime, endTime, await networkAudit.stop());
  }
});