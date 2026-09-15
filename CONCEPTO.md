# PACHA MIRAI — Concepto de Juego

## Visión General

**PachaMirai** es un RPG táctico isométrico 2.5D para Android, inspirado en Waven (Ankama). Combina **exploración libre en mundo abierto** con **combate táctico por turnos** en cuadrícula isométrica.

- **Plataforma:** Android (APK / PWA desde móvil)
- **Estilo visual:** 2.5D isométrico con iluminación Waven-style (gradientes radiales, sombras internas, brillos)
- **Perspectiva:** Cámara isométrica con zoom, centrada en el jugador
- **Controles:** 100% táctiles
- **Historia:** Sin narrativa profunda — foco en la **jugabilidad pura**
- **Combate:** Pendiente de implementar

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

### Tamaño y Tiles

- **Mundo:** 64×64 tiles (4096 celdas)
- **Tamaño de tile:** 4×4 píxeles (4 celdas por tile para detalle fino)
- **Biomas:** 7 zonas conectadas por caminos
- **Render:** Frustum culling + Fog of War circular

---

## Estilo Visual (Waven-Style)

### Iluminación

- **Gradientes radiales:** Luz desde arriba-derecha
- **Sombras internas:** Cada elemento tiene sombreado interno
- **Brillos especulares:** Puntos de luz en superficies reflectantes
- **Sombras proyectadas:** Todos los objetos proyectan sombra en el suelo

### Sprites de Personajes

- **Cuerpo:** Gradiente con sombra lateral
- **Ropa/Armadura:** Capas con sombreado interno
- **Cabeza:** Gradiente radial en cara, pelo con brillos
- **Ojos:** Blancos con pupila + brillo especular
- **Accesorios:** Cinturón, botas, hombreras con relieve

### Sprites de NPCs

- Único color identificador por tipo
- Pelo personalizado (largo, corona, normal)
- Indicador dorado de interacción arriba

### Animales Reales (Enemigos Futuros)

| Animal | Bioma | Comportamiento |
|--------|-------|----------------|
| **Lobo** | Bosque | Manada, medio agresivo |
| **Oso** | Bosque/Montaña | Solo, muy agresivo |
| **Ciervo** | Bosque | Huye, pasivo |
| **Serpiente** | Desierto/Pantano | Emboscada, veneno |
| **Águila** | Montaña | Vuelo, ataque aéreo |
| **Jabalí** | Bosque/Pantano | Carga, agresivo |

### Vegetación por Bioma

| Bioma | Árboles | Flores | Hongos | Arbustos |
|-------|---------|--------|--------|----------|
| **Pueblo** | Roble | Margaritas | — | Setos |
| **Bosque** | Pino, Roble | Violetas | Marrones | Zarzas |
| **Desierto** | Palmera | Cactus | — | Secos |
| **Montaña** | Pino negro | Edelweiss | — | Rododendros |
| **Pantano** | Muerto | Lirios | Venenosos | Juncos |
| **Volcán** | — | — | — | — |
| **Castillo** | Ornamental | Rosas | — | Setos |

### Estructuras

- **Casas:** Paredes con sombra, techo con pendiente, chimenea
- **Puente:** Madera con pilares, sombra bajo el arco
- **Caminos:** Textura de tierra/piedra, sin césped
- **Ríos:** Agua con ondas, orillas de tierra
- **Pozos:** Piedra con sombra interior, cubierta
- **Torres:** Piedra con ventanas, bandera arriba

---

## Exploración

### Movimiento

- **Control:** Tap en celda adyacente (8 direcciones + diagonales)
- **Animación:** Caminata fluida (2 frames)
- **Velocidad:** ~0.3 segundos por tile (lento, táctico, preciso)
- **Colisiones:** No atraviesa agua, paredes, NPCs, cofres cerrados, estructuras
- **Diagonales:** Verifica celdas adyacentes libres
- **Snap:** Aterrizaje exacto en el centro de cada celda

### Minimapa Dinámico

- **Rotación libre:** Rota según la dirección del movimiento del jugador
- **Fog of War circular:** Radio de 8 tiles alrededor del jugador
- **Gradiente radial:** Bordes suaves (visible → invisible en 3 tiles)
- **Contenido:** Biomas coloreados, jugador (amarillo), NPCs (cyan) en visión
- **Tamaño:** 100×100 píxeles en esquina inferior derecha

### Fog of War (Mundo Principal)

