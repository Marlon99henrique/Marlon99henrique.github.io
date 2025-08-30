/******************************************************************
 * ================================================================
 * SCRIPT: LÓGICA DA SEÇÃO DE PROJETOS (30-projects.js)
 * ================================================================
 * Descrição: Controla a funcionalidade dos botões de filtro
 * (chips), a barra de busca (ignorando acentos) e a 
 * interatividade dos cards em dispositivos de toque.
 ******************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const projectsSection = document.querySelector('#projetos');
  
  if (!projectsSection) {
    return;
  }

  // --- LÓGICA 1: SISTEMA DE FILTROS ---
  const filterButtons = projectsSection.querySelectorAll('.chip');
  const projectCards = projectsSection.querySelectorAll('.projects__grid .card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      projectCards.forEach(card => {
        const cardTags = card.dataset.tags || '';
        const shouldShow = filterValue === 'all' || cardTags.includes(filterValue);
        
        card.style.display = shouldShow ? 'flex' : 'none';
      });
    });
  });

// --- LÓGICA 2: BARRA DE BUSCA (COM REMOÇÃO DE ACENTOS) ---
function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const searchInput = document.querySelector('#projectSearchInput');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const searchTerm = normalizeText(searchInput.value.trim());

    projectCards.forEach(card => {
      const title = normalizeText(card.querySelector('.card__title')?.textContent);
      const tags = normalizeText(card.dataset.tags);

      // Agora só busca em título e tecnologias
      const cardText = `${title} ${tags}`;

      card.style.display = cardText.includes(searchTerm) ? 'flex' : 'none';
    });
  });
}


  // --- LÓGICA 3: INTERATIVIDADE DOS CARDS EM TELAS DE TOQUE ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    projectCards.forEach(card => {
      card.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          return;
        }
        event.preventDefault();

        const isAlreadyTouched = card.classList.contains('is-touched');
        projectCards.forEach(c => c.classList.remove('is-touched'));
        
        if (!isAlreadyTouched) {
          card.classList.add('is-touched');
        }
      });
    });
  }
});