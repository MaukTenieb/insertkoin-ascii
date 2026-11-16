"""Insert Koin ASCII, moteur 2 : approximation bicolore par forme.
Chaque cellule reçoit le caractère ASCII (police Press Start 2P, matrice 8x8 des bornes d'arcade, police d'écran de la borne selon DA.md)
dont le dessin épouse le mieux les pixels de la cellule, avec une encre et un papier calculés par moindres carrés.
Les contours suivent / \\ | _ - ( ) ; les aplats gardent une trame de caractères visible."""
import sys, os, re, glob, io, numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
CHARS = ''.join(chr(c) for c in range(32, 127))
DMIN = 0.30

def _crisp():
    f = ImageFont.truetype(os.path.join(HERE, 'ps2p.ttf'), 8)
    out = []
    for c in CHARS:
        im = Image.new('L', (8, 8), 0); d = ImageDraw.Draw(im); d.fontmode = '1'
        d.text((0, 0), c, font=f, fill=255)
        out.append(np.asarray(im))
    return np.stack(out)  # G,8,8 uint8 : matrice 8x8 de Press Start 2P, la police d'écran de la borne
CRISP = _crisp()
BETA = 0.15                       # pénalité des lettres et chiffres : ils ne gagnent que sur une vraie forme de lettre
PEN = np.array([BETA if c.isalnum() else 0.0 for c in CHARS], np.float32)
def _ramp():
    cov = CRISP.reshape(len(CHARS), -1).mean(1) / 255
    cov = np.where(PEN > 0, 9.0, cov)
    order = np.argsort(cov, kind='stable'); out = [0]; last = -1
    for t in np.linspace(0, cov[PEN == 0].max(), 40)[1:]:
        g = int(order[np.argmin(np.abs(cov[order] - t))])
        if g != out[-1]: out.append(g)
    return ''.join(CHARS[g] for g in out)
RAMP = _ramp()
_masks = {}
def masks(cw, ch):
    k = (cw, ch)
    if k not in _masks:
        m = np.stack([np.asarray(Image.fromarray(g).resize((cw, ch), Image.BOX), np.float32) / 255 for g in CRISP])
        _masks[k] = m.reshape(len(CHARS), -1)
    return _masks[k]

def cell_for(w, h):
    big = max(w, h)
    if big < 160: cw = 4
    elif big < 400: cw = 5
    elif big < 800: cw = 6
    else: cw = 8
    return cw, cw

