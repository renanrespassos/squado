// ═══════════════════════════════════════════════════════════════
// PDI — PLANO DE DESENVOLVIMENTO INDIVIDUAL
// ═══════════════════════════════════════════════════════════════
function getPDIs(){ return ls('pdis_v1',[]); }
function savePDIs(arr){ lss('pdis_v1',arr); if(typeof agendarSync==='function')agendarSync(); }
var _pdiSyncTimers={};
function _pdiSyncApi(pdiId){
  clearTimeout(_pdiSyncTimers[pdiId]);
  _pdiSyncTimers[pdiId]=setTimeout(function(){
    var pdis=getPDIs();var pdi=pdis.find(function(x){return x.id===pdiId;});
    if(!pdi||!pdi.dbId)return;
    apiCall('PUT','/api/pdis/'+pdi.dbId,{objetivo:pdi.objetivo||'',competencias:pdi.competencias||[],acoes:pdi.acoes||[],revisoes:pdi.revisoes||[],status:pdi.status||'Em andamento'}).catch(function(e){console.warn('PDI sync err',e);});
  },600);
}

function renderPDI(search){
  search=search||'';
  const pdis=getPDIs();
  const q=search.toLowerCase();
  const porCol={};
  pdis.forEach(function(p){ if(!porCol[p.colId])porCol[p.colId]=[]; porCol[p.colId].push(p); });
  let cols=colaboradores.filter(function(c){return c.status==='Ativo';});
  if(q)cols=cols.filter(function(c){return c.nome.toLowerCase().includes(q)||c.area.toLowerCase().includes(q);});
  const totalPDIs=pdis.length;
  const emAndamento=pdis.filter(function(p){return p.status==='Em andamento';}).length;
  const concluidos=pdis.filter(function(p){return p.status==='Concluído';}).length;
  const semPDI=colaboradores.filter(function(c){return c.status==='Ativo'&&!porCol[c.id];}).length;
  function pdiPct(pdi){
    var ac=pdi.acoes||[];
    if(!ac.length)return 0;
    return Math.round(ac.reduce(function(a,x){return a+(x.progresso||0);},0)/ac.length);
  }
  function colCard(col){
    var meusPDIs=(porCol[col.id]||[]).slice().sort(function(a,b){return(b.dataCriacao||'').localeCompare(a.dataCriacao||'');});
    var ativo=meusPDIs.find(function(p){return p.status==='Em andamento';})||meusPDIs[0];
    var c2=AREA_COLORS[col.area]||{cor:'#888',bg:'#eee'};
    var pct=ativo?pdiPct(ativo):-1;
    var corP=pct>=80?'var(--green)':pct>=50?'#854F0B':'var(--blue)';
    var html='<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:14px;border-left:3px solid '+(ativo?c2.cor:'var(--border2)')+'">';
    html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">'+av(col.nome,false,false);
    html+='<div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+col.nome+'</div>';
    html+='<div style="font-size:10px;color:var(--txt3)">'+col.nivel+' · '+col.area+'</div></div>';
    if(ativo){
      html+='<div style="text-align:right"><div style="font-size:16px;font-weight:900;color:'+corP+'">'+pct+'%</div>';
      html+='<div style="font-size:9px;color:var(--txt3)">'+(ativo.ciclo||'PDI Ativo')+'</div></div>';
    } else {
      html+='<span style="font-size:10px;padding:2px 8px;border-radius:20px;background:#FAEEDA;color:#854F0B">Sem PDI</span>';
    }
    html+='</div>';
    if(ativo&&pct>=0){
      html+='<div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;margin-bottom:10px">';
      html+='<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:3px"></div></div>';
    }
    if(ativo&&(ativo.acoes||[]).length){
      html+='<div style="margin-bottom:10px">';
      (ativo.acoes||[]).slice(0,3).forEach(function(a){
        var icon=a.status==='Concluída'?'✅':a.status==='Em andamento'?'🔵':'⭕';
        html+='<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">';
        html+='<span style="font-size:11px">'+icon+'</span>';
        html+='<span style="font-size:11px;color:var(--txt);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.descricao+'</span>';
        html+='</div>';
      });
      if((ativo.acoes||[]).length>3)html+='<div style="font-size:10px;color:var(--txt3)">+ '+((ativo.acoes||[]).length-3)+' ações</div>';
      html+='</div>';
    }
    html+='<div style="display:flex;gap:6px">';
    html+='<button class="btn btn-primary btn-xs" data-col="'+col.id+'" onclick="abrirPDI(this.dataset.col)" style="flex:1">📋 '+(ativo?'Ver PDI':'Criar PDI')+'</button>';
    if(meusPDIs.length>1)html+='<button class="btn btn-xs" data-col="'+col.id+'" onclick="verHistoricoPDI(this.dataset.col)">📂 '+meusPDIs.length+'</button>';
    html+='</div></div>';
    return html;
  }
  return '<div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">'
      +'<div style="font-size:12px;color:var(--txt3)">'+totalPDIs+' PDIs · '+emAndamento+' em andamento · '+semPDI+' sem PDI</div>'
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-sm" onclick="gerarPDIIA()" style="border-color:#534AB7;color:#534AB7">🤖 Sugerir PDI com IA</button>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-bottom:16px">'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:24px;font-weight:900;color:var(--blue)">'+totalPDIs+'</div><div style="font-size:10px;color:var(--txt2)">PDIs Criados</div></div>'
      +'<div style="background:var(--green-bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:24px;font-weight:900;color:var(--green)">'+emAndamento+'</div><div style="font-size:10px;color:var(--txt2)">Em Andamento</div></div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:24px;font-weight:900;color:#854F0B">'+semPDI+'</div><div style="font-size:10px;color:var(--txt2)">Sem PDI</div></div>'
      +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:24px;font-weight:900;color:var(--txt)">'+concluidos+'</div><div style="font-size:10px;color:var(--txt2)">Concluídos</div></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">'
      +cols.map(colCard).join('')
    +'</div>'
    +(cols.length===0?'<div style="text-align:center;padding:40px;color:var(--txt3)">Nenhum colaborador encontrado.</div>':'')
  +'</div>';
}

