// Tiendas Albar. Horario por día de la semana: 0 = domingo … 6 = sábado. null = cerrado.
// map: calles para el plano ilustrado (coordenadas en un lienzo de 400 × 300).
const LV = ['09:00', '21:30'];

export const stores = [
  {
    id: 'ponzano',
    local: { photo: 'tomatera', alt: 'Tomates en la mata', text: 'Lo de su comarca: tomate de rama de Aranjuez, a 47 km.' },
    name: 'Ponzano',
    city: 'Madrid',
    area: 'Chamberí',
    address: 'Calle de Ponzano, 38',
    cp: '28003',
    since: 1961,
    phone: '914 461 961',
    note: 'La primera. Sigue en el mismo local de 1961, con el mostrador de mármol original.',
    hours: [['10:00', '15:00'], LV, LV, LV, LV, LV, LV],
    services: ['Charcutería al corte', 'Pescadería', 'Horno propio', 'Recogida de pedidos', 'Entrega en 2 h'],
    map: {
      streets: [
        { name: 'Calle de Ponzano', d: 'M200 0 L200 300', main: true },
        { name: 'Calle de Ríos Rosas', d: 'M0 70 L400 70' },
        { name: 'Calle de Alenza', d: 'M0 220 L400 220' },
        { name: 'Calle de Santa Engracia', d: 'M330 0 L360 300' },
      ],
      pin: [200, 150],
      landmark: { label: 'Metro Ríos Rosas', at: [330, 70] },
    },
  },
  {
    id: 'jorge-juan',
    local: { photo: 'quesos', alt: 'Quesos curando en estantes de madera', text: 'Lo de su casa: la cámara donde se afinan 130 quesos.' },
    name: 'Jorge Juan',
    city: 'Madrid',
    area: 'Salamanca',
    address: 'Calle de Jorge Juan, 54',
    cp: '28001',
    since: 1987,
    phone: '915 761 987',
    note: 'La más grande: bodega con 600 referencias y quesería con cámara de afinado.',
    hours: [['10:00', '15:00'], LV, LV, LV, LV, LV, LV],
    services: ['Charcutería al corte', 'Pescadería', 'Bodega', 'Cámara de quesos', 'Aparcamiento', 'Entrega en 2 h'],
    map: {
      streets: [
        { name: 'Calle de Jorge Juan', d: 'M0 150 L400 150', main: true },
        { name: 'Calle de Velázquez', d: 'M90 0 L90 300' },
        { name: 'Calle de Núñez de Balboa', d: 'M260 0 L260 300' },
        { name: 'Calle de Goya', d: 'M0 40 L400 40' },
      ],
      pin: [180, 150],
      landmark: { label: 'Metro Velázquez', at: [90, 40] },
    },
  },
  {
    id: 'ruzafa',
    local: { photo: 'caqui', alt: 'Caqui sobre fondo negro', text: 'Lo de su comarca: caqui de la Ribera, a 31 km.' },
    name: 'Ruzafa',
    city: 'València',
    area: 'Ruzafa',
    address: 'Carrer de Sueca, 21',
    cp: '46006',
    since: 1994,
    phone: '963 741 994',
    note: 'A cuatro calles del mercado. La sección de arroces y hortaliza de la Huerta Sud es la más completa de la cadena.',
    hours: [null, LV, LV, LV, LV, LV, ['09:00', '15:00']],
    services: ['Pescadería', 'Arroces a granel', 'Recogida de pedidos', 'Entrega en 2 h'],
    map: {
      streets: [
        { name: 'Carrer de Sueca', d: 'M0 160 L400 120', main: true },
        { name: 'Carrer de Cadis', d: 'M0 260 L400 220' },
        { name: 'Carrer de Puerto Rico', d: 'M140 0 L170 300' },
        { name: 'Gran Via de Germanies', d: 'M0 40 L400 0' },
      ],
      pin: [250, 135],
      landmark: { label: 'Mercat de Russafa', at: [70, 30] },
    },
  },
  {
    id: 'sant-gervasi',
    local: { photo: 'pan', alt: 'Pan de masa madre recién horneado', text: 'Lo de su casa: pan de horno de leña, dos hornadas al día.' },
    name: 'Sant Gervasi',
    city: 'Barcelona',
    area: 'Sant Gervasi',
    address: 'Carrer de Muntaner, 412',
    cp: '08006',
    since: 2003,
    phone: '932 091 203',
    note: 'Horno de leña en el obrador del sótano: el pan sale a las 8:00 y a las 18:00.',
    hours: [null, LV, LV, LV, LV, LV, LV],
    services: ['Horno de leña', 'Charcutería al corte', 'Recogida de pedidos', 'Entrega en 2 h'],
    map: {
      streets: [
        { name: 'Carrer de Muntaner', d: 'M120 0 L280 300', main: true },
        { name: 'Via Augusta', d: 'M300 0 L400 200' },
        { name: 'Carrer de Laforja', d: 'M0 110 L400 60' },
        { name: 'Travessera de Gràcia', d: 'M0 260 L400 210' },
      ],
      pin: [190, 130],
      landmark: { label: 'FGC Muntaner', at: [40, 200] },
    },
  },
  {
    id: 'indautxu',
    local: { photo: 'pescado', alt: 'Caballa fresca en hielo', text: 'Lo de su costa: pescado de las lonjas de Bermeo y Ondarroa.' },
    name: 'Indautxu',
    city: 'Bilbao',
    area: 'Indautxu',
    address: 'Licenciado Poza Kalea, 31',
    cp: '48011',
    since: 2009,
    phone: '944 271 209',
    note: 'Pescado de las lonjas de Bermeo y Ondarroa, en el mostrador antes de las 10:00.',
    hours: [null, LV, LV, LV, LV, LV, ['09:00', '14:30']],
    services: ['Pescadería', 'Quesería', 'Recogida de pedidos'],
    map: {
      streets: [
        { name: 'Licenciado Poza Kalea', d: 'M0 150 L400 150', main: true },
        { name: 'Alameda de Urquijo', d: 'M0 50 L400 50' },
        { name: 'Calle Simón Bolívar', d: 'M300 0 L300 300' },
        { name: 'Plaza de Indautxu', d: 'M60 200 L160 200 L160 290 L60 290 Z' },
      ],
      pin: [220, 150],
      landmark: { label: 'Metro Indautxu', at: [110, 245] },
    },
  },
  {
    id: 'gros',
    local: { photo: 'vino', alt: 'Botellas tumbadas en una bodega', text: 'Lo de su comarca: txakoli de Getaria, a 25 km.' },
    name: 'Gros',
    city: 'Donostia',
    area: 'Gros',
    address: 'Zabaleta Kalea, 17',
    cp: '20002',
    since: 2014,
    phone: '943 271 214',
    note: 'La más pequeña: 180 m² y solo producto de Gipuzkoa y Navarra en el fresco.',
    hours: [null, LV, LV, LV, LV, LV, ['09:00', '14:30']],
    services: ['Pescadería', 'Txakoli y sidra', 'Recogida de pedidos'],
    map: {
      streets: [
        { name: 'Zabaleta Kalea', d: 'M0 140 L400 140', main: true },
        { name: 'Nafarroa Hiribidea', d: 'M0 260 L400 260' },
        { name: 'Zurriola Pasealekua', d: 'M0 30 L400 30' },
        { name: 'Usandizaga Kalea', d: 'M170 0 L170 300' },
      ],
      pin: [260, 140],
      landmark: { label: 'Playa de la Zurriola', at: [80, 15] },
    },
  },
  {
    id: 'triana',
    local: { photo: 'aceite', alt: 'Aceitera y aceitunas', text: 'Lo de su comarca: aceite de cinco almazaras de Sevilla y Córdoba.' },
    name: 'Triana',
    city: 'Sevilla',
    area: 'Triana',
    address: 'Calle San Jacinto, 52',
    cp: '41010',
    since: 2019,
    phone: '954 331 019',
    note: 'Aceites de cinco almazaras de Sevilla y Córdoba, para catar en tienda.',
    hours: [null, LV, LV, LV, LV, LV, ['09:00', '15:00']],
    services: ['Cata de aceites', 'Charcutería al corte', 'Recogida de pedidos', 'Entrega en 2 h'],
    map: {
      streets: [
        { name: 'Calle San Jacinto', d: 'M60 0 L340 300', main: true },
        { name: 'Calle Pagés del Corro', d: 'M0 120 L400 160' },
        { name: 'Calle Febo', d: 'M260 0 L180 300' },
        { name: 'Ronda de Triana', d: 'M0 280 L400 250' },
      ],
      pin: [190, 140],
      landmark: { label: 'Plaza del Altozano', at: [70, 20] },
    },
  },
];

export const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// Agrupa el horario semanal en filas legibles: «Lunes a sábado 9:00–21:30».
export function hoursRows(hours) {
  const label = (h) => (h ? `${h[0]}–${h[1]}` : 'Cerrado');
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows = [];
  for (const d of order) {
    const v = label(hours[d]);
    const last = rows[rows.length - 1];
    if (last && last.v === v) last.to = d;
    else rows.push({ from: d, to: d, v });
  }
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  return rows.map((r) => ({
    days: r.from === r.to ? cap(DAYS[r.from]) : `${cap(DAYS[r.from])} a ${DAYS[r.to]}`,
    time: r.v,
  }));
}
