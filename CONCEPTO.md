# PACHA MIRAI — Concepto de Juego

## Visión General

**PachaMirai** es un RPG táctico isométrico 2.5D para Android, inspirado en Waven (Ankama). Combina **exploración libre en mundo abierto** con **combate táctico por turnos** en cuadrícula isométrica.

- **Plataforma:** Android (APK / PWA desde móvil)
- **Estilo visual:** 2.5D isométrico, pixel art geométrico vibrante
- **Perspectiva:** Cámara isométrica con zoom, centrada en el jugador
- **Controles:** 100% táctiles
- **Historia:** Sin narrativa profunda — foco en la **jugabilidad pura**

---

## Mundo Abierto

### Filosofía

Mundo **completamente abierto** desde el inicio. Sin bloqueo de zonas por nivel, pero cada bioma tiene **dificultades ambientales**:

| Bioma | Dificultad | Efecto | Requisito |
|-------|-----------|--------|-----------|
| **Pueblo** | Ninguna | — | Zona segura |
| **Bosque** | Ninguna | — | — |
| **Desierto** | Sed progresiva | -HP si sed=0 | Hidratación |
| **Montaña** | Frío progresivo | -HP si temp=0 | Abrigo |
| **Pantano** | Veneno | -HP aleatorio | Antídotos |
| **Volcán** | Calor extremo | -HP rápido | Equipo ignífugo |
| **Castillo** | — | Zona final | Preparación completa |

### Tamaño

- **Mundo:** 64×64 tiles (4096 celdas)
- **Biomas:** 7 zonas conectadas por caminos
- **Render:** Frustum culling (solo lo visible)

---

## Exploración

### Movimiento

- **Control:** Tap en celda adyacente (8 direcciones: arriba/abajo/izq/der + diagonales)
- **Animación:** Caminata fluida (2 frames)
- **Velocidad:** ~0.3 segundos por tile (lento, táctico, preciso)
- **Colisiones:** No atraviesa agua, paredes, NPCs, cofres cerrados
- **Diagonales:** Verifica que las celdas adyacentes estén libres (no atravesar esquinas)
- **Snap:** Aterrizaje exacto en el centro de cada celda

### Controles de Acción

- **Botón de Acción Contextual:**
  - Si hay enemigo adyacente → **Atacar** (inicia combate)
  - Si hay NPC adyacente → **Hablar** (abre diálogo)
  - Si hay cofre adyacente → **Recoger** (abre cofre)
- **Tap en celda:** Moverse (si está libre)

### Cámara

- **Sigue al jugador** con offset suave
- **Clamp:** Nunca muestra fuera del mundo
- **Mundo centrado** cuando es más chico que la pantalla
- **Zoom:** Ajuste para combate

### Interacciones

- **NPCs:** Tap para abrir diálogo
- **Cofres:** Tap para abrir y recoger loot
- **Estaciones:** Herrería, Alquimia, Encantamiento, Cocina, Runas
- **Guardado:** Automático en zonas seguras + al moverse

---

## Combate Táctico (Waven-Style)

### Inicio del Combate

1. Jugador toca botón "Atacar" con enemigo adyacente
2. Transición a zona de combate delimitada
3. Grid variable según zona (4×4, 5×5, 6×6)
4. Aparecen aliados (mascotas/invocaciones) y enemigos
5. Posicionamiento inicial en la cuadrícula

### Sistema de Recursos (PM/PA)

- **Puntos de Movimiento (PM):** 4-6 según build
  - Mover 1 tile = 1 PM
  - Dash = 2 PM (mueve 2 tiles)
- **Puntos de Acción (PA):** 4-6 según build
  - Habilidad básica = 2 PA
  - Habilidad fuerte = 3-4 PA
  - Defensa = 1 PA
- **Iniciativa:** Por stats de agilidad
- **Turnos:** Alternados jugador → enemigo → jugador

### Habilidades (12+ activas)

#### Categorías

