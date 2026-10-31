// Catálogo de ejemplo. Precios en euros; unit = unidad de referencia del precio por medida.
export const categories = [
  { id: 'fruta-verdura', name: 'Fruta y verdura', photo: 'tomates', producers: 41, km: 63, refs: 214, bio: '38 %', daily: 'Entra cada mañana', counter: 'Mostrador y libre servicio' },
  { id: 'pescaderia', name: 'Pescadería', photo: 'pescado', producers: 12, km: 88, refs: 46, bio: 'Lonja', daily: 'Subasta del día', counter: 'Mostrador' },
  { id: 'charcuteria', name: 'Charcutería', photo: 'jamon', producers: 17, km: 142, refs: 96, bio: '12 %', daily: 'Al corte', counter: 'Mostrador' },
  { id: 'queseria', name: 'Quesería', photo: 'quesos', producers: 23, km: 117, refs: 130, bio: '21 %', daily: 'Afinado en cámara', counter: 'Mostrador' },
  { id: 'panaderia', name: 'Panadería', photo: 'pan', producers: 6, km: 9, refs: 34, bio: '50 %', daily: 'Hornadas 8:00 y 18:00', counter: 'Horno propio' },
  { id: 'despensa', name: 'Aceites y conservas', photo: 'aceite', producers: 38, km: 210, refs: 312, bio: '27 %', daily: 'Lotes con fecha', counter: 'Libre servicio' },
  { id: 'granel', name: 'Legumbres a granel', photo: 'legumbres', producers: 14, km: 176, refs: 58, bio: '61 %', daily: 'Cosecha del año', counter: 'Granel' },
  { id: 'bodega', name: 'Bodega', photo: 'vino', producers: 61, km: 190, refs: 604, bio: '33 %', daily: 'Cata los viernes', counter: 'Bodega' },
];

