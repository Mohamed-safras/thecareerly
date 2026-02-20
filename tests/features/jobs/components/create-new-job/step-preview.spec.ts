import { test, expect, type Page } from '@playwright/test';

// TEST_ORG_ID must be set in .env.test
const PAGE_URL = `/organization/${process.env.TEST_ORG_ID}/jobs/create`;

/**
 * Navigates to step 8 (Preview & Approval) from step 1.
 *
 * Pre-populates localStorage with a valid form so that step 2's basic-info
 * validation (title, location, workPreference) and step 3's description
 * validation both pass without any UI interaction on those steps.
 * The page is then reloaded so Redux re-initialises from that localStorage
 * state before clicking through all seven "Next" buttons.
 */
async function goToPreviewStep(page: Page) {
  // Navigate first to establish the origin, then seed localStorage.
  await page.goto(PAGE_URL);
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    localStorage.setItem('create_job_form', JSON.stringify({
      title: 'Test Job',
      jobType: 'full-time',
      workPreference: 'remote',
      experienceLevel: 'entry',
      educationLevel: '',
      location: 'New York, NY',
      description: 'A test job description for E2E testing purposes.',
      department: '',
      requirements: '',
      responsibilities: '',
      niceToHave: '',
      benefits: [],
      salary: { min: 0, max: 0, currency: '', payPeriod: 'monthly', showOnPosting: false },
      scheduledDate: '',
      includeMultimedia: false,
      platforms: [],
      posterVibe: '',
      posterNotes: '',
      screeningQuestions: [],
      selectionProcess: [],
      skills: [],
      useTemplate: false,
      certifications: '',
      documentRequirements: { resume: false, coverLetter: false, portfolio: false, githubProfile: false },
      complianceChecks: [],
      approvalStatus: 'none',
      approvalNotes: '',
      publishToCareerSite: false,
      enableApplicationPortal: false,
      mediaAttachments: [],
      publishChannels: { companyWebsite: false, internalJobBoard: false, employeePortal: false },
    }));
  });

  // Reload so Redux initialises from the pre-populated localStorage.
  await page.reload();
  // Wait for ProtectedClientShell to finish its auth check.
  await expect(page.getByText('How would you like to start?')).toBeVisible();

  // Click Next 7 times: steps 1→2, 2→3, 3→4, 4→5, 5→6, 6→7, 7→8.
  for (let step = 1; step <= 7; step++) {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
  }

  await expect(page.getByText('Preview & Approval')).toBeVisible();
}

