function defaultPositions(){
  const pos={};
  const CW=190;   // largura célula colaborador
  const RH=130;   // altura por linha de nível
  const GW=60;    // gap horizontal entre grupos
  const DIV_Y=220;
  const COL_Y_START=390;

  const ordemNivel=[
    'Coordenador','Gerente','Especialista',
    'Analista III','Analista II','Analista I',
    'Assistente III','Assistente II','Assistente I','Assistente',
    'Estagiário'
  ];

  const grupos={
    'div_emc':     ['EMC','Configuracao EMC'],
    'div_rf':      ['RF','Configuracao RF'],
    'div_redes':   ['Redes Moveis'],
    'div_bat':     ['Baterias e Acustica','Ensaios Acusticos','Baterias'],
    'div_outros':  ['Outros Ensaios','TV'],
    'div_entrada': ['Entrada e Devolucao'],
  };

  // Separar Gestao (Coordenador vai para div_coord separado)
  const gestaoCol=colaboradores.filter(c=>c.area==='Gestao');

  // Montar membros por grupo
  const membros={};
  Object.keys(grupos).forEach(gid=>{ membros[gid]=[]; });
  colaboradores.forEach(c=>{
    if(c.area==='Gestao') return; // coordenação no topo
    for(const [gid,areas] of Object.entries(grupos)){
      if(areas.includes(c.area)){ membros[gid].push(c); break; }
    }
  });

  // Para cada grupo: agrupar colaboradores POR NÍVEL,
  // cada nível em uma linha — lado a lado apenas mesmo nível.
  // A largura do grupo = máx colaboradores num mesmo nível × CW
  function calcGroupLayout(colList){
    // Ordenar por nível
    const sorted=colList.slice().sort((a,b)=>{
      const ia=ordemNivel.indexOf(a.nivel); const ib=ordemNivel.indexOf(b.nivel);
      return (ia<0?99:ia)-(ib<0?99:ib);
    });
    // Agrupar por nível
    const byNivel={};
    sorted.forEach(c=>{
      if(!byNivel[c.nivel]) byNivel[c.nivel]=[];
      byNivel[c.nivel].push(c);
    });
    // Níveis em ordem
    const niveisPresentes=ordemNivel.filter(n=>byNivel[n]);
    // Largura máxima = maior linha
    const maxCols=Math.max(1,...niveisPresentes.map(n=>byNivel[n].length));
    return {sorted,byNivel,niveisPresentes,maxCols};
  }

  // Calcular larguras e posições X de cada grupo
  const groupLayouts={};
  let curX=60;
  const groupX={};

  Object.keys(grupos).forEach(gid=>{
    const layout=calcGroupLayout(membros[gid]);
    groupLayouts[gid]=layout;
    const groupW=Math.max(layout.maxCols*CW, 180);
    groupX[gid]=curX;
    curX+=groupW+GW;
  });

  const totalW=curX;
  const coordX=Math.round(totalW/2)-90;

  // Coordenação no topo centro
  pos['div_coord']={x:coordX, y:40};

  // Colaboradores de Gestão junto ao div_coord
  gestaoCol.forEach((c,i)=>{
    pos['c_'+c.id]={x:coordX-30+i*CW, y:180};
  });

  // Posicionar cada divisão e seus colaboradores
  Object.keys(grupos).forEach(gid=>{
    pos[gid]={x:groupX[gid], y:DIV_Y};

    const {byNivel,niveisPresentes}=groupLayouts[gid];
    const startX=groupX[gid];
    let rowY=COL_Y_START;

    niveisPresentes.forEach(nivel=>{
      const colsNesteNivel=byNivel[nivel];
      // Centralizar o grupo de mesmo nível dentro da coluna da divisão
      const totalW=colsNesteNivel.length*CW;
      const layoutMaxW=groupLayouts[gid].maxCols*CW;
      const offsetX=Math.round((layoutMaxW-totalW)/2);

      colsNesteNivel.forEach((c,i)=>{
        pos['c_'+c.id]={x:startX+offsetX+i*CW, y:rowY};
      });
      rowY+=RH; // próxima linha = próximo nível
    });
  });

  return pos;
}

