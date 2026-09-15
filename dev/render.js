// ============================================================================
// RENDER - Detalles Waven, Personajes, Vegetación, Estructuras
// ============================================================================

let ctx;
let lastDir = {x: 0, y: 1};

function iso(x, y) { return {x: (x - y) * TW / 2, y: (x + y) * TH / 2}; }

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

function drawPlayer(sx, sy, bo) {
  // Sombra proyectada
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 8, 18, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Botas
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 8, sy + TH/2, 7, 7);
  ctx.fillRect(sx + 1, sy + TH/2, 7, 7);
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 6, sy + TH/2 + 2, 3, 2);
  ctx.fillRect(sx + 2, sy + TH/2 + 2, 3, 2);
  
  // Piernas
  ctx.fillStyle = '#6d4c41';
  ctx.fillRect(sx - 6, sy + TH/2 - 10, 5, 11 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 10, 5, 11 + bo);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(sx - 6, sy + TH/2 - 10, 2, 11 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 10, 2, 11 + bo);
  
  // Cuerpo con gradiente
  const bodyGrad = ctx.createLinearGradient(sx - 10, sy + TH/2 - 24, sx + 10, sy + TH/2);
  bodyGrad.addColorStop(0, '#1565c0');
  bodyGrad.addColorStop(0.5, '#1976d2');
  bodyGrad.addColorStop(1, '#0d47a1');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(sx - 10, sy + TH/2 - 24, 20, 18);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(sx - 10, sy + TH/2 - 24, 4, 18);
  ctx.fillRect(sx + 6, sy + TH/2 - 24, 4, 18);
  
  // Hombreras
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 14, sy + TH/2 - 26, 6, 8);
  ctx.fillRect(sx + 8, sy + TH/2 - 26, 6, 8);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect(sx - 13, sy + TH/2 - 25, 4, 2);
  ctx.fillRect(sx + 9, sy + TH/2 - 25, 4, 2);
  
  // Cinturón
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 10, sy + TH/2 - 10, 20, 3);
  ctx.fillStyle = '#ff8f00';
  ctx.fillRect(sx - 4, sy + TH/2 - 12, 8, 6);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillRect(sx - 3, sy + TH/2 - 11, 6, 2);
  
  // Brazos
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(sx - 16, sy + TH/2 - 22, 5, 14);
  ctx.fillRect(sx + 11, sy + TH/2 - 22, 5, 14);
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 16, sy + TH/2 - 22, 5, 5);
  ctx.fillRect(sx + 11, sy + TH/2 - 22, 5, 5);
  
  // Cabeza
  const headGrad = ctx.createRadialGradient(sx - 2, sy + TH/2 - 32, 1, sx, sy + TH/2 - 30, 10);
  headGrad.addColorStop(0, '#fff3e0');
  headGrad.addColorStop(1, '#ffe0b2');
  ctx.fillStyle = headGrad;
  ctx.fillRect(sx - 6, sy + TH/2 - 34, 12, 11);
  
  // Pelo
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 8, sy + TH/2 - 37, 16, 8);
  ctx.fillRect(sx - 8, sy + TH/2 - 37, 4, 12);
  ctx.fillRect(sx + 4, sy + TH/2 - 37, 4, 12);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(sx - 5, sy + TH/2 - 38, 10, 3);
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 4, sy + TH/2 - 30, 4, 4);
  ctx.fillRect(sx + 1, sy + TH/2 - 30, 4, 4);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 3, sy + TH/2 - 29, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 29, 2, 2);
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 29, 1, 1);
  ctx.fillRect(sx + 2, sy + TH/2 - 29, 1, 1);
  
  // Boca
  ctx.fillStyle = '#d78a7a';
  ctx.fillRect(sx - 3, sy + TH/2 - 24, 6, 1);
}

