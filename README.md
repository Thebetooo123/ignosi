# IGNOSI Networks — Sitio web

Landing page corporativa de **IGNOSI Networks**, integrador de soluciones tecnológicas y de telecomunicaciones (voz, datos, video, seguridad física y energía respaldada).

## Estructura del proyecto

```
ignosi/
├── index.html               # Página principal (marcado HTML, indentado por secciones)
├── css/
│   ├── vendor/
│   │   ├── bootstrap.min.css      # Bootstrap 5.3.8 (sin modificar)
│   │   └── bootstrap.min.css.map
│   ├── fonts.css             # @font-face autoalojados (Karla, JetBrains Mono, Playfair Display, Material Symbols)
│   └── styles.css            # Tema de marca + estilos propios (ver cabecera del archivo)
├── js/
│   ├── vendor/
│   │   ├── bootstrap.bundle.min.js    # Bootstrap 5.3.8 + Popper (sin modificar)
│   │   └── bootstrap.bundle.min.js.map
│   └── main.js               # Punto de entrada para interactividad propia del sitio
├── assets/
│   ├── fonts/                # Archivos .woff2 referenciados por css/fonts.css
│   └── images/                # Imágenes propias del sitio (ver assets/images/README.md)
├── Ejemplo.html               # Maqueta original de referencia (un solo archivo, versión Tailwind)
├── CHANGELOG.md
├── CLAUDE.md
└── README.md
```

## Stack técnico

- **HTML5** semántico, sin dependencias de red: todo el CSS, JS, tipografías e imágenes se sirven desde el propio proyecto (no hay `<link>`/`url()`/`src` apuntando a un dominio externo).
- **[Bootstrap 5.3.8](https://getbootstrap.com/)** (archivos propios en `css/vendor/` y `js/vendor/`, sin CDN ni `node_modules`). El tema de marca (colores, tipografías `Karla` / `Playfair Display` / `JetBrains Mono`, radios de borde) se aplica reasignando las variables CSS que Bootstrap expone (`--bs-primary`, `--bs-body-color`, `--bs-border-radius`, etc.) en [css/styles.css](css/styles.css), de modo que las clases nativas de Bootstrap (`text-primary`, `btn-primary`, `h1`..`h6`...) ya salen con la identidad de IGNOSI.
- **`js/vendor/bootstrap.bundle.min.js`** aporta la interactividad de componentes de Bootstrap usados en la página (por ahora, el menú de navegación móvil vía el componente Collapse, con atributos `data-bs-toggle`/`data-bs-target`, sin JS propio).
- **Google Fonts** (Karla, JetBrains Mono, Playfair Display) y **Material Symbols Outlined** autoalojados: los `.woff2` viven en `assets/fonts/` y se declaran en [css/fonts.css](css/fonts.css), generado a partir del CSS que serviría `fonts.googleapis.com` para la misma combinación de familias/pesos que usaba la maqueta original.

### Sobre la migración de Tailwind a Bootstrap

El sitio se rediseñó desde una maqueta hecha con Tailwind CSS (`Ejemplo.html`) hacia Bootstrap 5. La mayoría del diseño se tradujo 1:1 a componentes/utilidades nativas de Bootstrap (grid `row`/`col`, `navbar` + `collapse`, `ratio`, `object-fit-*`, utilidades de opacidad vía `--bs-bg-opacity`/`--bs-text-opacity`, etc.). Donde Bootstrap no tiene una solución nativa, se agregaron clases propias con prefijo `ig-` en `css/styles.css` — cada una documentada in situ con la razón (p. ej. escala tipográfica exacta del diseño, anchos máximos de texto en px fijos, `mix-blend-mode`, imagen de fondo con `cover`/`center`, o estados `:hover`, que Bootstrap no genera automáticamente como sí hace Tailwind).

## Cómo verlo en local

No requiere instalación ni dependencias. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
# o
python -m http.server 8000
```

Luego visita `http://localhost:8000` (o el puerto que indique la herramienta elegida).

## Notas

- La imagen `assets/images/about-engineer-rack.jpg` es la misma de la maqueta original, ya descargada, pero sigue siendo de baja resolución (512×279px, pensada como *placeholder*); antes de producción debe reemplazarse por fotografía propia (ver [assets/images/README.md](assets/images/README.md)).
- `Ejemplo.html` se conserva como referencia de la maqueta original en Tailwind, previa a la división en `index.html` + `css/` + `js/` y a la migración a Bootstrap.
- La carpeta `bootstrap-5.3.8-dist/` (el ZIP de distribución oficial) ya no es necesaria: los únicos archivos que el sitio usa (`bootstrap.min.css` y `bootstrap.bundle.min.js`, con sus `.map`) ya están copiados en `css/vendor/` y `js/vendor/`. Puede eliminarse con seguridad.
- Los archivos `.map` (`*.min.css.map`, `*.min.js.map`) son mapas de código fuente para depurar en DevTools; no los carga el navegador salvo que se abran las herramientas de desarrollo, así que tampoco cuentan como "links a internet" — son locales igual que el resto.
- `css/vendor/bootstrap.min.css` y `js/vendor/bootstrap.bundle.min.js` traen, dentro de comentarios de licencia y namespaces XML de sus SVG inline, un puñado de URLs de texto (`getbootstrap.com`, `github.com`, `popper.js.org`, `w3.org/2000/svg`). Ninguna genera una petición de red: son cadenas de texto (el `xmlns` de un SVG no se "carga", es un identificador) dentro de un archivo que ya vive en el proyecto. No se tocaron porque son builds oficiales de Bootstrap sin modificar.

## Documentación relacionada

- [CHANGELOG.md](CHANGELOG.md) — historial de cambios del proyecto.
- [CLAUDE.md](CLAUDE.md) — guía de contexto para trabajar en este repo con Claude Code.
