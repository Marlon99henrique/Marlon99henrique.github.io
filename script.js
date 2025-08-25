// =============================================
// CONTROLE DO MENU MOBILE
// =============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    // Verifica se os elementos existem
    if (!mobileMenuBtn || !mobileNav || !overlay) return;

    function openMenu() {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Adiciona eventos
    mobileMenuBtn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);

    // Fecha o menu ao clicar em um link (delegação de evento melhorada)
    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Fecha o menu com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

// =============================================
// CONTROLE DAS CERTIFICAÇÕES (TABS E ACCORDION)
// =============================================

function initCertifications() {
    // Lógica dos Tabs de Certificações
    const certTabs = document.querySelectorAll('.cert-tab');
    const certContents = document.querySelectorAll('.cert-content');

    if (certTabs.length === 0 || certContents.length === 0) return;

    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove a classe 'active' de todas as abas e conteúdos
            certTabs.forEach(t => t.classList.remove('active'));
            certContents.forEach(c => {
                c.classList.remove('active');
                // Remove os delays de transição anteriores
                c.querySelectorAll('.cert-accordion').forEach(accordion => {
                    accordion.style.transitionDelay = '';
                });
            });

            // Adiciona a classe 'active' na aba clicada
            tab.classList.add('active');
            
            // Mostra o conteúdo correspondente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Adiciona delay para animação em cascata
                targetContent.querySelectorAll('.cert-accordion').forEach((accordion, index) => {
                    accordion.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    });

    // Lógica do Accordion de Certificações
    const accordionHeaders = document.querySelectorAll('.cert-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCurrentlyActive = header.classList.contains('active');

            // Fecha todos os accordions primeiro (comportamento de acordeão)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = 0;
                }
            });

            // Alterna o estado do header clicado
            if (!isCurrentlyActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                header.classList.remove('active');
                content.style.maxHeight = 0;
            }
        });
    });
}




// =============================================
// NAVEGAÇÃO ENTRE PÁGINAS (SCROLL SNAP COM INTERSECTION OBSERVER)
// =============================================


function initPageNavigation() {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    let currentVisiblePage = null;

    // Atualiza navegação ativa com base na seção visível
    function updateActiveNav(currentPageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === currentPageId);
        });

        const allLinks = [...navLinks, ...mobileNavLinks];
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href ? href.substring(1) : '';
            link.classList.toggle('active', targetId === currentPageId);
        });
    }

    // IntersectionObserver observando a janela inteira
    const observer = new IntersectionObserver((entries) => {
        let mostVisiblePage = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    mostVisiblePage = entry.target;
                }
            }
        });

        if (mostVisiblePage && mostVisiblePage.id !== currentVisiblePage) {
            currentVisiblePage = mostVisiblePage.id;
            updateActiveNav(currentVisiblePage);
        }
    }, {
        root: null, // ← observa a rolagem da janela, não de um container
        threshold: Array.from({ length: 11 }, (_, i) => i / 10)
    });

    pages.forEach(page => observer.observe(page));

    // Navegação por clique nos links
    const allLinks = [...navLinks, ...mobileNavLinks];
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetId = href.substring(1);
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                targetPage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Recalcula ao redimensionar a janela
    window.addEventListener('resize', () => {
        pages.forEach(page => observer.unobserve(page));
        pages.forEach(page => observer.observe(page));
    });
}



// =============================================
// NAVEGAÇÃO ENTRE TELAS COM BOTÕES DE ROLAGEM
// =============================================

function initNavigationButtons() {
    const pageContainer = document.querySelector('.page-container');
    const sections = document.querySelectorAll('.page');
    const nextBtn = document.querySelector('.nav-button.next');
    const prevBtn = document.querySelector('.nav-button.prev');

    if (!pageContainer || sections.length === 0 || !nextBtn || !prevBtn) {
        return;
    }

    // Função para rolar para a próxima/anterior página
    const scrollToPage = (direction) => {
        const pageHeight = window.innerHeight;
        const scrollPosition = pageContainer.scrollTop;
        
        let targetPageIndex = Math.floor(scrollPosition / pageHeight);

        if (direction === 'next') {
            targetPageIndex = Math.min(targetPageIndex + 1, sections.length - 1);
        } else if (direction === 'prev') {
            targetPageIndex = Math.max(targetPageIndex - 1, 0);
        }

        pageContainer.scrollTo({
            top: targetPageIndex * pageHeight,
            behavior: 'smooth'
        });
    };
    
    // Adiciona event listeners aos botões
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToPage('next');
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToPage('prev');
    });

    // Atualiza a visibilidade dos botões
    function updateButtonVisibility() {
        const pageHeight = window.innerHeight;
        const scrollPosition = pageContainer.scrollTop;
        const currentPageIndex = Math.floor(scrollPosition / pageHeight);

        prevBtn.style.display = currentPageIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentPageIndex === sections.length - 1 ? 'none' : 'flex';
    }

    pageContainer.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);

    // Estado inicial
    updateButtonVisibility();
}

