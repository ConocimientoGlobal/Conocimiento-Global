// ============================================================================
// RENDER - Proyección isométrica, dibujado y Fog of War
// ============================================================================

let ctx;

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

function drawChar(sx, sy, color, bo) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 4, 10, 4, 0, 0, Math.PI*2);
  ctx.fill();
  
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 4, sy + TH/2 - 8, 3, 8 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 3, 8 + bo);
  
  ctx.fillStyle = color || '#1976d2';
  ctx.fillRect(sx - 6, sy + TH/2 - 20, 12, 14);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(sx - 6, sy + TH/2 - 20, 12, 4);
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 6, sy + TH/2 - 8, 12, 2);
  
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 4, sy + TH/2 - 26, 8, 7);
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 4, sy + TH/2 - 28, 8, 3);
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 2, sy + TH/2 - 24, 2, 2);
  ctx.fillRect(sx + 1, sy + TH/2 - 24, 2, 2);
}

function renderMundo() {
  const cam = getCamera();
  const camCell = screenToCell(W/2, H/2);
  
  // Fondo negro
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  
  const pgx = Math.floor(pl.gx);
  const pgy = Math.floor(pl.gy);
  
  // Renderizar tiles con fog of war circular y oscurecimiento gradual
  for (let y = 0; y < WORLD_H; y++) {
    for (let x = 0; x < WORLD_W; x++) {
      const s = iso(x, y);
      const sx = s.x + cam.x - TW/2;
      const sy = s.y + cam.y - TH/2;
      if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
      
      // Distancia euclidiana para bordes redondeados
      const dx = x - pgx;
      const dy = y - pgy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Fuera del campo de visión = invisible
      if (dist > VISION_RADIO + 0.5) continue;
      
      const bioma = BIOMAS[getBioma(x, y)];
      const tile = world[y][x];
      const inPath = pl.path.find(p => p.x === x && p.y === y);
      
      // Calcular opacidad según distancia (1.0 en centro → 0.0 en borde)
      let alpha = 1.0;
      if (dist > VISION_RADIO - 2) {
        // Zona de transición: de 1.0 a 0.0 en las últimas 2 tiles
        alpha = Math.max(0, 1.0 - ((dist - (VISION_RADIO - 2)) / 2.5));
      }
      
      ctx.globalAlpha = alpha;
      
      if (tile === 1) {
        drawDiamond(sx, sy, TW, TH, '#1565c0', '#4fc3f7');
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(sx - 8, sy + TH/2, 6, 2);
      } else {
        drawDiamond(sx, sy, TW, TH, (x+y) % 2 === 0 ? bioma.color1 : bioma.color2, 'rgba(0,0,0,0.12)');
        
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.beginPath();
        ctx.moveTo(sx, sy + TH);
        ctx.lineTo(sx + TW/2, sy + TH/2);
        ctx.lineTo(sx + TW/2, sy + TH + TH/2);
        ctx.lineTo(sx, sy + TH + TH/2);
        ctx.closePath();
        ctx.fill();
      }
      
      if (inPath) {
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.18)', null);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Cofres (solo si están en visión)
  for (const co of cofres) {
    if (co.abierto) continue;
    const dx = co.x - pgx;
    const dy = co.y - pgy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > VISION_RADIO) continue;
    
    const s = iso(co.x, co.y);
    const sx = s.x + cam.x;
    const sy = s.y + cam.y;
    if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(sx - 5, sy - 3, 10, 6);
    ctx.fillStyle = '#b8860b';
    ctx.fillRect(sx - 5, sy - 3, 10, 2);
  }
  
  // NPCs (solo si están en visión)
  for (const n of npcs) {
    const dx = n.x - pgx;
    const dy = n.y - pgy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > VISION_RADIO) continue;
    
    const s = iso(n.x, n.y);
    const sx = s.x + cam.x;
    const sy = s.y + cam.y;
    if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
    drawChar(sx, sy, n.color, 0);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n.nombre, sx, sy - 8);
  }
  
  // Jugador (siempre visible)
  const ps = iso(pl.fx, pl.fy);
  drawChar(ps.x + cam.x, ps.y + cam.y, '#1976d2', pl.frame === 0 ? 0 : 1);
}
