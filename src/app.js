import { ALL_SKILLS, STAGES, getSkill, getStageForSkill } from './config/levels.js';
import {
  evaluateMastery,
  getRecommendation,
  getReviewItems,
  getSkillsNeedingReview,
  isSkillUnlocked,
  manuallyUnlock,
  recordSession,
} from './core/progression.js';
import {
  answerCurrentQuestion,
  completeSession,
  createSession,
  moveToNextQuestion,
} from './core/session.js';
import {
  clearLumonData,
  createDefaultState,
  importState,
  loadState,
  saveState,
} from './storage/repository.js';
import { activateWaitingWorker, registerPwa } from './pwa/registration.js';

const elements = Object.fromEntries([
  'home-screen', 'activity-screen', 'result-screen', 'home-button', 'trail', 'continue-card',
  'continue-description', 'continue-button', 'review-button', 'review-help', 'caregiver-button',
  'exit-session', 'session-progress', 'progress-fill', 'stage-label', 'activity-title',
  'activity-instruction', 'prompt', 'response-area', 'feedback', 'next-question', 'result-score',
  'result-skill', 'recommendation', 'result-review', 'result-repeat', 'result-home',
  'caregiver-dialog', 'caregiver-progress', 'session-length', 'reduced-motion', 'high-contrast',
  'record-time', 'unlock-skill', 'unlock-button', 'export-button', 'import-file', 'import-status',
  'reset-button', 'reset-dialog', 'confirm-reset', 'cancel-reset', 'screen-announcer',
  'update-banner', 'dismiss-update', 'update-button',
].map((id) => [id, document.getElementById(id)]));

let state = loadState();
let lastResult = null;
let lastRegistration = null;
let updateRequested = false;

function persist() {
  saveState(state);
}

function setPreferences() {
  document.documentElement.classList.toggle('reduce-motion', Boolean(state.preferences.reducedMotion));
  document.documentElement.classList.toggle('high-contrast', Boolean(state.preferences.highContrast));
}

function showScreen(id, announcement) {
  for (const screen of document.querySelectorAll('.screen')) {
    const active = screen.id === id;
    screen.hidden = !active;
    screen.classList.toggle('active', active);
  }
  elements['screen-announcer'].textContent = announcement;
  const heading = document.querySelector(`#${id} h1`);
  if (heading) heading.tabIndex = -1;
  requestAnimationFrame(() => (heading ?? document.getElementById('conteudo')).focus({ preventScroll: false }));
}

function skillStatus(skillId) {
  const mastery = state.progress.skillMastery[skillId] ?? evaluateMastery(state.progress, skillId);
  if (mastery.mastered) return { label: 'Dominado', className: 'mastered' };
  if (getReviewItems(state.progress, skillId).length) return { label: 'Revisar', className: 'review' };
  if (isSkillUnlocked(state.progress, skillId)) return { label: mastery.completedSessions ? 'Em andamento' : 'Disponível', className: '' };
  return { label: 'Bloqueado', className: 'locked' };
}

function stageStatus(stage) {
  const mastered = stage.skills.filter((skill) => state.progress.skillMastery[skill.id]?.mastered).length;
  const available = stage.skills.some((skill) => isSkillUnlocked(state.progress, skill.id));
  if (mastered === stage.skills.length) return { label: 'Etapa dominada', className: 'mastered' };
  if (available) return { label: mastered ? `${mastered} de ${stage.skills.length} dominadas` : 'Em andamento', className: '' };
  return { label: 'Aguardando avanço', className: 'locked' };
}

