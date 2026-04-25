
// ══════════════════════════════════════════
// METAS
// ══════════════════════════════════════════
function renderMetas(search=''){
  // Separar OKRs de metas individuais
  const okrs  = metas.filter(m => m.tipo === 'okr');
  const smart = metas.filter(m => m.tipo !== 'okr');
  const todos  = [...metas];

  // Filtro de busca
  const q = search.toLowerCase();
  const filtOkr   = q ? okrs.filter(m => (m.objetivo||'').toLowerCase().includes(q) || (m.area||'').toLowerCase().includes(q)) : okrs;
  const filtSmart = q ? smart.filter(m => (m.titulo||'').toLowerCase().includes(q) || (m.colaborador||'').toLowerCase().includes(q)) : smart;

  // Cores de status
  function stBg(s){return{Pendente:'#FAEEDA','Em andamento':'#E6F1FB','Concluída':'#E1F5EE','Cancelada':'var(--bg3)','No prazo':'#E1F5EE','Em risco':'#FAEEDA','Atrasada':'#FCEBEB'}[s]||'var(--bg2)';}
  function stCor(s){return{Pendente:'#854F0B','Em andamento':'#185FA5','Concluída':'#0F6E56','Cancelada':'#888','No prazo':'#0F6E56','Em risco':'#854F0B','Atrasada':'#A32D2D'}[s]||'var(--txt2)';}

  // Calcular progresso de OKR (média dos KRs)
  function okrPct(okr){
    const krs = okr.keyResults||[];
    if(!krs.length) return 0;
    const soma = krs.reduce((a,kr)=>{
      const alvo=parseFloat(kr.alvo)||1;
      const atual=parseFloat(kr.atual)||0;
      return a + Math.min(100, Math.round(atual/alvo*100));
    },0);
    return Math.round(soma/krs.length);
  }

  // Card de OKR
  function cardOkr(okr){
    const pct = okrPct(okr);
    const corP = pct>=80?'var(--green)':pct>=50?'#854F0B':'#A32D2D';
    const krs = okr.keyResults||[];
    const c2 = AREA_COLORS[okr.area]||{cor:'#888',bg:'#eee'};
    return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px">'
      // Header
      +'<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px">'
        +'<div style="font-size:22px">🎯</div>'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:14px;font-weight:800;color:var(--txt);margin-bottom:3px">'+okr.objetivo+'</div>'
          +'<div style="display:flex;gap:6px;flex-wrap:wrap">'
            +(okr.area?'<span style="font-size:10px;font-weight:700;padding:1px 8px;border-radius:20px;background:'+c2.bg+';color:'+c2.cor+'">'+okr.area+'</span>':'')
            +(okr.periodo?'<span style="font-size:10px;color:var(--txt3);padding:1px 8px;border-radius:20px;background:var(--bg2)">📅 '+okr.periodo+'</span>':'')
          +'</div>'
        +'</div>'
        +'<div style="text-align:right;flex-shrink:0">'
          +'<div style="font-size:24px;font-weight:900;color:'+corP+'">'+pct+'%</div>'
          +'<div style="font-size:9px;color:var(--txt3)">progresso</div>'
        +'</div>'
      +'</div>'
      // Barra de progresso geral
      +'<div style="height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:14px">'
        +'<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:3px;transition:width .4s"></div>'
      +'</div>'
      // Key Results
      +'<div style="display:flex;flex-direction:column;gap:8px">'
        +krs.map((kr,i)=>{
          const alvo=parseFloat(kr.alvo)||1;
          const atual=parseFloat(kr.atual)||0;
          const krPct=Math.min(100,Math.round(atual/alvo*100));
          const krCor=krPct>=100?'var(--green)':krPct>=60?'#854F0B':'#185FA5';
          return '<div style="background:var(--bg2);border-radius:8px;padding:10px 12px">'
            +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
              +'<span style="font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;background:'+krCor+';color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</span>'
              +'<span style="font-size:12px;font-weight:600;color:var(--txt);flex:1">'+kr.titulo+'</span>'
              +'<span style="font-size:11px;font-weight:700;color:'+krCor+'">'+krPct+'%</span>'
            +'</div>'
            +'<div style="display:flex;align-items:center;gap:10px">'
              +'<div style="flex:1;height:5px;background:var(--bg3);border-radius:3px;overflow:hidden">'
                +'<div style="height:100%;width:'+krPct+'%;background:'+krCor+';border-radius:3px"></div>'
              +'</div>'
              +'<span style="font-size:11px;color:var(--txt3);white-space:nowrap;flex-shrink:0">'+atual+' / '+alvo+(kr.unidade?' '+kr.unidade:'')+'</span>'
            +'</div>'
          +'</div>';
        }).join('')
      +'</div>'
      // Ações
      +'<div style="display:flex;gap:6px;margin-top:12px;padding-top:10px;border-top:0.5px solid var(--border)">'
        +'<button class="btn btn-xs" onclick="openMetaForm(\''+okr.id+'\')">✏️ Editar</button>'
        +'<button class="btn btn-xs btn-primary" onclick="editarKRs(\''+okr.id+'\')">📊 Atualizar KRs</button>'
        +'<button class="btn btn-xs btn-danger" onclick="delMeta(\''+okr.id+'\')">×</button>'
      +'</div>'
    +'</div>';
  }

  // Card de Meta SMART
  function cardSmart(m){
    const pct = m.progresso||0;
    const corP = pct>=100?'var(--green)':pct>=60?'#854F0B':'#185FA5';
    const campos = [
      m.especifica   && {icon:'🎯',label:'Específica',val:m.especifica},
      m.mensuravel   && {icon:'📏',label:'Mensurável',val:m.mensuravel},
      m.atingivel    && {icon:'💪',label:'Atingível',val:m.atingivel},
      m.relevante    && {icon:'⭐',label:'Relevante',val:m.relevante},
      m.temporal     && {icon:'📅',label:'Temporal',val:m.temporal},
    ].filter(Boolean);
    return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;border-left:3px solid '+((AREA_COLORS[m.area||'']&&AREA_COLORS[m.area||''].cor)||'var(--blue)')+';">'
      // Header
      +'<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">'
        +av(m.colaborador||'Geral',false,false)
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:13px;font-weight:800;color:var(--txt)">'+m.titulo+'</div>'
          +'<div style="font-size:11px;color:var(--txt2);margin-top:2px">'+(m.colaborador||'Geral')+(m.prazo?' · Prazo: '+m.prazo:'')+'</div>'
        +'</div>'
        +'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">'
          +'<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:'+stBg(m.status||'Pendente')+';color:'+stCor(m.status||'Pendente')+'">'+(m.status||'Pendente')+'</span>'
          +'<span style="font-size:16px;font-weight:800;color:'+corP+'">'+pct+'%</span>'
        +'</div>'
      +'</div>'
      // Barra
      +'<div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:10px">'
        +'<div style="height:100%;width:'+Math.min(pct,100)+'%;background:'+corP+';border-radius:3px"></div>'
      +'</div>'
      // Critérios SMART
      +(campos.length?'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">'
        +campos.map(c=>'<div style="background:var(--bg2);border-radius:7px;padding:6px 8px">'
          +'<div style="font-size:9px;font-weight:700;color:var(--txt3);margin-bottom:2px">'+c.icon+' '+c.label+'</div>'
          +'<div style="font-size:11px;color:var(--txt);line-height:1.4">'+c.val+'</div>'
        +'</div>').join('')
      +'</div>':'')
      // Progresso slider + Ações
      +'<div style="display:flex;align-items:center;gap:8px">'
        +'<input type="range" min="0" max="100" value="'+pct+'" oninput="atualizarMetaPct(\''+m.id+'\',this.value);this.nextElementSibling.textContent=this.value+\'%\'" style="flex:1;accent-color:var(--green)" />'
        +'<span style="font-size:11px;font-weight:700;color:'+corP+';width:36px">'+pct+'%</span>'
        +'<button class="btn btn-xs" onclick="openMetaForm(\''+m.id+'\')">✏️</button>'
        +'<button class="btn btn-xs btn-danger" onclick="delMeta(\''+m.id+'\')">×</button>'
      +'</div>'
    +'</div>';
  }

  // Stats resumo
  const totalOkrs = okrs.length;
  const totalKrs  = okrs.reduce((a,o)=>a+(o.keyResults||[]).length,0);
  const pctMedOkr = totalOkrs ? Math.round(okrs.reduce((a,o)=>a+okrPct(o),0)/totalOkrs) : 0;
  const totalSmart= smart.length;
  const concluidas= smart.filter(m=>m.status==='Concluída').length;

  return '<div>'
    // Cabeçalho com stats
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center">'
        +'<div style="font-size:24px;font-weight:900;color:var(--blue)">'+totalOkrs+'</div>'
        +'<div style="font-size:10px;color:var(--txt2)">Objectives</div>'
      +'</div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center">'
        +'<div style="font-size:24px;font-weight:900;color:var(--txt)">'+totalKrs+'</div>'
        +'<div style="font-size:10px;color:var(--txt2)">Key Results</div>'
      +'</div>'
      +'<div style="background:'+(pctMedOkr>=70?'var(--green-bg)':'#FAEEDA')+';border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center">'
        +'<div style="font-size:24px;font-weight:900;color:'+(pctMedOkr>=70?'var(--green)':'#854F0B')+'">'+pctMedOkr+'%</div>'
        +'<div style="font-size:10px;color:var(--txt2)">Média OKRs</div>'
      +'</div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center">'
        +'<div style="font-size:24px;font-weight:900;color:var(--green)">'+concluidas+'/'+totalSmart+'</div>'
        +'<div style="font-size:10px;color:var(--txt2)">Metas SMART</div>'
      +'</div>'
    +'</div>'

    // Botões de criar
    +'<div style="display:flex;gap:8px;margin-bottom:18px">'
      +'<button class="btn btn-primary btn-sm" onclick="openMetaForm(null,\'okr\')">🎯 + Novo OKR</button>'
      +'<button class="btn btn-purple btn-sm" onclick="openMetaForm(null,\'smart\')">✅ + Meta SMART</button>'
    +'</div>'

    // OKRs
    +(filtOkr.length ? '<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">🎯 OKRs — Objectives & Key Results</div>'
      + filtOkr.map(cardOkr).join('')
      : (totalOkrs===0 && !q ? '' : '<div style="color:var(--txt3);font-size:12px;padding:8px">Nenhum OKR encontrado.</div>'))

    // Metas SMART
    +(filtSmart.length ? '<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.08em;margin:16px 0 10px">✅ Metas SMART Individuais</div>'
      + filtSmart.map(cardSmart).join('')
      : (totalSmart===0 && !q ? '' : ''))

    // Estado vazio
    +((totalOkrs===0 && totalSmart===0) ? '<div style="text-align:center;padding:48px 20px">'
        +'<div style="font-size:48px;margin-bottom:12px">🎯</div>'
        +'<div style="font-size:16px;font-weight:700;color:var(--txt);margin-bottom:6px">Nenhuma meta definida ainda</div>'
        +'<div style="font-size:13px;color:var(--txt3);margin-bottom:20px">Crie OKRs para objetivos estratégicos do laboratório<br>ou Metas SMART para desenvolvimento individual</div>'
        +'<div style="display:flex;gap:10px;justify-content:center">'
          +''
          +''
        +'</div>'
      +'</div>' : '')
  +'</div>';
}

