
// Sundar01 test@123
/*

open app - beforeall
    login - beforeeach
        find products
    logout - aftereach
    
    login - beforeeach
        add product to cart
    logout - aftereach
    
close app - afterall 

*/
import {test, expect, Page} from "@playwright/test";

let page : Page;
const userName = 'Sundar01';
const password = 'test@123';
test.beforeAll("Open app", async({browser}) => {
    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/");
});

test.afterAll("Close app", async() => {
    await page.close();
});

test.beforeEach("Login app", async() => {
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill(userName);
    await page.locator("#loginpassword").fill(password);
    await page.locator("button[onclick='logIn()']").click();
    await expect(page.locator(`text=Welcome ${userName}`)).toBeVisible();
    await page.waitForTimeout(2000);
});

test.afterEach("LogOut app", async() => {
    const logoutButton = page.locator("#logout2");
    if (await logoutButton.isVisible()) {
        await logoutButton.click();
        await expect(page.locator("#login2")).toBeVisible();
    }
});

test("Find no of products", async() => {
    const products = page.locator(".col-lg-4");
    const productcount = await products.count();
    console.log("Product count is: ", productcount);
    expect(products).toHaveCount(11);
});

test("add product to cart", async() => {
    await page.locator("text=Iphone 6 32gb").click();

    page.once('dialog', async(dialog) => {
        expect(dialog.message()).toContain("Product added");
        await dialog.accept();
    });

    await page.locator("text=Add to cart").click();
});