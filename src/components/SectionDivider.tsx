interface Props {
  className?: string;
}

/** Fijne editorial scheidingslijn met een klein ruit-accent in het midden. Decoratief. */
export default function SectionDivider({ className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-[var(--color-hairline)]" />
      <svg viewBox="0 0 8 8" className="h-2 w-2 text-[var(--color-ink-faint)]" fill="currentColor">
        <path d="M4 0 8 4 4 8 0 4Z" />
      </svg>
      <span className="h-px w-16 bg-[var(--color-hairline)]" />
    </div>
  );
}
