# PROYECTO: SANDBOX RPG 2D — MUNDO VIVO

## Visión General

Open World 2D Sandbox RPG con exploración, supervivencia ligera, construcción, crafting, agricultura, conocimiento, descubrimiento, progresión y narrativa ambiental.

**Filosofía central:** «El jugador no conquista el mundo. Aprende a habitarlo.»

**Regla de sistemas:** «Todo lo que descubres puede convertirse en una herramienta.»

---

## Principios de Diseño

1. **Profundidad antes que cantidad** — Pocos sistemas profundamente conectados
2. **El conocimiento es progresión** — Descubrir abre posibilidades reales
3. **El mundo debe responder** — Sistemas interactúan entre sí
4. **Evitar gamificación excesiva** — No todo necesita barra/nivel/moneda

---

## Bucle Principal

```
EXPLORAR → DESCUBRIR → RECOLECTAR → APRENDER → FABRICAR → CONSTRUIR → MEJORAR → EXPLORAR
```

---

## MVP (Fase 1-5)

### Recursos (21)
Madera, Piedra, Fibra vegetal, Hierba roja, Arcilla, Agua, Comida, Carne, Cuero, Antorcha, Vendaje, Cuchillo, Poción, Mineral de hierro, Cristal, Pescado, Arena, Hongo, Miel

### Items crafteables (12)
Hacha de piedra, Espada, Cuchillo, Antorcha, Vendaje, Comida cocinada, Poción, Refugio, Fogata, Cofre, Banco de trabajo, Muro de piedra

### Enemigos (7)
Lobo, Goblin, Oso, Esqueleto, Araña gigante, Jabato, Dragón menor

### Estructuras (5)
Refugio, Fogata, Cofre, Banco de trabajo, Muro de piedra

### Biomas (8)
Bosque, Pradera, Montaña, Río, Desierto, Pantano, Costa, Volcán

### Personaje
- Creación: nombre, piel, pelo, ojos, ropa
- Stats: Vida, Resistencia, Fuerza, Destreza, Inteligencia, Percepción, Conocimiento
- Progresión: XP, nivel, puntos de habilidad

---

## Arquitectura Técnica

```
/game
  /core (Game.js, Save.js)
  /world (World.js, Camera.js)
  /player (Player.js, Character.js)
  /entities (Resource.js, Enemy.js)
  /inventory (Inventory.js, Item.js)
  /crafting (Crafting.js, Recipe.js)
  /building (Building.js, Structure.js)
  /knowledge (Library.js, Discovery.js)
  /ui (UI.js, InventoryUI.js, CraftingUI.js)
  /data (items.json, recipes.json, biomes.json, enemies.json)
```

---

## Plan de Implementación

| Fase | Tarea | Semana | Estado |
|------|-------|--------|--------|
| 1 | Mundo + Movimiento | 1 | ✅ COMPLETADA |
| 2 | Recolección + Inventario | 2 | ✅ COMPLETADA |
| 3 | Crafting + Construcción | 3 | ✅ COMPLETADA |
| 4 | Combate + Progresión | 4 | ✅ COMPLETADA |
| 5 | Biblioteca + Guardado | 5 | ✅ COMPLETADA |

---

## Criterio de Éxito

El prototipo es exitoso si:
1. El jugador completa el ciclo en < 5 minutos
2. El descubrimiento se siente gratificante
3. El crafting tiene sentido
4. La construcción sirve para algo
5. Quiere volver a explorar

---

## Estado Actual

- [x] Diseño del MVP completo
- [x] Arquitectura técnica definida
- [x] Datos iniciales (recetas, items, biomas, enemigos)
- [x] Implementación Fase 1 — COMPLETADA
- [x] Implementación Fase 2 — COMPLETADA
- [x] Implementación Fase 3 — COMPLETADA
- [x] Implementación Fase 4 — COMPLETADA
- [x] Implementación Fase 5 — COMPLETADA
- [x] **MVP COMPLETO** — v2.0 Enhanced Edition

---

## Registro de Versiones

### v2.0 (2026-09-11) — Enhanced Edition
- 7 tipos de enemigos con IA
- 5 estructuras colocables
- Sistema de guardado/carga completo
- Biblioteca de conocimiento (15 descubrimientos)
- 8 biomas, 21 recursos, 12 recetas
- Ciclo día/noche
- 9 logros, 7 misiones

### v1.0 (2026-09-06) — Initial Release
- 3 enemigos básicos
- 1 estructura (refugio)
- 4 biomas, 9 recursos, 4 recetas
- Guardado simple
