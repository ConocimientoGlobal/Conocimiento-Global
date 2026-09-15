// ============================================================================
// UI - HUD, Minimapa con Fog of War, Mensajes
// ============================================================================

let mensaje = {titulo: '', texto: '', t: 0};

function mostrarMensaje(titulo, texto) {
  mensaje = {titulo, texto, t: 3};
}

function renderUI() {
  // Fondo UI
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(10, 10, 160, 70);
  
  // Nombre y nivel
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Lv.' + pl.nivel + ' Hero', 18, 26);
  
  // Barra HP
  ctx.fillStyle = '#4a0000';
  ctx.fillRect(18, 34, 140, 8);
  ctx.fillStyle = '#e44';
  ctx.fillRect(19, 35, 138 * pl.hp / pl.mhp, 6);
  ctx.fillStyle = '#fff';
  ctx.font = '8px monospace';
  ctx.fillText(Math.floor(pl.hp) + '/' + pl.mhp, 75, 40);
  
  // Barra dificultad
  const bioma = BIOMAS[pl.biomaActual];
  if (bioma.dificultad === 'sed' || bioma.dificultad === 'calor') {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(18, 50, 140, 6);
    ctx.fillStyle = bioma.dificultad === 'sed' ? '#0288d1' : '#e65100';
    ctx.fillRect(18, 50, 140 * pl.sed / pl.maxSed, 6);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.fillText('SED', 78, 55);
  } else if (bioma.dificultad === 'frio') {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(18, 50, 140, 6);
    ctx.fillStyle = '#0277bd';
    ctx.fillRect(18, 50, 140 * pl.temp / pl.maxTemp, 6);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.fillText('TEMP', 76, 55);
  } else if (bioma.dificultad === 'veneno') {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(18, 50, 140, 6);
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(18, 50, 140, 6);
    ctx.fillStyle = '#fff';
    ctx.font = '7px monospace';
    ctx.fillText('TOXICO', 73, 55);
  }
  
  // Info inferior
  ctx.fillStyle = '#ffd700';
  ctx.font = '11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('Oro: ' + pl.oro, 18, H - 60);
  ctx.fillStyle = '#0f0';
  ctx.fillText('Bioma: ' + bioma.nombre, 18, H - 45);
  ctx.fillText('Pos: ' + Math.floor(pl.gx) + ',' + Math.floor(pl.gy), 18, H - 30);
  
  // === MINIMAPA CON FOG OF WAR ===
  const mmW = 100, mmH = 100;
  const mmX = W - mmW - 10, mmY = H - mmH - 10;
  
  // Fondo
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(mmX, mmY, mmW, mmH);
  
  // Borde circular del fog
  const mmCX = mmX + mmW / 2;
  const mmCY = mmY + mmH / 2;
  const mmR = mmW / 2 - 2;
  
  // Biomas en minimapa con fog circular
  const cellSize = 2;
  for (let y = 0; y < WORLD_H; y += 1) {
    for (let x = 0; x < WORLD_W; x += 1) {
      // Convertir coordenadas de mundo a coordenadas de minimapa
      const mx = mmX + (x / WORLD_W) * mmW;
      const my = mmY + (y / WORLD_H) * mmH;
      
      // Distancia al centro del minimapa (posición del jugador)
      const dx = mx - mmCX;
      const dy = my - mmCY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Solo mostrar si está dentro del radio circular
      if (dist > mmR) continue;
      
      const b = BIOMAS[getBioma(x, y)];
      ctx.fillStyle = b.color1;
      ctx.fillRect(mx, my, cellSize, cellSize);
    }
  }
  
  // Fog circular en minimapa: oscurecer fuera del radio del jugador
  const fogRadius = (VISION_RADIO / WORLD_W) * mmW;
  const fogInner = fogRadius - 4;
  
  // Gradiente circular para bordes suaves
  const gradient = ctx.createRadialGradient(mmCX, mmCY, fogInner, mmCX, mmCY, fogRadius + 4);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.3)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.9)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(mmCX, mmCY, fogRadius + 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Jugador en minimapa
  ctx.fillStyle = '#ff0';
  ctx.fillRect(mmCX - 3, mmCY - 3, 6, 6);
  
  // NPCs en minimapa (solo si están en visión circular)
  ctx.fillStyle = '#0ff';
  for (const n of npcs) {
    const nmx = mmX + (n.x / WORLD_W) * mmW;
    const nmy = mmY + (n.y / WORLD_H) * mmH;
    const ndx = nmx - mmCX;
    const ndy = nmy - mmCY;
    const ndist = Math.sqrt(ndx*ndx + ndy*ndy);
    if (ndist <= fogRadius) {
      ctx.fillRect(nmx - 1, nmy - 1, 2, 2);
    }
  }
  
  // Leyenda
  ctx.fillStyle = '#fff';
  ctx.font = '8px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('Mapa', mmX + 2, mmY - 5);
  
  // Mensaje flotante
  if (mensaje.t > 0) {
    const alpha = Math.min(1, mensaje.t);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    ctx.fillRect(W/2 - 100, H/2 - 40, 200, 80);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(W/2 - 100, H/2 - 40, 200, 80);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(mensaje.titulo, W/2, H/2 - 10);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(mensaje.texto, W/2, H/2 + 15);
    ctx.globalAlpha = 1;
  }
}
