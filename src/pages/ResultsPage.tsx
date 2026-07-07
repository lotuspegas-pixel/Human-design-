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

const indigoColor = colorClusters.find((c) => c.id === 'indigo')!.color;

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
      {/* Report cover hero */}
      <div
        className="reveal card-surface-lift overflow-hidden p-8 text-center sm:p-12"
        style={{
          background: `linear-gradient(160deg, ${mainCluster.color}1a, white 60%)`,
        }}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
          {birthData ? `De reading van ${birthData.firstName}` : 'Jouw Arcana Profile'}
        </p>
        <div className="mb-2 font-display text-7xl font-medium leading-none sm:text-8xl" style={{ color: mainCluster.color }}>
          {Math.round(primaryScore.score100)}
        </div>
        <h2 className="mb-3 font-display text-3xl font-medium text-[var(--color-ink)] sm:text-4xl">
          {primary.name}
        </h2>
        <p className="mx-auto max-w-md border-l-2 pl-4 text-left font-display text-lg italic leading-relaxed text-[var(--color-ink-soft)] sm:text-center sm:border-l-0 sm:pl-0 sm:italic">
          {primary.meaning}
        </p>
        {result.isBlendProfile && (
          <span className="mt-4 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--color-ink-soft)] shadow-sm">
            Blend profiel
          </span>
        )}
        <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
          Voltooid op {new Date(result.completedAt).toLocaleDateString('nl-NL')}
        </p>
      </div>

      {/* Secondary / third strip */}
      <div className="reveal grid gap-3 sm:grid-cols-2" style={{ animationDelay: '80ms' }}>
        <div className="card-surface flex items-center justify-between p-4 sm:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">Tweede profiel</p>
            <h3 className="font-display text-lg text-[var(--color-ink)]">{secondary.name}</h3>
          </div>
          <span className="font-display text-2xl text-[var(--color-ink-soft)]">{Math.round(secondaryScore.score100)}</span>
        </div>
        <div className="card-surface flex items-center justify-between p-4 sm:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">Derde profiel</p>
            <h3 className="font-display text-lg text-[var(--color-ink)]">{third.name}</h3>
          </div>
        </div>
      </div>

      {/* Consistency indicator */}
      <div className={`reveal rounded-xl border p-4 text-sm ${
        result.consistency.qualitativeLevel === 'hoog'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : result.consistency.qualitativeLevel === 'gemiddeld'
            ? 'border-amber-200 bg-amber-50 text-amber-700'
            : 'border-red-200 bg-red-50 text-red-700'
      }`} style={{ animationDelay: '120ms' }}>
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
        <div className="card-surface reveal p-6 print:hidden" style={{ animationDelay: '160ms', background: `linear-gradient(135deg, ${indigoColor}0d, white)` }}>
          <h3 className="mb-2 font-display text-lg font-medium text-[var(--color-ink)]">Verdiep je reading</h3>
          <p className="mb-4 text-sm text-[var(--color-ink-soft)]">
            Voeg een extra, optionele laag toe op basis van je geboortemoment (Human Design) en
            ontvang één samengevoegde, persoonlijke reading.
          </p>
          <button
            onClick={onAddHumanDesign}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: 'var(--color-indigo-cluster)' }}
          >
            Voeg Human Design toe
          </button>
        </div>
      ) : (
        <div className="card-surface reveal p-6" style={{ animationDelay: '160ms', background: `linear-gradient(135deg, ${indigoColor}0d, white)` }}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-indigo-cluster)' }}>
            Energetisch ontwerp
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-medium text-[var(--color-ink)]">{typeInfo[hdResult.type].naam}</h3>
              <p className="text-sm text-[var(--color-ink-soft)]">{typeInfo[hdResult.type].strategie}</p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">{authorityInfo[hdResult.authority].naam}</h3>
              <p className="text-sm text-[var(--color-ink-soft)]">Profiel {hdResult.profile[0]}/{hdResult.profile[1]}</p>
            </div>
          </div>
        </div>
      )}

      {result.isBalancedProfile && (
        <div className="reveal rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700">
          Je profiel is opvallend gebalanceerd: alle kleurclusters liggen dicht bij elkaar.
        </div>
      )}

      {/* Archetype Scores */}
      <div className="card-surface reveal p-6 print:shadow-none sm:p-8" style={{ animationDelay: '200ms' }}>
        <h3 className="mb-5 font-display text-lg font-medium text-[var(--color-ink)]">Archetype scores</h3>
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
      <div className="reveal" style={{ animationDelay: '240ms' }}>
        <h3 className="mb-4 font-display text-lg font-medium text-[var(--color-ink)]">Kleurclusters</h3>
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
        <h3 className="mb-4 font-display text-lg font-medium text-[var(--color-ink)]">
          {hdResult ? 'Jouw volledige, samengevoegde reading' : 'Jouw uitgebreide rapport'}
        </h3>
        <ReportView sections={reportSections} />
      </div>

      {/* Actions */}
      <DownloadButtons sections={reportSections} result={result} onReset={onReset} />
    </div>
  );
}
