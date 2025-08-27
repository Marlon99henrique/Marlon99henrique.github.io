/* =============================================
   90-BOOT — Observadores genéricos de reveal
================================================ */
(() => {
  const {observeOnce} = window.$app;
  // Tudo que deve “entrar” suavemente
  observeOnce('.animate-on-scroll, .revealable, .project-card, .skill-category, .certificacoes-container');
})();
