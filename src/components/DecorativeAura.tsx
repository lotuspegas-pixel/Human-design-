interface Props {
  color: string;
  className?: string;
  /** Positie/vorm-variant. */
  variant?: 'top-right' | 'center' | 'bottom-left';
  opacity?: number;
}

/**
 * Zachte radiale gloed als achtergrondvorm. Puur decoratief (aria-hidden),
 * absoluut gepositioneerd binnen een relatieve ouder, en verborgen bij print.
 */
export default function DecorativeAura({ color, className = '', variant = 'top-right', opacity = 0.16 }: Props) {
  const pos =
    variant === 'top-right'
      ? { top: '-30%', right: '-20%' }
      : variant === 'bottom-left'
        ? { bottom: '-30%', left: '-20%' }
        : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  return (
    <div
      className={`decorative-aura pointer-events-none absolute -z-0 h-[60%] w-[60%] rounded-full blur-3xl ${className}`}
      style={{ background: color, opacity, ...pos }}
      aria-hidden="true"
    />
  );
}
