import {test, expect} from '@playwright/test';
test("Hard vs Soft Assertions", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    // // Hard assertions (if any assertion got failed, it will not execute remaining statements)
    // await expect(page).toHaveTitle("Demo Web Shop");
    // await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    // const logoLoc = page.locator("div[class='header-logo']");

    // await expect(logoLoc).toBeVisible();

    // Soft assertions (if any assertion got failed, it will execute remaining statements also)
    await expect.soft(page).toHaveTitle("Demo Web Shop22");
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");
    
    const logoLoc = page.locator("div[class='header-logo']");

    await expect.soft(logoLoc).toBeVisible();

    await page.waitForTimeout(3000);

});