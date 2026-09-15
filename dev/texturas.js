// ============================================================================
// TEXTURAS POR BIOMA - Detalles y variaciones
// ============================================================================

function texturaHierbaBioma(sx, sy, biomaId, v) {
  const paleta = getColoresBioma(biomaId);
  const color = paleta.pasto[v % paleta.pasto.length];
  const colorClaro = paleta.pasto[(v + 1) % paleta.pasto.length];
  
  switch(biomaId) {
    case 0: // Pueblo - césped corto
      ctx.fillStyle = color;
      ctx.fillRect(sx - 8, sy + TH/2 - 4, 2, 5);
      ctx.fillRect(sx + 4, sy + TH/2 - 2, 2, 4);
      ctx.fillRect(sx - 2, sy + TH/2 - 5, 2, 6);
      ctx.fillRect(sx + 7, sy + TH/2 - 3, 2, 4);
      ctx.fillStyle = colorClaro;
      ctx.fillRect(sx - 5, sy + TH/2 - 6, 1, 7);
      ctx.fillRect(sx + 9, sy + TH/2 - 5, 1, 6);
      break;
      
    case 1: // Bosque - hierba alta densa
      for (let i = 0; i < 5; i++) {
        const hx = sx - 12 + i * 5 + (v % 3);
        const h = 6 + (v % 4);
        ctx.fillStyle = color;
        ctx.fillRect(hx, sy + TH/2 - h, 2, h + 2);
      }
      // Hojas
      ctx.fillStyle = '#8bc34a';
      ctx.fillRect(sx - 6, sy + TH/2 - 5, 2, 1);
      ctx.fillRect(sx + 4, sy + TH/2 - 4, 2, 1);
      break;
      
    case 2: // Desierto - cactus pequeños
      ctx.fillStyle = color;
      ctx.fillRect(sx - 6, sy + TH/2 - 10, 5, 10);
      ctx.fillRect(sx + 4, sy + TH/2 - 7, 4, 7);
      ctx.fillStyle = colorClaro;
      ctx.fillRect(sx - 5, sy + TH/2 - 9, 3, 9);
      break;
      
    case 3: // Montaña - hierba corta con piedras
      ctx.fillStyle = color;
      ctx.fillRect(sx - 10, sy + TH/2 - 3, 3, 3);
      ctx.fillRect(sx + 3, sy + TH/2 - 4, 3, 4);
      ctx.fillStyle = '#757575';
      ctx.fillRect(sx + 6, sy + TH/2 - 1, 3, 2);
      ctx.fillRect(sx - 4, sy + TH/2, 2, 2);
      break;
      
    case 4: // Pantano - juncos
      ctx.fillStyle = color;
      ctx.fillRect(sx - 8, sy + TH/2 - 7, 2, 8);
      ctx.fillRect(sx + 5, sy + TH/2 - 9, 2, 10);
      ctx.fillRect(sx + 12, sy + TH/2 - 5, 2, 6);
      ctx.fillStyle = colorClaro;
      ctx.fillRect(sx - 4, sy + TH/2 - 10, 2, 11);
      break;
      
    case 5: // Volcán - ceniza
      ctx.fillStyle = color;
      ctx.fillRect(sx - 8, sy + TH/2 - 2, 3, 2);
      ctx.fillRect(sx + 5, sy + TH/2 - 3, 3, 3);
      ctx.fillRect(sx + 10, sy + TH/2 - 2, 3, 2);
      // Piedras volcánicas
      ctx.fillStyle = '#424242';
      ctx.fillRect(sx - 3, sy + TH/2, 2, 2);
      ctx.fillRect(sx + 8, sy + TH/2 - 1, 2, 2);
      break;
      
    case 6: // Castillo - césped ornamental
      ctx.fillStyle = color;
      ctx.fillRect(sx - 8, sy + TH/2 - 4, 2, 5);
      ctx.fillRect(sx + 5, sy + TH/2 - 3, 2, 4);
      ctx.fillRect(sx - 3, sy + TH/2 - 5, 2, 6);
      ctx.fillStyle = colorClaro;
      ctx.fillRect(sx + 10, sy + TH/2 - 4, 1, 5);
      break;
  }
}

