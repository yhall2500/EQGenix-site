/* EQGenix motion engine v2 — reveals, word-stagger, parallax, scroll-linked background blending. Respects prefers-reduced-motion. */
(function () {
  if (window.__eqfx) return; window.__eqfx = true;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(0.22,1,0.36,1)';
  var setups = {
    rise:  function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; },
    fade:  function (el) { el.style.opacity = '0'; },
    left:  function (el) { el.style.opacity = '0'; el.style.transform = 'translateX(-30px)'; },
    right: function (el) { el.style.opacity = '0'; el.style.transform = 'translateX(30px)'; },
    scale: function (el) { el.style.opacity = '0'; el.style.transform = 'scale(1.05)'; },
    mask:  function (el) { el.style.clipPath = 'inset(100% 0 0 0)'; },
    wipe:  function (el) { el.style.clipPath = 'inset(0 100% 0 0)'; },
    line:  function (el) { el.style.transform = 'scaleX(0)'; el.style.transformOrigin = 'left center'; },
    words: function (el) {
      if (!el.__spans) {
        var words = (el.textContent || '').split(/\s+/).filter(Boolean);
        el.textContent = '';
        el.__spans = words.map(function (w, i) {
          var s = document.createElement('span');
          s.style.display = 'inline-block';
          s.textContent = w;
          el.appendChild(s);
          if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
          return s;
        });
      }
      el.__spans.forEach(function (s) { s.style.opacity = '0'; s.style.transform = 'translateY(0.55em)'; });
    }
  };
  function show(el) {
    if (el.__spans) { el.__spans.forEach(function (s) { s.style.opacity = '1'; s.style.transform = 'none'; }); return; }
    el.style.opacity = '1'; el.style.transform = 'none';
    var t = el.getAttribute('data-reveal');
    if (t === 'mask' || t === 'wipe') {
      el.style.clipPath = 'inset(0 0 0 0)';
      var ms = parseFloat(el.getAttribute('data-dur') || '1') * 1000 + parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(function () { el.style.clipPath = 'none'; }, ms + 120);
    } else {
      el.style.clipPath = 'none';
    }
  }
  function reveal(el) {
    var d = parseInt(el.getAttribute('data-delay') || '0', 10);
    var dur = el.getAttribute('data-dur') || '1s';
    if (el.__spans) {
      el.__spans.forEach(function (s, i) {
        s.style.transition = 'opacity ' + dur + ' ' + EASE + ' ' + (d + i * 70) + 'ms, transform ' + dur + ' ' + EASE + ' ' + (d + i * 70) + 'ms';
      });
    } else {
      el.style.transition = 'opacity ' + dur + ' ' + EASE + ' ' + d + 'ms, transform ' + dur + ' ' + EASE + ' ' + d + 'ms, clip-path ' + dur + ' ' + EASE + ' ' + d + 'ms';
    }
    void el.getBoundingClientRect();
    var done = false;
    var fire = function () { if (done) return; done = true; show(el); };
    requestAnimationFrame(function () { requestAnimationFrame(fire); });
    setTimeout(fire, 60);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  function scan(root) {
    var els = root.querySelectorAll('[data-reveal]:not([data-fx])');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.setAttribute('data-fx', '1');
      if (rm) continue;
      (setups[el.getAttribute('data-reveal')] || setups.rise)(el);
      io.observe(el);
    }
  }
  /* parallax — data-plx="0.12" drifts the element as it crosses the viewport */
  var plxEls = [];
  function scanPlx(root) {
    var els = root.querySelectorAll('[data-plx]:not([data-plxed])');
    for (var i = 0; i < els.length; i++) { els[i].setAttribute('data-plxed', '1'); plxEls.push(els[i]); }
  }
  function plx() {
    if (rm) return;
    var vh = innerHeight;
    for (var i = 0; i < plxEls.length; i++) {
      var el = plxEls[i], r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) continue;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = 'translateY(' + (p * parseFloat(el.getAttribute('data-plx')) * -100).toFixed(2) + 'px)';
    }
  }
  /* background blend — [data-bgroot] container lerps between [data-bg] section colors on scroll */
  function hx(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function mix(a, b, t) {
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' + Math.round(a[2] + (b[2] - a[2]) * t) + ')';
  }
  function bgblend() {
    var root = document.querySelector('[data-bgroot]');
    if (!root) return;
    var secs = document.querySelectorAll('[data-bg]');
    if (!secs.length) return;
    var vh = innerHeight;
    var run = hx(secs[0].getAttribute('data-bg'));
    for (var i = 1; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.top > vh * 0.6) break;
      var t = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / (vh * 0.42)));
      t = t * t * (3 - 2 * t);
      var c = hx(secs[i].getAttribute('data-bg'));
      run = [run[0] + (c[0] - run[0]) * t, run[1] + (c[1] - run[1]) * t, run[2] + (c[2] - run[2]) * t];
    }
    root.style.background = mix(run, run, 0);
  }
  var ticking = false, lastFx = 0;
  function runFx() { plx(); bgblend(); sweep(); }
  function onScroll() {
    /* run synchronously with a cheap throttle — rAF can stall in throttled/hidden contexts */
    var now = Date.now();
    if (now - lastFx > 40) { lastFx = now; runFx(); }
    else if (!ticking) { ticking = true; setTimeout(function () { ticking = false; lastFx = Date.now(); runFx(); }, 60); }
  }
  function hidden(el) {
    if (el.__spans) return el.__spans[0] && el.__spans[0].style.opacity === '0';
    return el.style.opacity === '0' || (el.style.clipPath && el.style.clipPath.indexOf('100%') !== -1) || (el.style.transform && el.style.transform !== 'none' && el.style.transform !== '');
  }
  var last = 0;
  function sweep() {
    var now = Date.now();
    if (now - last < 200) return;
    last = now;
    var els = document.querySelectorAll('[data-reveal][data-fx]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!hidden(el)) continue;
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > -40) { io.unobserve(el); reveal(el); }
    }
  }
  function boot() {
    scan(document.body); scanPlx(document.body); bgblend();
    new MutationObserver(function () { scan(document.body); scanPlx(document.body); }).observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { sweep(); bgblend(); }, 1200);
    setTimeout(sweep, 3000);
    setInterval(bgblend, 600); // safety net for contexts where scroll/rAF are throttled
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    document.addEventListener('visibilitychange', sweep);
  }
  if (document.body) boot(); else addEventListener('DOMContentLoaded', boot);
})();
