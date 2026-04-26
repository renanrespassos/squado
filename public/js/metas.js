
// ══════════════════════════════════════════
// METAS SMART — Individuais (por colaborador)
// ══════════════════════════════════════════
function renderMetas(search){
  var smart = metas.filter(function(m){ return m.tipo === 'smart'; });
  var q = (search||'').toLowerCase();

  // Stats
  var totalSmart = smart.length;
  var concluidas = smart.filter(function(m){return m.status==='Concluída';}).length;
  var emAndamento = smart.filter(function(m){return m.status==='Em andamento'||m.status==='No prazo';}).length;
  var semMeta = colaboradores.filter(function(c){
    return !smart.some(function(m){return m.colId===c.id;});
  }).length;

  // Agrupar metas por colaborador
  var metasPorCol = {};
  smart.forEach(function(m){
    var key = m.colId || '_equipe';
    if(!metasPorCol[key]) metasPorCol[key] = [];
    metasPorCol[key].push(m);
  });

  // Filtrar colaboradores por busca
  var colsFiltrados = colaboradores;
  if(q){
    colsFiltrados = colaboradores.filter(function(c){
      return c.nome.toLowerCase().includes(q) || (c.nivel||'').toLowerCase().includes(q) || (c.area||'').toLowerCase().includes(q);
    });
  }

  // Cores de status
  function stBg(s){return{Pendente:'#FAEEDA','Em andamento':'#E6F1FB','Concluída':'#E1F5EE','Cancelada':'var(--bg3)','No prazo':'#E1F5EE','Em risco':'#FAEEDA','Atrasada':'#FCEBEB'}[s]||'var(--bg2)';}
  function stCor(s){return{Pendente:'#854F0B','Em andamento':'#185FA5','Concluída':'#0F6E56','Cancelada':'#888','No prazo':'#0F6E56','Em risco':'#854F0B','Atrasada':'#A32D2D'}[s]||'var(--txt2)';}

  // Card de colaborador com suas metas
  function cardCol(c){
    var minhasMetas = metasPorCol[c.id] || [];
    var temMeta = minhasMetas.length > 0;
    var pctMedio = temMeta ? Math.round(minhasMetas.reduce(function(a,m){return a+(m.progresso||0);},0)/minhasMetas.length) : 0;
    var corPct = pctMedio>=80?'var(--green)':pctMedio>=50?'#854F0B':'#185FA5';

    var html = '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;overflow:hidden">'
      // Header do colaborador
      +'<div style="padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:0.5px solid var(--border)">'
        +av(c.nome,false,true)
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:13px;font-weight:700;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+c.nome+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+(c.nivel||'')+(c.area?' · '+c.area:'')+'</div>'
        +'</div>';

    if(temMeta){
      html += '<span style="font-size:12px;font-weight:700;color:'+corPct+'">'+pctMedio+'%</span>'
        +'<span style="font-size:10px;padding:2px 8px;border-radius:12px;background:var(--green-bg);color:var(--green);font-weight:600">'+minhasMetas.length+' meta'+(minhasMetas.length>1?'s':'')+'</span>';
    } else {
      html += '<span style="font-size:10px;padding:2px 8px;border-radius:12px;background:var(--bg3);color:var(--txt3);font-weight:600">Sem meta</span>';
    }

    html += '</div>';

    // Lista de metas do colaborador
    if(temMeta){
      html += '<div style="padding:8px 14px">';
      minhasMetas.forEach(function(m){
        var pct = m.progresso||0;
        var corP = pct>=100?'var(--green)':pct>=60?'#854F0B':'#185FA5';
        html += '<div style="padding:6px 0;border-bottom:0.5px solid var(--border)">'
          +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">'
            +'<div style="flex:1;font-size:12px;font-weight:600;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+m.titulo+'</div>'
            +'<span style="font-size:10px;padding:1px 6px;border-radius:10px;background:'+stBg(m.status)+';color:'+stCor(m.status)+';font-weight:600;white-space:nowrap">'+(m.status||'Pendente')+'</span>'
            +'<span style="font-size:11px;font-weight:700;color:'+corP+';width:32px;text-align:right">'+pct+'%</span>'
          +'</div>'
          +'<div style="display:flex;align-items:center;gap:6px">'
            +'<div style="flex:1;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden">'
              +'<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:2px"></div>'
            +'</div>'
            +'<button class="btn btn-xs" onclick="openMetaForm(\''+m.id+'\')" style="padding:1px 6px;font-size:10px">✏️</button>'
          +'</div>'
        +'</div>';
      });
      html += '<button class="btn btn-xs btn-purple" onclick="openMetaFormCol(\''+c.id+'\')" style="margin-top:6px;width:100%;font-size:10px">+ Nova meta</button>';
      html += '</div>';
    } else {
      html += '<div style="padding:10px 14px">'
        +'<button class="btn btn-purple btn-sm" onclick="openMetaFormCol(\''+c.id+'\')" style="width:100%">✅ Criar Meta</button>'
      +'</div>';
    }

    html += '</div>';
    return html;
  }

  return '<div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--blue)">'+totalSmart+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Metas criadas</div>'
      +'</div>'
      +'<div style="background:var(--green-bg);border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:var(--green)">'+concluidas+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Concluídas</div>'
      +'</div>'
      +'<div style="background:#FAEEDA;border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:#854F0B">'+semMeta+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Sem meta</div>'
      +'</div>'
      +'<div style="background:#E6F1FB;border:0.5px solid var(--border);border-radius:10px;padding:14px;text-align:center">'
        +'<div style="font-size:28px;font-weight:900;color:#185FA5">'+emAndamento+'</div>'
        +'<div style="font-size:11px;color:var(--txt2)">Em andamento</div>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">'
      +colsFiltrados.map(cardCol).join('')
    +'</div>'
  +'</div>';
}

// ══════════════════════════════════════════════════════════════
// FUNÇÕES DE METAS SMART
// ══════════════════════════════════════════════════════════════

// Abrir form pré-selecionando um colaborador
function openMetaFormCol(colId){
  openMetaForm(null, colId);
}

function openMetaForm(id, preColId){
  id=id||null;
  var m=id?metas.find(function(x){return x.id===id;}):null;
  var isNew=!id;
  var statuses=['Pendente','Em andamento','No prazo','Em risco','Atrasada','Concluída','Cancelada'];

  document.getElementById('modal-title').textContent=isNew?'✅ Nova Meta SMART':'✅ Editar Meta SMART';
  document.getElementById('modal-box').classList.add('modal-lg');

  var selColId = (m && m.colId) || preColId || '';

  document.getElementById('modal-body').innerHTML=
    '<div style="background:var(--blue-bg);border-radius:8px;padding:10px 13px;margin-bottom:14px;font-size:12px;color:var(--blue)">'
      +'<strong>Método SMART:</strong> Específica · Mensurável · Atingível · Relevante · Temporal'
    +'</div>'
    +'<div class="form-grid mb-12">'
      +'<div class="field-group form-full"><div class="field-label">Título da Meta *</div>'
        +'<input id="sm-titulo" value="'+(m&&m.titulo||'')+'" placeholder="Ex: Reduzir tempo médio de emissão de relatórios em 30%"/></div>'
      +'<div class="field-group"><div class="field-label">Colaborador</div>'
        +'<select id="sm-col"><option value="">— Toda a equipe —</option>'
          +colaboradores.map(function(c){return'<option value="'+c.id+'"'+(selColId===c.id?' selected':'')+'>'+c.nome+'</option>';}).join('')
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
