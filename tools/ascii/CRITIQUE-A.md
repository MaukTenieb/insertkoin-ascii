# Critique Impeccable — Assessment A (revue de design, direction artistique)

Objet : Insert Koin ASCII, état du 17 nov. 2026. Corpus : 35 écrans × 3 formats (/home/claude/t/crawl/{d,m,l}-*.png), regardés en entier puis agrandis aux zones utiles (accueil, cadre, Kamorhogo, Korong, FaunInvaders, Konnect4, Bakubook, meuble de la borne, logos néon). Mode Experience : heuristiques 7 et 10 en n/a.

Règle du clone appliquée comme référence : un seul corps ASCII de 8 px ; sous 8×8 cellules et dans les commandes, l'image d'époque reste affichée. Choix de l'auteur jugés comme tels : page « Index of », Weaky crème, « Truce/↑héé↑è↑e », guide qui marche.

---

## 1. Verdict de spécificité

Objet d'auteur, propre à Korhogo. Aucune autre marque ne peut reprendre ce site tel quel : le Minitel MiniTale avec son clavier AZERTY, le bureau KorhogOS en CDE avec horloge en brumaire 235, le listing Apache de la Kave, la grille de télé en cyrillique et tchèque, la 404 TILT avec PRESS START, la date républicaine dans l'angle du motel, le meuble de borne à quatre boutons KORHOGAME / FAUNEYE / 3615 / SURFAUNA. Le monde existe.

Limite : l'ASCII lui-même reste générique. Le rendu actuel fonctionne comme un filtre de mosaïque : la couleur de fond de chaque cellule porte l'image, le signe ajoute un grain. Agrandi au quadruple (motel, Korong, Kamorhogo), le vocabulaire se réduit à environ 25 signes (`" ; / [ # & F ~ ? . = | ! < >`), et des lettres continuent d'apparaître (F, k, h, q, g, P, 6, L, J). Le « F » sert de bord vertical partout et se lit comme une lettre. Un spectateur averti y voit le rendu d'un convertisseur image→ASCII, pas une écriture d'auteur. Le monde est signé ; la matière ASCII ne l'est pas encore. C'est là que se trouve la plus grande marge.

---

## 2. Heuristiques de Nielsen

| # | Heuristique | Note | Constat principal |
|---|---|---|---|
| 1 | Visibilité de l'état | 2 | Compteur de Koins présent partout, date et heure dans le motel. En revanche, le HUD de FaunInvaders (score, vies, titre) et les titres de Konnect4 passent dans l'ASCII et deviennent illisibles ; les points de pagination ne disent pas où l'on est. |
| 2 | Correspondance avec le monde réel | 3 | Les métaphores d'époque sont justes et cohérentes (Minitel, magnétoscope, télé, CDE, Apache). Quelques termes cryptés (BC / TL / IG) relèvent du choix initiatique de l'auteur. |
| 3 | Contrôle et liberté | 2 | La cartouche rouge sert de retour sur les pages de texte ; ailleurs, la barre de pictos. Sur Reporhogo et Skoporhogo, la cartouche recouvre un titre ou le bouton X1. Aucun « retour au motel » lisible sur les pages hors borne (bio, notes, kuration). |
| 4 | Cohérence et standards | 2 | Six familles de caractères à l'écran (Press Start 2P, une condensée de type Barlow, une sérif de livre, Arial dans le guide télé, une mono de type IBM Plex, une sérif italique de menu DVD). Les cellules du cadre bois mesurent environ 16 px contre 8 px dans le motel. Le bandeau BURROWS reste photographique alors qu'il fait 110 × 10 cellules. Weaky sur bureau, KalabWiki sur téléphone. |
| 5 | Prévention des erreurs | 2 | Peu de pièges ; mais le placeholder de FaunaTor coupé sur téléphone (« .ONION, TAGS, KEYWOR ») masque ce que l'on doit taper. |
| 6 | Reconnaissance plutôt que rappel | 2 | Barre de pictos stable d'un lieu à l'autre : bon. Points de pagination sans nom, boutons BC/TL/IG muets : le visiteur doit mémoriser ce qu'il a découvert. |
| 7 | Souplesse et efficacité | n/a | Surface d'expérience ; raccourcis hors sujet ici. |
| 8 | Esthétique et minimalisme | 2 | Les grandes images ASCII (Videoclub, Korong, Kamorhogo, KorhogOS) sont belles à distance. Mais grain uniforme, lettres parasites, menus de jeux noirs et vides (Erratik, Fauna Chess, FaunaTor), et rupture de matière entre photo et ASCII au sein d'un même écran. |
| 9 | Récupération après erreur | 3 | La 404 TILT reste dans le monde et propose une sortie claire (PRESS START). Le figlet « $$ » choisi pour TILT est un gabarit connu de tous ; à redessiner. |
| 10 | Aide et documentation | n/a | Choix assumé de l'auteur : zéro texte explicatif. |
| **Total** | | **18/32** | **Acceptable (56 %)** |

