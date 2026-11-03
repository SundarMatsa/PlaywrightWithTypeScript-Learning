import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('button', { name: '✕' }).click();
  await expect(page.locator('._1psv1zeb9._1psv1ze0._1psv1ze9x')).toBeVisible();
  await page.getByRole('link', { name: 'Login', description: 'Login' }).click();
  await expect(page.locator('#container')).toMatchAriaSnapshot(`
    - text: Login
    - paragraph: Login to access your orders, exclusive offers, rewards and recommendations
    `);
  await expect(page.locator('#container')).toMatchAriaSnapshot(`
    - text: Log in for the best experience Enter your phone number to continue
    - button /\\+\\d+/:
      - text: ""
      - img
    - spinbutton "Phone Number"
    - text: Phone Number
    - paragraph
    - paragraph
    - text: Use Email-ID
    - button "Continue" [disabled]
    `);
  await page.getByRole('link', { name: 'Minutes Minutes Everything in' }).click();
  await page.goto('https://www.flipkart.com/hyperlocal-preview-page?marketplace=HYPERLOCAL&originalUrl=%2Fflipkart-minutes-store%3Fmarketplace%3DHYPERLOCAL');
  await expect(page.locator('#msite-bottomsheet')).toContainText('Select delivery address');
  await page.locator('svg').first().click();
  await page.locator('div:nth-child(7) > .css-g5y9jx.r-13awgt0.r-eqz5dr > div > div > .css-g5y9jx.r-1oox17p > div:nth-child(3) > div > div > a').click();
  await expect(page.locator('.jCH_7O')).toBeVisible();
  await expect(page.locator('#msite-bottomsheet')).toMatchAriaSnapshot(`
    - text: Select delivery address
    - img
    - img
    - textbox "Search by area, street name, pin code"
    - img
    - text: Use my current location Allow access to location - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Saved addresses
    - img
    - text: Login to see saved addresses
    `);

await page.waitForTimeout(3000);

});