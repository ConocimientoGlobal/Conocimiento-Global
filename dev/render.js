// ============================================================================
// RENDER - Iluminación Waven-style, decoración, personajes detallados
// ============================================================================

let ctx;
let lastDir = {x: 0, y: 1}; // Última dirección del jugador

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

// === PERSONAJE PRINCIPAL (con iluminación Waven-style) ===
function drawPlayer(sx, sy, bo) {
  // Sombra proyectada
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 16, 6, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Zapatos
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 7, sy + TH/2, 6, 5);
  ctx.fillRect(sx + 1, sy + TH/2, 6, 5);
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 7, sy + TH/2 + 1, 6, 2);
  ctx.fillRect(sx + 1, sy + TH/2 + 1, 6, 2);
  
  // Piernas
  ctx.fillStyle = '#6d4c41';
  ctx.fillRect(sx - 6, sy + TH/2 - 8, 5, 9 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 5, 9 + bo);
  // Sombra interna piernas
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(sx - 6, sy + TH/2 - 8, 2, 9 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 2, 9 + bo);
  
  // Cuerpo (armadura con gradiente)
  const bodyGrad = ctx.createLinearGradient(sx - 10, sy + TH/2 - 24, sx + 10, sy + TH/2);
  bodyGrad.addColorStop(0, '#1565c0');
  bodyGrad.addColorStop(0.5, '#1976d2');
  bodyGrad.addColorStop(1, '#0d47a1');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(sx - 9, sy + TH/2 - 22, 18, 16);
  // Sombra interna
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(sx - 9, sy + TH/2 - 22, 4, 16);
  ctx.fillRect(sx + 5, sy + TH/2 - 22, 4, 16);
  
  // Hombreras
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(sx - 12, sy + TH/2 - 24, 5, 7);
  ctx.fillRect(sx + 7, sy + TH/2 - 24, 5, 7);
  // Brillo hombreras
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(sx - 11, sy + TH/2 - 23, 3, 2);
  ctx.fillRect(sx + 8, sy + TH/2 - 23, 3, 2);
  
  // Cinturón
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 9, sy + TH/2 - 10, 18, 3);
  // Hebulla con brillo
  ctx.fillStyle = '#ff8f00';
  ctx.fillRect(sx - 3, sy + TH/2 - 11, 6, 5);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillRect(sx - 2, sy + TH/2 - 10, 4, 2);
  
  // Brazos
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(sx - 13, sy + TH/2 - 20, 4, 12);
  ctx.fillRect(sx + 9, sy + TH/2 - 20, 4, 12);
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 13, sy + TH/2 - 20, 4, 4);
  ctx.fillRect(sx + 9, sy + TH/2 - 20, 4, 4);
  
  // Cabeza
  const headGrad = ctx.createRadialGradient(sx - 2, sy + TH/2 - 30, 1, sx, sy + TH/2 - 28, 8);
  headGrad.addColorStop(0, '#fff3e0');
  headGrad.addColorStop(1, '#ffe0b2');
  ctx.fillStyle = headGrad;
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  
  // Pelo con brillos
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 7, sy + TH/2 - 35, 14, 7);
  ctx.fillRect(sx - 7, sy + TH/2 - 35, 3, 10);
  ctx.fillRect(sx + 4, sy + TH/2 - 35, 3, 10);
  // Brillo pelo
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(sx - 4, sy + TH/2 - 36, 8, 2);
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  // Brillo especular ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 1, 1);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 1, 1);
  
  // Boca
  ctx.fillStyle = '#d78a7a';
  ctx.fillRect(sx - 2, sy + TH/2 - 22, 4, 1);
}

// === NPCs (con estilo único por tipo) ===
function drawNPC(sx, sy, npc) {
  const color = npc.color;
  
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 14, 5, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Cuerpo
  const bodyGrad = ctx.createLinearGradient(sx - 8, sy + TH/2 - 22, sx + 8, sy + TH/2);
  bodyGrad.addColorStop(0, color);
  bodyGrad.addColorStop(0.5, shadeColor(color, 20));
  bodyGrad.addColorStop(1, shadeColor(color, -30));
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 16, 16);
  
  // Cabeza
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  
  // Pelo según tipo
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
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  
  // Indicador interacción
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 44, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.arc(sx - 1, sy + TH/2 - 45, 1, 0, Math.PI * 2);
  ctx.fill();
}

