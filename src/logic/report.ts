import type { ArchetypeId, ArchetypeScore, ReportSection, ScoreResult } from '../types';
import { getArchetype, getArchetypeDetail } from '../data/archetypes';
import { getCluster } from '../data/colorClusters';

function score(result: ScoreResult, id: ArchetypeId): ArchetypeScore {
  return result.archetypeScores.find((s) => s.archetypeId === id)!;
}

function sorted(result: ScoreResult): ArchetypeScore[] {
  return [...result.archetypeScores].sort((a, b) => b.score100 - a.score100);
}

export function generateReport(result: ScoreResult): ReportSection[] {
  const primary = getArchetype(result.highestArchetype);
  const secondary = getArchetype(result.secondArchetype);
  const third = getArchetype(result.thirdArchetype);
  const lowest = getArchetype(result.lowestArchetype);
  const primaryDetail = getArchetypeDetail(result.highestArchetype);
  const secondaryDetail = getArchetypeDetail(result.secondArchetype);
  const mainCluster = getCluster(result.highestCluster);
  const secondCluster = getCluster(result.secondCluster);
  const primaryScore = score(result, result.highestArchetype);
  const secondaryScore = score(result, result.secondArchetype);
  const lowestScore = score(result, result.lowestArchetype);

  const sections: ReportSection[] = [];

  // ─── 1. INTRODUCTIE ───
  sections.push({
    title: 'Introductie',
    content: `Welkom bij jouw persoonlijke Arcana Profile-rapport. Dit rapport is opgesteld op basis van je antwoorden op ${questions(result)} stellingen over je voorkeuren, denkstijl, gevoelsstijl en manier van handelen.

Het rapport beschrijft patronen die uit je antwoorden naar voren komen. Het is geen test met goede of foute uitkomsten, maar een spiegel die je helpt om jezelf beter te begrijpen. Je profiel is een momentopname: het laat zien welke stijlen op dit moment het sterkst aanwezig zijn. Mensen veranderen, groeien en ontwikkelen zich — je profiel kan meebewegen.

Lees dit rapport met nieuwsgierigheid en openheid. Neem mee wat resoneert, laat los wat niet past, en gebruik het als uitgangspunt voor gesprekken over je persoonlijke ontwikkeling.

Dit rapport bevat de volgende onderdelen:
• Jouw kernprofiel en kleurclusters
• Een gedetailleerde beschrijving van je hoofdarchetype en tweede archetype
• Inzicht in je denkstijl, communicatie, werkstijl en leerstijl
• Hoe je met mensen omgaat en keuzes maakt
• Je krachten, mogelijke valkuilen en gedrag onder druk
• Je groeipad met concrete aanbevelingen
• Reflectievragen voor verdere verdieping
• Een overzicht van al je acht archetypescores`,
  });

  // ─── 2. BETROUWBAARHEID ───
  const cons = result.consistency;
  let consText = `Je antwoorden zijn getoetst op interne consistentie. Van de ${cons.totalPairs} controleparen in de vragenlijst waren ${cons.consistentPairs} paren consistent (${cons.score}%).`;
  if (cons.isReliable) {
    consText += '\n\nDit wijst op een betrouwbaar profiel: je hebt de stellingen overwogen en consequent beantwoord. De uitkomsten geven een helder beeld van je huidige voorkeuren.';
  } else {
    consText += '\n\nJe consistentiescore is lager dan gemiddeld. Dit kan betekenen dat je in een periode van verandering zit, dat sommige stellingen anders op je overkwamen, of dat je snel door de vragenlijst bent gegaan. De uitkomsten zijn nog steeds bruikbaar als reflectie, maar neem ze met extra aandacht door en kijk of ze herkenbaar voelen.';
  }
  sections.push({ title: 'Betrouwbaarheid van je profiel', content: consText });

  // ─── 3. KERNPROFIEL ───
  {
    const blendText = result.isBlendProfile
      ? `Je profiel laat een blend zien: ${primary.name} en ${secondary.name} liggen dicht bij elkaar (${Math.round(primaryScore.score100)} en ${Math.round(secondaryScore.score100)} punten). Dit betekent dat je uit beide stijlen put en flexibel kunt schakelen. Je bent niet eenvoudig in één hokje te plaatsen — en dat is een kracht.`
      : `Je hoogste score ligt bij ${primary.name} (${Math.round(primaryScore.score100)} punten). Dit archetype kleurt hoe je denkt, voelt en handelt. Je tweede archetype is ${secondary.name} (${Math.round(secondaryScore.score100)} punten), dat een aanvullende rol speelt in je profiel.`;

    const balancedText = result.isBalancedProfile
      ? '\n\nJe kleurprofiel is opvallend gebalanceerd: alle vier de clusters liggen dicht bij elkaar. Dit wijst op veelzijdigheid in je denkstijl. Je kunt putten uit verschillende bronnen en bent niet sterk gebonden aan één benadering. Het voordeel hiervan is flexibiliteit; de uitdaging is soms weten welke stijl je wilt inzetten.'
      : '';

    let content = `${blendText}${balancedText}

Je belangrijkste kleurcluster is ${mainCluster.name} (${mainCluster.meaning.toLowerCase()}). Je tweede kleurcluster is ${secondCluster.name} (${secondCluster.meaning.toLowerCase()}).

Je derde archetype is ${third.name}, wat een ondersteunende rol speelt. Je laagste score is ${lowest.name} (${Math.round(lowestScore.score100)} punten) — dit is niet per se een zwakte, maar een stijl waar je minder spontaan op terugvalt.

Hieronder wordt elk onderdeel van je profiel verder uitgediept.`;
    sections.push({ title: 'Jouw kernprofiel', content });
  }

  // ─── 4. HOOFDARCHETYPE DIEPTEPORTRET ───
  sections.push({
    title: `Diepteportret: ${primary.name}`,
    content: `${primary.name} is je sterkst aanwezige archetype. ${primary.meaning}

KERNKRACHT
${primary.strength} Dit is de basis van waaruit je opereert. In situaties die om deze kwaliteit vragen, ben je op je natuurlijkst en meest effectief.

WAT DIT BETEKENT IN DE PRAKTIJK
${primaryDetail.werkstijl}

HOE JE COMMUNICEERT
${primaryDetail.communicatie}

HOE JE LEERT
${primaryDetail.leerstijl}

JE IDEALE WERKOMGEVING
${primaryDetail.werkOmgeving}`,
  });

  // ─── 5. TWEEDE ARCHETYPE DIEPTEPORTRET ───
  sections.push({
    title: `Diepteportret: ${secondary.name}`,
    content: `${secondary.name} is je tweede archetype. ${secondary.meaning}

KERNKRACHT
${secondary.strength} Deze stijl vult je hoofdarchetype aan en biedt een tweede perspectief dat je inzet wanneer de situatie daarom vraagt.

WAT DIT BETEKENT IN DE PRAKTIJK
${secondaryDetail.werkstijl}

HOE JE COMMUNICEERT
${secondaryDetail.communicatie}

HOE JE LEERT
${secondaryDetail.leerstijl}

JE IDEALE WERKOMGEVING
${secondaryDetail.werkOmgeving}`,
  });

  // ─── 6. COMBINATIEPROFIEL ───
  sections.push({
    title: `De combinatie: ${primary.name} en ${secondary.name}`,
    content: getCombinationText(result),
  });

  // ─── 7. WAT JOU TYPEERT ───
  sections.push({
    title: 'Wat jou typeert',
    content: `Je profiel wijst op een voorkeur voor ${primary.meaning.toLowerCase()} Dit komt tot uiting in je dagelijks handelen: ${primary.strength.toLowerCase()}

Daarnaast speelt ${secondary.name} een rol in je profiel. Dit brengt de neiging om ${secondary.meaning.toLowerCase()}

De wisselwerking tussen deze twee stijlen maakt je profiel uniek. ${primary.name} geeft richting aan wat je doet; ${secondary.name} voegt een extra laag toe aan hoe je dat doet.

${getTypeertVerdieping(result)}`,
  });

  // ─── 8. HOE JIJ DENKT ───
  sections.push({
    title: 'Hoe jij denkt',
    content: getDenkstijlText(result),
  });

  // ─── 9. HOE JIJ COMMUNICEERT ───
  sections.push({
    title: 'Hoe jij communiceert',
    content: getCommunicatieText(result),
  });

  // ─── 10. HOE JIJ MET MENSEN OMGAAT ───
  sections.push({
    title: 'Hoe jij met mensen omgaat',
    content: getMensenText(result),
  });

  // ─── 11. JE RELATIE- EN SAMENWERKINGSSTIJL ───
  sections.push({
    title: 'Je relatie- en samenwerkingsstijl',
    content: `RELATIESTIJL
${primaryDetail.relatieStijl}

SAMENWERKING
${primaryDetail.teamrol}

WAT JE TOEVOEGT AAN EEN TEAM
Je brengt ${primary.strength.toLowerCase()} als natuurlijke bijdrage. Gecombineerd met ${secondary.name} voeg je ook ${secondary.strength.toLowerCase()} toe. Teams profiteren van jouw aanwezigheid wanneer er behoefte is aan ${getTeamBijdrage(result)}.

WAT JE NODIG HEBT VAN EEN TEAM
${getTeamBehoefte(result)}`,
  });

  // ─── 12. HOE JIJ KEUZES MAAKT ───
  sections.push({
    title: 'Hoe jij keuzes maakt',
    content: getKeuzeText(result),
  });

  // ─── 13. JE MOTIVATIE EN ENERGIE ───
  sections.push({
    title: 'Je motivatie en energie',
    content: `WAT JE ENERGIE GEEFT
${primaryDetail.motivatie}

${secondaryDetail.motivatie}

WAT JE ENERGIE KOST
Op basis van je profiel kosten de volgende situaties je waarschijnlijk de meeste energie:
${getEnergyDrains(result)}

HOE JE JE ENERGIE KUNT BEWAKEN
${getEnergyAdvice(result)}`,
  });

  // ─── 14. JOUW NATUURLIJKE KRACHT ───
  sections.push({
    title: 'Jouw natuurlijke kracht',
    content: `Je voornaamste kracht ligt in: ${primary.strength.toLowerCase()}

Als tweede kracht zie je: ${secondary.strength.toLowerCase()}

Deze combinatie maakt dat je op je best bent wanneer je beide stijlen bewust kunt inzetten. Je hebt een natuurlijk talent om ${getKrachtCombinatie(result)}.

KRACHT IN CONTEXT
${getKrachtContext(result)}

Je derde archetype, ${third.name}, voegt hier een subtiele laag aan toe: ${third.strength.toLowerCase()} Dit kan naar voren komen in situaties die specifiek om deze kwaliteit vragen, ook al is het niet je eerste neiging.`,
  });

  // ─── 15. MOGELIJKE VALKUILEN ───
  sections.push({
    title: 'Mogelijke valkuilen',
    content: `Elke kracht heeft een keerzijde. Hieronder de valkuilen die horen bij je profiel.

VALKUIL VAN ${primary.name.toUpperCase()}
${primary.riskUnderPressure} ${getValkuilVerdieping(primary.id)}

VALKUIL VAN ${secondary.name.toUpperCase()}
${secondary.riskUnderPressure} ${getValkuilVerdieping(secondary.id)}

HOE JE VALKUILEN HERKENT
${getValkuilHerkenning(result)}

Bewustzijn van deze patronen helpt om ze te herkennen voordat ze je in de weg zitten. Het gaat niet om het elimineren van deze neigingen, maar om het eerder opmerken en bijsturen.`,
  });

  // ─── 16. WAT ER ONDER DRUK KAN GEBEUREN ───
  sections.push({
    title: 'Wat er onder druk kan gebeuren',
    content: `Onder druk verschuift je profiel. Je valt terug op je meest dominante patronen, vaak in een overdreven vorm.

${primary.name.toUpperCase()} ONDER DRUK
${primaryDetail.stressSignalen}

${secondary.name.toUpperCase()} ONDER DRUK
${secondaryDetail.stressSignalen}

HERSTEL
${primaryDetail.herstelAdvies}

${secondaryDetail.herstelAdvies}

HERKENNINGSSIGNALEN
Let op deze vroege signalen dat je onder druk staat:
${getStressSignalen(result)}`,
  });

  // ─── 17. JOUW GROEIPAD ───
  sections.push({
    title: 'Jouw groeipad',
    content: `Groei vraagt niet om je stijl te veranderen, maar om bewust de balans op te zoeken. Hieronder concrete aanbevelingen op basis van je profiel.

GROEIRICHTING VOOR ${primary.name.toUpperCase()}
${primary.growthEdge}
${primaryDetail.coachingTip}

GROEIRICHTING VOOR ${secondary.name.toUpperCase()}
${secondary.growthEdge}
${secondaryDetail.coachingTip}

JE MINST ONTWIKKELDE STIJL: ${lowest.name.toUpperCase()}
Je laagste score (${Math.round(lowestScore.score100)} punten) ligt bij ${lowest.name}. Dit hoeft geen probleem te zijn, maar het kan waardevol zijn om bewust aandacht te geven aan wat deze stijl te bieden heeft: ${lowest.strength.toLowerCase()}

${getGroeiOefeningen(result)}

ONTWIKKELTIPS VOOR DE KOMENDE MAAND
${getMonthlyTips(result)}`,
  });

  // ─── 18. KLEURCLUSTERS VERDIEPING ───
  sections.push({
    title: 'Je kleurclusters in detail',
    content: getClusterVerdieping(result),
  });

  // ─── 19. ALLE ACHT ARCHETYPES ───
  sections.push({
    title: 'Je volledige archetypeprofiel',
    content: getAllArchetypesText(result),
  });

  // ─── 20. REFLECTIEVRAGEN ───
  sections.push({
    title: 'Reflectievragen',
    content: `Neem rustig de tijd voor onderstaande vragen. Ze zijn bedoeld om je inzicht te verdiepen. Je hoeft ze niet allemaal tegelijk te beantwoorden — kies er twee of drie die je aanspreken en kom later terug voor de rest.

OVER JE KERNPROFIEL
• ${primary.reflectionQuestion}
• ${secondary.reflectionQuestion}
• Herken je jezelf in de beschrijving van ${primary.name}? Wat klopt, en wat voelt anders?
• In welke situaties merk je dat ${secondary.name} sterker naar voren komt?

OVER JE KRACHTEN
• Welke situaties halen het beste in mij naar boven?
• Wanneer voel ik me het meest in mijn element?
• Hoe kan ik mijn kracht vaker bewust inzetten?
• Welke van mijn krachten wordt het minst gezien door anderen?

OVER JE VALKUILEN
• Wanneer merk ik dat ik uit balans raak?
• Wat zijn mijn vroege waarschuwingssignalen voor overbelasting?
• Welke situaties triggeren mijn valkuilen het sterkst?
• Wat helpt mij om terug te keren naar balans?

OVER JE GROEI
• Welke kleine stap kan ik deze week zetten richting mijn groeipad?
• Wat zou er veranderen als ik meer van ${lowest.name} zou laten zien?
• Met wie kan ik dit rapport bespreken om er meer uit te halen?
• Welk onderdeel van dit rapport wil ik over drie maanden opnieuw lezen?

OVER JE OMGEVING
• Past mijn huidige werkomgeving bij mijn profiel? Wat zou ik willen veranderen?
• Welke mensen in mijn omgeving vullen mij het beste aan?
• Waar botst mijn stijl het meest met mijn omgeving, en hoe ga ik daarmee om?
• Welke omgeving zou mij helpen om het beste uit mezelf te halen?`,
  });

  // ─── 21. GESPREKSSTARTERS ───
  sections.push({
    title: 'Gespreksstarters voor coaching of teamgesprek',
    content: `Dit rapport kan dienen als startpunt voor een coachgesprek, teamoverleg of gesprek met een leidinggevende. Hieronder suggesties voor gespreksstarters.

VOOR EEN COACHGESPREK
• "Mijn profiel laat zien dat ${primary.name} mijn sterkste stijl is. Ik herken dat in... maar ik merk ook dat..."
• "Mijn groeirichting is ${primary.growthEdge.toLowerCase()} Hoe zou ik dat concreet kunnen oefenen?"
• "Onder druk merk ik dat ik... Hoe kan ik dat patroon eerder herkennen?"

VOOR EEN TEAMGESPREK
• "Ik draag het meest bij als ik... mag doen. Ik heb van het team nodig dat..."
• "Mijn valkuil is ${primary.riskUnderPressure.toLowerCase()} Als jullie dat herkennen, mag je het benoemen."
• "Ik heb ontdekt dat mijn communicatiestijl ${getCommunicatieKort(result)} is. Hoe ervaren jullie dat?"

VOOR EEN GESPREK MET JE LEIDINGGEVENDE
• "Ik werk het best in een omgeving die... biedt."
• "Ik word gemotiveerd door... en verlies energie bij..."
• "Ik zou graag willen groeien in... Kun je me daarbij ondersteunen?"`,
  });

  // ─── 22. SAMENVATTING ───
  sections.push({
    title: 'Samenvatting',
    content: `JOUW ARCANA PROFILE IN ÉÉN OOGOPSLAG

Hoofdarchetype: ${primary.name} (${primary.jungFunction}) — ${Math.round(primaryScore.score100)} punten
Tweede archetype: ${secondary.name} (${secondary.jungFunction}) — ${Math.round(secondaryScore.score100)} punten
Derde archetype: ${third.name} (${third.jungFunction})
Minst aanwezig: ${lowest.name} (${lowest.jungFunction}) — ${Math.round(lowestScore.score100)} punten

Kleurcluster: ${mainCluster.name} (${mainCluster.meaning.toLowerCase()})
${result.isBlendProfile ? 'Profieltype: Blend (twee stijlen liggen dicht bij elkaar)' : 'Profieltype: Dominant (één duidelijk sterkste stijl)'}
${result.isBalancedProfile ? 'Kleurbalans: Gebalanceerd (alle clusters dicht bij elkaar)' : 'Kleurbalans: Gedifferentieerd (duidelijke voorkeursclusters)'}
Consistentie: ${cons.score}%${cons.isReliable ? ' (betrouwbaar)' : ' (neem uitkomsten met extra reflectie door)'}

KERNKRACHT
${primary.strength} Aangevuld met: ${secondary.strength.toLowerCase()}

BELANGRIJKSTE VALKUIL
${primary.riskUnderPressure}

GROEIRICHTING
${primary.growthEdge}

REFLECTIEVRAAG OM MEE TE NEMEN
${primary.reflectionQuestion}

Gebruik dit inzicht als uitgangspunt voor reflectie en gesprek. Het is geen vast etiket, maar een spiegel die je helpt om je patronen beter te begrijpen. Profielen veranderen mee met je ontwikkeling — overweeg om dit profiel over zes tot twaalf maanden opnieuw in te vullen.`,
  });

  return sections;
}

