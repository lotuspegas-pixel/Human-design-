import type { ColorCluster, ArchetypeId } from '../types';
import ArchetypeGlyph from './ArchetypeGlyph';
import { clusterInk } from '../utils/clusterVisuals';

interface Props {
  cluster: ColorCluster;
  score: number;
  isHighest: boolean;
  highestLabel?: string;
}

export default function ColorClusterCard({ cluster, score, isHighest, highestLabel = 'Hoogste' }: Props) {
  const ink = clusterInk[cluster.id];
  return (
    <div
      className="card-surface print-avoid-break relative overflow-hidden p-5 transition-all"
      style={isHighest ? { boxShadow: 'var(--shadow-card-lift)', borderColor: `${cluster.color}44` } : undefined}
    >
      <span
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${cluster.color}, ${cluster.color}33)` }}
        aria-hidden="true"
      />
      <div className="mb-2 flex items-center gap-2">
        <span
          className="inline-block h-3.5 w-3.5 rounded-full"
          style={{ background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${cluster.color} 65%)` }}
        />
        <h3 className="font-display text-base font-medium" style={{ color: ink }}>{cluster.name}</h3>
        {isHighest && (
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
            style={{ background: `${cluster.color}14`, color: ink }}
          >
            {highestLabel}
          </span>
        )}
      </div>
      <p className="mb-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">{cluster.meaning}</p>

      <div className="mb-3 flex items-center gap-2 text-[var(--color-ink-faint)]">
        {cluster.archetypes.map((aid: ArchetypeId) => (
          <span key={aid} style={{ color: cluster.color }}>
            <ArchetypeGlyph id={aid} className="h-4 w-4" strokeWidth={1.4} />
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-parchment-deep)]">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(score, 2)}%`,
              background: `linear-gradient(90deg, ${cluster.color}80, ${cluster.color})`,
            }}
          />
        </div>
        <span className="font-display text-sm" style={{ color: ink }}>{Math.round(score)}</span>
      </div>
    </div>
  );
}
