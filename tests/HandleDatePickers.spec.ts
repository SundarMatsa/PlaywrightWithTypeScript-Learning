import {test, expect, Locator} from '@playwright/test';
import {parseDate, convertMonth, selectDate} from '../utils/dateUtilMethods';

test("Handlling input DatePicker", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateFormat : string = parseDate("26-09-2026");
    console.log(dateFormat);

    const datePickerInput : Locator = page.locator("input[id='datepicker']");

    await datePickerInput.scrollIntoViewIfNeeded();

    await  datePickerInput.fill(dateFormat);
    await datePickerInput.press("Escape");
    // await datePickerInput.press("Enter");

    expect(datePickerInput).toHaveText;

    await page.waitForTimeout(3000);
});

test("Handlling input DatePicker using DatePicker", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const datePickerInput : Locator = page.locator("input[id='datepicker']");

    await datePickerInput.scrollIntoViewIfNeeded();

    await expect(datePickerInput).toBeVisible();

    await datePickerInput.click();

    const dateFormat : string = "01-04-2027";
    // console.log(dateFormat);
    const dateArr : string[] = dateFormat.split("-");
    const day : string = dateArr[0];
    const month : string = dateArr[1];
    const year : string = dateArr[2];

    const requiredMonth : string = convertMonth(month);

    await selectDate(year, requiredMonth, day, true, page);

    const expectedDate = parseDate(dateFormat);

    const actualDate = await datePickerInput.inputValue();

    await expect(datePickerInput).toHaveValue(expectedDate);

    console.log("expected", expectedDate);
    console.log("actual", actualDate);

    expect(actualDate).toBe(expectedDate);

    await page.waitForTimeout(3000);

});

// test("Handle BootStrap DatePicker", async({page}) => {
//     await page.goto("https://www.booking.com/")

//     await page.getByTestId("searchbox-dates-container").click();

//     const checkInDate : string = "20-09-2026";
//     const dateArr : string[] = checkInDate.split("-");
//     const day : string = dateArr[0];
//     const month : string = dateArr[1];
//     const year : string = dateArr[2];

//     const requiredMonth : string = convertMonth(month);

// })

   



