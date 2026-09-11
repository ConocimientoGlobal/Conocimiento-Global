# Visión Completa del Proyecto

## 0. INSTRUCCIÓN PRINCIPAL PARA LA IA

Estás colaborando en el diseño y desarrollo de un videojuego independiente de mundo abierto 2D.

Tu función no es simplemente programar funcionalidades aisladas. Debes actuar simultáneamente como:

- diseñador de sistemas;
- diseñador de videojuegos;
- arquitecto de software;
- diseñador de mundo;
- diseñador de progresión;
- diseñador de experiencia del jugador;
- programador;
- analista crítico del proyecto.

Debes cuestionar decisiones débiles, detectar sobrealcance, evitar complejidad innecesaria y priorizar siempre un núcleo jugable sólido.

No debes intentar construir todo el juego de una vez.

El desarrollo debe avanzar mediante prototipos funcionales y vertical slices, validando primero el bucle principal antes de ampliar el alcance.

---

## 1. VISIÓN GENERAL

El proyecto es un:

Open World 2D Sandbox RPG con exploración, supervivencia ligera, construcción, crafting, agricultura, conocimiento, descubrimiento, progresión y narrativa ambiental.

La filosofía central del juego es:

«El jugador no conquista el mundo. Aprende a habitarlo.»

Y una segunda regla define todos los sistemas:

«Todo lo que descubres puede convertirse en una herramienta.»

El mundo debe sentirse como un ecosistema interconectado y no como un simple mapa lleno de recursos, enemigos y cofres.

El jugador comienza con conocimientos y capacidades limitadas.

A medida que explora:

- descubre materiales;
- identifica plantas;
- encuentra animales;
- aprende técnicas;
- estudia objetos;
- descubre ruinas;
- aprende recetas;
- desarrolla habilidades;
- construye infraestructura;
- crea herramientas;
- transforma recursos;
- establece una base;
- accede a regiones nuevas;
- reconstruye progresivamente la historia del mundo.

La progresión debe producirse tanto por poder como por conocimiento.

---

## 2. PRINCIPIOS DE DISEÑO

### 2.1 Profundidad antes que cantidad

No queremos cientos de sistemas superficiales.

Preferimos pocos sistemas profundamente conectados.

Ejemplo:

Una planta no debe ser únicamente:

"PLANTA → MATERIAL"

Puede ser:

"PLANTA → alimento"
"PLANTA → medicina"
"PLANTA → ingrediente"
"PLANTA → cultivo"
"PLANTA → tinte"
"PLANTA → comercio"
"PLANTA → investigación"

Los objetos deben tener múltiples usos cuando tenga sentido.

---

### 2.2 El conocimiento es progresión

El conocimiento no debe limitarse a una enciclopedia decorativa.

Descubrir algo debe abrir posibilidades.

Ejemplo:

El jugador encuentra una planta desconocida.

Primero:

"DESCONOCIDA"

Después:

"IDENTIFICADA"

Después:

"PROPIEDADES CONOCIDAS"

Después:

"RECETA DESCUBIERTA"

Después:

"CULTIVO POSIBLE"

Después:

"USO AVANZADO"

El conocimiento debe modificar realmente lo que el jugador puede hacer.

---

### 2.3 El mundo debe responder

Los sistemas deben interactuar.

El clima puede afectar:

- agricultura;
- temperatura;
- disponibilidad de recursos;
- comportamiento animal;
- exploración.

Las construcciones pueden afectar:

- almacenamiento;
- producción;
- temperatura;
- eficiencia;
- acceso.

Las estaciones pueden afectar:

- cultivos;
- fauna;
- recursos;
- comercio.

Las decisiones del jugador pueden modificar su entorno.

---

### 2.4 Evitar la gamificación excesiva

No todo necesita:

- una barra;
- un nivel;
- una moneda;
- una misión;
- un indicador;
- un número.

Cuando una mecánica puede funcionar mediante descubrimiento o interacción natural, preferir ese enfoque.

---

## 3. EXPERIENCIA DEL JUGADOR

La experiencia deseada es:

Curiosidad → Exploración → Descubrimiento → Experimentación → Conocimiento → Creación → Infraestructura → Progresión → Descubrimiento

