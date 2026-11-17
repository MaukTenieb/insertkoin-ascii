/* ascii-retour.js — Insert Koin ASCII : sur les pages ouvertes seules, la dynamite Baku Boom, en haut à gauche, ramène à la borne. */
(function () {
  'use strict';
  if (window.top !== window) return;
  function start() {
    var s = document.currentScript || document.querySelector('script[src$="ascii-retour.js"]');
    var root = s && s.src ? s.src.replace(/ascii-retour\.js.*$/, '') : './';
    var fr = (document.documentElement.lang || '').indexOf('fr') === 0;
    var a = document.createElement('a');
    a.href = root + (fr ? 'fr.html' : './'); a.setAttribute('aria-label', 'Baku Boom'); a.title = 'Baku Boom';
    a.style.cssText = 'position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));z-index:2147483000;width:44px;height:44px;border-radius:50%;' +
      'display:grid;place-items:center;background:#16120f url("' + root + '_o/baku-boom-dynamite.webp") center/30px no-repeat;box-shadow:0 2px 0 #000,0 6px 14px rgba(0,0,0,.55);' +
      'outline-offset:3px;transition:transform .15s ease-out';
    a.style.setProperty('background-color', '#16120f', 'important');
    a.onmouseenter = function () { a.style.transform = 'scale(1.08)'; }; a.onmouseleave = function () { a.style.transform = ''; };
    document.body.appendChild(a);
    var scroll = document.documentElement.scrollHeight > innerHeight * 1.15;
    if (scroll) { document.body.style.paddingBottom = 'max(' + (getComputedStyle(document.body).paddingBottom) + ', 76px)'; }   // page qui défile : une marge en bas garde le texte hors de la dynamite
    else { a.style.bottom = ''; a.style.top = 'max(8px,env(safe-area-inset-top))'; a.style.width = a.style.height = '32px'; a.style.backgroundSize = '22px'; a.style.opacity = '.78';
      a.onmouseenter = function () { a.style.transform = 'scale(1.25)'; a.style.opacity = '1'; }; a.onmouseleave = function () { a.style.transform = ''; a.style.opacity = '.78'; }; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