// ══════════════════════════════════════════
// FEEDBACK
// ══════════════════════════════════════════


// ══════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DE IA — OLLAMA LOCAL / REMOTO
// ══════════════════════════════════════════════════════════════
// Padrões: Ollama local na porta 11434
const DEFAULT_OLLAMA_URL   = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3.2:1b'; // modelo ultra-leve ~1GB RAM


// ══════════════════════════════════════════════════════════════
// FUNÇÕES DE METAS — OKR + SMART
// ══════════════════════════════════════════════════════════════

function openMetaForm(id, tipoForcar){
  id=id||null; tipoForcar=tipoForcar||null;
  var m=id?metas.find(function(x){return x.id===id;}):null;
  var tipo=tipoForcar||(m&&m.tipo)||'okr';
  var isNew=!id;
  var areas=Object.keys(AREA_COLORS);
  var statuses=['Pendente','Em andamento','No prazo','Em risco','Atrasada','Concluída','Cancelada'];

  if(tipo==='okr'){
    document.getElementById('modal-title').textContent=isNew?'🎯 Novo OKR':'🎯 Editar OKR';
    document.getElementById('modal-box').classList.add('modal-lg');
    var krs=m?m.keyResults||[]:[{titulo:'',alvo:'',atual:'',unidade:''}];
    document.getElementById('modal-body').innerHTML=
      '<div class="form-grid mb-12">'
        +'<div class="field-group form-full"><div class="field-label">🎯 Objetivo (O) — O que queremos alcançar?</div>'
          +'<input id="okr-obj" value="'+(m&&m.objetivo||'')+'" placeholder="Ex: Aumentar a capacidade de ensaios EMC"/></div>'
        +'<div class="field-group"><div class="field-label">Área</div>'
          +'<select id="okr-area">'+areas.map(function(a){return'<option value="'+a+'"'+(m&&m.area===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select></div>'
        +'<div class="field-group"><div class="field-label">Período</div>'
          +'<input id="okr-periodo" value="'+(m&&m.periodo||'')+'" placeholder="Ex: Q1 2025, Jan–Mar 2025"/></div>'
      +'</div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">📊 Key Results — Como vamos medir?</div>'
      +'<div id="kr-list">'+krs.map(function(kr,i){return renderKRRow(kr,i);}).join('')+'</div>'
      +'<button class="btn btn-sm" onclick="addKRRow()">+ Adicionar Key Result</button>'
      +'<div class="flex gap-8 mt-16 justify-between">'
        +(id?'<button class="btn btn-danger btn-sm" onclick="delMeta(\''+id+'\')">Excluir</button>':'<div></div>')
        +'<div class="flex gap-8">'
          +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
          +'<button class="btn btn-primary btn-sm" onclick="salvarMetaOKR(\''+( id||'')+'\')">💾 Salvar OKR</button>'
        +'</div>'
      +'</div>';
  } else {
    document.getElementById('modal-title').textContent=isNew?'✅ Nova Meta SMART':'✅ Editar Meta SMART';
    document.getElementById('modal-box').classList.add('modal-lg');
    document.getElementById('modal-body').innerHTML=
      '<div style="background:var(--blue-bg);border-radius:8px;padding:10px 13px;margin-bottom:14px;font-size:12px;color:var(--blue)">'
        +'<strong>Método SMART:</strong> Específica · Mensurável · Atingível · Relevante · Temporal'
      +'</div>'
      +'<div class="form-grid mb-12">'
        +'<div class="field-group form-full"><div class="field-label">Título da Meta *</div>'
          +'<input id="sm-titulo" value="'+(m&&m.titulo||'')+'" placeholder="Ex: Reduzir tempo médio de emissão de relatórios em 30%"/></div>'
        +'<div class="field-group"><div class="field-label">Colaborador</div>'
          +'<select id="sm-col"><option value="">— Toda a equipe —</option>'
            +colaboradores.map(function(c){return'<option value="'+c.id+'"'+(m&&m.colId===c.id?' selected':'')+'>'+c.nome+'</option>';}).join('')
          +'</select></div>'
        +'<div class="field-group"><div class="field-label">Prazo</div>'
          +'<input id="sm-prazo" type="date" value="'+(m&&m.prazo||'')+'" /></div>'
        +'<div class="field-group"><div class="field-label">Status</div>'
          +'<select id="sm-status">'+statuses.map(function(s){return'<option'+(m&&m.status===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select></div>'
        +'<div class="field-group form-full"><div class="field-label">🎯 Específica — O que exatamente?</div>'
          +'<textarea id="sm-esp" placeholder="Descreva com clareza o que deve ser atingido">'+(m&&m.especifica||'')+'</textarea></div>'
        +'<div class="field-group form-full"><div class="field-label">📏 Mensurável — Como vamos medir?</div>'
          +'<input id="sm-men" value="'+(m&&m.mensuravel||'')+'" placeholder="Ex: Tempo médio < 48h, NPS > 4.5"/></div>'
        +'<div class="field-group form-full"><div class="field-label">💪 Atingível — É realista?</div>'
          +'<input id="sm-ati" value="'+(m&&m.atingivel||'')+'" placeholder="Ex: Temos os recursos e treinamento necessários"/></div>'
        +'<div class="field-group form-full"><div class="field-label">⭐ Relevante — Por que importa?</div>'
          +'<input id="sm-rel" value="'+(m&&m.relevante||'')+'" placeholder="Ex: Impacta na satisfação do cliente e acreditação"/></div>'
        +'<div class="field-group form-full"><div class="field-label">📅 Temporal — Quando?</div>'
          +'<input id="sm-tem" value="'+(m&&m.temporal||'')+'" placeholder="Ex: Até final do Q2 2025, com revisão mensal"/></div>'
        +'<div class="field-group form-full"><div class="field-label">Progresso: <span id="sm-pv">'+(m&&m.progresso||0)+'</span>%</div>'
          +'<input type="range" min="0" max="100" value="'+(m&&m.progresso||0)+'" id="sm-prog" oninput="document.getElementById(\'sm-pv\').textContent=this.value"/></div>'
      +'</div>'
      +'<div class="flex gap-8 mt-4 justify-between">'
        +(id?'<button class="btn btn-danger btn-sm" onclick="delMeta(\''+id+'\')">Excluir</button>':'<div></div>')
        +'<div class="flex gap-8">'
          +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
          +'<button class="btn btn-purple btn-sm" onclick="salvarMetaSMART(\''+( id||'')+'\')">💾 Salvar Meta SMART</button>'
        +'</div>'
      +'</div>';
  }
  document.getElementById('modal').style.display='flex';
}

function renderKRRow(kr,i){
  return '<div style="background:var(--bg2);border-radius:8px;padding:10px 12px;margin-bottom:8px;display:grid;grid-template-columns:1fr auto;gap:8px" id="kr-row-'+i+'">'
    +'<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:6px;align-items:center">'
      +'<input placeholder="Descrição do Key Result *" data-kr-titulo="'+i+'" value="'+(kr&&kr.titulo||'')+'" style="font-size:12px"/>'
      +'<input placeholder="Meta alvo" data-kr-alvo="'+i+'" type="number" value="'+(kr&&kr.alvo||'')+'" style="font-size:12px"/>'
      +'<input placeholder="Atual" data-kr-atual="'+i+'" type="number" value="'+(kr&&kr.atual||'')+'" style="font-size:12px"/>'
      +'<input placeholder="Unidade" data-kr-unidade="'+i+'" value="'+(kr&&kr.unidade||'')+'" style="font-size:12px"/>'
    +'</div>'
    +'<button class="btn btn-xs btn-danger" onclick="this.closest(\'[id^=kr-row]\').remove()" style="align-self:center">×</button>'
  +'</div>';
}

function addKRRow(){
  var list=document.getElementById('kr-list');
  if(!list)return;
  var i=Date.now();
  var div=document.createElement('div');
  div.innerHTML=renderKRRow({},i);
  list.appendChild(div.firstElementChild);
}

function salvarMetaOKR(id){
  var obj=document.getElementById('okr-obj');
  var objVal=(obj?obj.value:'');
  if(!objVal){alert('Informe o objetivo.');return;}
  var krs=[];
  document.querySelectorAll('#kr-list [data-kr-titulo]').forEach(function(el){
    var i=el.dataset.krTitulo;
    var titulo=(el.value||'').trim();
    if(!titulo)return;
    var alvo=document.querySelector('#kr-list [data-kr-alvo="'+i+'"]');
    var atual=document.querySelector('#kr-list [data-kr-atual="'+i+'"]');
    var unid=document.querySelector('#kr-list [data-kr-unidade="'+i+'"]');
    krs.push({id:uid(),titulo:titulo,alvo:alvo?alvo.value:'',atual:atual?atual.value:'',unidade:unid?unid.value:''});
  });
  var areaSel=document.getElementById('okr-area');
  var perSel=document.getElementById('okr-periodo');
  var nova={id:id||uid(),tipo:'okr',objetivo:objVal,
    area:areaSel?areaSel.value:'',
    periodo:perSel?perSel.value:'',
    keyResults:krs};
  if(id){var i=metas.findIndex(function(x){return x.id===id;});if(i>=0)metas[i]=nova;else metas.push(nova);}
  else metas.push(nova);
  saveAll();
  // Sync com banco
  (async()=>{
    try{
      if(nova.dbId){ await apiCall('PUT','/api/metas/'+nova.dbId,{tipo:'okr',titulo:nova.titulo||nova.objetivo,objetivo:nova.objetivo,area:nova.area,periodo:nova.periodo,key_results:nova.keyResults||[],status:nova.status||'Em andamento',progresso:nova.progresso||0}); }
      else{ const r=await apiCall('POST','/api/metas',{tipo:'okr',titulo:nova.titulo||nova.objetivo,objetivo:nova.objetivo,area:nova.area,periodo:nova.periodo,key_results:nova.keyResults||[],status:nova.status||'Em andamento',progresso:nova.progresso||0}); if(r&&r.id){nova.dbId=r.id;lss('metas_v2',metas);} }
    }catch(e){console.warn('OKR sync err',e);}
  })();
  closeModal();toast('OKR salvo! 🎯');render(currentPage);
}

function salvarMetaSMART(id){
  var tEl=document.getElementById('sm-titulo');
  var titulo=(tEl?tEl.value:'');
  if(!titulo){alert('Título obrigatório.');return;}
  function gv(elId){var e=document.getElementById(elId);return e?e.value:'';}
  var colSel=gv('sm-col');var colNome=colSel?(colaboradores.find(function(c){return c.id===colSel})||{}).nome||'':'';
  var nova={id:id||uid(),tipo:'smart',titulo:titulo,
    colId:colSel||null,colaborador:colNome,prazo:gv('sm-prazo'),
    status:gv('sm-status')||'Pendente',
    progresso:parseInt(gv('sm-prog'))||0,
    especifica:gv('sm-esp'),
    mensuravel:gv('sm-men'),
    atingivel:gv('sm-ati'),
    relevante:gv('sm-rel'),
    temporal:gv('sm-tem')};
  if(id){var i=metas.findIndex(function(x){return x.id===id;});if(i>=0)metas[i]=nova;else metas.push(nova);}
  else metas.push(nova);
  saveAll();
  (async()=>{
    try{
      if(nova.dbId){ await apiCall('PUT','/api/metas/'+nova.dbId,{tipo:'smart',colaborador_id:nova.colId||null,titulo:nova.titulo,status:nova.status,progresso:nova.progresso,prazo:nova.prazo,colaborador:nova.colaborador,especifica:nova.especifica,mensuravel:nova.mensuravel,atingivel:nova.atingivel,relevante:nova.relevante,temporal:nova.temporal}); }
      else{ const r=await apiCall('POST','/api/metas',{tipo:'smart',colaborador_id:nova.colId||null,titulo:nova.titulo,status:nova.status||'Pendente',progresso:nova.progresso||0,prazo:nova.prazo||null,colaborador:nova.colaborador||'',especifica:nova.especifica||'',mensuravel:nova.mensuravel||'',atingivel:nova.atingivel||'',relevante:nova.relevante||'',temporal:nova.temporal||''}); if(r&&r.id){nova.dbId=r.id;lss('metas_v2',metas);} }
    }catch(e){console.warn('SMART sync err',e);}
  })();
  closeModal();toast('Meta SMART salva! ✅');render(currentPage);
}

var _metaPctTimer={};
function atualizarMetaPct(id,val){
  var i=metas.findIndex(function(x){return x.id===id;});if(i<0)return;
  metas[i].progresso=parseInt(val)||0;
  saveAll();
  clearTimeout(_metaPctTimer[id]);
  _metaPctTimer[id]=setTimeout(function(){
    var m=metas.find(function(x){return x.id===id;});
    if(m&&m.dbId){apiCall('PUT','/api/metas/'+m.dbId,{tipo:m.tipo||'smart',colaborador_id:m.colId||null,titulo:m.titulo||'',status:m.status||'Pendente',progresso:m.progresso,prazo:m.prazo||null,colaborador:m.colaborador||'',especifica:m.especifica||'',mensuravel:m.mensuravel||'',atingivel:m.atingivel||'',relevante:m.relevante||'',temporal:m.temporal||''}).catch(function(e){console.warn('sync prog err',e);});}
  },800);
}

function delMeta(id){
  if(!confirm('Excluir esta meta/OKR?'))return;
  const meta = metas.find(x=>x.id===id);
  metas=metas.filter(function(x){return x.id!==id;});
  saveAll();
  var _metaDbId=(meta&&(meta.dbId||meta.id));if(_metaDbId) apiCall('DELETE','/api/metas/'+_metaDbId).catch(e=>console.warn('del meta err',e));
  closeModal();toast('Excluído!');render(currentPage);
}

function editarKRs(okrId){
  var okr=metas.find(function(m){return m.id===okrId;});
  if(!okr)return;
  var krs=okr.keyResults||[];
  document.getElementById('modal-title').textContent='Atualizar Key Results · '+okr.objetivo;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="display:flex;flex-direction:column;gap:12px;max-height:65vh;overflow-y:auto">'
    +krs.map(function(kr,i){
      var alvo=parseFloat(kr.alvo)||1;
      var atual=parseFloat(kr.atual)||0;
      var pct=Math.min(100,Math.round(atual/alvo*100));
      var done=pct>=100;
      return '<div style="background:var(--bg2);border-radius:10px;padding:14px;border-left:3px solid '+(done?'var(--green)':'#185FA5')+'">'+
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'+
          '<span style="font-size:10px;font-weight:700;width:20px;height:20px;border-radius:50%;background:'+(done?'var(--green)':'#185FA5')+';color:#fff;display:flex;align-items:center;justify-content:center">'+(i+1)+'</span>'+
          '<span style="font-size:13px;font-weight:600;flex:1">'+kr.titulo+'</span>'+
          '<span style="font-size:12px;font-weight:700;color:'+(done?'var(--green)':'var(--txt2)')+'">'+pct+'%</span>'+
        '</div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;align-items:end">'+
          '<div><div class="field-label">Atual</div><input type="number" id="kr-atual-'+i+'" value="'+atual+'" step="any" style="font-size:13px;width:100%"/></div>'+
          '<div><div class="field-label">Alvo</div><input type="number" id="kr-alvo-'+i+'" value="'+alvo+'" step="any" style="font-size:13px;width:100%"/></div>'+
          '<button class="btn btn-xs '+(done?'btn-primary':'')+'" onclick="document.getElementById(\'kr-atual-'+i+'\').value=document.getElementById(\'kr-alvo-'+i+'\').value" style="margin-bottom:2px">'+(done?'Concluido':'Concluir')+'</button>'+
        '</div>'+
        (kr.unidade?'<div style="font-size:10px;color:var(--txt3);margin-top:4px">Unidade: '+kr.unidade+'</div>':'')+
      '</div>';
    }).join('')
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      +'<button class="btn btn-primary" onclick="salvarKRs(\''+okrId+'\','+krs.length+')">Salvar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function salvarKRs(okrId,count){
  var okr=metas.find(function(m){return m.id===okrId;});
  if(!okr)return;
  for(var i=0;i<count;i++){
    var atualEl=document.getElementById('kr-atual-'+i);
    var alvoEl=document.getElementById('kr-alvo-'+i);
    if(atualEl)okr.keyResults[i].atual=atualEl.value;
    if(alvoEl)okr.keyResults[i].alvo=alvoEl.value;
  }
  saveAll();
  var calcPct=0;var krsLen=okr.keyResults.length;if(krsLen){var soma=0;for(var j=0;j<krsLen;j++){var a=parseFloat(okr.keyResults[j].alvo)||1;var c=parseFloat(okr.keyResults[j].atual)||0;soma+=Math.min(100,Math.round(c/a*100));}calcPct=Math.round(soma/krsLen);}
  okr.progresso=calcPct;
  if(okr.dbId){apiCall('PUT','/api/metas/'+okr.dbId,{tipo:'okr',titulo:okr.titulo||'',objetivo:okr.objetivo||'',area:okr.area||'',periodo:okr.periodo||'',key_results:okr.keyResults||[],status:okr.status||'Pendente',progresso:calcPct}).catch(function(e){console.warn('sync KR err',e);});}
  closeModal();toast('Key Results atualizados!');render(currentPage);
}
