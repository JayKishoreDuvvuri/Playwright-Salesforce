import { test as baseTest } from '@playwright/test'
import { LandingPage } from '../pages/landingPage'

const test = baseTest.extend<{
	landingPage: LandingPage
}>({
	landingPage: async ({ page }, use) => {
		await use(new LandingPage(page))
	}
})
export default test
