import { reducedMotion, pic, openStatus } from './main.js';
import { season, MONTHS } from '../data/season.js';

/* ---------- Intro ---------- */
const hero = document.querySelector('.hero');
const video = document.querySelector('[data-hero-video]');

const today = new Date();
document.querySelectorAll('[data-today]').forEach((el) => {
  el.textContent = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
});

// La coreografía de entrada solo con movimiento permitido.
if (!reducedMotion.matches) document.body.classList.add('intro-run');

// El vídeo de fondo arranca siempre al entrar; el botón permite pararlo (WCAG 2.2.2).
// Se carga cuando la página ya ha pintado; el póster cubre mientras tanto.
const toggle = document.querySelector('[data-video-toggle]');
let userPaused = false;
const setToggle = (playing) => {
  toggle.setAttribute('aria-pressed', String(!playing));
  toggle.setAttribute('aria-label', playing ? 'Pausar el vídeo de fondo' : 'Reproducir el vídeo de fondo');
  toggle.dataset.state = playing ? 'playing' : 'paused';
};
const play = () => video.play().then(() => setToggle(true)).catch(() => setToggle(false));
const start = () => {
  video.preload = 'auto';
  video.autoplay = true;
  play();
};
if (document.readyState === 'complete') start();
else addEventListener('load', start, { once: true });
toggle.addEventListener('click', () => {
  if (video.paused) {
    userPaused = false;
    play();
  } else {
    userPaused = true;
    video.pause();
    setToggle(false);
  }
});
// Pausa fuera de pantalla para no gastar batería; al volver, sigue salvo que se haya pausado a mano.
new IntersectionObserver(([e]) => {
  if (!e.isIntersecting) video.pause();
  else if (!userPaused && video.preload === 'auto') play();
}).observe(hero);

/* ---------- Temporada: lee la fecha de quien visita ---------- */
const block = document.querySelector('[data-season]');
const plate = block.querySelector('[data-plate]');
const tabsEl = block.querySelector('[data-tabs]');
const panel = block.querySelector('[data-panel]');
const picksEl = block.querySelector('[data-picks]');
const pickEl = block.querySelector('[data-pick]');

const current = today.getMonth();
const months = [current, (current + 1) % 12, (current + 2) % 12];
let month = current;
let index = 0;

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function renderTabs() {
  tabsEl.innerHTML = months
    .map((m) => {
      const sel = m === month;
      return `<button role="tab" id="tab-${m}" aria-controls="season-panel" aria-selected="${sel}" tabindex="${sel ? 0 : -1}">${MONTHS[m]}${m === current ? '<span class="sr"> (este mes)</span>' : ''}</button>`;
    })
    .join('');
  panel.setAttribute('aria-labelledby', `tab-${month}`);
}

function plateHtml(item) {
  if (item.photo) return pic(item.photo, `${item.name}, de ${item.place}`, '(min-width: 48em) 46vw, 100vw');
  return `<div class="plate__type"><p class="plate__type-meta">Albarán de temporada · ${MONTHS[month]}</p><p class="plate__type-name">${escapeHtml(item.name)}</p><p class="plate__type-meta">${escapeHtml(item.finca)} · ${escapeHtml(item.place)} · ${item.km} km</p></div>`;
}

function swap(el, html, instant) {
  if (instant) {
    el.innerHTML = html;
    return;
  }
  el.classList.add('is-swapping');
  setTimeout(() => {
    el.innerHTML = html;
    requestAnimationFrame(() => el.classList.remove('is-swapping'));
  }, 160);
}

// Desde el teclado el cambio es inmediato: una animación ahí solo retrasa.
function renderPick(animate = true, instant = false) {
  const items = season[month];
  const item = items[index];
  picksEl.innerHTML = items
    .map((it, i) => `<button type="button" aria-pressed="${i === index}" data-i="${i}">${escapeHtml(it.name)}</button>`)
    .join('');
  const html = `<h3 class="pick__name" style="margin-top:2rem">${escapeHtml(item.name)}</h3>
    <p class="pick__note">${escapeHtml(item.note)}</p>
    <dl class="pick__fields">
      <div class="field"><dt>Finca</dt><dd>${escapeHtml(item.finca)}</dd></div>
      <div class="field"><dt>Dónde</dt><dd>${escapeHtml(item.place)}</dd></div>
      <div class="field"><dt>Distancia</dt><dd>${item.km} km</dd></div>
    </dl>`;
  if (animate) {
    swap(pickEl, html, instant);
    swap(plate, plateHtml(item), instant);
  } else {
    pickEl.innerHTML = html;
    plate.innerHTML = plateHtml(item);
  }
}

