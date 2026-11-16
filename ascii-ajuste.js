/* ascii-ajuste.js — Insert Koin ASCII : le terminal 3615 tient entier dans sa fenêtre, téléphone couché compris (réduction proportionnelle). */
(function () {
  'use strict';
  function fit() {
    var b = document.body; if (!b) return;
    b.style.zoom = '';
    var h = document.documentElement.scrollHeight, H = innerHeight;
    if (h > H + 2) b.style.zoom = String(Math.max(0.55, H / h));
  }
  addEventListener('load', fit); addEventListener('resize', function () { clearTimeout(fit.t); fit.t = setTimeout(fit, 120); });
  setTimeout(fit, 1500);
})();
