import {test, expect} from "@playwright/test";

test('Auto-Waiting and Forcing', async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    // assertions
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");

    await expect(page.locator('text=Welcome to our store')).toBeVisible();

    // await page.locator('input[value="Search store"]').fill('Motorola Edge 70 Fusion');  // search force action

    // force fully performing the action without checking the actionability checks.
    await page.locator('input[value="Search store"]').fill('Laptop', {force:true});

    await page.locator('input[value="Search"]').click();  //clicking on search box - force action.

    // force fully performing the action without checking the actionability checks.
    
    




});