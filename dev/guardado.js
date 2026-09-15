// ============================================================================
// GUARDADO - LocalStorage
// ============================================================================

function guardar() {
  localStorage.setItem('pachamirai_save', JSON.stringify({
    gx: pl.gx, gy: pl.gy, fx: pl.fx, fy: pl.fy,
    hp: pl.hp, oro: pl.oro, sed: pl.sed, temp: pl.temp,
    nivel: pl.nivel, xp: pl.xp,
    cofres: cofres.map(c => ({x: c.x, y: c.y, abierto: c.abierto}))
  }));
}

function cargar() {
  const data = localStorage.getItem('pachamirai_save');
  if (!data) return;
  try {
    const s = JSON.parse(data);
    pl.gx = s.gx; pl.gy = s.gy; pl.fx = s.fx; pl.fy = s.fy;
    pl.hp = s.hp; pl.oro = s.oro; pl.sed = s.sed || 100; pl.temp = s.temp || 100;
    pl.nivel = s.nivel || 1; pl.xp = s.xp || 0;
    if (s.cofres) {
      for (const sc of s.cofres) {
        for (const co of cofres) {
          if (co.x === sc.x && co.y === sc.y) co.abierto = sc.abierto;
        }
      }
    }
  } catch(e) {}
}
