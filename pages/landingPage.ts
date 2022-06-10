import { BasePage } from './basePage'
import { expect } from '@playwright/test'
import { baseUrl } from '../config'

export class LandingPage extends BasePage {
	constructor(page: Page) {
		super(page)
	}

	async openApp(): Promise<void> {
		await super.open(baseUrl)
		await super.waitForPageLoad()
	}

	async type(selector: string, text: string): Promise<LandingPage> {
		return await this.waitAndFill(selector, text)
	}

	async clickElement(selector: any): Promise<LandingPage> {
		return await this.waitAndClick(selector)
	}

	async clickShareButton(selector): Promise<LandingPage> {
		return await this.nthClick(selector)
	}

	async verifyIsVisible(selector: any): Promise<LandingPage> {
		const isVisible = await this.isElementVisible(selector)
		expect(isVisible).toBeTruthy()
		return isVisible
	}
}
