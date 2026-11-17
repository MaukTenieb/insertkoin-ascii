# Insert Koin ASCII : liste vivante des écarts

Chaque demande et chaque constat des juges externes entre ici. Un écart sort de la liste après vérification sur le rendu.

## Méthode

1. Le crawl (`tools/crawl.py` dans l'espace de travail) parcourt 35 écrans × 3 formats : bureau 1440×900, téléphone 390×844, téléphone 844×390.
2. Trois juges externes notent les captures : des instances séparées, avec la grille Impeccable v4.9.2 (critique, rubrique, plancher, audit).
3. Les corrections vont dans le clone seul, puis on reprend un crawl et un jugement.

## Notes

| Passage | Bureau | Portrait | Paysage |
|---|---|---|---|
| 1 | 4/10 | 4,5/10 | 5/10 |
| 2 | 5,5/10 | 5,8/10 | 6/10 |
| 3 | 5,5/10 | 5,7/10 | 6/10 |
| 4 | 6/10 | 5,6/10 | 6/10 |

Jury d'agences, passage 5 : direction artistique 6,5/10, UX 6,2/10 (Nielsen 20/32), mobile 5,5/10 ; rapports agence-DA.md, agence-UX.md, agence-MOBILE.md.

## Écarts traités au passage 1

- Corps de caractère variable d'un objet à l'autre : grille unique calculée à l'exécution (`ascii-live.js`, originaux dans `_o/`).
- Lettres au hasard dans les aplats : lettres et chiffres pénalisés, rampe de signes.
- Textes coupés : téléprompteur (`ascii-prompteur.js`).
- Pages de texte sans habillage : `ascii-annexe.css`.
- 404 brute : écran TILT.
- Écrans faux dans les captures : crawl qui attend chaque programme.
- Écran Minitel illisible en ASCII : l'écran Videotex garde ses lettres.

## Écarts traités au passage 2

- La couche ASCII des canvas déplaçait la mise en page (Akasztófa, Konnect4) : elle se pose maintenant hors du flux, ou dans un calque fixe.
- Lettres fantômes sur les boutons : cellule de 3 px pour les commandes et les petits objets.
- Petits plateaux de jeu illisibles : cellule de 4 à 5 px.

## Règles établies aux passages 3 et 4

- Un seul corps de caractère par écran, sur pixels entiers : 8 px CSS au bureau, 5,33 px CSS au téléphone (16 pixels physiques à 3 dppx). D'abord 8 px partout, sur pixels entiers, pour les images, fonds, pseudo-éléments et canvas. La cellule de 3 px est abandonnée : elle donnait une trame photo.
- Sous 8 × 8 cellules (environ 64 px), et dans toute commande (bouton, étiquette, champ), l'objet garde son image d'époque : clarté absolue des commandes, zéro mosaïque.
- Canvas : les lettres restent permises là où le jeu écrit (pénalité 0,10 au lieu de 0,15).
- Écran Videotex du 3615 : laissé en lettres.

## Écarts ouverts

- Hauteur de la borne au bureau 1440×900 : la barre des Koins sort de l'écran.
- Couverture de Bakubook (image d'archive.org) : à vérifier, selon que le serveur autorise ou refuse la lecture.
- Plusieurs familles de barre basse et de compteur de Koins d'un écran à l'autre.
- Texte des HUD de FaunInvaders et Konnect4 : illisible une fois passé en ASCII (piste : calque HTML du texte).
- Le guide recouvre parfois des commandes ; bulles d'aide ouvertes.
- Bas du Minitel (CONNECT/END) coupé en paysage ; barre KorhogOS coupée.
- Pages sans retour : SkopoRhogo, Fotofauna, Aube, Kuration, Notes, Bio.
- Reporhogo autonome : titre en dégradé, deux designs de Reporhogo.