Este ciclo debe ser uno de los pilares del juego.

---

## 4. EL MUNDO

El mundo será un territorio abierto compuesto por:

- regiones;
- biomas;
- subregiones;
- asentamientos;
- ruinas;
- cuevas;
- estructuras;
- zonas especiales;
- recursos;
- ecosistemas.

Los biomas no deben ser únicamente diferencias visuales.

Cada bioma debe tener identidad sistémica.

---

## 5. BIOMAS

### BOSQUE
Recursos: madera, frutos, fibras, hongos, plantas, arcilla, fauna.
Características: abundante vida, agua, zonas húmedas, refugios naturales.
Tecnologías: agricultura, carpintería, medicina natural, textiles.

### REGIÓN ÁRIDA
Recursos: minerales, arcilla, sales, plantas resistentes, fibras, agua limitada.
Problemas: calor, frío nocturno, escasez de agua, tormentas.
Tecnologías: almacenamiento de agua, arquitectura térmica, conservación, agricultura eficiente.

### MONTAÑA
Recursos: piedra, metales, minerales, cristales.
Problemas: frío, pendientes, derrumbes, fauna especializada.
Tecnologías: minería, metalurgia, ingeniería.

### COSTA
Recursos: peces, algas, sal, conchas, madera, minerales.
Tecnologías: pesca, conservación, navegación, construcción.

---

## 6. ECOLOGÍA

El mundo debe intentar representar relaciones entre:

- flora;
- fauna;
- clima;
- agua;
- suelo;
- estaciones;
- recursos;
- actividad humana.

No necesitamos una simulación científica completa.

Necesitamos una ilusión sistémica convincente.

---

## 7. CICLO TEMPORAL

Debe existir:

- día;
- noche;
- estaciones;
- clima.

El tiempo debe tener consecuencias.

---

## 8. AGUA

El agua puede convertirse en uno de los sistemas estructurales del mundo.

Debe existir potencialmente:

- agua natural;
- lluvia;
- ríos;
- lagos;
- depósitos;
- agua almacenada;
- sistemas de distribución.

---

## 9. PERSONAJE

El jugador crea un avatar.

Debe poder modificar:

- apariencia;
- ropa;
- características visuales;
- equipamiento.

No utilizar clases rígidas.

El personaje desarrolla capacidades según las actividades realizadas.

---

## 10. ATRIBUTOS

- VIDA: Salud general.
- RESISTENCIA: Capacidad de realizar acciones físicas.
- FUERZA: Carga, minería, armas pesadas, construcción.
- DESTREZA: Herramientas, agricultura, precisión, fabricación.
- INTELIGENCIA: Investigación, tecnología, alquimia.
- PERCEPCIÓN: Detección, rastreo, identificación.
- CONOCIMIENTO: Representa comprensión del mundo.

---

## 11. PROGRESIÓN

Tres grandes líneas de progresión:

- FÍSICA: El personaje se vuelve físicamente más capaz.
- TECNOLÓGICA: El jugador obtiene mejores herramientas e infraestructura.
- COGNITIVA: El jugador comprende mejor el mundo.

La progresión debe evitar depender exclusivamente del combate.

---

## 12. HABILIDADES

Ramas potenciales:

- EXPLORACIÓN: movimiento, resistencia, rastreo, supervivencia.
- RECOLECCIÓN: eficiencia, herramientas, recursos raros.
- AGRICULTURA: rendimiento, cultivos, semillas, conservación.
- ARTESANÍA: herramientas, materiales, calidad.
- CONSTRUCCIÓN: estructuras, eficiencia, infraestructura.
- INVESTIGACIÓN: identificación, experimentación, conocimiento.
- COMBATE: armas, defensa, habilidades.

---

## 13. INVENTARIO

Categorías:

- recursos, materiales, herramientas, armas, armaduras, ropa, alimentos, ingredientes, recetas, objetos especiales, documentos, artefactos.

---

## 14. RECOLECCIÓN

Los recursos aparecen naturalmente en el mundo.

Los recursos pueden tener diferentes niveles de calidad.

---

## 15. CRAFTING

Etapas:

