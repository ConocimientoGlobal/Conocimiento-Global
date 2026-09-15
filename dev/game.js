// === CONFIG ===
const WORLD_W=64, WORLD_H=64;
let W,H,TW,TH;
const c=document.getElementById('c');
const ctx=c.getContext('2d');

function resize(){
  W=c.width=window.innerWidth;
  H=c.height=window.innerHeight;
  TW=Math.min(W,H)/4;
  TH=TW/2;
}
resize();
window.addEventListener('resize',resize);

// === PIXEL ART HELPER ===
// Dibuja un "pixel" de 16-bit (cuadrado con sombra interna)
function px(x,y,size,light,shadow){
  ctx.fillStyle=light;
  ctx.fillRect(x,y,size,size);
  ctx.fillStyle=shadow;
  ctx.fillRect(x,y+size-1,size,1);
  ctx.fillRect(x+size-1,y,1,size);
}

// === BIOMAS ===
const BIOMAS=[
  {id:0,n:'Pueblo',t:['#4caf50','#388e3c','#66bb6a','#2e7d32'],h:['#7cb342','#8bc34a','#689f38'],w:'#1565c0'},
  {id:1,n:'Bosque',t:['#2e7d32','#1b5e20','#388e3c','#43a047'],h:['#7cb342','#689f38','#558b2f'],w:'#1565c0'},
  {id:2,n:'Desierto',t:['#f9a825','#f57f17','#ffb300','#ffa000'],h:['#4caf50','#388e3c','#66bb6a'],w:'#0288d1'},
  {id:3,n:'Montaña',t:['#9e9e9e','#757575','#bdbdbd','#616161'],h:['#689f38','#558b2f','#7cb342'],w:'#1565c0'},
  {id:4,n:'Pantano',t:['#5d4037','#4e342e','#6d4c41','#3e2723'],h:['#5d4037','#4e342e','#795548'],w:'#0277bd'},
  {id:5,n:'Volcan',t:['#d84315','#bf360c','#e64a19','#f4511e'],h:['#424242','#616161','#757575'],w:'#d84315'},
  {id:6,n:'Castillo',t:['#37474f','#263238','#455a64','#546e7a'],h:['#4caf50','#388e3c','#66bb6a'],w:'#1565c0'}
];

function getBioma(x,y){
  const bx=Math.min(7,Math.floor(x/8));
  const by=Math.min(7,Math.floor(y/8));
  const m=[[0,1,1,2,2,5,5,5],[1,1,2,2,3,5,5,6],[1,2,2,3,3,5,6,6],[2,2,3,3,4,5,6,6],[2,3,3,4,4,6,6,6],[3,3,4,4,4,6,6,6],[3,4,4,4,6,6,6,6],[4,4,4,6,6,6,6]];
  return m[by][bx];
}

// === MUNDO ===
const world=[];
for(let y=0;y<WORLD_H;y++){
  world[y]=[];
  for(let x=0;x<WORLD_W;x++){
    if(x<1||x>=WORLD_W-1||y<1||y>=WORLD_H-1)world[y][x]=1;
    else{const v=((x*374761393+y*668265263)^0x5bf03635)>>>0;world[y][x]=(v%25<1)?1:0;}
  }
}
world[8][8]=0;

const npcs=[{x:6,y:6,n:'Herrero',c:'#e53935'},{x:9,y:7,n:'Mago',c:'#8e24aa'},{x:7,y:9,n:'Comerciante',c:'#ffb300'}];
const cofres=[{x:10,y:10,o:false},{x:25,y:18,o:false},{x:40,y:22,o:false}];

// === JUGADOR ===
const pl={gx:8,gy:8,fx:8,fy:8,path:[],frame:0,ft:0,hp:100,mhp:100,sed:100,temp:100,nivel:1,oro:50};

// === FUNCIONES ===
function iso(x,y){return{x:(x-y)*TW/2,y:(x+y)*TH/2};}
function getCam(){const p=iso(pl.fx,pl.fy);return{x:W/2-p.x,y:H/2-p.y};}

function s2c(sx,sy){
  const cam=getCam();
  const rx=sx-cam.x,ry=sy-cam.y;
  return{x:Math.round((rx/(TW/2)+ry/(TH/2))/2),y:Math.round((ry/(TH/2)-rx/(TW/2))/2)};
}

