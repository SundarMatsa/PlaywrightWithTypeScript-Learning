import {test, expect} from "@playwright/test";

test("Handle Flaky Test", async({page}) => {

    // reasons for flaky tests:
    //  network issues, server slowness, env issues, timing issues, UI elements loading slowly, etc
    // to enable retry:
    // add 'retries:3' on config file.
   
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('input[name="password"]').fill("admin123");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.orangehrm-upgrade-link')).toBeVisible();

    await page.waitForTimeout(8000);

    await page.locator(".oxd-userdropdown").click();

    await expect(page.locator("text=Change Password")).toBeVisible();

    await page.locator("text=Logout").click();

    await page.waitForTimeout(3000);


});