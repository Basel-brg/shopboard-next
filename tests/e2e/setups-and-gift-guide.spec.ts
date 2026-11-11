import { test, expect } from '@playwright/test';

test.describe('Desk Setups and Gift Guide Multi-Page Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('navigating to setups page must display setups directory and allow filtering by category', async ({
    page,
  }) => {
    // 1. Click on "بيئات العمل" link in header
    const setupsLink = page.getByRole('link', { name: /بيئات العمل/i }).first();
    await expect(setupsLink).toBeVisible();
    await setupsLink.click();
    await expect(page).toHaveURL(/.*\/setups/);

    // 2. Heading must be visible
    const mainHeading = page.getByRole('heading', {
      name: /بيئات العمل المتكاملة/i,
      level: 1,
    });
    await expect(mainHeading).toBeVisible();

    // 3. Category tab filtering: click on "استوديو الإبداع"
    const creatorTab = page.getByRole('tab', { name: /استوديو الإبداع/i });
    await expect(creatorTab).toBeVisible();
    await creatorTab.click();

    // Must show Creator Studio setup card
    await expect(
      page.getByRole('heading', { name: /أتيليه المصممين وصناع المحتوى/i }),
    ).toBeVisible();
  });

  test('navigating to a setup configurator must calculate dynamic bundle discount when toggling items and add bundle to cart', async ({
    page,
  }) => {
    // 1. Direct navigation to developer station
    await page.goto('/setups/developer-station');
    await expect(page).toHaveURL(/.*\/setups\/developer-station/);

    // 2. Verify setup details heading and bundle discount badge
    const title = page.getByRole('heading', { name: /محطة المطور الخارقة/i, level: 1 });
    await expect(title).toBeVisible();
    await expect(page.getByText(/خصم الحزمة.*15%/i).first()).toBeVisible();

    // 3. Click add bundle to cart button
    const addBundleButton = page.getByRole('button', {
      name: /إضافة الحزمة.*إلى السلة/i,
    });
    await expect(addBundleButton).toBeVisible();
    await addBundleButton.click();

    // 4. Navigate to cart and verify items were added
    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();
    await expect(page).toHaveURL(/.*\/cart/);

    // Cart order summary should reflect added items
    await expect(page.getByText(/ملخص الطلب/i)).toBeVisible();
  });

  test('navigating to gift guide must filter items by budget tier and allow 1-click gift addition to cart', async ({
    page,
  }) => {
    // 1. Navigate to /gift-guide
    const giftGuideLink = page.getByRole('link', { name: /دليل الهدايا/i }).first();
    await giftGuideLink.click();
    await expect(page).toHaveURL(/.*\/gift-guide/);

    // 2. Verify main heading
    const heading = page.getByRole('heading', {
      name: /دليل هدايا المكاتب الفاخرة/i,
      level: 1,
    });
    await expect(heading).toBeVisible();

    // 3. Filter by budget tier: "أقل من 200 ر.س"
    const under200Button = page.getByRole('button', { name: /أقل من 200 ر\.س/i });
    await under200Button.click();

    // 4. Click on 1-click gift addition button
    const addGiftButton = page.getByRole('button', { name: /أضف إلى السلة كهدية/i }).first();
    await expect(addGiftButton).toBeVisible();
    await addGiftButton.click();

    // Must show confirmation state
    await expect(page.getByText(/تمت الإضافة للسلة/i).first()).toBeVisible();
  });
});