---

## 3. Charge cognitive (8 critères)

| Critère | Résultat | Constat |
|---|---|---|
| Un seul foyer | Échec partiel | Accueil bureau : motel, bandeau, guide, bulle, néon défilant, piste musicale défilante, plante, porte-clés : huit foyers au premier regard. |
| Regroupement par blocs | Réussite | Barre de commande, meuble, écran : trois blocs nets. |
| Groupement visuel | Réussite | Cadres et boîtiers séparent bien les zones. |
| Hiérarchie | Réussite | Le motel domine l'accueil ; l'écran domine chaque lieu. |
| Une chose à la fois | Réussite | Chaque lieu porte une activité. |
| Choix limités (≤ 4) | Échec | Accueil téléphone : 3 boutons ronds + 4 boutons de meuble + 7 pictos + 8 points ; Musik : plus de 40 commandes visibles. |
| Mémoire de travail | Échec | BC / TL / IG, points sans nom, pictos sans libellé : il faut se souvenir de la fonction découverte au survol. |
| Révélation progressive | Réussite | Les bulles du guide révèlent les lieux au fil du parcours. |

Bilan : 2 échecs et 1 échec partiel sur 8. Charge modérée, cohérente avec le parti pris initiatique ; les deux échecs se règlent sans ajouter de texte (voir innovations 6 et 10).

---

## 4. Parcours émotionnel

- Pic : l'entrée dans la Video Kave (rayonnages ASCII plein cadre, perspective centrale, néons verts), la peinture de groupe de Korong et la chambre de Kamorhogo. Là, l'ASCII produit un vrai saisissement.
- Creux : FaunInvaders et Konnect4, où le titre et le score se dissolvent en bouillie de signes, dans une image très sombre ; puis les menus d'Erratik, Fauna Chess et FaunaTor, trois boutons au milieu d'un grand noir.
- Fin : les sorties vers bio, notes et kuration basculent dans une page de blog en mono sur fond noir, sans un seul signe ASCII ni objet d'époque. La règle pic-fin joue contre le site : le visiteur garde l'image d'un blog. La 404 TILT, elle, finit bien.

---

## 5. Points forts

1. La Video Kave et la peinture de Korong. Plein cadre, 8 px, perspective tenue, couleurs fidèles : à 1440 px la matière ASCII y vibre comme un écran cathodique, sans perdre l'image. C'est la preuve que la règle du corps unique fonctionne sur les grandes surfaces.
2. Les objets d'époque diégétiques : Minitel MiniTale avec écran Vidéotex propre, bureau KorhogOS en CDE avec fond tissé en ASCII, listing Apache, grille de télé multilingue, 404 TILT. Chaque lieu a une interface d'époque différente, et pourtant tout appartient au même motel.
3. La recomposition paysage de l'accueil (844 × 390) : le motel passe à gauche, le meuble de borne à droite, le compteur de Koins reste visible. Les proportions restent justes, sans écrasement. Même chose pour Kamorhogo et Fotofauna en paysage.

---

## 6. Problèmes prioritaires