function getPos(id){
  if(!orgPositions[id]){
    const def=defaultPositions();
    if(def[id])orgPositions[id]=def[id];
    else orgPositions[id]={x:100,y:100};
  }
  return orgPositions[id];
}

function renderOrganograma(){
  const ativos = colaboradores.filter(c => c.status === 'Ativo');
  if (!ativos.length) return '<div class="empty-state">Nenhum colaborador ativo.</div>';

  // Mapa nível → ordem (maior ordem = cargo mais alto)
  const ordemNivel = {};
  niveis.slice().sort((a,b)=>a.ordem-b.ordem).forEach((n,i)=>{ ordemNivel[n.nome] = i; });

  // Agrupar por área
  const areasOrdem = Object.keys(AREA_COLORS);
  const byArea = {};
  ativos.forEach(col => {
    if (!byArea[col.area]) byArea[col.area] = [];
    byArea[col.area].push(col);
  });

  // Ordenar áreas: primeiro as do AREA_COLORS, depois as demais
  const areasPresentes = [
    ...areasOrdem.filter(a => byArea[a]),
    ...Object.keys(byArea).filter(a => !areasOrdem.includes(a))
  ];

  const blocos = areasPresentes.map(area => {
    const ac = AREA_COLORS[area] || {cor:'#5F5E5A', bg:'#D3D1C7'};
    // Pessoas da área ordenadas por nível (maior primeiro)
    const pessoas = byArea[area].slice().sort((a,b) => {
      const oa = ordemNivel[a.nivel] ?? 0;
      const ob = ordemNivel[b.nivel] ?? 0;
      return ob - oa; // decrescente — cargo mais alto primeiro
    });

    // Agrupar por nível dentro da área
    const byNivel = {};
    pessoas.forEach(col => {
      if (!byNivel[col.nivel]) byNivel[col.nivel] = [];
      byNivel[col.nivel].push(col);
    });

    const linhas = Object.entries(byNivel).map(([nivel, membros]) => {
      const ns = NIVEL_STYLE[nivel] || {cor:'#888', bg:'#eee'};
      const cards = membros.map(col => {
        const avsC = avaliacoes.filter(a => a.colaboradorId === col.id);
        const lastAv = avsC.length ? avsC[avsC.length-1] : null;
        return `<div onclick="verCol('${col.id}')"
          style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;
                 padding:10px 12px;cursor:pointer;transition:box-shadow .15s;
                 width:160px;flex-shrink:0;border-top:3px solid ${ns.cor}"
          onmouseover="this.style.boxShadow='0 4px 14px rgba(0,0,0,.1)'"
          onmouseout="this.style.boxShadow='none'">
          <div style="display:flex;align-items:center;gap:7px">
            ${av(col.nome, false, false)}
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:700;color:var(--txt);
                          overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                ${col.nome.split(' ').slice(0,2).join(' ')}
              </div>
              ${col.gestor ? `<div style="font-size:9px;color:var(--txt3)">↑ ${col.gestor.split(' ')[0]}</div>` : ''}
            </div>
            ${lastAv ? `<span style="font-size:10px;font-weight:800;color:var(--green)">${lastAv.mediaGeral}</span>` : ''}
          </div>
        </div>`;
      }).join('');

      return `<div style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span style="font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;
                       background:${ns.bg};color:${ns.cor};border:0.5px solid ${ns.cor}40;white-space:nowrap">
            ${nivel}
          </span>
          <div style="flex:1;height:1px;background:${ns.cor}20"></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${cards}</div>
      </div>`;
    }).join('');

    return `<div style="background:var(--bg);border:0.5px solid var(--border);
                border-radius:14px;overflow:hidden;flex-shrink:0;min-width:200px">
      <div style="background:${ac.bg};border-bottom:2px solid ${ac.cor};
                  padding:10px 16px;display:flex;align-items:center;gap:10px">
        <div style="font-size:13px;font-weight:700;color:${ac.cor}">${area}</div>
        <div style="font-size:11px;color:${ac.cor};opacity:.7">
          ${pessoas.length} pessoa${pessoas.length!==1?'s':''}
        </div>
      </div>
      <div style="padding:14px 16px">${linhas}</div>
    </div>`;
  }).join('');

  return `
  <div style="display:flex;align-items:center;justify-content:space-between;
              margin-bottom:16px;flex-wrap:wrap;gap:8px">
    <div style="font-size:12px;color:var(--txt2)">
      ${ativos.length} colaboradores · ${areasPresentes.length} áreas
    </div>
    <div style="font-size:11px;color:var(--txt3)">
      Por área · níveis do maior para o menor
    </div>
  </div>
  <div style="display:flex;gap:16px;overflow-x:auto;-webkit-overflow-scrolling:touch;
              padding-bottom:16px;align-items:flex-start">
    ${blocos}
  </div>`;
}

