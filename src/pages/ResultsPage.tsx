import type { Answer, ScoreResult } from '../types';
import type { BirthData, HumanDesignResult } from '../types/humanDesign';
import { archetypes, getArchetype } from '../data/archetypes';
import { colorClusters, getCluster } from '../data/colorClusters';
import { localizedReport, localizedMergedReport, isNativeReportLocale } from '../logic/reportDispatcher';
import { archetypeMeaning, clusterMeaning, hdTypeName, hdTypeStrategy, hdAuthorityName } from '../i18n/meta';
import { useI18n } from '../i18n/LanguageContext';
import { clusterInk } from '../utils/clusterVisuals';
import ScoreBar from '../components/ScoreBar';
import ColorClusterCard from '../components/ColorClusterCard';
import RadarChart from '../components/RadarChart';
import ReportView from '../components/ReportView';
import ReportCover from '../components/ReportCover';
import ReportSummaryStrip from '../components/ReportSummaryStrip';
import type { SummaryItem } from '../components/ReportSummaryStrip';
import ArchetypeGlyph from '../components/ArchetypeGlyph';
import DecorativeAura from '../components/DecorativeAura';
import DownloadButtons from '../components/DownloadButtons';

const indigo = colorClusters.find((c) => c.id === 'indigo')!.color;

interface Props {
  result: ScoreResult;
  answers: Answer[];
  onReset: () => void;
  hdResult: HumanDesignResult | null;
  birthData: BirthData | null;
  onAddHumanDesign: () => void;
}

