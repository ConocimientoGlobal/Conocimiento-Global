// ============================================================================
// MAIN - Game Loop, Input con tap preciso, Bootstrap
// ============================================================================

const c = document.getElementById('c');

function main() {
  calcularTileSize();
  window.addEventListener('resize', resize);
  
  ctx = c.getContext('2d');
  generarMundo();
  generarNPCs();
  generarCofres();
  
  window.addEventListener('beforeunload', guardar);
  cargar();
  
  // Input con tap preciso
  c.addEventListener('touchstart', e => {
    e.preventDefault();
    if (pl.path.length > 0) return;
    
    const t = e.changedTouches[0];
    const cell = screenToCell(t.clientX, t.clientY);
    
    // Verificar límites
    if (cell.x < 0 || cell.x >= WORLD_W || cell.y < 0 || cell.y >= WORLD_H) return;
    
    // Verificar NPC primero
    for (const n of npcs) {
      if (n.x === cell.x && n.y === cell.y) {
        mostrarMensaje('NPC: ' + n.nombre, 'Hola, viajero.');
        return;
      }
    }
    
    // Verificar cofre
    for (const co of cofres) {
      if (co.x === cell.x && co.y === cell.y && !co.abierto) {
        co.abierto = true;
        pl.oro += 10;
        mostrarMensaje('Cofre abierto', '+10 oro');
        guardar();
        return;
      }
    }
    
    // Verificar que la celda sea caminable
    if (world[cell.y][cell.x] !== 0) return;
    for (const n of npcs) {
      if (n.x === cell.x && n.y === cell.y) return;
    }
    for (const co of cofres) {
      if (co.x === cell.x && co.y === cell.y && !co.abierto) return;
    }
    
    // Guardar destino exacto del tap
    pl.tapTargetX = cell.x;
    pl.tapTargetY = cell.y;
    
    // Calcular camino
    pl.path = findPath(pl.gx, pl.gy, cell.x, cell.y);
  }, {passive: false});
  
  let last = performance.now();
  
  function loop(ts) {
    const dt = Math.min((ts - last) / 1000, 0.1);
    last = ts;
    
    if (mensaje.t > 0) mensaje.t -= dt;
    
    pl.biomaActual = getBioma(Math.floor(pl.gx), Math.floor(pl.gy));
    aplicarDificultad(dt);
    moverJugador(dt);
    
    renderMundo();
    renderUI();
    
    requestAnimationFrame(loop);
  }
  
  requestAnimationFrame(loop);
}

main();
