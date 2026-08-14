import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const storageStatePath = path.join('playwright', '.auth', 'user.json');

export default defineConfig({
	testDir: './tests',
	globalSetup: './tests/support/authentication.ts',
	timeout: 60_000,
	expect: {
		timeout: 15_000,
	},
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
	use: {
		baseURL: process.env.SPA_URL ?? 'https://icave.veronica.iut.hphit.hutchisonports.com/',
		browserName: 'chromium',
		...devices['Desktop Chrome'],
		storageState: storageStatePath,
		trace: 'on',
		video: 'retain-on-failure',
	},
	outputDir: 'test-results',
});
