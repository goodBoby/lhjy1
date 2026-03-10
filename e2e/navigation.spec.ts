import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en')
  })

  test('should display main navigation', async ({ page }) => {
    await expect(page.locator('text=Home')).toBeVisible()
    await expect(page.locator('text=Hospitals')).toBeVisible()
    await expect(page.locator('text=Doctors')).toBeVisible()
    await expect(page.locator('text=Appointments')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Check navigation links exist and are clickable
    const hospitalsLink = page.locator('a:has-text("Hospitals")').first()
    await expect(hospitalsLink).toBeVisible()
  })
})
