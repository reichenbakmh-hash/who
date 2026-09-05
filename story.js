const INTRO = {
  s1: [
    "Lily est morte lundi.",
    "Suicide, ils disent. Sa mère a pleuré, son père a serré les dents, tout le monde a hoché la tête. Moi j'ai rien dit.",
    "Parce que je la connaissais. Lily ne se serait jamais jetée. Lily avait peur du vide. Elle vérifiait toujours le fond de son verre avant de boire.",
    "Alors non. Je n'y crois pas. Mais j'ai la flemme d'expliquer aux gens."
  ],
  s2: [
    "Hier soir, j'ai pris mon téléphone pour commander à manger. Et j'ai vu ses comptes. Encore ouverts.",
    "Elle me l'avait emprunté, y a trois jours, pour checker un message. Elle était pressée, elle a rendu le tel sans se déconnecter.",
    "J'ai regardé l'écran cinq minutes.",
    "Mon pouce au-dessus de l'icône.",
    "Un geste et je rentre. Un geste et je trahis tout ce qu'on m'a appris sur le respect des morts.",
    "Je suis entrée."
  ],
  s3: [
    "Ses DM sont presque vides. Elle a tout supprimé. Les conversations, les vocaux, les photos. Des trous.",
    "Mais pas tout à fait tout.",
    "Y'a un message. Envoyé le jour même, à 13h47. Pas de destinataire. Un brouillon. Un seul mot :",
    "« Pardon. »",
    "Pardon à qui ? Pour quoi ?",
    "Juste en dessous, y'a une story archivée. Une photo floue d'une fenêtre. On voit une silhouette floue. Pas la sienne.",
    "Je l'ai jamais vue cette photo."
  ],
  s4: [
    "Plus je gratte, plus je me dis qu'elle a laissé tout ça ouvert exprès. Pour que quelqu'un vienne.",
    "Pour que je vienne.",
    "Et là, en bas de l'écran, le statut s'affiche.",
    "« Actif·ve il y a 2 minutes. »",
    "Je suis seule chez moi. Toute seule.",
    "Le compte est sur mon téléphone. Pas sur le sien.",
    "Alors qui ?"
  ],
  qui: "QUI ?",
  s5: [
    "Le téléphone vibre dans ma main. Une seule fois. Pas une notification. Pas un message. Juste une vibration. Comme si quelqu'un avait tapé du doigt sur l'écran de l'autre côté.",
    "Je le pose sur la table.",
    "Je recule ma chaise.",
    "La terreur me frappe. Non non non, c'est sans doute le manque de sommeil, me dis-je.",
    "Le bruit du bois sur le carrelage. Trop fort. J'ai sursauté pour un bruit de chaise. Je suis ridicule.",
    "Je le reprends.",
    "L'écran est toujours allumé. Le statut est passé de « Actif il y a 2 minutes » à « Actif à l'instant »."
  ],
  s6: [
    "Ma main tremble. Pas un frémissement. Un vrai tremblement, celui qui secoue l'épaule jusqu'à l'omoplate. Je pose mon autre main dessus pour le calmer. Je sens mes doigts glacés sur ma propre peau.",
    "J'ai peur..",
    "Ça va. C'est un bug.",
    "C'est son compte qui tourne en boucle parce qu'il est connecté sur deux appareils. Ça arrive. C'est technique.",
    "Je le sais. Je le crois. Pendant trois secondes."
  ],
  s7: [
    "— Lily ?",
    "J'ai dit ça tout haut. Je ne sais pas pourquoi. Dans le silence de mon appartement. Ma voix a buté sur son prénom, elle est sortie plus aiguë que prévu.",
    "Réponse.",
    "Aucune."
  ],
  s8: [
    "Je rouvre Messenger. La liste des conversations s'affiche. Tout est gris, vide, mort. Sauf une.",
    "Une nouvelle bulle. Pas un message. Juste une bulle de texte vide. Le petit rond gris qui indique que quelqu'un tape."
  ],
  s8b: ["Quelqu'un tape.", "Comment ça ?", "QUELQU'UN TAPE..."],
  s9: [
    "Je fixe l'écran. Mes yeux brûlent. Je ne cligne pas. Je ne respire plus. J'étouffe, j'ai le vertige.",
    "Trois petits points. Ils apparaissent. Disparaissent. Réapparaissent.",
    "Pendant dix secondes. Vingt. Trente. J'ai perdu le compte.",
    "J'ai la nausée. Pas métaphorique. La vraie. Celle qui remonte du ventre et pique le fond de la gorge. Mon cerveau hurle de poser ce téléphone, de l'éteindre, de le jeter contre le mur, j'ai peur j'ai envie de m'enfuir, pleurer.",
    "Mais mes doigts ne bougent pas.",
    "Les trois points disparaissent.",
    "Un message s'affiche.",
    "Pas un mot. Pas une phrase.",
    "Une photo."
  ],
  s10: [
    "C'est mon salon. Pris de l'extérieur. La fenêtre. Avec la lumière allumée. Et moi, assise à la table, le téléphone à la main, le dos voûté.",
    "Je relève la tête. En une seconde. Comme un animal apeuré.",
    "Le rideau bouge.",
    "Pas le vent. Les rideaux sont fermés. Mais celui de gauche, juste à côté de la poignée, il frémit sur quelques centimètres.",
    "Et j'entends un bruit.",
    "Devant ma porte d'entrée.",
    "Un grattement. Lent. Régulier. Comme une clé qu'on introduit dans la serrure, mais sans la tourner.",
    "Sur l'écran, le statut change une dernière fois.",
    "« Écrit un message... »"
  ],
  s11: [
    "Je veux poser le téléphone. Je veux me lever. Je veux courir. Je veux m'en aller. Je ne peux même pas appeler à l'aide ou sortir un son de ma bouche. La peur me fait perdre mes moyens.",
    "Mais l'écran s'éclaire.",
    "Un message. Juste une ligne."
  ],
  door: "La porte s'ouvre..."
};