| Tipo | Ejemplo | Coste PA | Efecto |
|------|---------|----------|--------|
| **Ataque Cuerpo a Cuerpo** | Tajo Filoso | 2 | 3 daño, rango 1 |
| **Ataque a Distancia** | Flecha Penetrante | 2 | 2 daño, rango 3 |
| **Área** | Onda de Choque | 3 | 2 daño, área 1 |
| **Dash** | Movimiento Rápido | 2 | Mueve 2 tiles gratis |
| **Defensa** | Escudo Mágico | 1 | +3 defensa, 2 turnos |
| **Buff** | Furia Interior | 2 | +50% ataque, 3 turnos |
| **Debuff** | Grito de Miedo | 2 | Enemigo no ataca, 1 turno |
| **Curación** | Toque Sanador | 3 | +6 HP |
| **Invocación** | Invocar Lobo | 4 | Invoca unidad aliada |
| **Línea** | Rayo Laser | 3 | 4 daño en línea recta |
| **Salto** | Salto Heroico | 3 | Mueve 3 tiles + ataque |
| **Veneno** | Flecha Venenosa | 2 | 1 daño + veneno 3 turnos |

#### Mecánica de Habilidades

- **Sin cooldowns:** Se usan con PM/PA
- **Sin límite de usos:** Mientras tengas PA, podés usarlas
- **Rango:** Cada habilidad tiene un alcance (1-4 tiles)
- **Área:** Algunas afectan múltiples tiles
- **Línea:** Atraviesa en línea recta
- **Salto:** Permite moverse Y atacar en la misma acción

### Invocaciones/Mascotas

- **Obtención:** Crafting de invocaciones (estación de Invocación)
- **Uso:** Se invocan en combate (ocupan 1 tile en el grid)
- **Tipos:**
  - **Familiar:** Equipado, da stats pasivos
  - **Invocación activa:** Lucha en el grid
- **Ejemplos:** Lobo, Halcón, Oso, Elemental, Golem, Dragón

### IA Enemiga

- **Básico:** Si jugador en rango → ataca
- **Intermedio:** Usa habilidades, se posiciona
- **Avanzado:** Flanqueo, cobertura, enfoque en débiles
- **Jefe:** Patrones especiales, fases, invocaciones

### Grid de Combate Variable

| Zona | Tamaño Grid | Enemigos | Complejidad |
|------|-------------|----------|-------------|
| Pueblo | 4×4 | 1-2 | Tutorial |
| Bosque | 4×4 | 2-3 | Baja |
| Desierto | 5×5 | 2-4 | Media |
| Montaña | 5×5 | 3-4 | Media |
| Pantano | 5×5 | 3-5 | Alta |
| Volcán | 6×6 | 4-6 | Alta |
| Castillo | 6×6 | 5-8 | Épica |

---

## Progresión

### Experiencia

Se obtiene de:
- ✅ Vencer enemigos
- ✅ Explorar zonas nuevas
- ✅ Encontrar objetos ocultos
- ✅ Completar misiones de NPCs
- ✅ Abrir cofres

### Atributos

- **Nivel:** 1-30
- **Atributos base:** Fuerza, Agilidad, Inteligencia, Constitución
- **Derivados:** HP, Mana, PM, PA, Daño, Defensa, Crítico, Iniciativa

### Equipo

El equipo se obtiene de **todas las formas**:
- 🛒 Tiendas (comprar con oro)
- 🗝️ Cofres (exploración)
- ⚒️ Crafting (fabricar con materiales)
- 🎁 Recompensas (misiones)

#### Slots de Equipo

| Slot | Efecto |
|------|--------|
| Arma | Daño base, alcance, tipo |
| Armadura | Defensa, resistencia ambiental |
| Casco | Defensa mágica, visión |
| Botas | Movimiento, evasión |
| Accesorio 1 | Stat especial |
| Accesorio 2 | Stat especial |
| Mascota | Stats pasivos |

### Estaciones de Crafting

| Estación | Función |
|----------|---------|
| **Herrería** | Armas y armaduras metálicas |
| **Alquimia** | Pociones, antídotos, consumibles |
| **Encantamiento** | Mejorar equipo existente |
| **Cocina** | Comida (curación, buffs) |
| **Runas** | Modificadores de habilidades |
| **Invocación** | Crear invocaciones (crafting) |

---

## Controles Táctiles (100% Touch)