export default function ResultsPage({ result, answers: _answers, onReset, hdResult, birthData, onAddHumanDesign }: Props) {
  const { t, locale } = useI18n();
  const primary = getArchetype(result.highestArchetype);
  const secondary = getArchetype(result.secondArchetype);
  const third = getArchetype(result.thirdArchetype);
  const mainCluster = getCluster(result.highestCluster);
  const accent = mainCluster.color;
  const ink = clusterInk[mainCluster.id];
  const primaryScore = result.archetypeScores.find((s) => s.archetypeId === result.highestArchetype)!;
  const secondaryScore = result.archetypeScores.find((s) => s.archetypeId === result.secondArchetype)!;

  const reportSections =
    hdResult && birthData
      ? localizedMergedReport(result, hdResult, birthData, locale)
      : localizedReport(result, locale);

  const consLevel = result.consistency.qualitativeLevel;
  const relTone =
    consLevel === 'hoog'
      ? { accent: '#10B981', ink: 'var(--color-jade-ink)', text: t.reliabilityHigh }
      : consLevel === 'gemiddeld'
        ? { accent: '#F59E0B', ink: 'var(--color-amber-ink)', text: t.reliabilityMedium }
        : { accent: '#DC2626', ink: 'var(--color-karmijn-ink)', text: t.reliabilityLow };

  const completedText = `${t.completedOn} ${new Date(result.completedAt).toLocaleDateString(locale)}`;

  const summaryItems: SummaryItem[] = [
    {
      label: t.highestBadge,
      value: primary.name,
      sub: `${Math.round(primaryScore.score100)}`,
      accent,
      ink,
      icon: <ArchetypeGlyph id={primary.id} className="h-[18px] w-[18px]" strokeWidth={1.4} />,
    },
    {
      label: t.secondProfile,
      value: secondary.name,
      sub: `${Math.round(secondaryScore.score100)}`,
      accent: colorClusters.find((c) => c.id === secondary.colorCluster)!.color,
      ink: clusterInk[secondary.colorCluster],
      icon: <ArchetypeGlyph id={secondary.id} className="h-[18px] w-[18px]" strokeWidth={1.4} />,
    },
    {
      label: t.colorClusters,
      value: mainCluster.name,
      accent,
      ink,
      icon: (
        <span
          className="inline-block h-3.5 w-3.5 rounded-full"
          style={{ background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${accent} 65%)` }}
        />
      ),
    },
    {
      label: t.reliability,
      value: `${result.consistency.score}% ${t.consistencyWord}`,
      accent: relTone.accent,
      ink: relTone.ink,
      icon: (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3.5 19 6v5c0 4.5-3 7.7-7 9.5-4-1.8-7-5-7-9.5V6Z" />
          <path d="M9 11.5 11 13.5 15 9.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-10 print:space-y-5">
      {/* Report cover + top-3 */}
      <ReportCover
        overline={birthData ? t.resultsReadingOf(birthData.firstName) : t.resultsYourProfile}
        primary={{ id: primary.id, name: primary.name, score: primaryScore.score100 }}
        secondary={{ id: secondary.id, name: secondary.name, score: secondaryScore.score100 }}
        third={{ id: third.id, name: third.name }}
        meaning={archetypeMeaning(locale, primary.id)}
        accentColor={accent}
        clusterId={mainCluster.id}
        completedText={completedText}
        isBlend={result.isBlendProfile}
        blendLabel={t.blendBadge}
        primaryLabel={t.highestBadge}
        secondLabel={t.secondProfile}
        thirdLabel={t.thirdProfile}
      />

      {/* Visual summary strip */}
      <div className="reveal" style={{ animationDelay: '60ms' }}>
        <ReportSummaryStrip items={summaryItems} />
      </div>

      {/* Reliability status badge */}
      <div className="reveal flex justify-center print:hidden" style={{ animationDelay: '100ms' }}>
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          style={{ borderColor: `${relTone.accent}44`, background: `${relTone.accent}0f`, color: relTone.ink }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: relTone.accent }} />
          <span className="font-medium">{t.reliability}: {result.consistency.score}%</span>
          <span className="text-[var(--color-ink-soft)]">{relTone.text}</span>
        </span>
      </div>

      {/* Human Design CTA or summary */}
      {!hdResult ? (
        <div
          className="card-surface card-corner reveal relative overflow-hidden p-6 sm:p-8 print:hidden"
          style={{ animationDelay: '140ms', background: `radial-gradient(120% 100% at 100% 0%, ${indigo}14, #fff 60%)` }}
        >
          <DecorativeAura color={indigo} variant="top-right" opacity={0.12} />
          <div className="relative">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-indigo-ink)' }}>
              {t.energeticDesign}
            </p>
            <h3 className="mb-2 font-display text-2xl font-medium text-[var(--color-ink)]">{t.deepenTitle}</h3>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)]">{t.deepenBody}</p>
            <button
              onClick={onAddHumanDesign}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: 'var(--color-indigo-cluster)' }}
            >
              {t.deepenCta}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="card-surface card-corner reveal relative overflow-hidden p-6 sm:p-8"
          style={{ animationDelay: '140ms', background: `radial-gradient(120% 100% at 100% 0%, ${indigo}14, #fff 60%)` }}
        >
          <DecorativeAura color={indigo} variant="top-right" opacity={0.1} />
          <div className="relative">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-indigo-ink)' }}>
              {t.energeticDesign}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-medium text-[var(--color-ink)]">{hdTypeName(locale, hdResult.type)}</h3>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{hdTypeStrategy(locale, hdResult.type)}</p>
              </div>
              <div className="sm:border-l sm:border-[var(--color-hairline)] sm:pl-5">
                <h3 className="font-display text-xl font-medium text-[var(--color-ink)]">{hdAuthorityName(locale, hdResult.authority)}</h3>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  {t.hdProfileWord} {hdResult.profile[0]}/{hdResult.profile[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {result.isBalancedProfile && (
        <div
          className="reveal rounded-2xl border px-5 py-4 text-sm"
          style={{ borderColor: `${indigo}33`, background: `${indigo}0d`, color: 'var(--color-indigo-ink)' }}
        >
          {t.balancedNote}
        </div>
      )}

      {/* Radar + scores side by side on desktop */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-surface reveal p-6 sm:p-8" style={{ animationDelay: '160ms' }}>
          <h3 className="mb-4 text-center font-display text-lg font-medium text-[var(--color-ink)]">{t.archetypeBalance}</h3>
          <RadarChart scores={result.archetypeScores} primaryColor={accent} />
        </div>
        <div className="card-surface reveal p-6 print:shadow-none sm:p-8" style={{ animationDelay: '200ms' }}>
          <h3 className="mb-5 font-display text-lg font-medium text-[var(--color-ink)]">{t.archetypeScores}</h3>
          {[...result.archetypeScores]
            .sort((a, b) => b.score100 - a.score100)
            .map((s, idx) => {
              const arch = archetypes.find((a) => a.id === s.archetypeId)!;
              const cluster = colorClusters.find((c) => c.id === arch.colorCluster)!;
              return (
                <ScoreBar
                  key={s.archetypeId}
                  id={s.archetypeId}
                  label={arch.name}
                  score={s.score100}
                  color={cluster.color}
                  ink={clusterInk[arch.colorCluster]}
                  rank={idx + 1}
                />
              );
            })}
        </div>
      </div>

      {/* Color Clusters */}
      <div className="reveal" style={{ animationDelay: '240ms' }}>
        <h3 className="mb-4 font-display text-lg font-medium text-[var(--color-ink)]">{t.colorClusters}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...result.clusterScores]
            .sort((a, b) => b.score100 - a.score100)
            .map((cs) => {
              const cluster = colorClusters.find((c) => c.id === cs.clusterId)!;
              return (
                <ColorClusterCard
                  key={cs.clusterId}
                  cluster={{ ...cluster, meaning: clusterMeaning(locale, cs.clusterId) }}
                  score={cs.score100}
                  isHighest={cs.clusterId === result.highestCluster}
                  highestLabel={t.highestBadge}
                />
              );
            })}
        </div>
      </div>

      {/* Report */}
      <div>
        <h3 className="mb-2 font-display text-2xl font-medium text-[var(--color-ink)]">
          {hdResult ? t.reportTitleMerged : t.reportTitle}
        </h3>
        {!isNativeReportLocale(locale) && (
          <p className="mb-4 rounded-lg border border-[var(--color-hairline)] bg-white/70 px-4 py-2.5 text-xs text-[var(--color-ink-soft)]">
            {t.reportLanguageFallback}
          </p>
        )}
        <ReportView sections={reportSections} accentColor={accent} ink={ink} />
      </div>

      {/* Actions */}
      <DownloadButtons sections={reportSections} result={result} onReset={onReset} />
    </div>
  );
}
