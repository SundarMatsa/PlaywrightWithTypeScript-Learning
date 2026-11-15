import {test,expect} from "@playwright/test";

// grouping
// command:
// npx playwright test tests/Grouping.spec.ts --grep group1
test.describe('Group1',async() => {

    test("test1", async({}) => {
        console.log("Test1 executed");
    });

    test("test2", async({}) => {
        console.log("Test2 executed");
    });
});

test.describe('Group2',async() => {
    
    test("test3", async({}) => {
        console.log("Test3 executed");
    });

    test("test4", async({}) => {
        console.log("Test4 executed");
    });
});





// by default the tests will execute parallel mode. if you want to make it serial mode, go to config file -> make fullparallel as false.
// fullyParallel: false
