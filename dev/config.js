// ============================================================================
// CONFIGURACIÓN GLOBAL
// ============================================================================

const WORLD_W = 64;
const WORLD_H = 64;

let W, H;
let TW, TH;

function calcularTileSize() {
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
  const TILE = Math.min(W, H) / 16;
  TW = TILE;
  TH = TILE / 2;
}

function resize() {
  calcularTileSize();
}
