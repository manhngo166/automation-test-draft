import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,
  use: {
    baseURL: 'https://blog-five-pink-87.vercel.app/',
    headless: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