// Nós especiais (divisões)
const DIVISION_NODES=[
  {id:'div_coord',   label:'🏢 Coordenação',         sublabel:'Gestão Geral',              cor:'#3B6D11',bg:'#C0DD97',isDivisao:true,isCoord:true},
  {id:'div_emc',     label:'⚡ EMC',                  sublabel:'Ensaios Eletromagnéticos',   cor:'#185FA5',bg:'#dbeafe',isDivisao:true},
  {id:'div_rf',      label:'📡 RF',                   sublabel:'Radiofrequência 14448',      cor:'#854F0B',bg:'#fef3c7',isDivisao:true},
  {id:'div_redes',   label:'📶 Redes Móveis',         sublabel:'IPv6 · 2G/3G/4G',           cor:'#085041',bg:'#9FE1CB',isDivisao:true},
  {id:'div_bat',     label:'🔋 Baterias e Acústica',  sublabel:'Baterias · Powerbanks',     cor:'#7C3D8F',bg:'#F3E8FF',isDivisao:true},
  {id:'div_outros',  label:'📺 Outros Ensaios',       sublabel:'TV · Melhorias',             cor:'#0F766E',bg:'#CCFBF1',isDivisao:true},
  {id:'div_entrada', label:'📦 Entrada e Devolução',  sublabel:'Logística · Atlas · LABTRACK',cor:'#5F5E5A',bg:'#D3D1C7',isDivisao:true},
];

// Conexões pai→filho
function buildConnections(){
  const conns=[];
  // Coord → todas as divisões
  ['div_emc','div_rf','div_redes','div_bat','div_outros','div_entrada'].forEach(d=>{
    conns.push({from:'div_coord',to:d});
  });
  // Mapeamento área → divisão
  const areaDivisao={
    'EMC':'div_emc','Configuracao EMC':'div_emc',
    'RF':'div_rf','Configuracao RF':'div_rf',
    'Redes Moveis':'div_redes',
    'Baterias e Acustica':'div_bat','Ensaios Acusticos':'div_bat','Baterias':'div_bat',
    'Outros Ensaios':'div_outros','TV':'div_outros',
    'Entrada e Devolucao':'div_entrada',
  };
  colaboradores.forEach(c=>{
    const divId=areaDivisao[c.area]||'div_coord';
    conns.push({from:divId,to:'c_'+c.id});
  });
  return conns;
}

function nodeHeight(node){
  if(node.isDivisao)return 62;
  const c=colaboradores.find(x=>'c_'+x.id===node.id);
  if(!c)return 80;
  const funcs=c.funcoes||[];
  return 88+(Math.ceil(funcs.length/2)*18);
}

let connectMode=false,connectFrom=null;
let orgScale=1,orgOffX=0,orgOffY=0;
let orgIsPanning=false,orgPanStart={x:0,y:0},orgPanOrigin={x:0,y:0};
let orgDragNode=null,orgDragStart={x:0,y:0},orgDragNodeOrigin={x:0,y:0};
let orgDidDrag=false;


