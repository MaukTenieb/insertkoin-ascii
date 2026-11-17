# Jury d'agences, passage 5 : direction UX

Angle : ergonomie, architecture d'information, heuristiques de Nielsen, charge cognitive, accessibilité WCAG 2.2, clarté des commandes dans un univers initiatique et peu indicatif.
Corpus : les 105 captures (35 écrans × bureau 1440×900, téléphone 390×844, paysage 844×390), toutes regardées une fois au moins. Les écrans de bureau sont lus un par un, en pleine résolution. Les écrans de téléphone sont lus par planches de trois et ceux en paysage par planches de deux, sans réduction.
Choix de l'auteur jugés comme tels : listing « Index of », wiki crème, « Truce/↑héé↑è↑e », guide qui marche, zéro texte explicatif, pictogrammes muets. Je juge la clarté des commandes, pas la quantité de texte.
Limite : sur les captures, je ne vois ni le focus clavier, ni la loupe (Alt / appui long), ni le téléprompteur en mouvement. Une coupure vue sur une case à téléprompteur est notée comme un instantané, sans sanction.

---

## 1. Notes

| | Note |
|---|---|
| Angle UX / ergonomie / accessibilité | **6,2 / 10** |
| Note globale (ce que je vois du site entier) | **6,8 / 10** |

Nielsen (0–4, mode Experience, H7 et H10 hors sujet) :

| # | Heuristique | A | Passage 5 | Constat |
|---|---|---|---|---|
| 1 | Visibilité de l'état | 2 | 2 | Compteur de Koins partout, date républicaine, piste en cours. Le HUD de FaunInvaders reste illisible (bureau, téléphone, paysage). Télé : la LED affiche 01 et l'écran CH 02. Sur téléphone, la pièce qui tourne se fige en tranche et le compteur se lit « \| 3 », presque « 13 ». |
| 2 | Correspondance avec le monde | 3 | 3 | Métaphores d'époque justes : Minitel, télécommande de DVD, CDE, magnétoscope, Apache. |
| 3 | Contrôle et liberté | 2 | 3 | La cartouche rouge sort de partout, à la même place (coin bas gauche) hors borne : net progrès. Elle ne recouvre plus Reporhogo ni X1. En revanche, elle recouvre maintenant le contenu sur téléphone et en paysage. |
| 4 | Cohérence et standards | 2 | 2 | Deux barres de commande (borne, Kave) de tailles, de matières et de compteurs différents. Le porte-clés est présent sur certaines pages, absent sur d'autres. Le titre de Reporhogo prend deux formes (pixel sur la borne, condensée en dégradé sur la page). |
| 5 | Prévention des erreurs | 2 | 2 | Le guide et ses bulles se posent sur les plaques de navigation : un pouce qui vise KORHOGAME touche le guide. Les libellés de difficulté de Konnect4 font 4 à 6 px sur téléphone. |
| 6 | Reconnaissance plutôt que rappel | 2 | 2 | Barre de pictos stable : bien. Les huit points de pagination restent muets ; BC / TL / IG relèvent du choix initiatique. |
| 8 | Esthétique et minimalisme | 2 | 3 | Les titres de jeux sont réécrits nets dans la grille (Erratik, Fauna Chess, FaunInvaders, KATABATIK) et le bandeau BURROWS passe en ASCII. Il reste de grands vides (Akasztófa bureau, FaunInvaders paysage, télé portrait). |
| 9 | Récupération après erreur | 3 | 3 | 404 TILT dans le monde, sortie nette. Figlet « $$ » inchangé, en police système. |
| **Total** | | **18/32** | **20/32** | **Bon-moins (62 %)** |

Charge cognitive (8 critères) : 2 échecs et 1 échec partiel, comme dans A. Choix limités : accueil téléphone = 3 boutons + 4 plaques + 7 pictos + guide + bulle. Mémoire de travail : pagination muette. Foyer unique : sur l'accueil, le guide et sa bulle prennent la place d'un foyer concurrent, posé sur les commandes.

