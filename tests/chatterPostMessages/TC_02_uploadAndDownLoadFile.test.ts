/*
Scenario: Create a new Chatter post message by attaching a test file and share it with followers 
and download that same file 

Test Steps:
1. Create a new Chatter post message 
2. Attach a test file from your local disk or folder to the message
3. Share the new message with the followers. 
4. Check whether the message with the test file are visible in the Chatter feed
5. Verify that the test file can be downloaded from the posted message
*/

import { expect, test } from '@playwright/test'
import { baseUrl } from '../../config'
import {
	shareAnUpdateButton,
	textBox,
	shareButton,
	attachmentIcon,
	uploadFilesButton,
	uploadAFileMessageInFeed,
	downloadFile,
	fileInFeed
} from '../../pageObjects/landingPage'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync(`./data/data.json`, `utf-8`))
const filePath = './data/one.png'

test.describe(
	'Create a new chatter post message by attaching file and share it with followers and download the file posted earlier',
	() => {
		test('User types in message and attaches a file in the text box to share it with followers and also downloads the same file', async ({
			browser
		}) => {
			await test.step(`user uploads a file with a message`, async () => {
				const context = await browser.newContext()
				const page = await context.newPage()
				await page.goto(baseUrl)

				await page.click(shareAnUpdateButton)
				await page.fill(textBox, testData.uploadMessage)
				await page.locator(attachmentIcon).click()
				const [fileChooser] = await Promise.all([
					page.waitForEvent('filechooser'),
					page.locator(uploadFilesButton).click()
				])
				await fileChooser.setFiles(filePath)
				await page.locator(shareButton).nth(2).click()

				await page.waitForSelector(uploadAFileMessageInFeed)
				await page.waitForLoadState('domcontentloaded')

				const messageUploadAFileText = await page.locator(
					uploadAFileMessageInFeed
				)
				const isDisplayed = await messageUploadAFileText.isVisible()
				expect(isDisplayed).toBe(true)

				const fileFromFeed = await page.locator(fileInFeed)
				const isVisible = await messageUploadAFileText.isVisible()
				expect(isDisplayed).toBeTruthy()
			})

			await test.step(
				`User downloads the uploaded file earlier from the chatter feed`,
				async () => {
					const context = await browser.newContext({ acceptDownloads: true })
					const page = await context.newPage()
					await page.goto(baseUrl)

					const [download] = await Promise.all([
						page.waitForEvent('download'),
						page.click(downloadFile)
					])
					const path = await download.suggestedFilename()
					await download.saveAs(path)

					const newFile = await fs.readFileSync(path)
					const testFile = await fs.readFileSync('./data/one.png')
					expect(newFile).toStrictEqual(testFile)
					await browser.close()
				}
			)
		})
	}
)
