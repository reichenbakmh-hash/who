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

