import { Browser, chromium, expect, Page } from '@playwright/test';

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.getByTestId('pleaseloginalready').click();
  await page.waitForURL('http://localhost:3000/login');
  await expect(page).toHaveURL('http://localhost:3000/login');
  await page.getByTestId('login-name').fill('Ross');
  await page.getByTestId('login-password').fill('Thompson');

  await page.getByRole('button').click();

  await page.waitForURL('http://localhost:3000');
  await expect(page).toHaveURL('http://localhost:3000');
  await expect(page.getByText('Ross')).toBeVisible();

  // save the state of being logged in
  await page.context().storageState({ path: './.auth/login.json' });
}

export default globalSetup;
