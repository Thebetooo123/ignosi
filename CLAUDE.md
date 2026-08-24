# CLAUDE.md

Guía de contexto para trabajar en este repositorio con Claude Code.

## Qué es este proyecto

Landing page corporativa estática de **IGNOSI Networks** (integrador de soluciones tecnológicas: redes, CCTV, control de acceso, detección de incendios, energía ininterrumpida, data centers). Sin backend ni build step: HTML + Bootstrap 5.3.8 (archivos propios, sin CDN) + JavaScript vanilla/Bootstrap.

## Estructura

- `index.html` — única página del sitio.
- `css/vendor/bootstrap.min.css` — Bootstrap 5.3.8 sin modificar. No editar directamente; para theming usar `css/styles.css`.
- `css/styles.css` — tema de marca (reasigna variables CSS de Bootstrap: `--bs-primary`, `--bs-body-color`, `--bs-border-radius`, etc.) + clases propias con prefijo `ig-` para lo que Bootstrap no resuelve nativamente. **Cada clase `ig-*` trae un comentario explicando por qué Bootstrap no la cubre** — mantener esa convención al añadir nuevas.
- `js/vendor/bootstrap.bundle.min.js` — Bootstrap 5.3.8 + Popper, sin modificar. Debe cargarse **antes** de `js/main.js`.
- `js/main.js` — interactividad propia del sitio. Actualmente vacío: el `<header>` no tiene menú colapsable, solo tres columnas fijas (`row` + `col-4`×3) siempre visibles, sin JS.
- `css/fonts.css` + `assets/fonts/*.woff2` — Karla, JetBrains Mono, Playfair Display y Material Symbols Outlined autoalojados (no hay `<link>` a `fonts.googleapis.com`). Si cambian las familias/pesos usados en `index.html`, hay que regenerar este `@font-face` y volver a descargar los `.woff2` correspondientes desde Google Fonts (no editar los pesos "a mano": el archivo `.woff2` de cada peso es distinto).
- `assets/images/` — imágenes propias, autoalojadas (ver su README): `hero-server-room.jpg`, `about-engineer-rack.jpg`, `logo-ignosi.png` (logo del header).
- `Ejemplo.html` — maqueta original de un solo archivo en **Tailwind CSS**, conservada como referencia histórica; **no editar como parte del sitio activo**, los cambios van en `index.html` y sus archivos separados.
- `bootstrap-5.3.8-dist/` — ZIP de distribución oficial de Bootstrap del que se copiaron los archivos a `css/vendor/`/`js/vendor/`. Ya no se usa (nada en `index.html` apunta ahí) y puede eliminarse.

## Sin dependencias de red

El sitio no debe tener ningún `<link>`/`url()`/`src` apuntando a un dominio externo (CDN de Tailwind, Google Fonts, imágenes remotas, etc.) — todo CSS, JS, tipografía e imagen vive dentro del repositorio. Al agregar una fuente o imagen nueva:

- **Fuentes:** descargar los `.woff2` (p. ej. desde `fonts.googleapis.com` con una cabecera `User-Agent` de navegador moderno para obtener woff2, y las URLs reales de archivo desde `fonts.gstatic.com` dentro de esa respuesta), guardarlos en `assets/fonts/` y declarar el `@font-face` en `css/fonts.css` apuntando a la ruta local.
- **Imágenes:** guardarlas en `assets/images/` y referenciarlas con ruta relativa, nunca con una URL absoluta a otro host.

## Convenciones

