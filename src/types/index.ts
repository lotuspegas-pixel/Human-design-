export type ArchetypeId =
  | 'idea-finder'
  | 'pattern-seer'
  | 'action-maker'
  | 'calm-keeper'
  | 'plan-builder'
  | 'clear-thinker'
  | 'people-helper'
  | 'heart-listener';

export type ColorClusterId = 'amber' | 'indigo' | 'karmijn' | 'jade';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  jungFunction: string;
  meaning: string;
  colorCluster: ColorClusterId;
  strength: string;
  riskUnderPressure: string;
  growthEdge: string;
  reflectionQuestion: string;
}

export interface ColorCluster {
  id: ColorClusterId;
  name: string;
  archetypes: [ArchetypeId, ArchetypeId];
  meaning: string;
  color: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
}

export interface Question {
  id: number;
  text: string;
  archetypeId: ArchetypeId;
  reverseScored: boolean;
  colorCluster: ColorClusterId;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface ArchetypeScore {
  archetypeId: ArchetypeId;
  average: number;
  score100: number;
}

export interface ClusterScore {
  clusterId: ColorClusterId;
  score100: number;
}

export interface ScoreResult {
  archetypeScores: ArchetypeScore[];
  clusterScores: ClusterScore[];
  highestArchetype: ArchetypeId;
  secondArchetype: ArchetypeId;
  highestCluster: ColorClusterId;
  secondCluster: ColorClusterId;
  isBlendProfile: boolean;
  isBalancedProfile: boolean;
  completedAt: string;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface SavedProgress {
  answers: Answer[];
  currentQuestion: number;
  timestamp: string;
}

export interface SavedResult {
  scoreResult: ScoreResult;
  answers: Answer[];
  reportDate: string;
}
