// ============================================================================
// RENDER - SIMPLIFICADO PARA DIAGNÓSTICO
// ============================================================================

let ctx;
let lastDir = {x: 0, y: 1};

function iso(x, y) {
  return {x: (x - y) * TW / 2, y: (x + y) * TH / 2};
}

function getCamera() {
  const p = iso(pl.fx, pl.fy);
  return {x: W / 2 - p.x, y: H / 2 - p.y};
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

function drawPlayer(sx, sy, bo) {
  // Cuerpo
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 16, 16);
  // Cabeza
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 14, 5, 0, 0, Math.PI*2);
  ctx.fill();
  // Cinturón
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 8, sy + TH/2 - 10, 16, 3);
  // Piernas
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy + TH/2 - 8, 4, 9 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 4, 9 + bo);
}

function drawNPC(sx, sy, npc) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 12, 4, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = npc.color;
  ctx.fillRect(sx - 7, sy + TH/2 - 20, 14, 14);
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 4, sy + TH/2 - 28, 8, 7);
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 2, sy + TH/2 - 25, 2, 2);
  ctx.fillRect(sx + 1, sy + TH/2 - 25, 2, 2);
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 38, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbol(sx, sy, tipo) {
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 3, sy - 12, 6, 16);
  ctx.fillStyle = '#388e3c';
  ctx.beginPath();
  ctx.arc(sx, sy - 24, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath();
  ctx.arc(sx - 5, sy - 28, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawRoca(sx, sy) {
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(sx - 10, sy + TH/2);
  ctx.lineTo(sx - 6, sy - 10);
  ctx.lineTo(sx + 6, sy - 14);
  ctx.lineTo(sx + 10, sy - 8);
  ctx.lineTo(sx + 10, sy + TH/2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(sx + 6, sy - 14);
  ctx.lineTo(sx + 10, sy - 8);
  ctx.lineTo(sx + 10, sy + TH/2);
  ctx.lineTo(sx + 6, sy + TH/2);
  ctx.closePath();
  ctx.fill();
}

function drawCasa(sx, sy) {
  ctx.fillStyle = '#e8d8b0';
  ctx.fillRect(sx - 15, sy - 20, 30, 22);
  ctx.fillStyle = '#c62828';
  ctx.beginPath();
  ctx.moveTo(sx, sy - 40);
  ctx.lineTo(sx - 18, sy - 22);
  ctx.lineTo(sx + 18, sy - 22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 4, sy - 8, 8, 10);
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(sx - 12, sy - 16, 5, 5);
  ctx.fillRect(sx + 7, sy - 16, 5, 5);
}

function drawTexturasBioma(sx, sy, x, y) {
  // Hierba simple
  ctx.fillStyle = '#7cb342';
  ctx.fillRect(sx - 6, sy + TH/2 - 4, 2, 5);
  ctx.fillRect(sx + 4, sy + TH/2 - 2, 2, 4);
  ctx.fillRect(sx - 2, sy + TH/2 - 6, 2, 6);
}

function renderMundo() {
  const cam = getCamera();
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  
  const pgx = Math.floor(pl.gx);
  const pgy = Math.floor(pl.gy);
  
  if (pl.path.length > 0) {
    const t = pl.path[0];
    const dx = t.x - pl.fx;
    const dy = t.y - pl.fy;
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      lastDir = {x: Math.sign(dx), y: Math.sign(dy)};
    }
  }
  
  // Tiles
  for (let y = Math.max(0, pgy - VISION_RADIO - 2); y < Math.min(WORLD_H, pgy + VISION_RADIO + 2); y++) {
    for (let x = Math.max(0, pgx - VISION_RADIO - 2); x < Math.min(WORLD_W, pgx + VISION_RADIO + 2); x++) {
      const s = iso(x, y);
      const sx = s.x + cam.x - TW/2;
      const sy = s.y + cam.y - TH/2;
      if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
      
      const dx = x - pgx;
      const dy = y - pgy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > VISION_RADIO + 0.5) continue;
      
      const bioma = BIOMAS[getBioma(x, y)];
      const tile = world[y][x];
      const inPath = pl.path.find(p => p.x === x && p.y === y);
      
      let alpha = 1.0;
      if (dist > VISION_RADIO - 3) {
        alpha = Math.max(0, 1.0 - ((dist - (VISION_RADIO - 3)) / 3.5));
      }
      
      ctx.globalAlpha = alpha;
      
      if (tile === 1) {
        drawDiamond(sx, sy, TW, TH, '#1565c0', '#4fc3f7');
      } else {
        drawDiamond(sx, sy, TW, TH, (x+y) % 2 === 0 ? bioma.color1 : bioma.color2, 'rgba(0,0,0,0.12)');
        drawTexturasBioma(sx, sy, x, y);
      }
      
      if (inPath) {
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.2)', null);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Decoraciones
  for (let y = Math.max(0, pgy - VISION_RADIO); y < Math.min(WORLD_H, pgy + VISION_RADIO); y++) {
    for (let x = Math.max(0, pgx - VISION_RADIO); x < Math.min(WORLD_W, pgx + VISION_RADIO); x++) {
      const dx = x - pgx;
      const dy = y - pgy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > VISION_RADIO) continue;
      if (world[y][x] !== 0) continue;
      
      const biomaId = getBioma(x, y);
      const s = iso(x, y);
      const sx = s.x + cam.x;
      const sy = s.y + cam.y;
      
      const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
      const tipo = v % 100;
      
      if (tipo < 8) {
        let tipoArbol = 'roble';
        if (biomaId === 1) tipoArbol = v % 2 === 0 ? 'pino' : 'roble';
        else if (biomaId === 2) tipoArbol = 'palmera';
        else if (biomaId === 3) tipoArbol = 'pino';
        else if (biomaId === 4) tipoArbol = v % 2 === 0 ? 'muerto' : 'roble';
        else if (biomaId === 5) tipoArbol = 'muerto';
        drawArbol(sx, sy, tipoArbol);
      } else if (tipo < 12) {
        drawRoca(sx, sy);
      } else if (tipo < 14 && biomaId === 0) {
        drawCasa(sx, sy);
      }
    }
  }
  
  // Cofres
  for (const co of cofres) {
    if (co.abierto) continue;
    const dx = co.x - pgx;
    const dy = co.y - pgy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > VISION_RADIO) continue;
    
    const s = iso(co.x, co.y);
    const sx = s.x + cam.x;
    const sy = s.y + cam.y;
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(sx - 6, sy - 4, 12, 8);
    ctx.fillStyle = '#b8860b';
    ctx.fillRect(sx - 6, sy - 4, 12, 3);
  }
  
  // NPCs
  for (const n of npcs) {
    const dx = n.x - pgx;
    const dy = n.y - pgy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > VISION_RADIO) continue;
    
    const s = iso(n.x, n.y);
    const sx = s.x + cam.x;
    const sy = s.y + cam.y;
    drawNPC(sx, sy, n);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n.nombre, sx, sy - 15);
  }
  
  // Jugador
  const ps = iso(pl.fx, pl.fy);
  drawPlayer(ps.x + cam.x, ps.y + cam.y, pl.frame === 0 ? 0 : 1);
}
