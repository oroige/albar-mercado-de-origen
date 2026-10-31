import './main.js';

// Filtros del catálogo. Sin JS se ve todo el catálogo; los filtros solo aparecen si funcionan.
const box = document.querySelector('[data-filters]');
const items = [...document.querySelectorAll('[data-products] > li')];
const count = box.querySelector('[data-count]');
const empty = document.querySelector('[data-empty]');
const resets = document.querySelectorAll('[data-reset]');
box.hidden = false;

const params = new URLSearchParams(location.search);
const state = {
  cat: params.get('cat') || '',
  badges: new Set((params.get('f') || '').split(',').filter(Boolean)),
};

function apply() {
  let n = 0;
  for (const li of items) {
    const badges = li.dataset.badges.split(' ');
    const ok = (!state.cat || li.dataset.cat === state.cat) && [...state.badges].every((b) => badges.includes(b));
    li.hidden = !ok;
    if (ok) n++;
  }
  count.textContent = n === 1 ? '1 producto' : `${n} productos`;
  empty.hidden = n > 0;
  const filtered = state.cat || state.badges.size;
  resets[0].hidden = !filtered;

  box.querySelectorAll('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)));
  box.querySelectorAll('[data-badge]').forEach((b) => b.setAttribute('aria-pressed', String(state.badges.has(b.dataset.badge))));

  // La URL guarda el filtro para poder compartirlo.
  const q = new URLSearchParams();
  if (state.cat) q.set('cat', state.cat);
  if (state.badges.size) q.set('f', [...state.badges].join(','));
  history.replaceState(null, '', q.size ? `?${q}` : location.pathname);
}

box.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if ('cat' in b.dataset) state.cat = b.dataset.cat;
  if (b.dataset.badge) state.badges.has(b.dataset.badge) ? state.badges.delete(b.dataset.badge) : state.badges.add(b.dataset.badge);
  apply();
});
resets.forEach((r) =>
  r.addEventListener('click', () => {
    state.cat = '';
    state.badges.clear();
    apply();
    box.querySelector('[data-cat=""]').focus();
  })
);

apply();