function texturaSueloBioma(sx, sy, biomaId, v) {
  const paleta = getColoresBioma(biomaId);
  
  // Grietas (común a todos)
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  const g1x = sx - 10 + (v % 6);
  const g1y = sy + TH/4 + (v % 4);
  ctx.fillRect(g1x, g1y, 1, 3 + (v % 3));
  ctx.fillRect(g1x + 2, g1y + 2, 2, 1);
  
  // Detalles específicos
  switch(biomaId) {
    case 2: // Desierto - arena ondulada
      ctx.fillStyle = 'rgba(200,160,80,0.15)';
      ctx.fillRect(sx - 8, sy + TH/3, 16, 2);
      ctx.fillRect(sx - 4, sy + TH/2 - 1, 8, 1);
      break;
      
    case 3: // Montaña - rocas
      ctx.fillStyle = 'rgba(100,100,100,0.3)';
      ctx.fillRect(sx + 6, sy + TH/3, 3, 2);
      ctx.fillRect(sx - 4, sy + TH/2 - 1, 2, 2);
      break;
      
    case 4: // Pantano - barro
      ctx.fillStyle = 'rgba(60,40,20,0.2)';
      ctx.fillRect(sx - 4, sy + TH/3, 8, 3);
      break;
      
    case 5: // Volcán - ceniza y piedra
      ctx.fillStyle = 'rgba(40,40,40,0.25)';
      ctx.fillRect(sx - 6, sy + TH/3, 12, 3);
      // Piedras pequeñas
      ctx.fillStyle = 'rgba(60,60,60,0.3)';
      ctx.fillRect(sx + 3, sy + TH/2, 2, 2);
      break;
  }
  
  // Guijarros comunes
  ctx.fillStyle = 'rgba(100,100,100,0.25)';
  ctx.fillRect(sx + 3, sy + TH/2, 1, 1);
  ctx.fillRect(sx - 8, sy + TH/2 + 1, 1, 1);
}

// === ELEMENTOS DISTINTIVOS POR BIOMA ===

// PUEBLO - Casas, mercado, pozo
function drawElementoPueblo(sx, sy, v) {
  const tipo = v % 20;
  
  if (tipo < 6) {
    // Casa del pueblo
    drawCasaAldeana(sx, sy, v);
  } else if (tipo < 10) {
    // Puesto de mercado
    drawMercado(sx, sy, v);
  } else if (tipo < 13) {
    // Pozo
    drawPozo(sx, sy);
  } else if (tipo < 16) {
    // Carreta
    drawCarreta(sx, sy);
  } else if (tipo < 18) {
    // Farola
    drawFarola(sx, sy);
  }
}

function drawCasaAldeana(px, py, v) {
  const colores = ['#e8d8b0', '#d4c49a', '#c8b888', '#dcc89a'];
  const colorPared = colores[v % colores.length];
  const colorTecho = ['#c62828', '#1565c0', '#f9a825', '#2e7d32'][v % 4];
  
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 8, py + TH/2 + 2, 16, 6, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Pared
  ctx.fillStyle = colorPared;
  ctx.fillRect(px - 12, py - 18, 24, 20);
  
  // Techo
  ctx.fillStyle = colorTecho;
  ctx.beginPath();
  ctx.moveTo(px, py - 34);
  ctx.lineTo(px - 16, py - 20);
  ctx.lineTo(px + 16, py - 20);
  ctx.closePath();
  ctx.fill();
  
  // Puerta
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 4, py - 8, 8, 10);
  
  // Ventanas
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 10, py - 14, 5, 5);
  ctx.fillRect(px + 5, py - 14, 5, 5);
  
  // Humo
  drawHumo(px + 8, py - 38);
}

function drawMercado(px, py, v) {
  // Toldo
  ctx.fillStyle = v % 2 === 0 ? '#c62828' : '#1565c0';
  ctx.fillRect(px - 12, py - 20, 24, 12);
  ctx.fillStyle = v % 2 === 0 ? '#b71c1c' : '#0d47a1';
  ctx.fillRect(px - 12, py - 20, 24, 3);
  
  // Mesas
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(px - 8, py - 12, 16, 3);
  ctx.fillRect(px - 8, py - 6, 16, 3);
  
  // Mercancías
  ctx.fillStyle = '#ff9800';
  ctx.fillRect(px - 6, py - 14, 3, 3);
  ctx.fillRect(px + 3, py - 14, 3, 3);
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 2, py - 14, 4, 3);
}

