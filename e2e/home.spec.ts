import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('ChinaMediGuide')
    await expect(page.locator('text=Medical Services for Foreigners in China')).toBeVisible()
  })

  test('should navigate to language pages', async ({ page }) => {
    await page.goto('/')

    // Test English navigation
    await page.click('text=English')
    await expect(page).toHaveURL('/en')

    // Navigate back to home
    await page.goto('/')

    // Test Chinese navigation
    await page.click('text=中文')
    await expect(page).toHaveURL('/zh')
  })

  test('should display language selector', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=中文')).toBeVisible()
    await expect(page.locator('text=日本語')).toBeVisible()
    await expect(page.locator('text=한국어')).toBeVisible()
  })
})
