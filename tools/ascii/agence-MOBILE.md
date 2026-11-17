# Jury d'agences — passage 5 — angle MOBILE (direction technique mobile)

Corpus : 35 écrans × 3 formats, /home/claude/t/crawl/{m,l,d}-*.png, lus en planches (téléphone portrait 390×844 à l'échelle 1, paysage 844×390 à l'échelle 1, bureau réduit à 0,586 pour comparer les proportions), puis agrandis au plus proche voisin sur le motel de Skoporhogo, la barre de commande et le HUD de FaunInvaders. Coordonnées en px CSS de chaque capture. Choix de l'auteur jugés comme tels : Index of, Weaky crème, « Truce/↑héé↑è↑e », guide qui marche. Captures statiques : la loupe d'époque, le mouvement du téléprompteur et les cibles invisibles de 44 px échappent à la mesure ; je juge ce que montre l'image.

Définition appliquée (celle de l'auteur) : responsive = mêmes rapports de proportion sous tous les appareils et toutes les orientations, géométries calculées dès la première intention, y compris la taille du texte à lire et des éléments d'interface.

---

## 1. Notes

- Angle mobile : 5,5/10
- Note globale : 6/10

Lecture : le clone gagne en clarté des commandes et en lisibilité des titres de jeu ; il perd encore sur trois fronts propres au téléphone : collisions des objets fixes (cartouche, porte-clés, guide), coupures en paysage, et une résolution ASCII qui chute sur petit écran au point de défaire l'image (motel). Les rapports de proportion changent d'un format à l'autre sur un tiers des écrans.

---

## 2. Progrès depuis la critique A

1. Commandes en image d'époque sur tout appareil : manche, boutons ronds, dynamite, touches du meuble, pions de Maskermind, molettes de Musik et de KamOrhogo restent nets à 390 px. La mosaïque de 4 cellules du passage 4 disparaît des barres. Gain net de lisibilité au pouce.
2. Titres de jeu écrits dans la grille : « FAUNINVADERS » (m y 440–460, l, d) et « KATABATIK » + « Easy / Medium / Hard » (Konnect4) se lisent dans les trois formats.
3. Barre de la Kave (DVD, TV, vidéoclub, Weaky, Tor) : plus de fantômes de signes sous les pictos.
4. Bandeau BURROWS passé en ASCII : même matière que le motel, plus de rupture photo/ASCII sur l'accueil.
5. Cartouche rouge de Reporhogo (SurFauna) et de Skoporhogo : plus sur le titre ni sur X1.
6. MiniTale portrait : clavier replié derrière « Aa KEYBOARD », écran Vidéotex net, CONNECT / END entier (m y 603–640). Meilleure page téléphone du site avec la Video Kave.
7. Paysage : recomposition en deux colonnes tenue sur l'accueil, la télé, MiniTale, Musik, Reporhogo ; barre verticale sur Bakubook (l x 770–844), juste.

Restent ouverts depuis A : placeholder FaunaTor coupé, barre KorhogOS coupée, onglets Bakubook coupés, zone de lecture Bakubook paysage écrasée, deux images cassées de Musik, HUD FaunInvaders illisible, textes de 6–7 px (DVD, télé, 404), figlet TILT.

---

## 3. Défauts restants

Format : m = portrait 390×844, l = paysage 844×390, d = bureau.

### A. Proportions et résolution

**A1 — P1 — Le motel se défait sur téléphone (résolution ASCII non proportionnelle).**
Écrans : m-home, m-fr, m-BURROWS, m-LoreLore, m-MAUK_TENIEB, m-skoporhogo ; l-home, l-skoporhogo.
Mesure : le losange compte environ 45 cellules de large sur m-skoporhogo (x 20–360) contre environ 130 sur d. Agrandi, le motel de m-skoporhogo n'est plus qu'une mosaïque de signes (`" & $ # ? [ P e`) : murs, lits et personnages illisibles. Sur bureau, la même scène se lit (chambres, moquette verte, lit rose). Le rapport « détail / surface » change d'un facteur 3 : c'est une rupture de la règle de proportion, pas un simple effet de taille.
Correction (ascii-live.js) : un seul corps par écran, calculé en pixels physiques et non en px CSS fixes. `const n = Math.max(1, Math.floor(devicePixelRatio * cible / 8)); const cell = 8 * n / devicePixelRatio;` avec `cible = 8` sur bureau et `cible = 16/3` sur écran ≥ 2,5 dppx et largeur < 600 px. Sur iPhone (3 dppx) : cellule de 16 px physiques = 5,33 px CSS, chaque pixel de Press Start 2P tombe sur 2 px physiques, donc net. Le motel passe de 45 à 68 cellules. Compléter par un zoom initial du motel au cadrage (voir A3). Les textes en grille (HUD, titres) gardent 8 ou 16 px CSS.

**A2 — P1 — Jeux minuscules en paysage, composition qui change avec l'orientation.**
Écrans : l-FAUNINVADERS (jeu ≈ 180×240 dans une zone utile de 830×300 : 17 % de la surface), l-KONNECT4 (plateau ≈ 170×145), l-AKASZTÓFA (gibet ≈ 50×120) ; d-AKASZTÓFA (jeu ≈ 30 % de la largeur du cadre, grand vide noir) ; d-404 (figlet ≈ 18 % de la largeur) contre m-404 (54 %) et l-404 (30 %).
Correction (ascii-commun.css + ascii-live.js) : chaque scène de jeu dans une boîte de rapport fixe calée sur la hauteur disponible : `.scene{height:calc(100dvh - var(--barre) - var(--points)); aspect-ratio:var(--ratio-jeu); max-width:100%}` ; canvas mis à l'échelle sur un multiple de cellule : `h = Math.floor(hDispo / cell) * cell`. Pour la 404 : `font-size` du figlet en `cqi` (`.tilt{container-type:inline-size} .tilt pre{font-size:calc(100cqi / 62)}`), même part de largeur partout (≈ 55 %).

**A3 — P2 — Losange du motel rogné à droite en portrait.**
Écrans : m-home (x 360–380, y 470–560), m-fr, m-MAUK_TENIEB. Le losange touche ou dépasse le cadre ; sur d il flotte avec marge.
Correction (ascii-live.js) : zoom initial `z = Math.min(wCadre / wLosange, hCadre / hLosange) * 0.94`, centré ; même marge relative (3 %) sur tous les formats.

**A4 — P2 — KamOrhogo et Fotofauna : le bloc caméscope disparaît en paysage.**
Écrans : m-KAMORHOGO et m-fotofauna montrent l'écran, puis le bloc micro / baguette / dossier / calques / retour / téléchargement, puis les effets ; l-KAMORHOGO et l-fotofauna sautent directement aux effets. Sur d, le bloc est présent en colonne. Le même lieu change de mécanique selon l'orientation.
Correction (ascii-commun.css) : colonne de droite paysage `display:flex; flex-direction:column; overflow-y:auto; overscroll-behavior:contain; scroll-snap-type:y proximity`, ordre identique au portrait (bloc caméscope en premier), mise à l'échelle par `--k` pour que le bloc caméscope tienne en entier dans 390 px de haut.

### B. Collisions des objets fixes

**B1 — P1 — Cartouche rouge sur le contenu des pages hors borne.**
Écrans : m-borne-bio (x 18–52, y 795–830, sur la liste de liens), m-fauna-aube (x 18–52, y 792–828, sur « APPEARANCE » et le début du texte), m-notes_index (sur le lien « mauktenieb.github.io »), m-skoporhogo (sur l'avatar de Croisière Noire), m-reporhogo.html (sur « Launchpad »), l-reporhogo.html (sur « Codeberg »), l-skoporhogo (sur Silent Pact), m-fotofauna (sur la pellicule), l-fotofauna (sur l'angle de l'image).
Correction (ascii-annexe.css) : la cartouche quitte le flottant pour une bande d'en-tête collante de 44 px : `.cartouche{position:sticky; top:0; z-index:5}` dans un `header` à fond plein ; le contenu commence sous la bande, aucune superposition à aucun défilement. Variante si la cartouche doit rester en bas : `body{padding-bottom:calc(60px + env(safe-area-inset-bottom))}` ne suffit pas pendant le défilement ; préférer l'en-tête.

**B2 — P1 — Porte-clés sur les titres.**
Écrans : m-kave_wiki (sur le « K » de « Kerema »), m-tor / l-tor / d-tor (sur le logo FaunaTor, trois formats), l-home et l-fr (sur le fronton INSERT KOIN, x 405–435), m-kave_tv et l-kave_tv (sur l'angle de la télé).
Correction (ascii-commun.css) : gouttière réservée `--gouttiere: 48px` ; `.entete-lieu, .logo-faunator, .titre-wiki{padding-left:var(--gouttiere)}` ; sur la borne, porte-clés en `position:absolute` dans la marge du meuble, jamais sur le fronton.

**B3 — P1 — Guide sur les commandes et les icônes.**
Écrans : m-BURROWS (vieil homme sur BC, x 30–125, y 530–630), l-BURROWS (silhouette sur KORHOGAME, l x 500–570, y 190–270), m-fr (silhouette sur IG, x 265–320, y 710–800), l-fr (bison sur IG), l-MAUK_TENIEB (silhouette à gauche de 3615), m-MAUK_TENIEB (bison sur le motel), m-kave_kos (bison sur Video Kave et KorhoGame), l-kave_kos (bison sur SurFauna et GitHub).
Correction (ascii-live.js) : liste de zones interdites lue à chaque redimensionnement (`getBoundingClientRect()` du compteur, de BC/TL/IG, des quatre touches, des icônes KorhogOS) ; le guide marche sur l'arête haute d'une touche (`bottom = rect.top`) ou dans les vides ; `pointer-events:none` sur sa couche ; en dessous de 600 px de large, il s'arrête hors du meuble.

**B4 — P3 — Bulles coupées ou posées sur les commandes.**
Écrans : l-LoreLore (« MAUKIE'S INSTA. » coupée à y 0), l-MAUK_TENIEB (« LORE » sur les molettes), l-BURROWS (« 3615 » sur le bandeau), m-kave_kos (« Whoever has ears... » sur l'icône 3615).
Correction : placement à bascule (au-dessus, sinon dessous, sinon côté), bornage `top:max(4px, …)`, `left:clamp(4px, …, 100vw - largeur - 4px)`.

### C. Coupures et débordements

**C1 — P1 — Paysage : commandes et zones de jeu sous le pli, sans défilement interne.**
Écrans : l-3615 (CONNECT / END coupé à mi-hauteur, l x 394–600, y 280–290) ; l-home et l-fr (touches 3615 et SURFAUNA coupées à y 390) ; l-VHS (recherche, tri et liste des cassettes absents : seuls télé, magnétoscope, rayon) ; l-MASKERMIND (grille des essais coupée sous la 8e rangée) ; l-skoporhogo (liste réduite à 1,5 rangée) ; l-BAKUBOOK (zone de lecture ≈ 60 px, vignette de 37×52 px, l y 215–275).
Correction (ascii-commun.css) : règle paysage unique `@media (orientation:landscape) and (max-height:500px){ .lieu{display:grid; grid-template-columns:var(--col-a) var(--col-b); height:calc(100dvh - var(--barre))} .lieu > *{min-height:0; overflow:auto; overscroll-behavior:contain} }`. MiniTale : rangée CONNECT / END remontée dans la grille des touches (4 colonnes, 3 rangées). Bakubook : la page occupe la colonne gauche pleine hauteur, onglets et livres à droite.

**C2 — P1 — Textes coupés sans téléprompteur.**
Écrans : m-SurFauna-FAUNATOR et m-tor (placeholder « .ONION, TAGS, KEYWOR » / « KEYWORDS, ») ; m-BAKUBOOK (onglet « INTERNET ARC », livre « Rosa / philoso ») ; l-BAKUBOOK (« GUTENBERG », « The Turba Philosophorum ») ; m-kave_wiki (onglet « K »), l-kave_wiki (« Korh ») ; m-kave_kos (dock coupé à « KorhoG / SurFa ») ; l-kave_kos (dock coupé à droite).
Correction (ascii-prompteur.js) : un placeholder ne s'anime pas ; le remplacer par un `span.ph-prompteur` posé sur le champ (`position:absolute; inset:0; pointer-events:none`), qui défile en boucle et se masque à `focus` / `input`. Onglets et rayons de livres : bande défilante horizontale assumée, `scroll-snap-type:x mandatory` + fondu de bord `mask-image:linear-gradient(90deg,#000 88%,transparent)` pour signaler la suite sans texte ; chaque onglet trop long passe au téléprompteur. Dock KorhogOS : `transform:scale(min(1, calc(100vw / var(--l-dock))))` ou deux rangées sous 600 px.

**C3 — P2 — Bord haut et bas des textes défilants coupés net.**
Écrans : m-FAUNARRATIK (première ligne tranchée à mi-hauteur, x 45–345, y 238–248 ; « FOR » seul en bas, y 443).
Correction (ascii-prompteur.js / ascii-commun.css) : `mask-image:linear-gradient(transparent, #000 1.5em, #000 calc(100% - 1.5em), transparent)` sur le conteneur ; `line-height` sur un multiple de la cellule (24 px) pour que chaque ligne tombe sur la grille.

**C4 — P2 — Bas de panneau rogné.**
Écrans : m-MUSIK (dernière rangée du séquenceur tranchée, y 660–665), l-MUSIK (grille coupée à y 285) ; m-VHS (rangée de tri tranchée par le cadre, y 672–705) ; m-KAMORHOGO (champ de recherche tranché, y 680–690) ; m-reporhogo SurFauna (tuiles « LAUNCHPAD / FOSSIL » tranchées, y 692–705).
Correction : hauteur des panneaux calée sur un nombre entier de rangées (`height: calc(var(--rangees) * var(--h-rangee))`) ou défilement interne avec le fondu de C3.

### D. Lisibilité

**D1 — P1 — Textes sous le plancher de lecture en portrait.**
Écrans : m-kave_dvd (« Select your language » ≈ 6 px, ENGLISH / FRANÇAIS ≈ 8 px, x 115–275, y 277–306) ; m-kave_tv (grille ≈ 7 px) ; m-404 (figlet ≈ 5 px, PRESS START ≈ 9 px) ; m-KONNECT4 (« Easy », « Hard » ≈ 7 px, gris sur noir) ; l-404 et l-kave_tv corrects.
Le rapport est conservé (DVD : 41 % de la largeur sur m, 34 % sur l) mais la taille de lecture, elle, n'est pas « calculée dès la première intention ».
Correction (ascii-lisible.js / ascii-commun.css) : plancher par conteneur `font-size:max(11px, 3.4cqi)` sur le menu DVD et la grille télé (le conteneur grandit en hauteur si besoin : la télé portrait passe à 92 % de la largeur, magnétoscope dessous) ; 404 : TILT redessiné en lettres de 4×6 cellules Press Start (192 px de large sur m), PRESS START en 16 px.

**D2 — P1 — HUD de FaunInvaders toujours illisible.**
Écrans : m, l, d. Agrandi : la ligne de score se lit `ʘ## ̈  ##"̃ ʹ  ##"̃ ######` ; score, vies, record perdus. Le titre est réparé ; la police bitmap du HUD passe encore par `drawImage`, pas par `fillText`.
Correction (ascii-live.js) : bande HUD (2 premières rangées de cellules) exclue de la conversion ; score et vies lus dans l'état du jeu (`game.score`, `game.lives` ou équivalent) et écrits en DOM dans la grille, Press Start 8 px, encre de la couleur d'origine. À défaut, intercepter `drawImage` depuis l'atlas de police et écrire le caractère correspondant.

**D3 — P1 — Compteur de Koins mal lu en portrait.**
Écrans : m-AKASZTÓFA, m-KONNECT4, m-FAUNARRATIK, m-FAUNATOR, m-kave_videoclub, m-kave_tv… : la pièce vue de tranche et le chiffre donnent « | 3 », qui se lit « 13 » ou « I3 » ; le libellé KOINS disparaît en m alors qu'il reste en l sur la Kave. C'est l'une des trois commandes que l'auteur exige claires.
Correction (ascii-commun.css) : rotation de la pièce bornée `scaleX` ≥ 0,35 (jamais un trait), gouttière d'une cellule entre pièce et chiffre, pièce en couleur bronze distincte du chiffre orange ; même gabarit de compteur dans toutes les barres.

**D4 — P2 — Plateau de Konnect4 brouillé en portrait.**
Écran : m-KONNECT4 (x 35–355, y 305–580) : chaque trou fait ≈ 5 cellules, rempli de signes ; le plateau n'est pas un multiple de la cellule, les trous se déforment d'une colonne à l'autre. Sur d, net.
Correction (ascii-live.js) : plateau dimensionné à `7 × k` cellules de large (k = 5 en m, 7 en d), trous dessinés par un motif fixe de signes (bord `( )`, intérieur papier vide), seuil : luminance < 12 % → espace. Même rendu géométrique sur tous les formats.

**D5 — P2 — Images cassées dans Musik.**
Écrans : m-MUSIK (pavé blanc avec deux icônes d'image cassée, x 42–100, y 333–405), d-MUSIK (même défaut en haut à gauche). l-MUSIK affiche les figurines : la source existe, le chemin diffère par format.
Correction (ascii-lisible.js) : `img.addEventListener('error', …)` → repli sur la figurine du même instrument (chemin du format paysage) ou sur son signe ASCII ; `img:not([src]), img[src=""]{visibility:hidden}`.

### E. Cibles tactiles

**E1 — P2 — Touches du pendu sous 44 px.**
Écrans : m-AKASZTÓFA (touches ≈ 40×38, x 49–89) ; l-AKASZTÓFA (≈ 32×32).
Correction : `min-width:44px; min-height:44px` ; m : 7 colonnes × 44 + 6 × 4 = 332 px, tient dans 340 ; l : 11 colonnes × 44 + 10 × 4 = 524 px dans la colonne droite.

**E2 — P2 — Choix de difficulté de Konnect4 dans le canvas.**
Écrans : m/l/d-KONNECT4 : « Easy / Medium / Hard » ≈ 7 px, sans cible visible. Les trois dés au-dessus font double emploi.
Correction : supprimer les mots du canvas ou les doubler par trois boutons DOM de 44 px alignés sous les dés ; un seul sélecteur.

**E3 — P3 — Points de pagination de 10 px.**
Écrans : tous les lieux de jeu et FaunEye (m y 728, l y 324). Si la zone de frappe fait 44 px, la règle est tenue ; l'œil, lui, vise 10 px.
Correction : vignettes ASCII de 3×2 cellules (critique A §9.10), 24×16 px visibles, zone de frappe 44 px.

### F. Continuité

**F1 — P2 — Les points et la barre sautent d'un jeu à l'autre.**
Écrans : m-FAUNINVADERS (points à y 663, barre à y 770, 70 px de vide entre eux) contre y 728 sur tous les autres jeux. En balayant de Korong à FaunInvaders, la pagination saute de 65 px.
Correction (ascii-commun.css) : scène de hauteur fixe, points en `position:absolute; bottom:…` de la scène, contenu du jeu centré dans la scène et jamais dans la page.

**F2 — P2 — Vides de mise en page dans les menus et Korong.**
Écrans : m-ERRATIK, m-FAUNA_CHESS (menus centrés, ≈ 250 px de noir au-dessus et au-dessous) ; m-KORONG (image centrée, ≈ 170 px de vide olive au-dessus et au-dessous ; KOMPETE! collé en haut). Les rapports diffèrent de l (menu à 30 % du haut).
Correction : position du titre fixée en proportion de la scène (`top: 18%` dans les trois formats) ; Korong : image calée en haut sous KOMPETE!, le reste de la scène pour le tableau des scores (critique A §9.9).

**F3 — P3 — Mouvement : rien ne respecte « réduire les animations ».**
Non mesurable sur capture ; aucune trace de `prefers-reduced-motion` dans le rendu (néon, pièce, guide, téléprompteur tournent tous).
Correction : `@media (prefers-reduced-motion:reduce)` : pièce figée de face, téléprompteur à vitesse /3 avec pause de 2 s aux extrémités, guide immobile.

**F4 — P3 — Télécommande DVD en Arial.**
Écran : m-kave_dvd (MENU, TITLE, SUBTITLE, AUDIO, OK, STOP, OPEN). Sixième famille de caractères, la seule purement système.
Correction : Barlow Condensed du reste des barres, ou pictos (▲ ▼ ◀ ▶ ■ ⏏) seuls.

---

## 4. Les 5 corrections qui rapportent le plus

1. Scène à rapport fixe par lieu, deux colonnes en paysage avec défilement interne (A2, A4, C1, C4, F1, F2). Un seul gabarit dans ascii-commun.css règle les coupures du paysage, les jeux minuscules et les sauts de pagination : 14 écrans touchés.
2. Zones réservées pour les objets fixes (B1, B2, B3) : en-tête collant pour la cartouche, gouttière de 48 px pour le porte-clés, zones interdites pour le guide. 20 collisions effacées, trois formats.
3. Corps par écran calé sur les pixels physiques + zoom initial au cadrage (A1, A3) : le motel redevient lisible sur téléphone, sans casser la règle d'un seul corps à l'écran.
4. Plancher de lecture et téléprompteur étendus (D1, C2, C3) : `max(11px, 3.4cqi)`, placeholder en `span` défilant, onglets et dock en bandes défilantes à fondu, masque haut/bas.
5. État de jeu lisible (D2, D3, D5) : HUD de FaunInvaders en DOM, compteur de Koins sans « | 3 », images cassées de Musik remplacées.

---

## 5. Trois idées d'excellence, angle mobile

1. Bascule d'orientation sans saut. Au `orientationchange`, chaque bloc de la scène (écran, meuble, barre) part de son ancienne boîte et glisse vers la nouvelle (technique FLIP : `getBoundingClientRect` avant/après, `transform` inverse, puis transition de 420 ms en sortie exponentielle) ; la grille ASCII se recalcule hors écran et se pose en fondu de 120 ms. Le visiteur voit le motel pivoter et se recomposer, jamais une page qui se recharge. Valeur : continuité (règle « zéro saut ») tenue au geste le plus propre au téléphone.

2. Pincement = plus de cellules, pas des cellules plus grosses. Sur les scènes ASCII (motel, Kave, KamOrhogo, Fotofauna), le pincement zoome la source, et la grille reste à son corps : chaque zoom recalcule la conversion sur la portion visible, donc plus de détail apparaît, comme un vrai terminal qui affiche une image plus proche. Deux doigts écartés sur une chambre du motel montrent les personnages en 8 px nets. Valeur : répond à A1 sur le fond, et donne au téléphone un geste que le bureau n'a pas.

3. Toucher d'époque. Chaque commande en image d'époque s'enfonce de 2 px avec une ombre réduite à `pointerdown` (sans attendre `click`), retour à 90 ms ; `navigator.vibrate(8)` sur les touches du meuble et `navigator.vibrate([12,40,12])` à l'insertion d'un Koin (Android ; silencieux ailleurs) ; `touch-action:manipulation` et `-webkit-tap-highlight-color:transparent` partout. Le meuble répond au pouce comme une borne réelle. Valeur : ergonomie tactile et matière d'époque, sans un mot de texte.
