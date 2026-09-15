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

function drawPlayer(sx, sy, bo) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 14, 5, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Zapatos
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 6, sy + TH/2, 5, 4);
  ctx.fillRect(sx + 1, sy + TH/2, 5, 4);
  
  // Piernas
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy + TH/2 - 8, 4, 9 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 4, 9 + bo);
  
  // Cuerpo (armadura)
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 16, 16);
  // Hombreras
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(sx - 10, sy + TH/2 - 24, 4, 6);
  ctx.fillRect(sx + 6, sy + TH/2 - 24, 4, 6);
  // Cinturón
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(sx - 8, sy + TH/2 - 10, 16, 3);
  ctx.fillStyle = '#ff8f00';
  ctx.fillRect(sx - 2, sy + TH/2 - 10, 4, 3); // Hebulla
  
  // Brazos
  ctx.fillStyle = '#1976d2';
  ctx.fillRect(sx - 11, sy + TH/2 - 20, 3, 12);
  ctx.fillRect(sx + 8, sy + TH/2 - 20, 3, 12);
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 11, sy + TH/2 - 20, 3, 4); // Mano izq
  ctx.fillRect(sx + 8, sy + TH/2 - 20, 3, 4); // Mano der
  
  // Cabeza
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  
  // Pelo
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 6, sy + TH/2 - 34, 12, 5);
  ctx.fillRect(sx - 6, sy + TH/2 - 34, 2, 8);
  ctx.fillRect(sx + 4, sy + TH/2 - 34, 2, 8);
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  // Brillos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 1, 1);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 1, 1);
  
  // Boca
  ctx.fillStyle = '#d78a7a';
  ctx.fillRect(sx - 2, sy + TH/2 - 22, 4, 1);
}

function drawNPC(sx, sy, npc, bo) {
  const color = npc.color;
  
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + TH/2 + 6, 14, 5, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Zapatos
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(sx - 6, sy + TH/2, 5, 4);
  ctx.fillRect(sx + 1, sy + TH/2, 5, 4);
  
  // Piernas
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(sx - 5, sy + TH/2 - 8, 4, 9 + bo);
  ctx.fillRect(sx + 1, sy + TH/2 - 8, 4, 9 + bo);
  
  // Cuerpo
  ctx.fillStyle = color;
  ctx.fillRect(sx - 8, sy + TH/2 - 22, 16, 16);
  // Cuello/Collar
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(sx - 6, sy + TH/2 - 24, 12, 3);
  // Cinturón
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(sx - 8, sy + TH/2 - 10, 16, 3);
  
  // Brazos
  ctx.fillStyle = color;
  ctx.fillRect(sx - 11, sy + TH/2 - 20, 3, 12);
  ctx.fillRect(sx + 8, sy + TH/2 - 20, 3, 12);
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 11, sy + TH/2 - 20, 3, 4);
  ctx.fillRect(sx + 8, sy + TH/2 - 20, 3, 4);
  
  // Cabeza
  ctx.fillStyle = '#ffe0b2';
  ctx.fillRect(sx - 5, sy + TH/2 - 32, 10, 9);
  
  // Pelo según tipo de NPC
  ctx.fillStyle = '#3e2723';
  if (npc.nombre === 'Mago' || npc.nombre === 'Bruja') {
    // Pelo largo/puntoy
    ctx.fillRect(sx - 7, sy + TH/2 - 36, 14, 8);
    ctx.fillRect(sx - 8, sy + TH/2 - 32, 3, 10);
    ctx.fillRect(sx + 5, sy + TH/2 - 32, 3, 10);
  } else if (npc.nombre === 'Rey') {
    // Corona
    ctx.fillStyle = '#ffd600';
    ctx.fillRect(sx - 6, sy + TH/2 - 36, 12, 6);
    ctx.fillRect(sx - 6, sy + TH/2 - 38, 2, 3);
    ctx.fillRect(sx - 1, sy + TH/2 - 39, 2, 4);
    ctx.fillRect(sx + 4, sy + TH/2 - 38, 2, 3);
  } else {
    // Pelo normal
    ctx.fillRect(sx - 6, sy + TH/2 - 34, 12, 5);
  }
  
  // Ojos
  ctx.fillStyle = '#fff';
  ctx.fillRect(sx - 3, sy + TH/2 - 28, 3, 3);
  ctx.fillRect(sx + 1, sy + TH/2 - 28, 3, 3);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(sx - 2, sy + TH/2 - 27, 2, 2);
  ctx.fillRect(sx + 2, sy + TH/2 - 27, 2, 2);
  
  // Boca
  ctx.fillStyle = '#d78a7a';
  ctx.fillRect(sx - 2, sy + TH/2 - 22, 4, 1);
  
  // Indicador de interacción (punto encima)
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(sx, sy + TH/2 - 42, 2, 0, Math.PI * 2);
  ctx.fill();
}

function renderMundo() {
  const cam = getCamera();
  const camCell = screenToCell(W/2, H/2);
  
  // Fondo negro
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  
  const pgx = Math.floor(pl.gx);
  const pgy = Math.floor(pl.gy);
  
  // Tiles con fog of war circular
  for (let y = Math.max(0, camCell.y - VISION_RADIO - 2); y < Math.min(WORLD_H, camCell.y + VISION_RADIO + 2); y++) {
    for (let x = Math.max(0, camCell.x - VISION_RADIO - 2); x < Math.min(WORLD_W, camCell.x + VISION_RADIO + 2); x++) {
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
    if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(sx - 5, sy - 3, 10, 6);
    ctx.fillStyle = '#b8860b';
    ctx.fillRect(sx - 5, sy - 3, 10, 2);
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
    if (sx < -TW || sx > W + TW || sy < -TH || sy > H + TH) continue;
    drawNPC(sx, sy, n, 0);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(n.nombre, sx, sy - 12);
  }
  
  // Jugador
  const ps = iso(pl.fx, pl.fy);
  drawPlayer(ps.x + cam.x, ps.y + cam.y, pl.frame === 0 ? 0 : 1);
}
