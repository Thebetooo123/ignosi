/**
 * Comportamiento de interfaz del sitio de IGNOSI Networks.
 * El header ya no tiene menú colapsable (ver partials/header.html): los
 * enlaces y el logo se resuelven con el grid de Bootstrap (row/col-4) en
 * una sola fila, sin JS de interacción.
 */

/* Header y footer viven en partials/header.html y partials/footer.html y se
   inyectan aquí en tiempo de ejecución en cada página (index.html,
   contacto.html, quienes-somos.html) que tenga los contenedores
   #site-header/#site-footer: el sitio no tiene build step ni backend/motor
   de plantillas, así que no existe una forma nativa de "incluir" un archivo
   HTML dentro de otro sin JS. Requiere servir el sitio por HTTP (no abrir
   los .html con doble clic desde el explorador de archivos), porque
   fetch() de archivos locales vía file:// está bloqueado por CORS en la
   mayoría de navegadores.
*/
async function loadPartial(containerId, path) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const response = await fetch(path);
  container.outerHTML = await response.text();
}

loadPartial('site-header', '/partials/header.html');
loadPartial('site-footer', '/partials/footer.html');
