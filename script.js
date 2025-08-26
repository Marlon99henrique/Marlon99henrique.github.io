


// ===============================
//  Sobre mim - Animações e Contador
// ===============================

// Função de easing com overshoot (inspirada no backOut)
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// Função para animar todos os contadores juntos com overshoot
function animarContadoresOvershoot(elementos, duracao = 2000, overshootFactor = 1.08) {
  const valoresFinais = Array.from(elementos).map(el => {
    const alvo = el.getAttribute('data-target');
    return isNaN(alvo) ? alvo : +alvo; // mantém símbolos como "∞"
  });

  const inicio = performance.now();

  function atualizar(tempoAtual) {
    const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
    const eased = easeOutBack(progresso);

    elementos.forEach((el, i) => {
      if (typeof valoresFinais[i] === 'number') {
        let valor = Math.floor(valoresFinais[i] * eased * overshootFactor);
        if (progresso >= 1) valor = valoresFinais[i]; // garante valor final
        el.textContent = valor;
      } else {
        el.textContent = valoresFinais[i]; // para símbolos como "∞"
      }
    });

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    }
  }

  requestAnimationFrame(atualizar);
}

// Função para observar elementos e adicionar a classe .visible
function observarElemento(seletor, callbackExtra = null, threshold = 0.3) {
  const elemento = document.querySelector(seletor);
  if (!elemento) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        elemento.classList.add('visible');
        if (typeof callbackExtra === 'function') {
          callbackExtra(elemento);
        }
        obs.unobserve(elemento); // só executa uma vez
      }
    });
  }, { threshold });

  observer.observe(elemento);
}

// Observa a seção de texto "Sobre"
observarElemento('.about-text');

// Observa o grid de estatísticas e dispara o contador
observarElemento('.stats-grid', (grid) => {
  const numeros = grid.querySelectorAll('.stat-number');
  animarContadoresOvershoot(numeros, 2000, 1.08);
});











// ===============================
//  CERTIFICAÇÕES - ABAS E CARDS VISÍVEIS AO PASSAR O MOUSE
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

// --- Hover para todas as telas ---
tabs.forEach(tab => {
  tab.addEventListener('mouseenter', () => showTab(tab));
});

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  const activeTab = document.querySelector('.cert-tab.active') || tabs[0];
  if (activeTab) showTab(activeTab);
});



