
  (function () {
    const form = document.querySelector('form[data-netlify="true"][name="contact"]');
    if (!form) return;
    const btn = form.querySelector('.contact__submit');
    const status = form.querySelector('#form-status');

    form.addEventListener('submit', function () {
      if (btn) {
        btn.dataset.original = btn.textContent;
        btn.textContent = btn.getAttribute('data-loading') || 'Enviando…';
        btn.disabled = true;
      }
      if (status) status.textContent = 'Enviando…';
    });

    // Caso Netlify retorne para a mesma página com hash ?success=true
    if (new URLSearchParams(window.location.search).get('success') === 'true') {
      if (status) status.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
    }
  })();