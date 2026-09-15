# PACHA MIRAI — Concepto de Juego

## Visión General

**PachaMirai** es un RPG táctico isométrico 2.5D para Android, inspirado en Waven (Ankama). Combina **exploración libre en mundo abierto** con **combate táctico por turnos** en cuadrícula isométrica.

- **Plataforma:** Android (APK / PWA desde móvil)
- **Estilo visual:** 2.5D isométrico, pixel art geométrico vibrante (como Waven/Dofus)
- **Perspectiva:** Cámara isométrica con zoom, centrada en el jugador
- **Controles:** 100% táctiles (sin teclado)
- **Historia:** Sin narrativa profunda — el foco es la **jugabilidad pura**

---

## Mundo Abierto

### Filosofía

El mundo es **completamente abierto** desde el inicio. No hay bloqueo de zonas por nivel, pero cada bioma tiene **dificultades ambientales** que desafían al jugador:

| Bioma | Dificultad Ambiental | Requisito |
|-------|---------------------|-----------|
| **Pueblo Inicial** | Ninguna | Zona segura |
| **Bosque Verde** | Ninguna | — |
| **Desierto Árido** | Sed progresiva | Hidratación (cantimplora, agua) |
| **Montaña Helada** | Frío progresivo | Abrigo, hogueras |
| **Pantano Oscuro** | Veneno/Enfermedad | Antídotos, equipo resistente |
| **Volcán** | Calor extremo | Equipo ignífugo, pociones de fuego |
| **Castillo del Rey** | Zona final | Preparación completa |

### Dificultades Ambientales

- **Daño progresivo:** Sin protección → pierdes HP gradualmente
- **Reducción de stats:** Sin equipo → menos velocidad, ataque, defensa
- **Consumibles:** Agua, antídotos, pociones de resistencia
- **Equipo especial:** Abrigo para frío, armadura ignífuga para calor
- **Estrategia:** El jugador debe prepararse antes de explorar zonas hostiles

### Tamaño y Rendimiento

- **Mundo total:** 64×64 tiles (4096 celdas)
- **Biomas:** 7 zonas conectadas por caminos
- **Render:** Frustum culling (solo lo visible)
- **Cámara:** Siempre centrada, nunca muestra fuera del mundo

---

## Exploración Libre

### Movimiento

- **Control:** Tap en celda adyacente → mueve 1 tile
- **Animación:** Caminata fluida (2 frames de piernas)
- **Velocidad:** ~0.2 segundos por tile
- **Colisiones:** No atraviesa agua, paredes, enemigos
- **Precisión:** Snap exacto al centro de cada celda

### Enemigos en el Mundo

- **Visibles:** Se ven caminando por el mapa
- **Elección:** El jugador decide si luchar o evitar
- **Encuentros:** No aleatorios — están fijos en el mapa
- **Agresividad:** Algunos persiguen al jugador, otros son pasivos

### Interacciones

- **NPCs:** Tap para abrir diálogo
- **Cofres:** Tap para abrir y recibir loot
- **Zonas de combate:** Entrar en radio de enemigo → inicia combate
- **Estaciones de crafting:** Herrería, alquimia, cocina, encantamiento
- **Guardado:** Automático en zonas seguras

---

## Combate Táctico (Estilo Waven)

### Inicio del Combate

1. El jugador entra en el radio de un enemigo
2. La cámara se ajusta a la **zona de combate** (5×5 tiles)
3. Aparecen aliados (mascotas/invocaciones) y enemigos
4. Todos se posicionan en la cuadrícula isométrica

### Mecánicas por Turno

- **Puntos de Movimiento (PM):** 4-6 según build
- **Puntos de Acción (PA):** 4-6 según build
- **Iniciativa:** Por stats de agilidad
- **Turnos alternados:** Jugador → Enemigo → Jugador...

### Sistema de Habilidades (No Hechizos)

En vez de hechizos elementales clásicos, el jugador tiene **habilidades activas** aprendidas en el **árbol de talentos**:

#### Categorías de Habilidades

| Tipo | Ejemplo | Efecto |
|------|---------|--------|
| **Ataque** | Tajo Filoso | 3 daño cuerpo a cuerpo |
| **Ataque a distancia** | Flecha Penetrante | 2 daño, alcance 3 tiles |
| **Área** | Onda de Choque | 2 daño en área 1 |
| **Movimiento** | Dash | Mueve 2 tiles gratis |
| **Defensa** | Escudo Mágico | +3 defensa 2 turnos |
| **Buff** | Furia | +50% ataque 3 turnos |
| **Debuff** | Miedo | Enemigo no ataca 1 turno |
| **Curación** | Toque Sanador | +6 HP |
| **Invocación** | Invocar Lobo | Invoca unidad aliada |

#### Árbol de Talentos

- **Profundidad:** Muchas ramas, especialización flexible
- **3 ramas principales:**
  - **Poder:** Daño, crítico, área
  - **Supervivencia:** Vida, defensa, curación
  - **Soporte:** Buffs, invocaciones, control
- **Sin clase fija:** El árbol define el rol del personaje
- **Reespecializable:** Se puede cambiar en zonas seguras (con coste)

### Invocaciones/Mascotas

- **Obtención:** Combate, misiones, equipamiento, invocación en combate
- **Tipos:**
  - **Familiar pasivo:** Equipado, da stats pasivos
  - **Invocación activa:** En combate, ocupa un tile
