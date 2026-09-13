import {test, expect, Locator} from '@playwright/test';

test("Handlling input DatePicker", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let date : string = "08-08-2026";

    // date = date.replace(/-/g, "/"); // convererting date to MM/DD/YYYY format

    date = date.replace("-", "/"); // replaces the first occurance

    date = date.replace(/[-.]/g, "/"); // replaces multiple seperators

    console.log(date);

    // const datePickerInput : Locator = page.locator("input[id='datepicker']");

    // await datePickerInput.scrollIntoViewIfNeeded();

    // await  datePickerInput.fill(date);

    // await page.waitForTimeout(3000);
})


