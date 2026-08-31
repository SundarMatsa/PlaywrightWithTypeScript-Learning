import {test, expect, Locator} from "@playwright/test"

test("Verify Playwright Locators", async ({page}) => {
    // await page.goto("https://demoqa.com/");
    // const logo:Locator = page.getByAltText("nopCommerce demo store")
    // // logo.click()
    // await expect(logo).toBeVisible();

    // await expect(page.getByText("Welcome to our store")).toBeVisible(); // full string/ full text

    // await expect(page.getByText("Welcome to")).toBeVisible(); // partial string/partial text/substring

    // await expect(page.getByText("/Welcome\s+To\s+Our+\s+Store/i")).toBeVisible(); // regular expression -  i - ignores the case-sensitivity.
    

    // 2. getByRole():
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

     await expect(page.getByRole('heading', {name : 'Login'})).toBeVisible();

     const headingText : string = await page.getByRole('heading', {name:'Login'}).innerText(); // to retrieve the text

    const login : string | null = await page.getByRole('heading', {name:'Login'}).textContent();  //to retrieve the text from an element - return type is string | null.

     console.log(headingText);

    // 3. getByLabel()

    // page.getByLabel("Username").type("Admin"); //depriciated
    // await page.getByLabel("Username").fill("Admin");
    // await page.getByLabel("Password").fill("admin123");
    await page.getByRole("textbox", {name: 'Username'}).fill('Admin');
    await page.getByRole("textbox", {name: 'Password'}).fill('admin123');



})

//  4. getByPlaceHolder() : to locate an input by placeholder.

test("Get by placeHolder", async({page}) => {
    await page.goto("https://demoqa.com/books");

    // await page.getByPlaceholder("Type to search").fill("Java book");
})

test ("CSS locators", async({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input.oxd-input[name='username']").fill("Admin");

    await page.locator("input.oxd-input[name='password']").fill("admin123");

    await page.getByRole("button", {name:"Login"}).click();

    await expect(page.getByRole("heading", {name:"Dashboard"})).toBeVisible();
})