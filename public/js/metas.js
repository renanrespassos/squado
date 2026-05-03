
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
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">'
      +'<div style="font-size:12px;color:var(--txt3)">'+totalSmart+' metas · '+colaboradores.filter(function(c){return c.status!=="Desligado";}).length+' colaboradores</div>'
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-primary btn-sm" onclick="openMetaForm()">+ Nova Meta</button>'
        +'<button class="btn btn-sm" onclick="gerarMetasIA()" style="border-color:#534AB7;color:#534AB7">🤖 Sugerir com IA</button>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:18px">'
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
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">'
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
  var statuses=['Pendente','Em andamento','No prazo','Em risco','Atrasada','Conclu\u00EDda','Cancelada'];
  var selColId = (m && m.colId) || preColId || '';

  // Buscar OKRs da \u00e1rea do colaborador selecionado (contexto cruzado)
  var colSel=selColId?colaboradores.find(function(c){return c.id===selColId;}):null;
  var okrsArea=[];
  if(colSel&&colSel.area){
    var allOkrs=ls('okrs',[])||[];
    okrsArea=allOkrs.filter(function(o){return o.area===colSel.area;});
  }
  var okrCtxHtml=okrsArea.length
    ?'<div style="background:#F3F0FF;border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:11px;color:#534AB7">'
      +'\u{1F3AF} <strong>OKRs da \u00e1rea '+(colSel?colSel.area:'')+':</strong> '
      +okrsArea.map(function(o){return o.objetivo;}).join(' \u2022 ')
    +'</div>':'';

  document.getElementById('modal-title').textContent=isNew?'\u2705 Nova Meta SMART':'\u2705 Editar Meta';
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="display:flex;gap:8px;margin-bottom:14px">'
      +'<div style="flex:1;background:var(--blue-bg);border-radius:8px;padding:8px 12px;font-size:11px;color:var(--blue)">'
        +'<strong>SMART:</strong> Espec\u00edfica \u00b7 Mensur\u00e1vel \u00b7 Ating\u00edvel \u00b7 Relevante \u00b7 Temporal'
      +'</div>'
      +(isNew?'<button class="btn btn-sm" onclick="preencherMetaComIA()" style="border-color:#534AB7;color:#534AB7;white-space:nowrap">\u{1F916} Preencher com IA</button>':'')
    +'</div>'
    +okrCtxHtml
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">'
      +'<div class="field-group"><div class="field-label">Colaborador</div>'
        +'<select id="sm-col" onchange="atualizarOKRCtxMeta()"><option value="">\u2014 Toda a equipe \u2014</option>'
          +colaboradores.filter(function(c){return c.status!=="Desligado";}).map(function(c){return'<option value="'+c.id+'"'+(selColId===c.id?' selected':'')+'>'+c.nome+' ('+c.nivel+')</option>';}).join('')
        +'</select></div>'
      +'<div class="field-group"><div class="field-label">Status</div>'
        +'<select id="sm-status">'+statuses.map(function(s){return'<option'+(m&&m.status===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select></div>'
    +'</div>'
    +'<div class="field-group" style="margin-bottom:12px"><div class="field-label">\u{1F3AF} T\u00edtulo da Meta *</div>'
      +'<input id="sm-titulo" value="'+(m&&m.titulo||'')+'" placeholder="Ex: Reduzir tempo m\u00e9dio de emiss\u00e3o de relat\u00f3rios em 30%" style="font-size:14px;font-weight:600;padding:10px 14px"/></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px">'
      +'<div class="field-group"><div class="field-label">\u{1F4C5} Prazo</div>'
        +'<input id="sm-prazo" type="date" value="'+(m&&m.prazo||'')+'"/></div>'
      +'<div class="field-group"><div class="field-label">Progresso: <span id="sm-pv" style="font-weight:700;color:var(--green)">'+(m&&m.progresso||0)+'</span>%</div>'
        +'<input type="range" min="0" max="100" value="'+(m&&m.progresso||0)+'" id="sm-prog" oninput="document.getElementById(\'sm-pv\').textContent=this.value" style="accent-color:var(--green)"/></div>'
    +'</div>'
    +'<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:10px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Detalhamento SMART</div>'
      +'<div class="field-group" style="margin-bottom:8px"><div class="field-label">\u{1F3AF} Espec\u00edfica \u2014 O que exatamente?</div>'
        +'<textarea id="sm-esp" rows="2" placeholder="Descreva com clareza o que deve ser atingido" style="font-size:12px">'+(m&&m.especifica||'')+'</textarea></div>'
      +'<div class="field-group" style="margin-bottom:8px"><div class="field-label">\u{1F4CF} Mensur\u00e1vel \u2014 Como vamos medir?</div>'
        +'<input id="sm-men" value="'+(m&&m.mensuravel||'')+'" placeholder="Ex: Tempo m\u00e9dio < 48h, NPS > 4.5" style="font-size:12px"/></div>'
      +'<div class="field-group" style="margin-bottom:8px"><div class="field-label">\u{1F4AA} Ating\u00edvel \u2014 \u00c9 realista?</div>'
        +'<input id="sm-ati" value="'+(m&&m.atingivel||'')+'" placeholder="Ex: Temos os recursos e treinamento necess\u00e1rios" style="font-size:12px"/></div>'
      +'<div class="field-group" style="margin-bottom:8px"><div class="field-label">\u2B50 Relevante \u2014 Por que importa?</div>'
        +'<input id="sm-rel" value="'+(m&&m.relevante||'')+'" placeholder="Ex: Impacta na satisfa\u00e7\u00e3o do cliente e acredita\u00e7\u00e3o" style="font-size:12px"/></div>'
      +'<div class="field-group"><div class="field-label">\u{1F4C5} Temporal \u2014 Quando?</div>'
        +'<input id="sm-tem" value="'+(m&&m.temporal||'')+'" placeholder="Ex: At\u00e9 final do Q2 2026, com revis\u00e3o mensal" style="font-size:12px"/></div>'
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">'
      +(id?'<button class="btn btn-danger btn-sm" onclick="delMeta(\''+id+'\')">Excluir</button>':'<div></div>')
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
        +'<button class="btn btn-primary btn-sm" onclick="salvarMetaSMART(\''+(id||'')+'\')">\u{1F4BE} Salvar</button>'
      +'</div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function atualizarOKRCtxMeta(){
  // Reabrir o form com o col selecionado pra mostrar OKRs da \u00e1rea
  var colId=(document.getElementById('sm-col')||{}).value;
  // Salvar valores atuais
  var titulo=(document.getElementById('sm-titulo')||{}).value||'';
  openMetaForm(null, colId);
  setTimeout(function(){
    var el=document.getElementById('sm-titulo');
    if(el&&titulo)el.value=titulo;
  },50);
}

async function preencherMetaComIA(){
  var colId=(document.getElementById('sm-col')||{}).value;
  var col=colId?colaboradores.find(function(c){return c.id===colId;}):null;

  // Popup inline para contexto
  var existing=document.getElementById('ia-ctx-popup');
  if(existing)existing.remove();
  var popup=document.createElement('div');
  popup.id='ia-ctx-popup';
  popup.style.cssText='background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:12px;animation:fadeIn .2s';
  popup.innerHTML=
    '<div style="font-size:11px;font-weight:700;color:var(--txt2);margin-bottom:8px">🤖 Contexto para a IA gerar a meta:</div>'
    +'<input id="ia-meta-inline-ctx" placeholder="Ex: Foco em produtividade, certificação, liderança..." style="width:100%;margin-bottom:8px;font-size:12px">'
    +'<div style="display:flex;gap:8px">'
      +'<button class="btn btn-purple btn-sm" onclick="executarPreencherMetaIA()">Gerar com IA</button>'
      +'<button class="btn btn-sm" onclick="document.getElementById(\'ia-ctx-popup\').remove()">Cancelar</button>'
    +'</div>';
  var smTitulo=document.getElementById('sm-titulo');
  if(smTitulo)smTitulo.parentElement.parentElement.insertBefore(popup, smTitulo.parentElement);
  document.getElementById('ia-meta-inline-ctx').focus();
}

async function executarPreencherMetaIA(){
  var colId=(document.getElementById('sm-col')||{}).value;
  var col=colId?colaboradores.find(function(c){return c.id===colId;}):null;
  var ctx=(document.getElementById('ia-meta-inline-ctx')||{}).value||'';
  var popup=document.getElementById('ia-ctx-popup');
  if(popup)popup.remove();

  toast('\u{1F916} Gerando meta com IA...');

  var prompt='Gere UMA meta SMART'+(col?' para '+col.nome+' ('+col.nivel+', \u00e1rea: '+(col.area||'geral')+')':', para a equipe')+'.\n';
  if(ctx) prompt+='CONTEXTO DO GESTOR: '+ctx+'\n';
  // OKRs da área (buscar em metas tipo okr, não em ls('okrs'))
  if(col&&col.area){
    var okrsArea=metas.filter(function(m){return m.tipo==='okr'&&m.area===col.area;});
    if(okrsArea.length) prompt+='OKRs da \u00e1rea: '+okrsArea.map(function(o){return o.objetivo;}).join('; ')+'\n';
  }
  // Avaliação
  if(col){
    var avsC=avaliacoes.filter(function(a){return a.colaboradorId===colId;});
    var lastAv=avsC.length?avsC[avsC.length-1]:null;
    if(lastAv){
      prompt+="Última avaliação: nota geral "+lastAv.mediaGeral+"\n";
      if(lastAv.secaoMedias){
        var fracos=Object.entries(lastAv.secaoMedias).filter(function(e){return e[1]<4;}).sort(function(a,b){return a[1]-b[1];});
        var fortes=Object.entries(lastAv.secaoMedias).filter(function(e){return e[1]>=4.5;});
        if(fracos.length) prompt+="⚠️ IMPORTANTE: Pontos FRACOS que a meta DEVE abordar: "+fracos.map(function(e){return e[0]+" ("+e[1]+")";}).join(", ")+"\n";
        if(fortes.length) prompt+="Pontos fortes: "+fortes.map(function(e){return e[0]+" ("+e[1]+")";}).join(", ")+"\n";
        prompt+="A meta DEVE focar em melhorar os pontos fracos identificados.\n";
      }
    }
  }
  prompt+='Retorne JSON: {"titulo":"...","especifica":"...","mensuravel":"...","atingivel":"...","relevante":"...","temporal":"..."}\nSem markdown. Apenas JSON.';

  try{
    var token=squadoGetToken();
    var r=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:[
        {role:'system',content:'Responda SOMENTE com JSON v\u00e1lido. Gere meta SMART concreta. Portugu\u00eas brasileiro.'},
        {role:'user',content:prompt}
      ],max_tokens:800})
    });
    var d=await r.json();
    var txt=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
    var match=txt.match(/\{[\s\S]*\}/);
    if(!match){toast('\u26A0\uFE0F IA n\u00e3o retornou JSON');return;}
    var s=JSON.parse(match[0]);
    if(s.titulo)document.getElementById('sm-titulo').value=s.titulo;
    if(s.especifica)document.getElementById('sm-esp').value=s.especifica;
    if(s.mensuravel)document.getElementById('sm-men').value=s.mensuravel;
    if(s.atingivel)document.getElementById('sm-ati').value=s.atingivel;
    if(s.relevante)document.getElementById('sm-rel').value=s.relevante;
    if(s.temporal)document.getElementById('sm-tem').value=s.temporal;
    toast('\u2705 Meta preenchida! Revise e salve.');
  }catch(e){toast('\u26A0\uFE0F '+e.message);}
}

