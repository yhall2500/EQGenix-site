/* EWD-1(tm) Public Diagnostic — vanilla implementation */
(function () {
  'use strict';
  var PILLARS = [
    { key:'CS', rn:'I', name:'Cognitive Sovereignty\u2122',
      strongest:'Independent judgment is your anchor holding. You evaluate on merits and can defend your reasoning \u2014 keep investing it where the pressure to conform is highest.',
      weakest:'Start with one decision this week made fully on the merits: gather the evidence, write your reasoning down, and hold the position for 48 hours before consulting the room.',
      items:[
        { id:'CS1', text:'I form my own view before checking what others think.' },
        { id:'CS2', text:'I can explain the reasoning behind my important decisions.' },
        { id:'CS3', text:'I change my position when I sense the room disagrees, even when my evidence has not changed.', reverse:true },
        { id:'CS4', text:'I evaluate information on its merits rather than on its source\u2019s popularity.' },
        { id:'CS5', text:'I make significant decisions without needing repeated reassurance.' } ] },
    { key:'ER', rn:'II', name:'Emotional Regulation\u2122',
      strongest:'You treat emotions as data, not disruptions \u2014 naming states and choosing responses under provocation. That precision is a compounding asset.',
      weakest:'Begin with naming: three times a day, pause and name the state you are in before acting on it. Regulation starts with accurate identification, not suppression.',
      items:[
        { id:'ER1', text:'I can name what I am feeling while I am feeling it.' },
        { id:'ER2', text:'Under provocation, I choose my response rather than react.' },
        { id:'ER3', text:'Small frustrations stay with me long after the moment has passed.', reverse:true },
        { id:'ER4', text:'I can stay present in uncomfortable conversations without shutting down.' },
        { id:'ER5', text:'I use emotions as information rather than letting them set the agenda.' } ] },
    { key:'RA', rn:'III', name:'Resilience Architecture\u2122',
      strongest:'Your recovery is engineered, not accidental \u2014 deliberate protocols, durable routines, progressive loading. That architecture holds under sustained uncertainty.',
      weakest:'Build one recovery protocol: a fixed, repeatable sequence you run after setbacks \u2014 same time, same steps. Resilience is architecture, not attitude.',
      items:[
        { id:'RA1', text:'After a setback, I have a deliberate way of recovering.' },
        { id:'RA2', text:'I maintain routines that restore me, even in demanding seasons.' },
        { id:'RA3', text:'When something fails, it takes me a long time to re-engage.', reverse:true },
        { id:'RA4', text:'I adapt my plans under sustained uncertainty without losing momentum.' },
        { id:'RA5', text:'I take on challenges slightly beyond my comfort to build tolerance.' } ] },
    { key:'RI', rn:'IV', name:'Relational Intelligence\u2122',
      strongest:'Trust mechanics, repair, and influence without manipulation \u2014 your relational capacity is the compound interest in this portfolio. Keep depositing.',
      weakest:'Start with repair: one conversation you have been avoiding, opened this week. Connection without sacrificing sovereignty is a trainable skill, and repair is its first rep.',
      items:[
        { id:'RI1', text:'I repair relationships quickly after conflict.' },
        { id:'RI2', text:'I can hold my position without damaging the relationship.' },
        { id:'RI3', text:'I avoid hard conversations, even when they matter.', reverse:true },
        { id:'RI4', text:'People confide in me because I listen without taking over.' },
        { id:'RI5', text:'I maintain connection without losing my own boundaries.' } ] },
    { key:'ET', rn:'V', name:'Effort Tolerance\u2122',
      strongest:'You sustain disciplined action after motivation expires \u2014 the pillar that makes all the others operational. It is the differentiator between those who start and those who build.',
      weakest:'Pick one unfinished thing and schedule it \u2014 not when inspired, but on the calendar. Effort tolerance is built by doing hard things on purpose, on schedule.',
      items:[
        { id:'ET1', text:'I keep working on hard tasks after the initial motivation fades.' },
        { id:'ET2', text:'I finish what I start, even when it stops being interesting.' },
        { id:'ET3', text:'I abandon difficult work when a more exciting option appears.', reverse:true },
        { id:'ET4', text:'I can tolerate boredom and friction in service of a goal.' },
        { id:'ET5', text:'I do hard things on purpose, on a schedule \u2014 not only when inspired.' } ] }
  ];
  var ITEMS = [];
  PILLARS.forEach(function (p) { p.items.forEach(function (it) { ITEMS.push({ id: it.id, text: it.text, reverse: !!it.reverse, pillar: p }); }); });
  var state = { screen:'cover', idx:0, responses:{} };
  var KEY = 'ewd1-progress';
  function save() {
    try {
      if (state.screen === 'result') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function restore() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.screen && s.screen !== 'result' && s.screen !== 'cover' && Object.keys(s.responses || {}).length) {
        state = { screen: s.screen, idx: Math.min(s.idx || 0, 24), responses: s.responses || {} };
      }
    } catch (e) {}
  }
  function $(id) { return document.getElementById(id); }
  function band(p) {
    if (p >= 85) return { tier:'Fortified', sub:'Surplus Position', sig:'surplus' };
    if (p >= 70) return { tier:'Funded', sub:'Capacity Exceeds Load', sig:'accrual' };
    if (p >= 55) return { tier:'Building', sub:'Deposits Underway', sig:'accrual' };
    if (p >= 40) return { tier:'Exposed', sub:'Thin Margin', sig:'accrual' };
    return { tier:'Overdrawn', sub:'Withdrawals Exceed Deposits', sig:'deficit' };
  }
  function sigColor(s) { return s === 'surplus' ? '#C09B62' : s === 'deficit' ? '#D98A7E' : '#B7AF9E'; }
  function score(item, r) { return item.reverse ? 6 - r : r; }
  function pillarPct(p) {
    var sum = 0, n = 0;
    p.items.forEach(function (it) { var r = state.responses[it.id]; if (r) { sum += (it.reverse ? 6 - r : r); n++; } });
    return n === 5 ? Math.round(((sum - 5) / 20) * 100) : null;
  }
  function showScreen(name) {
    state.screen = name;
    ['cover','assess','gate','result'].forEach(function (s) {
      var el = $('ewd-' + (s === 'cover' ? 'cover' : s));
      if (el) el.hidden = s !== name;
    });
    window.scrollTo(0, 0);
    save();
  }
  function renderAssess() {
    var item = ITEMS[state.idx];
    var answered = Object.keys(state.responses).length;
    $('ewd-q').textContent = item.text;
    $('ewd-pillar').textContent = item.pillar.name;
    $('ewd-roman').textContent = item.pillar.rn;
    $('ewd-counter').textContent = String(state.idx + 1).padStart(2, '0') + ' / 25';
    $('ewd-progress').style.width = Math.round((answered / 25) * 100) + '%';
    var resp = state.responses[item.id];
    document.querySelectorAll('.ewd-opt').forEach(function (b) {
      var on = Number(b.getAttribute('data-val')) === resp;
      b.classList.toggle('pressed', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $('ewd-back').style.visibility = state.idx > 0 ? 'visible' : 'hidden';
    $('ewd-next').style.visibility = resp ? 'visible' : 'hidden';
    $('ewd-next-label').textContent = state.idx === 24 ? 'View My Position' : 'Next';
    $('ewd-next').style.color = (state.idx === 24 && answered === 25) ? '#C09B62' : '#8A8171';
    var dots = document.querySelectorAll('.ewd-dot');
    PILLARS.forEach(function (p, i) {
      var full = pillarPct(p) !== null;
      var active = item.pillar.key === p.key;
      if (dots[i]) {
        dots[i].style.width = active ? '28px' : '14px';
        dots[i].style.background = full ? '#C09B62' : active ? '#8A8171' : '#33301F';
      }
    });
  }
  function advance() {
    if (state.idx < 24) { state.idx++; renderAssess(); save(); }
    else if (Object.keys(state.responses).length === 25) showScreen('gate');
  }
  function pick(v) {
    var item = ITEMS[state.idx];
    state.responses[item.id] = v;
    renderAssess();
    save();
    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(advance, rm ? 0 : 260);
  }
  function renderResult() {
    var stats = PILLARS.map(function (p) { return { p: p, pct: pillarPct(p) || 0 }; });
    var total = Math.round(stats.reduce(function (a, s) { return a + s.pct; }, 0) / 5);
    var tb = band(total);
    $('ewd-total').textContent = String(total);
    $('ewd-tier').textContent = tb.tier;
    var sub = $('ewd-tier-sub');
    sub.textContent = tb.sub;
    sub.style.color = sigColor(tb.sig);
    document.querySelectorAll('.ewd-row').forEach(function (row, i) {
      var s = stats[i], b = band(s.pct);
      row.querySelector('.ewd-row-tier').textContent = b.tier;
      row.querySelector('.ewd-row-tier').style.color = sigColor(b.sig);
      row.querySelector('.ewd-row-bar').style.width = s.pct + '%';
      row.querySelector('.ewd-row-bar').style.background = b.sig === 'deficit' ? '#B0564A' : '#C09B62';
      row.querySelector('.ewd-row-pct').textContent = s.pct + '%';
    });
    var sorted = stats.slice().sort(function (a, b) { return a.pct - b.pct; });
    $('ewd-weak').textContent = sorted[0].p.weakest;
    $('ewd-strong').textContent = sorted[sorted.length - 1].p.strongest;
    var ref = $('ewd-referral');
    if (ref) ref.hidden = !(total < 40 || sorted[0].pct < 30);
    showScreen('result');
  }
  function sendLead() {
    var name = ($('ewd-name') || {}).value || '';
    var email = ($('ewd-email') || {}).value || '';
    if (name.trim() || email.trim()) {
      var body = new URLSearchParams({ 'form-name':'ewd-lead', name: name, email: email, instrument:'EWD-1 Public Diagnostic v1.0', responses: JSON.stringify(state.responses) }).toString();
      fetch('/', { method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body: body }).catch(function () {});
    }
    renderResult();
  }
  function boot() {
    if (!$('ewd-cover')) return;
    restore();
    if (state.screen === 'assess') { showScreen('assess'); renderAssess(); }
    else if (state.screen === 'gate') showScreen('gate');
    $('ewd-start').addEventListener('click', function () { state.idx = 0; showScreen('assess'); renderAssess(); });
    document.querySelectorAll('.ewd-opt').forEach(function (b) {
      b.addEventListener('click', function () { pick(Number(b.getAttribute('data-val'))); });
    });
    $('ewd-back').addEventListener('click', function () { if (state.idx > 0) { state.idx--; renderAssess(); save(); } });
    $('ewd-next').addEventListener('click', function () { if (state.responses[ITEMS[state.idx].id]) advance(); });
    $('ewd-send').addEventListener('click', sendLead);
    $('ewd-skip').addEventListener('click', renderResult);
    $('ewd-restart').addEventListener('click', function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      state = { screen:'cover', idx:0, responses:{} };
      showScreen('cover');
    });
    document.addEventListener('keydown', function (e) {
      if (state.screen !== 'assess') return;
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key >= '1' && e.key <= '5') pick(Number(e.key));
      else if (e.key === 'ArrowLeft' && state.idx > 0) { state.idx--; renderAssess(); save(); }
      else if (e.key === 'ArrowRight' || e.key === 'Enter') { if (state.responses[ITEMS[state.idx].id]) advance(); }
    });
  }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