### Notes par écran (angle UX, moyenne des trois formats)

| Écran | d | m | l | Défaut UX dominant |
|---|---|---|---|---|
| home / fr | 6 | 6 | 6 | Meuble sous le pli sur bureau ; guide sur les plaques (m, l) ; néon éteint illisible (m) |
| BURROWS | 6 | 5 | 5 | Bulle sur FAUNEYE et 3615 (m) ; guide sur KORHOGAME (l) |
| LoreLore | 3 | 6 | 5 | Bande noire de 45 % en haut (d) ; bulle coupée en haut (l) |
| MAUK_TENIEB | 6 | 6 | 5 | Guide sur SURFAUNA (d) et sur 3615 (l), bulle LORE sur le bas du meuble (l) |
| 3615 | 7 | 8 | 6 | Touches de 6 px (d) ; CONNECT / END coupé (l) |
| Bakubook | 7 | 6 | 4 | Onglets coupés sans signe de défilement (m) ; zone de lecture écrasée à environ 60 px (l) |
| Kamorhogo | 8 | 7 | 7 | Panneau de commande coupé en bas (m), en haut (l) |
| Musik | 5 | 5 | 7 | Deux icônes d'image cassée en tête de grille (d, m) |
| VHS | 7 | 6 | 8 | Loupe de recherche de 6 px (d, m) ; rangée de tri qui déborde (m) |
| Akasztófa | 5 | 8 | 8 | Composition décentrée, moitié droite vide (d) |
| Erratik | 8 | 8 | 8 | — |
| Faunarratik | 7 | 6 | 8 | Première ligne rognée (m) |
| Fauna Chess | 8 | 8 | 8 | — |
| FaunInvaders | 4 | 3 | 2 | HUD illisible ; aucune commande tactile visible (m) ; plateau de 180 px de large (l) |
| Konnect4 | 6 | 3 | 2 | Easy / Medium / Hard à 4–6 px (m, l) ; plateau de 170 px (l) ; doublon dés / libellés |
| Korong | 8 | 6 | 6 | Grands vides haut et bas (m) ; KOMPETE! collé au bord gauche (l) |
| Maskermind | 6 | 7 | 7 | Colonne gauche vide (d) ; ligne de retour 0 / 2 / 2 sans clé de lecture |
| FaunaTor (borne) | 8 | 5 | 8 | Placeholder coupé à « KEYWOR » (m) |
| Reporhogo (borne) | 7 | 6 | 6 | COPY isolé sur sa ligne ; liste coupée sans signe de suite |
| bio | 7 | 5 | 6 | Cartouche sur le texte (m, l) ; liens bleu navigateur |
| Aube | 6 | 5 | 6 | Cartouche sur APPEARANCE (m) ; « N° 09 » en sur-titre ; émojis |
| fotofauna | 7 | 6 | 6 | Cartouche sur le cadre ; pellicule coupée (m, l) |
| Index of | — | — | — | Choix de l'auteur |
| DVD | 7 | 3 | 6 | Langues à 6–7 px, cibles minuscules (m) |
| KorhogOS | 7 | 5 | 5 | Panneau CDE coupé à droite (m) et des deux côtés (l) ; guide sur l'icône FaunEye ; bulle sur 3615 |
| Télé | 6 | 4 | 4 | Grille à 6 px (m, l) ; LED 01 contre CH 02 ; grand vide sous l'écran (m) |
| Video Kave | 9 | 8 | 8 | — |
| Wiki | 7 | 5 | 6 | Porte-clés sur le titre (m, l) ; texte qui passe sous la barre ; Koins à 9 px |
| kuration | 6 | 6 | 6 | « · · » doublé ; « 0 cassette » sans objet |
| notes | 7 | 6 | 7 | Cartouche sur le lien de pied de page (m) |
| reporhogo.html | 6 | 5 | 5 | Cartouche sur la tuile Codeberg (l) et Launchpad (m) ; titre en dégradé |
| skoporhogo | 8 | 6 | 7 | Cartouche sur un avatar (m, l) |
| tor.html | 6 | 5 | 6 | Porte-clés sur le logo FaunaTor (d, m, l) |
| 404 | 6 | 5 | 6 | Figlet en police système, PRESS START à 9 px (m) |

