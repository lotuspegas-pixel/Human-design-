import type { ReportSection, ScoreResult } from '../../types';
import type { BirthData, HumanDesignResult } from '../../types/humanDesign';
import { getArchetype } from '../../data/archetypes';
import { getCluster } from '../../data/colorClusters';
import { typeInfo, authorityInfo, definitionInfo, profileDescription } from '../../data/humanDesign/interpretations';
import { getCenterInfo } from '../../data/humanDesign/centers';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export function generateMergedReport(
  arcanaResult: ScoreResult,
  hdResult: HumanDesignResult,
  birthData: BirthData
): ReportSection[] {
  const naam = birthData.firstName || 'Jij';
  const primary = getArchetype(arcanaResult.highestArchetype);
  const secondary = getArchetype(arcanaResult.secondArchetype);
  const mainCluster = getCluster(arcanaResult.highestCluster);
  const type = typeInfo[hdResult.type];
  const authority = authorityInfo[hdResult.authority];
  const definition = definitionInfo[hdResult.definition];

  const sections: ReportSection[] = [];

  sections.push({
    title: `Welkom bij jouw volledige reading, ${naam}`,
    content: `Lieve ${naam},

Wat je nu voor je hebt is meer dan een testuitslag. Het is een samenkomst van twee lagen: je antwoorden op de Arcana-vragenlijst, die laten zien hoe je denkt, voelt en handelt in het dagelijks leven, en een energetische laag op basis van je geboortemoment — ${formatDate(hdResult.birthDateUtc)} om ${formatTime(hdResult.birthDateUtc)} (UTC).

Deze twee lagen samen vormen een rijker beeld. Waar je Arcana-profiel je bewuste voorkeuren en patronen beschrijft, kijkt je energetisch ontwerp naar een dieperliggende laag: hoe je van nature bent gebouwd om te reageren op het leven, beslissingen te nemen en energie te gebruiken.

Neem deze reading rustig door. Er is geen goed of fout, geen hoger of lager. Het is een uitnodiging om jezelf met meer mildheid en nieuwsgierigheid te bekijken.`,
  });

  sections.push({
    title: 'Jouw energetische type',
    content: `${naam}, je energetisch type is ${type.naam}.

${type.thema}

JE NATUURLIJKE STRATEGIE: ${type.strategie}
${type.kracht}

AANDACHTSPUNT
${type.aandachtspunt}

Deze strategie is geen regel die je moet volgen, maar een uitnodiging om te merken wanneer het leven soepeler gaat — namelijk wanneer je vanuit dit natuurlijke ritme leeft, in plaats van ertegenin te werken.`,
  });

  sections.push({
    title: 'Jouw innerlijke autoriteit',
    content: `Naast je type heb je een innerlijke autoriteit: de manier waarop jij, ${naam}, het meest betrouwbaar tot heldere beslissingen komt.

Jouw autoriteit is: ${authority.naam}.

${authority.thema}

HOE JE DIT KUNT GEBRUIKEN
${authority.advies}

Bij grote of kleine keuzes kan het waardevol zijn om jezelf de vraag te stellen: kom ik nu tot een antwoord op de manier die het beste bij mij past, of laat ik me leiden door wat anderen verwachten?`,
  });

  sections.push({
    title: 'Jouw profiel en definitie',
    content: `PROFIEL
${profileDescription(hdResult.profile)}

Dit profiel beschrijft een dubbele laag in hoe je je door het leven beweegt: de eerste lijn (${hdResult.profile[0]}) laat zien hoe je van nature functioneert wanneer je bewust aanwezig bent; de tweede lijn (${hdResult.profile[1]}) beschrijft een meer onbewuste, achtergrondkwaliteit die anderen soms sneller in je herkennen dan jijzelf.

DEFINITIE: ${definition.naam}
${definition.thema}

Dit zegt iets over hoe je energie intern is georganiseerd — of die als één geheel aanvoelt, of eerder als delen die soms om aanvulling van buitenaf vragen. Beide zijn volkomen natuurlijk; het is geen kwestie van compleet of incompleet zijn.`,
  });

  sections.push({
    title: 'Je gedefinieerde centra',
    content: getCentersText(hdResult, naam),
  });

  sections.push({
    title: 'De samenkomst van je twee profielen',
    content: getSynthesisText(arcanaResult, hdResult, naam),
  });

  sections.push({
    title: 'Een praktische gids voor het dagelijks leven',
    content: getPracticalGuide(arcanaResult, hdResult, naam),
  });

  sections.push({
    title: 'Slotwoord',
    content: `${naam}, deze reading brengt twee talen samen om hetzelfde te zeggen: je bent niet toevallig wie je bent.

Je Arcana-profiel laat zien dat ${primary.name} en ${secondary.name} je dagelijks handelen kleuren, met ${mainCluster.name} als terugkerende ondertoon. Je energetisch ontwerp laat zien dat je als ${type.naam} het beste tot je recht komt via ${type.strategie.toLowerCase()}, met ${authority.naam.toLowerCase()} als kompas voor je beslissingen.

Geen van beide lagen is een eindoordeel. Ze zijn een uitnodiging: om jezelf beter te leren kennen, met geduld en zonder te oordelen. Wat resoneert, mag je meenemen. Wat niet klopt, mag je laten voor wat het is.

Met warmte,
Het Arcana Profile team`,
  });

  return sections;
}

