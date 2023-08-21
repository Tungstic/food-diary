import { expect, test } from '@playwright/test';

test('make new entry without symptoms', async ({ page }) => {
  await page.goto('http://localhost:3000/new');

  await page.getByTestId('enter-meal-name').click();
  await page.getByTestId('enter-meal-name').fill('hello');
  await page.getByTestId('enter-meal-name').press('Tab');

  // the locator for react-select written by Playwright Codegen because of shadow DOM
  // aware that css locator is not ideal
  await page.locator('.css-qbdosj-Input').first().click();
  await page.getByText('avocado', { exact: true }).click();
  await page.getByTestId('save-entry-button').click();
  await page.getByTestId('save-entry-button').click();

  await page.waitForURL('http://localhost:3000');
  await expect(page).toHaveURL('http://localhost:3000');
});
