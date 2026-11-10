// Projekt-szűrő kategória szerint
(function () {
  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('#project-grid .project-card');
  var empty = document.getElementById('filter-empty');
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var filter = btn.getAttribute('data-filter');
      var visible = 0;
      cards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    });
  });
})();