### [P1] Textes de jeu passés dans l'ASCII : HUD et titres illisibles
- Où : FaunInvaders (titre, score, vies en haut ; titre central « FAUNINVADERS » méconnaissable sur m et l), Konnect4 (titre et « Easy / Medium / Hard » au-dessus du plateau), dans les trois formats.
- Pourquoi : l'état du jeu disparaît (heuristique 1). Le joueur ne sait ni son score ni ses vies. L'image, déjà très sombre, devient la zone la plus pauvre du site.
- Correction : intercepter `CanvasRenderingContext2D.fillText` et `strokeText` dans les canvas de jeu. Chaque appel écrit ses caractères directement dans la couche de cellules (un caractère réel par cellule, aligné sur la grille de 8 px, encre = couleur demandée), au lieu d'être rastérisé puis reconverti. Le reste du canvas passe dans l'ASCII comme aujourd'hui. Relever aussi la luminance des deux jeux : encre minimale à 35 % de luminance.
- Commande : /impeccable clarify puis /impeccable polish.

### [P1] Frontière photo / ASCII sans règle visible
- Où : bandeau BURROWS (photographique, 880 × 80 px sur bureau, avec le guide ASCII posé dessus) ; page de livre de Bakubook (scan photographique plein cadre) ; vignettes de pellicule de Kamorhogo et Fotofauna ; manche à balai du meuble rendu en ASCII alors qu'il est une commande, tandis que le manche de la barre du bas reste photographique ; cadre bois en cellules d'environ 16 px.
- Pourquoi : la règle « sous 8 × 8 cellules » dépend de la taille d'affichage. Un même objet change donc de matière selon l'appareil (jetons du Maskermind, plante, sangle de Fotofauna) : c'est un saut de rendu entre formats, contraire à la règle de continuité. Le visiteur lit des zones « oubliées » plutôt qu'un choix.
- Correction : remplacer le seuil de taille par un inventaire par catégorie, fixe sur tous les formats : (a) commandes (boutons, manettes, molettes, cartouche, compteur) toujours en image d'époque ; (b) décors, scènes, portraits, bandeaux, scans toujours en ASCII 8 px ; (c) petits sprites en ASCII à demi-blocs (voir innovation 8). Bandeau BURROWS et scan de Bakubook basculent en ASCII, avec le bouton TEXT de Bakubook comme voie de lecture. Cadre bois recalculé en 8 px réels (pas de `background-size` qui agrandit la texture de signes).
- Commande : /impeccable polish.

### [P1] La forme repose sur le fond de cellule, pas sur le signe
- Où : tous les grands rendus ; visible à l'agrandissement du motel, de Korong, de Kamorhogo.
- Pourquoi : c'est l'écart entre « filtre » et « ASCII saisissant de beauté ». Le papier de couleur par cellule recompose une image pixelisée à 8 px ; le signe, choisi parmi environ 25, ajoute un bruit sans dessiner. Les lettres restantes (F, k, h, q, g, P) se lisent comme du texte et brisent l'illusion.
- Correction : trois mesures. (1) Choisir le signe par appariement de forme sur la matrice 8 × 8 de luminance de la cellule (comparaison binaire ou SSIM contre les 8 × 8 réels de Press Start 2P), et non par densité. Les bords prennent alors `/ \ | _ - [ ]` au bon endroit. (2) Réduire le papier à une palette fermée de 16 teintes, tirée des images du motel, et laisser l'encre porter la luminance. (3) Bannir toute lettre de l'alphabet du rendu d'image, sauf les mots cachés de l'innovation 13.
- Commande : /impeccable overdrive.

### [P2] Téléphone portrait : textes microscopiques et coupures sans téléprompteur
- Où : DVD (« Select your language » à environ 6 px, ENGLISH / FRANÇAIS à 7 px) ; télé (grille des programmes à 5–6 px dans un écran réduit au tiers de la largeur, grand vide entre télé et magnétoscope) ; Minitel bureau (libellés INDEX, CANCEL, Esc à environ 6 px) ; FaunaTor (placeholder coupé) ; Bakubook (onglet « INTERNET AR » coupé) ; KorhogOS (panneau de bas de page coupé à « Korho ») ; Faunarratik (première ligne du texte rognée en haut, dernière en bas).
- Pourquoi : la règle de l'auteur exige le défilement sur place des textes trop longs et des proportions constantes ; ici, des cases coupent leur texte, et certains écrans perdent toute lisibilité.
- Correction : plancher de 8 px pour tout texte d'interface (un corps de cellule) ; téléprompteur appliqué à FaunaTor, aux onglets de Bakubook et au panneau KorhogOS ; télé du motel recadrée en portrait (écran à 92 % de la largeur, magnétoscope sous l'écran, plus de vide central) ; boîte de texte de Faunarratik dimensionnée sur son contenu ou défilante avec fondu.
- Commande : /impeccable adapt.

