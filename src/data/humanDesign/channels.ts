import type { CenterId } from '../../types/humanDesign';
import { getCenterForGate } from './centers';

export interface ChannelInfo {
  gates: [number, number];
  naam: string;
  thema: string;
}

// De 36 kanalen: vaste poortparen die, wanneer beide poorten actief zijn, een verbinding vormen.
export const channels: ChannelInfo[] = [
  { gates: [1, 8], naam: 'Kanaal van Inspiratie', thema: 'Jezelf op een unieke manier uiten en anderen daarmee raken.' },
  { gates: [2, 14], naam: 'Kanaal van de Bedreven Sleutelhouder', thema: 'Richting geven aan bekwaamheid en middelen.' },
  { gates: [3, 60], naam: 'Kanaal van Mutatie', thema: 'Vernieuwing binnen grenzen; orde die ruimte maakt voor verandering.' },
  { gates: [4, 63], naam: 'Kanaal van Logica', thema: 'Twijfel die aanzet tot het toetsen van patronen.' },
  { gates: [5, 15], naam: 'Kanaal van Ritme', thema: 'Universeel gevoel voor tijd en de stroom van het leven.' },
  { gates: [6, 59], naam: 'Kanaal van Intimiteit', thema: 'Voortplanting en het doorbreken van barrières tussen mensen.' },
  { gates: [7, 31], naam: 'Kanaal van Leiderschap', thema: 'Richting geven aan een groep, op basis van democratisch gezag.' },
  { gates: [9, 52], naam: 'Kanaal van Concentratie', thema: 'Focus en vasthoudendheid bij detailwerk.' },
  { gates: [10, 20], naam: 'Kanaal van Bewustwording', thema: 'Aanwezig zijn en handelen vanuit zelfliefde.' },
  { gates: [10, 34], naam: 'Kanaal van Exploratie', thema: 'Integriteit die zich uit in krachtig, zelfstandig handelen.' },
  { gates: [10, 57], naam: 'Kanaal van Perfecte Vorm', thema: 'Overleven door in te stemmen met wat intuïtief klopt.' },
  { gates: [11, 56], naam: 'Kanaal van Verkenning', thema: 'Ideeën en verhalen die zoeken naar betekenis.' },
  { gates: [12, 22], naam: 'Kanaal van Openheid', thema: 'Sociale gratie; op het juiste moment de juiste woorden.' },
  { gates: [13, 33], naam: 'Kanaal van de Verhaler', thema: 'Herinnering en het delen van ervaring als getuige.' },
  { gates: [16, 48], naam: 'Kanaal van de Wijze', thema: 'Talent dat rijpt tot diepgaande vaardigheid.' },
  { gates: [17, 62], naam: 'Kanaal van Aanvaarding', thema: 'Georganiseerd denken dat leidt tot heldere uitspraken.' },
  { gates: [18, 58], naam: 'Kanaal van Verbetering', thema: 'Kritische blik gericht op groei en herstel.' },
  { gates: [19, 49], naam: 'Kanaal van Synthese', thema: 'Gevoeligheid voor wat een groep nodig heeft om samen te horen.' },
  { gates: [20, 34], naam: 'Kanaal van Charisma', thema: 'Directe, krachtige actie in het hier en nu.' },
  { gates: [20, 57], naam: 'Kanaal van de Hersenspoeling', thema: 'Intuïtief bewustzijn dat zich meteen uit in het moment.' },
  { gates: [21, 45], naam: 'Kanaal van Materialisme', thema: 'Zeggenschap over middelen en het beheren van een domein.' },
  { gates: [23, 43], naam: 'Kanaal van Structurering', thema: 'Persoonlijk inzicht dat wacht op het juiste moment om gedeeld te worden.' },
  { gates: [24, 61], naam: 'Kanaal van Bewustzijn', thema: 'Innerlijke bezinning die op zoek is naar begrip.' },
  { gates: [25, 51], naam: 'Kanaal van Initiatie', thema: 'Onbevreesd voorop gaan, gedreven door een hoger doel.' },
  { gates: [26, 44], naam: 'Kanaal van Overdracht', thema: 'Overtuigingskracht gebaseerd op herkenning uit het verleden.' },
  { gates: [27, 50], naam: 'Kanaal van Zorgzaamheid', thema: 'Verantwoordelijkheid nemen voor voeding en welzijn van anderen.' },
  { gates: [28, 38], naam: 'Kanaal van Vasthoudendheid', thema: 'Strijdlust die zin geeft aan het leven.' },
  { gates: [29, 46], naam: 'Kanaal van Toewijding', thema: 'Volledige inzet en het ervaren van het leven door het lichaam.' },
  { gates: [30, 41], naam: 'Kanaal van Verlangen', thema: 'Fantasie en gevoel die nieuwe ervaringen in gang zetten.' },
  { gates: [32, 54], naam: 'Kanaal van Transformatie', thema: 'Ambitie die streeft naar erkenning en groei.' },
  { gates: [34, 57], naam: 'Kanaal van Kracht', thema: 'Instinctieve, krachtige energie die direct kan reageren.' },
  { gates: [35, 36], naam: 'Kanaal van Wisselvalligheid', thema: 'Ervaring opdoen door verandering en nieuwe situaties.' },
  { gates: [37, 40], naam: 'Kanaal van Gemeenschap', thema: 'Wederkerigheid; zorgen voor elkaar binnen een gemeenschap.' },
  { gates: [39, 55], naam: 'Kanaal van Emotionaliteit', thema: 'Stemmingswisselingen die diepgang en gevoel bloot leggen.' },
  { gates: [42, 53], naam: 'Kanaal van Verwerking', thema: 'Iets afmaken en cycli natuurlijk laten voltooien.' },
  { gates: [47, 64], naam: 'Kanaal van Abstractie', thema: 'Verwarring die vraagt om verwerkt te worden tot inzicht.' },
];

export function findActiveChannels(activeGates: Set<number>): { gates: [number, number]; centers: [CenterId, CenterId] }[] {
  const result: { gates: [number, number]; centers: [CenterId, CenterId] }[] = [];
  for (const channel of channels) {
    const [g1, g2] = channel.gates;
    if (activeGates.has(g1) && activeGates.has(g2)) {
      result.push({
        gates: channel.gates,
        centers: [getCenterForGate(g1), getCenterForGate(g2)],
      });
    }
  }
  return result;
}