function renderTrail() {
  elements.trail.replaceChildren();
  const currentStage = state.profile.currentSkillId ? getStageForSkill(state.profile.currentSkillId) : STAGES[0];

  STAGES.forEach((stage, stageIndex) => {
    const card = document.createElement('article');
    card.className = 'stage-card';
    card.style.setProperty('--stage-color', stage.color);
    const summary = document.createElement('button');
    summary.type = 'button';
    summary.className = 'stage-summary';
    const isExpanded = stage.id === currentStage?.id;
    summary.setAttribute('aria-expanded', String(isExpanded));
    summary.setAttribute('aria-controls', `skills-${stage.id}`);

    const number = document.createElement('span');
    number.className = 'stage-number';
    number.textContent = String(stageIndex + 1);
    const copy = document.createElement('span');
    const title = document.createElement('h2');
    title.textContent = stage.title;
    const description = document.createElement('p');
    description.textContent = stage.description;
    copy.append(title, description);
    const statusData = stageStatus(stage);
    const status = document.createElement('span');
    status.className = `stage-status ${statusData.className}`;
    status.textContent = statusData.label;
    summary.append(number, copy, status);

    const skills = document.createElement('div');
    skills.id = `skills-${stage.id}`;
    skills.className = 'skills';
    skills.hidden = !isExpanded;
    summary.addEventListener('click', () => {
      const expanded = summary.getAttribute('aria-expanded') === 'true';
      summary.setAttribute('aria-expanded', String(!expanded));
      skills.hidden = expanded;
    });

    stage.skills.forEach((skill) => {
      const statusInfo = skillStatus(skill.id);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'skill-button';
      button.disabled = !isSkillUnlocked(state.progress, skill.id);
      button.setAttribute('aria-label', `${skill.title}. ${statusInfo.label}. ${skill.instruction}`);
      const text = document.createElement('span');
      const label = document.createElement('span');
      label.className = 'skill-title';
      label.textContent = skill.title;
      const meta = document.createElement('span');
      meta.className = 'skill-meta';
      meta.textContent = skill.instruction;
      text.append(label, document.createElement('br'), meta);
      const stateLabel = document.createElement('span');
      stateLabel.className = `skill-state ${statusInfo.className}`;
      stateLabel.textContent = statusInfo.label;
      button.append(text, stateLabel);
      button.addEventListener('click', () => startSession(skill.id));
      skills.append(button);
    });

    card.append(summary, skills);
    elements.trail.append(card);
  });
}

function renderHome() {
  setPreferences();
  renderTrail();
  const active = state.activeSession;
  elements['continue-card'].hidden = !active;
  if (active) {
    const skill = getSkill(active.skillId);
    elements['continue-description'].textContent = `${skill.title} — questão ${active.currentIndex + 1} de ${active.questions.length}`;
  }
  const reviews = getSkillsNeedingReview(state.progress);
  elements['review-button'].disabled = reviews.length === 0;
  elements['review-help'].textContent = reviews.length
    ? `${reviews.reduce((sum, entry) => sum + entry.items.length, 0)} itens estão prontos para uma revisão acolhedora.`
    : 'Os itens para revisar aparecem aqui depois das práticas.';
  showScreen('home-screen', 'Trilha de matemática');
}

function abandonActiveSession() {
  if (!state.activeSession) return;
  const abandoned = completeSession(state.activeSession, { abandoned: true });
  state.progress = recordSession(state.progress, abandoned);
  state.activeSession = null;
  persist();
}

function startSession(skillId, { reviewItems = [] } = {}) {
  if (!isSkillUnlocked(state.progress, skillId)) return;
  if (state.activeSession) abandonActiveSession();
  const seed = `${skillId}-${Date.now()}`;
  state.profile.currentSkillId = skillId;
  state.activeSession = createSession({
    skillId,
    count: state.preferences.sessionLength,
    seed,
    reviewItems,
  });
  persist();
  renderActivity();
}

function resumeSession() {
  if (state.activeSession) renderActivity();
}

function addDots(container, count, { removed = 0, compact = false } = {}) {
  const dots = document.createElement('span');
  dots.className = 'dots';
  if (compact) dots.style.maxWidth = '130px';
  dots.setAttribute('aria-label', `${count - removed} de ${count} bolinhas restantes`);
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement('span');
    dot.className = `dot ${index >= count - removed ? 'removed' : ''}`;
    dot.setAttribute('aria-hidden', 'true');
    dots.append(dot);
  }
  container.append(dots);
}

function renderSequence(values) {
  const sequence = document.createElement('div');
  sequence.className = 'sequence';
  values.forEach((value) => {
    const item = document.createElement('span');
    item.textContent = value ?? '?';
    if (value === null) item.className = 'gap';
    sequence.append(item);
  });
  elements.prompt.append(sequence);
}

