import { useState, useEffect } from 'react';
import type { Answer } from '../types';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import QuestionJumpStrip from '../components/QuestionJumpStrip';
import { saveProgress, loadProgress } from '../utils/storage';
import { useI18n } from '../i18n/LanguageContext';
import { getQuestionText } from '../i18n/questionTexts';

interface Props {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

const SECONDS_PER_QUESTION = 8;

export default function Questionnaire({ onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const { t, locale } = useI18n();

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
    setRedirectNotice(null);
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== question.id);
      return [...filtered, { questionId: question.id, value }];
    });
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) goTo(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
    else onBack();
  };

  const handleFinish = () => {
    const unanswered = questions.filter((q) => !answers.some((a) => a.questionId === q.id));
    if (unanswered.length > 0) {
      const firstUnansweredIndex = questions.indexOf(unanswered[0]);
      setRedirectNotice(t.redirectNotice(unanswered.length));
      goTo(firstUnansweredIndex);
      return;
    }
    onComplete(answers);
  };

  const isLast = currentIndex === questions.length - 1;
  const allAnswered = questions.every((q) => answers.some((a) => a.questionId === q.id));
  const answeredIndexes = new Set(
    questions.reduce<number[]>((acc, q, i) => {
      if (answers.some((a) => a.questionId === q.id)) acc.push(i);
      return acc;
    }, [])
  );
  const remaining = questions.length - answeredIndexes.size;
  const estimatedMinutesLeft = Math.max(1, Math.ceil((remaining * SECONDS_PER_QUESTION) / 60));

  return (
    <div className="mx-auto max-w-xl">
      <QuestionJumpStrip
        total={questions.length}
        currentIndex={currentIndex}
        answeredIndexes={answeredIndexes}
        onJump={goTo}
      />
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        estimatedMinutesLeft={estimatedMinutesLeft}
      />
      {redirectNotice && (
        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          {redirectNotice}
        </p>
      )}
      <QuestionCard
        text={getQuestionText(locale, question.id)}
        value={currentAnswer?.value ?? null}
        onChange={handleAnswer}
        number={currentIndex + 1}
        total={questions.length}
      />
      <div className="mt-6 flex justify-between gap-3">
        <button
          onClick={handlePrev}
          className="min-h-[48px] rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          {currentIndex === 0 ? t.back : t.previous}
        </button>
        {isLast ? (
          <button
            onClick={handleFinish}
            disabled={!allAnswered}
            className={`min-h-[48px] rounded-full px-7 text-sm font-medium text-white transition ${
              allAnswered ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
            }`}
            style={allAnswered ? { backgroundColor: 'var(--color-ink)' } : undefined}
          >
            {t.viewResults}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`min-h-[48px] rounded-full px-7 text-sm font-medium text-white transition ${
              currentAnswer ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
            }`}
            style={currentAnswer ? { backgroundColor: 'var(--color-ink)' } : undefined}
          >
            {t.next}
          </button>
        )}
      </div>
      {isLast && !allAnswered && (
        <p className="mt-3 text-center text-sm text-amber-600">{t.answerAll}</p>
      )}
    </div>
  );
}
