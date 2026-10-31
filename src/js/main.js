// Comportamiento común a las cuatro páginas.

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// Revelado al entrar en pantalla: se activa una vez por elemento.
// El contenido es visible sin JS; la clase .js en <html> es la que lo oculta antes de animar.
export function initReveal(root = document) {
  const items = root.querySelectorAll('[data-reveal]:not(.is-in)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
}

// <picture> para contenido generado en el navegador. Todas las fotos tienen versiones de 640, 1280 y 1920 px.
export function pic(name, alt, sizes = '100vw', pos = '') {
  const set = (ext) => [640, 1280, 1920].map((w) => `media/${name}-${w}.${ext} ${w}w`).join(', ');
  const style = pos ? ` style="object-position:${pos}"` : '';
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="media/${name}-1280.webp" width="1280" height="1280" alt="${alt}"${style} decoding="async"></picture>`;
}

// Estado de apertura de una tienda según la hora local.
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const DAY_NAMES = ['el domingo', 'el lunes', 'el martes', 'el miércoles', 'el jueves', 'el viernes', 'el sábado'];
export function openStatus(hours, now = new Date()) {
  const d = now.getDay();
  const t = now.getHours() * 60 + now.getMinutes();
  const today = hours[d];
  if (today && t >= toMin(today[0]) && t < toMin(today[1])) {
    return { open: true, text: `Abierta ahora · cierra a las ${today[1]}` };
  }
  if (today && t < toMin(today[0])) return { open: false, text: `Cerrada · abre hoy a las ${today[0]}` };
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7;
    if (hours[nd]) return { open: false, text: `Cerrada · abre ${i === 1 ? 'mañana' : DAY_NAMES[nd]} a las ${hours[nd][0]}` };
  }
  return { open: false, text: 'Cerrada' };
}

initReveal();
