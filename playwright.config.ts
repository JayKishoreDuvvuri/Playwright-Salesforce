module.exports = {
	testDir: 'tests',
	timeout: 20000,
	retries: 1,
	reporter: [[`dot`], [`./CustomReporterConfig.ts`]],
	projects: [
		{
			name: `Chrome`,
			use: {
				browserName: `chromium`,
				channel: `chrome`,
				storageState: 'cookie.json',
				headless: false,
				viewport: { width: 1720, height: 850 },
				screenshot: `only-on-failure`,
				video: `retain-on-failure`,
				trace: `retain-on-failure`
			}
		},
		{
			name: `Firefox`,
			use: {
				browserName: `firefox`,
				storageState: 'cookie.json',
				headless: false,
				viewport: { width: 1720, height: 850 },
				ignoreHTTPSErrors: true,
				screenshot: `only-on-failure`,
				video: `retain-on-failure`,
				trace: `retain-on-failure`,
				launchOptions: {
					slowMo: 200
				}
			}
		}
	]
}
