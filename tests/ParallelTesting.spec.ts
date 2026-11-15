import {test, expect} from "@playwright/test";

// to run a specific set of test in serial or parallel mode 

test.describe.configure({mode:'serial'});
// test.describe.configure({mode:'parallel'});


test.describe('group1', () => {

    test("test1", async({page}) => {
       console.log("This is test1........") 
    });

    test("test2", async({page}) => {
       console.log("This is test2........") 
    });

    test("test3", async({page}) => {
       console.log("This is test3........") 
    });

    test("test4", async({page}) => {
       console.log("This is test4........") 
    });

    test("test5", async({page}) => {
       console.log("This is test5........") 
    });

});

// to run the tests by specing the workers through commands 
// npx playwright test test/ParallelTesting.spec.ts --workers 4 
// or 
// npx playwright test test/ParallelTesting.spec.ts --workers=4

// if number of workers is 1 then tests will run serial mode only if you make parallel as true 