const THREADS = [
  { id:"antoine", name:"Antoine", initial:"A", color:"#3b6e52", preview:"réponds stp", time:"lun.", status:null },
  { id:"lily", name:"Lily", initial:"L", color:"#6e3b48", preview:"Pardon.", time:"auj.", status:"ghost" }
];

const MSG_ANTOINE = [
  { from:"them", text:"t'as bien dormi cette nuit ? t'avais l'air bizarre hier", time:"12:03" },
  { from:"me", text:"oui oui, fatiguée c'est tout", time:"12:05" },
  { from:"them", text:"ok. dis-moi si un truc te tracasse", time:"12:06" },
  { from:"me", text:"promis", time:"12:06" },
  { from:"them", text:"je suis passé devant chez toi hier soir, j'ai vu de la lumière tard", time:"23:58" },
  { from:"them", text:"tu dormais pas ?", time:"23:59" },
  { from:"draft", text:"Antoine je crois que quelqu'un est venu chez moi cette nuit. Je sais que ça va paraître fou mais", time:"03:12 — jamais envoyé" },
  { from:"them", text:"Lily ? t'es là ?", time:"lun. 09:14" },
  { from:"them", text:"réponds stp", time:"lun. 09:15" },
  { from:"system", text:"Aucune réponse. Conversation figée depuis la veille de sa mort.", time:"" }
];

const MSG_LILY_GHOST_INITIAL = [
  { from:"draft", text:"Pardon.", time:"13:47 — le jour même" }
];

const GHOST_LINES = [
  "il sait.",
  "elle n'était pas seule.",
  "quelqu'un regarde.",
  "la porte n'était pas fermée.",
  "il est déjà entré.",
  "je ne suis plus seule dans cette maison.",
  "elle n'a jamais oublié de se déconnecter."
];

const INSTA_PROFILE = {
  handle:"lily.echoes", posts:47, followers:312, following:180,
  bio:"vivre doucement 🌿 rien ne va jamais vraiment vite"
};

