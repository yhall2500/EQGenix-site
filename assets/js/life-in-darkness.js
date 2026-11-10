/* Life in Darkness — three-doors scroll swap */
(function () {
  'use strict';
  function doors() {
    var rows = document.querySelectorAll('[data-door]');
    var imgs = document.querySelectorAll('[data-door-img]');
    if (!rows.length || !imgs.length) return;
    var mid = window.innerHeight / 2, best = '1', bd = Infinity;
    rows.forEach(function (el) {
      var row = el.parentElement || el;
      var rect = row.getBoundingClientRect();
      var d = Math.abs((rect.top + rect.bottom) / 2 - mid);
      if (d < bd) { bd = d; best = el.getAttribute('data-door'); }
    });
    imgs.forEach(function (im) { im.style.opacity = im.getAttribute('data-door-img') === best ? '1' : '0'; });
  }
  function boot() {
window.addEventListener('scroll', doors, { passive: true });
    window.addEventListener('resize', doors);
    doors();
  }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();