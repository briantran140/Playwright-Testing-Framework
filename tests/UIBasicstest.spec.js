import { expect, test } from '@playwright/test';
import { sign } from 'crypto';

test.only("Browser Context Playwright Test", async ({browser}) => {
  // chrome - plugins/ cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const cardTitles = page.locator('.card-body a');
  await username.fill('rahulshettyacademy');
  await page.locator('[type="password"]').fill('learning');
  await signIn.click();
  // await page.locator('[style*="block"]').textContent()
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect');


  // fill
  await username.fill('');
  await username.fill('rahulshettyacademy');
  await signIn.click();
  await expect(cardTitles.first()).toHaveText('iphone X');
  await expect(cardTitles.nth(1)).toHaveText('Samsung Note 8');
  console.log(await cardTitles.allTextContents())
});

test("Page Playwright Test", async ({page}) => {
  await page.goto('https://www.google.com');
  // get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle('Google');
  //
});

test("UI Control", async ({page}) => {
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');
  const documentLink = page.locator("[href*='documents-request']");
  await dropdown.selectOption('consult');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  expect(page.locator('.radiotextsty').last()).toBeChecked();

  await page.locator('#terms').check();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator("#terms").uncheck();
  await expect(page.locator("#terms")).not.toBeChecked();

  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  // assertion:
  await page.pause();
});

test.only("Child Windows handling", async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');

  const documentLink = page.locator("[href*='documents-request']");

  const page2 = context.waitForEvent('page', async (newPage) => {


  });
  await documentLink.click();


});