---

## 2. Ce qui a progressé depuis la critique A

1. Textes de jeu réécrits dans la grille : les titres d'Erratik, Fauna Chess et FaunInvaders, ainsi que KATABATIK et « Medium » sur bureau, se lisent nets. L'écran le plus pauvre de A (menus noirs) a maintenant un écran-titre.
2. Cartouche de sortie : une seule place hors borne, le coin bas gauche. Reporhogo (R) et Skoporhogo (X1) sont libérés.
3. Bandeau BURROWS, cadre bois et meuble en ASCII : la frontière photo / ASCII n'apparaît plus qu'aux commandes, ce qui est la règle annoncée. La règle de clarté est tenue : boutons, manette et plaques restent des objets d'époque reconnaissables.
4. Barre de commande de la borne : cibles de 44 px, compteur de Koins fixe, même ordre des pictos sur les trois formats.
5. Akasztófa téléphone et paysage : clavier en 7 × 5 de 44 px, état (MISSES 0/6) au-dessus du clavier. C'est le meilleur écran de jeu tactile du site.
6. Musik en paysage : les icônes cassées sont remplacées par les figurines.

Restes de A non traités : HUD de FaunInvaders, FaunaTor coupé sur téléphone, DVD minuscule sur téléphone, porte-clés sur FaunaTor, images cassées de Musik (d, m), 404 en « $$ », « · · » et « 0 cassette » de Kuration, « N° 09 » et émojis d'Aube.
Régressions : la cartouche, déplacée en bas à gauche, recouvre maintenant le contenu des pages de texte sur téléphone et en paysage. Le guide, plus présent, recouvre les plaques de navigation.

---

## 3. Défauts restants

Sévérités : P0 bloque une tâche ; P1 gêne fortement une tâche principale ; P2 gêne ou trompe ; P3 finition.

### P1

**P1-1. Le guide et ses bulles recouvrent les commandes principales.**
Où : BURROWS m (guide sur BC, bulle KORHOGAME sur FAUNEYE et 3615), BURROWS l (guide sur KORHOGAME), fr m et fr l (guide sur IG), MAUK_TENIEB d (guide sur SURFAUNA, plaque délavée), MAUK_TENIEB l (guide sur 3615, bulle LORE sur le bas du meuble), LoreLore l, KorhogOS d, m et l (guide sur l'icône FaunEye, bulle sur 3615).
Pourquoi : ce sont les quatre portes du site. Un pouce qui vise une plaque touche le guide ou la bulle (H5). Le guide est voulu ; sa trajectoire sur les commandes ne l'est pas.
Correction (ascii-live.js + ascii-commun.css) :
- `.guide, .guide-bulle { pointer-events: none; }` : le clic traverse toujours vers la commande.
- Zone d'exclusion : à chaque pas du guide, récupérer `getBoundingClientRect()` de `button, a, [role=button], .plaque, .bouton-rond` et refuser toute position dont la boîte coupe l'une d'elles de plus de 8 px. Le guide marche alors sur une bande réservée, entre le bas de l'écran du motel et le haut des boutons ronds, en paysage dans la marge droite du meuble.
- Bulle : placement en quatre candidats (dessus, dessous, gauche, droite), retenir le premier qui ne coupe aucune commande ; sinon la poser sur l'écran du motel. Durée de vie de 4 s, puis fondu de 300 ms.
- KorhogOS : le guide évite la grille d'icônes (colonne de 220 px à gauche sur bureau, rangées d'icônes sur téléphone).

