// go to google.com, enter "Upleveled" in the search bar, submit search
// click on the first search result (open Upleveled website)
// click on "Read more" under Web Development Bootcamp
// take a screenshot

import { expect, test } from '@playwright/test';

test('test Playwright skills', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveURL('https://www.google.com/');
  await page.getByRole('button', { name: 'Alle akzeptieren' }).click();
  await expect(page.getByTitle('Suche')).toBeVisible();

  await page.getByTitle('Suche').fill('Upleveled');
  await page.getByRole('button', { name: 'Google Suche' }).click();

  await page
    .getByRole('link', { name: 'UpLeveled: Learn to Code in Vienna' })
    .click();

  await page.waitForURL('https://upleveled.io/');
  await expect(page).toHaveURL('https://upleveled.io/');
  await page
    .getByRole('link', { name: 'Read more about the Web Development Bootcamp' })
    .click();
  await page.waitForURL('https://upleveled.io/web-development-bootcamp');
  await page.screenshot({ path: 'screenshot.png' });
});