renderTabs();
renderPick(false);

tabsEl.addEventListener('click', (e) => {
  const b = e.target.closest('[role="tab"]');
  if (!b) return;
  month = Number(b.id.slice(4));
  index = 0;
  renderTabs();
  renderPick();
  tabsEl.querySelector(`#tab-${month}`).focus();
});
// Flechas para moverse entre pestañas (patrón ARIA de tabs).
tabsEl.addEventListener('keydown', (e) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const pos = months.indexOf(month);
  const next = e.key === 'Home' ? 0 : e.key === 'End' ? months.length - 1 : (pos + (e.key === 'ArrowRight' ? 1 : -1) + months.length) % months.length;
  month = months[next];
  index = 0;
  renderTabs();
  renderPick(true, true);
  tabsEl.querySelector(`#tab-${month}`).focus();
});
picksEl.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  index = Number(b.dataset.i);
  renderPick();
});
block.querySelector('[data-next]').addEventListener('click', () => {
  index = (index + 1) % season[month].length;
  renderPick();
});

/* ---------- Origen: el albarán se rellena con el scroll ---------- */
const story = document.querySelector('[data-story]');
if (story && 'IntersectionObserver' in window && matchMedia('(min-width: 64em)').matches) {
  const fields = story.querySelectorAll('[data-step]');
  const fill = (step) => fields.forEach((f) => f.classList.toggle('is-filled', Number(f.dataset.step) <= step));
  fill(-1);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) fill(Number(e.target.dataset.stepTrigger));
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  story.querySelectorAll('[data-step-trigger]').forEach((el) => io.observe(el));
} else if (story) {
  story.querySelectorAll('[data-step]').forEach((f) => f.classList.add('is-filled'));
}

/* ---------- Buscador de tiendas ---------- */
const stores = JSON.parse(document.getElementById('stores-data').textContent);
const form = document.querySelector('[data-finder]');
const list = document.querySelector('[data-finder-list]');
const count = document.querySelector('[data-finder-count]');
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
// Prefijos de código postal por provincia, y nombres alternativos de ciudad.
const ALIASES = { madrid: ['28'], valencia: ['46', 'valencia'], barcelona: ['08'], bilbao: ['48', 'bizkaia', 'vizcaya'], donostia: ['20', 'san sebastian', 'gipuzkoa'], sevilla: ['41'] };

function matches(s, q) {
  if (!q) return true;
  const hay = norm([s.name, s.city, s.area, s.address, s.cp].join(' '));
  if (hay.includes(q)) return true;
  const alias = ALIASES[norm(s.city)] || [];
  return alias.some((a) => (/^\d+$/.test(a) ? q.startsWith(a) : a.includes(q) || q.includes(a)));
}

function renderStores(q = '') {
  const nq = norm(q);
  const found = stores.filter((s) => matches(s, nq));
  if (!found.length) {
    count.textContent = `No hay ninguna tienda Albar en «${q}» todavía.`;
    list.innerHTML = `<li class="finder__empty">Estamos en Madrid, València, Barcelona, Bilbao, Donostia y Sevilla. <a class="link" href="tiendas.html">Ver las siete tiendas</a>. Si vives en Madrid, Barcelona o València también te lo llevamos a casa.</li>`;
    return;
  }
  count.textContent = nq ? `${found.length === 1 ? 'Una tienda' : `${found.length} tiendas`} para «${q}»` : 'Las siete tiendas';
  list.innerHTML = found
    .map((s) => {
      const st = openStatus(s.hours);
      return `<li class="finder__item"><a href="tiendas.html#${s.id}"><b>${s.name}</b><span class="city">${s.city} · ${s.area}</span><span class="addr">${s.address}, ${s.cp}</span><span class="open ${st.open ? 'open--yes' : 'open--no'}">${st.text}</span></a></li>`;
    })
    .join('');
}
renderStores();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderStores(form.q.value);
});
form.q.addEventListener('input', () => renderStores(form.q.value));

/* ---------- Boletín (sin backend: valida y lo dice) ---------- */
const nl = document.querySelector('[data-newsletter]');
const msg = document.getElementById('nl-msg');
nl.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = nl.email.value.trim();
  if (!nl.email.checkValidity() || !email) {
    nl.email.setAttribute('aria-invalid', 'true');
    msg.textContent = 'Revisa el correo: falta la arroba o el dominio (por ejemplo, nombre@correo.es).';
    nl.email.focus();
    return;
  }
  nl.email.removeAttribute('aria-invalid');
  msg.textContent = `Apuntado. La próxima hoja sale el primer lunes del mes a ${email}. (Web de demostración: no se ha enviado nada.)`;
  nl.reset();
});