**P1-2. Jeux sur téléphone et en paysage : état illisible, commandes absentes ou minuscules.**
Où : FaunInvaders (d, m, l) : HUD en bouillie (« ORVSC 1 LORIII »), sprites très sombres, aucune commande tactile visible sur m. En paysage, le plateau fait environ 180 × 240 px dans un cadre de 830 × 300. Konnect4 (m, l) : Easy / Medium / Hard dessinés dans le canvas à 4–6 px, cibles d'environ 30 × 8 px. En paysage, le plateau fait 170 px de large. Les dés au-dessus et les libellés dans le canvas se doublent sans que l'on sache lequel commande.
Correction :
- ascii-lisible.js : étendre l'interception de `fillText` au HUD de FaunInvaders (score, vague, vies) avec un corps minimal de 11 px et une encre au moins à 4,5:1 sur le fond. Si le jeu dessine le HUD en sprites, le recopier en HTML dans une bande `.hud` de 16 px au-dessus du canvas.
- Konnect4 : à chaque `fillText` qui contient Easy, Medium ou Hard, poser par-dessus un `<button>` transparent de 44 × 44 px minimum, centré sur la zone de texte, qui relaie le clic au canvas (`canvas.dispatchEvent(new MouseEvent('click', {clientX, clientY}))`). Si les dés font la même chose, masquer la rangée de libellés du canvas pour garder une seule commande.
- Mise à l'échelle des canvas (ascii-commun.css) : `.jeu canvas { height: min(100%, calc(100svh - var(--barre) - var(--points) - 24px)); width: auto; aspect-ratio: attr; image-rendering: pixelated; }`. En paysage, FaunInvaders et Konnect4 doivent occuper toute la hauteur utile, soit environ 300 px au lieu de 240 et 170.
- FaunInvaders sur téléphone : deux zones tactiles en ASCII sous le plateau (◄ ► en cellules de 44 px, tir en appui sur le plateau) ; le petit « - • - » actuel ne dit rien.

**P1-3. Accueil sur bureau : les quatre plaques de navigation sont sous le pli.**
Où : home d et fr d (1440 × 900). Seuls la barre KOINS et le motel sont visibles ; KORHOGAME, FAUNEYE, 3615 et SURFAUNA n'apparaissent qu'en défilant (capture BURROWS d). Le néon, la piste et le compteur occupent le haut ; la page d'entrée d'une borne cache ses boutons.
Correction (ascii-commun.css) : sur `(min-width: 1024px)`, `.ecran-motel { max-height: calc(100svh - var(--meuble-h) - var(--entete-h)); }` avec `--meuble-h` mesuré à l'exécution (ascii-live.js, ResizeObserver). Le motel, isométrique, garde sa forme à 70 % de sa hauteur actuelle. Si la hauteur du viewport est inférieure à 760 px, mettre à l'échelle le meuble entier avec `transform: scale()` plutôt que de couper.

**P1-4. Musik : deux icônes d'image cassée en tête de grille (d, m).**
Où : coin haut gauche du séquenceur, rangées 1 et 2.
Pourquoi : c'est l'erreur la plus visible pour un œil de métier, et une piste sans visage ne se reconnaît pas (H6).
Correction : ascii-annexe.css `img:not([src]), img[src=""] { visibility: hidden; }`, puis dans ascii-live.js, sur l'événement `error` de chaque `<img>` du séquenceur, remplacer `src` par la figurine de la piste (déjà affichée en paysage) ou par une cellule ASCII de repli.

**P1-5. LoreLore sur bureau : 45 % haut de l'écran noir, borne coupée.**
Où : d-LoreLore (bande noire de 0 à 408 px). Peut-être la bande passagère du rendu logiciel, mais elle est ici bien plus haute qu'ailleurs. De plus, l'écran nommé LoreLore montre le motel et non le coffre du Lore, sur les trois formats.
Correction : à vérifier sur un navigateur réel. Si elle persiste, regarder `scrollIntoView` du crawl ou de l'entrée Lore : le lieu Lore doit ouvrir son contenu (coffre et plaque INSERT), pas faire défiler la borne.

