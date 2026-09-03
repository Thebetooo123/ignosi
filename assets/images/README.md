# assets/images

Multimedia del sitio, autoalojada (sin CDNs ni URLs externas). **Todas las imágenes están en `.webp`**; los videos se mantienen en `.mp4`. Ver la sección *Multimedia en WebP* del [README principal](../../README.md) para los criterios de conversión.

## Videos de fondo

| Archivo | Uso |
|---|---|
| `hero_inicio.mp4` | Video en loop del Hero principal de `index.html` |
| `hero_quienes-somos.mp4` | Video en loop del Hero de `quienes-somos/index.html` |

## Fondos

| Archivo | Uso |
|---|---|
| `bg-features.webp` | Fondo geométrico dorado, fijo tipo parallax: tarjetas de introducción y "Bienvenido a IGNOSI" (`index.html`) y CTA de `quienes-somos/index.html` |
| `bg-diagram.webp` | Diagrama oscuro de infraestructura: banner intermedio de `index.html` y fondo de página completa de `quienes-somos/` y `contacto/` |
| `bg-services.webp` | Fondo minimalista de la cuadrícula "Nuestros Servicios" (`index.html`), visible entre las tarjetas |
| `bg-servicio-impar.webp` | Fondo de las secciones impares de `servicios/index.html` (1, 3, 5, 7) |
| `bg-servicio-par.webp` | Fondo de las secciones pares de `servicios/index.html` (2, 4, 6, 8) |

## Imágenes de servicios

Una por sección de `servicios/index.html`, todas mostradas mediante `.ig-service-img`:

| Archivo | Servicio |
|---|---|
| `service-redes-comunicaciones.webp` | Redes y Comunicaciones (Cisco, Aruba, Ubiquiti, TP-Link) |
| `service-seguridad-informatica.webp` | Seguridad Informática (Fortinet, Check Point, Kaspersky) |
| `service-seguridad-electronica.webp` | Seguridad Electrónica (Hikvision, Dahua, Bosch, ZKTeco) |
| `service-cableado-estructurado.webp` | Cableado Estructurado (Panduit, Charofil, Linkedpro) |
| `service-servidores.webp` | Servidores y virtualización (APC, Tripp-Lite) |
| `service-cloud.webp` | Cloud (Microsoft Azure, AWS, Veeam) |
| `service-equipo-computo.webp` | Equipo de Cómputo (Dell, HP, Lenovo, Logitech, Western Digital) |
| `service-soporte-tecnico.webp` | Soporte Técnico / operaciones NOC |

## Marca y contenido

| Archivo | Uso |
|---|---|
| `logo-ignosi.webp` | Logo del header (`partials/header.html`), dimensionado por `.ig-header-logo` |
| `ImagenCorporativa1.webp` | Fotografía de "Nuestra Esencia" (`quienes-somos/index.html`) |
| `about-engineer-rack.webp` | Fotografía de "Bienvenido a IGNOSI" (`index.html`) |
| `clientes1.webp` … `clientes8.webp` | Logos de clientes, cinta en scroll infinito (`quienes-somos/index.html`) |
| `aliados1.webp` … `aliados9.webp` | Logos de aliados tecnológicos, cinta en scroll infinito (`quienes-somos/index.html`) |

## Notas

- `about-engineer-rack.webp` procede de un *placeholder* de baja resolución (990×279 originales). Antes de producción conviene reemplazarlo por fotografía propia en mayor resolución, manteniendo el nombre de archivo o actualizando el `src` en `index.html`.
- Los logos de clientes y aliados se convirtieron en modo *near-lossless* para conservar nítidas las líneas finas y el texto de cada marca.
- Al añadir una imagen: convertirla a `.webp` antes de commitearla y referenciarla con ruta relativa (`./assets/images/...` desde la raíz, `../assets/images/...` desde una subcarpeta). Nunca con ruta absoluta ni URL externa.
