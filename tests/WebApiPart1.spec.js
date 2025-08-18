// @ts-check
import { test, expect, request } from '@playwright/test';
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = loginResponse.json();
    // @ts-ignore
    const token = loginResponseJson.token;
})

test.only('Client App Login', async ({ page }) => {
  const productName = 'Zara Coat 4';
  const products = page.locator(".card-body");
  await page.goto("https://www.rahulshettyacademy.com/client/auth/login");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@1");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();

  const count = await products.count();
  for(let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      // add to cart
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator('div li').waitFor();
  const bool = await page.locator('h3:has-text("Zara Coat 4")').isVisible();
  expect (bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder='Select Country']").pressSequentially("India");

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }

  }
  expect(page.locator(".user__name [type='text']").first()).toHaveText("anshika@gmail.com");
  await page.locator(".action__submit").click();
  expect(page.locator(".hero-primary")).toHaveText(" Thank you for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorder']").click();
  const rows = page.locator("tbody tr");
  await page.locator("tbody").waitFor();

  for(let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId?.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId?.includes(orderIdDetails)).toBeTruthy();

});
