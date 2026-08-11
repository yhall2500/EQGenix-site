/* Contact page — FAQ accordion */
(function () {
  'use strict';
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    document.querySelectorAll('.ct-faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.ct-faq-q').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          var a = document.getElementById(b.getAttribute('aria-controls'));
          if (a) a.hidden = true;
          var m = b.querySelector('.ct-faq-mark');
          if (m) m.textContent = '+';
        });
        if (!open) {
          btn.setAttribute('aria-expanded', 'true');
          var ans = document.getElementById(btn.getAttribute('aria-controls'));
          if (ans) ans.hidden = false;
          var mark = btn.querySelector('.ct-faq-mark');
          if (mark) mark.textContent = '\u2212';
        }
      });
    });
  });
})();