// === ÁRBOLES POR BIOMA ===
function drawArbol(sx, sy, tipo) {
  // Tronco
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 3, sy - 16, 6, 18);
  
  switch(tipo) {
    case 'pino':
      // Copa triangular 3D
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
      // Sombra
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
      // Hojas
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
    default: // roble
      const robleGrad = ctx.createRadialGradient(sx, sy - 30, 4, sx, sy - 25, 18);
      robleGrad.addColorStop(0, '#66bb6a');
      robleGrad.addColorStop(0.7, '#388e3c');
      robleGrad.addColorStop(1, '#1b5e20');
      ctx.fillStyle = robleGrad;
      ctx.beginPath();
      ctx.arc(sx, sy - 28, 18, 0, Math.PI * 2);
      ctx.fill();
      // Brillo
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.arc(sx - 6, sy - 34, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

// === ROCA ===
function drawRoca(sx, sy) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 2, 12, 5, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Cara principal
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(sx - 12, sy + TH/2);
  ctx.lineTo(sx - 8, sy - 12);
  ctx.lineTo(sx + 2, sy - 18);
  ctx.lineTo(sx + 12, sy - 10);
  ctx.lineTo(sx + 12, sy + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Cara sombreada
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(sx + 2, sy - 18);
  ctx.lineTo(sx + 12, sy - 10);
  ctx.lineTo(sx + 12, sy + TH/2);
  ctx.lineTo(sx + 2, sy + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.beginPath();
  ctx.moveTo(sx - 8, sy - 12);
  ctx.lineTo(sx + 2, sy - 18);
  ctx.lineTo(sx - 2, sy - 8);
  ctx.closePath();
  ctx.fill();
}

// === CASA ===
function drawCasa(sx, sy) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 2, 20, 8, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Pared
  const paredGrad = ctx.createLinearGradient(sx - 15, sy - 30, sx + 15, sy);
  paredGrad.addColorStop(0, '#e8d8b0');
  paredGrad.addColorStop(0.5, '#d4c49a');
  paredGrad.addColorStop(1, '#b8a880');
  ctx.fillStyle = paredGrad;
  ctx.fillRect(sx - 15, sy - 22, 30, 24);
  
  // Sombra interna pared
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(sx - 15, sy - 22, 5, 24);
  
  // Techo
  ctx.fillStyle = '#c62828';
  ctx.beginPath();
  ctx.moveTo(sx, sy - 44);
  ctx.lineTo(sx - 20, sy - 24);
  ctx.lineTo(sx + 20, sy - 24);
  ctx.closePath();
  ctx.fill();
  // Sombra techo
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(sx, sy - 44);
  ctx.lineTo(sx + 20, sy - 24);
  ctx.lineTo(sx + 20, sy - 20);
  ctx.lineTo(sx, sy - 40);
  ctx.closePath();
  ctx.fill();
  
  // Puerta
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy - 10, 10, 12);
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx + 2, sy - 5, 2, 2); // Picaporte
  
  // Ventana
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(sx - 12, sy - 18, 6, 6);
  ctx.fillRect(sx + 6, sy - 18, 6, 6);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(sx - 12, sy - 18, 6, 1);
  ctx.fillRect(sx + 6, sy - 18, 6, 1);
}

// === CAMINO (decoración de suelo) ===
function drawCamino(sx, sy) {
  ctx.fillStyle = '#a1887f';
  ctx.fillRect(sx - TW/4, sy + TH/4, TW/2, TH/3);
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(sx - TW/4, sy + TH/4, TW/2, 2);
}

// === UTILIDADES ===
function shadeColor(color, percent) {
  const num = parseInt(color.replace('#',''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// === RENDER PRINCIPAL ===
function renderMundo() {
  const cam = getCamera();
  
  // Fondo negro
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  
  const pgx = Math.floor(pl.gx);
  const pgy = Math.floor(pl.gy);
  
  // Actualizar última dirección si se mueve
  if (pl.path.length > 0) {
    const t = pl.path[0];
    const dx = t.x - pl.fx;
    const dy = t.y - pl.fy;
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      lastDir = {x: Math.sign(dx), y: Math.sign(dy)};
    }
  }
  
  // Tiles con fog of war circular
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
      
      // Opacidad gradual
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
      }
      
      if (inPath) {
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.18)', null);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Decoraciones (solo si están en visión y no hay tile de agua)
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
      
      // Árboles y rocas según bioma
      const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
      const tipo = v % 100;
      
      if (tipo < 8) {
        let tipoArbol = 'roble';
        switch(biomaId) {
          case 1: tipoArbol = v % 2 === 0 ? 'pino' : 'roble'; break;
          case 2: tipoArbol = 'palmera'; break;
          case 3: tipoArbol = 'pino'; break;
          case 4: tipoArbol = v % 3 === 0 ? 'muerto' : 'roble'; break;
          case 5: tipoArbol = 'muerto'; break;
          case 6: tipoArbol = 'roble'; break;
        }
        drawArbol(sx, sy, tipoArbol);
      } else if (tipo < 12) {
        drawRoca(sx, sy);
      } else if (tipo < 14 && biomaId === 0) {
        drawCasa(sx, sy);
      } else if (tipo < 15 && biomaId === 0) {
        drawCamino(sx, sy);
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
