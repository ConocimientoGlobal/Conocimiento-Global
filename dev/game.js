// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const WORLD_W = 64;
const WORLD_H = 64;

let W, H;
let TW, TH;

// Campo de visión
const VISION_RADIO = 10;

const c = document.getElementById('c');
const ctx = c.getContext('2d');

function resize() {
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight;
  TW = Math.min(W, H) / 8;
  TH = TW / 2;
}

resize();
window.addEventListener('resize', resize);

// ============================================================================
// BIOMAS
// ============================================================================

const BIOMAS = [
  {id:0, nombre:'Pueblo',     color1:'#4caf50', color2:'#388e3c', dificultad:null,      tipoAgua:'dulce'},
  {id:1, nombre:'Bosque',     color1:'#2e7d32', color2:'#1b5e20', dificultad:null,      tipoAgua:'dulce'},
  {id:2, nombre:'Desierto',   color1:'#f9a825', color2:'#f57f17', dificultad:'sed',     tipoAgua:'mar'},
  {id:3, nombre:'Montaña',    color1:'#9e9e9e', color2:'#757575', dificultad:'frio',    tipoAgua:'dulce'},
  {id:4, nombre:'Pantano',    color1:'#5d4037', color2:'#4e342e', dificultad:'veneno',  tipoAgua:'mar'},
  {id:5, nombre:'Volcan',     color1:'#d84315', color2:'#bf360c', dificultad:'calor',   tipoAgua:'lava'},
  {id:6, nombre:'Castillo',   color1:'#37474f', color2:'#263238', dificultad:null,      tipoAgua:'dulce'}
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

// ============================================================================
// MUNDO
// ============================================================================

const world = [];
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

const npcs = [
  {x:6, y:6, nombre:'Herrero', color:'#e53935'},
  {x:9, y:7, nombre:'Mago', color:'#8e24aa'},
  {x:7, y:9, nombre:'Comerciante', color:'#ffb300'}
];

const cofres = [
  {x:10, y:10, abierto:false},
  {x:25, y:18, abierto:false},
  {x:40, y:22, abierto:false}
];

// ============================================================================
// JUGADOR
// ============================================================================

const pl = {
  gx: 8,
  gy: 8,
  fx: 8.0,
  fy: 8.0,
  path: [],
  frame: 0,
  ft: 0,
  hp: 100,
  mhp: 100,
  sed: 100,
  maxSed: 100,
  temp: 100,
  maxTemp: 100,
  nivel: 1,
  xp: 0,
  oro: 50,
  biomaActual: 0
};

// ============================================================================
// PROYECCIÓN ISOMÉTRICA
// ============================================================================

function iso(x, y) {
  return {
    x: (x - y) * TW / 2,
    y: (x + y) * TH / 2
  };
}

function getCamera() {
  const p = iso(pl.fx, pl.fy);
  return {
    x: W / 2 - p.x,
    y: H / 2 - p.y
  };
}

function screenToCell(sx, sy) {
  const cam = getCamera();
  const rx = sx - cam.x;
  const ry = sy - cam.y;
  return {
    x: Math.round((rx / (TW / 2) + ry / (TH / 2)) / 2),
    y: Math.round((ry / (TH / 2) - rx / (TW / 2)) / 2)
  };
}

function esCaminable(x, y) {
  if (x < 0 || x >= WORLD_W || y < 0 || y >= WORLD_H) return false;
  if (world[y][x] !== 0) return false;
  for (const n of npcs) if (n.x === x && n.y === y) return false;
  for (const co of cofres) if (co.x === x && co.y === y && !co.abierto) return false;
  return true;
}

// ============================================================================
// PATHFINDING (BFS)
// ============================================================================

function findPath(sx, sy, gx, gy) {
  if (!esCaminable(gx, gy)) return [];
  
  const open = [{x: sx, y: sy, p: []}];
  const vis = new Set();
  vis.add(sx + ',' + sy);
  
  while (open.length) {
    const c = open.shift();
    if (c.x === gx && c.y === gy) return c.p;
    
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = c.x + dx;
      const ny = c.y + dy;
      const key = nx + ',' + ny;
      
      if (vis.has(key) || !esCaminable(nx, ny)) continue;
      
      vis.add(key);
      open.push({x: nx, y: ny, p: [...c.p, {x: nx, y: ny}]});
    }
  }
  return [];
}

