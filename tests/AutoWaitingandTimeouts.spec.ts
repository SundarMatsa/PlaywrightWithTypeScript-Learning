import {test, expect} from "@playwright/test";

test('Auto-Waiting and Forcing', async ({page}) => {
    
    // to change the timeout for local (only for one test).
    // test.setTimeout(5000);
    test.slow();  // to mark the test as slow and increase the timeout for this test(makes 3x slow than default timer).

    await page.goto("https://demowebshop.tricentis.com/");

    // assertions
    // Expect timeouts
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/", {timeout:5000});  // to change the timeout for local (only for one test).

    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:5000});

    // await page.locator('input[value="Search store"]').fill('Motorola Edge 70 Fusion');  // search force action

    // force fully performing the action without checking the actionability checks.
    await page.locator('input[value="Search store"]').fill('Laptop', {force:true});

    await page.locator('input[value="Search"]').click({force:true});  //clicking on search box - force action.

    // force fully performing the action without checking the actionability checks.
    

});
