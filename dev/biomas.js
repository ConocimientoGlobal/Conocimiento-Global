// ============================================================================
// BIOMAS
// ============================================================================

const BIOMAS = [
  {id:0, nombre:'Pueblo',     color1:'#4caf50', color2:'#388e3c', dificultad:null},
  {id:1, nombre:'Bosque',     color1:'#2e7d32', color2:'#1b5e20', dificultad:null},
  {id:2, nombre:'Desierto',   color1:'#f9a825', color2:'#f57f17', dificultad:'sed'},
  {id:3, nombre:'Montana',    color1:'#9e9e9e', color2:'#757575', dificultad:'frio'},
  {id:4, nombre:'Pantano',    color1:'#5d4037', color2:'#4e342e', dificultad:'veneno'},
  {id:5, nombre:'Volcan',     color1:'#d84315', color2:'#bf360c', dificultad:'calor'},
  {id:6, nombre:'Castillo',   color1:'#37474f', color2:'#263238', dificultad:null}
];

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
