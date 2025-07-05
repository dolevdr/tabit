import { expect, test } from '@playwright/test';

test.describe('API Integration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load page with API data', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await expect(page.locator('app-starship')).toBeVisible();
    });

    test('should display data from API', async ({ page }) => {
        await page.waitForSelector('app-starship app-listing-table', { timeout: 5000 });
        await expect(page.locator('app-starship app-listing-table').first()).toBeVisible();
    });

    test('should handle API responses', async ({ page }) => {
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('app-starship')).toBeVisible();
    });
}); 