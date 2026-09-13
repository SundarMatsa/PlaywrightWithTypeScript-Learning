import {test, expect, Locator} from "@playwright/test"

test("Handle static web table", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table : Locator = page.locator("[name='BookTable'] tbody");

    await expect(table).toBeVisible();

    // Count no of rows

    const rows : Locator = table.locator("tr"); //chaining of locators

    // console.log(rows);

    await expect(rows).toHaveCount(7);

    const rowCount :number = await rows.count();

    expect(rowCount).toBe(7);

    // count no of headers/columns

    const columns : Locator = rows.locator("th"); // chaining of locators
    await expect(columns).toHaveCount(4);
    const colCount = await columns.count();
    // console.log(colCount);
    expect(colCount).toBe(4);

// Read data from 2nd row
    const secRowCols : Locator = rows.nth(2).locator("td");

    const secRowData : string[] = await secRowCols.allInnerTexts();

    // console.log(secRowData);

// Read all data from the table expect headers

    const rowarr : Locator[] = await rows.all();

    // for (let r of rowarr.slice(1)) {
    //     const colsData = await r.locator("td").allInnerTexts();
    //     console.log(colsData);
    // }

    // print book names where author is mukesh
    for (let r of rowarr.slice(1)) {
        const cells = await r.locator('td').allInnerTexts();
        const author = cells[1];
        const book = cells[0];
        console.log(`this ${book} book was written by ${author}`);
    }
});

test("Handle Dynamic Table", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table : Locator = page.locator("#taskTable tbody");

    table.scrollIntoViewIfNeeded();

    await expect(table).toBeVisible();

    // Capture chrome processor
    
    const rows: Locator[] = await table.locator("tr").all();

    const count : number = rows.length;

    console.log(count);
    let cpu = "";
    for (let row of rows) {
        const name : string = await row.locator("td").first().innerText();
        if (name === 'Chrome') {
            // cpu = await row.locator('td : has-text("%")').innerText(); // css syntax
            cpu = await row.locator('td', {hasText:'%'}).innerText(); // playwright text.
            console.log(cpu);
            break;
        }
    }

    // compare cpu values

    const cpuLoad = await page.locator("strong.chrome-cpu").innerText();

    console.log(cpuLoad);

    expect(cpu).toContain(cpuLoad);

    await page.waitForTimeout(2000);

});

test("Handle pagination tables", async({page}) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    let has_morePages : boolean = true;
    let count : number = 0;

    while(has_morePages) {
        const table_Rows : Locator[] = await page.locator("#example tbody tr").all();

        for (let row of table_Rows) {
            console.log(await row.innerText());
        }

        const nextBtn : Locator = page.locator("[aria-label='Next']");

        if (await nextBtn.isDisabled()) {
           has_morePages = false; 
        }
        count++;
        if (has_morePages) {
            await nextBtn.click();
        }

    }
    console.log(count);

});

test("filter the rows and check the rows count", async({page}) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    const selectDropDwn : Locator = page.locator("select.dt-input");

    await selectDropDwn.selectOption({index : 3});

    const noOfRows : number = Number(await selectDropDwn.inputValue()); // 1. convert string into number

    // const noOfRows : number = parseInt(await selectDropDwn.innerText()); // 2. convert string into number

    // parseFloat(string); 3. convert string into number
    // +string; 4. convert string into number
    console.log(noOfRows);

    const rows : Locator[] = await page.locator(".example tbody tr").all();

    const rowsLen : number = rows.length;

    console.log(rowsLen);

    expect(rowsLen).toBeLessThanOrEqual(noOfRows);

    for (let row of rows) {
        console.log(await row.innerText());
    }

    await page.waitForTimeout(3000);
});

test.only("search for specific data in a table", async({page}) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    await page.locator("#dt-search-0").fill("Web Developer");

    const rows : Locator[] = await page.locator(".example tbody tr").all();

    const rowsLen : number = rows.length;

    let has_moreRows : boolean = true;

    while(has_moreRows && rowsLen >= 1) {
        for (let row of rows) {
            console.log(await row.innerText());
        }

        const nextBtn : Locator = page.locator("button[aria-label='Next']");

        if (await nextBtn.isDisabled()) {
            has_moreRows = false;
        } else {
            await nextBtn.click();
        }
    }
    
    await page.waitForTimeout(3000);
});