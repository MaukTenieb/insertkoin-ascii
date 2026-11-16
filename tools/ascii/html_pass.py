"""Passe texte d'Insert Koin ASCII : images en ligne (data:) en ASCII, adresses et étiquettes Nostr propres au clone,
scripts ascii-isole.js (en tête) et ascii-live.js (en fin de <head>) dans chaque page."""
import re, base64, io, os, sys, glob, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import ascii2 as A
from PIL import Image
root = sys.argv[1]; os.chdir(root)
def du(m):
    try:
        b = base64.b64decode(m.group(2)); im = Image.open(io.BytesIO(b)); im.load()
        o, _, _ = A.fit(im); buf = io.BytesIO()
        if m.group(1) == 'jpeg': o.convert('RGB').save(buf, 'JPEG', quality=90)
        else: o.save(buf, 'PNG', optimize=True)
        return 'data:image/%s;base64,' % m.group(1) + base64.b64encode(buf.getvalue()).decode()
    except Exception:
        return m.group(0)
SITE = re.compile(r'mauktenieb\.github\.io/insertkoin(?![-\w])')
TAGS = [('korhogo-palmares', 'korhogo-ascii-palmares'), ('korhogo-kave', 'korhogo-ascii-kave'), ('korhogo-kuration', 'korhogo-ascii-kuration')]
n = 0
files = [f for e in ('html', 'js', 'mjs', 'cjs', 'py', 'json', 'webmanifest', 'xml', 'md', 'txt', 'yml')
         for f in glob.glob('**/*.' + e, recursive=True) + glob.glob('.github/**/*.' + e, recursive=True)]
for f in sorted(set(files)):
    if f.startswith('tools/ascii/') or f in ('ascii-live.js', 'ascii-isole.js', 'README.md') or f.endswith(('.webp.txt', '.jpg.txt', '.png.txt', '.jpeg.txt')):
        continue
    s = open(f, encoding='utf-8', errors='surrogateescape').read(); o = s
    if f.endswith(('.html', '.js')):
        s = re.sub(r"data:image/(png|jpeg|webp);base64,([A-Za-z0-9+/=]{200,})", du, s)
    s = SITE.sub('mauktenieb.github.io/insertkoin-ascii', s)
    for a, b in TAGS: s = s.replace(a, b)
    s = s.replace("return 'https://mauktenieb.github.io/k/' + p.slice(0, 12);", "return 'https://mauktenieb.github.io/insertkoin-ascii/?k=' + p.slice(0, 12);")
    if f.endswith('.html'):
        rel = '../' * f.count('/')
        if 'ascii-isole.js' not in s:
            iso = '<script src="%sascii-isole.js"></script>' % rel
            m = re.search(r'<head[^>]*>', s, re.I)
            s = s[:m.end()] + iso + s[m.end():] if m else iso + s
        if 'ascii-live.js' not in s:
            tag = '<script src="%sascii-live.js" defer></script>' % rel
            s = re.sub(r'</head>', tag + '</head>', s, count=1, flags=re.I) if re.search('</head>', s, re.I) else s + tag
    if s != o:
        open(f, 'w', encoding='utf-8', errors='surrogateescape').write(s); n += 1
print('modifiés', n)
