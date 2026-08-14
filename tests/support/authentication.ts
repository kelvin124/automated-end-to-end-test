import { chromium, type FullConfig, type Page } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const storageStatePath = path.resolve('playwright', '.auth', 'user.json');
const navigationMenuSelector = '#NavigationMenu';

function baseURLFrom(config: FullConfig): string {
	const baseURL = config.projects[0]?.use.baseURL;

	if (typeof baseURL !== 'string') {
		throw new Error('Playwright must define a string baseURL before authentication can be initialized.');
	}

	return baseURL;
}

async function storageStateExists(): Promise<boolean> {
	try {
		await fs.access(storageStatePath);
		return true;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			return false;
		}

		throw error;
	}
}

async function hasAuthenticatedShell(page: Page): Promise<boolean> {
	await page.waitForTimeout(2_000);

	for (let attempt = 0; attempt < 6; attempt += 1) {
		if (await page.locator(navigationMenuSelector).isVisible()) {
			return true;
		}

		await page.waitForTimeout(500);
	}

	return false;
}

async function storedSessionIsValid(baseURL: string): Promise<boolean> {
	if (!(await storageStateExists())) {
		return false;
	}

	const browser = await chromium.launch({ headless: true });

	try {
		const context = await browser.newContext({ storageState: storageStatePath });

		try {
			const page = await context.newPage();
			await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
			return hasAuthenticatedShell(page);
		} finally {
			await context.close();
		}
	} finally {
		await browser.close();
	}
}

export default async function globalSetup(config: FullConfig): Promise<void> {
	const baseURL = baseURLFrom(config);

	if (await storedSessionIsValid(baseURL)) {
		return;
	}

	if (process.env.CI) {
		throw new Error(
			'No valid saved session exists. Create playwright/.auth/user.json with an authenticated local run before executing the suite in CI.',
		);
	}

	const browser = await chromium.launch({ headless: false });

	try {
		const context = await browser.newContext();

		try {
			const page = await context.newPage();
			await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
			console.log('Complete the interactive sign-in, then resume the Playwright inspector to save the session.');
			await page.pause();

			if (!(await hasAuthenticatedShell(page))) {
				throw new Error('The saved browser session did not reach the authenticated Vessel Planning application shell.');
			}

			await fs.mkdir(path.dirname(storageStatePath), { recursive: true });
			await context.storageState({ path: storageStatePath });
		} finally {
			await context.close();
		}
	} finally {
		await browser.close();
	}
}
