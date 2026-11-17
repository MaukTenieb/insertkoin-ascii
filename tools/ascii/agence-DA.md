# Jury d'agences — passage 5 — angle direction artistique

Corpus vu : les 35 captures bureau (d-*.png) en entier ; les 35 téléphones portrait (m-*.png) et les 35 paysages (l-*.png) en planches, dont une vingtaine regardées de près ; agrandissements ×3 du motel (d-fr), du cadre bois (d-MAUK_TENIEB), du HUD de FaunInvaders, de l'accueil voilé (d-home), de la Kave et de Korong.
Grille : critique.md, craft-floor.md, critique-A.md. Choix d'auteur jugés comme tels : Index of, Weaky crème, « Truce/↑héé↑è↑e », guide qui marche.

---

## 1. Notes

| Angle | Note | Critique A (équivalent) |
|---|---|---|
| Direction artistique (beauté, typographie, couleur, matière ASCII, cohérence, absence de look IA) | 6,5/10 | 5,5 |
| Note globale (DA, UX, responsive confondus) | 6,5/10 | 5,6 (18/32) |

Lecture d'un jury Awwwards/ADC : le monde est signé, plusieurs grands tableaux ASCII méritent une mention (Video Kave, Korong, KamOrhogo, Skoporhogo). Le site manque encore le prix pour trois raisons : la matière ASCII se lit toujours comme un filtre de mosaïque ; la typographie compte six à sept familles sans système ; les écrans de jeu et les pages de texte retombent dans un noir générique, très loin des pics.

---

## 2. Progrès depuis la critique A

1. Bandeau BURROWS passé en ASCII 8 px sur tous les formats : la rupture photo/ASCII la plus visible de l'accueil disparaît.
2. Titres de jeux réécrits nets dans la grille : FAUNINVADERS, KATABATIK (Konnect4), ERRATIK, FAUNA CHESS, REPORHOGO se lisent en Press Start sur les trois formats. Le creux de FaunInvaders/Konnect4 relevé en A se réduit nettement.
3. Cartouche rouge déplacée en bas à gauche sur les pages hors borne (bio, notes, kuration, Skoporhogo, Reporhogo bureau) : plus de collision avec le bouton X1 de Skoporhogo ni avec le « R » de Reporhogo sur bureau.
4. Commandes en image d'époque partout : la règle est désormais lisible et constante (manette, boutons ronds, plaques, molettes, jetons du Maskermind, Koins). La frontière photo/ASCII obéit enfin à une catégorie et non à une taille.
5. Fiche Aube : portrait passé en ASCII, fin et chaud ; c'est l'un des plus beaux portraits du site.
6. Téléprompteur actif dans la grille télé et le placeholder de FaunaTor (téléphone) : les coupures sèches de A deviennent des défilements.
7. Télé du motel en portrait : l'écran occupe désormais toute la largeur.
8. Le magnétoscope de la VHS et les cassettes passent en ASCII avec des tranches lisibles (« 3 BRUMAIRE 235 ») : bonne preuve que le corps 8 px peut porter du texte d'objet.

---

## 3. Défauts restants

Sévérités : P0 bloquant, P1 majeur, P2 notable, P3 finition.

### Matière ASCII