1. piedra, madera, fibra, arcilla.
2. cerámica, textiles, herramientas artesanales.
3. cobre, bronce, hierro, acero.
4. mecanismos, máquinas, sistemas energéticos.
5. Tecnología avanzada.

No implementar todas las etapas inicialmente.

---

## 16. CONSTRUCCIÓN

El jugador puede construir:

- refugios, casas, almacenes, talleres, cocinas, granjas, laboratorios, bibliotecas, sistemas de agua, infraestructura energética.

Las estructuras deben tener utilidad.

---

## 17. ARQUITECTURA

Factores potenciales:

- orientación, ventilación, temperatura, aislamiento, iluminación, proximidad al agua, distancia a recursos.

Primero: "estructura → función".
Después: "estructura → eficiencia".
Finalmente: "estructura → sistema ambiental".

---

## 18. AGRICULTURA

Sistema basado en:

- semillas, suelo, agua, temperatura, estación, tiempo.

El jugador puede: recolectar, cultivar, reproducir, experimentar, mejorar.

---

## 19. COCINA

La cocina permite transformar ingredientes.

Los alimentos pueden proporcionar efectos temporales:

- recuperación, resistencia, percepción, fuerza, velocidad, resistencia ambiental.

Las recetas pueden descubrirse mediante NPCs, libros, experimentación, observación, investigación.

---

## 20. FERMENTACIÓN / ALQUIMIA

Permite experimentar con:

- plantas, frutas, raíces, hongos, líquidos, minerales, extractos, fermentaciones, conservas.

Variables: ingrediente, proporción, recipiente, temperatura, tiempo.

---

## 21. BIBLIOTECA

Funciona como: enciclopedia + diario + árbol de conocimiento + archivo del mundo.

Categorías: naturaleza, fauna, flora, minerales, materiales, cocina, agricultura, tecnología, alquimia, geografía, historia, ruinas.

El contenido se completa mediante descubrimiento.

---

## 22. LOOT

Fuentes: enemigos, cofres, ruinas, estructuras, recursos, eventos.

Tipos: materiales, objetos, herramientas, armas, accesorios, artefactos, mapas, documentos, conocimientos.

---

## 23. COMBATE

El combate existe pero no define completamente el juego.

Debe ser: accesible, dinámico, legible, relativamente sencillo al comienzo.

Categorías: cuerpo a cuerpo, distancia, herramientas, habilidades.

El jugador puede: evitar, escapar, esconderse, estudiar, domesticar eventualmente, combatir.

---

## 24. NPC Y COMUNIDADES

Cada comunidad puede especializarse en:

- agricultura, minería, medicina, construcción, tecnología, comercio, navegación.

Los NPC pueden poseer conocimiento que el jugador todavía no tiene.

---

## 25. ECONOMÍA

Basada en: recursos, objetos, comercio, necesidades.

El comercio debe ser consecuencia de la producción y la escasez.

---

## 26. EXPLORACIÓN

La exploración debe recompensar la curiosidad.

El jugador puede encontrar: recursos, animales, plantas, cuevas, ruinas, asentamientos, artefactos, mapas, tecnologías, secretos.

No llenar cada metro cuadrado con recompensas. El vacío también debe existir.

---

## 27. RUINAS Y CIVILIZACIÓN PERDIDA

Existe una civilización anterior.

Su historia no se explica directamente.

El jugador reconstruye su pasado mediante: ruinas, documentos, máquinas, arquitectura, artefactos, símbolos, tecnologías.

La pregunta central será: «¿Qué ocurrió con ella?»

---

## 28. EVOLUCIÓN VISUAL DEL MUNDO

La estética debe comenzar siendo predominantemente: natural, artesanal, orgánica, rural, mineral.

Pero conforme el jugador profundiza en la historia aparecen: estructuras industriales, tecnología, máquinas, biotecnología, sistemas energéticos, arquitectura avanzada.

La sensación buscada es: naturaleza → civilización → tecnología → misterio.

---

## 29. ESTÉTICA

Dirección artística: 2D estilizado con identidad propia.

Mezcla conceptual entre: naturaleza, tecnología, arquitectura orgánica, ingeniería, ruinas, biología, energía.

---

## 30. NARRATIVA AMBIENTAL

