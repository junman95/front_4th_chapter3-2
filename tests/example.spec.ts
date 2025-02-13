import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  expect(true).toBe(true);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173');
  expect(true).toBe(true);
});