function esCam(x,y){
  if(x<0||x>=WORLD_W||y<0||y>=WORLD_H)return false;
  if(world[y][x]!==0)return false;
  return true;
}

function findPath(sx,sy,gx,gy){
  if(!esCam(gx,gy))return[];
  const open=[{x:sx,y:sy,p:[]}];
  const vis=new Set();
  vis.add(sx+','+sy);
  while(open.length){
    const c=open.shift();
    if(c.x===gx&&c.y===gy)return c.p;
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=c.x+dx,ny=c.y+dy,k=nx+','+ny;
      if(vis.has(k)||!esCam(nx,ny))continue;
      vis.add(k);
      open.push({x:nx,y:ny,p:[...c.p,{x:nx,y:ny}]});
    }
  }
  return[];
}

function mover(dt){
  if(pl.path.length===0)return;
  const t=pl.path[0];
  const sp=2.5*dt;
  const dx=t.x-pl.fx,dy=t.y-pl.fy;
  const dist=Math.sqrt(dx*dx+dy*dy);
  if(dist<sp||dist<0.005){
    pl.fx=t.x;pl.fy=t.y;pl.gx=t.x;pl.gy=t.y;pl.path.shift();
  }else{
    pl.fx+=(dx/dist)*sp;pl.fy+=(dy/dist)*sp;
  }
  pl.ft+=dt;
  if(pl.ft>0.15){pl.ft=0;pl.frame=(pl.frame+1)%2;}
}

// === RENDER PIXEL ART 16-BIT ===

function drawTile16(sx,sy,w,h,bio,x,y){
  const v=((x*374761393+y*668265263)^0x5bf03635)>>>0;
  const ps=Math.max(2,Math.floor(TW/16)); // tamaño del "pixel" 16-bit
  
  // Tile base con patrón de pixels
  for(let py=0;py<h;py+=ps){
    for(let px=0;px<w;px+=ps){
      const pxColor=((px+py+v)%3===0)?bio.t[0]:((px+py+v)%3===1)?bio.t[1]:bio.t[2];
      ctx.fillStyle=pxColor;
      ctx.fillRect(sx-ps+px,sy+py,ps,ps);
    }
  }
  
  // Bordes del diamante
  ctx.beginPath();
  ctx.moveTo(sx,sy);
  ctx.lineTo(sx+w/2,sy+h/2);
  ctx.lineTo(sx,sy+h);
  ctx.lineTo(sx-w/2,sy+h/2);
  ctx.closePath();
  ctx.strokeStyle='rgba(0,0,0,0.15)';
  ctx.lineWidth=1;
  ctx.stroke();
  
  // Sombra inferior (volumen)
  ctx.fillStyle='rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.moveTo(sx,sy+h);
  ctx.lineTo(sx+w/2,sy+h/2);
  ctx.lineTo(sx+w/2,sy+h+ps);
  ctx.lineTo(sx-w/2,sy+h+ps);
  ctx.lineTo(sx-w/2,sy+h/2);
  ctx.closePath();
  ctx.fill();
  
  // Brillo superior
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.moveTo(sx,sy);
  ctx.lineTo(sx+w/2,sy+h/2);
  ctx.lineTo(sx,sy+h/2);
  ctx.lineTo(sx-w/2,sy+h/2);
  ctx.closePath();
  ctx.fill();
}

