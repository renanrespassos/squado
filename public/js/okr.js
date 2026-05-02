
// ══════════════════════════════════════════
// OKR — Objectives & Key Results (por área)
// ══════════════════════════════════════════

function renderOKR(search){
  var okrs = metas.filter(function(m){ return m.tipo === 'okr'; });
  var q = (search||'').toLowerCase();
  var areas = Object.keys(AREA_COLORS);

  // Progresso OKR
  function okrPct(okr){
    var krs = okr.keyResults||[];
    if(!krs.length) return 0;
    var soma = krs.reduce(function(a,kr){
      var alvo=parseFloat(kr.alvo)||1;
      var atual=parseFloat(kr.atual)||0;
      return a + Math.min(100, Math.round(atual/alvo*100));
    },0);
    return Math.round(soma/krs.length);
  }

  // Agrupar OKRs por área
  var okrsPorArea = {};
  okrs.forEach(function(o){
    var key = o.area || '_sem_area';
    if(!okrsPorArea[key]) okrsPorArea[key] = [];
    okrsPorArea[key].push(o);
  });

  // Filtrar áreas por busca
  var areasFiltradas = areas;
  if(q){
    areasFiltradas = areas.filter(function(a){
      var areaMatch = a.toLowerCase().includes(q);
      var okrsArea = okrsPorArea[a]||[];
      var okrMatch = okrsArea.some(function(o){ return (o.objetivo||'').toLowerCase().includes(q); });
      return areaMatch || okrMatch;
    });
  }

  // Stats
  var totalOkrs = okrs.length;
  var totalKrs = okrs.reduce(function(a,o){return a+(o.keyResults||[]).length;},0);
  var pctMedOkr = totalOkrs ? Math.round(okrs.reduce(function(a,o){return a+okrPct(o);},0)/totalOkrs) : 0;
  var areasSemOkr = areas.filter(function(a){ return !(okrsPorArea[a]&&okrsPorArea[a].length); }).length;

  // Card de área com seus OKRs
  function cardArea(area){
    var cor = AREA_COLORS[area]||{cor:'#888',bg:'#eee'};
    var meusOkrs = okrsPorArea[area]||[];
    var temOkr = meusOkrs.length > 0;

    var html = '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;overflow:hidden">'
      // Header da área
      +'<div style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:0.5px solid var(--border)">'
        +'<div style="width:36px;height:36px;border-radius:10px;background:'+cor.bg+';color:'+cor.cor+';display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0">'+area.slice(0,2).toUpperCase()+'</div>'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:13px;font-weight:700;color:var(--txt)">'+area+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+colaboradores.filter(function(c){return c.area===area;}).length+' colaboradores</div>'
        +'</div>';

    if(temOkr){
      var pctArea = Math.round(meusOkrs.reduce(function(a,o){return a+okrPct(o);},0)/meusOkrs.length);
      var corPct = pctArea>=80?'var(--green)':pctArea>=50?'#854F0B':'#185FA5';
      html += '<span style="font-size:12px;font-weight:700;color:'+corPct+'">'+pctArea+'%</span>'
        +'<span style="font-size:10px;padding:2px 8px;border-radius:12px;background:'+cor.bg+';color:'+cor.cor+';font-weight:600">'+meusOkrs.length+' OKR'+(meusOkrs.length>1?'s':'')+'</span>';
    } else {
      html += '<span style="font-size:10px;padding:2px 8px;border-radius:12px;background:var(--bg3);color:var(--txt3);font-weight:600">Sem OKR</span>';
    }

    html += '</div>';

    // Lista de OKRs da área
    if(temOkr){
      html += '<div style="padding:8px 14px">';
      meusOkrs.forEach(function(okr){
        var pct = okrPct(okr);
        var corP = pct>=80?'var(--green)':pct>=50?'#854F0B':'#A32D2D';
        var krs = okr.keyResults||[];

        html += '<div style="padding:8px 0;border-bottom:0.5px solid var(--border)">'
          // Objetivo + progresso
          +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
            +'<span style="font-size:14px">🎯</span>'
            +'<div style="flex:1;font-size:12px;font-weight:700;color:var(--txt)">'+okr.objetivo+'</div>'
            +(okr.periodo?'<span style="font-size:9px;color:var(--txt3);background:var(--bg2);padding:1px 6px;border-radius:8px">'+okr.periodo+'</span>':'')
            +'<span style="font-size:13px;font-weight:800;color:'+corP+'">'+pct+'%</span>'
          +'</div>'
          // Barra geral
          +'<div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden;margin-bottom:6px">'
            +'<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:2px"></div>'
          +'</div>'
          // KRs compactos
          +'<div style="display:flex;flex-direction:column;gap:3px;margin-bottom:6px">';

        krs.forEach(function(kr,i){
          var alvo=parseFloat(kr.alvo)||1;
          var atual=parseFloat(kr.atual)||0;
          var krPct=Math.min(100,Math.round(atual/alvo*100));
          var krCor=krPct>=100?'var(--green)':krPct>=60?'#854F0B':'#185FA5';
          html += '<div style="display:flex;align-items:center;gap:6px;font-size:11px">'
            +'<span style="width:14px;height:14px;border-radius:50%;background:'+krCor+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;flex-shrink:0">'+(i+1)+'</span>'
            +'<span style="flex:1;color:var(--txt2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+kr.titulo+'</span>'
            +'<div style="width:60px;height:3px;background:var(--bg3);border-radius:2px;overflow:hidden;flex-shrink:0"><div style="height:100%;width:'+krPct+'%;background:'+krCor+'"></div></div>'
            +'<span style="font-weight:700;color:'+krCor+';width:28px;text-align:right">'+krPct+'%</span>'
          +'</div>';
        });

        html += '</div>'
          // Ações
          +'<div style="display:flex;gap:4px">'
            +'<button class="btn btn-xs" onclick="openOKRForm(\''+okr.id+'\')" style="padding:1px 6px;font-size:10px">✏️</button>'
            +'<button class="btn btn-xs btn-primary" onclick="editarKRs(\''+okr.id+'\')" style="padding:1px 6px;font-size:10px">📊 KRs</button>'
          +'</div>'
        +'</div>';
      });

      html += '<button class="btn btn-xs btn-primary" onclick="openOKRFormArea(\''+area+'\')" style="margin-top:6px;width:100%;font-size:10px">🎯 + Novo OKR</button>';
      html += '</div>';
    } else {
      html += '<div style="padding:10px 14px">'
        +'<button class="btn btn-primary btn-sm" onclick="openOKRFormArea(\''+area+'\')" style="width:100%">🎯 Criar OKR</button>'
      +'</div>';
    }

    html += '</div>';
    return html;
  }

  return '<div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">'
      +'<div style="font-size:12px;color:var(--txt3)">'+totalOkrs+' objetivos · '+totalKrs+' key results · '+areas.length+' áreas</div>'
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-primary btn-sm" onclick="openOKRForm()">+ Novo OKR</button>'
        +'<button class="btn btn-sm" onclick="gerarOKRsIA()" style="border-color:#534AB7;color:#534AB7">🤖 Sugerir com IA</button>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:18px">'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--blue)">'+totalOkrs+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Objectives</div>'
      +'</div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--txt)">'+totalKrs+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Key Results</div>'
      +'</div>'
      +'<div style="background:'+(pctMedOkr>=70?'var(--green-bg)':'#FAEEDA')+';border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:'+(pctMedOkr>=70?'var(--green)':'#854F0B')+'">'+pctMedOkr+'%</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Progresso médio</div>'
      +'</div>'
      +'<div style="background:#FAEEDA;border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:#854F0B">'+areasSemOkr+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Áreas sem OKR</div>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">'
      +areasFiltradas.map(cardArea).join('')
    +'</div>'
  +'</div>';
}

