import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('moto edge 70 fusion screen gaurd');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).press('Enter');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('moto edge 70 fusion screen gaurd');
  await page.getByRole('link', { name: 'moto edge 70 fusion matte screen guard in Screen Guards' }).click();
  await page.locator('.ybaCDx').first().click();
  await page.getByText('Type').click();
  await page.locator('.ybaCDx').first().click();
  await page.getByText('Type').click();
  await page.locator('.ybaCDx').first().click();
  await page.getByRole('combobox').nth(1).selectOption('500');
  await page.goto('https://www.flipkart.com/search?q=moto+edge+70+fusion+matte+screen+guard&sid=tyy%2C4mr%2Clrv&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_32_sc_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_32_sc_na_na&as-pos=1&as-type=RECENT&suggestionId=moto+edge+70+fusion+matte+screen+guard%7CScreen+Guards&requestId=5a672f40-9e7b-4a1e-89db-dee8005a6325&as-searchtext=moto+edge+70+fusion+matte+screen+guard&p%5B%5D=facets.rating%255B%255D%3D4%25E2%2598%2585%2B%2526%2Babove&p%5B%5D=facets.type%255B%255D%3DEdge%2BTo%2BEdge%2BTempered%2BGlass&p%5B%5D=facets.type%255B%255D%3DEdge%2BTo%2BEdge%2BScreen%2BGuard&p%5B%5D=facets.price_range.from%3DMin&p%5B%5D=facets.price_range.to%3D500');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'FIRST MART Edge To Edge' }).nth(1).click();
  const page1 = await page1Promise;
  await page1.locator('._1psv1zeb9._1psv1ze0._1psv1zeku > div > div > div:nth-child(2)').first().click();
  await page1.getByRole('link', { name: 'Cart 1 Cart' }).click();
  await page1.locator('.css-g5y9jx.r-14lw9ot').first().click();

  await page.waitForTimeout(3000);
});