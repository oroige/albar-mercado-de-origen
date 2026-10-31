// Plantillas que se ejecutan en el build (plugin de Vite). Devuelven HTML estático:
// la página funciona sin JavaScript y el JS solo añade filtros e interacción.
import media from './data/media.json' with { type: 'json' };
import { categories, products, BADGE_LABEL, money } from './data/products.js';
import { stores, hoursRows } from './data/stores.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function pic({ name, alt, sizes = '100vw', cls = '', pos = '', eager = false, ratio = '' }) {
  const m = media[name];
  if (!m) throw new Error(`Imagen desconocida: ${name}`);
  const set = (ext) => m.widths.map((w) => `media/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `media/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  const h = Math.round((m.h / m.w) * 1280);
  const style = [pos && `object-position:${pos}`, ratio && `aspect-ratio:${ratio}`].filter(Boolean).join(';');
  return `<picture class="${esc(cls)}"><source type="image/avif" srcset="${set('avif')}" sizes="${esc(sizes)}"><source type="image/webp" srcset="${set('webp')}" sizes="${esc(sizes)}"><img src="${fallback}" width="1280" height="${h}" alt="${esc(alt)}"${style ? ` style="${style}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

const NAV = [
  ['index', './', 'Inicio'],
  ['catalogo', 'catalogo.html', 'Catálogo'],
  ['tiendas', 'tiendas.html', 'Tiendas'],
  ['nosotros', 'nosotros.html', 'Nosotros'],
];

export function header(page) {
  const links = NAV.slice(1)
    .map(([id, href, label]) => `<li><a href="${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a></li>`)
    .join('');
  return `<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header${page === 'index' ? ' site-header--over' : ''}">
  <div class="wrap site-header__in">
    <a class="wordmark" href="./" aria-label="Albar, inicio">${wordmarkSvg()}</a>
    <nav aria-label="Principal"><ul class="nav">${links}</ul></nav>
    <a class="site-header__cta" href="tiendas.html">Tu tienda</a>
  </div>
</header>`;
}

export function wordmarkSvg() {
  // Logotipo dibujado: la palabra ALBAR con el trazo de firma del albarán debajo.
  return `<svg class="wordmark__svg" viewBox="0 0 132 40" aria-hidden="true" focusable="false"><text x="0" y="27" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="32" letter-spacing="-0.5" fill="currentColor">ALBAR</text><path d="M2 35 C 20 30, 34 39, 52 34 S 86 31, 104 35" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`;
}

const CREDITS = [
  ['Tomates en la mata (vídeo)', 'Leslie Rowe'], ['Tomates', 'Karyna Panchenko'], ['Caballa', 'jd garrett'], ['Jamones', 'Anatolii Maks'],
  ['Quesos', 'Magda Ehlers'], ['Pan', 'Oktay Köseoğlu'], ['Aceite', 'Rahime Gül'], ['Legumbres', 'Ivett M'], ['Bodega', 'Ian Ramírez'],
  ['Caqui', 'Elena Aellgie'], ['Setas', 'Leeloo The First'], ['Castañas', 'Ana Vieira'], ['Bodegón', 'Matvei'], ['Tomatera', 'Cafer Sevinç'],
  ['Recolección', 'syd.trgt'], ['Furgoneta', 'Mathias Reding'], ['Aceituna', 'Chermiti Mohamed'], ['Olivar', 'Petra Nesti'],
  ['Barco', 'David Kanigan'], ['Bolsa', 'SU JI'],
];

export function footer() {
  const places = stores
    .map((s) => `<li><a href="tiendas.html#${s.id}">${s.name}<span>, ${s.city}</span></a></li>`)
    .join('');
  return `<footer class="site-footer" id="pie">
  <div class="wrap">
    <p class="site-footer__name" aria-hidden="true">Albar</p>
    <div class="site-footer__row">
      <div>
        <h2 class="site-footer__h">Siete tiendas</h2>
        <ul class="site-footer__places">${places}</ul>
      </div>
      <div class="site-footer__cols">
        <div><h2 class="site-footer__h">Comprar</h2><ul><li><a href="catalogo.html">Catálogo</a></li><li><a href="catalogo.html?f=oferta">Ofertas de la semana</a></li><li><a href="#temporada">Temporada</a></li><li><a href="#entrega">Entrega a domicilio</a></li></ul></div>
        <div><h2 class="site-footer__h">Albar</h2><ul><li><a href="nosotros.html">Historia</a></li><li><a href="nosotros.html#proveedores">Proveedores</a></li><li><a href="nosotros.html#equipo">Equipo</a></li><li><a href="mailto:empleo@albarmercado.es">Trabaja con nosotros</a></li></ul></div>
        <div><h2 class="site-footer__h">Atención</h2><ul><li><a href="tel:+34900461961">900 461 961</a></li><li><a href="mailto:hola@albarmercado.es">hola@albarmercado.es</a></li><li>De lunes a sábado, de 9:00 a 20:00</li></ul></div>
      </div>
    </div>
    <details class="site-footer__credits">
      <summary>Créditos de fotografía</summary>
      <p>Fotografía y vídeo de Pexels, bajo la licencia de Pexels: ${CREDITS.map(([w, a]) => `${w}, ${a}`).join(' · ')}. Tipografía Barlow, SIL Open Font License.</p>
    </details>
    <div class="site-footer__legal">
      <p>© 2026 Albar Mercado de Origen, S. L. Proyecto de demostración: marca, tiendas y precios son ficticios.</p>
      <a href="#top">Volver arriba</a>
    </div>
  </div>
</footer>`;
}

export function categoryTiles() {
  return categories
    .map(
      (c, i) => `<li class="tag tag--${i % 4}">
  <a href="catalogo.html?cat=${c.id}" class="tag__link">
    ${pic({ name: c.photo, alt: '', sizes: '(min-width: 64em) 24vw, 48vw', cls: 'tag__pic' })}
    <span class="tag__strip">
      <span class="tag__name">${c.name}</span>
      <span class="tag__vals"><span>${c.producers} productores</span><span>${c.km} km de media</span><span class="tag__opt">${c.refs} referencias</span></span>
      <span class="tag__vals tag__opt"><span>${c.daily}</span><span>${c.counter}</span></span>
    </span>
  </a>
</li>`
    )
    .join('');
}

const perUnit = (p) => `${money(p.perUnit)}/${p.unit}`;

export function productCards(list = products) {
  return list
    .map(
      (p, i) => `<li class="product" data-cat="${p.cat}" data-badges="${p.badges.join(' ')}" data-reveal style="--i:${i % 4}">
  <article class="product__in">
    ${pic({ name: p.photo, alt: p.name, sizes: '(min-width: 80em) 22vw, (min-width: 48em) 31vw, 48vw', cls: 'product__pic', pos: p.pos })}
    ${p.badges.length ? `<ul class="badges" aria-label="Distintivos">${p.badges.map((b) => `<li class="badge badge--${b}">${BADGE_LABEL[b]}</li>`).join('')}</ul>` : ''}
    <div class="product__strip">
      <h3 class="product__name">${esc(p.name)}</h3>
      <p class="product__origin" title="${esc(p.producer)} · ${esc(p.origin)}">${esc(p.producer)} · ${esc(p.origin)}</p>
      <p class="product__price"><span class="product__now">${money(p.price)}</span>${p.was ? `<s class="product__was"><span class="sr">Antes </span>${money(p.was)}</s>` : ''}<span class="product__unit">${perUnit(p)}</span></p>
      <p class="product__format">${esc(p.format)}</p>
    </div>
  </article>
</li>`
    )
    .join('');
}

export function storeMap(s, title = true) {
  const m = s.map;
  const streets = m.streets
    .map((st) => {
      const closed = st.d.endsWith('Z');
      return `<path d="${st.d}" class="map__street${st.main ? ' map__street--main' : ''}${closed ? ' map__plaza' : ''}"/>`;
    })
    .join('');
  const labels = m.streets
    .map((st, i) => {
      const nums = st.d.match(/-?\d+(\.\d+)?/g).map(Number);
      const [x1, y1, x2, y2] = nums;
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      const a = angle > 90 || angle < -90 ? angle + 180 : angle;
      const cx = x1 + (x2 - x1) * (st.main ? 0.82 : 0.68);
      const cy = y1 + (y2 - y1) * (st.main ? 0.82 : 0.68);
      return `<text x="${cx}" y="${cy}" class="map__label${st.main ? ' map__label--main' : ''}" transform="rotate(${a.toFixed(1)} ${cx} ${cy})" dy="-10">${esc(st.name)}</text>`;
    })
    .join('');
  const [px, py] = m.pin;
  const [lx, ly] = m.landmark.at;
  return `<svg class="map" viewBox="0 0 400 300" role="img" aria-labelledby="map-${s.id}">
  ${title ? `<title id="map-${s.id}">Plano de la tienda Albar ${esc(s.name)}: ${esc(s.address)}, junto a ${esc(m.landmark.label)}</title>` : ''}
  <rect width="400" height="300" class="map__ground"/>
  <g class="map__blocks">${streets}</g>
  ${labels}
  <circle cx="${lx}" cy="${ly}" r="7" class="map__landmark"/><text x="${lx > 240 ? lx - 12 : lx + 12}" y="${ly + 5}"${lx > 240 ? ' text-anchor="end"' : ''} class="map__label map__label--lm">${esc(m.landmark.label)}</text>
  <g class="map__pin" transform="translate(${px} ${py})"><rect x="-38" y="-46" width="76" height="30" class="map__pin-box"/><path d="M-7 -16 L0 -6 L7 -16 Z" class="map__pin-box"/><text x="0" y="-26" text-anchor="middle" class="map__pin-text">Albar</text><circle r="5" class="map__pin-dot"/></g>
</svg>`;
}

export function storeTickets(list = stores) {
  return list
    .map((s) => {
      const rows = hoursRows(s.hours)
        .map((r) => `<tr><th scope="row">${r.days}</th><td>${r.time}</td></tr>`)
        .join('');
      return `<li class="store" id="${s.id}" data-store="${s.id}" data-reveal>
  <article class="store__ticket notched">
    <div class="store__main">
      <h2 class="store__name">${esc(s.name).replace(/ ([–—-]) /g, ' $1 ')}</h2>
      <p class="store__addr">${esc(s.address)}<br>${s.cp} ${s.city} · ${s.area} · desde ${s.since}</p>
      <p class="store__status" data-status aria-live="polite"></p>
      ${s.note ? `<p class="store__note">${esc(s.note)}</p>` : ''}
      <table class="hours"><caption class="sr">Horario de ${s.name}</caption><tbody>${rows}</tbody></table>
      <h3 class="store__h">Servicios</h3>
      <ul class="services">${s.services.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p class="store__links"><a href="tel:+34${s.phone.replace(/\s/g, '')}">${s.phone}</a><a href="https://www.openstreetmap.org/search?query=${encodeURIComponent(`${s.address}, ${s.cp} ${s.city}`)}" rel="noopener" target="_blank">Cómo llegar<span class="sr"> a ${s.name} (abre OpenStreetMap)</span></a></p>
    </div>
    <div class="store__stub">${storeMap(s)}<div class="store__local">${pic({ name: s.local.photo, alt: s.local.alt, sizes: '(min-width: 64em) 14vw, 40vw' })}<p>${esc(s.local.text)}</p></div></div>
  </article>
</li>`;
    })
    .join('');
}

// JSON mínimo de tiendas para el buscador de la portada.
export const storesJson = (list = stores) =>
  JSON.stringify(list.map(({ id, name, city, area, address, cp, hours, services }) => ({ id, name, city, area, address, cp, hours, services })));
