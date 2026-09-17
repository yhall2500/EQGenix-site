/* Progressive enhancement: all links, programs, and FAQs work without JavaScript. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    const mobile = window.matchMedia('(max-width: 800px)');
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.innerHTML = `${open ? 'Close' : 'Menu'} <span aria-hidden="true">${open ? '−' : '＋'}</span>`;
      nav.hidden = mobile.matches && !open;
    }
    function syncLayout() {
      toggle.hidden = !mobile.matches;
      setMenu(false);
    }
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
        setMenu(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a') && mobile.matches) setMenu(false);
    });
    mobile.addEventListener('change', syncLayout);
    syncLayout();
  }
  const controls = document.querySelector('.filter-controls');
  if (!controls) return;
  const filters = [...controls.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-audience]')];
  const status = controls.querySelector('.filter-status');
  const valid = new Set(filters.map(button => button.dataset.filter));
  function applyFilter(value, updateUrl) {
    const selected = valid.has(value) ? value : 'all';
    let count = 0;
    cards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.audience !== selected;
      if (!card.hidden) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    const label = filters.find(button => button.dataset.filter === selected).textContent;
    status.textContent = selected === 'all' ? `Showing all ${count} program pathways` : `Showing ${count} ${count === 1 ? 'pathway' : 'pathways'} for ${label.toLowerCase()}`;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (selected === 'all') url.searchParams.delete('audience');
      else url.searchParams.set('audience', selected);
      window.history.pushState({}, '', url);
    }
  }
  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
  window.addEventListener('popstate', () => applyFilter(new URL(window.location.href).searchParams.get('audience'), false));
  applyFilter(new URL(window.location.href).searchParams.get('audience'), false);
  controls.hidden = false;
})();
