import type { Answer, ArchetypeId, ArchetypeScore, ClusterScore, ScoreResult } from '../types';
import { questions } from '../data/questions';
import { colorClusters } from '../data/colorClusters';

function getEffectiveScore(answer: Answer): number {
  const question = questions.find((q) => q.id === answer.questionId);
  if (!question) return 0;
  return question.reverseScored ? 8 - answer.value : answer.value;
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

    return { archetypeId, average, score100: Math.round(score100 * 10) / 10 };
  });

  const clusterScores: ClusterScore[] = colorClusters.map((cluster) => {
    const [a1, a2] = cluster.archetypes;
    const s1 = archetypeScores.find((s) => s.archetypeId === a1)!;
    const s2 = archetypeScores.find((s) => s.archetypeId === a2)!;
    const score100 = Math.round(((s1.score100 + s2.score100) / 2) * 10) / 10;
    return { clusterId: cluster.id, score100 };
  });

  const sortedArchetypes = [...archetypeScores].sort((a, b) => b.score100 - a.score100);
  const sortedClusters = [...clusterScores].sort((a, b) => b.score100 - a.score100);

  const highestArchetype = sortedArchetypes[0].archetypeId;
  const secondArchetype = sortedArchetypes[1].archetypeId;
  const highestCluster = sortedClusters[0].clusterId;
  const secondCluster = sortedClusters[1].clusterId;

  const isBlendProfile = Math.abs(sortedArchetypes[0].score100 - sortedArchetypes[1].score100) <= 5;

  const clusterValues = clusterScores.map((c) => c.score100);
  const clusterRange = Math.max(...clusterValues) - Math.min(...clusterValues);
  const isBalancedProfile = clusterRange <= 10;

  return {
    archetypeScores,
    clusterScores,
    highestArchetype,
    secondArchetype,
    highestCluster,
    secondCluster,
    isBlendProfile,
    isBalancedProfile,
    completedAt: new Date().toISOString(),
  };
}
