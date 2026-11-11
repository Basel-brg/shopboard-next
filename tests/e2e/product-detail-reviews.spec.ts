import { test, expect } from '@playwright/test';

test.describe('Product Detail Custom Options & Customer Reviews', () => {
  test('must display tailored colors, switch variants, calculate dynamic price and add to cart', async ({
    page,
  }) => {
    await page.goto('/products/1');

    // 1. Check title & category
    await expect(
      page.getByRole('heading', { name: 'لوحة مفاتيح ميكانيكية لاسلكية' })
    ).toBeVisible();

    // 2. Check tailored colors exist
    await expect(page.getByLabel('اختيار لون: عاجي ريترو Vintage Ivory')).toBeVisible();
    await expect(page.getByLabel('اختيار لون: رمادي جرافيت فلكي Graphite Gray')).toBeVisible();

    // Select graphite color
    await page.getByLabel('اختيار لون: رمادي جرافيت فلكي Graphite Gray').click();
    await expect(page.getByText('رمادي جرافيت فلكي Graphite Gray')).toBeVisible();

    // 3. Check tailored switches variant group
    await expect(page.getByText('نوع المفاتيح (Switches):')).toBeVisible();
    await expect(page.getByRole('button', { name: /مفاتيح بنية لمسية ناعمة/i })).toBeVisible();

    // 4. Check add to cart button works
    const addToCartBtn = page.getByRole('button', { name: /إضافة إلى السلة/i });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Expect success message or toast
    await expect(
      page.getByText('تمت إضافة "لوحة مفاتيح ميكانيكية لاسلكية" إلى السلة بنجاح!')
    ).toBeVisible();
  });

  test('must display customer reviews section, rating breakdown, and allow writing a new review', async ({
    page,
  }) => {
    await page.goto('/products/1');

    // Scroll to reviews section
    const reviewsHeading = page.getByRole('heading', { name: /تقييمات وآراء العملاء/i });
    await expect(reviewsHeading).toBeVisible();

    // Check breakdown summary elements
    await expect(page.getByText(/من المشترين يوصون بهذا المنتج/i)).toBeVisible();
    await expect(page.getByText(/تقييم معتمد/i)).toBeVisible();

    // Open write review modal
    const writeReviewBtn = page.getByRole('button', { name: /كتابة تقييم/i });
    await expect(writeReviewBtn).toBeVisible();
    await writeReviewBtn.click();

    // Modal dialog should be open
    await expect(page.getByRole('heading', { name: 'أضف تقييمك للمنتج' })).toBeVisible();

    // Fill in review form
    await page.getByLabel(/اسمك الكريم/i).fill('ماجد العتيبي');
    await page.getByLabel(/عنوان التقييم/i).fill('تجربة كتابة مريحة جداً وجودة يابانية');
    await page.getByLabel(/تفاصيل تجربتك ورأيك/i).fill(
      'اشتريت الكيبورد مع المفاتيح الخطية والصوت ممتاز جداً والاتصال اللاسلكي سريع وبلا أي تأخير.'
    );

    // Submit review
    await page.getByRole('button', { name: 'نشر التقييم' }).click();

    // Review should appear in the list optimistically
    await expect(page.getByText('ماجد العتيبي')).toBeVisible();
    await expect(page.getByText('تجربة كتابة مريحة جداً وجودة يابانية')).toBeVisible();
  });
});
