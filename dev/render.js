// ============================================================================
// RENDER - Usando elementos específicos por bioma
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
        const biomaId = getBioma(x, y);
        if (biomaId === 2 || biomaId === 4) {
          drawMar(sx, sy, TW, TH, x, y);
        } else if (biomaId === 5) {
          // Lava
          ctx.fillStyle = '#d84315';
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + TW/2, sy + TH/2);
          ctx.lineTo(sx, sy + TH);
          ctx.lineTo(sx - TW/2, sy + TH/2);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffcc02';
          ctx.fillRect(sx - 4, sy + TH/3, 8, 2);
        } else {
          drawAguaDulce(sx, sy, TW, TH, x, y);
        }
      } else {
        drawTileConVolumen(sx, sy, TW, TH, bioma.color1, bioma.color2, x, y);
      }
      
      if (inPath) {
        ctx.fillStyle = 'rgba(200,200,80,0.2)';
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.2)', null);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Decoraciones con elementos específicos por bioma
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
      
      if (tipo < 10) {
        drawElementoBioma(px, py, biomaId, v);
      }
    }
  }
  
  // Niebla en pantano
  if (getBioma(pgx, pgy) === 4) {
    for (let y = Math.max(0, pgy - VISION_RADIO); y < Math.min(WORLD_H, pgy + VISION_RADIO); y++) {
      for (let x = Math.max(0, pgx - VISION_RADIO); x < Math.min(WORLD_W, pgx + VISION_RADIO); x++) {
        const s = iso(x, y);
        drawNiebla(s.x + cam.x, s.y + cam.y, TW, TH, 0.5);
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