### [P2] Collisions et images cassées
- Où : cartouche rouge sur le « R » de Reporhogo (m, l) et sur le bouton X1 de Skoporhogo (d, m, l) ; porte-clés sur le titre KalabWiki (m) et sur le logo FaunaTor (tor.html, trois formats) ; guide posé sur la plaque « INSERT » du coffre LORE (MAUK TENIEB, bureau) ; deux icônes d'image cassée en tête du séquenceur Musik (d et m).
- Pourquoi : chaque collision dit « assemblé » plutôt que « construit ». L'icône d'image cassée est le défaut le plus visible du site pour un œil de métier.
- Correction : réserver une colonne de 6 cellules (48 px) à gauche pour la cartouche et le porte-clés sur toutes les pages hors borne ; donner au guide une zone d'arrêt qui exclut les plaques et les titres ; remplacer ou masquer les deux images de Musik qui ne chargent pas.
- Commande : /impeccable harden.

---

## 7. Signaux d'alerte par persona

Première visite (Jordan)
- Accueil bureau : huit éléments animés ou saillants au premier regard ; le seul indice d'action est la bulle « TAKE THE TOUR », posée sur un bandeau photographique qui ne se lit pas comme cliquable.
- Les boutons BC / TL / IG et les huit points de pagination ne disent rien ; c'est voulu, mais aucun retour visuel ne récompense le premier clic (pas de son-image visible sur la capture).
- Il entre dans FaunInvaders, ne lit ni le titre ni le score, et sort.

Joueur assidu (Alex)
- Pas de score lisible dans FaunInvaders ; pas d'état de partie visible dans les menus vides d'Erratik et de Fauna Chess (aucun record, aucun dernier niveau joué).
- Aucun tableau des meilleurs scores en Press Start, alors que c'est le premier objet de toute borne 1980–85.
- Les points de pagination ne permettent pas d'aller directement au jeu voulu : il faut cliquer en série.

Visiteur au téléphone (Casey)
- Télé et DVD : textes à 5–7 px, illisibles à bout de bras.
- FaunaTor : il ne voit pas la fin de la consigne du champ.
- Reporhogo et Skoporhogo : la cartouche recouvre le titre ou le premier bouton ; un pouce vise la cartouche et sort du lieu par erreur.
- Accueil portrait : le meuble de borne passe sous le pli ; seuls les boutons ronds sont visibles sans défiler.

---

## 8. Observations mineures

- Néon INSERT KOIN capturé dans sa phase éteinte (« NOIR INSEKT ») : contraste très faible dans cette phase ; garder une lueur résiduelle d'au moins 3:1 pour que le mot reste lisible même éteint.
- 404 TILT : figlet « big money » en police système, à 7 px sur bureau ; le dessiner en Press Start 2P, cellule 8 px, et l'agrandir à la moitié de la largeur de l'écran.
- Fiche Aube : « N° 09 » en sur-titre au-dessus du nom, barres de caractéristiques en simples traits roses, émojis ⭐ 🐓 ✋ en couleur système : trois signes génériques dans une fiche qui pourrait être une carte de jeu de 1983 (barres en blocs █ et ░, pictos dessinés).
- Grille télé en Arial gras : une police de télétexte 8 × 8 (type Bedstead / MODE 7) lui donnerait sa vraie matière d'époque.
- Kuration : « · · » doublé entre deux liens ; « 0 cassette » sans objet visuel (une cassette vide en ASCII suffirait).
- Pages de texte (bio, notes, kuration) : interligne correct, mais aucune trace du motel ; un liseré ASCII de 1 cellule (bord de papier peint du motel) les rattacherait au lieu.
- Musik bureau : les deux panneaux de droite restent noirs et vides à l'arrêt.
- Bakubook paysage : la zone de lecture s'écrase à environ 60 px de haut ; la vignette rouge du livre flotte seule.

---

## 9. Innovations

