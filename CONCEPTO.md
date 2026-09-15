# PACHA MIRAI — Concepto de Juego

## Visión General

**PachaMirai** es un RPG táctico isométrico 2.5D para Android, inspirado en Waven (Ankama). Combina **exploración libre en mundo abierto** con **combate táctico por turnos** en cuadrícula isométrica.

- **Plataforma:** Android (APK / PWA desde móvil)
- **Estilo visual:** 2.5D isométrico con iluminación Waven-style
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
- **Tamaño de tile:** 4×4 píxeles
- **Biomas:** 7 zonas conectadas por caminos
- **Render:** Frustum culling + Fog of War circular

---

## Estructuras por Bioma

### Pueblo (Zona Segura)

- Casas residenciales (variantes de color)
- Panadería (con chimenea humeante)
- Taberna (letrino, mesas afuera)
- Mercado (puestos con toldos)
- Herrería (yunque, forja)
- Torre del pueblo (reloj campana)
- Fuente central
- Pozo de agua

### Bosque

- Casas de leñadores
- Puentes sobre arroyos
- Senderos de tierra
- Claro de setas
- Árboles: Roble, Pino, Abedul
- Flores: Margaritas, Violetas, Lirios
- Hongos: Marrones, Rojos, Amarillos
- Arbustos: Zarzas, Bayas

### Desierto

- Oasis con palmeras
- Ruinas de piedra
- Cactus gigantes
- Dunas con sombras
- Árboles: Palmera
- Flores: Cactus
- Rocas: Arenisca roja

### Montaña

- Cabañas de pastores
- Puentes de madera sobre riachos
- Cabañas en acantilados
- Árboles: Pino Negro, Abeto
- Flores: Edelweiss, Rododendro
- Rocas: Granito gris
- Manantiales de montaña

### Pantano

- Casas sobre pilotes
- Puentes de madera podrida
- Área de lirios de pantano
- Árboles: Sauce Muerto, Abedul
- Hongos: Venenosos, Brillantes
- Flores: Lirios, Juncos
- Niebla baja (efecto visual)

### Volcán

- Formaciones de lava
- Ríos de lava (con partículas)
- Observatorio en altura
- Árboles: (ninguno vivo)
- Rocas: Obsidiana, Basalto
- Cavernas

### Castillo

- Muros perimetrales
- Puente levadizo
- Torres de guardia
- Plaza del trono
- Jardines ornamentales
- Capilla interior

---

## Elementos de Agua

### Ríos
- Curvas naturales
- Corriente con animación
- Orillas de tierra/piedra
- Transición gradual con playas

### Puentes
- Madera: Tablones, pasamanos, pilares
- Piedra: Arcos, pretiles, soportes
- Levadizo: Cadena, mecanismo, puerta

### Cascadas
- Caída con efecto de espuma
- Rocas de salto
- Niebla de agua en base
- Sonido ambiente (futuro)

### Lagos
- Forma orgánica
- Islas pequeñas
- Playas de arena/piedra
- Reflejos de luz

### Manantiales
- Brote desde roca
- Estanque cristalino
- Efecto de brillo
- Hierbas alrededor

---

## Vegetación Detallada

### Árboles (12+ variedades)

| Tipo | Bioma | Tronco | Copa | Especial |
|------|-------|--------|------|----------|
| Roble | Bosque | Marrón | Redonda verde | Hojas grandes |
| Pino | Bosque/Montaña | Marrón | Triangular oscura | Pinocha |
| Abedul | Bosque | Blanco | Ovalada clara | Manchas blancas |
| Arce | Bosque | Gris | Roja/naranja | Hojas en estrella |
| Palmera | Desierto | Delgada | Hojas abanico | Coco |
| Muerto | Pantano | Gris | Sin copa | Ramas secas |
| Sauce | Pantano | Verde | Colgante | Llorón |
| Abeto | Montaña | Oscuro | Cónica | Piñas |
| Pino Negro | Montaña | Oscuro | Denso | Hojas pequeñas |
| Seco | Volcán | Negro | Sin copa | Ceniza |
| Ornamental | Castillo | Verde | Esfera | Podado |
| Bosque Negro | Pantano | Negro | Irregular | Niebla |

### Flores

| Tipo | Bioma | Color | Forma |
|------|-------|-------|-------|
| Margarita | Pueblo/Bosque | Blanco/Amarillo | Redonda |
| Violeta | Bosque | Púrpura | Pequeña |
| Lirio | Bosque/Pantano | Blanco | Alargada |
| Rosa | Castillo | Roja | Capullos |
| Edelweiss | Montaña | Blanco | Estrella |
| Junco | Pantano | Marrón | Espiga |
| Cactus | Desierto | Rosa | Espinas |

### Hongos

| Tipo | Bioma | Color | Efecto |
|------|-------|-------|--------|
| Marrón | Bosque | Marrón | Normal |
| Rojo | Bosque | Rojo/Puntos | Decorativo |
| Venenoso | Pantano | Verde brillante | Tóxico |
| Brillante | Pantano | Azul bioluminiscente | Mágico |
| Gigante | Bosque | Naranja | Grande |

### Arbustos

| Tipo | Bioma | Efecto |
|------|-------|--------|
| Zarza | Bosque | Espinas |
| Baya | Bosque | Frutos rojos |
| Setal | Bosque | Agrupados |
| Seco | Desierto | Muerto |

---

## Animales Reales (Enemigos)

### Catálogo de Fauna

