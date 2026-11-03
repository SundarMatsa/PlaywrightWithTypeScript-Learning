import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 16'],
});

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('link', { name: 'Search for Products' }).click();
  await page.getByRole('link', { name: 'Search for Products' }).click();
  await page.goto('https://www.flipkart.com/?pageUID=1793322423677');
});