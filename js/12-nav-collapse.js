/******************************************************************
 * SCRIPT: NAVEGAÇÃO RESPONSIVA E DINÂMICA (12-nav-collapse.js)
 ******************************************************************/
(function () {
  const shell   = document.querySelector('.nav-shell');
  const brand   = document.querySelector('.brand');
  const menu    = document.getElementById('navMenu');
  const list    = document.querySelector('.nav__list');
  const actions = document.querySelector('.nav__actions');
  const toggle  = document.getElementById('navToggle');

  // Se algum elemento essencial não for encontrado, o script para.
  if (!shell || !brand || !menu || !list || !actions || !toggle) return;

  // Garante que o menu comece fechado.
  menu.dataset.open = 'false';
  toggle.setAttribute('aria-expanded', 'false');

  // Funções para controlar o estado do menu.
  const closeMenu = () => {
    menu.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open'); // Usa a classe para o CSS
  };
  const openMenu = () => {
    menu.dataset.open = 'true';
    toggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open'); // Usa a classe para o CSS
  };

  // 1. Alterna o menu ao clicar no botão hambúrguer.
  toggle.addEventListener('click', () => {
    const isOpen = menu.dataset.open === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // 2. [MELHORIA ADICIONADA] Fecha o menu ao clicar em um dos links.
  const navLinks = menu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu.dataset.open === 'true') {
        closeMenu();
      }
    });
  });

  // 3. Fecha o menu ao clicar fora dele.
  document.addEventListener('click', (e) => {
    if (!shell.classList.contains('is-collapsed')) return;
    if (menu.dataset.open !== 'true') return;
    const inside = shell.contains(e.target);
    if (!inside) closeMenu();
  });

  // 4. Fecha o menu com a tecla 'Escape'.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 5. Mede o espaço e decide se o menu deve ser colapsado.
  const measure = () => {
    const shellInnerWidth = shell.clientWidth - parseFloat(getComputedStyle(shell).paddingLeft) - parseFloat(getComputedStyle(shell).paddingRight);
    const totalContentWidth = brand.getBoundingClientRect().width + list.getBoundingClientRect().width + actions.getBoundingClientRect().width + 32; // 32px de margem de segurança

    if (totalContentWidth > shellInnerWidth) {
      if (!shell.classList.contains('is-collapsed')) {
        shell.classList.add('is-collapsed');
        closeMenu();
      }
    } else {
      if (shell.classList.contains('is-collapsed')) {
        shell.classList.remove('is-collapsed');
        closeMenu();
      }
    }
  };

  // Observa a janela e o conteúdo para re-medir quando houver mudanças.
  const ro = new ResizeObserver(measure);
  ro.observe(shell);
  window.addEventListener('resize', measure);
  requestAnimationFrame(measure);
})();