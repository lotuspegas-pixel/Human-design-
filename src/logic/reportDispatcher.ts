import type { ReportSection, ScoreResult } from '../types';
import type { BirthData, HumanDesignResult } from '../types/humanDesign';
import type { Locale } from '../i18n/types';
import { generateReport } from './report';
import { generateReportEn } from './report.en';
import { generateMergedReport } from './humanDesign/mergedReport';
import { generateMergedReportEn } from './humanDesign/mergedReport.en';

/** Kiest de reading-taal: NL heeft een volledige eigen tekst, alle andere talen krijgen de Engelse reading. */
export function localizedReport(result: ScoreResult, locale: Locale): ReportSection[] {
  return locale === 'nl' ? generateReport(result) : generateReportEn(result);
}

export function localizedMergedReport(
  result: ScoreResult,
  hd: HumanDesignResult,
  birth: BirthData,
  locale: Locale
): ReportSection[] {
  return locale === 'nl' ? generateMergedReport(result, hd, birth) : generateMergedReportEn(result, hd, birth);
}

/** True wanneer de reading in de gekozen taal zelf bestaat (geen fallback-melding nodig). */
export function isNativeReportLocale(locale: Locale): boolean {
  return locale === 'en' || locale === 'nl';
}