function toggleConnectMode(){
  connectMode=!connectMode;connectFrom=null;
  const btn=document.getElementById('btn-connect');
  const hint=document.getElementById('org-hint');
  const svg=document.getElementById('orgSvg');
  if(connectMode){
    if(btn){btn.style.background='#FAEEDA';btn.textContent='✕ Sair do modo conexão';}
    if(hint)hint.textContent='Clique no 1º nó (origem) → clique no 2º nó (destino). Clique numa linha para excluí-la.';
    if(svg)svg.classList.add('connect-mode');
  } else {
    if(btn){btn.style.background='';btn.textContent='🔗 Conectar nós';}
    if(hint)hint.textContent='Arraste · Scroll zoom · Clique para perfil';
    if(svg)svg.classList.remove('connect-mode');
    connectFrom=null;
    document.querySelectorAll('.org-node-drag.selected-from').forEach(n=>n.classList.remove('selected-from'));
    document.querySelectorAll('.org-node-drag.connect-hover').forEach(n=>n.classList.remove('connect-hover'));
  }
}

function clearOrgConnections(){
  if(!confirm('Remover todas as linhas manuais?'))return;
  orgConnections=[];lss('orgConns',orgConnections);drawOrgConnections();toast('Linhas removidas!');
}

function handleConnectClick(nodeId,el){
  if(!connectFrom){
    connectFrom=nodeId;
    document.querySelectorAll('.org-node-drag.selected-from').forEach(n=>n.classList.remove('selected-from'));
    el.classList.add('selected-from');
    const hint=document.getElementById('org-hint');
    if(hint)hint.textContent='✓ Origem selecionada! Agora clique no nó destino para criar a linha.';
  } else {
    if(connectFrom===nodeId){
      connectFrom=null;el.classList.remove('selected-from');return;
    }
    // Verificar se já existe
    const exists=orgConnections.find(c=>(c.from===connectFrom&&c.to===nodeId)||(c.from===nodeId&&c.to===connectFrom));
    if(exists){
      if(confirm('Esta conexão já existe. Deseja excluí-la?')){
        orgConnections=orgConnections.filter(c=>c!==exists);lss('orgConns',orgConnections);drawOrgConnections();
      }
    } else {
      const label=prompt('Rótulo da linha (ex: mentoria, colega, par técnico) — pode deixar vazio:','');
      orgConnections.push({id:uid(),from:connectFrom,to:nodeId,label:label?label:''});
      lss('orgConns',orgConnections);drawOrgConnections();toast('Linha criada! 🔗');
    }
    connectFrom=null;
    document.querySelectorAll('.org-node-drag.selected-from').forEach(n=>n.classList.remove('selected-from'));
    document.querySelectorAll('.org-node-drag.connect-hover').forEach(n=>n.classList.remove('connect-hover'));
    const hint=document.getElementById('org-hint');
    if(hint)hint.textContent='Clique no 1º nó (origem) → clique no 2º nó (destino).';
  }
}

function initOrgDrag(){
  const wrap=document.getElementById('orgWrap');
  const canvas=document.getElementById('orgCanvas');
  if(!wrap||!canvas)return;

  // Inicializar posições
  // Versão do layout — se mudar, força reset automático
  const LAYOUT_VER='v3-hier';
  const layoutVer=localStorage.getItem('orgLayoutVer');
  if(!Object.keys(orgPositions).length||layoutVer!==LAYOUT_VER){
    orgPositions=defaultPositions();
    lss('orgPos_v2',orgPositions);
    localStorage.setItem('orgLayoutVer',LAYOUT_VER);
  }

  // Renderizar nós
  renderOrgNodes();
  drawOrgConnections();

  // ── CANVAS PANNING ──
  wrap.addEventListener('mousedown',e=>{
    if(connectMode)return; // em modo conexão, não fazer pan
    if(e.target===wrap||e.target===canvas||e.target.tagName==='svg'||e.target.tagName==='SVG'){
      orgIsPanning=true;
      orgPanStart={x:e.clientX,y:e.clientY};
      orgPanOrigin={x:orgOffX,y:orgOffY};
      canvas.classList.add('panning');
      e.preventDefault();
    }
  });
  window.addEventListener('mousemove',onOrgMouseMove);
  window.addEventListener('mouseup',onOrgMouseUp);

  // ── ZOOM ──
  wrap.addEventListener('wheel',e=>{
    e.preventDefault();
    const rect=wrap.getBoundingClientRect();
    const mx=e.clientX-rect.left,my=e.clientY-rect.top;
    const delta=e.deltaY>0?0.9:1.1;
    const newScale=Math.min(Math.max(orgScale*delta,0.25),2.5);
    // Zoom centrado no cursor
    orgOffX=mx-(mx-orgOffX)*newScale/orgScale;
    orgOffY=my-(my-orgOffY)*newScale/orgScale;
    orgScale=newScale;
    applyOrgTransform();
    drawOrgConnections();
  },{passive:false});
}

