/******************************************************************
 * ================================================================
 * SCRIPT: LÓGICA DA SEÇÃO DE CERTIFICAÇÕES (40-certs.js)
 * ================================================================
 * Descrição: Controla a funcionalidade dos botões de filtro
 * e a interatividade dos cards em dispositivos de toque.
 ******************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const certsSection = document.querySelector('#certificados');
  
  // Se a seção de certificados não existir na página, não faz nada.
  if (!certsSection) {
    return;
  }

  // --- LÓGICA 1: SISTEMA DE FILTROS ---
  const filterButtons = certsSection.querySelectorAll('.chip');
  const filterableCards = certsSection.querySelectorAll('.certs__grid .card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      // 1. Atualiza o botão ativo
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // 2. Filtra os cards
      filterableCards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex'; // Mostra o card
        } else {
          card.style.display = 'none'; // Esconde o card
        }
      });
    });
  });

  // --- LÓGICA 2: INTERATIVIDADE DOS CARDS EM TELAS DE TOQUE ---
  const interactiveCards = certsSection.querySelectorAll('.card[data-category="curso"]');

  // Verifica se é um dispositivo de toque
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    interactiveCards.forEach(card => {
      card.addEventListener('click', (event) => {
        // Se o clique foi em um link dentro do card, deixa o link funcionar normalmente
        if (event.target.closest('a')) {
          return;
        }

        // Se o card já está ativo, remove a classe (para poder fechar)
        if (card.classList.contains('is-touched')) {
          card.classList.remove('is-touched');
        } else {
          // Remove a classe de qualquer outro card que esteja ativo
          interactiveCards.forEach(c => c.classList.remove('is-touched'));
          // Adiciona a classe apenas ao card clicado
          card.classList.add('is-touched');
        }
      });
    });
  }
});