**[P1] Le signe ne dessine toujours pas : vocabulaire de convertisseur et lettres parasites**
- Écrans : tous les grands rendus ; flagrant à l'agrandissement du motel (d-fr, d-BURROWS, d-MAUK_TENIEB), de la Kave et de Korong ; trois formats.
- Constat : environ 25 signes (`" ; ~ = / \ # & @ ! ? [ ] < > + * $ %`), et des lettres lisibles au milieu du décor : F, R, h, j, L, k, K, M, H, J. Le « @ », le « $ » et le « & » ajoutent un bruit de convertisseur en ligne. Le fond de cellule porte l'image ; le signe ne trace aucun contour.
- Correction (ascii-live.js) : remplacer le choix par densité par un appariement de forme. Précalculer la matrice 8×8 binaire de chaque signe autorisé de Press Start 2P (rendu hors écran sur un canvas 8×8). Pour chaque cellule, binariser la luminance source (seuil = moyenne de la cellule), retenir le signe de distance de Hamming minimale, encre = moyenne des pixels « allumés », papier = moyenne des pixels « éteints ». Liste blanche stricte, sans lettres ni chiffres : `  . , : ; ' " - _ = + ~ ^ * / \ | ( ) [ ] < > ! ? # % ░ ▒ ▓ █ ▀ ▄ ▌ ▐` (vérifier la présence des blocs dans Press Start 2P ; sinon les dessiner en SVG 8×8 dans une police d'appoint « KorhogoBlocks » chargée en `@font-face`, `unicode-range` limité aux blocs).

**[P1] Cadre bois et papier peint de la borne : cellule double et lettres en texture**
- Écrans : d-MAUK_TENIEB, d-3615, d-FaunEye-* (montants et frise haute), m-* (bas d'écran sous la barre), l-home.
- Constat : à l'agrandissement, les signes du bois mesurent environ 14–16 px, deux fois le corps du motel. Ce sont des lettres capitales (K, H, M, J, F) et des `&` : le bois se lit comme un mur de texte, pas comme du bois. Rupture directe avec la règle « un seul corps ».
- Correction (ascii-commun.css) : la texture du bois est une image de fond agrandie. Imposer `background-size: auto` (ou la taille native exacte de la tuile en multiples de 8 px), `image-rendering: pixelated`, et régénérer la tuile à 8 px avec la liste blanche ci-dessus et un vocabulaire de fibres : `| ! : ' ( )` pour le fil vertical, `~ -` pour les nœuds, papier en 3 bruns. Une seule tuile pour bois de borne, cadre Fotofauna et cadre KamOrhogo.

**[P1] Accueil bureau voilé d'un grain gris**
- Écran : d-home (première impression du site). La même vue sur d-fr est nette et contrastée.
- Constat : un voile de bruit fin couvre le motel ; couleurs ternes, contours perdus. Si c'est la phase d'entrée, elle dure assez longtemps pour être capturée après l'attente du crawl.
- Correction (ascii-live.js) : vérifier l'état initial de la couche ; si un fondu ou un calque de grain précède le premier rendu, le ramener sous 300 ms, ou partir de l'image ASCII finale et animer seulement l'opacité du voile de 1 à 0 en courbe exponentielle sortante. Aucune frame ne doit montrer le motel sous un voile après 600 ms.

**[P2] FaunInvaders : HUD toujours illisible, sprites trop sombres**
- Écrans : d/m/l-KorhoGame-FAUNINVADERS.
- Constat : le titre est réglé, mais la ligne du haut (score, vague, vies) reste une bouillie de barres (agrandissement : « IDANC: 1 LORD33 LOCADOO »). Les envahisseurs restent sous 20 % de luminance ; le dernier rang disparaît.
- Correction (ascii-lisible.js) : étendre l'interception de `fillText` au HUD (les appels se font hors de l'écran-titre, à chaque frame : garder la table des textes par frame et la purger à chaque `clearRect` plein cadre). Plancher d'encre : luminance de l'encre ≥ 0,35 dans ce canvas (relever en HSL, teinte conservée).

**[P2] Konnect4 : libellés Easy / Hard illisibles et traces de signes au-dessus**
- Écrans : d/m/l-KorhoGame-KONNECT4.
- Constat : « Easy » et « Hard » restent en ASCII sombre, avec des fragments de signes au-dessus (rémanence de rastérisation). Sur téléphone ils tombent à environ 5 px.
- Correction (ascii-lisible.js) : même interception `fillText`, avec un corps plancher de 8 px ; masquer les cellules de la couche ASCII sous la boîte du texte réécrit (cellules papier transparentes, encre nulle).

### Typographie

**[P1] Six à sept familles sans système**
- Écrans : site entier.
- Inventaire visible : Press Start 2P (titres, compteur) ; condensée de type Barlow (UI, boutons, consignes) ; condensée haute de type Oswald (« Aube », « Reporhogo » de reporhogo.html, FaunaTor) ; sérif de livre (Bakubook, DVD) ; Arial gras (grille télé, KorhogOS, Wiki) ; mono à « ƒ » de machine à écrire (bio, notes, kuration) ; Times (Index of, choix d'auteur).
- Pourquoi : chaque lieu a le droit à son objet d'époque, mais le site n'a pas de règle qui dise quand une famille entre. Le visiteur lit « assemblé ».
- Correction (ascii-commun.css, ascii-annexe.css) : trois rôles, pas plus, hors objets diégétiques. (1) Press Start 2P : titres, chiffres, compteurs, HUD. (2) Une seule condensée d'interface (garder Barlow Condensed) pour boutons et consignes, sur tout le site, y compris « Aube » et « Reporhogo » de reporhogo.html. (3) La mono des pages de texte. Les objets diégétiques gardent leur police d'objet (Vidéotex du Minitel, sérif du livre, Times de l'Index, police CDE de KorhogOS), mais la grille télé passe d'Arial à une police de télétexte 8×8 (Bedstead, licence libre, ou MODE 7 de la BBC) : c'est la plus grande surface d'Arial du site.

**[P2] Dégradé de texte sur « Reporhogo » (reporhogo.html)**
- Écrans : d/m-reporhogo.html.
- Constat : titre en dégradé vert-or : motif listé par craft-floor comme réflexe générique, et seul titre du site traité ainsi, alors que la version borne (d-SurFauna-REPORHOGO) est en Press Start ambre, bien plus juste.
- Correction (ascii-annexe.css) : `background: none; -webkit-text-fill-color: currentColor; color: #f2c14e; font-family: 'Press Start 2P'; font-size: 32px` (multiple de 8), ombre portée décalée 2 px brun sombre comme REPORHOGO de la borne.

**[P2] Sur-titres et marqueurs génériques**
- Écrans : d/m-fauna-aube (« N° 09 » rose au-dessus du nom) ; d/m/l-ERRATIK (« KORHOGO · MEMORY ») ; Akasztófa (« AKASZTÓFA » au-dessus de « PLAGUE OF JUSTINIAN »).
- Pourquoi : le sur-titre est la seule interdiction ferme de craft-floor. Ici il nuit peu au sens, mais c'est la signature visuelle d'un gabarit.
- Correction : fondre le numéro dans le titre (« Aube » puis « 09 » en Press Start 8 px dans l'angle du portrait, comme une carte à collectionner) ; pour Erratik, placer « KORHOGO · MEMORY » sous les boutons, en pied d'écran, au corps 8 px, comme un crédit de borne.

**[P2] Fiche Aube : barres et émojis**
- Écran : d/m-fauna-aube.
- Constat : barres roses en simple trait de 4 px ; émojis système ⭐ 🐓 ✋ en couleur Apple/Google ; le portrait ASCII annonce une carte de 1983, la fiche finit en tableau de bord.
- Correction (ascii-annexe.css + ascii-lisible.js) : barres en cellules Press Start, 10 cellules par barre, `█` encre rose pour les points acquis, `░` pour le reste ; valeur en Press Start à droite. Remplacer les émojis par trois pictos 8×8 dessinés (étoile, coq, main) en ASCII monochrome rose, ou à défaut `font-variant-emoji: text` avec une police monochrome.

### Couleur et lumière

**[P2] Écrans de jeu en noir uniforme, sans lumière**
- Écrans : Erratik, Fauna Chess, Faunarratik, Akasztófa, Maskermind, FaunaTor ; trois formats.
- Constat : fond #0a0a0a quasi plat, cadre bleu nuit à peine visible, halo brun en haut. Les pics (Kave, Korong) ont une lumière et une matière ; ces écrans n'en ont aucune. Le contraste émotionnel pic/creux reste trop fort.
- Correction (ascii-commun.css) : poser derrière chaque écran de jeu une trame ASCII de fond à 6–8 % d'opacité, tirée d'une image du monde propre au jeu (échiquier pour Fauna Chess, cartes retournées pour Erratik, potence pour Akasztófa), en encre ambre très sombre ; ajouter un dégradé radial de phosphore (centre `rgba(255,170,60,.05)` vers transparent) pour donner un foyer.

**[P2] Akasztófa et Konnect4 paysage : composition décentrée, moitié droite vide**
- Écrans : d-KorhoGame-AKASZTÓFA (contenu dans la moitié gauche), l-KorhoGame-KONNECT4 (plateau à gauche, droite vide).
- Correction (ascii-commun.css) : centrer le groupe (potence + clavier) dans l'écran, `justify-content: center; gap: 64px` ; en paysage, plateau Konnect4 centré, hauteur 100 % de l'écran utile.

**[P3] Néon de l'accueil capturé éteint**
- Écrans : m-BURROWS (« INSERT KOIN » presque invisible), m-home, d-LoreLore.
- Correction : lueur résiduelle minimale de 3:1 dans la phase éteinte (`text-shadow` plancher, encre à 40 % au lieu de 10 %).

### Cohérence d'univers

**[P1] Images photographiques hors commandes**
- Écrans : Bakubook (page de livre et couverture, trois formats) ; vignettes de pellicule de KamOrhogo et Fotofauna (bureau, image sépia nette) ; avatars de Skoporhogo (photographiques à 32 px) ; bandeau horizontal photographique sous l'écran de Fotofauna.
- Pourquoi : la règle affichée dit « commandes en image d'époque, tout le reste en ASCII ». Une page de livre n'est pas une commande ; la pellicule non plus. Ces quatre objets sont les derniers « oublis » visibles.
- Correction (ascii-live.js) : convertir la page Bakubook en ASCII 8 px (le bouton TEXT reste la voie de lecture ; la loupe montre le scan d'origine) ; vignettes de pellicule et avatars de Skoporhogo en ASCII à demi-blocs `▀▄` (deux couleurs par cellule, résolution verticale doublée), seule façon de garder un visage lisible à 32 px.

**[P1] Images cassées du séquenceur Musik**
- Écrans : d-FaunEye-MUSIK, m-FaunEye-MUSIK (deux icônes d'image manquante sur fond blanc en tête de colonne). En paysage, la colonne montre des sprites : l'erreur dépend du format.
- Correction (ascii-live.js) : sur `error` de ces `<img>`, retomber sur le sprite de la piste (même source que la version paysage) ; à défaut, `visibility: hidden` et fond transparent pour la cellule blanche. Défaut le plus visible du site pour un œil de métier.

**[P2] Deux barres de commande différentes**
- Écrans : borne (d-3615, d-FaunEye-*, d-KorhoGame-*) contre Kave (d-kave_*, d-tor) : barre plus basse, « KOINS 3 » en 13 px au lieu de 16, pictos plus petits, pastille FR en plus. Sur d-kave_wiki, « KOINS » tombe en gris à environ 10 px.
- Pourquoi : la règle de l'auteur veut les mêmes fonctions partout, placement propre à chaque lieu, DA commune. Ici la DA elle-même diverge (taille du compteur, contraste).
- Correction (ascii-commun.css) : une seule échelle pour le compteur (Press Start 16 px, ambre #ffb347 avec lueur) et pour les pictos (44 px), sur toutes les pages ; seul l'habillage du fond change par lieu.

**[P2] Collisions du guide et du porte-clés**
- Écrans : guide sur le bouton BC (m-BURROWS), sur IG (l-fr), sur KORHOGAME (l-BURROWS), sur la barre KOINS (l-LoreLore), sur la plaque SURFAUNA (d-MAUK_TENIEB), sur l'icône FaunEye (d-kave_kos) ; porte-clés sur le titre « FaunaTor » (d/m-tor), sur le titre du Wiki (m/l-kave_wiki) ; cartouche sur « APPEARANCE » (m-fauna-aube), « Launchpad » (m-reporhogo), « ktenieb.github.io » (m-notes).
- Correction (ascii-live.js, ascii-commun.css) : zones d'exclusion du guide = rectangles de toutes les commandes (`button, [role=button], .plaque, .koins`) agrandis de 8 px ; le guide s'arrête sur la première case libre. Pages de texte : `padding-left: 64px` réservé au porte-clés et `padding-bottom: 72px` à la cartouche, sur téléphone.

**[P2] Pages de texte sans trace du motel**
- Écrans : bio, notes, kuration (trois formats).
- Constat : inchangé depuis A. Mono sur noir, liens bleu web standard (#3ab0ff soulignés). Le bleu web est la seule couleur du site qui n'appartient à aucune image du motel.
- Correction (ascii-annexe.css) : liens en ambre du compteur, soulignement en pointillé de 1 px décalé de 3 px ; liseré ASCII d'une cellule en tête et pied de page, tiré du papier peint de Fotofauna ; « · · » doublé de kuration réduit à un seul séparateur ; « Ø cassette » accompagné d'une cassette vide ASCII de 6×3 cellules.

### Responsive (angle DA)

**[P1] DVD sur téléphone : texte microscopique**
- Écran : m-kave_dvd. « Select your language » vers 6 px, ENGLISH / FRANÇAIS vers 8 px dans un écran de 390 px, télécommande photographique trois fois plus grande que le menu.
- Correction (ascii-annexe.css) : sous 600 px, menu DVD à `font-size: clamp(14px, 4.5vw, 22px)`, sous-titre à 12 px minimum, menu dans le tiers haut, télécommande réduite à 70 %.

**[P2] Grille télé sur téléphone et paysage**
- Écrans : m-kave_tv (grille vers 6 px, grand vide brun sous la télé), l-kave_tv.
- Correction : sous 600 px, réduire la grille à 3 lignes et 2 colonnes horaires, corps 10 px en police de télétexte ; remonter le magnétoscope juste sous l'écran.

**[P2] Coupures en paysage**
- Écrans : l-3615 (CONNECT / END coupé par le bas), l-LoreLore (bulle « MAUKIE'S INSTA. » coupée en haut), l-FaunEye-BAKUBOOK (zone de lecture vers 60 px de haut, couverture en vignette isolée), m-kave_kos (barre de tâches coupée : « Korho… », « SurF… »).
- Correction : 3615 paysage, clavier en `max-height: calc(100dvh - 72px)` avec défilement interne ; bulles du guide contraintes au viewport (`clamp` sur top/left) ; Bakubook paysage, masquer la rangée de livres colorés sous 420 px de haut et donner la hauteur libérée à la page ; barre CDE en téléprompteur ou en deux rangées.

**[P3] Korong téléphone : bandes vides**
- Écran : m-KorhoGame-KORONG. Tableau en 4:3 dans un cadre 9:16, 180 px de vide brun au-dessus et en dessous.
- Correction : en portrait, recadrer le tableau en 3:4 centré sur le groupe (object-position sur le téléviseur), ou poser KOMPETE! et le compteur dans la bande du haut et la pagination dans celle du bas.

**[P3] 404 TILT : figlet générique**
- Écrans : d/m/l-404. Le gabarit « $$ » (figlet « Big Money ») en police système, à 10 px. Inchangé depuis A.
- Correction (ascii-annexe.css) : redessiner TILT en lettres de 5×7 cellules faites de `█ ▀ ▄` en Press Start, cellule 8 px, largeur 50 % de l'écran, rouge flipper avec clignotement 1 Hz ; rien d'autre ne change.

---

## 4. Les 5 corrections qui rapportent le plus

1. **Appariement de forme et liste blanche sans lettres** (ascii-live.js). Fait passer tout le site de « filtre » à « écriture ASCII ». Touche 80 % de la surface visible.
2. **Tuile bois et papier peint recalculées à 8 px réels** (ascii-commun.css). Supprime la seule rupture de corps encore visible à l'œil nu sur chaque écran de la borne, et les capitales qui en font un mur de texte.
3. **Système typographique en trois rôles + télétexte pour la télé + fin du dégradé Reporhogo** (ascii-commun.css, ascii-annexe.css). Le saut de cohérence le plus rapide à obtenir ; un jury le voit en dix secondes.
4. **Derniers objets photographiques hors commandes en ASCII (Bakubook, pellicules, avatars Skoporhogo) + images cassées Musik** (ascii-live.js). Rend la règle du clone absolue.
5. **Lumière et trame de fond des écrans de jeu + HUD FaunInvaders + Easy/Hard Konnect4** (ascii-commun.css, ascii-lisible.js). Relève les creux du parcours au niveau des pics ; les jeux sont la raison d'être d'une borne.

---

## 5. Trois idées d'excellence (angle DA)

### 5.1 Palette fermée Korhogo de 16 teintes
Extraire par k-moyennes, sur les images du motel, de la Kave et de Korong, une palette de 16 couleurs (comme les 16 couleurs du C64 ou de la page CGA, mais propres au motel : bruns de moquette, vert sarcelle des chambres, ambre des néons, rose d'Aube, bleu du téléviseur). Quantifier encre et papier de chaque cellule sur cette palette (ascii-live.js, distance en Oklab). Effet : toutes les images du site parlent la même langue de couleur ; les rendus cessent de ressembler à des photos tramées et prennent l'unité d'une machine de 1983. Réalisable en une fonction de 30 lignes et une constante de 16 valeurs, partagée par tous les lieux.

### 5.2 Une seule tuile-matière, quatre essences
Dessiner à la main quatre tuiles ASCII de 32×32 cellules, en 8 px réels, à vocabulaire fixe : bois (borne, cadres), papier peint (Fotofauna, liseré des pages de texte), tissu (fond KorhogOS), métal perforé (meuble de la borne). Mêmes règles de dessin pour les quatre (liste blanche, palette 5.1, deux encres maximum). Le « tisserand du motel » de la critique A devient une seule main. Livrable : 4 PNG de 256×256 générés par un script hors ligne, chargés en `background` avec `background-size: 256px` et `image-rendering: pixelated`.

### 5.3 Typographie de cellule pour les titres
Composer les grands titres (ERRATIK, FAUNA CHESS, FAUNINVADERS, REPORHOGO, KOMPETE!, TILT, Notes, Korhogo Kuration) en caractères de Press Start agrandis par la grille elle-même : chaque pixel de la lettre devient une cellule de 8 px remplie d'un signe (`█` au cœur, `▀ ▄ ▌ ▐` aux bords, `░` pour l'ombre portée décalée d'une cellule). Le titre reste lisible de loin et devient ASCII de près, exactement comme les grandes images. Effet : fin des lueurs CSS (text-shadow ambre flou, proche du look IA) au profit d'un relief dessiné ; titres, images et HUD partagent une seule matière. Réalisable en `<pre>` généré par ascii-lisible.js à partir de la matrice 8×8 de chaque lettre, avec `aria-label` portant le titre.

---

## Synthèse

Le passage 5 règle les ruptures les plus grossières (bandeau BURROWS, titres de jeux, cartouche, règle des commandes) et consolide les pics. Le site atteint le niveau d'un bon projet d'auteur ; il lui manque, pour un prix, une matière ASCII réellement dessinée, une palette et une typographie en système, et des écrans de jeu aussi habités que la Video Kave.