function salvarMetaSMART(id){
  var tEl=document.getElementById('sm-titulo');
  var titulo=(tEl?tEl.value:'');
  if(!titulo){alert('Título obrigatório.');return;}
  function gv(elId){var e=document.getElementById(elId);return e?e.value:'';}
  var colSel=gv('sm-col');var colNome=colSel?(colaboradores.find(function(c){return c.id===colSel})||{}).nome||'':'';
  if(!colSel){toast('Selecione um colaborador para a meta.');return;}  var nova={id:id||uid(),tipo:'smart',titulo:titulo,
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

// ═══ IA para Metas SMART ═══
async function gerarMetasIA(){
  var col=colaboradores.filter(function(c){return c.status!=='Desligado';});
  if(!col.length){toast('Cadastre colaboradores primeiro.');return;}
  var temOKR=(ls('okrs',[])||[]).length>0;
  var temAval=avaliacoes.length>0;
  var temPDI=(typeof getPDIs==='function'?getPDIs():[]).length>0;

  document.getElementById('modal-title').textContent='\u{1F916} Sugerir Metas com IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="margin-bottom:12px;font-size:12px;color:var(--txt2)">A IA vai analisar seus dados e sugerir metas SMART personalizadas.</div>'
    +'<div class="field-group"><div class="field-label">Colaborador</div>'
      +'<select id="ia-meta-col"><option value="">\u2014 Toda a equipe \u2014</option>'
        +col.map(function(c){return '<option value="'+c.id+'">'+c.nome+' ('+c.nivel+')</option>';}).join('')
      +'</select></div>'
    +'<input type="hidden" id="ia-meta-qtd" value="1">'
      
    +'<div style="background:var(--bg2);border-radius:8px;padding:10px 12px;margin-bottom:10px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);margin-bottom:8px">\u{1F4CE} Contexto para a IA considerar:</div>'
      +'<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-meta-ctx-okr" '+(temOKR?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temOKR?'':' disabled')+'> \u{1F3AF} OKRs da \u00e1rea <span style="font-size:10px;color:var(--txt3)">'+(temOKR?'('+((ls('okrs',[])||[]).length)+')':'(nenhum)')+'</span></label>'
      +'<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-meta-ctx-aval" '+(temAval?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temAval?'':' disabled')+'> \u{1F4CA} Avalia\u00e7\u00f5es <span style="font-size:10px;color:var(--txt3)">'+(temAval?'('+avaliacoes.length+')':'(nenhuma)')+'</span></label>'
      +'<label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-meta-ctx-pdi" '+(temPDI?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temPDI?'':' disabled')+'> \u{1F4CB} PDIs existentes <span style="font-size:10px;color:var(--txt3)">'+(temPDI?'('+(typeof getPDIs==='function'?getPDIs():[]).length+')':'(nenhum)')+'</span></label>'
    +'</div>'
    +'<div class="field-group"><div class="field-label">Contexto adicional (opcional)</div>'
      +'<input id="ia-meta-ctx" placeholder="Ex: Foco em produtividade, certifica\u00e7\u00e3o, lideran\u00e7a..."/></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px">'
      +'<button class="btn btn-purple btn-sm" onclick="executarGeracaoMetasIA()">\u{1F916} Gerar Sugest\u00f5es</button>'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

async function executarGeracaoMetasIA(){
  var colId=(document.getElementById('ia-meta-col')||{}).value;
  if(!colId){toast('Selecione um colaborador para gerar metas.');return;}
  var ctx=(document.getElementById('ia-meta-ctx')||{}).value||'';
  var qtd=1;
  var col=colId?colaboradores.find(function(c){return c.id===colId;}):null;
  var usarOKR=(document.getElementById('ia-meta-ctx-okr')||{}).checked;
  var usarAval=(document.getElementById('ia-meta-ctx-aval')||{}).checked;
  var usarPDI=(document.getElementById('ia-meta-ctx-pdi')||{}).checked;

  closeModal();
  toast('\u{1F916} Gerando metas com IA...');

  var metasExist=metas.filter(function(m){return m.tipo==='smart'&&(!colId||m.colId===colId);}).map(function(m){return m.titulo;});
  var prompt='Gere EXATAMENTE 1 meta SMART'+(col?' para '+col.nome+' ('+col.nivel+', \u00e1rea: '+(col.area||'geral')+')':', uma para cada \u00e1rea da equipe')+'.\n';
  if(ctx) prompt+='Contexto: '+ctx+'\n';
  if(usarOKR){
    var okrs=ls('okrs',[])||[];
    var okrsFiltrados=col&&col.area?okrs.filter(function(o){return o.area===col.area;}):okrs;
    if(okrsFiltrados.length) prompt+='OKRs para alinhar: '+okrsFiltrados.map(function(o){return o.objetivo+' ('+o.area+')';}).join('; ')+'\n';
  }
  if(usarAval){
    var avsCtx=col?avaliacoes.filter(function(a){return a.colaboradorId===colId;}):avaliacoes.slice(-5);
    if(avsCtx.length){
      prompt+="Avaliações:\n";
      avsCtx.forEach(function(a){
        prompt+=a.colaborador+" nota "+a.mediaGeral;
        if(a.secaoMedias){
          var fracos=Object.entries(a.secaoMedias).filter(function(e){return e[1]<4;}).sort(function(x,y){return x[1]-y[1];});
          if(fracos.length) prompt+=" ⚠️ PONTOS FRACOS: "+fracos.map(function(e){return e[0]+"("+e[1]+")";}).join(",");
        }
        prompt+="\n";
      });
      prompt+="INSTRUÇÃO: As metas DEVEM priorizar os pontos fracos (nota<4) identificados nas avaliações.\n";
    }
  }
  if(usarPDI){
    var pdis=typeof getPDIs==='function'?getPDIs():[];
    var pdisFilt=col?pdis.filter(function(p){return p.colId===colId;}):pdis.slice(-3);
    if(pdisFilt.length) prompt+='PDIs: '+pdisFilt.map(function(p){return p.objetivo;}).join('; ')+'\n';
  }
  prompt+='Equipe: '+colaboradores.filter(function(c){return c.status!=="Desligado";}).map(function(c){return c.nome+' ('+c.nivel+')';}).join(', ')+'\n';
  if(metasExist.length) prompt+='NÃO repita metas já existentes: '+metasExist.join('; ')+'\n';
  prompt+='\nRetorne JSON puro: [{"titulo":"...","especifica":"...","mensuravel":"...","atingivel":"...","relevante":"...","temporal":"..."}]\nSem markdown. Sem backticks. Apenas JSON.';

  try{
    var token=squadoGetToken();
    var r=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:[
        {role:'system',content:'Responda SOMENTE com JSON válido. Sem markdown. Gere metas SMART concretas, mensuráveis e com prazos realistas. Português brasileiro.'},
        {role:'user',content:prompt}
      ],max_tokens:2000})
    });
    var d=await r.json();
    var resposta=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
    var match=resposta.match(/\[[\s\S]*\]/);
    if(!match){toast('⚠️ IA não retornou JSON válido');return;}
    var sugestoes=JSON.parse(match[0]);

    // Limitar a 1 meta
    if(sugestoes.length>1) sugestoes=sugestoes.slice(0,1);
    // Checar duplicatas
    var existentes=metas.filter(function(m){return m.colId===colId;}).map(function(m){return m.titulo.toLowerCase();});
    sugestoes=sugestoes.filter(function(s){return existentes.indexOf((s.titulo||'').toLowerCase())<0;});
    if(!sugestoes.length){toast('⚠️ Meta sugerida já existe. Tente novamente.');return;}
    sugestoes.forEach(function(s){
      metas.push({
        id:uid(),tipo:'smart',titulo:s.titulo||'Meta sugerida',
        colId:colId||null,colaborador:col?col.nome:'',
        prazo:'',status:'Pendente',progresso:0,
        especifica:s.especifica||'',mensuravel:s.mensuravel||'',
        atingivel:s.atingivel||'',relevante:s.relevante||'',temporal:s.temporal||''
      });
    });
    saveAll();
    toast('✅ Meta gerada!');
    render('metas');
  }catch(e){
    toast('⚠️ Erro: '+e.message);
  }
}
