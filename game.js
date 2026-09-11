// ============================================================
// WORLD GAME 2D v2.0 - Open World Sandbox RPG
// Enhanced: Enemies, Building, Save/Load, Knowledge, Biomes
// ============================================================

const CONFIG = {
  width: 1280,
  height: 720,
  tileSize: 64,
  worldWidth: 100,
  worldHeight: 100
};

const COLORS = {
  skin: [0xf4c28f, 0xd4a574, 0xc68642, 0x8d5524, 0x6b3a1f, 0x3d2314],
  hair: [0x2c1810, 0x4a3728, 0x8b6914, 0xd4a017, 0xc0392b, 0x8e44ad, 0x2980b9, 0x27ae60],
  clothes: [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x1abc9c, 0xe67e22, 0x34495e],
  eyes: [0x2c3e50, 0x27ae60, 0x2980b9, 0x8e44ad, 0xd35400]
};

const ITEMS = {
  madera: { name: 'Madera', type: 'material', icon: '🪵', stack: 99 },
  piedra: { name: 'Piedra', type: 'material', icon: '🪨', stack: 99 },
  fibra: { name: 'Fibra', type: 'material', icon: '🌿', stack: 99 },
  hierba_roja: { name: 'Hierba roja', type: 'material', icon: '🌺', stack: 99 },
  arcilla: { name: 'Arcilla', type: 'material', icon: '🧱', stack: 99 },
  agua: { name: 'Agua', type: 'material', icon: '💧', stack: 99 },
  comida: { name: 'Comida', type: 'consumible', icon: '🍞', stack: 20, heal: 20 },
  carne: { name: 'Carne', type: 'consumible', icon: '🥩', stack: 20, heal: 30 },
  cuero: { name: 'Cuero', type: 'material', icon: '🟫', stack: 99 },
  hacha: { name: 'Hacha', type: 'herramienta', icon: '🪓', stack: 1 },
  espada: { name: 'Espada', type: 'arma', icon: '⚔️', stack: 1, damage: 15 },
  antorcha: { name: 'Antorcha', type: 'herramienta', icon: '🔥', stack: 5 },
  vendaje: { name: 'Vendaje', type: 'consumible', icon: '🩹', stack: 10, heal: 40 },
  cuchillo: { name: 'Cuchillo', type: 'arma', icon: '🔪', stack: 1, damage: 8 },
  pocion: { name: 'Poción', type: 'consumible', icon: '🧪', stack: 5, heal: 60 },
  mineral_hierro: { name: 'Hierro', type: 'material', icon: '⛏️', stack: 99 },
  cristal: { name: 'Cristal', type: 'material', icon: '💎', stack: 99 },
  pesca: { name: 'Pescado', type: 'consumible', icon: '🐟', stack: 20, heal: 25 },
  arena: { name: 'Arena', type: 'material', icon: '🏖️', stack: 99 },
  hongo: { name: 'Hongo', type: 'consumible', icon: '🍄', stack: 20, heal: 15 },
  miel: { name: 'Miel', type: 'consumible', icon: '🍯', stack: 10, heal: 35 },
  refugio: { name: 'Refugio', type: 'estructura', icon: '🏕️', stack: 1 },
  fogata: { name: 'Fogata', type: 'estructura', icon: '🔥', stack: 1 },
  cofre: { name: 'Cofre', type: 'estructura', icon: '📦', stack: 1 },
  banco_trabajo: { name: 'Banco de trabajo', type: 'estructura', icon: '🔨', stack: 1 },
  muro_piedra: { name: 'Muro de piedra', type: 'estructura', icon: '🧱', stack: 10 }
};

const RECIPES = [
  { id: 'hacha', name: 'Hacha', ingredients: { madera: 2, piedra: 1 }, result: 'hacha', xp: 10 },
  { id: 'espada', name: 'Espada', ingredients: { madera: 1, piedra: 3 }, result: 'espada', xp: 20 },
  { id: 'cuchillo', name: 'Cuchillo', ingredients: { madera: 1, piedra: 2 }, result: 'cuchillo', xp: 15 },
  { id: 'antorcha', name: 'Antorcha', ingredients: { madera: 1, fibra: 1 }, result: 'antorcha', xp: 5 },
  { id: 'vendaje', name: 'Vendaje', ingredients: { fibra: 2, hierba_roja: 1 }, result: 'vendaje', xp: 12 },
  { id: 'comida', name: 'Comida cocinada', ingredients: { hierba_roja: 2, agua: 1 }, result: 'comida', xp: 5 },
  { id: 'pocion', name: 'Poción', ingredients: { agua: 1, hongo: 2, miel: 1 }, result: 'pocion', xp: 25 },
  { id: 'refugio', name: 'Refugio', ingredients: { madera: 5, fibra: 3 }, result: 'refugio', xp: 30 },
  { id: 'fogata', name: 'Fogata', ingredients: { madera: 3, piedra: 2 }, result: 'fogata', xp: 15 },
  { id: 'cofre', name: 'Cofre', ingredients: { madera: 4, piedra: 2 }, result: 'cofre', xp: 20 },
  { id: 'banco_trabajo', name: 'Banco de trabajo', ingredients: { madera: 6, piedra: 3, mineral_hierro: 1 }, result: 'banco_trabajo', xp: 40 },
  { id: 'muro_piedra', name: 'Muro de piedra', ingredients: { piedra: 4, arcilla: 1 }, result: 'muro_piedra', xp: 25 }
];

const ENEMIES = [
  { name: 'Lobo', hp: 25, damage: 5, speed: 1.5, xp: 15, color: 0x5d4e37, loot: [{ id: 'carne', chance: 0.8 }, { id: 'cuero', chance: 0.5 }] },
  { name: 'Goblin', hp: 15, damage: 3, speed: 2.0, xp: 10, color: 0x4a7c4e, loot: [{ id: 'hierba_roja', chance: 0.6 }] },
  { name: 'Oso', hp: 50, damage: 12, speed: 1.0, xp: 30, color: 0x6b4423, loot: [{ id: 'carne', chance: 1.0 }, { id: 'cuero', chance: 0.8 }] },
  { name: 'Esqueleto', hp: 20, damage: 7, speed: 1.8, xp: 20, color: 0xe8e8d0, loot: [{ id: 'piedra', chance: 0.7 }] },
  { name: 'Araña gigante', hp: 18, damage: 4, speed: 2.5, xp: 12, color: 0x2d2d2d, loot: [{ id: 'fibra', chance: 0.9 }] },
  { name: 'Jabato', hp: 12, damage: 3, speed: 1.2, xp: 8, color: 0x8b6914, loot: [{ id: 'carne', chance: 0.7 }] },
  { name: 'Dragón menor', hp: 80, damage: 20, speed: 0.8, xp: 60, color: 0xc0392b, loot: [{ id: 'cristal', chance: 0.6 }, { id: 'cuero', chance: 1.0 }] }
];