const INSTA_POSTS = [
  {
    desc:"ciel gris, vue depuis sa fenêtre",
    caption:"personne ne dort bien en ce moment 🌙 #insomnie",
    likes:84, time:"6 j",
    comments:[
      {user:"antoine._", text:"tu réponds plus à mes messages"},
      {user:"julie_b", text:"ça va toi ?"}
    ]
  },
  {
    desc:"fenêtre éclairée de nuit — silhouette floue au second plan",
    caption:"j'étais seule ce soir-là. je le jure.",
    likes:12, time:"3 j — supprimée puis republiée",
    comments:[
      {user:"unknown.watcher02", text:"non"}
    ]
  },
  {
    desc:"reflet dans un miroir — une ombre en trop, dans le couloir derrière elle",
    caption:"je crois que je perds la tête",
    likes:6, time:"1 j",
    comments:[]
  }
];

const INSTA_STORY_DESC = "story archivée — photo floue d'une fenêtre, une silhouette dessus. Pas la sienne.";

const JOURNAL = [
  { date:"2 mars", text:"Rien de spécial aujourd'hui. Antoine est passé, on a regardé un film. Milo a dormi sur mes pieds toute la soirée." },
  { date:"12 mars", text:"Milo n'est pas rentré depuis deux jours. J'ai fait le tour du quartier, rien. Ce n'est pas son genre de s'éloigner." },
  { date:"15 mars", text:"J'ai retrouvé le collier de Milo devant ma porte ce matin. Propre. Posé, pas tombé. Quelqu'un l'a mis là, exprès, pour que je le voie." },
  { date:"17 mars", text:"Je n'arrive plus à dormir. J'entends des pas dans l'allée, toujours vers 2h. Antoine dit que j'invente. Peut-être. J'espère de toutes mes forces qu'il a raison." },
  { date:"19 mars", text:"Le mot de passe de mon vieux disque, c'est le nom de Milo. Je le note ici au cas où j'oublierais — je n'oublie jamais rien en ce moment, mais tout se brouille." },
  { date:"22 mars", text:"Antoine dit qu'il va rester dormir sur mon canapé quelques jours, pour me rassurer. Je ne sais pas si ça me rassure. Je ne sais plus qui a peur de qui." },
  { date:"24 mars", text:"Je n'écris plus ça pour me souvenir. J'écris ça pour qu'on retrouve quelque chose après. Si quelqu'un lit ceci —", glitch:true }
];

const PHOTOS = [
  { desc:"nous deux, l'été dernier", meta:"" },
  { desc:"Milo, collier rouge", meta:"disparu le 12 mars" },
  { desc:"silhouette floue près du portail", meta:"01:58 — la veille de sa mort" },
  { desc:"reflet, salle de bain", meta:"2 mars — une ombre dans le couloir, derrière elle. Ce n'est probablement rien." }
];

const BROUILLON_TEXT = "« Si quelqu'un lit ceci un jour : ne faites confiance à... »";
const BROUILLON_HINT = "Griffonné en bas, presque effacé : « le nom qu'elle criait dans la rue, en mars. »";

const PREUVES = {
  photoDesc:"un homme devant chez Lily, 23h47, la veille de sa mort — la veste, c'est celle qu'Antoine porte dans presque toutes ses stories.",
  audioTranscript:"« ...je sais que ça paraît dingue, mais j'ai peur d'Antoine. Il vient la nuit, je le sais, je l'ai vu par la fenêtre. Si jamais il m'arrive quelque chose... »",
  note:"Si je disparais : il vient la nuit. Il a un double de mes clés depuis l'an dernier. Personne ne me croit."
};

const ENDING = {
  vibrate:"Le téléphone vibre. Fort. Deux fois.",
  typing:"Lily est en train d'écrire...",
  photo:"Photo reçue — la porte de l'appartement, entrebâillée, vue depuis l'intérieur.",
  line1:"Le grattement à la porte n'a jamais vraiment cessé.",
  line2:"Message reçu — Antoine : « on se voit ce soir, comme d'habitude ? »",
  line3:"Aucune réponse n'a encore été envoyée."
};

/* =====================================================================
   COUCHE NARRATIVE — ESCALADE, JOURS, MÉMOIRE FRACTURÉE, FIN RÉVISÉE
   (tout ce qui suit s'ajoute au-dessus sans rien retirer)
===================================================================== */