function onOrgMouseMove(e){
  if(orgIsPanning&&!orgDragNode){
    orgOffX=orgPanOrigin.x+(e.clientX-orgPanStart.x);
    orgOffY=orgPanOrigin.y+(e.clientY-orgPanStart.y);
    applyOrgTransform();
    drawOrgConnections();
  }
  if(orgDragNode){
    orgDidDrag=true;
    const dx=(e.clientX-orgDragStart.x)/orgScale;
    const dy=(e.clientY-orgDragStart.y)/orgScale;
    const newX=orgDragNodeOrigin.x+dx;
    const newY=orgDragNodeOrigin.y+dy;
    orgPositions[orgDragNode]=({x:Math.max(0,Math.min(newX,CANVAS_W-NODE_W)),y:Math.max(0,Math.min(newY,CANVAS_H-200))});
    const el=document.getElementById('orgn_'+orgDragNode);
    if(el){el.style.left=orgPositions[orgDragNode].x+'px';el.style.top=orgPositions[orgDragNode].y+'px';}
    drawOrgConnections();
  }
}

function onOrgMouseUp(e){
  if(orgIsPanning){orgIsPanning=false;const canvas=document.getElementById('orgCanvas');if(canvas)canvas.classList.remove('panning');}
  if(orgDragNode){
    const el=document.getElementById('orgn_'+orgDragNode);
    if(el)el.classList.remove('dragging');
    lss('orgPos_v2',orgPositions);lss('orgConns',orgConnections);lss('notas',notas);lss('aiHistory',aiHistory);
    orgDragNode=null;
  }
}

function applyOrgTransform(){
  const canvas=document.getElementById('orgCanvas');
  if(canvas)canvas.style.transform=`translate(${orgOffX}px,${orgOffY}px) scale(${orgScale})`;
  const svg=document.getElementById('orgSvg');
  if(svg)svg.style.transform=`translate(${orgOffX}px,${orgOffY}px) scale(${orgScale})`;
}

function renderOrgNodes(){
  const canvas=document.getElementById('orgCanvas');
  if(!canvas)return;
  canvas.innerHTML='';
  canvas.style.transformOrigin='0 0';
  canvas.style.width=CANVAS_W+'px';
  canvas.style.height=CANVAS_H+'px';

  const allNodes=[
    ...DIVISION_NODES,
    ...colaboradores.map(c=>({id:'c_'+c.id,col:c})),
  ];

  allNodes.forEach(node=>{
    const pos=getPos(node.id);
    const el=document.createElement('div');
    el.id='orgn_'+node.id;
    el.className='org-node-drag'+(node.isCoord?' coord':node.isDivisao?' divisao':'');
    el.style.left=pos.x+'px';
    el.style.top=pos.y+'px';

    if(node.isDivisao){
      el.style.borderColor=node.cor;
      el.style.background=node.bg;
      el.innerHTML=`<div style="font-size:13px;font-weight:700;color:${node.cor};text-align:center">${node.label}</div>
        <div style="font-size:9.5px;color:${node.cor};opacity:.75;text-align:center;margin-top:3px">${node.sublabel}</div>`;
    } else {
      const c=node.col;
      const ns=NIVEL_STYLE[c.nivel]||{cor:'#888',bg:'#eee'};
      const ac=AREA_COLORS[c.area]||{cor:'#888',bg:'#eee'};
      // Calcular carga do colaborador
      const funcoesV8=ls('funcoes_v8',[]);
      const cargaMin=funcoesV8.reduce((acc,f)=>{
        const resp=(f.responsaveis||[]).find(r=>r.nome===c.nome);
        return acc+(resp?calcCargaFuncao(f,qtdServicos)*(resp.pct/100):0);
      },0);
      const pctCarga=Math.round(cargaMin/(8*60*22)*100);
      const corCarga=pctCarga>=100?'#A32D2D':pctCarga>=80?'#854F0B':pctCarga>=60?'#185FA5':'#1D9E75';
      el.innerHTML=
        '<div class="nd-nivel" style="color:'+ns.cor+';background:'+ns.bg+';border-color:'+ns.cor+'60">'+c.nivel+'</div>'+
        '<div class="nd-nome">'+c.nome.split(' ').slice(0,2).join(' ')+'</div>'+
        '<div class="nd-area" style="background:'+ac.bg+';color:'+ac.cor+'">'+c.area+'</div>'+
        (pctCarga>0?'<div style="font-size:9px;font-weight:700;color:'+corCarga+';margin-top:2px">'+pctCarga+'% ocupação</div>':'');
    }

    // Drag eventos no nó
    el.addEventListener('mousedown',e=>{
      if(connectMode){e.stopPropagation();return;}
      e.stopPropagation();
      orgDidDrag=false;
      orgDragNode=node.id;
      orgDragStart={x:e.clientX,y:e.clientY};
      orgDragNodeOrigin={...getPos(node.id)};
      el.classList.add('dragging');
    });

    // Click para abrir perfil (só se não arrastou)
    el.addEventListener('click',e=>{
      e.stopPropagation();
      if(connectMode){
        handleConnectClick(node.id,el);
        return;
      }
      if(orgDidDrag)return;
      if(!node.isDivisao&&node.col)verCol(node.col.id);
    });
    el.addEventListener('mouseenter',()=>{
      if(connectMode&&connectFrom&&connectFrom!==node.id)
        el.classList.add('connect-hover');
    });
    el.addEventListener('mouseleave',()=>{
      el.classList.remove('connect-hover');
    });

    canvas.appendChild(el);
  });
}