function abrirPDI(colId){
  var col=colaboradores.find(function(x){return x.id===colId;});if(!col)return;
  var pdis=getPDIs();
  var ativo=pdis.find(function(p){return p.colId===colId&&p.status==='Em andamento';})
    ||(pdis.filter(function(p){return p.colId===colId;}).sort(function(a,b){return(b.dataCriacao||'').localeCompare(a.dataCriacao||'');})[0]);
  if(ativo)renderModalPDI(ativo,col);
  else criarNovoPDI(colId);
}

function criarNovoPDI(colId){
  var col=colaboradores.find(function(x){return x.id===colId;});if(!col)return;
  var ano=new Date().getFullYear();
  var novo={id:uid(),colId:colId,colNome:col.nome,ciclo:'1º Semestre '+ano,ano:ano,status:'Em andamento',competencias:[],acoes:[],dataCriacao:new Date().toISOString().slice(0,10),observacoes:'',revisoes:[],dataProxRevisao:''};
  var pdis=getPDIs();pdis.push(novo);savePDIs(pdis);
  // Sync com banco
  apiCall('POST','/api/pdis',{colaborador_id:colId,col_nome:col.nome,objetivo:'',competencias:[],acoes:[],revisoes:[],status:'Em andamento'})
    .then(r=>{if(r&&r.id){novo.dbId=r.id;savePDIs(getPDIs().map(p=>p.id===novo.id?{...p,dbId:r.id}:p));console.log('PDI criado no banco:',r.id);}})
    .catch(e=>console.warn('PDI create err',e));
  renderModalPDI(novo,col);
}

