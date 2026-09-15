// ============================================================================
// TEXTURAS - Detalladas, Suelo, Hierba, Caminos, Decorations
// ============================================================================

function texturaHierba(sx, sy, biomaId, v) {
  switch(biomaId) {
    case 0: // Pueblo
      ctx.fillStyle = '#7cb342';
      ctx.fillRect(sx - 8, sy + TH/2 - 6, 3, 7);
      ctx.fillRect(sx + 5, sy + TH/2 - 4, 3, 5);
      ctx.fillRect(sx - 3, sy + TH/2 - 8, 3, 9);
      ctx.fillRect(sx + 10, sy + TH/2 - 5, 3, 6);
      ctx.fillRect(sx - 12, sy + TH/2 - 3, 3, 4);
      ctx.fillStyle = '#8bc34a';
      ctx.fillRect(sx - 6, sy + TH/2 - 10, 2, 11);
      ctx.fillRect(sx + 7, sy + TH/2 - 9, 2, 10);
      break;
    case 1: // Bosque
      for (let i = 0; i < 6; i++) {
        const hx = sx - 14 + i * 5 + (v % 3);
        const h = 8 + (v % 4);
        ctx.fillStyle = (i + v) % 2 === 0 ? '#7cb342' : '#689f38';
        ctx.fillRect(hx, sy + TH/2 - h, 2, h + 2);
      }
      break;
    case 2: // Desierto
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(sx - 6, sy + TH/2 - 12, 5, 12);
      ctx.fillRect(sx + 4, sy + TH/2 - 8, 4, 8);
      ctx.fillRect(sx + 10, sy + TH/2 - 14, 4, 14);
      ctx.fillStyle = '#388e3c';
      ctx.fillRect(sx - 4, sy + TH/2 - 10, 3, 10);
      break;
    case 3: // Montaña
      ctx.fillStyle = '#689f38';
      ctx.fillRect(sx - 10, sy + TH/2 - 4, 3, 4);
      ctx.fillRect(sx + 3, sy + TH/2 - 6, 3, 6);
      ctx.fillRect(sx + 9, sy + TH/2 - 4, 3, 4);
      ctx.fillStyle = '#558b2f';
      ctx.fillRect(sx - 5, sy + TH/2 - 5, 2, 5);
      ctx.fillRect(sx + 6, sy + TH/2 - 7, 2, 7);
      break;
    case 4: // Pantano
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(sx - 8, sy + TH/2 - 8, 2, 9);
      ctx.fillRect(sx + 5, sy + TH/2 - 10, 2, 11);
      ctx.fillRect(sx + 12, sy + TH/2 - 6, 2, 7);
      ctx.fillStyle = '#795548';
      ctx.fillRect(sx - 4, sy + TH/2 - 12, 2, 13);
      ctx.fillRect(sx + 8, sy + TH/2 - 9, 2, 10);
      break;
    case 5: // Volcán
      ctx.fillStyle = '#424242';
      ctx.fillRect(sx - 8, sy + TH/2 - 3, 3, 3);
      ctx.fillRect(sx + 5, sy + TH/2 - 4, 3, 4);
      ctx.fillRect(sx + 10, sy + TH/2 - 2, 3, 2);
      ctx.fillStyle = '#616161';
      ctx.fillRect(sx - 3, sy + TH/2 - 5, 2, 5);
      break;
    case 6: // Castillo
      ctx.fillStyle = '#7cb342';
      ctx.fillRect(sx - 8, sy + TH/2 - 6, 3, 7);
      ctx.fillRect(sx + 5, sy + TH/2 - 4, 3, 5);
      ctx.fillRect(sx - 3, sy + TH/2 - 8, 3, 9);
      ctx.fillStyle = '#8bc34a';
      ctx.fillRect(sx + 10, sy + TH/2 - 5, 2, 6);
      break;
  }
}

