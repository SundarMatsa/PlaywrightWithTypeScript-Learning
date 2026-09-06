import {test, expect, Locator} from "@playwright/test"

test("Auto Suggest DropDown", async({page}) => {
    await page.goto("https://www.flipkart.com/");

    const loginPopup : Locator = page.locator(".b3wTlE");

    if (await loginPopup.isEnabled()) {
        await loginPopup.click();
    }

    const searchInput = page.locator("form.header-form-search input[name='q']")

    await searchInput.fill("Iphone 15");

    await page.waitForTimeout(1000);

    const searchedList: Locator = page.locator("ul>li");
    const count = await searchedList.count();
    console.log(count);

    await page.waitForTimeout(3000);

    // caputure nth option
    // console.log(await searchedList.nth(5).innerText());

    // console.log(await searchedList.first().innerText()); // capturing first element.

    // console.log(await searchedList.last().innerText()); // capturing last element.



    // print all suggest options
    for (let i=0; i<count; i++) {
        // console.log(await searchedList.nth(i).innerText());
        const text = await searchedList.nth(i).innerText();
        if (text === 'iphone 15 5g') {
            await searchedList.nth(i).click();
            break;
        }
        // console.log(await searchedList.nth(i).textContent());
    }

    const searchedText : string[] = await searchedList.allTextContents();
    // console.log(searchedText);

    const matchedText : string | undefined = searchedText.find(text => text === 'iphone 15 5g');
    console.log(matchedText);

})

test("hidden dropdowns", async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");

    await page.locator("input[name='username']").fill("Admin");

    await page.locator("input[name='password']").fill("admin123");

    await page.locator("button[type='submit']").click();

    await page.getByText("PIM").click();
    await page.waitForTimeout(1000);

    await page.locator('form i').nth(2).click();

    const options:Locator= page.locator("div[role='listbox'] span");

    const count : number = await options.count();
    console.log(count);

    console.log("all text content: ", await options.allTextContents());

    for (let i=0; i<count; i++) {
        const text : string = await options.nth(i).innerText();
        if (text==='Automaton Tester') {
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(3000);
})