function questions(result: ScoreResult): number {
  return result.archetypeScores.length * 8;
}

function getCombinationText(result: ScoreResult): string {
  const p = result.highestArchetype;
  const s = result.secondArchetype;
  const primary = getArchetype(p);
  const secondary = getArchetype(s);

  const combos: Record<string, string> = {
    'idea-finder+pattern-seer': `Je combineert het vermogen om brede mogelijkheden te zien (${primary.name}) met diep inzicht in patronen en richting (${secondary.name}). Dit maakt je tot iemand die zowel creatief als strategisch kan denken. Je genereert ideeën én ziet welke ideeën de meeste potentie hebben. De uitdaging is om niet te lang in het denken te blijven en ook tot actie over te gaan.`,
    'idea-finder+action-maker': `Je combineert creativiteit en mogelijkhedendenken (${primary.name}) met een directe actiebereidheid (${secondary.name}). Dit maakt je tot iemand die snel ideeën bedenkt én ze uitprobeert. Je bent een natuurlijke innovator die niet bang is om te experimenteren. De uitdaging is om voldoende te reflecteren voordat je in actie komt.`,
    'idea-finder+people-helper': `Je combineert creatief denken (${primary.name}) met een sterk gevoel voor mensen (${secondary.name}). Dit maakt je tot iemand die nieuwe ideeën verbindt aan wat mensen nodig hebben. Je bent inspirerend en verbindend. De uitdaging is om ook je eigen koers vast te houden en niet alleen te creëren voor anderen.`,
    'pattern-seer+clear-thinker': `Je combineert diep inzicht (${primary.name}) met scherpe analyse (${secondary.name}). Dit maakt je tot een krachtige denker die zowel het grote plaatje als de logische details ziet. Je bent sterk in strategie en probleemoplossing. De uitdaging is om je inzichten toegankelijk te communiceren en niet te ver af te staan van de praktijk.`,
    'action-maker+plan-builder': `Je combineert directe actie (${primary.name}) met structuur en planning (${secondary.name}). Dit maakt je tot een effectieve doener die zowel snel kan schakelen als georganiseerd kan werken. Je bent resultaatgericht en efficiënt. De uitdaging is om voldoende ruimte te laten voor reflectie, creativiteit en de menselijke kant.`,
    'calm-keeper+heart-listener': `Je combineert stabiliteit en rust (${primary.name}) met diepe authenticiteit (${secondary.name}). Dit maakt je tot iemand die betrouwbaar en integer is. Je brengt rust en waarden samen. De uitdaging is om ook openheid te tonen voor verandering en je innerlijke wereld te delen met anderen.`,
    'people-helper+heart-listener': `Je combineert een sterk gevoel voor anderen (${primary.name}) met een diep innerlijk kompas (${secondary.name}). Dit maakt je tot iemand die zowel empathisch als authentiek is. Je kunt goed luisteren én trouw blijven aan je eigen waarden. De uitdaging is om niet verscheurd te raken tussen wat anderen willen en wat jij voelt.`,
    'plan-builder+clear-thinker': `Je combineert organisatorisch talent (${primary.name}) met analytisch vermogen (${secondary.name}). Dit maakt je tot een effectieve probleemoplosser die zowel kan denken als doen. Je bent sterk in het structureren van complexe situaties. De uitdaging is om ook oog te houden voor de menselijke factor en niet alles als een puzzel te benaderen.`,
  };

  const key1 = `${p}+${s}`;
  const key2 = `${s}+${p}`;
  const specific = combos[key1] || combos[key2];

  if (specific) return specific;

  return `Je combineert ${primary.name} (${primary.strength.toLowerCase()}) met ${secondary.name} (${secondary.strength.toLowerCase()}). Deze twee stijlen vullen elkaar aan en geven je profiel een unieke dynamiek.

${primary.name} geeft je de neiging om ${primary.meaning.toLowerCase()} ${secondary.name} voegt daar ${secondary.meaning.toLowerCase()} aan toe.

In de praktijk betekent dit dat je flexibel kunt schakelen tussen deze twee perspectieven. Je kunt ${primary.strength.toLowerCase().replace(/\.$/, '')} én ${secondary.strength.toLowerCase().replace(/\.$/, '')}.

De uitdaging van deze combinatie is om bewust te kiezen wanneer je welke stijl inzet. Soms kunnen ze elkaar versterken, soms kunnen ze botsen. Herken wanneer je schakelt en waarom — dat vergroot je effectiviteit.`;
}

