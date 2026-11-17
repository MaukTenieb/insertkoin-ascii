# Insert Koin ASCII — Assessment B : preuves mesurées

Audit scripté (Playwright Python, Chrome /usr/bin/google-chrome, SwiftShader), serveur local http://localhost:8765/, 17 nov. 2026. Scripts : /home/claude/jb/audit.js (mesures en page), run.py (navigation, chronologie des conversions, console, réseau), rm_focus.py (mouvement réduit, focus clavier), merge.py, summ.py. Données brutes : res_{desk,tel,pay}_m.json, res_rm_focus.json. Captures : /home/claude/jb/shots/.

Échantillon : 23 écrans × 3 formats = 69 mesures (12 états de borne dans index.html + 11 pages seules). Chaque écran : chargement, clics, puis relevé du nombre d'éléments blob: chaque seconde jusqu'à 4 relevés identiques (16 relevés au plus), puis audit.

## 1. Synthèse chiffrée par format

| Mesure | Bureau 1440×900 | Téléphone 390×844 | Paysage 844×390 |
|---|---|---|---|
| Écrans mesurés | 23 | 23 | 23 |
| Éléments texte visibles | 476 | 389 | 346 |
| Textes sous le seuil WCAG (4,5:1 ou 3:1 grand) | 81 | 63 | 86 |
| Cibles interactives < 44×44 px / interactifs visibles | 305 / 539 | 206 / 385 (53 %) | 230 / 386 |
| Écrans avec scrollWidth > clientWidth | 9 | 8 | 9 |
| Textes coupés hors .ascii-tp | 7 | 12 | 11 |
| Éléments texte hors vue à droite | 2 | 6 | 7 |
| Erreurs console (somme) | 56 | 53 | 47 |
| Stabilisation des conversions blob: (médiane / max) | 2,7 s / 99,3 s | 1,0 s / 47,7 s | 1,0 s / 30,2 s |
| Tailles de texte distinctes (tous écrans) | 43 | 28 | 28 |
| Familles de polices chargées (document.fonts) | 13 | 13 | 13 |

## 2. Défauts mesurés

