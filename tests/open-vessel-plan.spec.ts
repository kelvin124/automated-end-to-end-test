import { test } from './fixtures/api-performance';
import { ICAVE_URL } from './icave';
import { VesselPlanPage } from './pages/vessel-plan.page';

test('opens Vessel Plan with saved login state', async ({
  page,
  pageMilestones,
}) => {
  test.setTimeout(60_000);
  await page.goto(ICAVE_URL);

  const vesselPlan = new VesselPlanPage(page, pageMilestones);
  await vesselPlan.open();
});