function getTypeertVerdieping(result: ScoreResult): string {
  const all = sorted(result);
  const top3 = all.slice(0, 3);
  const bottom = all[all.length - 1];

  let text = 'Je top-3 archetypes zijn:\n';
  for (const s of top3) {
    const a = getArchetype(s.archetypeId);
    text += `• ${a.name} (${Math.round(s.score100)} punten) — ${a.strength.toLowerCase()}\n`;
  }
  text += `\nJe minst aanwezige stijl is ${getArchetype(bottom.archetypeId).name} (${Math.round(bottom.score100)} punten). Dit hoeft geen zwakte te zijn — het is simpelweg de stijl waar je minder automatisch op terugvalt. In situaties die specifiek om deze stijl vragen, kan het helpen om bewust een stap in die richting te zetten.`;
  return text;
}

function getDenkstijlText(result: ScoreResult): string {
  const ti = score(result, 'clear-thinker');
  const ni = score(result, 'pattern-seer');
  const ne = score(result, 'idea-finder');
  const te = score(result, 'plan-builder');

  const parts: string[] = [];

  parts.push('ANALYTISCH VERMOGEN');
  if (ti.score100 >= 70) parts.push('Je hebt een sterk analytisch vermogen. Je zoekt naar logische consistentie en hebt er plezier in om complexe vraagstukken te ontleden. Je merkt snel wanneer iets niet klopt en stelt scherpe vragen. Deze scherpte is een kracht, maar kan soms intimiderend overkomen op anderen.');
  else if (ti.score100 >= 50) parts.push('Je hebt een gezonde dosis analytisch denken in je profiel. Je kunt logisch redeneren wanneer de situatie daarom vraagt, maar het is niet per se je eerste reflex. Je schakelt tussen denken en voelen op basis van de context.');
  else parts.push('Analytisch denken is niet je eerste neiging. Je vertrouwt meer op andere bronnen — zoals ervaring, gevoel of intuïtie — dan op systematische analyse. Dit kan een kracht zijn in situaties die om menselijkheid en pragmatisme vragen.');

  parts.push('\nSTRATEGISCH DENKEN');
  if (ni.score100 >= 70) parts.push('Je hebt een sterk strategisch en toekomstgericht denkvermogen. Je ziet patronen en richtingen die anderen nog niet opmerken. Je denkt graag na over de lange termijn en hebt een goed gevoel voor waar iets naartoe beweegt. Je kunt soms gefrustreerd raken als anderen niet dezelfde patronen herkennen.');
  else if (ni.score100 >= 50) parts.push('Je hebt een zekere mate van strategisch denken. Je kunt vooruitkijken wanneer dat nodig is, maar richt je ook graag op het heden. Je wisselt af tussen langetermijndenken en kortetermijnhandelen.');
  else parts.push('Je richt je liever op wat nu speelt dan op toekomstige scenario\'s. Dit maakt je praktisch en grounded, maar het kan helpen om af en toe bewust de langere termijn in je overwegingen mee te nemen.');

  parts.push('\nCREATIEF DENKEN');
  if (ne.score100 >= 70) parts.push('Je denkt sterk divergent: je ziet al snel meerdere opties en mogelijkheden waar anderen er maar één zien. Je maakt makkelijk verbanden tussen schijnbaar ongerelateerde onderwerpen. Dit maakt je creatief en innovatief, maar kan soms leiden tot keuzestress of te veel opties tegelijk.');
  else if (ne.score100 >= 50) parts.push('Je hebt een gezond creatief denkvermogen. Je kunt buiten de gebaande paden denken wanneer dat nodig is, maar zoekt ook graag structuur en houvast.');
  else parts.push('Je denkt liever convergent dan divergent: je zoekt naar de beste oplossing in plaats van tien mogelijke oplossingen. Dit maakt je focus sterk en efficiënt.');

  parts.push('\nGESTRUCTUREERD DENKEN');
  if (te.score100 >= 70) parts.push('Je denkt graag in structuur, prioriteiten en meetbare resultaten. Je wilt weten waar je naartoe werkt en hoe je voortgang kunt meten. Dit maakt je effectief en resultaatgericht, maar kan soms leiden tot een te sterke focus op output ten koste van het proces.');
  else if (te.score100 >= 50) parts.push('Je kunt gestructureerd denken wanneer de situatie daarom vraagt. Je hebt een balans tussen planmatig en flexibel werken.');
  else parts.push('Strakke structuur en planning zijn niet je eerste drijfveer. Je werkt liever flexibel en past je aan op basis van wat zich voordoet.');

  return parts.join('\n');
}