function drawPozo(px, py) {
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 10, py - 8, 20, 12);
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 8, py - 6, 16, 8);
  ctx.fillStyle = '#4fc3f7';
  ctx.fillRect(px - 6, py - 4, 12, 4);
  
  // Estructura superior
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 12, py - 16, 3, 12);
  ctx.fillRect(px + 9, py - 16, 3, 12);
  ctx.fillRect(px - 14, py - 18, 28, 3);
}

function drawCarreta(px, py) {
  // Cuerpo
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(px - 8, py - 12, 16, 8);
  
  // Ruedas
  ctx.fillStyle = '#5d4037';
  ctx.beginPath();
  ctx.arc(px - 5, py - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + 5, py - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Carga
  ctx.fillStyle = '#ff9800';
  ctx.fillRect(px - 6, py - 15, 12, 4);
}

function drawFarola(px, py) {
  // Poste
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 1, py - 20, 2, 22);
  
  // Luz
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect(px - 3, py - 24, 6, 5);
  ctx.fillStyle = '#fff9c4';
  ctx.fillRect(px - 2, py - 23, 4, 3);
  
  // Resplandor
  ctx.fillStyle = 'rgba(255,235,59,0.2)';
  ctx.beginPath();
  ctx.arc(px, py - 22, 8, 0, Math.PI * 2);
  ctx.fill();
}

// BOSQUE - Árboles densos, hongos, flores silvestres
function drawElementoBosque(sx, sy, v) {
  const tipo = v % 20;
  
  if (tipo < 8) {
    drawArbolBosque(sx, sy, v);
  } else if (tipo < 12) {
    drawHongoBosque(sx, sy, v);
  } else if (tipo < 16) {
    drawArbustoBosque(sx, sy, v);
  } else if (tipo < 18) {
    drawTroncoCaido(sx, sy);
  } else {
    drawFlorSilvestreBosque(sx, sy, v);
  }
}

function drawArbolBosque(px, py, v) {
  const tipo = v % 3 === 0 ? 'pino' : v % 3 === 1 ? 'roble' : 'abedul';
  drawArbolAlto(px, py, tipo);
}

function drawHongoBosque(px, py, v) {
  const color = v % 3 === 0 ? '#8d6e63' : v % 3 === 1 ? '#4caf50' : '#2196f3';
  drawHongoColorido(px, py, color);
}

function drawTroncoCaido(px, py) {
  // Tronco horizontal
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 10, py + TH/2 - 2, 20, 4);
  ctx.fillStyle = '#4e342e';
  ctx.fillRect(px - 10, py + TH/2 - 2, 20, 2);
  
  // Raíces
  ctx.fillStyle = '#6d4c41';
  ctx.fillRect(px + 8, py + TH/2 - 4, 3, 6);
}

function drawFlorSilvestreBosque(px, py, v) {
  const colores = ['#fff', '#9c27b0', '#e91e63', '#ff5722', '#ffeb3b'];
  const color = colores[v % colores.length];
  drawFlorSilvestre(px, py, color);
}

// DESIERTO - Dunas, cactus, oasis, ruinas
function drawElementoDesierto(sx, sy, v) {
  const tipo = v % 15;
  
  if (tipo < 5) {
    drawCactus(sx, sy, v);
  } else if (tipo < 8) {
    drawDuna(sx, sy);
  } else if (tipo < 10) {
    drawOasis(sx, sy);
  } else if (tipo < 12) {
    drawRuina(sx, sy);
  } else {
    drawRocaArenisca(sx, sy);
  }
}

