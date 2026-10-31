import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Sustituye marcadores en el HTML por plantillas renderizadas en el build:
//   <!--@header:catalogo-->  <!--@footer-->  <!--@categories-->  <!--@products-->  <!--@stores-->  <!--@storesjson-->
//   <x-pic name="tomates" alt="…" sizes="…" class="…" pos="…" eager></x-pic>
function albarTemplates() {
  const load = () => import(`${pathToFileURL(resolve('src/render.js')).href}?t=${Date.now()}`);
  const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? true]));
  let lastUrl = '';
  return {
    name: 'albar-templates',
    configureServer(server) {
      // Vite no siempre pasa la query al transformar HTML: la guardamos aquí para el conmutador de datos.
      server.middlewares.use((req, _res, next) => {
        if (/\.html|\/$|\/\?/.test(req.url)) lastUrl = req.url;
        next();
      });
    },
    async transformIndexHtml(html, ctx) {
      const r = await load();
      // Prueba de estrés, solo en desarrollo: ?data=worst cambia los datos en su origen.
      const worst = !!ctx.server && /[?&]data=worst(&|$)/.test(`${ctx.originalUrl || ''} ${lastUrl}`.split(' ').find((u) => u.includes('?')) || '');
      const w = worst ? await import(`${pathToFileURL(resolve('src/data/worst.js')).href}?t=${Date.now()}`) : null;
      const toggle = ctx.server
        ? `<nav aria-label="Datos de prueba" style="position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:999;display:flex;gap:2px;padding:3px;background:#ddd;font:500 13px system-ui"><a href="?" style="padding:6px 10px;text-decoration:none;color:#111;background:${worst ? 'transparent' : '#fff'}">Demo</a><a href="?data=worst" style="padding:6px 10px;text-decoration:none;color:#111;background:${worst ? '#fff' : 'transparent'}">Peor caso</a></nav>`
        : '';
      return html
        .replace('</body>', `${toggle}</body>`)
        .replace(/<!--@header:(\w+)-->/g, (_, page) => r.header(page))
        .replace('<!--@footer-->', r.footer())
        .replace('<!--@categories-->', r.categoryTiles())
        .replace('<!--@products-->', r.productCards(w?.worstProducts))
        .replace('<!--@stores-->', r.storeTickets(w?.worstStores))
        .replace('<!--@storesjson-->', `<script type="application/json" id="stores-data">${r.storesJson(w?.worstStores)}</script>`)
        .replace(/<x-pic\s([^>]*)><\/x-pic>/g, (_, a) => {
          const o = attrs(a);
          return r.pic({ name: o.name, alt: o.alt ?? '', sizes: o.sizes, cls: o.class ?? '', pos: o.pos ?? '', eager: !!o.eager, ratio: o.ratio ?? '' });
        });
    },
    handleHotUpdate({ file, server }) {
      if (/src[\\/](render\.js|data[\\/])/.test(file)) server.ws.send({ type: 'full-reload' });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [albarTemplates()],
  build: {
    rollupOptions: {
      input: {
        index: resolve('index.html'),
        catalogo: resolve('catalogo.html'),
        tiendas: resolve('tiendas.html'),
        nosotros: resolve('nosotros.html'),
      },
    },
  },
});
