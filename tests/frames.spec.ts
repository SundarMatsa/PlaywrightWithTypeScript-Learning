import {test, Expect, Locator, Frame} from "@playwright/test";

test("Handle Frames", async({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    // count no of frames in a page.
    // const frames: Frame[] = page.frames();
    // console.log("no of frames -> ", frames.length);

    // Get frame using the frame's name attribute
    // const frame = page.frame('frame-login');

    // Get frame using frame's URL
    // const frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1" });

    // if (frame) {
        // Interact with the frame
        // await frame.locator('input[name="mytext1"]').fill("John");
        
        // await frame.fill('input[name="mytext1"]', 'John');
    // }

   // Locate element inside frame 
   await page.frameLocator('[src="frame_1.html"]').locator('[name="mytext1"]').fill("Sundar");

    await page.waitForTimeout(3000);
});

test("Handle inner Frames", async({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    // const frame3 = page.frameLocator('[src="frame_3.html"]');
    const frame3 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3'});
    if (frame3) {
        await frame3.locator('[name="mytext3"]').fill("Naidu");

        //capturing all child frames and we can't capture childframe by using framelocator
        const childFrames = frame3.childFrames();
        console.log("child frames count -> ", childFrames.length);
        //frame.parentFrame(); // Get the parent frame
        const radio = childFrames[0].locator('[aria-label="I am a human"]');
        if (!(await radio.isChecked())) {
            await radio.check();
        }
    }
    


    await page.waitForTimeout(3000);
});
