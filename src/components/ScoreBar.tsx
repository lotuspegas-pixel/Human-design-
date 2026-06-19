interface Props {
  label: string;
  score: number;
  color: string;
}

export default function ScoreBar({ label, score, color }: Props) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-stone-700">{label}</span>
        <span className="text-stone-500">{Math.round(score)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(score, 2)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