function renderPrompt(question) {
  elements.prompt.replaceChildren();
  const prompt = question.prompt;
  if (prompt.type === 'find-number') {
    const instruction = document.createElement('p');
    instruction.className = 'prompt-expression';
    instruction.textContent = `Encontre o ${prompt.value}`;
    elements.prompt.append(instruction);
  } else if (prompt.type === 'number') {
    const number = document.createElement('p');
    number.className = 'prompt-number';
    number.textContent = prompt.value;
    elements.prompt.append(number);
  } else if (prompt.type === 'dots') {
    addDots(elements.prompt, prompt.value);
  } else if (prompt.type === 'sequence' || prompt.type === 'neighbor') {
    renderSequence(prompt.values);
  } else if (prompt.type === 'place-value') {
    const grid = document.createElement('div');
    grid.className = 'tens-ones';
    [['Dezenas', prompt.tens], ['Unidades', prompt.ones]].forEach(([label, value]) => {
      const item = document.createElement('div');
      item.className = 'place-value';
      const strong = document.createElement('strong');
      strong.textContent = value;
      item.append(strong, label);
      grid.append(item);
    });
    elements.prompt.append(grid);
  } else if (prompt.type === 'ordering') {
    const text = document.createElement('p');
    text.className = 'prompt-expression';
    text.textContent = 'Menor → maior';
    elements.prompt.append(text);
  } else if (prompt.type === 'expression') {
    const expression = document.createElement('p');
    expression.className = 'prompt-expression';
    expression.textContent = prompt.right === null
      ? `${prompt.left} ${prompt.operator} ? = ${prompt.result}`
      : `${prompt.left} ${prompt.operator} ${prompt.right}`;
    elements.prompt.append(expression);
  } else if (prompt.type === 'visual-operation') {
    const expression = document.createElement('p');
    expression.className = 'prompt-expression';
    expression.textContent = prompt.right === null
      ? `${prompt.left} ${prompt.operator} ? = ${prompt.result}`
      : `${prompt.left} ${prompt.operator} ${prompt.right}`;
    elements.prompt.append(expression);
    if (prompt.operator === '+') {
      const visual = document.createElement('div');
      visual.className = 'button-row';
      addDots(visual, prompt.left, { compact: true });
      const sign = document.createElement('strong');
      sign.textContent = '+';
      visual.append(sign);
      addDots(visual, prompt.right, { compact: true });
      elements.prompt.append(visual);
    } else {
      addDots(elements.prompt, prompt.left, { removed: prompt.removed });
    }
  } else if (prompt.type === 'inverse') {
    const [left, right, total] = prompt.addition;
    const expression = document.createElement('p');
    expression.className = 'prompt-expression';
    expression.textContent = `${left} + ${right} = ${total}`;
    const inverse = document.createElement('p');
    inverse.className = 'prompt-expression';
    inverse.textContent = `${total} − ? = ${left}`;
    elements.prompt.append(expression, inverse);
  }
}

function valuesMatch(left, right) {
  const normalize = (value) => Array.isArray(value) ? value.map(Number).join('|') : String(Number(value));
  return normalize(left) === normalize(right);
}

function optionLabel(option) {
  return Array.isArray(option) ? option.join(' e ') : String(option);
}

function showAnsweredState(answerRecord, question) {
  const correct = answerRecord.correct;
  elements.feedback.className = `feedback ${correct ? 'success' : 'review'}`;
  elements.feedback.textContent = correct
    ? 'Muito bem — sua resposta está certa!'
    : `Boa tentativa. A resposta é ${optionLabel(question.answer)}; este item volta na revisão.`;
  elements['next-question'].hidden = false;
  elements['next-question'].textContent = state.activeSession.currentIndex === state.activeSession.questions.length - 1
    ? 'Ver resultado'
    : 'Próxima';
  for (const control of elements['response-area'].querySelectorAll('button, input')) control.disabled = true;
  for (const option of elements['response-area'].querySelectorAll('.answer-option')) {
    const value = JSON.parse(option.dataset.value);
    const selected = valuesMatch(value, answerRecord.response);
    const isCorrectOption = valuesMatch(value, question.answer);
    option.setAttribute('aria-pressed', String(selected));
    if (selected) option.classList.add(answerRecord.correct ? 'correct' : 'incorrect');
    if (!selected && isCorrectOption) option.classList.add('correct');
  }
  elements['next-question'].focus();
}

