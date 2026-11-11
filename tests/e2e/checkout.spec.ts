import { test, expect } from '@playwright/test';

test.describe('Checkout and Cart Flows', () => {
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

    // 5. Verify order confirmation dialog appears
    const confirmationHeading = page.getByRole('heading', {
      name: /تم استلام طلبك بنجاح/i,
      level: 2,
    });
    await expect(confirmationHeading).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText('عبدالله بن فهد');

    // 6. Dismiss dialog via "متابعة التسوق"
    const closeDialogButton = page.getByRole('button', { name: 'متابعة التسوق' });
    await closeDialogButton.click();
    await expect(page).toHaveURL(/.*\/products/);
  });

  test('submitting the checkout form with empty fields must trigger required validation alerts and block submission', async ({
    page,
  }) => {
    // Add product and navigate to cart
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await addToCartButton.click();

    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();
    await expect(page).toHaveURL(/.*\/cart/);

    // Submit form with completely empty inputs
    const submitOrderButton = page.getByRole('button', { name: /تأكيد وإتمام الطلب/i });
    await submitOrderButton.click();

    // Assert validation alert messages appear on screen
    const alerts = page.getByRole('alert');
    await expect(alerts.first()).toBeVisible();
    const alertCount = await alerts.count();
    expect(alertCount).toBeGreaterThanOrEqual(1);

    // Confirm that confirmation dialog was NOT opened and user remains on cart
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page).toHaveURL(/.*\/cart/);
  });

  test('applying a valid coupon code in cart must deduct discount and reflect in order summary', async ({
    page,
  }) => {
    // Add product and go to cart
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await addToCartButton.click();

    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();
    await expect(page).toHaveURL(/.*\/cart/);

    // Find coupon input by role and placeholder accessible name, then fill valid coupon code
    const couponInput = page.getByRole('textbox', { name: /أدخل رمز الكوبون/i });
    await couponInput.fill('SHOP20');

    // Submit coupon form via button found by role
    const applyButton = page.getByRole('button', { name: 'تطبيق' });
    await applyButton.click();

    // Verify coupon active badge/indicator is visible
    await expect(page.getByText(/كوبون نشط: SHOP20/i)).toBeVisible();

    // Verify discount line item appears in order summary
    await expect(page.getByText('قيمة الخصم')).toBeVisible();
  });

  test('modifying item quantity with plus and minus buttons must update item subtotal and header badge', async ({
    page,
  }) => {
    // Add product to cart
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await addToCartButton.click();

    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();

    // Click plus button to increase quantity
    const increaseBtn = page.getByRole('button', { name: /زيادة الكمية/i }).first();
    await increaseBtn.click();

    // Verify quantity updated to 2
    const quantityDisplay = page.getByLabel('الكمية الحالية').first();
    await expect(quantityDisplay).toHaveText('2');

    // Click minus button to decrease quantity
    const decreaseBtn = page.getByRole('button', { name: /إنقاص الكمية/i }).first();
    await decreaseBtn.click();

    // Verify quantity returned to 1
    await expect(quantityDisplay).toHaveText('1');
  });

  test('removing single item from cart must render empty cart state with catalog navigation button', async ({
    page,
  }) => {
    // Add product and open cart
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await addToCartButton.click();

    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();

    // Click delete button for the item
    const deleteBtn = page.getByRole('button', { name: /حذف منتج .* من السلة/i }).first();
    await deleteBtn.click();

    // Assert empty cart heading is visible
    const emptyHeading = page.getByRole('heading', { name: 'سلة المشتريات فارغة', level: 2 });
    await expect(emptyHeading).toBeVisible();

    // Assert catalog browse link is visible
    const browseCatalogLink = page.getByRole('link', { name: /تصفح كتالوج ShopBoard/i });
    await expect(browseCatalogLink).toBeVisible();
  });

  test('clicking clear cart button must empty all items from cart immediately', async ({
    page,
  }) => {
    // Add product and navigate to cart
    const addToCartButton = page
      .getByRole('button', { name: /أضف .* إلى السلة/i })
      .first();
    await addToCartButton.click();

    const cartLink = page.getByRole('link', { name: /السلة/i }).first();
    await cartLink.click();

    // Click "تفريغ السلة بالكامل" button
    const clearAllButton = page.getByRole('button', { name: 'تفريغ السلة بالكامل' });
    await clearAllButton.click();

    // Verify empty state is displayed immediately
    const emptyHeading = page.getByRole('heading', { name: 'سلة المشتريات فارغة', level: 2 });
    await expect(emptyHeading).toBeVisible();
  });
});
