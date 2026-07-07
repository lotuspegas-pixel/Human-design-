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

export type ScoreLevel = 'low' | 'moderate' | 'high' | 'very-high';

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
}

export interface Question {
  id: number;
  text: string;
  archetypeId: ArchetypeId;
  reverseScored: boolean;
  colorCluster: ColorClusterId;
  consistencyPair?: number;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface ArchetypeScore {
  archetypeId: ArchetypeId;
  average: number;
  score100: number;
  level: ScoreLevel;
  standardDeviation: number;
}

export interface ClusterScore {
  clusterId: ColorClusterId;
  score100: number;
  level: ScoreLevel;
}

export type ConsistencyLevel = 'hoog' | 'gemiddeld' | 'laag';

export interface ConsistencyResult {
  totalPairs: number;
  consistentPairs: number;
  score: number;
  isReliable: boolean;
  qualitativeLevel: ConsistencyLevel;
}

export interface ScoreResult {
  archetypeScores: ArchetypeScore[];
  clusterScores: ClusterScore[];
  highestArchetype: ArchetypeId;
  secondArchetype: ArchetypeId;
  thirdArchetype: ArchetypeId;
  lowestArchetype: ArchetypeId;
  highestCluster: ColorClusterId;
  secondCluster: ColorClusterId;
  isBlendProfile: boolean;
  isBalancedProfile: boolean;
  consistency: ConsistencyResult;
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
