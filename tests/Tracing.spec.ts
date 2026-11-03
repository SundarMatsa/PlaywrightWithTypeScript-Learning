import {test, expect} from "@playwright/test";

test("Tracing test", async({page, context}) => {
    // 3 ways to create trace file
    // -----------------------
    // 1) using playwright.config.ts

    // 3) code programatically
    // to start the trace manually
    context.tracing.start({
        screenshots: true,
        snapshots: true,
    })

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('input[name="password"]').fill("admin123");

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.orangehrm-upgrade-link')).toBeVisible();

    await page.locator(".oxd-userdropdown").click();

    await expect(page.locator("text=Change Password")).toBeVisible();

    await page.locator("text=Logout").click();

    await page.waitForTimeout(3000);

    // to stop the trace manually. it won't attach the trace file to html report
    context.tracing.stop({
        path:'trace.zip'   
    });

    // to view the trace created manually
    // npx playwright show-trace trace.zip

    // to view the trace online
    // https://trace.playwright.dev/

    // 3) using command
    //  to capture the trace on particular test
    // npx playwright test tests/tracing.spec.ts --headed --trace on

    // reasons for flaky tests:
    //  network issues, server slowness, env issues, timing issues, UI elements loading slowly, etc

});