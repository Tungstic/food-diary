import { expect, test } from '@playwright/test';

test('register new user', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
  await page.getByTestId('create-name').fill('testUser');
  await page.getByTestId('create-password').fill('testingWithPlaywright');

  await page.getByRole('button').click();

  await page.waitForURL('http://localhost:3000/profile');
  await expect(page).toHaveURL('http://localhost:3000/profile');
});
