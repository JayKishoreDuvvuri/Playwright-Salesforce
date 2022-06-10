/*
Scenario: Create a new Chatter post message with test url and share it with followers 
and click the test url link

Test Steps:
1. Create a new chatter post message
2. Add a test URL https://www.blogger.com/profile/06939442079028713822 to the message body
3. Share the new message with the followers. 
4. Check whether the message with the test URL is visible in Chatter feed
5. Verify the target location when the test URL is clicked.
*/

import { expect } from '@playwright/test'
import { baseUrl, bloggerPageTitle, bloggerPageUrl } from '../../config'
import {
	shareAnUpdateButton,
	textBox,
	justNow,
	messageText,
	chatterFeedLink,
	shareButton
} from '../../pageObjects/landingPage'

import test from '../../fixtures/fixture'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync(`./data/data.json`, `utf-8`))

test.describe.serial(
	'Create a new chatter post message with url and share it to followers',
	() => {
		test('User posts a new chatter message in the chatter feed to followers', async ({
			landingPage
		}) => {
			await test.step(`user logged in to app successfully`, async () => {
				await landingPage.openApp()
				expect(await landingPage.getUrl()).toBe(baseUrl)
				expect(await landingPage.getTitle()).toBe(testData.title)
			})

			await test.step(
				'User types in message and url link in the text box and verifies the message with url is visible in the chatter feed',
				async () => {
					await landingPage.clickElement(shareAnUpdateButton)
					await landingPage.type(textBox, testData.message)
					await landingPage.clickShareButton(shareButton)
					const isDisplayed = await landingPage.verifyIsVisible(justNow)
					expect(isDisplayed).toBe(true)
					var isVisible = await landingPage.verifyIsVisible(messageText)
					expect(isVisible).toBe(true)
					var isVisible = await landingPage.verifyIsVisible(chatterFeedLink)
					expect(isVisible).toBe(true)
				}
			)
		})

		test('User clicks on the test url link and verifies the test url in a new tab', async ({
			browser
		}) => {
			const context = await browser.newContext()
			const page = await context.newPage()
			await page.goto(baseUrl)

			const link = page.locator(chatterFeedLink)
			const [newPage] = await Promise.all([
				context.waitForEvent('page'),
				await link.click()
			])
			await newPage.waitForLoadState('networkidle')
			expect(await newPage.title()).toContain(bloggerPageTitle)
			expect(newPage.url()).toBe(bloggerPageUrl)
		})
	}
)
