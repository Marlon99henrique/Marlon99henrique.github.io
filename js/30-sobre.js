/* =============================================
   30-SOBRE — Reveal + Contadores (corrigido)
================================================ */
(() => {
  const { qsa, observeOnce, prefersReducedMotion } = window.$app;

  // Revela o bloco de texto e a GRID (precisa estar no container!)
  observeOnce('#sobre .about-text, #sobre .stats-grid');

  const grid = document.querySelector('#sobre .stats-grid');
  if (!grid) return;

  const numbers = qsa('.stat-number', grid);

  // Lê o alvo do contador; aceita "∞" como literal
  const parseTarget = (el) => {
    const raw = (el.getAttribute('data-target') || '').trim();
    if (raw === '' || raw === '∞') return raw || el.textContent.trim();
    const n = Number(raw.replace(',', '.'));
    return Number.isFinite(n) ? n : el.textContent.trim();
  };

  const targets = numbers.map(parseTarget);

  // Ease bonitinho
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounters = () => {
    if (prefersReducedMotion) {
      numbers.forEach((el, i) => el.textContent = targets[i]);
      return;
    }

    const start = performance.now();
    const dur = 1200;

    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = easeOut(p);

      numbers.forEach((el, i) => {
        const tgt = targets[i];
        if (typeof tgt === 'number') {
          el.textContent = Math.floor(tgt * e);
        } else {
          el.textContent = tgt; // "∞" ou texto
        }
      });

      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // Dispara UMA vez quando a grid entrar na viewport
  const once = new IntersectionObserver((entries, obs) => {
    if (entries.some(e => e.isIntersecting)) {
      grid.classList.add('visible');  // importante p/ CSS: .stats-grid.visible .stat-card { ... }
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.25 });

  once.observe(grid);
})();
