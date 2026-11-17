"""Reconstruit toute la couche texte du clone depuis les sources, de façon reproductible :
pages, scripts, données ; isolation (caches, stockage, Nostr, adresses) ; scripts ASCII ; améliorations du clone."""
import os, re, shutil, glob, json, subprocess, datetime
SRC = '/home/claude/src/insertkoin'; S3615 = '/home/claude/src/3615'; O = '/home/claude/out/insertkoin-ascii'; T = '/home/claude/tools'
TEXT = ('.html', '.js', '.mjs', '.cjs', '.py', '.json', '.webmanifest', '.xml', '.md', '.yml', '.txt', '.css')
def is_text(f): return f.endswith(TEXT) and not re.search(r'\.(webp|jpg|jpeg|png)\.txt$', f)
# 1. textes d'origine
for root, dirs, files in os.walk(SRC):
    dirs[:] = [d for d in dirs if d != '.git']
    for fn in files:
        p = os.path.join(root, fn); rel = os.path.relpath(p, SRC)
        if is_text(rel) and rel != 'README.md':
            os.makedirs(os.path.dirname(os.path.join(O, rel)), exist_ok=True); shutil.copy(p, os.path.join(O, rel))
for root, dirs, files in os.walk(S3615):
    dirs[:] = [d for d in dirs if d not in ('.git', '.github')]
    for fn in files:
        p = os.path.join(root, fn); rel = os.path.relpath(p, S3615)
        if is_text(rel):
            os.makedirs(os.path.dirname(os.path.join(O, '3615', rel)), exist_ok=True); shutil.copy(p, os.path.join(O, '3615', rel))
# 2. isolation
s = open(f'{O}/sw.js').read()
s = s.replace("const C='borne-", "const C='ascii-").replace("(k.indexOf('borne-')===0||(k.indexOf('ik-')===0&&k.indexOf('ik-archive')!==0))", "k.indexOf('ascii-')===0")
s = s.replace("prefix borne- : this worker clears only its own caches, Insert Koin's ik- caches stay", "prefix ascii- : this worker clears only its own caches; the caches of Insert Koin (borne-, ik-) stay")
open(f'{O}/sw.js', 'w').write(s)
d = json.load(open(f'{SRC}/palmares.json'))
json.dump({'updated': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'), 'relays': d['relays'], 'korong': [], 'fauninvaders': [], 'first': {}, 'kave': []}, open(f'{O}/palmares.json', 'w'), indent=1)
for f in glob.glob(f'{O}/.github/workflows/*'):
    if os.path.basename(f) not in ('palmares.yml', 'tor-consensus.yml'): os.remove(f)
for d_ in ('probe', 'voir'): shutil.rmtree(f'{O}/.github/{d_}', ignore_errors=True)
for f in ('index.html', 'fr.html', 'insertkoin.html'):
    p = f'{O}/{f}'; s = open(p).read().replace("calqueSrc('/3615/')", "calqueSrc('3615/')"); open(p, 'w').write(s)
for f in glob.glob(f'{O}/3615/**/*', recursive=True):
    if os.path.isfile(f) and is_text(f):
        s = open(f, encoding='utf-8').read(); n = re.sub(r'mauktenieb\.github\.io/3615(?![-\w])', 'mauktenieb.github.io/insertkoin-ascii/3615', s)
        if n != s: open(f, 'w', encoding='utf-8').write(n)
# 3. fichiers du clone
for f in ('ascii-live.js', 'ascii-isole.js'): shutil.copy(f'{T}/{f}', f'{O}/{f}')
for f in glob.glob(f'{T}/patch/*'): shutil.copy(f, f'{O}/{os.path.basename(f)}')
# 4. passe texte (images en ligne, adresses, Nostr, isole + live)
print(subprocess.run(['python3', f'{T}/html_pass.py', O], capture_output=True, text=True).stdout.strip())
# 5. améliorations : téléprompteur partout, habillage des pages de texte, écran Minitel laissé en lettres
ANNEXE = {'borne-bio.html', 'kuration.html', 'notes/index.html', 'notes/catchlight.html', 'notes/detour.html', 'habillages/index.html'}
for p in glob.glob(f'{O}/**/*.html', recursive=True):
    rel = os.path.relpath(p, O)
    if rel.startswith(('archive/', '_o/')) or rel == '404.html': continue
    s = open(p, encoding='utf-8', errors='surrogateescape').read(); o = s; up = '../' * rel.count('/')
    if 'ascii-commun.css' not in s:
        s = re.sub(r'</head>', f'<link rel="stylesheet" href="{up}ascii-commun.css"></head>', s, count=1, flags=re.I)
    if 'ascii-prompteur.js' not in s:
        s = re.sub(r'</head>', f'<script src="{up}ascii-prompteur.js" defer></script></head>', s, count=1, flags=re.I)
    if rel in ANNEXE and 'ascii-annexe.css' not in s:
        s = re.sub(r'</head>', f'<link rel="stylesheet" href="{up}ascii-annexe.css"></head>', s, count=1, flags=re.I)
    RETOUR = rel in ('skoporhogo.html', 'fotofauna.html', 'kuration.html', 'borne-bio.html', 'reporhogo.html') or rel.startswith(('fauna-', 'notes/'))
    if RETOUR and 'ascii-retour.js' not in s:
        s = re.sub(r'</head>', f'<script src="{up}ascii-retour.js" defer></script></head>', s, count=1, flags=re.I)
    if rel == 'reporhogo.html' and 'ascii-h1' not in s:
        s = re.sub(r'</head>', '<style id="ascii-h1">h1{text-shadow:none!important}</style></head>', s, count=1, flags=re.I)
    if rel == '3615/index.html' and 'ascii-ajuste.js' not in s:
        s = re.sub(r'</head>', '<script src="../ascii-ajuste.js" defer></script></head>', s, count=1, flags=re.I)
    if rel == '3615/index.html' and 'ASCII_NO_CANVAS' not in s: s = s.replace('<script src="../ascii-live.js" defer></script>', '<script>window.ASCII_NO_CANVAS=true</script><script src="../ascii-live.js" defer></script>')
    if s != o: open(p, 'w', encoding='utf-8', errors='surrogateescape').write(s)
print('couche texte reconstruite')

# commandes : image d'époque dès le premier affichage
R = re.compile(r'(^|/)(bouton-|baku-boom|camera-|manette-|molette|koin(-hd)?[-.]|de-[a-c]\.|btn|knob|screw|sw-|favicon|icon\.|plaque-|butee-|porte-cle|mikro)')
for f in glob.glob(SRC + '/**/*', recursive=True):
    rel = os.path.relpath(f, SRC)
    if rel.startswith(('pf/', 'archive/')) or not rel.lower().endswith(('.webp', '.png', '.jpg')): continue
    if R.search(rel): shutil.copy(f, os.path.join(O, rel))
print("commandes d'époque restaurées")
