import {test, expect, Locator} from "@playwright/test";

test("Handle simple Dialog", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    // enable/register a dialog handler
    page.on('dialog', (dialog) => {
        console.log('Dialog type is :', dialog.type()); // returns the type of the alert.
        expect(dialog.type()).toContain('alert');
        console.log('Dialog Text:', dialog.message()); // returns the message from dialog.
        expect(dialog.message()).toContain("I am an alert box!");

        dialog.accept();
    });

    await page.locator("#alertBtn").click();

    await page.waitForTimeout(3000);
});

test("Handle confirmation Dialog", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    // enable/register a dialog handler
    page.on('dialog', (dialog) => {
        console.log('Dialog type is :', dialog.type()); // returns the type of the alert.
        expect(dialog.type()).toContain('confirm');
        console.log('Dialog Text:', dialog.message()); // returns the message from dialog.
        expect(dialog.message()).toContain("Press a button!");

        // dialog.accept();
        dialog.dismiss();
    });

    await page.locator("#confirmBtn").click();

    const confirmText : string = await page.locator("#demo").innerText();

    expect(confirmText).toContain("Cancel");

    await page.waitForTimeout(3000);
});

test("Handle Prompt Dialog", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    // enable/register a dialog handler
    page.on('dialog', (dialog) => {
        console.log('Dialog type is :', dialog.type()); // returns the type of the alert.
        expect(dialog.type()).toContain('prompt');
        console.log('Dialog Text:', dialog.message()); // returns the message from dialog.
        expect(dialog.message()).toContain("Please enter your name:");
        console.log('Default value: ', dialog.defaultValue());
        expect(dialog.defaultValue()).toContain("Harry Potter");

        dialog.accept("Sundar"); // to pass the input value in alert box. this is allow with accept only
        // dialog.dismiss();
    });

    await page.locator("#promptBtn").click();

    const confirmText : string = await page.locator("#demo").innerText();

    expect(confirmText).toContain("Sundar");

    await page.waitForTimeout(3000);
});