# assets/images

Imágenes usadas por `index.html`, autoalojadas (ya no dependen de una CDN externa):

- `hero_inicio.mp4` — video de fondo en loop del Hero principal de `index.html` (renombrado desde `convierte_la_imagen_en_un_vide.mp4`), reemplaza al antiguo carrusel de imágenes `hero-server-room-*.jpg` (eliminadas).
- `about-engineer-rack.jpg` — fotografía de la sección "Acerca de".
- `bg-diagram.jpg` — fondo oscuro tipo diagrama para la sección "Banner" intermedia de `index.html` (fondo fijo/parallax vía `.ig-banner-bg` en `css/styles.css`).
- `bg-services.jpg` — fondo minimalista de la sección "Nuestros Servicios" de `index.html`, visible en los gutters entre las tarjetas del grid.
- `logo-ignosi.png` — logo de la marca en el header (438×150px, con transparencia).
- `service-redes-comunicaciones.png` — render 3D isométrico de topología de red corporativa para la sección "Redes y Comunicaciones" (`servicios/index.html`).
- `service-seguridad-informatica.png` — render 3D de cúpula de seguridad perimetral y escudos de protección para "Seguridad Informática" (`servicios/index.html`).
- `service-seguridad-electronica.png` — render 3D isométrico de videovigilancia CCTV y control de acceso para "Seguridad Electrónica" (`servicios/index.html`).
- `service-cableado-estructurado.png` — render 3D de cableado estructurado en data center para "Cableado Estructurado" (Panduit, Charofil, Linkedpro) (`servicios/index.html`).
- `service-servidores.png` — render 3D de rack de servidores corporativo y virtualización para "Servidores" (APC, Tripp-Lite) (`servicios/index.html`).
- `service-cloud.png` — render 3D de transición e infraestructura híbrida multi-nube para "Cloud" (Microsoft Azure, AWS, Veeam) (`servicios/index.html`).
- `service-equipo-computo.jpg` — fotografía y render de hardware corporativo y periféricos para "Equipo de Cómputo y Accesorios" (Dell, HP, Lenovo, Logitech, Western Digital) (`servicios/index.html`).
- `service-soporte-tecnico.jpg` — fotografía y visualización holográfica de operaciones NOC para "Soporte Técnico" (`servicios/index.html`).

`about-engineer-rack.jpg` se descargó de la misma URL de `lh3.googleusercontent.com` que usaba la maqueta original (placeholder generado por la herramienta de diseño, 512×279px). Es de **baja resolución** — antes de producción hay que reemplazarla por fotografía propia en mayor resolución, manteniendo el mismo nombre de archivo (o actualizando la ruta `src` correspondiente en `index.html`).

`logo-ignosi.png` se descargó del archivo de logo provisto por el usuario (`img1.wsimg.com`). En `index.html` se muestra con la clase `.ig-header-logo` (`css/styles.css`), que fija su alto a 40px manteniendo la proporción — es la única clase `ig-*` que usa el `<header>` (ver la excepción documentada en `CLAUDE.md`).
