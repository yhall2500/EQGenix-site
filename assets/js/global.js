/* EQGenix global.js — vanilla progressive enhancement (nav overlay, active state). */
(function () {
  'use strict';
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var nav = document.querySelector('.eqx-nav');
    if (!nav) return;
    var ov = nav.querySelector('.eqx-nav-ov');
    var toggle = nav.querySelector('.eqx-nav-toggle');
    var closeBtn = nav.querySelector('.eqx-nav-close');
    var label = nav.querySelector('.eqx-nav-toggle-label');
    if (!ov || !toggle) return;
    var defaultBg = '#191713';
    function setOpen(open) {
      if (open) ov.hidden = false;
      requestAnimationFrame(function () {
        ov.classList.toggle('open', open);
        document.body.classList.toggle('eqx-menu-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (label) label.textContent = open ? 'CLOSE' : 'MENU';
        if (!open) setTimeout(function () { if (!ov.classList.contains('open')) ov.hidden = true; }, 600);
      });
    }
    toggle.addEventListener('click', function () { setOpen(!ov.classList.contains('open')); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov.classList.contains('open')) setOpen(false); });
    ov.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    ov.querySelectorAll('[data-ovbg]').forEach(function (a) {
      a.addEventListener('mouseenter', function () { ov.style.background = a.getAttribute('data-ovbg'); });
      a.addEventListener('mouseleave', function () { ov.style.background = defaultBg; });
    });
    var active = document.body.getAttribute('data-nav-active');
    if (active) {
      var link = ov.querySelector('.eqx-nav-main a[data-key="' + active + '"]');
      if (link) link.classList.add('active');
    }
  });
})();
