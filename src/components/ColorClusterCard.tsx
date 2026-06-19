import type { ColorCluster } from '../types';

interface Props {
  cluster: ColorCluster;
  score: number;
  isHighest: boolean;
}

export default function ColorClusterCard({ cluster, score, isHighest }: Props) {
  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        isHighest ? 'border-2 shadow-md' : 'border-stone-200 shadow-sm'
      }`}
      style={{ borderColor: isHighest ? cluster.color : undefined }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: cluster.color }}
        />
        <h3 className="font-semibold text-stone-800">{cluster.name}</h3>
        {isHighest && (
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
            Hoogste
          </span>
        )}
      </div>
      <p className="mb-3 text-sm text-stone-500">{cluster.meaning}</p>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(score, 2)}%`, backgroundColor: cluster.color }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-stone-400">{Math.round(score)}</p>
    </div>
  );
}
