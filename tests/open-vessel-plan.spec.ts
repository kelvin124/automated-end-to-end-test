import { expect, test } from './fixtures/api-performance';
import { ICAVE_URL } from './icave';

test('opens Vessel Plan with saved login state', async ({
  page,
  pageMilestones,
}) => {
  test.setTimeout(60_000);
  await page.goto(ICAVE_URL);

  const navigationMenu = page.locator('#NavigationMenu');
  await expect(navigationMenu).toBeVisible({ timeout: 30_000 });
  pageMilestones.mark('navigation menu visible');
  await navigationMenu.locator('#idIcon').click();
  await page.getByText('Vessel Plan', { exact: true }).click();
  pageMilestones.mark('Vessel Plan opened');
  await expect(
    page.getByText('No Rows To show', { exact: true }),
  ).toBeHidden({ timeout: 30_000 });
  const rowsCount = page.locator(
    '.ag-status-panel-total-and-filtered-row-count [ref="eValue"]',
  );
  await expect(rowsCount).toHaveText(/^[1-9]\d{0,2}(?:,\d{3})*$/, {
    timeout: 30_000,
  });
  pageMilestones.mark('Vessel Plan data loaded');
  await expect(page.getByText('Quick Search', { exact: true })).toBeVisible();
  pageMilestones.mark('Vessel Plan ready');
});