# Albar · Mercado de origen

Web de cuatro páginas (Inicio, Catálogo, Tiendas y Nosotros) para una cadena ficticia de supermercados de producto de origen. Su norma: ningún producto entra sin el albarán firmado por quien lo cultiva, y ese albarán es el sistema visual de toda la web.

**Verla:** https://oroige.github.io/albar-mercado-de-origen/

- Vite con plantillas propias en el build (`vite.config.js`, `src/render.js`).
- Catálogo con filtros por mostrador y etiquetas y precio por kilo; tiendas con horario y estado «abierta ahora».
- `npm run media` genera las imágenes AVIF y WebP a tres anchos y el vídeo de la portada con Sharp y ffmpeg.
- Lighthouse en móvil: 99–100 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO en las cuatro páginas.

Marca, tiendas, productores, precios y textos son inventados. Fotografías y vídeo: ver `assets/CREDITS.md`.

## En local

```bash
npm install
npm run dev
```
