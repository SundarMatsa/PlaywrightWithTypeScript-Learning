import {test, expect} from "@playwright/test";

test("Screenshots Demo", async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    console.log(timestamp);

    // capture the SS of the page (it will screenshots folder if not available)
    await page.screenshot({path: `ScreenShots/HomePage${timestamp}.png`});

    // capture full page
    await page.screenshot({path: `ScreenShots/FullPage${timestamp}.png`, fullPage:true});

    // capture particular element screenshot
    const logo = page.locator(".product-grid");
    await logo.screenshot({path: `ScreenShots/Products${timestamp}.png`})
    await page.waitForTimeout(3000);

    // you can configure screenshots as default in config file. check implementaiton in playwright.config.ts file.

});

test.only("Screenshots from config", async({page}) => {

    await page.goto("https://www.demoblaze.com/");

    await page.locator('text=Laptops').click();
    
    await expect(page.locator('text=Sony vaio 5')).toBeVisible();
    
    await page.waitForTimeout(3000);

});