// ============================================================================
// MOVIMIENTO
// ============================================================================

function moverJugador(dt) {
  if (pl.path.length === 0) return;
  
  const t = pl.path[0];
  const speed = 2.5 * dt;
  const dx = t.x - pl.fx;
  const dy = t.y - pl.fy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist < speed || dist < 0.005) {
    pl.fx = t.x;
    pl.fy = t.y;
    pl.gx = t.x;
    pl.gy = t.y;
    pl.path.shift();
  } else {
    pl.fx += (dx / dist) * speed;
    pl.fy += (dy / dist) * speed;
  }
  
  pl.ft += dt;
  if (pl.ft > 0.15) {
    pl.ft = 0;
    pl.frame = (pl.frame + 1) % 2;
  }
}

// ============================================================================
// DIFICULTADES AMBIENTALES
// ============================================================================

function aplicarDificultad(dt) {
  const bioma = BIOMAS[pl.biomaActual];
  if (!bioma.dificultad) return;
  
  switch(bioma.dificultad) {
    case 'sed':
      pl.sed = Math.max(0, pl.sed - dt * 2);
      if (pl.sed === 0) pl.hp = Math.max(0, pl.hp - dt * 1);
      break;
    case 'frio':
      pl.temp = Math.max(0, pl.temp - dt * 2);
      if (pl.temp === 0) pl.hp = Math.max(0, pl.hp - dt * 1.5);
      break;
    case 'calor':
      pl.sed = Math.max(0, pl.sed - dt * 3);
      if (pl.sed === 0) pl.hp = Math.max(0, pl.hp - dt * 2);
      break;
    case 'veneno':
      if (Math.random() < 0.005) pl.hp = Math.max(0, pl.hp - dt * 3);
      break;
  }
}

// ============================================================================
// RENDER - DIBUJADO
// ============================================================================

function drawDiamond(sx, sy, w, h, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function shadeColor(color, percent) {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function drawPlayer(px, py, bo) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px, py + TH/2, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Piernas
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 3, py + TH/2 - 8, 2, 9 + bo);
  ctx.fillRect(px + 1, py + TH/2 - 8, 2, 9 + bo);
  
  // Cuerpo
  const bodyGrad = ctx.createLinearGradient(px - 6, py + TH/2 - 20, px + 6, py + TH/2 - 4);
  bodyGrad.addColorStop(0, '#1565c0');
  bodyGrad.addColorStop(0.5, '#1976d2');
  bodyGrad.addColorStop(1, '#0d47a1');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(px - 7, py + TH/2 - 22, 14, 16);
  
  // Cinturón
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(px - 7, py + TH/2 - 8, 14, 2);
  
  // Cabeza
  const headGrad = ctx.createRadialGradient(px - 1, py + TH/2 - 28, 1, px, py + TH/2 - 26, 6);
  headGrad.addColorStop(0, '#fff3e0');
  headGrad.addColorStop(1, '#ffe0b2');
  ctx.fillStyle = headGrad;
  ctx.fillRect(px - 4, py + TH/2 - 32, 8, 7);
  
  // Pelo
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 5, py + TH/2 - 34, 10, 4);
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(px - 2, py + TH/2 - 29, 2, 2);
  ctx.fillRect(px + 1, py + TH/2 - 29, 2, 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(px - 1, py + TH/2 - 28, 1, 1);
  ctx.fillRect(px + 2, py + TH/2 - 28, 1, 1);
}

