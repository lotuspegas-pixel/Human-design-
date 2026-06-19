import type { ReportSection, ScoreResult } from '../types';
import { getArchetype } from '../data/archetypes';
import { getCluster } from '../data/colorClusters';

export function generateReport(result: ScoreResult): ReportSection[] {
  const primary = getArchetype(result.highestArchetype);
  const secondary = getArchetype(result.secondArchetype);
  const mainCluster = getCluster(result.highestCluster);
  const secondCluster = getCluster(result.secondCluster);

  const blendText = result.isBlendProfile
    ? `Je profiel laat een blend zien: ${primary.name} en ${secondary.name} liggen dicht bij elkaar. Dit betekent dat je uit beide stijlen put en flexibel kunt schakelen.`
    : `Je hoogste score ligt bij ${primary.name}. Dit archetype kleurt hoe je denkt, voelt en handelt.`;

  const balancedText = result.isBalancedProfile
    ? ' Je kleurprofiel is opvallend gebalanceerd: alle vier de clusters liggen dicht bij elkaar. Dit wijst op veelzijdigheid in je denkstijl.'
    : '';

  const sections: ReportSection[] = [
    {
      title: 'Jouw kernprofiel',
      content: `${blendText}${balancedText}\n\nJe belangrijkste kleurcluster is ${mainCluster.name}, wat staat voor: ${mainCluster.meaning.toLowerCase()} Je tweede kleurcluster is ${secondCluster.name}: ${secondCluster.meaning.toLowerCase()}`,
    },
    {
      title: 'Wat jou typeert',
      content: `Je profiel wijst op een voorkeur voor ${primary.meaning.toLowerCase()} Dit komt tot uiting in je dagelijks handelen: ${primary.strength.toLowerCase()}\n\nDaarnaast speelt ${secondary.name} een rol in je profiel. Dit brengt de neiging om ${secondary.meaning.toLowerCase()}`,
    },
    {
      title: 'Hoe jij denkt',
      content: getDenkstijlText(result),
    },
    {
      title: 'Hoe jij met mensen omgaat',
      content: getMensenText(result),
    },
    {
      title: 'Hoe jij keuzes maakt',
      content: getKeuzeText(result),
    },
    {
      title: 'Jouw natuurlijke kracht',
      content: `Je voornaamste kracht ligt in: ${primary.strength.toLowerCase()}\n\nAls tweede kracht zie je: ${secondary.strength.toLowerCase()}\n\nDeze combinatie maakt dat je op je best bent wanneer je beide stijlen bewust kunt inzetten.`,
    },
    {
      title: 'Mogelijke valkuilen',
      content: `Elke kracht heeft een keerzijde. Bij ${primary.name} kan dat zijn: ${primary.riskUnderPressure.toLowerCase()}\n\nBij ${secondary.name} kan dat zijn: ${secondary.riskUnderPressure.toLowerCase()}\n\nBewustzijn van deze patronen helpt om ze te herkennen voordat ze je in de weg zitten.`,
    },
    {
      title: 'Wat er onder druk kan gebeuren',
      content: `Onder druk kan je profiel verschuiven. ${primary.name} reageert dan met: ${primary.riskUnderPressure.toLowerCase()} ${secondary.name} kan onder spanning leiden tot: ${secondary.riskUnderPressure.toLowerCase()}\n\nHet herkennen van deze signalen is de eerste stap om er bewuster mee om te gaan.`,
    },
    {
      title: 'Jouw groeipad',
      content: `Voor ${primary.name} ligt het groeipad bij: ${primary.growthEdge.toLowerCase()}\n\nVoor ${secondary.name} is de groeikans: ${secondary.growthEdge.toLowerCase()}\n\nGroei vraagt niet om je stijl te veranderen, maar om bewust de balans op te zoeken.`,
    },
    {
      title: 'Reflectievragen',
      content: `Neem even de tijd voor deze vragen. Ze zijn bedoeld om je inzicht te verdiepen.\n\n• ${primary.reflectionQuestion}\n• ${secondary.reflectionQuestion}\n• Welke situaties halen het beste in mij naar boven?\n• Wanneer merk ik dat ik uit balans raak?`,
    },
    {
      title: 'Samenvatting',
      content: `Je Arcana Profile laat zien dat je profiel het sterkst aansluit bij ${primary.name} (${primary.jungFunction}) en ${secondary.name} (${secondary.jungFunction}). Je dominante kleurcluster is ${mainCluster.name}.\n\nGebruik dit inzicht als uitgangspunt voor reflectie en gesprek. Het is geen vast etiket, maar een spiegel die je helpt om je patronen beter te begrijpen.`,
    },
  ];

  return sections;
}

