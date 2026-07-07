import type { ArchetypeId, ArchetypeScore, ReportSection, ScoreResult } from '../types';

// Zelfstandige Engelse rapportgenerator in warme coach/therapeut-toon.
// Alle Engelse inhoud staat bewust in dit bestand, gescheiden van de Nederlandse teksten.

interface EnArchetype {
  meaning: string;
  strength: string;
  risk: string;
  growth: string;
  reflection: string;
  workStyle: string;
  communication: string;
  learning: string;
  environment: string;
  relationships: string;
  teamRole: string;
  motivation: string;
  stressSignals: string;
  recovery: string;
  coachingTip: string;
  pitfallDetail: string;
  recognitionSignals: string;
  monthlyRhythm: string;
  exerciseForLowest: string;
  energyDrains: string;
  commTips: string;
  commShort: string;
  teamNeed: string;
}

const A: Record<ArchetypeId, EnArchetype> = {
  'idea-finder': {
    meaning: 'sees new ideas, options and possible routes.',
    strength: 'You see ideas, options and possibilities where others see a single road.',
    risk: 'too many ideas, too little completion.',
    growth: 'choose one route and finish it.',
    reflection: 'Which possibility truly deserves my attention right now?',
    workStyle: 'You come alive in environments with room for experiment and variation. Fixed procedures and repetitive tasks quietly drain you, while switching between projects and exploring fresh angles fills you up. You tend to start several things at once — which is wonderful for momentum, and sometimes hard on completion.',
    communication: 'You speak in a lively, associative way, leaping from one idea to the next and making connections that surprise people. In meetings you are often the one who opens a door nobody had noticed. It helps to pause now and then and summarise, so others can follow the beautiful trail you are on.',
    learning: 'You learn through exploration and experiment. A fixed learning path feels restrictive; you would rather find your own way. You pick up new concepts quickly — deepening and retaining them asks for a little deliberate attention.',
    environment: 'You thrive where there is variation, short cycles and room to try things out. Rigid hierarchies and long approval chains slowly wear you down.',
    relationships: 'In relationships you are enthusiastic and inspiring, sharing discoveries and loving conversations that wander. The people close to you sometimes need a moment to keep up — consciously making space to listen deepens the connection.',
    teamRole: 'In a team you are the idea generator: you bring energy, possibilities and creative proposals, helping the group look past the obvious. You benefit from teammates who help you concretise and prioritise.',
    motivation: 'You are moved by novelty, possibility and the freedom to explore. Routine, tight frames and predictability quietly undermine your motivation.',
    stressSignals: 'Under pressure you may produce even more ideas without finishing anything, feel restless without knowing why, or jump from one thing to the next unable to settle.',
    recovery: 'Give yourself quiet moments without input. Choose one project to finish and consciously park the rest — write the other ideas down so they are safe, without demanding your attention now.',
    coachingTip: 'Ask yourself regularly: "What matters most to finish right now?" Learn to tell apart the ideas that give you energy from the ideas that pull you away from what counts.',
    pitfallDetail: 'In practice this can mean projects stay unfinished, people feel overwhelmed by your stream of options, or setbacks tempt you to invent a whole new plan instead of adjusting the current one.',
    recognitionSignals: '• You keep starting new things without finishing anything.\n• You feel restless but cannot name why.\n• People tell you they can no longer follow you.',
    monthlyRhythm: 'Week 1: pick one running project and finish it before starting anything new.\nWeek 2: ask someone to help you rank your three best ideas.\nWeek 3: experiment with a fixed morning routine.\nWeek 4: reflect — which idea made the most difference this month?',
    exerciseForLowest: 'EXERCISE: WAKING UP CREATIVITY\nWhen you face a problem this week, challenge yourself to imagine at least three alternative solutions before choosing. Start small: what could you do differently on your daily route?',
    energyDrains: '• Long stretches of routine work without variation\n• Tight frames that leave no room to improvise\n• Situations where your ideas have nowhere to go\n• Environments that dismiss anything new',
    commTips: '• Summarise your ideas before sharing them — not everyone can follow associative thinking.\n• Number your proposals (option 1, 2, 3) so others can respond more easily.\n• End with: "Which idea speaks to you most?"',
    commShort: 'associative and energetic',
    teamNeed: 'You benefit from teammates who bring fresh ideas and unexpected angles — people who invite you out of your familiar frames.',
  },
  'pattern-seer': {
    meaning: 'sees patterns, deeper meaning and future direction.',
    strength: 'You see meaning, direction and hidden patterns before others do.',
    risk: 'staying too long in reflection.',
    growth: 'test your insights in the real world.',
    reflection: 'What is the first concrete step that fits my insight?',
    workStyle: 'You do your best work with enough time for reflection and depth. You need space to think before you act, and shallow work frustrates you — you want the core of a question. You are at your best when you can think strategically and help shape the longer arc.',
    communication: 'You speak thoughtfully and with depth, often after a long inner process — which can look like reserve from the outside. When you do speak, it lands. Sharing your thinking out loud more often helps people experience you as open rather than distant.',
    learning: 'You learn through depth and synthesis, always looking for the thread that ties things together. Surface-level information slides off you; you want to understand how things connect. Time to reflect, and linking theory to lived experience, serve you well.',
    environment: 'You thrive where deep work is possible: quiet spaces, genuine autonomy, a culture that values thinking. A calendar full of short meetings drains you.',
    relationships: 'In relationships you are deep and loyal, with little appetite for surface contact. Your inner world is rich but not always visible — putting words to it, even imperfect ones, is a gift to the people who love you.',
    teamRole: 'In a team you are the strategist and quiet visionary: you help the group look ahead, spotting risks and openings early. You benefit from teammates who translate your vision into concrete steps.',
    motivation: 'You are moved by meaning, direction and the sense of contributing to something larger. Operational noise and surface tasks erode your motivation.',
    stressSignals: 'Under pressure you may withdraw into your thoughts and become hard to reach, dig ever deeper without arriving at action, or feel quietly frustrated that others do not seem to see what you see.',
    recovery: 'Make your insights small and concrete. Share half-formed thoughts with someone you trust. Remind yourself that a first step teaches more than a perfect plan.',
    coachingTip: 'Practise translating your vision into one concrete action per day. Ask for feedback on ideas before they are fully polished — it speeds up your learning and softens your perfectionism.',
    pitfallDetail: 'In practice this can mean thinking too long before acting, feeling misunderstood when others miss your vision, or reading layers of meaning into situations that are simpler than they appear.',
    recognitionSignals: '• You dig deeper and deeper without reaching conclusions.\n• You feel frustrated that others "don\'t get it".\n• You retreat further into your own thoughts.',
    monthlyRhythm: 'Week 1: share one insight with a colleague and ask for a concrete first step.\nWeek 2: set a time limit on thinking — two hours, then act.\nWeek 3: try something you are not 100% sure about.\nWeek 4: reflect — which insight did I actually test in the real world?',
    exerciseForLowest: 'EXERCISE: LOOKING AHEAD\nTake ten minutes each week to wonder: where do I want to be in six months? Which currents can I already sense? Write freely, without judging what comes.',
    energyDrains: '• Shallow work without depth\n• Constant interruptions that break your thinking\n• Cultures where speed beats quality\n• Situations where your insights are ignored',
    commTips: '• Share your thinking process out loud more often — people see your conclusion but not the road.\n• Lead with your conclusion, then unfold the reasoning.\n• Use concrete examples to make abstract insight tangible.',
    commShort: 'thoughtful and deep',
    teamNeed: 'You benefit from teammates who guard the bigger picture and think ahead with you — people who help you look further down the road.',
  },
  'action-maker': {
    meaning: 'acts quickly, notices the present moment and responds to real situations.',
    strength: 'You act fast and read the present moment with precision.',
    risk: 'acting before thinking things through.',
    growth: 'pause before you respond.',
    reflection: 'What does this situation truly ask of me right now?',
    workStyle: 'You come alive in dynamic settings where you can act directly. Long meetings and extended planning phases test your patience; you trust your perception and want to move. Visible progress and tangible results are what feed you.',
    communication: 'You speak directly and to the point, with expressive body language — people rarely have to guess where you stand. Slowing down occasionally to check whether your message landed makes your natural clarity even more effective.',
    learning: 'You learn by doing. Theory without practice loses you quickly; you want your hands on the thing itself. Hands-on training and direct feedback are your natural teachers.',
    environment: 'You thrive with short cycles, direct feedback and visible results — practical work, field work, real deadlines. Bureaucracy and long approval processes frustrate you.',
    relationships: 'In relationships you are energetic and adventurous — you bond through doing things together and new experiences. Emotional nuance sometimes moves slower than you do; unhurried conversations without an agenda deepen your closest ties.',
    teamRole: 'In a team you are the doer and pace-setter: you bring tempo, energy and a focus on results, moving the group from talking to doing. You benefit from teammates who protect reflection and strategy.',
    motivation: 'You are moved by action, results and the aliveness of the moment. Waiting, bureaucracy and endless deliberation drain you.',
    stressSignals: 'Under pressure you may act impulsively without weighing consequences, grow impatient with slower colleagues, or feel physically restless and unable to sit still.',
    recovery: 'Build in deliberate pauses before responding. Count to ten before big decisions. Physical movement discharges tension without turning it into impulsive action.',
    coachingTip: 'Practise the question: "What do I want to achieve — and is this the best way?" For important decisions, give yourself an hour of deliberate delay before acting.',
    pitfallDetail: 'In practice this can mean reacting too fast, deciding without bringing others along, growing impatient with planning and reflection, or underestimating risk.',
    recognitionSignals: '• You respond before you have thought.\n• You feel physically restless and struggle to sit still.\n• People tell you that you move too fast or consult too little.',
    monthlyRhythm: 'Week 1: count to ten before every significant decision.\nWeek 2: ask a colleague to think along before you execute a plan.\nWeek 3: schedule half an hour of reflection in your calendar.\nWeek 4: reflect — where would a little more patience have served me?',
    exerciseForLowest: 'EXERCISE: STEPPING INTO ACTION\nPick one thing you have been postponing and do it today. Keep it small — the point is not the result but the felt experience of acting directly.',
    energyDrains: '• Long meetings without concrete outcomes\n• Bureaucracy and waiting\n• Situations where you cannot act\n• Environments with many rules and little freedom',
    commTips: '• Count to three before responding — give the other person space to finish.\n• Ask "what exactly do you mean?" before jumping into solution mode.\n• Use fewer words with more weight.',
    commShort: 'direct and to the point',
    teamNeed: 'You benefit from teammates who help turn thinking into doing — people who set you in motion when reflection lasts too long.',
  },
  'calm-keeper': {
    meaning: 'values calm, memory, routine, experience and stability.',
    strength: 'You bring calm, memory, stability and care.',
    risk: 'holding on too long to what is familiar.',
    growth: 'allow small, safe changes.',
    reflection: 'Which change can I welcome without losing my calm?',
    workStyle: 'You do your best work in a predictable, well-ordered environment. Fixed patterns and proven methods give you a quiet strength that others lean on. You are reliable and consistent — and you flourish when priorities are not constantly shuffled underneath you.',
    communication: 'You speak calmly and with consideration, taking time before you respond and avoiding unnecessary confrontation. You are a fine listener who remembers details others forget. Voicing your own view a little earlier gives the group access to your quiet wisdom.',
    learning: 'You learn best in a structured setting with clear steps, repetition and practice. Examples, guides and proven methods work for you; sudden shifts in approach are unsettling — and that is okay.',
    environment: 'You thrive with clear expectations, steady procedures and a predictable rhythm. Stable organisations with a long-term view suit you; perpetual reorganisation costs you dearly.',
    relationships: 'In relationships you are loyal, caring and dependable, investing in bonds that last. Change within relationships can feel threatening at first — trusting that growth deepens rather than dissolves connection is part of your path.',
    teamRole: 'In a team you are the steady anchor and the living memory: you bring continuity, care and dependability, keeping the group from lurching off course. You benefit from teammates who bring renewal and fresh energy.',
    motivation: 'You are moved by stability, recognition of your reliability and contributing to something that endures. Constant change and uncertainty erode your motivation.',
    stressSignals: 'Under pressure you may become rigid, clinging to the familiar, resisting every change — even necessary ones — or withdrawing and communicating less.',
    recovery: 'Look for small, safe experiments in flexibility — changes you choose and control yourself. Speak your worries to someone you trust instead of carrying them alone.',
    coachingTip: 'Ask yourself: "What is the worst that could happen if I tried this?" The threshold is usually lower than it feels. Choose one small change per week to practise with.',
    pitfallDetail: 'In practice this can mean resisting change, dismissing new ideas too quickly, feeling deeply uncomfortable with uncertainty, or quietly hoping problems will resolve themselves.',
    recognitionSignals: '• You feel growing resistance to every change.\n• Uncertainty makes you anxious, even in small things.\n• You avoid conversations about new directions.',
    monthlyRhythm: 'Week 1: try one small change in your daily routine.\nWeek 2: respond to a new proposal with "tell me more" instead of "no".\nWeek 3: do something outside your pattern — a different restaurant, a different route.\nWeek 4: reflect — which change turned out gentler than expected, and what did it teach me?',
    exerciseForLowest: 'EXERCISE: FINDING STILLNESS\nCreate one fixed daily ritual that calms you: a cup of tea, a walk, ten minutes of quiet. Let it grow into an anchor in your day.',
    energyDrains: '• Constantly shifting priorities\n• Unpredictable situations and chaos\n• Pressure to change quickly\n• Environments without clear expectations',
    commTips: '• Share your view earlier in the conversation — do not wait until everyone has spoken.\n• Practise the sentence: "I see it differently, namely…"\n• Show you have listened by summarising what the other person said.',
    commShort: 'calm and considered',
    teamNeed: 'You benefit from teammates who bring calm, continuity and a safe base — people who help you slow down when it matters.',
  },
  'plan-builder': {
    meaning: 'creates structure, steps, priorities and results.',
    strength: 'You create structure, priorities and results.',
    risk: 'becoming too controlling or too focused on output.',
    growth: 'include people and values in the plan.',
    reflection: 'Who or what should I bring along before I push through?',
    workStyle: 'You do your best work with clear goals, deadlines and measurable results. You are organised and efficient, at your best inside a clear frame you can optimise. You take responsibility naturally — sometimes before anyone asks.',
    communication: 'You speak clearly and with direction: summarising complexity, naming action points, steering toward decisions. Making a little extra room for others\' input before concluding turns your clarity into shared ownership.',
    learning: 'You learn when there is a clear goal and measurable progress. Structure in the process suits you, and applying knowledge immediately makes it stick. Courses with concrete assignments and feedback serve you best.',
    environment: 'You thrive with clear objectives, clean responsibilities and room to organise — project-based work, leadership roles, results-driven cultures. Environments without direction frustrate you.',
    relationships: 'In relationships you are dependable and purposeful, gladly taking the lead and making sure things are arranged. Some moments ask for equality rather than direction — consciously making space for the other person\'s pace deepens the bond.',
    teamRole: 'In a team you are the organiser and project leader: structure, planning and a steady focus on outcomes. You benefit from teammates who guard creativity and the human side.',
    motivation: 'You are moved by results, progress and visible impact. Vagueness, missing direction and inefficiency erode your motivation.',
    stressSignals: 'Under pressure you may tighten your grip and struggle to delegate, work past your own limits, or grow frustrated when others fall short of your standards.',
    recovery: 'Practise telling urgent apart from important. Allow yourself moments of rest without productivity. Ask whether the result could be good even without your direct control.',
    coachingTip: 'Practise the question: "What is good enough here?" Not everything needs to be perfect. Regularly ask your teammates how they are doing — apart from the project.',
    pitfallDetail: 'In practice this can mean over-controlling, difficulty delegating, losing sight of the human side of a project, or working on at the cost of your own wellbeing.',
    recognitionSignals: '• You try to keep hold of everything.\n• You feel responsible for things beyond your influence.\n• You grow impatient with people who work differently.',
    monthlyRhythm: 'Week 1: delegate one task you would normally do yourself.\nWeek 2: ask a colleague "how are you?" without talking about work.\nWeek 3: schedule an afternoon without an agenda.\nWeek 4: reflect — where did I let go of control, and how did that feel?',
    exerciseForLowest: 'EXERCISE: BUILDING STRUCTURE\nAt the start of each week, write down three priorities. No more than three. At the end of the week, look back: what got finished?',
    energyDrains: '• Vagueness about goals and expectations\n• Inefficiency and wasted time\n• Situations where nobody takes responsibility\n• Environments without clear structure',
    commTips: '• Start with context before moving to action points — not everyone thinks in steps.\n• Ask "how does this feel for you?" alongside "what do we do next?"\n• Leave room for open discussion before steering to decisions.',
    commShort: 'clear and result-oriented',
    teamNeed: 'You benefit from teammates who bring structure and make sure plans get executed — people who help you make goals concrete.',
  },
  'clear-thinker': {
    meaning: 'analyses, defines, checks logic and seeks clarity.',
    strength: 'You analyse, define and find logical clarity.',
    risk: 'becoming too distant or too critical.',
    growth: 'communicate clarity with warmth.',
    reflection: 'How can I be clear without coming across as harsh?',
    workStyle: 'You do your best work on complex questions that reward analysis and precision. You are thorough and exact, at your best when you can examine a problem from every side before concluding. You hold your own thinking to a high standard.',
    communication: 'You speak precisely, choosing words with care and avoiding vagueness. You are skilled at unpacking arguments and exposing assumptions. Translating your analysis into everyday language — and pairing it with warmth — lets your clarity actually land.',
    learning: 'You learn through analysis and understanding: not just what something is, but why it works. Depth, logical structure and room to investigate suit you; shallow training without foundations frustrates you.',
    environment: 'You thrive where intellectual depth is valued, research is welcome and standards are high — technical, advisory and analytical roles. Cultures where speed always beats quality wear on you.',
    relationships: 'In relationships you are honest and deep, valuing real conversation and authenticity. Feelings sometimes reach you through thought first — practising naming emotions, even clumsily, opens doors that analysis cannot.',
    teamRole: 'In a team you are the analyst and quality guardian: you keep the thinking sharp and prevent unconsidered decisions, asking the questions others avoid. You benefit from teammates who bring warmth and connection.',
    motivation: 'You are moved by intellectual challenge, understanding and elegant solutions. Sloppiness, shallow work and illogical decisions erode your motivation.',
    stressSignals: 'Under pressure you may become sharply critical — of yourself and others — retreat into analysis and lose sight of the human side, or get stuck in detail and lose the whole.',
    recovery: 'Deliberately seek out people and activities that lift you out of your head: movement, something creative, a light conversation. Accept that not everything yields to logic, and that "good enough" is sometimes the wisest answer.',
    coachingTip: 'Practise sharing your insights in a way that invites rather than deters. "I notice that…" opens a door where "that is incorrect" closes one.',
    pitfallDetail: 'In practice this can mean becoming too critical of yourself and others, undervaluing emotions, over-investing in analysis, or needing to be right at the expense of the relationship.',
    recognitionSignals: '• You grow more critical, even about small details.\n• Illogical behaviour in others irritates you.\n• You find it hard to release your analysis and trust feeling.',
    monthlyRhythm: 'Week 1: compliment someone on something imperfect.\nWeek 2: listen through one whole conversation without analysing or correcting.\nWeek 3: make one decision from feeling rather than thought.\nWeek 4: reflect — when was I warmest toward another person this month?',
    exerciseForLowest: 'EXERCISE: SHARPENING THOUGHT\nRead an article and summarise its three key arguments in your own words. What is the core? What does not hold?',
    energyDrains: '• Shallow conversations and sloppy thinking\n• Decisions made on feeling without grounding\n• Cultures that place emotion above logic\n• Situations that give you no time to think',
    commTips: '• Translate analysis into plain language — skip the jargon.\n• Use "I notice that…" instead of "that is wrong" to soften feedback.\n• Alternate analysis with appreciation — name what does work.',
    commShort: 'precise and analytical',
    teamNeed: 'You benefit from teammates who offer sharp analysis and expose logical gaps — people who sharpen your thinking.',
  },
  'people-helper': {
    meaning: 'reads people, creates harmony and supports social connection.',
    strength: 'You understand people and create connection.',
    risk: 'adapting too much to others.',
    growth: 'keep your own needs visible.',
    reflection: 'What do I myself need in this situation?',
    workStyle: 'You do your best work where collaboration and human contact are central. You sense the atmosphere of a team and adjust naturally to what the group needs. Your gift is harmony and connection — your task is not to disappear inside it.',
    communication: 'You speak warmly and inclusively, reading non-verbal signals and tuning your tone to whoever is in front of you. You are a natural mediator. Being a little more direct about your own position is not a betrayal of harmony — it feeds it.',
    learning: 'You learn best with and through others: group discussion, role play, personal feedback. Studying alone, without human contact, motivates you far less — build connection into how you learn.',
    environment: 'You thrive amid warm collegial bonds, teamwork and personal contact — coaching, teaching, care, HR. Coldly competitive or isolating cultures drain you.',
    relationships: 'In relationships you are warm, attentive and giving, sensing what the other person needs before they say it. Receiving is harder for you than giving — letting someone care for you is its own practice.',
    teamRole: 'In a team you are the connector and atmosphere-keeper: everyone feels heard around you and conflicts rarely escalate. You benefit from teammates who help you guard your own boundaries.',
    motivation: 'You are moved by human contact, appreciation and contributing to others\' wellbeing. Isolation, cold cultures and unresolved conflict erode your motivation.',
    stressSignals: 'Under pressure you may over-adapt to what others want, feel used up without anyone noticing, or find yourself unable to say "no" even at your limit.',
    recovery: 'Take time for yourself without guilt. Ask what you need, apart from what others expect. Practise setting boundaries in small, safe situations first.',
    coachingTip: 'Each week, write down three things you want — not what others ask of you. Practise the sentence: "This matters to me." You do not always have to hold the harmony.',
    pitfallDetail: 'In practice this can mean neglecting your own needs, saying yes too often, avoiding conflicts that genuinely need addressing, or letting your mood depend on how others are doing.',
    recognitionSignals: '• You are tired without a clear reason.\n• You feel guilty when you say no.\n• Your own needs have gone vague — you no longer know what you want.',
    monthlyRhythm: 'Week 1: say "no" once without explanation or apology.\nWeek 2: write down what you want, apart from others\' expectations.\nWeek 3: ask for help instead of offering it.\nWeek 4: reflect — how did it feel to put my own needs first?',
    exerciseForLowest: 'EXERCISE: MAKING CONTACT\nThis week, ask three people how they are really doing. Listen without advising. Notice what it is like simply to be present.',
    energyDrains: '• Conflicts left unspoken\n• Cold, impersonal work cultures\n• Isolation and lack of human contact\n• Situations where you feel unappreciated',
    commTips: '• Say what you think — not only what you sense the other wants to hear.\n• Practise: "I see it differently, namely…" without apologising.\n• Ask yourself: am I speaking for the other person right now, or for myself?',
    commShort: 'warm and attuned',
    teamNeed: 'You benefit from teammates who watch over the human side and the atmosphere — people who remind you to tend to relationships, including your own.',
  },
  'heart-listener': {
    meaning: 'follows values, authenticity, personal truth and inner feeling.',
    strength: 'You follow values, authenticity and inner truth.',
    risk: 'withdrawing or becoming inwardly fixed.',
    growth: 'translate values into clear action.',
    reflection: 'Which value do I want to make visible in my behaviour now?',
    workStyle: 'You do your best work from the inner conviction that what you do matters and aligns with your values. Work that feels meaningless or wrong wears on you deeply. You are at your best when authenticity and craft meet.',
    communication: 'You speak authentically, from the heart, without dressing things up. People who know you trust your word completely; people who do not know you yet may read your quiet as distance. Sharing your inner world a little more often builds the bridge.',
    learning: 'You learn when the subject connects to your values and genuine interest. Reflection, journalling and conversations with trusted people deepen your learning; obligatory training without personal relevance meets your resistance — understandably.',
    environment: 'You thrive where authenticity is valued, personal expression has room and ethics matter — creative roles, mission-driven organisations, small teams. Feeling like a number in a large machine drains you.',
    relationships: 'In relationships you are deep, loyal and true, connecting through shared values and honesty. Your feelings sometimes stay inside longer than the people around you can read — asking yourself "have I said what I feel?" keeps the channel open.',
    teamRole: 'In a team you are the moral compass and guardian of authenticity, keeping the group honest with its own values under outside pressure. You benefit from teammates who help you turn values into concrete action.',
    motivation: 'You are moved by meaning, authenticity and being true to yourself. Work that violates your values, or roles that require a mask, cost you more than anyone sees.',
    stressSignals: 'Under pressure you may withdraw and close off, become fixed in your positions and hard to reach, or carry an inner unrest you cannot quite voice.',
    recovery: 'Find creative outlets for what you feel: writing, music, nature, art. Talk with someone who listens without judgement. You do not have to process everything before you may continue.',
    coachingTip: 'Practise translating feeling into words and actions. Ask: "What small step fits what I feel right now?" Do not wait for everything to feel perfect — begin with good enough.',
    pitfallDetail: 'In practice this can mean withdrawing when you feel misunderstood, holding positions too rigidly, struggling with compromise, or bottling up emotions instead of voicing them.',
    recognitionSignals: '• You withdraw and communicate less.\n• You carry an inner unease you cannot put into words.\n• Your positions harden, with less room for nuance.',
    monthlyRhythm: 'Week 1: share one feeling with someone you trust.\nWeek 2: translate one value into one concrete action.\nWeek 3: listen to a viewpoint you do not share, without judging.\nWeek 4: reflect — which value did I make visible in my behaviour this month?',
    exerciseForLowest: 'EXERCISE: CLARIFYING VALUES\nWrite down five values that matter to you. Choose one and ask: how do I live this value day to day? What would I like to shift?',
    energyDrains: '• Work that goes against your values\n• Environments that discourage authenticity\n• Pressure to be someone you are not\n• Situations where you cannot speak freely',
    commTips: '• Share your inner world more often — people cannot guess what you feel.\n• Translate values into concrete proposals: "X matters to me, so I propose Y."\n• Stay willing to adjust your position when new information arrives.',
    commShort: 'authentic and value-driven',
    teamNeed: 'You benefit from teammates who help you stay connected to your own values — people who invite you to reflect on what truly matters to you.',
  },
};