function texturaSuelo(sx, sy, v) {
  // Grietas profundas
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  const g1x = sx - 10 + (v % 6);
  const g1y = sy + TH/4 + (v % 4);
  ctx.fillRect(g1x, g1y, 1, 4 + (v % 3));
  ctx.fillRect(g1x + 2, g1y + 2, 3, 1);
  ctx.fillRect(g1x + 5, g1y - 1, 1, 3);
  
  // Grietas secundarias
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(sx + 8, sy + TH/3 + 1, 1, 2);
  ctx.fillRect(sx - 6, sy + TH/2 - 2, 2, 1);
  
  // Pequeñas piedras
  ctx.fillStyle = 'rgba(120,120,120,0.35)';
  ctx.fillRect(sx + 7, sy + TH/3, 3, 2);
  ctx.fillRect(sx - 5, sy + TH/2 - 1, 2, 2);
  ctx.fillRect(sx + 12, sy + TH/2, 2, 2);
  ctx.fillRect(sx - 10, sy + TH/3, 2, 1);
  
  // Guijarros
  ctx.fillStyle = 'rgba(100,100,100,0.25)';
  ctx.fillRect(sx + 3, sy + TH/2, 1, 1);
  ctx.fillRect(sx - 8, sy + TH/2 + 1, 1, 1);
  ctx.fillRect(sx + 14, sy + TH/4, 1, 1);
  
  // Hojas/ramas caídas
  if (v % 5 === 0) {
    ctx.fillStyle = 'rgba(139,100,50,0.45)';
    ctx.fillRect(sx - 4, sy + TH/2 + 1, 4, 1);
  }
  if (v % 7 === 0) {
    ctx.fillStyle = 'rgba(100,80,40,0.35)';
    ctx.fillRect(sx + 6, sy + TH/3 + 1, 3, 1);
  }
  if (v % 11 === 0) {
    ctx.fillStyle = 'rgba(160,130,70,0.4)';
    ctx.fillRect(sx - 2, sy + TH/2 + 2, 3, 1);
  }
  
  // Musgo/liquen en sombra
  if (v % 13 === 0) {
    ctx.fillStyle = 'rgba(80,120,60,0.3)';
    ctx.fillRect(sx - 8, sy + TH/4, 4, 2);
  }
  
  // Pequeños charcos de agua (pantano)
  if (v % 17 === 0) {
    ctx.fillStyle = 'rgba(60,140,180,0.25)';
    ctx.fillRect(sx + 4, sy + TH/3, 3, 2);
  }
  
  // Marcas de pisadas
  if (v % 23 === 0) {
    ctx.fillStyle = 'rgba(80,60,30,0.15)';
    ctx.fillRect(sx - 3, sy + TH/2 + 1, 2, 3);
    ctx.fillRect(sx + 2, sy + TH/2 + 2, 2, 3);
  }
}

function drawTexturasBioma(sx, sy, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const biomaId = getBioma(x, y);
  texturaHierba(sx, sy, biomaId, v);
  texturaSuelo(sx, sy, v);
}

function drawCaminoTierra(sx, sy, v) {
  ctx.fillStyle = '#a1887f';
  ctx.fillRect(sx - TW/3, sy + TH/4, TW*2/3, TH/3);
  
  ctx.fillStyle = 'rgba(139,100,50,0.35)';
  ctx.fillRect(sx - 5, sy + TH/3, 3, 2);
  ctx.fillRect(sx + 4, sy + TH/3 + 1, 2, 2);
  ctx.fillRect(sx + 10, sy + TH/4 + 1, 2, 3);
  
  ctx.fillStyle = '#7cb342';
  ctx.fillRect(sx - TW/3, sy + TH/4, 3, TH/3);
  ctx.fillRect(sx + TW/3 - 3, sy + TH/4, 3, TH/3);
  
  ctx.fillStyle = '#8bc34a';
  ctx.fillRect(sx - TW/3 + 1, sy + TH/4 - 3, 2, 4);
  ctx.fillRect(sx + TW/3 - 3, sy + TH/4 - 2, 2, 3);
}
