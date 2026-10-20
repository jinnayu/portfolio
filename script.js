document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const glassTrigger = document.body.classList.contains('home-page')
    ? document.getElementById('work')
    : document.body.classList.contains('case-page')
      ? document.querySelector('.case-overlap, .case-layout')
      : document.querySelector('.about-content');
  const updateNavGlass = () => {
    if (!nav || !glassTrigger) return;
    document.body.classList.toggle('nav-content-reached',
      glassTrigger.getBoundingClientRect().top <= nav.getBoundingClientRect().bottom);
  };
  updateNavGlass();
  window.addEventListener('scroll', updateNavGlass, { passive: true });
  window.addEventListener('resize', updateNavGlass);
  window.addEventListener('pageshow', updateNavGlass);

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));

  const tocLinks = [...document.querySelectorAll('.case-toc a[href^="#"]')];
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });
    sections.forEach((section) => tocObserver.observe(section));
  }

  const artboards = document.querySelectorAll('.work-artboard');
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      artboards.forEach((artboard, index) => {
        const speed = 0.012 + index * 0.002;
        artboard.style.transform = `translateY(${y * speed}px) rotate(${index % 2 ? -3 : 4}deg)`;
      });
    }, { passive: true });
  }
});