- **No hay proceso de build.** Se usan los archivos `.min.css`/`.min.js` de Bootstrap directamente, sin Sass ni bundler. Por eso el theming se hace 100% con variables CSS en tiempo de ejecución (custom properties `--bs-*`), no con variables Sass — si se necesita cambiar algo que solo existe como variable Sass en Bootstrap (p. ej. los breakpoints de `.container-*`), no hay forma de tocarlo sin introducir un build step; en esos casos se usa una clase `ig-*` propia (ver `css/styles.css`).
- **Traducción Tailwind → Bootstrap:** al modificar `index.html`, preferir siempre una clase/utilidad nativa de Bootstrap (grid `row`/`col`, `navbar`, `ratio`, `object-fit-*`, utilidades de opacidad `--bs-bg-opacity`/`--bs-text-opacity` vía `style`, etc.) antes que CSS propio. Si de verdad no hay forma de resolverlo con Bootstrap, documentar el porqué en el comentario de la clase `ig-*` correspondiente en `css/styles.css`.
- **Idioma del contenido:** español (México). Mantener el tono corporativo/técnico existente.
- **Escala tipográfica propia** (`.ig-display`, `.ig-headline-md`, `.ig-headline-sm`, `.ig-stat-number`, `.ig-label-caps`, `.ig-body-lg`) reproduce los tamaños exactos del diseño original (no la escala fija de `.display-1..6`/`.fs-1..6` de Bootstrap). Combinar con `.ig-font-serif` (Playfair Display) o `.ig-font-mono` (JetBrains Mono) donde corresponda; el resto del texto usa la tipografía base (Karla) heredada de `--bs-body-font-family`.
- **Excepción — `<header>`:** a pedido explícito, el header usa *casi exclusivamente* clases nativas de Bootstrap (`container-fluid`, `row`, `col-4`, `nav`/`nav-link`, utilidades), sin `style=""`. La única excepción es `.ig-header-logo` (fija el alto del logo a 56px manteniendo su proporción; Bootstrap no tiene utilidades de alto en píxeles fijos) — se agregó a propósito, con el usuario, tras confirmar que ni `img-fluid` ni ninguna clase nativa lo resolvían. No agregar más clases `ig-*` aquí sin necesidad real equivalente. Las tres columnas (`col-4`×3) son fijas: no hay menú colapsable para móvil. Si se necesita responsividad ahí, habrá que decidir explícitamente cómo (Collapse, utilidades `d-*-none`, etc.) — no asumir.
- **Excepción — sección de tarjetas "Quiénes somos / Servicios / Alianzas estratégicas"** (justo debajo del hero): a pedido explícito, usa *exclusivamente* clases nativas de Bootstrap (`container`, `row`, `col-md-4`, `.card`/`.card-body`/`.card-title`/`.card-text`, `.text-primary`, `.fs-1`, `.shadow-sm`...), sin ninguna clase `ig-*` ni `style=""`. Por eso sus títulos/tamaños no siguen la escala tipográfica `.ig-*` del resto del sitio. `material-symbols-outlined` en los iconos no cuenta como excepción: es la base del sistema de iconos de todo el sitio (`css/fonts.css`), no CSS agregado para esta sección.
- **Excepción — formulario de contacto** (sección `bg-light` justo antes del `<footer>`): mismo caso, a pedido explícito usa *exclusivamente* clases nativas de Bootstrap (`container`, `row justify-content-center`, `col-md-8 col-lg-6`, `form-control`, `btn btn-dark`), sin `ig-*` ni `style=""`. El fondo/borde blanco de los inputs y el fondo de las tarjetas ya salen "gratis" porque `--bs-body-bg` y `--bs-border-color` están remapeados a la marca en `:root` — no fue necesario agregar nada para lograrlo.
- **Iconografía:** Material Symbols Outlined (autoalojado, ver `css/fonts.css`), usado como `<span class="material-symbols-outlined">nombre_del_icono</span>`.
- **Indentación:** `index.html` está indentado por nivel de anidación (2 espacios) con una línea en blanco entre bloques `<section>`/subsecciones grandes, para poder ubicar cada sección de un vistazo. Mantener ese estilo al editar.
- Mantener el HTML como un único archivo `index.html` salvo que el proyecto crezca a múltiples páginas/secciones — en ese caso, evaluar parciales o un generador estático antes de duplicar el `<header>`/`<footer>`.

## Al hacer cambios

- Actualizar `CHANGELOG.md` (sección `[Sin publicar]`) con cualquier cambio notable.
- Si se agregan imágenes propias, colocarlas en `assets/images/` y referenciarlas con rutas relativas (`assets/images/...`), no con URLs externas.
- Verificar que los enlaces de ancla (`href="#"`) del menú y footer sigan funcionando o se actualicen a secciones/páginas reales conforme el sitio evolucione.
- No modificar `css/vendor/bootstrap.min.css` ni `js/vendor/bootstrap.bundle.min.js` — son builds oficiales sin tocar; cualquier ajuste va en `css/styles.css` o `js/main.js`.
