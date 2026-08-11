// G2G age bands — ruled: 10\u201312 / 13\u201315 / 16\u201317, 12 seats each, parent/guardian-completed for every band.
var G2G_BANDS = [ { id:"A", label:"10-12", min:10, max:12 }, { id:"B", label:"13-15", min:13, max:15 }, { id:"C", label:"16-17", min:16, max:17 } ];
function g2gBandForAge(age){ age = parseInt(age, 10); if (isNaN(age)) return ""; for (var i=0;i<G2G_BANDS.length;i++){ var b=G2G_BANDS[i]; if (age>=b.min && age<=b.max) return b.label; } return "OUT_OF_RANGE"; }
/* Inquiry — program-aware copy + form routing (?program=) */
(function () {
  'use strict';
  var MAP = {
    shield:  { kicker:'SOVEREIGN SHIELD\u2122 \u00b7 LAW ENFORCEMENT', headline:'Bring Sovereign Shield\u2122 to your agency.', intro:'Tell us about your agency and where you are in the process. We respond with a briefing and, where appropriate, a written proposal for command and city review.', orgLabel:'YOUR AGENCY', orgPh:'Agency / department', rolePh:'Rank / role', specificLabel:'ABOUT THE AGENCY', q1:'Sworn personnel', q1Ph:'e.g. 120', q2:'Interest', q2Ph:'Tier I course, briefing, pilot\u2026' },
    station: { kicker:'SOVEREIGN STATION\u2122 \u00b7 FIRE SERVICE', headline:'Bring Sovereign Station\u2122 to your department.', intro:'Tell us about your department and where you are in the process. We respond with a briefing and, where appropriate, a written proposal for command and city review.', orgLabel:'YOUR DEPARTMENT', orgPh:'Department', rolePh:'Rank / role', specificLabel:'ABOUT THE DEPARTMENT', q1:'Personnel (all ranks)', q1Ph:'e.g. 85', q2:'Shift schedule', q2Ph:'24/48, 48/96\u2026' },
    mrc:     { kicker:'MISSION-READY CIVILIAN\u2122 \u00b7 VETERANS', headline:'Start the MRC conversation.', intro:'For VRCs: request the Provider Packet or an authorization conversation. For Veterans: tell us where you are in the VR&E process and we\u2019ll help you take it to your counselor.', orgLabel:'YOUR CONTEXT', orgPh:'VA regional office / organization', rolePh:'VRC, Veteran, other', specificLabel:'ABOUT THE REQUEST', q1:'Chapter 31 status', q1Ph:'Approved, applying, exploring\u2026', q2:'What do you need?', q2Ph:'Provider Packet, plan language\u2026' },
    g2g:     { kicker:'GRIT TO GENIUS\u2122 \u00b7 YOUTH', headline:'Request a seat \u2014 or a city.', intro:'Twelve seats per age band, then the waitlist begins. Tell us who the seat is for, or inquire about bringing a cohort to your city or school.', orgLabel:'YOUR CONTEXT', orgPh:'Family, school, or organization', rolePh:'Parent, educator, sponsor\u2026', specificLabel:'ABOUT THE SEAT', q1:'Age of participant(s)', q1Ph:'e.g. 13', q2:'City', q2Ph:'e.g. Canyon Lake, CA' },
    sd:      { kicker:'SACRED DEPOSITS\u2122 \u00b7 MARRIAGE', headline:'Bring Sacred Deposits\u2122 to your community.', intro:'For churches, counselors, and group leaders \u2014 tell us about your congregation or practice and how you\u2019d like to use the 5:1 framework.', orgLabel:'YOUR ORGANIZATION', orgPh:'Church / practice / organization', rolePh:'Pastor, counselor, leader\u2026', specificLabel:'ABOUT THE GROUP', q1:'Group size', q1Ph:'e.g. 20 couples', q2:'Format', q2Ph:'Small group, retreat, counseling\u2026' },
    lid:     { kicker:'LIFE IN DARKNESS \u00b7 501(c)(3)', headline:'Partner with Life in Darkness.', intro:'For agencies, funders, and community partners \u2014 tell us how you\u2019d like to support or deliver upstream formation in your community.', orgLabel:'YOUR ORGANIZATION', orgPh:'Organization / agency', rolePh:'Role', specificLabel:'ABOUT THE PARTNERSHIP', q1:'Interest', q1Ph:'Funding, delivery, referral\u2026', q2:'Community', q2Ph:'City / county' },
    consult: { kicker:'EQGENIX \u00b7 CONSULTATION', headline:'Book a consultation.', intro:'A thirty-minute advisory conversation \u2014 your context, your questions, and whether an engagement is the right fit. Tell us a little about yourself and we\u2019ll schedule it.', orgLabel:'YOUR ORGANIZATION', orgPh:'Organization (optional)', rolePh:'Role (optional)', specificLabel:'ABOUT THE CONVERSATION', q1:'What would you like to discuss?', q1Ph:'Program, advisory, partnership\u2026', q2:'Preferred days / times', q2Ph:'e.g. weekday mornings' }
  };
  function txt(id, v) { var el = document.getElementById(id); if (el && v) el.textContent = v; }
  function ph(id, v) { var el = document.getElementById(id); if (el && v) el.placeholder = v; }
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var p = new URLSearchParams(location.search).get('program') || 'general';
    var prog = document.getElementById('inq-program');
    if (prog) prog.value = p;
    var m = MAP[p];
    if (!m) return;
    txt('inq-kicker', m.kicker); txt('inq-headline', m.headline); txt('inq-intro', m.intro);
    txt('inq-org-label', m.orgLabel); ph('inq-org', m.orgPh); ph('inq-role', m.rolePh);
    txt('inq-specific-label', m.specificLabel);
    txt('inq-q1-label', m.q1); ph('inq-q1', m.q1Ph);
    txt('inq-q2-label', m.q2); ph('inq-q2', m.q2Ph);
    if (p === 'mrc') {
      var form = document.getElementById('inq-form');
      var fn = document.getElementById('inq-formname');
      if (form && fn) { fn.value = 'mission-ready-civilian-intake'; form.setAttribute('action', '/mrc-success.html'); }
    }
    if (p === 'g2g') {
      var gForm = document.getElementById('inq-form');
      if (gForm) gForm.setAttribute('action', '/eq-success.html?program=g2g');
    }
  });
})();

// Program-aware confirmation copy: G2G pre-registration promises notification, not a date.
document.addEventListener("DOMContentLoaded", function(){
  var p = (new URLSearchParams(location.search)).get("program");
  var el = document.getElementById("inq-done-body");
  if (p === "g2g" && el) el.textContent = "Your pre-registration for the Fall 2026 founding cohort is in front of the right person. We will notify your family as soon as the cohort schedule is set. If anything is time-sensitive, call 888-824-7244.";
});
