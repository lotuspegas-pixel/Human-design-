import type { ArchetypeId } from '../types';
import ArchetypeGlyph from './ArchetypeGlyph';

interface Props {
  label: string;
  score: number;
  color: string;
  id?: ArchetypeId;
  ink?: string;
  rank?: number;
}

export default function ScoreBar({ label, score, color, id, ink, rank }: Props) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink)]">
          {id && (
            <span style={{ color }}>
              <ArchetypeGlyph id={id} className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </span>
          )}
          {rank !== undefined && (
            <span className="font-display text-xs text-[var(--color-ink-faint)]">{String(rank).padStart(2, '0')}</span>
          )}
          {label}
        </span>
        <span className="font-display text-lg" style={{ color: ink ?? 'var(--color-ink)' }}>
          {Math.round(score)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-parchment-deep)]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.max(score, 2)}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px -1px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