const BIOMES = [
  { name: 'Bosque', color: 0x2d5a27, resources: ['madera', 'fibra', 'hierba_roja', 'hongo', 'miel'] },
  { name: 'Pradera', color: 0x7cba3d, resources: ['fibra', 'hierba_roja', 'comida', 'miel'] },
  { name: 'Montaña', color: 0x8b8b8b, resources: ['piedra', 'arcilla', 'mineral_hierro', 'cristal'] },
  { name: 'Río', color: 0x4a90d9, resources: ['agua', 'arcilla', 'pesca'] },
  { name: 'Desierto', color: 0xd4a017, resources: ['arena', 'piedra', 'cristal'] },
  { name: 'Pantano', color: 0x4a6741, resources: ['agua', 'hongo', 'fibra', 'arcilla'] },
  { name: 'Costa', color: 0x2980b9, resources: ['arena', 'agua', 'pesca', 'piedra'] },
  { name: 'Volcán', color: 0x8b0000, resources: ['piedra', 'mineral_hierro', 'cristal'] }
];

const QUESTS = [
  { id: 'recolectar_madera', name: 'Recolectar 5 maderas', target: 'madera', qty: 5, reward: { xp: 20 } },
  { id: 'matar_lobo', name: 'Matar 3 lobos', target: 'Lobo', qty: 3, reward: { xp: 50 } },
  { id: 'craftear_hacha', name: 'Craftear un hacha', target: 'hacha', qty: 1, reward: { xp: 30 } },
  { id: 'construir_refugio', name: 'Construir un refugio', target: 'refugio', qty: 1, reward: { xp: 50 } },
  { id: 'matar_oso', name: 'Matar un oso', target: 'Oso', qty: 1, reward: { xp: 40 } },
  { id: 'descubrir_biomas', name: 'Descubrir 4 biomas', target: 'biomes', qty: 4, reward: { xp: 60 } },
  { id: 'craftear_pocion', name: 'Craftear una poción', target: 'pocion', qty: 1, reward: { xp: 35 } }
];

const ACHIEVEMENTS = [
  { id: 'first_step', name: 'Primer paso', desc: 'Da tu primer paso', icon: '👣' },
  { id: 'collector', name: 'Recolector', desc: 'Recolecta 10 items', icon: '🎒' },
  { id: 'warrior', name: 'Guerrero', desc: 'Mata 5 enemigos', icon: '⚔️' },
  { id: 'builder', name: 'Constructor', desc: 'Construye un refugio', icon: '🏗️' },
  { id: 'survivor', name: 'Superviviente', desc: 'Sobrevive 5 días', icon: '🌅' },
  { id: 'master_crafter', name: 'Maestro artesano', desc: 'Craftea 10 items', icon: '🔨' },
  { id: 'explorer', name: 'Explorador', desc: 'Descubri 5 biomas', icon: '🧭' },
  { id: 'dragon_slayer', name: 'Matadragones', desc: 'Mata un dragón menor', icon: '🐉' },
  { id: 'scholar', name: 'Erudito', desc: 'Descubri 15 conocimientos', icon: '📚' }
];

// ============================================================
// BIBLIOTECA DE CONOCIMIENTO
// ============================================================

const KNOWLEDGE = [
  { id: 'k1', name: 'Caza básica', desc: 'Los lobos suelen aparecer en bosques. Atacar con espada es más efectivo.', category: 'supervivencia', icon: '🐺', unlock: { kills: 3 } },
  { id: 'k2', name: 'Recolección eficiente', desc: 'Las montañas tienen más piedra y minerales. Llevá hacha para madera.', category: 'supervivencia', icon: '⛏️', unlock: { resources: 10 } },
  { id: 'k3', name: 'Construcción avanzada', desc: 'El banco de trabajo permite recetas complejas. Construí uno cerca de tu refugio.', category: 'construccion', icon: '🏗️', unlock: { structures: 2 } },
  { id: 'k4', name: 'Cocina medicinal', desc: 'Los hongos con agua y miel crean poción. Curan más que la comida común.', category: 'supervivencia', icon: '🧪', unlock: { crafts: 5 } },
  { id: 'k5', name: 'Biomas del mundo', desc: 'Cada bioma tiene recursos únicos. Explorá para encontrar materiales raros.', category: 'exploracion', icon: '🌍', unlock: { biomes: 4 } },
  { id: 'k6', name: 'Combate táctico', desc: 'Los osos son lentos pero fuertes. Esquivá y atacá por la espalda.', category: 'combate', icon: '⚔️', unlock: { kills: 5 } },
  { id: 'k7', name: 'Almacenamiento', desc: 'Los cofres guardan items extra. Construí uno para no perder recursos.', category: 'construccion', icon: '📦', unlock: { structures: 1 } },
  { id: 'k8', name: 'Pesca', desc: 'En ríos y costas podés encontrar pescado. Cocinalo para más alimento.', category: 'supervivencia', icon: '🐟', unlock: { resources: 15 } },
  { id: 'k9', name: 'Cristales místicos', desc: 'Los cristales se encuentran en montañas y volcanes. Sirven para recetas avanzadas.', category: 'exploracion', icon: '💎', unlock: { biomes: 5 } },
  { id: 'k10', name: 'El dragón', desc: 'Cuidado con el volcán. Los dragones menores son peligrosos pero sueltan botín valioso.', category: 'combate', icon: '🐉', unlock: { kills: 10 } },
  { id: 'k11', name: 'Fogata reconfortante', desc: 'La fogata te da luz en la noche y cocina carne automáticamente.', category: 'construccion', icon: '🔥', unlock: { structures: 2 } },
  { id: 'k12', name: 'Defensas', desc: 'Los muros de piedra protegen tu campamento. Rodeá tu refugio.', category: 'construccion', icon: '🧱', unlock: { structures: 3 } },
  { id: 'k13', name: 'Ecosistema', desc: 'Los biomas se conectan. Donde hay agua suele haber vida.', category: 'exploracion', icon: '🌿', unlock: { biomes: 3 } },
  { id: 'k14', name: 'Supervivencia nocturna', desc: 'De noche los enemigos son más fuertes. Hacé una fogata o refugiate.', category: 'supervivencia', icon: '🌙', unlock: { day: 3 } },
  { id: 'k15', name: 'Maestro constructor', desc: 'Con banco de trabajo, cofre, refugio y muros, tu base será inexpugnable.', category: 'construccion', icon: '🏰', unlock: { structures: 5 } }
];

