// ============================================================================
// TEXTURAS - Terreno, Hierba, Suelo, Caminos
// ============================================================================

function texturaHierba(sx, sy, biomaId, v) {
  ctx.fillStyle = '#7cb342';
  
  switch(biomaId) {
    case 0: // Pueblo
      ctx.fillRect(sx - 6, sy + TH/2 - 4, 2, 5);
      ctx.fillRect(sx + 4, sy + TH/2 - 2, 2, 4);
      ctx.fillRect(sx - 2, sy + TH/2 - 6, 2, 6);
      ctx.fillRect(sx + 8, sy + TH/2 - 3, 2, 4);
      ctx.fillRect(sx - 10, sy + TH/2 - 2, 2, 3);
      break;
    case 1: // Bosque - hierba alta
      for (let i = 0; i < 4; i++) {
        const hx = sx - 12 + i * 6 + (v % 3);
        ctx.fillRect(hx, sy + TH/2 - 6 - (v % 3), 2, 7 + (v % 3));
      }
      break;
    case 2: // Desierto - cactus pequeños
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(sx - 4, sy + TH/2 - 8, 4, 8);
      ctx.fillRect(sx + 2, sy + TH/2 - 6, 3, 6);
      ctx.fillRect(sx + 6, sy + TH/2 - 10, 3, 10);
      break;
    case 3: // Montaña - hierba corta
      ctx.fillStyle = '#689f38';
      ctx.fillRect(sx - 8, sy + TH/2 - 3, 2, 3);
      ctx.fillRect(sx + 2, sy + TH/2 - 4, 2, 4);
      ctx.fillRect(sx + 7, sy + TH/2 - 3, 2, 3);
      break;
    case 4: // Pantano - juncos
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(sx - 6, sy + TH/2 - 6, 1, 7);
      ctx.fillRect(sx + 4, sy + TH/2 - 8, 1, 9);
      ctx.fillRect(sx + 9, sy + TH/2 - 5, 1, 6);
      break;
    case 5: // Volcán - ceniza
      ctx.fillStyle = '#424242';
      ctx.fillRect(sx - 6, sy + TH/2 - 2, 2, 2);
      ctx.fillRect(sx + 4, sy + TH/2 - 3, 2, 3);
      ctx.fillRect(sx + 8, sy + TH/2 - 2, 2, 2);
      break;
    case 6: // Castillo
      ctx.fillRect(sx - 6, sy + TH/2 - 4, 2, 5);
      ctx.fillRect(sx + 4, sy + TH/2 - 2, 2, 4);
      ctx.fillRect(sx - 2, sy + TH/2 - 6, 2, 6);
      break;
  }
}

function texturaSuelo(sx, sy, v) {
  // Grietas y textura del suelo
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  
  // Grietas irregulares
  const g1x = sx - 8 + (v % 5);
  const g1y = sy + TH/4 + (v % 3);
  ctx.fillRect(g1x, g1y, 1, 3 + (v % 2));
  ctx.fillRect(g1x + 2, g1y + 2, 2, 1);
  
  // Pequeñas piedras
  ctx.fillStyle = 'rgba(120,120,120,0.3)';
  ctx.fillRect(sx + 6, sy + TH/3, 2, 2);
  ctx.fillRect(sx - 4, sy + TH/2 - 1, 1, 1);
  ctx.fillRect(sx + 10, sy + TH/2, 2, 1);
  
  // Hojas/ramas caídas
  if (v % 7 === 0) {
    ctx.fillStyle = 'rgba(139,100,50,0.4)';
    ctx.fillRect(sx - 3, sy + TH/2, 3, 1);
  }
  if (v % 11 === 0) {
    ctx.fillStyle = 'rgba(100,80,40,0.3)';
    ctx.fillRect(sx + 5, sy + TH/3, 2, 1);
  }
}

function drawTexturasBioma(sx, sy, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const biomaId = getBioma(x, y);
  
  texturaHierba(sx, sy, biomaId, v);
  texturaSuelo(sx, sy, v);
}

// === CAMINOS CON BORDES DE HIERBA ===
function drawCaminoTierra(sx, sy, v) {
  // Base del camino (tierra)
  ctx.fillStyle = '#a1887f';
  ctx.fillRect(sx - TW/3, sy + TH/4, TW*2/3, TH/3);
  
  // Textura de tierra
  ctx.fillStyle = 'rgba(139,100,50,0.3)';
  ctx.fillRect(sx - 4, sy + TH/3, 2, 2);
  ctx.fillRect(sx + 3, sy + TH/3 + 1, 2, 1);
  ctx.fillRect(sx + 8, sy + TH/4 + 1, 1, 2);
  
  // Bordes con hierba
  ctx.fillStyle = '#7cb342';
  ctx.fillRect(sx - TW/3, sy + TH/4, 2, TH/3);
  ctx.fillRect(sx + TW/3 - 2, sy + TH/4, 2, TH/3);
  
  // Briznas en bordes
  ctx.fillStyle = '#8bc34a';
  ctx.fillRect(sx - TW/3 + 1, sy + TH/4 - 2, 1, 3);
  ctx.fillRect(sx + TW/3 - 2, sy + TH/4 - 1, 1, 2);
}

// === TRANSICIÓN ENTRE BIOMAS ===
function drawTransicion(sx, sy, x, y) {
  const biomaId = getBioma(x, y);
  const biomaColor = BIOMAS[biomaId].color1;
  
  // Verificar vecinos para transición
  let tieneAguaVecina = false;
  let tieneOtroBioma = false;
  
  for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < WORLD_W && ny >= 0 && ny < WORLD_H) {
      if (world[ny][nx] === 1) tieneAguaVecina = true;
      if (getBioma(nx, ny) !== biomaId) tieneOtroBioma = true;
    }
  }
  
  // Borde de agua (playa)
  if (tieneAguaVecina) {
    ctx.fillStyle = 'rgba(210,180,120,0.5)';
    ctx.fillRect(sx - TW/4, sy + TH/2 - 1, TW/2, 2);
  }
  
  // Borde entre biomas (degradado sutil)
  if (tieneOtroBioma && !tieneAguaVecina) {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(sx - TW/4, sy, TW/2, TH/4);
  }
}
