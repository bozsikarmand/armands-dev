// HorizonX mockup bootstrap: a 3D mockup-ok (mockup-laptop.js / mockup-phone.js,
// egyenként ~1 MB) kattintásra töltődnek — az oldal TTI-je így érintetlen marad.
// CSP-barát: dinamikus import 'self' forrásból, inline JS nélkül.
(function () {
  var buttons = document.querySelectorAll('[data-mockup-load]');
  if (!buttons.length) return;

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var which = btn.getAttribute('data-mockup-load');
      btn.removeAttribute('data-mockup-load');
      btn.disabled = true;
      btn.classList.add('is-loading');
      import('/assets/scripts/mockup-' + which + '.js').catch(function () {
        btn.classList.remove('is-loading');
        btn.disabled = false;
      });
    });
  });

  // a stage progresszív háttere (screenshot) eltűnik, amint a WebGL canvas kész
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
