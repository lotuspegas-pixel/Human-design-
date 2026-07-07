import type { ColorCluster } from '../types';

interface Props {
  cluster: ColorCluster;
  score: number;
  isHighest: boolean;
}

export default function ColorClusterCard({ cluster, score, isHighest }: Props) {
  return (
    <div
      className={`card-surface p-5 transition-all ${isHighest ? 'card-surface-lift' : ''}`}
      style={{ borderColor: isHighest ? `${cluster.color}55` : undefined }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-3.5 w-3.5 rounded-full"
          style={{ backgroundColor: cluster.color }}
        />
        <h3 className="font-display text-base font-medium text-[var(--color-ink)]">{cluster.name}</h3>
        {isHighest && (
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
            Hoogste
          </span>
        )}
      </div>
      <p className="mb-3 text-sm text-[var(--color-ink-soft)]">{cluster.meaning}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.max(score, 2)}%`,
            background: `linear-gradient(90deg, ${cluster.color}99, ${cluster.color})`,
          }}
        />
      </div>
      <p className="mt-1 text-right font-display text-sm text-[var(--color-ink-soft)]">{Math.round(score)}</p>
    </div>
  );
}