function getCentersText(hdResult: HumanDesignResult, naam: string): string {
  const allCenters = ['head', 'ajna', 'throat', 'g-center', 'heart', 'spleen', 'sacral', 'solar-plexus', 'root'] as const;
  const parts: string[] = [];

  parts.push(`${naam}, van de negen energiecentra zijn er bij jou ${hdResult.definedCenters.length} consistent "aan": ${hdResult.definedCenters.length === 0 ? 'geen enkele' : hdResult.definedCenters.map((c) => getCenterInfo(c).name).join(', ')}.\n`);

  if (hdResult.definedCenters.length > 0) {
    parts.push('GEDEFINIEERDE CENTRA — CONSISTENTE ENERGIE\n');
    for (const c of hdResult.definedCenters) {
      const info = getCenterInfo(c);
      parts.push(`${info.name}: ${info.thema}`);
    }
  }

  const undefinedCenters = allCenters.filter((c) => !hdResult.definedCenters.includes(c));
  if (undefinedCenters.length === allCenters.length) {
    parts.push('\nAL JE CENTRA ZIJN OPEN\nDit is geen tekortkoming — het is de kern van wie je bent. Met alle centra open ben je uitzonderlijk gevoelig voor de energie van je omgeving. Je neemt moeiteloos in je op wat er om je heen speelt, en juist daardoor bouw je een unieke, brede wijsheid op over mensen en situaties. De opgave is vooral: leren onderscheiden wat van jou is, en wat je van buitenaf hebt opgepikt.\n');
    parts.push(`Concreet raakt dit onder meer je ${undefinedCenters.map((c) => getCenterInfo(c).name.toLowerCase()).join(', ')} — stuk voor stuk plekken waar je de sfeer, druk of emotie van je omgeving kunt oppikken alsof het je eigen gevoel is. Neem daarom regelmatig een moment voor jezelf, weg van anderen, om te voelen wat er overblijft als de invloed van buitenaf wegvalt.`);
  } else if (undefinedCenters.length > 0) {
    parts.push('\nOPEN CENTRA — GEVOELIGHEID EN WIJSHEID VOOR ANDEREN\nOpen centra zijn geen tekortkoming. Ze zijn plekken waar je gevoelig bent voor de energie van je omgeving, en waar je — juist door die gevoeligheid — vaak wijsheid over anderen opbouwt. Concreet gaat het om:\n');
    for (const c of undefinedCenters) {
      const info = getCenterInfo(c);
      parts.push(`${info.name}: van nature open. ${info.thema}`);
    }
  }

  return parts.join('\n');
}

