/* ascii-live.js — Insert Koin ASCII.
   Chaque canvas visible de la page passe en direct en caractères ASCII de Press Start 2P (matrice 8x8 des bornes d'arcade, police d'écran de la borne selon DA.md) :
   par cellule, le caractère dont le dessin épouse le mieux l'image, avec une encre et un papier calculés par moindres carrés (WebGL2).
   Le canvas d'origine continue de tourner (jeu, souris, clavier, toucher) ; la version ASCII se pose sur lui, transparente aux clics. */
(function () {
  'use strict';
  var ATLAS_HI='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvgAAAAICAAAAACpRNQPAAADFklEQVR42u1Yy5blIAisOuf+/y/XLCIIiCaZ2z2ryaJvYisij6KE8EcAAQgUOH8BXX9BQLRpY2C+zc8Xj4gqUAAueePlmpA+/Xu8xHXdLnFcvlvYx7fp9/Fx0Pcd//Gzz4XJhrZfsqmmYGVxy7cN1PUCxbqPqn4czvPjINg7OqG31WYwSlDzGo7d7fc6SP52fTR9lfLZL4Is0AVCtE9KbOTbcEiYW4U1ckkeuSNAxJlLw5XRqsG3Mx/HuhDZ7AzHtBtlue0HG3KEoZjpx40emCnIk8dEoeLIJR8St9985/hqMYoRItA4kOKPBCKXl4QV//xp/X4b+IYmQogNnuRb3Oixo2S4dDlcxXGaFQgBgRkczApYW/0mEpoFDE0N6ZlsI9A9uKT6MxiqU9Qh7G0U302xJOkBeQ1rrmIZK6CVBqV0yRVItTQRqXI34JDF7SqcVy3W/dbKlive/L2x3NDusxigGIbSFRTDYTOud7QiGCZ6RMsi7SUMQyoHuiE6QkWh7LdUhmJ8ltwP1a9AkjZnUw6MQo7u454D8qemB9+MWa0eWV9zCKUSgO8AnVgrzqRoqBVIiY5N4Ir2VLa6Adyhws24CIX9iDE18Rk5+zLzsp4ofh4YRLbEMk0HW/oloCrMDu8P8RWoS56bKY0Iz8yZdTHiI7WJFgkIJWSCoE43LgdhuQA8POEu0ZQgyQNxWeyOVaIuVBv3TyNfX0/oofX9QxwTf438vuDVOj3wARTEiPhsOb7ivdYhqyNPk9nreF1KV+aJAkXtSmkOac/MjTpMyDuwDeQcwJTyxbSVesL5y8AtB9ZumL5ue156QLlvMkVDkyx8Roj1nHfd1y1CjzOOq7xN4s/KNhWXwvr7fKsMYEmc1NVRKm9gYzQ+pbqZmSsSe6ZuTSm3tQvDyj03+dZ2ddK+ROaIp64OE+ldujpBXmxH7bs6jPyGeR3XbpffjuOlfhqkdnW89twBaNF/IeVVn7V7lSbUcSPk2/OXdlARl9ttofuYYq9w/FNX57tG0682o/4/v+uWL/2/ax/rnVQdsPdH9Nk8fwBEaEov7ZXN5AAAAABJRU5ErkJggg==';
  var ATLAS_LO=ATLAS_HI;
  var RAMP_IDX = [0, 64, 14, 7, 15, 26, 27, 94, 2, 8, 1, 59, 5, 10, 4, 32, 6, 3];
  var G = 95, FPS = 24, GL_FULL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94], GL_BAKE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 23, 26, 27, 28, 29, 30, 31, 32, 41, 44, 47, 52, 54, 56, 57, 59, 60, 61, 62, 63, 64, 67, 73, 74, 76, 77, 78, 79, 83, 85, 86, 87, 88, 90, 91, 92, 93, 94];
  var items = [], imgHi = new Image(), imgLo = new Image(), ready = 0;
  imgHi.onload = imgLo.onload = function () { if (++ready === 2) start(); };
  imgHi.src = ATLAS_HI; imgLo.src = ATLAS_LO;

  var VS = '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS1 = [
    '#version 300 es', 'precision highp float;precision highp int;',
    'uniform sampler2D src;uniform sampler2D lo;uniform vec2 grid;uniform float pen;uniform int glist[95];uniform int gN;uniform int ramp[18];',
    'layout(location=0) out vec4 oF;layout(location=1) out vec4 oB;layout(location=2) out vec4 oG;',
    'const int SW=8;const int SH=8;const float K=64.;const float DMIN=0.30;',
    'float L(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}',
    'void main(){',
    ' vec2 cell=floor(gl_FragCoord.xy);vec4 px[64];vec4 sx=vec4(0.);float sq=0.;',
    ' for(int j=0;j<SH;j++)for(int i=0;i<SW;i++){vec4 c=texture(src,(cell+(vec2(float(i),float(j))+.5)/vec2(float(SW),float(SH)))/grid);px[j*SW+i]=c;sx+=c;sq+=dot(c,c);}',
    ' vec4 mean=sx/K;float var_=(sq-dot(sx,sx)/K)/K;float En=var_*K;',
    ' float bestE=1e9;int bestG=0;vec4 bF=mean;vec4 bB=mean;',
    ' for(int k=0;k<95;k++){if(k>=gN)break;int g=glist[k];',
    '  vec4 sm=vec4(0.);float a=0.,b=0.,c=0.;',
    '  for(int j=0;j<SH;j++)for(int i=0;i<SW;i++){float m=texelFetch(lo,ivec2(g*SW+i,j),0).r;sm+=m*px[j*SW+i];a+=m*m;b+=m*(1.-m);c+=(1.-m)*(1.-m);}',
    '  vec4 sn=sx-sm;float det=a*c-b*b;vec4 f,bg;float e;',
    '  if(det<1e-6){f=mean;bg=mean;e=-dot(sx,sx)/K;}',
    '  else{f=(c*sm-b*sn)/det;bg=(a*sn-b*sm)/det;e=-(dot(f,sm)+dot(bg,sn));}',
    '  if((g>=16&&g<=25)||(g>=33&&g<=58)||(g>=65&&g<=90))e+=pen*En;',
    '  if(e<bestE-1e-7){bestE=e;bestG=g;bF=f;bB=bg;}',
    ' }',
    ' bF=clamp(bF,0.,1.);bB=clamp(bB,0.,1.);',
    ' float lum=L(mean.rgb)/max(mean.a,1e-3);',
    ' float contrast=max(max(abs(bF.r-bB.r),abs(bF.g-bB.g)),abs(bF.b-bB.b));',
    ' bool flat_=var_<0.0025&&contrast<0.10&&mean.a>0.05;',
    ' if(flat_){int ri=lum<0.035?0:clamp(int(floor(lum*17.+.5)),1,17);bestG=ramp[ri];bF=mean;bB=mean;}',
    ' float cov=0.;for(int j=0;j<SH;j++)for(int i=0;i<SW;i++)cov+=texelFetch(lo,ivec2(bestG*SW+i,j),0).r;cov/=K;',
    ' vec4 mc=bF*cov+bB*(1.-cov);float dl=L(bF.rgb-bB.rgb);',
    ' float sg=dl>=0.?1.:-1.;if(flat_)sg=lum>.5?-1.:1.;',
    ' float ml=L(mc.rgb)/max(mc.a,1e-3);float dmin=DMIN*mc.a*(.55+.45*min(1.,ml*3.));',
    ' float need=(flat_&&lum<0.035)?0.:max(0.,dmin-abs(dl));',
    ' bF.rgb+=sg*need*(1.-cov);bB.rgb-=sg*need*cov;',
    ' bF.rgb=clamp(bF.rgb,0.,bF.a);bB.rgb=clamp(bB.rgb,0.,bB.a);',
    ' oF=bF;oB=bB;oG=vec4(float(bestG)/255.,0.,0.,1.);',
    '}'].join('\n');
  var FS2 = [
    '#version 300 es', 'precision highp float;',
    'uniform sampler2D tF;uniform sampler2D tB;uniform sampler2D tG;uniform sampler2D hi;uniform vec2 grid;uniform vec2 res;out vec4 o;',
    'void main(){vec2 q=vec2(gl_FragCoord.x,res.y-gl_FragCoord.y)/res*grid;ivec2 c=ivec2(min(floor(q),grid-1.));vec2 f=fract(q);',
    ' float g=floor(texelFetch(tG,c,0).r*255.+.5);',
    ' float m=texture(hi,vec2((g*8.+clamp(f.x*8.,.5,7.5))/760.,clamp(f.y*8.,.5,7.5)/8.)).r;',
    ' o=mix(texelFetch(tB,c,0),texelFetch(tF,c,0),m);}'].join('\n');

  function sh(gl, type, s) { var o = gl.createShader(type); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; }
  function prog(gl, fs) { var p = gl.createProgram(); gl.attachShader(p, sh(gl, gl.VERTEX_SHADER, VS)); gl.attachShader(p, sh(gl, gl.FRAGMENT_SHADER, fs)); gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p; }
  function tex(gl, filter) { var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; }

  function setupGL(ov, keep) {
    var gl = ov.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false, preserveDrawingBuffer: !!keep });
    if (!gl) return null;
    var S = { gl: gl, p1: prog(gl, FS1), p2: prog(gl, FS2) };
    var vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    S.hi = tex(gl, gl.LINEAR); upR8(gl, lum(imgHi));
    S.lo = tex(gl, gl.NEAREST); upR8(gl, lum(imgLo));
    S.src = tex(gl, gl.LINEAR);
    S.tF = tex(gl, gl.NEAREST); S.tB = tex(gl, gl.NEAREST); S.tG = tex(gl, gl.NEAREST);
    S.fb = gl.createFramebuffer(); S.cols = 0; S.rows = 0;
    gl.useProgram(S.p1);
    gl.uniform1iv(gl.getUniformLocation(S.p1, 'ramp'), RAMP_IDX);
    gl.uniform1i(gl.getUniformLocation(S.p1, 'src'), 0); gl.uniform1i(gl.getUniformLocation(S.p1, 'lo'), 1);
    gl.useProgram(S.p2);
    ['tF', 'tB', 'tG', 'hi'].forEach(function (n, i) { gl.uniform1i(gl.getUniformLocation(S.p2, n), i); });
    return S;
  }
  var lumCache = new Map();
  function lum(img) {
    if (lumCache.has(img)) return lumCache.get(img);
    var c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    var x = c.getContext('2d'); x.drawImage(img, 0, 0);
    var d = x.getImageData(0, 0, c.width, c.height).data, out = new Uint8Array(c.width * c.height);
    for (var i = 0; i < out.length; i++) out[i] = d[i * 4];
    var r = { w: c.width, h: c.height, d: out }; lumCache.set(img, r); return r;
  }
  function upR8(gl, o) { gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, o.w, o.h, 0, gl.RED, gl.UNSIGNED_BYTE, o.d); }

  function visible(el) {
    if (!el.isConnected || el.dataset.asciiOverlay) return false;
    if (el.offsetWidth < 24 || el.offsetHeight < 24) return false;
    var cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  }

  /* ---- Texte des jeux : chaque fillText/strokeText des canvas est relevé, puis réécrit net dans la grille, en Press Start 2P ---- */
  var TXT = new WeakMap();
  (function () {
    var P = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype; if (!P) return;
    var ft = P.fillText, st = P.strokeText, cr = P.clearRect, fr = P.fillRect;
    function rec(ctx, t, x, y, stroke) {
      var c = ctx.canvas; if (!c || !c.isConnected) return;
      var L = TXT.get(c); if (!L) { L = { items: [] }; TXT.set(c, L); }
      var m = ctx.getTransform();
      L.items.push({ t: String(t), x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f, sx: Math.hypot(m.a, m.b), sy: Math.hypot(m.c, m.d),
        font: ctx.font, fill: stroke ? ctx.strokeStyle : ctx.fillStyle, align: ctx.textAlign, base: ctx.textBaseline, alpha: ctx.globalAlpha,
        w: (function () { try { return ft === null ? 0 : ctx.measureText(String(t)).width * Math.hypot(m.a, m.b); } catch (e) { return 0; } })() });
      if (L.items.length > 300) L.items.splice(0, L.items.length - 300);
    }
    function wipe(ctx, w, h) { var c = ctx.canvas, L = TXT.get(c); if (!L) return; var m = ctx.getTransform(); if (Math.abs(w * m.a) >= c.width * 0.9 && Math.abs(h * m.d) >= c.height * 0.9) L.items = []; }
    P.fillText = function (t, x, y) { rec(this, t, x, y, false); return ft.apply(this, arguments); };
    P.strokeText = function (t, x, y) { rec(this, t, x, y, true); return st.apply(this, arguments); };
    P.clearRect = function (x, y, w, h) { wipe(this, w, h); return cr.apply(this, arguments); };
    P.fillRect = function (x, y, w, h) { wipe(this, w, h); return fr.apply(this, arguments); };
  })();
  try { var ff = new FontFace('IK Arcade', 'url(' + (document.currentScript ? document.currentScript.src.replace(/[^\/]*$/, '') : '') + 'font-press-start-2p-latin-400-normal.woff2)'); ff.load().then(function (f) { document.fonts.add(f); }, function () {}); } catch (e) {}
  function drawText(it) {
    var L = TXT.get(it.cv), tx = it.tx; if (!tx) return;
    tx.style.cssText = it.ov.style.cssText; tx.style.display = it.ov.style.display;
    if (tx.width !== it.ov.width || tx.height !== it.ov.height) { tx.width = it.ov.width; tx.height = it.ov.height; }
    var g = tx.getContext('2d'); g.clearRect(0, 0, tx.width, tx.height);
    if (!L || !L.items.length) return;
    var k = tx.width / it.cv.width, ky = tx.height / it.cv.height;
    L.items.forEach(function (o) {
      if (!o.t.trim()) return;
      var m = /(\d+(?:\.\d+)?)px/.exec(o.font), h = (m ? parseFloat(m[1]) : 12) * o.sy * ky;
      var size = Math.max(6, Math.min(h, o.w > 0 ? o.w * k / o.t.length : h));
      size = Math.max(6, Math.round(size));
      g.font = size + 'px "IK Arcade", monospace'; g.textAlign = o.align || 'start'; g.textBaseline = o.base || 'alphabetic';
      var x = o.x * k, y = o.y * ky, w = g.measureText(o.t).width, x0 = x;
      if (g.textAlign === 'center') x0 = x - w / 2; else if (g.textAlign === 'right' || g.textAlign === 'end') x0 = x - w;
      var top = y - size; if (g.textBaseline === 'top' || g.textBaseline === 'hanging') top = y; else if (g.textBaseline === 'middle') top = y - size / 2; else if (g.textBaseline === 'bottom') top = y - size;
      g.globalAlpha = o.alpha == null ? 1 : o.alpha;
      g.fillStyle = 'rgba(11,9,8,.82)'; g.fillRect(Math.floor(x0 - 2), Math.floor(top - 2), Math.ceil(w + 4), Math.ceil(size + 4));
      g.fillStyle = typeof o.fill === 'string' ? o.fill : '#ffe3a0'; g.fillText(o.t, x, y);
    });
    g.globalAlpha = 1;
  }
  var layer = null;
  function getLayer() {
    if (layer && layer.isConnected) return layer;
    layer = document.createElement('div'); layer.dataset.asciiOverlay = '1';
    layer.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;';
    document.body.appendChild(layer); return layer;
  }
  function zOf(el) { var z = 0; for (var e = el; e && e !== document.body; e = e.parentElement) { var v = parseInt(getComputedStyle(e).zIndex, 10); if (!isNaN(v)) z = Math.max(z, v); } return z; }
  function same(a, b) { return Math.abs(a.left - b.left) < 1 && Math.abs(a.top - b.top) < 1 && Math.abs(a.width - b.width) < 1 && Math.abs(a.height - b.height) < 1; }
  function mount(cv, ov) {
    var host = cv.parentElement, kids = [].slice.call(host.children), r0 = kids.map(function (k) { return k.getBoundingClientRect(); }), h0 = host.getBoundingClientRect();
    host.insertBefore(ov, cv.nextSibling);
    var ok = same(h0, host.getBoundingClientRect()) && kids.every(function (k, i) { return same(r0[i], k.getBoundingClientRect()); });
    if (ok && cv.offsetWidth > 0) return 'sibling';
    getLayer().appendChild(ov); return 'fixed';   // la page bouge avec un frère : la superposition passe dans un calque fixe
  }
  function attach(cv) {
    var ov = document.createElement('canvas');
    ov.dataset.asciiOverlay = '1'; ov.setAttribute('aria-hidden', 'true');
    ov.style.cssText = 'all:initial;display:block;position:absolute;pointer-events:none;margin:0;padding:0;border:0;';
    var mode = mount(cv, ov);
    var S = null;
    try { S = setupGL(ov); } catch (e) { S = null; console.warn('ascii-live', e && e.message); }
    if (!S) { ov.remove(); cv.dataset.asciiSkip = '1'; return; }
    var tx = document.createElement('canvas'); tx.dataset.asciiOverlay = '1'; tx.setAttribute('aria-hidden', 'true'); tx.style.cssText = 'display:none';
    ov.parentNode.insertBefore(tx, ov.nextSibling);
    var it = { cv: cv, ov: ov, tx: tx, S: S, mode: mode, host: cv.parentElement, prevOpacity: cv.style.opacity };
    cv.__ascii = it; items.push(it);
  }
  function scan() {
    var list = document.getElementsByTagName('canvas');
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (!window.ASCII_NO_CANVAS && !c.__ascii && !c.dataset.asciiOverlay && !c.dataset.asciiSkip && visible(c)) attach(c);
    }
  }
  function place(it) {
    var cv = it.cv, ov = it.ov;
    if (cv.parentElement !== it.host) { it.host = cv.parentElement; it.mode = mount(cv, ov); }
    else if (it.mode === 'sibling' && ov.previousSibling !== cv) cv.parentNode.insertBefore(ov, cv.nextSibling);
    if (it.mode === 'fixed') {
      var rr = cv.getBoundingClientRect(), cs0 = getComputedStyle(cv), f = function (v) { return parseFloat(v) || 0; };
      var lft = rr.left + f(cs0.borderLeftWidth) + f(cs0.paddingLeft), tp = rr.top + f(cs0.borderTopWidth) + f(cs0.paddingTop);
      var ww = rr.width - f(cs0.borderLeftWidth) - f(cs0.paddingLeft) - f(cs0.borderRightWidth) - f(cs0.paddingRight);
      var hh = rr.height - f(cs0.borderTopWidth) - f(cs0.paddingTop) - f(cs0.borderBottomWidth) - f(cs0.paddingBottom);
      ov.style.position = 'fixed'; ov.style.left = lft + 'px'; ov.style.top = tp + 'px'; ov.style.width = ww + 'px'; ov.style.height = hh + 'px';
      ov.style.transform = ''; ov.style.zIndex = String(zOf(cv) + 1); ov.style.borderRadius = cs0.borderRadius;
      var dprF = Math.min(window.devicePixelRatio || 1, 2), WF = Math.max(1, Math.round(ww * dprF)), HF = Math.max(1, Math.round(hh * dprF));
      if (ov.width !== WF || ov.height !== HF) { ov.width = WF; ov.height = HF; }
      return { cw: ww, ch: hh };
    }
    var cs = getComputedStyle(cv), n = function (v) { return parseFloat(v) || 0; };
    var bl = n(cs.borderLeftWidth), bt = n(cs.borderTopWidth), pl = n(cs.paddingLeft), pt = n(cs.paddingTop);
    var cw = cv.offsetWidth - bl - pl - n(cs.borderRightWidth) - n(cs.paddingRight);
    var ch = cv.offsetHeight - bt - pt - n(cs.borderBottomWidth) - n(cs.paddingBottom);
    var left = cv.offsetLeft + bl + pl, top = cv.offsetTop + bt + pt;
    if (cs.position === 'fixed') { ov.style.position = 'fixed'; var r = cv.getBoundingClientRect(); left = r.left + bl + pl; top = r.top + bt + pt; }
    else ov.style.position = 'absolute';
    ov.style.transform = (cs.position === 'absolute' || cs.position === 'fixed') && cs.transform !== 'none' ? cs.transform : 'none';
    ov.style.transformOrigin = cs.transformOrigin;
    ov.style.gridArea = 'auto';
    if (ov.style.position === 'absolute' && ov.style.transform === 'none') {   // origine réelle du bloc conteneur, grilles comprises
      ov.style.left = '0px'; ov.style.top = '0px';
      var o0 = ov.getBoundingClientRect(), rc = cv.getBoundingClientRect();
      left = rc.left - o0.left + bl + pl; top = rc.top - o0.top + bt + pt;
    }
    ov.style.left = left + 'px'; ov.style.top = top + 'px'; ov.style.width = cw + 'px'; ov.style.height = ch + 'px';
    ov.style.zIndex = cs.zIndex === 'auto' ? '' : cs.zIndex; ov.style.borderRadius = cs.borderRadius;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = Math.max(1, Math.round(cw * dpr)), H = Math.max(1, Math.round(ch * dpr));
    if (ov.width !== W || ov.height !== H) { ov.width = W; ov.height = H; }
    return { cw: cw, ch: ch };
  }
  function draw(it) {
    var cv = it.cv, S = it.S, gl = S.gl;
    if (!visible(cv)) { it.ov.style.display = 'none'; return; }
    it.ov.style.display = '';
    var g = place(it);
    var cell = cellDev() / Math.min(window.devicePixelRatio || 1, 2);
    var cols = Math.max(4, Math.round(g.cw / cell)), rows = Math.max(2, Math.round(g.ch / cell));
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, S.src);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv); }
    catch (e) { it.dead = true; cv.dataset.asciiSkip = '1'; cv.style.opacity = it.prevOpacity || ''; return; }
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    if (S.cols !== cols || S.rows !== rows) {
      [S.tF, S.tB, S.tG].forEach(function (t) { gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, cols, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, null); });
      gl.bindFramebuffer(gl.FRAMEBUFFER, S.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, S.tF, 0);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, S.tB, 0);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, S.tG, 0);
      gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2]);
      S.cols = cols; S.rows = rows;
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, S.src);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, S.fb); gl.viewport(0, 0, cols, rows);
    gl.useProgram(S.p1);
    gl.uniform2f(gl.getUniformLocation(S.p1, 'grid'), cols, rows); gl.uniform1f(gl.getUniformLocation(S.p1, 'pen'), 0.10); gl.uniform1iv(gl.getUniformLocation(S.p1, 'glist'), GL_FULL); gl.uniform1i(gl.getUniformLocation(S.p1, 'gN'), GL_FULL.length);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, S.lo);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, it.ov.width, it.ov.height);
    gl.useProgram(S.p2);
    gl.uniform2f(gl.getUniformLocation(S.p2, 'grid'), cols, rows);
    gl.uniform2f(gl.getUniformLocation(S.p2, 'res'), it.ov.width, it.ov.height);
    [S.tF, S.tB, S.tG, S.hi].forEach(function (t, i) { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); });
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    cv.style.opacity = '0';
    try { if (it.tx.parentNode !== it.ov.parentNode || it.tx.previousSibling !== it.ov) it.ov.parentNode.insertBefore(it.tx, it.ov.nextSibling); drawText(it); } catch (e) {}
  }
  var last = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    if (t - last < 1000 / FPS) return;
    last = t;
    for (var i = items.length - 1; i >= 0; i--) {
      var it = items[i];
      if (it.dead || !it.cv.isConnected) { it.ov.remove(); if (it.tx) it.tx.remove(); it.cv.__ascii = null; items.splice(i, 1); continue; }
      try { draw(it); } catch (e) { it.dead = true; it.cv.dataset.asciiSkip = '1'; it.cv.style.opacity = it.prevOpacity || ''; }
    }
  }

  /* ---- Grille de l'écran pour les images fixes : chaque <img> et chaque fond d'élément est recalculé
     à sa taille d'affichage réelle, depuis l'original (_o/), avec une cellule de corps constant. ---- */
  var ROOT = (function () { var s = document.currentScript && document.currentScript.src; return s ? s.slice(0, s.lastIndexOf('/') + 1) : location.href.replace(/[^\/]*$/, ''); })();
  var CELL_CSS = 7, baker = null, queue = Promise.resolve(), done = new WeakMap(), srcCache = new Map();
  function cellDev() { var d = window.devicePixelRatio || 1; return 8 * Math.max(1, Math.round(CELL_CSS * d / 8)); }   // un seul corps, sur pixels entiers
  var CONTROL = /(^|\/)(bouton-|baku-boom|camera-|manette-|molette|koin(-hd)?[-.]|de-[a-c]\.|btn|knob|screw|sw-|favicon|icon\.|plaque-|butee-|porte-cle|mikro)/;
  function isControl(u) { return CONTROL.test((u || '').split(/[?#]/)[0]); }
  function origUrl(u) {
    if (!u || /^(data|blob):|^#|^%23/.test(u)) return null;
    var a = new URL(u, location.href);
    if (a.href.indexOf(ROOT) === 0) { var rel = a.href.slice(ROOT.length).split(/[?#]/)[0]; if (/^_o\//.test(rel) || /(^|\/)(sprite-|busts-|room-puck)/.test(rel)) return null; return ROOT + '_o/' + rel; }
    return a.href;
  }
  function loadImg(u) {
    if (srcCache.has(u)) return srcCache.get(u);
    var p = new Promise(function (ok, ko) { var i = new Image(); i.crossOrigin = 'anonymous'; i.decoding = 'async'; i.onload = function () { ok(i); }; i.onerror = ko; i.src = u; });
    srcCache.set(u, p); return p;
  }
  function getBaker() {
    if (baker) return baker;
    var c = document.createElement('canvas'), S = setupGL(c, true);
    S.gl.bindTexture(S.gl.TEXTURE_2D, S.hi); S.gl.texParameteri(S.gl.TEXTURE_2D, S.gl.TEXTURE_MAG_FILTER, S.gl.NEAREST); S.gl.texParameteri(S.gl.TEXTURE_2D, S.gl.TEXTURE_MIN_FILTER, S.gl.NEAREST);
    baker = { c: c, S: S }; return baker;
  }
  function bake(img, outW, outH, cell) {
    var B = getBaker(), S = B.S, gl = S.gl, c = B.c;
    var cols = Math.max(1, Math.round(outW / cell)), rows = Math.max(1, Math.round(outH / cell));
    c.width = outW; c.height = outH;
    var flt = cell % 8 === 0 ? gl.NEAREST : gl.LINEAR; gl.bindTexture(gl.TEXTURE_2D, S.hi); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, flt); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, flt);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, S.src);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    [S.tF, S.tB, S.tG].forEach(function (t) { gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, cols, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, null); });
    gl.bindFramebuffer(gl.FRAMEBUFFER, S.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, S.tF, 0);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, S.tB, 0);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, S.tG, 0);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2]);
    S.cols = cols; S.rows = rows;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, S.src);
    gl.viewport(0, 0, cols, rows); gl.useProgram(S.p1);
    gl.uniform2f(gl.getUniformLocation(S.p1, 'grid'), cols, rows); gl.uniform1f(gl.getUniformLocation(S.p1, 'pen'), 0.15); gl.uniform1iv(gl.getUniformLocation(S.p1, 'glist'), GL_BAKE); gl.uniform1i(gl.getUniformLocation(S.p1, 'gN'), GL_BAKE.length);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, S.lo);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, outW, outH); gl.useProgram(S.p2);
    gl.uniform2f(gl.getUniformLocation(S.p2, 'grid'), cols, rows);
    gl.uniform2f(gl.getUniformLocation(S.p2, 'res'), outW, outH);
    [S.tF, S.tB, S.tG, S.hi].forEach(function (t, i) { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); });
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
    return new Promise(function (ok) { c.toBlob(function (b) { ok(b ? URL.createObjectURL(b) : null); }, 'image/png'); });
  }
  function job(fn) { queue = queue.then(fn).catch(function () {}); return queue; }
  function plan(natW, natH, scale, small) {   // scale : px CSS affichés par px natif
    var cell = cellDev(), dpr = window.devicePixelRatio || 1;
    var cols = Math.max(2, Math.round(natW * scale * dpr / cell));
    var outW = cols * cell, outH = Math.max(cell, Math.round(natH * outW / natW));
    if (outW > 8192 || outH > 8192) return null;
    return { w: outW, h: outH, cell: cell, d: outW / natW };
  }
  function doImg(el) {
    var src = el.currentSrc || el.src, o = origUrl(src);
    if (!o || !el.naturalWidth) return;
    var r = el.getBoundingClientRect(); if (r.width < 12 || r.height < 12) return;
    if (isControl(src)) { if (!done.get(el)) { done.set(el, { key: 'orig' }); el.srcset = o + ' ' + (el.naturalWidth / el.naturalWidth) + 'x'; } return; }
    var p = plan(el.naturalWidth, el.naturalHeight, r.width / el.naturalWidth); if (!p) return;
    var key = o + '|' + p.w, prev = done.get(el); if (prev && prev.key === key) return;
    done.set(el, { key: key });
    job(function () { return loadImg(o).then(function (im) { return bake(im, p.w, p.h, p.cell); }).then(function (u) {
      if (!u) return; var old = done.get(el); if (old && old.url) URL.revokeObjectURL(old.url);
      el.srcset = u + ' ' + p.d.toFixed(5) + 'x'; done.set(el, { key: key, url: u });
    }); });
  }
  function layerScale(cs, i, r, nw, nh) {
    var bs = (cs.backgroundSize || 'auto').split(',')[i] || 'auto'; bs = bs.trim();
    if (bs === 'cover') return Math.max(r.width / nw, r.height / nh);
    if (bs === 'contain') return Math.min(r.width / nw, r.height / nh);
    var parts = bs.split(/\s+/), w = parts[0], h = parts[1] || 'auto';
    function len(v, box) { return /%$/.test(v) ? parseFloat(v) / 100 * box : parseFloat(v); }
    if (w !== 'auto') return len(w, r.width) / nw;
    if (h !== 'auto') return len(h, r.height) / nh;
    return 1;
  }
  function doBg(el, cs) {
    var bg = cs.backgroundImage; if (!bg || bg.indexOf('url(') < 0) return;
    var r = el.getBoundingClientRect(); if (r.width < 12 || r.height < 12) return;
    if (bg.indexOf('blob:') >= 0) {
      var pv = done.get(el), sz = Math.round(r.width) + 'x' + Math.round(r.height);
      if (pv && pv.size && pv.size !== sz) { el.style.backgroundImage = ''; done.delete(el); }
      return;
    }
    if (isControl(bg.match(/url\("?([^")]+)"?\)/) ? bg.match(/url\("?([^")]+)"?\)/)[1] : '')) {
      if (!done.get(el)) { done.set(el, { key: 'orig', size: Math.round(r.width) + 'x' + Math.round(r.height) });
        el.style.backgroundImage = bg.replace(/url\("?([^")]+)"?\)/g, function (m0, u) { var o = origUrl(u); return o ? 'url("' + o + '")' : m0; }); }
      return;
    }
    var layers = bg.split(/,(?![^(]*\))/), key = bg + '|' + Math.round(r.width) + 'x' + Math.round(r.height);
    var prev = done.get(el); if (prev && prev.key === key) return;
    done.set(el, { key: key, orig: (prev && prev.orig) || bg });
    job(function () {
      return Promise.all(layers.map(function (L, i) {
        var m = L.match(/url\("?([^")]+)"?\)/); if (!m) return Promise.resolve(L.trim());
        var o = origUrl(m[1]); if (!o) return Promise.resolve(L.trim());
        return loadImg(o).then(function (im) {
          var p = plan(im.naturalWidth, im.naturalHeight, layerScale(cs, i, r, im.naturalWidth, im.naturalHeight), false); if (!p) return L.trim();
          return bake(im, p.w, p.h, p.cell).then(function (u) { return u ? 'image-set(url("' + u + '") ' + p.d.toFixed(5) + 'x)' : L.trim(); });
        }, function () { return L.trim(); });
      })).then(function (out) {
        var v = out.join(', ');
        if (v !== bg) { el.style.backgroundImage = v; done.set(el, { key: key, size: Math.round(r.width) + 'x' + Math.round(r.height), orig: bg }); }
      });
    });
  }

  /* pseudo-éléments ::before / ::after : une règle de style par élément, marquée d'un attribut */
  var psSheet = null, psN = 0, donePs = new WeakMap();
  function psRule(el, which, v) {
    if (!psSheet) { var st = document.createElement('style'); document.head.appendChild(st); psSheet = st.sheet; }
    var id = el.getAttribute('data-ascii-ps') || (++psN).toString(36); el.setAttribute('data-ascii-ps', id);
    psSheet.insertRule('[data-ascii-ps="' + id + '"]' + which + '{background-image:' + v + ' !important}', psSheet.cssRules.length);
  }
  function doPseudo(el, which) {
    var cs = getComputedStyle(el, which), bg = cs.backgroundImage;
    if (!bg || bg.indexOf('url(') < 0 || bg.indexOf('blob:') >= 0 || cs.content === 'none') return;
    var w = parseFloat(cs.width), h = parseFloat(cs.height); if (!(w > 12 && h > 12)) return;
    if (isControl((bg.match(/url\("?([^")]+)"?\)/) || [0, ''])[1])) {
      var mk = donePs.get(el) || {}; if (mk[which + 'orig']) return; mk[which + 'orig'] = 1; donePs.set(el, mk);
      psRule(el, which, bg.replace(/url\("?([^")]+)"?\)/g, function (m0, u) { var o = origUrl(u); return o ? 'url("' + o + '")' : m0; })); return;
    }
    var key = which + bg + '|' + Math.round(w) + 'x' + Math.round(h), map = donePs.get(el) || {}; if (map[key]) return;
    map[key] = 1; donePs.set(el, map);
    var r = { width: w, height: h }, layers = bg.split(/,(?![^(]*\))/);
    job(function () {
      return Promise.all(layers.map(function (L, i) {
        var m = L.match(/url\("?([^")]+)"?\)/); if (!m) return Promise.resolve(L.trim());
        var o = origUrl(m[1]); if (!o) return Promise.resolve(L.trim());
        return loadImg(o).then(function (im) {
          var p = plan(im.naturalWidth, im.naturalHeight, layerScale(cs, i, r, im.naturalWidth, im.naturalHeight)); if (!p) return L.trim();
          return bake(im, p.w, p.h, p.cell).then(function (u) { return u ? 'image-set(url("' + u + '") ' + p.d.toFixed(5) + 'x)' : L.trim(); });
        }, function () { return L.trim(); });
      })).then(function (out) { var v = out.join(', '); if (v !== bg) psRule(el, which, v); });
    });
  }
  function scanStill() {
    var vh = innerHeight * 1.5, vw = innerWidth * 1.5, all = document.body ? document.body.getElementsByTagName('*') : [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i]; if (el.dataset && el.dataset.asciiOverlay) continue;
      var r = el.getBoundingClientRect(); if (r.width < 12 || r.height < 12 || r.bottom < -200 || r.top > vh || r.right < -200 || r.left > vw) continue;
      if (el.tagName === 'IMG') { if (el.complete) doImg(el); continue; }
      if (el.tagName === 'CANVAS' || el.tagName === 'VIDEO') continue;
      var cs = getComputedStyle(el); if (cs.backgroundImage !== 'none') doBg(el, cs);
      doPseudo(el, '::before'); doPseudo(el, '::after');
    }
  }
  function start() {
    scan(); setInterval(scan, 800); requestAnimationFrame(loop);
    try { if (window.WebGL2RenderingContext) { scanStill(); setInterval(scanStill, 1200); addEventListener('resize', function () { setTimeout(scanStill, 300); }); } } catch (e) {}
  }
})();
