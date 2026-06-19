const labels = [
  'Helemaal oneens',
  'Oneens',
  'Eerder oneens',
  'Neutraal',
  'Eerder eens',
  'Eens',
  'Helemaal eens',
];

interface Props {
  value: number | null;
  onChange: (value: number) => void;
}

export default function LikertScale({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      {labels.map((label, i) => {
        const score = i + 1;
        const selected = value === score;
        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
              selected
                ? 'border-amber-400 bg-amber-50 text-amber-800 shadow-sm'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                selected
                  ? 'border-amber-400 bg-amber-500 text-white'
                  : 'border-stone-300 text-stone-400'
              }`}
            >
              {score}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