### P2

**P2-1. La cartouche de sortie recouvre le contenu des pages hors borne (m, l).**
Où : bio m (sur « Start here »), Aube m (sur APPEARANCE), notes m (lien de pied de page), reporhogo.html m (Launchpad) et l (Codeberg), skoporhogo m et l (avatar), fotofauna d, m et l (coin du cadre).
Correction (ascii-annexe.css) : `body.hors-borne { padding-bottom: calc(64px + env(safe-area-inset-bottom)); padding-left: max(env(safe-area-inset-left), 0px); }` et, sur les listes et grilles plein cadre, `scroll-padding-bottom: 64px`. Donner à la cartouche un socle : une plaque de 56 × 56 px au fond opaque de la page, pour qu'elle se lise comme un objet posé et non comme une tache sur le texte.

**P2-2. Porte-clés sur les titres et les logos.**
Où : tor.html d, m, l (logo FaunaTor et bouton ◄ sur m) ; wiki m et l (titre, onglet Article).
Correction : `.a-porte-cles header, .a-porte-cles .entete { padding-left: 64px; }` sur toute page qui affiche le porte-clés ; sur téléphone, le porte-clés passe à 32 px de haut.

**P2-3. Textes sous le plancher de lisibilité (téléphone et paysage).**
Où : DVD m (« Select your language » à environ 6 px, ENGLISH / FRANÇAIS à environ 7 px, cibles d'environ 60 × 10 px) ; télé m et l (grille à 6 px) ; Minitel d (sous-libellés Esc, Del, PgUp à environ 6 px) ; loupe de recherche de VHS d et m (6 px) ; 404 m (PRESS START à 9 px) ; Koins de la barre Kave sur le wiki (9 px, contraste d'environ 3:1).
Correction : plancher de 11 px pour tout texte d'interface sur téléphone, déjà appliqué ailleurs. DVD : `font-size: clamp(14px, 4.2vw, 28px)` sur les langues, et `padding: 12px 16px` pour une cible de 44 px. Télé portrait : écran à 94 % de la largeur, grille à 11 px, trois colonnes horaires au lieu de quatre, magnétoscope collé sous l'écran (le vide de 200 px disparaît). VHS : remplacer le glyphe « ⌕ » par le picto loupe de la barre (20 px), comme en paysage.

