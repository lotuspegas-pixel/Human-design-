interface Props {
  className?: string;
}

/**
 * Merkteken: een fijne cirkel met vier clusterkleur-punten op de assen —
 * een rustig, kunstzinnig monogram voor Arcana Profile. Decoratief.
 */
export default function BrandMark({ className = 'h-7 w-7' }: Props) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="16" cy="16" r="6.5" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="16" cy="4.5" r="2" fill="#F59E0B" />
      <circle cx="27.5" cy="16" r="2" fill="#6366F1" />
      <circle cx="16" cy="27.5" r="2" fill="#10B981" />
      <circle cx="4.5" cy="16" r="2" fill="#DC2626" />
    </svg>
  );
}