function drawOrgConnections(){
  const svg=document.getElementById('orgSvg');if(!svg)return;
  svg.style.transformOrigin='0 0';svg.style.width=CANVAS_W+'px';svg.style.height=CANVAS_H+'px';
  svg.innerHTML='';

  // Defs: seta roxa para linhas manuais
  const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
  const marker=document.createElementNS('http://www.w3.org/2000/svg','marker');
  marker.setAttribute('id','arr');marker.setAttribute('viewBox','0 0 10 10');
  marker.setAttribute('refX','9');marker.setAttribute('refY','5');
  marker.setAttribute('markerWidth','6');marker.setAttribute('markerHeight','6');
  marker.setAttribute('orient','auto-start-reverse');
  const mp=document.createElementNS('http://www.w3.org/2000/svg','path');
  mp.setAttribute('d','M1 1L9 5L1 9');mp.setAttribute('fill','none');
  mp.setAttribute('stroke','#534AB7');mp.setAttribute('stroke-width','1.5');mp.setAttribute('stroke-linejoin','round');
  marker.appendChild(mp);defs.appendChild(marker);svg.appendChild(defs);

  // Linhas hierárquicas automáticas (cinza pontilhado, de baixo do pai ao topo do filho)
  buildConnections().forEach(conn=>{
    const fp=getPos(conn.from),tp=getPos(conn.to);if(!fp||!tp)return;
    const fromEl=document.getElementById('orgn_'+conn.from);
    const toEl=document.getElementById('orgn_'+conn.to);
    const fw=fromEl?fromEl.offsetWidth:NODE_W,fh=fromEl?fromEl.offsetHeight:80;
    const tw=toEl?toEl.offsetWidth:NODE_W;
    const x1=fp.x+fw/2,y1=fp.y+fh,x2=tp.x+tw/2,y2=tp.y,mid=(y1+y2)/2;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`);
    // Cor da linha baseada na divisão de origem
    const divColors={'div_coord':'#3B6D11','div_emc':'#185FA5','div_rf':'#854F0B','div_redes':'#085041','div_bat':'#7C3D8F','div_outros':'#0F766E','div_entrada':'#5F5E5A'};
    const lineColor=divColors[conn.from]||'#aaa';
    const isToDiv=conn.to.startsWith('div_');
    path.setAttribute('fill','none');
    path.setAttribute('stroke',isToDiv?lineColor:'rgba(0,0,0,0.12)');
    path.setAttribute('stroke-width',isToDiv?'2.5':'1.5');
    path.setAttribute('stroke-dasharray',isToDiv?'none':'4 4');
    if(isToDiv){path.setAttribute('opacity','0.7');}
    svg.appendChild(path);
  });

  // Linhas manuais (roxo, com seta, clicáveis para excluir, de centro a centro)
  orgConnections.forEach(conn=>{
    const fp=getPos(conn.from),tp=getPos(conn.to);if(!fp||!tp)return;
    const fromEl=document.getElementById('orgn_'+conn.from);
    const toEl=document.getElementById('orgn_'+conn.to);
    const fw=fromEl?fromEl.offsetWidth:NODE_W,fh=fromEl?fromEl.offsetHeight:80;
    const tw=toEl?toEl.offsetWidth:NODE_W,th=toEl?toEl.offsetHeight:80;
    // Conectar do centro do nó de origem ao centro do nó de destino
    const x1=fp.x+fw/2,y1=fp.y+fh/2,x2=tp.x+tw/2,y2=tp.y+th/2;

    const g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.style.cursor='pointer';
    g.setAttribute('title','Clique para excluir esta conexão');
    g.addEventListener('click',()=>{
      if(confirm('Excluir esta conexão?')){
        orgConnections=orgConnections.filter(c=>c.id!==conn.id);
        lss('orgConns',orgConnections);drawOrgConnections();
      }
    });

    // Área de clique invisível mais larga
    const hit=document.createElementNS('http://www.w3.org/2000/svg','line');
    hit.setAttribute('x1',x1);hit.setAttribute('y1',y1);hit.setAttribute('x2',x2);hit.setAttribute('y2',y2);
    hit.setAttribute('stroke','transparent');hit.setAttribute('stroke-width','14');
    g.appendChild(hit);

    // Linha visível roxa
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',x1);line.setAttribute('y1',y1);line.setAttribute('x2',x2);line.setAttribute('y2',y2);
    line.setAttribute('stroke','rgba(83,74,183,0.8)');line.setAttribute('stroke-width','2.5');
    line.setAttribute('marker-end','url(#arr)');
    g.appendChild(line);

    // Rótulo opcional sobre a linha
    if(conn.label&&conn.label){
      const mx=(x1+x2)/2,my=(y1+y2)/2;
      const txt=conn.label;
      const bw=txt.length*7+16,bh=18;
      const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x',mx-bw/2);rect.setAttribute('y',my-bh/2);
      rect.setAttribute('width',bw);rect.setAttribute('height',bh);
      rect.setAttribute('rx','9');rect.setAttribute('fill','#EEEDFE');
      rect.setAttribute('stroke','rgba(83,74,183,0.35)');rect.setAttribute('stroke-width','0.5');
      const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
      lbl.setAttribute('x',mx);lbl.setAttribute('y',my);
      lbl.setAttribute('text-anchor','middle');lbl.setAttribute('dominant-baseline','central');
      lbl.setAttribute('font-size','10');lbl.setAttribute('fill','#534AB7');lbl.setAttribute('font-weight','700');
      lbl.textContent=txt;
      g.appendChild(rect);g.appendChild(lbl);
    }
    svg.appendChild(g);
  });
}

function centerOrg(){
  orgOffX=0;orgOffY=0;orgScale=0.55;
  applyOrgTransform();drawOrgConnections();
}

function resetOrgLayout(){
  if(!confirm('Resetar todas as posições do organograma?'))return;
  orgPositions=defaultPositions();
  lss('orgPos_v2',orgPositions);lss('orgConns',orgConnections);lss('notas',notas);lss('aiHistory',aiHistory);
  localStorage.setItem('orgLayoutVer','v3-hier');
  renderOrgNodes();
  drawOrgConnections();
  centerOrg();
  toast('Layout resetado!');
}

// Inicializar com zoom reduzido para caber tudo
setTimeout(()=>{if(currentPage==='organograma'){centerOrg();}},100);

// ══════════════════════════════════════════
// FUNÇÕES
// ══════════════════════════════════════════


// Drag-to-scroll para a área de funções

