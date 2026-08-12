import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { ICAVE_STORAGE_STATE_PATH, ICAVE_URL } from './icave';

export default async function globalSetup() {
  if (existsSync(ICAVE_STORAGE_STATE_PATH)) {
    return;
  }

  mkdirSync(path.dirname(ICAVE_STORAGE_STATE_PATH), { recursive: true });

  const browser = await chromium.launch({ headless: false });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(ICAVE_URL);
    await page.locator('#NavigationMenu').waitFor({ state: 'visible', timeout: 0 });
    await context.storageState({ path: ICAVE_STORAGE_STATE_PATH });
  } finally {
    await browser.close();
  }
}