Chaque proposition se réalise en HTML/CSS/JS ou WebGL, reste dans la règle du corps unique de 8 px, et sert le monde ASCII-arcade-motel.

### 9.1 Atlas Korhogo 8 × 8 et appariement de forme
Construire un atlas de 128 à 256 signes de 8 × 8 dessinés pour Korhogo, dans l'esprit du PETSCII et de la page de code 437 : demi-blocs ▀ ▄ ▌ ▐, quarts de bloc, diagonales pleines, trames ░ ▒ ▓, coins arrondis, plus les signes de Press Start 2P. Chaque cellule de l'image source est comparée à chaque signe sur sa matrice 8 × 8 (distance de Hamming sur une binarisation adaptative, ou SSIM), avec deux couleurs (encre, papier) choisies par k-moyennes à 2 classes dans la cellule.
Valeur : esthétique (les contours se dessinent par le signe, comme dans les images PETSCII de démoscène) ; rationnelle (un seul atlas, une seule fonction pour tout le site).

### 9.2 Moteur ASCII en shader WebGL
Une seule passe de fragment shader : la texture source (image, vidéo, canvas de jeu) est échantillonnée par cellule ; l'indice de signe et les deux couleurs sont calculés sur la carte graphique ; l'atlas est une texture de 16 × 16 signes. 60 images/s même plein écran sur téléphone, zoom continu du motel sans recalcul de mise en page, vidéos de la Kave converties en direct.
Valeur : technique et ergonomique (fin des bandes noires de calcul, zéro saut pendant le zoom).

