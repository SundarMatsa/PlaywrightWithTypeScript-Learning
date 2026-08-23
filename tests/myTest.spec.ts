// Add // @ts-check at the start of each test file when using JavaScript in VS Code to get automatic type checking.

import {test, expect} from "@playwright/test";
/*
test("title of the test", () => {
    // statements
})
*/

// fixtures - global variable: page, browser.
//  promise - 
test("Verify Page Title", async ({page}) => {
    // page.goto(url); -> launch the webpage in browser
    await page.goto("https://testautomationpractice.blogspot.com/");

    let pageTitle = await page.title(); // -> return page title in console.
    console.log(`Page Title is: ${pageTitle}`)

    // await expect(page).toHaveTitle("Automation Testing Practice"); // -> // Expect a title "to contain" a string.

    await expect(page).toHaveTitle(/Testing/);

})

test ("verify page url contains Text", async ({page}) => {
    await page.goto("https://www.flipkart.com");

    await expect(page).toHaveURL(/flipkart/); // -> // Expect a title "to contain" a substring.
})