function drawWater16(sx,sy,w,h,bio,x,y){
  const v=((x*374761393+y*668265263)^0x5bf03635)>>>0;
  const ps=Math.max(2,Math.floor(TW/16));
  const wave=Math.sin((frameCount*0.04)+(x+y)*0.3)*2;
  
  // Base con variación de azul
  for(let py=0;py<h;py+=ps){
    for(let px=0;px<w;px+=ps){
      const blue=120+((px+py+v)%40);
      ctx.fillStyle=`rgb(20,${80+(v%30)},${blue})`;
      ctx.fillRect(sx-ps+px,sy+py+wave,ps,ps);
    }
  }
  
  // Bordes
  ctx.beginPath();
  ctx.moveTo(sx,sy);
  ctx.lineTo(sx+w/2,sy+h/2);
  ctx.lineTo(sx,sy+h);
  ctx.lineTo(sx-w/2,sy+h/2);
  ctx.closePath();
  ctx.strokeStyle='rgba(100,180,220,0.3)';
  ctx.lineWidth=1;
  ctx.stroke();
  
  // Ondas (espuma)
  ctx.fillStyle='rgba(200,230,255,0.4)';
  ctx.fillRect(sx-8+wave,sy+TH/3,5,1);
  ctx.fillRect(sx+3+wave*0.7,sy+TH/2-1,4,1);
  ctx.fillRect(sx-4+wave*0.5,sy/2+TH/4,3,1);
  
  // Peces
  if(v%7<2){
    const px=sx-6+((frameCount*0.3+v)%12);
    const py=sy+TH/3+(v%3);
    ctx.fillStyle='#ff8f00';
    ctx.fillRect(px,py,3,2);
    ctx.fillStyle='#ffcc02';
    ctx.fillRect(px-1,py,1,2);
  }
  
  // Rocas sumergidas
  if(v%11===0){
    ctx.fillStyle='#5d4037';
    ctx.fillRect(sx+4,sy+TH/2-2,5,4);
    ctx.fillStyle='#4e342e';
    ctx.fillRect(sx+4,sy+TH/2-2,5,1);
  }
  
  // Coral
  if(v%13===0){
    ctx.fillStyle=v%2===0?'#e91e63':'#f06292';
    ctx.fillRect(sx-8,sy+TH/2,3,4);
    ctx.fillRect(sx-6,sy+TH/2-2,2,2);
  }
}

function drawArbol16(px,py,tipo,v){
  const ps=Math.max(2,Math.floor(TW/16));
  
  // Sombra
  ctx.fillStyle='rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(px+6,py+TH/2,14*ps/2,6*ps/2,0.3,0,Math.PI*2);
  ctx.fill();
  
  if(tipo==='pino'){
    // Tronco
    ctx.fillStyle='#5d4037';
    ctx.fillRect(px-2*ps,py-12*ps,4*ps,14*ps);
    ctx.fillStyle='#4e342e';
    ctx.fillRect(px-2*ps,py-12*ps,2*ps,14*ps);
    // Copa
    ctx.fillStyle='#2e7d32';
    ctx.beginPath();
    ctx.moveTo(px,py-35*ps);
    ctx.lineTo(px-12*ps,py-10*ps);
    ctx.lineTo(px+12*ps,py-10*ps);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle='#388e3c';
    ctx.beginPath();
    ctx.moveTo(px,py-30*ps);
    ctx.lineTo(px-8*ps,py-12*ps);
    ctx.lineTo(px+8*ps,py-12*ps);
    ctx.closePath();
    ctx.fill();
    // Nieve
    if(v%3===0){
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.fillRect(px-3*ps,py-28*ps,6*ps,2*ps);
    }
  } else if(tipo==='palmera'){
    ctx.fillStyle='#8d6e63';
    ctx.fillRect(px-3*ps,py-16*ps,6*ps,20*ps);
    ctx.fillStyle='#4caf50';
    ctx.fillRect(px-18*ps,py-24*ps,12*ps,3*ps);
    ctx.fillRect(px+6*ps,py-24*ps,12*ps,3*ps);
    ctx.fillRect(px-5*ps,py-32*ps,10*ps,3*ps);
  } else {
    // Roble
    ctx.fillStyle='#5d4037';
    ctx.fillRect(px-3*ps,py-10*ps,6*ps,12*ps);
    ctx.fillStyle='#4e342e';
    ctx.fillRect(px-3*ps,py-10*ps,3*ps,12*ps);
    // Copa con gradiente
    const grad=ctx.createRadialGradient(px,py-24*ps,2*ps,px,py-22*ps,12*ps);
    grad.addColorStop(0,'#66bb6a');
    grad.addColorStop(0.7,'#388e3c');
    grad.addColorStop(1,'#1b5e20');
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.arc(px,py-24*ps,12*ps,0,Math.PI*2);
    ctx.fill();
    // Brillo
    ctx.fillStyle='rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.arc(px-3*ps,py-28*ps,4*ps,0,Math.PI*2);
    ctx.fill();
  }
}

