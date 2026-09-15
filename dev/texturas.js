// ============================================================================
// TEXTURAS PIXEL ART - Mar, Vegetación Detallada, Suelo Realista
// ============================================================================

// === MAR/AGUA CON PECES, ESPUMA, ROCAS, CORAL ===
function drawMar(sx, sy, w, h, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const waveOffset = Math.sin((frameCount * 0.04) + (x + y) * 0.25) * 1.5;
  
  // Base del mar con variación de profundidad
  const tono = 40 + (v % 30);
  ctx.fillStyle = `rgb(${20},${80 + (v % 40)},${120 + (v % 50)})`;
  
  ctx.beginPath();
  ctx.moveTo(sx, sy + waveOffset);
  ctx.lineTo(sx + w / 2, sy + h / 2 + waveOffset);
  ctx.lineTo(sx, sy + h + waveOffset);
  ctx.lineTo(sx - w / 2, sy + h / 2 + waveOffset);
  ctx.closePath();
  ctx.fill();
  
  // Líneas de profundidad (variación de azul)
  ctx.fillStyle = `rgba(20,${90 + (v % 30)},${140 + (v % 40)},0.3)`;
  ctx.fillRect(sx - 8, sy + TH/3 + 1, 16, 2);
  ctx.fillRect(sx - 4, sy + TH/2 - 1, 8, 1);
  
  // Onda superior (espuma)
  ctx.fillStyle = 'rgba(200,230,255,0.5)';
  ctx.fillRect(sx - 10 + waveOffset, sy + TH/4 - 1, 5, 1);
  ctx.fillRect(sx + 3 + waveOffset * 0.7, sy + TH/3, 4, 1);
  
  // Espuma
  ctx.fillStyle = 'rgba(220,240,255,0.4)';
  ctx.fillRect(sx - 6 + waveOffset, sy + TH/4 + 1, 3, 1);
  ctx.fillRect(sx + 2 + waveOffset * 0.8, sy + TH/3 + 1, 2, 1);
  
  // Peces
  if (v % 7 < 2) {
    const pezx = sx - 6 + ((frameCount * 0.3 + v) % 12);
    const pezy = sy + TH/3 + (v % 3);
    ctx.fillStyle = v % 2 === 0 ? '#ff8f00' : '#ffb300';
    ctx.fillRect(pezx, pezy, 3, 2);
    ctx.fillStyle = v % 2 === 0 ? '#ffcc02' : '#ffd54f';
    ctx.fillRect(pezx - 1, pezy, 1, 2);
  }
  
  // Rocas sumergidas
  if (v % 11 === 0) {
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(sx + 4, sy + TH/2 - 2, 5, 4);
    ctx.fillStyle = '#4e342e';
    ctx.fillRect(sx + 4, sy + TH/2 - 2, 5, 1);
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(sx + 5, sy + TH/2, 2, 2);
  }
  
  // Coral
  if (v % 13 === 0) {
    ctx.fillStyle = v % 2 === 0 ? '#e91e63' : '#f06292';
    ctx.fillRect(sx - 8, sy + TH/2, 3, 4);
    ctx.fillRect(sx - 6, sy + TH/2 - 2, 2, 2);
    ctx.fillStyle = v % 2 === 0 ? '#c2185b' : '#e91e63';
    ctx.fillRect(sx - 7, sy + TH/2 + 1, 2, 3);
  }
  
  // Burbujas
  if (v % 17 === 0) {
    const bx = sx + ((frameCount * 0.1 + v) % 10) - 5;
    const by = sy + TH/4 + ((frameCount * 0.05 + v) % 4);
    ctx.fillStyle = 'rgba(200,230,255,0.6)';
    ctx.fillRect(bx, by, 1, 1);
  }
  
  // Corriente (líneas de agua)
  ctx.fillStyle = 'rgba(100,180,220,0.2)';
  ctx.fillRect(sx - 12 + waveOffset * 1.5, sy + TH/3 - 2, 8, 1);
  ctx.fillRect(sx + 4 + waveOffset * 0.5, sy/2 + TH/4, 6, 1);
}

