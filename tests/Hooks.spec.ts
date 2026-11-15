import {test} from "@playwright/test";

test.beforeAll('Before all', async() => {
    console.log("This is Before all test");
});

test.afterAll('After All', async() => {
    console.log("This is After All test");
});

test.beforeEach('Before each', async() => {
    console.log("This is Before each Test");
});

test.afterEach('After each', async() => {
    console.log("This is After each test");
});

test("test1", async({}) => {
    console.log("Test1 executed");
});

test("test2", async({}) => {
    console.log("Test2 executed");
});

test("test3", async({}) => {
    console.log("Test3 executed");
});

test("test4", async({}) => {
    console.log("Test4 executed");
});