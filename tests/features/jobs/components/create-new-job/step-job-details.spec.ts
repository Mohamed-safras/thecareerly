import { test, expect, type Page } from '@playwright/test';

// TEST_ORG_ID must be set in .env.test — it is the organizationId of the test account.
const PAGE_URL = `/organization/${process.env.TEST_ORG_ID}/jobs/create`;

/**
 * Navigates from step 1 (Mode Selection) to step 2 (Job Details).
 */
async function goToJobDetailsStep(page: Page) {
  await page.goto(PAGE_URL);
  // Wait for step 1 content — confirms ProtectedClientShell auth check is done
  // and the form has fully rendered before we interact with it.
  await expect(page.getByText('How would you like to start?')).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Job details')).toBeVisible();
}

/** Opens a Radix Select by id and picks the first available option. */
async function selectFirstOption(page: Page, triggerId: string) {
  await page.locator(triggerId).click();
  // Wait for the listbox to appear in the DOM before clicking
  const listbox = page.getByRole('listbox');
  await listbox.waitFor({ state: 'visible' });
  await listbox.getByRole('option').first().click();
}

test.describe('StepJobDetails', () => {
  test.beforeEach(async ({ page }) => {
    await goToJobDetailsStep(page);
  });

  // ─── Field Rendering ─────────────────────────────────────────────

  test.describe('Field Rendering', () => {
    test('should render all required form labels', async ({ page }) => {
      await expect(page.getByText('Job Title *')).toBeVisible();
      await expect(page.getByText('Work Preference')).toBeVisible();
      await expect(page.getByText('Job Type')).toBeVisible();
      await expect(page.getByText('Salary Range')).toBeVisible();
      await expect(page.getByText('Required Skills')).toBeVisible();
    });

    test('should render job title input', async ({ page }) => {
      await expect(page.getByPlaceholder('e.g., Senior Engineer')).toBeVisible();
    });

    test('should render location input', async ({page})=> {
      await expect(page.getByPlaceholder("Type a city, area, address")).toBeVisible()
    })

    test('should render work preference select', async ({ page }) => {
      await expect(page.locator('#work-preference')).toBeVisible();
    });

    test('should render job type select', async ({ page }) => {
      await expect(page.locator('#job-type')).toBeVisible();
    });

    test('should render experience level select', async ({ page }) => {
      await expect(page.locator('#expreience-level')).toBeVisible();
    });

    test('should render salary min and max inputs', async ({ page }) => {
      await expect(page.getByLabel('Min')).toBeVisible();
      await expect(page.getByLabel('Max')).toBeVisible();
    });

    test('should render currency select', async ({ page }) => {
      await expect(page.locator('#currency')).toBeVisible();
    });

    test('should render pay period select', async ({ page }) => {
      await expect(page.locator('#payPeriod')).toBeVisible();
    });

    test('should render "show salary on posting" toggle', async ({ page }) => {
      await expect(page.getByText('Show salary on posting')).toBeVisible();
    });

    test('should render skills input', async ({ page }) => {
      await expect(
        page.getByPlaceholder('e.g., React, TypeScript (comma separated)'),
      ).toBeVisible();
    });
  });

  // ─── Field Interaction ───────────────────────────────────────────

  test.describe('Field Interaction', () => {
    test('should type into job title input', async ({ page }) => {
      const input = page.getByPlaceholder('e.g., Senior Engineer');
      await input.fill('Senior Frontend Engineer');
      await expect(input).toHaveValue('Senior Frontend Engineer');
    });

    test('should type into salary min input', async ({ page }) => {
      const input = page.getByLabel('Min');
      await input.fill('50000');
      await expect(input).toHaveValue('50000');
    });

    test('should type into salary max input', async ({ page }) => {
      const input = page.getByLabel('Max');
      await input.fill('90000');
      await expect(input).toHaveValue('90000');
    });

    test('should type into skills input', async ({ page }) => {
      const input = page.getByPlaceholder('e.g., React, TypeScript (comma separated)');
      await input.fill('React, TypeScript, Node.js');
      await expect(input).toHaveValue('React, TypeScript, Node.js');
    });

    test('should select a work preference option', async ({ page }) => {
      await selectFirstOption(page, '#work-preference');
      await expect(page.locator('#work-preference')).not.toContainText('Select work arrangement...');
    });

    test('should select a job type option', async ({ page }) => {
      await selectFirstOption(page, '#job-type');
      await expect(page.locator('#job-type')).not.toContainText('Select type...');
    });

    test('should select an experience level option', async ({ page }) => {
      await selectFirstOption(page, '#expreience-level');
      await expect(page.locator('#expreience-level')).not.toContainText('Select job seiority...');
    });

    test('should select a currency option', async ({ page }) => {
      await selectFirstOption(page, '#currency');
      await expect(page.locator('#currency')).not.toContainText('Currency (e.g., USD)');
    });

    test('should select a pay period option', async ({ page }) => {
      await selectFirstOption(page, '#payPeriod');
      await expect(page.locator('#payPeriod')).not.toContainText('Select pay period...');
    });
  });

  // ─── Salary Visibility Toggle ────────────────────────────────────

  test.describe('Salary Visibility Toggle', () => {
    test('should toggle salary visibility switch on and off', async ({ page }) => {
      const switchEl = page.locator('button[role="switch"]').first();
      const initial = await switchEl.getAttribute('aria-checked');

      await switchEl.click();
      await expect(switchEl).not.toHaveAttribute('aria-checked', initial!);

      await switchEl.click();
      await expect(switchEl).toHaveAttribute('aria-checked', initial!);
    });
  });

  // ─── Validation ──────────────────────────────────────────────────

  test.describe('Validation', () => {
    test('should show error when advancing with empty job title', async ({ page }) => {
      await page.getByPlaceholder('e.g., Senior Engineer').clear();
      await page.getByRole('button', { name: 'Next', exact: true }).click();

      // Either an error alert appears, or the page stays on step 2
      const hasError = await page.getByRole('alert').isVisible().catch(() => false);
      const stillOnStep2 = await page.getByText('Job details').isVisible().catch(() => false);
      expect(hasError || stillOnStep2).toBeTruthy();
    });
  });

  // ─── Stepper Navigation ──────────────────────────────────────────

  test.describe('Stepper Navigation', () => {
    test('should show "Step 2 of 9" counter', async ({ page }) => {
      await expect(page.getByText('Step 2 of 9')).toBeVisible();
    });

    test('should go back to step 1 when Previous is clicked', async ({ page }) => {
      await page.getByRole('button', { name: /previous/i }).click();
      await expect(page.getByText('How would you like to start?')).toBeVisible();
    });

    test('should advance to step 3 with all required fields filled', async ({ page }) => {
      await page.getByPlaceholder('e.g., Senior Engineer').fill('Frontend Engineer');
      await page.locator('#location').fill('New York, NY');
      await selectFirstOption(page, '#work-preference');
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(page.getByText('Job Description')).toBeVisible();
    });
  });

  // ─── Layout ──────────────────────────────────────────────────────

  test.describe('Layout', () => {
    test('should have scrollable form container', async ({ page }) => {
      const container = page.locator('.overflow-y-scroll').first();
      await expect(container).toBeVisible();
      const overflow = await container.evaluate((el) => getComputedStyle(el).overflowY);
      expect(overflow).toBe('scroll');
    });
  });
});
