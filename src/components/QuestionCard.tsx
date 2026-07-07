import LikertScale from './LikertScale';

interface Props {
  text: string;
  value: number | null;
  onChange: (value: number) => void;
}

export default function QuestionCard({ text, value, onChange }: Props) {
  return (
    <div className="card-surface p-6 sm:p-8">
      <p className="mb-6 font-display text-xl font-medium text-[var(--color-ink)]">{text}</p>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