/* ---------- Paliers de menace (paliers 1 à 4) ---------- */
/* Palier 1 = GHOST_LINES (déjà existant, laissé tel quel).
   Paliers 2 à 4 : messages fantômes plus explicites, adresse directe. */
const GHOST_LINES_T2 = [
  "je suis dans ta rue.",
  "j'ai vu ta lumière s'éteindre puis se rallumer.",
  "tu ne dors plus, hein.",
  "j'ai posé la main sur ta porte ce soir.",
  "continue de chercher. ça me plaît.",
  "elle te regarde à travers moi.",
  "tu sens le froid dans ton dos ?",
  "j'entends ta respiration d'ici."
];
const GHOST_LINES_T3 = [
  "tu as trouvé les preuves. bravo. maintenant arrête.",
  "je connais ton adresse depuis toujours.",
  "regarde par la fenêtre.",
  "je suis juste derrière la vitre.",
  "ferme ce dossier ou je viens le fermer moi-même.",
  "elle m'a supplié aussi, au début.",
  "tu trembles. je le sais sans te voir."
];
const GHOST_LINES_T4 = [
  "tu sais déjà qui je suis.",
  "arrête de me chercher dehors.",
  "regarde tes propres mains.",
  "je n'ai jamais quitté cette maison.",
  "pardon à qui, déjà ?",
  "on est seules toutes les deux, depuis le début.",
  "rejoins-la."
];

/* ---------- Monologues internes : l'envie d'arrêter, avant de continuer ---------- */
const INNER_MONOLOGUE = {
  2: [
    "Mon cœur cogne trop fort, trop vite, contre mes côtes. Je pourrais fermer l'appli. Éteindre le téléphone. Faire comme si j'avais jamais rien vu.",
    "Reposer le sujet. Laisser les gens croire au suicide. Laisser Lily reposer, en paix ou en morceaux, peu importe, du moment que j'arrête de trembler comme ça.",
    "Je pourrais. C'est facile. Il suffit de ne plus regarder l'écran.",
    "Mais mes doigts rouvrent déjà l'appli avant même que j'aie fini de me le dire.",
    "Je continue."
  ],
  3: [
    "Le téléphone tombe sur mes genoux, mes mains ne le tiennent plus. Je reste pliée en deux, à respirer par la bouche, l'air qui ne rentre pas assez vite.",
    "J'ai envie de tout supprimer. L'appli, le compte, les preuves, tout. Faire disparaître ce que j'ai trouvé, comme si ça pouvait faire disparaître ce que ça veut dire.",
    "Une part de moi voudrait juste dormir. Ne plus rien savoir. Redevenir celle qui, hier encore, croyait que c'était un suicide et rien d'autre.",
    "Mais je pense au fond de son verre, qu'elle vérifiait toujours. Je pense à ce mot, « Pardon », qui n'était adressé à personne. Ou à moi.",
    "Je ramasse le téléphone. Je rouvre le dossier."
  ],
  4: [
    "Il y a un homme mort maintenant. Un homme mort, une femme morte, et moi au milieu, qui ne comprends plus dans quel ordre les choses sont arrivées.",
    "Je voudrais courir. Sortir en pyjama et courir jusqu'à ce que mes poumons brûlent, jusqu'à ne plus penser à rien.",
    "Mais mes jambes ne bougent pas. Elles ne bougent jamais, dans ces moments-là. Comme si une partie de moi savait déjà qu'il n'y a nulle part où courir.",
    "Alors je reste assise, les genoux remontés contre la poitrine. Et je continue de chercher, parce que m'arrêter maintenant serait pire que de savoir."
  ]
};

/* ---------- Application "Portier" (caméra de l'entrée) — signes de présence ---------- */
const DOORBELL_EVENTS = [
  { tier:1, time:"02:47", desc:"Mouvement détecté. Un chat, probablement. On distingue à peine une forme basse qui traverse l'allée." },
  { tier:2, time:"03:10", desc:"Mouvement détecté. Une silhouette reste immobile près du portail pendant plus de quatre minutes, sans avancer." },
  { tier:3, time:"03:58", desc:"Mouvement détecté. La silhouette fixe directement la caméra. Elle ne bouge pas quand le flash infrarouge s'allume." },
  { tier:4, time:"04:12", desc:"Mouvement détecté à l'intérieur. Pas à la porte : dans le salon, filmé depuis un angle qui ne correspond à aucune caméra installée chez moi." }
];

