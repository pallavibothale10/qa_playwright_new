import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
        // Optional: set BROWSER_CHANNEL=chrome to use an installed Google Chrome
        channel: process.env.BROWSER_CHANNEL
      }
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://reqres.in',
        extraHTTPHeaders: {
          Accept: 'application/json'
        }
      }
    }
  ]
});