// badges: bio | km0 | nuevo | oferta
export const products = [
  { id: 'tomate-rosa', name: 'Tomate rosa de Barbastro', cat: 'fruta-verdura', producer: 'Huerta Lasierra', origin: 'Barbastro, Huesca', format: 'Granel', price: 4.2, unit: 'kg', perUnit: 4.2, badges: ['km0'], photo: 'tomates', pos: '50% 40%' },
  { id: 'tomate-rama', name: 'Tomate de rama', cat: 'fruta-verdura', producer: 'Huerta de los Almendros', origin: 'Aranjuez, Madrid', format: 'Racimo de 1 kg aprox.', price: 3.1, unit: 'kg', perUnit: 3.1, badges: ['km0', 'bio'], photo: 'tomatera', pos: '50% 50%' },
  { id: 'caqui', name: 'Caqui Rojo Brillante', cat: 'fruta-verdura', producer: 'Cooperativa de la Ribera', origin: 'Carlet, València', format: 'Caja de 1 kg', price: 2.49, was: 2.95, unit: 'kg', perUnit: 2.49, badges: ['oferta'], photo: 'caqui', pos: '50% 45%' },
  { id: 'niscalo', name: 'Níscalo de pinar', cat: 'fruta-verdura', producer: 'Recolectores de Pinares', origin: 'Covaleda, Soria', format: 'Bandeja de 400 g', price: 7.6, unit: 'kg', perUnit: 19.0, badges: ['nuevo'], photo: 'setas', pos: '40% 50%' },
  { id: 'castana', name: 'Castaña gallega', cat: 'fruta-verdura', producer: 'Souto de Rubiá', origin: 'Rubiá, Ourense', format: 'Malla de 500 g', price: 3.95, unit: 'kg', perUnit: 7.9, badges: ['bio', 'nuevo'], photo: 'castanas', pos: '50% 50%' },
  { id: 'granada', name: 'Granada Mollar de Elche', cat: 'fruta-verdura', producer: 'Finca El Pantano', origin: 'Elche, Alicante', format: 'Pieza de 400 g aprox.', price: 3.4, unit: 'kg', perUnit: 3.4, badges: [], photo: 'bodegon', pos: '28% 60%' },
  { id: 'caballa', name: 'Caballa del Cantábrico', cat: 'pescaderia', producer: 'Lonja de Santoña', origin: 'Santoña, Cantabria', format: 'Pieza entera, limpia', price: 6.9, unit: 'kg', perUnit: 6.9, badges: [], photo: 'pescado', pos: '50% 30%' },
  { id: 'jamon', name: 'Jamón de bellota 100 % ibérico, 36 meses', cat: 'charcuteria', producer: 'Secadero Valdelarco', origin: 'Valdelarco, Huelva', format: 'Loncheado a cuchillo, 100 g', price: 14.8, unit: 'kg', perUnit: 148.0, badges: [], photo: 'jamon', pos: '50% 30%' },
  { id: 'queso-oveja', name: 'Queso de oveja curado', cat: 'queseria', producer: 'Quesería Las Arribes', origin: 'Fermoselle, Zamora', format: 'Cuña de 250 g', price: 6.45, was: 7.6, unit: 'kg', perUnit: 25.8, badges: ['oferta'], photo: 'quesos', pos: '30% 50%' },
  { id: 'queso-cabra', name: 'Rulo de cabra de leche cruda', cat: 'queseria', producer: 'Cabras del Moncayo', origin: 'Añón de Moncayo, Zaragoza', format: 'Pieza de 180 g', price: 4.9, unit: 'kg', perUnit: 27.22, badges: ['bio', 'nuevo'], photo: 'quesos', pos: '80% 70%' },
  { id: 'pan-centeno', name: 'Pan de centeno de masa madre', cat: 'panaderia', producer: 'Obrador Albar', origin: 'Hecho en cada tienda', format: 'Hogaza de 600 g', price: 3.8, was: 4.4, unit: 'kg', perUnit: 6.33, badges: ['km0', 'oferta'], photo: 'pan', pos: '50% 50%' },
  { id: 'pan-candeal', name: 'Pan candeal de Valladolid', cat: 'panaderia', producer: 'Horno San Lorenzo', origin: 'Portillo, Valladolid', format: 'Pieza de 500 g', price: 2.6, unit: 'kg', perUnit: 5.2, badges: [], photo: 'pan', pos: '20% 40%' },
  { id: 'aove-picual', name: 'Aceite de oliva virgen extra picual, cosecha temprana', cat: 'despensa', producer: 'Almazara Los Cerrillos', origin: 'Bedmar, Jaén', format: 'Botella de 500 ml', price: 7.9, was: 9.2, unit: 'l', perUnit: 15.8, badges: ['oferta', 'nuevo'], photo: 'aceite', pos: '50% 60%' },
  { id: 'aceituna', name: 'Aceituna negra de Aragón', cat: 'despensa', producer: 'Olivares del Bajo Aragón', origin: 'Alcañiz, Teruel', format: 'Tarro de 350 g', price: 3.75, unit: 'kg', perUnit: 10.71, badges: ['bio'], photo: 'aceituna', pos: '50% 50%' },
  { id: 'bonito', name: 'Bonito del norte en aceite de oliva', cat: 'despensa', producer: 'Conservera Arrieta', origin: 'Bermeo, Bizkaia', format: 'Lata de 300 g', price: 8.95, was: 11.4, unit: 'kg', perUnit: 29.83, badges: ['oferta'], photo: 'barco', pos: '50% 60%' },
  { id: 'lenteja', name: 'Lenteja pardina', cat: 'granel', producer: 'Cooperativa Tierra de Campos', origin: 'Villalón, Valladolid', format: 'Granel', price: 3.2, unit: 'kg', perUnit: 3.2, badges: ['bio'], photo: 'legumbres', pos: '30% 50%' },
  { id: 'garbanzo', name: 'Garbanzo pedrosillano', cat: 'granel', producer: 'Hermanos Calvo', origin: 'Pedrosillo, Salamanca', format: 'Granel', price: 4.1, unit: 'kg', perUnit: 4.1, badges: ['bio'], photo: 'legumbres', pos: '75% 70%' },
  { id: 'tinto-ribera', name: 'Tinto Ribera del Duero, crianza 2022', cat: 'bodega', producer: 'Bodega Hoyo Ancho', origin: 'La Horra, Burgos', format: 'Botella de 75 cl', price: 16.5, unit: 'l', perUnit: 22.0, badges: [], photo: 'vino', pos: '50% 50%' },
  { id: 'txakoli', name: 'Txakoli de Getaria', cat: 'bodega', producer: 'Etxe Zaharra', origin: 'Getaria, Gipuzkoa', format: 'Botella de 75 cl', price: 12.9, unit: 'l', perUnit: 17.2, badges: ['km0', 'nuevo'], photo: 'vino', pos: '20% 30%' },
  { id: 'olivar-lote', name: 'Lote de cata: tres aceites de Sierra Sur', cat: 'despensa', producer: 'Tres almazaras de Jaén', origin: 'Sierra Sur, Jaén', format: '3 botellas de 250 ml', price: 18.0, unit: 'l', perUnit: 24.0, badges: ['nuevo'], photo: 'olivar', pos: '50% 60%' },
];

export const BADGE_LABEL = { bio: 'Bio', km0: 'Km 0', nuevo: 'Nuevo', oferta: 'Oferta' };

const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
export const money = (n) => eur.format(n);
