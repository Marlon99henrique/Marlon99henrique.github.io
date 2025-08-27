/* =============================================
   01-THEME — Alternância de tema (dark/light)
================================================ */
(() => {
  const {qs, on} = window.$app;

  const apply = (mode) => {
    document.body.classList.toggle('dark-mode', mode === 'dark');
    localStorage.setItem('theme', mode);
    const iconDesktop = qs('#theme-toggle i');
    const iconMobile  = qs('#theme-toggle-mobile i');
    [iconDesktop, iconMobile].forEach(ic => ic && (ic.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon'));
  };

  const current = localStorage.getItem('theme') || 'dark';
  apply(current);

  const toggle = () => apply(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
  on(qs('#theme-toggle'), 'click', toggle);
  on(qs('#theme-toggle-mobile'), 'click', toggle);
})();
