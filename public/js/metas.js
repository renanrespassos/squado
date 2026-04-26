
// ══════════════════════════════════════════
// METAS SMART — Individuais
// ══════════════════════════════════════════
function renderMetas(search){
  var smart = metas.filter(function(m){ return m.tipo !== 'okr'; });
  var q = (search||'').toLowerCase();
  var filtSmart = q ? smart.filter(function(m){ return (m.titulo||'').toLowerCase().includes(q) || (m.colaborador||'').toLowerCase().includes(q); }) : smart;

  // Cores de status
  function stBg(s){return{Pendente:'#FAEEDA','Em andamento':'#E6F1FB','Concluída':'#E1F5EE','Cancelada':'var(--bg3)','No prazo':'#E1F5EE','Em risco':'#FAEEDA','Atrasada':'#FCEBEB'}[s]||'var(--bg2)';}
  function stCor(s){return{Pendente:'#854F0B','Em andamento':'#185FA5','Concluída':'#0F6E56','Cancelada':'#888','No prazo':'#0F6E56','Em risco':'#854F0B','Atrasada':'#A32D2D'}[s]||'var(--txt2)';}

  // Card de Meta SMART
  function cardSmart(m){
    var pct = m.progresso||0;
    var corP = pct>=100?'var(--green)':pct>=60?'#854F0B':'#185FA5';
    var campos = [
      m.especifica   && {icon:'🎯',label:'Específica',val:m.especifica},
      m.mensuravel   && {icon:'📏',label:'Mensurável',val:m.mensuravel},
      m.atingivel    && {icon:'💪',label:'Atingível',val:m.atingivel},
      m.relevante    && {icon:'⭐',label:'Relevante',val:m.relevante},
      m.temporal     && {icon:'📅',label:'Temporal',val:m.temporal},
    ].filter(Boolean);
    return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;border-left:3px solid '+((AREA_COLORS[m.area||'']&&AREA_COLORS[m.area||''].cor)||'var(--blue)')+';">'
      +'<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:14px;font-weight:700;color:var(--txt)">'+m.titulo+'</div>'
          +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">'
            +(m.colaborador?'<span style="font-size:10px;color:var(--txt2);background:var(--bg2);padding:1px 8px;border-radius:20px">👤 '+m.colaborador+'</span>':'')
            +(m.prazo?'<span style="font-size:10px;color:var(--txt3);background:var(--bg2);padding:1px 8px;border-radius:20px">📅 '+m.prazo+'</span>':'')
            +(m.status?'<span style="font-size:10px;font-weight:600;padding:1px 8px;border-radius:20px;background:'+stBg(m.status)+';color:'+stCor(m.status)+'">'+m.status+'</span>':'')
          +'</div>'
        +'</div>'
        +'<div style="text-align:right;flex-shrink:0">'
          +'<div style="font-size:20px;font-weight:900;color:'+corP+'">'+pct+'%</div>'
        +'</div>'
      +'</div>'
      +'<div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:10px">'
        +'<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:3px;transition:width .4s"></div>'
      +'</div>'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">'
        +'<span style="font-size:10px;color:var(--txt3)">0%</span>'
        +'<input type="range" min="0" max="100" value="'+pct+'" style="flex:1" oninput="atualizarMetaPct(\''+m.id+'\',this.value);this.nextElementSibling.textContent=this.value+\'%\'"/>'
        +'<span style="font-size:10px;color:var(--txt2);font-weight:600;width:30px">'+pct+'%</span>'
      +'</div>'
      +(campos.length?'<div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px">'+campos.map(function(c){return'<div style="font-size:11px;color:var(--txt2)"><span style="font-size:12px">'+c.icon+'</span> <strong>'+c.label+':</strong> '+c.val+'</div>';}).join('')+'</div>':'')
      +'<div style="display:flex;gap:6px;padding-top:8px;border-top:0.5px solid var(--border)">'
        +'<button class="btn btn-xs" onclick="openMetaForm(\''+m.id+'\')">✏️ Editar</button>'
        +'<button class="btn btn-xs btn-danger" onclick="delMeta(\''+m.id+'\')">×</button>'
      +'</div>'
    +'</div>';
  }

  // Stats
  var totalSmart = smart.length;
  var concluidas = smart.filter(function(m){return m.status==='Concluída';}).length;
  var emAndamento = smart.filter(function(m){return m.status==='Em andamento'||m.status==='No prazo';}).length;
  var pctMedio = totalSmart ? Math.round(smart.reduce(function(a,m){return a+(m.progresso||0);},0)/totalSmart) : 0;

  return '<div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--blue)">'+totalSmart+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Total</div>'
      +'</div>'
      +'<div style="background:var(--green-bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--green)">'+concluidas+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Concluídas</div>'
      +'</div>'
      +'<div style="background:#E6F1FB;border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:#185FA5">'+emAndamento+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Em andamento</div>'
      +'</div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--txt)">'+pctMedio+'%</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Progresso médio</div>'
      +'</div>'
    +'</div>'
    +'<div style="display:flex;gap:8px;margin-bottom:18px">'
      +'<button class="btn btn-purple btn-sm" onclick="openMetaForm()">✅ + Nova Meta SMART</button>'
    +'</div>'
    +(filtSmart.length ? filtSmart.map(cardSmart).join('')
      : '<div style="text-align:center;padding:48px 20px">'
          +'<div style="font-size:48px;margin-bottom:12px">✅</div>'
          +'<div style="font-size:16px;font-weight:700;color:var(--txt);margin-bottom:6px">Nenhuma meta individual definida</div>'
          +'<div style="font-size:13px;color:var(--txt3);margin-bottom:20px">Metas SMART definem o que cada pessoa<br>precisa entregar com critérios claros e mensuráveis.</div>'
          +'<button class="btn btn-purple" onclick="openMetaForm()">✅ Criar primeira meta</button>'
        +'</div>')
  +'</div>';
}