/* ---------- Contenu débloqué jour par jour ---------- */
const DAY_TRANSITIONS = {
  2:"JOUR 2 — je n'ai pas dormi longtemps.",
  3:"JOUR 3 — les bruits ne s'arrêtent plus, même le jour.",
  4:"JOUR 4 — plus personne ne me répond.",
  5:"JOUR 5 — je crois que je touche le fond de tout ça."
};

const DAY_CONTENT = {
  2:{
    antoineMsgs:[
      { from:"them", text:"j'ai vu quelqu'un traîner devant chez toi hier soir, t'étais pas là ?", time:"mar. 08:40" },
      { from:"me", text:"si si. j'étais là. j'ai rien vu.", time:"mar. 08:44" }
    ],
    journal:{ date:"jour 2 — matin", author:"moi", text:"Des empreintes dans la terre meuble devant ma porte, ce matin. Je n'ai pas réussi à dire si elles partaient de chez moi ou si elles y menaient." },
    photo:{ desc:"empreintes de pas devant l'entrée", meta:"jour 2 — je n'ai pas vérifié le sens dans lequel elles allaient" }
  },
  3:{
    antoineMsgs:[
      { from:"them", text:"tu réponds plus, ça m'inquiète. je peux passer ce soir ?", time:"mer. 19:02" },
      { from:"me", text:"non. pas ce soir. je dois faire un truc, seule.", time:"mer. 19:10" }
    ],
    journal:{ date:"jour 3 — soir", author:"moi", text:"Je n'arrive plus à dire précisément ce que j'ai fait hier soir entre 23h et une heure du matin. Ce n'est sans doute rien. Je devais juste être fatiguée." },
    photo:{ desc:"la serrure de ma propre porte, rayée de l'intérieur", meta:"jour 3 — comme si quelqu'un l'avait forcée depuis chez moi" }
  },
  4:{
    antoineMsgs:[
      { from:"them", text:"je vais vérifier un truc chez toi ce soir, j'ai un mauvais pressentiment", time:"jeu. 22:15" },
      { from:"system", text:"Aucune réponse depuis. Dernière connexion affichée : jeu. 22:41.", time:"" }
    ],
    journal:{ date:"jour 4", author:"moi", text:"Je ne devrais pas me sentir soulagée. Mais depuis qu'Antoine ne répond plus, la maison me paraît presque calme. Je ne comprends pas pourquoi j'ai pensé ce mot : soulagée." }
  },
  5:{
    journal:{ date:"jour 5", author:"moi", text:"J'ai relu toutes mes notes dans l'ordre, cette nuit, une par une. Ce n'est plus une enquête. C'est un alibi que je me construis à moi-même, et il ne tient plus." }
  }
};

/* ---------- Découverte du cadavre (après déverrouillage des preuves) ---------- */
const CORPSE_DISCOVERY = {
  notif:"Alerte quartier : un corps a été retrouvé près du parc.",
  journal:{ date:"jour 4 — actualité locale", author:"article", text:"Le corps d'un homme a été découvert ce matin près du parc, non loin de son domicile. La police évoque une chute ou une agression, sans certitude. Un blouson militaire vert, déchiré à la manche, a été retrouvé à quelques mètres — le même modèle que celui identifié sur la photo prise devant chez Lily." },
  photo:{ desc:"coupure d'article — corps retrouvé près du parc", meta:"la veste décrite est identique à celle qu'Antoine portait dans presque toutes ses stories. Identique à la mienne aussi, achetée le même jour que la sienne, au même vide-dressing." }
};

