# assets/images

Imágenes usadas por `index.html`, autoalojadas (ya no dependen de una CDN externa):

- `hero-server-room.jpg` — fondo de la sección hero.
- `about-engineer-rack.jpg` — fotografía de la sección "Acerca de".
- `logo-ignosi.png` — logo de la marca en el header (438×150px, con transparencia).

`hero-server-room.jpg` y `about-engineer-rack.jpg` se descargaron de las mismas URLs de `lh3.googleusercontent.com` que usaba la maqueta original (placeholders generados por la herramienta de diseño, 512×279px). Son de **baja resolución** para un fondo a pantalla completa — antes de producción hay que reemplazarlas por fotografía propia en mayor resolución, manteniendo estos mismos nombres de archivo (o actualizando las rutas `src`/`background-image` correspondientes en `index.html`).

`logo-ignosi.png` se descargó del archivo de logo provisto por el usuario (`img1.wsimg.com`). En `index.html` se muestra con la clase `.ig-header-logo` (`css/styles.css`), que fija su alto a 40px manteniendo la proporción — es la única clase `ig-*` que usa el `<header>` (ver la excepción documentada en `CLAUDE.md`).