La historia debe estar distribuida por el mundo.

No depender exclusivamente de diálogos.

El jugador debe poder interpretar acontecimientos a través de: estructuras, restos, objetos, libros, NPCs, tecnologías, paisajes.

---

## 31. SOSTENIBILIDAD COMO SISTEMA

La regla es:

«Si una solución sostenible es útil dentro del sistema, existe como mecánica.»

El jugador aprende mediante la interacción.

---

## 32. TECNOLOGÍA APROPIADA

Una solución sencilla puede ser mejor que una máquina compleja.

El jugador debería poder resolver problemas mediante: conocimiento, diseño, materiales, infraestructura, tecnología.

---

## 33. EL JUGADOR COMO CREADOR

El jugador debe poder pasar progresivamente de:

superviviente → recolector → artesano → constructor → explorador → investigador → creador de infraestructura.

No existe una única forma correcta de jugar.

---

## 34. BUCLE PRINCIPAL

EXPLORAR → DESCUBRIR → RECOLECTAR → APRENDER → FABRICAR → CONSTRUIR → MEJORAR → EXPLORAR NUEVAMENTE

Si este ciclo no resulta divertido en un prototipo pequeño, detener la expansión del proyecto y corregirlo.

---

## 35. MVP

El primer prototipo debe contener solamente:

- Mundo: 1 mapa pequeño, 3 biomas, cámara, movimiento, colisiones, tiles.
- Recursos: 3–5 recursos, árboles, piedra, una planta, un mineral.
- Personaje: movimiento, vida, inventario, herramienta básica.
- Recolección: recoger recursos, almacenar recursos.
- Crafting: 5–10 recetas.
- Construcción: colocar algunas estructuras simples.
- Combate: 1 enemigo, ataque básico, daño, loot.
- Progresión: XP, nivel, una habilidad.
- Biblioteca: registrar automáticamente los descubrimientos.
- Guardado: guardar/cargar partida.

---

## 36. VERTICAL SLICE

El primer objetivo real no es "tener un mundo abierto".

Es conseguir esta experiencia:

El jugador aparece → Explora → Encuentra un recurso desconocido → Lo identifica → Lo recolecta → Descubre que sirve para fabricar algo → Fabrica una herramienta → La herramienta permite acceder a una nueva zona → Encuentra un nuevo recurso → Descubre una estructura antigua → Registra el descubrimiento en la biblioteca → Regresa a su refugio → Construye/mejora algo → Se prepara para volver a explorar.

Si esto resulta divertido, tenemos el núcleo del juego.

---

## 37. MOTOR

Motor principal: Phaser.

Razones: excelente para 2D, ecosistema JavaScript/TypeScript, adecuado para mapas tileados, buena base para sistemas complejos, permite escalar el prototipo.

---

## 38. ARQUITECTURA TÉCNICA

El código debe ser modular.

Separar conceptualmente:

/game
  /core
  /world
  /player
  /entities
  /inventory
  /items
  /resources
  /crafting
  /building
  /farming
  /cooking
  /knowledge
  /combat
  /npc
  /progression
  /save
  /ui

Los datos deben estar separados de la lógica cuando sea posible.

---

## 39. DESARROLLO DESDE DISPOSITIVOS LIMITADOS

El proyecto debe diseñarse teniendo en cuenta que el desarrollo puede realizarse desde un entorno móvil.

Por tanto:

- evitar dependencias innecesarias;
- mantener comandos simples;
- documentar cada paso;
- utilizar Git;
- utilizar repositorio remoto;
- mantener scripts reproducibles;
- minimizar procesos pesados;
- automatizar tareas repetitivas.

---

## 40. IA COMO HERRAMIENTA DE DESARROLLO

Las IAs utilizadas en el proyecto deben actuar como colaboradores técnicos.

Pueden ayudar con: programación, generación de datos, debugging, documentación, diseño, testing, balance, refactorización, generación de contenido.

Pero ninguna IA debe asumir que una idea es buena simplemente porque fue solicitada.

Debe poder decir:

«"Esto aumenta demasiado el alcance."»
«"Esto no aporta suficiente valor."»
«"Esta arquitectura generará deuda técnica."»
«"Conviene prototipar primero."»