const CLUSTER_EN: Record<string, { name: string; meaning: string; high: string; low: string }> = {
  amber: {
    name: 'Amber',
    meaning: 'ideas, people, movement, possibility, inspiration',
    high: 'The Amber energy is strongly present: a natural weave of creativity and care for people. You see possibilities and you connect. Watch that you do not take on too much, or give more to others than you keep for yourself.',
    low: 'The Amber energy is less dominant in you. You may be less focused on generating ideas and reading group dynamics — in moments that call for creativity and people-focus, leaning consciously into this energy can help.',
  },
  indigo: {
    name: 'Indigo',
    meaning: 'insight, logic, depth, strategy, reflection',
    high: 'The Indigo energy is strongly present: a natural pairing of insight and analytical power. You see patterns and test them against logic. Watch that you do not stay too long inside your head, away from the living world.',
    low: 'The Indigo energy is less dominant in you. You may be less drawn to deep analysis and strategy — in moments that call for reflection, deliberately taking more time can serve you.',
  },
  karmijn: {
    name: 'Karmijn',
    meaning: 'action, execution, structure, result, direction',
    high: 'The Karmijn energy is strongly present: a natural blend of action and structure. You move fast and in an organised way. Watch that the pace leaves room for reflection and for the people alongside you.',
    low: 'The Karmijn energy is less dominant in you. You may be less focused on direct action and structure — in moments that ask for quick results, consciously stepping into doing-mode can help.',
  },
  jade: {
    name: 'Jade',
    meaning: 'calm, values, continuity, trust, authenticity',
    high: 'The Jade energy is strongly present: a natural pairing of calm and authenticity. You bring stability and faithfulness to values. Watch that the familiar does not close the door on growth and change.',
    low: 'The Jade energy is less dominant in you. You may be less oriented toward stability and inner values — in moments that ask for rest and authenticity, consciously slowing down can serve you.',
  },
};

