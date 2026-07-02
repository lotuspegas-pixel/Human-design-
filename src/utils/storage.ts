import type { Answer, SavedProgress, SavedResult, ScoreResult } from '../types';
import type { BirthData, HumanDesignResult, SavedBirthData } from '../types/humanDesign';

const KEYS = {
  progress: 'arcana-progress',
  result: 'arcana-result',
  humanDesign: 'arcana-human-design',
} as const;

export function saveProgress(answers: Answer[], currentQuestion: number): void {
  const data: SavedProgress = {
    answers,
    currentQuestion,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.progress, JSON.stringify(data));
}

export function loadProgress(): SavedProgress | null {
  const raw = localStorage.getItem(KEYS.progress);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedProgress;
  } catch {
    return null;
  }
}

export function clearProgress(): void {
  localStorage.removeItem(KEYS.progress);
}

export function saveResult(scoreResult: ScoreResult, answers: Answer[]): void {
  const data: SavedResult = {
    scoreResult,
    answers,
    reportDate: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.result, JSON.stringify(data));
}

export function loadResult(): SavedResult | null {
  const raw = localStorage.getItem(KEYS.result);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedResult;
  } catch {
    return null;
  }
}

export function saveHumanDesignData(birthData: BirthData, hdResult: HumanDesignResult): void {
  const data: SavedBirthData = { birthData, hdResult };
  localStorage.setItem(KEYS.humanDesign, JSON.stringify(data));
}

export function loadHumanDesignData(): SavedBirthData | null {
  const raw = localStorage.getItem(KEYS.humanDesign);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedBirthData;
  } catch {
    return null;
  }
}

export function clearAllData(): void {
  localStorage.removeItem(KEYS.progress);
  localStorage.removeItem(KEYS.result);
  localStorage.removeItem(KEYS.humanDesign);
}