function getCommunicatieText(result: ScoreResult): string {
  const primary = getArchetypeDetail(result.highestArchetype);
  const secondary = getArchetypeDetail(result.secondArchetype);
  const fe = score(result, 'people-helper');
  const fi = score(result, 'heart-listener');
  const ti = score(result, 'clear-thinker');
  const te = score(result, 'plan-builder');

  let text = `JOUW COMMUNICATIESTIJL\n${primary.communicatie}\n\nAls ${getArchetype(result.secondArchetype).name} ook meespeelt:\n${secondary.communicatie}\n\n`;

  text += 'COMMUNICATIE IN DE PRAKTIJK\n';

  if (fe.score100 >= 60 && fi.score100 >= 60) {
    text += 'Je combineert een sterke gerichtheid op anderen met een diep innerlijk kompas. In gesprekken ben je zowel empathisch als authentiek. De uitdaging kan zijn om je eigen standpunt helder te maken zonder de harmonie te verliezen.';
  } else if (fe.score100 >= 60) {
    text += 'Je communiceert met een sterke gerichtheid op de ander. Je stemt je toon, tempo en woordkeuze af op je gesprekspartner. Dit maakt je toegankelijk en verbindend. Let erop dat je je eigen boodschap niet verliest in het afstemmen op anderen.';
  } else if (fi.score100 >= 60) {
    text += 'Je communiceert authentiek en vanuit je waarden. Je zegt wat je meent en bent niet geneigd om dingen mooier te maken dan ze zijn. Dit maakt je betrouwbaar en integer. Let erop dat je warmte toevoegt aan je directheid.';
  } else if (ti.score100 >= 60) {
    text += 'Je communiceert precies en analytisch. Je kiest je woorden zorgvuldig en onderbouwt je standpunten graag met logica. Let erop dat je niet te afstandelijk overkomt en dat je je analyse vertaalt naar begrijpelijke taal.';
  } else if (te.score100 >= 60) {
    text += 'Je communiceert resultaatgericht en efficiënt. Je wilt snel tot de kern komen en concrete afspraken maken. Let erop dat je ruimte laat voor de inbreng van anderen en dat je niet te snel naar oplossingen gaat.';
  } else {
    text += 'Je communicatiestijl is flexibel en past zich aan aan de situatie. Je hebt geen sterk uitgesproken voorkeur, wat je in staat stelt om in verschillende contexten effectief te communiceren.';
  }

  text += '\n\nTIPS VOOR EFFECTIEVERE COMMUNICATIE\n';
  text += getCommunicatieTips(result);

  return text;
}

function getCommunicatieTips(result: ScoreResult): string {
  const primary = result.highestArchetype;
  const tips: Record<ArchetypeId, string> = {
    'idea-finder': '• Vat je ideeën samen voordat je ze deelt — niet iedereen kan je associatieve denken volgen.\n• Nummer je voorstellen (optie 1, 2, 3) zodat anderen makkelijker kunnen reageren.\n• Vraag aan het eind: "Welk idee spreekt jullie het meest aan?"',
    'pattern-seer': '• Deel je denkproces vaker hardop — anderen zien je conclusie maar niet de weg ernaartoe.\n• Begin met je conclusie en werk dan terug naar de onderbouwing.\n• Gebruik concrete voorbeelden om abstracte inzichten tastbaar te maken.',
    'action-maker': '• Tel tot drie voordat je reageert in een gesprek — geef de ander de ruimte om uit te praten.\n• Vraag: "Wat bedoel je precies?" voordat je in de oplossingsmodus gaat.\n• Gebruik minder woorden met meer impact.',
    'calm-keeper': '• Deel je mening eerder in een gesprek — wacht niet tot iedereen al heeft gesproken.\n• Oefen met de zin: "Ik denk daar anders over, namelijk..."\n• Laat merken dat je hebt geluisterd door samen te vatten wat de ander heeft gezegd.',
    'plan-builder': '• Begin met de context voordat je naar de actiepunten gaat — niet iedereen denkt in stappen.\n• Vraag: "Hoe voelt dit voor jullie?" naast "Wat moeten we doen?"\n• Laat ruimte voor open discussie voordat je naar besluiten stuurt.',
    'clear-thinker': '• Vertaal je analyse naar begrijpelijke taal — vermijd jargon.\n• Gebruik "ik merk dat..." in plaats van "het klopt niet dat..." om je feedback zachter te maken.\n• Wissel analyse af met waardering — benoem ook wat wél goed gaat.',
    'people-helper': '• Zeg wat jíj vindt, niet alleen wat je denkt dat de ander wil horen.\n• Oefen met: "Ik heb een andere mening, namelijk..." zonder je te verontschuldigen.\n• Vraag jezelf af: communiceer ik nu voor de ander of voor mezelf?',
    'heart-listener': '• Deel je innerlijke wereld vaker met anderen — ze kunnen niet raden wat je voelt.\n• Vertaal je waarden naar concrete voorstellen: "Ik vind X belangrijk, daarom stel ik Y voor."\n• Wees bereid om je standpunt bij te stellen als je nieuwe informatie krijgt.',
  };
  return tips[primary] || '';
}