| Animal | Bioma | Comportamiento | Variantes |
|--------|-------|----------------|-----------|
| **Lobo** | Bosque | Manada, agresivo | Gris, Negro, Blanco |
| **Oso** | Bosque/Montaña | Solo, territorial | Pardo, Negro |
| **Ciervo** | Bosque | Huye, pasivo | Rojo, Blanco |
| **Serpiente** | Desierto/Pantano | Emboscada, veneno | Verde, Marrón |
| **Águila** | Montaña | Vuelo, ataque aéreo | Real, Calva |
| **Jabalí** | Bosque/Pantano | Carga, agresivo | Marrón, Negro |
| **Zorro** | Bosque | Astuto, solo | Rojo, Blanco |
| **Conejo** | Bosque | Huye, pasivo | Gris, Blanco |
| **Cocodrilo** | Pantano | Emboscada | Verde oscuro |
| **Buitre** | Desierto | Carroñero | Negro |

### Variantes Visuales

Cada animal tiene 3 variantes de color que afectan sus stats:
- **Normal:** Stats estándar
- **Albino:** Más rápido, menos vida
- **Melanístico:** Más fuerte, más vida

---

## Personaje Principal (Waven-Style)

### Cuerpo (Iluminación)

- **Cabeza:** Gradial radial (centro brillante → bordes sombreados)
- **Piel:** Gradiente con sombra lateral izquierda
- **Pelo:** Capas con brillos especulares, sombra interna
- **Ojos:** Blanco + pupila oscura + brillo especular (2 puntos)

### Armadura (Capas)

- **Hombreras:** Metal con gradiente, borde brillante
- **Peto:** Gradiente vertical con sombra lateral
- **Cinturón:** Cuero con hebulla dorada reflectante
- **Brazos:** Manga con pliegues, guantes con sombra
- **Piernas:** Pantalón con costuras, botas altas

### Equipo Visual (visible según slot)

- **Arma:** En mano derecha (visible)
- **Casco/Cabeza:** Visible en todo momento
- **Accesorio 1:** Capa (si equipado)
- **Accesorio 2:** Amuleto (visible en cuello)

---

## NPCs (Iluminación Waven-Style)

### Estilo por Tipo

| Tipo | Cuerpo | Cabeza | Pelo | Especial |
|------|--------|--------|------|----------|
| Herrero | Delantal de cuero | Gorro | Corto | Martillo en mano |
| Mago | Túnica larga | Gorro puntiagudo | Barba larga | Bastón |
| Comerciante | Chaleco | Sombrero | Normal | Bolsa de monedas |
| Leñador | Camisa a cuadros | Gorra | Corto | Hacha |
| Rey | Armadura dorada | Corona | Largo | Cetro |
| Bruja | Capucha | Capucha | Largo | Caldero |
| Alquimista | Bata | Calvo | — | Frasco en mano |

### Indicadores

- **Dorado encima:** NPC interactivo
- **Plata:** Ya interactuaste
- **Rojo:** Hostil (futuro combate)

---

## Exploración

### Movimiento

- **Control:** Tap en celda adyacente (8 direcciones + diagonales)
- **Animación:** Caminata fluida (2 frames)
- **Velocidad:** ~0.3 segundos por tile
- **Colisiones:** Agua, paredes, NPCs, cofres, estructuras
- **Snap:** Aterrizaje exacto en el centro de cada celda

### Minimapa (Fijo, Norte Arriba)

- **Fog of War circular:** Radio de 8 tiles
- **Gradiente radial:** Bordes suaves
- **Contenido:** Biomas, jugador (amarillo), NPCs (cyan)
- **Sin rotación:** Norte siempre arriba
- **Tamaño:** 100×100 píxeles

### Fog of War (Mundo Principal)

- **Tipo:** Circular con distancia euclidiana
- **Radio:** 8 tiles
- **Transición:** Gradual en las últimas 3 tiles
- **Contenido oculto:** Todo fuera del radio

### Dificultades Ambientales

- **Daño progresivo:** Sin protección → -HP
- **Reducción de stats:** Sin equipo → menos velocidad/ataque
- **Consumibles:** Agua, antídotos, pociones
- **Equipo especial:** Abrigo, armadura ignífuga

---

## Controles Táctiles

### Exploración

| Input | Acción |
|-------|--------|
| Tap celda adyacente | Moverse (8 direcciones) |
| Tap NPC | Hablar |
| Tap cofre | Recoger |
| Tap enemigo | (Futuro: combate) |

---

## Especificaciones Técnicas

### Motor
- **Render:** Canvas 2D (vanilla JS)
- **Proyección:** Isométrica 2D
- **Estructura:** Modular (dev/ → build.sh → index.html)
- **Sin servidor:** 100% client-side

### Rendimiento
- **Objetivo:** 60 FPS en Android medio
- **Draw calls:** Frustum culling + solo tiles visibles
- **Memoria:** < 100MB RAM

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
- [x] Guardado/carga

### Fase 2.5: Polish Visual (En progreso)
- [x] Personajes con iluminación Waven
- [x] NPCs detallados
- [x] Árboles con copas 3D
- [x] Rocas con caras sombreadas
- [x] Casas con sombras
- [x] Minimapa fijo (Norte arriba)
- [ ] Vegetación variada por bioma (flores, hongos, arbustos)
- [ ] Estructuras completas (puentes, ríos, pozos)
- [ ] Animales reales como enemigos
- [ ] Efectos de agua (ríos, cascadas)

### Fase 3: Combate (Pendiente)
- [ ] Botón de acción contextual
- [ ] Sistema de turnos (PM/PA)
- [ ] Grid de combate variable
- [ ] Habilidades
- [ ] IA enemiga

---

*Versión 5.0 — Detalles visuales completos, animales reales, estructuras*
