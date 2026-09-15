// ============================================================================
// RENDER - Con texturas y efectos
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

function shadeColor(color, percent) {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function drawPlayer(px, py, bo) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px, py + TH/2, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 3, py + TH/2 - 8, 2, 9 + bo);
  ctx.fillRect(px + 1, py + TH/2 - 8, 2, 9 + bo);
  
  const bodyGrad = ctx.createLinearGradient(px - 6, py + TH/2 - 20, px + 6, py + TH/2 - 4);
  bodyGrad.addColorStop(0, '#1565c0');
  bodyGrad.addColorStop(0.5, '#1976d2');
  bodyGrad.addColorStop(1, '#0d47a1');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(px - 7, py + TH/2 - 22, 14, 16);
  
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(px - 7, py + TH/2 - 8, 14, 2);
  
  const headGrad = ctx.createRadialGradient(px - 1, py + TH/2 - 28, 1, px, py + TH/2 - 26, 6);
  headGrad.addColorStop(0, '#fff3e0');
  headGrad.addColorStop(1, '#ffe0b2');
  ctx.fillStyle = headGrad;
  ctx.fillRect(px - 4, py + TH/2 - 32, 8, 7);
  
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 5, py + TH/2 - 34, 10, 4);
  
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
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 3, py + TH/2 - 7, 2, 8);
  ctx.fillRect(px + 1, py + TH/2 - 7, 2, 8);
  
  const bodyGrad = ctx.createLinearGradient(px - 6, py + TH/2 - 18, px + 6, py + TH/2 - 2);
  bodyGrad.addColorStop(0, npc.color);
  bodyGrad.addColorStop(0.5, shadeColor(npc.color, 15));
  bodyGrad.addColorStop(1, shadeColor(npc.color, -25));
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(px - 6, py + TH/2 - 20, 12, 14);
  
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(px - 3, py + TH/2 - 26, 7, 6);
  
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 4, py + TH/2 - 28, 8, 3);
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(px - 2, py + TH/2 - 24, 2, 2);
  ctx.fillRect(px + 1, py + TH/2 - 24, 2, 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(px - 1, py + TH/2 - 23, 1, 1);
  ctx.fillRect(px + 2, py + TH/2 - 23, 1, 1);
  
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 34, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbol(px, py, tipo) {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2, 10, 4, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  switch(tipo) {
    case 'pino':
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(px - 2, py - 12, 4, 14);
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.moveTo(px, py - 35);
      ctx.lineTo(px - 12, py - 8);
      ctx.lineTo(px + 12, py - 8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.beginPath();
      ctx.moveTo(px, py - 30);
      ctx.lineTo(px - 8, py - 10);
      ctx.lineTo(px + 8, py - 10);
      ctx.closePath();
      ctx.fill();
      break;
    case 'palmera':
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(px - 3, py - 14, 6, 18);
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(px - 14, py - 20, 8, 3);
      ctx.fillRect(px + 6, py - 20, 8, 3);
      break;
    case 'muerto':
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(px - 1, py - 20, 3, 22);
      break;
    case 'abedul':
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(px - 2, py - 12, 5, 16);
      const abedul = ctx.createRadialGradient(px, py - 22, 3, px, py - 20, 10);
      abedul.addColorStop(0, '#8bc34a');
      abedul.addColorStop(1, '#388e3c');
      ctx.fillStyle = abedul;
      ctx.beginPath();
      ctx.arc(px, py - 22, 10, 0, Math.PI * 2);
      ctx.fill();
      break;
    default:
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(px - 3, py - 10, 5, 14);
      const roble = ctx.createRadialGradient(px, py - 22, 3, px, py - 20, 12);
      roble.addColorStop(0, '#66bb6a');
      roble.addColorStop(0.7, '#388e3c');
      roble.addColorStop(1, '#1b5e20');
      ctx.fillStyle = roble;
      ctx.beginPath();
      ctx.arc(px, py - 22, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

function drawRoca(px, py) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 3, py + TH/2, 8, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(px - 8, py + TH/2);
  ctx.lineTo(px - 5, py - 8);
  ctx.lineTo(px + 3, py - 12);
  ctx.lineTo(px + 8, py - 6);
  ctx.lineTo(px + 8, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 12);
  ctx.lineTo(px + 8, py - 6);
  ctx.lineTo(px + 8, py + TH/2);
  ctx.lineTo(px + 3, py + TH/2);
  ctx.closePath();
  ctx.fill();
}

function drawCasa(px, py) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 6, py + TH/2, 14, 5, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#e8d8b0';
  ctx.fillRect(px - 10, py - 14, 20, 16);
  
  ctx.fillStyle = '#c62828';
  ctx.beginPath();
  ctx.moveTo(px, py - 28);
  ctx.lineTo(px - 14, py - 15);
  ctx.lineTo(px + 14, py - 15);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(px, py - 28);
  ctx.lineTo(px + 14, py - 15);
  ctx.lineTo(px + 14, py - 12);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 3, py - 6, 6, 8);
  
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 8, py - 12, 4, 4);
  ctx.fillRect(px + 4, py - 12, 4, 4);
}

function drawFuente(px, py) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 3, py + TH/2, 8, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 8, py - 6, 16, 8);
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 6, py - 4, 12, 3);
}