// ══════════════════════════════════════════════════════════════
// FUNÇÕES DE METAS SMART
// ══════════════════════════════════════════════════════════════

function openMetaForm(id){
  id=id||null;
  var m=id?metas.find(function(x){return x.id===id;}):null;
  var isNew=!id;
  var statuses=['Pendente','Em andamento','No prazo','Em risco','Atrasada','Concluída','Cancelada'];

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
        +'<button class="btn btn-purple btn-sm" onclick="salvarMetaSMART(\''+(id||'')+'\')">💾 Salvar Meta</button>'
      +'</div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
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
  (async function(){
    try{
      if(nova.dbId){ await apiCall('PUT','/api/metas/'+nova.dbId,{tipo:'smart',colaborador_id:nova.colId||null,titulo:nova.titulo,status:nova.status,progresso:nova.progresso,prazo:nova.prazo,colaborador:nova.colaborador,especifica:nova.especifica,mensuravel:nova.mensuravel,atingivel:nova.atingivel,relevante:nova.relevante,temporal:nova.temporal}); }
      else{ var r=await apiCall('POST','/api/metas',{tipo:'smart',colaborador_id:nova.colId||null,titulo:nova.titulo,status:nova.status||'Pendente',progresso:nova.progresso||0,prazo:nova.prazo||null,colaborador:nova.colaborador||'',especifica:nova.especifica||'',mensuravel:nova.mensuravel||'',atingivel:nova.atingivel||'',relevante:nova.relevante||'',temporal:nova.temporal||''}); if(r&&r.id){nova.dbId=r.id;lss('metas_v2',metas);} }
    }catch(e){console.warn('SMART sync err',e);}
  })();
  closeModal();toast('Meta salva! ✅');render('metas');
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
  if(!confirm('Excluir esta meta?'))return;
  var meta = metas.find(function(x){return x.id===id;});
  metas=metas.filter(function(x){return x.id!==id;});
  saveAll();
  var dbId=(meta&&(meta.dbId||meta.id));
  if(dbId) apiCall('DELETE','/api/metas/'+dbId).catch(function(e){console.warn('del meta err',e);});
  closeModal();toast('Meta excluída!');render('metas');
}
