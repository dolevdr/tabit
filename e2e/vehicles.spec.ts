import { expect, test } from '@playwright/test';

test.describe('Vehicles Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the page successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/StarWarsApp/);
    });

    test('should have tabview structure', async ({ page }) => {
        await page.waitForSelector('p-tabview', { timeout: 5000 });
        await expect(page.locator('p-tabview')).toBeVisible();
    });

    test('should have starships component visible', async ({ page }) => {
        await page.waitForSelector('app-starship', { timeout: 5000 });
        await expect(page.locator('app-starship')).toBeVisible();
    });
}); 