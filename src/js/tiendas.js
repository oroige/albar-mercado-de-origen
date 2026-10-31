import { openStatus } from './main.js';

// Abierta o cerrada ahora mismo, con la hora del navegador.
const stores = JSON.parse(document.getElementById('stores-data').textContent);
for (const s of stores) {
  const el = document.querySelector(`[data-store="${s.id}"] [data-status]`);
  if (!el) continue;
  const st = openStatus(s.hours);
  el.textContent = st.text;
  el.className = `store__status open ${st.open ? 'open--yes' : 'open--no'}`;
}