function drawPlayer16(px,py,bo){
  const ps=Math.max(2,Math.floor(TW/16));
  
  // Sombra
  ctx.fillStyle='rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px,py+TH/2,8*ps/2,4*ps/2,0,0,Math.PI*2);
  ctx.fill();
  
  // Piernas
  ctx.fillStyle='#5d4037';
  ctx.fillRect(px-3*ps,py+TH/2-8*ps,2*ps,9*ps+bo);
  ctx.fillRect(px+1*ps,py+TH/2-8*ps,2*ps,9*ps+bo);
  
  // Cuerpo
  const bodyGrad=ctx.createLinearGradient(px-6*ps,py+TH/2-20*ps,px+6*ps,py+TH/2);
  bodyGrad.addColorStop(0,'#1565c0');
  bodyGrad.addColorStop(0.5,'#1976d2');
  bodyGrad.addColorStop(1,'#0d47a1');
  ctx.fillStyle=bodyGrad;
  ctx.fillRect(px-7*ps,py+TH/2-22*ps,14*ps,16*ps);
  
  // Cinturón
  ctx.fillStyle='#ffc107';
  ctx.fillRect(px-7*ps,py+TH/2-8*ps,14*ps,2*ps);
  
  // Cabeza
  const headGrad=ctx.createRadialGradient(px-1*ps,py+TH/2-28*ps,1*ps,px,py+TH/2-26*ps,6*ps);
  headGrad.addColorStop(0,'#fff3e0');
  headGrad.addColorStop(1,'#ffe0b2');
  ctx.fillStyle=headGrad;
  ctx.fillRect(px-4*ps,py+TH/2-32*ps,8*ps,7*ps);
  
  // Pelo
  ctx.fillStyle='#3e2723';
  ctx.fillRect(px-5*ps,py+TH/2-34*ps,10*ps,4*ps);
  
  // Ojos
  ctx.fillStyle='#fff';
  ctx.fillRect(px-2*ps,py+TH/2-29*ps,2*ps,2*ps);
  ctx.fillRect(px+1*ps,py+TH/2-29*ps,2*ps,2*ps);
  ctx.fillStyle='#1a1a1a';
  ctx.fillRect(px-1*ps,py+TH/2-28*ps,1*ps,1*ps);
  ctx.fillRect(px+2*ps,py+TH/2-28*ps,1*ps,1*ps);
}

function drawNPC16(px,py,npc){
  const ps=Math.max(2,Math.floor(TW/16));
  
  ctx.fillStyle='rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(px,py+TH/2,7*ps/2,3*ps/2,0,0,Math.PI*2);
  ctx.fill();
  
  ctx.fillStyle=npc.c;
  ctx.fillRect(px-5*ps,py+TH/2-16*ps,10*ps,12*ps);
  
  ctx.fillStyle='#ffe0b2';
  ctx.fillRect(px-3*ps,py+TH/2-22*ps,6*ps,5*ps);
  
  ctx.fillStyle='#3e2723';
  ctx.fillRect(px-4*ps,py+TH/2-24*ps,8*ps,3*ps);
  
  ctx.fillStyle='#fff';
  ctx.fillRect(px-2*ps,py+TH/2-20*ps,2*ps,1*ps);
  ctx.fillRect(px+1*ps,py+TH/2-20*ps,2*ps,1*ps);
  
  ctx.fillStyle='#ffd700';
  ctx.beginPath();
  ctx.arc(px,py+TH/2-28*ps,2*ps,0,Math.PI*2);
  ctx.fill();
}

// === GAME LOOP ===
let frameCount=0;

