import { useState, useEffect } from 'react';
import type { Answer, ScoreResult } from './types';
import { calculateScores } from './logic/scoring';
import { saveResult, loadResult, clearAllData, clearProgress } from './utils/storage';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import ConsentScreen from './pages/ConsentScreen';
import Questionnaire from './pages/Questionnaire';
import ResultsPage from './pages/ResultsPage';

type Page = 'landing' | 'consent' | 'questionnaire' | 'results';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const saved = loadResult();
    if (saved) {
      setResult(saved.scoreResult);
      setAnswers(saved.answers);
      setPage('results');
    }
  }, []);

  const handleComplete = (completedAnswers: Answer[]) => {
    const scoreResult = calculateScores(completedAnswers);
    setResult(scoreResult);
    setAnswers(completedAnswers);
    saveResult(scoreResult, completedAnswers);
    clearProgress();
    setPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    clearAllData();
    setResult(null);
    setAnswers([]);
    setPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppLayout>
      {page === 'landing' && <LandingPage onStart={() => setPage('consent')} />}
      {page === 'consent' && (
        <ConsentScreen onAccept={() => setPage('questionnaire')} onBack={() => setPage('landing')} />
      )}
      {page === 'questionnaire' && (
        <Questionnaire onComplete={handleComplete} onBack={() => setPage('consent')} />
      )}
      {page === 'results' && result && (
        <ResultsPage result={result} answers={answers} onReset={handleReset} />
      )}
    </AppLayout>
  );
}