function drawNPC(sx, sy, npc) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy + TH/2 - 8, 4, 9);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 4, 9);
  
  const bodyGrad = ctx.createLinearGradient(sx - 8, sy + TH/2 - 22, sx + 8, sy + TH/2);
  bodyGrad.addColorStop(0, npc.color);
  bodyGrad.addColorStop(0.5, shadeColor(npc.color, 20));
  bodyGrad.addColorStop(1, shadeColor(npc.color, -30));
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 16, 16);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 4, 16);
  
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  
  ctx.fillStyle = '#3e2723';
  if (npc.nombre === 'Mago' || npc.nombre === 'Bruja') {
    ctx.fillRect(sx - 7, sy + TH/2 - 36, 14, 8);
    ctx.fillRect(sx - 9, sy + TH/2 - 32, 3, 12);
    ctx.fillRect(sx + 6, sy + TH/2 - 32, 3, 12);
  } else if (npc.nombre === 'Rey') {
    ctx.fillStyle = '#ffd600';
    ctx.fillRect(sx - 7, sy + TH/2 - 37, 14, 7);
    ctx.fillRect(sx - 7, sy + TH/2 - 39, 2, 3);
    ctx.fillRect(sx - 1, sy + TH/2 - 40, 2, 4);
    ctx.fillRect(sx + 5, sy + TH/2 - 39, 2, 3);
  } else {
    ctx.fillRect(sx - 6, sy + TH/2 - 34, 12, 5);
  }
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 44, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.arc(sx - 1, sy + TH/2 - 45, 1, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbol(sx, sy, tipo) {
  switch(tipo) {
    case 'pino':
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(sx - 4, sy - 16, 8, 18);
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.moveTo(sx, sy - 50);
      ctx.lineTo(sx - 18, sy - 12);
      ctx.lineTo(sx + 18, sy - 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.beginPath();
      ctx.moveTo(sx, sy - 45);
      ctx.lineTo(sx - 14, sy - 14);
      ctx.lineTo(sx + 14, sy - 14);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.moveTo(sx + 5, sy - 45);
      ctx.lineTo(sx + 18, sy - 12);
      ctx.lineTo(sx + 5, sy - 12);
      ctx.closePath();
      ctx.fill();
      break;
    case 'palmera':
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(sx - 4, sy - 20, 8, 24);
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(sx - 20, sy - 28, 12, 4);
      ctx.fillRect(sx + 8, sy - 28, 12, 4);
      ctx.fillRect(sx - 6, sy - 36, 12, 4);
      break;
    case 'muerto':
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(sx - 2, sy - 30, 4, 34);
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy - 30);
      ctx.lineTo(sx - 12, sy - 40);
      ctx.moveTo(sx, sy - 25);
      ctx.lineTo(sx + 10, sy - 35);
      ctx.stroke();
      break;
    case 'abedul':
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(sx - 3, sy - 14, 6, 18);
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.arc(sx, sy - 30, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.arc(sx - 5, sy - 34, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    default: // roble
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(sx - 4, sy - 14, 8, 18);
      const roble = ctx.createRadialGradient(sx, sy - 30, 4, sx, sy - 25, 18);
      roble.addColorStop(0, '#66bb6a');
      roble.addColorStop(0.7, '#388e3c');
      roble.addColorStop(1, '#1b5e20');
      ctx.fillStyle = roble;
      ctx.beginPath();
      ctx.arc(sx, sy - 30, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(sx - 6, sy - 36, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

function drawRoca(sx, sy) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 2, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(sx - 12, sy + TH/2);
  ctx.lineTo(sx - 8, sy - 12);
  ctx.lineTo(sx + 2, sy - 18);
  ctx.lineTo(sx + 12, sy - 10);
  ctx.lineTo(sx + 12, sy + TH/2);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(sx + 2, sy - 18);
  ctx.lineTo(sx + 12, sy - 10);
  ctx.lineTo(sx + 12, sy + TH/2);
  ctx.lineTo(sx + 2, sy + TH/2);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.beginPath();
  ctx.moveTo(sx - 8, sy - 12);
  ctx.lineTo(sx + 2, sy - 18);
  ctx.lineTo(sx - 2, sy - 8);
  ctx.closePath();
  ctx.fill();
}

function drawCasa(sx, sy) {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 2, 22, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  
  const pared = ctx.createLinearGradient(sx - 15, sy - 30, sx + 15, sy);
  pared.addColorStop(0, '#e8d8b0');
  pared.addColorStop(0.5, '#d4c49a');
  pared.addColorStop(1, '#b8a880');
  ctx.fillStyle = pared;
  ctx.fillRect(sx - 15, sy - 22, 30, 24);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(sx - 15, sy - 22, 5, 24);
  
  ctx.fillStyle = '#c62828';
  ctx.beginPath();
  ctx.moveTo(sx, sy - 44);
  ctx.lineTo(sx - 20, sy - 24);
  ctx.lineTo(sx + 20, sy - 24);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(sx, sy - 44);
  ctx.lineTo(sx + 20, sy - 24);
  ctx.lineTo(sx + 20, sy - 20);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy - 10, 10, 12);
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx + 2, sy - 5, 2, 2);
  
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(sx - 12, sy - 18, 6, 6);
  ctx.fillRect(sx + 6, sy - 18, 6, 6);
}

function drawFuente(sx, sy) {
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(sx - 12, sy - 8, 24, 12);
  ctx.fillStyle = '#757575';
  ctx.fillRect(sx - 10, sy - 6, 20, 8);
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(sx - 8, sy - 4, 16, 4);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(sx - 6, sy - 3, 12, 1);
}

function drawFlor(sx, sy, color) {
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(sx - 1, sy + TH/2 - 6, 2, 6);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 8, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffeb3b';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 8, 1, 0, Math.PI * 2);
  ctx.fill();
}

function drawHongo(sx, sy, color) {
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(sx - 2, sy + TH/2 - 4, 4, 4);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 5, 5, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.beginPath();
  ctx.arc(sx - 1, sy + TH/2 - 7, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbusto(sx, sy, color) {
  ctx.fillStyle = color || '#388e3c';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 4, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sx - 4, sy + TH/2 - 2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sx + 4, sy + TH/2 - 2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath();
  ctx.arc(sx - 2, sy + TH/2 - 6, 3, 0, Math.PI * 2);
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
        drawDiamond(sx, sy, TW, TH, '#1565c0', '#4fc3f7');
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(sx - 8, sy + TH/2, 6, 2);
      } else {
        drawDiamond(sx, sy, TW, TH, (x+y) % 2 === 0 ? bioma.color1 : bioma.color2, 'rgba(0,0,0,0.12)');
        drawTexturasBioma(sx, sy, x, y);
      }
      
      if (inPath) {
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.18)', null);
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
        switch(biomaId) {
          case 1: tipoArbol = v % 3 === 0 ? 'pino' : (v % 3 === 1 ? 'roble' : 'abedul'); break;
          case 2: tipoArbol = 'palmera'; break;
          case 3: tipoArbol = 'pino'; break;
          case 4: tipoArbol = v % 3 === 0 ? 'muerto' : 'roble'; break;
          case 5: tipoArbol = 'muerto'; break;
          default: tipoArbol = v % 2 === 0 ? 'roble' : 'abedul'; break;
        }
        drawArbol(sx, sy, tipoArbol);
      } else if (tipo < 12) {
        drawRoca(sx, sy);
      } else if (tipo < 14 && biomaId === 0) {
        drawCasa(sx, sy);
      } else if (tipo < 15 && biomaId === 0) {
        drawFuente(sx, sy);
      } else if (tipo < 17) {
        let colorFlor = '#fff';
        switch(biomaId) {
          case 0: colorFlor = v % 2 === 0 ? '#fff' : '#ffeb3b'; break;
          case 1: colorFlor = v % 2 === 0 ? '#9c27b0' : '#fff'; break;
          case 2: colorFlor = '#ff9800'; break;
          default: colorFlor = '#fff'; break;
        }
        drawFlor(sx, sy, colorFlor);
      } else if (tipo < 19) {
        const colorHongo = v % 2 === 0 ? '#8d6e63' : (v % 3 === 0 ? '#4caf50' : '#2196f3');
        drawHongo(sx, sy, colorHongo);
      } else if (tipo < 22) {
        drawArbusto(sx, sy, v % 2 === 0 ? '#388e3c' : '#2e7d32');
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
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(sx - 5, sy - 3, 4, 2);
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
