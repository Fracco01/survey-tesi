/**
 * DOMANDE — Database completo di tutti i profili
 * Profili: adolescenti, genitori, insegnanti, psicologi, studenti, lavoratori, educatori
 * Le categorie mancanti (studenti, lavoratori, educatori) sono inventate coerentemente
 */

module.exports = {

  // ─── PROFILO: ADOLESCENTI ─────────────────────
  adolescenti: [
    {
      id: 'a1',
      text: 'Ti capita di sentirti sotto pressione per apparire in un certo modo?',
      options: ['Spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 'a2',
      text: 'I social influenzano le tue scelte (moda, gusti, idee)?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'a3',
      text: 'Ritieni di usare i social in modo consapevole?',
      options: ['Sì', 'In parte', 'No']
    },
    {
      id: 'a4',
      text: 'Ti informi tramite i social e verifichi le fonti?',
      options: ['Sempre', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 'a5',
      text: 'I social influenzano la tua autostima?',
      options: ['Sì', 'No', 'Non so']
    },
    {
      id: 'a6',
      text: 'Pensi di passare troppo tempo online?',
      options: ['Sì', 'No', 'Non so']
    },
    {
      id: 'a7',
      text: 'I social contribuiscono a definire la tua identità?',
      options: ['Molto', 'In parte', 'Poco', 'Per niente']
    },
    {
      id: 'a8',
      text: 'Ritieni che i social favoriscano relazioni autentiche?',
      options: ['Sì', 'No', 'Dipende']
    },
    {
      id: 'a9',
      text: 'I social amplificano le insicurezze adolescenziali?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'a10',
      text: 'Pensi che l\'algoritmo influenzi ciò che pensi?',
      options: ['Sì', 'In parte', 'No', 'Non lo so']
    },
    {
      id: 'a11',
      text: 'I social riducono la capacità di attenzione?',
      options: ['Sì', 'No', 'Dipende']
    },
    {
      id: 'a12',
      text: 'È possibile educare a un uso sano dei social?',
      options: ['Sì', 'No', 'Solo in parte']
    },
    {
      id: 'a13',
      text: 'I social sostituiscono esperienze reali?',
      options: ['Sì', 'No', 'Dipende']
    },
    {
      id: 'a14',
      text: 'I social creano più opportunità o più problemi?',
      options: ['Opportunità', 'Problemi', 'Entrambi']
    },
    {
      id: 'a15',
      text: 'Immagini un futuro senza social?',
      options: ['Sì', 'No', 'Sì, con grandi cambiamenti']
    },
  ],

  // ─── PROFILO: GENITORI ────────────────────────
  genitori: [
    {
      id: 'g1',
      text: 'Rapporto con i social media come genitore:',
      options: ['Li uso quotidianamente', 'Li uso saltuariamente', 'Non li uso']
    },
    {
      id: 'g2',
      text: 'Quanto tempo trascorre mediamente suo/a figlio/a sui social in un giorno?',
      options: ['Meno di 1 ora', '1–2 ore', '2–4 ore', 'Più di 4 ore', 'Non so']
    },
    {
      id: 'g3',
      text: 'A che età ha iniziato a usare i social media?',
      options: ['Prima degli 11 anni', '11–12 anni', '13–14 anni', '15 anni o più', 'Non ricordo']
    },
    {
      id: 'g4',
      text: 'Come percepisce il rapporto di suo/a figlio/a con la pubblicazione di contenuti?',
      options: ['Serio e consapevole', 'Un po\' impulsivo', 'Indifferente', 'Non so']
    },
    {
      id: 'g5',
      text: 'Ha notato che suo/a figlio/a si confronta con gli altri sui social?',
      options: ['Spesso', 'Qualche volta', 'Raramente', 'Mai', 'Non so']
    },
    {
      id: 'g6',
      text: 'Sa se il profilo di suo/a figlio/a è impostato come:',
      options: ['Pubblico', 'Privato', 'Non lo so']
    },
    {
      id: 'g7',
      text: 'Sa se suo/a figlio/a parla online con persone che non conosce dal vivo?',
      options: ['Sì', 'No', 'Non so']
    },
    {
      id: 'g8',
      text: 'Ritiene che suo/a figlio/a sappia come segnalare o bloccare utenti molesti?',
      options: ['Sì', 'No', 'Non sono sicuro/a']
    },
    {
      id: 'g9',
      text: 'Ha mai saputo di episodi che hanno messo a disagio suo/a figlio/a sui social?',
      options: ['Sì', 'No', 'Preferisco non rispondere']
    },
    {
      id: 'g10',
      text: 'Dopo l\'uso dei social, come le sembra che suo/a figlio/a si senta?',
      options: ['Bene / rilassato', 'Neutro', 'Stressato / agitato', 'Dipende dal giorno', 'Non so']
    },
    {
      id: 'g11',
      text: 'Le sembra che perda la percezione del tempo mentre è sui social?',
      options: ['Spesso', 'Qualche volta', 'Raramente', 'Mai', 'Non so']
    },
    {
      id: 'g12',
      text: 'Ha mai proposto o incoraggiato una pausa dai social?',
      options: ['Sì, e ha funzionato', 'Sì, ma non ha cambiato molto', 'No, ma vorrei farlo', 'No, non lo ritengo necessario']
    },
    {
      id: 'g13',
      text: 'Ritiene che i social abbiano un impatto sulla salute mentale degli adolescenti?',
      options: ['Molto negativo', 'Abbastanza negativo', 'Neutro', 'Positivo', 'Non so']
    },
    {
      id: 'g14',
      text: 'Monitora l\'attività online di suo/a figlio/a?',
      options: ['Sì, regolarmente', 'Qualche volta', 'Raramente', 'No, rispetto la privacy']
    },
    {
      id: 'g15',
      text: 'Ritiene necessaria un\'educazione digitale formale a scuola?',
      options: ['Sì, assolutamente', 'Sì, in parte', 'Non necessariamente', 'No']
    },
  ],

  // ─── PROFILO: INSEGNANTI ──────────────────────
  insegnanti: [
    {
      id: 'i1',
      text: 'Anni di esperienza nella scuola secondaria:',
      options: ['0–5', '6–10', '11–20', 'Oltre 20']
    },
    {
      id: 'i2',
      text: 'Quanto ritiene che i suoi studenti utilizzino i social media quotidianamente?',
      options: ['Poco', 'Moderatamente', 'Molto', 'Non so']
    },
    {
      id: 'i3',
      text: 'In che misura l\'uso dei social influisce sull\'attenzione o sul rendimento scolastico?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente', 'Non so']
    },
    {
      id: 'i4',
      text: 'Ha notato episodi legati ai social che influenzano la vita scolastica?',
      options: ['Sì, frequentemente', 'Sì, occasionalmente', 'Raramente', 'Mai']
    },
    {
      id: 'i5',
      text: 'Gli studenti parlano apertamente del loro uso dei social?',
      options: ['Sì, spesso', 'Qualche volta', 'Raramente', 'Mai']
    },
    {
      id: 'i6',
      text: 'Ha notato cambiamenti emotivi o comportamentali legati ai social?',
      options: ['Sì', 'No', 'Non so']
    },
    {
      id: 'i7',
      text: 'Ritiene che gli studenti abbiano competenze adeguate per un uso sicuro dei social?',
      options: ['Sì', 'Parzialmente', 'No', 'Non so']
    },
    {
      id: 'i8',
      text: 'Gli studenti sanno come segnalare o bloccare contenuti o utenti problematici?',
      options: ['Sì', 'Parzialmente', 'No', 'Non so']
    },
    {
      id: 'i9',
      text: 'Ha mai gestito situazioni problematiche legate ai social?',
      options: ['Sì, più volte', 'Sì, una volta', 'No']
    },
    {
      id: 'i10',
      text: 'Come percepisce l\'impatto dei social sul benessere emotivo degli studenti?',
      options: ['Positivo', 'Neutro', 'Negativo', 'Variabile', 'Non so']
    },
    {
      id: 'i11',
      text: 'Gli studenti mostrano difficoltà a limitare il tempo sui social?',
      options: ['Sì, spesso', 'Qualche volta', 'Raramente', 'Mai', 'Non so']
    },
    {
      id: 'i12',
      text: 'Ha mai proposto attività o discussioni sull\'uso consapevole dei social?',
      options: ['Sì, regolarmente', 'Sì, occasionalmente', 'No, ma vorrei farlo', 'No']
    },
    {
      id: 'i13',
      text: 'I social media influenzano le dinamiche relazionali in classe?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'i14',
      text: 'Ritiene che i social possano essere utilizzati come strumento didattico?',
      options: ['Sì, con supervisione', 'Sì, liberamente', 'No', 'Non so']
    },
    {
      id: 'i15',
      text: 'Ritiene utile introdurre un\'ora settimanale di educazione digitale?',
      options: ['Sì, assolutamente', 'Sì, in parte', 'Non prioritario', 'No']
    },
  ],

  // ─── PROFILO: PSICOLOGI ───────────────────────
  psicologi: [
    {
      id: 'p1',
      text: 'Anni di esperienza con adolescenti:',
      options: ['0–5', '6–10', '11–20', 'Oltre 20']
    },
    {
      id: 'p2',
      text: 'Quanto ritiene che gli adolescenti che segue utilizzino i social media quotidianamente?',
      options: ['Poco', 'Moderatamente', 'Molto', 'Variabile', 'Non so']
    },
    {
      id: 'p3',
      text: 'In che misura l\'uso dei social influisce sul funzionamento quotidiano degli adolescenti?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente', 'Variabile']
    },
    {
      id: 'p4',
      text: 'Ha riscontrato nei ragazzi effetti emotivi legati all\'uso dei social?',
      options: ['Frequenti', 'Occasionali', 'Rari', 'Mai']
    },
    {
      id: 'p5',
      text: 'Ha osservato comportamenti problematici correlati ai social?',
      options: ['Sì, frequentemente', 'Sì, occasionalmente', 'Raramente', 'No']
    },
    {
      id: 'p6',
      text: 'In che misura i social influenzano la percezione di sé negli adolescenti?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente', 'Variabile']
    },
    {
      id: 'p7',
      text: 'Gli adolescenti mostrano consapevolezza dei rischi online?',
      options: ['Sì', 'Parzialmente', 'No', 'Variabile']
    },
    {
      id: 'p8',
      text: 'Sanno come proteggersi (privacy, blocco utenti, segnalazioni)?',
      options: ['Sì', 'Parzialmente', 'No', 'Variabile']
    },
    {
      id: 'p9',
      text: 'Ha mai affrontato in seduta situazioni problematiche legate ai social?',
      options: ['Sì, spesso', 'Qualche volta', 'Raramente', 'No']
    },
    {
      id: 'p10',
      text: 'Come valuta l\'impatto complessivo dei social sul benessere degli adolescenti?',
      options: ['Positivo', 'Neutro', 'Negativo', 'Ambivalente', 'Variabile']
    },
    {
      id: 'p11',
      text: 'Gli adolescenti mostrano difficoltà a limitare il tempo sui social?',
      options: ['Sì, spesso', 'Qualche volta', 'Raramente', 'Mai']
    },
    {
      id: 'p12',
      text: 'Ritiene utile proporre percorsi di educazione digitale?',
      options: ['Sì, assolutamente', 'Sì, in parte', 'Non particolarmente', 'Non necessari']
    },
    {
      id: 'p13',
      text: 'I social media hanno cambiato la natura dei problemi portati in seduta negli ultimi anni?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Non lo noto']
    },
    {
      id: 'p14',
      text: 'Ritiene che i genitori siano sufficientemente consapevoli dei rischi dei social per i figli?',
      options: ['Sì', 'In parte', 'No', 'Variabile']
    },
    {
      id: 'p15',
      text: 'Qual è il principale effetto psicologico che osserva nei giovani legato ai social?',
      options: ['Ansia da prestazione', 'Dipendenza digitale', 'Bassa autostima', 'Isolamento sociale', 'Confronto sociale patologico']
    },
  ],

  // ─── PROFILO: STUDENTI UNIVERSITARI ──────────
  // (inventato coerentemente con il tema)
  studenti: [
    {
      id: 's1',
      text: 'Quante ore al giorno trascorri sui social media?',
      options: ['Meno di 1 ora', '1–2 ore', '2–4 ore', 'Più di 4 ore']
    },
    {
      id: 's2',
      text: 'I social media influenzano la tua produttività nello studio?',
      options: ['Molto negativamente', 'Abbastanza negativamente', 'Poco', 'Non influenzano', 'Positivamente']
    },
    {
      id: 's3',
      text: 'Usi i social per trovare contenuti legati allo studio?',
      options: ['Spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 's4',
      text: 'Ti sei mai sentito ansioso per non ricevere abbastanza interazioni (like, commenti)?',
      options: ['Spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 's5',
      text: 'Confronti la tua vita universitaria con quella degli altri sui social?',
      options: ['Spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 's6',
      text: 'I social ti hanno aiutato a costruire relazioni universitarie?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 's7',
      text: 'Senti che i social ti offrono opportunità professionali (networking, lavoro)?',
      options: ['Sì, molte', 'Qualcuna', 'Poche', 'Nessuna']
    },
    {
      id: 's8',
      text: 'Hai mai vissuto episodi di cyberbullismo o comportamenti ostili online?',
      options: ['Sì, più volte', 'Sì, una volta', 'No, ma ne sono testimone', 'No']
    },
    {
      id: 's9',
      text: 'I social influenzano le tue opinioni politiche e sociali?',
      options: ['Molto', 'In parte', 'Poco', 'Per niente']
    },
    {
      id: 's10',
      text: 'Ti senti in grado di distinguere le notizie false da quelle vere sui social?',
      options: ['Sempre', 'Quasi sempre', 'A volte', 'Raramente']
    },
    {
      id: 's11',
      text: 'Hai mai fatto una pausa volontaria dai social?',
      options: ['Sì, più volte', 'Sì, una volta', 'No, ma ci ho pensato', 'No, non ne sento il bisogno']
    },
    {
      id: 's12',
      text: 'I social media ti fanno sentire più connesso o più solo?',
      options: ['Più connesso', 'Più solo', 'Dipende', 'Nessun effetto']
    },
    {
      id: 's13',
      text: 'Pubblichi contenuti della tua vita universitaria sui social?',
      options: ['Spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 's14',
      text: 'Ritieni che l\'università dovrebbe insegnare un uso critico dei social?',
      options: ['Sì, assolutamente', 'Sarebbe utile', 'Non necessario', 'No']
    },
    {
      id: 's15',
      text: 'In che modo i social hanno influenzato la tua autostima negli anni universitari?',
      options: ['Positivamente', 'Negativamente', 'Non l\'hanno influenzata', 'In modo ambivalente']
    },
  ],

  // ─── PROFILO: LAVORATORI ─────────────────────
  // (inventato coerentemente)
  lavoratori: [
    {
      id: 'l1',
      text: 'In che fascia d\'età rientra?',
      options: ['25–34', '35–44', '45–54', '55 o più']
    },
    {
      id: 'l2',
      text: 'Usa i social media per scopi professionali?',
      options: ['Sì, principalmente', 'Sì, in parte', 'No, solo personali', 'Non uso i social']
    },
    {
      id: 'l3',
      text: 'Quanto tempo dedica ai social nel tempo libero?',
      options: ['Meno di 30 min', '30–60 min', '1–2 ore', 'Più di 2 ore']
    },
    {
      id: 'l4',
      text: 'Ritiene che i social abbiano cambiato le relazioni interpersonali nel contesto lavorativo?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'l5',
      text: 'Osservando i colleghi giovani, ritiene che i social influenzino il loro rendimento lavorativo?',
      options: ['Negativamente', 'Positivamente', 'In modo neutro', 'Non lo noto']
    },
    {
      id: 'l6',
      text: 'Ha mai vissuto tensioni lavorative causate da post o comportamenti sui social?',
      options: ['Sì, più volte', 'Sì, una volta', 'No, ma ne sono testimone', 'No']
    },
    {
      id: 'l7',
      text: 'I social le hanno mai creato problemi nella sfera privata?',
      options: ['Sì', 'No', 'In parte']
    },
    {
      id: 'l8',
      text: 'Come percepisce l\'uso dei social da parte degli adolescenti di oggi?',
      options: ['Preoccupante', 'Normale per la loro età', 'Opportunità di crescita', 'Non ho un\'opinione']
    },
    {
      id: 'l9',
      text: 'Pensa che le aziende dovrebbero regolamentare i social dei dipendenti?',
      options: ['Sì, in modo rigido', 'Sì, con linee guida leggere', 'No', 'Non so']
    },
    {
      id: 'l10',
      text: 'I social hanno influenzato le sue scelte di consumo (acquisti, servizi)?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'l11',
      text: 'Ritiene che gli adolescenti di oggi siano più vulnerabili ai rischi online rispetto alla sua generazione?',
      options: ['Sì, molto di più', 'Sì, un po\' di più', 'No, è simile', 'No, sono più preparati']
    },
    {
      id: 'l12',
      text: 'Ha figli adolescenti? Se sì, monitora il loro uso dei social?',
      options: ['Sì ho figli, e monitoro', 'Sì ho figli, non monitoro', 'Non ho figli adolescenti']
    },
    {
      id: 'l13',
      text: 'Pensa che i social media siano uno strumento democratico o di controllo?',
      options: ['Democratico', 'Di controllo', 'Entrambi', 'Nessuno dei due']
    },
    {
      id: 'l14',
      text: 'Come valuta l\'impatto complessivo dei social sulla società?',
      options: ['Molto positivo', 'Abbastanza positivo', 'Neutro', 'Abbastanza negativo', 'Molto negativo']
    },
    {
      id: 'l15',
      text: 'Ritiene necessaria una legislazione più severa sulle piattaforme social per tutelare i minori?',
      options: ['Sì, urgentemente', 'Sì, gradualmente', 'Non necessaria', 'No']
    },
  ],

  // ─── PROFILO: EDUCATORI ───────────────────────
  // (inventato coerentemente)
  educatori: [
    {
      id: 'e1',
      text: 'In quale contesto opera principalmente?',
      options: ['Centro educativo / doposcuola', 'Comunità / casa famiglia', 'Associazione giovanile', 'Altro']
    },
    {
      id: 'e2',
      text: 'Anni di esperienza con adolescenti:',
      options: ['0–3', '4–7', '8–15', 'Oltre 15']
    },
    {
      id: 'e3',
      text: 'I ragazzi che segue parlano spontaneamente dei social con lei?',
      options: ['Sì, spesso', 'A volte', 'Raramente', 'Mai']
    },
    {
      id: 'e4',
      text: 'Ha notato che i social influenzano le dinamiche del gruppo?',
      options: ['Molto', 'Abbastanza', 'Poco', 'Per niente']
    },
    {
      id: 'e5',
      text: 'Ha mai gestito situazioni di disagio legate ai social (cyberbullismo, dipendenza)?',
      options: ['Sì, più volte', 'Sì, una volta', 'No, ma conosco casi', 'No']
    },
    {
      id: 'e6',
      text: 'Ritiene che i social favoriscano o ostacolino il lavoro educativo?',
      options: ['Favoriscono', 'Ostacolano', 'Entrambi', 'Non influenzano']
    },
    {
      id: 'e7',
      text: 'I ragazzi che segue hanno una buona consapevolezza dei rischi online?',
      options: ['Sì', 'Parzialmente', 'No', 'Varia molto da ragazzo a ragazzo']
    },
    {
      id: 'e8',
      text: 'Ha mai proposto attività di media literacy o educazione digitale?',
      options: ['Sì, regolarmente', 'Sì, qualche volta', 'No, ma vorrei', 'No']
    },
    {
      id: 'e9',
      text: 'I social influenzano il modo in cui i ragazzi si relazionano con le figure adulte?',
      options: ['Sì, li allontana', 'Sì, ma in modo neutro', 'No', 'Non so']
    },
    {
      id: 'e10',
      text: 'Come percepisce il ruolo dei social nella costruzione dell\'identità adolescenziale?',
      options: ['Molto rilevante', 'Abbastanza rilevante', 'Poco rilevante', 'Irrilevante']
    },
    {
      id: 'e11',
      text: 'I genitori dei ragazzi che segue sembrano consapevoli dei rischi dei social?',
      options: ['Sì, la maggior parte', 'Solo alcuni', 'Pochi', 'Quasi nessuno']
    },
    {
      id: 'e12',
      text: 'Ritiene che le piattaforme social debbano avere maggiori responsabilità verso i minori?',
      options: ['Sì, assolutamente', 'Sì, in parte', 'Non necessariamente', 'No']
    },
    {
      id: 'e13',
      text: 'Osserva differenze nell\'uso dei social tra ragazzi di diversa estrazione sociale?',
      options: ['Sì, molto', 'Qualche differenza', 'Poca differenza', 'Nessuna differenza']
    },
    {
      id: 'e14',
      text: 'I social possono essere uno strumento di supporto nel lavoro educativo?',
      options: ['Sì, molto utile', 'Sì, con limiti', 'Difficilmente', 'No']
    },
    {
      id: 'e15',
      text: 'Qual è la principale difficoltà che osserva nei ragazzi legata ai social?',
      options: ['Dipendenza', 'Confronto sociale', 'Disinformazione', 'Cyberbullismo', 'Perdita di tempo']
    },
  ],
};