def fit(im, cw=None):
    im = im.convert('RGBA'); w, h = im.size
    if cw is None: cw, ch = cell_for(w, h)
    else: ch = cw
    cols = max(2, round(w / cw)); rows = max(1, round(h / ch))
    W, H = cols * cw, rows * ch
    a = np.asarray(im.resize((W, H), Image.LANCZOS) if (W, H) != (w, h) else im, np.float32) / 255
    a = np.clip(a, 0, 1)
    hasalpha = (a[..., 3] < 0.98).mean() > 0.005
    X = a.copy(); X[..., :3] *= X[..., 3:4]                        # prémultiplié
    X = X.reshape(rows, ch, cols, cw, 4).transpose(0, 2, 1, 3, 4).reshape(rows * cols, ch * cw, 4)
    M = masks(cw, ch); G, K = M.shape; N = X.shape[0]
    A = (M * M).sum(1); B = (M * (1 - M)).sum(1); C = ((1 - M) ** 2).sum(1)
    det = A * C - B * B
    sx = X.sum(1)                                                   # N,4
    E = ((X - sx[:, None, :] / K) ** 2).sum((1, 2))                 # énergie de la cellule
    best_e = np.full(N, np.inf, np.float32); best_g = np.zeros(N, int)
    best_f = np.zeros((N, 4), np.float32); best_b = np.zeros((N, 4), np.float32)
    Xt = X.transpose(0, 2, 1).reshape(N * 4, K)
    Sm = (Xt @ M.T).reshape(N, 4, G).transpose(0, 2, 1)            # N,G,4  Σ m x
    Sn = sx[:, None, :] - Sm                                        # Σ (1-m) x
    for g in range(G):
        if det[g] < 1e-6:                                           # espace : papier seul
            fg = bg = sx / K; e = -(sx * sx).sum(1) / K
        else:
            fg = (C[g] * Sm[:, g] - B[g] * Sn[:, g]) / det[g]
            bg = (A[g] * Sn[:, g] - B[g] * Sm[:, g]) / det[g]
            e = -(fg * Sm[:, g] + bg * Sn[:, g]).sum(1)
        e = e + PEN[g] * E
        better = e < best_e - 1e-7
        best_e[better] = e[better]; best_g[better] = g; best_f[better] = fg[better]; best_b[better] = bg[better]
    best_f = np.clip(best_f, 0, 1); best_b = np.clip(best_b, 0, 1)
    # aplats : trame de caractères selon la densité, encre décalée du papier
    var = ((X - sx[:, None, :] / K) ** 2)[..., :4].sum((1, 2)) / K
    mean = sx / K
    lum = (0.2126 * mean[:, 0] + 0.7152 * mean[:, 1] + 0.0722 * mean[:, 2]) / np.maximum(mean[:, 3], 1e-3)
    contrast = np.abs(best_f[:, :3] - best_b[:, :3]).max(1)
    flat = (var < 0.0025) & (contrast < 0.10) & (mean[:, 3] > 0.05)
    if flat.any():
        ri = np.where(lum[flat] < 0.035, 0, np.clip((lum[flat] * (len(RAMP) - 1)).round().astype(int), 1, len(RAMP) - 1))
        best_g[flat] = [CHARS.index(RAMP[i]) for i in ri]
        m = mean[flat]; d = np.where(lum[flat, None] > 0.5, -1, 1) * (0.10 + 0.08 * (1 - np.abs(lum[flat, None] - 0.5) * 2))
        bgf = m.copy(); fgf = m.copy(); fgf[:, :3] = np.clip(m[:, :3] + d * m[:, 3:4], 0, m[:, 3:4])
        best_f[flat] = fgf; best_b[flat] = bgf
    # contraste minimal encre/papier, ton moyen de la cellule conservé
    cov = M[best_g].mean(1)[:, None]
    mc = best_f * cov + best_b * (1 - cov)
    diff = best_f[:, :3] - best_b[:, :3]
    dl = 0.2126 * diff[:, 0] + 0.7152 * diff[:, 1] + 0.0722 * diff[:, 2]
    sign = np.where(dl >= 0, 1.0, -1.0)
    sign = np.where(flat, np.where(lum > 0.5, -1.0, 1.0), sign)
    mlum = 0.2126 * mc[:, 0] + 0.7152 * mc[:, 1] + 0.0722 * mc[:, 2]
    dmin = DMIN * mc[:, 3] * (0.55 + 0.45 * np.minimum(1, mlum / np.maximum(mc[:, 3], 1e-3) * 3))
    need = np.where(flat & (lum < 0.035), 0, np.maximum(0, dmin - np.abs(dl)))[:, None]
    best_f[:, :3] += sign[:, None] * need * (1 - cov)
    best_b[:, :3] += -sign[:, None] * need * cov
    best_f[:, :3] = np.clip(best_f[:, :3], 0, best_f[:, 3:4]); best_b[:, :3] = np.clip(best_b[:, :3], 0, best_b[:, 3:4])
    mm = M[best_g][..., None]                                       # N,K,1
    R = mm * best_f[:, None, :] + (1 - mm) * best_b[:, None, :]
    R = R.reshape(rows, cols, ch, cw, 4).transpose(0, 2, 1, 3, 4).reshape(H, W, 4)
    al = R[..., 3:4]; R[..., :3] = np.where(al > 1e-4, R[..., :3] / np.maximum(al, 1e-4), 0)
    out = Image.fromarray(np.clip(R * 255 + 0.5, 0, 255).astype(np.uint8), 'RGBA')
    if (W, H) != (w, h): out = out.resize((w, h), Image.LANCZOS)
    txt = '\n'.join(''.join(CHARS[g] for g in best_g[r * cols:(r + 1) * cols]).rstrip() for r in range(rows))
    return out, txt, hasalpha