// === AGUA DULCE (ríos, lagos) ===
function drawAguaDulce(sx, sy, w, h, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const waveOffset = Math.sin((frameCount * 0.05) + (x + y) * 0.3) * 2;
  
  // Base
  ctx.fillStyle = `rgb(${30 + (v % 20)},${100 + (v % 40)},${160 + (v % 30)})`;
  
  ctx.beginPath();
  ctx.moveTo(sx, sy + waveOffset);
  ctx.lineTo(sx + w / 2, sy + h / 2 + waveOffset);
  ctx.lineTo(sx, sy + h + waveOffset);
  ctx.lineTo(sx - w / 2, sy + h / 2 + waveOffset);
  ctx.closePath();
  ctx.fill();
  
  // Ondas
  ctx.fillStyle = 'rgba(150,210,240,0.4)';
  ctx.fillRect(sx - 8 + waveOffset, sy + TH/3, 5, 1);
  ctx.fillRect(sx + 3 + waveOffset * 0.7, sy + TH/2 - 1, 4, 1);
  
  // Reflejos
  ctx.fillStyle = 'rgba(200,230,255,0.3)';
  ctx.fillRect(sx - 3 + waveOffset, sy + TH/4, 2, 1);
  
  // Pequeños peces
  if (v % 9 === 0) {
    const px = sx - 4 + ((frameCount * 0.2 + v) % 8);
    ctx.fillStyle = '#ff8f00';
    ctx.fillRect(px, sy + TH/3 + 1, 2, 1);
  }
}

