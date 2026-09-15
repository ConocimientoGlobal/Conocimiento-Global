#!/bin/bash
# Build: combina dev/ en index.html para GitHub Pages

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>PachaMirai</title>
<style>
*{margin:0;padding:0;background:#000;touch-action:none;user-select:none}
html,body{width:100%;height:100%;overflow:hidden}
canvas{display:block;position:fixed;top:0;left:0}
</style>
</head>
<body>
<canvas id="c"></canvas>
<script>
EOF

for f in dev/config.js dev/biomas.js dev/texturas.js dev/mundo.js dev/render.js dev/jugador.js dev/ui.js dev/guardado.js dev/main.js; do
  echo "// === $f ===" >> index.html
  cat "$f" >> index.html
  echo "" >> index.html
done

cat >> index.html << 'EOF'
</script>
</body>
</html>
EOF

echo "Build completado: index.html generado desde dev/"
