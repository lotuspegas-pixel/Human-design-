import { useState, useEffect } from 'react';
import type { Answer } from '../types';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { saveProgress, loadProgress } from '../utils/storage';

interface Props {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

export default function Questionnaire({ onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setAnswers(saved.answers);
      setCurrentIndex(saved.currentQuestion);
    }
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      saveProgress(answers, currentIndex);
    }
  }, [answers, currentIndex]);

  const question = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const handleAnswer = (value: number) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== question.id);
      return [...filtered, { questionId: question.id, value }];
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleFinish = () => {
    const unanswered = questions.filter((q) => !answers.some((a) => a.questionId === q.id));
    if (unanswered.length > 0) {
      const firstUnanswered = questions.indexOf(unanswered[0]);
      setCurrentIndex(firstUnanswered);
      return;
    }
    onComplete(answers);
  };

  const isLast = currentIndex === questions.length - 1;
  const allAnswered = questions.every((q) => answers.some((a) => a.questionId === q.id));

  return (
    <div className="mx-auto max-w-xl">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <QuestionCard
        question={question}
        value={currentAnswer?.value ?? null}
        onChange={handleAnswer}
      />
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrev}
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          {currentIndex === 0 ? 'Terug' : 'Vorige'}
        </button>
        {isLast ? (
          <button
            onClick={handleFinish}
            disabled={!allAnswered}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
              allAnswered
                ? 'bg-stone-800 hover:bg-stone-700'
                : 'cursor-not-allowed bg-stone-300'
            }`}
          >
            Bekijk resultaten
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
              currentAnswer
                ? 'bg-stone-800 hover:bg-stone-700'
                : 'cursor-not-allowed bg-stone-300'
            }`}
          >
            Volgende
          </button>
        )}
      </div>
      {isLast && !allAnswered && (
        <p className="mt-3 text-center text-sm text-amber-600">
          Beantwoord alle vragen om je resultaten te bekijken.
        </p>
      )}
    </div>
  );
}