/* ---------- Reconstitution finale : la chronologie qui se retourne ---------- */
/* Chaque item : ce qu'elle croyait comprendre, puis ce qui cloche quand elle recoupe. */
const CHRONOLOGIE = [
  {
    time:"13h47, le jour même",
    claim:"Je croyais que ce brouillon — « Pardon. » — avait été tapé par Lily, pour quelqu'un qu'elle n'osait pas nommer.",
    reveal:"Mais à 13h47 ce jour-là, c'est moi qui avais son téléphone dans la main. J'avais oublié. Ou j'avais préféré oublier."
  },
  {
    time:"le collier de Milo",
    claim:"Je croyais qu'on l'avait posé devant sa porte pour l'intimider, un avertissement laissé par un rôdeur.",
    reveal:"Le fermoir était cassé exactement comme le jour où c'est moi qui l'avais détaché du cou de Milo, des semaines plus tôt. Je n'ai aucun souvenir de l'avoir reposé là. Mais mes mains, elles, semblent s'en souvenir."
  },
  {
    time:"la veste sur la photo",
    claim:"Je croyais reconnaître la veste d'Antoine devant chez Lily, la veille de sa mort.",
    reveal:"On a acheté la même, toutes les deux, au même vide-dressing de janvier — Lily l'a même écrit une fois, en riant, dans une story. J'ai gardé la mienne au fond du placard depuis. Je ne l'ai plus revue depuis ce soir-là."
  },
  {
    time:"la voix sur le vocal",
    claim:"Je croyais entendre Lily dire qu'elle avait peur d'Antoine, qu'il venait la nuit.",
    reveal:"En réécoutant une troisième fois, au casque, il y a un souffle avant chaque phrase que je reconnais. C'est le mien. Ce n'est pas un vocal qu'elle m'a envoyé. C'est un vocal que je me suis envoyé à moi-même, et que j'ai classé dans son dossier."
  },
  {
    time:"le prénom à moitié effacé",
    claim:"Je croyais que le brouillon griffonné — « ne faites confiance à... » — désignait Antoine, ou un inconnu.",
    reveal:"Le prénom gratté au dos de la page, presque illisible, je le reconnais quand même. C'est le mien. C'est celui qu'elle criait dans la rue, en mars, en me demandant d'arrêter."
  }
];

/* ---------- Fragment de mémoire le plus lourd (débloqué en toute fin) ---------- */
const HEAVY_MEMORY_NOTE = {
  date:"23 mars — jamais montré à personne",
  author:"lily",
  locked:true,
  text:"Je n'écris pas ça pour qu'on me plaigne, je l'efface presque aussitôt de partout ailleurs. Cette nuit-là, dans ma chambre, j'ai dit non, plusieurs fois, et ça n'a pas suffi à faire s'arrêter ma meilleure amie. Elle dit que j'ai mal compris, que je dramatise. Je ne sais plus qui croire, même plus moi. Mais j'ai froid, maintenant, dès qu'elle me touche, et je n'ose le dire à personne d'autre qu'à cette page."
};

/* ---------- Fin révisée : implicite, aucune méthode décrite ---------- */
const ENDING2 = {
  vibrate:"Le téléphone vibre. Une fois. Doucement, cette fois.",
  calm:"Plus aucun grattement à la porte. Plus aucun pas dehors. Le silence est presque confortable.",
  line1:"Je rouvre la conversation avec Lily. Il n'y a plus rien à y trouver. Je le sais.",
  line2:"J'écris quand même. Lettre par lettre, sans trembler, pour la première fois depuis des jours.",
  draftText:"j'arrive.",
  line3:"Mon pouce reste au-dessus du bouton d'envoi. Longtemps.",
  line4:"Ma respiration ralentit, se fait plus large, plus lente, comme avant de plonger.",
  line5:"Je repose le téléphone sur la table, écran allumé, message non envoyé.",
  line6:"Je ne bouge plus.",
  line7:"…",
  screenOff:"Faute de mouvement, l'écran s'éteint tout seul."
};

