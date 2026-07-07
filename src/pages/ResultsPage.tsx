import type { Answer, ScoreResult } from '../types';
import type { BirthData, HumanDesignResult } from '../types/humanDesign';
import { archetypes, getArchetype } from '../data/archetypes';
import { colorClusters, getCluster } from '../data/colorClusters';
import { generateReport } from '../logic/report';
import { generateMergedReport } from '../logic/humanDesign/mergedReport';
import { typeInfo, authorityInfo } from '../data/humanDesign/interpretations';
import ScoreBar from '../components/ScoreBar';
import ColorClusterCard from '../components/ColorClusterCard';
import ReportView from '../components/ReportView';
import DownloadButtons from '../components/DownloadButtons';

interface Props {
  result: ScoreResult;
  answers: Answer[];
  onReset: () => void;
  hdResult: HumanDesignResult | null;
  birthData: BirthData | null;
  onAddHumanDesign: () => void;
}

export default function ResultsPage({ result, answers: _answers, onReset, hdResult, birthData, onAddHumanDesign }: Props) {
  const primary = getArchetype(result.highestArchetype);
  const secondary = getArchetype(result.secondArchetype);
  const third = getArchetype(result.thirdArchetype);
  const mainCluster = getCluster(result.highestCluster);
  const primaryScore = result.archetypeScores.find((s) => s.archetypeId === result.highestArchetype)!;
  const secondaryScore = result.archetypeScores.find((s) => s.archetypeId === result.secondArchetype)!;

  const reportSections =
    hdResult && birthData ? generateMergedReport(result, hdResult, birthData) : generateReport(result);

  return (
    <div className="space-y-8 print:space-y-4">
      {/* Header */}
      <div className="text-center print:text-left">
        <h2 className="mb-2 text-3xl font-bold text-stone-800">
          {birthData ? `De reading van ${birthData.firstName}` : 'Jouw Arcana Profile'}
        </h2>
        <p className="text-stone-500">
          Voltooid op {new Date(result.completedAt).toLocaleDateString('nl-NL')}
        </p>
      </div>

      {/* Consistency indicator */}
      <div className={`rounded-xl border p-4 text-sm ${
        result.consistency.qualitativeLevel === 'hoog'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : result.consistency.qualitativeLevel === 'gemiddeld'
            ? 'border-amber-200 bg-amber-50 text-amber-700'
            : 'border-red-200 bg-red-50 text-red-700'
      }`}>
        <span className="font-medium">Betrouwbaarheid: </span>
        {result.consistency.score}% consistentie
        {result.consistency.qualitativeLevel === 'hoog'
          ? ' — je antwoorden zijn consequent en betrouwbaar.'
          : result.consistency.qualitativeLevel === 'gemiddeld'
            ? ' — over het algemeen consequent, met wat ruimte voor nuance.'
            : ' — overweeg het rapport met extra reflectie door te nemen.'}
      </div>

      {/* Human Design CTA or summary */}
      {!hdResult ? (
        <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm print:hidden">
          <h3 className="mb-2 text-lg font-semibold text-stone-800">Verdiep je reading</h3>
          <p className="mb-4 text-sm text-stone-600">
            Voeg een extra, optionele laag toe op basis van je geboortemoment (Human Design) en
            ontvang één samengevoegde, persoonlijke reading.
          </p>
          <button
            onClick={onAddHumanDesign}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Voeg Human Design toe
          </button>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-indigo-400">
            Energetisch ontwerp
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold text-stone-800">{typeInfo[hdResult.type].naam}</h3>
              <p className="text-sm text-stone-600">{typeInfo[hdResult.type].strategie}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-700">{authorityInfo[hdResult.authority].naam}</h3>
              <p className="text-sm text-stone-600">Profiel {hdResult.profile[0]}/{hdResult.profile[1]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Primary, Secondary, Third */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className="rounded-xl border-2 p-6 shadow-sm"
          style={{ borderColor: mainCluster.color }}
        >
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
            Hoofdprofiel
          </p>
          <h3 className="mb-1 text-xl font-bold text-stone-800">{primary.name}</h3>
          <p className="mb-2 text-lg font-semibold" style={{ color: mainCluster.color }}>
            {Math.round(primaryScore.score100)} punten
          </p>
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
          <h3 className="mb-1 text-xl font-bold text-stone-800">{secondary.name}</h3>
          <p className="mb-2 text-lg font-semibold text-stone-500">
            {Math.round(secondaryScore.score100)} punten
          </p>
          <p className="text-sm text-stone-600">{secondary.meaning}</p>
        </div>
        <div className="rounded-xl border border-stone-100 bg-stone-50 p-6 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
            Derde profiel
          </p>
          <h3 className="mb-1 text-lg font-bold text-stone-700">{third.name}</h3>
          <p className="text-sm text-stone-500">{third.meaning}</p>
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
        {[...result.archetypeScores]
          .sort((a, b) => b.score100 - a.score100)
          .map((s) => {
            const arch = archetypes.find((a) => a.id === s.archetypeId)!;
            const cluster = colorClusters.find((c) => c.id === arch.colorCluster)!;
            return (
              <ScoreBar
                key={s.archetypeId}
                label={arch.name}
                score={s.score100}
                color={cluster.color}
              />
            );
          })}
      </div>

      {/* Color Clusters */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-stone-800">Kleurclusters</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...result.clusterScores]
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
        <h3 className="mb-4 text-lg font-semibold text-stone-800">
          {hdResult ? 'Jouw volledige, samengevoegde reading' : 'Jouw uitgebreide rapport'}
        </h3>
        <ReportView sections={reportSections} />
      </div>

      {/* Actions */}
      <DownloadButtons sections={reportSections} result={result} onReset={onReset} />
    </div>
  );
}