SKIP_DIR = ('pf/luts/', 'pf/moldiv/lut/', 'pf/lotogram/film/')
PF_SKIP = re.compile(r'(lookup|Filter\.webp$|mask|fisheye|blur|gradient_line|shape)', re.I)
def skip(f):
    return f.startswith(SKIP_DIR) or (f.startswith('pf/') and PF_SKIP.search(os.path.basename(f)))
def is_lut(a):
    if a.shape[:2] != (512, 512): return False
    y, x = np.mgrid[0:512, 0:512]; bl = (y // 64) * 8 + (x // 64)
    ref = [x % 64, y % 64, bl]
    cr = [np.corrcoef(a[..., i].astype(float).ravel(), ref[i].ravel())[0, 1] for i in range(3)]
    return np.nanmin(cr) > 0.6
def save(out, f, src, alpha):
    ext = f.rsplit('.', 1)[1].lower()
    if not alpha: out = out.convert('RGB')
    if ext == 'webp': out.save(f, 'WEBP', quality=90, method=4)
    elif ext in ('jpg', 'jpeg'): out.convert('RGB').save(f, 'JPEG', quality=90, subsampling=0)
    else: out.save(f, 'PNG', optimize=True)
def job(args):
    f, srcroot = args
    try:
        if skip(f): return ('skip', f)
        src = Image.open(os.path.join(srcroot, f))
        if getattr(src, 'n_frames', 1) > 1: return ('anim', f)
        src.load()
        if is_lut(np.asarray(src.convert('RGB'))): return ('lut', f)
        out, t, al = fit(src)
        save(out, f, src, al)
        open(f + '.txt', 'w').write(t + '\n')
        return ('ok', f)
    except Exception as e:
        return ('err', f + ' ' + repr(e))
if __name__ == '__main__':
    from multiprocessing import Pool
    import collections
    dst, srcroot = sys.argv[1], os.path.abspath(sys.argv[2]); os.chdir(dst)
    fs = [f for f in glob.glob('**/*', recursive=True) if f.rsplit('.', 1)[-1].lower() in ('webp', 'jpg', 'jpeg', 'png')]
    fs.sort(key=lambda f: -os.path.getsize(os.path.join(srcroot, f)) if os.path.exists(os.path.join(srcroot, f)) else 0)
    fs = [f for f in fs if os.path.exists(os.path.join(srcroot, f))]
    c = collections.Counter(); log = open(os.path.join(HERE, 'ascii2.log'), 'w')
    with Pool(os.cpu_count()) as p:
        for i, (k, f) in enumerate(p.imap_unordered(job, [(f, srcroot) for f in fs], chunksize=2)):
            c[k] += 1; log.write(k + '\t' + f + '\n'); log.flush()
            if i % 100 == 0: print(i, len(fs), dict(c), flush=True)
    print(dict(c))

def text(im, cols=None):
    """ASCII brut pour un terminal (encre claire sur fond sombre, cellule 1:2) : à chaque cellule, le caractère
    dont le dessin épouse le mieux la luminance."""
    im = im.convert('RGBA'); w, h = im.size
    if cols is None: cols = int(min(160, max(16, w / 8)))
    cw = w / cols; rows = max(1, round(h / (cw * 2)))
    CW, CH = 5, 10
    a = np.asarray(im.resize((cols * CW, rows * CH), Image.LANCZOS), np.float32) / 255
    L = (0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]) * a[..., 3]
    vis = a[..., 3] > 0.1
    if vis.sum() > 16:
        lo, hi = np.percentile(L[vis], [2, 98])
        if hi - lo > 0.05: L = np.clip((L - lo) / (hi - lo), 0, 1)
    L = L ** 0.8
    X = L.reshape(rows, CH, cols, CW).transpose(0, 2, 1, 3).reshape(rows * cols, CH * CW)
    M = masks(CW, CH)                                   # G,K
    e = (M * M).sum(1)[None, :] - 2 * X @ M.T           # ||X-M||² sans le terme constant
    g = e.argmin(1)
    A_ = a[..., 3].reshape(rows, CH, cols, CW).mean((1, 3)).ravel()
    g[A_ < 0.15] = 0
    return '\n'.join(''.join(CHARS[k] for k in g[r * cols:(r + 1) * cols]).rstrip() for r in range(rows))