function drawNPC(px, py, npc) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px, py + TH/2, 7, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = npc.color;
  ctx.fillRect(px - 5, py + TH/2 - 16, 10, 12);
  
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(px - 3, py + TH/2 - 22, 6, 5);
  
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 4, py + TH/2 - 24, 8, 3);
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(px - 2, py + TH/2 - 20, 2, 1);
  ctx.fillRect(px + 1, py + TH/2 - 20, 2, 1);
  
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 28, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbol(px, py, tipo) {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2, 12, 5, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  if (tipo === 'pino') {
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(px - 2, py - 12, 4, 14);
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.moveTo(px, py - 35);
    ctx.lineTo(px - 12, py - 10);
    ctx.lineTo(px + 12, py - 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#388e3c';
    ctx.beginPath();
    ctx.moveTo(px, py - 30);
    ctx.lineTo(px - 8, py - 12);
    ctx.lineTo(px + 8, py - 12);
    ctx.closePath();
    ctx.fill();
  } else if (tipo === 'palmera') {
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(px - 3, py - 16, 6, 20);
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(px - 16, py - 22, 10, 3);
    ctx.fillRect(px + 6, py - 22, 10, 3);
  } else {
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(px - 3, py - 10, 6, 12);
    ctx.fillStyle = '#388e3c';
    ctx.beginPath();
    ctx.arc(px, py - 22, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.arc(px - 3, py - 25, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawTile(sx, sy, w, h, color1, color2, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  
  const grad = ctx.createLinearGradient(sx - w/2, sy, sx + w/2, sy + h);
  grad.addColorStop(0, shadeColor(color1, 15));
  grad.addColorStop(0.5, color2);
  grad.addColorStop(1, shadeColor(color2, -20));
  ctx.fillStyle = grad;
  ctx.fill();
  
  // Borde superior brillante
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h / 2);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fill();
  
  // Textura granular
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  for (let i = 0; i < 4; i++) {
    const nx = sx - w/3 + (v * (i+1) % w*2/3);
    const ny = sy + h/4 + (v * (i+2) % h*3/4);
    ctx.fillRect(nx, ny, 1, 1);
  }
}

function drawAgua(sx, sy, w, h, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  
  ctx.fillStyle = '#1565c0';
  ctx.fill();
  
  // Ondas
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(sx - 6, sy + TH/3, 4, 1);
  ctx.fillRect(sx + 2, sy + TH/2 - 1, 3, 1);
}

// ============================================================================
// GAME LOOP
// ============================================================================

function loop() {
  const dt = 1 / 60;
  
  ctx.fillStyle = '#0d1b0d';
  ctx.fillRect(0, 0, W, H);
  
  moverJugador(dt);
  
  pl.biomaActual = getBioma(Math.floor(pl.gx), Math.floor(pl.gy));
  aplicarDificultad(dt);
  
  const cam = getCamera();
  const pgx = Math.floor(pl.gx);
  const pgy = Math.floor(pl.gy);
  
  // Tiles
  for (let y = Math.max(0, pgy - VISION_RADIO - 2); y < Math.min(WORLD_H, pgy + VISION_RADIO + 2); y++) {
    for (let x = Math.max(0, pgx - VISION_RADIO - 2); x < Math.min(WORLD_W, pgx + VISION_RADIO + 2); x++) {
      const s = iso(x, y);
      const sx = s.x + cam.x - TW/2;
      const sy = s.y + cam.y - TH/2;
      
      const dist = Math.sqrt((x - pgx) * (x - pgx) + (y - pgy) * (y - pgy));
      if (dist > VISION_RADIO + 0.5) continue;
      
      const bio = BIOMAS[getBioma(x, y)];
      const tile = world[y][x];
      
      if (tile === 1) {
        drawAgua(sx, sy, TW, TH, x, y);
      } else {
        drawTile(sx, sy, TW, TH, bio.color1, bio.color2, x, y);
      }
      
      // Path highlight
      if (pl.path.find(p => p.x === x && p.y === y)) {
        ctx.fillStyle = 'rgba(255,255,0,0.2)';
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + TW/2, sy + TH/2);
        ctx.lineTo(sx, sy + TH);
        ctx.lineTo(sx - TW/2, sy + TH/2);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
  
  // Decoraciones
  for (let y = Math.max(0, pgy - VISION_RADIO); y < Math.min(WORLD_H, pgy + VISION_RADIO); y++) {
    for (let x = Math.max(0, pgx - VISION_RADIO); x < Math.min(WORLD_W, pgx + VISION_RADIO); x++) {
      const dist = Math.sqrt((x - pgx) * (x - pgx) + (y - pgy) * (y - pgy));
      if (dist > VISION_RADIO) continue;
      if (world[y][x] !== 0) continue;
      
      const s = iso(x, y);
      const px = s.x + cam.x;
      const py = s.y + cam.y;
      
      const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
      const tipo = v % 100;
      
      if (tipo < 8) {
        const tipoArbol = getBioma(x, y) === 1 && v % 2 === 0 ? 'pino' : 'roble';
        drawArbol(px, py, tipoArbol);
      }
    }
  }
  
  // NPCs
  for (const n of npcs) {
    const dist = Math.sqrt((n.x - pgx) * (n.x - pgx) + (n.y - pgy) * (n.y - pgy));
    if (dist > VISION_RADIO) continue;
    
    const s = iso(n.x, n.y);
    const px = s.x + cam.x;
    const py = s.y + cam.y;
    
    drawNPC(px, py, n);
    ctx.fillStyle = '#fff';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n.nombre, px, py - 10);
  }
  
  // Jugador
  const ps = iso(pl.fx, pl.fy);
  drawPlayer(ps.x + cam.x, ps.y + cam.y, pl.frame === 0 ? 0 : 1);
  
  // UI
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(10, 10, 140, 50);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Lv.' + pl.nivel + ' Hero', 18, 24);
  ctx.fillStyle = '#4a0000';
  ctx.fillRect(18, 32, 120, 6);
  ctx.fillStyle = '#e44';
  ctx.fillRect(19, 33, 118 * pl.hp / pl.mhp, 4);
  ctx.fillStyle = '#fff';
  ctx.font = '7px monospace';
  ctx.fillText('100/100', 65, 37);
  
  // Info
  ctx.fillStyle = '#0f0';
  ctx.font = '9px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('Pos:' + Math.floor(pl.gx) + ',' + Math.floor(pl.gy), 10, H - 15);
  
  // Minimapa
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(W - 110, H - 110, 100, 100);
  for (let y = 0; y < WORLD_H; y += 2) {
    for (let x = 0; x < WORLD_W; x += 2) {
      const b = BIOMAS[getBioma(x, y)];
      ctx.fillStyle = b.color1;
      ctx.fillRect(W - 110 + (x / WORLD_W) * 100, H - 110 + (y / WORLD_H) * 100, 2, 2);
    }
  }
  ctx.fillStyle = '#ff0';
  ctx.fillRect(W - 110 + (pl.gx / WORLD_W) * 100 - 2, H - 110 + (pl.gy / WORLD_H) * 100 - 2, 4, 4);
  
  requestAnimationFrame(loop);
}

// ============================================================================
// INPUT
// ============================================================================

c.addEventListener('touchstart', e => {
  e.preventDefault();
  if (pl.path.length > 0) return;
  
  const t = e.changedTouches[0];
  const cell = screenToCell(t.clientX, t.clientY);
  
  if (cell.x < 0 || cell.x >= WORLD_W || cell.y < 0 || cell.y >= WORLD_H) return;
  if (world[cell.y][cell.x] !== 0) return;
  
  pl.path = findPath(pl.gx, pl.gy, cell.x, cell.y);
}, {passive: false});

loop();