function loop(){
  frameCount++;
  const dt=1/60;
  
  ctx.fillStyle='#0d1b0d';
  ctx.fillRect(0,0,W,H);
  
  mover(dt);
  
  const cam=getCam();
  const pgx=Math.floor(pl.gx),pgy=Math.floor(pl.gy);
  const VR=10;
  
  // Tiles
  for(let y=Math.max(0,pgy-VR);y<Math.min(WORLD_H,pgy+VR+2);y++){
    for(let x=Math.max(0,pgx-VR);x<Math.min(WORLD_W,pgx+VR+2);x++){
      const s=iso(x,y);
      const sx=s.x+cam.x-TW/2;
      const sy=s.y+cam.y-TH/2;
      
      const dist=Math.sqrt((x-pgx)*(x-pgx)+(y-pgy)*(y-pgy));
      if(dist>VR+0.5)continue;
      
      const bio=BIOMAS[getBioma(x,y)];
      
      if(world[y][x]===1){
        drawWater16(sx,sy,TW,TH,bio,x,y);
      }else{
        drawTile16(sx,sy,TW,TH,bio,x,y);
      }
      
      if(pl.path.find(p=>p.x===x&&p.y===y)){
        ctx.fillStyle='rgba(255,255,0,0.25)';
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(sx+TW/2,sy+TH/2);
        ctx.lineTo(sx,sy+TH);
        ctx.lineTo(sx-TW/2,sy+TH/2);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
  
  // Árboles
  for(let y=Math.max(0,pgy-VR);y<Math.min(WORLD_H,pgy+VR);y++){
    for(let x=Math.max(0,pgx-VR);x<Math.min(WORLD_W,pgx+VR);x++){
      const dist=Math.sqrt((x-pgx)*(x-pgx)+(y-pgy)*(y-pgy));
      if(dist>VR)continue;
      if(world[y][x]!==0)continue;
      const v=((x*374761393+y*668265263)^0x5bf03635)>>>0;
      if(v%100<8){
        const s=iso(x,y);
        const px=s.x+cam.x;
        const py=s.y+cam.y;
        const tipo=getBioma(x,y)===1&&v%2===0?'pino':getBioma(x,y)===2?'palmera':'roble';
        drawArbol16(px,py,tipo,v);
      }
    }
  }
  
  // NPCs
  for(const n of npcs){
    const dist=Math.sqrt((n.x-pgx)*(n.x-pgx)+(n.y-pgy)*(n.y-pgy));
    if(dist>VR)continue;
    const s=iso(n.x,n.y);
    const px=s.x+cam.x,py=s.y+cam.y;
    drawNPC16(px,py,n);
    ctx.fillStyle='#fff';
    ctx.font='6px monospace';
    ctx.textAlign='center';
    ctx.fillText(n.n,px,py-10);
  }
  
  // Jugador
  const ps=iso(pl.fx,pl.fy);
  drawPlayer16(ps.x+cam.x,ps.y+cam.y,pl.frame===0?0:1);
  
  // UI
  ctx.fillStyle='rgba(0,0,0,0.85)';
  ctx.fillRect(10,10,140,50);
  ctx.fillStyle='#fff';
  ctx.font='bold 12px monospace';
  ctx.textAlign='left';
  ctx.textBaseline='middle';
  ctx.fillText('Lv.'+pl.nivel+' Hero',18,24);
  ctx.fillStyle='#4a0000';
  ctx.fillRect(18,32,120,6);
  ctx.fillStyle='#e44';
  ctx.fillRect(19,33,118*pl.hp/pl.mhp,4);
  ctx.fillStyle='#fff';
  ctx.font='7px monospace';
  ctx.fillText('100/100',65,37);
  
  ctx.fillStyle='#0f0';
  ctx.font='9px monospace';
  ctx.textAlign='left';
  ctx.fillText('Pos:'+Math.floor(pl.gx)+','+Math.floor(pl.gy),10,H-15);
  
  // Minimapa
  ctx.fillStyle='rgba(0,0,0,0.7)';
  ctx.fillRect(W-110,H-110,100,100);
  for(let y=0;y<WORLD_H;y+=2){
    for(let x=0;x<WORLD_W;x+=2){
      const b=BIOMAS[getBioma(x,y)];
      ctx.fillStyle=b.t[0];
      ctx.fillRect(W-110+(x/WORLD_W)*100,H-110+(y/WORLD_H)*100,2,2);
    }
  }
  ctx.fillStyle='#ff0';
  ctx.fillRect(W-110+(pl.gx/WORLD_W)*100-2,H-110+(pl.gy/WORLD_H)*100-2,4,4);
  
  requestAnimationFrame(loop);
}

c.addEventListener('touchstart',e=>{
  e.preventDefault();
  if(pl.path.length>0)return;
  const t=e.changedTouches[0];
  const cell=s2c(t.clientX,t.clientY);
  if(cell.x<0||cell.x>=WORLD_W||cell.y<0||cell.y>=WORLD_H)return;
  if(world[cell.y][cell.x]!==0)return;
  pl.path=findPath(pl.gx,pl.gy,cell.x,cell.y);
},{passive:false});

loop();