- **Ejemplos:** Lobo, Halcón, Oso, Elemental, Golem

### IA Enemiga

- **Básico:** Si jugador en rango → ataca
- **Intermedio:** Usa habilidades, se posiciona
- **Avanzado:** Flanqueo, uso de cobertura, enfoque en débiles
- **Jefe:** Patrones especiales, fases, invocaciones

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
- **Derivados:** HP, Mana, PM, PA, Daño, Defensa, Crítico

### Equipo y Loot

El equipo se obtiene de **todas las formas**:
- 🛒 **Tiendas:** Comprar con oro
- 🗝️ **Cofres:** Encontrar explorando
- ⚒️ **Crafting:** Fabricar con materiales
- 🎁 **Recompensas:** Misiones, exploración

#### Tipos de Equipo

| Slot | Efecto |
|------|--------|
| Arma | Daño base, alcance, tipo de ataque |
| Armadura | Defensa, resistencia ambiental |
| Casco | Defensa mágica, visión |
| Botas | Movimiento, evasión |
| Accesorio 1 | Stat especial (crítico, robo de vida, etc.) |
| Accesorio 2 | Stat especial |
| Mascota | Stats pasivos |

### Estaciones de Crafting

| Estación | Función |
|----------|---------|
| **Herrería** | Armas y armaduras metálicas |
| **Alquimia** | Pociones, antídotos, consumibles |
| **Encantamiento** | Mejorar equipo existente |
| **Cocina** | Comida (curación, buffs temporales) |
| **Runas** | Modificadores de habilidades |

---

## Controles Táctiles (100% Touch)

### Exploración

```
┌─────────────────────────────────┐
│         EXPLORACIÓN             │
│                                 │
│    🌲🌲🌲🌲🌲🌲🌲               │
│    🌲 🕷️ 🌲    🌲  ← Enemigo    │
│    🌲🌲 🧙 🌲🌲🌲  ← Jugador     │
│    🌲🌲🌲🏠🌲🌲🌲  ← NPC         │
│    🌲💧🌲🌲🌲🌲🌲  ← Agua/sed    │
│                                 │
│ [HP] [Sed] [Temp] [Mini-mapa]  │
│                                 │
│  Tap celda adyacente = Mover   │
└─────────────────────────────────┘
```

### Combate

```
┌─────────────────────────────────┐
│         COMBATE 5×5             │
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
│ [Mover] [Habilidades] [Fin]    │
│                                 │
│  Tap celda = Mover              │
│  Tap enemoso + habilidad = Atk  │
└─────────────────────────────────┘
```

---

## Especificaciones Técnicas

### Motor

- **Render:** Canvas 2D (vanilla JS, sin dependencias)
- **Proyección:** Isométrica 2D (no WebGL)
- **Archivo único:** index.html
- **Sin servidor:** 100% client-side (GitHub Pages)
- **Sin npm/build:** Código directo

### Assets

- **Sprites:** Formas geométricas procedimentales (no imágenes)
- **Colores:** Paleta vibrante con degradados y sombras
- **UI:** Botones redondeados, barras con gradientes
- **Sin emojis:** No renderizan bien en Android

### Rendimiento

- **Objetivo:** 60 FPS en Android medio
- **Draw calls:** Mínimos (batch de tiles)
- **Memoria:** < 100MB RAM
- **Carga:** < 2 segundos

---

## Diferenciadores Clave

1. **Mundo abierto real** — Sin linealidad, el jugador elige su camino
2. **Dificultades ambientales** — Frío, calor, sed como mecánica real
3. **Árbol de talentos profundo** — Sin clases, el rol lo defines vos
4. **Combate táctico con profundidad** — PM/PA/posicionamiento Waven-style
5. **Crafting completo** — Fabricar equipo, mejorar, encantar
6. **Elección de encuentros** — Enemigos visibles, vos decidís si luchás
7. **100% funcional en móvil** — Sin PC, sin servidor, sin dependencias

---

## Roadmap de Desarrollo

### Fase 1: Core (Semana 1-2)
- [ ] Motor de render isométrico
- [ ] Mundo 16×16 con 1 bioma
- [ ] Movimiento de jugador (tap, snap exacto)
- [ ] Cámara que sigue al jugador
- [ ] Colisiones básicas

### Fase 2: Mundo (Semana 3-4)
- [ ] Mundo completo 64×64 con 7 biomas
- [ ] Dificultades ambientales (frío, calor, sed)
- [ ] NPCs y cofres
- [ ] Minimapa y brújula
- [ ] Sistema de guardado

### Fase 3: Combate (Semana 5-7)
- [ ] Zona de combate delimitada
- [ ] Sistema de turnos (PM/PA)
- [ ] Habilidades básicas
- [ ] Invocaciones/mascotas
- [ ] IA enemiga

### Fase 4: Progresión (Semana 8-10)
- [ ] Árbol de talentos completo
- [ ] Sistema de niveles y stats
- [ ] Equipo y loot
- [ ] Estaciones de crafting
- [ ] Misiones de NPCs

### Fase 5: Contenido (Semana 11-12)
- [ ] 20+ tipos de enemigos
- [ ] 7 jefes de zona
- [ ] Balanceo de dificultad
- [ ] Partículas y efectos
- [ ] PWA para instalar

---

*Versión 2.0 — Concepto completo basado en cuestionario*
