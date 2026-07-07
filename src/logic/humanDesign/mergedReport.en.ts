import type { ReportSection, ScoreResult } from '../../types';
import type { BirthData, CenterId, HDAuthority, HDDefinition, HDType, HumanDesignResult } from '../../types/humanDesign';
import { archetypesEn, ARCHETYPE_NAMES, CLUSTER_EN } from '../report.en';

// Zelfstandige Engelse merged reading (Arcana + Human Design) in warme coach-toon.

const TYPE_EN: Record<HDType, { name: string; strategy: string; theme: string; strength: string; caution: string }> = {
  generator: {
    name: 'Generator',
    strategy: 'waiting to respond',
    theme: 'You are built to bring sustainable, life-giving energy to whatever genuinely lights you up — by responding to what life presents, rather than forcing beginnings.',
    strength: 'When you are engaged with work your body says "yes" to, your energy renews itself almost endlessly.',
    caution: 'Initiating from the head, without that inner yes, tends to end in frustration. Responding is not passivity — it is your way of landing your energy where it belongs.',
  },
  'manifesting-generator': {
    name: 'Manifesting Generator',
    strategy: 'responding first, then informing',
    theme: 'You carry the sustainable fire of a Generator combined with the speed and initiative of a Manifestor — a rare, restless, multi-passionate blend.',
    strength: 'You can explore several paths at once and move fast the moment something feels right.',
    caution: 'Your tendency to skip steps sometimes catches up with you. Informing the people around you before you leap saves friction later.',
  },
  manifestor: {
    name: 'Manifestor',
    strategy: 'informing before you act',
    theme: 'You are built to initiate — to set things in motion without waiting for permission or confirmation from outside.',
    strength: 'You start things. Where others wait, you move — and your moving gives others permission to move too.',
    caution: 'Your impact on others is larger than you sometimes realise. A brief word before you act clears the road ahead of you.',
  },
  projector: {
    name: 'Projector',
    strategy: 'waiting for the invitation',
    theme: 'You are built to see — into systems, into people, into how energy flows — and to guide, rather than to be the engine yourself.',
    strength: 'You see with unusual clarity what works and what does not, and where the greatest ease is hiding.',
    caution: 'Working hard without recognition or invitation exhausts you. Waiting can feel passive; for you it is how the right doors find you.',
  },
  reflector: {
    name: 'Reflector',
    strategy: 'taking a full lunar cycle for big decisions',
    theme: 'You mirror your environment and the people in it with rare sensitivity — a living barometer of the health of any community you are part of.',
    strength: 'You sense, unerringly, what is really going on in a group or a place.',
    caution: 'Big decisions deserve time with you — a lunar cycle of roughly 28 days lets clarity ripen instead of being forced.',
  },
};

const AUTHORITY_EN: Record<HDAuthority, { name: string; theme: string; advice: string }> = {
  emotional: {
    name: 'Emotional authority',
    theme: 'Your knowing arrives in waves. No single moment holds your truth — clarity gathers over time, like sediment settling in water.',
    advice: 'Give yourself real time on decisions that matter. Sleep on it — sometimes twice — before your answer becomes final.',
  },
  sacral: {
    name: 'Sacral authority',
    theme: 'Your body answers before your mind does — an immediate "uh-huh" or "uh-uh" that often arrives as a sound or a physical pull.',
    advice: 'Trust that first, spontaneous bodily response. Overthinking tends to blur what your body already knew.',
  },
  splenic: {
    name: 'Splenic authority',
    theme: 'Your intuition speaks softly, precisely once, in the moment itself — and it does not repeat.',
    advice: 'Learn to catch that first quiet knowing before your mind talks over it.',
  },
  ego: {
    name: 'Ego authority',
    theme: 'Your compass is willpower: what your heart genuinely wants to commit to — not what you think you should want.',
    advice: 'Ask yourself: do I truly want this, with my whole will? If not, it is probably not yours to do.',
  },
  'self-projected': {
    name: 'Self-projected authority',
    theme: 'Your clarity arrives through speaking — you hear your own truth as it leaves your mouth, not while thinking in silence.',
    advice: 'Find a trusted sounding board. Talk your choice through out loud and listen to what comes out of you unprompted.',
  },
  mental: {
    name: 'Mental authority',
    theme: 'You have no fixed inner body-compass steering you automatically. Environment and conversation are your mirrors.',
    advice: 'Do not decide alone or purely in your head. Talk important choices through, out loud, with people you trust, in surroundings that feel right.',
  },
  lunar: {
    name: 'Lunar authority',
    theme: 'As a Reflector your process is unique: you mirror your surroundings and need the moon\'s full cycle to come to clarity.',
    advice: 'For big decisions: give it a full lunar cycle (about 28 days) and talk it through with people you trust along the way.',
  },
};

