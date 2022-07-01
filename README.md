### Playwright with TypeScript for Salesforce Frontend

An example project demonstrating automation of playwright tests using TypeScript

#### Application Under Test 

We are using Salesforce website as the Application Under Test. This App is a **Salesforce** Frontend

- URL: https://itfreelance2-dev-ed.lightning.force.com/lightning/page/chatter
- OS : macOS
- IDE : Visual Studio Code 

#### Scenario 1

```bash
Scenario: Create a new Chatter post message with test url and share it with followers
and click the test url link

Test Steps:
1. Create a new chatter post message
2. Add a test URL https://www.blogger.com/profile/06939442079028713822 to the message body
3. Share the new message with the followers.
4. Check whether the message with the test URL is visible in the Chatter feed
5. Verify the target location when the test URL is clicked.

Testname: TC_01_messageWithTestUrl.test.ts
```

#### Scenario 2

```bash
Scenario: Create a new Chatter post message by attaching a test file and share it with followers
and download that same file

Test Steps:
1. Create a new Chatter post message
2. Attach a test file from your local disk or folder to the message
3. Share the new message with the followers.
4. Check whether the message with the test file are visible in the Chatter feed
5. Verify that the test file can be downloaded from the posted message

Testname: TC_02_uploadAndDownLoadFile.test.ts
```

#### Test Data

Login to Salesforce application

```bash
username: tg0008993@gmail.com
password: Test@123
```

Login to Gmail

```bash
To get the code as OTP for using playwright codegen to skip login
Gmail username: tg0008993@gmail.com
Gmail password: Test@123
```

#### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

Clone the repository

```bash
git clone https://github.com/JayKishoreDuvvuri/Playwright-Salesforce.git
```

Install dependencies
git init
```bash
npm install
npx playwright install
```

Save the cookies for test run

```bash
npm run save:cookies
```
Note: Follow the document "Skip Login.docx" attached to this project folder 
to save cookies with cookie.json file


#### Run application

Run tests on chrome

```bash
npm run test:one - Runs the testcase TC_01_messageWithTestUrl.test.ts on chrome browser
npm run test:two - Runs the testcase TC_02_uploadAndDownLoadFile.test.ts on chrome browser
npm run test:chrome - Runs the two tests parallel on chrome browser
```

#### Playwright Test Report

```bash
Test-Report : npm run test:chrome
```
