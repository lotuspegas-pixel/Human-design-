import type { Question } from '../types';
import LikertScale from './LikertScale';

interface Props {
  question: Question;
  value: number | null;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, value, onChange }: Props) {
  return (
    <div className="card-surface p-6 sm:p-8">
      <p className="mb-6 font-display text-xl font-medium text-[var(--color-ink)]">{question.text}</p>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
