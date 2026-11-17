/* ascii-loupe.js — Insert Koin ASCII : la loupe d'époque. Touche Alt maintenue (ou doigt posé une demi-seconde) :
   un cercle suit la main et montre, sous la grille de caractères, l'image d'origine. */
(function () {
  'use strict';
  if (window.top !== window && !document.querySelector('canvas')) { /* les calques en iframe gardent leur propre loupe */ }
  var R = 74, lens = null, lc = null, on = false, px = 0, py = 0, raf = 0, holdT = 0;
  function make() {
    lens = document.createElement('div'); lens.setAttribute('aria-hidden', 'true');
    lens.style.cssText = 'position:fixed;z-index:2147483600;width:' + 2 * R + 'px;height:' + 2 * R + 'px;border-radius:50%;pointer-events:none;overflow:hidden;' +
      'box-shadow:0 0 0 2px #ffa726,0 0 0 4px rgba(11,9,8,.85),0 10px 30px rgba(0,0,0,.6);background:#0b0908 no-repeat;display:none;transform:scale(.6);opacity:0;transition:transform .18s cubic-bezier(.2,.8,.2,1),opacity .18s';
    lc = document.createElement('canvas'); lc.width = lc.height = 2 * R; lc.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:none';
    lens.appendChild(lc); document.body.appendChild(lens);
  }
  function target(x, y) {
    var els = document.elementsFromPoint(x, y);
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.tagName === 'CANVAS' && e.style.opacity === '0') return { el: e, kind: 'canvas' };
      if (e.dataset && e.dataset.asciiO) return { el: e, kind: e.tagName === 'IMG' ? 'img' : 'bg' };
    }
    return null;
  }
  var natCache = {};
  function nat(u, cb) { if (natCache[u]) return cb(natCache[u]); var i = new Image(); i.onload = function () { natCache[u] = [i.naturalWidth, i.naturalHeight]; cb(natCache[u]); }; i.src = u; }
  function frame() {
    raf = 0; if (!on) return;
    lens.style.left = (px - R) + 'px'; lens.style.top = (py - R) + 'px';
    var t = target(px, py); lens.style.display = 'block';
    requestAnimationFrame(function () { lens.style.transform = 'scale(1)'; lens.style.opacity = '1'; });
    if (!t) { lens.style.backgroundImage = 'none'; lc.style.display = 'none'; return loop(); }
    var r = t.el.getBoundingClientRect();
    if (t.kind === 'canvas') {
      lens.style.backgroundImage = 'none'; lc.style.display = 'block';
      var g = lc.getContext('2d'), kx = t.el.width / r.width, ky = t.el.height / r.height;
      g.clearRect(0, 0, lc.width, lc.height);
      try { g.drawImage(t.el, (px - R - r.left) * kx, (py - R - r.top) * ky, 2 * R * kx, 2 * R * ky, 0, 0, 2 * R, 2 * R); } catch (e) {}
      return loop();
    }
    lc.style.display = 'none';
    var u = t.el.dataset.asciiO;
    if (t.kind === 'img') {
      lens.style.backgroundImage = 'url("' + u + '")'; lens.style.backgroundSize = r.width + 'px ' + r.height + 'px';
      lens.style.backgroundPosition = (r.left - (px - R)) + 'px ' + (r.top - (py - R)) + 'px'; return loop();
    }
    nat(u, function (n) {
      var cs = getComputedStyle(t.el), bs = (cs.backgroundSize || 'auto').split(',')[0].trim(), w = n[0], h = n[1];
      if (bs === 'cover' || bs === 'contain') { var s = (bs === 'cover' ? Math.max : Math.min)(r.width / n[0], r.height / n[1]); w = n[0] * s; h = n[1] * s; }
      else { var p = bs.split(/\s+/), f = function (v, box) { return /%$/.test(v) ? parseFloat(v) / 100 * box : parseFloat(v); };
        if (p[0] && p[0] !== 'auto') { w = f(p[0], r.width); h = p[1] && p[1] !== 'auto' ? f(p[1], r.height) : n[1] * w / n[0]; }
        else if (p[1] && p[1] !== 'auto') { h = f(p[1], r.height); w = n[0] * h / n[1]; } }
      var pp = (cs.backgroundPosition || '0% 0%').split(',')[0].trim().split(/\s+/), g2 = function (v, box, img) { return /%$/.test(v) ? (box - img) * parseFloat(v) / 100 : parseFloat(v) || 0; };
      var ox = g2(pp[0] || '0%', r.width, w), oy = g2(pp[1] || '50%', r.height, h);
      lens.style.backgroundImage = 'url("' + u + '")'; lens.style.backgroundSize = w + 'px ' + h + 'px';
      lens.style.backgroundRepeat = cs.backgroundRepeat.split(',')[0];
      lens.style.backgroundPosition = (r.left + ox - (px - R)) + 'px ' + (r.top + oy - (py - R)) + 'px';
    });
    loop();
  }
  function loop() { if (on && !raf) raf = requestAnimationFrame(frame); }
  function show() { if (!lens) make(); on = true; loop(); }
  function hide() { on = false; if (lens) { lens.style.transform = 'scale(.6)'; lens.style.opacity = '0'; setTimeout(function () { if (!on) lens.style.display = 'none'; }, 180); } }
  addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; if (e.pointerType === 'mouse') { if (e.altKey && !on) show(); else if (!e.altKey && on) hide(); } if (holdT && e.pointerType !== 'mouse') { clearTimeout(holdT); holdT = 0; } }, { passive: true });
  addEventListener('keydown', function (e) { if (e.key === 'Alt') { e.preventDefault(); show(); } });
  addEventListener('keyup', function (e) { if (e.key === 'Alt') hide(); });
  addEventListener('blur', hide);
  addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') return; px = e.clientX; py = e.clientY; holdT = setTimeout(function () { holdT = 0; show(); }, 480); }, { passive: true });
  addEventListener('pointerup', function () { if (holdT) { clearTimeout(holdT); holdT = 0; } if (on) hide(); });
  addEventListener('pointercancel', function () { if (holdT) { clearTimeout(holdT); holdT = 0; } if (on) hide(); });
})();