function submitAnswer(response) {
  const session = state.activeSession;
  if (!session || session.answers.length > session.currentIndex) return;
  const elapsed = state.preferences.recordResponseTime ? Date.now() - session.questionStartedAt : null;
  state.activeSession = answerCurrentQuestion(session, response, elapsed);
  persist();
  const record = state.activeSession.answers[state.activeSession.currentIndex];
  showAnsweredState(record, state.activeSession.questions[state.activeSession.currentIndex]);
}

function renderChoice(question, answered) {
  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  for (const option of question.response.options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';
    button.dataset.value = JSON.stringify(option);
    button.setAttribute('aria-pressed', 'false');
    if (question.response.optionDisplay === 'dots') {
      button.setAttribute('aria-label', `${option} bolinhas`);
      addDots(button, option, { compact: true });
    } else {
      button.textContent = optionLabel(option);
    }
    button.addEventListener('click', () => submitAnswer(option));
    grid.append(button);
  }
  elements['response-area'].append(grid);
  if (answered) showAnsweredState(answered, question);
}

function renderNumericInput(question, answered) {
  const form = document.createElement('form');
  form.className = 'numeric-form';
  const label = document.createElement('label');
  label.className = 'field-label';
  label.htmlFor = 'numeric-answer';
  label.textContent = 'Sua resposta';
  const input = document.createElement('input');
  input.id = 'numeric-answer';
  input.name = 'answer';
  input.type = 'text';
  input.inputMode = 'numeric';
  input.autocomplete = 'off';
  input.pattern = '[0-9]*';
  input.maxLength = 2;
  input.required = true;
  input.value = answered ? String(answered.response) : '';
  input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, '').slice(0, 2); });
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'button button-primary';
  submit.textContent = 'Conferir';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input.value) {
      input.setCustomValidity('Digite um número antes de conferir.');
      input.reportValidity();
      return;
    }
    input.setCustomValidity('');
    submitAnswer(Number(input.value));
  });
  form.append(label, input, submit);
  elements['response-area'].append(form);
  if (answered) showAnsweredState(answered, question);
  else requestAnimationFrame(() => input.focus());
}

function renderOrdering(question, answered) {
  let order = answered ? [...answered.response] : [...question.prompt.items];
  const region = document.createElement('div');
  region.className = 'ordering-list';

  const draw = (focusIndex = null) => {
    region.replaceChildren();
    order.forEach((value, index) => {
      const row = document.createElement('div');
      row.className = 'ordering-item';
      const label = document.createElement('span');
      label.className = 'ordering-value';
      label.textContent = value;
      const earlier = document.createElement('button');
      earlier.type = 'button';
      earlier.className = 'move-button';
      earlier.textContent = '←';
      earlier.disabled = Boolean(answered) || index === 0;
      earlier.setAttribute('aria-label', `Mover ${value} uma posição para antes`);
      earlier.addEventListener('click', () => {
        [order[index - 1], order[index]] = [order[index], order[index - 1]];
        draw(index - 1);
      });
      const later = document.createElement('button');
      later.type = 'button';
      later.className = 'move-button';
      later.textContent = '→';
      later.disabled = Boolean(answered) || index === order.length - 1;
      later.setAttribute('aria-label', `Mover ${value} uma posição para depois`);
      later.addEventListener('click', () => {
        [order[index], order[index + 1]] = [order[index + 1], order[index]];
        draw(index + 1);
      });
      row.append(label, earlier, later);
      region.append(row);
    });
    if (focusIndex !== null) region.children[focusIndex]?.querySelector('button:not(:disabled)')?.focus();
  };
  draw();
  const verify = document.createElement('button');
  verify.type = 'button';
  verify.className = 'button button-primary';
  verify.textContent = 'Conferir ordem';
  verify.disabled = Boolean(answered);
  verify.addEventListener('click', () => submitAnswer(order));
  elements['response-area'].append(region, verify);
  if (answered) showAnsweredState(answered, question);
}

