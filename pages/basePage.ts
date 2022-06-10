export class BasePage {
	readonly page: Page

	constructor(page: Page) {
		this.page = page
	}

	async open(url: string): Promise<void> {
		await this.page.goto(url)
	}

	async getTitle(): Promise<string> {
		return await this.page.title()
	}

	async getUrl(): Promise<string> {
		return this.page.url()
	}

	async waitForPageLoad(): Promise<BasePage> {
		return await this.page.waitForLoadState('networkidle')
	}

	async waitAndClick(selector: string): Promise<BasePage> {
		await this.page.waitForSelector(selector)
		return await this.page.click(selector)
	}

	async nthClick(selector): Promise<BasePage> {
		return await this.page.locator(selector).nth(2).click()
	}

	async waitAndFill(selector: string, text: string): Promise<BasePage> {
		await this.page.waitForSelector(selector)
		return await this.page.fill(selector, text)
	}

	async isElementVisible(
		selector: string,
		errorMessage: string
	): Promise<string> {
		await this.page.waitForSelector(selector)
		const element = this.page.locator(selector)
		const isVisible = await element.isVisible()
		return isVisible
	}

	async isElementEnabled(
		selector: string,
		errorMessage: string
	): Promise<BasePage> {
		await this.page.waitForSelector(selector)
		const element = this.page.locator(selector)
		const isEnabled = await element.isEnabled()
		return isEnabled
	}
}
