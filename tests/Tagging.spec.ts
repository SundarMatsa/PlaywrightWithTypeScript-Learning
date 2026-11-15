/*

test1 - sanity
test2 - regression
test3 - sanity, regression


// command to execute tests using tags 
// npx playwright test --grep "@smoke"

Execute both Smoke and Regression tests:
npx playwright test --grep "@smoke|@regression"

Run Smoke or Regression	
npx playwright test --grep "@smoke\|@regression"

Exclude Smoke tests	
npx playwright test --grep-invert "@smoke"

List matching tests	
npx playwright test --grep "@smoke" --list

*/

import {test, expect} from "@playwright/test";

// add the tags to test title either first or last.

test("Valid Login @smoke", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(page).toHaveURL(/inventory/);

});

test("Invalid Login @regression", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("invalid_user");
    await page.locator("#password").fill("invalid_password");
    await page.locator("#login-button").click();

    await expect(page.locator("[data-test='error']")).toBeVisible();

});

// Assign multiple tags to one test

test("Valid Login1 @smoke @regression", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(page).toHaveURL(/inventory/);

});

// Tagging using the tag option
// Playwright also supports a dedicated tag property.

// This is a cleaner approach than adding tags to test titles.

test("Valid Login2", {
    tag: '@smoke'
}, async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(page).toHaveURL(/inventory/);

});

test("Valid Login3", {
    tag: ['@smoke', '@regression']
}, async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

});

// Recommended
//  Use the dedicated tag property in modern Playwright projects because it separates test names from test categorization.

// Apply tags to an entire test group

test.describe("Login Tests", {
    tag: '@smoke'
}, () => {

    test("Valid Login4", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
    });

    test("Invalid Login1", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
    });

});