// ============================================================
// ESTADO DEL JUEGO
// ============================================================

let gameState = {
  player: null,
  inventory: [],
  stats: { level: 1, xp: 0, xpNext: 100, hp: 100, maxHp: 100, str: 5, int: 5, dex: 5 },
  discovered: { resources: [], enemies: [], biomes: [], knowledge: [] },
  day: 1,
  kills: 0,
  crafts: 0,
  structuresBuilt: 0,
  quests: [],
  achievements: [],
  enemies: [],
  resources: [],
  structures: [],
  gameTime: 0,
  nightMode: false
};

// ============================================================
// SISTEMA DE GUARDADO MEJORADO
// ============================================================

function saveGame() {
  try {
    const saveData = {
      player: gameState.player,
      inventory: gameState.inventory,
      stats: gameState.stats,
      discovered: gameState.discovered,
      day: gameState.day,
      kills: gameState.kills,
      crafts: gameState.crafts,
      structuresBuilt: gameState.structuresBuilt,
      quests: gameState.quests,
      achievements: gameState.achievements,
      gameTime: gameState.gameTime,
      nightMode: gameState.nightMode,
      version: '2.0',
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('worldGameSave', JSON.stringify(saveData));
    console.log('Partida guardada:', new Date().toLocaleTimeString());
  } catch(e) { console.error('Error guardando:', e); }
}

function loadGame() {
  try {
    const saved = localStorage.getItem('worldGameSave');
    if (saved) {
      const data = JSON.parse(saved);
      gameState.player = data.player;
      gameState.inventory = data.inventory || [];
      gameState.stats = { ...gameState.stats, ...data.stats };
      gameState.discovered = { ...gameState.discovered, ...data.discovered };
      gameState.day = data.day || 1;
      gameState.kills = data.kills || 0;
      gameState.crafts = data.crafts || 0;
      gameState.structuresBuilt = data.structuresBuilt || 0;
      gameState.quests = data.quests || [];
      gameState.achievements = data.achievements || [];
      gameState.gameTime = data.gameTime || 0;
      gameState.nightMode = data.nightMode || false;
      console.log('Partida cargada (v' + (data.version || '1.0') + ')');
      return true;
    }
  } catch(e) { console.error('Error cargando:', e); }
  return false;
}

function deleteSave() {
  localStorage.removeItem('worldGameSave');
  console.log('Partida eliminada');
}

// ============================================================
// ESCENA: MENÚ PRINCIPAL
// ============================================================

class MenuScene extends Phaser.Scene {
  constructor() { super({ key: 'MenuScene' }); }
  
  create() {
    this.add.text(CONFIG.width/2, 150, '🌍 WORLD GAME 2D', { fontSize: '48px', color: '#6366f1' }).setOrigin(0.5);
    this.add.text(CONFIG.width/2, 220, 'Open World Sandbox RPG', { fontSize: '20px', color: '#aaa' }).setOrigin(0.5);
    
    // Botón Jugar
    const btnJugar = this.add.rectangle(CONFIG.width/2, 350, 200, 60, 0x6366f1).setInteractive();
    btnJugar.on('pointerdown', () => this.scene.start('CharacterCreation'));
    this.add.text(CONFIG.width/2, 350, 'JUGAR', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    
    // Botón Continuar (si hay partida)
    if (localStorage.getItem('worldGameSave')) {
      const btnContinuar = this.add.rectangle(CONFIG.width/2, 430, 200, 60, 0x2ecc71).setInteractive();
      btnContinuar.on('pointerdown', () => { loadGame(); this.scene.start('WorldScene'); });
      this.add.text(CONFIG.width/2, 430, 'CONTINUAR', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
      
      // Botón nueva partida
      const btnNueva = this.add.rectangle(CONFIG.width/2, 500, 200, 50, 0xe67e22).setInteractive();
      btnNueva.on('pointerdown', () => { deleteSave(); this.resetGameState(); this.scene.start('CharacterCreation'); });
      this.add.text(CONFIG.width/2, 500, 'NUEVA PARTIDA', { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    }
    
    // Botón Créditos
    this.add.text(CONFIG.width/2, 580, 'Hecho con ❤️ en Argentina', { fontSize: '14px', color: '#666' }).setOrigin(0.5);
    this.add.text(CONFIG.width/2, 600, 'v2.0 — Enhanced Edition', { fontSize: '12px', color: '#555' }).setOrigin(0.5);
  }
  
  resetGameState() {
    gameState = {
      player: null,
      inventory: [],
      stats: { level: 1, xp: 0, xpNext: 100, hp: 100, maxHp: 100, str: 5, int: 5, dex: 5 },
      discovered: { resources: [], enemies: [], biomes: [], knowledge: [] },
      day: 1, kills: 0, crafts: 0, structuresBuilt: 0,
      quests: [], achievements: [], enemies: [], resources: [], structures: [],
      gameTime: 0, nightMode: false
    };
  }
}

// ============================================================
// ESCENA: CREACIÓN DE PERSONAJE
// ============================================================

class CharacterCreation extends Phaser.Scene {
  constructor() { super({ key: 'CharacterCreation' }); }
  
  create() {
    this.add.text(CONFIG.width/2, 50, 'Crear Personaje', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    
    // Preview
    this.preview = this.add.rectangle(CONFIG.width/2, 200, 100, 100, 0x3498db);
    
    // Nombre
    this.add.text(CONFIG.width/2 - 200, 350, 'Nombre:', { fontSize: '18px', color: '#fff' });
    this.nameText = this.add.text(CONFIG.width/2 - 50, 350, 'Héroe', { fontSize: '18px', color: '#4ade80' });
    
    // Selector de color de piel
    this.add.text(CONFIG.width/2 - 200, 400, 'Piel:', { fontSize: '14px', color: '#fff' });
    this.skinIndex = 0;
    COLORS.skin.forEach((c, i) => {
      const btn = this.add.rectangle(CONFIG.width/2 - 50 + i * 40, 400, 30, 30, c).setInteractive();
      btn.on('pointerdown', () => { this.skinIndex = i; this.updatePreview(); });
    });
    
    // Selector de color de pelo
    this.add.text(CONFIG.width/2 - 200, 450, 'Pelo:', { fontSize: '14px', color: '#fff' });
    this.hairIndex = 0;
    COLORS.hair.forEach((c, i) => {
      const btn = this.add.rectangle(CONFIG.width/2 - 50 + i * 40, 450, 30, 30, c).setInteractive();
      btn.on('pointerdown', () => { this.hairIndex = i; this.updatePreview(); });
    });
    
    // Botón crear
    const btn = this.add.rectangle(CONFIG.width/2, 550, 200, 50, 0x6366f1).setInteractive();
    btn.on('pointerdown', () => this.createCharacter());
    this.add.text(CONFIG.width/2, 550, 'CREAR', { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
  }
  
  updatePreview() {
    this.preview.setFillStyle(COLORS.skin[this.skinIndex]);
  }
  
  createCharacter() {
    gameState.player = {
      name: this.nameText.text,
      skinColor: COLORS.skin[this.skinIndex],
      hairColor: COLORS.hair[this.hairIndex],
      x: CONFIG.worldWidth * CONFIG.tileSize / 2,
      y: CONFIG.worldHeight * CONFIG.tileSize / 2
    };
    gameState.inventory = [{ id: 'madera', qty: 5 }];
    this.scene.start('WorldScene');
  }
}

// ============================================================
// ESCENA: MUNDO PRINCIPAL (COMBATE + CONSTRUCCIÓN + BIOMAS)
// ============================================================

class WorldScene extends Phaser.Scene {
  constructor() { super({ key: 'WorldScene' }); }
  
  create() {
    this.structures = [];
    this.createWorld();
    
    // Jugador
    this.player = this.add.rectangle(gameState.player.x, gameState.player.y, 48, 48, gameState.player.skinColor);
    this.player.setDepth(10);
    
    // Cámara
    this.cameras.main.setBounds(0, 0, CONFIG.worldWidth * CONFIG.tileSize, CONFIG.worldHeight * CONFIG.tileSize);
    this.cameras.main.startFollow(this.player);
    
    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.space = this.input.keyboard.addKey('SPACE');
    this.eKey = this.input.keyboard.addKey('E');
    
    // UI
    this.createUI();
    
    // Spawn entidades
    this.spawnEntities();
    
    // Colocar estructuras guardadas
    this.loadStructures();
    
    // Controles táctiles
    this.createTouchControls();
    
    // Auto-save cada 30 segundos
    this.time.addEvent({ delay: 30000, callback: () => saveGame(), loop: true });
    
    // Ciclo día/noche
    this.time.addEvent({ delay: 60000, callback: () => this.advanceDay(), loop: true });
    
    // Misiones iniciales
    if (gameState.quests.length === 0) {
      gameState.quests = QUESTS.map(q => ({ ...q, progress: 0 }));
    }
    
    // Verificar conocimiento inicial
    this.checkKnowledge();
  }
  
  createWorld() {
    this.world = [];
    for (let y = 0; y < CONFIG.worldHeight; y++) {
      this.world[y] = [];
      for (let x = 0; x < CONFIG.worldWidth; x++) {
        const biome = this.getBiome(x, y);
        const tile = this.add.rectangle(x * CONFIG.tileSize, y * CONFIG.tileSize, CONFIG.tileSize, CONFIG.tileSize, biome.color);
        tile.setStrokeStyle(1, Phaser.Display.Color.IntegerToColor(biome.color).darken(20).color);
        this.world[y][x] = { biome, tile };
      }
    }
  }
  
  getBiome(x, y) {
    const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) + Math.sin(x * 0.05 + y * 0.05);
    const noise2 = Math.cos(x * 0.08) * Math.sin(y * 0.12);
    const combined = noise + noise2 * 0.5;
    
    if (combined > 1.0) return BIOMES[4];
    if (combined > 0.5) return BIOMES[0];
    if (combined > 0.2) return BIOMES[1];
    if (combined > -0.2) return BIOMES[2];
    if (combined > -0.5) return BIOMES[3];
    if (combined > -0.8) return BIOMES[5];
    if (combined > -1.0) return BIOMES[6];
    return BIOMES[7];
  }
  
  createUI() {
    this.add.rectangle(10, 10, 200, 20, 0x333333).setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    this.hpBar = this.add.rectangle(10, 10, 200, 20, 0xe74c3c).setOrigin(0, 0).setScrollFactor(0).setDepth(101);
    this.hpText = this.add.text(110, 20, '100/100', { fontSize: '12px', color: '#fff' }).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    
    this.add.rectangle(10, 35, 200, 10, 0x333333).setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    this.xpBar = this.add.rectangle(10, 35, 0, 10, 0xf1c40f).setOrigin(0, 0).setScrollFactor(0).setDepth(101);
    this.xpText = this.add.text(110, 40, 'Nivel 1 - 0/100 XP', { fontSize: '10px', color: '#fff' }).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    
    this.add.text(10, 55, gameState.player.name, { fontSize: '14px', color: '#4ade80' }).setScrollFactor(0).setDepth(100);
    this.dayText = this.add.text(CONFIG.width - 10, 10, 'Día ' + gameState.day, { fontSize: '14px', color: '#fff' }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
    this.timeText = this.add.text(CONFIG.width - 10, 30, '☀️ Día', { fontSize: '12px', color: '#f1c40f' }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
    this.statsText = this.add.text(CONFIG.width - 10, 50, 'STR:5 INT:5 DEX:5', { fontSize: '10px', color: '#aaa' }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
  }
  
  spawnEntities() {
    // Enemigos con IA (7 tipos)
    for (let i = 0; i < 25; i++) {
      const type = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
      const x = Math.random() * CONFIG.worldWidth * CONFIG.tileSize;
      const y = Math.random() * CONFIG.worldHeight * CONFIG.tileSize;
      const enemy = this.add.rectangle(x, y, 40, 40, type.color);
      enemy.setDepth(5);
      enemy.hp = type.hp;
      enemy.maxHp = type.hp;
      enemy.damage = type.damage;
      enemy.speed = type.speed;
      enemy.xp = type.xp;
      enemy.name = type.name;
      enemy.loot = type.loot;
      enemy.aggroRange = 200;
      enemy.attackCooldown = 0;
      gameState.enemies.push(enemy);
    }
    
    // Recursos
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * CONFIG.worldWidth * CONFIG.tileSize;
      const y = Math.random() * CONFIG.worldHeight * CONFIG.tileSize;
      const biome = this.getBiome(Math.floor(x / CONFIG.tileSize), Math.floor(y / CONFIG.tileSize));
      const resource = biome.resources[Math.floor(Math.random() * biome.resources.length)];
      const res = this.add.rectangle(x, y, 30, 30, 0x8b4513);
      res.setDepth(4);
      res.resource = resource;
      gameState.resources.push(res);
    }
  }
  
  loadStructures() {
    if (gameState.structures) {
      gameState.structures.forEach(s => {
        const struct = this.add.rectangle(s.x, s.y, 60, 60, s.color);
        struct.setDepth(6);
        struct.structureType = s.type;
        this.structures.push(struct);
      });
    }
  }
  
  createTouchControls() {
    const screenW = CONFIG.width, screenH = CONFIG.height;
    this.joyX = 100, this.joyY = screenH - 100, this.joyRadius = 60;
    this.joyBase = this.add.circle(this.joyX, this.joyY, this.joyRadius, 0x333333, 0.5).setScrollFactor(0).setDepth(200);
    this.joyKnob = this.add.circle(this.joyX, this.joyY, 25, 0x6366f1, 0.8).setScrollFactor(0).setDepth(201);
    this.joyActive = false;
    this.joyTouchId = null;
    
    this.buttons = [];
    const btnRadius = 30, btnY = screenH - 100;
    const actions = [
      { key: 'attack', label: '⚔️', x: screenW - 200, color: 0xe74c3c },
      { key: 'inventory', label: '🎒', x: screenW - 120, color: 0x3498db },
      { key: 'craft', label: '🔨', x: screenW - 40, color: 0xf39c12 },
      { key: 'build', label: '🏗️', x: screenW - 280, color: 0x2ecc71 },
      { key: 'knowledge', label: '📚', x: screenW - 360, color: 0x8b5cf6 }
    ];
    actions.forEach(a => {
      const btn = this.add.circle(a.x, btnY, btnRadius, a.color, 0.7).setScrollFactor(0).setDepth(200).setInteractive();
      const txt = this.add.text(a.x, btnY, a.label, { fontSize: '20px' }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
      this.buttons.push({ btn, txt, key: a.key });
    });
    
    this.input.on('pointerdown', (pointer) => {
      for (const b of this.buttons) {
        if (Phaser.Math.Distance.Between(pointer.x, pointer.y, b.btn.x, b.btn.y) < btnRadius) {
          this.handleTouchAction(b.key); return;
        }
      }
      if (pointer.x < screenW / 2) {
        this.joyActive = true; this.joyTouchId = pointer.id;
        this.joyX = pointer.x; this.joyY = pointer.y;
        this.joyBase.setPosition(this.joyX, this.joyY); this.joyKnob.setPosition(this.joyX, this.joyY);
      }
    });
    
    this.input.on('pointermove', (pointer) => {
      if (!this.joyActive || pointer.id !== this.joyTouchId) return;
      const dist = Phaser.Math.Distance.Between(this.joyX, this.joyY, pointer.x, pointer.y);
      const angle = Math.atan2(pointer.y - this.joyY, pointer.x - this.joyX);
      if (dist <= this.joyRadius) this.joyKnob.setPosition(pointer.x, pointer.y);
      else this.joyKnob.setPosition(this.joyX + Math.cos(angle) * this.joyRadius, this.joyY + Math.sin(angle) * this.joyRadius);
      const speed = 4;
      this.player.x += (this.joyKnob.x - this.joyX) / this.joyRadius * speed;
      this.player.y += (this.joyKnob.y - this.joyY) / this.joyRadius * speed;
    });
    
    this.input.on('pointerup', (pointer) => {
      if (pointer.id === this.joyTouchId) { this.joyActive = false; this.joyTouchId = null; this.joyKnob.setPosition(this.joyX, this.joyY); }
    });
  }
  
  handleTouchAction(key) {
    if (key === 'attack') this.attack();
    else if (key === 'inventory') { this.scene.pause(); this.scene.launch('InventoryScene'); }
    else if (key === 'craft') { this.scene.pause(); this.scene.launch('CraftingScene'); }
    else if (key === 'build') { this.scene.pause(); this.scene.launch('BuildScene'); }
    else if (key === 'knowledge') { this.scene.pause(); this.scene.launch('KnowledgeScene'); }
  }
  
  update() {
    const speed = 4;
    if (this.cursors.left.isDown || this.wasd.A.isDown) this.player.x -= speed;
    if (this.cursors.right.isDown || this.wasd.D.isDown) this.player.x += speed;
    if (this.cursors.up.isDown || this.wasd.W.isDown) this.player.y -= speed;
    if (this.cursors.down.isDown || this.wasd.S.isDown) this.player.y -= speed;
    
    this.player.x = Phaser.Math.Clamp(this.player.x, 24, CONFIG.worldWidth * CONFIG.tileSize - 24);
    this.player.y = Phaser.Math.Clamp(this.player.y, 24, CONFIG.worldHeight * CONFIG.tileSize - 24);
    
    if (Phaser.Input.Keyboard.JustDown(this.space)) this.attack();
    if (Phaser.Input.Keyboard.JustDown(this.eKey)) this.interact();
    
    this.collectResources();
    this.updateEnemyAI();
    this.updateUI();
    this.checkBiomeDiscovery();
    this.checkKnowledge();
  }
  
  attack() {
    const attackRange = 60;
    if (!gameState.enemies) return;
    gameState.enemies.forEach(enemy => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist < attackRange) {
        const damage = gameState.stats.str + 5;
        enemy.hp -= damage;
        this.tweens.add({ targets: enemy, alpha: 0.3, duration: 100, yoyo: true });
        if (enemy.hp <= 0) {
          if (enemy.loot) {
            enemy.loot.forEach(l => {
              if (Math.random() < l.chance) {
                this.addToInventory(l.id, 1);
              }
            });
          }
          if (!gameState.discovered.enemies.includes(enemy.name)) gameState.discovered.enemies.push(enemy.name);
          gameState.stats.xp += enemy.xp;
          gameState.kills++;
          enemy.destroy();
          gameState.enemies = gameState.enemies.filter(e => e !== enemy);
          this.checkLevelUp();
          this.updateQuest('kills', enemy.name);
          this.checkAchievement('warrior');
          this.checkAchievement('dragon_slayer');
        }
      }
    });
  }
  
  interact() {
    const structItems = ['refugio', 'fogata', 'cofre', 'banco_trabajo', 'muro_piedra'];
    for (const s of structItems) {
      const item = gameState.inventory.find(i => i.id === s);
      if (item) {
        this.placeStructure(s);
        item.qty--;
        if (item.qty <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== s);
        break;
      }
    }
  }
  
  placeStructure(type) {
    const structData = {
      refugio: { color: 0x8b4513, label: '🏕️' },
      fogata: { color: 0xff4500, label: '🔥' },
      cofre: { color: 0xdaa520, label: '📦' },
      banco_trabajo: { color: 0x654321, label: '🔨' },
      muro_piedra: { color: 0x696969, label: '🧱' }
    };
    const data = structData[type];
    const struct = this.add.rectangle(this.player.x, this.player.y, 60, 60, data.color);
    struct.setDepth(6);
    struct.structureType = type;
    this.structures.push(struct);
    gameState.structures.push({ x: this.player.x, y: this.player.y, type: type, color: data.color });
    gameState.structuresBuilt++;
    gameState.stats.xp += 20;
    this.checkLevelUp();
    this.updateQuest('structures', type);
    this.checkAchievement('builder');
    this.checkAchievement('master_crafter');
  }
  
  updateEnemyAI() {
    if (!gameState.enemies) return;
    gameState.enemies.forEach(enemy => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      
      if (dist < enemy.aggroRange) {
        const angle = Math.atan2(this.player.y - enemy.y, this.player.x - enemy.x);
        enemy.x += Math.cos(angle) * enemy.speed;
        enemy.y += Math.sin(angle) * enemy.speed;
        
        if (dist < 40 && enemy.attackCooldown <= 0) {
          const damage = enemy.damage;
          gameState.stats.hp -= damage;
          enemy.attackCooldown = 60;
          this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true });
          
          if (gameState.stats.hp <= 0) {
            this.gameOver();
          }
        }
      } else {
        if (Math.random() < 0.02) {
          enemy.x += (Math.random() - 0.5) * 2;
          enemy.y += (Math.random() - 0.5) * 2;
        }
      }
      
      if (enemy.attackCooldown > 0) enemy.attackCooldown--;
    });
  }
  
  gameOver() {
    gameState.stats.hp = gameState.stats.maxHp;
    this.player.x = CONFIG.worldWidth * CONFIG.tileSize / 2;
    this.player.y = CONFIG.worldHeight * CONFIG.tileSize / 2;
    this.add.text(CONFIG.width/2, CONFIG.height/2, '¡Has muerto! Reapareciendo...', { fontSize: '24px', color: '#e74c3c' }).setOrigin(0.5).setScrollFactor(0).setDepth(300);
  }
  
  collectResources() {
    if (!gameState.resources) return;
    gameState.resources.forEach(res => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, res.x, res.y);
      if (dist < 40) {
        if (!gameState.discovered.resources.includes(res.resource)) gameState.discovered.resources.push(res.resource);
        this.addToInventory(res.resource, 1);
        res.destroy();
        gameState.resources = gameState.resources.filter(r => r !== res);
        gameState.stats.xp += 2;
        this.checkLevelUp();
        this.updateQuest('resources', res.resource);
        this.checkAchievement('collector');
      }
    });
  }
  
  addToInventory(itemId, qty) {
    const existing = gameState.inventory.find(i => i.id === itemId);
    if (existing) existing.qty += qty; else gameState.inventory.push({ id: itemId, qty });
  }
  
  checkLevelUp() {
    while (gameState.stats.xp >= gameState.stats.xpNext) {
      gameState.stats.xp -= gameState.stats.xpNext; gameState.stats.level++;
      gameState.stats.xpNext = Math.floor(gameState.stats.xpNext * 1.5);
      gameState.stats.maxHp += 10; gameState.stats.hp = gameState.stats.maxHp;
      gameState.stats.str++; gameState.stats.int++; gameState.stats.dex++;
    }
  }
  
  updateQuest(type, target) {
    gameState.quests.forEach(quest => {
      if (quest.target === type || quest.target === target) {
        quest.progress++;
        if (quest.progress >= quest.qty) {
          gameState.stats.xp += quest.reward.xp;
          quest.completed = true;
        }
      }
    });
  }
  
  checkAchievement(id) {
    if (gameState.achievements.includes(id)) return;
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;
    
    let earned = false;
    if (id === 'collector' && gameState.inventory.length >= 10) earned = true;
    if (id === 'warrior' && gameState.kills >= 5) earned = true;
    if (id === 'builder' && gameState.structuresBuilt >= 1) earned = true;
    if (id === 'survivor' && gameState.day >= 5) earned = true;
    if (id === 'master_crafter' && gameState.crafts >= 10) earned = true;
    if (id === 'explorer' && gameState.discovered.biomes.length >= 5) earned = true;
    if (id === 'dragon_slayer' && gameState.kills >= 10) earned = true;
    if (id === 'scholar' && gameState.discovered.knowledge.length >= 15) earned = true;
    
    if (earned) {
      gameState.achievements.push(id);
      this.showNotification('🏆 Logro: ' + ach.name);
    }
  }
  
  checkBiomeDiscovery() {
    const currentBiome = this.getBiome(
      Math.floor(this.player.x / CONFIG.tileSize),
      Math.floor(this.player.y / CONFIG.tileSize)
    );
    if (!gameState.discovered.biomes.includes(currentBiome.name)) {
      gameState.discovered.biomes.push(currentBiome.name);
      this.showNotification('🧭 Nuevo bioma: ' + currentBiome.name);
      this.updateQuest('biomes', currentBiome.name);
      this.checkAchievement('explorer');
    }
  }
  
  checkKnowledge() {
    KNOWLEDGE.forEach(k => {
      if (gameState.discovered.knowledge.includes(k.id)) return;
      let unlocked = false;
      
      if (k.unlock.kills && gameState.kills >= k.unlock.kills) unlocked = true;
      if (k.unlock.resources && gameState.discovered.resources.length >= k.unlock.resources) unlocked = true;
      if (k.unlock.crafts && gameState.crafts >= k.unlock.crafts) unlocked = true;
      if (k.unlock.structures && gameState.structuresBuilt >= k.unlock.structures) unlocked = true;
      if (k.unlock.biomes && gameState.discovered.biomes.length >= k.unlock.biomes) unlocked = true;
      if (k.unlock.day && gameState.day >= k.unlock.day) unlocked = true;
      
      if (unlocked) {
        gameState.discovered.knowledge.push(k.id);
        this.showNotification('📚 Conocimiento: ' + k.name);
        this.checkAchievement('scholar');
      }
    });
  }
  
  showNotification(text) {
    const notif = this.add.text(CONFIG.width / 2, 100, text, { fontSize: '16px', color: '#f1c40f', backgroundColor: '#000000', padding: { x: 10, y: 5 } }).setOrigin(0.5).setScrollFactor(0).setDepth(500);
    this.tweens.add({ targets: notif, alpha: 0, y: 50, duration: 3000, onComplete: () => notif.destroy() });
  }
  
  advanceDay() {
    gameState.day++;
    gameState.nightMode = !gameState.nightMode;
    this.checkAchievement('survivor');
    this.showNotification(gameState.nightMode ? '🌙 Ha anochecido' : '☀️ Ha amanecido');
  }
  
  updateUI() {
    this.hpBar.width = 200 * (gameState.stats.hp / gameState.stats.maxHp);
    this.hpText.setText(gameState.stats.hp + '/' + gameState.stats.maxHp);
    this.xpBar.width = 200 * (gameState.stats.xp / gameState.stats.xpNext);
    this.xpText.setText('Nivel ' + gameState.stats.level + ' - ' + gameState.stats.xp + '/' + gameState.stats.xpNext + ' XP');
    this.dayText.setText('Día ' + gameState.day);
    this.timeText.setText(gameState.nightMode ? '🌙 Noche' : '☀️ Día');
    this.statsText.setText('STR:' + gameState.stats.str + ' INT:' + gameState.stats.int + ' DEX:' + gameState.stats.dex);
  }
}

// ============================================================
// ESCENA: INVENTARIO
// ============================================================

class InventoryScene extends Phaser.Scene {
  constructor() { super({ key: 'InventoryScene' }); }
  
  create() {
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, CONFIG.width, CONFIG.height, 0x000000, 0.8);
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, 600, 500, 0x1a1a2e).setStrokeStyle(2, 0x6366f1);
    this.add.text(CONFIG.width/2, 80, '🎒 INVENTARIO', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    
    const startX = CONFIG.width/2 - 250, startY = 130, cols = 6;
    gameState.inventory.forEach((item, i) => {
      const x = startX + (i % cols) * 80;
      const y = startY + Math.floor(i / cols) * 70;
      const itemData = ITEMS[item.id];
      if (!itemData) return;
      this.add.rectangle(x, y, 70, 60, 0x2d2d44).setStrokeStyle(1, 0x6366f1);
      this.add.text(x, y - 10, itemData.icon, { fontSize: '20px' }).setOrigin(0.5);
      this.add.text(x, y + 15, itemData.name + ' x' + item.qty, { fontSize: '9px', color: '#aaa' }).setOrigin(0.5);
    });
    
    this.add.text(CONFIG.width/2, 440, `Nivel: ${gameState.stats.level} | HP: ${gameState.stats.hp}/${gameState.stats.maxHp}`, { fontSize: '12px', color: '#4ade80' }).setOrigin(0.5);
    
    const closeBtn = this.add.rectangle(CONFIG.width/2, 480, 150, 40, 0xe74c3c).setInteractive();
    closeBtn.on('pointerdown', () => { this.scene.stop(); this.scene.resume('WorldScene'); });
    this.add.text(CONFIG.width/2, 480, 'Cerrar', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
  }
}

// ============================================================
// ESCENA: CRAFTING
// ============================================================

class CraftingScene extends Phaser.Scene {
  constructor() { super({ key: 'CraftingScene' }); }
  
  create() {
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, CONFIG.width, CONFIG.height, 0x000000, 0.8);
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, 700, 550, 0x1a1a2e).setStrokeStyle(2, 0x6366f1);
    this.add.text(CONFIG.width/2, 60, '🔨 CRAFTING', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    
    RECIPES.forEach((recipe, i) => {
      const x = 150 + (i % 4) * 160;
      const y = 150 + Math.floor(i / 4) * 100;
      const canCraft = this.canCraft(recipe);
      const bg = this.add.rectangle(x, y, 140, 80, canCraft ? 0x2d5a27 : 0x5a2d2d).setStrokeStyle(1, 0x6366f1).setInteractive();
      bg.on('pointerdown', () => this.craft(recipe));
      this.add.text(x, y - 20, recipe.name, { fontSize: '11px', color: '#fff' }).setOrigin(0.5);
      this.add.text(x, y + 5, Object.entries(recipe.ingredients).map(([k,v]) => v + ' ' + k).join(', '), { fontSize: '8px', color: '#aaa' }).setOrigin(0.5);
      this.add.text(x, y + 25, canCraft ? '✅ Disponible' : '❌ Faltan', { fontSize: '9px', color: canCraft ? '#4ade80' : '#f87171' }).setOrigin(0.5);
    });
    
    const closeBtn = this.add.rectangle(CONFIG.width/2, 520, 150, 40, 0xe74c3c).setInteractive();
    closeBtn.on('pointerdown', () => { this.scene.stop(); this.scene.resume('WorldScene'); });
    this.add.text(CONFIG.width/2, 520, 'Cerrar', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
  }
  
  canCraft(recipe) {
    return Object.entries(recipe.ingredients).every(([ing, qty]) => {
      const item = gameState.inventory.find(i => i.id === ing);
      return item && item.qty >= qty;
    });
  }
  
  craft(recipe) {
    if (!this.canCraft(recipe)) return;
    Object.entries(recipe.ingredients).forEach(([ing, qty]) => {
      const item = gameState.inventory.find(i => i.id === ing);
      if (item) { item.qty -= qty; if (item.qty <= 0) gameState.inventory = gameState.inventory.filter(i => i.id !== ing); }
    });
    this.addToInventory(recipe.result, 1);
    gameState.stats.xp += recipe.xp;
    gameState.crafts++;
    this.scene.restart();
  }
  
  addToInventory(itemId, qty) {
    const existing = gameState.inventory.find(i => i.id === itemId);
    if (existing) existing.qty += qty; else gameState.inventory.push({ id: itemId, qty });
  }
}

// ============================================================
// ESCENA: CONSTRUCCIÓN
// ============================================================

class BuildScene extends Phaser.Scene {
  constructor() { super({ key: 'BuildScene' }); }
  
  create() {
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, CONFIG.width, CONFIG.height, 0x000000, 0.8);
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, 700, 550, 0x1a1a2e).setStrokeStyle(2, 0x6366f1);
    this.add.text(CONFIG.width/2, 60, '🏗️ CONSTRUCCIÓN', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    
    const buildables = [
      { id: 'refugio', name: 'Refugio', icon: '🏕️', desc: 'Te protege de la noche' },
      { id: 'fogata', name: 'Fogata', icon: '🔥', desc: 'Luz y calor nocturno' },
      { id: 'cofre', name: 'Cofre', icon: '📦', desc: 'Almacena items' },
      { id: 'banco_trabajo', name: 'Banco de trabajo', icon: '🔨', desc: 'Desbloquea recetas avanzadas' },
      { id: 'muro_piedra', name: 'Muro de piedra', icon: '🧱', desc: 'Protección contra enemigos' }
    ];
    
    buildables.forEach((b, i) => {
      const x = CONFIG.width/2;
      const y = 130 + i * 80;
      const hasItem = gameState.inventory.find(i => i.id === b.id);
      const bg = this.add.rectangle(x, y, 500, 70, hasItem ? 0x2d5a27 : 0x5a2d2d).setStrokeStyle(1, 0x6366f1).setInteractive();
      bg.on('pointerdown', () => { if (hasItem) this.placeStructure(b.id); });
      this.add.text(x - 200, y, b.icon + ' ' + b.name, { fontSize: '16px', color: '#fff' }).setOrigin(0, 0.5);
      this.add.text(x - 200, y + 20, b.desc, { fontSize: '11px', color: '#aaa' }).setOrigin(0, 0.5);
      this.add.text(x + 150, y, hasItem ? '✅ Colocar con E' : '❌ No tenés', { fontSize: '12px', color: hasItem ? '#4ade80' : '#f87171' }).setOrigin(0, 0.5);
    });
    
    const closeBtn = this.add.rectangle(CONFIG.width/2, 520, 150, 40, 0xe74c3c).setInteractive();
    closeBtn.on('pointerdown', () => { this.scene.stop(); this.scene.resume('WorldScene'); });
    this.add.text(CONFIG.width/2, 520, 'Cerrar', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
  }
  
  placeStructure(type) {
    this.scene.stop();
    this.scene.resume('WorldScene');
  }
}

// ============================================================
// ESCENA: BIBLIOTECA DE CONOCIMIENTO
// ============================================================

class KnowledgeScene extends Phaser.Scene {
  constructor() { super({ key: 'KnowledgeScene' }); }
  
  create() {
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, CONFIG.width, CONFIG.height, 0x000000, 0.8);
    this.add.rectangle(CONFIG.width/2, CONFIG.height/2, 700, 550, 0x1a1a2e).setStrokeStyle(2, 0x8b5cf6);
    this.add.text(CONFIG.width/2, 60, '📚 BIBLIOTECA DE CONOCIMIENTO', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    
    const discovered = KNOWLEDGE.filter(k => gameState.discovered.knowledge.includes(k.id));
    const undiscovered = KNOWLEDGE.filter(k => !gameState.discovered.knowledge.includes(k.id));
    
    discovered.forEach((k, i) => {
      const x = 150 + (i % 3) * 200;
      const y = 130 + Math.floor(i / 3) * 100;
      this.add.rectangle(x, y, 180, 80, 0x2d2d44).setStrokeStyle(1, 0x8b5cf6);
      this.add.text(x, y - 25, k.icon + ' ' + k.name, { fontSize: '11px', color: '#f1c40f' }).setOrigin(0.5);
      this.add.text(x, y, k.desc, { fontSize: '9px', color: '#aaa', wordWrap: { width: 160 } }).setOrigin(0.5);
      this.add.text(x, y + 30, k.category, { fontSize: '8px', color: '#8b5cf6' }).setOrigin(0.5);
    });
    
    undiscovered.forEach((k, i) => {
      const x = 150 + (i % 3) * 200;
      const y = 350 + Math.floor(i / 3) * 60;
      this.add.rectangle(x, y, 180, 50, 0x1a1a1a).setStrokeStyle(1, 0x444);
      this.add.text(x, y, '??? (bloqueado)', { fontSize: '11px', color: '#666' }).setOrigin(0.5);
    });
    
    this.add.text(CONFIG.width/2, 500, `Descubiertos: ${discovered.length} / ${KNOWLEDGE.length}`, { fontSize: '14px', color: '#8b5cf6' }).setOrigin(0.5);
    
    const closeBtn = this.add.rectangle(CONFIG.width/2, 530, 150, 40, 0xe74c3c).setInteractive();
    closeBtn.on('pointerdown', () => { this.scene.stop(); this.scene.resume('WorldScene'); });
    this.add.text(CONFIG.width/2, 530, 'Cerrar', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
  }
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

const config = {
  type: Phaser.AUTO,
  width: CONFIG.width,
  height: CONFIG.height,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [MenuScene, CharacterCreation, WorldScene, InventoryScene, CraftingScene, BuildScene, KnowledgeScene]
};

const game = new Phaser.Game(config);
