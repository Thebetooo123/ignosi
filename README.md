# IGNOSI Networks — Sitio corporativo

Sitio web institucional de **IGNOSI Networks**, integrador de soluciones tecnológicas en Monterrey, N.L.: redes y comunicaciones, seguridad informática, seguridad electrónica, cableado estructurado, servidores, cloud, equipo de cómputo y soporte técnico.

Es un sitio **estático puro**: no tiene backend, base de datos, paso de compilación ni dependencias de `node_modules`. Todo lo que el navegador necesita (CSS, JS, tipografías e imágenes) vive dentro del repositorio y se sirve desde él.

---

## Índice

- [Arquitectura de archivos](#arquitectura-de-archivos)
- [Páginas](#páginas)
- [Cómo ejecutarlo en local](#cómo-ejecutarlo-en-local)
- [Estandarización técnica](#estandarización-técnica)
  - [Bootstrap first](#bootstrap-first)
  - [Sistema de tematización](#sistema-de-tematización)
  - [Clases propias `ig-*`](#clases-propias-ig-)
  - [Header y footer compartidos](#header-y-footer-compartidos)
  - [Rutas relativas y GitHub Pages](#rutas-relativas-y-github-pages)
  - [Multimedia en WebP](#multimedia-en-webp)
  - [Responsividad mobile-first](#responsividad-mobile-first)
  - [Tipografías autoalojadas](#tipografías-autoalojadas)
- [Convenciones de código](#convenciones-de-código)
- [Documentación relacionada](#documentación-relacionada)

---

## Arquitectura de archivos

```
ignosi/
├── index.html                  # Home
├── servicios/index.html        # Detalle de los 8 servicios  → /servicios
├── quienes-somos/index.html    # Perfil corporativo          → /quienes-somos
├── contacto/index.html         # Formulario de contacto      → /contacto
│
├── partials/
│   ├── header.html             # <header> global (navbar), inyectado en runtime
│   └── footer.html             # <footer> global, inyectado en runtime
│
├── css/
│   ├── vendor/bootstrap.min.css    # Bootstrap 5.3.8 oficial, sin modificar
│   ├── fonts.css                   # 23 @font-face autoalojados
│   └── styles.css                  # Tema de marca + utilidades propias .ig-*
│
├── js/
│   ├── vendor/bootstrap.bundle.min.js   # Bootstrap 5.3.8 + Popper, sin modificar
│   └── main.js                          # Inyección de partials + scroll reveal
│
├── assets/
│   ├── fonts/                  # 17 archivos .woff2
│   └── images/                 # Imágenes .webp + videos .mp4 de fondo
│
├── README.md
├── CHANGELOG.md
├── CLAUDE.md                   # Reglas de desarrollo para agentes de IA
└── AGENTS.MD                   # Puntero a CLAUDE.md
```

Cada página secundaria vive en **su propia carpeta con un `index.html` dentro** (`contacto/index.html` en vez de `contacto.html`). Así `/contacto`, `/servicios` y `/quienes-somos` funcionan como URLs limpias en cualquier hosting estático, sin reglas de rewrite: servir el `index.html` de un directorio es el comportamiento por defecto.

## Páginas

| Ruta | Archivo | Contenido |
|---|---|---|
| `/` | `index.html` | Hero con video en loop, tarjetas de introducción, bloque "Bienvenido a IGNOSI", banner parallax y cuadrícula de los 8 servicios |
| `/servicios` | `servicios/index.html` | Una `<section>` por servicio en zig-zag cromático: fondos alternados (impar/par) y tarjeta interna con degradado de marca |
| `/quienes-somos` | `quienes-somos/index.html` | Hero con video, "Nuestra Esencia", misión/visión/valores y dos cintas de logos en scroll infinito |
| `/contacto` | `contacto/index.html` | Tarjeta clara sobre fondo oscuro con formulario validado por HTML5 |

## Cómo ejecutarlo en local

> **Importante:** el sitio **debe servirse por HTTP**. Abrir los `.html` con doble clic (`file://`) no funciona: el header y el footer se cargan con `fetch()`, que el navegador bloquea por CORS bajo `file://`.

```bash
npx serve .
```

Luego abrir <http://localhost:3000> (o el puerto que indique la herramienta). Cualquier servidor estático sirve igual:

```bash
python -m http.server 8000
php -S localhost:8000
```

No hay nada que instalar ni compilar: no existe `package.json`, ni Sass, ni bundler.

## Estandarización técnica

### Bootstrap first

**Bootstrap 5.3.8 es siempre la primera opción.** Layout, responsividad, componentes y espaciados se resuelven con clases nativas (`row`/`col-*`, `d-flex`, `card`, `navbar`, `ratio`, `object-fit-*`, `position-*`, `z-*`, `shadow-*`, `rounded-*`, `p-*`/`m-*`). Solo cuando Bootstrap no tiene una solución nativa se escribe CSS propio, y ese CSS vive centralizado en `css/styles.css` como una clase `ig-*`.

Los archivos de `css/vendor/` y `js/vendor/` son builds oficiales **sin modificar** y no deben tocarse.

### Sistema de tematización

La identidad de marca no se aplica sobreescribiendo clases de Bootstrap, sino **reasignando las variables CSS que Bootstrap ya expone**, en el bloque `:root` de `css/styles.css`:

```css
--bs-primary:   var(--ig-primary);      /* azul corporativo #003461 */
--bs-body-font-family: "Karla", sans-serif;
--bs-heading-color: var(--ig-on-surface);
--bs-border-radius: 0.125rem;
```

El resultado es que `text-primary`, `btn-primary`, `.card`, `h1`..`h6` y demás clases nativas ya salen con la identidad de IGNOSI sin CSS adicional.

Los tokens de marca están centralizados como variables propias y se reutilizan tanto en CSS como en estilos inline:

| Token | Valor | Uso |
|---|---|---|
| `--ig-primary` | `#003461` | Azul corporativo (color primario de Bootstrap) |
| `--ig-gold` / `--ig-gold-rgb` | `#c59b27` | Dorado de marca: acentos, botones CTA, scrollbar |
| `--ig-navy` / `--ig-navy-rgb` | `#0f2027` | Azul noche: overlays y paneles oscuros |
| `--ig-cream` | `#fcf8f2` | Crema: tarjeta de contacto y degradados de servicios |

> El dorado de marca `#c59b27` **no** es el `#ffc107` de `.text-warning`/`.border-warning` de Bootstrap. Por eso los acentos dorados usan `.ig-text-gold`/`.ig-border-gold`, y los botones usan `.ig-btn-gold`, que retematiza `.btn-warning` mediante sus propias variables de componente (`--bs-btn-bg`, `--bs-btn-hover-bg`, …) — el mecanismo nativo de Bootstrap 5.3 para re-colorear un botón sin escribir una clase nueva.

### Clases propias `ig-*`

`css/styles.css` define 43 clases propias, todas con prefijo `ig-` y en `kebab-case`. Existen únicamente donde Bootstrap 5.3 no ofrece equivalente nativo:

| Grupo | Clases | Por qué no lo cubre Bootstrap |
|---|---|---|
| Tipografía | `ig-display`, `ig-headline-md`, `ig-headline-sm`, `ig-label-caps`, `ig-body-lg`, `ig-font-serif`, `ig-font-mono` | La escala `.display-*`/`.fs-*` es fija y no coincide con los tamaños del diseño; no hay variable de fuente para encabezados en el CSS compilado |
| Layout | `ig-container`, `ig-mw-2xl`, `ig-mw-4xl`, `ig-min-vh-50`, `ig-overlap-mt-n80` | `.mw-*` solo existe en porcentajes; `.min-vh-50` y las utilidades de margen negativo requieren compilar Sass |
| Espaciado | `ig-section-py`, `ig-py-24`, `ig-gap-20` | Las utilidades de Bootstrap topan en `3rem`; el diseño usa 64–120px |
| Fondos | `ig-features-bg`, `ig-features-bg-plain`, `ig-banner-bg`, `ig-page-bg-diagram`, `ig-services-bg`, `ig-service-bg-odd`, `ig-service-bg-even` | No hay utilidades de `background-image` ni `background-attachment` |
| Servicios | `ig-service-gradient-odd`, `ig-service-gradient-even`, `ig-service-img`, `ig-service-icon`, `ig-service-icon-lg` | No hay utilidades de `linear-gradient()` ni de altura en píxeles |
| Interacción | `ig-hover-lift`, `ig-service-card-hover`, `ig-link-hover-white`, `ig-btn-pulse`, `ig-reveal`, `ig-delay-1` | Bootstrap no genera variantes `:hover` de sus utilidades ni animaciones de énfasis |
| Marquee | `ig-marquee-shell`, `ig-marquee-track`, `ig-marquee-reverse`, `ig-marquee-item` | No existe componente de scroll continuo infinito |
| Marca | `ig-text-gold`, `ig-border-gold`, `ig-btn-gold`, `ig-rule`, `ig-header-logo`, `ig-footer-icon` | Colores de marca fuera de la paleta de Bootstrap; alturas en píxeles fijos |

Las animaciones respetan `prefers-reduced-motion: reduce`.

### Header y footer compartidos

El sitio es multipágina pero el `<header>` y el `<footer>` existen **una sola vez**, en `partials/`. Cada página los referencia con un contenedor vacío que `js/main.js` reemplaza en runtime:

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
```

Como no hay backend ni motor de plantillas, esta es la única forma de no duplicar ese marcado sin introducir un paso de compilación.

**Resolución de rutas (`%BASE%`).** Un partial compartido no puede traer un prefijo relativo fijo: necesita `./` cuando lo carga `index.html`, pero `../` desde `/contacto/`. `main.js` lee el `src` de su propio `<script>` — que la página ya tuvo que escribir con el prefijo correcto — y lo usa como `basePath`, tanto para el `fetch()` del partial como para sustituir el token `%BASE%` dentro de su HTML:

```js
const mainScriptSrc = document.currentScript.getAttribute('src');
const basePath = mainScriptSrc.replace(/js\/main\.js$/, '');
```

Al añadir un `href`/`src` dentro de un partial, usar `%BASE%` en lugar de una ruta relativa literal.

### Rutas relativas y GitHub Pages

El sitio se publica en **GitHub Pages como Project Site**, es decir bajo `usuario.github.io/repo/` y no en la raíz del dominio. Por eso **nunca deben usarse rutas absolutas** (`/css/...`, `/assets/...`): apuntarían a `usuario.github.io/css/...`, fuera del repositorio, y darían 404.

Cada página usa el prefijo relativo que corresponde a su profundidad:

- `index.html` (raíz) → `./css/styles.css`, `./assets/images/...`
- `servicios/`, `contacto/`, `quienes-somos/` (un nivel) → `../css/styles.css`, `../assets/images/...`

### Multimedia en WebP

**Todas las imágenes del sitio están en formato `.webp`.** La conversión desde los `.jpg`/`.png` originales redujo el peso total de imágenes de **13.24 MB a 1.41 MB (−89%)**, con mayor impacto en los fondos a pantalla completa (`bg-diagram`, `bg-services`, `bg-servicio-*`), que pasaron de ~2.5 MB a menos de 250 KB cada uno.

Criterios de codificación aplicados:

- **Fotografías, renders y fondos** → WebP con pérdida, calidad 82.
- **Logotipos** (`logo-ignosi`, `clientes*`, `aliados*`) → WebP *near-lossless*, para que el texto y las líneas finas de cada marca queden sin artefactos.
- **Videos `.mp4`** (`hero_inicio`, `hero_quienes-somos`) → **no se tocan**; WebP es un formato de imagen y no aplica.

Al añadir una imagen nueva: convertirla a `.webp` antes de commitearla, guardarla en `assets/images/` y referenciarla con ruta relativa. No se admiten URLs externas (ver *Sin dependencias de red* abajo).

### Responsividad mobile-first

El sitio está verificado en 360px, 390px, 768px, 820px y 1400px de ancho, en las cuatro páginas, sin desbordamiento horizontal.

La adaptación se resuelve con el sistema nativo de Bootstrap:

- **Columnas**: `col-12 col-md-6` en servicios y `col-md-4` en las cuadrículas de tarjetas — todo colapsa a una sola columna por debajo de `md`.
- **Espaciado escalonado**: `p-4 p-md-5` en tarjetas y columnas, para que el padding no ahogue el contenido en pantallas chicas.
- **Hero**: `min-vh-100` en lugar de alturas fijas en píxeles.
- **Navbar**: `navbar-expand-lg` colapsa el menú tras el botón hamburguesa por debajo de `lg`.

Solo se usan `@media` propias donde el componente es a medida y Bootstrap no tiene utilidad equivalente: escala tipográfica (`ig-display`, `ig-headline-*`), espaciados fuera de la escala de Bootstrap (`ig-section-py`, `ig-py-24`, `ig-gap-20`), altura de las imágenes de servicios (`ig-service-img`: 220px → 350px) y altura de la cinta de logos (`ig-marquee-shell`: 110px → 150px). Todas están agrupadas al final de `css/styles.css` en dos bloques (`min-width: 768px` y `min-width: 992px`), siguiendo el enfoque mobile-first.

### Tipografías autoalojadas

Cuatro familias, **sin `<link>` a `fonts.googleapis.com`**: Karla (texto base), Playfair Display (serif de titulares), JetBrains Mono (etiquetas monoespaciadas) y Material Symbols Outlined (iconografía). Los 17 archivos `.woff2` viven en `assets/fonts/` y se declaran en `css/fonts.css`.

Los iconos se usan como `<span class="material-symbols-outlined">nombre_del_icono</span>`.

Si cambian las familias o pesos, hay que regenerar los `@font-face` y descargar los `.woff2` correspondientes: **cada peso es un archivo distinto**, no se ajusta "a mano".

### Sin dependencias de red

El sitio no debe tener ningún `<link>`, `url()` o `src` apuntando a un dominio externo: ni CDNs, ni Google Fonts, ni imágenes remotas. Todo se sirve desde el propio repositorio.

## Convenciones de código

- **Sin comentarios en el código.** `.html`, `.css` y `.js` se mantienen limpios; la documentación vive en este README y en `CLAUDE.md`. El código debe ser autodescriptivo.
- **Indentación**: 2 espacios, por nivel de anidación, con una línea en blanco entre bloques `<section>` para poder ubicarlos de un vistazo.
- **CSS**: clases propias siempre en `kebab-case` con prefijo `ig-`. Los selectores que comparten estilos se agrupan en una sola regla.
- **JavaScript**: `camelCase` para variables y funciones. Sin código muerto.
- **Idioma del contenido**: español (México), tono corporativo y técnico.
- **Estilos inline**: se admiten solo para valores puntuales que Bootstrap no puede expresar y que se usan **una sola vez** (por ejemplo, el color de un overlay `rgba()`). Si un mismo estilo inline se repite en dos o más lugares, debe convertirse en una clase `ig-*`.

## Documentación relacionada

- [CHANGELOG.md](CHANGELOG.md) — historial de cambios del proyecto.
- [CLAUDE.md](CLAUDE.md) — reglas de desarrollo y contexto para trabajar el repo con agentes de IA.
- [assets/images/README.md](assets/images/README.md) — inventario de imágenes y su procedencia.
