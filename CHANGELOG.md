# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Added
- Documentación estándar del proyecto: `README.md`, `CHANGELOG.md`, `CLAUDE.md`.
- Carpeta `assets/images/` reservada para imágenes propias, con nota sobre las imágenes externas actuales.
- `css/vendor/bootstrap.min.css` y `js/vendor/bootstrap.bundle.min.js` (+ `.map`), copiados desde `bootstrap-5.3.8-dist/` (ZIP de distribución oficial).
- `assets/images/logo-ignosi.png`: logo de marca en el header, reemplazando el texto "IGNOSI / Networks". Se descargó del link provisto por el usuario en vez de referenciarlo directo, para mantener el sitio sin dependencias de red. Se agregó `.ig-header-logo` en `css/styles.css` (fija su alto) como única excepción a la regla de "solo Bootstrap" del header, confirmada con el usuario.
- Formulario de contacto completo en la sección "Contáctanos" (antes solo tenía un campo "Nombre" y un botón): título "Envíanos un Mensaje", campos Nombre/Email/Mensaje (`textarea`) y botón "ENVIAR", en una banda `bg-light` propia, centrada con `row justify-content-center` + `col-md-8 col-lg-6`. Usa exclusivamente clases de Bootstrap (`form-control`, `btn btn-dark`, grid), sin ninguna clase `ig-*` ni `style=""`.
- Carrusel de fondo del hero (`#heroCarousel`, `carousel slide carousel-fade`, autoplay con `data-bs-interval="6000"`) con 4 slides (`assets/images/hero-server-room-1.jpg` a `-4.jpg`) y efecto "Ken Burns" (zoom lento de `scale(1)` a `scale(1.1)`, 9s). El zoom se resuelve con `@keyframes ig-hero-kenburns` en `css/styles.css` (Bootstrap no tiene utilidades de animación), atado a `.carousel-item.active` para que reinicie en cada slide. Por ahora solo existe la imagen del slide 1 (renombrada desde `hero-server-room.jpg`); las de los slides 2-4 están pendientes de subir (ver `assets/images/README.md`).

### Changed
- Se dividió `Ejemplo.html` (archivo único) en una estructura estándar de proyecto web (`index.html` + `css/` + `js/`).
- **Migración de Tailwind CSS a Bootstrap 5.3.8**: se tradujo todo el CSS del sitio a componentes y utilidades nativas de Bootstrap (grid `row`/`col`, `navbar`/`collapse`, `ratio`, `object-fit-*`, opacidades vía `--bs-bg-opacity`/`--bs-text-opacity`, bordes para las divisiones de la grilla de servicios, etc.). `css/styles.css` reasigna las variables CSS de Bootstrap (`--bs-primary`, `--bs-body-color`, `--bs-border-radius`...) para aplicar la identidad de marca sin CSS adicional.
- Donde Bootstrap no tiene solución nativa, se agregaron clases propias con prefijo `ig-` en `css/styles.css` (cada una documentada con el motivo): escala tipográfica exacta del diseño (tamaños/line-height/letter-spacing que no coinciden con `.display-1..6`/`.fs-1..6`), anchos máximos de texto en valores fijos (Bootstrap solo trae `mw-25/50/75/100` en porcentaje), separaciones de sección y `gap` por encima del máximo de la escala de Bootstrap (3rem), ancho de contenedor de 1280px (no coincide con ningún breakpoint `.container-*`), imagen de fondo con `cover`/`center`, `mix-blend-mode` y estados `:hover` (Bootstrap no genera variantes hover como Tailwind).

- Se autoalojaron todos los recursos que antes se cargaban desde internet: `css/fonts.css` + `assets/fonts/*.woff2` (Karla, JetBrains Mono, Playfair Display, Material Symbols Outlined, descargados de `fonts.googleapis.com`/`fonts.gstatic.com`) y `assets/images/hero-server-room.jpg` + `assets/images/about-engineer-rack.jpg` (descargadas de `lh3.googleusercontent.com`, mismas imágenes placeholder de la maqueta original). `index.html` ya no tiene ningún `<link>`/`url()` apuntando a un dominio externo.
- Se aplicó indentación por nivel de anidación (2 espacios) a `index.html`, con líneas en blanco entre secciones, para facilitar ubicar cada bloque del diseño.

### Fixed
- **Maquetación del `<header>`**: los elementos se superponían (logo centrado con `position-absolute` chocando con el resto) y el panel de menú móvil colapsable (Bootstrap Collapse) se veía como un bloque azul oscuro con enlaces verticales flotando sobre el resto del contenido. Se reescribió el header usando exclusivamente el grid de Bootstrap: `container-fluid` + `row align-items-center` con tres `col-4` (nav a la izquierda con `nav`/`nav-link`, logo centrado, iconos a la derecha con `d-flex justify-content-end`). No usa ninguna clase `ig-*` ni `style=""` — ver la excepción documentada en `CLAUDE.md`.
- **Maquetación de la sección de tarjetas "Quiénes somos / Servicios / Alianzas estratégicas"**: se reescribió con clases exclusivamente de Bootstrap (`container` + `py-5`, `row justify-content-center text-center`, `col-md-4 mb-4 mb-md-0`, `.card`/`.card-body`/`.card-title`/`.card-text`/`.shadow-sm`) en vez de la grilla y tipografía personalizadas (`ig-section-py`, `ig-container`, `ig-gap-16`, `ig-headline-sm`, `ig-font-serif`, `ig-mw-xs`). Los iconos usan `.text-primary` (ya remapeado al azul de marca) en vez del `color` inline anterior. Se cambiaron los iconos de `verified_user`/`settings_input_component`/`handshake` a `gpp_good` (escudo con check), `cable` (cables de conexión) y `link` (enlaces de cadena) para que coincidan con la descripción visual pedida.

### Changed
- Logo del header (`.ig-header-logo` en `css/styles.css`) de 40px a 56px de alto, para que resalte más.

### Removed
- El menú móvil colapsable del header (botón hamburguesa + panel `navbar-collapse`): a pedido explícito se eliminó junto con el bloque azul; el header ahora es de tres columnas fijas siempre visibles, sin JS ni breakpoint específico.
- Clases `.ig-h-20`, `.ig-hover-fade`, `.ig-mw-xs`, `.ig-mw-xl` y `.ig-cta-btn` en `css/styles.css`, sin uso tras el rediseño del header, la sección de tarjetas y el formulario de contacto.
- `js/tailwind.config.js` (configuración del tema de Tailwind), obsoleto tras la migración a Bootstrap.

## [0.1.0] - 2026-08-24

### Added
- Maqueta inicial de una sola página (`Ejemplo.html`) generada para IGNOSI Networks: hero, secciones "Quiénes somos", banner, "Acerca de", grilla de servicios, formulario de contacto y footer.
