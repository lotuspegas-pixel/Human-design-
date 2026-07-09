interface Props {
  total: number;
  currentIndex: number;
  answeredIndexes: Set<number>;
  onJump: (index: number) => void;
}

export default function QuestionJumpStrip({ total, currentIndex, answeredIndexes, onJump }: Props) {
  return (
    <div className="mb-5 flex flex-wrap gap-1.5" aria-label="Jump to question">
      {Array.from({ length: total }, (_, i) => {
        const isCurrent = i === currentIndex;
        const isAnswered = answeredIndexes.has(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            title={`${i + 1}`}
            aria-current={isCurrent ? 'step' : undefined}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              isCurrent
                ? 'w-6 bg-[var(--color-ink)]'
                : isAnswered
                  ? 'w-2.5 bg-amber-400 hover:bg-amber-500'
                  : 'w-2.5 bg-[var(--color-parchment-deep)] hover:bg-stone-300'
            }`}
          >
            <span className="sr-only">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}
