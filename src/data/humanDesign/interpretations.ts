import type { HDAuthority, HDDefinition, HDType } from '../../types/humanDesign';

export interface TypeInfo {
  naam: string;
  strategie: string;
  thema: string;
  kracht: string;
  aandachtspunt: string;
}

export const typeInfo: Record<HDType, TypeInfo> = {
  generator: {
    naam: 'Generator',
    strategie: 'Wachten om te reageren',
    thema: 'Je bent gebouwd om duurzame, opbouwende energie te leveren wanneer je reageert op wat het leven je aanreikt.',
    kracht: 'Je hebt toegang tot een diepe, hernieuwbare werkenergie zodra je bezig bent met iets dat je sacraal centrum bevestigt.',
    aandachtspunt: 'Wanneer je initieert in plaats van reageert, kan frustratie ontstaan. Reageren is geen zwakte — het is jouw manier om je energie op de juiste plek te krijgen.',
  },
  'manifesting-generator': {
    naam: 'Manifesting Generator',
    strategie: 'Reageren, en daarna informeren',
    thema: 'Je combineert de opbouwende energie van een Generator met de snelheid en het initiatief van een Manifestor.',
    kracht: 'Je kunt meerdere paden tegelijk verkennen en snel schakelen zodra je sacraal centrum "ja" zegt.',
    aandachtspunt: 'Je neiging om stappen over te slaan kan tot fouten leiden. Informeren voordat je handelt voorkomt weerstand van je omgeving.',
  },
  manifestor: {
    naam: 'Manifestor',
    strategie: 'Informeren voordat je handelt',
    thema: 'Je bent gebouwd om te initiëren en dingen in beweging te zetten, onafhankelijk van bevestiging van buitenaf.',
    kracht: 'Je hebt de energie om zelfstandig te starten en impact te maken zonder op een uitnodiging te wachten.',
    aandachtspunt: 'Je impact op anderen is groter dan je soms beseft. Informeren vooraf voorkomt weerstand en maakt je pad soepeler.',
  },
  projector: {
    naam: 'Projector',
    strategie: 'Wachten op een uitnodiging',
    thema: 'Je bent gebouwd om systemen, mensen en energie te doorzien en te begeleiden, niet om zelf de motor te zijn.',
    kracht: 'Je hebt een natuurlijk vermogen om te zien wat werkt en wat niet, en waar de meeste efficiëntie te behalen valt.',
    aandachtspunt: 'Werken zonder erkenning of uitnodiging kan uitputten. Wachten voelt soms passief, maar is jouw weg naar herkenning.',
  },
  reflector: {
    naam: 'Reflector',
    strategie: 'Een volledige maancyclus de tijd nemen',
    thema: 'Je weerspiegelt je omgeving en de mensen om je heen op een unieke, gevoelige manier.',
    kracht: 'Je bent een barometer voor de gezondheid van een gemeenschap of omgeving — je voelt feilloos aan wat er speelt.',
    aandachtspunt: 'Grote beslissingen verdienen bij jou tijd: een maancyclus van ongeveer 28 dagen helpt om helderheid te laten rijpen.',
  },
};

export interface AuthorityInfo {
  naam: string;
  thema: string;
  advies: string;
}

