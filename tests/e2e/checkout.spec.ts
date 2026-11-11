import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('completing the checkout form must successfully submit the order and display order confirmation', async ({
    page,
  }) => {
    // 1. Locate and click "Add to cart" button by its accessible role and label
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // 2. Navigate to the Cart page via the accessible header navigation link
    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();
    await expect(page).toHaveURL(/.*\/cart/);

    // 3. Fill in the checkout details using form fields found strictly by their label or role
    const nameField = page.getByLabel(/الاسم الثلاثي/i);
    await expect(nameField).toBeVisible();
    await nameField.fill('عبدالله بن فهد');

    const phoneField = page.getByLabel(/رقم الجوال للتواصل/i);
    await phoneField.fill('0501234567');

    const addressField = page.getByLabel(/المدينة والعنوان التفصيلي/i);
    await addressField.fill('الرياض، حي الياسمين، شارع أنس بن مالك');

    const paymentSelect = page.getByRole('combobox', { name: /وسيلة الدفع المفضلة/i });
    await paymentSelect.selectOption('cod');

    // 4. Submit order using the button located by its accessible role and label
    const submitOrderButton = page.getByRole('button', { name: /تأكيد وإتمام الطلب/i });
    await submitOrderButton.click();

    // 5. Verify successful navigation to orders page and order confirmation dialog
    await expect(page).toHaveURL(/.*\/orders/);

    const confirmationHeading = page.getByRole('heading', {
      name: /تم استلام طلبك بنجاح/i,
      level: 2,
    });
    await expect(confirmationHeading).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('عبدالله بن فهد');

    // 6. Dismiss dialog and verify orders page heading
    const closeDialogButton = page.getByRole('button', { name: /إغلاق/i });
    await closeDialogButton.click();

    const ordersHeading = page.getByRole('heading', { name: /سجل طلباتي/i, level: 1 });
    await expect(ordersHeading).toBeVisible();
  });
});
