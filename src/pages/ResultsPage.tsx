import type { Answer, ScoreResult } from '../types';
import { archetypes, getArchetype } from '../data/archetypes';
import { colorClusters, getCluster } from '../data/colorClusters';
import { generateReport } from '../logic/report';
import ScoreBar from '../components/ScoreBar';
import ColorClusterCard from '../components/ColorClusterCard';
import ReportView from '../components/ReportView';
import DownloadButtons from '../components/DownloadButtons';

interface Props {
  result: ScoreResult;
  answers: Answer[];
  onReset: () => void;
}

export default function ResultsPage({ result, answers: _answers, onReset }: Props) {
  const primary = getArchetype(result.highestArchetype);
  const secondary = getArchetype(result.secondArchetype);
  const mainCluster = getCluster(result.highestCluster);
  const reportSections = generateReport(result);

  return (
    <div className="space-y-8 print:space-y-4">
      {/* Header */}
      <div className="text-center print:text-left">
        <h2 className="mb-2 text-3xl font-bold text-stone-800">Jouw Arcana Profile</h2>
        <p className="text-stone-500">
          Voltooid op {new Date(result.completedAt).toLocaleDateString('nl-NL')}
        </p>
      </div>

      {/* Primary & Secondary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-xl border-2 p-6 shadow-sm"
          style={{ borderColor: mainCluster.color }}
        >
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
            Hoofdprofiel
          </p>
          <h3 className="mb-2 text-xl font-bold text-stone-800">{primary.name}</h3>
          <p className="text-sm text-stone-600">{primary.meaning}</p>
          {result.isBlendProfile && (
            <span className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Blend profiel
            </span>
          )}
        </div>
        <div className="rounded-xl border border-stone-200 p-6 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
            Tweede profiel
          </p>
          <h3 className="mb-2 text-xl font-bold text-stone-800">{secondary.name}</h3>
          <p className="text-sm text-stone-600">{secondary.meaning}</p>
        </div>
      </div>

      {result.isBalancedProfile && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700">
          Je profiel is opvallend gebalanceerd: alle kleurclusters liggen dicht bij elkaar.
        </div>
      )}

      {/* Archetype Scores */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm print:shadow-none">
        <h3 className="mb-4 text-lg font-semibold text-stone-800">Archetype scores</h3>
        {result.archetypeScores
          .sort((a, b) => b.score100 - a.score100)
          .map((score) => {
            const arch = archetypes.find((a) => a.id === score.archetypeId)!;
            const cluster = colorClusters.find((c) => c.id === arch.colorCluster)!;
            return (
              <ScoreBar
                key={score.archetypeId}
                label={arch.name}
                score={score.score100}
                color={cluster.color}
              />
            );
          })}
      </div>

      {/* Color Clusters */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-stone-800">Kleurclusters</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {result.clusterScores
            .sort((a, b) => b.score100 - a.score100)
            .map((cs) => {
              const cluster = colorClusters.find((c) => c.id === cs.clusterId)!;
              return (
                <ColorClusterCard
                  key={cs.clusterId}
                  cluster={cluster}
                  score={cs.score100}
                  isHighest={cs.clusterId === result.highestCluster}
                />
              );
            })}
        </div>
      </div>

      {/* Report */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-stone-800">Jouw rapport</h3>
        <ReportView sections={reportSections} />
      </div>

      {/* Actions */}
      <DownloadButtons sections={reportSections} result={result} onReset={onReset} />
    </div>
  );
}
