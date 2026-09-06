import {test, expect, Locator} from "@playwright/test"

test("Text Input Action", async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Text input

    const nameInput: Locator = page.locator("#name");

    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEnabled();

    const phValue : String | null =await nameInput.getAttribute("placeholder");

    expect(phValue).toBe("Enter Name"); // no need to use await because it won't return any promise. no need to put await for values.

    await nameInput.fill("Sundar");

    // console.log("name: ", await nameInput.textContent()); // textContent will captures the inner text of an element which is present in the DOM.
    // console.log("name: ", await nameInput.innerText());
    const enteredVlue : String | null = await nameInput.inputValue();
    console.log("name: ", enteredVlue); // return the value which we gave in the input element.


    expect(enteredVlue).toBe("Sundar");

    await page.waitForTimeout(3000);
});

test("RadioButton actions", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio : Locator = page.locator("#male");

    // await expect(maleRadio).toBeChecked(); //preferable
    expect(await maleRadio.isChecked()).toBe(false);

    await maleRadio.check();

    expect(await maleRadio.isChecked()).toBe(true);

    await page.waitForTimeout(2000);

});

test("CheckBox actions", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // const sundayCheck : Locator = page.getByLabel("sunday");

    // await sundayCheck.check();

    // expect(await sundayCheck.isChecked()).toBe(true);
    // await expect(sundayCheck).toBeChecked();

    // select all checkboes and assert each is selected

    const days : string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // const daywise : string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    // for (let day of daywise) {
    //     const dayloc : Locator = page.locator(`#${day}`);
    //     let ischecked : boolean = await dayloc.isChecked();

    //     if (!ischecked) {
    //         dayloc.check();
    //         await expect(dayloc).toBeChecked();
    //     }
    // }

    const checkBoxes : Locator[] =days.map(index => page.getByLabel(index));

    expect(checkBoxes.length).toBe(7);

    for (const checkbox of checkBoxes) {
        await checkbox.check();
    }

    // uncheck the last three checkboxes
    for (const checkbox of checkBoxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    // toggle checkboxes: if checked, unchecked: if unchecked, check. assert state flipped.
    for (const checkbox of checkBoxes) {
        // await checkbox.check();
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        } else {
            await checkbox.check();
        }
    }

    await page.waitForTimeout(2000);

});

test("Dropdown actions", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // await page.locator("#country").selectOption('India'); // visible text
    // await page.locator("#country").selectOption({value:'uk'}) // by using value attribute

    // await page.locator("#country").selectOption({label:'India'}) // by using label
    
    await page.locator("#country").selectOption({index:3});  // by using index.

    // check count of the dropdown options
    const dropDownOptions:Locator = page.locator("#country>option");

    await expect(dropDownOptions).toHaveCount(10);

    const optionCount = dropDownOptions.count();

    console.log(optionCount)

    const textcont : string[] =(await dropDownOptions.allTextContents()).map(text=>text.trim()); // returns all text content from multiple elements.
    console.log(textcont);

    expect(textcont).toContain('Japan');

   

    

    await page.waitForTimeout(5000);

});

test.only("Multi Select Dropdown", async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const multiDrop : Locator = page.locator("#colors");

    // await multiDrop.selectOption(['Red', 'Blue', 'Green']);

    // await multiDrop.selectOption(['red', 'white', 'yellow']);
    await multiDrop.scrollIntoViewIfNeeded();

    await multiDrop.selectOption([{label:'Red'}, {label:'White'}, {label:'Yellow'}]);

    const num : number[] = [1,2,3,4,5,6];

    const evennum : number[] = num.filter(n=> n%2===0);

    console.log(evennum);


})