const DEFINITION_EN: Record<HDDefinition, { name: string; theme: string }> = {
  geen: { name: 'No definition', theme: 'None of your centres is fixed — an openness that makes you deeply receptive to your surroundings, mirroring what is around you.' },
  enkelvoudig: { name: 'Single definition', theme: 'Your energy forms one connected whole. You tend to feel self-contained and consistent in who you are.' },
  gesplitst: { name: 'Split definition', theme: 'Your energy lives in two parts that are not directly wired together. Often without realising it, you seek people and experiences that bridge them — and feel wonderfully whole in the right company.' },
  'drievoudig-gesplitst': { name: 'Triple-split definition', theme: 'Your energy lives in three separate parts. Connection with a variety of people plays a real role in feeling fully yourself.' },
  'viervoudig-gesplitst': { name: 'Quadruple-split definition', theme: 'Your energy lives in four separate parts — a rare configuration. You may need several people or contexts to feel completely connected, and that is by design.' },
};

const LINE_EN: Record<number, { name: string; theme: string }> = {
  1: { name: 'Investigator', theme: 'builds trust through knowledge, depth and a solid foundation' },
  2: { name: 'Hermit', theme: 'carries natural talent and works best in their own rhythm, until others call it out' },
  3: { name: 'Explorer', theme: 'learns by trying, adjusting, and discovering what works and what does not' },
  4: { name: 'Networker', theme: 'finds their way through a close circle and meaningful relationships' },
  5: { name: 'Practical problem-solver', theme: 'is seen by others as someone with answers, with reach beyond their own circle' },
  6: { name: 'Role model', theme: 'moves through distinct life phases, growing toward overview and example' },
};

const CENTER_EN: Record<CenterId, { name: string; theme: string }> = {
  head: { name: 'Head centre', theme: 'inspiration, questions and the mental pressure to understand' },
  ajna: { name: 'Ajna centre', theme: 'thinking, forming concepts and making meaning' },
  throat: { name: 'Throat centre', theme: 'expression, communication and turning energy into word or deed' },
  'g-center': { name: 'G centre', theme: 'identity, direction and love for who you are' },
  heart: { name: 'Heart centre', theme: 'willpower, self-worth and keeping your word' },
  spleen: { name: 'Spleen centre', theme: 'intuition, wellbeing and the instinct for what is good for you' },
  'solar-plexus': { name: 'Solar plexus', theme: 'emotion, feeling in waves, and the wisdom of patience' },
  sacral: { name: 'Sacral centre', theme: 'life force, work energy and the body\'s yes and no' },
  root: { name: 'Root centre', theme: 'pressure, drive and the engine behind movement' },
};

const ALL_CENTERS: CenterId[] = ['head', 'ajna', 'throat', 'g-center', 'heart', 'spleen', 'sacral', 'solar-plexus', 'root'];