function drawFlor(px, py, color) {
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 1, py + TH/2 - 4, 2, 4);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 6, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawHongo(px, py, color) {
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(px - 1, py + TH/2 - 3, 3, 3);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 3, 3, Math.PI, 0);
  ctx.fill();
}

function drawArbusto(px, py, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 3, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px - 3, py + TH/2 - 2, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + 3, py + TH/2 - 2, 3, 0, Math.PI * 2);
  ctx.fill();
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
        drawAguaAnimada(sx, sy, TW, TH, x, y);
      } else {
        drawTileConProfundidad(sx, sy, TW, TH, bioma.color1, bioma.color2, x, y);
      }
      
      if (inPath) {
        ctx.fillStyle = 'rgba(200,200,80,0.2)';
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
      const px = s.x + cam.x;
      const py = s.y + cam.y;
      
      const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
      const tipo = v % 100;
      
      if (tipo < 8) {
        let tipoArbol = 'roble';
        switch(biomaId) {
          case 1: tipoArbol = v % 3 === 0 ? 'pino' : (v % 3 === 1 ? 'roble' : 'abedul'); break;
          case 2: tipoArbol = 'palmera'; break;
          case 3: tipoArbol = 'pino'; break;
          case 4: tipoArbol = v % 3 === 0 ? 'muerto' : 'roble'; break;
          case 5: tipoArbol = 'muerto'; break;
          default: tipoArbol = v % 2 === 0 ? 'roble' : 'abedul'; break;
        }
        drawArbol(px, py, tipoArbol);
      } else if (tipo < 12) {
        drawRoca(px, py);
      } else if (tipo < 14 && biomaId === 0) {
        drawCasa(px, py);
        drawHumo(px + 8, py - 28);
      } else if (tipo < 15 && biomaId === 0) {
        drawFuente(px, py);
      } else if (tipo < 17) {
        let colorFlor = '#fff';
        switch(biomaId) {
          case 0: colorFlor = v % 2 === 0 ? '#fff' : '#ffeb3b'; break;
          case 1: colorFlor = v % 2 === 0 ? '#9c27b0' : '#fff'; break;
          case 2: colorFlor = '#ff9800'; break;
          default: colorFlor = '#fff'; break;
        }
        drawFlor(px, py, colorFlor);
      } else if (tipo < 19) {
        const colorHongo = v % 2 === 0 ? '#8d6e63' : (v % 3 === 0 ? '#4caf50' : '#2196f3');
        drawHongo(px, py, colorHongo);
      } else if (tipo < 22) {
        drawArbusto(px, py, v % 2 === 0 ? '#388e3c' : '#2e7d32');
      }
    }
  }
  
  // Niebla en pantano
  if (getBioma(pgx, pgy) === 4) {
    for (let y = Math.max(0, pgy - VISION_RADIO); y < Math.min(WORLD_H, pgy + VISION_RADIO); y++) {
      for (let x = Math.max(0, pgx - VISION_RADIO); x < Math.min(WORLD_W, pgx + VISION_RADIO); x++) {
        const s = iso(x, y);
        const px = s.x + cam.x;
        const py = s.y + cam.y;
        drawNiebla(px, py, TW, TH, 0.5);
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
    const px = s.x + cam.x;
    const py = s.y + cam.y;
    
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(px - 4, py - 2, 8, 5);
    ctx.fillStyle = '#b8860b';
    ctx.fillRect(px - 4, py - 2, 8, 2);
  }
  
  // NPCs
  for (const n of npcs) {
    const dx = n.x - pgx;
    const dy = n.y - pgy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > VISION_RADIO) continue;
    
    const s = iso(n.x, n.y);
    const px = s.x + cam.x;
    const py = s.y + cam.y;
    
    drawNPC(px, py, n);
    ctx.fillStyle = '#fff';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n.nombre, px, py - 12);
  }
  
  // Jugador
  const ps = iso(pl.fx, pl.fy);
  const px = ps.x + cam.x;
  const py = ps.y + cam.y;
  
  drawPlayer(px, py, pl.frame === 0 ? 0 : 1);
}