### Exploración

```
┌─────────────────────────────────┐
│         EXPLORACIÓN             │
│                                 │
│    🌲🌲🌲🌲🌲🌲🌲               │
│    🌲 👹 🌲    🌲              │
│    🌲🌲 🧙 🌲🌲🌲              │
│    🌲🌲🌲🏠🌲🌲🌲              │
│    🌲💧🌲🌲🌲🌲🌲              │
│                                 │
│ [HP] [Sed] [Temp] [Mini-mapa]  │
│                                 │
│  Tap celda = Mover (8 dir)     │
│  Botón ⚔️ = Atacar/Hablar/Recoger│
└─────────────────────────────────┘
```

### Combate

```
┌─────────────────────────────────┐
│         COMBATE                 │
│                                 │
│  ┌───┬───┬───┬───┬───┐         │
│  │   │   │👹│   │   │         │
│  ├───┼───┼───┼───┼───┤         │
│  │   │🧙│   │   │   │         │
│  ├───┼───┼───┼───┼───┤         │
│  │   │🐺│   │👹│   │         │
│  ├───┼───┼───┼───┼───┤         │
│  │   │   │   │   │   │         │
│  └───┴───┴───┴───┴───┘         │
│                                 │
│ PM:4/4 │ PA:6/6 │ HP:100/100   │
│                                 │
│ [Habilidad 1] [Habilidad 2]    │
│ [Habilidad 3] [Habilidad 4]    │
│ [Mover] [Defensa] [Fin Turno]  │
│                                 │
│  Tap habilidad + tap objetivo  │
└─────────────────────────────────┘
```

---

## Diferenciadores Clave

1. **Mundo abierto real** — Sin linealidad, el jugador elige su camino
2. **Dificultades ambientales** — Frío, calor, sed como mecánica real
3. **Árbol de talentos profundo** — Sin clases, el rol lo defines vos
4. **Combate táctico con profundidad** — PM/PA/posicionamiento Waven-style
5. **Crafting completo** — Fabricar equipo, mejorar, encantar, invocar
6. **Elección de encuentros** — Enemigos visibles, vos decidís si luchás
7. **12+ habilidades activas** — Variedad y personalización
8. **100% funcional en móvil** — Sin PC, sin servidor, sin dependencias

---

## Especificaciones Técnicas

- **Render:** Canvas 2D (vanilla JS)
- **Proyección:** Isométrica 2D
- **Archivo único:** index.html
- **Sin servidor:** 100% client-side (GitHub Pages)
- **Sprites:** Formas geométricas procedimentales
- **Sin emojis:** No renderizan bien en Android
- **Objetivo:** 60 FPS en Android medio

---

## Roadmap

### Fase 1: Core ✅
- [x] Motor isométrico
- [x] Mundo 16×16 con bioma
- [x] Movimiento de jugador (tap, snap exacto)
- [x] Cámara que sigue al jugador
- [x] Colisiones

### Fase 2: Mundo ✅
- [x] Mundo 64×64 con 7 biomas
- [x] Dificultades ambientales
- [x] NPCs con diálogos
- [x] Cofres coleccionables
- [x] Minimapa
- [x] Guardado/carga
- [x] Movimiento 8 direcciones
- [x] Velocidad lenta (0.3s)

### Fase 3: Combate (Próxima)
- [ ] Botón de acción contextual (atacar/hablar/recoger)
- [ ] Sistema de turnos (PM/PA)
- [ ] Grid de combate variable (4×4 a 6×6)
- [ ] 12+ habilidades activas
- [ ] Invocaciones (crafting)
- [ ] IA enemiga
- [ ] Transición exploración ↔ combate

### Fase 4: Progresión
- [ ] Árbol de talentos completo
- [ ] Sistema de niveles y stats
- [ ] Equipo y loot
- [ ] Estaciones de crafting
- [ ] Misiones de NPCs

### Fase 5: Contenido
- [ ] 20+ tipos de enemigos
- [ ] 7 jefes de zona
- [ ] Balanceo
- [ ] Partículas y efectos
- [ ] PWA para instalar

---

*Versión 3.0 — Mecánicas definidas para Fase 3*
