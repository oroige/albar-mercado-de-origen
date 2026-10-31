# Albar · Sistema de diseño

Sacado de lo que se ha construido (`src/styles/main.css`, `src/render.js`), no de intenciones. Contexto de producto en `PRODUCT.md`.

## Idea
**La página es un albarán.** Desde 1961 Albar exige a cada productor un albarán firmado (finca, kilómetros, hora de cosecha). Toda la web está impresa en esa papelería: la tarjeta de la portada es un albarán taladrado, las categorías son etiquetas colgantes, las ofertas son tiques con muesca y perforación, el buscador es un cupón recortable, la entrega a domicilio es una lista de precios festoneada y las tiendas son resguardos con su plano.

- Dirección de arte: *La página es el objeto* (taste-skill, semilla 2046545614).
- Elemento interactivo: «En temporada» lee la fecha de quien visita y muestra el mes en curso más los dos siguientes, cuatro productos por mes, cada uno con su albarán.

## Color: dos tintas y papel
| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#ffffff` | Papel, fondo de página |
| `--surface` | `#f4f4f4` | Primer escalón: casillas, etiquetas, tiques de tienda |
| `--surface-2` | `#e6e6e6` | Segundo escalón y hover de superficies |
| `--ink` | `#111111` | Texto y campos oscuros (origen, cupón, boletín, pie) |
| `--ink-2` | `#333333` | Texto secundario sobre superficies |
| `--muted` | `#5e5e5e` | Notas y etiquetas de casilla (6,4:1 sobre blanco, 5,8:1 sobre `--surface`) |
| `--accent` | `#1a4be0` | Azul de copia al carbón: enlaces, botón principal, sello «Recibido», campo de ofertas y de valores |
| `--field-muted` | `#b9b9b9` | Texto secundario sobre `--field` (9,7:1) |

Reglas: sin degradados visibles, sin sombras en reposo, sin líneas finas fuera de tablas y formularios. Las superficies se separan con un cambio de tono o un borde troquelado.

## Tipografía
- **Barlow Condensed 700**: rótulos, titulares, precios, cifras. Interlineado de 0,85 a 0,92, tracking −0,02 em (−0,03/−0,04 a tamaño display).
- **Barlow 400/500** (y cursiva 400 para firmas): texto, 1,5 de interlineado y `tabular-nums` en todo el documento.
- Escala fluida: `--step-small` 13–14 px · `--step-body` 17–19 px · `--step-lead` 20–26 px · `--step-head` 40–88 px · `--step-display` 56–168 px.
- Mayúsculas solo en rótulos de objeto (tarjeta de portada, cabeceras de página, nombres de tienda, pregunta del boletín, logotipo del pie).

## Espacio y retícula
- Retícula de 12 columnas, `--gap` de 12 a 24 px y márgenes `--margin` de 16 a 40 px (con `env(safe-area-inset-*)`). Ancho máximo de 1440 px.
- Separación entre secciones con `--section`, de 96 a 192 px.
- Radio 0 en todo. Un único botón: rectángulo plano de 52 px de alto.

## Piezas de papelería
| Pieza | Dónde | Cómo |
| --- | --- | --- |
| Albarán taladrado | Portada | `mask` con agujeros reales de 6 px cada 44 px en el margen izquierdo |
| Casilla (`.field`) | Portada, temporada, historia de origen | Bloque `--surface` con etiqueta pequeña y valor en condensada |
| Etiqueta colgante (`.tag`) | Mostradores | Foto 4:5 y tira de datos; cuatro parejas de color en rotación |
| Tique (`.notched` + `.perf-v`) | Ofertas, tiendas, cupón | Muescas de 28 px en el color del fondo y perforación de puntos de 6 px |
| Hoja festoneada (`.scalloped`) | Albar en casa | Borde ondulado arriba y abajo con máscara; puntos guía de 4 px |
| Plano ilustrado | Tiendas | SVG generado desde `stores.js`: calles reales, chincheta azul y referencia |

## Movimiento
- Curvas: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` y `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)`.
- Intro, solo una vez al cargar: el vídeo aparece; la tarjeta sube; el titular entra palabra a palabra (110 ms entre palabras); las casillas se rellenan con `clip-path`; cae el sello con un leve rebote.
- Momento firma: en la historia de origen, el albarán se queda fijo y sus casillas se rellenan con cada paso del scroll (solo en escritorio).
- Revelados: cada parte de una sección sube 24 px y aparece en 700 ms, con 80 ms de desfase entre partes.
- Paralaje de la intro ligado al scroll (`animation-timeline: scroll()`).
- Feedback: `scale(0.97)` en `:active` y los hovers dentro de `(hover: hover) and (pointer: fine)`.
- Solo se anima `transform`, `opacity` y `clip-path`, con un desenfoque de 4 px en el cambio de producto.
- `prefers-reduced-motion`: sin intro, sin desplazamientos y sin paralaje. Se conservan los fundidos. Desde el teclado, la temporada cambia al instante.
- Vídeo de fondo: arranca siempre al entrar (decisión del cliente), en bucle y sin sonido. Tiene un botón de pausa abajo a la derecha (WCAG 2.2.2) y se para cuando sale de pantalla.

## Imágenes
Fotografía de bodegón: luz natural lateral, fondo oscuro, producto solo. AVIF + WebP a 640/1280/1920 px con `srcset`; solo la intro carga con prioridad. Créditos en `assets/CREDITS.md` y en el pie. Las fotos son de ambiente, no de tiendas ni de productores de Albar.

## Contenido y voz
Español de España, frases cortas, cifras concretas. Todo es ficticio, incluidos teléfonos, correos y precios. Los controles nombran su acción («Ver lo que hay hoy», «Buscar tienda», «Quitar filtros»), y los errores dicen qué falta y cómo arreglarlo.

## Herramientas de desarrollo
- `npm run media` regenera las imágenes y el vídeo.
- En `npm run dev`, el conmutador «Demo / Peor caso» (`?data=worst`) carga los datos extremos de `src/data/worst.js`. No llega al build.