function getCommunicatieKort(result: ScoreResult): string {
  const map: Record<ArchetypeId, string> = {
    'idea-finder': 'associatief en energiek',
    'pattern-seer': 'doordacht en diepgaand',
    'action-maker': 'direct en to the point',
    'calm-keeper': 'rustig en overwogen',
    'plan-builder': 'helder en resultaatgericht',
    'clear-thinker': 'precies en analytisch',
    'people-helper': 'warm en afgestemd',
    'heart-listener': 'authentiek en vanuit waarden',
  };
  return map[result.highestArchetype] || 'flexibel en contextgevoelig';
}

function getMensenText(result: ScoreResult): string {
  const fe = score(result, 'people-helper');
  const fi = score(result, 'heart-listener');
  const se = score(result, 'action-maker');
  const si = score(result, 'calm-keeper');

  const parts: string[] = [];

  parts.push('SOCIALE GERICHTHEID');
  if (fe.score100 >= 70) {
    parts.push('Je hebt een sterk gevoel voor groepsdynamiek. Je merkt snel wat anderen nodig hebben en stemt je communicatie daarop af. Je bent een natuurlijke verbinder die harmonie waardeert. Het risico is dat je te veel van jezelf weggeeft om de vrede te bewaren.');
  } else if (fe.score100 >= 45) {
    parts.push('Je bent je bewust van de sfeer in een groep, zonder dat dit je eerste focus is. Je kunt schakelen tussen je eigen agenda en de behoeften van de groep. Je hebt een gezonde balans tussen betrokkenheid en afstand.');
  } else {
    parts.push('Je richt je minder op de groepsdynamiek en meer op andere aspecten van een situatie. Dit kan een kracht zijn: je laat je niet snel meeslepen door groepsdruk en houdt je eigen koers. In teamverband kan het helpen om af en toe bewust te checken hoe het met je collega\'s gaat.');
  }

  parts.push('\nINNERLIJK KOMPAS');
  if (fi.score100 >= 70) {
    parts.push('Je volgt een sterk innerlijk kompas. Authenticiteit en persoonlijke waarden zijn leidend in hoe je met anderen omgaat. Je hebt een helder beeld van wat je belangrijk vindt en laat je niet makkelijk van dat pad afbrengen. De uitdaging is om je innerlijke wereld ook te delen met anderen, zodat ze je beter begrijpen.');
  } else if (fi.score100 >= 45) {
    parts.push('Je eigen waarden spelen een rol, maar je weegt ze af tegen de situatie. Je kunt pragmatisch zijn zonder je integriteit te verliezen. Je hebt een gezonde balans tussen trouw aan jezelf en aanpassing aan de context.');
  } else {
    parts.push('Je bent flexibel in je waardenbeleving en past je makkelijker aan de context aan. Dit maakt je wendbaar en sociaal vaardig. Het kan helpen om af en toe stil te staan bij wat je écht belangrijk vindt, los van wat de situatie vraagt.');
  }

  parts.push('\nHOE JE VERBINDING MAAKT');
  if (fe.score100 >= 60 && se.score100 >= 60) {
    parts.push('Je verbindt door actief en energiek aanwezig te zijn. Je zoekt contact door samen dingen te doen en in het moment aanwezig te zijn.');
  } else if (fe.score100 >= 60 && fi.score100 >= 60) {
    parts.push('Je verbindt door diepgaand en authentiek contact te maken. Je zoekt echte gesprekken en waardeert oprechtheid boven oppervlakkigheid.');
  } else if (fi.score100 >= 60 && si.score100 >= 60) {
    parts.push('Je verbindt door betrouwbaarheid en trouw. Je investeert in duurzame relaties en bent er voor de mensen die je dierbaar zijn, consistent en zonder ophef.');
  } else if (se.score100 >= 60) {
    parts.push('Je verbindt door samen in actie te zijn. Je voelt je het meest verbonden wanneer je met anderen iets concreets doet of meemaakt.');
  } else {
    parts.push('Je maakt verbinding op een manier die past bij de situatie. Je bent niet gebonden aan één stijl en kunt schakelen tussen actief en reflectief contact.');
  }

  return parts.join('\n');
}

function getKeuzeText(result: ScoreResult): string {
  const te = score(result, 'plan-builder');
  const se = score(result, 'action-maker');
  const si = score(result, 'calm-keeper');
  const ni = score(result, 'pattern-seer');
  const fi = score(result, 'heart-listener');
  const ti = score(result, 'clear-thinker');

  const parts: string[] = [];

  parts.push('JOUW BESLUITVORMINGSSTIJL');
  if (te.score100 >= 65) {
    parts.push('Je maakt keuzes het liefst op basis van structuur en heldere prioriteiten. Je wilt weten welke stap het meeste resultaat oplevert. Je bent besluitvaardig en hebt weinig geduld voor besluiteloosheid. Let erop dat je niet te snel beslist ten koste van draagvlak.');
  } else if (ti.score100 >= 65) {
    parts.push('Je maakt keuzes op basis van logische analyse. Je weegt argumenten, toetst aannames en zoekt naar de meest consistente optie. Je neemt de tijd om goed na te denken. Let erop dat je niet vastloopt in overanalyse.');
  } else if (fi.score100 >= 65) {
    parts.push('Je maakt keuzes op basis van je waarden en innerlijk gevoel. Je checkt of een optie past bij wie je bent en waar je voor staat. Dit geeft je besluiten diepgang en overtuiging. Let erop dat je ook rationele argumenten meeweegt.');
  } else if (se.score100 >= 65) {
    parts.push('Je neemt graag snel beslissingen en vertrouwt op je directe waarneming van de situatie. Je voelt aan wat het moment vraagt en handelt daarnaar. Let erop dat je bij belangrijke beslissingen voldoende bedenktijd neemt.');
  } else {
    parts.push('Je keuzeproces is flexibel en wordt beïnvloed door de context van het moment. Je hebt geen sterk uitgesproken besluitvormingsstijl, wat je in staat stelt om per situatie te kiezen wat past.');
  }

  parts.push('\nWAT JE MEEWEEGT');
  const factors: string[] = [];
  if (te.score100 >= 50) factors.push('resultaat en efficiëntie');
  if (ti.score100 >= 50) factors.push('logica en consistentie');
  if (fi.score100 >= 50) factors.push('persoonlijke waarden');
  if (ni.score100 >= 50) factors.push('langetermijnperspectief');
  if (si.score100 >= 50) factors.push('eerdere ervaringen');
  if (se.score100 >= 50) factors.push('de huidige situatie');
  parts.push(`In je besluitvorming weeg je vooral mee: ${factors.join(', ') || 'een mix van factoren die per situatie verschilt'}.`);

  parts.push('\nBIJ BELANGRIJKE BESLUITEN');
  if (ni.score100 >= 60) {
    parts.push('Bij belangrijke besluiten neem je graag de tijd om het grotere plaatje te overzien. Je denkt na over de langetermijngevolgen en zoekt naar de route die het best aansluit bij je visie.');
  }
  if (si.score100 >= 60) {
    parts.push('Eerdere ervaringen en bewezen aanpakken wegen zwaar mee in je besluitvorming. Je vertrouwt op wat in het verleden heeft gewerkt en bent voorzichtig met onbekende routes.');
  }

  parts.push('\nTIPS VOOR BETERE BESLUITEN\n• Neem bij belangrijke keuzes bewust een nacht bedenktijd.\n• Schrijf de voor- en nadelen op papier — het maakt je denken concreter.\n• Vraag feedback aan iemand met een andere denkstijl dan jijzelf.\n• Check niet alleen of een besluit logisch klopt, maar ook of het goed voelt.');

  return parts.join('\n');
}

function getTeamBijdrage(result: ScoreResult): string {
  const map: Record<ArchetypeId, string> = {
    'idea-finder': 'creativiteit en nieuwe perspectieven',
    'pattern-seer': 'strategisch inzicht en langetermijndenken',
    'action-maker': 'snelheid en daadkracht',
    'calm-keeper': 'stabiliteit en zorgvuldigheid',
    'plan-builder': 'structuur en resultaatgerichtheid',
    'clear-thinker': 'analyse en logische scherpte',
    'people-helper': 'verbinding en harmonie',
    'heart-listener': 'authenticiteit en waardebewustzijn',
  };
  return map[result.highestArchetype] || 'een breed scala aan kwaliteiten';
}