### 9.3 Transition « dégaussage » entre les lieux
Au changement de lieu, chaque cellule ne bascule pas d'un coup : elle parcourt un court chemin de signes voisins en forme (graphe de similarité précalculé sur l'atlas : `█ → ▓ → ▒ → # → +` jusqu'au signe d'arrivée), déclenché par une onde qui part du point de clic, avec un léger tremblement de couleur comme lors d'une démagnétisation de tube. Durée 400 à 600 ms.
Valeur : continuité (la règle zéro saut tenue à l'échelle de la cellule) ; signature visuelle reconnaissable entre toutes.

### 9.4 Phosphore : rémanence et respiration de la grille
Chaque cellule garde une mémoire de luminance qui décroît en 150 ms : les sprites qui marchent (guide, envahisseurs, personnages de Skoporhogo) laissent une traîne courte de phosphore vert-ambre. Au repos, 1 % des cellules du décor scintillent d'un signe voisin par seconde. Les lampes du motel suivent l'heure réelle affichée (02:12 → chambres sombres, néons plus forts).
Valeur : esthétique (matière d'écran vivante) ; ludique (le motel respire, l'heure se voit sans texte).

### 9.5 Son-image : la grille écoute
Brancher l'`AnalyserNode` de Web Audio de la piste en cours sur la grille : les montants du cadre bois deviennent un vu-mètre vertical en signes (densité par rangée = énergie de bande), les basses modulent la luminance de l'encre de 5 %, le séquenceur Musik allume les cellules du motel au rythme des pas actifs. L'insertion d'un Koin fait tomber une colonne de `$` dans la fente du compteur, avec le son d'une pièce.
Valeur : ludique et émotionnelle (le monde réagit) ; ergonomique (retour visible de l'état audio sans aucun libellé).

### 9.6 Curseur-cellule et loupe d'époque
Le curseur devient une cellule inversée (encre et papier échangés) qui glisse de case en case sur la grille. Un appui long ou la barre d'espace ouvre une loupe de 5 × 5 cellules qui montre l'image d'époque sous l'ASCII, comme un rayon X. Sur les commandes cliquables, la cellule-curseur clignote au rythme 1 Hz d'un curseur Minitel.
Valeur : reconnaissance sans texte (ce qui clignote se clique) ; ludique (le visiteur découvre la « photo cachée »), et la règle « l'image d'époque dans les commandes » devient un geste du jeu.

### 9.7 Texte de jeu écrit dans la grille
Interception de `fillText` dans tous les canvas (voir P1) : score, vies, titres, menus des jeux s'écrivent en caractères réels, alignés sur la grille, avec encre propre et papier transparent. Les titres d'écran d'accueil des jeux (Erratik, Fauna Chess) passent aussi dans la grille, en grands caractères composés de signes (lettres de 4 × 4 cellules).
Valeur : lisibilité totale (heuristique 1) ; cohérence (une seule typographie pour le jeu et pour l'image).

### 9.8 Demi-blocs pour les petits sprites
Sous 8 × 8 cellules, rendre l'objet en demi-blocs ▀ ▄ avec deux couleurs par cellule : la résolution verticale double (une cellule = 1 × 2 pixels de couleur), et la plante, les jetons du Maskermind, les avatars de Skoporhogo restent en ASCII lisible à toute taille. La matière ne change plus selon l'appareil.
Valeur : continuité entre formats ; rationnelle (une seule règle, plus de seuil).

### 9.9 Mode attraction de la borne
Après 40 s sans action, la borne entre en mode attraction comme une vraie borne de 1982 : travelling lent du motel, tableau des meilleurs scores en Press Start (initiales sur 3 lettres, scores de FaunInvaders et d'Erratik stockés en `localStorage`), « INSERT KOIN » qui clignote, puis retour. Le premier geste coupe l'attraction sans transition brusque.
Valeur : ludique et émotionnelle (pic final, envie de revenir) ; répond au joueur assidu sans une ligne d'explication.

### 9.10 Pagination en signes
Remplacer les huit points de pagination par huit petites vignettes ASCII de 3 × 2 cellules, une par jeu ou lieu (un envahisseur, une pièce d'échecs, un pendu, une grille de puissance 4…), avec la vignette active en encre pleine.
Valeur : reconnaissance plutôt que rappel, zéro texte ; cohérence avec la politique des pictogrammes.

### 9.11 Écrans diégétiques seulement : courbure et balayage
Réserver l'effet cathodique (balayage de 2 lignes par cellule, légère courbure en barillet, halo de 1 cellule) aux écrans du monde : télé, Minitel, moniteur de Kamorhogo, écran de jeu. Le reste du site reste à plat. La matière distingue ainsi l'objet « écran » de l'objet « meuble ».
Valeur : esthétique et rationnelle (l'effet porte du sens au lieu de couvrir tout le site).

### 9.12 Tramage temporel pour les vidéos
Pour les vidéos de la Kave et la neige du magnétoscope, alterner deux signes voisins d'une image à la suivante (tramage ordonné dans le temps) : l'œil intègre une valeur intermédiaire, la gamme tonale double sans changer de signe de base, avec le léger fourmillement d'un vrai tube.
Valeur : finesse de l'ASCII en mouvement ; matière d'époque.

### 9.13 Mots cachés dans le bruit
Les rares lettres permises dans le rendu d'image forment des mots de l'auteur à des endroits précis : FAUNA dans le carrelage du motel, KORHOGO dans le grain de la neige VHS, le nom d'un Masque dans la trame de son portrait. Visibles seulement à la loupe d'époque ou en arrêt sur image.
Valeur : initiatique (le site récompense l'attention) ; transforme le défaut actuel (lettres parasites) en écriture d'auteur.

---

## 10. Questions provocatrices

1. Si une photo d'époque peut encore apparaître n'importe où, le visiteur lit-il un monde en ASCII ou un site en cours de conversion ? Que gagnerait le motel si la seule image photographique de tout le site était celle que montre la loupe ?
2. Pourquoi les menus de jeux restent-ils les écrans les plus pauvres d'un site qui se présente comme une borne d'arcade ? Que vaudrait un écran-titre d'Erratik aussi travaillé que la Video Kave ?
3. Le cadre bois, le papier peint de Fotofauna et le fond tissé de KorhogOS sont trois textures ASCII de trois écoles différentes : quel tisserand du motel les a faites, et pourquoi pas le même ?
4. Que dit une page de notes en mono sur fond noir de l'endroit d'où elle vient ? Une page du motel peut-elle être imprimée sur le papier à en-tête du motel ?
5. Six familles de caractères à l'écran : laquelle appartient au motel en 1983, et laquelle à un navigateur de 2026 ?
6. Si la grille de signes était le seul instrument (image, texte, son, transition), quel élément du site actuel survivrait-il tel quel ?
