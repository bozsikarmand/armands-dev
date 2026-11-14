// HorizonX mockup bootstrap: a 3D mockup-ok (mockup-laptop.js / mockup-phone.js,
// egyenként ~1–1,5 MB) csak akkor töltődnek, amikor a stage bekerül a viewportba.
// CSP-barát: dinamikus import 'self' forrásból, inline JS nélkül.
(function () {
  var stages = document.querySelectorAll('[data-mockup-load]');
  if (!stages.length) return;

  function load(el) {
    var which = el.getAttribute('data-mockup-load');
    el.removeAttribute('data-mockup-load');
    import('/assets/scripts/mockup-' + which + '.js').catch(function () {});
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(stages, load);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    Array.prototype.forEach.call(entries, function (e) {
      if (e.isIntersecting) { io.unobserve(e.target); load(e.target); }
    });
  }, { rootMargin: '300px' });
  Array.prototype.forEach.call(stages, function (el) { io.observe(el); });
})();

// a stage progresszív háttere (screenshot) eltűnik, amint a WebGL canvas kész
(function () {
  var stages = document.querySelectorAll('.dmk-stage');
  Array.prototype.forEach.call(stages, function (stage) {
    var mo = new MutationObserver(function () {
      if (stage.querySelector('canvas')) {
        stage.classList.add('canvas-ready');
        mo.disconnect();
      }
    });
    mo.observe(stage, { childList: true });
  });
})();
