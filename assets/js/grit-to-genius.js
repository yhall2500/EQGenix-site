// G2G age bands — ruled. Source of truth for band structure; render from here, never hardcode in markup.
window.G2G_BANDS = [
  { id: "A", label: "10\u201312", min: 10, max: 12, seats: 12 },
  { id: "B", label: "13\u201315", min: 13, max: 15, seats: 12 },
  { id: "C", label: "16\u201317", min: 16, max: 17, seats: 12 }
];
window.G2G_TOTAL_SEATS = window.G2G_BANDS.reduce(function(n,b){ return n + b.seats; }, 0);
// cohortStartDate: nullable. null renders the season only; a confirmed date converts the line to enrollment in one commit.
window.G2G_COHORT = { season: "Fall 2026", cohortStartDate: null };
document.addEventListener("DOMContentLoaded", function(){
  var el = document.getElementById("g2g-bands");
  if (el) el.textContent = window.G2G_BANDS.map(function(b){ return b.label; }).join(" \u00b7 ");
  var cl = document.getElementById("g2g-cohort-line");
  if (cl) cl.textContent = window.G2G_COHORT.cohortStartDate
    ? "Founding cohort begins " + window.G2G_COHORT.cohortStartDate + ". Enrollment is open."
    : "Founding cohort begins " + window.G2G_COHORT.season + ". Pre-registration is open.";
});
/* Grit to Genius — week arc scroll sync */
(function () {
  'use strict';
  var rows = [], num, focus, counter, cur = -1;
  function pad(n) { return (n < 9 ? '0' : '') + (n + 1); }
  function update() {
    if (!rows.length) return;
    var mid = window.innerHeight / 2, best = 0, bd = Infinity;
    rows.forEach(function (r, i) {
      var rect = r.getBoundingClientRect();
      var d = Math.abs((rect.top + rect.bottom) / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    });
    if (best === cur) return;
    cur = best;
    rows.forEach(function (r, i) { r.style.opacity = i === best ? '1' : '0.45'; });
    var h3 = rows[best].querySelector('h3');
    if (num) num.textContent = pad(best);
    if (focus && h3) focus.textContent = h3.textContent;
    if (counter) counter.textContent = pad(best) + ' / 06';
  }
  function boot() {
    rows = Array.prototype.slice.call(document.querySelectorAll('[data-week]'));
    num = document.getElementById('g2g-week-num');
    focus = document.getElementById('g2g-week-focus');
    counter = document.getElementById('g2g-week-counter');
    if (!rows.length) return;
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();