- **Tipo:** Circular con distancia euclidiana
- **Radio:** 8 tiles
- **Transición:** Gradual en las últimas 3 tiles
- **Contenido oculto:** Tiles, NPCs, cofres fuera del radio
- **Fondo:** Negro puro (#000)

### Dificultades Ambientales

- **Daño progresivo:** Sin protección → pierdes HP gradualmente
- **Reducción de stats:** Sin equipo → menos velocidad, ataque, defensa
- **Consumibles:** Agua, antídotos, pociones de resistencia
- **Equipo especial:** Abrigo para frío, armadura ignífuga para calor

---

## Progresión

### Experiencia

- Vencer enemigos
- Explorar zonas nuevas
- Encontrar objetos ocultos
- Completar misiones de NPCs
- Abrir cofres

### Atributos

- **Nivel:** 1-30
- **Atributos base:** Fuerza, Agilidad, Inteligencia, Constitución
- **Derivados:** HP, Mana, PM, PA, Daño, Defensa, Crítico, Iniciativa

### Equipo

- **Obtención:** Tiendas, cofres, crafting, recompensas
- **Slots:** Arma, Armadura, Casco, Botas, 2 Accesorios, Mascota

### Estaciones de Crafting

- **Herrería:** Armas y armaduras metálicas
- **Alquimia:** Pociones, antídotos, consumibles
- **Encantamiento:** Mejorar equipo
- **Cocina:** Comida (curación, buffs)
- **Runas:** Modificadores de habilidades
- **Invocación:** Crear invocaciones

---

## Controles Táctiles

### Exploración

```
┌─────────────────────────────────────────┐
│         EXPLORACIÓN                     │
│                                         │
│    🌲🌲🌲🌲🌲🌲🌲                       │
│    🌲 🐺 🌲    🌲                      │
│    🌲🌲 👤 🌲🌲🌲                      │
│    🌲🌲🌲🏠🌲🌲🌲                      │
│    🌲💧🌲🌲🌲🌲🌲                      │
│                                         │
│ [HP] [Sed] [Temp] [🗺️ Minimapa]       │
│                                         │
│  Tap celda adyacente = Mover (8 dir)   │
└─────────────────────────────────────────┘
```

---

## Especificaciones Técnicas

### Motor

- **Render:** Canvas 2D (vanilla JS, sin dependencias)
- **Proyección:** Isométrica 2D
- **Estructura:** Modular (dev/ → build.sh → index.html)
- **Sin servidor:** 100% client-side (GitHub Pages)
- **Carga:** < 2 segundos

### Rendimiento

- **Objetivo:** 60 FPS en Android medio
- **Draw calls:** Frustum culling + solo tiles visibles
- **Memoria:** < 100MB RAM

### Resolución

- **Mundo:** 64×64 tiles (4096 celdas)
- **Tiles visibles:** ~20×20 en pantalla
- **Pantalla:** Adaptativa (cualquier resolución Android)
- **Tamaño tile:** 4×4 celdas (detalle fino)

---

## Diferenciadores Clave

1. **Mundo abierto real** — Sin linealidad, el jugador elige su camino
2. **Dificultades ambientales** — Frío, calor, sed como mecánica real
3. **Fog of War circular** — Exploración con descubrimiento gradual
4. **Minimapa dinámico** — Rota con la dirección del jugador
5. **Iluminación Waven-style** — Gradientes, sombras, brillos
6. **Animales reales** — Enemigos basados en fauna real
7. **Vegetación variada** — Diferentes tipos por bioma
8. **Estructuras con sombra** — Casas, puentes, torres, pozos
9. **100% funcional en móvil** — Sin PC, sin servidor, sin dependencias

---

## Roadmap

### Fase 1: Core ✅
- [x] Motor isométrico
- [x] Mundo básico
- [x] Movimiento con tap (8 direcciones)
- [x] Cámara que sigue al jugador
- [x] Colisiones

### Fase 2: Mundo ✅
- [x] Mundo 64×64 con 7 biomas
- [x] Dificultades ambientales
- [x] NPCs con diálogos
- [x] Cofres coleccionables
- [x] Minimapa con Fog of War
- [x] Guardado/carga LocalStorage
- [x] Tiles 4×4 para detalle

### Fase 2.5: Polish Visual (En progreso)
- [ ] Minimapa dinámico con rotación
- [ ] Personajes con iluminación Waven-style
- [ ] NPCs detallados
- [ ] Animales reales como enemigos
- [ ] Vegetación variada por bioma
- [ ] Estructuras con sombras (casas, puentes, etc.)

### Fase 3: Combate (Pendiente)
- [ ] Botón de acción contextual
- [ ] Sistema de turnos (PM/PA)
- [ ] Grid de combate variable
- [ ] Habilidades
- [ ] IA enemiga

### Fase 4: Progresión
- [ ] Árbol de talentos
- [ ] Sistema de niveles y stats
- [ ] Equipo y loot
- [ ] Estaciones de crafting
- [ ] Misiones de NPCs

### Fase 5: Contenido
- [ ] 20+ tipos de enemigos animales
- [ ] 7 jefes de zona
- [ ] Balanceo
- [ ] Partículas y efectos
- [ ] PWA para instalar

---

*Versión 4.0 — Incluye estilo visual Waven, animales reales, minimapa dinámico*