function getDenkstijlText(result: ScoreResult): string {
  const scores = result.archetypeScores;
  const ti = scores.find((s) => s.archetypeId === 'clear-thinker')!;
  const ni = scores.find((s) => s.archetypeId === 'pattern-seer')!;
  const ne = scores.find((s) => s.archetypeId === 'idea-finder')!;
  const te = scores.find((s) => s.archetypeId === 'plan-builder')!;

  const parts: string[] = [];

  if (ti.score100 >= 60) parts.push('Je denkt graag analytisch en zoekt naar logische consistentie.');
  else if (ti.score100 >= 40) parts.push('Je hebt een zekere mate van analytisch denken in je profiel.');
  else parts.push('Analytisch denken is niet je eerste neiging; je vertrouwt meer op andere bronnen.');

  if (ni.score100 >= 60) parts.push('Je kijkt graag vooruit en zoekt naar diepere patronen.');
  else if (ni.score100 <= 35) parts.push('Je richt je liever op het heden dan op toekomstige scenario\'s.');

  if (ne.score100 >= 60) parts.push('Je denkt divergent: je ziet al snel meerdere opties en mogelijkheden.');
  if (te.score100 >= 60) parts.push('Je denkt graag in structuur en meetbare resultaten.');

  if (parts.length === 0) parts.push('Je denkstijl is veelzijdig en niet sterk naar één kant gericht.');

  return parts.join('\n\n');
}

function getMensenText(result: ScoreResult): string {
  const scores = result.archetypeScores;
  const fe = scores.find((s) => s.archetypeId === 'people-helper')!;
  const fi = scores.find((s) => s.archetypeId === 'heart-listener')!;

  const parts: string[] = [];

  if (fe.score100 >= 60) {
    parts.push('Je hebt een sterk gevoel voor groepsdynamiek. Je merkt snel wat anderen nodig hebben en stemt je communicatie daarop af.');
  } else if (fe.score100 >= 40) {
    parts.push('Je bent je bewust van de sfeer in een groep, zonder dat dit je eerste focus is.');
  } else {
    parts.push('Je richt je minder op de groepsdynamiek en meer op andere aspecten van een situatie.');
  }

  if (fi.score100 >= 60) {
    parts.push('Je volgt een sterk innerlijk kompas. Authenticiteit en persoonlijke waarden zijn leidend in hoe je met anderen omgaat.');
  } else if (fi.score100 >= 40) {
    parts.push('Je eigen waarden spelen een rol, maar je weegt ze af tegen de situatie.');
  } else {
    parts.push('Je bent flexibel in je waardenbeleving en past je makkelijker aan de context aan.');
  }

  return parts.join('\n\n');
}

function getKeuzeText(result: ScoreResult): string {
  const scores = result.archetypeScores;
  const te = scores.find((s) => s.archetypeId === 'plan-builder')!;
  const se = scores.find((s) => s.archetypeId === 'action-maker')!;
  const si = scores.find((s) => s.archetypeId === 'calm-keeper')!;

  const parts: string[] = [];

  if (te.score100 >= 60) {
    parts.push('Je maakt keuzes het liefst op basis van structuur en heldere prioriteiten. Je wilt weten welke stap het meeste resultaat oplevert.');
  } else {
    parts.push('Structuur en planning zijn niet je eerste drijfveer bij keuzes.');
  }

  if (se.score100 >= 60) {
    parts.push('Je neemt graag snel beslissingen en vertrouwt op je directe waarneming van de situatie.');
  }

  if (si.score100 >= 60) {
    parts.push('Eerdere ervaringen en bewezen aanpakken wegen zwaar mee in je besluitvorming.');
  }

  if (parts.length === 1 && te.score100 < 60) {
    parts.push('Je keuzeproces is flexibel en wordt beïnvloed door de context van het moment.');
  }

  return parts.join('\n\n');
}
