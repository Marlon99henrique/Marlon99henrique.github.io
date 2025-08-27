/* =============================================
   40-PROJETOS — Preview (hover/touch) e Modal de resumo
================================================ */
(() => {
  const {qsa, on, lockScroll, isCoarsePointer} = window.$app;

  /* ---------- Preview nos cards (hover no desktop, toque no mobile) --------- */
  qsa('[data-project]').forEach(card => {
    if (isCoarsePointer) {
      on(card, 'click', (e) => {
        // Evita clicar em links dentro do card fechar o preview
        if ((e.target.closest('a') || e.target.closest('button'))) return;
        card.classList.toggle('preview-open');
      });
    }
  });

  /* ---------- Modal de IMAGEM + fallback TEXTUAL ---------- */
  const imgModal   = document.getElementById('resumoModal');
  const imgEl      = document.getElementById('resumoImg');
  const captionEl  = document.getElementById('resumoCaption');
  const readmeBtn  = document.getElementById('resumoOpenReadme');
  const downloadBtn= document.getElementById('resumoDownload');

  const textModal  = document.getElementById('project-modal');
  const textBody   = textModal?.querySelector('.modal-body');

  let lastActive = null;
  const openImgModal = ({src, alt, caption, readme}) => {
    if (!imgModal) return;
    imgEl.src = src; imgEl.alt = alt || '';
    captionEl.textContent = caption || '';
    if (readmeBtn) readmeBtn.href = readme || '#';
    if (downloadBtn) { downloadBtn.href = src; downloadBtn.download = (src.split('/').pop() || 'resumo.png'); }
    lastActive = document.activeElement;
    imgModal.classList.add('open'); imgModal.setAttribute('aria-hidden','false');
    lockScroll(true);
    setTimeout(() => imgModal.querySelector('.resumo-close')?.focus(), 0);
  };
  const closeImgModal = () => {
    if (!imgModal) return;
    imgModal.classList.remove('open'); imgModal.setAttribute('aria-hidden','true');
    imgEl.removeAttribute('src'); lockScroll(false); lastActive?.focus();
  };
  imgModal?.querySelectorAll('[data-close-resumo]').forEach(b => on(b, 'click', closeImgModal));
  imgModal?.addEventListener('keydown', e => { if (e.key === 'Escape') closeImgModal(); });

  const openTextModal = (frag) => {
    if (!textModal || !textBody) return;
    textBody.innerHTML = ''; textBody.appendChild(frag);
    lastActive = document.activeElement;
    textModal.classList.add('open'); textModal.setAttribute('aria-hidden','false');
    lockScroll(true);
    setTimeout(() => textModal.querySelector('.modal-close')?.focus(), 0);
  };
  const closeTextModal = () => {
    if (!textModal) return;
    textModal.classList.remove('open'); textModal.setAttribute('aria-hidden','true');
    if (textBody) textBody.innerHTML = ''; lockScroll(false); lastActive?.focus();
  };
  textModal?.querySelectorAll('[data-close-modal]').forEach(b => on(b, 'click', closeTextModal));
  textModal?.addEventListener('keydown', e => { if (e.key === 'Escape') closeTextModal(); });

  // Botões "Ver resumo completo"
  qsa('[data-open-resumo]').forEach(btn => {
    on(btn, 'click', () => {
      const card    = btn.closest('[data-project]');
      const src     = btn.getAttribute('data-resumo-img');
      const alt     = btn.getAttribute('data-resumo-alt') || '';
      const caption = card?.querySelector('.project-title')?.textContent?.trim() || 'Resumo';
      const readme  = card?.querySelector('a.btn[href*="github.com"]')?.href || '';

      if (src) {
        openImgModal({src, alt, caption, readme});
      } else {
        const tplSel = btn.getAttribute('data-template');
        const tpl = tplSel ? document.querySelector(tplSel) : null;
        if (tpl && 'content' in tpl) openTextModal(tpl.content.cloneNode(true));
      }
    });
  });
})();