// === TILE CON TEXTURA PIXEL ART REALISTA ===
function drawTileConVolumen(sx, sy, w, h, color1, color2, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const bioma = BIOMAS[getBioma(x, y)];
  
  // Tile base
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  
  // Gradiente principal
  const grad = ctx.createLinearGradient(sx - w/2, sy, sx + w/2, sy + h);
  grad.addColorStop(0, shadeColor(color1, 20));
  grad.addColorStop(0.3, color1);
  grad.addColorStop(0.7, color2);
  grad.addColorStop(1, shadeColor(color2, -25));
  ctx.fillStyle = grad;
  ctx.fill();
  
  // Borde superior brillante
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h / 2);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fill();
  
  // Borde inferior sombreado
  ctx.beginPath();
  ctx.moveTo(sx, sy + h);
  ctx.lineTo(sx + w / 2, sy + h / 2);
  ctx.lineTo(sx, sy + h / 2);
  ctx.lineTo(sx - w / 2, sy + h / 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fill();
  
  // Sombra lateral
  ctx.beginPath();
  ctx.moveTo(sx - w/2, sy + h/2);
  ctx.lineTo(sx, sy);
  ctx.lineTo(sx, sy + h/2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fill();
  
  // Textura granular
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  for (let i = 0; i < 6; i++) {
    const nx = sx - w/3 + (v * (i+1) % w*2/3);
    const ny = sy + h/4 + (v * (i+2) % h*3/4);
    ctx.fillRect(nx, ny, 1, 1);
  }
  
  // Grano claro
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  for (let i = 0; i < 4; i++) {
    const nx = sx - w/4 + (v * (i+3) % w/2);
    const ny = sy + h/3 + (v * (i+4) % h/2);
    ctx.fillRect(nx, ny, 1, 1);
  }
  
  // Elevaciones
  if (v % 7 === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(sx - 4 + (v % 8), sy + h/3, 3, 2);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(sx - 4 + (v % 8), sy + h/3 + 2, 3, 1);
  }
  
  // Depresiones
  if (v % 11 === 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(sx + 2 + (v % 6), sy + h/4, 4, 3);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(sx + 2 + (v % 6), sy + h/4, 4, 1);
  }
}

// === VEGETACIÓN CON TALLOS, HOJAS, FLORES ===
function drawHierbaDetallada(sx, sy, biomaId, v) {
  const colorHierba = biomaId === 2 ? '#4caf50' : biomaId === 3 ? '#689f38' : biomaId === 4 ? '#5d4037' : '#7cb342';
  const colorClaro = biomaId === 2 ? '#388e3c' : biomaId === 3 ? '#558b2f' : biomaId === 4 ? '#4e342e' : '#689f38';
  
  // Tallos de hierba (líneas verticales)
  for (let i = 0; i < 4; i++) {
    const tx = sx - 10 + i * 5 + (v % 3);
    const th = 5 + (v % 3);
    ctx.fillStyle = colorHierba;
    ctx.fillRect(tx, sy + TH/2 - th, 1, th + 1);
    // Punta del pasto
    ctx.fillStyle = colorClaro;
    ctx.fillRect(tx, sy + TH/2 - th, 1, 1);
  }
  
  // Hojas pequeñas
  if (v % 3 === 0) {
    ctx.fillStyle = '#8bc34a';
    ctx.fillRect(sx - 6, sy + TH/2 - 4, 2, 1);
    ctx.fillRect(sx + 4, sy + TH/2 - 3, 2, 1);
  }
  
  // Flores silvestres
  if (v % 5 === 0) {
    const florX = sx - 8 + (v % 15);
    const florColor = v % 3 === 0 ? '#fff' : v % 3 === 1 ? '#ffeb3b' : '#f48fb1';
    ctx.fillStyle = florColor;
    ctx.fillRect(florX, sy + TH/2 - 5, 2, 2);
    ctx.fillStyle = '#ffcc02';
    ctx.fillRect(florX + 1, sy + TH/2 - 4, 1, 1);
  }
}

// === SUELO CON TEXTURA REALISTA ===
function drawSueloRealista(sx, sy, v, biomaId) {
  // Grietas
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  const g1x = sx - 10 + (v % 6);
  const g1y = sy + TH/4 + (v % 4);
  ctx.fillRect(g1x, g1y, 1, 3 + (v % 3));
  ctx.fillRect(g1x + 2, g1y + 2, 2, 1);
  
  // Grietas secundarias
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(sx + 8, sy + TH/3 + 1, 1, 2);
  ctx.fillRect(sx - 6, sy + TH/2 - 2, 2, 1);
  
  // Piedras pequeñas
  ctx.fillStyle = 'rgba(100,100,100,0.3)';
  ctx.fillRect(sx + 6, sy + TH/3, 2, 2);
  ctx.fillRect(sx - 4, sy + TH/2 - 1, 1, 1);
  ctx.fillRect(sx + 12, sy + TH/2, 2, 1);
  
  // Guijarros
  ctx.fillStyle = 'rgba(80,80,80,0.25)';
  ctx.fillRect(sx + 3, sy + TH/2, 1, 1);
  ctx.fillRect(sx - 8, sy + TH/2 + 1, 1, 1);
  
  // Hojas/ramas
  if (v % 5 === 0) {
    ctx.fillStyle = 'rgba(139,100,50,0.4)';
    ctx.fillRect(sx - 3, sy + TH/2 + 1, 3, 1);
  }
  if (v % 7 === 0) {
    ctx.fillStyle = 'rgba(100,80,40,0.3)';
    ctx.fillRect(sx + 5, sy + TH/3 + 1, 2, 1);
  }
  
  // Musgo/liquen
  if (v % 13 === 0) {
    ctx.fillStyle = 'rgba(80,120,60,0.25)';
    ctx.fillRect(sx - 6, sy + TH/4, 3, 2);
  }
  
  // Charcos
  if (v % 17 === 0) {
    ctx.fillStyle = 'rgba(60,140,180,0.2)';
    ctx.fillRect(sx + 3, sy + TH/3, 2, 2);
  }
}

function drawTexturasBioma(sx, sy, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const biomaId = getBioma(x, y);
  drawHierbaDetallada(sx, sy, biomaId, v);
  drawSueloRealista(sx, sy, v, biomaId);
}

function drawCaminoTierra(sx, sy, v) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(sx - TW/3 + 2, sy + TH/4 + 2, TW*2/3, TH/3);
  
  // Base
  ctx.fillStyle = '#a1887f';
  ctx.fillRect(sx - TW/3, sy + TH/4, TW*2/3, TH/3);
  
  // Textura tierra
  ctx.fillStyle = 'rgba(139,100,50,0.3)';
  ctx.fillRect(sx - 4, sy + TH/3, 2, 2);
  ctx.fillRect(sx + 3, sy + TH/3 + 1, 2, 1);
  
  // Bordes con hierba
  ctx.fillStyle = '#7cb342';
  ctx.fillRect(sx - TW/3, sy + TH/4, 2, TH/3);
  ctx.fillRect(sx + TW/3 - 2, sy + TH/4, 2, TH/3);
  
  // Briznas
  ctx.fillStyle = '#8bc34a';
  ctx.fillRect(sx - TW/3 + 1, sy + TH/4 - 2, 1, 3);
  ctx.fillRect(sx + TW/3 - 2, sy + TH/4 - 1, 1, 2);
}

