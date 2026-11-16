/* ascii-prompteur.js — Insert Koin ASCII : tout texte plus long que sa case défile sur place, en téléprompteur,
   aller puis retour, avec une pause à chaque bout ; la case garde sa taille. */
(function () {
  'use strict';
  var SPEED = 38, PAUSE = 1.4;                       // px par seconde, secondes d'arrêt à chaque bout
  var css = document.createElement('style');
  css.textContent = '.ascii-tp{display:inline-block;white-space:nowrap;will-change:transform}' +
    '@media (prefers-reduced-motion:reduce){.ascii-tp{animation:none!important}}';
  (document.head || document.documentElement).appendChild(css);
  var sheet = css.sheet, made = {};
  function frames(p) {
    var n = 'ascii-tp-' + p; if (made[n]) return n;
    sheet.insertRule('@keyframes ' + n + '{0%,' + p + '%{transform:translateX(0)}' + (100 - p) + '%,100%{transform:translateX(var(--tp-x))}}', sheet.cssRules.length);
    made[n] = 1; return n;
  }
  var SKIP = /^(INPUT|TEXTAREA|SELECT|SCRIPT|STYLE|CANVAS|VIDEO|IFRAME|svg|PRE|CODE|OPTION)$/;
  function candidate(el) {
    if (SKIP.test(el.tagName) || el.isContentEditable || el.classList.contains('ascii-tp') || el.dataset.asciiTp || el.querySelector('.ascii-tp') || el.closest('.tp,.ascii-tp')) return false;
    if (el.clientWidth < 12 || el.scrollWidth - el.clientWidth < 3) return false;
    var cs = getComputedStyle(el);
    if (cs.overflowX === 'visible' && cs.textOverflow !== 'ellipsis') return false;
    if (cs.whiteSpace.indexOf('nowrap') < 0 && cs.textOverflow !== 'ellipsis') return false;
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) { var d = getComputedStyle(c).display; if (d === 'block' || d === 'flex' || d === 'grid') return false; }
    return el.textContent.trim().length > 0;
  }
  function wrap(el) {
    var over = el.scrollWidth - el.clientWidth;
    var s = document.createElement('span'); s.className = 'ascii-tp';
    while (el.firstChild) s.appendChild(el.firstChild);
    el.appendChild(s); el.style.textOverflow = 'clip'; el.dataset.asciiTp = '1';
    var run = over / SPEED, total = run + 2 * PAUSE, p = Math.round(PAUSE / total * 100);
    s.style.setProperty('--tp-x', -(over + 4) + 'px');
    s.style.animation = frames(p) + ' ' + total.toFixed(2) + 's linear infinite alternate';
  }
  function scan() {
    var all = document.body ? document.body.getElementsByTagName('*') : [];
    for (var i = 0; i < all.length; i++) { var el = all[i]; try { if (candidate(el)) wrap(el); } catch (e) {} }
  }
  function start() { scan(); setInterval(scan, 1500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
