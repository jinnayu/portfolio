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



// Portrait movement stays local to the About page and supports touch/keyboard.
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('.about-portrait-stage');
  const card = stage?.querySelector('.about-polaroid');
  if (!card) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reset = () => { card.style.transform = ''; card.classList.remove('is-lifted'); };
  stage.addEventListener('pointermove', (event) => {
    if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    card.classList.add('is-lifted');
    card.style.transform = `translate(${x * 8}px, ${y * 6 - 10}px) rotate(${x * 5}deg) scale(1.025)`;
  });
  stage.addEventListener('pointerleave', reset);
  stage.addEventListener('pointercancel', reset);
  card.addEventListener('click', () => {
    if (reduced.matches) return;
    card.style.transform = '';
    card.classList.toggle('is-lifted');
  });
  card.addEventListener('blur', reset);
  reduced.addEventListener('change', reset);
});


// Muted live-photo previews; no click action or expanded viewer.
document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const previews = [];
  document.querySelectorAll('.offclock-live').forEach((wrapper) => {
    const video = wrapper.querySelector('video');
    if (!video) return;
    let active = false;
    let playRequest = 0;
    const stop = () => {
      active = false;
      playRequest += 1;
      video.pause();
      if (video.readyState) video.currentTime = 0;
      wrapper.classList.remove('is-playing');
    };
    const play = async () => {
      if (reduced.matches) return;
      previews.forEach((preview) => { if (preview.wrapper !== wrapper) preview.stop(); });
      active = true;
      const request = ++playRequest;
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      try {
        await video.play();
        if (active && request === playRequest) wrapper.classList.add('is-playing');
        else if (!active) video.pause();
      } catch { if (request === playRequest) stop(); }
    };
    wrapper.addEventListener('pointerenter', () => { if (fine.matches) play(); });
    wrapper.addEventListener('pointerleave', stop);
    wrapper.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') play();
    });
    wrapper.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'touch') stop();
    });
    wrapper.addEventListener('pointercancel', stop);
    wrapper.addEventListener('contextmenu', (event) => event.preventDefault());
    video.addEventListener('error', stop);
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) stop();
    });
    observer.observe(wrapper);
    previews.push({wrapper, stop});
  });
  const stopAll = () => previews.forEach((preview) => preview.stop());
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
  window.addEventListener('pagehide', stopAll);
  reduced.addEventListener('change', stopAll);
  fine.addEventListener('change', stopAll);
});
