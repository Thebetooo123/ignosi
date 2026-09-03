# CLAUDE.md

Guía de contexto para trabajar en este repositorio con agentes de IA.

## Qué es este proyecto

Sitio corporativo estático de **IGNOSI Networks** (integrador de soluciones tecnológicas: redes, seguridad informática y electrónica, cableado estructurado, servidores, cloud, equipo de cómputo y soporte técnico). Sin backend, sin base de datos y **sin paso de compilación**: HTML + Bootstrap 5.3.8 (archivos propios, sin CDN) + JavaScript vanilla.

Se publica en **GitHub Pages (Project Site)**, bajo `usuario.github.io/repo/` y no en la raíz del dominio — esto condiciona cómo se escriben las rutas en todo el sitio (ver *Rutas relativas*).

La descripción completa de la arquitectura vive en [README.md](README.md). Este archivo cubre las **reglas de trabajo**.

---

## Regla de prioridad: Bootstrap First

Toda implementación de estilos, componentes visuales, responsive design y animaciones debe realizarse **primero con las capacidades nativas de Bootstrap 5.3.x** ya incluidas en el proyecto.

Antes de escribir CSS o JavaScript personalizado, verificar si Bootstrap ofrece una solución adecuada.

Si Bootstrap **no puede resolver el requerimiento**, se permite una solución propia, pero hay que:

1. Indicar explícitamente, **en la respuesta al usuario**, qué limitación de Bootstrap impide la solución nativa.
2. Explicar por qué la solución personalizada es necesaria.
3. Mantenerla simple, modular y compatible con la estructura existente.
4. No duplicar funcionalidad que Bootstrap ya provee.

**Principio general:** Bootstrap es siempre la primera opción; el código propio es la excepción y debe justificarse.

### Bootstrap First Policy

- **MUST** attempt to solve the requirement using Bootstrap 5.3.x first.
- **MUST NOT** introduce custom CSS or JavaScript when an adequate Bootstrap solution already exists.
- If Bootstrap cannot adequately satisfy the requirement, the agent **MUST document the limitation in its response to the user** before introducing a custom solution.
- Custom implementations must be minimal, isolated, maintainable, and consistent with the existing architecture.

---

## Convenciones obligatorias

### Sin comentarios en el código

`.html`, `.css` y `.js` se mantienen **completamente libres de comentarios**. El código debe ser autodescriptivo y la documentación vive en `README.md` y en este archivo.

> Esto revierte una convención anterior en la que cada clase `ig-*` llevaba un comentario justificándola. Esa justificación ahora se da **en la respuesta al usuario** al introducir la clase, y se documenta en la tabla de clases `ig-*` del README. **No volver a añadir comentarios al código.**

### Nomenclatura

- **CSS**: clases propias siempre en `kebab-case` con prefijo `ig-` (`ig-service-bg-odd`, `ig-marquee-track`). Sin excepciones: no crear clases sin prefijo.
- **JavaScript**: `camelCase` para variables y funciones.
- **Indentación**: 2 espacios por nivel de anidación, con una línea en blanco entre bloques `<section>`.
- **Idioma del contenido**: español (México), tono corporativo y técnico.

### Estilos inline

Se admiten solo para valores puntuales que Bootstrap no puede expresar **y que se usan una sola vez** (por ejemplo, el color de un overlay `rgba()` concreto). Si un mismo estilo inline aparece en dos o más lugares, debe convertirse en una clase `ig-*` en `css/styles.css`.

Usar los tokens de marca ya definidos en `:root` (`var(--ig-gold)`, `rgba(var(--ig-navy-rgb), .85)`, `var(--ig-cream)`) en vez de repetir hexadecimales sueltos.

### Rutas relativas, nunca absolutas

**Nunca** usar rutas que empiecen con `/` (`/css/...`, `/assets/...`): en GitHub Pages Project Site apuntan fuera del repositorio y dan 404.