function getTeamBehoefte(result: ScoreResult): string {
  const lowest = result.lowestArchetype;
  const map: Record<ArchetypeId, string> = {
    'idea-finder': 'Je hebt teamleden nodig die nieuwe ideeën en creatieve invalshoeken inbrengen. Zoek collega\'s die je helpen om buiten je vaste kaders te denken.',
    'pattern-seer': 'Je hebt teamleden nodig die het grote plaatje bewaken en strategisch meedenken. Zoek collega\'s die je helpen om verder vooruit te kijken.',
    'action-maker': 'Je hebt teamleden nodig die helpen om van denken naar doen te komen. Zoek collega\'s die je in beweging brengen wanneer je te lang nadenkt.',
    'calm-keeper': 'Je hebt teamleden nodig die zorgen voor rust, continuïteit en een veilige basis. Zoek collega\'s die je helpen om te vertragen wanneer dat nodig is.',
    'plan-builder': 'Je hebt teamleden nodig die structuur aanbrengen en zorgen dat plannen worden uitgevoerd. Zoek collega\'s die je helpen om doelen helder te maken.',
    'clear-thinker': 'Je hebt teamleden nodig die scherpe analyse bieden en logische lacunes blootleggen. Zoek collega\'s die je helpen om je denken aan te scherpen.',
    'people-helper': 'Je hebt teamleden nodig die zorgen voor de menselijke kant en de sfeer in het team bewaken. Zoek collega\'s die je helpen om aandacht te geven aan relaties.',
    'heart-listener': 'Je hebt teamleden nodig die je helpen om in contact te blijven met je eigen waarden en authenticiteit. Zoek collega\'s die je uitdagen om te reflecteren op wat je echt belangrijk vindt.',
  };
  return map[lowest] || 'Je hebt baat bij teamleden die je aanvullen op je minst ontwikkelde stijlen.';
}

function getEnergyDrains(result: ScoreResult): string {
  const primary = result.highestArchetype;
  const drains: Record<ArchetypeId, string> = {
    'idea-finder': '• Langdurig routinematig werk zonder variatie\n• Strakke kaders die geen ruimte laten voor improvisatie\n• Situaties waarin je je ideeën niet kwijt kunt\n• Omgevingen waar vernieuwing wordt afgewezen',
    'pattern-seer': '• Oppervlakkig werk zonder diepgang\n• Constante onderbrekingen die je denkproces verstoren\n• Omgevingen waarin snelheid belangrijker is dan kwaliteit\n• Situaties waarin je inzichten worden genegeerd',
    'action-maker': '• Lange vergaderingen zonder concrete uitkomsten\n• Bureaucratie en wachtlijsten\n• Situaties waarin je niet kunt handelen\n• Omgevingen met veel regels en weinig vrijheid',
    'calm-keeper': '• Constante veranderingen in prioriteiten\n• Onvoorspelbare situaties en chaos\n• Druk om snel te veranderen\n• Omgevingen zonder duidelijke verwachtingen',
    'plan-builder': '• Vaagheid over doelen en verwachtingen\n• Inefficiëntie en tijdverspilling\n• Situaties waarin niemand verantwoordelijkheid neemt\n• Omgevingen zonder duidelijke structuur',
    'clear-thinker': '• Oppervlakkige gesprekken en slordig denken\n• Besluiten op basis van gevoel zonder onderbouwing\n• Omgevingen die emotie boven logica stellen\n• Situaties waarin je geen tijd krijgt om na te denken',
    'people-helper': '• Conflicten die niet worden uitgesproken\n• Koude, onpersoonlijke werkculturen\n• Isolatie en gebrek aan menselijk contact\n• Situaties waarin je je niet gewaardeerd voelt',
    'heart-listener': '• Werk dat tegen je waarden ingaat\n• Omgevingen die authenticiteit ontmoedigen\n• Druk om iemand te zijn die je niet bent\n• Situaties waarin je je niet vrij voelt om je mening te uiten',
  };
  return drains[primary] || '';
}

function getEnergyAdvice(result: ScoreResult): string {
  const parts: string[] = [];
  parts.push('• Herken je energiegevers en -nemers en stuur daar bewust op.');
  parts.push('• Plan elke week minimaal één activiteit die je energie geeft.');
  parts.push('• Communiceer naar je omgeving wat je nodig hebt om goed te functioneren.');
  parts.push('• Neem signalen van vermoeidheid serieus voordat ze escaleren.');

  const primary = result.highestArchetype;
  if (primary === 'idea-finder' || primary === 'action-maker') {
    parts.push('• Bouw bewust rustmomenten in — je neiging is om door te gaan totdat je leeg bent.');
  }
  if (primary === 'people-helper') {
    parts.push('• Zorg voor tijd alleen om je sociale batterij op te laden.');
  }
  if (primary === 'calm-keeper' || primary === 'heart-listener') {
    parts.push('• Zoek een vaste plek of ritueel dat je helpt om tot rust te komen na drukke periodes.');
  }

  return parts.join('\n');
}

function getKrachtCombinatie(result: ScoreResult): string {
  const p = result.highestArchetype;
  const s = result.secondArchetype;

  if ((p === 'idea-finder' || s === 'idea-finder') && (p === 'plan-builder' || s === 'plan-builder'))
    return 'creatieve ideeën om te zetten in concrete plannen met meetbare resultaten';
  if ((p === 'pattern-seer' || s === 'pattern-seer') && (p === 'action-maker' || s === 'action-maker'))
    return 'strategisch inzicht te vertalen naar directe actie';
  if ((p === 'people-helper' || s === 'people-helper') && (p === 'clear-thinker' || s === 'clear-thinker'))
    return 'menselijkheid en analytisch denken met elkaar te verbinden';
  if ((p === 'calm-keeper' || s === 'calm-keeper') && (p === 'idea-finder' || s === 'idea-finder'))
    return 'stabiliteit te bieden als basis voor creatieve verkenning';
  if ((p === 'heart-listener' || s === 'heart-listener') && (p === 'plan-builder' || s === 'plan-builder'))
    return 'waarden te vertalen naar gestructureerde plannen';

  const primary = getArchetype(p);
  const secondary = getArchetype(s);
  return `${primary.strength.toLowerCase().replace(/\.$/, '')} en tegelijkertijd ${secondary.strength.toLowerCase()}`;
}

function getKrachtContext(result: ScoreResult): string {
  const all = sorted(result);
  const high = all.filter((s) => s.score100 >= 65);

  if (high.length >= 4) {
    return 'Je hebt opvallend veel archetypes met een hoge score. Dit wijst op een breed repertoire aan krachten. Het voordeel is veelzijdigheid; de uitdaging is om te weten wanneer je welke kracht inzet en niet te versnipperen.';
  }
  if (high.length <= 1) {
    return 'Je krachten zijn geconcentreerd rond één of twee archetypes. Dit geeft je een duidelijk profiel en een sterke identiteit. De uitdaging is om flexibel te blijven en te herkennen wanneer een andere stijl effectiever zou zijn.';
  }
  return 'Je krachten zijn verdeeld over enkele archetypes, wat je een helder maar niet te smal profiel geeft. Je kunt effectief schakelen tussen je sterke stijlen.';
}

function getValkuilVerdieping(id: ArchetypeId): string {
  const map: Record<ArchetypeId, string> = {
    'idea-finder': 'In de praktijk kan dit betekenen dat je projecten niet afmaakt, dat je anderen overweldigt met te veel opties, of dat je moeite hebt met routinetaken. Je kunt ook de neiging hebben om bij tegenslag een heel nieuw plan te bedenken in plaats van het huidige bij te stellen.',
    'pattern-seer': 'In de praktijk kan dit betekenen dat je te lang nadenkt voordat je handelt, dat je gefrustreerd raakt als anderen je visie niet delen, of dat je je terugtrekt in je gedachten. Je kunt ook de neiging hebben om te veel betekenis te lezen in situaties die eenvoudiger zijn dan je denkt.',
    'action-maker': 'In de praktijk kan dit betekenen dat je te snel reageert op situaties, dat je anderen niet voldoende betrekt bij je besluiten, of dat je ongeduldig wordt met reflectie en planning. Je kunt ook de neiging hebben om risico\'s te onderschatten.',
    'calm-keeper': 'In de praktijk kan dit betekenen dat je weerstand biedt tegen verandering, dat je nieuwe ideeën te snel afwijst, of dat je je oncomfortabel voelt bij onzekerheid. Je kunt ook de neiging hebben om problemen te negeren in de hoop dat ze vanzelf verdwijnen.',
    'plan-builder': 'In de praktijk kan dit betekenen dat je te controlerend wordt, dat je moeilijk kunt delegeren, of dat je de menselijke kant van een project uit het oog verliest. Je kunt ook de neiging hebben om door te werken ten koste van je eigen welzijn.',
    'clear-thinker': 'In de praktijk kan dit betekenen dat je te kritisch wordt naar jezelf en anderen, dat je emoties onderwaardeert, of dat je te veel tijd besteedt aan analyse. Je kunt ook de neiging hebben om je gelijk te willen halen, zelfs als dat de relatie schaadt.',
    'people-helper': 'In de praktijk kan dit betekenen dat je je eigen behoeften verwaarloost, dat je te veel ja zegt, of dat je conflicten vermijdt terwijl ze wel aangepakt moeten worden. Je kunt ook de neiging hebben om je stemming te laten afhangen van hoe het met anderen gaat.',
    'heart-listener': 'In de praktijk kan dit betekenen dat je je terugtrekt als je je niet begrepen voelt, dat je te star vasthouden aan je standpunten, of dat je moeilijk compromissen sluit. Je kunt ook de neiging hebben om je emoties op te kroppen in plaats van ze te uiten.',
  };
  return map[id] || '';
}

