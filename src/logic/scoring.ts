import type { Answer, ArchetypeId, ArchetypeScore, ClusterScore, ConsistencyResult, ScoreLevel, ScoreResult } from '../types';
import { questions } from '../data/questions';
import { colorClusters } from '../data/colorClusters';

function getEffectiveScore(answer: Answer): number {
  const question = questions.find((q) => q.id === answer.questionId);
  if (!question) {
    throw new Error(`Onbekende vraag-ID: ${answer.questionId}. Dit wijst op een datafout in de vragenlijst.`);
  }
  return question.reverseScored ? 8 - answer.value : answer.value;
}

function getLevel(score100: number): ScoreLevel {
  if (score100 >= 75) return 'very-high';
  if (score100 >= 55) return 'high';
  if (score100 >= 35) return 'moderate';
  return 'low';
}

function standardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / (values.length - 1));
}

function calculateConsistency(answers: Answer[]): ConsistencyResult {
  const pairMap = new Map<number, number[]>();
  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question?.consistencyPair) continue;
    const effective = getEffectiveScore(answer);
    const existing = pairMap.get(question.consistencyPair) ?? [];
    existing.push(effective);
    pairMap.set(question.consistencyPair, existing);
  }

  let totalPairs = 0;
  let consistentPairs = 0;
  for (const [, scores] of pairMap) {
    if (scores.length === 2) {
      totalPairs++;
      // Op een 1-7 schaal telt een verschil van maximaal 1 punt als consistent (~17% van de schaalbreedte).
      if (Math.abs(scores[0] - scores[1]) <= 1) {
        consistentPairs++;
      }
    }
  }

  const score = totalPairs > 0 ? Math.round((consistentPairs / totalPairs) * 100) : 100;
  const qualitativeLevel: ScoreResult['consistency']['qualitativeLevel'] =
    score >= 75 ? 'hoog' : score >= 50 ? 'gemiddeld' : 'laag';
  return { totalPairs, consistentPairs, score, isReliable: score >= 75, qualitativeLevel };
}

export function calculateScores(answers: Answer[]): ScoreResult {
  const archetypeIds: ArchetypeId[] = [
    'idea-finder', 'pattern-seer', 'action-maker', 'calm-keeper',
    'plan-builder', 'clear-thinker', 'people-helper', 'heart-listener',
  ];

  const archetypeScores: ArchetypeScore[] = archetypeIds.map((archetypeId) => {
    const relevantQuestions = questions.filter((q) => q.archetypeId === archetypeId);
    const relevantAnswers = answers.filter((a) =>
      relevantQuestions.some((q) => q.id === a.questionId)
    );

    const scores = relevantAnswers.map(getEffectiveScore);
    const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 4;
    const score100 = ((average - 1) / 6) * 100;
    const rounded = Math.round(score100 * 10) / 10;
    const sd = standardDeviation(scores);

    return {
      archetypeId,
      average,
      score100: rounded,
      level: getLevel(rounded),
      standardDeviation: Math.round(sd * 100) / 100,
    };
  });

  const clusterScores: ClusterScore[] = colorClusters.map((cluster) => {
    const [a1, a2] = cluster.archetypes;
    const s1 = archetypeScores.find((s) => s.archetypeId === a1)!;
    const s2 = archetypeScores.find((s) => s.archetypeId === a2)!;
    const score100 = Math.round(((s1.score100 + s2.score100) / 2) * 10) / 10;
    return { clusterId: cluster.id, score100, level: getLevel(score100) };
  });

  const sortedArchetypes = [...archetypeScores].sort((a, b) => b.score100 - a.score100);
  const sortedClusters = [...clusterScores].sort((a, b) => b.score100 - a.score100);

  const isBlendProfile = Math.abs(sortedArchetypes[0].score100 - sortedArchetypes[1].score100) <= 5;

  const clusterValues = clusterScores.map((c) => c.score100);
  const clusterRange = Math.max(...clusterValues) - Math.min(...clusterValues);
  const isBalancedProfile = clusterRange <= 10;

  const consistency = calculateConsistency(answers);

  return {
    archetypeScores,
    clusterScores,
    highestArchetype: sortedArchetypes[0].archetypeId,
    secondArchetype: sortedArchetypes[1].archetypeId,
    thirdArchetype: sortedArchetypes[2].archetypeId,
    lowestArchetype: sortedArchetypes[sortedArchetypes.length - 1].archetypeId,
    highestCluster: sortedClusters[0].clusterId,
    secondCluster: sortedClusters[1].clusterId,
    isBlendProfile,
    isBalancedProfile,
    consistency,
    completedAt: new Date().toISOString(),
  };
}