// === DECORACIONES CON MÁS DETALLE ===
function drawArbolAlto(px, py, tipo) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(px + 6, py + TH/2, 16, 6, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  switch(tipo) {
    case 'pino':
      // Tronco
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(px - 3, py - 12, 6, 16);
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(px - 3, py - 12, 2, 16);
      // Copa triangular
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.moveTo(px, py - 45);
      ctx.lineTo(px - 14, py - 10);
      ctx.lineTo(px + 14, py - 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.beginPath();
      ctx.moveTo(px, py - 38);
      ctx.lineTo(px - 10, py - 12);
      ctx.lineTo(px + 10, py - 12);
      ctx.closePath();
      ctx.fill();
      // Sombra copa
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(px + 4, py - 38);
      ctx.lineTo(px + 14, py - 10);
      ctx.lineTo(px + 4, py - 10);
      ctx.closePath();
      ctx.fill();
      break;
    case 'palmera':
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(px - 4, py - 16, 8, 20);
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(px - 4, py - 16, 3, 20);
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(px - 18, py - 24, 10, 3);
      ctx.fillRect(px + 8, py - 24, 10, 3);
      ctx.fillRect(px - 5, py - 30, 10, 3);
      break;
    case 'muerto':
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(px - 2, py - 24, 4, 26);
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py - 24);
      ctx.lineTo(px - 10, py - 34);
      ctx.moveTo(px, py - 18);
      ctx.lineTo(px + 8, py - 28);
      ctx.stroke();
      break;
    case 'abedul':
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(px - 3, py - 12, 6, 16);
      // Manchas del abedul
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(px - 2, py - 8, 2, 3);
      ctx.fillRect(px + 1, py - 4, 1, 2);
      const abedul = ctx.createRadialGradient(px, py - 26, 3, px, py - 24, 12);
      abedul.addColorStop(0, '#8bc34a');
      abedul.addColorStop(1, '#388e3c');
      ctx.fillStyle = abedul;
      ctx.beginPath();
      ctx.arc(px, py - 26, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(px - 3, py - 30, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    default: // roble
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(px - 4, py - 10, 7, 14);
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(px - 4, py - 10, 3, 14);
      const roble = ctx.createRadialGradient(px, py - 26, 4, px, py - 24, 14);
      roble.addColorStop(0, '#66bb6a');
      roble.addColorStop(0.6, '#388e3c');
      roble.addColorStop(1, '#1b5e20');
      ctx.fillStyle = roble;
      ctx.beginPath();
      ctx.arc(px, py - 26, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.arc(px - 4, py - 30, 5, 0, Math.PI * 2);
      ctx.fill();
      // Sombra
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.beginPath();
      ctx.arc(px + 4, py - 28, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

function drawRocaGrande(px, py) {
  // Sombra proyectada
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 6, py + TH/2 + 2, 14, 5, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Cara principal
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(px - 10, py + TH/2);
  ctx.lineTo(px - 6, py - 10);
  ctx.lineTo(px + 3, py - 16);
  ctx.lineTo(px + 10, py - 8);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Cara sombreada
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 16);
  ctx.lineTo(px + 10, py - 8);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.lineTo(px + 3, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Brillo superior
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px + 3, py - 16);
  ctx.lineTo(px - 1, py - 8);
  ctx.closePath();
  ctx.fill();
  
  // Grietas
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(px - 2, py - 6, 1, 4);
  ctx.fillRect(px + 4, py - 4, 1, 3);
}

function drawCasaGrande(px, py) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + TH/2 + 2, 24, 8, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Pared
  const pared = ctx.createLinearGradient(px - 12, py - 28, px + 12, py);
  pared.addColorStop(0, '#e8d8b0');
  pared.addColorStop(0.5, '#d4c49a');
  pared.addColorStop(1, '#b8a880');
  ctx.fillStyle = pared;
  ctx.fillRect(px - 12, py - 18, 24, 20);
  
  // Sombra interna
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(px - 12, py - 18, 4, 20);
  
  // Techo
  ctx.fillStyle = '#c62828';
  ctx.beginPath();
  ctx.moveTo(px, py - 38);
  ctx.lineTo(px - 16, py - 20);
  ctx.lineTo(px + 16, py - 20);
  ctx.closePath();
  ctx.fill();
  
  // Sombra techo
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.moveTo(px, py - 38);
  ctx.lineTo(px + 16, py - 20);
  ctx.lineTo(px + 16, py - 16);
  ctx.closePath();
  ctx.fill();
  
  // Puerta
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 4, py - 8, 8, 10);
  ctx.fillStyle = '#ffc107';
  ctx.fillRect(px + 2, py - 4, 2, 2);
  
  // Ventanas
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 10, py - 14, 5, 5);
  ctx.fillRect(px + 5, py - 14, 5, 5);
  // Marco ventanas
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(px - 10, py - 14, 5, 1);
  ctx.fillRect(px + 5, py - 14, 5, 1);
  
  // Chimenea
  ctx.fillStyle = '#795548';
  ctx.fillRect(px + 6, py - 34, 4, 8);
}

function drawFuenteGrande(px, py) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2, 14, 5, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Base
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 10, py - 6, 20, 10);
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 8, py - 4, 16, 6);
  
  // Agua
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 6, py - 3, 12, 3);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(px - 4, py - 2, 8, 1);
  
  // Pilar
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 2, py - 14, 4, 8);
  
  // Agua cayendo
  ctx.fillStyle = 'rgba(100,180,220,0.4)';
  ctx.fillRect(px - 1, py - 10, 2, 6);
}

function drawFlorSilvestre(px, py, color) {
  // Tallo
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 1, py + TH/2 - 5, 2, 5);
  // Pétalos
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 7, 3, 0, Math.PI * 2);
  ctx.fill();
  // Centro
  ctx.fillStyle = '#ffeb3b';
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 7, 1, 0, Math.PI * 2);
  ctx.fill();
}

function drawHongoColorido(px, py, color) {
  // Base
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(px - 2, py + TH/2 - 3, 4, 3);
  // Sombrero
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 4, 5, Math.PI, 0);
  ctx.fill();
  // Puntos
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.beginPath();
  ctx.arc(px - 1, py + TH/2 - 6, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawArbustoGrande(px, py, color) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(px + 2, py + TH/2, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(px, py + TH/2 - 3, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px - 4, py + TH/2 - 1, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + 4, py + TH/2 - 1, 5, 0, Math.PI * 2);
  ctx.fill();
  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath();
  ctx.arc(px - 2, py + TH/2 - 5, 3, 0, Math.PI * 2);
  ctx.fill();
}
