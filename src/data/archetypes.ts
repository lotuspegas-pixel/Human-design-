import type { Archetype, ArchetypeId } from '../types';

export interface ArchetypeDetail {
  id: ArchetypeId;
  werkstijl: string;
  communicatie: string;
  leerstijl: string;
  teamrol: string;
  motivatie: string;
  stressSignalen: string;
  herstelAdvies: string;
  coachingTip: string;
  werkOmgeving: string;
  relatieStijl: string;
}

export const archetypes: Archetype[] = [
  {
    id: 'idea-finder',
    name: 'The Idea Finder',
    jungFunction: 'Ne',
    meaning: 'Ziet nieuwe ideeën, opties en mogelijke routes.',
    colorCluster: 'amber',
    strength: 'Ziet ideeën, opties en mogelijkheden.',
    riskUnderPressure: 'Te veel ideeën, te weinig afronding.',
    growthEdge: 'Kies één route en maak die af.',
    reflectionQuestion: 'Welke mogelijkheid verdient nu echt mijn aandacht?',
  },
  {
    id: 'pattern-seer',
    name: 'The Pattern Seer',
    jungFunction: 'Ni',
    meaning: 'Ziet patronen, diepere betekenis en toekomstige richting.',
    colorCluster: 'indigo',
    strength: 'Ziet betekenis, richting en verborgen patronen.',
    riskUnderPressure: 'Te lang in reflectie blijven hangen.',
    growthEdge: 'Toets inzichten in de echte wereld.',
    reflectionQuestion: 'Welke eerste concrete stap past bij mijn inzicht?',
  },
  {
    id: 'action-maker',
    name: 'The Action Maker',
    jungFunction: 'Se',
    meaning: 'Handelt snel, merkt het heden op en reageert op echte situaties.',
    colorCluster: 'karmijn',
    strength: 'Handelt snel en leest het huidige moment.',
    riskUnderPressure: 'Handelen voordat er genoeg is nagedacht.',
    growthEdge: 'Pauzeer voordat je reageert.',
    reflectionQuestion: 'Wat vraagt deze situatie nu echt van mij?',
  },
  {
    id: 'calm-keeper',
    name: 'The Calm Keeper',
    jungFunction: 'Si',
    meaning: 'Waardeert rust, herinnering, routine, ervaring en stabiliteit.',
    colorCluster: 'jade',
    strength: 'Brengt rust, herinnering, stabiliteit en zorg.',
    riskUnderPressure: 'Te lang vasthouden aan het bekende.',
    growthEdge: 'Sta kleine veilige veranderingen toe.',
    reflectionQuestion: 'Welke verandering kan ik toelaten zonder mijn rust te verliezen?',
  },
  {
    id: 'plan-builder',
    name: 'The Plan Builder',
    jungFunction: 'Te',
    meaning: 'Creëert structuur, stappen, prioriteiten en resultaten.',
    colorCluster: 'karmijn',
    strength: 'Creëert structuur, prioriteiten en resultaten.',
    riskUnderPressure: 'Te controlerend of te gefocust op output worden.',
    growthEdge: 'Neem mensen en waarden mee in het plan.',
    reflectionQuestion: 'Wie of wat moet ik meenemen voordat ik doorpak?',
  },
  {
    id: 'clear-thinker',
    name: 'The Clear Thinker',
    jungFunction: 'Ti',
    meaning: 'Analyseert, definieert, checkt logica en zoekt helderheid.',
    colorCluster: 'indigo',
    strength: 'Analyseert, definieert en vindt logische helderheid.',
    riskUnderPressure: 'Te afstandelijk of te kritisch worden.',
    growthEdge: 'Communiceer helderheid met warmte.',
    reflectionQuestion: 'Hoe kan ik duidelijk zijn zonder hard over te komen?',
  },
  {
    id: 'people-helper',
    name: 'The People Helper',
    jungFunction: 'Fe',
    meaning: 'Leest mensen, creëert harmonie en ondersteunt sociale verbinding.',
    colorCluster: 'amber',
    strength: 'Begrijpt mensen en creëert verbinding.',
    riskUnderPressure: 'Te veel aanpassen aan anderen.',
    growthEdge: 'Houd je eigen behoeften zichtbaar.',
    reflectionQuestion: 'Wat heb ik zelf nodig in deze situatie?',
  },
  {
    id: 'heart-listener',
    name: 'The Heart Listener',
    jungFunction: 'Fi',
    meaning: 'Volgt waarden, authenticiteit, persoonlijke waarheid en innerlijk gevoel.',
    colorCluster: 'jade',
    strength: 'Volgt waarden, authenticiteit en innerlijke waarheid.',
    riskUnderPressure: 'Terugtrekken of innerlijk te vast komen te zitten.',
    growthEdge: 'Vertaal waarden naar duidelijk gedrag.',
    reflectionQuestion: 'Welke waarde wil ik nu zichtbaar maken in gedrag?',
  },
];

