// Peor caso realista para la prueba de estrés (solo en desarrollo: ?data=worst).
// Cada fila rompe algo distinto, como pasa con datos reales.
import { products as demo } from './products.js';
import { stores as demoStores } from './stores.js';

export const worstProducts = [
  { id: 'w1', name: 'Queso de oveja curado en aceite de oliva virgen extra con romero, edición de invierno', cat: 'queseria', producer: 'Sociedad Cooperativa Agraria Nuestra Señora de la Asunción', origin: 'Villanueva de la Serena, Badajoz', format: 'Pieza entera de 3 kg aprox., envasada al vacío, cortada en cuñas bajo pedido', price: 89.9, was: 104.5, unit: 'kg', perUnit: 29.97, badges: ['bio', 'km0', 'nuevo', 'oferta'], photo: 'quesos', pos: '50% 50%' },
  { id: 'w2', name: 'Jamón de bellota 100 % ibérico entero, 48 meses', cat: 'charcuteria', producer: 'Secadero Valdelarco', origin: 'Valdelarco, Huelva', format: 'Pieza de 9 kg', price: 1249, was: 1490, unit: 'kg', perUnit: 138.78, badges: ['oferta'], photo: 'jamon', pos: '50% 30%' },
  { id: 'w3', name: 'Té', cat: 'despensa', producer: 'Jo', origin: 'Vigo', format: 'Bolsita', price: 0.15, unit: 'kg', perUnit: 75, badges: [], photo: 'aceite', pos: '50% 50%' },
  { id: 'w4', name: 'Txakoli Getariako Txakolina Hondarrabi Zuri Beltza', cat: 'bodega', producer: 'Etxe Zaharra Upeltegia', origin: 'Getaria, Gipuzkoa', format: 'Botella de 75 cl', price: 12.9, unit: 'l', perUnit: 17.2, badges: ['km0'], photo: 'vino', pos: '50% 50%' },
  ...demo.slice(0, 4),
];

export const worstStores = [
  {
    ...demoStores[3],
    id: 'w-galvany',
    name: 'Sant Gervasi – Galvany',
    address: 'Carrer de Sant Gervasi de Cassoles, 412, entresuelo segunda, local B',
    area: 'Sant Gervasi-Galvany',
    note: 'Abre solo los sábados por obras en el local hasta el 15 de diciembre de 2026. Los pedidos a domicilio de esta zona salen desde Muntaner mientras tanto.',
    hours: [null, null, null, null, null, null, ['09:00', '14:00']],
    services: ['Charcutería al corte', 'Pescadería', 'Horno de leña', 'Recogida de pedidos', 'Entrega en 2 h', 'Bodega', 'Cámara de quesos', 'Aparcamiento para clientes', 'Cata de aceites'],
  },
  { ...demoStores[5], id: 'w-gros', name: 'Gros', address: 'Zabaleta, 1', note: '' },
  ...demoStores.slice(0, 2),
];
