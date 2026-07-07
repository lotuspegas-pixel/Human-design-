import { useState, useEffect } from 'react';
import { useI18n } from './i18n/LanguageContext';
import type { Answer, ScoreResult } from './types';
import type { BirthData, HumanDesignResult } from './types/humanDesign';
import { calculateScores } from './logic/scoring';
import {
  saveResult,
  loadResult,
  clearAllData,
  clearProgress,
  saveHumanDesignData,
  loadHumanDesignData,
} from './utils/storage';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import ConsentScreen from './pages/ConsentScreen';
import Questionnaire from './pages/Questionnaire';
import ResultsPage from './pages/ResultsPage';
import HumanDesignIntro from './pages/HumanDesignIntro';
import BirthDataForm from './pages/BirthDataForm';

type Page = 'landing' | 'consent' | 'questionnaire' | 'results' | 'hd-intro' | 'hd-form';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [hdResult, setHdResult] = useState<HumanDesignResult | null>(null);
  const [hdCalculating, setHdCalculating] = useState(false);
  const [hdError, setHdError] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const saved = loadResult();
    if (saved) {
      setResult(saved.scoreResult);
      setAnswers(saved.answers);
      setPage('results');
    }
    const savedHd = loadHumanDesignData();
    if (savedHd) {
      setBirthData(savedHd.birthData);
      setHdResult(savedHd.hdResult);
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
    setBirthData(null);
    setHdResult(null);
    setPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHdSubmit = async (data: BirthData) => {
    setHdCalculating(true);
    setHdError(false);
    try {
      // De astronomie-module wordt pas geladen wanneer iemand daadwerkelijk een
      // Human Design-reading aanvraagt; dat houdt de hoofdbundel klein en de site snel.
      const { calculateHumanDesign } = await import('./logic/humanDesign/bodygraph');
      const calculated = calculateHumanDesign(data);
      setBirthData(data);
      setHdResult(calculated);
      saveHumanDesignData(data, calculated);
      setHdCalculating(false);
      setPage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setHdError(true);
      setHdCalculating(false);
    }
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
        <ResultsPage
          result={result}
          answers={answers}
          onReset={handleReset}
          hdResult={hdResult}
          birthData={birthData}
          onAddHumanDesign={() => setPage('hd-intro')}
        />
      )}
      {page === 'hd-intro' && (
        <HumanDesignIntro onAccept={() => setPage('hd-form')} onSkip={() => setPage('results')} />
      )}
      {page === 'hd-form' && (
        <BirthDataForm
          onSubmit={handleHdSubmit}
          onBack={() => setPage('hd-intro')}
          isCalculating={hdCalculating}
          error={hdError ? t.calcError : null}
        />
      )}
    </AppLayout>
  );
}
