import { expect, test } from '@playwright/test';

test.describe('Listing Table Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display table component', async ({ page }) => {
        await page.waitForSelector('app-starship app-listing-table', { timeout: 5000 });
        await expect(page.locator('app-starship app-listing-table').first()).toBeVisible();
    });

    test('should have table structure', async ({ page }) => {
        await page.waitForSelector('app-starship app-listing-table table', { timeout: 5000 });
        await expect(page.locator('app-starship app-listing-table table').first()).toBeVisible();
    });

    test('should load without errors', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await expect(page.locator('app-starship app-listing-table').first()).toBeVisible();
    });
}); 