function formatDateEn(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTimeEn(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export function generateMergedReportEn(
  arcana: ScoreResult,
  hd: HumanDesignResult,
  birth: BirthData
): ReportSection[] {
  const name = birth.firstName || 'you';
  const fullName = [birth.firstName, birth.lastName].filter(Boolean).join(' ');
  const pn = ARCHETYPE_NAMES[arcana.highestArchetype];
  const sn = ARCHETYPE_NAMES[arcana.secondArchetype];
  const pa = archetypesEn[arcana.highestArchetype];
  const sa = archetypesEn[arcana.secondArchetype];
  const cluster = CLUSTER_EN[arcana.highestCluster];
  const type = TYPE_EN[hd.type];
  const authority = AUTHORITY_EN[hd.authority];
  const definition = DEFINITION_EN[hd.definition];
  const birthplace = [birth.birthPlace, birth.birthCountry].filter(Boolean).join(', ');

  const sections: ReportSection[] = [];

  sections.push({
    title: `Welcome to your complete reading, ${name}`,
    content: `Dear ${name},

What you are holding is more than a test result. It is the meeting of two layers of you: your answers to the Arcana questionnaire — how you think, feel and act in daily life — and an energetic layer drawn from the sky at the moment you were born${birthplace ? `, in ${birthplace}` : ''}, on ${formatDateEn(hd.birthDateUtc)} at ${formatTimeEn(hd.birthDateUtc)} (UTC).

${fullName ? `This reading was made for ${fullName}. ` : ''}Where your Arcana profile describes your conscious preferences and patterns, your energetic design looks at a quieter layer underneath: how you are naturally built to respond to life, make decisions and spend your energy.

Take your time with this. There is no right or wrong here, no better or worse — only an invitation to look at yourself with more gentleness and more curiosity than the everyday usually allows.`,
  });

  sections.push({
    title: 'Your energetic type',
    content: `${name}, your energetic type is ${type.name}.

${type.theme}

YOUR NATURAL STRATEGY: ${type.strategy}
${type.strength}

WORTH WATCHING
${type.caution}

Hold this strategy lightly — not as a rule to obey, but as an invitation to notice when life flows more easily. Usually, that is when you are living from this natural rhythm rather than pushing against it.`,
  });

  sections.push({
    title: 'Your inner authority',
    content: `Beyond your type, you carry an inner authority: the way you, ${name}, most reliably arrive at decisions that hold.

Yours is: ${authority.name}.

${authority.theme}

HOW TO WORK WITH IT
${authority.advice}

With choices large and small, it can be worth pausing to ask: am I arriving at this answer in the way that fits me — or in the way others expect?`,
  });

  sections.push({
    title: 'Your profile and definition',
    content: `PROFILE ${hd.profile[0]}/${hd.profile[1]}
Your profile combines the ${LINE_EN[hd.profile[0]].name.toLowerCase()} (${LINE_EN[hd.profile[0]].theme}) with the ${LINE_EN[hd.profile[1]].name.toLowerCase()} (${LINE_EN[hd.profile[1]].theme}).

The first line describes how you function when you are consciously present; the second is a quieter background quality — one that others often recognise in you before you do.

DEFINITION: ${definition.name}
${definition.theme}

This says something about how your energy is organised inside — whether it feels like one whole, or like parts that sometimes ask for completion from outside. Both are entirely natural; neither is more finished than the other.

A SMALL NOTE ON THE CALCULATION
For the lunar nodes we use the standard astronomical mean model. In rare cases — when a position falls right at a gate boundary — this can shift a single gate compared with an exact "true node" calculation. It touches a detail at most, never the heart of this reading.`,
  });

  sections.push({
    title: 'Your defined centres',
    content: (() => {
      const parts: string[] = [];
      parts.push(`${name}, of the nine energy centres, ${hd.definedCenters.length === 0 ? 'none are' : `${hd.definedCenters.length} are`} consistently "on" in you${hd.definedCenters.length > 0 ? `: ${hd.definedCenters.map((c) => CENTER_EN[c].name).join(', ')}` : ''}.\n`);
      if (hd.definedCenters.length > 0) {
        parts.push('DEFINED CENTRES — YOUR CONSISTENT ENERGY');
        for (const c of hd.definedCenters) {
          parts.push(`${CENTER_EN[c].name}: ${CENTER_EN[c].theme}.`);
        }
      }
      const open = ALL_CENTERS.filter((c) => !hd.definedCenters.includes(c));
      if (open.length === ALL_CENTERS.length) {
        parts.push('\nALL YOUR CENTRES ARE OPEN\nThis is not a lack — it is the essence of who you are. With every centre open, you are exceptionally sensitive to the energy around you, absorbing what moves through a room as if it were your own. That is precisely how you build your rare, wide wisdom about people. The practice is telling apart what is truly yours from what you picked up along the way — regular time alone, away from everyone, shows you what remains when the borrowed feelings fall away.');
      } else if (open.length > 0) {
        parts.push('\nOPEN CENTRES — YOUR SENSITIVITY, AND YOUR WISDOM ABOUT OTHERS\nOpen centres are not shortcomings. They are the places where you feel the people around you — and where, precisely through that sensitivity, you grow wise about them. Concretely:');
        for (const c of open) {
          parts.push(`${CENTER_EN[c].name}: naturally open — here you take in ${CENTER_EN[c].theme} from your surroundings.`);
        }
      }
      return parts.join('\n');
    })(),
  });

  sections.push({
    title: 'Where your two profiles meet',
    content: `${name}, your two profiles light up different layers of the same person — and that is exactly their value.

Your Arcana profile shows that ${pn} colours your conscious thinking and acting: ${pa.strength.toLowerCase()} Your energetic design shows that as a ${type.name}, your natural base rhythm is ${type.strategy}.

These two layers do not need to match to belong together. One describes how you think and choose; the other, how your energy moves and how decisions ripen in you. Read side by side, they give a fuller picture than either could alone.

Notice where they confirm each other — and where one offers a way through when the other has you stuck. When ${pn} in you wants to push, your design may whisper: ${type.strategy}. Both voices are yours. Wisdom is knowing which one the moment needs.

And underneath both runs the same thread: ${sn} adds ${sa.strength.toLowerCase()} — while your leading colour, ${cluster.name}, keeps returning as the undertone: ${cluster.meaning}.`,
  });

  sections.push({
    title: 'A practical guide for daily life',
    content: `THIS WEEK: ONE SMALL PRACTICE
Notice the moment just before you make a decision — any decision. Ask: am I responding from ${authority.name.toLowerCase()} (${authority.advice.toLowerCase().replace(/\.$/, '')}), or from what I think is expected of me?

IN YOUR WORK
Your Arcana profile points to strength here: ${pa.strength.toLowerCase()} Your energetic design adds that this flows best through ${type.strategy}. Every so often, ask yourself: am I doing this work because it fits me — or because it was put in front of me?

IN YOUR RELATIONSHIPS
Feel free to share this reading with people you trust. It can open a lovely conversation about how you complement each other — where your open centres are steadied by someone else's defined ones, and the other way around.

A QUESTION TO CARRY
${name}, which choice in your life is waiting for you to make it from ${authority.name.toLowerCase()} — rather than from the head alone?`,
  });

  sections.push({
    title: 'A closing word',
    content: `${name}, this reading brings two languages together to say one thing: you are not who you are by accident.

Your Arcana profile shows ${pn} and ${sn} colouring your days, with ${cluster.name} as the recurring undertone. Your energetic design shows that as a ${type.name} you come most alive through ${type.strategy}, with ${authority.name.toLowerCase()} as the compass for your decisions.

Neither layer is a verdict. Both are invitations: to know yourself more kindly, and without hurry. Take with you what resonates. Leave, without guilt, what does not.

With warmth,
The Arcana Profile team`,
  });

  return sections;
}

export { TYPE_EN, AUTHORITY_EN };