function getValkuilHerkenning(result: ScoreResult): string {
  const primary = result.highestArchetype;
  const signals: Record<ArchetypeId, string> = {
    'idea-finder': '• Je merkt dat je steeds nieuwe dingen begint zonder iets af te ronden.\n• Je voelt je onrustig maar kunt niet benoemen waarom.\n• Anderen geven aan dat ze je niet meer kunnen volgen.',
    'pattern-seer': '• Je merkt dat je steeds dieper graaft zonder tot conclusies te komen.\n• Je voelt je gefrustreerd omdat anderen je visie niet begrijpen.\n• Je trekt je steeds meer terug in je eigen gedachten.',
    'action-maker': '• Je merkt dat je reageert voordat je hebt nagedacht.\n• Je voelt je fysiek onrustig en hebt moeite met stilzitten.\n• Anderen geven aan dat je te snel gaat of te weinig overlegt.',
    'calm-keeper': '• Je merkt dat je steeds meer weerstand voelt tegen verandering.\n• Je voelt je angstig bij onzekerheid, zelfs als het om kleine dingen gaat.\n• Je vermijdt gesprekken over nieuwe richtingen.',
    'plan-builder': '• Je merkt dat je steeds meer controle probeert te houden.\n• Je voelt je verantwoordelijk voor alles, ook voor dingen buiten je invloed.\n• Je wordt ongeduldig met anderen die anders werken dan jij.',
    'clear-thinker': '• Je merkt dat je steeds kritischer wordt, ook op kleine details.\n• Je voelt je geïrriteerd door onlogisch gedrag van anderen.\n• Je hebt moeite om je analyse los te laten en te vertrouwen op gevoel.',
    'people-helper': '• Je merkt dat je moe bent zonder duidelijke reden.\n• Je voelt je schuldig als je nee zegt.\n• Je eigen behoeften zijn vaag geworden — je weet niet meer wat je zelf wilt.',
    'heart-listener': '• Je merkt dat je je terugtrekt en minder communiceert.\n• Je voelt innerlijke onvrede die je moeilijk kunt verwoorden.\n• Je wordt steeds vaster in je standpunten zonder ruimte voor nuance.',
  };
  return signals[primary] || '';
}

function getStressSignalen(result: ScoreResult): string {
  const primary = result.highestArchetype;
  const signals: Record<ArchetypeId, string> = {
    'idea-finder': '• Meer praten maar minder doen\n• Moeite met concentratie\n• Prikkelbaar wanneer ideeën worden afgewezen\n• Steeds nieuwe plannen maken zonder de oude af te ronden',
    'pattern-seer': '• Je terugtrrekken in stilte\n• Moeite om je gedachten te verwoorden\n• Steeds dieper graven zonder tot actie te komen\n• Gefrustreerd raken als anderen het niet \"snappen\"',
    'action-maker': '• Impulsieve beslissingen\n• Fysieke onrust\n• Kort lontje bij vertraging\n• Door blijven gaan terwijl je eigenlijk moet pauzeren',
    'calm-keeper': '• Meer vasthouden aan routines dan normaal\n• Weerstand tegen elk nieuw voorstel\n• Terugtrekken in je comfort zone\n• Minder communiceren met je omgeving',
    'plan-builder': '• Alles willen controleren\n• Doorwerken zonder pauze\n• Gefrustreerd raken als dingen niet volgens plan gaan\n• Anderen de maat nemen aan jouw standaarden',
    'clear-thinker': '• Overmatige kritiek op details\n• Emotionele afstand van anderen\n• Vastlopen in analyse\n• Moeilijk los kunnen laten van je standpunt',
    'people-helper': '• Te veel ja zeggen\n• Vermoeidheid zonder duidelijke oorzaak\n• Je eigen mening niet meer kennen\n• Stemming die meedeint met die van anderen',
    'heart-listener': '• Je afsluiten van anderen\n• Innerlijke spanning die je moeilijk kunt uiten\n• Steeds vaster worden in je standpunten\n• Het gevoel dat niemand je begrijpt',
  };
  return signals[primary] || '';
}

function getGroeiOefeningen(result: ScoreResult): string {
  const lowest = result.lowestArchetype;
  const exercises: Record<ArchetypeId, string> = {
    'idea-finder': 'OEFENING: CREATIVITEIT ACTIVEREN\nDaag jezelf uit om bij een probleem minimaal drie alternatieve oplossingen te bedenken voordat je kiest. Begin klein: wat zou je anders kunnen doen op je dagelijkse route naar werk?',
    'pattern-seer': 'OEFENING: VOORUITKIJKEN\nNeem elke week tien minuten om na te denken: waar wil ik over zes maanden staan? Wat zijn de trends die ik nu al kan zien? Schrijf je gedachten op zonder te oordelen.',
    'action-maker': 'OEFENING: IN ACTIE KOMEN\nKies één ding dat je al lang uitstelt en doe het vandaag. Begin klein — het gaat niet om het resultaat, maar om de ervaring van direct handelen.',
    'calm-keeper': 'OEFENING: RUST VINDEN\nCreëer één vast ritueel per dag dat je rust geeft: een kop thee, een wandeling, tien minuten stilte. Bouw dit op tot een anker in je dag.',
    'plan-builder': 'OEFENING: STRUCTUUR AANBRENGEN\nMaak aan het begin van elke week een lijstje met drie prioriteiten. Niet meer dan drie. Evalueer aan het einde van de week: wat heb je afgerond?',
    'clear-thinker': 'OEFENING: SCHERPER DENKEN\nLees een artikel en probeer de drie belangrijkste argumenten samen te vatten in je eigen woorden. Wat is de kern? Wat klopt er niet?',
    'people-helper': 'OEFENING: VERBINDING MAKEN\nVraag deze week aan drie mensen hoe het écht met ze gaat. Luister zonder te adviseren. Merk op hoe het voelt om simpelweg aanwezig te zijn.',
    'heart-listener': 'OEFENING: WAARDEN VERHELDEREN\nSchrijf vijf waarden op die je belangrijk vindt. Kies er één en vraag jezelf: hoe leef ik deze waarde in mijn dagelijks leven? Wat zou ik willen veranderen?',
  };
  return exercises[lowest] || '';
}