function drawCactus(px, py, v) {
  const alto = 15 + (v % 8);
  
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2, 8, 3, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Cuerpo principal
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 3, py - alto, 6, alto + 2);
  
  // Brazos
  ctx.fillRect(px - 8, py - alto + 4, 5, 3);
  ctx.fillRect(px + 3, py - alto + 6, 5, 3);
  
  // Puntitas
  ctx.fillStyle = '#388e3c';
  ctx.fillRect(px - 3, py - alto, 6, 2);
}

function drawDuna(px, py) {
  // Curva de arena
  ctx.fillStyle = '#ffb300';
  ctx.beginPath();
  ctx.moveTo(px - 15, py + TH/2);
  ctx.quadraticCurveTo(px, py - 6, px + 15, py + TH/2);
  ctx.lineTo(px - 15, py + TH/2);
  ctx.fill();
  
  // Sombra de la duna
  ctx.fillStyle = 'rgba(200,150,50,0.3)';
  ctx.fillRect(px + 5, py - 2, 10, 4);
}

function drawOasis(px, py) {
  // Agua
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Palmera
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(px + 6, py - 14, 3, 16);
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 2, py - 18, 12, 3);
}

function drawRuina(px, py) {
  // Columna rota
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 3, py - 12, 6, 14);
  ctx.fillRect(px - 5, py - 14, 10, 3);
  
  // Base
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 8, py - 2, 16, 4);
}

function drawRocaArenisca(px, py) {
  ctx.fillStyle = '#ffb300';
  ctx.beginPath();
  ctx.moveTo(px - 10, py + TH/2);
  ctx.lineTo(px - 5, py - 8);
  ctx.lineTo(px + 3, py - 12);
  ctx.lineTo(px + 10, py - 6);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Sombra
  ctx.fillStyle = 'rgba(200,150,50,0.3)';
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 12);
  ctx.lineTo(px + 10, py - 6);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.lineTo(px + 3, py + TH/2);
  ctx.closePath();
  ctx.fill();
}

// MONTAÑA - Rocas, nieve, picos
function drawElementoMontana(sx, sy, v) {
  const tipo = v % 15;
  
  if (tipo < 6) {
    drawRocaMontana(sx, sy, v);
  } else if (tipo < 10) {
    drawNieve(sx, sy);
  } else if (tipo < 13) {
    drawPicoNevado(sx, sy);
  } else {
    drawPinoNevado(sx, sy);
  }
}

function drawRocaMontana(px, py, v) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 5, py + TH/2 + 2, 12, 4, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Roca gris
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.moveTo(px - 10, py + TH/2);
  ctx.lineTo(px - 6, py - 10);
  ctx.lineTo(px + 2, py - 16);
  ctx.lineTo(px + 10, py - 8);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px + 2, py - 16);
  ctx.lineTo(px - 2, py - 8);
  ctx.closePath();
  ctx.fill();
}

function drawNieve(px, py) {
  // Mancha de nieve
  ctx.fillStyle = '#fff';
  ctx.fillRect(px - 8, py + TH/2 - 2, 16, 3);
  ctx.fillRect(px - 4, py + TH/2 - 4, 8, 2);
  
  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillRect(sx - 6, sy + TH/2 - 1, 4, 1);
}

function drawPicoNevado(px, py) {
  // Base roca
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(px - 15, py + TH/2);
  ctx.lineTo(px - 8, py - 15);
  ctx.lineTo(px, py - 25);
  ctx.lineTo(px + 8, py - 15);
  ctx.lineTo(px + 15, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Nieve cima
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 15);
  ctx.lineTo(px, py - 25);
  ctx.lineTo(px + 5, py - 15);
  ctx.lineTo(px, py - 18);
  ctx.closePath();
  ctx.fill();
}

function drawPinoNevado(px, py) {
  // Tronco
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 2, py - 10, 4, 12);
  
  // Copa oscura
  ctx.fillStyle = '#1b5e20';
  ctx.beginPath();
  ctx.moveTo(px, py - 30);
  ctx.lineTo(px - 10, py - 8);
  ctx.lineTo(px + 10, py - 8);
  ctx.closePath();
  ctx.fill();
  
  // Nieve en copa
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath();
  ctx.moveTo(px, py - 30);
  ctx.lineTo(px - 5, py - 18);
  ctx.lineTo(px + 5, py - 18);
  ctx.closePath();
  ctx.fill();
}