export const archetypeDetails: ArchetypeDetail[] = [
  {
    id: 'idea-finder',
    werkstijl: 'Je werkt het liefst in een omgeving waar ruimte is voor experiment en variatie. Vaste procedures en herhalende taken kunnen je energie kosten. Je bent op je best als je kunt schakelen tussen projecten, nieuwe invalshoeken kunt verkennen en creatieve oplossingen mag bedenken. Je hebt de neiging om meerdere dingen tegelijk te starten, wat soms ten koste gaat van afronding.',
    communicatie: 'Je communiceert levendig en associatief. Je springt makkelijk van het ene onderwerp naar het andere en maakt verbanden die anderen verrassen. In vergaderingen ben je vaak degene die met onverwachte ideeën komt. Het kan helpen om af en toe samen te vatten wat je bedoelt, zodat anderen je trein van gedachten kunnen volgen.',
    leerstijl: 'Je leert het best door verkenning en experiment. Je hebt weinig behoefte aan een vast leerpad en zoekt liever zelf je weg. Nieuwe concepten pikken je snel op, maar het vasthouden en verdiepen van kennis vraagt bewuste aandacht. Je profiteert van afwisseling in leermethoden.',
    teamrol: 'In een team ben je de ideëngenerator. Je brengt energie, mogelijkheden en creatieve voorstellen. Je helpt het team om verder te kijken dan het voor de hand liggende. Je hebt baat bij teamleden die jouw ideeën helpen concretiseren en prioriteren.',
    motivatie: 'Je wordt gemotiveerd door nieuwheid, mogelijkheden en de vrijheid om te verkennen. Routinematig werk, strakke kaders en voorspelbaarheid kunnen je motivatie ondermijnen. Je floreert als je de ruimte krijgt om te innoveren.',
    stressSignalen: 'Onder druk kun je gaan overcompenseren door nóg meer ideeën te produceren zonder iets af te ronden. Je kunt ook prikkelbaar worden als je het gevoel hebt vast te zitten. Soms merk je dat je je niet kunt concentreren en van het ene naar het andere springt.',
    herstelAdvies: 'Gun jezelf rustige momenten zonder input. Kies bewust één project om af te ronden en parkeer de rest. Schrijf je ideeën op zodat je ze later kunt oppakken, maar dwing jezelf niet om ze allemaal tegelijk uit te werken.',
    coachingTip: 'Vraag jezelf regelmatig af: "Wat is nu het belangrijkste om af te maken?" Maak een onderscheid tussen ideeën die je energie geven en ideeën die je afleiden van wat ertoe doet.',
    werkOmgeving: 'Je gedijt in een omgeving met variatie, korte cycli en ruimte voor experiment. Open kantoren, brainstormsessies en projectmatig werken passen goed bij jou. Starre hiërarchieën en uitgebreide goedkeuringsprocessen kunnen je frustreren.',
    relatieStijl: 'In relaties ben je enthousiast en inspirerend. Je deelt graag nieuwe ontdekkingen en houdt van gesprekken die alle kanten op gaan. Je partner of collega kan soms moeite hebben om je bij te houden. Het helpt om bewust tijd te nemen om te luisteren en af te stemmen.',
  },
  {
    id: 'pattern-seer',
    werkstijl: 'Je werkt het liefst met voldoende tijd voor reflectie en verdieping. Je hebt ruimte nodig om na te denken voordat je tot actie overgaat. Oppervlakkig werk frustreert je; je zoekt naar de kern van een vraagstuk. Je bent op je best wanneer je strategisch kunt meedenken en langetermijnvisie kunt ontwikkelen.',
    communicatie: 'Je communiceert doordacht en met diepgang. Je neigt ernaar om eerst uitgebreid na te denken voordat je iets zegt, wat kan overkomen als terughoudendheid. Als je spreekt, is het vaak raak en met overtuiging. Het kan helpen om je denkproces vaker hardop te delen, zodat anderen je niet als gesloten ervaren.',
    leerstijl: 'Je leert het best door verdieping en synthese. Je zoekt naar de rode draad en het grotere plaatje. Oppervlakkige informatie slaat je snel over; je wilt begrijpen hoe dingen met elkaar samenhangen. Je profiteert van reflectietijd en het verbinden van theorie aan praktijk.',
    teamrol: 'In een team ben je de strateeg en visionair. Je helpt het team om vooruit te kijken en richting te bepalen. Je ziet risico\'s en kansen die anderen nog niet opmerken. Je hebt baat bij teamleden die jouw visie vertalen naar concrete stappen.',
    motivatie: 'Je wordt gemotiveerd door betekenis, richting en het gevoel dat je bijdraagt aan iets groters. Oppervlakkig werk en dagelijkse operationele drukte kunnen je motivatie ondermijnen. Je floreert als je het grotere plaatje mag bewaken.',
    stressSignalen: 'Onder druk kun je je terugtrekken in je gedachten en moeilijk te bereiken zijn voor anderen. Je kunt vast komen te zitten in analyse en steeds dieper graven zonder tot actie te komen. Soms merk je dat je gefrustreerd raakt omdat anderen je inzichten niet lijken te begrijpen.',
    herstelAdvies: 'Zoek balans door je inzichten klein en concreet te maken. Deel je gedachten met iemand die je vertrouwt. Accepteer dat niet alles meteen perfect hoeft te zijn en dat een eerste stap vaak meer oplevert dan een perfect plan.',
    coachingTip: 'Oefen met het vertalen van je visie naar één concrete actie per dag. Vraag feedback op je ideeën voordat ze volledig uitgewerkt zijn — dat versnelt je leerproces.',
    werkOmgeving: 'Je gedijt in een omgeving die ruimte biedt voor diep werk, strategisch denken en langetermijnplanning. Je hebt baat bij rustige werkplekken en voldoende autonomie. Vergaderculturen met veel korte overleggen kunnen je energie kosten.',
    relatieStijl: 'In relaties ben je diepgaand en loyaal. Je zoekt naar verbinding op een dieper niveau en hebt weinig behoefte aan oppervlakkige contacten. Je kunt soms moeilijk je innerlijke wereld delen, wat afstand kan creëren. Het helpt om bewust je gedachten en gevoelens te verwoorden.',
  },
  {
    id: 'action-maker',
    werkstijl: 'Je werkt het liefst in een dynamische omgeving waar je direct kunt handelen. Je hebt weinig geduld voor lange vergaderingen en uitgebreide planfases. Je bent op je best als je op je directe waarneming kunt vertrouwen en snel kunt schakelen. Je haalt energie uit concrete resultaten en zichtbare voortgang.',
    communicatie: 'Je communiceert direct en to the point. Je hebt weinig geduld voor omwegen en wilt snel tot de kern komen. Je non-verbale communicatie is expressief en je laat makkelijk zien wat je vindt. Het kan helpen om af en toe pas op de plaats te maken en te checken of je boodschap goed is overgekomen.',
    leerstijl: 'Je leert het best door te doen. Theorie zonder praktijk boeit je niet lang; je wilt zo snel mogelijk aan de slag. Je pikt vaardigheden snel op door ze uit te proberen. Je profiteert van hands-on training en directe feedback.',
    teamrol: 'In een team ben je de doener en aanjager. Je brengt tempo, energie en een focus op resultaat. Je helpt het team om van praten naar doen te komen. Je hebt baat bij teamleden die zorgen voor reflectie en strategie.',
    motivatie: 'Je wordt gemotiveerd door actie, resultaat en de spanning van het moment. Wachten, bureaucratie en eindeloze overleggen kunnen je motivatie ondermijnen. Je floreert als je de vrijheid hebt om snel te handelen.',
    stressSignalen: 'Onder druk kun je impulsief worden en handelen zonder na te denken over de gevolgen. Je kunt ongeduldig worden met anderen die langzamer werken. Soms merk je dat je fysiek onrustig wordt en moeilijk stil kunt zitten.',
    herstelAdvies: 'Bouw bewust pauzemomenten in voordat je reageert. Tel tot tien voordat je een belangrijk besluit neemt. Fysieke activiteit kan helpen om spanning af te voeren zonder impulsief te handelen.',
    coachingTip: 'Oefen met de vraag: "Wat wil ik bereiken, en is dit de beste manier?" Neem bij belangrijke beslissingen bewust een uur bedenktijd voordat je handelt.',
    werkOmgeving: 'Je gedijt in een omgeving met korte cycli, directe feedback en zichtbare resultaten. Praktisch werk, veldwerk en projecten met duidelijke deadlines passen goed bij jou. Bureaucratische omgevingen en lange goedkeuringsprocessen kunnen je frustreren.',
    relatieStijl: 'In relaties ben je energiek en avontuurlijk. Je houdt van samen dingen doen en nieuwe ervaringen opdoen. Je kunt soms te snel voorbijgaan aan emotionele nuances. Het helpt om bewust tijd te nemen voor gesprekken zonder agenda.',
  },
  {
    id: 'calm-keeper',
    werkstijl: 'Je werkt het liefst in een voorspelbare en gestructureerde omgeving. Je haalt rust uit vaste patronen en bewezen werkwijzen. Je bent betrouwbaar en consistent in je output. Je bent op je best als je de tijd krijgt om grondig en zorgvuldig te werken, zonder constante veranderingen in prioriteiten.',
    communicatie: 'Je communiceert rustig en overwogen. Je neemt de tijd om na te denken voordat je reageert en vermijdt onnodige confrontatie. Je bent een goede luisteraar en onthoudt details die anderen vergeten. Het kan helpen om soms wat directer te zijn in het uiten van je mening.',
    leerstijl: 'Je leert het best in een gestructureerde omgeving met duidelijke stappen. Je hebt behoefte aan herhaling en oefening om nieuwe vaardigheden eigen te maken. Je profiteert van voorbeelden, handleidingen en bewezen methoden. Plotselinge veranderingen in leermethoden kunnen verwarrend zijn.',
    teamrol: 'In een team ben je de stabiele kracht en het geheugen. Je brengt continuïteit, zorgvuldigheid en betrouwbaarheid. Je helpt het team om niet te snel van koers te veranderen. Je hebt baat bij teamleden die zorgen voor vernieuwing en frisse energie.',
    motivatie: 'Je wordt gemotiveerd door stabiliteit, erkenning voor je betrouwbaarheid en het gevoel dat je bijdraagt aan iets bestendigs. Constante veranderingen en onzekerheid kunnen je motivatie ondermijnen. Je floreert als je weet waar je aan toe bent.',
    stressSignalen: 'Onder druk kun je star worden en je vastklampen aan het bekende. Je kunt moeite hebben om los te laten en weerstand voelen tegen elke verandering, ook als die nodig is. Soms merk je dat je je terugtrekt en minder communiceert.',
    herstelAdvies: 'Zoek kleine, veilige experimenten die je helpen om flexibeler te worden. Begin met veranderingen die je zelf kiest en beheert. Praat over je zorgen met iemand die je vertrouwt, in plaats van ze op te kroppen.',
    coachingTip: 'Stel jezelf de vraag: "Wat is het ergste dat kan gebeuren als ik dit probeer?" Vaak blijkt de drempel lager dan verwacht. Kies één kleine verandering per week om mee te oefenen.',
    werkOmgeving: 'Je gedijt in een omgeving met duidelijke verwachtingen, vaste procedures en een voorspelbaar werkritme. Organisaties met een stabiele cultuur en langetermijnperspectief passen goed bij jou. Start-upomgevingen en reorganisaties kunnen je veel energie kosten.',
    relatieStijl: 'In relaties ben je loyaal, zorgzaam en betrouwbaar. Je investeert in duurzame verbindingen en hebt weinig behoefte aan oppervlakkige contacten. Je kunt soms moeite hebben om veranderingen in relaties te accepteren. Het helpt om open te staan voor de groei van jezelf en de ander.',
  },
  {
    id: 'plan-builder',
    werkstijl: 'Je werkt het liefst met duidelijke doelen, deadlines en meetbare resultaten. Je bent georganiseerd en efficiënt. Je bent op je best als je een helder kader hebt waarbinnen je kunt optimaliseren. Je hebt de neiging om verantwoordelijkheid op je te nemen, ook als dat niet expliciet wordt gevraagd.',
    communicatie: 'Je communiceert helder en resultaatgericht. Je bent goed in het samenvatten van complexe situaties en het formuleren van actiepunten. In vergaderingen stuur je graag aan op besluiten en vervolgstappen. Het kan helpen om ruimte te laten voor input van anderen voordat je naar conclusies gaat.',
    leerstijl: 'Je leert het best als er een duidelijk doel is en je kunt meten of je vooruitgang boekt. Je hebt behoefte aan structuur in het leerproces en vindt het prettig om kennis direct toe te passen. Je profiteert van cursussen met concrete opdrachten en feedback.',
    teamrol: 'In een team ben je de organisator en projectleider. Je brengt structuur, planning en een focus op resultaat. Je helpt het team om doelen te halen en op koers te blijven. Je hebt baat bij teamleden die zorgen voor creativiteit en mensgerichtheid.',
    motivatie: 'Je wordt gemotiveerd door resultaat, voortgang en het gevoel dat je impact hebt. Vaagheid, gebrek aan richting en inefficiëntie kunnen je motivatie ondermijnen. Je floreert als je verantwoordelijkheid mag nemen en je resultaten zichtbaar zijn.',
    stressSignalen: 'Onder druk kun je te controlerend worden en moeilijk delegeren. Je kunt doorwerken ten koste van je welzijn en dat van anderen. Soms merk je dat je gefrustreerd raakt omdat anderen niet aan je standaarden voldoen.',
    herstelAdvies: 'Leer onderscheid maken tussen wat urgent is en wat belangrijk is. Gun jezelf momenten van rust zonder productief te hoeven zijn. Vraag jezelf af of het resultaat ook zonder jouw directe controle goed kan komen.',
    coachingTip: 'Oefen met de vraag: "Wat is hier goed genoeg?" Niet alles hoeft perfect te zijn. Neem bewust momenten om te vragen hoe het met je teamleden gaat, los van het project.',
    werkOmgeving: 'Je gedijt in een omgeving met duidelijke doelstellingen, heldere verantwoordelijkheden en ruimte om te organiseren. Projectmatig werken, leidinggevende rollen en resultaatgerichte culturen passen goed bij jou. Omgevingen zonder duidelijke richting kunnen je frustreren.',
    relatieStijl: 'In relaties ben je betrouwbaar en doelgericht. Je neemt graag het voortouw en zorgt dat dingen geregeld zijn. Je kunt soms te veel de leiding nemen in situaties die om gelijkwaardigheid vragen. Het helpt om bewust ruimte te maken voor de inbreng en het tempo van de ander.',
  },
  {
    id: 'clear-thinker',
    werkstijl: 'Je werkt het liefst met complexe vraagstukken die om analyse en helderheid vragen. Je bent grondig en nauwkeurig. Je bent op je best als je de tijd krijgt om een probleem van alle kanten te bekijken voordat je een conclusie trekt. Je hebt de neiging om hoge standaarden te stellen aan de kwaliteit van je denken.',
    communicatie: 'Je communiceert precies en weloverwogen. Je kiest je woorden zorgvuldig en vermijdt vage formuleringen. Je bent goed in het ontleden van argumenten en het blootleggen van aannames. Het kan helpen om je analyse te vertalen naar taal die voor iedereen begrijpelijk is.',
    leerstijl: 'Je leert het best door analyse en begrip. Je wilt niet alleen weten wát iets is, maar ook waaróm het zo werkt. Je profiteert van diepgaand studiemateriaal, logische opbouw en ruimte om zelf te onderzoeken. Oppervlakkige trainingen zonder theoretische onderbouwing frustreren je.',
    teamrol: 'In een team ben je de analist en kwaliteitsbewaker. Je helpt het team om scherp te denken en ondoordachte beslissingen te voorkomen. Je stelt de vragen die anderen niet durven te stellen. Je hebt baat bij teamleden die zorgen voor warmte en verbinding.',
    motivatie: 'Je wordt gemotiveerd door intellectuele uitdaging, begrip en het vinden van elegante oplossingen. Oppervlakkig werk, slordigheid en onlogische besluitvorming kunnen je motivatie ondermijnen. Je floreert als je de ruimte krijgt om diep te denken.',
    stressSignalen: 'Onder druk kun je te kritisch worden, zowel naar jezelf als naar anderen. Je kunt je terugtrekken in je analyse en de menselijke kant van een situatie uit het oog verliezen. Soms merk je dat je vastloopt in details en het grotere plaatje mist.',
    herstelAdvies: 'Zoek bewust contact met mensen en activiteiten die je uit je hoofd halen. Beweeg, doe iets creatiefs of voer een luchtig gesprek. Accepteer dat niet alles met logica op te lossen is en dat "goed genoeg" soms de beste optie is.',
    coachingTip: 'Oefen met het communiceren van je inzichten op een manier die de ander uitnodigt, niet afschrikt. Gebruik "ik merk dat..." in plaats van "het klopt niet dat..." om je analyse zachter te brengen.',
    werkOmgeving: 'Je gedijt in een omgeving die intellectuele diepgang waardeert, ruimte biedt voor onderzoek en hoge standaarden hanteert. Technische rollen, adviesfuncties en analytische posities passen goed bij jou. Omgevingen waarin snelheid belangrijker is dan kwaliteit kunnen je frustreren.',
    relatieStijl: 'In relaties ben je eerlijk en diepgaand. Je waardeert intellectuele gesprekken en authenticiteit. Je kunt soms te veel vanuit je hoofd reageren en te weinig vanuit je gevoel. Het helpt om bewust te oefenen met het benoemen van je emoties, ook als dat onwennig voelt.',
  },
  {
    id: 'people-helper',
    werkstijl: 'Je werkt het liefst in een omgeving waar samenwerking en menselijk contact centraal staan. Je bent gevoelig voor de sfeer in een team en stemt je gedrag af op wat de groep nodig heeft. Je bent op je best als je kunt bijdragen aan harmonie en verbinding. Je hebt de neiging om de behoeften van anderen voorrang te geven boven je eigen behoeften.',
    communicatie: 'Je communiceert warm, inclusief en afgestemd op je gesprekspartner. Je bent goed in het lezen van non-verbale signalen en past je toon en woorden aan op de situatie. Je bent een natuurlijke mediator bij conflicten. Het kan helpen om soms directer te zijn over je eigen standpunt.',
    leerstijl: 'Je leert het best in een groep, door interactie en samenwerking. Je profiteert van rollenspelen, groepsdiscussies en persoonlijke feedback. Je vindt het prettig om te leren van en met anderen. Individueel studeren zonder menselijk contact kan je minder motiveren.',
    teamrol: 'In een team ben je de verbinder en sfeermaker. Je zorgt dat iedereen zich gehoord voelt en dat conflicten niet escaleren. Je helpt het team om als geheel te functioneren. Je hebt baat bij teamleden die je helpen om je eigen grenzen te bewaken.',
    motivatie: 'Je wordt gemotiveerd door menselijk contact, waardering en het gevoel dat je bijdraagt aan het welzijn van anderen. Isolatie, koude werkculturen en conflicten die niet worden opgelost kunnen je motivatie ondermijnen. Je floreert als je je gewaardeerd voelt.',
    stressSignalen: 'Onder druk kun je te veel gaan aanpassen aan wat anderen willen, ten koste van jezelf. Je kunt je opgebruikt voelen zonder dat anderen het merken. Soms merk je dat je moeite hebt om "nee" te zeggen, zelfs als je grens bereikt is.',
    herstelAdvies: 'Neem bewust tijd voor jezelf zonder schuldgevoel. Vraag jezelf af wat jíj nodig hebt, los van wat anderen verwachten. Oefen met het stellen van grenzen in kleine, veilige situaties.',
    coachingTip: 'Maak elke week een lijst van drie dingen die jíj wilt, niet wat anderen van je vragen. Oefen met de zin: "Ik vind dit belangrijk voor mezelf." Je hoeft niet altijd de harmonie te bewaken.',
    werkOmgeving: 'Je gedijt in een omgeving met warme collegiale verhoudingen, teamwerk en ruimte voor persoonlijk contact. HR-rollen, coaching, onderwijs en zorgfuncties passen goed bij jou. Sterk competitieve of individualistische culturen kunnen je energie kosten.',
    relatieStijl: 'In relaties ben je warm, attent en zorgzaam. Je voelt snel aan wat de ander nodig heeft en stemt je daarop af. Je kunt soms te veel geven en te weinig ontvangen. Het helpt om bewust te communiceren wat jij nodig hebt en je partner te laten zorgen voor jou.',
  },
  {
    id: 'heart-listener',
    werkstijl: 'Je werkt het liefst vanuit een innerlijke overtuiging dat wat je doet ertoe doet en klopt met je waarden. Je hebt moeite met werk dat je als zinloos of onethisch ervaart. Je bent op je best als je authenticiteit kunt combineren met vakmanschap. Je hebt de neiging om hoge eisen te stellen aan de integriteit van je werk.',
    communicatie: 'Je communiceert authentiek en vanuit je hart. Je kiest je woorden op basis van wat je echt voelt en vindt. Je bent niet geneigd om dingen mooier te maken dan ze zijn. Je kunt soms gesloten overkomen voor mensen die je niet goed kennen. Het kan helpen om je innerlijke wereld vaker te delen.',
    leerstijl: 'Je leert het best als het onderwerp aansluit bij je waarden en interesses. Je hebt behoefte aan zingeving in wat je leert. Je profiteert van reflectie, journaling en gesprekken met mensen die je vertrouwt. Verplichte trainingen zonder persoonlijke relevantie kunnen je weerstand oproepen.',
    teamrol: 'In een team ben je het morele kompas en de bewaker van authenticiteit. Je helpt het team om trouw te blijven aan zijn waarden en niet mee te gaan in druk van buitenaf. Je hebt baat bij teamleden die je helpen om je waarden om te zetten in concrete actie.',
    motivatie: 'Je wordt gemotiveerd door zingeving, authenticiteit en het gevoel dat je trouw bent aan jezelf. Werk dat tegen je waarden ingaat of waarin je je moet voordoen als iemand anders kan je diep raken. Je floreert als je werk mag doen dat aansluit bij wie je bent.',
    stressSignalen: 'Onder druk kun je je terugtrekken en je afsluiten van anderen. Je kunt koppig worden in je standpunten en moeilijk bereikbaar zijn. Soms merk je dat je innerlijke onvrede hebt die je moeilijk kunt verwoorden.',
    herstelAdvies: 'Zoek creatieve uitlaatkleppen voor je gevoelens: schrijven, muziek, natuur of kunst. Praat over wat je dwarszit met iemand die oordeelvrij kan luisteren. Accepteer dat je niet altijd alles hoeft te voelen of te verwerken voordat je verder kunt.',
    coachingTip: 'Oefen met het vertalen van je gevoel naar woorden en daden. Vraag jezelf af: "Welke kleine stap kan ik nemen die past bij wat ik voel?" Wacht niet tot alles perfect aanvoelt; begin met wat goed genoeg is.',
    werkOmgeving: 'Je gedijt in een omgeving die authenticiteit waardeert, ruimte biedt voor persoonlijke expressie en ethisch handelt. Creatieve rollen, maatschappelijke organisaties en kleine teams passen goed bij jou. Grote bureaucratische organisaties waar je je als een nummer voelt kunnen je energie kosten.',
    relatieStijl: 'In relaties ben je diep, trouw en authentiek. Je zoekt verbinding op basis van gedeelde waarden en oprechtheid. Je kunt soms je gevoelens moeilijk uiten, wat de ander kan verwarren. Het helpt om regelmatig te checken: "Heb ik gezegd wat ik voel?" en de ander te laten weten wat er in je omgaat.',
  },
];

export function getArchetype(id: string): Archetype {
  const a = archetypes.find((a) => a.id === id);
  if (!a) throw new Error(`Unknown archetype: ${id}`);
  return a;
}

export function getArchetypeDetail(id: string): ArchetypeDetail {
  const d = archetypeDetails.find((d) => d.id === id);
  if (!d) throw new Error(`Unknown archetype detail: ${id}`);
  return d;
}
