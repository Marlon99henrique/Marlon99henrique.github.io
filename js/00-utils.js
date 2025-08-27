/* =============================================
   00-UTILS — Helpers globais + IntersectionObserver
================================================ */
(() => {
  const qs  = (sel, scope=document) => scope.querySelector(sel);
  const qsa = (sel, scope=document) => Array.from(scope.querySelectorAll(sel));
  const on  = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  // Travar/destravar scroll ao abrir modais
  const lockScroll = (on) => { document.documentElement.style.overflow = on ? 'hidden' : ''; };

  // Observer “uma vez” para trocar .visible
  const observeOnce = (selector, options={threshold: 0.2}) => {
    const els = qsa(selector);
    if (!els.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, options);
    els.forEach(el => io.observe(el));
  };

  // Expor
  window.$app = { qs, qsa, on, lockScroll, observeOnce, prefersReducedMotion, isCoarsePointer };
})();
