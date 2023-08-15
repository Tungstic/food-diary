import { expect, test } from '@playwright/test';

test('login as user Ross', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('login-name').fill('Ross');
  await page.getByTestId('login-password').fill('Thompson');

  await page.getByRole('button').click();

  await page.waitForURL('http://localhost:3000');
  await expect(page).toHaveURL('http://localhost:3000');
  await expect(page.getByText('Ross')).toBeVisible();
});
