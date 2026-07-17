import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['line']],
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    serviceWorkers: 'allow',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1 --directory /Users/yoshida/Documents/Codex/2026-07-16/quai',
    url: 'http://127.0.0.1:4173/Lumon/index.htm',
    reuseExistingServer: false,
    timeout: 20_000,
  },
});