export const authorityInfo: Record<HDAuthority, AuthorityInfo> = {
  emotional: {
    naam: 'Emotionele autoriteit',
    thema: 'Je innerlijke weten komt in golven. Er is geen "juiste" emotie op een gegeven moment — waarheid ontstaat pas na verloop van tijd.',
    advies: 'Geef jezelf bij belangrijke beslissingen bewust tijd. Slaap er een nacht over, of langer, voordat je een definitief antwoord geeft.',
  },
  sacral: {
    naam: 'Sacrale autoriteit',
    thema: 'Je lichaam geeft een directe respons — een gevoel van "ja" of "nee" dat zich vaak uit als een geluid of lichamelijke sensatie.',
    advies: 'Vertrouw op je eerste, spontane lichamelijke reactie op een vraag. Overdenken vertroebelt vaak wat je lijf al wist.',
  },
  splenic: {
    naam: 'Miltautoriteit',
    thema: 'Je intuïtie spreekt zacht en precies op het moment zelf — subtiel, en zonder herhaling.',
    advies: 'Leer die stille, eerste ingeving te herkennen en te vertrouwen voordat je verstand het overneemt.',
  },
  ego: {
    naam: 'Ego-autoriteit',
    thema: 'Je autoriteit ligt in wilskracht: wat je hart echt wil toezeggen, niet wat je denkt dat je zou moeten willen.',
    advies: 'Vraag jezelf bij keuzes: wil ik dit echt, met heel mijn wilskracht? Zo niet, is het waarschijnlijk niet aan jou om het te doen.',
  },
  'self-projected': {
    naam: 'Zelf-geprojecteerde autoriteit',
    thema: 'Je helderheid ontstaat door te praten en jezelf te horen — niet door in stilte na te denken.',
    advies: 'Zoek een vertrouwd klankbord. Praat hardop over je keuze en luister naar wat er vanzelf uit je komt.',
  },
  mental: {
    naam: 'Mentale autoriteit',
    thema: 'Je hebt geen vast innerlijk gevoelscentrum dat automatisch stuurt. Je omgeving en gesprekken met anderen zijn je spiegel.',
    advies: 'Neem beslissingen niet alleen in je hoofd en niet alleen in eenzaamheid. Bespreek belangrijke keuzes hardop met mensen die je vertrouwt, in een omgeving die bij je past.',
  },
  lunar: {
    naam: 'Lunaire autoriteit',
    thema: 'Als Reflector is jouw proces uniek: je weerspiegelt je omgeving en hebt de volledige cyclus van de maan nodig om tot klaarheid te komen.',
    advies: 'Bij grote beslissingen: neem de tijd van een volledige maancyclus (ongeveer 28 dagen) en bespreek je overwegingen met mensen die je vertrouwt.',
  },
};

export interface DefinitionInfo {
  naam: string;
  thema: string;
}

export const definitionInfo: Record<HDDefinition, DefinitionInfo> = {
  geen: {
    naam: 'Geen vaste definitie',
    thema: 'Je hebt geen vast ingekleurde centra. Dit geeft een grote gevoeligheid en openheid voor je omgeving — je weerspiegelt wat er om je heen gebeurt.',
  },
  enkelvoudig: {
    naam: 'Enkelvoudige definitie',
    thema: 'Je energie vormt één samenhangend geheel. Je voelt je over het algemeen zelfvoorzienend en consistent in wie je bent.',
  },
  gesplitst: {
    naam: 'Gesplitste definitie',
    thema: 'Je energie bestaat uit twee delen die niet rechtstreeks met elkaar verbonden zijn. Je zoekt vaak — bewust of onbewust — naar mensen of ervaringen die de brug tussen die delen vormen.',
  },
  'drievoudig-gesplitst': {
    naam: 'Drievoudig gesplitste definitie',
    thema: 'Je energie bestaat uit drie afzonderlijke delen. Verbinding met anderen speelt een belangrijke rol in het overbruggen van deze delen van jezelf.',
  },
  'viervoudig-gesplitst': {
    naam: 'Viervoudig gesplitste definitie',
    thema: 'Je energie bestaat uit vier afzonderlijke delen — een zeldzame configuratie. Je hebt mogelijk meerdere mensen of contexten nodig om je volledig verbonden te voelen.',
  },
};

export interface LineInfo {
  naam: string;
  thema: string;
}

export const lineInfo: Record<number, LineInfo> = {
  1: { naam: 'Onderzoeker', thema: 'bouwt vertrouwen op via kennis, verdieping en een stevige basis' },
  2: { naam: 'Kluizenaar', thema: 'heeft natuurlijk talent en werkt het best vanuit een eigen ritme, tot anderen erop wijzen' },
  3: { naam: 'Ontdekker', thema: 'leert door te proberen, aan te passen en te ontdekken wat wél en niet werkt' },
  4: { naam: 'Netwerker', thema: 'vindt zijn weg via een hechte kring en betekenisvolle relaties' },
  5: { naam: 'Praktisch probleemoplosser', thema: 'wordt door anderen gezien als iemand met oplossingen, met impact die verder reikt dan de eigen kring' },
  6: { naam: 'Rolmodel', thema: 'doorloopt verschillende levensfases en groeit uiteindelijk naar overzicht en voorbeeldrol' },
};

export function profileDescription(profile: [number, number]): string {
  const [p1, p2] = profile;
  const l1 = lineInfo[p1];
  const l2 = lineInfo[p2];
  return `Jouw profiel ${p1}/${p2} combineert de ${l1.naam.toLowerCase()} (${l1.thema}) met de ${l2.naam.toLowerCase()} (${l2.thema}).`;
}