function renderSelfAssessment(question, answered) {
  const container = document.createElement('div');
  container.className = 'self-assessment';

  const revealAnswer = () => {
    container.replaceChildren();
    const answer = document.createElement('p');
    answer.className = 'flashcard-answer';
    answer.setAttribute('role', 'status');
    answer.textContent = `Resposta: ${optionLabel(question.answer)}`;
    const actions = document.createElement('div');
    actions.className = 'choice-grid';
    const review = document.createElement('button');
    review.type = 'button';
    review.className = 'button button-review';
    review.textContent = 'Preciso praticar';
    review.addEventListener('click', () => submitAnswer('review'));
    const correct = document.createElement('button');
    correct.type = 'button';
    correct.className = 'button button-primary';
    correct.textContent = 'Acertei';
    correct.addEventListener('click', () => submitAnswer(question.answer));
    actions.append(review, correct);
    container.append(answer, actions);
    correct.focus();
  };

  if (answered) {
    revealAnswer();
    showAnsweredState(answered, question);
  } else {
    const reveal = document.createElement('button');
    reveal.type = 'button';
    reveal.className = 'button button-secondary reveal-button';
    reveal.textContent = 'Mostrar resposta';
    reveal.addEventListener('click', revealAnswer);
    container.append(reveal);
  }
  elements['response-area'].append(container);
}

function renderActivity() {
  const session = state.activeSession;
  if (!session) return renderHome();
  const skill = getSkill(session.skillId);
  const stage = getStageForSkill(session.skillId);
  const question = session.questions[session.currentIndex];
  if (!question) return finishSession();
  elements['stage-label'].textContent = stage.title;
  elements['activity-title'].textContent = skill.title;
  elements['activity-instruction'].textContent = skill.instruction;
  elements['session-progress'].textContent = `${session.currentIndex + 1} de ${session.questions.length}`;
  elements['progress-fill'].style.width = `${(session.currentIndex / session.questions.length) * 100}%`;
  elements.feedback.className = 'feedback';
  elements.feedback.textContent = '';
  elements['next-question'].hidden = true;
  elements['response-area'].replaceChildren();
  renderPrompt(question);
  const answered = session.answers[session.currentIndex] ?? null;
  if (question.response.type === 'choice') renderChoice(question, answered);
  else if (question.response.type === 'numeric-input') renderNumericInput(question, answered);
  else if (question.response.type === 'ordering') renderOrdering(question, answered);
  else if (question.response.type === 'self-assessment') renderSelfAssessment(question, answered);
  showScreen('activity-screen', `${skill.title}, questão ${session.currentIndex + 1} de ${session.questions.length}`);
  if (!answered) requestAnimationFrame(() => elements['response-area'].querySelector('button, input')?.focus());
}

function finishSession() {
  const session = state.activeSession;
  if (!session) return;
  const completed = completeSession(session);
  state.progress = recordSession(state.progress, completed);
  state.activeSession = null;
  persist();
  const correct = completed.answers.filter((answer) => answer.correct).length;
  const recommendation = getRecommendation(state.progress, completed.skillId);
  lastResult = { skillId: completed.skillId, correct, total: completed.answers.length, recommendation };
  renderResult();
}

function renderResult() {
  if (!lastResult) return renderHome();
  const skill = getSkill(lastResult.skillId);
  elements['result-score'].textContent = `${lastResult.correct} de ${lastResult.total} respostas certas`;
  elements['result-skill'].textContent = `Habilidade: ${skill.title}`;
  elements.recommendation.textContent = lastResult.recommendation.message;
  const reviewItems = getReviewItems(state.progress, lastResult.skillId);
  elements['result-review'].hidden = reviewItems.length === 0;
  showScreen('result-screen', 'Resultado da sessão');
}

function renderCaregiver() {
  elements['session-length'].value = String(state.preferences.sessionLength);
  elements['reduced-motion'].checked = Boolean(state.preferences.reducedMotion);
  elements['high-contrast'].checked = Boolean(state.preferences.highContrast);
  elements['record-time'].checked = Boolean(state.preferences.recordResponseTime);
  elements['caregiver-progress'].replaceChildren();
  for (const skill of ALL_SKILLS) {
    const mastery = evaluateMastery(state.progress, skill.id);
    if (!mastery.completedSessions && !isSkillUnlocked(state.progress, skill.id)) continue;
    const row = document.createElement('div');
    row.className = 'progress-row';
    const label = document.createElement('span');
    label.textContent = skill.title;
    const value = document.createElement('strong');
    value.textContent = mastery.mastered
      ? 'Dominado'
      : `${mastery.completedSessions}/3 sessões · ${Math.round(mastery.averageAccuracy * 100)}%`;
    row.append(label, value);
    elements['caregiver-progress'].append(row);
  }
  if (!elements['caregiver-progress'].children.length) elements['caregiver-progress'].textContent = 'A primeira prática ainda não foi concluída.';

  elements['unlock-skill'].replaceChildren();
  ALL_SKILLS.filter((skill) => !isSkillUnlocked(state.progress, skill.id)).forEach((skill) => {
    const option = document.createElement('option');
    option.value = skill.id;
    option.textContent = `${getStageForSkill(skill.id).title} — ${skill.title}`;
    elements['unlock-skill'].append(option);
  });
  elements['unlock-button'].disabled = !elements['unlock-skill'].value;
}

