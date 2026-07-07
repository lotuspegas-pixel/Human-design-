interface Props {
  total: number;
  currentIndex: number;
  answeredIndexes: Set<number>;
  onJump: (index: number) => void;
}

export default function QuestionJumpStrip({ total, currentIndex, answeredIndexes, onJump }: Props) {
  return (
    <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2" aria-label="Spring naar vraag">
      {Array.from({ length: total }, (_, i) => {
        const isCurrent = i === currentIndex;
        const isAnswered = answeredIndexes.has(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            title={`Vraag ${i + 1}`}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition ${
              isCurrent
                ? 'bg-stone-800 text-white'
                : isAnswered
                  ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                  : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
