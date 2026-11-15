/*

Types of test annotations
1. test.skip() -> Skip a test
2. test.only() -> Execute only a particular test
3. test.fixme() -> Mark a test as requiring a fix. it skips the test
4. test.fail() -> Expect a test to fail
5. test.slow() -> Triple the test timeout
6. test.setTimeout() -> Change the timeout of a test
7. test.describe() -> Group related tests
8. test.info() -> Access information about the current test

*/

import {test, expect} from "@playwright/test";

// test.only("test1", async({page}) => {
//     await page.goto("https://www.google.com/");
//     await expect(page).toHaveTitle('Google');
// })

test.skip("test2", async({page}) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

// skips the test based on the condition.
test("test3", async({page, browserName}) => {
    test.skip(browserName==='firefox', 'test got failed');
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

// fails the test
test.fail("test4", async({page}) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

test.fixme("test5", async({page}) => {
    await page.goto("https://www.google.com/");
    // no assertion 
})

test("test6", async({page}) => {
    test.slow(); 
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

// test("test7", async({page}) => {
//     await page.goto("https://www.google.com/");
//     await expect(page).toHaveTitle('Google');
// })