test.describe('StepPreviewApproval', () => {
  test.beforeEach(async ({ page }) => {
    await goToPreviewStep(page);
  });

  // ─── Device Switcher ─────────────────────────────────────────────

  test.describe('Device Switcher', () => {
    test('should render all three device buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: /desktop/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /tablet/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /mobile/i })).toBeVisible();
    });

    test('should default to desktop view with no max-width constraint', async ({ page }) => {
      const previewCard = page.locator('.transition-all').first();
      const classes = await previewCard.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/max-w-\[768px\]|max-w-\[375px\]/);
    });

    test('should switch to tablet view', async ({ page }) => {
      await page.getByRole('button', { name: /tablet/i }).click();
      const previewCard = page.locator('.transition-all').first();
      await expect(previewCard).toHaveCSS('max-width', '768px');
    });

    test('should switch to mobile view', async ({ page }) => {
      await page.getByRole('button', { name: /mobile/i }).click();
      const previewCard = page.locator('.transition-all').first();
      await expect(previewCard).toHaveCSS('max-width', '375px');
    });

    test('should switch back to desktop (no max-width)', async ({ page }) => {
      await page.getByRole('button', { name: /mobile/i }).click();
      await page.getByRole('button', { name: /desktop/i }).click();
      const previewCard = page.locator('.transition-all').first();
      const maxWidth = await previewCard.evaluate((el) => getComputedStyle(el).maxWidth);
      expect(maxWidth === 'none' || maxWidth === '').toBeTruthy();
    });
  });

  // ─── Preview Card Content ────────────────────────────────────────

  test.describe('Preview Card Content', () => {
    test('should display job title', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 2 });
      await expect(heading).toBeVisible();
      const text = await heading.textContent();
      expect(text!.length).toBeGreaterThan(0);
    });

    test('should display location info', async ({ page }) => {
      await expect(page.getByText('📍')).toBeVisible();
    });

    test('should display mock metadata', async ({ page }) => {
      await expect(page.getByText('Posted 3 days ago')).toBeVisible();
      await expect(page.getByText('34 Applicants')).toBeVisible();
    });

    test('should display Save, Share and Apply Now buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: /save/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /share/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /apply now/i })).toBeVisible();
    });

    test('should display Job Type and Experience info cards', async ({ page }) => {
      await expect(page.getByText('Job Type')).toBeVisible();
      await expect(page.getByText('Experience')).toBeVisible();
    });

    test('should show description section or fallback text', async ({ page }) => {
      const hasDescription = await page.getByText('About the Role').isVisible().catch(() => false);
      const hasFallback = await page.getByText('No description yet.').isVisible().catch(() => false);
      expect(hasDescription || hasFallback).toBeTruthy();
    });
  });

  // ─── Approval Flow ───────────────────────────────────────────────

  test.describe('Approval Flow', () => {
    test('should display HR Approval heading', async ({ page }) => {
      await expect(page.getByText('HR Approval')).toBeVisible();
    });

    test('should show approval textarea and submit button by default', async ({ page }) => {
      await expect(
        page.getByPlaceholder('Add any context for the HR approval team...'),
      ).toBeVisible();
      await expect(page.getByRole('button', { name: /submit for approval/i })).toBeVisible();
    });

    test('should allow typing approval notes', async ({ page }) => {
      const textarea = page.getByPlaceholder('Add any context for the HR approval team...');
      await textarea.fill('Please review the salary range and job requirements.');
      await expect(textarea).toHaveValue('Please review the salary range and job requirements.');
    });

    test('should show pending state after submitting for approval', async ({ page }) => {
      const submitBtn = page.getByRole('button', { name: /submit for approval/i });
      await page.getByPlaceholder('Add any context for the HR approval team...').fill('Ready for review');
      await submitBtn.click();

      await expect(page.getByText('Pending Approval')).toBeVisible();
      await expect(page.getByText(/waiting for hr team review/i)).toBeVisible();
      await expect(submitBtn).not.toBeVisible();
    });

    test('should show success toast on approval submission', async ({ page }) => {
      await page.getByRole('button', { name: /submit for approval/i }).click();
      await expect(page.getByText('Submitted for HR approval!')).toBeVisible();
    });
  });

  // ─── Layout & Scroll ─────────────────────────────────────────────

  test.describe('Layout & Scroll', () => {
    test('should have scrollable preview area', async ({ page }) => {
      const scrollArea = page.locator('.overflow-y-auto').first();
      await expect(scrollArea).toBeVisible();
      const overflow = await scrollArea.evaluate((el) => getComputedStyle(el).overflowY);
      expect(overflow).toBe('auto');
    });

    test('should have minimum height set on the container', async ({ page }) => {
      const container = page.locator('.flex.flex-col').first();
      const minHeight = await container.evaluate((el) => getComputedStyle(el).minHeight);
      expect(minHeight).not.toBe('0px');
    });
  });

  // ─── Responsive ──────────────────────────────────────────────────

  test.describe('Responsive', () => {
    test('should render correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await goToPreviewStep(page);

      await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
      await expect(page.getByRole('button', { name: /apply now/i })).toBeVisible();

      const scrollWidth = await page.locator('body').evaluate((el) => el.scrollWidth);
      const clientWidth = await page.locator('body').evaluate((el) => el.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });

    test('should render correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await goToPreviewStep(page);

      await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
      await expect(page.getByText('HR Approval')).toBeVisible();
    });

    test('should show 3 device switcher buttons on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await goToPreviewStep(page);

      await expect(page.getByRole('button', { name: /desktop/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /tablet/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /mobile/i })).toBeVisible();
    });

    test('should not have horizontal scroll on any viewport', async ({ page }) => {
      const viewports = [
        { width: 320, height: 568 },  // iPhone SE
        { width: 375, height: 812 },  // iPhone X
        { width: 768, height: 1024 }, // iPad
        { width: 1280, height: 800 }, // Desktop
      ];

      for (const vp of viewports) {
        await page.setViewportSize(vp);
        await goToPreviewStep(page);

        const hasHorizontalScroll = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasHorizontalScroll, `Horizontal scroll at ${vp.width}x${vp.height}`).toBeFalsy();
      }
    });
  });
});
