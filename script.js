// ===============================
//  CERTIFICAÇÕES - ABAS E CARDS VISÍVEIS AO CLICAR
// ===============================
const tabs = document.querySelectorAll('.cert-tab');
const contents = document.querySelectorAll('.cert-content');

// Função para mostrar apenas o conteúdo da aba
function showTab(tabEl) {
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  tabEl.classList.add('active');
  const target = document.getElementById(tabEl.dataset.tab);
  if (target) target.classList.add('active');
}

// --- Clique para todas as telas ---
tabs.forEach(tab => {
  tab.addEventListener('click', () => showTab(tab));
});

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  const activeTab = document.querySelector('.cert-tab.active') || tabs[0];
  if (activeTab) showTab(activeTab);
});
