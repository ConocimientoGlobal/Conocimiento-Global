#!/usr/bin/env python3
"""
Generador de mapas procedurales para PachaMirai
Uso: python3 generar_mundo_abierto.py [ancho] [alto] [semilla]
"""

import sys, random, base64, zlib

TILESET_COLS = 8

# Mapeo de biomas a rangos de filas del tileset del starter
# Analizado de tileset.tsx: 
# Filas 0-15: Pasto, Filas 16-31: Tierra/agua, Filas 32-47: Arena/piedra, Filas 48-63: Nieve/bosque
BIOMAS = {
    0: (0, 15),     # pasto
    1: (16, 31),    # tierra
    2: (32, 47),    # agua
    3: (48, 63),    # arena
    4: (64, 79),    # piedra
    5: (80, 95),    # nieve
    6: (96, 111),   # bosque
}

def generar_mapa(ancho, alto, semilla=42):
    random.seed(semilla)
    mapa = [[0]*ancho for _ in range(alto)]
    
    for y in range(alto):
        for x in ancho:
            nx, ny = x/ancho, y/alto
            r = (random.random() * 0.3 + 0.7 * ((nx*17+ny*31+semilla) % 1))
            if r < 0.12: mapa[y][x] = 2
            elif r < 0.22: mapa[y][x] = 3
            elif r < 0.42: mapa[y][x] = 6
            elif r < 0.62: mapa[y][x] = 0
            elif r < 0.78: mapa[y][x] = 1
            elif r < 0.88: mapa[y][x] = 4
            else: mapa[y][x] = 5
    
    # Suavizar bordes
    for _ in range(4):
        nuevo = [f[:] for f in mapa]
        for y in range(1, alto-1):
            for x in range(1, ancho-1):
                v = {}
                for dy in [-1,0,1]:
                    for dx in [-1,0,1]:
                        t = mapa[y+dy][x+dx]
                        v[t] = v.get(t, 0) + 1
                m = max(v, key=lambda k: v[k])
                if v[m] >= 5: nuevo[y][x] = m
        mapa = nuevo
    return mapa

def a_tmx(mapa, nombre='mundo_abierto'):
    alto, ancho = len(mapa), len(mapa[0])
    tiles = []
    for y in range(alto):
        for x in range(ancho):
            bioma = mapa[y][x]
            rango = BIOMAS.get(bioma, (0, 15))
            tile_id = random.randint(rango[0], rango[1])
            tiles.append(tile_id)
    
    raw = b''.join(t.to_bytes(4, 'little') for t in tiles)
    encoded = base64.b64encode(zlib.compress(raw)).decode()
    
    # Objetos
    objs = []
    oid = 1
    cx, cy = ancho//2, alto//2
    
    # Start
    objs.append(f'  <object id="{oid}" name="start" x="{cx*32}" y="{cy*32}"><point/></object>')
    oid += 1
    
    # NPCs y objetos dispersos
    for y in range(0, alto, 16):
        for x in range(0, ancho, 16):
            if abs(x - cx) < 10 and abs(y - cy) < 10: continue
            r = random.random()
            if r < 0.02:
                objs.append(f'  <object id="{oid}" name="NPC_GUARDIA" x="{x*32+16}" y="{y*32+16}" width="32" height="32"/>')
                oid += 1
            elif r < 0.05:
                tipo = random.choice(['ARBOL', 'ROCA', 'ARBUSTO', 'FLOR'])
                objs.append(f'  <object id="{oid}" name="{tipo}" x="{x*32+16}" y="{y*32+16}" width="32" height="32"/>')
                oid += 1
    
    obj_xml = '\n'.join(objs)
    
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<map version="1.9" tiledversion="1.9.2" orientation="orthogonal" renderorder="right-down" width="{ancho}" height="{alto}" tilewidth="32" tileheight="32" infinite="0" nextlayerid="3" nextobjectid="{oid}">
 <tileset firstgid="1" source="tileset.tsx"/>
 <layer id="1" name="Ground" width="{ancho}" height="{alto}">
  <data encoding="base64">
   {encoded}
  </data>
 </layer>
 <objectgroup id="2" name="Objects">
{obj_xml}
 </objectgroup>
</map>'''

if __name__ == '__main__':
    ancho = int(sys.argv[1]) if len(sys.argv) > 1 else 128
    alto = int(sys.argv[2]) if len(sys.argv) > 2 else 128
    semilla = int(sys.argv[3]) if len(sys.argv) > 3 else 42
    
    mapa = generar_mapa(ancho, alto, semilla)
    tmx = a_tmx(mapa)
    
    out = '/data/data/com.termux/files/home/Conocimiento-Global/src/tiled/mundo_abierto.tmx'
    with open(out, 'w') as f:
        f.write(tmx)
    
    biomas = {}
    for fila in mapa:
        for t in fila:
            biomas[t] = biomas.get(t, 0) + 1
    nombres = {0:'pasto',1:'tierra',2:'agua',3:'arena',4:'piedra',5:'nieve',6:'bosque'}
    
    print(f"✅ Mapa {ancho}x{alto} generado")
    for b, c in sorted(biomas.items()):
        print(f"  {nombres.get(b,b)}: {c/(ancho*alto)*100:.1f}%")
    print(f"Archivo: {out}")
