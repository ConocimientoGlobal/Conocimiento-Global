// ============================================================================
// RENDER - Con texturas integradas
// ============================================================================

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
  
  // Tiles con texturas
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
        
        // Aplicar texturas
        drawTexturasBioma(sx, sy, x, y);
        drawTransicion(sx, sy, x, y);
      }
      
      if (inPath) {
        drawDiamond(sx, sy, TW, TH, 'rgba(200,200,80,0.18)', null);
      }
      
      ctx.globalAlpha = 1.0;
    }
  }
  
  // Decoraciones y vegetación
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
      
      if (tipo < 6) {
        let tipoArbol = 'roble';
        switch(biomaId) {
          case 1: tipoArbol = v % 3 === 0 ? 'pino' : (v % 3 === 1 ? 'roble' : 'abedul'); break;
          case 2: tipoArbol = 'palmera'; break;
          case 3: tipoArbol = 'pino'; break;
          case 4: tipoArbol = v % 3 === 0 ? 'muerto' : 'roble'; break;
          case 5: tipoArbol = 'muerto'; break;
          case 6: tipoArbol = 'roble'; break;
          case 0: tipoArbol = v % 2 === 0 ? 'roble' : 'abedul'; break;
        }
        drawArbol(sx, sy, tipoArbol);
      } else if (tipo < 9) {
        drawRoca(sx, sy);
      } else if (tipo < 11 && biomaId === 0) {
        drawCasa(sx, sy);
      } else if (tipo < 12 && biomaId === 0) {
        drawFuente(sx, sy);
      } else if (tipo < 14) {
        let colorFlor = '#fff';
        switch(biomaId) {
          case 0: colorFlor = v % 2 === 0 ? '#fff' : '#ffeb3b'; break;
          case 1: colorFlor = v % 2 === 0 ? '#9c27b0' : '#fff'; break;
          case 2: colorFlor = '#ff9800'; break;
          case 3: colorFlor = '#fff'; break;
          case 4: colorFlor = '#fff'; break;
        }
        drawFlor(sx, sy, colorFlor);
      } else if (tipo < 16) {
        const colorHongo = v % 2 === 0 ? '#8d6e63' : (v % 3 === 0 ? '#4caf50' : '#2196f3');
        drawHongo(sx, sy, colorHongo);
      } else if (tipo < 19) {
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
