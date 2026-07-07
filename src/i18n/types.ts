export type Locale = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'pl' | 'sv' | 'tr';

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'pl', label: 'Polski' },
  { code: 'sv', label: 'Svenska' },
  { code: 'tr', label: 'Türkçe' },
];

export const DEFAULT_LOCALE: Locale = 'en';

/** Talen waarvoor de volledige reading-teksten bestaan; overige vallen terug op Engels. */
export const REPORT_LOCALES: Locale[] = ['en', 'nl'];

export interface UIStrings {
  appTitle: string;
  footerTagline: string;

  landingSubtitle: string;
  landingStart: string;
  landingDisclaimer: string;

  consentTitle: string;
  consentP1: string;
  consentP2: string;
  consentP3: string;
  consentP4: string;
  consentCheckbox: string;
  back: string;
  continue_: string;

  questionOf: (current: number, total: number) => string;
  minutesLeft: (n: number) => string;
  previous: string;
  next: string;
  viewResults: string;
  answerAll: string;
  redirectNotice: (n: number) => string;

  likert: [string, string, string, string, string, string, string];

  resultsYourProfile: string;
  resultsReadingOf: (name: string) => string;
  completedOn: string;
  reliability: string;
  consistencyWord: string;
  reliabilityHigh: string;
  reliabilityMedium: string;
  reliabilityLow: string;
  deepenTitle: string;
  deepenBody: string;
  deepenCta: string;
  energeticDesign: string;
  hdProfileWord: string;
  secondProfile: string;
  thirdProfile: string;
  blendBadge: string;
  balancedNote: string;
  archetypeScores: string;
  archetypeBalance: string;
  colorClusters: string;
  highestBadge: string;
  reportTitle: string;
  reportTitleMerged: string;
  printReport: string;
  downloadAsText: string;
  startNewTest: string;
  resultsDisclaimer: string;
  reportLanguageFallback: string;

  hdIntroTitle: string;
  hdIntroSubtitle: string;
  hdIntroP1: string;
  hdIntroP2: string;
  hdIntroP3: string;
  hdIntroP4: string;
  hdIntroCheckbox: string;
  skip: string;

  birthTitle: string;
  birthIntro: string;
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  birthDate: string;
  birthTime: string;
  timeZoneLabel: string;
  birthPlaceLabel: string;
  birthPlacePlaceholder: string;
  birthCountryLabel: string;
  birthCountryPlaceholder: string;
  calcError: string;
  calculate: string;
  calculating: string;
}
