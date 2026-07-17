import { test, expect } from '@playwright/test';
import { ALL_SKILLS } from '../../src/config/levels.js';
import { createProgress, recordSession } from '../../src/core/progression.js';
import { createDefaultState, STORAGE_KEY } from '../../src/storage/repository.js';

const APP_URL = '/Lumon/index.htm';

async function installState(page, configure = (value) => value) {
  const state = configure(createDefaultState(() => '2026-07-17T00:30:00.000Z'));
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify(state)]);
  return state;
}

async function installUnlockedState(page) {
  return installState(page, (state) => {
    state.preferences.sessionLength = 5;
    state.progress.manualUnlocked = ALL_SKILLS.map((skill) => skill.id);
    return state;
  });
}

function watchRuntime(page) {
  const errors = [];
  const requests = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => requests.push(request.url()));
  return { errors, requests };
}

async function startFirstSkill(page) {
  await page.locator('.stage-card').first().locator('.skill-button').first().click();
  await expect(page.locator('#activity-screen')).toBeVisible();
}

async function answerFindNumber(page, correct = true) {
  const prompt = await page.locator('#prompt').innerText();
  const target = prompt.match(/\d+/)?.[0];
  const options = page.locator('.answer-option');
  const count = await options.count();
  for (let index = 0; index < count; index += 1) {
    const option = options.nth(index);
    const matches = (await option.innerText()).trim() === target;
    if (matches === correct) {
      await option.click();
      return;
    }
  }
  throw new Error('Alternativa compatível não encontrada');
}

async function answerVisibleOperation(page) {
  const prompt = await page.locator('#prompt').innerText();
  const match = prompt.match(/(\d+)\s*([+−-])\s*(\d+)/);
  if (!match) return answerFindNumber(page, true);
  const left = Number(match[1]);
  const right = Number(match[3]);
  const answer = match[2] === '+' ? left + right : left - right;
  await page.getByRole('button', { name: String(answer), exact: true }).click();
}

test('primeira utilização, erro, acerto, conclusão e revisão', async ({ page }) => {
  const runtime = watchRuntime(page);
  await installState(page, (state) => { state.preferences.sessionLength = 5; return state; });
  await page.goto(APP_URL);
  await expect(page.getByRole('heading', { name: 'Trilha de matemática' })).toBeVisible();
  await expect(page.getByText('O progresso fica somente neste dispositivo')).toBeVisible();
  await expect(page.locator('#continue-card')).toBeHidden();
  await startFirstSkill(page);

  for (let index = 0; index < 5; index += 1) {
    await answerFindNumber(page, index !== 0);
    await expect(page.locator('#feedback')).not.toBeEmpty();
    if (index === 0) await expect(page.locator('#feedback')).toContainText('Boa tentativa');
    await page.locator('#next-question').click();
  }

  await expect(page.locator('#result-screen')).toBeVisible();
  await expect(page.locator('#result-score')).toContainText('4 de 5');
  await expect(page.locator('#result-review')).toBeVisible();
  await page.locator('#result-review').click();
  await expect(page.locator('#activity-title')).toHaveText('Encontre o número');
  expect(runtime.errors).toEqual([]);
  expect(runtime.requests.every((url) => new URL(url).origin === 'http://127.0.0.1:4173')).toBe(true);
});

test('reload preserva a sessão e evita duplo registro', async ({ page }) => {
  const runtime = watchRuntime(page);
  await installState(page, (state) => { state.preferences.sessionLength = 5; return state; });
  await page.goto(APP_URL);
  await startFirstSkill(page);
  await answerFindNumber(page, true);
  await expect(page.locator('.answer-option:disabled')).toHaveCount(4);
  await page.locator('#next-question').click();
  await page.reload();
  await expect(page.locator('#continue-card')).toBeVisible();
  await page.locator('#continue-button').click();
  await expect(page.locator('#session-progress')).toHaveText('2 de 5');
  expect(runtime.errors).toEqual([]);
});

