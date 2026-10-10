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

test('hero badges and search labels remain clear through responsive breakpoints', async ({ page }) => {
  for (const width of [320, 391, 769, 820, 880, 901, 930, 939, 1440]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.evaluate(() => {
      const errors: string[] = [];
      for (const intro of document.querySelectorAll('.hero-copy h1, .hero-copy p')) {
        const range = document.createRange();
        range.selectNodeContents(intro);
        for (const text of Array.from(range.getClientRects()).filter((rect) => rect.width > 1)) {
          for (const badge of document.querySelectorAll('.hero-art .floating-card')) {
            const box = badge.getBoundingClientRect();
            if (Math.min(text.right, box.right) - Math.max(text.left, box.left) > 1
              && Math.min(text.bottom, box.bottom) - Math.max(text.top, box.top) > 1) errors.push(`Badge overlaps intro: ${badge.textContent}`);
          }
        }
      }
      const context = document.createElement('canvas').getContext('2d')!;
      const select = document.querySelector<HTMLSelectElement>('.location-input select')!;
      context.font = getComputedStyle(select).font;
      if (context.measureText(select.selectedOptions[0].text).width + 18 > select.clientWidth) errors.push('Location label clipped by native arrow');
      const input = document.querySelector<HTMLInputElement>('.query-input input')!;
      context.font = getComputedStyle(input).font;
      if (context.measureText(input.placeholder).width > input.clientWidth) errors.push('Search placeholder clipped');
      for (const button of document.querySelectorAll('.login-button, .register-button, .search-tabs button')) {
        if (!button.getClientRects().length) continue;
        const range = document.createRange();
        range.selectNodeContents(button);
        if (new Set(Array.from(range.getClientRects()).map((rect) => Math.round(rect.top))).size > 1) errors.push(`Control label wraps: ${button.textContent}`);
      }
      return errors;
    });
    expect(issues, `hero readability at ${width}px`).toEqual([]);
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

test('career tool and recruiter icons leave room for their labels', async ({ page }) => {
  for (const width of [320, 391, 939, 1440]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    // Let ResizeObserver update the artwork scale before measuring its rendered bounds.
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const issues = await page.evaluate(() => {
      const errors: string[] = [];
      const check = (cardSelector: string, iconSelector: string, labelSelector: string) => {
        for (const card of document.querySelectorAll<HTMLElement>(cardSelector)) {
          if (!card.getClientRects().length) continue;
          const label = card.querySelector<HTMLElement>(labelSelector)!;
          const bounds = card.getBoundingClientRect();
          const text = label.getBoundingClientRect();
          if (text.left < bounds.left || text.right > bounds.right || text.bottom > bounds.bottom || label.scrollWidth > label.clientWidth + 1) {
            errors.push(`Label outside card: ${label.textContent}`);
          }
          for (const icon of card.querySelectorAll(iconSelector)) {
            const art = icon.getBoundingClientRect();
            const xGap = Math.max(text.left - art.right, art.left - text.right);
            const yGap = Math.max(text.top - art.bottom, art.top - text.bottom);
            if (Math.max(xGap, yGap) < 3) errors.push(`Icon touches label: ${label.textContent}`);
          }
        }
      };
      check('.observatory-link', '.observatory-icon img', ':scope > span:nth-child(2)');
      check('.lower-recruiter-stat', '.lower-recruiter-stat-icon img', ':scope > span:last-child');
      const people = document.querySelector('.lower-recruiter-people')!.getBoundingClientRect();
      const overlapsPeople = (rect: DOMRect) => Math.min(rect.right, people.right) - Math.max(rect.left, people.left) > 1
        && Math.min(rect.bottom, people.bottom) - Math.max(rect.top, people.top) > 1;
      for (const text of document.querySelectorAll('.lower-recruiter-copy h2, .lower-recruiter-copy p')) {
        const range = document.createRange();
        range.selectNodeContents(text);
        if (Array.from(range.getClientRects()).some(overlapsPeople)) errors.push(`Recruiter photo overlaps: ${text.textContent}`);
      }
      for (const button of document.querySelectorAll('.lower-recruiter-actions button')) {
        if (overlapsPeople(button.getBoundingClientRect())) errors.push(`Recruiter photo overlaps: ${button.textContent}`);
      }
      return errors;
    });
    expect(issues, `icon/label spacing at ${width}px`).toEqual([]);
  }
});

test('mobile internship cards form two centered columns and employer content stays centered', async ({ page }) => {
  for (const width of [320, 391, 600]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.evaluate(() => {
      const errors: string[] = [];
      for (const card of document.querySelectorAll('#employers .jg-employer, #internships .jg-intern-card')) {
        const box = card.getBoundingClientRect();
        const center = (box.left + box.right) / 2;
        const selectors = card.matches('.jg-employer') ? ['.jg-featured-logo', ':scope > strong'] : ['.jg-logo', '.jg-job-title'];
        for (const selector of selectors) {
          const content = card.querySelector(selector)!;
          const rect = content.getBoundingClientRect();
          if (Math.abs((rect.left + rect.right) / 2 - center) > 1) errors.push(`Off-center: ${card.textContent}`);
        }
      }
      const interns = Array.from(document.querySelectorAll('#internships .jg-intern-card')).map((card) => card.getBoundingClientRect());
      if (interns.length !== 4) errors.push('Expected all four internships');
      else {
        if (Math.abs(interns[0].top - interns[1].top) > 1 || Math.abs(interns[2].top - interns[3].top) > 1
          || interns[1].left <= interns[0].right || interns[2].top <= interns[0].bottom) errors.push('Internships are not arranged in two columns');
      }
      return errors;
    });
    expect(issues, `card alignment at ${width}px`).toEqual([]);
  }
  await page.setViewportSize({ width: 391, height: 847 });
  const internships = page.locator('#internships');
  const save = internships.getByRole('button', { name: 'Lưu việc làm Technology Intern', exact: true });
  await save.click();
  await expect(internships.getByRole('button', { name: 'Bỏ lưu việc làm Technology Intern', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await internships.getByRole('button', { name: 'Technology Intern', exact: true }).click();
  const detail = page.getByRole('dialog', { name: 'Technology Intern', exact: true });
  await expect(detail).toBeVisible();
  await expect(detail).toContainText('Grab');
  await page.keyboard.press('Escape');
  await expect(detail).not.toBeVisible();
  await internships.getByRole('button', { name: 'Marketing', exact: true }).click();
  await expect(internships.locator('.jg-intern-card')).toHaveCount(1);
  await expect(internships.locator('.jg-intern-card')).toContainText('Marketing Intern');
});

test('industry labels fit with padding and counts share the same row baseline', async ({ page }) => {
  for (const width of [320, 391, 939, 1271, 1440]) {
    await page.setViewportSize({ width, height: 847 });
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.locator('.jg-industry').evaluateAll((cards) => {
      const errors: string[] = [];
      const rowBaselines = new Map<number, number>();
      for (const card of cards) {
        const box = card.getBoundingClientRect();
        const label = card.querySelector('strong')!.getBoundingClientRect();
        const count = card.querySelector('span')!.getBoundingClientRect();
        if (label.left - box.left < 8 || box.right - label.right < 8 || count.bottom > box.bottom - 8) errors.push(`Industry content too close to edge: ${card.textContent}`);
        const row = Math.round(box.top);
        const baseline = rowBaselines.get(row);
        if (baseline !== undefined && Math.abs(count.bottom - baseline) > 1) errors.push(`Industry count misaligned: ${card.textContent}`);
        rowBaselines.set(row, count.bottom);
      }
      return errors;
    });
    expect(issues, `industry spacing at ${width}px`).toEqual([]);
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
