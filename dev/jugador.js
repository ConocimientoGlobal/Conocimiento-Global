// ============================================================================
// JUGADOR - Movimiento, Pathfinding, Stats
// ============================================================================

const pl = {
  gx: 8, gy: 8,
  fx: 8.0, fy: 8.0,
  path: [],
  frame: 0, ft: 0,
  hp: 100, mhp: 100,
  sed: 100, maxSed: 100,
  temp: 100, maxTemp: 100,
  nivel: 1, xp: 0,
  oro: 50,
  biomaActual: 0
};

function aplicarDificultad(dt) {
  const bioma = BIOMAS[pl.biomaActual];
  if (!bioma.dificultad) return;
  
  switch(bioma.dificultad) {
    case 'sed':
      pl.sed = Math.max(0, pl.sed - dt * 2);
      if (pl.sed === 0) pl.hp = Math.max(0, pl.hp - dt * 1);
      break;
    case 'frio':
      pl.temp = Math.max(0, pl.temp - dt * 2);
      if (pl.temp === 0) pl.hp = Math.max(0, pl.hp - dt * 1.5);
      break;
    case 'calor':
      pl.sed = Math.max(0, pl.sed - dt * 3);
      if (pl.sed === 0) pl.hp = Math.max(0, pl.hp - dt * 2);
      break;
    case 'veneno':
      if (Math.random() < 0.005) pl.hp = Math.max(0, pl.hp - dt * 3);
      break;
  }
}

function findPath(sx, sy, gx, gy) {
  if (!esCaminable(gx, gy)) return [];
  
  const open = [{x: sx, y: sy, p: []}];
  const vis = new Set();
  vis.add(sx + ',' + sy);
  
  while (open.length) {
    const c = open.shift();
    if (c.x === gx && c.y === gy) return c.p;
    
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      const nx = c.x + dx, ny = c.y + dy, k = nx + ',' + ny;
      if (vis.has(k) || !esCaminable(nx, ny)) continue;
      
      // No atravesar esquinas en diagonales
      if (dx !== 0 && dy !== 0) {
        if (!esCaminable(c.x + dx, c.y)) continue;
        if (!esCaminable(c.x, c.y + dy)) continue;
      }
      
      vis.add(k);
      open.push({x: nx, y: ny, p: [...c.p, {x: nx, y: ny}]});
    }
  }
  return [];
}

function moverJugador(dt) {
  if (pl.path.length === 0) return;
  
  const t = pl.path[0];
  const speed = 3.3 * dt;
  const dx = t.x - pl.fx, dy = t.y - pl.fy;
  const dist = Math.sqrt(dx*dx + dy*dy);
  
  if (dist < speed || dist < 0.005) {
    pl.fx = t.x; pl.fy = t.y; pl.gx = t.x; pl.gy = t.y;
    pl.path.shift();
    if (!pl.path.length) guardar();
  } else {
    pl.fx += (dx/dist) * speed;
    pl.fy += (dy/dist) * speed;
  }
  
  pl.ft += dt;
  if (pl.ft > 0.15) { pl.ft = 0; pl.frame = (pl.frame + 1) % 2; }
}
