import type { Question } from '../types';
import LikertScale from './LikertScale';

interface Props {
  question: Question;
  value: number | null;
  onChange: (value: number) => void;
}

export default function QuestionCard({ question, value, onChange }: Props) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-lg font-medium text-stone-800">{question.text}</p>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
