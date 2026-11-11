import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('playwright-screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'mobile', width: 393, height: 852, isMobile: true, hasTouch: true },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false },
];

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/setups', name: 'setups' },
  { path: '/setups/developer-station', name: 'setup-detail' },
  { path: '/gift-guide', name: 'gift-guide' },
  { path: '/products', name: 'products' },
  { path: '/products/1', name: 'product-detail' },
  { path: '/cart', name: 'cart' },
];

async function capture() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  console.log('Capturing screenshots from http://localhost:3000 ...');

  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        locale: 'ar-SA',
        colorScheme: theme,
      });

      const page = await context.newPage();

      for (const p of PAGES) {
        const url = `http://localhost:3000${p.path}`;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

          // Force dark or light class on html element to ensure exact theme
          await page.evaluate((t) => {
            if (t === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }, theme);

          await page.waitForTimeout(600);

          const filename = `${vp.name}-${p.name}-${theme}.png`;
          const filePath = path.join(SCREENSHOTS_DIR, filename);
          await page.screenshot({ path: filePath, fullPage: false });
          console.log(`Saved: ${filename}`);
        } catch (err) {
          console.error(`Failed ${url} (${vp.name}, ${theme}):`, err.message);
        }
      }
      await context.close();
    }
  }

  await browser.close();
  console.log('Screenshots completed in', SCREENSHOTS_DIR);
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});

