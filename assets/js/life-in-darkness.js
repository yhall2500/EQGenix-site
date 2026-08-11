/* Life in Darkness — launch countdown + three-doors scroll swap */
(function () {
  'use strict';
  var TARGET = new Date('2026-09-11T19:00:00-07:00').getTime();
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var box = document.getElementById('lid-countdown');
    if (!box) return;
    var cells = box.children;
    var diff = Math.max(0, TARGET - Date.now());
    var d = Math.floor(diff / 86400000); diff -= d * 86400000;
    var h = Math.floor(diff / 3600000); diff -= h * 3600000;
    var m = Math.floor(diff / 60000); diff -= m * 60000;
    var s = Math.floor(diff / 1000);
    var vals = [String(d), pad(h), pad(m), pad(s)];
    for (var i = 0; i < cells.length && i < 4; i++) {
      var v = cells[i].firstElementChild;
      if (v) v.textContent = vals[i];
    }
  }
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
    tick();
    setInterval(tick, 1000);
    window.addEventListener('scroll', doors, { passive: true });
    window.addEventListener('resize', doors);
    doors();
  }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();