import { expect, test } from '@playwright/test';

test.describe('Starships Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the page successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/StarWarsApp/);
    });

    test('should have starships component in DOM', async ({ page }) => {
        await page.waitForSelector('app-starship', { timeout: 5000 });
        await expect(page.locator('app-starship')).toBeVisible();
    });

    test('should display listing table', async ({ page }) => {
        await page.waitForSelector('app-starship app-listing-table', { timeout: 5000 });
        await expect(page.locator('app-starship app-listing-table').first()).toBeVisible();
    });
}); 