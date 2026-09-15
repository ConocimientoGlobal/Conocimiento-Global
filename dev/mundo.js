// ============================================================================
// MUNDO - Generación, NPCs, Cofres
// ============================================================================

const world = [];
const npcs = [];
const cofres = [];

function generarMundo() {
  for (let y = 0; y < WORLD_H; y++) {
    world[y] = [];
    for (let x = 0; x < WORLD_W; x++) {
      if (x === 0 || x === WORLD_W - 1 || y === 0 || y === WORLD_H - 1) {
        world[y][x] = 1;
      } else if (BIOMAS[getBioma(x, y)].id === 0) {
        world[y][x] = 0;
      } else {
        const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
        world[y][x] = (v % 20 < 1) ? 1 : 0;
      }
    }
  }
  world[8][8] = 0;
}

function generarNPCs() {
  npcs.length = 0;
  npcs.push(
    {x:6, y:6, nombre:'Herrero', color:'#e53935'},
    {x:9, y:7, nombre:'Mago', color:'#8e24aa'},
    {x:7, y:9, nombre:'Comerciante', color:'#ffb300'},
    {x:20, y:12, nombre:'Lenador', color:'#6d4c41'},
    {x:35, y:15, nombre:'Nomada', color:'#ff8f00'},
    {x:50, y:25, nombre:'Alquimista', color:'#00897b'},
    {x:20, y:45, nombre:'Bruja', color:'#5e35b1'},
    {x:55, y:40, nombre:'HerreroLava', color:'#d84315'},
    {x:58, y:58, nombre:'Rey', color:'#ffd600'}
  );
}

function generarCofres() {
  cofres.length = 0;
  cofres.push(
    {x:10, y:10, abierto:false},
    {x:25, y:18, abierto:false},
    {x:40, y:22, abierto:false},
    {x:55, y:35, abierto:false},
    {x:15, y:50, abierto:false},
    {x:60, y:60, abierto:false}
  );
}

function esCaminable(x, y) {
  if (x < 0 || x >= WORLD_W || y < 0 || y >= WORLD_H) return false;
  if (world[y][x] !== 0) return false;
  for (const n of npcs) if (n.x === x && n.y === y) return false;
  for (const co of cofres) if (co.x === x && co.y === y && !co.abierto) return false;
  return true;
}