test('uma sessão representativa de cada etapa funciona do início ao fim', async ({ page }) => {
  await installUnlockedState(page);
  await page.goto(APP_URL);
  const expectedTitles = [
    'Encontre o número', 'Reconheça até 30', 'Reconheça até 50', 'Somar +1', 'Subtrair −1',
  ];
  for (let index = 0; index < expectedTitles.length; index += 1) {
    const card = page.locator('.stage-card').nth(index);
    const skills = card.locator('.skills');
    if (await skills.isHidden()) await card.locator('.stage-summary').click();
    await card.locator('.skill-button').first().click();
    await expect(page.locator('#activity-title')).toHaveText(expectedTitles[index]);
    for (let questionIndex = 0; questionIndex < 5; questionIndex += 1) {
      if (index < 3) await answerFindNumber(page, true);
      else await answerVisibleOperation(page);
      await page.locator('#next-question').click();
    }
    await expect(page.locator('#result-screen')).toBeVisible();
    await page.locator('#result-home').click();
    await expect(page.locator('#home-screen')).toBeVisible();
  }
  const stored = JSON.parse(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  expect(stored.progress.completedSessions.filter((session) => session.completed)).toHaveLength(5);
});

test('domínio libera avanço e habilidade bloqueada continua sem ação', async ({ page }) => {
  await installState(page, (state) => {
    let progress = createProgress();
    for (let run = 0; run < 3; run += 1) {
      progress = recordSession(progress, {
        id: `mastery-${run}`,
        skillId: 'number.find.1-10',
        answers: Array.from({ length: 10 }, (_, index) => ({ questionId: `${run}-${index}`, itemKey: String(index), correct: true })),
        startedAt: 'inicio', finishedAt: 'fim', completed: true, abandoned: false,
      });
    }
    state.progress = progress;
    return state;
  });
  await page.goto(APP_URL);
  const firstCardSkills = page.locator('.stage-card').first().locator('.skill-button');
  await expect(firstCardSkills.nth(0)).toContainText('Dominado');
  await expect(firstCardSkills.nth(1)).toBeEnabled();
  await expect(firstCardSkills.nth(2)).toBeDisabled();
});

test('fluxo essencial funciona apenas por teclado e Escape registra abandono', async ({ page }) => {
  await installState(page, (state) => { state.preferences.sessionLength = 5; return state; });
  await page.goto(APP_URL);
  const firstSkill = page.locator('.skill-button').first();
  await firstSkill.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#activity-screen')).toBeVisible();
  const firstOption = page.locator('.answer-option').first();
  await firstOption.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#feedback')).not.toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(page.locator('#home-screen')).toBeVisible();
  const stored = JSON.parse(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY));
  expect(stored.progress.completedSessions.at(-1).abandoned).toBe(true);
});

test('reinício confirmado apaga progresso sem apagar outras chaves', async ({ page }) => {
  await installUnlockedState(page);
  await page.addInitScript(() => localStorage.setItem('preferencia-externa', 'preservar'));
  await page.goto(APP_URL);
  await page.locator('#caregiver-button').click();
  await page.locator('#reset-button').click();
  await page.locator('#confirm-reset').click();
  await expect(page.locator('.stage-card').nth(4).locator('.skill-button').first()).toBeDisabled();
  expect(await page.evaluate(() => localStorage.getItem('preferencia-externa'))).toBe('preservar');
});

test('primeira carga online, atualização segura e sessão offline', async ({ page, context }) => {
  const runtime = watchRuntime(page);
  await installState(page, (state) => { state.preferences.sessionLength = 5; return state; });
  await page.goto(APP_URL);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    await caches.open('outro-app-cache');
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await startFirstSkill(page);
  await answerFindNumber(page, true);
  await page.locator('#next-question').click();
  const beforeUpdate = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  await page.evaluate(async () => { await window.__lumonPwa.registration.update(); });
  await expect.poll(() => page.evaluate(async () => (await caches.keys()).includes('outro-app-cache'))).toBe(true);
  expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe(beforeUpdate);

  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('#home-screen')).toBeVisible();
  await page.locator('#continue-button').click();
  await expect(page.locator('#session-progress')).toHaveText('2 de 5');
  expect(runtime.errors.filter((message) => !message.includes('ERR_INTERNET_DISCONNECTED'))).toEqual([]);
  await context.setOffline(false);
});

test('matriz visual não tem overflow horizontal nem alvos pequenos', async ({ page }, testInfo) => {
  await installState(page, (state) => { state.preferences.sessionLength = 5; return state; });
  const viewports = [
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1280, height: 720 },
    { width: 844, height: 390 },
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(APP_URL);
    await expect(page.locator('#home-screen')).toBeVisible();
    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      smallTargets: [...document.querySelectorAll('button:not([hidden]), select:not([hidden])')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && (rect.height < 48 || rect.width < 48);
        })
        .map((element) => `${element.tagName}:${element.textContent.trim()}`),
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
    expect(metrics.smallTargets).toEqual([]);
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`home-${viewport.width}x${viewport.height}`, { body: screenshot, contentType: 'image/png' });
  }
});