const ARCHETYPE_NAMES: Record<ArchetypeId, string> = {
  'idea-finder': 'The Idea Finder',
  'pattern-seer': 'The Pattern Seer',
  'action-maker': 'The Action Maker',
  'calm-keeper': 'The Calm Keeper',
  'plan-builder': 'The Plan Builder',
  'clear-thinker': 'The Clear Thinker',
  'people-helper': 'The People Helper',
  'heart-listener': 'The Heart Listener',
};

function score(result: ScoreResult, id: ArchetypeId): ArchetypeScore {
  return result.archetypeScores.find((s) => s.archetypeId === id)!;
}

function sorted(result: ScoreResult): ArchetypeScore[] {
  return [...result.archetypeScores].sort((a, b) => b.score100 - a.score100);
}

function gradationEn(score100: number): string {
  if (score100 < 15) return 'barely present';
  if (score100 < 30) return 'present to a limited degree';
  if (score100 < 45) return 'somewhat present';
  if (score100 < 60) return 'moderately present';
  if (score100 < 75) return 'clearly present';
  if (score100 < 90) return 'strongly present';
  return 'exceptionally strongly present';
}

export function generateReportEn(result: ScoreResult): ReportSection[] {
  const p = result.highestArchetype;
  const s = result.secondArchetype;
  const t = result.thirdArchetype;
  const low = result.lowestArchetype;
  const pn = ARCHETYPE_NAMES[p];
  const sn = ARCHETYPE_NAMES[s];
  const tn = ARCHETYPE_NAMES[t];
  const lown = ARCHETYPE_NAMES[low];
  const pa = A[p];
  const sa = A[s];
  const pScore = score(result, p);
  const sScore = score(result, s);
  const lowScore = score(result, low);
  const mainCluster = CLUSTER_EN[result.highestCluster];
  const cons = result.consistency;

  const sections: ReportSection[] = [];

  sections.push({
    title: 'Welcome',
    content: `Welcome to your personal Arcana Profile reading. What you are about to read grew out of your answers to 64 statements about how you think, feel, decide and move through the world.

Before anything else: there is nothing here to pass or fail. This reading is a mirror, not a verdict. It reflects the styles that are most present in you right now — and people grow, shift and surprise themselves, so hold everything here lightly.

Read with curiosity. Take what resonates, set aside what does not, and if something touches you, sit with it for a moment. That is usually where the real insight lives.`,
  });

  sections.push({
    title: 'How reliable is this profile?',
    content: `Your answers were checked for internal consistency: of the ${cons.totalPairs} control pairs woven into the questionnaire, ${cons.consistentPairs} were answered consistently (${cons.score}%).

${cons.qualitativeLevel === 'hoog'
  ? 'That points to a reliable profile — you answered with attention and consistency, and the picture that emerges can be trusted as a mirror of your current preferences.'
  : cons.qualitativeLevel === 'gemiddeld'
    ? 'That is a moderate consistency score: on most themes you answered similar statements the same way, with a little more variation on some. The outcomes are well worth reading — simply check, as you go, whether they feel recognisable.'
    : 'That is a lower consistency score. Perhaps you are in a season of change, perhaps some statements landed differently, or perhaps you moved quickly through the questions. The reading still has value as reflection — read it gently, and trust your own sense of what fits.'}`,
  });

  sections.push({
    title: 'Your core profile',
    content: `${result.isBlendProfile
  ? `Your profile shows a blend: ${pn} and ${sn} lie close together (${Math.round(pScore.score100)} and ${Math.round(sScore.score100)} points). You draw on both styles and shift between them with ease — you are not someone who fits neatly into one box, and that is a strength.`
  : `Your highest score lies with ${pn} (${Math.round(pScore.score100)} points). This archetype colours how you think, feel and act. Your second archetype is ${sn} (${Math.round(sScore.score100)} points), adding its own quality alongside.`}
${result.isBalancedProfile ? '\nYour colour profile is remarkably balanced: all four clusters lie close together. You can draw on many wells — the gift is versatility, the practice is choosing which style to lead with.' : ''}

Your leading colour cluster is ${mainCluster.name} — ${mainCluster.meaning}. Your third archetype, ${tn}, plays a supporting role, and your lowest score sits with ${lown} (${Math.round(lowScore.score100)} points). That is not a weakness; it is simply the style you reach for least spontaneously.

Everything below unfolds these findings, layer by layer.`,
  });

  sections.push({
    title: `In-depth portrait: ${pn}`,
    content: `${pn} is your most present archetype. It ${pa.meaning}

YOUR CORE STRENGTH
${pa.strength} This is the ground you stand on — in situations that call for this quality, you are at your most natural and most effective.

WHAT THIS LOOKS LIKE IN DAILY LIFE
${pa.workStyle}

HOW YOU COMMUNICATE
${pa.communication}

HOW YOU LEARN
${pa.learning}

THE ENVIRONMENT WHERE YOU FLOURISH
${pa.environment}`,
  });

  sections.push({
    title: `In-depth portrait: ${sn}`,
    content: `${sn} is your second archetype. It ${sa.meaning} This style complements your leading archetype and offers a second lens you reach for when the moment asks.

ITS CORE STRENGTH
${sa.strength}

IN DAILY LIFE
${sa.workStyle}

IN YOUR COMMUNICATION
${sa.communication}

IN HOW YOU LEARN
${sa.learning}`,
  });

  sections.push({
    title: `The interplay: ${pn} and ${sn}`,
    content: `Every profile is really a conversation between its two leading voices.

${pn} gives you this: ${pa.strength.toLowerCase()} ${sn} adds this: ${sa.strength.toLowerCase()}

In practice you shift between these two perspectives — sometimes they amplify each other beautifully, sometimes they pull in different directions. Neither voice is more "you" than the other. The art is noticing which one is speaking, and choosing consciously which one the moment needs.

When you feel stuck, it is often because one voice has gone quiet. Asking "what would my other side do here?" can be surprisingly unlocking.`,
  });

  sections.push({
    title: 'How you think',
    content: (() => {
      const ti = score(result, 'clear-thinker');
      const ni = score(result, 'pattern-seer');
      const ne = score(result, 'idea-finder');
      const te = score(result, 'plan-builder');
      return `ANALYTICAL THINKING — ${gradationEn(ti.score100)} (${Math.round(ti.score100)} points)
${ti.score100 >= 50
  ? 'You seek logical consistency and enjoy taking questions apart to their core. You notice quickly when reasoning does not hold. That sharpness is a gift — shared gently, it becomes a gift to others too.'
  : 'You trust other sources — experience, feeling, intuition — more than systematic analysis. In situations that ask for humanity and pragmatism rather than cool logic, this is a genuine strength.'}

STRATEGIC THINKING — ${gradationEn(ni.score100)} (${Math.round(ni.score100)} points)
${ni.score100 >= 50
  ? 'You see patterns and directions before others do, and you naturally think in longer arcs. The occasional frustration when others do not yet see what you see comes with the territory — patience with their pace is part of your craft.'
  : 'You prefer to engage with what is happening now rather than distant scenarios. That keeps you practical and grounded; deliberately zooming out now and then rounds out the picture.'}

CREATIVE THINKING — ${gradationEn(ne.score100)} (${Math.round(ne.score100)} points)
${ne.score100 >= 50
  ? 'You see several options where others see one, and you connect ideas across distant fields. This makes you inventive — and occasionally spoiled for choice. Trust that choosing one road does not kill the others.'
  : 'You look for the one best answer rather than ten possible ones. That gives you focus and efficiency — a quality more valuable than it usually gets credit for.'}

STRUCTURED THINKING — ${gradationEn(te.score100)} (${Math.round(te.score100)} points)
${te.score100 >= 50
  ? 'You like to know where you are heading and how to measure the way there. That makes you effective and reliable — watch only that the process, and the people in it, get their share of attention alongside the outcome.'
  : 'Tight structure and planning are not your first instinct — you work flexibly and adapt to what arises. That fluidity is a strength in changing conditions.'}`;
    })(),
  });

  sections.push({
    title: 'How you communicate',
    content: (() => {
      const fe = score(result, 'people-helper');
      const fi = score(result, 'heart-listener');
      const ti = score(result, 'clear-thinker');
      return `THE UNDERTONE OF YOUR COMMUNICATION
Attunement to others is ${gradationEn(fe.score100)} (${Math.round(fe.score100)}); staying true to your own values in what you say is ${gradationEn(fi.score100)} (${Math.round(fi.score100)}); analytical precision is ${gradationEn(ti.score100)} (${Math.round(ti.score100)}).

YOUR NATURAL STYLE
${A[p].communication}

GENTLE SUGGESTIONS
${A[p].commTips}`;
    })(),
  });

  sections.push({
    title: 'How you relate to people',
    content: (() => {
      const fe = score(result, 'people-helper');
      const fi = score(result, 'heart-listener');
      return `SOCIAL ATTUNEMENT — ${gradationEn(fe.score100)} (${Math.round(fe.score100)} points)
${fe.score100 >= 50
  ? 'You sense quickly what others need and adjust naturally. You are a connector who values harmony — the loving warning that comes with this gift is not to give yourself away to keep the peace.'
  : 'Group dynamics are not your first focus, which protects you from being swept along by group pressure. Checking in on colleagues now and then keeps the connection warm without costing you your course.'}

INNER COMPASS — ${gradationEn(fi.score100)} (${Math.round(fi.score100)} points)
${fi.score100 >= 50
  ? 'Authenticity and personal values steer how you move with others. You know what matters to you and you are not easily pulled off that path. Sharing your inner world helps others understand the quiet strength they sense in you.'
  : 'You hold your values flexibly and adapt to context with ease — a social gift. Pausing occasionally to ask what you find genuinely important, apart from the situation, keeps you anchored.'}

HOW YOU BUILD CONNECTION
${A[p].relationships}`;
    })(),
  });

  sections.push({
    title: 'Working with others',
    content: `YOUR PLACE IN A TEAM
${pa.teamRole}

WHAT YOU BRING
${pa.strength} And through ${sn}: ${sa.strength.toLowerCase()}

WHAT YOU NEED FROM A TEAM
${A[low].teamNeed}`,
  });

  sections.push({
    title: 'How you make decisions',
    content: (() => {
      const drivers: { s: ArchetypeScore; label: string; advice: string }[] = [
        { s: score(result, 'plan-builder'), label: 'structure and clear priorities', advice: 'You want to know which step yields the most, and you decide without lingering. The gentle counterweight: check for support before you push through.' },
        { s: score(result, 'clear-thinker'), label: 'logical analysis', advice: 'You weigh arguments, test assumptions and look for the most consistent option. The gentle counterweight: notice when analysis becomes a place to hide from deciding.' },
        { s: score(result, 'heart-listener'), label: 'values and inner feeling', advice: 'You check whether an option fits who you are. That gives your decisions depth and conviction. The gentle counterweight: let rational arguments have their say too.' },
        { s: score(result, 'action-maker'), label: 'direct perception of the situation', advice: 'You feel what the moment asks and act on it. The gentle counterweight: give big decisions a little deliberate time.' },
      ].sort((a, b) => b.s.score100 - a.s.score100);
      const top = drivers[0];
      return `${top.s.score100 >= 50
  ? `Your decision-making leans on ${top.label} (${Math.round(top.s.score100)} points, ${gradationEn(top.s.score100)}).

${top.advice}`
  : 'Your decision-making style is flexible and shaped by context — no single driver dominates, which lets you choose per situation what fits.'}

FOR BETTER DECISIONS
• Sleep on important choices — literally.
• Write pros and cons down; paper thinks more clearly than a busy mind.
• Ask someone whose thinking style differs from yours.
• Check not only whether a decision makes sense, but whether it feels right.`;
    })(),
  });

  sections.push({
    title: 'Your motivation and energy',
    content: `WHAT FEEDS YOU
${pa.motivation}

${sa.motivation}

WHAT DRAINS YOU
${pa.energyDrains}

KEEPING YOUR ENERGY
• Learn your own givers and drainers, and steer by them.
• Plan at least one energising activity each week — as an appointment, not an afterthought.
• Tell the people around you what you need in order to function well.
• Take early signals of tiredness seriously, before they grow loud.`,
  });

  sections.push({
    title: 'Your natural strength',
    content: `${pa.strength} That is the headline — and beneath it: ${sa.strength.toLowerCase()}

You are at your best when both styles get to play. Your third archetype, ${tn}, adds a quieter note: ${A[t].strength.toLowerCase()} It surfaces in situations that specifically call for it, even though it is not your first reflex.

${(() => {
      const high = sorted(result).filter((x) => x.score100 >= 65);
      if (high.length >= 4) return 'Notably, many of your archetypes score high. That is a wide repertoire — the gift is versatility, the practice is not scattering yourself across it.';
      if (high.length <= 1) return 'Your strength is concentrated in one or two archetypes. That gives you a clear profile and a strong identity — the practice is staying flexible when a different style would serve better.';
      return 'Your strengths are spread across a few archetypes: a clear but not narrow profile. You shift effectively between your strong styles.';
    })()}`,
  });

  sections.push({
    title: 'Possible pitfalls',
    content: `Every strength casts a shadow. Naming it is not criticism — it is how you make friends with it.

THE SHADOW OF ${pn.toUpperCase()}
The risk: ${pa.risk} ${pa.pitfallDetail}

THE SHADOW OF ${sn.toUpperCase()}
The risk: ${sa.risk} ${sa.pitfallDetail}

RECOGNISING THE PATTERN EARLY
${pa.recognitionSignals}

Awareness is the whole game here. These tendencies do not need eliminating — only noticing, a beat earlier each time.`,
  });

  sections.push({
    title: 'What can happen under pressure',
    content: `Under pressure, a profile does not disappear — it exaggerates. You fall back on your most dominant patterns, dialled up.

${pn.toUpperCase()} UNDER PRESSURE
${pa.stressSignals}

${sn.toUpperCase()} UNDER PRESSURE
${sa.stressSignals}

FINDING YOUR WAY BACK
${pa.recovery}

${sa.recovery}`,
  });

  sections.push({
    title: 'Your growth path',
    content: `Growth here does not mean becoming someone else. It means consciously seeking balance around who you already are.

FOR ${pn.toUpperCase()}
The invitation: ${pa.growth}
${pa.coachingTip}

FOR ${sn.toUpperCase()}
The invitation: ${sa.growth}
${sa.coachingTip}

YOUR QUIETEST STYLE: ${lown.toUpperCase()}
Your lowest score (${Math.round(lowScore.score100)} points) sits with ${lown}. No problem at all — but this style holds something worth borrowing now and then: ${A[low].strength.toLowerCase()}

${A[low].exerciseForLowest}

A GENTLE RHYTHM FOR THE COMING MONTH
${pa.monthlyRhythm}`,
  });

  sections.push({
    title: 'Your colour clusters in detail',
    content: [...result.clusterScores]
      .sort((a, b) => b.score100 - a.score100)
      .map((cs) => {
        const c = CLUSTER_EN[cs.clusterId];
        const interp = cs.score100 >= 65 ? c.high : cs.score100 < 40 ? c.low : `The ${c.name} energy is present in healthy measure: you can draw on it when the situation asks, without it dominating your profile.`;
        return `${c.name.toUpperCase()} (${Math.round(cs.score100)} points) — ${c.meaning}
${interp}`;
      })
      .join('\n\n'),
  });

  sections.push({
    title: 'Your full archetype overview',
    content: sorted(result)
      .map((sc, i) => {
        const name = ARCHETYPE_NAMES[sc.archetypeId];
        const a = A[sc.archetypeId];
        const rank = i === 0 ? ' (leading)' : i === 1 ? ' (second)' : i === 2 ? ' (third)' : i === 7 ? ' (quietest)' : '';
        const sdNote = sc.standardDeviation > 1.8 ? ' Your answers on this scale varied noticeably, which can point to ambivalence or situation-dependence.' : '';
        return `${i + 1}. ${name} — ${Math.round(sc.score100)} points${rank}
This style is ${gradationEn(sc.score100)}.${sdNote}
Strength: ${a.strength.toLowerCase()} Pitfall: ${a.risk} Growth: ${a.growth}`;
      })
      .join('\n\n'),
  });

  sections.push({
    title: 'Questions to sit with',
    content: `Take these slowly — two or three at a time is plenty. Come back for the rest another day.

ON YOUR CORE PROFILE
• ${pa.reflection}
• ${sa.reflection}
• Do you recognise yourself in ${pn}? What fits — and what feels different?
• In which situations does ${sn} step forward in you?

ON YOUR STRENGTH
• Which situations bring out the best in me?
• When do I feel most fully in my element?
• Which of my strengths goes most unseen by others?

ON YOUR SHADOW
• When do I notice myself losing balance?
• What are my earliest warning signals?
• What helps me find my way back?

ON YOUR GROWTH
• What small step could I take this week?
• What would change if I showed more of ${lown}?
• Who could I share this reading with, to take it further?`,
  });

  sections.push({
    title: 'Conversation starters',
    content: `This reading becomes most valuable when it leaves the page. Some openings:

WITH A COACH
• "My profile points to ${pn} as my leading style. I recognise it in… though I also notice…"
• "My growth invitation is to ${pa.growth} How could I practise that concretely?"

WITH YOUR TEAM
• "I contribute most when I get to… What I need from you is…"
• "My pitfall is ${pa.risk} If you see it happening, you may name it."
• "I have learned my communication style is ${pa.commShort}. How do you experience that?"

WITH YOUR MANAGER
• "I do my best work in an environment that offers…"
• "I am motivated by… and lose energy on…"
• "I would like to grow in… Can you support me in that?"`,
  });

  sections.push({
    title: 'In summary',
    content: `YOUR ARCANA PROFILE AT A GLANCE

Leading archetype: ${pn} — ${Math.round(pScore.score100)} points
Second archetype: ${sn} — ${Math.round(sScore.score100)} points
Third archetype: ${tn}
Quietest style: ${lown} — ${Math.round(lowScore.score100)} points
Colour cluster: ${mainCluster.name} (${mainCluster.meaning})
${result.isBlendProfile ? 'Profile type: blend — two styles close together' : 'Profile type: dominant — one clearly leading style'}
Consistency: ${cons.score}% (${cons.qualitativeLevel === 'hoog' ? 'high' : cons.qualitativeLevel === 'gemiddeld' ? 'moderate' : 'low'})

YOUR CORE STRENGTH
${pa.strength} Complemented by: ${sa.strength.toLowerCase()}

THE INVITATION
${pa.growth}

A QUESTION TO CARRY WITH YOU
${pa.reflection}

Use this reading as a starting point for reflection and conversation — a mirror, never a label. Profiles move as you do; consider retaking this in six to twelve months and noticing what has shifted.`,
  });

  return sections;
}

export { A as archetypesEn, ARCHETYPE_NAMES, CLUSTER_EN, gradationEn };
