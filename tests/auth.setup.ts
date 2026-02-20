import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Path must match AUTH_FILE in playwright.config.ts
const AUTH_FILE = path.join(__dirname, '.auth/user.json');

// Ensure the directory + a valid placeholder file exist before Playwright
// tries to read storageState (e.g. on a first run or when running a single
// spec directly). The setup test overwrites this with real cookies.
fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }));
}

/**
 * Runs once before any test project that lists 'setup' as a dependency.
 * Logs in through the real UI, then saves the browser cookies so every
 * test starts already authenticated — no repeated login overhead.
 *
 * Required env vars (add to .env.test or your CI secrets):
 *   TEST_EMAIL=your@email.com
 *   TEST_PASSWORD=yourpassword
 */
setup('authenticate', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing TEST_EMAIL or TEST_PASSWORD environment variables.\n' +
      'Create a .env.test file at the project root with these values.',
    );
  }

  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();

  // Redirect away from /login confirms successful authentication
  await page.waitForURL((url) => !url.pathname.includes('/login'), {
    timeout: 15_000,
  });

  // Persist cookies so every browser project can reuse this session
  await page.context().storageState({ path: AUTH_FILE });
});
