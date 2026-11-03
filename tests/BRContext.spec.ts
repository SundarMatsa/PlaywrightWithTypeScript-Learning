import {test, expect, Locator, Page, BrowserContext, chromium, firefox, webkit} from "@playwright/test"

// Browser -> browser context -> pages/tabs

// page : can be tab/window/popups

test("Browser Context Demo", async({context}) => {
    // create new page by using context.
    const page: Page = await context.newPage();

    await page.goto("");
});

test("Browser Demo", async({browser}) => {

    // create context by using browser
    const context : BrowserContext = await browser.newContext();
    // create new page by using context.
    const page: Page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/basic_auth");
});

test("Creating Browser Demo", async() => {

    // create a chrome browser before creating the context
    const browser = await chromium.launch();

    // create a firefox browser before creating the context
    // const browser = await firefox.launch();

    // create a webkit browser before creating the context
    // const browser = await webkit.launch();

    // create context by using browser
    const context : BrowserContext = await browser.newContext();
    // create new page by using context.
    const page: Page = await context.newPage();

    await page.goto("https://ui.vision/demo/webtest/frames/");
});

test("Creating Multiple pages", async() => {

    // create a chrome browser before creating the context
    const browser = await chromium.launch();

    // create context by using browser
    const context : BrowserContext = await browser.newContext();
    // create new page by using context.
    const page1: Page = await context.newPage();
    const page2: Page = await context.newPage();
    console.log("No of pages Created: ", context.pages().length);

    await page1.goto("https://ui.vision/demo/webtest/frames/");

    await expect(page1).toHaveTitle("Frames - Web Automation Test");

    await page2.goto("https://testautomationpractice.blogspot.com/");

    await expect(page2).toHaveTitle("Automation Testing Practice");

    await page1.waitForTimeout(3000);
    await page2.waitForTimeout(3000);
    
});

test("Handle Tabs", async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto("https://testautomationpractice.blogspot.com/");

    const newTab = page1.getByText("New Tab");
    newTab.scrollIntoViewIfNeeded();

    //  below two stmts should go parallely
    // context.waitForEvent('page'); // returns a promise

    // await newTab.click();

    const [page2] = await Promise.all([context.waitForEvent('page'), newTab.click()]);

    const pages = context.pages(); // returns an array
    console.log("No of pages: ", pages.length);
    console.log("Parent page Title: ",await pages[0].title());
    await expect(page1).toHaveTitle(await pages[0].title());
    console.log("Child page Title: ",await pages[1].title());
    await expect(page2).toHaveTitle(await pages[1].title());

    await page1.waitForTimeout(3000);
});

test("Handle PopUps", async({browser}) => {
    const context = await browser.newContext();

    const page = await context.newPage();

    page.goto("https://testautomationpractice.blogspot.com/");

    const popUP = page.locator("#PopUp");

    popUP.scrollIntoViewIfNeeded();

    Promise.all([page.waitForEvent('popup'), await popUP.click()]);

    const allpopups = context.pages();
    console.log("Number of pages", allpopups.length);

    console.log(allpopups[2].url());

    for (const pw of allpopups) {
        const title = await pw.title();
        if (title.includes('Playwright')) {
            await pw.locator('.getStarted_Sjon').click();
            await page.waitForTimeout(3000);
            await pw.close();
            console.log("popup closed")
        }
    }




    await page.waitForTimeout(3000);
});

test("Handle authenticated PopUps", async({browser}) => {
    const context = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});

    const page = await context.newPage();

// approach 1 - pass the credientials along with url directly

    // https://username:password@the-internet.herokuapp.com/basic_auth
    // page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    // approach 2 - pass the credients along with browser context
    page.goto("https://the-internet.herokuapp.com/basic_auth");

    await page.waitForLoadState(); // waits for page is loaded completely

    await page.waitForTimeout(3000);

    const locator = page.locator('text=Congratulations');
    await expect(locator).toBeVisible();

    const authText = locator.textContent();

    await page.waitForTimeout(3000);
});