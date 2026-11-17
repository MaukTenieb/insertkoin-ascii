/* ascii-lisible.js — Insert Koin ASCII, réglages d'usage sur écran tactile :
   textes d'interface relevés à 11 px au moins quand la mise en page le permet ; zones de touche portées à 44 px sans changer le dessin. */
(function () {
  'use strict';
  var touch = matchMedia('(pointer: coarse)').matches;
  if (!touch) return;
  var MIN = 11, HIT = 44, seen = new WeakSet();
  var css = document.createElement('style');
  css.textContent = '.ascii-hit::after{content:"";position:absolute;left:50%;top:50%;width:max(100%,' + HIT + 'px);height:max(100%,' + HIT + 'px);transform:translate(-50%,-50%);}';
  (document.head || document.documentElement).appendChild(css);
  function textLeaf(el) {
    if (/^(SCRIPT|STYLE|CANVAS|SVG|svg|IMG|VIDEO|IFRAME|INPUT|TEXTAREA|SELECT|PRE|CODE)$/.test(el.tagName)) return false;
    for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    return false;
  }
  function raise(el) {
    var fs = parseFloat(getComputedStyle(el).fontSize); if (!(fs > 0 && fs < MIN)) return;
    var p = el.parentElement || el, r0 = p.getBoundingClientRect(), w0 = el.scrollWidth > el.clientWidth;
    el.style.fontSize = MIN + 'px';
    var r1 = p.getBoundingClientRect();
    if (Math.abs(r1.height - r0.height) > 2 || Math.abs(r1.width - r0.width) > 2 || w0) { el.style.fontSize = ''; return; }   // la mise en page bouge : on garde la taille d'origine
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1 && getComputedStyle(el).overflowY !== 'visible') el.style.fontSize = '';   // le texte déborde de sa case : taille d'origine
  }
  function hit(el) {
    var r = el.getBoundingClientRect(); if (r.width >= HIT && r.height >= HIT) return;
    var cs = getComputedStyle(el, '::after'); if (cs.content && cs.content !== 'none' && cs.content !== 'normal') return;
    var pos = getComputedStyle(el).position; if (pos === 'static') { if (el.querySelector('*')) return; el.style.position = 'relative'; }
    el.classList.add('ascii-hit');
  }
  function scan() {
    var all = document.body ? document.body.getElementsByTagName('*') : [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i]; if (seen.has(el) || !el.offsetWidth) continue; seen.add(el);
      try { if (el.matches('button,a,[role=button],[role=tab],label,select')) hit(el); if (textLeaf(el)) raise(el); } catch (e) {}
    }
  }
  function start() { scan(); (function(){var t=0;function go(){clearTimeout(t);t=setTimeout(scan,350);}try{new MutationObserver(go).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','src']});}catch(e){}setInterval(scan,5000);})(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
