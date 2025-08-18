import test from "@playwright/test";

test("Calendar validations", async ({page}) => {
    const monthNumber = 6;
    const date = '15';
    const year = '2027'
    const expectedList = [monthNumber, date, year];

    await page.goto('https://www.rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__nagivation__label').click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber - 1).click();
    await page.locator('//abbr[text()="'+date+'"]').click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute('value');
        expect(value).toEqual(expectedList[index]);
    }
})