/* ---------- Monologue final long : joué après le fade to black, musique dédiée ---------- */
/* Chaque bloc = une respiration. "clsList" applique un style ligne par ligne (ex: "quote" pour le discours direct). */
/* "reveal:true" sur un bloc déclenche un effet visuel/sonore appuyé sur sa dernière ligne. */
const FINAL_MONOLOGUE = [
  {
    lines:[
      "Je suis assise par terre. Le téléphone a glissé de ma main, écran fissuré, à quelques centimètres de moi.",
      "La porte est grande ouverte. Personne dans le couloir. Juste la lumière du palier qui clignote, et un courant d'air froid qui remonte le long de ma nuque.",
      "Je devrais avoir peur. Je devrais crier, courir, appeler quelqu'un.",
      "Mais je reste là, à regarder mes mains trembler. Ce n'est plus de la peur. C'est autre chose — quelque chose qui remonte d'avant, que mon corps semble mieux se rappeler que moi."
    ],
    pauses:[2800, 3400, 2600, 3800],
    breathe:2600
  },
  {
    lines:[
      "Je revois Lily. Pas celle du cercueil. Celle d'avant — celle qui riait en me traitant d'idiote, qui me poussait l'épaule pour rigoler.",
      "Et puis Lily qui n'a plus ri du tout. Qui a reculé d'un pas, sans un mot.",
      "Il y a un moment, entre ces deux images, que je n'arrive pas à regarder en face. Un moment que ma mémoire a rangé quelque part et fermé à clé.",
      "« T'es sérieuse ? »",
      "Sa voix a craqué sur ce mot-là. Ça, je m'en souviens. Le reste est flou, comme une photo bougée."
    ],
    clsList:[null,null,null,'quote',null],
    pauses:[3000, 2400, 3400, 2800, 3400],
    breathe:2400
  },
  {
    lines:[
      "Je me souviens de mains qui essaient de repousser quelque chose. Les miennes ? Les siennes ? Je ne sais plus, dans ce souvenir, à qui elles appartiennent.",
      "Elle a pleuré sans bruit. Pas de sanglots — juste des larmes, comme si elle avait déjà accepté quelque chose que je refuse encore de nommer.",
      "« Pourquoi ? »",
      "Un mot soufflé plus qu'il n'a été dit. Je n'ai pas de réponse. Je n'en ai jamais eu."
    ],
    clsList:[null,null,'quote',null],
    pauses:[3400, 3200, 2800, 3600],
    breathe:2800
  },
  {
    lines:[
      "Elle est montée sur le toit. Ou c'est moi. Le souvenir se dédouble, se superpose, comme deux photos prises au même endroit à des années d'écart.",
      "Le vent. Le bord. Quelqu'un qui sourit — pas d'un sourire heureux. Un sourire fini.",
      "« On n'en parle pas. Ça n'a jamais eu lieu. »",
      "Je tends la main. Ou c'est elle qui la tend vers moi. Je ne sais plus, dans ce souvenir, laquelle des deux était censée retenir l'autre.",
      "« Je t'aimais. »",
      "Un pas en arrière. Le vide qui accueille, patient, comme s'il attendait ça depuis le début."
    ],
    clsList:[null,null,'quote',null,'quote',null],
    pauses:[3200, 3000, 3200, 3400, 2800, 4000],
    breathe:3000
  },
  {
    lines:[
      "Le téléphone vibre encore contre le sol. Je le ramasse. L'écran est fendu, mais le message est lisible.",
      "« Il n'y a jamais eu personne d'autre. »",
      "Je regarde mes mains. La porte ouverte. Le vide du couloir.",
      "Je ne sais pas ce que ça veut dire. Ou je le sais, et je n'ai simplement plus la force de me le dire avec des mots."
    ],
    clsList:[null,'quote',null,null],
    pauses:[3000, 3400, 2800, 4200],
    breathe:3000,
    reveal:true
  },
  {
    lines:[
      "Je me relève. Lentement. Comme si mon corps avait déjà pris une décision que ma tête découvre seulement maintenant.",
      "Je marche vers la fenêtre. L'air froid touche mon visage avant même que je l'ouvre.",
      "Le vide, en bas, ne me fait plus peur. C'est presque un soulagement, de ne plus avoir à choisir entre me souvenir et oublier.",
      "Quelque part, j'espère qu'elle m'attend.",
      "L'écran du téléphone s'éteint tout seul, dans le noir de la pièce."
    ],
    pauses:[3200, 3000, 3800, 3400, 4000],
    breathe:2000
  }
];

