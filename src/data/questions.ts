import type { Question } from '../types';

export const questions: Question[] = [
  // === The Idea Finder (Ne) — Amber ===
  { id: 1, text: 'Ik krijg energie van het bedenken van nieuwe mogelijkheden.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber' },
  { id: 2, text: 'Als ik één idee heb, zie ik meteen drie varianten.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber' },
  { id: 3, text: 'Ik vind het lastig om lang bij één plan te blijven.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber' },
  { id: 4, text: 'Ik kies liever een bewezen aanpak dan iets nieuws.', archetypeId: 'idea-finder', reverseScored: true, colorCluster: 'amber' },
  { id: 5, text: 'Brainstormen is voor mij een van de leukste werkvormen.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber', consistencyPair: 1 },
  { id: 6, text: 'Ik voel me onrustig als er geen ruimte is voor improvisatie.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber' },
  { id: 7, text: 'Ik word enthousiast van onverwachte wendingen in een project.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber' },
  { id: 8, text: 'Ik vind het leuk om verbanden te leggen tussen totaal verschillende onderwerpen.', archetypeId: 'idea-finder', reverseScored: false, colorCluster: 'amber', consistencyPair: 1 },

  // === The Pattern Seer (Ni) — Indigo ===
  { id: 9, text: 'Ik merk dat ik vaak diepere verbanden zie die anderen missen.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo' },
  { id: 10, text: 'Ik heb regelmatig een sterk voorgevoel over hoe iets gaat lopen.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo' },
  { id: 11, text: 'Ik denk graag na over de lange termijn voordat ik keuzes maak.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo', consistencyPair: 2 },
  { id: 12, text: 'Ik hou me liever bezig met wat nu speelt dan met de toekomst.', archetypeId: 'pattern-seer', reverseScored: true, colorCluster: 'indigo' },
  { id: 13, text: 'Ik zoek vaak naar de onderliggende betekenis van gebeurtenissen.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo' },
  { id: 14, text: 'Ik kan goed beschrijven waar iets naartoe beweegt.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo' },
  { id: 15, text: 'Ik denk vaak na over hoe het verleden en de toekomst met elkaar samenhangen.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo', consistencyPair: 2 },
  { id: 16, text: 'Ik heb soms een helder beeld van iets dat er nog niet is.', archetypeId: 'pattern-seer', reverseScored: false, colorCluster: 'indigo' },

  // === The Action Maker (Se) — Karmijn ===
  { id: 17, text: 'Ik reageer snel wanneer een situatie daarom vraagt.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn', consistencyPair: 3 },
  { id: 18, text: 'Ik voel me op mijn best als ik direct kan handelen.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn' },
  { id: 19, text: 'Ik merk details op die anderen over het hoofd zien.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn' },
  { id: 20, text: 'Ik plan liever eerst uitgebreid voordat ik begin.', archetypeId: 'action-maker', reverseScored: true, colorCluster: 'karmijn' },
  { id: 21, text: 'Ik hou van situaties waarin ik ter plekke kan schakelen.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn', consistencyPair: 3 },
  { id: 22, text: 'Ik leer het meest door dingen gewoon te proberen.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn' },
  { id: 23, text: 'Ik heb een scherp oog voor wat er om me heen gebeurt.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn' },
  { id: 24, text: 'Stilzitten terwijl er iets gedaan moet worden voelt voor mij onnatuurlijk.', archetypeId: 'action-maker', reverseScored: false, colorCluster: 'karmijn' },

  // === The Calm Keeper (Si) — Jade ===
  { id: 25, text: 'Ik voel me het prettigst bij een vaste routine.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade', consistencyPair: 4 },
  { id: 26, text: 'Ik bewaar graag herinneringen en tradities.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade' },
  { id: 27, text: 'Ik heb liever stabiliteit dan verrassing.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade' },
  { id: 28, text: 'Onverwachte veranderingen geven mij juist energie.', archetypeId: 'calm-keeper', reverseScored: true, colorCluster: 'jade' },
  { id: 29, text: 'Ik vertrouw op eerdere ervaringen bij het nemen van besluiten.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade' },
  { id: 30, text: 'Ik zorg graag dat beproefde werkwijzen behouden blijven.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade' },
  { id: 31, text: 'Een voorspelbare dag geeft mij meer rust dan een dag vol verrassingen.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade', consistencyPair: 4 },
  { id: 32, text: 'Ik voel me verbonden met plekken en gewoontes die al lang bestaan.', archetypeId: 'calm-keeper', reverseScored: false, colorCluster: 'jade' },

  // === The Plan Builder (Te) — Karmijn ===
  { id: 33, text: 'Ik maak graag een duidelijk stappenplan voordat ik begin.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn', consistencyPair: 5 },
  { id: 34, text: 'Ik wil bij elk project weten wat het concrete resultaat moet zijn.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn' },
  { id: 35, text: 'Ik vind het belangrijk dat taken op tijd worden afgerond.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn' },
  { id: 36, text: 'Ik werk het liefst zonder vaste planning.', archetypeId: 'plan-builder', reverseScored: true, colorCluster: 'karmijn' },
  { id: 37, text: 'Ik orden mijn werk het liefst in prioriteiten.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn' },
  { id: 38, text: 'Ik voel me verantwoordelijk voor het eindresultaat.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn' },
  { id: 39, text: 'Ik vind het prettig als doelen helder en meetbaar zijn.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn', consistencyPair: 5 },
  { id: 40, text: 'Ik wil graag dat afspraken nagekomen worden.', archetypeId: 'plan-builder', reverseScored: false, colorCluster: 'karmijn' },

  // === The Clear Thinker (Ti) — Indigo ===
  { id: 41, text: 'Ik wil graag precies begrijpen hoe iets in elkaar zit.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo', consistencyPair: 6 },
  { id: 42, text: 'Ik merk snel wanneer een redenering niet klopt.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo' },
  { id: 43, text: 'Ik analyseer een vraagstuk het liefst stap voor stap.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo' },
  { id: 44, text: 'Ik ga liever af op mijn gevoel dan op logische analyse.', archetypeId: 'clear-thinker', reverseScored: true, colorCluster: 'indigo' },
  { id: 45, text: 'Ik stel scherpe vragen om tot de kern te komen.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo' },
  { id: 46, text: 'Ik vind het prettig om complexe informatie te ordenen.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo' },
  { id: 47, text: 'Ik zoek graag uit waarom iets werkt, niet alleen dát het werkt.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo', consistencyPair: 6 },
  { id: 48, text: 'Ik vind het fijn om een standpunt vanuit meerdere kanten te toetsen.', archetypeId: 'clear-thinker', reverseScored: false, colorCluster: 'indigo' },

  // === The People Helper (Fe) — Amber ===
  { id: 49, text: 'Ik voel snel aan hoe de sfeer in een groep is.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber', consistencyPair: 7 },
  { id: 50, text: 'Ik vind het belangrijk dat iedereen zich gehoord voelt.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber' },
  { id: 51, text: 'Ik pas mijn communicatie aan op de persoon tegenover mij.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber' },
  { id: 52, text: 'Ik vind het niet zo belangrijk wat anderen van mij vinden.', archetypeId: 'people-helper', reverseScored: true, colorCluster: 'amber' },
  { id: 53, text: 'Ik zet me graag in om conflicten op te lossen.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber' },
  { id: 54, text: 'Ik merk het snel als iemand zich niet op zijn gemak voelt.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber', consistencyPair: 7 },
  { id: 55, text: 'Ik vind het waardevol om te investeren in goede werkrelaties.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber' },
  { id: 56, text: 'Als er spanning is in een groep, wil ik die het liefst bespreekbaar maken.', archetypeId: 'people-helper', reverseScored: false, colorCluster: 'amber' },

  // === The Heart Listener (Fi) — Jade ===
  { id: 57, text: 'Ik volg mijn eigen waarden, ook als de groep anders denkt.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade', consistencyPair: 8 },
  { id: 58, text: 'Ik weet meestal goed wat ik echt belangrijk vind.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade' },
  { id: 59, text: 'Authenticiteit is voor mij belangrijker dan populariteit.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade' },
  { id: 60, text: 'Ik pas me gemakkelijk aan de verwachtingen van anderen aan.', archetypeId: 'heart-listener', reverseScored: true, colorCluster: 'jade' },
  { id: 61, text: 'Ik heb een sterk innerlijk kompas dat mijn keuzes stuurt.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade' },
  { id: 62, text: 'Ik merk het direct als iets niet past bij wie ik ben.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade', consistencyPair: 8 },
  { id: 63, text: 'Ik kan moeilijk iets doen dat tegen mijn overtuigingen ingaat.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade' },
  { id: 64, text: 'Ik wil dat mijn werk aansluit bij wat ik van binnen voel.', archetypeId: 'heart-listener', reverseScored: false, colorCluster: 'jade' },
];
