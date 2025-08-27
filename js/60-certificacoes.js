/* =============================================
   60-CERTIFICAÇÕES — Tabs
================================================ */
(() => {
  const tabs = Array.from(document.querySelectorAll('.cert-tab'));
  const contents = Array.from(document.querySelectorAll('.cert-content'));
  if (!tabs.length) return;

  const activate = (id) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    contents.forEach(c => c.classList.toggle('active', c.id === id));
  };

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
})();