### 2.1 Visuels non ASCII (critère 5)
Méthode : <img> visibles > 64 px sans blob:/data:, fonds image > 64 px sans blob:, canvas sans canvas[data-ascii-overlay]. Les .webp de la racine (skin-*, plaque-*, butee-*, kave/a/vhs/etagere-*, magnetoscope) sont des rendus ASCII précalculés (vérifié visuellement sur skin-metal-flanc.webp et etagere-1.webp, chacun flanqué d'un .webp.txt) : ces détections sont des faux positifs. Les fichiers servis depuis /_o/ sont les originaux photographiques : défauts réels.

| Sélecteur | Fichier | Taille mesurée | Écrans / formats |
|---|---|---|---|
| .b-bezel > button.b-sticker.b-land (fond) | _o/poster-800.webp (peinture de groupe en couleur, en clair) | 878×74 bureau, 368×74 tél., 399×70 paysage | accueil, MAUK TENIEB, BURROWS (+ état LoreLore) — 3 formats ; visible en capture tel_accueil.png (bandeau BURROWS photographique) |
| .tw > img (porte-clé du motel) | _o/kave/a/porte-cle.webp | 30–40 × 97–121 px | accueil, MAUK TENIEB, BURROWS, kave/tv, kave/videoclub, kave/wiki — 3 formats |
| div#mz-ttb / #mz > div.mzbar (fond) | _o/kave/a/mix/screw.webp | 140×31 tél., 818×46 paysage | FaunEye/MUSIK |
| .b-sticker > i.b-paper (fond) | _o/sticker-lore-papier-sang.webp | 80×34 | téléphone (état après échec LoreLore) |
| canvas#screen | rendu Vidéotex en canvas, sans calque data-ascii-overlay | 545×426 bureau, 329×257 tél., 413×323 paysage | 3615/index (3 formats) — faux positif probable : le canvas dessine des glyphes Vidéotex |

Observation en capture (hors détecteur, éléments ≤ 64 px) : le joystick, les boutons BC/TL/IG et la pièce KOINS de la borne apparaissent en rendu photographique lisse sur tel_accueil.png et desk_accueil.png.

### 2.2 Contrastes (critère 1)
Fond calculé par composition des ancêtres jusqu'au premier fond opaque. Quand un ancêtre porte une image de fond (colonne bgImg), le fond réel diffère : ces cas sont signalés comme douteux.

| Sélecteur | Texte | Ratio | Couleur / fond calculé | Écrans | Statut |
|---|---|---|---|---|---|
| .hit > b > span, b > small.b-sc (touches KorhoGame/3615…) | « Korhogame », « 3615 » | 1,09–1,77 | rgb(20,12,6) sur image de touche | accueil, MAUK TENIEB, BURROWS, 3 formats | douteux : fond image ; la capture montre « KORHOGAME » en orange pâle sur orange, peu lisible (défaut visuel réel sur cette touche) |
| button#kapture | « KAPTURE » | 1,00 | color transparent | 3 formats | faux positif probable (texte rendu par autre moyen) |
| .b-sticker > b, .b-sticker > span.b-word | « MAUK TENIEB » | 1,00–1,74 | color transparent / image | 3 formats | faux positif probable |
| .fk > span, .fk > small (touches Minitel) | « Index », « Esc » | 1,07 / 1,40 | rgb(34,28,22) sur rgb(25,22,19) | 3615/index, 3 formats | faux positif probable : fond de touche en dégradé clair (capture desk_3615_index.png lisible) ; les sous-libellés « Esc », « PgUp » restent petits (12–13 px, gris sur gris clair) |
| .ctl > span.ctl-label | « Colour », « Speed » | 1,76 | rgb(74,63,51) sur fond calculé sombre | 3615/index | douteux : libellés sur le plastron beige, 12 px |
| .b-online > b | « 1 » | 1,52 | rgb(58,48,38) sur rgb(14,12,11) | 3615 (borne), bureau | défaut réel (fond uni) |
| .mzlb > span, .ascii-tp > span.tp | libellés de pistes Musik | 1,25 | fond image | FaunEye/MUSIK bureau (10+10) | douteux |
| .vhs-slot > div.vhs-label, .vhs-spine-line > span.vhs-tape-name / -rep | « 1/99 — … », noms de cassettes | 1,46–1,85 | rgb(29,42,107) bleu sur noir | FaunEye/VHS, 3 formats | défaut réel probable |
| .fam > small.kpt | « 98 », « 742 » | 2,50 | rgb(90,81,64) sur rgb(12,12,13) | fotofauna, 3 formats | défaut réel (fond uni) |
| main > pre (ASCII art 404) | bannière | 3,73 | rgb(201,48,42) sur rgb(11,9,8), 12 px | 404, 3 formats | défaut réel au seuil 4,5 (texte décoratif : sévérité faible) |

### 2.3 Cibles tactiles < 44×44 px (critère 2, téléphone 390×844)
206 cibles sur 385 interactifs visibles (53 %). Principales (occurrences cumulées sur les écrans) :

| Sélecteur | Taille | Écrans |
|---|---|---|
| .b-dots > button.b-dot | 34×30 | tous les sous-écrans de borne (41 occ.) |
| .b-pfx > button.b-px (.b-px-son, -pl, -kap, -dik) | 34×36 | 11 écrans de borne chacun |
| .b-pfx > button.b-px.b-px-lg (FR/EN) | 35×24 | kave/tv… |
| .lobby-in > button.spot | 36×115 | KorhoGame (14) |
| .mzrow > button.mznm.mzfg | 58×34 | FaunEye/MUSIK (15) ; bureau : 78 cibles < 44 sur 103 |
| #mz-pat > button, #mz-len > button, #mz-pg > button, #mz-view > button | 38–40×40 | FaunEye/MUSIK |
| .vhs-keys > button.vhs-key (Power, Eject, Play, REC, Random) | 15–19 × 25–27 | FaunEye/VHS |
| .b-bezelfoot > button.b-imm / .b-boom, div.b-stick.b-stick-mini | 28–41 px | accueil, BURROWS, kave/tv |
| .dock > button.b-bell | 32×32 | accueil |
| button#kapture, button.b-boom.b-mag | 28×28 (tél.) | accueil |
| div#radio-toggle | 282×30 | accueil |
| #tabs > button | 97×26 | kave/wiki |
| .lock > button | 26×22 | kave/kos |
| .rail > button.gchip | 40×44 | fotofauna |
| footer > a, li > a, h3 > a | ~80×16–24 | notes, liens texte |

### 2.4 Débordements et textes coupés (critère 3)
- Borne (index.html, sous-écrans KorhoGame, FaunEye, SurFauna, 3615) : scrollWidth − clientWidth = 25–46 px (bureau), 56–69 px (tél.), 69–78 px (paysage), avec overflow-x: hidden sur html et body : contenu rogné à droite, sans barre de défilement. Paysage accueil / MAUK TENIEB : 8 px (body overflow-x: clip).
- 3615/index bureau : body.scrollWidth 1877 px pour 1440 px, overflow visible, mais window.scrollX reste 0 et aucun élément ne dépasse le bord droit au relevé : faux positif probable (élément transformé ou hors flux).
- Textes coupés hors .ascii-tp : fotofauna `.fam > small.kpt` (scrollWidth 11–18 px pour clientWidth 1 px, 6–7 occurrences, 3 formats) ; FaunEye/VHS `.vhs-vfd > span.vhs-vfd-state` (« Stop », 32 px pour 1), `.vhs-vfd-counter` (« 00:00:00 », 73 pour 1), `.vhs-shelf-head > span.vhs-shelf-title` (« CASSETTES », 84 pour 1) — tél. et paysage. Les `.vhs-sr` (8–25 px pour 1) relèvent du texte réservé aux lecteurs d'écran : faux positifs.
- Hors vue à droite : kave/kos `.ws > button` (right 425 px, tél.) et `.ctl > div.tab`, `.body > small` (903 px, paysage) ; kave/wiki `#tabs > button` (425 px tél., 874 px paysage) ; kave/tv `span#gtk` (466 px, tél. — bandeau défilant, faux positif probable) ; FaunEye/VHS `.vhs-spine-line > span` (846 px, paysage) ; `.b-tk > span.b-u.b-c` (1153–1772 px, bandeau téléscripteur, faux positif probable).

### 2.5 Polices et tailles (critère 4)
13 familles chargées partout : Archivo, Arimo, Barlow Condensed, Bebas Neue, Bungee, DM Mono, Garamond, IK Arcade, IK Mono, Permanent Marker, Press Start 2P, VT323, W95. Les noms CSS masquent d'autres fichiers : « DM Mono » charge a/barlow-semi-condensed-latin-500-normal.woff2, « Bebas Neue » charge a/league-gothic-latin-400-normal.woff2.
Part des éléments texte visibles par famille (première famille de la pile calculée) :
- Bureau (476) : DM Mono 39 %, Arimo 21 %, Barlow Condensed 16 %, IK Mono 8 %, Bebas Neue 6 %, Press Start 2P 4 %, Permanent Marker 3 %.
- Téléphone (389) : Arimo 38 %, DM Mono 26 %, Bebas Neue 11 %, Barlow Condensed 7 %, IK Mono 7 %, Press Start 2P 5 %.
- Paysage (346) : Arimo 33 %, DM Mono 23 %, Bebas Neue 14 %, Barlow Condensed 10 %, Press Start 2P 6 %.
Tailles : 43 valeurs distinctes au bureau (12 px dominant, puis 16, 11, 16,2, 15, 13, 13,44 px…), 28 au téléphone (9 px et 12 px dominants ; 8 px : 7 éléments), 28 en paysage. Le corps « Press Start 2P 8 px » annoncé concerne une minorité des textes mesurés (≤ 6 %, et 8 px pour 7 éléments seulement au téléphone).
404.html : la police est demandée à /insertkoin-ascii/font-press-start-2p-latin-400-normal.woff2 (404 en local, chemin absolu GitHub Pages) ; la famille rendue s'appelle « PS2P ».

### 2.6 Console et réseau (critère 6)
Erreurs locales (le reste relève de l'absence de réseau du bac à sable) :
- `GET /_o/%23n` → 404 sur chaque écran de borne (1–2 par écran, 3 formats) ; `GET /_o/kave/%23n` sur kave/tv ; `GET /_o/3615/%23g` et `/_o/3615/%23s` → 404 sur 3615/index et 3615 (borne). Une référence d'ancre (#n, #g, #s) passe par la réécriture vers _o/ : défaut réel du convertisseur (ascii-live.js, fonction de réécriture ligne ~227), sans effet visuel mesuré.
- BURROWS : iframe `.b-full > iframe` src=/katabase/ → 404 ; le dossier katabase/ est absent du clone. Défaut réel.
- 3615 (borne) : /insertkoin/ik-ecran.js, /insertkoin/palmares.json, /insertkoin/palmares-rules.js → 404 : chemins absolus du site source ; faux positif local probable, à vérifier en ligne.
- Externes refusés par le proxy du bac à sable (faux positifs d'environnement) : youtube.com/iframe_api (12×), korhogo.substack.com, archive.org (CORS), commons.wikimedia (API catégories), relais Nostr (damus, nos.lol, nostr.mom, primal), MQTT (broker.emqx.io, broker.hivemq.com). kave/tv : 8 erreurs console, toutes de ce type.
- Aucune exception JavaScript (pageerror) relevée sur les 69 mesures.

### 2.7 Temps de stabilisation des conversions (critère 7)
Compteur : <img> en blob: + fonds inline en blob: (+1000 par calque canvas). Chronologie accueil : bureau 0 → 4 éléments entre 6,5 s et 38,9 s (première mesure sous charge : 117 s) ; téléphone 1 → 4 entre 4,1 s et 25,3 s ; paysage 0 → 2 entre 1,1 s et 10,5 s. Autres écrans lents : kave/videoclub 99,3 s bureau (la capture d'écran a ensuite expiré à 30 s), 47,7 s tél., 30,2 s paysage ; fotofauna 45,4 s bureau ; KorhoGame 22,2 s bureau. Les pages sans conversion dynamique (kave/wiki, kuration, notes, borne-bio, 404, 3615/index) restent à 0. Les mesures tournent sous SwiftShader avec 2 cœurs et 3 navigateurs en parallèle : valeurs absolues gonflées, ordre relatif fiable.

### 2.8 prefers-reduced-motion (critère 8)
Animations Web (document.getAnimations, état running) après 15 s, bureau :
- accueil : 27 animations (10 infinies : `scale` sur div.cab.b-group, span#koins, button.b-boom.b-alive, nav.menu.b-mag, div.b-stick.b-mag ; `flkb` sur a.flk) → 2 avec reduce (`bburtv` sur i.b-tv, infinie ; `glook` sur div.guide.look). Respect partiel.
- kave/tv : 355 → 324 avec reduce ; 25 infinies dans les deux cas (`tpr` sur span.tp ×36–39, `tk` sur span#gtk). Les téléprompteurs et le bandeau continuent : non respecté (choix possible : téléprompteur exigé pour les textes trop longs).
- fauna-aube, 3615/index : 0 animation CSS dans les deux modes.
- KorhoGame : mesure échouée (voir §4).

### 2.9 Focus clavier (critère 9, accueil, 12 tabulations)
Ordre mesuré : div.b-pot.b-mag (« Plant »), 💧WATER, ☀SUN, ✂PRUNE, button#kapture, button#brand, div#radio-toggle, button.b-bell, button.b-sticker.b-land, button.b-imm, button.b-boom.b-mag, a « BC ».
- Sans indicateur (outline none, box-shadow none) : div.b-pot.b-mag, button#kapture (bureau et téléphone).
- div#radio-toggle : outline none ; box-shadow présent mais identique au style de repos (inset) : indicateur probablement absent.
- Les autres : outline auto 1px rgb(238,238,238) (anneau navigateur) ou outline solid 1px (button#brand).
- ☀SUN reçoit le focus hors de la vue au bureau.
- Les quatre touches principales (KorhoGame, FaunEye, 3615, SurFauna) restent hors des 12 premières tabulations ; le jardin (plante) passe en premier.

## 3. Faux positifs probables (récapitulatif)
- Fonds .webp de la racine (skins, plaques, butées, étagères VHS, magnétoscope) : ASCII précalculé.
- Textes à color transparent (button#kapture, .b-sticker > b) et textes sur fond image : ratio non calculable par composition simple.
- Bloc #mauk-tenieb (article.info.bio, clip rect(0 0 0 0)) : texte pour lecteurs d'écran ; il gonflait la première passe (28 contrastes et 51 cibles « li > a » au téléphone). Filtre ajouté puis accueil, MAUK TENIEB, BURROWS remesurés ; les autres écrans de borne gardent la première passe, où ce bloc ne figure pas dans la vue.
- .vhs-sr : texte masqué volontaire.
- 3615/index : canvas#screen (glyphes Vidéotex) et débordement body 1877 px sans défilement.
- Requêtes /insertkoin/* et /insertkoin-ascii/* : chemins absolus du site publié.
- Toutes les requêtes externes : réseau du bac à sable.

## 4. Étapes échouées et limites
- Bouton « LoreLore » : absent de index.html et des scripts du clone (grep sans résultat) ; écran retiré des tableaux.
- Première passe : sélecteur `.b-dot[aria-label="KORONG!"]` sans correspondance au bureau et en paysage (aria-label réels en casse mixte : « Korong! », « Fauna Chess », « VHS »…) ; corrigé par le drapeau i et remesuré (KORONG!, FAUNA CHESS, VHS, MUSIK bureau ; KORONG! paysage).
- Téléphone, FaunEye : clic Playwright refusé 8 s (élément « non stable ») puis dispatch_event ; même refus pour KorhoGame dans le test reduced-motion bureau (2 modes). Les touches de la borne portent des animations infinies `scale` : un clic automatisé les juge instables. Mesure reduced-motion de KorhoGame absente.
- Un redémarrage du conteneur a interrompu une relance (serveur relancé, écrans refaits).
- kave/videoclub bureau : capture d'écran expirée (audit fait avant).
- Les sous-écrans FaunEye, SurFauna et 3615 de la borne chargent leur contenu dans iframe#cf (borne-fauneye.html, reporhogo.html, 3615/?svc=korhogo) : l'audit ne descend pas dans les iframes ; reporhogo et 3615/index sont couverts comme pages seules, borne-fauneye.html ne l'est pas.
- Pages non mesurées : kave/dvd.html, tor.html, skoporhogo.html, sous-écrans FAUNINVADERS, FAUNARRATIK, KONNECT4, AKASZTÓFA, MASKERMIND, ERRATIK, BAKUBOOK, KAMORHOGO, REPORHOGO, FAUNATOR.
- Contrastes : fonds en dégradé ou image non échantillonnés au pixel.

## 5. Chiffres par écran et par format
Colonnes : Textes = éléments texte visibles ; Contraste KO ; cibles < 44 px / interactifs visibles ; débordement horizontal de page en px ; textes coupés ; hors vue ; <img> brutes > 64 px ; fonds image > 64 px sans blob: ; dont fichiers /_o/ ; canvas sans calque ; stabilisation blob: en s ; animations actives ; nombre de tailles de texte ; familles ; erreurs console ; requêtes en échec (dont locales).

### Bureau 1440×900

| Écran | Étapes | Textes | Contraste KO | Cibles <44 / interactifs | Débord. X (px) | Textes coupés | Hors vue | Img brutes >64 | Fonds image non blob >64 | dont /_o/ (originaux) | Canvas sans calque | Stabil. blob (s) | Anim. actives | Tailles de texte | Familles rendues | Erreurs console | Requêtes en échec (locales) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|accueil|ok|29|17|1/19|0|0|0|2|7|3|0|38.9|17|7|DM Mono, Press Start 2P, Bebas Neue|2|2 (1)|
|KorhoGame|ok (clic forcé)|5|0|13/33|46|0|0|0|0|0|0|22.2|10|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/KORONG!|ok (clic forcé)|5|0|13/33|46|0|0|0|0|0|0|4.1|10|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/FAUNA CHESS|ok|12|0|13/19|46|0|0|0|0|0|0|0.0|11|3|DM Mono, Press Start 2P|4|3 (2)|
|FaunEye|ok (clic forcé)|3|0|10/11|29|0|0|0|1|0|0|11.9|9|1|Press Start 2P, DM Mono|5|4 (1)|
|FaunEye/VHS|ok (clic forcé)|27|13|22/47|25|0|2|0|10|0|0|12.9|61|5|Permanent Marker, DM Mono, Press Start 2P|4|3 (1)|
|FaunEye/MUSIK|ok (clic forcé)|40|20|78/103|46|0|0|0|6|0|0|5.2|55|3|DM Mono, Press Start 2P|4|4 (2)|
|SurFauna|ok (clic forcé)|3|0|7/8|46|0|0|0|0|0|0|17.1|11|1|Press Start 2P, DM Mono|2|2 (1)|
|3615 (borne)|ok (clic forcé)|3|1|5/6|25|0|0|0|1|0|0|15.8|9|1|Press Start 2P, DM Mono|11|10 (9)|
|MAUK TENIEB|ok (clic forcé)|9|1|3/9|0|0|0|2|5|3|0|2.7|14|4|DM Mono, Bungee, Bebas Neue, Press Start 2P|2|2 (1)|
|BURROWS|ok|13|1|4/11|0|0|0|2|5|3|0|1.4|13|6|DM Mono, Bungee, Bebas Neue, Press Start 2P|3|3 (2)|
|kave/tv|ok|58|0|14/18|0|0|0|2|1|2|0|16.8|351|9|Arimo, VT323, Press Start 2P, Bebas Neue|8|7 (1)|
|kave/videoclub|ok|2|0|8/9|0|0|0|2|0|2|0|99.3|4|2|Press Start 2P, Bebas Neue|0|0 (0)|
|kave/kos|ok|33|0|8/14|0|0|0|0|0|0|0|1.0|4|4|Arimo, W95|0|0 (0)|
|kave/wiki|ok|26|0|23/24|0|0|0|2|0|2|0|0.0|3|6|Garamond, Arimo, Press Start 2P, Bebas Neue|0|0 (0)|
|fauna-aube|ok|22|0|0/1|0|0|0|0|0|0|0|0.0|0|4|DM Mono, Bebas Neue|0|0 (0)|
|kuration|ok|8|0|1/2|0|0|0|0|0|0|0|0.0|0|3|IK Arcade, IK Mono|4|0 (0)|
|reporhogo|ok|46|0|1/47|0|0|0|0|0|0|0|0.0|0|2|Bebas Neue, DM Mono|0|0 (0)|
|fotofauna|ok|10|1|1/41|0|7|0|0|1|0|0|45.4|99|3|DM Mono|0|0 (0)|
|borne-bio|ok|24|0|8/10|0|0|0|0|0|0|0|0.0|0|3|IK Arcade, IK Mono|0|0 (0)|
|404|ok|3|3|0/1|0|0|0|0|0|0|0|0.0|1|3|PS2P|1|2 (2)|
|notes|ok|13|0|5/6|0|0|0|0|0|0|0|0.0|0|3|IK Mono, IK Arcade|0|1 (0)|
|3615/index|ok|82|24|67/67|437|0|0|0|0|0|1|0.2|0|5|Barlow Condensed|2|2 (2)|

### Téléphone 390×844 portrait

| Écran | Étapes | Textes | Contraste KO | Cibles <44 / interactifs | Débord. X (px) | Textes coupés | Hors vue | Img brutes >64 | Fonds image non blob >64 | dont /_o/ (originaux) | Canvas sans calque | Stabil. blob (s) | Anim. actives | Tailles de texte | Familles rendues | Erreurs console | Requêtes en échec (locales) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|accueil|ok|27|14|2/15|0|0|1|0|8|1|0|25.3|17|8|Bungee, DM Mono, Bebas Neue, Press Start 2P|2|2 (1)|
|KorhoGame|ok (clic forcé)|3|0|19/33|69|0|0|0|0|0|0|11.6|10|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/KORONG!|ok (clic forcé)|3|0|19/33|56|0|0|0|0|0|0|2.0|11|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/FAUNA CHESS|ok (clic forcé)|10|0|12/19|69|0|0|0|0|0|0|0.0|10|3|DM Mono, Press Start 2P|3|3 (2)|
|FaunEye|ok (clic forcé)|1|0|9/11|56|0|0|0|1|0|0|16.0|9|1|Press Start 2P|5|4 (1)|
|FaunEye/VHS|ok (clic forcé)|21|10|21/39|56|6|0|0|8|0|0|13.8|61|6|Permanent Marker, DM Mono, Press Start 2P|5|4 (2)|
|FaunEye/MUSIK|ok (clic forcé)|13|0|46/51|56|0|0|0|4|1|0|4.8|32|3|DM Mono, Press Start 2P|4|3 (1)|
|SurFauna|ok (clic forcé)|1|0|6/8|56|0|0|0|0|0|0|4.4|9|1|Press Start 2P|2|2 (1)|
|3615 (borne)|ok (clic forcé)|1|0|4/6|56|0|0|0|1|0|0|7.9|9|1|Press Start 2P|7|10 (9)|
|MAUK TENIEB|ok (clic forcé)|20|9|2/15|0|0|1|2|7|3|0|0.4|15|5|DM Mono, Bungee, Bebas Neue, Press Start 2P|2|2 (1)|
|BURROWS|ok (clic forcé)|23|9|5/18|0|0|0|2|6|3|0|0.4|11|7|DM Mono, Bungee, Bebas Neue, Press Start 2P|4|4 (3)|
|kave/tv|ok|117|0|11/18|0|0|1|2|0|2|0|5.2|766|7|Arimo, VT323, Press Start 2P, Bebas Neue|8|7 (1)|
|kave/videoclub|ok|2|0|8/9|0|0|0|2|0|2|0|47.7|4|2|Press Start 2P, Bebas Neue|0|0 (0)|
|kave/kos|ok|26|0|4/7|0|0|2|0|0|0|0|1.0|3|2|Arimo, W95|0|0 (0)|
|kave/wiki|ok|13|0|13/15|0|0|1|2|0|2|0|0.0|3|6|Garamond, Arimo, Press Start 2P, Bebas Neue|0|0 (0)|
|fauna-aube|ok|20|0|0/1|0|0|0|0|0|0|0|0.0|0|5|DM Mono, Bebas Neue|0|0 (0)|
|kuration|ok|8|0|1/2|0|0|0|0|0|0|0|0.0|0|3|IK Arcade, IK Mono|4|0 (0)|
|reporhogo|ok|16|0|1/17|0|0|0|0|0|0|0|0.1|0|2|Bebas Neue, DM Mono|0|0 (0)|
|fotofauna|ok|9|1|8/38|0|6|0|0|2|0|0|8.3|99|3|DM Mono|0|0 (0)|
|borne-bio|ok|11|0|2/3|0|0|0|0|0|0|0|0.0|0|3|IK Arcade, IK Mono|0|0 (0)|
|404|ok|3|3|0/1|0|0|0|0|0|0|0|0.0|1|3|PS2P|1|2 (2)|
|notes|ok|13|0|3/6|0|0|0|0|0|0|0|0.0|0|3|IK Mono, IK Arcade|0|1 (0)|
|3615/index|ok|28|17|10/20|0|0|0|0|0|0|1|0.0|0|6|Barlow Condensed|2|2 (2)|

### Paysage 844×390

| Écran | Étapes | Textes | Contraste KO | Cibles <44 / interactifs | Débord. X (px) | Textes coupés | Hors vue | Img brutes >64 | Fonds image non blob >64 | dont /_o/ (originaux) | Canvas sans calque | Stabil. blob (s) | Anim. actives | Tailles de texte | Familles rendues | Erreurs console | Requêtes en échec (locales) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|accueil|ok|26|14|3/17|8|0|0|2|6|3|0|10.5|16|7|DM Mono, Bungee, Bebas Neue, Press Start 2P|2|2 (1)|
|KorhoGame|ok (clic forcé)|3|0|20/33|78|0|0|0|0|0|0|11.0|7|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/KORONG!|ok (clic forcé)|3|0|20/33|78|0|0|0|0|0|0|0.0|6|2|Press Start 2P, DM Mono|2|2 (1)|
|KorhoGame/FAUNA CHESS|ok (clic forcé)|10|0|12/19|78|0|0|0|0|0|0|4.6|6|3|DM Mono, Press Start 2P|3|3 (2)|
|FaunEye|ok (clic forcé)|1|0|9/11|0|0|0|0|1|0|0|2.6|12|1|Press Start 2P|3|3 (1)|
|FaunEye/VHS|ok (clic forcé)|27|16|21/42|69|5|2|0|11|0|0|9.8|50|6|Permanent Marker, DM Mono, Press Start 2P|4|3 (1)|
|FaunEye/MUSIK|ok (clic forcé)|18|0|60/62|78|0|0|0|5|1|0|6.0|29|3|DM Mono, Press Start 2P|4|3 (1)|
|SurFauna|ok (clic forcé)|1|0|6/8|78|0|0|0|0|0|0|11.9|6|1|Press Start 2P|2|2 (1)|
|3615 (borne)|ok (clic forcé)|1|0|4/6|69|0|0|0|1|0|0|0.0|7|1|Press Start 2P|5|7 (6)|
|MAUK TENIEB|ok (clic forcé)|25|14|3/16|8|0|1|2|5|3|0|0.3|17|5|DM Mono, Bungee, Bebas Neue, Press Start 2P|2|2 (1)|
|BURROWS|ok (clic forcé)|27|14|6/18|0|0|1|2|5|3|0|5.9|20|7|DM Mono, Bungee, Bebas Neue, Press Start 2P|3|3 (2)|
|kave/tv|ok|72|0|10/15|0|0|0|2|0|2|0|5.2|749|6|Arimo, VT323, Press Start 2P, Bebas Neue|8|7 (1)|
|kave/videoclub|ok|2|0|8/9|0|0|0|2|0|2|0|30.2|4|2|Press Start 2P, Bebas Neue|0|0 (0)|
|kave/kos|ok|33|0|8/14|0|0|2|0|0|0|0|1.0|4|4|Arimo, W95|0|0 (0)|
|kave/wiki|ok|17|0|18/19|0|0|1|2|0|2|0|0.0|3|6|Garamond, Arimo, Press Start 2P, Bebas Neue|0|0 (0)|
|fauna-aube|ok|2|0|0/1|0|0|0|0|0|0|0|0.0|0|2|DM Mono, Bebas Neue|0|0 (0)|
|kuration|ok|8|0|1/2|0|0|0|0|0|0|0|0.0|0|3|IK Arcade, IK Mono|4|0 (0)|
|reporhogo|ok|9|0|1/10|0|0|0|0|0|0|0|0.0|0|2|Bebas Neue, DM Mono|0|0 (0)|
|fotofauna|ok|7|1|7/25|0|6|0|0|1|0|0|5.9|99|2|DM Mono|0|0 (0)|
|borne-bio|ok|5|0|0/1|0|0|0|0|0|0|0|0.0|0|2|IK Arcade, IK Mono|0|0 (0)|
|404|ok|3|3|0/1|0|0|0|0|0|0|0|0.0|1|3|PS2P|1|2 (2)|
|notes|ok|10|0|3/4|0|0|0|0|0|0|0|0.0|0|3|IK Mono, IK Arcade|0|1 (0)|
|3615/index|ok|36|24|10/20|0|0|0|0|0|0|1|0.0|0|6|Barlow Condensed|2|2 (2)|
