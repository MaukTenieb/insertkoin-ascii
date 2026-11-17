# Insert Koin ASCII

Insert Koin ASCII rebuilds Mauk Tenieb's Korhogo arcade, https://mauktenieb.github.io/insertkoin/, page for page, in characters.

**Play: https://mauktenieb.github.io/insertkoin-ascii/** · in French: https://mauktenieb.github.io/insertkoin-ascii/fr.html

The pages, games, sounds and code stay those of Insert Koin. Every picture, sprite, video and live canvas turns into ASCII.

By Mauk Tenieb & Korhogo.

## The characters

The type is Press Start 2P, the 8×8 character matrix of the arcade cabinets, the screen face of the borne in its art direction (DA.md). Each cell of a picture receives one of the 95 printable ASCII characters: the one whose drawing best matches the pixels of the cell. An ink and a paper, fitted by least squares, colour the character and its cell, in the manner of the character graphics of the arcade boards and the ANSI art of the bulletin boards. Signs draw: / \ | _ ( ) < > follow the outlines, a weft of dots, quotes and stars sets the tone of flat areas; letters and figures come only where a cell truly holds a letter. Pure black stays empty.

| What | How |
|---|---|
| Pictures of the page (`<img>`, backgrounds) | `ascii-live.js` redraws each picture at its size on the visitor's screen, from the original kept in `_o/`, on the graphics card: one character size for the whole screen, about 6 px, on every device and in every orientation, each character on whole pixels. |
| Pictures, first paint and fallback | `tools/ascii/ascii2.py` rewrites each file at its own size and transparency; sprite sheets go frame by frame; `<file>.txt` beside it holds the same picture in bare characters, light ink on a dark terminal, two rows per square. |
| Videos of the Kave | the same engine, frame by frame, sound kept. |
| 3615 | the MiniTale comes inside the clone, in `3615/`; its Videotex screen already speaks in characters and keeps its own letters. |
| Live canvases (Korong!, Fauna Chess, Katabatik, SkopoRhogo, FotoFauna, VHS) | `ascii-live.js` runs the same choice of character on the graphics card (WebGL2), twenty-four times a second, over the canvas; the canvas keeps playing underneath and takes the mouse, the keys and the fingers. |

Insert Koin ASCII keeps its own settings, saves, Koins, caches and Nostr tags (`korhogo-ascii-*`), apart from Insert Koin.

FotoFauna's colour tables and tool masks (`pf/luts`, `pf/moldiv/lut`, `pf/lotogram/film`, the `*Filter`, `*lookup*` and `*mask*` layers) stay as data: the filters read them as numbers.

## The clone's own touches

- Every text longer than its box scrolls in place, back and forth, as a teleprompter (`ascii-prompteur.js`).
- The text pages (bio, notes, Kuration, the Kave index) stand in the cabinet's dark room, in DM Mono and Press Start 2P (`ascii-annexe.css`).
- The loupe: hold Alt, or rest a finger half a second, and a circle follows the hand and shows the original picture under the characters, games included (`ascii-loupe.js`).
- On a touch screen, interface texts rise to 11 px wherever the layout keeps its shape, and every control answers on 44 px (`ascii-lisible.js`).
- The games' own words, scores and titles, come back sharp in the grid, in Press Start 2P (`ascii-live.js`).
- Controls (buttons, joystick, knobs, dice, Koins, plates) keep their period picture on every device; every other picture turns into characters.
- BURROWS opens Korhogo Fauna inside the clone (`katabase/`), in characters too.
- A lost address lights TILT, and the red button brings the visitor back to the cabinet (`404.html`).

## Licence

As Insert Koin: see `LICENSE`.
