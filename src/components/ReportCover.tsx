import type { ArchetypeId, ColorClusterId } from '../types';
import ArchetypeGlyph from './ArchetypeGlyph';
import ScoreSeal from './ScoreSeal';
import ClusterOrb from './ClusterOrb';
import DecorativeAura from './DecorativeAura';
import { clusterInk } from '../utils/clusterVisuals';

interface ArchetypeSlot {
  id: ArchetypeId;
  name: string;
  score?: number;
}

interface Props {
  overline: string;
  primary: ArchetypeSlot;
  secondary: ArchetypeSlot;
  third: ArchetypeSlot;
  meaning: string;
  accentColor: string;
  clusterId: ColorClusterId;
  completedText: string;
  isBlend: boolean;
  blendLabel: string;
  primaryLabel: string;
  secondLabel: string;
  thirdLabel: string;
}

/** De omslag van het persoonlijke rapport: overline, seal, naam, betekenis en de top-3 kaarten. */
export default function ReportCover({
  overline, primary, secondary, third, meaning, accentColor, clusterId,
  completedText, isBlend, blendLabel, primaryLabel, secondLabel, thirdLabel,
}: Props) {
  const ink = clusterInk[clusterId];

  return (
    <div className="reveal">
      <div
        className="card-corner relative overflow-hidden rounded-[1.5rem] border border-[var(--color-hairline-soft)] px-6 py-10 shadow-[var(--shadow-card-lift)] sm:px-12 sm:py-14"
        style={{ background: `radial-gradient(120% 90% at 50% -20%, ${accentColor}22, #fff 55%)` }}
      >
        <DecorativeAura color={accentColor} variant="top-right" opacity={0.14} />
        <DecorativeAura color={accentColor} variant="bottom-left" opacity={0.08} />

        <div className="relative flex flex-col items-center text-center">
          <ClusterOrb className="mb-5" size={9} />
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-ink-faint)]">
            {overline}
          </p>

          <div className="seal-in mb-6">
            <ScoreSeal score={primary.score ?? 0} color={accentColor} label={primaryLabel} />
          </div>

          <div className="mb-4 flex items-center justify-center" style={{ color: accentColor }}>
            <ArchetypeGlyph id={primary.id} className="h-6 w-6" strokeWidth={1.4} />
          </div>

          <h2 className="mb-4 font-display text-4xl font-medium leading-tight text-[var(--color-ink)] sm:text-5xl">
            {primary.name}
          </h2>

          <p className="reading-column mx-auto border-t border-[var(--color-hairline)] pt-4 font-display text-lg italic leading-relaxed text-[var(--color-ink-soft)]">
            {meaning}
          </p>

          {isBlend && (
            <span
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: `${accentColor}55`, color: ink, background: `${accentColor}12` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
              {blendLabel}
            </span>
          )}

          <p className="mt-6 text-xs text-[var(--color-ink-faint)]">{completedText}</p>
        </div>
      </div>

      {/* Top-3 archetype kaarten */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <TopCard slot={primary} label={primaryLabel} accent={accentColor} ink={ink} isPrimary showScore />
        <TopCard slot={secondary} label={secondLabel} accent={accentColor} ink={ink} showScore />
        <TopCard slot={third} label={thirdLabel} accent={accentColor} ink={ink} />
      </div>
    </div>
  );
}

function TopCard({
  slot, label, accent, ink, isPrimary = false, showScore = false,
}: {
  slot: ArchetypeSlot;
  label: string;
  accent: string;
  ink: string;
  isPrimary?: boolean;
  showScore?: boolean;
}) {
  return (
    <div
      className="card-surface print-avoid-break relative overflow-hidden p-5"
      style={isPrimary ? { boxShadow: 'var(--shadow-card-lift)', borderColor: `${accent}44` } : undefined}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: ink }}>
          {label}
        </span>
        <span style={{ color: accent }}>
          <ArchetypeGlyph id={slot.id} className="h-[18px] w-[18px]" strokeWidth={1.4} />
        </span>
      </div>
      <h3 className="font-display text-lg font-medium leading-snug text-[var(--color-ink)]">{slot.name}</h3>
      {showScore && slot.score !== undefined && (
        <p className="mt-1 font-display text-2xl" style={{ color: accent }}>
          {Math.round(slot.score)}
        </p>
      )}
    </div>
  );
}
