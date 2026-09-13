import {test, Expect, Locator} from "@playwright/test";

test("Comparing Methods", async({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    const productTitle : Locator = page.locator('.product-title')

    // innerText() vs textContent()
    // console.log(await productTitle.nth(1).innerText()); // only returns the text content of the element.
    // console.log(await productTitle.nth(1).textContent()); // it return text along with spaces, break stmts and hidden element texts also.

    const count : number = await productTitle.count();

    for (let i=0; i<count; i++) {
        // console.log(await productTitle.nth(i).textContent());
    }


    // allInnerTexts() vs allTextContents()

    // const productNames : string[] = await productTitle.allInnerTexts();

    const productNames : string[] = await productTitle.allTextContents();

    const p : string[] = productNames.map(ele=>ele?.trim());

    // console.log(productNames);
    // console.log("after trim");
    // console.log(p);

    // all() -> is a Locator method used to get all matching elements as an array of Locator objects.

    const prodLoc : Locator[] = await productTitle.all();
    // console.log(prodLoc);

    for (const prd of prodLoc) {
        console.log(await prd.innerText());
    }

});