// PANTANO - Niebla, juncos, agua estancada
function drawElementoPantano(sx, sy, v) {
  const tipo = v % 15;
  
  if (tipo < 5) {
    drawJunco(sx, sy);
  } else if (tipo < 9) {
    drawCharco(sx, sy);
  } else if (tipo < 12) {
    drawArbolMuerto(sx, sy);
  } else {
    drawLirioPantano(sx, sy);
  }
}

function drawJunco(px, py) {
  // Tallos
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(px - 6, py + TH/2 - 8, 1, 9);
  ctx.fillRect(px + 4, py + TH/2 - 10, 1, 11);
  ctx.fillRect(px + 10, py + TH/2 - 7, 1, 8);
  
  // Puntas
  ctx.fillStyle = '#795548';
  ctx.fillRect(px - 6, py + TH/2 - 8, 1, 2);
  ctx.fillRect(px + 4, py + TH/2 - 10, 1, 2);
}

function drawCharco(px, py) {
  // Agua estancada
  ctx.fillStyle = 'rgba(80,120,80,0.6)';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Reflejo
  ctx.fillStyle = 'rgba(150,200,150,0.3)';
  ctx.fillRect(px - 3, py - 3, 2, 1);
}

function drawArbolMuerto(px, py) {
  // Tronco gris
  ctx.fillStyle = '#4e342e';
  ctx.fillRect(px - 2, py - 20, 3, 22);
  
  // Ramas secas
  ctx.strokeStyle = '#3e2723';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py - 20);
  ctx.lineTo(px - 8, py - 28);
  ctx.moveTo(px, py - 16);
  ctx.lineTo(px + 6, py - 24);
  ctx.stroke();
}