**P2-4. Débordements et coupures sans téléprompteur.**
Où : FaunaTor m (placeholder coupé à « KEYWOR », sans défilement) ; KorhogOS m et l (panneau CDE coupé à droite, et à gauche en paysage) ; 3615 l (CONNECT / END coupé en bas) ; Bakubook m (onglets coupés, sans signe de suite) et l (lecture écrasée) ; Korong l (KOMPETE! collé au bord) ; Faunarratik m (première ligne rognée) ; Kamorhogo m et l (panneau coupé) ; fotofauna m et l (pellicule coupée).
Correction :
- FaunaTor : ascii-prompteur.js sait déjà faire défiler une case ; l'appliquer au `placeholder` en le doublant d'un `<span>` superposé tant que le champ est vide (le champ réel garde un placeholder vide pour l'accessibilité et `aria-label` reprend le texte).
- KorhogOS : `.panneau-cde { transform: scale(min(1, calc(100vw / 1020px))); transform-origin: bottom center; }`, ou un panneau à deux rangées sous 600 px.
- 3615 paysage : clavier en `max-height: calc(100svh - var(--barre))` avec `overflow-y: auto` et un liseré de fondu de 1 cellule en bas, ou touches de 36 px au lieu de 44 en paysage seulement (exception admise par WCAG 2.5.8 pour 24 px minimum).
- Bakubook paysage : sous 420 px de haut, masquer la rangée des livres derrière un picto « étagère » ; la page prend toute la hauteur.
- Onglets défilants (Bakubook, wiki) : masque en dégradé de 24 px au bord droit (`mask-image`), le signe universel qu'il y a une suite.

**P2-5. Deux barres de commande différentes (borne et Kave).**
Où : DVD, télé, Video Kave, wiki, KorhogOS, tor.html : pictos de 16 px dans des boutons d'environ 30 px, Koins à 9 px, picto FR en texte ; sur la borne, boutons de 44 px et compteur de 18 px.
Correction : une seule classe `.barre-ik` dans ascii-commun.css, mêmes cibles de 44 px et même compteur partout ; la matière (bois de Kave, métal de borne) change, la géométrie reste. C'est la règle de l'auteur sur les barres de contrôle : mêmes fonctions, placement propre à chaque lieu, DA commune.

**P2-6. État contradictoire de la télé.**
Où : kave_tv d, m, l : la LED affiche 01, l'écran CH 02 et la grille surligne 02.
Correction : ascii-live.js lit le numéro de chaîne courant et l'écrit dans la LED à chaque changement.

**P2-7. Compteur de Koins sur téléphone : la pièce en tranche se lit comme un chiffre.**
Où : la plupart des m et l (« | 3 », « ( 3 »).
Correction : la pièce tourne seulement lors d'un gain ou d'une dépense, 600 ms, puis s'arrête de face. `@media (prefers-reduced-motion: reduce)` : zéro rotation.

**P2-8. Pagination muette et petite.**
Où : tous les lieux à points (5 ou 8 points de 8 px, espacés de 34 px).
Correction : zone cliquable de 44 × 44 px par point (`padding` transparent), `aria-label` avec le nom du lieu, `aria-current="true"` sur le point actif. Voir l'idée 2 pour la forme.

**P2-9. Akasztófa bureau : composition décentrée.**
Où : potence collée à gauche, clavier à gauche du centre, moitié droite vide.
Correction : grille à trois colonnes `1fr auto 1fr` (potence, mot et clavier, colonne vide de même largeur que la potence), ou reprise de la mise en page du téléphone, centrée et plus lisible.

**P2-10. Contraste.**
Où : néon INSERT KOIN / SEKTOR INN en phase éteinte (m, environ 1,5:1) ; « In contagion strength » (Akasztófa, environ 3:1) ; « Easy » et « Hard » de Konnect4 (environ 2:1) ; sprites de FaunInvaders (environ 2:1) ; Koins du wiki.
Correction : lueur résiduelle du néon éteint d'au moins 3:1 (`text-shadow` et encre à 35 % de luminance) ; encre minimale de 4,5:1 pour tout texte réécrit dans la grille ; luminance des sprites de FaunInvaders relevée de 40 %.

**P2-11. Wiki : la fin de l'article passe sous la barre.**
Correction : `padding-bottom: calc(var(--barre-h) + 16px)` sur le conteneur de l'article.

### P3

- 404 : figlet « $$ » en police système à 7 px sur bureau. Le redessiner en Press Start 2P, en blocs ▀ ▄ █, sur la moitié de la largeur.
- Kuration : « · · » doublé ; « 0 cassette » sans objet (une cassette vide en ASCII).
- Aube : « N° 09 » en sur-titre (motif proscrit par le plancher de qualité) ; émojis ⭐ 🐓 ✋ en couleurs système ; barres en traits roses plutôt qu'en blocs █ ░.
- reporhogo.html : titre en dégradé vert-or ; tuiles à bord gauche de 4 px ; COPY seul sur sa ligne (le mettre à droite du champ de résultat).
- Maskermind : « TRY 2/10 » alors que l'historique est vide ; la ligne de retour 0 / 2 / 2 n'a pas de clé (un picto ● bien placé, ○ mal placé suffit, sans texte).
- Pages de texte (bio, notes, kuration) : liens en bleu navigateur `#4af` soulignés ; sélection et curseur par défaut. Prendre l'ambre de Press Start et une sélection en cellule inversée.
- Kave bar : picto FR écrit en texte, les autres pictos dessinés. Il manque un drapeau ou un picto de langue dessiné.

---

## 4. Les 5 corrections qui rapportent le plus

1. **Zone d'exclusion du guide et des bulles + `pointer-events: none`** (P1-1). Le geste d'entrée du site, « je touche une plaque », redevient fiable sur tous les formats. Coût : une fonction dans ascii-live.js.
2. **Jeux lisibles et jouables au pouce** (P1-2) : HUD réécrit, libellés de Konnect4 doublés de boutons de 44 px, canvas à pleine hauteur en paysage, commandes tactiles de FaunInvaders. Les deux jeux les plus faibles passent de 2–3 à 7.
3. **Plaques de navigation au-dessus du pli sur bureau** (P1-3). La page d'accueil montre ses quatre portes sans défilement.
4. **Gouttière réservée pour la cartouche et le porte-clés** (P2-1, P2-2) : padding et socle de cartouche. Le contenu n'est plus recouvert sur aucune page hors borne.
5. **Plancher de 11 px et passe sur les débordements, plus les icônes cassées de Musik** (P2-3, P2-4, P1-4) : DVD, télé, FaunaTor, KorhogOS, 3615 paysage, Bakubook paysage. Ce sont les écrans à 3–4 sur téléphone et en paysage.

---

## 5. Trois idées d'excellence (angle UX)

**1. Le focus clavier en cellule inversée, le meuble au joystick.**
`:focus-visible` dessine sur toute commande un cadre en cellules de 8 px (encre et papier inversés, clignotement à 1 Hz comme un curseur Minitel), aligné sur la grille. Sur l'accueil, les flèches du clavier et la manette de jeu (Gamepad API) déplacent ce curseur de plaque en plaque, comme le vrai joystick du meuble ; Entrée ou bouton A valide. On obtient WCAG 2.4.7 et 2.1.1 sans une ligne de texte, et le joystick dessiné devient la commande qu'il montre. Réalisable dans ascii-commun.css (outline en `box-shadow` à pas de 8 px) et ascii-live.js (roving tabindex sur `.plaque`, écoute de `gamepadconnected`).

**2. La pagination en signes, nommée pour les lecteurs d'écran.**
Les points deviennent des vignettes de 3 × 2 cellules ASCII : un envahisseur, une pièce d'échecs, une potence, une grille de puissance 4, une cassette… La vignette active passe en encre pleine, les autres en encre à 40 %. Chaque vignette est un bouton de 44 px avec `aria-label` (le nom du jeu) et `aria-current`. Sur téléphone, un glissement horizontal sur l'écran change de lieu, et la vignette suivante s'allume pendant le geste. Cela règle H6 (reconnaissance) et la mémoire de travail sans texte visible, dans la politique « le plus de pictos possible ».

**3. La révélation par phosphore : guider sans écrire.**
Après 8 s sans geste dans un lieu, les commandes actives s'allument une à une, une seule fois, d'une lueur de phosphore (2 pulsations de 400 ms, dans l'ordre d'usage : jouer, choisir, sortir). Le site reste muet et peu indicatif, mais il ne laisse jamais le visiteur face à un écran sans prise. Au premier geste, le cycle s'arrête et ne revient plus pendant la session (`sessionStorage`). Avec `prefers-reduced-motion`, la pulsation devient un simple contour fixe pendant 2 s. Sur téléphone, `navigator.vibrate(12)` à l'insertion d'un Koin et à l'appui sur une plaque donne un retour tactile d'époque, celui d'un bouton de borne. Réalisable dans ascii-live.js et ascii-commun.css.