function verHistoricoPDI(colId){
  var col=colaboradores.find(function(x){return x.id===colId;});if(!col)return;
  var pdis=getPDIs().filter(function(p){return p.colId===colId;}).sort(function(a,b){return(b.dataCriacao||'').localeCompare(a.dataCriacao||'');});
  document.getElementById('modal-title').textContent='📂 Histórico PDI · '+col.nome;
  document.getElementById('modal-box').classList.add('modal-lg');
  var html='<div style="display:flex;flex-direction:column;gap:8px;max-height:55vh;overflow-y:auto">';
  var stBg={'Rascunho':'#FAEEDA','Em andamento':'#E6F1FB','Concluído':'#E1F5EE','Cancelado':'var(--bg2)'};
  var stCor={'Rascunho':'#854F0B','Em andamento':'#185FA5','Concluído':'#0F6E56','Cancelado':'#888'};
  pdis.forEach(function(p){
    var pct=Math.round((p.acoes||[]).reduce(function(a,ac){return a+(ac.progresso||0);},0)/Math.max((p.acoes||[]).length,1));
    html+='<div style="background:var(--bg2);border-radius:10px;padding:12px;display:flex;align-items:center;gap:12px">'
      +'<div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--txt)">'+p.ciclo+'</div>'
      +'<div style="font-size:10px;color:var(--txt3)">Criado em '+p.dataCriacao+' · '+(p.acoes||[]).length+' ações</div></div>'
      +'<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:'+(stBg[p.status]||'var(--bg2)')+';color:'+(stCor[p.status]||'#888')+'">'+p.status+'</span>'
      +'<div style="font-size:14px;font-weight:800;color:var(--green)">'+pct+'%</div>'
      +'<button class="btn btn-xs btn-primary" data-pdi="'+p.id+'" data-col="'+colId+'" onclick="abrirPDIById(this.dataset.pdi,this.dataset.col)">Abrir</button>'
      +'<button class="btn btn-xs btn-danger" data-pdi="'+p.id+'" data-col="'+colId+'" onclick="deletarPDI(this.dataset.pdi,this.dataset.col)">×</button>'
    +'</div>';
  });
  html+='</div><div style="margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border);display:flex;gap:8px">'
    +'<button class="btn btn-primary btn-sm" data-col="'+colId+'" onclick="criarNovoPDI(this.dataset.col)">+ Novo PDI</button>'
    +'<button class="btn btn-sm" onclick="closeModal()">Fechar</button>'
  +'</div>';
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

function abrirPDIById(pdiId,colId){
  var pdi=getPDIs().find(function(x){return x.id===pdiId;});
  var col=colaboradores.find(function(x){return x.id===colId;});
  if(pdi&&col)renderModalPDI(pdi,col);
}

function deletarPDI(pdiId,colId){
  if(!confirm('Excluir este PDI?'))return;
  const pdi=getPDIs().find(x=>x.id===pdiId);
  savePDIs(getPDIs().filter(function(x){return x.id!==pdiId;}));
  if(pdi&&pdi.dbId) apiCall('DELETE','/api/pdis/'+pdi.dbId).catch(e=>console.warn('PDI del err',e));
  toast('PDI excluído!');
  verHistoricoPDI(colId);
  render('pdi');
}

function renderModalPDI(pdi,col){
  if(!pdi||!col)return;
  var acoes=pdi.acoes||[];
  var pct=Math.round(acoes.reduce(function(a,ac){return a+(ac.progresso||0);},0)/Math.max(acoes.length,1));
  var corP=pct>=80?'var(--green)':pct>=50?'#854F0B':'var(--blue)';
  var c2=AREA_COLORS[col.area]||{cor:'#888',bg:'#eee'};
  var statusOpts=['Rascunho','Em andamento','Concluído','Cancelado'];
  var cicloOpts=['1º Semestre '+new Date().getFullYear(),'2º Semestre '+new Date().getFullYear(),'Anual '+new Date().getFullYear(),'1º Semestre '+(new Date().getFullYear()+1),'2º Semestre '+(new Date().getFullYear()+1)];
  var tiposAcao=['Treinamento','Mentoria','Projeto','Leitura','Curso','Shadowing','Autodesenvolvimento','Outro'];

  var acoesHtml='';
  acoes.forEach(function(a,i){
    var stC={Concluída:'var(--green)','Em andamento':'var(--blue)','Não iniciada':'var(--txt3)',Pausada:'#854F0B'}[a.status]||'var(--txt3)';
    var icon={Concluída:'✅','Em andamento':'🔵','Não iniciada':'⭕',Pausada:'⏸'}[a.status]||'⭕';
    acoesHtml+='<div style="background:var(--bg2);border-radius:9px;padding:10px 12px;margin-bottom:8px">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
        +'<span>'+icon+'</span>'
        +'<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:var(--txt)">'+a.descricao+'</div>'
        +'<div style="font-size:10px;color:var(--txt3)">'+(a.tipo||'')+(a.prazo?' · Prazo: '+a.prazo:'')+'</div></div>'
        +'<span style="font-size:12px;font-weight:700;color:'+stC+'">'+a.progresso+'%</span>'
        +'<button class="btn btn-xs" data-pdi="'+pdi.id+'" data-idx="'+i+'" onclick="editarAcaoPDI(this.dataset.pdi,this.dataset.idx)">✏️</button>'
        +'<button class="btn btn-xs btn-danger" data-pdi="'+pdi.id+'" data-idx="'+i+'" onclick="removerAcaoPDI(this.dataset.pdi,this.dataset.idx)">×</button>'
      +'</div>'
      +'<div style="height:5px;background:var(--bg3);border-radius:3px;overflow:hidden">'
        +'<div style="height:100%;width:'+a.progresso+'%;background:'+stC+';border-radius:3px"></div>'
      +'</div>'
    +'</div>';
  });

  window._currentPdiId=pdi.id;
  document.getElementById('modal-title').textContent='🚀 PDI · '+col.nome;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    // Header
    '<div style="display:flex;align-items:center;gap:12px;padding:12px;background:'+c2.bg+';border-radius:10px;margin-bottom:16px">'
      +av(col.nome,false,false)
      +'<div style="flex:1"><div style="font-size:14px;font-weight:800;color:'+c2.cor+'">'+col.nome+'</div>'
      +'<div style="font-size:11px;color:var(--txt2)">'+col.nivel+' · '+col.area+'</div></div>'
      +'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">'
        +'<select id="pdi-status" onchange="_pdiSave(this)" style="font-size:11px;border:none;background:transparent;font-weight:700;color:'+c2.cor+';cursor:pointer">'
          +statusOpts.map(function(s){return '<option'+(pdi.status===s?' selected':'')+'>'+s+'</option>';}).join('')
        +'</select>'
        +'<select id="pdi-ciclo" onchange="_pdiSave(this)" style="font-size:10px;border:none;background:transparent;color:var(--txt3);cursor:pointer">'
          +cicloOpts.map(function(c){return '<option'+(pdi.ciclo===c?' selected':'')+'>'+c+'</option>';}).join('')
        +'</select>'
      +'</div>'
    +'</div>'
    // Progresso
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
      +'<span style="font-size:11px;color:var(--txt2);white-space:nowrap">Progresso geral</span>'
      +'<div style="flex:1;height:8px;background:var(--bg3);border-radius:4px;overflow:hidden">'
        +'<div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:4px"></div>'
      +'</div>'
      +'<span style="font-size:14px;font-weight:800;color:'+corP+'">'+pct+'%</span>'
    +'</div>'
    // Competências
    +'<div style="margin-bottom:14px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px">🎯 Competências a Desenvolver</div>'
      +'<div id="comp-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">'
        +(pdi.competencias||[]).map(function(c,i){
          return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;background:var(--blue);color:#fff;border-radius:20px;font-size:11px;font-weight:600">'
            +c+'<button style="background:none;border:none;color:#fff;cursor:pointer;font-size:13px;line-height:1;padding:0;margin-left:2px" data-pdi="'+pdi.id+'" data-idx="'+i+'" onclick="removerCompetencia(this.dataset.pdi,this.dataset.idx)">×</button>'
          +'</span>';
        }).join('')
      +'</div>'
      +'<div style="display:flex;gap:6px">'
        +'<input id="pdi-nova-comp" data-pdi="'+pdi.id+'" placeholder="Ex: Norma 17025, Liderança, Python..." style="flex:1;font-size:12px"/>'
        +'<button class="btn btn-sm btn-primary" data-pdi="'+pdi.id+'" onclick="adicionarCompetencia(this.dataset.pdi)">+ Add</button>'
      +'</div>'
    +'</div>'
    // Observações
    +'<div style="margin-bottom:16px"><div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px">📝 Observações / Justificativa</div>'
      +'<textarea id="pdi-obs" rows="2" placeholder="Motivos, contexto e expectativas..." '
        +'onblur="_pdiSave(this)" style="width:100%;min-height:56px">'+(pdi.observacoes||'')+'</textarea>'
    +'</div>'
    // Ações
    +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">📋 Plano de Ações ('+acoes.length+')</div>'
    +'<div style="max-height:300px;overflow-y:auto;padding-right:4px">'+acoesHtml+'</div>'
    // Form nova ação
    +'<div style="border:1.5px dashed var(--border2);border-radius:9px;padding:12px;margin-top:8px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);margin-bottom:8px">➕ Nova Ação</div>'
      +'<div style="display:grid;grid-template-columns:2fr 1fr;gap:8px;margin-bottom:8px">'
        +'<input id="na-desc" placeholder="Descrição da ação *" style="font-size:12px"/>'
        +'<select id="na-tipo" style="font-size:12px">'+tiposAcao.map(function(t){return '<option>'+t+'</option>';}).join('')+'</select>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px">'
        +'<input id="na-prazo" type="date" style="font-size:12px"/>'
        +'<input id="na-resp" placeholder="Responsável" style="font-size:12px"/>'
        +'<input id="na-rec" placeholder="Recursos" style="font-size:12px"/>'
      +'</div>'
      +'<button class="btn btn-primary btn-sm" data-pdi="'+pdi.id+'" onclick="adicionarAcaoPDI(this.dataset.pdi)">+ Adicionar ao PDI</button>'
    +'</div>'
    // Datas de Controle e Revisões
    +'<div style="margin-top:14px;padding-top:14px;border-top:0.5px solid var(--border);margin-bottom:14px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">📅 Datas de Controle</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
        +'<div><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Data de Criação</div>'
          +'<div style="font-size:12px;font-weight:600;color:var(--txt)">'+pdi.dataCriacao+'</div>'
        +'</div>'
        +'<div><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Próxima Revisão</div>'
          +'<input id="pdi-prox-rev" type="date" value="'+(pdi.dataProxRevisao||'')+'" '
            +'onblur="_pdiSaveRev(this)" data-pdi="'+pdi.id+'" '
            +'style="font-size:12px;padding:4px 8px;border:0.5px solid var(--border2);border-radius:6px;width:100%"/>'
        +'</div>'
      +'</div>'
      // Histórico de revisões
      +'<div style="font-size:10px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Histórico de Revisões</div>'
      +(pdi.revisoes&&pdi.revisoes.length
        ?'<div style="max-height:120px;overflow-y:auto">'
          +(pdi.revisoes||[]).slice().reverse().map(function(r,i){
            var idx2=(pdi.revisoes||[]).length-1-i;
            return '<div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:0.5px solid var(--border)">'
              +'<span style="font-size:10px;color:var(--txt3);white-space:nowrap;margin-top:1px">'+r.data+'</span>'
              +'<div style="flex:1;font-size:11px;color:var(--txt);line-height:1.4">'+r.nota+'</div>'
              +'<button class="btn btn-xs btn-danger" style="flex-shrink:0" data-pdi="'+pdi.id+'" data-idx="'+idx2+'" onclick="removerRevisao(this.dataset.pdi,this.dataset.idx)">×</button>'
            +'</div>';
          }).join('')
        +'</div>'
        :'<div style="font-size:11px;color:var(--txt3);font-style:italic">Nenhuma revisão registrada.</div>')
      // Formulário de nova revisão
      +'<div style="display:flex;gap:6px;margin-top:8px">'
        +'<input id="pdi-rev-nota" placeholder="Observação da revisão..." style="flex:1;font-size:12px"/>'
        +'<input id="pdi-rev-data" type="date" value="'+new Date().toISOString().slice(0,10)+'" style="font-size:12px;width:130px"/>'
        +'<button class="btn btn-sm" data-pdi="'+pdi.id+'" onclick="adicionarRevisao(this.dataset.pdi)">📝 Registrar</button>'
      +'</div>'
    +'</div>'

    // Rodapé
    +'<div style="display:flex;gap:8px;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-xs" data-pdi="'+pdi.id+'" data-col="'+col.id+'" onclick="deletarPDI(this.dataset.pdi,this.dataset.col)" style="border-color:#DC2626;color:#DC2626">🗑️ Excluir</button>'+'<button class="btn btn-xs" data-pdi="'+pdi.id+'" onclick="gerarPDFPDI(this.dataset.pdi)" style="border-color:#185FA5;color:#185FA5">📄 Exportar PDF</button>'
      +'<button class="btn btn-xs" data-col="'+col.id+'" onclick="verHistoricoPDI(this.dataset.col)" style="border-color:var(--txt3);color:var(--txt3)">📂 Histórico</button>'
      +'<button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="closeModal();render(\'pdi\')">✓ Fechar</button>'
    +'</div>';
    document.getElementById('modal').style.display='flex';
  setTimeout(function(){
    var inp=document.getElementById('pdi-nova-comp');
    if(inp&&!inp._bound){
      inp._bound=true;
      inp.addEventListener('keydown',function(e){
        if(e.key==='Enter'){e.preventDefault();adicionarCompetencia(window._currentPdiId);}
      });
    }
  },50);
}
function adicionarAcaoPDI(pdiId){
  var desc=(document.getElementById('na-desc')||{}).value;
  desc=(desc||'');
  if(!desc){alert('Descreva a ação.');return;}
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  var acao={id:uid(),descricao:desc,tipo:(document.getElementById('na-tipo')||{}).value||'Outro',prazo:(document.getElementById('na-prazo')||{}).value||'',responsavel:((document.getElementById('na-resp')||{}).value||''),recursos:((document.getElementById('na-rec')||{}).value||''),status:'Não iniciada',progresso:0,observacao:''};
  if(!pdis[idx].acoes)pdis[idx].acoes=[];
  pdis[idx].acoes.push(acao);
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Ação adicionada! ✓');
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

function removerAcaoPDI(pdiId,acaoIdx){
  if(!confirm('Remover esta ação?'))return;
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  pdis[idx].acoes.splice(parseInt(acaoIdx),1);
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Removida!');
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

// ─── Competências (tags dinâmicas) ──────────────────────────
function adicionarCompetencia(pdiId){
  var input=document.getElementById('pdi-nova-comp');
  var val=(input?input.value:'');
  if(!val)return;
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  if(!pdis[idx].competencias)pdis[idx].competencias=[];
  // Suportar múltiplas separadas por vírgula
  var novas=val.split(',').map(function(x){return x;}).filter(Boolean);
  novas.forEach(function(n){
    if(!pdis[idx].competencias.includes(n))pdis[idx].competencias.push(n);
  });
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  if(input)input.value='';
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

function removerCompetencia(pdiId,compIdx){
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  pdis[idx].competencias.splice(parseInt(compIdx),1);
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

// ─── Revisões e datas de controle ───────────────────────────
function _pdiSaveRev(el){
  var pdiId=el.dataset.pdi||window._currentPdiId;if(!pdiId)return;
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  pdis[idx].dataProxRevisao=el.value;
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Próxima revisão salva! ✓');
}

function adicionarRevisao(pdiId){
  var nota=(document.getElementById('pdi-rev-nota')||{}).value;nota=(nota||'');
  var data=(document.getElementById('pdi-rev-data')||{}).value||new Date().toISOString().slice(0,10);
  if(!nota){alert('Escreva uma observação para a revisão.');return;}
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  if(!pdis[idx].revisoes)pdis[idx].revisoes=[];
  pdis[idx].revisoes.push({id:uid(),data:data,nota:nota,dataCadastro:new Date().toISOString().slice(0,10)});
  // Atualizar dataProxRevisao se campo preenchido
  var proxRev=(document.getElementById('pdi-prox-rev')||{}).value;
  if(proxRev)pdis[idx].dataProxRevisao=proxRev;
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Revisão registrada! ✓');
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

function removerRevisao(pdiId,revIdx){
  if(!confirm('Remover esta revisão?'))return;
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  pdis[idx].revisoes.splice(parseInt(revIdx),1);
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Removida!');
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

function _pdiSave(el){
  var pdiId=window._currentPdiId;if(!pdiId)return;
  var campo=el.id==='pdi-status'?'status':el.id==='pdi-ciclo'?'ciclo':el.id==='pdi-comp'?'competencias':'observacoes';
  var valor=el.value;
  if(campo==='competencias')valor=valor.split(',').map(function(x){return x;}).filter(Boolean);
  atualizarCampoPDI(pdiId,campo,valor);
}

function atualizarCampoPDI(pdiId,campo,valor){
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  pdis[idx][campo]=valor;
  savePDIs(pdis);
  // Sync com banco
  const pdi=pdis[idx];
  if(pdi.dbId){
    const body={objetivo:pdi.objetivo||'',competencias:pdi.competencias||[],acoes:pdi.acoes||[],revisoes:pdi.revisoes||[],proxima_revisao:pdi.dataProxRevisao||null,status:pdi.status||'Em andamento'};
    apiCall('PUT','/api/pdis/'+pdi.dbId,body).catch(e=>console.warn('PDI update err',e));
  }
}

function editarAcaoPDI(pdiId,acaoIdx){
  var pdis=getPDIs();
  var pdi=pdis.find(function(x){return x.id===pdiId;});if(!pdi)return;
  var col=colaboradores.find(function(x){return x.id===pdi.colId;});
  var i=parseInt(acaoIdx);
  var a=pdi.acoes[i];if(!a)return;
  var tiposAcao=['Treinamento','Mentoria','Projeto','Leitura','Curso','Shadowing','Autodesenvolvimento','Outro'];
  var stAcao=['Não iniciada','Em andamento','Concluída','Pausada'];
  document.getElementById('modal-title').textContent='✏️ Editar Ação do PDI';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div class="form-grid">'
      +'<div class="field-group form-full"><div class="field-label">Descrição *</div><input id="ea-desc" value="'+(a.descricao||'')+'"/></div>'
      +'<div class="field-group"><div class="field-label">Tipo</div><select id="ea-tipo">'+tiposAcao.map(function(t){return '<option'+(a.tipo===t?' selected':'')+'>'+t+'</option>';}).join('')+'</select></div>'
      +'<div class="field-group"><div class="field-label">Status</div><select id="ea-status">'+stAcao.map(function(s){return '<option'+(a.status===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select></div>'
      +'<div class="field-group"><div class="field-label">Prazo</div><input id="ea-prazo" type="date" value="'+(a.prazo||'')+'"/></div>'
      +'<div class="field-group"><div class="field-label">Responsável</div><input id="ea-resp" value="'+(a.responsavel||'')+'"/></div>'
      +'<div class="field-group"><div class="field-label">Recursos</div><input id="ea-rec" value="'+(a.recursos||'')+'"/></div>'
      +'<div class="field-group form-full"><div class="field-label">Progresso: <span id="ea-pv">'+(a.progresso||0)+'</span>%</div>'
        +'<input type="range" min="0" max="100" value="'+(a.progresso||0)+'" id="ea-prog" oninput="document.getElementById(\'ea-pv\').textContent=this.value"/></div>'
      +'<div class="field-group form-full"><div class="field-label">Observação</div><textarea id="ea-obs">'+(a.observacao||'')+'</textarea></div>'
    +'</div>'
    +'<div style="display:flex;gap:8px;margin-top:14px;justify-content:flex-end">'
      +'<button class="btn" data-pdi="'+pdiId+'" data-col="'+pdi.colId+'" onclick="abrirPDIById(this.dataset.pdi,this.dataset.col)">Cancelar</button>'
      +'<button class="btn btn-primary" data-pdi="'+pdiId+'" data-idx="'+i+'" onclick="salvarEdicaoAcaoPDI(this.dataset.pdi,this.dataset.idx)">💾 Salvar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function salvarEdicaoAcaoPDI(pdiId,acaoIdx){
  var pdis=getPDIs();
  var idx=pdis.findIndex(function(x){return x.id===pdiId;});if(idx<0)return;
  var i=parseInt(acaoIdx);
  var old=pdis[idx].acoes[i]||{};
  pdis[idx].acoes[i]=Object.assign({},old,{
    descricao:(document.getElementById('ea-desc')||{}).value||'',
    tipo:(document.getElementById('ea-tipo')||{}).value||'Outro',
    status:(document.getElementById('ea-status')||{}).value||'Não iniciada',
    prazo:(document.getElementById('ea-prazo')||{}).value||'',
    responsavel:((document.getElementById('ea-resp')||{}).value||''),
    recursos:((document.getElementById('ea-rec')||{}).value||''),
    progresso:parseInt((document.getElementById('ea-prog')||{}).value||0),
    observacao:((document.getElementById('ea-obs')||{}).value||''),
  });
  savePDIs(pdis);
  _pdiSyncApi(pdiId);
  toast('Ação salva! ✓');
  renderModalPDI(pdis[idx],colaboradores.find(function(x){return x.id===pdis[idx].colId;}));
}

function gerarPDFPDI(pdiId){
  var pdis=getPDIs();
  var pdi=pdis.find(function(x){return x.id===pdiId;});if(!pdi)return;
  var col=colaboradores.find(function(x){return x.id===pdi.colId;});if(!col)return;
  var pct=Math.round((pdi.acoes||[]).reduce(function(a,ac){return a+(ac.progresso||0);},0)/Math.max((pdi.acoes||[]).length,1));
  var corP=pct>=80?'#1D9E75':pct>=50?'#854F0B':'#185FA5';
  var dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
  var stCor={Concluída:'#0F6E56','Em andamento':'#185FA5','Não iniciada':'#888',Pausada:'#854F0B'};
  var stBg={Concluída:'#E1F5EE','Em andamento':'#E6F1FB','Não iniciada':'#f3f4f6',Pausada:'#FAEEDA'};
  var rows=(pdi.acoes||[]).map(function(a){
    var c3=stCor[a.status]||'#888';var b3=stBg[a.status]||'#f3f4f6';
    return '<tr><td style="padding:8px 12px;font-size:11.5px;font-weight:600">'+a.descricao+'</td>'
      +'<td style="padding:8px 12px;font-size:11px;color:#6b7280">'+a.tipo+'</td>'
      +'<td style="padding:8px 12px;text-align:center"><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:'+b3+';color:'+c3+'">'+a.status+'</span></td>'
      +'<td style="padding:8px 12px;font-size:11px;color:#6b7280;text-align:center">'+(a.prazo||'—')+'</td>'
      +'<td style="padding:8px 12px"><div style="display:flex;align-items:center;gap:8px">'
        +'<div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:'+a.progresso+'%;background:'+c3+'"></div></div>'
        +'<span style="font-size:11px;font-weight:700;color:'+c3+'">'+a.progresso+'%</span></div></td></tr>';
  }).join('');
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PDI · '+col.nome+'</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;padding:40px}'
    +'@media print{body{padding:0}.np{display:none!important}@page{margin:18mm;size:A4}}'
    +'table{width:100%;border-collapse:collapse}th{background:#f9fafb;text-align:left;padding:8px 12px;font-size:10px;text-transform:uppercase;color:#6b7280;font-weight:700;border-bottom:2px solid #e5e7eb}td{border-bottom:1px solid #f3f4f6}'
    +'</style></head><body>'
    +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#1D9E75;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;font-size:14px;flex:1">PDI · '+col.nome+'</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#1D9E75;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">🖨 Imprimir</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button>'
    +'</div><div class="np" style="height:52px"></div>'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1D9E75;margin-bottom:24px">'
      +'<div><div style="font-size:9px;font-weight:700;color:#1D9E75;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Squado</div>'
      +'<div style="font-size:26px;font-weight:900;color:#111827;margin-bottom:4px">Plano de Desenvolvimento Individual</div>'
      +'<div style="font-size:13px;color:#6b7280">'+col.nome+' · '+col.nivel+' · '+col.area+'</div>'
      +'<div style="font-size:11px;color:#9ca3af;margin-top:4px">Ciclo: '+pdi.ciclo+' · Gerado em '+dataHoje+'</div></div>'
      +'<div style="text-align:center;background:'+(pct>=80?'#E1F5EE':pct>=50?'#FAEEDA':'#E6F1FB')+';border-radius:12px;padding:14px 22px;border:2px solid '+corP+'">'
        +'<div style="font-size:36px;font-weight:900;color:'+corP+'">'+pct+'%</div>'
        +'<div style="font-size:10px;color:'+corP+';font-weight:700;text-transform:uppercase">Progresso</div>'
      +'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">'
      +'<div style="background:#f9fafb;border-radius:10px;padding:14px"><div style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:8px">Status</div>'
        +'<div style="font-size:14px;font-weight:700">'+pdi.status+'</div></div>'
      +'<div style="background:#f9fafb;border-radius:10px;padding:14px"><div style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:8px">Competências</div>'
        +'<div style="display:flex;flex-wrap:wrap;gap:4px">'
      +((pdi.competencias||[]).length
        ?(pdi.competencias||[]).map(function(c){
            return '<span style="padding:2px 10px;background:#dbeafe;color:#185FA5;border-radius:20px;font-size:11px;font-weight:600">'+c+'</span>';
          }).join('')
        :'<span style="font-size:12px;color:#6b7280">—</span>')
      +'</div></div>'
    +'</div>'
    +(pdi.observacoes?'<div style="background:#f9fafb;border-radius:10px;padding:14px;margin-bottom:24px"><div style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:6px">Observações</div>'
      +'<div style="font-size:12px;color:#374151;line-height:1.7">'+pdi.observacoes+'</div></div>':'')
    +'<div style="font-size:14px;font-weight:800;color:#111827;margin-bottom:8px">Plano de Ações ('+(pdi.acoes||[]).length+')</div>'
    +'<table style="margin-bottom:24px"><thead><tr><th>Ação</th><th>Tipo</th><th style="text-align:center">Status</th><th style="text-align:center">Prazo</th><th>Progresso</th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'<div style="background:#f9fafb;border-radius:10px;padding:14px;margin-bottom:24px">'
      +'<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:12px;font-weight:700">Progresso Geral</span><span style="font-size:12px;font-weight:700;color:'+corP+'">'+pct+'%</span></div>'
      +'<div style="height:12px;background:#e5e7eb;border-radius:6px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+corP+'"></div></div>'
    +'</div>'
    +(pdi.revisoes&&pdi.revisoes.length
      ?'<div style="background:#f9fafb;border-radius:10px;padding:14px;margin-bottom:24px">'
        +'<div style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:10px">📅 Histórico de Revisões</div>'
        +'<table><thead><tr>'
          +'<th style="padding:6px 10px;text-align:left">Data</th>'
          +'<th style="padding:6px 10px;text-align:left">Observação</th>'
        +'</tr></thead><tbody>'
        +(pdi.revisoes||[]).slice().reverse().map(function(r){
          return '<tr><td style="padding:6px 10px;font-size:11px;color:#6b7280;white-space:nowrap">'+r.data+'</td>'
            +'<td style="padding:6px 10px;font-size:11px;color:#374151">'+r.nota+'</td></tr>';
        }).join('')
        +'</tbody></table>'
      +'</div>'
      :'')
    +(pdi.dataProxRevisao
      ?'<div style="background:#FAEEDA;border-radius:8px;padding:12px;margin-bottom:24px;display:flex;align-items:center;gap:10px">'
        +'<span style="font-size:18px">📅</span>'
        +'<div><div style="font-size:10px;font-weight:700;color:#854F0B;text-transform:uppercase">Próxima Revisão Prevista</div>'
          +'<div style="font-size:14px;font-weight:700;color:#854F0B">'+pdi.dataProxRevisao+'</div>'
        +'</div>'
      +'</div>'
      :'')
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:40px">'
      +'<div><div style="border-top:1px solid #374151;padding-top:8px;font-size:11px;color:#6b7280">Colaborador: '+col.nome+'</div></div>'
      +'<div><div style="border-top:1px solid #374151;padding-top:8px;font-size:11px;color:#6b7280">Gestor / Avaliador</div></div>'
    +'</div></body></html>';
  var w=window.open('','_blank','width=1000,height=780');
  if(!w){alert('Permita pop-ups.');return;}
  w.document.write(html);w.document.close();
}

// ═══ IA para PDI ═══
async function gerarPDIIA(){
  var col=colaboradores.filter(function(c){return c.status!=='Desligado';});
  if(!col.length){toast('Cadastre colaboradores primeiro.');return;}
  var temAval=avaliacoes.length>0;
  var temOKR=(ls('okrs',[])||[]).length>0;
  var temMeta=metas.filter(function(m){return m.tipo==='smart';}).length>0;

  document.getElementById('modal-title').textContent='\u{1F916} Sugerir PDI com IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="margin-bottom:12px;font-size:12px;color:var(--txt2)">A IA vai analisar o colaborador e sugerir a\u00e7\u00f5es de desenvolvimento personalizadas.</div>'
    +'<div class="field-group"><div class="field-label">Colaborador *</div>'
      +'<select id="ia-pdi-col"><option value="">Selecione...</option>'
        +col.map(function(c){var avsC=avaliacoes.filter(function(a){return a.colaboradorId===c.id;});var lastAv=avsC.length?avsC[avsC.length-1]:null;return '<option value="'+c.id+'">'+c.nome+' ('+c.nivel+')'+(lastAv?' \u2014 nota '+lastAv.mediaGeral:'')+'</option>';}).join('')
      +'</select></div>'
    +'<div class="field-group"><div class="field-label">Foco do desenvolvimento</div>'
      +'<select id="ia-pdi-foco"><option value="">Geral</option><option>T\u00e9cnico</option><option>Comportamental</option><option>Lideran\u00e7a</option><option>Gest\u00e3o</option><option>Comunica\u00e7\u00e3o</option></select></div>'
    +'<div style="background:var(--bg2);border-radius:8px;padding:10px 12px;margin-bottom:10px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);margin-bottom:8px">\u{1F4CE} Contexto para a IA considerar:</div>'
      +'<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-pdi-aval" '+(temAval?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temAval?'':' disabled')+'> \u{1F4CA} Avalia\u00e7\u00f5es (pontos fracos/fortes) <span style="font-size:10px;color:var(--txt3)">'+(temAval?'('+avaliacoes.length+')':'(nenhuma)')+'</span></label>'
      +'<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-pdi-ctx-okr" '+(temOKR?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temOKR?'':' disabled')+'> \u{1F3AF} OKRs da \u00e1rea <span style="font-size:10px;color:var(--txt3)">'+(temOKR?'('+((ls('okrs',[])||[]).length)+')':'(nenhum)')+'</span></label>'
      +'<label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--txt);cursor:pointer"><input type="checkbox" id="ia-pdi-ctx-meta" '+(temMeta?'checked':'')+' style="accent-color:#534AB7;width:16px;height:16px"'+(temMeta?'':' disabled')+'> \u2705 Metas SMART <span style="font-size:10px;color:var(--txt3)">'+(temMeta?'('+metas.filter(function(m){return m.tipo==='smart';}).length+')':'(nenhuma)')+'</span></label>'
    +'</div>'
    +'<div class="field-group"><div class="field-label">Contexto adicional (opcional)</div>'
      +'<input id="ia-pdi-ctx" placeholder="Ex: Preparar para promo\u00e7\u00e3o, melhorar gest\u00e3o de tempo..."/></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px">'
      +'<button class="btn btn-purple btn-sm" onclick="executarGeracaoPDIIA()">\u{1F916} Gerar PDI</button>'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}


async function executarGeracaoPDIIA(){
  var colId=(document.getElementById('ia-pdi-col')||{}).value;
  if(!colId){toast('Selecione um colaborador.');return;}
  var foco=(document.getElementById('ia-pdi-foco')||{}).value||'geral';
  var ctx=(document.getElementById('ia-pdi-ctx')||{}).value||'';
  var col=colaboradores.find(function(c){return c.id===colId;});
  if(!col)return;

  var avsC=avaliacoes.filter(function(a){return a.colaboradorId===colId;});
  var lastAv=avsC.length?avsC[avsC.length-1]:null;

  closeModal();
  toast('🤖 Gerando PDI com IA para '+col.nome+'...');

  var usarAval=(document.getElementById('ia-pdi-aval')||{}).checked!==false;
  var usarOKR=(document.getElementById('ia-pdi-ctx-okr')||{}).checked;
  var usarMeta=(document.getElementById('ia-pdi-ctx-meta')||{}).checked;
  var prompt='Gere um PDI (Plano de Desenvolvimento Individual) para:\n';
  prompt+='Nome: '+col.nome+'\nNível: '+col.nivel+'\nÁrea: '+(col.area||'geral')+'\n';
  if(lastAv&&usarAval){
    prompt+='Última avaliação: nota '+lastAv.mediaGeral+'\n';
    if(lastAv.secaoMedias){
      prompt+='Notas por seção: ';
      Object.entries(lastAv.secaoMedias).forEach(function(e){prompt+=e[0]+': '+e[1]+', ';});
      prompt+='\n';
      var fracos=Object.entries(lastAv.secaoMedias).filter(function(e){return e[1]<4;}).map(function(e){return e[0]+' ('+e[1]+')';});
      if(fracos.length) prompt+='⚠️ PRIORIDADE — Pontos a desenvolver (nota <4): '+fracos.join(', ')+'\n';
      var fortes=Object.entries(lastAv.secaoMedias).filter(function(e){return e[1]>=4.5;}).map(function(e){return e[0]+' ('+e[1]+')';});
      if(fortes.length) prompt+='✅ Pontos fortes: '+fortes.join(', ')+'\n';
      prompt+='INSTRUÇÃO CRÍTICA: O PDI DEVE conter ações específicas para CADA ponto fraco (nota<4). Pelo menos 1 ação por ponto fraco. As competências do PDI devem mapear diretamente os pontos fracos.\n';
    }
  }
  if(usarOKR&&col.area){
    var okrsArea=(ls('okrs',[])||[]).filter(function(o){return o.area===col.area;});
    if(okrsArea.length) prompt+='OKRs da área para alinhar: '+okrsArea.map(function(o){return o.objetivo;}).join('; ')+'\n';
  }
  if(usarMeta){
    var metasCol=metas.filter(function(m){return m.colId===colId&&m.tipo==='smart';});
    if(metasCol.length) prompt+='Metas existentes: '+metasCol.map(function(m){return m.titulo;}).join('; ')+'\n';
  }
  prompt+='Foco: '+foco+'\n';
  if(ctx) prompt+='Contexto: '+ctx+'\n';
  prompt+='\nRetorne JSON: {\"objetivo\":\"objetivo geral do PDI\",\"competencias\":[\"comp1\",\"comp2\"],\"acoes\":[{\"descricao\":\"...\",\"tipo\":\"Treinamento|Mentoria|Projeto|Leitura|Curso\",\"prazo\":\"2026-06-30\",\"progresso\":0}]}\n';
  prompt+='Gere 4-6 ações concretas e realistas. Sem markdown. Apenas JSON.';

  try{
    var token=squadoGetToken();
    var r=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:[
        {role:'system',content:'Responda SOMENTE com JSON válido. Gere PDIs concretos e realistas baseados no nível e avaliação do colaborador. Português brasileiro.'},
        {role:'user',content:prompt}
      ],max_tokens:2000})
    });
    var d=await r.json();
    var resposta=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
    var match=resposta.match(/\{[\s\S]*\}/);
    if(!match){toast('⚠️ IA não retornou JSON válido');return;}
    var sugestao=JSON.parse(match[0]);

    var pdis=getPDIs();
    pdis.push({
      id:uid(),colId:colId,colNome:col.nome,
      objetivo:sugestao.objetivo||'PDI — '+col.nome,
      status:'Em andamento',ciclo:'Semestral',
      competencias:sugestao.competencias||[],
      acoes:(sugestao.acoes||[]).map(function(a){
        return{id:uid(),descricao:a.descricao||'',tipo:a.tipo||'Treinamento',prazo:a.prazo||'',progresso:0};
      }),
      dataCriacao:new Date().toISOString().slice(0,10),
      dataProxRevisao:new Date(Date.now()+30*86400000).toISOString().slice(0,10)
    });
    savePDIs(pdis);
    saveAll();
    toast('✅ PDI gerado para '+col.nome+'!');
    render('pdi');
  }catch(e){
    toast('⚠️ Erro: '+e.message);
  }
}