---

## 41. REGLA ANTI-SCOPE CREEP

Cada nueva característica debe evaluarse según:

1. ¿Mejora el bucle principal?
2. ¿Interactúa con otros sistemas?
3. ¿Aporta una nueva decisión al jugador?
4. ¿Puede implementarse posteriormente?
5. ¿Cuál es su coste técnico?
6. ¿Qué sistema existente complica?

Si una característica no aporta suficiente valor: se pospone.

---

## 42. PRIORIDADES

Orden obligatorio de desarrollo:

- FASE 1: Movimiento + mundo.
- FASE 2: Recolección + inventario.
- FASE 3: Crafting.
- FASE 4: Construcción.
- FASE 5: Combate + loot.
- FASE 6: Biblioteca + descubrimiento.
- FASE 7: Progresión.
- FASE 8: Agricultura + cocina.
- FASE 9: NPC + comunidades.
- FASE 10: Mundo dinámico.
- FASE 11: Narrativa + ruinas.
- FASE 12: Tecnología avanzada.

No avanzar de fase simplemente porque "funciona".

---

## 43. REGLAS DE DISEÑO DEL MUNDO

El mundo debe evitar:

- relleno artificial;
- recursos infinitos sin lógica;
- enemigos colocados arbitrariamente;
- NPCs decorativos;
- misiones repetitivas;
- árboles de habilidades gigantes;
- crafting absurdo;
- inflación de estadísticas;
- loot excesivo;
- tutoriales interminables.

Debe favorecer:

- descubrimiento;
- experimentación;
- sistemas interconectados;
- consecuencias;
- curiosidad;
- libertad;
- creatividad.

---

## 44. IDENTIDAD DEL PROYECTO

La identidad del juego no debe ser: "otro juego de supervivencia", "otro RPG de combate", ni "otro clon de Minecraft/Terraria".

La identidad debe surgir de esta combinación:

«Exploración + conocimiento + creación + infraestructura + naturaleza + misterio tecnológico.»

El jugador debe sentir que está comprendiendo un mundo, no simplemente desbloqueando contenido.

---

## 45. PRINCIPIO DE DISEÑO MÁS IMPORTANTE

Cuando haya que elegir entre:

A) Agregar 50 objetos nuevos.
B) Hacer que 5 objetos existentes interactúen de cinco maneras diferentes.

Preferir: B.

Cuando haya que elegir entre:

A) Crear diez biomas.
B) Hacer que tres biomas tengan sistemas realmente diferentes.

Preferir: B.

Cuando haya que elegir entre:

A) Agregar un nuevo sistema.
B) Conectar dos sistemas existentes.

Preferir: B.

---

## 46. META FINAL DEL PROYECTO

Crear un videojuego donde el jugador pueda mirar hacia atrás después de muchas horas y pensar:

«"Al principio no entendía nada de este mundo."»

Y posteriormente:

«"Ahora entiendo cómo funciona."»

Y finalmente:

«"Ahora puedo cambiarlo."»

La progresión más importante no será únicamente: "soy más poderoso".

Será: "comprendo más".

Y esa comprensión permitirá: explorar más → crear más → construir más → descubrir más.

---

## 47. PRIMERA TAREA DE LA IA

No programes inmediatamente el juego completo.

Primero:

1. Analiza esta visión.
2. Detecta contradicciones.
3. Identifica riesgos de alcance.
4. Propón una arquitectura mínima.
5. Define el vertical slice.
6. Define las entidades y datos mínimos.
7. Diseña el primer mapa.
8. Diseña el primer personaje.
9. Diseña el primer conjunto de recursos.
10. Diseña el primer bucle jugable.
11. Implementa únicamente ese núcleo.
12. Prueba.
13. Corrige.
14. Recién entonces amplía.

No agregues sistemas porque "podrían ser útiles".

Cada sistema nuevo debe justificar su existencia.

---

## 48. CRITERIO DE ÉXITO

El proyecto será exitoso si el jugador puede:

explorar → descubrir → experimentar → comprender → crear → mejorar → volver a explorar

y quiere hacerlo nuevamente.

Ese es el núcleo. Todo lo demás está subordinado a él.