function drawLirioPantano(px, py) {
  // Flor blanca
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(px, py - 4, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Centro
  ctx.fillStyle = '#ffeb3b';
  ctx.beginPath();
  ctx.arc(px, py - 4, 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Hoja
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 2, py - 2, 4, 1);
}

// VOLCÁN - Lava, fuego, rocas ígneas
function drawElementoVolcan(sx, sy, v) {
  const tipo = v % 12;
  
  if (tipo < 4) {
    drawRocaIgnea(sx, sy);
  } else if (tipo < 7) {
    drawFuenteLava(sx, sy, v);
  } else if (tipo < 10) {
    drawFuego(sx, sy, v);
  } else {
    drawPiedraPomez(sx, sy);
  }
}

function drawRocaIgnea(px, py) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2 + 2, 10, 4, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Roca oscura
  ctx.fillStyle = '#424242';
  ctx.beginPath();
  ctx.moveTo(px - 10, py + TH/2);
  ctx.lineTo(px - 5, py - 8);
  ctx.lineTo(px + 3, py - 14);
  ctx.lineTo(px + 10, py - 6);
  ctx.lineTo(px + 10, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Grietas de lava
  ctx.fillStyle = '#ff6f00';
  ctx.fillRect(px - 2, py - 6, 1, 3);
  ctx.fillRect(px + 3, py - 4, 1, 2);
  ctx.fillRect(px + 6, py - 2, 1, 2);
}

function drawFuenteLava(px, py, v) {
  // Piscina de lava
  ctx.fillStyle = '#d84315';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Brillo
  ctx.fillStyle = '#ffcc02';
  ctx.fillRect(px - 4, py - 3, 8, 2);
  
  // Partículas
  const partY = py - 8 - ((frameCount * 0.1 + v) % 6);
  ctx.fillStyle = '#ff9800';
  ctx.fillRect(px - 2, partY, 2, 2);
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect(px + 1, partY - 2, 1, 1);
}

function drawFuego(px, py, v) {
  const offset = Math.sin((frameCount * 0.15) + v) * 2;
  
  // Base naranja
  ctx.fillStyle = '#ff6f00';
  ctx.beginPath();
  ctx.moveTo(px - 4, py + TH/2);
  ctx.quadraticCurveTo(px - 2, py - 6 + offset, px, py - 10 + offset);
  ctx.quadraticCurveTo(px + 2, py - 6 + offset, px + 4, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Centro amarillo
  ctx.fillStyle = '#ffcc02';
  ctx.beginPath();
  ctx.moveTo(px - 2, py + TH/2);
  ctx.quadraticCurveTo(px - 1, py - 4 + offset, px, py - 7 + offset);
  ctx.quadraticCurveTo(px + 1, py - 4 + offset, px + 2, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Humo
  if (v % 3 === 0) {
    ctx.fillStyle = 'rgba(100,100,100,0.4)';
    ctx.beginPath();
    ctx.arc(px, py - 14 + offset, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPiedraPomez(px, py) {
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(px - 6, py + TH/2);
  ctx.lineTo(px - 3, py - 6);
  ctx.lineTo(px + 2, py - 9);
  ctx.lineTo(px + 7, py - 5);
  ctx.lineTo(px + 6, py + TH/2);
  ctx.closePath();
  ctx.fill();
  
  // Agujeros
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(px - 1, py - 4, 2, 2);
  ctx.fillRect(px + 3, py - 2, 1, 1);
}

// CASTILLO - Templo, estatuas, jardines de piedra
function drawElementoCastillo(sx, sy, v) {
  const tipo = v % 15;
  
  if (tipo < 5) {
    drawEstatua(sx, sy, v);
  } else if (tipo < 9) {
    drawTemplo(sx, sy);
  } else if (tipo < 12) {
    drawJardineras(sx, sy);
  } else {
    drawObelisco(sx, sy);
  }
}

function drawEstatua(px, py, v) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 3, py + TH/2, 6, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Base
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 6, py - 4, 12, 6);
  
  // Cuerpo
  ctx.fillStyle = '#bdbdbd';
  ctx.fillRect(px - 3, py - 14, 6, 10);
  
  // Cabeza
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(px - 2, py - 18, 4, 4);
  
  // Brillo
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(px - 1, py - 16, 2, 2);
}

function drawTemplo(px, py) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 6, py + TH/2 + 2, 18, 7, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Base
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 14, py - 16, 28, 6);
  
  // Columnas
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 10, py - 28, 3, 14);
  ctx.fillRect(px - 3, py - 28, 3, 14);
  ctx.fillRect(px + 4, py - 28, 3, 14);
  
  // Techo triangular
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(px, py - 38);
  ctx.lineTo(px - 14, py - 28);
  ctx.lineTo(px + 14, py - 28);
  ctx.closePath();
  ctx.fill();
}

function drawJardineras(px, py) {
  // Piedras
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 8, py - 4, 16, 6);
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(px - 6, py - 2, 12, 2);
  
  // Planta
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(px - 2, py - 8, 4, 4);
  ctx.fillStyle = '#66bb6a';
  ctx.fillRect(px - 1, py - 9, 2, 2);
}

function drawObelisco(px, py) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px + 4, py + TH/2, 5, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Base
  ctx.fillStyle = '#616161';
  ctx.fillRect(px - 5, py - 6, 10, 8);
  
  // Cuerpo
  ctx.fillStyle = '#757575';
  ctx.fillRect(px - 3, py - 22, 6, 16);
  
  // Punta
  ctx.fillStyle = '#ffd600';
  ctx.beginPath();
  ctx.moveTo(px, py - 30);
  ctx.lineTo(px - 3, py - 22);
  ctx.lineTo(px + 3, py - 22);
  ctx.closePath();
  ctx.fill();
}

function drawTexturasBioma(sx, sy, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const biomaId = getBioma(x, y);
  texturaHierbaBioma(sx, sy, biomaId, v);
  texturaSueloBioma(sx, sy, biomaId, v);
}

function drawElementoBioma(sx, sy, biomaId, v) {
  switch(biomaId) {
    case 0: drawElementoPueblo(sx, sy, v); break;
    case 1: drawElementoBosque(sx, sy, v); break;
    case 2: drawElementoDesierto(sx, sy, v); break;
    case 3: drawElementoMontana(sx, sy, v); break;
    case 4: drawElementoPantano(sx, sy, v); break;
    case 5: drawElementoVolcan(sx, sy, v); break;
    case 6: drawElementoCastillo(sx, sy, v); break;
  }
}
