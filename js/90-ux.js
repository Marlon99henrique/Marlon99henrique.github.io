/******************************************************************
 * ================================================================
 * SCRIPT: UX GERAL (90-ux.js)
 * ================================================================
 * Descrição: Contém scripts de experiência do usuário que se
 * aplicam a várias partes do site, como:
 * 1. Lógica do botão de Alto Contraste.
 * 2. Animações de scroll.
 * 3. Contadores da seção "Sobre mim".
 ******************************************************************/

document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA 1: BOTÃO DE ALTO CONTRASTE ---
  (function() {
    const contrastBtn = document.getElementById('contrastBtn');
    const htmlElement = document.documentElement; // A tag <html>
    const storageKey = 'contrastMode'; // Chave para salvar no navegador

    // Função que aplica o tema baseado no estado ('high' ou 'normal')
    const applyTheme = (theme) => {
      if (theme === 'high') {
        htmlElement.setAttribute('data-contrast', 'high');
        if (contrastBtn) contrastBtn.setAttribute('aria-pressed', 'true');
      } else {
        htmlElement.removeAttribute('data-contrast');
        if (contrastBtn) contrastBtn.setAttribute('aria-pressed', 'false');
      }
    };

    // Ao carregar a página, verifica se há uma preferência salva
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      applyTheme(savedTheme);
    }

    // Adiciona o evento de clique ao botão
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        const isHighContrast = htmlElement.hasAttribute('data-contrast');

        if (isHighContrast) {
          // Se está LIGADO, desliga
          applyTheme('normal');
          localStorage.removeItem(storageKey);
        } else {
          // Se está DESLIGADO, liga
          applyTheme('high');
          localStorage.setItem(storageKey, 'high');
        }
      });
    }
  })(); // A função se auto-executa


  // --- LÓGICA 2: ANIMAÇÃO DE ENTRADA DAS SEÇÕES AO ROLAR ---
  const animatedSections = document.querySelectorAll('.secao-animada');

  if (animatedSections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
      observer.observe(section);
    });
  }


  // --- LÓGICA 3: ANIMAÇÃO DOS CONTADORES NA SEÇÃO "SOBRE MIM" ---
  const statsGrid = document.querySelector('.stats-grid');
  
  if (statsGrid) {
    const counters = statsGrid.querySelectorAll('.stat-number');
    let animationStarted = false;

    const startCounter = (counter) => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          counter.textContent = target;
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    };
    
    // Animação do "Streak" do GitHub
    const githubStreakCounter = document.getElementById('github-streak');
    if (githubStreakCounter) {
        const startDate = new Date(githubStreakCounter.dataset.start);
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        githubStreakCounter.dataset.target = diffDays;
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          counters.forEach(startCounter);
          animationStarted = true;
          counterObserver.unobserve(statsGrid);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(statsGrid);
  }

});