function getSynthesisText(arcanaResult: ScoreResult, hdResult: HumanDesignResult, naam: string): string {
  const primary = getArchetype(arcanaResult.highestArchetype);
  const type = typeInfo[hdResult.type];

  const resonances: Record<string, string> = {
    'action-maker+manifestor': `Er is een sterke overeenkomst tussen je Arcana-profiel en je energetisch ontwerp, ${naam}. Zowel ${primary.name} als ${type.naam} wijzen op iemand die van nature initieert en direct handelt. Deze twee lagen bevestigen elkaar: je bent gebouwd om te bewegen en dingen in gang te zetten. De uitnodiging is om je impact op anderen te blijven communiceren, ook wanneer je actiegerichtheid je vooruit stuwt.`,
    'plan-builder+generator': `Je Arcana-profiel en je energetisch ontwerp versterken elkaar op een mooie manier, ${naam}. ${primary.name} geeft je de neiging om te structureren en resultaat te boeken; als ${type.naam} heb je de duurzame energie om dat vol te houden — mits het werk je sacraal centrum echt bevestigt. Let erop dat je structuur bouwt rond werk dat je energie geeft, niet rond werk dat "zou moeten".`,
    'pattern-seer+projector': `Er is een natuurlijke verwantschap tussen je Arcana-profiel en je energetisch ontwerp, ${naam}. ${primary.name} geeft je een diep inzicht in patronen en richting; als ${type.naam} ben je van nature gebouwd om dat inzicht te delen zodra je daarvoor wordt uitgenodigd. Samen wijzen deze lagen op iemand met waardevolle visie, die het meest tot bloei komt wanneer die visie wordt gevraagd in plaats van opgedrongen.`,
    'people-helper+projector': `Je twee profielen vullen elkaar treffend aan, ${naam}. ${primary.name} geeft je een fijn gevoel voor mensen en groepsdynamiek; als ${type.naam} ben je van nature gebouwd om die gave in te zetten zodra anderen je daarom vragen. Dit maakt je bij uitstek geschikt om mensen te begeleiden — op voorwaarde dat je wacht tot je uitgenodigd wordt, in plaats van jezelf op te dringen.`,
    'idea-finder+manifesting-generator': `Je Arcana-profiel en je energetisch ontwerp versterken elkaar duidelijk, ${naam}. ${primary.name} geeft je een stroom van ideeën en mogelijkheden; als ${type.naam} heb je het tempo en de veelzijdigheid om meerdere sporen tegelijk te verkennen. De valkuil van beide lagen is gelijk: te veel beginnen zonder af te maken. Reageren op wat je sacraal centrum bevestigt helpt om te filteren welk idee je aandacht verdient.`,
    'heart-listener+reflector': `Er is een zeldzame, mooie overeenkomst tussen je twee profielen, ${naam}. ${primary.name} geeft je een sterk innerlijk kompas; als ${type.naam} weerspiegel je bovendien je omgeving op een unieke manier. Samen wijzen deze lagen op iemand die gevoelig is voor zowel de eigen waarheid als de sfeer van de omgeving — en die evenveel baat heeft bij rust en tijd om beide te onderscheiden.`,
  };

  const key = `${arcanaResult.highestArchetype}+${hdResult.type}`;
  const specific = resonances[key];
  if (specific) return specific;

  return `${naam}, je twee profielen belichten verschillende lagen van wie je bent, en dat is precies hun kracht.

Je Arcana-profiel laat zien dat ${primary.name} je bewuste denken en handelen kleurt: ${primary.strength.toLowerCase()} Je energetisch ontwerp laat zien dat je als ${type.naam} van nature gebouwd bent om ${type.strategie.toLowerCase()} als basisritme te gebruiken.

Deze twee lagen hoeven niet identiek te zijn om samen te kloppen. De ene laag beschrijft hoe je denkt en kiest; de andere beschrijft hoe je energie stroomt en het beste tot beslissingen komt. Samen geven ze een vollediger beeld dan elke laag afzonderlijk zou doen.

De uitnodiging is om te merken waar deze twee lagen elkaar bevestigen, en waar ze een aanvullend perspectief bieden op momenten dat je vastloopt.`;
}

function getPracticalGuide(arcanaResult: ScoreResult, hdResult: HumanDesignResult, naam: string): string {
  const primary = getArchetype(arcanaResult.highestArchetype);
  const type = typeInfo[hdResult.type];
  const authority = authorityInfo[hdResult.authority];

  return `DEZE WEEK: ÉÉN CONCRETE OEFENING
Let deze week bewust op het moment vlak vóór je een beslissing neemt — groot of klein. Merk op: reageer je vanuit ${authority.naam.toLowerCase()} (${authority.advies.toLowerCase().replace(/\.$/, '')}), of laat je je leiden door wat je denkt dat er van je verwacht wordt?

IN JE WERK
Je Arcana-profiel wijst op kracht in ${primary.strength.toLowerCase().replace(/\.$/, '')}. Je energetisch ontwerp voegt toe dat je dit het beste doet via ${type.strategie.toLowerCase()}. Vraag jezelf regelmatig af: doe ik dit werk omdat het bij mij past, of omdat het van me gevraagd wordt?

IN JE RELATIES
Deel deze reading gerust met mensen die je vertrouwt. Het kan een mooi startpunt zijn voor een gesprek over hoe jullie elkaar aanvullen — bijvoorbeeld waar jouw open centra juist worden ondersteund door iemand anders met een gedefinieerd centrum op diezelfde plek, of andersom.

EEN VRAAG OM MEE TE NEMEN
${naam}, welke keuze in je leven wacht op het moment dat je hem maakt vanuit ${authority.naam.toLowerCase()}, in plaats van vanuit je hoofd alleen?`;
}