// ── Formulário OKR pré-selecionando área ───────────────────────
function openOKRFormArea(area){
  openOKRForm(null, area);
}

function openOKRForm(id, preArea){
  id=id||null;
  var m=id?metas.find(function(x){return x.id===id;}):null;
  var isNew=!id;
  var areas=Object.keys(AREA_COLORS);
  var krs=m?m.keyResults||[]:[{titulo:'',alvo:'',atual:'',unidade:''}];
  var selArea = (m && m.area) || preArea || '';

  document.getElementById('modal-title').textContent=isNew?'🎯 Novo OKR':'🎯 Editar OKR';
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div class="form-grid mb-12">'
      +'<div class="field-group form-full"><div class="field-label">🎯 Objetivo (O) — O que queremos alcançar?</div>'
        +'<input id="okr-obj" value="'+(m&&m.objetivo||'')+'" placeholder="Ex: Aumentar a capacidade de ensaios EMC"/></div>'
      +'<div class="field-group"><div class="field-label">Área</div>'
        +'<select id="okr-area">'+areas.map(function(a){return'<option value="'+a+'"'+(selArea===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select></div>'
      +'<div class="field-group"><div class="field-label">Período</div>'
        +'<input id="okr-periodo" value="'+(m&&m.periodo||'')+'" placeholder="Ex: Q1 2025, Jan–Mar 2025"/></div>'
    +'</div>'
    +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">📊 Key Results — Como vamos medir?</div>'
    +'<div id="kr-list">'+krs.map(function(kr,i){return renderKRRow(kr,i);}).join('')+'</div>'
    +'<button class="btn btn-sm" onclick="addKRRow()">+ Adicionar Key Result</button>'
    +'<div class="flex gap-8 mt-16 justify-between">'
      +(id?'<button class="btn btn-danger btn-sm" onclick="delOKR(\''+id+'\')">Excluir</button>':'<div></div>')
      +'<div class="flex gap-8">'
        +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
        +'<button class="btn btn-primary btn-sm" onclick="salvarMetaOKR(\''+(id||'')+'\')">💾 Salvar OKR</button>'
      +'</div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

// ── KR helpers ─────────────────────────────────────────────────
function renderKRRow(kr,i){
  return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:6px;display:flex;gap:8px;align-items:center" id="kr-row-'+i+'">'
    +'<span style="width:20px;height:20px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">'+(typeof i==="number"?i+1:'?')+'</span>'
    +'<input placeholder="KR *" data-kr-titulo="'+i+'" value="'+(kr&&kr.titulo||'')+'" style="font-size:12px;flex:2;min-width:0"/>'
    +'<input placeholder="Alvo" data-kr-alvo="'+i+'" type="number" value="'+(kr&&kr.alvo||'')+'" style="font-size:12px;width:65px"/>'
    +'<input placeholder="Atual" data-kr-atual="'+i+'" type="number" value="'+(kr&&kr.atual||'')+'" style="font-size:12px;width:60px"/>'
    +'<input placeholder="Un." data-kr-unidade="'+i+'" value="'+(kr&&kr.unidade||'')+'" style="font-size:12px;width:50px"/>'
    +'<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()" style="flex-shrink:0">00d7</button>'
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

// ── Salvar OKR ─────────────────────────────────────────────────
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
  if(id){var idx=metas.findIndex(function(x){return x.id===id;});if(idx>=0)metas[idx]=nova;else metas.push(nova);}
  else metas.push(nova);
  saveAll();
  (async function(){
    try{
      if(nova.dbId){ await apiCall('PUT','/api/metas/'+nova.dbId,{tipo:'okr',titulo:nova.titulo||nova.objetivo,objetivo:nova.objetivo,area:nova.area,periodo:nova.periodo,key_results:nova.keyResults||[],status:nova.status||'Em andamento',progresso:nova.progresso||0}); }
      else{ var r=await apiCall('POST','/api/metas',{tipo:'okr',titulo:nova.titulo||nova.objetivo,objetivo:nova.objetivo,area:nova.area,periodo:nova.periodo,key_results:nova.keyResults||[],status:nova.status||'Em andamento',progresso:nova.progresso||0}); if(r&&r.id){nova.dbId=r.id;lss('metas_v2',metas);} }
    }catch(e){console.warn('OKR sync err',e);}
  })();
  closeModal();toast('OKR salvo! 🎯');render('okr');
}

// ── Excluir OKR ────────────────────────────────────────────────
function delOKR(id){
  if(!confirm('Excluir este OKR?'))return;
  var meta = metas.find(function(x){return x.id===id;});
  metas=metas.filter(function(x){return x.id!==id;});
  saveAll();
  var dbId=(meta&&(meta.dbId||meta.id));
  if(dbId) apiCall('DELETE','/api/metas/'+dbId).catch(function(e){console.warn('del okr err',e);});
  closeModal();toast('OKR excluído!');render('okr');
}

// ── Editar KRs ─────────────────────────────────────────────────
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
          '<button class="btn btn-xs '+(done?'btn-primary':'')+'" onclick="document.getElementById(\'kr-atual-'+i+'\').value=document.getElementById(\'kr-alvo-'+i+'\').value" style="margin-bottom:2px">'+(done?'Concluído':'Concluir')+'</button>'+
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

// ── Salvar KRs ─────────────────────────────────────────────────
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
  var calcPct=0;var krsLen=okr.keyResults.length;
  if(krsLen){var soma=0;for(var j=0;j<krsLen;j++){var a=parseFloat(okr.keyResults[j].alvo)||1;var c=parseFloat(okr.keyResults[j].atual)||0;soma+=Math.min(100,Math.round(c/a*100));}calcPct=Math.round(soma/krsLen);}
  okr.progresso=calcPct;
  if(okr.dbId){apiCall('PUT','/api/metas/'+okr.dbId,{tipo:'okr',titulo:okr.titulo||'',objetivo:okr.objetivo||'',area:okr.area||'',periodo:okr.periodo||'',key_results:okr.keyResults||[],status:okr.status||'Pendente',progresso:calcPct}).catch(function(e){console.warn('sync KR err',e);});}
  closeModal();toast('Key Results atualizados!');render('okr');
}

// ═══ IA para OKR ═══
async function gerarOKRsIA(){
  var areasDisp=[...new Set(colaboradores.filter(function(c){return c.area&&c.status!=='Desligado';}).map(function(c){return c.area;}))];
  if(!areasDisp.length){toast('Cadastre áreas primeiro.');return;}

  document.getElementById('modal-title').textContent='🤖 Sugerir OKRs com IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="margin-bottom:12px;font-size:12px;color:var(--txt2)">A IA vai gerar objetivos com key results mensuráveis para cada área.</div>'
    +'<div class="field-group"><div class="field-label">Área</div>'
      +'<select id="ia-okr-area"><option value="">— Todas as áreas —</option>'
        +areasDisp.map(function(a){return '<option value="'+a+'">'+a+'</option>';}).join('')
      +'</select></div>'
    +'<div class="field-group"><div class="field-label">Período</div>'
      +'<select id="ia-okr-periodo"><option>Q2 2026</option><option>Q3 2026</option><option>2026</option><option>Semestre 1</option><option>Semestre 2</option></select></div>'
    +'<div class="field-group"><div class="field-label">Foco / Contexto (opcional)</div>'
      +'<input id="ia-okr-ctx" placeholder="Ex: Qualidade, produtividade, certificação, inovação..."/></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px">'
      +'<button class="btn btn-purple btn-sm" onclick="executarGeracaoOKRIA()">🤖 Gerar OKRs</button>'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

async function executarGeracaoOKRIA(){
  var area=(document.getElementById('ia-okr-area')||{}).value;
  var periodo=(document.getElementById('ia-okr-periodo')||{}).value||'Q2 2026';
  var ctx=(document.getElementById('ia-okr-ctx')||{}).value||'';

  closeModal();
  toast('🤖 Gerando OKRs com IA...');

  var areasGerar=area?[area]:[...new Set(colaboradores.filter(function(c){return c.area&&c.status!=='Desligado';}).map(function(c){return c.area;}))];
  var prompt='Gere OKRs para as seguintes áreas: '+areasGerar.join(', ')+'.\n';
  prompt+='Período: '+periodo+'\n';
  if(ctx) prompt+='Foco: '+ctx+'\n';
  prompt+='Retorne JSON: [{\"area\":\"...\",\"objetivo\":\"...\",\"keyResults\":[{\"titulo\":\"...\",\"alvo\":100,\"unidade\":\"...\"},{\"titulo\":\"...\",\"alvo\":100,\"unidade\":\"...\"}]}]\n';
  prompt+='Cada OKR deve ter 2-3 key results com alvos numéricos concretos.\nSem markdown. Apenas JSON.';

  try{
    var token=squadoGetToken();
    var r=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:[
        {role:'system',content:'Responda SOMENTE com JSON válido. Gere OKRs concretos e mensuráveis. Português brasileiro.'},
        {role:'user',content:prompt}
      ],max_tokens:2000})
    });
    var d=await r.json();
    var resposta=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
    var match=resposta.match(/\[[\s\S]*\]/);
    if(!match){toast('⚠️ IA não retornou JSON válido');return;}
    var sugestoes=JSON.parse(match[0]);

    var okrs=ls('okrs',[])||[];
    sugestoes.forEach(function(s){
      okrs.push({
        id:uid(),area:s.area||areasGerar[0],objetivo:s.objetivo||'Objetivo',
        periodo:periodo,status:'Em andamento',
        keyResults:(s.keyResults||[]).map(function(kr){
          return{id:uid(),titulo:kr.titulo||'KR',alvo:kr.alvo||100,atual:0,unidade:kr.unidade||'%'};
        })
      });
    });
    lss('okrs',okrs);
    saveAll();
    toast('✅ '+sugestoes.length+' OKRs gerados!');
    render('okr');
  }catch(e){
    toast('⚠️ Erro: '+e.message);
  }
}
