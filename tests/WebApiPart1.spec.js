// @ts-check
import { test, expect, request } from '@playwright/test';
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{country:"India", productOrderedId: "62023a7617fcf72fe9dfc619"}]}
let token;
let orderId;
test.beforeAll( async () => {

    // Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    // @ts-ignore
    token = loginResponseJson.token;

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayload,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    const orderResponseJson = orderResponse.json();
    orderId = orderResponseJson.orders[0];
})

test.only('Place the order', async ({ page }) => {
  // const productName = 'Zara Coat 4';
  // const products = page.locator(".card-body");
  ApiUtils = new ApiUtils
  const orderId = createOrder();
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, token)

  await page.goto("https://rahulshettyyacademy.com/client/");

  const titles = await page.locator(".card-body b").allTextContents();

  const count = await products.count();

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

// Verify if order created is showing in history page
// Precondition - create order -