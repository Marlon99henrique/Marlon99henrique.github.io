/* =============================================
   10-HEADER — Menu fixo, hambúrguer, overlay
================================================ */
(() => {
  const {qs, on} = window.$app;
  const btn = qs('.mobile-menu-btn');
  const nav = qs('.mobile-nav');
  const overlay = qs('.overlay');

  const open  = () => { nav.classList.add('active'); overlay.classList.add('active'); nav.setAttribute('aria-hidden','false'); };
  const close = () => { nav.classList.remove('active'); overlay.classList.remove('active'); nav.setAttribute('aria-hidden','true'); };

  on(btn, 'click', () => (nav.classList.contains('active') ? close() : open()));
  on(overlay, 'click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Fechar nav ao clicar nos links
  nav?.querySelectorAll('a.nav-link').forEach(a => on(a, 'click', close));
})();
