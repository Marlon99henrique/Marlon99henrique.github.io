/* =============================================
   20-HOME — Typewriter (opcional, ignora se não tiver alvo)
================================================ */
(() => {
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  const lines = [
    'Cientista de Dados em formação',
    'Python • Pandas • SQL',
    'Machine Learning e Análise de Dados'
  ];
  let i=0, j=0, dir=1;
  const tick = () => {
    el.textContent = lines[i].slice(0, j);
    j += dir;
    if (j > lines[i].length + 6) dir = -1;
    if (j < 0) { dir = 1; i = (i+1) % lines.length; }
    setTimeout(tick, 60);
  };
  tick();
})();
