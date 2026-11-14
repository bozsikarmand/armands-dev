// Vissza az oldal tetejére (a baseof inline scriptjének külső, CSP-barát változata)
(function () {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'au-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function () {
    btn.classList.toggle('is-visible', window.scrollY > 150);
  }, { passive: true });
})();
