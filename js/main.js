const mainScriptSrc = document.currentScript.getAttribute('src');
const basePath = mainScriptSrc.replace(/js\/main\.js$/, '');

async function loadPartial(containerId, partialFile) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const response = await fetch(basePath + partialFile);
  if (!response.ok) return;
  const html = (await response.text()).split('%BASE%').join(basePath);
  container.outerHTML = html;
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.ig-reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('ig-reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('ig-reveal-visible');
      obs.unobserve(entry.target);
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

loadPartial('site-header', 'partials/header.html');
loadPartial('site-footer', 'partials/footer.html');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
