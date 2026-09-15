// ============================================================================
// UI - HUD, Minimapa DINÁMICO con rotación, Mensajes
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
  
  // === MINIMAPA DINÁMICO CON ROTACIÓN ===
  const mmW = 100, mmH = 100;
  const mmX = W - mmW - 10, mmY = H - mmH - 10;
  const mmCX = mmX + mmW / 2;
  const mmCY = mmY + mmH / 2;
  
  // Fondo
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(mmX, mmY, mmW, mmH);
  
  // Guardar contexto para rotación
  ctx.save();
  
  // Trasladar al centro del minimapa
  ctx.translate(mmCX, mmCY);
  
  // Rotar según la dirección del jugador
  // Calcular ángulo de rotación basado en lastDir
  let angle = 0;
  if (lastDir.x !== 0 || lastDir.y !== 0) {
    angle = Math.atan2(lastDir.y, lastDir.x) - Math.PI / 2;
  }
  ctx.rotate(angle);
  
  // Biomas en minimapa (rotados)
  for (let y = 0; y < WORLD_H; y += 1) {
    for (let x = 0; x < WORLD_W; x += 1) {
      // Convertir coordenadas de mundo a offset desde el jugador
      const ox = (x - pl.gx) / WORLD_W * mmW;
      const oy = (y - pl.gy) / WORLD_H * mmH;
      
      // Solo mostrar si está dentro del radio circular
      const dist = Math.sqrt(ox*ox + oy*oy);
      if (dist > mmW / 2 - 2) continue;
      
      const b = BIOMAS[getBioma(x, y)];
      ctx.fillStyle = b.color1;
      ctx.fillRect(ox - 1, oy - 1, 2, 2);
    }
  }
  
  // NPCs en minimapa (rotados, solo en visión)
  ctx.fillStyle = '#0ff';
  for (const n of npcs) {
    const ox = (n.x - pl.gx) / WORLD_W * mmW;
    const oy = (n.y - pl.gy) / WORLD_H * mmH;
    const dist = Math.sqrt(ox*ox + oy*oy);
    if (dist <= mmW / 2 - 2) {
      ctx.fillRect(ox - 1, oy - 1, 2, 2);
    }
  }
  
  // Restaurar contexto (sin rotación)
  ctx.restore();
  
  // Borde circular del fog (no rotado)
  const fogRadius = mmW / 2 - 2;
  const fogInner = fogRadius - 6;
  
  // Gradiente circular para bordes suaves
  const gradient = ctx.createRadialGradient(mmCX, mmCY, fogInner, mmCX, mmCY, fogRadius + 4);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.4)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.95)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(mmCX, mmCY, fogRadius + 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Jugador en minimapa (centro, con indicador de dirección)
  ctx.fillStyle = '#ff0';
  ctx.fillRect(mmCX - 3, mmCY - 3, 6, 6);
  
  // Indicador de dirección (flecha)
  if (lastDir.x !== 0 || lastDir.y !== 0) {
    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    const arrowLen = 8;
    ctx.moveTo(mmCX, mmCY - arrowLen);
    ctx.lineTo(mmCX - 3, mmCY - arrowLen + 4);
    ctx.lineTo(mmCX + 3, mmCY - arrowLen + 4);
    ctx.closePath();
    ctx.fill();
  }
  
  // Borde del minimapa
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.strokeRect(mmX, mmY, mmW, mmH);
  
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
