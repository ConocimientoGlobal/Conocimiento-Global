# PachaMirai - RPG de Mundo Abierto

Juego RPG de mundo abierto en pixel art, compatible con móvil y desktop.

## Características

- 🗺️ **Mundo abierto** 128x128 tiles con 7 biomas (pasto, tierra, agua, arena, piedra, nieve, bosque)
- 📱 **Controles táctiles** (joystick + botones de acción)
- 🎮 **Controles de teclado** (flechas/WASD + espacio + E)
- 🐾 **15 animales** con IA (huida, deambular)
- 👤 **3 NPCs** con diálogos
- ⚔️ **Combate** (atacar animales)
- 🎒 **Inventario** con 10 tipos de items
- 📊 **Sistema de niveles** (XP, HP, MP)
- 💾 **Guardado** en localStorage
- 🗺️ **Minimapa** con biomas y NPCs
- 📐 **Responsive** (pantalla completa, landscape)

## Cómo jugar

### En móvil:
1. Abrí `index.html` en tu navegador
2. Usá el **joystick** (esquina inferior izquierda) para moverte
3. Tocá **⚔️** para atacar, **✋** para interactuar
4. Tocá los **slots del hotbar** para usar items

### En desktop:
- Flechas/WASD: mover
- Espacio: atacar
- E: interactuar
- Escape: menú

## Estructura

```
index.html          # Juego completo (HTML + CSS + JS)
generar_mundo_abierto.py  # Generador procedural de mapas
```

## Desarrollo

Para regenerar el mapa con otra semilla, editá el array `biomas` en `index.html` o usá el generador.

## Licencia

MIT
