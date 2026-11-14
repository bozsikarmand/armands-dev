// 404-oldali kereső: a nyelvi searchindex.json-ben keres (Fuse.js),
// találatokra kattintva az adott oldalra ugrik.
(function () {
  var input = document.getElementById('search-404');
  var menu = document.getElementById('search-404-results');
  var box = document.getElementById('search-404-box');
  if (!input || !menu || !box || typeof Fuse === 'undefined') return;

  var indexUrl = box.getAttribute('data-index');
  var fuse = null;

  fetch(indexUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      fuse = new Fuse(data, {
        keys: ['title', 'content'],
        threshold: 0.4,
        ignoreLocation: true,
      });
      // ha az index megérkezése előtt gépeltek, újrarenderelünk
      if (input.value.trim()) update();
    })
    .catch(function () {});

  function update() {
    menu.textContent = '';
    var q = input.value.trim();
    if (!q || !fuse) { menu.hidden = true; return; }
    var results = fuse.search(q).slice(0, 8);
    if (!results.length) { menu.hidden = true; return; }
    var hint = document.createElement('div');
    hint.className = 'au-search__hint';
    hint.innerHTML = '<span><b>&uarr;&darr;</b> navigate</span><span><b>&crarr;</b> open</span><span><b>esc</b> close</span>';
    menu.appendChild(hint);
    results.forEach(function (r) {
      // Fuse >= 6: {item: {...}}; régebbi: maga az elem
      var item = r.item ? r.item : r;
      if (!item || !item.uri) return;
      var a = document.createElement('a');
      a.href = item.uri;
      a.className = 'au-search__result';
      var label = document.createElement('span');
      label.className = 'result-item';
      label.textContent = item.title;
      a.appendChild(label);
      // szekció-címke az URL-ből: /hu/blog/xy/ -> blog
      var m = item.uri.match(/^\/(?:en|hu)?\/?([a-z0-9-]+)\//);
      if (m && m[1] !== m[1].replace(/-/g, '')) m = null; // csak szekció, nem az út első tag-je
      if (m && ['blog', 'projects', 'about', 'contact'].indexOf(m[1]) !== -1) {
        var tag = document.createElement('small');
        tag.className = 'au-search__hint'; // kompakt, muted stílus
        tag.style.cssText = 'border-top:0;padding:0;margin-left:auto;';
        tag.textContent = m[1];
        a.appendChild(tag);
      }
      menu.appendChild(a);
    });
    menu.hidden = false;
  }

  input.addEventListener('input', update);

  document.addEventListener('click', function (e) {
    if (!box.contains(e.target) && e.target !== input) menu.hidden = true;
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { menu.hidden = true; input.blur(); return; }
    if (menu.hidden) return;
    var links = menu.querySelectorAll('.au-search__result');
    if (!links.length) return;
    var idx = Array.prototype.indexOf.call(links, menu.querySelector('.au-search__result.is-active'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx >= 0) links[idx].classList.remove('is-active');
      idx = e.key === 'ArrowDown'
        ? (idx + 1) % links.length
        : (idx <= 0 ? links.length - 1 : idx - 1);
      links[idx].classList.add('is-active');
      links[idx].scrollIntoView({ block: 'nearest' });
    } else if ((e.key === 'Enter' || e.key === 'NumpadEnter') && idx >= 0) {
      e.preventDefault();
      links[idx].click();
    }
  });
})();
