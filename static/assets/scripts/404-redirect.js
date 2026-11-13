// Root 404: nyelv szerint a tematikus, keresős 404-oldalra visz
(function () {
  var lang = (navigator.language || 'en').toLowerCase().indexOf('hu') === 0 ? 'hu' : 'en';
  location.replace('/' + lang + '/404.html');
})();
