import { useI18n } from '../i18n/LanguageContext';
import { archetypes } from '../data/archetypes';
import { colorClusters } from '../data/colorClusters';
import ArchetypeGlyph from '../components/ArchetypeGlyph';
import ClusterOrb from '../components/ClusterOrb';
import DecorativeAura from '../components/DecorativeAura';
import ScoreSeal from '../components/ScoreSeal';
import SectionDivider from '../components/SectionDivider';
import { clusterInk } from '../utils/clusterVisuals';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal text-center lg:text-left">
          <ClusterOrb className="mb-6 justify-center lg:justify-start" size={11} />
          <h2 className="mb-4 font-display text-5xl font-medium leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-6xl">
            Arcana Profile
          </h2>
          <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-[var(--color-ink-soft)] lg:mx-0">
            {t.landingSubtitle}
          </p>
          <button
            onClick={onStart}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-8 py-3.5 text-base font-medium text-white shadow-[var(--shadow-card-lift)] transition hover:-translate-y-0.5 hover:opacity-95"
            style={{ backgroundColor: 'var(--color-ink)' }}
          >
            {t.landingStart}
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
            </svg>
          </button>
          <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-[var(--color-ink-faint)] lg:mx-0">
            {t.landingDisclaimer}
          </p>
        </div>

        {/* Decoratieve rapport-preview (puur visueel) */}
        <div className="reveal relative hidden lg:block" style={{ animationDelay: '120ms' }} aria-hidden="true">
          <DecorativeAura color="#F59E0B" variant="top-right" opacity={0.18} />
          <DecorativeAura color="#6366F1" variant="bottom-left" opacity={0.14} />
          <div className="card-corner relative mx-auto max-w-sm rotate-[1.5deg] overflow-hidden rounded-[1.5rem] border border-[var(--color-hairline-soft)] bg-white p-7 shadow-[var(--shadow-card-lift)]">
            <div className="mb-5 flex items-center justify-between">
              <ClusterOrb size={7} />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">Reading</span>
            </div>
            <div className="flex flex-col items-center">
              <ScoreSeal score={72} color="#F59E0B" size={104} />
              <div className="mt-3 flex items-center gap-2 text-[#92610A]">
                <ArchetypeGlyph id="idea-finder" className="h-5 w-5" />
                <span className="font-display text-lg text-[var(--color-ink)]">The Idea Finder</span>
              </div>
            </div>
            <div className="mt-6 space-y-2.5">
              {[
                { c: '#F59E0B', w: '86%' },
                { c: '#6366F1', w: '64%' },
                { c: '#DC2626', w: '48%' },
                { c: '#10B981', w: '38%' },
              ].map((b, i) => (
                <div key={i} className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full" style={{ width: b.w, background: `linear-gradient(90deg, ${b.c}99, ${b.c})` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionDivider className="my-14" />

      {/* Framework-showcase: acht archetypes + vier clusters */}
      <div className="reveal" style={{ animationDelay: '80ms' }}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {archetypes.map((a) => (
            <div key={a.id} className="card-surface flex flex-col items-center gap-2 px-3 py-5 text-center">
              <span style={{ color: clusterInk[a.colorCluster] }}>
                <ArchetypeGlyph id={a.id} className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <span className="font-display text-sm leading-snug text-[var(--color-ink)]">{a.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {colorClusters.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: clusterInk[c.id] }}>
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${c.color} 65%)` }}
              />
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