function openCaregiver() {
  renderCaregiver();
  elements['caregiver-dialog'].showModal();
}

function savePreferences() {
  state.preferences = {
    ...state.preferences,
    sessionLength: Number(elements['session-length'].value),
    reducedMotion: elements['reduced-motion'].checked,
    highContrast: elements['high-contrast'].checked,
    recordResponseTime: elements['record-time'].checked,
  };
  persist();
  setPreferences();
}

elements['home-button'].addEventListener('click', () => renderHome());
elements['caregiver-button'].addEventListener('click', openCaregiver);
elements['continue-button'].addEventListener('click', resumeSession);
elements['review-button'].addEventListener('click', () => {
  const [review] = getSkillsNeedingReview(state.progress);
  if (review) startSession(review.skillId, { reviewItems: review.items });
});
elements['exit-session'].addEventListener('click', () => { abandonActiveSession(); renderHome(); });
elements['next-question'].addEventListener('click', () => {
  if (!state.activeSession) return;
  if (state.activeSession.currentIndex === state.activeSession.questions.length - 1) finishSession();
  else {
    state.activeSession = moveToNextQuestion(state.activeSession);
    persist();
    renderActivity();
  }
});
elements['result-review'].addEventListener('click', () => {
  const items = getReviewItems(state.progress, lastResult.skillId);
  startSession(lastResult.skillId, { reviewItems: items });
});
elements['result-repeat'].addEventListener('click', () => startSession(lastResult.skillId));
elements['result-home'].addEventListener('click', renderHome);

for (const id of ['session-length', 'reduced-motion', 'high-contrast', 'record-time']) {
  elements[id].addEventListener('change', savePreferences);
}
elements['unlock-button'].addEventListener('click', () => {
  const skillId = elements['unlock-skill'].value;
  if (!skillId) return;
  state.progress = manuallyUnlock(state.progress, skillId);
  persist();
  renderCaregiver();
  elements['import-status'].textContent = 'Habilidade desbloqueada somente neste dispositivo.';
});
elements['export-button'].addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'lumon-backup.json';
  link.click();
  URL.revokeObjectURL(url);
});
elements['import-file'].addEventListener('change', async () => {
  const [file] = elements['import-file'].files;
  if (!file) return;
  try {
    state = importState(await file.text());
    setPreferences();
    renderCaregiver();
    elements['import-status'].textContent = 'Backup importado com sucesso.';
  } catch {
    elements['import-status'].textContent = 'O arquivo não é um backup válido do Lumon.';
  } finally {
    elements['import-file'].value = '';
  }
});
elements['reset-button'].addEventListener('click', () => elements['reset-dialog'].showModal());
elements['cancel-reset'].addEventListener('click', () => elements['reset-dialog'].close());
elements['confirm-reset'].addEventListener('click', () => {
  clearLumonData();
  state = createDefaultState();
  persist();
  elements['reset-dialog'].close();
  elements['caregiver-dialog'].close();
  renderHome();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !elements['activity-screen'].hidden && !document.querySelector('dialog[open]')) {
    event.preventDefault();
    abandonActiveSession();
    renderHome();
  }
});

elements['update-button'].addEventListener('click', () => {
  updateRequested = true;
  activateWaitingWorker(lastRegistration);
});
elements['dismiss-update'].addEventListener('click', () => {
  elements['update-banner'].hidden = true;
});
navigator.serviceWorker?.addEventListener('controllerchange', () => {
  if (updateRequested) location.reload();
});

setPreferences();
persist();
renderHome();
registerPwa({
  onUpdate(registration) {
    lastRegistration = registration;
    elements['update-banner'].hidden = false;
  },
}).then((registration) => {
  window.__lumonPwa = { registration, activateWaitingWorker: () => activateWaitingWorker(registration) };
});