- `index.html` (raíz) → `./css/...`, `./assets/...`, `./js/main.js`
- `servicios/`, `contacto/`, `quienes-somos/` (un nivel) → `../css/...`, `../assets/...`, `../js/main.js`

Al agregar una página nueva, replicar el prefijo que corresponda a su profundidad real.

### Header y footer: nunca duplicar

El `<header>` y el `<footer>` viven **una sola vez** en `partials/header.html` y `partials/footer.html`, y `js/main.js` los inyecta en runtime en los contenedores `#site-header` / `#site-footer`. Cualquier edición al header o footer va en esos dos archivos, **jamás copiada dentro de una página**.

Dentro de un partial, los `href`/`src` usan el token **`%BASE%`** (que `main.js` sustituye por `./` o `../` según la profundidad de la página), nunca una ruta relativa literal.

Consecuencia operativa: el sitio **debe servirse por HTTP** (`npx serve .`). Abrir los `.html` con doble clic (`file://`) deja la página sin header ni footer, porque `fetch()` está bloqueado por CORS.

### Tipografía: solo Karla

**Karla es la tipografía única del sitio.** Se asigna en `body { font-family: 'Karla', sans-serif; }` y en `--bs-body-font-family`; todo el texto la hereda. **No introducir una segunda familia para titulares** (el sitio usó Playfair Display y se eliminó justamente por generar inconsistencia entre páginas).

Dos excepciones, ambas acotadas:

- **`.ig-font-mono`** (JetBrains Mono): solo para acentos técnicos en versalitas. No extender su uso a texto corrido.
- **`.material-symbols-outlined`**: es el sistema de iconos. **Nunca** modificar ni eliminar su `@font-face` en `css/fonts.css` ni su `font-variation-settings` en `css/styles.css` — rompe la renderización de todos los iconos del sitio.

Prohibidos los `style="font-family: ..."` inline y las etiquetas `<style>` internas en el HTML.

### Videos de fondo

Toda etiqueta `<video>` debe llevar los cuatro atributos `autoplay loop muted playsinline`. Sin `muted` y sin `playsinline` (en minúsculas, sin guiones), iOS bloquea la reproducción automática. No ocultar ni condicionar los videos por CSS o JS en pantallas pequeñas.

### Imágenes: solo WebP

Todas las imágenes del sitio están en `.webp`. Al agregar una imagen nueva: convertirla a `.webp` antes de commitearla, guardarla en `assets/images/` y referenciarla con la ruta relativa que corresponda. No introducir `.jpg`/`.png` nuevos.

Los videos se mantienen en `.mp4` y no se convierten.

### Sin dependencias de red

Ningún `<link>`, `url()` o `src` puede apuntar a un dominio externo (CDN, Google Fonts, imágenes remotas). Todo el CSS, JS, tipografía e imagen vive dentro del repositorio.

Para agregar una fuente: descargar los `.woff2`, guardarlos en `assets/fonts/` y declarar el `@font-face` en `css/fonts.css` apuntando a la ruta local. Cada peso es un archivo distinto; no se ajustan "a mano".

### Archivos que no se tocan

`css/vendor/bootstrap.min.css` y `js/vendor/bootstrap.bundle.min.js` son builds oficiales sin modificar. Cualquier ajuste va en `css/styles.css` o `js/main.js`.

---

## Al hacer cambios

- Actualizar `CHANGELOG.md` (sección `[Sin publicar]`) con cualquier cambio notable.
- Si la arquitectura, las convenciones o el inventario de clases cambian, actualizar `README.md` para que siga siendo exacto.
- Verificar que los enlaces de ancla del menú y del footer sigan apuntando a secciones o páginas reales.
- Verificar responsividad antes de dar por terminado: el sitio debe funcionar sin desbordamiento horizontal desde 360px hasta escritorio.
- Al eliminar una clase `ig-*` del HTML, revisar si quedó sin uso en `css/styles.css` y borrarla también.
