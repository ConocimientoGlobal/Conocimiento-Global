// ============================================================================
// EFECTOS - Agua animada, niebla, humo, reflejos
// ============================================================================

let frameCount = 0;

// === AGUA ANIMADA CON REFLEJOS ===
function drawAguaAnimada(sx, sy, w, h, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const waveOffset = Math.sin((frameCount * 0.05) + (x + y) * 0.3) * 2;
  
  // Base del agua con gradiente
  const waterGrad = ctx.createLinearGradient(sx - w/2, sy, sx + w/2, sy + h);
  waterGrad.addColorStop(0, '#1565c0');
  waterGrad.addColorStop(0.5, '#1976d2');
  waterGrad.addColorStop(1, '#0d47a1');
  ctx.fillStyle = waterGrad;
  
  ctx.beginPath();
  ctx.moveTo(sx, sy + waveOffset);
  ctx.lineTo(sx + w / 2, sy + h / 2 + waveOffset);
  ctx.lineTo(sx, sy + h + waveOffset);
  ctx.lineTo(sx - w / 2, sy + h / 2 + waveOffset);
  ctx.closePath();
  ctx.fill();
  
  // Ondas/reflejos
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(sx - 6 + waveOffset, sy + TH/3, 4, 1);
  ctx.fillRect(sx + 2 + waveOffset * 0.5, sy + TH/2, 3, 1);
  ctx.fillRect(sx - 4 + waveOffset * 0.7, sy + TH/4 + 2, 5, 1);
  
  // Brillos especulares
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect(sx - 2 + waveOffset, sy + TH/3 + 1, 1, 1);
  ctx.fillRect(sx + 5 + waveOffset * 0.8, sy + TH/2 - 1, 1, 1);
  
  // Borde de orilla (arena/tierra)
  ctx.fillStyle = 'rgba(210,180,120,0.6)';
  ctx.fillRect(sx - w/3, sy + h - 2, w*2/3, 2);
}

// === NIEBA BAJA CON PARTÍCULAS ===
function drawNiebla(sx, sy, w, h, densidad) {
  const v = ((sx * 374761393 + sy * 668265263) ^ 0x5bf03635) >>> 0;
  const nieblaOffset = Math.sin((frameCount * 0.02) + sx * 0.01) * 3;
  
  // Capas de niebla
  for (let i = 0; i < 3; i++) {
    const alpha = 0.08 - i * 0.02;
    ctx.fillStyle = `rgba(180,200,180,${alpha})`;
    ctx.fillRect(sx - w/3, sy + TH/2 + i * 2 + nieblaOffset, w*2/3, 3);
  }
  
  // Partículas flotantes
  ctx.fillStyle = 'rgba(200,220,200,0.3)';
  for (let i = 0; i < 3; i++) {
    const px = sx - 8 + ((v + i * 7) % 16);
    const py = sy + TH/4 + ((v + i * 11) % 6) + nieblaOffset;
    ctx.fillRect(px, py, 1, 1);
  }
}

// === HUMO ANIMADO DE CHIMENEA ===
function drawHumo(sx, sy) {
  const humoOffset = frameCount * 0.08;
  
  for (let i = 0; i < 4; i++) {
    const hy = sy - i * 6 - (humoOffset % 8);
    const hx = sx + Math.sin(humoOffset + i) * 2;
    const alpha = 0.4 - i * 0.1;
    const size = 2 + i;
    
    ctx.fillStyle = `rgba(180,180,180,${alpha})`;
    ctx.beginPath();
    ctx.arc(hx, hy, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Luz cálida en la base
  ctx.fillStyle = 'rgba(255,200,100,0.2)';
  ctx.beginPath();
  ctx.arc(sx, sy - 2, 4, 0, Math.PI * 2);
  ctx.fill();
}

// === REFLEJO EN AGUA ===
function drawReflejoAgua(sx, sy, objeto, x, y) {
  const v = ((x * 374761393 + y * 668265263) ^ 0x5bf03635) >>> 0;
  const waveOffset = Math.sin((frameCount * 0.05) + (x + y) * 0.3) * 1;
  
  // Solo reflejar si hay agua cerca
  let tieneAgua = false;
  for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < WORLD_W && ny >= 0 && ny < WORLD_H) {
      if (world[ny][nx] === 1) tieneAgua = true;
    }
  }
  
  if (!tieneAgua) return;
  
  // Reflejo distorsionado
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(sx - 2 + waveOffset, sy + TH/2 + 2, 4, 2);
}

// === INCREMENTAR FRAME ===
function incrementarFrame() {
  frameCount++;
}
