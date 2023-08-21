import { expect, test } from '@playwright/test';

test('test auth setup', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await expect(page.getByText('Ross')).toBeVisible();
});