// =============================================
// ANIMAÇÃO DE MÁQUINA DE ESCREVER
// =============================================

function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const texts = ["Cientista de Dados", "Analista de Dados", "Python & SQL", "Data-Driven Solutions"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    // Inicia com o texto vazio ou um texto inicial
    textElement.textContent = "";

    // Espera 1s antes de começar o typewriter (para dar tempo de ver o título)
    setTimeout(() => {
        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                charIndex--;
                textElement.textContent = currentText.substring(0, charIndex);
            } else {
                charIndex++;
                textElement.textContent = currentText.substring(0, charIndex);
            }

            let typingSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                // Pausa antes de apagar
                typingTimeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
                return;
            }

            if (isDeleting && charIndex === 0) {
                // Passa para o próximo texto
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingTimeout = setTimeout(type, 500);
                return;
            }

            typingTimeout = setTimeout(type, typingSpeed);
        }

        type();
    }, 1000);

    // Limpa o timeout quando a página fica oculta
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(typingTimeout);
        }
    });
}

// =============================================
// ANIMAÇÃO DE ESTATÍSTICAS
// =============================================

function animateStatsTogether() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let start = null;
                const targets = Array.from(stats).map(el => {
                    const target = el.getAttribute('data-target');
                    return target === '8' ? target : parseInt(target);
                });

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const duration = 1500;
                    const ease = 1 - Math.pow(1 - Math.min(progress / duration, 1), 3);

                    stats.forEach((el, i) => {
                        const target = targets[i];
                        if (target === '8') {
                            el.textContent = '8';
                        } else {
                            const value = Math.min(Math.floor(target * ease), target);
                            el.textContent = value + (targets[i] === 100 ? '%' : '');
                        }
                    });

                    if (progress < duration) {
                        requestAnimationFrame(step);
                    } else {
                        // Garante valores finais exatos
                        stats.forEach((el, i) => {
                            const target = targets[i];
                            el.textContent = target + (targets[i] === 100 ? '%' : '');
                        });
                    }
                }
                requestAnimationFrame(step);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

    stats.forEach(stat => observer.observe(stat));
}

// =============================================
// ANIMAÇÃO DE ELEMENTOS AO APARECEREM NA TELA
// =============================================

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.animate-on-scroll, .about-image, .about-text, .stats-grid, .skill-tags, .about-cta-buttons'
    );
    
    if (animateElements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(element => {
        // Garante que elementos já visíveis sejam animados
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            element.classList.add('visible', 'animate-in');
        } else {
            observer.observe(element);
        }
    });
}

// =============================================
// CONTROLE DE TEMA DE ALTO CONTRASTE
// =============================================

function initContrastToggle() {
    const contrastToggleButton = document.getElementById('contrast-toggle');
    if (!contrastToggleButton) return;

    contrastToggleButton.addEventListener('click', () => {
        const isHighContrast = document.body.classList.toggle('high-contrast-mode');
        
        // Remove tema escuro se estiver ativo
        if (isHighContrast && document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.removeItem('theme');
        }
        
        // Salva preferência
        localStorage.setItem('highContrast', isHighContrast);
    });

    // Aplica preferência salva
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast-mode');
    }
}

// =============================================
// CONTROLE DE TEMA CLARO/ESCURO
// =============================================

function initThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (!themeToggleButton) return;

    // Verifica se há preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggleButton.addEventListener('click', () => {
        // Remove alto contraste se estiver ativo
        if (document.body.classList.contains('high-contrast-mode')) {
            document.body.classList.remove('high-contrast-mode');
            localStorage.removeItem('highContrast');
        }
        
        // Alterna entre temas claro e escuro
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

// =============================================
// ANIMAÇÃO DE TAGS DE PROJETOS
// =============================================

function setupProjectTags() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tags = card.querySelector('.project-tags');
            if (tags) tags.classList.add('show');
        });

        card.addEventListener('mouseleave', () => {
            const tags = car.querySelector('.project-tags');
            if (tags) tags.classList.remove('show');
        });

        // Para dispositivos touch
        card.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevenir comportamento padrão
            const tags = card.querySelector('.project-tags');
            if (tags) tags.classList.toggle('show');
        }, { passive: false });
    });
}

// =============================================
// INICIALIZAÇÃO GERAL
// =============================================

function initializeAllFeatures() {
    initMobileMenu();
    initCertifications();
    initPageNavigation();
    initNavigationButtons();
    initTypewriter();
    initThemeToggle();
    animateStatsTogether();
    setupScrollAnimations();
    initContrastToggle();
    setupProjectTags();
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
    initializeAllFeatures();
}

// Re-inicializa animações ao redimensionar (para layouts responsivos)
window.addEventListener('resize', () => {
    // Recalcula accordions abertos
    document.querySelectorAll('.cert-accordion-header.active').forEach(header => {
        const content = header.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});