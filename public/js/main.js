document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal-on-scroll: elements are visible by default (safe if JS fails); IntersectionObserver
  // only adds a class that fades them in, and reacts live to layout/font shifts instead of
  // relying on pre-computed pixel positions like ScrollTrigger does.
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    revealTargets.forEach((el) => el.classList.add('reveal-pending'));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          if (target.hasAttribute('data-reveal-stagger')) {
            target.querySelectorAll('[data-reveal-item]').forEach((item, i) => {
              item.style.transitionDelay = `${i * 90}ms`;
            });
          }
          target.classList.remove('reveal-pending');
          target.classList.add('reveal-visible');
          obs.unobserve(target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  // Animated counters (years/projects/area/customers on the homepage stats strip).
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = Number(el.dataset.counter).toLocaleString('vi-VN');
    });
  }

  function animateCounter(el) {
    const target = Number(el.dataset.counter);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('vi-VN');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
});
