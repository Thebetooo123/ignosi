/**
 * Comportamiento de interfaz del sitio de IGNOSI Networks.
 * El header ya no tiene menú colapsable propio (ver partials/header.html):
 * es un navbar estándar de Bootstrap, el colapso en móvil lo maneja el JS
 * del propio Bootstrap (data-bs-toggle) sin código de interacción propio.
 */

/* GitHub Pages (Project Site) publica el sitio bajo usuario.github.io/repo/,
   no en la raíz del dominio, así que cualquier ruta que empiece con "/"
   (ej. "/assets/...") apunta a usuario.github.io/assets/... y da 404. Por
   eso cada página referencia sus propios recursos (css/js/imágenes) con
   rutas relativas estrictas ("./..." en index.html, "../..." en las
   páginas de un nivel de subcarpeta como contacto/index.html), incluyendo
   el <script src="...js/main.js"> que carga este archivo.

   Ese mismo <script src> nos dice, en tiempo de ejecución, cuántos niveles
   hay que subir para llegar a la raíz del sitio: es exactamente el prefijo
   ("./" o "../", o "../../" si el sitio creciera más niveles) que el autor
   de la página ya tuvo que escribir a mano para que main.js cargara. Lo
   leemos de document.currentScript (debe capturarse de forma síncrona, al
   inicio: currentScript vuelve a ser null dentro de un callback/await) y lo
   reutilizamos como "basePath" para:
   - construir la URL de fetch() de partials/header.html y partials/footer.html
     (que también viven relativos a la raíz), y
   - sustituir el token %BASE% dentro de esos partials, que al ser
     compartidos por páginas a distinta profundidad no pueden traer un
     prefijo relativo fijo escrito a mano (el logo o los enlaces del menú
     necesitan "./" desde Home pero "../" desde /contacto/, /quienes-somos/).
*/
const mainScriptSrc = document.currentScript.getAttribute('src');
const basePath = mainScriptSrc.replace(/js\/main\.js$/, '');

async function loadPartial(containerId, partialFile) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const response = await fetch(basePath + partialFile);
  const html = (await response.text()).split('%BASE%').join(basePath);
  container.outerHTML = html;
}

loadPartial('site-header', 'partials/header.html');
loadPartial('site-footer', 'partials/footer.html');

/* Animaciones de revelado suave al hacer scroll (Scroll Reveal):
   Detecta cuándo los elementos con clase .ig-reveal entran al viewport
   y añade .ig-reveal-visible para disparar la transición CSS de forma fluida. */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.ig-reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ig-reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback inmediato para navegadores antiguos
    reveals.forEach(el => el.classList.add('ig-reveal-visible'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

