// ============================================================================
// BIOMAS - Paleta vibrante, elementos distintivos
// ============================================================================

const BIOMAS = [
  {id:0, nombre:'Pueblo',     color1:'#4caf50', color2:'#388e3c', dificultad:null,      tipoAgua:'dulce'},
  {id:1, nombre:'Bosque',     color1:'#2e7d32', color2:'#1b5e20', dificultad:null,      tipoAgua:'dulce'},
  {id:2, nombre:'Desierto',   color1:'#f9a825', color2:'#f57f17', dificultad:'sed',     tipoAgua:'mar'},
  {id:3, nombre:'Montaña',    color1:'#9e9e9e', color2:'#757575', dificultad:'frio',    tipoAgua:'dulce'},
  {id:4,nombre:'Pantano',color1:'#5d4037',color2:'#4e342e',dificultad:'veneno',tipoAgua:'mar'},
  {id:5, nombre:'Volcan',     color1:'#d84315', color2:'#bf360c', dificultad:'calor',   tipoAgua:'lava'},
  {id:6, nombre:'Castillo',   color1:'#37474f', color2:'#263238', dificultad:null,      tipoAgua:'dulce'}
];

// Paleta vibrante con variaciones por bioma
const PALETA_BIOMAS = {
  0: { // Pueblo
    tierra: ['#4caf50', '#388e3c', '#66bb6a', '#2e7d32'],
    pasto: ['#7cb342', '#8bc34a', '#689f38', '#9ccc65'],
    flor: ['#f44336', '#ffeb3b', '#fff', '#e91e63', '#ff9800']
  },
  1: { // Bosque
    tierra: ['#2e7d32', '#1b5e20', '#388e3c', '#43a047'],
    pasto: ['#7cb342', '#689f38', '#8bc34a', '#558b2f'],
    flor: ['#9c27b0', '#fff', '#e91e63', '#ff5722', '#ffeb3b']
  },
  2: { // Desierto
    tierra: ['#f9a825', '#f57f17', '#ffb300', '#ffa000'],
    pasto: ['#4caf50', '#388e3c', '#66bb6a', '#2e7d32'],
    flor: ['#ff9800', '#ffeb3b', '#f44336', '#fff']
  },
  3: { // Montaña
    tierra: ['#9e9e9e', '#757575', '#bdbdbd', '#616161'],
    pasto: ['#689f38', '#558b2f', '#7cb342', '#4caf50'],
    flor: ['#fff', '#e3f2fd', '#bbdefb', '#90caf9']
  },
  4: { // Pantano
    tierra: ['#5d4037', '#4e342e', '#6d4c41', '#3e2723'],
    pasto: ['#5d4037', '#4e342e', '#795548', '#6d4c41'],
    flor: ['#fff', '#c8e6c9', '#a5d6a7', '#81c784']
  },
  5: { // Volcán
    tierra: ['#d84315', '#bf360c', '#e64a19', '#f4511e'],
    pasto: ['#424242', '#616161', '#757575', '#37474f'],
    flor: ['#ffeb3b', '#ff9800', '#f44336', '#fff']
  },
  6: { // Castillo
    tierra: ['#37474f', '#263238', '#455a64', '#546e7a'],
    pasto: ['#4caf50', '#388e3c', '#66bb6a', '#2e7d32'],
    flor: ['#f44336', '#e91e63', '#9c27b0', '#ffeb3b']
  }
};

function getBioma(x, y) {
  const bx = Math.min(7, Math.floor(x / 8));
  const by = Math.min(7, Math.floor(y / 8));
  const mapa = [
    [0, 1, 1, 2, 2, 5, 5, 5],
    [1, 1, 2, 2, 3, 5, 5, 6],
    [1, 2, 2, 3, 3, 5, 6, 6],
    [2, 2, 3, 3, 4, 5, 6, 6],
    [2, 3, 3, 4, 4, 6, 6, 6],
    [3, 3, 4, 4, 4, 6, 6, 6],
    [3, 4, 4, 4, 6, 6, 6, 6],
    [4, 4, 4, 6, 6, 6, 6, 6]
  ];
  return mapa[by][bx];
}

function getColoresBioma(biomaId) {
  return PALETA_BIOMAS[biomaId] || PALETA_BIOMAS[0];
}
