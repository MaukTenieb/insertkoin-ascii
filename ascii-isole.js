/* ascii-isole.js — Insert Koin ASCII garde ses propres réglages, sauvegardes, Koins et bases de données,
   sous le préfixe « ascii: », à l'écart d'Insert Koin servi sur la même origine. */
(function () {
  'use strict';
  var P = 'ascii:';
  function wrap(st) {
    if (!st) return st;
    var api = {
      getItem: function (k) { return st.getItem(P + k); },
      setItem: function (k, v) { st.setItem(P + k, String(v)); },
      removeItem: function (k) { st.removeItem(P + k); },
      clear: function () { keys().forEach(function (k) { st.removeItem(P + k); }); },
      key: function (i) { var a = keys(); return i < a.length ? a[i] : null; }
    };
    function keys() { var a = []; for (var i = 0; i < st.length; i++) { var k = st.key(i); if (k && k.indexOf(P) === 0) a.push(k.slice(P.length)); } return a; }
    return new Proxy(api, {
      get: function (t, k) { if (k === 'length') return keys().length; if (k in t) return t[k]; if (typeof k === 'string') return st.getItem(P + k) === null ? undefined : st.getItem(P + k); return undefined; },
      set: function (t, k, v) { st.setItem(P + k, String(v)); return true; },
      deleteProperty: function (t, k) { st.removeItem(P + k); return true; },
      has: function (t, k) { return k in t || st.getItem(P + k) !== null; },
      ownKeys: function () { return keys(); },
      getOwnPropertyDescriptor: function (t, k) { var v = st.getItem(P + k); return v === null ? undefined : { value: v, enumerable: true, configurable: true, writable: true }; }
    });
  }
  ['localStorage', 'sessionStorage'].forEach(function (n) {
    try { var w = wrap(window[n]); Object.defineProperty(window, n, { configurable: true, get: function () { return w; } }); } catch (e) {}
  });
  try {
    var idb = window.indexedDB, open = idb.open.bind(idb), del = idb.deleteDatabase.bind(idb);
    idb.open = function (name, v) { return v === undefined ? open('ascii-' + name) : open('ascii-' + name, v); };
    idb.deleteDatabase = function (name) { return del('ascii-' + name); };
  } catch (e) {}
})();
