document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navInquiry = document.querySelector('.nav-inquiry');

  function syncScrollState() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }

  function ensureMobileInquiryLink() {
    if (!navLinks || !navInquiry) return;
    if (navLinks.querySelector('.mobile-only-inquiry')) return;

    const li = document.createElement('li');
    li.className = 'mobile-only-inquiry';

    const a = document.createElement('a');
    a.href = navInquiry.getAttribute('href') || 'contact.html';
    a.textContent = navInquiry.textContent.trim() || 'Inquire';

    if (navInquiry.classList.contains('active')) {
      a.classList.add('active');
    }

    li.appendChild(a);
    navLinks.appendChild(li);
  }

  function openMenu() {
    if (!mobileToggle || !navLinks) return;
    ensureMobileInquiryLink();
    navLinks.classList.add('open');
    mobileToggle.classList.add('is-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileToggle || !navLinks) return;
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle && navLinks) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Toggle navigation');

    mobileToggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.tagName === 'A') {
        closeMenu();
      }
    });

    document.addEventListener('click', function (event) {
      if (!navLinks.classList.contains('open')) return;
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = mobileToggle.contains(event.target);
      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  syncScrollState();
  window.addEventListener('scroll', syncScrollState, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }
});