function getMonthlyTips(result: ScoreResult): string {
  const primary = result.highestArchetype;
  const tips: Record<ArchetypeId, string> = {
    'idea-finder': 'Week 1: Kies één lopend project en rond het af voordat je iets nieuws begint.\nWeek 2: Vraag iemand om je drie beste ideeën te helpen prioriteren.\nWeek 3: Experimenteer met een vaste werkroutine voor de ochtend.\nWeek 4: Reflecteer: welk idee heeft de meeste impact gehad deze maand?',
    'pattern-seer': 'Week 1: Deel een inzicht met een collega en vraag om een concrete eerste stap.\nWeek 2: Stel een tijdslimiet voor je denkwerk: maximaal twee uur, dan handelen.\nWeek 3: Probeer iets uit waar je nog niet 100% zeker van bent.\nWeek 4: Reflecteer: welk inzicht heb ik deze maand getoetst in de praktijk?',
    'action-maker': 'Week 1: Tel bij elke belangrijke beslissing tot tien voordat je handelt.\nWeek 2: Vraag een collega om mee te denken voordat je een plan uitvoert.\nWeek 3: Plan een halfuur reflectietijd in je agenda.\nWeek 4: Reflecteer: bij welk moment had ik baat gehad bij meer geduld?',
    'calm-keeper': 'Week 1: Probeer één kleine verandering in je dagelijkse routine.\nWeek 2: Zeg bij een nieuw voorstel eerst "vertel me meer" in plaats van "nee".\nWeek 3: Doe iets dat je normaal niet zou doen — kies een ander restaurant, een andere route.\nWeek 4: Reflecteer: welke verandering viel mee en wat heb ik ervan geleerd?',
    'plan-builder': 'Week 1: Delegeer één taak die je normaal zelf zou doen.\nWeek 2: Vraag aan een collega: "Hoe gaat het met je?" zonder het over werk te hebben.\nWeek 3: Plan bewust een middag zonder agenda.\nWeek 4: Reflecteer: waar heb ik controle losgelaten en hoe voelde dat?',
    'clear-thinker': 'Week 1: Geef een compliment aan iemand over iets dat niet perfect is.\nWeek 2: Luister een gesprek lang zonder te analyseren of te corrigeren.\nWeek 3: Neem een beslissing op basis van je gevoel in plaats van je hoofd.\nWeek 4: Reflecteer: wanneer was ik deze maand het warmst naar een ander?',
    'people-helper': 'Week 1: Zeg één keer "nee" zonder uitleg of excuus.\nWeek 2: Schrijf op wat jíj wilt, los van wat anderen verwachten.\nWeek 3: Vraag om hulp in plaats van hulp aan te bieden.\nWeek 4: Reflecteer: hoe voelde het om mijn eigen behoeften voorrang te geven?',
    'heart-listener': 'Week 1: Deel een gevoel met iemand die je vertrouwt.\nWeek 2: Vertaal een waarde naar één concrete actie.\nWeek 3: Luister naar een standpunt dat je niet deelt, zonder te oordelen.\nWeek 4: Reflecteer: welke waarde heb ik deze maand zichtbaar gemaakt in mijn gedrag?',
  };
  return tips[primary] || '';
}

function getClusterVerdieping(result: ScoreResult): string {
  const sorted = [...result.clusterScores].sort((a, b) => b.score100 - a.score100);
  const parts: string[] = [];

  for (const cs of sorted) {
    const cluster = getCluster(cs.clusterId);
    const [a1, a2] = cluster.archetypes;
    const arch1 = getArchetype(a1);
    const arch2 = getArchetype(a2);
    const s1 = score(result, a1);
    const s2 = score(result, a2);

    let levelText = '';
    if (cs.score100 >= 70) levelText = 'Dit cluster is sterk aanwezig in je profiel.';
    else if (cs.score100 >= 50) levelText = 'Dit cluster speelt een duidelijke rol in je profiel.';
    else if (cs.score100 >= 30) levelText = 'Dit cluster is gematigd aanwezig.';
    else levelText = 'Dit cluster is minder dominant in je profiel.';

    parts.push(`${cluster.name.toUpperCase()} (${Math.round(cs.score100)} punten)
${cluster.meaning} ${levelText}

Dit cluster bestaat uit:
• ${arch1.name} (${Math.round(s1.score100)} punten) — ${arch1.strength.toLowerCase()}
• ${arch2.name} (${Math.round(s2.score100)} punten) — ${arch2.strength.toLowerCase()}

${getClusterInterpretatie(cs.clusterId, cs.score100)}`);
  }

  return parts.join('\n\n');
}

function getClusterInterpretatie(id: string, score100: number): string {
  if (score100 < 40) {
    const low: Record<string, string> = {
      amber: 'De Amber-energie is minder dominant in je profiel. Je bent mogelijk minder gericht op nieuwe ideeën genereren en groepsdynamiek, en meer op andere kwaliteiten. In situaties die om creativiteit en mensgerichtheid vragen, kan het helpen om bewust op deze energie te leunen.',
      indigo: 'De Indigo-energie is minder dominant in je profiel. Je bent mogelijk minder gericht op diepgaande analyse en strategisch denken, en meer op directe actie of persoonlijke verbinding. In situaties die om reflectie vragen, kan het helpen om bewust meer tijd te nemen.',
      karmijn: 'De Karmijn-energie is minder dominant in je profiel. Je bent mogelijk minder gericht op directe actie en structuur, en meer op reflectie of verbinding. In situaties die om snelle resultaten vragen, kan het helpen om bewust meer in de doe-modus te stappen.',
      jade: 'De Jade-energie is minder dominant in je profiel. Je bent mogelijk minder gericht op stabiliteit en innerlijke waarden, en meer op vernieuwing of resultaat. In situaties die om rust en authenticiteit vragen, kan het helpen om bewust te vertragen.',
    };
    return low[id] || '';
  }
  if (score100 >= 65) {
    const high: Record<string, string> = {
      amber: 'De Amber-energie is sterk aanwezig. Je hebt een natuurlijke combinatie van creativiteit en mensgerichtheid. Je ziet mogelijkheden en verbindt mensen. Pas op dat je niet te veel hooi op je vork neemt of te veel energie geeft aan anderen.',
      indigo: 'De Indigo-energie is sterk aanwezig. Je hebt een natuurlijke combinatie van inzicht en analytisch vermogen. Je ziet patronen en toetst ze op logica. Pas op dat je niet te ver in je hoofd blijft en de verbinding met de praktijk verliest.',
      karmijn: 'De Karmijn-energie is sterk aanwezig. Je hebt een natuurlijke combinatie van actie en structuur. Je handelt snel en georganiseerd. Pas op dat je niet te veel doorpakt zonder te reflecteren op het proces en de mensen om je heen.',
      jade: 'De Jade-energie is sterk aanwezig. Je hebt een natuurlijke combinatie van rust en authenticiteit. Je brengt stabiliteit en trouwheid aan waarden. Pas op dat je niet te veel vastzit in het bekende en te weinig ruimte laat voor groei en verandering.',
    };
    return high[id] || '';
  }
  return 'Dit cluster is in gezonde mate aanwezig: je kunt erop terugvallen wanneer de situatie erom vraagt, zonder dat het je profiel domineert.';
}

function getAllArchetypesText(result: ScoreResult): string {
  const all = sorted(result);
  const parts: string[] = [];

  parts.push('Hieronder een overzicht van al je acht archetypescores, van hoog naar laag, met een korte duiding per score.\n');

  for (let i = 0; i < all.length; i++) {
    const s = all[i];
    const a = getArchetype(s.archetypeId);
    const rank = i === 0 ? '(Hoofdarchetype)' : i === 1 ? '(Tweede archetype)' : i === 2 ? '(Derde archetype)' : i === all.length - 1 ? '(Minst aanwezig)' : '';

    let interpretation = '';
    if (s.score100 >= 75) interpretation = 'Deze stijl is zeer sterk aanwezig in je profiel. Je valt hier automatisch op terug en het kleurt een groot deel van je gedrag.';
    else if (s.score100 >= 55) interpretation = 'Deze stijl is duidelijk aanwezig. Je kunt deze kwaliteit effectief inzetten wanneer de situatie daarom vraagt.';
    else if (s.score100 >= 35) interpretation = 'Deze stijl is gematigd aanwezig. Je hebt er toegang toe, maar het is niet je eerste neiging.';
    else interpretation = 'Deze stijl is minder sterk aanwezig. Je valt hier niet spontaan op terug. Dit is geen zwakte, maar een indicatie dat andere stijlen dichter bij je staan.';

    const sd = s.standardDeviation;
    let sdText = '';
    if (sd > 1.8) sdText = ' Je antwoorden op deze schaal lieten relatief veel spreiding zien, wat kan wijzen op ambivalentie of situatieafhankelijkheid.';

    parts.push(`${i + 1}. ${a.name} — ${Math.round(s.score100)} punten ${rank}
${a.meaning}
${interpretation}${sdText}
Kracht: ${a.strength.toLowerCase()}
Valkuil: ${a.riskUnderPressure.toLowerCase()}
Groeirichting: ${a.growthEdge.toLowerCase()}`);
  }

  return parts.join('\n\n');
}
