import { expect, test, type Page } from '@playwright/test';

const urgentCards = (page: Page) => page.locator('#urgent-jobs .jg-job-card');
const query = (page: Page) => page.getByRole('textbox', { name: 'Tìm vị trí, kỹ năng hoặc công ty', exact: true });
const search = async (page: Page, text: string, location = '') => {
  await query(page).fill(text);
  await page.getByRole('combobox', { name: 'Địa điểm làm việc', exact: true }).selectOption(location);
  await page.getByRole('button', { name: 'Tìm kiếm', exact: true }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Việc làm tuyển gấp', exact: true })).toBeVisible();
});

test('filters IT jobs and searches for FPT from the primary search form', async ({ page }) => {
  await expect(urgentCards(page)).toHaveCount(9);
  const it = page.locator('#urgent-jobs').getByRole('button', { name: 'IT - Phần mềm', exact: true });
  await it.click();
  await expect(it).toHaveAttribute('aria-pressed', 'true');
  await expect(urgentCards(page)).toHaveCount(3);
  await expect(urgentCards(page)).toContainText(['Frontend Developer (ReactJS)', 'Chuyên viên Phân tích dữ liệu', 'Game Server Developer']);
  await search(page, 'FPT');
  await expect(urgentCards(page)).toHaveCount(1);
  await expect(urgentCards(page).first()).toContainText('FPT Software');
  await expect(page.locator('.jg-result-count')).toContainText('1 việc làm phù hợp với “FPT”');
});

test('filters the job list to Hà Nội through the location selector', async ({ page }) => {
  await search(page, '', 'Hà Nội');
  await expect(urgentCards(page)).toHaveCount(3);
  await expect(urgentCards(page)).toContainText(['FPT Software', 'Vietcombank', 'Vingroup']);
  await expect(page.locator('.jg-result-count')).toContainText('3 việc làm phù hợp tại Hà Nội');
});

test('bookmark state survives reload and can be removed', async ({ page }) => {
  const save = page.getByRole('button', { name: 'Lưu việc làm Frontend Developer (ReactJS)', exact: true });
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await save.click();
  const saved = page.getByRole('button', { name: 'Bỏ lưu việc làm Frontend Developer (ReactJS)', exact: true });
  await expect(saved).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(saved).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
  await page.getByRole('button', { name: 'Việc làm đã lưu', exact: true }).click();
  const savedList = page.getByRole('dialog', { name: 'Việc làm đã lưu', exact: true });
  await expect(savedList).toBeVisible();
  await expect(savedList).toContainText('Frontend Developer (ReactJS)');
  await savedList.getByRole('button', { name: /Frontend Developer \(ReactJS\)/ }).click();
  const detail = page.getByRole('dialog', { name: 'Frontend Developer (ReactJS)', exact: true });
  await expect(detail).toBeVisible();
  await expect(detail).toContainText('FPT Software');
  await page.keyboard.press('Escape');
  await expect(savedList).not.toBeVisible();
  await expect(detail).not.toBeVisible();
  await saved.click();
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(save).toHaveAttribute('aria-pressed', 'false');
});

test('job details show the selected job and close with Escape', async ({ page }) => {
  await page.getByRole('button', { name: 'Frontend Developer (ReactJS)', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Frontend Developer (ReactJS)', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('FPT Software');
  await expect(dialog).toContainText('15 - 30 triệu');
  await expect(dialog).toContainText('Hà Nội / Hybrid');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('CV file selection stays local and reports the chosen filename', async ({ page }) => {
  const nonReadRequests: string[] = [];
  page.on('request', (request) => {
    if (!['GET', 'HEAD'].includes(request.method())) nonReadRequests.push(`${request.method()} ${request.url()}`);
  });
  await page.locator('.hero-shortcuts').getByRole('button', { name: 'Phân tích CV', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Phân tích CV', exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Chọn CV (.pdf, .doc, .docx)', { exact: true }).setInputFiles({
    name: 'CV-demo.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\n% local file-picker test\n%%EOF'),
  });
  await expect(dialog.getByRole('status')).toHaveText('Đã chọn: CV-demo.pdf');
  expect(nonReadRequests).toEqual([]);
  await dialog.getByRole('button', { name: 'Đóng', exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test('the same article opens again after Escape and the close button', async ({ page }) => {
  const article = page.locator('.lower-article-card').first();
  const heading = 'Top 10 kỹ năng nhà tuyển dụng tìm kiếm năm 2025';
  await article.click();
  const dialog = page.getByRole('dialog', { name: heading, exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await article.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Đóng bài viết', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await article.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Đóng bản xem trước', exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test('mobile 390px search is usable without horizontal page scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(query(page)).toBeVisible();
  await search(page, 'Frontend');
  await expect(urgentCards(page)).toHaveCount(1);
  await expect(urgentCards(page).first()).toContainText('Frontend Developer (ReactJS)');
  const size = await page.evaluate(() => ({ viewport: window.innerWidth, page: document.documentElement.scrollWidth }));
  expect(size.viewport).toBe(390);
  expect(size.page).toBeLessThanOrEqual(size.viewport);
});

test('hero search stays separated from its introductory text across screen sizes', async ({ page }) => {
  for (const width of [320, 391, 939, 1101, 1440]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    const gap = await page.evaluate(() => {
      const intro = document.querySelector('.hero-copy p')!.getBoundingClientRect();
      const tabs = document.querySelector('.search-tabs')!.getBoundingClientRect();
      return tabs.top - intro.bottom;
    });
    expect(gap, `intro/search spacing at ${width}px`).toBeGreaterThanOrEqual(16);
  }
});

test('job text stays readable inside its cards on desktop and mobile', async ({ page }) => {
  for (const width of [320, 391, 939, 1440]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.locator('.jg-job-card').evaluateAll((cards) => cards.flatMap((card) => {
      const bounds = card.getBoundingClientRect();
      const title = card.querySelector('.jg-job-title')!.textContent;
      return Array.from(card.querySelectorAll<HTMLElement>('.jg-company, .jg-hot, .jg-job-title, .jg-job-meta, .jg-tags span')).flatMap((text) => {
        const rect = text.getBoundingClientRect();
        const clipped = text.scrollWidth > text.clientWidth + 1 || text.scrollHeight > text.clientHeight + 1;
        const outside = rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.bottom > bounds.bottom + 1;
        return clipped || outside ? [`${title}: ${text.textContent}`] : [];
      });
    }));
    expect(issues, `job text clipping at ${width}px`).toEqual([]);
  }
});

for (const width of [1440, 900, 320]) {
  test(`all sections and local assets render at ${width}px without horizontal page overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const sections = page.locator('main section');
    for (let i = 0; i < await sections.count(); i += 1) await sections.nth(i).scrollIntoViewIfNeeded();
    await page.locator('#career-editorial').scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src)), { timeout: 10_000 }).toEqual([]);
    const size = await page.evaluate(() => ({ viewport: window.innerWidth, page: document.documentElement.scrollWidth }));
    expect(size.viewport).toBe(width);
    expect(size.page).toBeLessThanOrEqual(size.viewport);
  });
}
