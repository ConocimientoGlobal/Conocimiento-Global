// ============================================================================
// CONFIGURACIÓN GLOBAL
// ============================================================================

const WORLD_W = 64;
const WORLD_H = 64;

let W, H;
let TW, TH;

// Campo de visión (en tiles)
const VISION_RADIO = 8;

function calcularTileSize() {
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
  // Tiles tamaño balanceado
  const TILE = Math.min(W, H) / 8;
  TW = TILE;
  TH = TILE / 2;
}

function resize() {
  calcularTileSize();
}
