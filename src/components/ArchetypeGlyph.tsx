import type { ReactNode } from 'react';
import type { ArchetypeId } from '../types';

interface Props {
  id: ArchetypeId;
  className?: string;
  strokeWidth?: number;
}

/**
 * Eenvoudige, rustige line-art glyph per archetype.
 * Dunne lijnen, afgeronde uiteinden, kleur via currentColor — geschikt voor
 * klein (score-rij) en groot (report cover). Puur decoratief: aria-hidden.
 */
const PATHS: Record<ArchetypeId, ReactNode> = {
  // Idea Finder — spark / ster
  'idea-finder': (
    <>
      <path d="M12 3.5c.6 3.9 1.6 4.9 5.5 5.5-3.9.6-4.9 1.6-5.5 5.5-.6-3.9-1.6-4.9-5.5-5.5 3.9-.6 4.9-1.6 5.5-5.5Z" />
      <path d="M18.5 15.5c.3 1.6.7 2 2.3 2.3-1.6.3-2 .7-2.3 2.3-.3-1.6-.7-2-2.3-2.3 1.6-.3 2-.7 2.3-2.3Z" />
    </>
  ),
  // Pattern Seer — verbonden nodes
  'pattern-seer': (
    <>
      <path d="M6 7 L17 5.5 M6 7 L10.5 16 M17 5.5 L10.5 16 M17 5.5 L19 14" />
      <circle cx="6" cy="7" r="1.9" />
      <circle cx="17" cy="5.5" r="1.9" />
      <circle cx="10.5" cy="16.5" r="1.9" />
      <circle cx="19" cy="14.5" r="1.6" />
    </>
  ),
  // Action Maker — pijl / bliksem
  'action-maker': (
    <>
      <path d="M13.5 3.5 L6 13h5l-1.5 7.5L18 11h-5l.5-7.5Z" />
    </>
  ),
  // Calm Keeper — maan
  'calm-keeper': (
    <>
      <path d="M16.5 4.5a8 8 0 1 0 3 12 6.4 6.4 0 0 1-3-12Z" />
    </>
  ),
  // Plan Builder — pilaren / grid
  'plan-builder': (
    <>
      <path d="M5 8.5 L12 4.5 L19 8.5 M6.5 9.5 V17 M17.5 9.5 V17 M11 9.5 V17 M4.5 19.5 H19.5" />
    </>
  ),
  // Clear Thinker — diamant / lens
  'clear-thinker': (
    <>
      <path d="M12 3.5 L19.5 12 L12 20.5 L4.5 12 Z" />
      <path d="M8.2 12 L12 7.6 L15.8 12 L12 16.4 Z" />
    </>
  ),
  // People Helper — verbonden cirkels
  'people-helper': (
    <>
      <circle cx="8.5" cy="12" r="4.2" />
      <circle cx="15.5" cy="12" r="4.2" />
    </>
  ),
  // Heart Listener — hart / blad
  'heart-listener': (
    <>
      <path d="M12 20s-6.5-4.2-6.5-9A3.7 3.7 0 0 1 12 8.5 3.7 3.7 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9Z" />
    </>
  ),
};

export default function ArchetypeGlyph({ id, className = 'h-5 w-5', strokeWidth = 1.5 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[id]}
    </svg>
  );
}
