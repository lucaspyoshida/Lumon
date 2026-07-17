import { FIRST_SKILL_ID, MASTERY_RULES, getNextSkill, getSkill } from '../config/levels.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createProgress() {
  return {
    completedSessions: [],
    skillMastery: {},
    weakItems: {},
    unlockedSkills: [FIRST_SKILL_ID],
    manualUnlocked: [],
  };
}

export function evaluateMastery(progress, skillId, rules = MASTERY_RULES) {
  const skill = getSkill(skillId);
  const completed = progress.completedSessions
    .filter((session) => session.skillId === skillId && session.completed)
    .slice(-rules.recentSessions);
  const allRecent = progress.completedSessions
    .filter((session) => session.skillId === skillId)
    .slice(-rules.abandonmentWindow);
  const recentAbandonments = allRecent.filter((session) => session.abandoned).length;
  const target = skill?.masteryTarget ?? rules.accuracyTarget;
  const averageAccuracy = completed.length
    ? completed.reduce((sum, session) => sum + session.accuracy, 0) / completed.length
    : 0;

  const itemStats = new Map();
  for (const session of completed) {
    for (const answer of session.answers) {
      const item = itemStats.get(answer.itemKey) ?? { attempts: 0, errors: 0 };
      item.attempts += 1;
      item.errors += answer.correct ? 0 : 1;
      itemStats.set(answer.itemKey, item);
    }
  }
  const maxItemErrorRate = itemStats.size
    ? Math.max(...[...itemStats.values()].map((item) => item.errors / item.attempts))
    : 0;
  const hasEnoughSessions = completed.length >= rules.requiredSessions;
  const mastered = hasEnoughSessions
    && averageAccuracy >= target
    && maxItemErrorRate <= rules.maxItemErrorRate
    && recentAbandonments <= rules.maxRecentAbandonments;

  return {
    mastered,
    completedSessions: completed.length,
    requiredSessions: rules.requiredSessions,
    averageAccuracy,
    accuracyTarget: target,
    maxItemErrorRate,
    recentAbandonments,
  };
}

function updateWeakItems(progress, session) {
  const skillItems = progress.weakItems[session.skillId] ?? {};
  for (const answer of session.answers) {
    const item = skillItems[answer.itemKey] ?? { attempts: 0, errors: 0, recent: [], lastSeen: null };
    item.attempts += 1;
    item.errors += answer.correct ? 0 : 1;
    item.recent = [...item.recent, Boolean(answer.correct)].slice(-8);
    item.lastSeen = session.finishedAt;
    skillItems[answer.itemKey] = item;
  }
  progress.weakItems[session.skillId] = skillItems;
}

export function recordSession(currentProgress, session, rules = MASTERY_RULES) {
  const progress = clone(currentProgress);
  const normalizedSession = {
    ...session,
    answers: Array.isArray(session.answers) ? session.answers : [],
    completed: Boolean(session.completed),
    abandoned: Boolean(session.abandoned),
  };
  normalizedSession.accuracy = normalizedSession.answers.length
    ? normalizedSession.answers.filter((answer) => answer.correct).length / normalizedSession.answers.length
    : 0;
  progress.completedSessions.push(normalizedSession);
  progress.completedSessions = progress.completedSessions.slice(-250);
  updateWeakItems(progress, normalizedSession);

  const mastery = evaluateMastery(progress, session.skillId, rules);
  progress.skillMastery[session.skillId] = mastery;
  if (mastery.mastered) {
    const next = getNextSkill(session.skillId);
    if (next && !progress.unlockedSkills.includes(next.id)) progress.unlockedSkills.push(next.id);
  }
  return progress;
}

export function isSkillUnlocked(progress, skillId) {
  return skillId === FIRST_SKILL_ID
    || progress.unlockedSkills.includes(skillId)
    || progress.manualUnlocked.includes(skillId);
}

export function manuallyUnlock(currentProgress, skillId) {
  if (!getSkill(skillId)) return clone(currentProgress);
  const progress = clone(currentProgress);
  if (!progress.manualUnlocked.includes(skillId)) progress.manualUnlocked.push(skillId);
  return progress;
}

export function getReviewItems(progress, skillId, limit = 8) {
  const entries = Object.entries(progress.weakItems[skillId] ?? {});
  return entries
    .filter(([, item]) => {
      const recentErrors = item.recent.filter((correct) => !correct).length;
      return recentErrors > 0 && recentErrors / item.recent.length > MASTERY_RULES.maxItemErrorRate;
    })
    .sort(([, left], [, right]) => {
      const leftRate = left.recent.filter((correct) => !correct).length / left.recent.length;
      const rightRate = right.recent.filter((correct) => !correct).length / right.recent.length;
      return rightRate - leftRate || right.errors - left.errors;
    })
    .slice(0, limit)
    .map(([itemKey]) => itemKey);
}

export function getSkillsNeedingReview(progress) {
  return Object.keys(progress.weakItems)
    .map((skillId) => ({ skillId, items: getReviewItems(progress, skillId) }))
    .filter((entry) => entry.items.length > 0)
    .sort((left, right) => right.items.length - left.items.length);
}

export function getRecommendation(progress, skillId) {
  const mastery = evaluateMastery(progress, skillId);
  const weakItems = getReviewItems(progress, skillId);
  if (mastery.mastered) {
    const next = getNextSkill(skillId);
    return next
      ? { type: 'advance', message: `Muito bem! A próxima prática, “${next.title}”, está disponível.`, nextSkillId: next.id }
      : { type: 'complete', message: 'Você consolidou a última habilidade da trilha.' };
  }
  if (weakItems.length > 0) {
    return { type: 'review', message: 'Vamos praticar mais um pouco os itens que pedem atenção.', weakItems };
  }
  const remaining = Math.max(0, MASTERY_RULES.requiredSessions - mastery.completedSessions);
  return {
    type: 'practice',
    message: remaining > 0
      ? `Mais ${remaining} ${remaining === 1 ? 'sessão curta ajuda' : 'sessões curtas ajudam'} a mostrar segurança.`
      : 'Vamos praticar mais um pouco, com calma.',
  };
}
