// ══════════════════════════════════════════
// AVALIAÇÃO
// ══════════════════════════════════════════
let avalState={colId:'',nivel:'',respostas:{},obs:{},pontosPos:'',oportunidades:''};

// Salvar rascunho automaticamente
function salvarRascunhoAval(){
  if(avalState.colId) lss('aval_rascunho', avalState);
}
function carregarRascunhoAval(){
  const r = ls('aval_rascunho', null);
  if(r && r.colId) {
    avalState = r;
    return true;
  }
  return false;
}
function limparRascunhoAval(){
  localStorage.removeItem('aval_rascunho');
}
function renderAvaliacao(){
  const temRascunho = avalState.colId && avalState.colId !== '';
  const rascunhoMsg = temRascunho ? `
    <div style="background:#E1F5EE;border:1px solid #9FE1CB;border-radius:10px;padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:12px">
      <span style="font-size:20px">📝</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:#0F6E56">Rascunho em andamento</div>
        <div style="font-size:11px;color:#1D9E75">Avaliação de <strong>${(colaboradores.find(x=>x.id===avalState.colId)||{}).nome||'colaborador'}</strong> — continue de onde parou</div>
      </div>
      <button class="btn btn-sm" onclick="limparRascunhoAval();avalState={colId:'',nivel:'',respostas:{},obs:{},pontosPos:'',oportunidades:''};render('avaliacao')" style="border-color:#A32D2D;color:#A32D2D">✕ Descartar</button>
    </div>` : '';
  return rascunhoMsg + `<div class="card mb-12"><div class="form-grid mb-12">
    <div class="field-group"><div class="field-label">Colaborador *</div><select id="av-col" onchange="onColChange(this.value)"><option value="">Selecione...</option>${colaboradores.map(c=>`<option value="${c.id}"${avalState.colId===c.id?' selected':''}>${c.nome}</option>`).join('')}</select></div>
    <div class="field-group"><div class="field-label">Data</div><input type="date" id="av-data" value="${new Date().toISOString().slice(0,10)}"/></div>
    <div class="field-group"><div class="field-label">Avaliador</div><input id="av-avaliador" placeholder="Nome do avaliador..." value="${(squadoGetUser()||{}).nome||''}"/></div>
    <div class="field-group"><div class="field-label">Nível detectado</div><div style="padding:7px 10px;border:0.5px solid var(--border);border-radius:7px;font-size:12px;min-height:35px;display:flex;align-items:center" id="av-nivel-show">${avalState.nivel?nivelBadge(avalState.nivel):'<span style="color:var(--txt3)">Selecione o colaborador</span>'}</div></div>
  </div>
  <div class="flex gap-6 flex-wrap mb-4">
    ${[['1-2','Nunca','#FCEBEB','#A32D2D'],['3-4','Raramente','#FAEEDA','#854F0B'],['5-6','Às vezes','#E6F1FB','#185FA5'],['7-8','Frequentemente','#E1F5EE','#0F6E56'],['9-10','Sempre','#C0DD97','#27500A']].map(([n,l,bg,c])=>`<div class="score-pill" style="background:${bg};color:${c};border-color:${c}30"><strong>${n}</strong> ${l}</div>`).join('')}
  </div></div>
  <div id="av-perguntas-wrap">${avalState.nivel?renderPerguntasForm():'<div class="card"><div class="empty-state">Selecione um colaborador para carregar as perguntas.</div></div>'}</div>
  ${avalState.nivel?`<div class="card mt-12"><div class="form-grid">
    <div class="field-group form-full"><div class="field-label">✅ Pontos positivos</div><textarea id="av-pontos" placeholder="O que o colaborador faz muito bem..."></textarea></div>
    <div class="field-group form-full"><div class="field-label">🔧 Oportunidades de melhoria</div><textarea id="av-opor" placeholder="Áreas a desenvolver..."></textarea></div>
  </div><div class="flex gap-8 mt-12 justify-end">
    <button class="btn btn-purple btn-sm" onclick="gerarSugestoesIA()" id="btn-ia-aval">🤖 Sugestões da IA</button>
    <button class="btn" onclick="avalState={colId:'',nivel:'',respostas:{},obs:{},pontosPos:'',oportunidades:''};aiSugestoes='';render('avaliacao')">Limpar</button>
    <button class="btn btn-primary" onclick="salvarAvaliacao()">💾 Salvar Avaliação</button>
  </div>
  <div id="ai-sug-aval-wrap"></div>
  </div>`:''}`;
}
function onColChange(colId){
  const c=colaboradores.find(x=>x.id===colId);if(!c)return;
  avalState.colId=colId;avalState.nivel=c.nivel;avalState.respostas={};avalState.obs={};
  document.getElementById('av-nivel-show').innerHTML=nivelBadge(c.nivel);
  document.getElementById('av-perguntas-wrap').innerHTML=renderPerguntasForm();
  render('avaliacao');setTimeout(()=>{const sel=document.getElementById('av-col');if(sel)sel.value=colId;},10);
}
function renderPerguntasForm(){
  const p=(()=>{
    const niv=avalState.nivel;
    return perguntas[niv]
      ||(niv==='Assistente'?perguntas['Assistente I']:null)
      ||(niv==='Assistente III'?perguntas['Analista I']:null)
      ||(niv==='Analista III'?perguntas['Especialista']:null)
      ||perguntas['Estagiário']||{};
  })();
  const secEntries = Object.entries(p);
  const totalSecs = secEntries.length;
  const progressBar = totalSecs > 1 ? '<div style="display:flex;gap:4px;margin-bottom:16px;padding:0 4px">'+secEntries.map(([s],i)=>'<div style="flex:1;text-align:center"><div style="height:4px;background:var(--green-bg);border-radius:2px;overflow:hidden"><div id="av-prog-'+i+'" style="height:100%;width:0%;background:var(--green);transition:width .3s"></div></div><div style="font-size:9px;color:var(--txt3);margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+s+'</div></div>').join('')+'</div>' : '';
  return progressBar + secEntries.map(([secao,qs],secIdx)=>`<div class="eval-section" id="av-sec-${secIdx}"><div class="eval-section-title"><span>${secao}</span><span style="font-size:11px;color:var(--txt3);font-weight:400">Seção ${secIdx+1} de ${totalSecs}</span></div>
    ${qs.map((q,qi)=>{const key=`${secao}__${qi}`;const val=avalState.respostas[key]||5;const sid='sv_'+key.replace(/[^a-z0-9]/gi,'_');
      return`<div style="margin-bottom:11px"><div class="eval-q-text">${q}</div><div class="slider-wrap"><span style="font-size:10px;color:var(--txt3)">1</span><input type="range" min="1" max="10" value="${val}" oninput="setResp('${key}',this.value);document.getElementById('${sid}').textContent=this.value"/><span style="font-size:10px;color:var(--txt3)">10</span><span class="slider-val" id="${sid}">${val}</span></div></div>`;}).join('')}
    <div class="field-group"><div class="field-label">Obs. sobre ${secao} (opcional)</div><textarea style="min-height:44px" oninput="avalState.obs['${secao}']=this.value">${avalState.obs[secao]||''}</textarea></div>
  </div>`).join('');
}
function setResp(k,v){avalState.respostas[k]=parseInt(v);salvarRascunhoAval();
  // Atualizar barras de progresso
  var totalResp=Object.keys(avalState.respostas).length;
  var secCounts={};Object.keys(avalState.respostas).forEach(function(key){var s=key.split('__')[0];secCounts[s]=(secCounts[s]||0)+1;});
  document.querySelectorAll('[id^="av-prog-"]').forEach(function(el,i){
    var secEl=document.getElementById('av-sec-'+i);
    if(!secEl)return;
    var secName=secEl.querySelector('.eval-section-title span');
    if(!secName)return;
    var name=secName.textContent;
    var total=secEl.querySelectorAll('input[type=range]').length;
    var done=secCounts[name]||0;
    el.style.width=Math.min(100,Math.round(done/Math.max(1,total)*100))+'%';
  });
}
function iniciarAvaliacaoPara(colId){avalState={colId:'',nivel:'',respostas:{},obs:{},pontosPos:'',oportunidades:''};go('avaliacao');setTimeout(()=>{const sel=document.getElementById('av-col');if(sel){sel.value=colId;onColChange(colId);}},60)}
function salvarAvaliacao(){
  if(!avalState.colId){alert('Selecione um colaborador');return}
  const c=colaboradores.find(x=>x.id===avalState.colId);
  // Fallback: usar nível mais próximo se o nível exato não existir
  const _niv=avalState.nivel;
  const p=perguntas[_niv]||perguntas['Assistente I']||{};
  const secaoMedias={};let total=0,count=0;
  Object.entries(p).forEach(([secao,qs])=>{let sm=0;qs.forEach((_,qi)=>{const k=`${secao}__${qi}`;const v=avalState.respostas[k]||5;sm+=v;total+=v;count++;});secaoMedias[secao]=Math.round(sm/qs.length*10)/10;});
  const mediaGeral=count?Math.round(total/count*10)/10:5;
  const obj={id:avalState.editId||uid(),colaboradorId:c.id,colaborador:c.nome,nivel:avalState.nivel,data:(document.getElementById('av-data')||{}).value||new Date().toISOString().slice(0,10),avaliador:(document.getElementById('av-avaliador')||{}).value||'',mediaGeral,secaoMedias,respostas:{...avalState.respostas},obs:{...avalState.obs},pontosPos:(document.getElementById('av-pontos')||{}).value||'',oportunidades:(document.getElementById('av-opor')||{}).value||''};
  if(avalState.editId){var idx=avaliacoes.findIndex(function(x){return x.id===avalState.editId;});if(idx>=0)avaliacoes[idx]=obj;else avaliacoes.push(obj);toast('Avaliação atualizada! ✅');}
  else{avaliacoes.push(obj);toast('Avaliação salva! 🎉');}
  saveAll();limparRascunhoAval();avalState={colId:'',nivel:'',respostas:{},obs:{},pontosPos:'',oportunidades:''};go('historico_aval');
}

// Editar avaliação existente
function editarAvaliacao(avalId){
  var a=avaliacoes.find(function(x){return x.id===avalId;});
  if(!a){alert('Avaliação não encontrada.');return;}
  // Carregar dados no avalState
  avalState={
    colId:a.colaboradorId||'',
    nivel:a.nivel||'',
    respostas:Object.assign({},a.respostas||{}),
    obs:Object.assign({},a.obs||{}),
    pontosPos:a.pontosPos||'',
    oportunidades:a.oportunidades||'',
    editId:a.id // flag de edição
  };
  closeModal();
  go('avaliacao');
  setTimeout(function(){
    var sel=document.getElementById('av-col');
    if(sel){sel.value=a.colaboradorId;onColChange(a.colaboradorId);}
    setTimeout(function(){
      var dataEl=document.getElementById('av-data');
      var avalEl=document.getElementById('av-avaliador');
      var pontosEl=document.getElementById('av-pontos');
      var oporEl=document.getElementById('av-opor');
      if(dataEl) dataEl.value=a.data||'';
      if(avalEl) avalEl.value=a.avaliador||'';
      if(pontosEl) pontosEl.value=a.pontosPos||'';
      if(oporEl) oporEl.value=a.oportunidades||'';
      // Restaurar respostas nos sliders
      Object.entries(a.respostas||{}).forEach(function(entry){
        var key=entry[0],val=entry[1];
        var sid='sv_'+key.replace(/[^a-z0-9]/gi,'_');
        var slider=document.querySelector('input[type=range][oninput*="'+key+'"]');
        if(slider){slider.value=val;slider.dispatchEvent(new Event('input'));}
      });
      // Restaurar observações
      Object.entries(a.obs||{}).forEach(function(entry){
        var secao=entry[0],txt=entry[1];
        var textareas=document.querySelectorAll('textarea[oninput*="'+secao+'"]');
        textareas.forEach(function(ta){ta.value=txt;});
      });
    },300);
  },100);
}

// ══════════════════════════════════════════
// HISTÓRICO
// ══════════════════════════════════════════
function renderHistoricoAval(search=''){
  let list=[...avaliacoes].reverse();
  
  // Filtros
  var filtroCol = window._histFiltroCol || '';
  var filtroPeriodo = window._histFiltroPeriodo || '';
  
  if(search) list=list.filter(a=>a.colaborador.toLowerCase().includes(search.toLowerCase()));
  if(filtroCol) list=list.filter(a=>a.colaborador===filtroCol);
  if(filtroPeriodo){
    var hoje=new Date();
    var limite=new Date();
    if(filtroPeriodo==='30d') limite.setDate(hoje.getDate()-30);
    else if(filtroPeriodo==='90d') limite.setDate(hoje.getDate()-90);
    else if(filtroPeriodo==='6m') limite.setMonth(hoje.getMonth()-6);
    else if(filtroPeriodo==='1a') limite.setFullYear(hoje.getFullYear()-1);
    list=list.filter(a=>new Date(a.data)>=limite);
  }
  
  var colsAvaliados=[...new Set(avaliacoes.map(a=>a.colaborador))].sort();
  
  function sc(v){return v>=8?'score-hi':v>=5?'score-mid':'score-lo'}
  
  var filtrosHtml='<div style="display:flex;gap:8px;padding:12px 16px;border-bottom:1px solid #E0E2E0;flex-wrap:wrap;align-items:center">'
    +'<select onchange="window._histFiltroCol=this.value;render(\'historico_aval\')" style="padding:5px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:12px;background:#fff"><option value="">Todos os colaboradores</option>'+colsAvaliados.map(function(c){return '<option value="'+c+'"'+(filtroCol===c?' selected':'')+'>'+c+'</option>';}).join('')+'</select>'
    +'<select onchange="window._histFiltroPeriodo=this.value;render(\'historico_aval\')" style="padding:5px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:12px;background:#fff"><option value="">Todo o período</option><option value="30d"'+(filtroPeriodo==='30d'?' selected':'')+'>Últimos 30 dias</option><option value="90d"'+(filtroPeriodo==='90d'?' selected':'')+'>Últimos 90 dias</option><option value="6m"'+(filtroPeriodo==='6m'?' selected':'')+'>Últimos 6 meses</option><option value="1a"'+(filtroPeriodo==='1a'?' selected':'')+'>Último ano</option></select>'
    +(filtroCol||filtroPeriodo?'<button onclick="window._histFiltroCol=\'\';window._histFiltroPeriodo=\'\';render(\'historico_aval\')" style="padding:4px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:11px;color:#6B7370;background:#fff;cursor:pointer">✕ Limpar</button>':'')
    +'<span style="flex:1"></span>'
    +'<span style="font-size:11px;color:#9BA09E">'+list.length+' avaliações</span>'
  +'</div>';

  return `<div class="card" style="padding:0;overflow:hidden">
    ${filtrosHtml}
    ${list.length===0?`<div class="empty-state" style="padding:40px">Nenhuma avaliação encontrada.<br><button class="btn btn-primary btn-sm mt-8" onclick="go('avaliacao')">Fazer primeira</button></div>`:`
    <div class="table-wrap"><table class="tbl">
      <thead><tr><th>Colaborador</th><th>Nível</th><th>Data</th><th>Versatil.</th><th>Equipe</th><th>Resp.</th><th>Result.</th><th>17025</th><th>Técnica</th><th>Média</th><th></th></tr></thead>
      <tbody>${list.map(a=>`<tr>
        <td><div class="flex items-center gap-8" style="white-space:nowrap">${av(a.colaborador)}<span style="font-weight:600">${a.colaborador}</span></div></td>
        <td>${nivelBadge(a.nivel)}</td><td style="color:var(--txt2);white-space:nowrap">${a.data}</td>
        ${Object.entries(a.secaoMedias||{}).slice(0,6).map(([s,v])=>`<td class="${sc(v||5)}">${v||'—'}</td>`).join('')}
        <td><span class="badge badge-green" style="font-size:12px">${a.mediaGeral}</span></td>
        <td><div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="verAvaliacao('${a.id}')">Ver</button>
          <button class="btn btn-sm" onclick="editarAvaliacao('${a.id}')">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="if(confirm('Excluir esta avaliação?')){avaliacoes=avaliacoes.filter(x=>x.id!=='${a.id}');saveAll();render('historico_aval');toast('Avaliação excluída!')}" title="Excluir">🗑</button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table></div>`}
  </div>`;
}
function verAvaliacao(id){
  var a=avaliacoes.find(function(x){return x.id===id;});if(!a)return;
  var c=(typeof colaboradores!=='undefined'?colaboradores.find(function(x){return x.nome===a.colaborador;}):null)||{nome:a.colaborador,area:''};
  var col=c;
  var respostas=a.respostas||(typeof window.respostas!=='undefined'?window.respostas:{});
  var pergNivel=a.perguntasSnapshot||a.perguntas||(typeof perguntas!=='undefined'&&perguntas[a.nivel]?perguntas[a.nivel]:(typeof window.pergNivel!=='undefined'?window.pergNivel:{}));
  var radarImg=a.radarImg||'';
  function scoreColor(v){return v>=8?'#1D9E75':v>=5?'#D97706':'#DC2626';}
  function scoreBg(v){return v>=8?'#E1F5EE':v>=5?'#FEF3C7':'#FEE2E2';}
  function scoreLabel(v){return v>=8?'Excelente':v>=5?'Em desenvolvimento':'Crítico';}
  function barHtml(v,w){w=w||'100px';return '<div style="display:inline-block;width:'+w+';height:8px;background:#eee;border-radius:4px;overflow:hidden;vertical-align:middle"><div style="width:'+(v*10)+'%;height:100%;background:'+scoreColor(v)+'"></div></div>';}
  if(typeof window.gerarPDFAvaliacao!=='function'){window.gerarPDFAvaliacao=function(avalId){
    var a=avaliacoes.find(function(x){return x.id===avalId;});if(!a){verAvaliacao(avalId);return;}
    var col=colaboradores.find(function(c){return c.nome===a.colaborador;})||{nome:a.colaborador,area:'',nivel:a.nivel};
    var dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
    function sc(v){return v>=8?'#1D9E75':v>=5?'#D97706':'#DC2626';}
    function sb(v){return v>=8?'#E1F5EE':v>=5?'#FEF3C7':'#FEE2E2';}
    function sl(v){return v>=8?'Excelente':v>=5?'Em desenvolvimento':'Crítico';}
    var secoes=Object.entries(a.secaoMedias||{});
    var secoesRows=secoes.map(function(sv){
      var s=sv[0],v=sv[1];
      return '<tr><td style="padding:8px 12px;font-size:12px;font-weight:600">'+s+'</td>'
        +'<td style="padding:8px 12px"><div style="display:flex;align-items:center;gap:8px">'
        +'<div style="flex:1;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden"><div style="height:100%;width:'+(v*10)+'%;background:'+sc(v)+'"></div></div>'
        +'<span style="font-size:12px;font-weight:700;color:'+sc(v)+'">'+v+'</span></div></td>'
        +'<td style="padding:8px 12px;text-align:center"><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:'+sb(v)+';color:'+sc(v)+'">'+sl(v)+'</span></td></tr>';
    }).join('');
    // Notas do colaborador
    var notasCol=notas.filter(function(n){return n.colNome===a.colaborador;});
    var notasHtml='';
    if(notasCol.length){
      notasHtml='<div style="page-break-before:always"></div>'
        +'<div style="border-bottom:3px solid #1D9E75;padding-bottom:12px;margin-bottom:20px;margin-top:30px">'
        +'<div style="font-size:9px;font-weight:700;color:#1D9E75;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Squado</div>'
        +'<div style="font-size:22px;font-weight:900;margin-bottom:4px">Resumo de Anotações</div>'
        +'<div style="font-size:13px;color:#6b7280">'+a.colaborador+' · Gerado em '+dataHoje+'</div></div>'
        +'<table style="width:100%;border-collapse:collapse;margin-bottom:24px"><thead><tr>'
        +'<th style="background:#f9fafb;padding:8px 12px;font-size:10px;text-transform:uppercase;color:#6b7280;border-bottom:2px solid #e5e7eb;text-align:left">Data</th>'
        +'<th style="background:#f9fafb;padding:8px 12px;font-size:10px;text-transform:uppercase;color:#6b7280;border-bottom:2px solid #e5e7eb;text-align:left">Categoria</th>'
        +'<th style="background:#f9fafb;padding:8px 12px;font-size:10px;text-transform:uppercase;color:#6b7280;border-bottom:2px solid #e5e7eb;text-align:left">Anotação</th>'
        +'</tr></thead><tbody>'
        +notasCol.slice(-15).map(function(n){
          var catCor={'Desempenho':'#0F6E56','Comportamento':'#185FA5','Técnico':'#854F0B','Reconhecimento':'#3B6D11','Atenção':'#A32D2D','Desenvolvimento':'#534AB7','Geral':'#666'};
          return '<tr><td style="padding:6px 12px;font-size:11px;color:#6b7280;white-space:nowrap;border-bottom:1px solid #f3f4f6">'+(n.data||'')+'</td>'
            +'<td style="padding:6px 12px;font-size:11px;font-weight:600;color:'+(catCor[n.categoria]||'#666')+';border-bottom:1px solid #f3f4f6">'+(n.categoria||'Geral')+'</td>'
            +'<td style="padding:6px 12px;font-size:11px;color:#374151;border-bottom:1px solid #f3f4f6">'+n.texto+'</td></tr>';
        }).join('')
        +'</tbody></table>';
    }
    // PDI do colaborador
    var pdiCol=getPDIs().filter(function(p){return p.colId===col.id;});
    var pdiAtivo=pdiCol.find(function(p){return p.status==='Em andamento';})||pdiCol[0];
    var pdiHtml='';
    if(pdiAtivo){
      var pdiPct=Math.round((pdiAtivo.acoes||[]).reduce(function(a2,ac){return a2+(ac.progresso||0);},0)/Math.max((pdiAtivo.acoes||[]).length,1));
      var pdiCor=pdiPct>=80?'#1D9E75':pdiPct>=50?'#D97706':'#185FA5';
      pdiHtml+='<div style="margin-top:24px;background:#f9fafb;border-radius:10px;padding:16px">'
        +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'
        +'<div style="font-size:14px;font-weight:800">PDI — '+(pdiAtivo.ciclo||'Atual')+'</div>'
        +'<div style="font-size:24px;font-weight:900;color:'+pdiCor+'">'+pdiPct+'%</div></div>'
        +'<div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;margin-bottom:12px"><div style="height:100%;width:'+pdiPct+'%;background:'+pdiCor+'"></div></div>';
      (pdiAtivo.acoes||[]).forEach(function(ac){
        var acCor=ac.status==='Concluída'?'#1D9E75':ac.status==='Em andamento'?'#185FA5':'#888';
        pdiHtml+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px">'
          +'<span style="color:'+acCor+'">'+(ac.status==='Concluída'?'✅':ac.status==='Em andamento'?'🔵':'⭕')+'</span>'
          +'<span style="flex:1;color:#374151">'+ac.descricao+'</span>'
          +'<span style="font-weight:700;color:'+acCor+'">'+ac.progresso+'%</span></div>';
      });
      pdiHtml+='</div>';
    }
    var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Avaliação · '+a.colaborador+'</title>'
      +'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;padding:40px}'
      +'@media print{body{padding:0}.np{display:none!important}@page{margin:18mm;size:A4}}'
      +'table{width:100%;border-collapse:collapse}th{background:#f9fafb;text-align:left;padding:8px 12px;font-size:10px;text-transform:uppercase;color:#6b7280;font-weight:700;border-bottom:2px solid #e5e7eb}td{border-bottom:1px solid #f3f4f6}'
      +'</style></head><body>'
      +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#1D9E75;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;font-size:14px;flex:1">Avaliação · '+a.colaborador+'</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#1D9E75;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">🖨 Imprimir</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button></div>'
      +'<div class="np" style="height:52px"></div>'
      // Header
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1D9E75;margin-bottom:24px">'
      +'<div><div style="font-size:9px;font-weight:700;color:#1D9E75;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Squado</div>'
      +'<div style="font-size:26px;font-weight:900;margin-bottom:4px">Avaliação de Desempenho</div>'
      +'<div style="font-size:13px;color:#6b7280">'+a.colaborador+' · '+(a.nivel||'')+'</div>'
      +'<div style="font-size:11px;color:#9ca3af;margin-top:4px">Data: '+(a.data||'')+(a.avaliador?' · Avaliador: '+a.avaliador:'')+' · Gerado em '+dataHoje+'</div></div>'
      +'<div style="text-align:center;background:'+sb(a.mediaGeral)+';border-radius:12px;padding:14px 22px;border:2px solid '+sc(a.mediaGeral)+'">'
      +'<div style="font-size:36px;font-weight:900;color:'+sc(a.mediaGeral)+'">'+a.mediaGeral+'</div>'
      +'<div style="font-size:10px;color:'+sc(a.mediaGeral)+';font-weight:700;text-transform:uppercase">'+sl(a.mediaGeral)+'</div></div></div>'
      // Seções
      +'<div style="font-size:14px;font-weight:800;margin-bottom:8px">Resultados por Seção</div>'
      +'<table style="margin-bottom:24px"><thead><tr><th>Seção</th><th>Nota</th><th style="text-align:center">Classificação</th></tr></thead><tbody>'+secoesRows+'</tbody></table>'
      // Pontos positivos e oportunidades
      +(a.pontosPos?'<div style="background:#E1F5EE;border-radius:10px;padding:14px;margin-bottom:12px"><div style="font-size:10px;font-weight:700;color:#0F6E56;text-transform:uppercase;margin-bottom:6px">Pontos Positivos</div><div style="font-size:12px;color:#374151;line-height:1.7">'+a.pontosPos+'</div></div>':'')
      +(a.oportunidades?'<div style="background:#FAEEDA;border-radius:10px;padding:14px;margin-bottom:12px"><div style="font-size:10px;font-weight:700;color:#854F0B;text-transform:uppercase;margin-bottom:6px">Oportunidades de Melhoria</div><div style="font-size:12px;color:#374151;line-height:1.7">'+a.oportunidades+'</div></div>':'')
      // Assinaturas
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:40px">'
      +'<div><div style="border-top:1px solid #374151;padding-top:8px;font-size:11px;color:#6b7280">Colaborador: '+a.colaborador+'</div></div>'
      +'<div><div style="border-top:1px solid #374151;padding-top:8px;font-size:11px;color:#6b7280">Gestor / Avaliador'+(a.avaliador?': '+a.avaliador:'')+'</div></div></div>'
      // Página 2: Resumo (notas + PDI)
      +notasHtml+pdiHtml
      +'</body></html>';
    var w=window.open('','_blank','width=1000,height=780');
    if(!w){alert('Permita pop-ups.');return;}
    w.document.write(html);w.document.close();
  };}
  if(typeof window.editarAvaliacao!=='function'){window.editarAvaliacao=function(x){alert('Edição em construção');};}
  var secoes=Object.entries(a.secaoMedias||{});
  function sc(v){return v>=8?'score-hi':v>=5?'score-mid':'score-lo';}
  var secoesGrid=secoes.map(function(sv){
    var s=sv[0],v=sv[1];
    return '<div style="background:var(--bg2);border-radius:8px;padding:10px 13px">'
      +'<div style="font-size:10px;color:var(--txt2);margin-bottom:3px">'+s+'</div>'
      +'<div class="flex items-center gap-8"><div class="progress-bar" style="flex:1">'
        +'<div class="progress-fill" style="width:'+(v*10)+'%;background:var(--green)"></div>'
      +'</div><span class="'+sc(v)+'" style="font-size:14px">'+v+'</span></div>'
      +((a.obs&&a.obs[s])?'<div style="font-size:10px;color:var(--txt3);margin-top:3px">'+a.obs[s]+'</div>':'')
    +'</div>';
  }).join('');
  var extras='';
  if(a.pontosPos||a.oportunidades){
    extras='<div class="divider"></div><div class="form-grid">'
      +(a.pontosPos?'<div class="field-group form-full"><div class="field-label" style="color:#0F6E56">\u2705 Pontos positivos</div><div style="font-size:12px;padding:8px;background:#E1F5EE;border-radius:7px">'+a.pontosPos+'</div></div>':'')
      +(a.oportunidades?'<div class="field-group form-full"><div class="field-label" style="color:#854F0B">\uD83D\uDD27 Oportunidades</div><div style="font-size:12px;padding:8px;background:#FAEEDA;border-radius:7px">'+a.oportunidades+'</div></div>':'')
    +'</div>';
  }
  document.getElementById('modal').style.display='flex';
  document.getElementById('modal-title').textContent='Avalia\u00E7\u00E3o \u00B7 '+a.colaborador;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div class="flex items-center gap-16 mb-14">'+av(a.colaborador,true)
      +'<div style="flex:1"><div style="font-size:16px;font-weight:600">'+a.colaborador+'</div>'
      +'<div style="font-size:12px;color:var(--txt2)">'+a.data+(a.avaliador?' \u00B7 '+a.avaliador:'')+'</div>'
      +'<div class="mt-8">'+nivelBadge(a.nivel)+'</div></div>'
      +'<div style="text-align:center"><div style="font-size:32px;font-weight:700;color:var(--green)">'+a.mediaGeral+'</div>'
      +'<div style="font-size:10px;color:var(--txt3)">M\u00E9dia geral</div></div>'
    +'</div><div class="divider"></div>'
    +'<div style="display:flex;gap:20px;margin-bottom:14px;align-items:flex-start">'
      +'<div style="flex-shrink:0;text-align:center">'
        +'<canvas id="radar-canvas" width="220" height="220" style="border-radius:8px;background:#fafafa;border:0.5px solid var(--border)"></canvas>'
        +'<div style="font-size:10px;color:var(--txt3);margin-top:4px">Compet\u00EAncias (0\u201310)</div>'
      +'</div>'
      +'<div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:9px;align-content:start">'+secoesGrid+'</div>'
    +'</div>'
    +extras
    +'<div class="flex gap-8 mt-14 justify-between">'
      +'<button class="btn btn-danger btn-sm" onclick="delAvaliacao(\''+id+'\')">Excluir</button>'
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-sm" onclick="editarAvaliacao(\''+id+'\')">✏️ Editar</button>'
        +'<button class="btn btn-sm" onclick="gerarPDFAvaliacao(\''+id+'\')" style="border-color:#185FA5;color:#185FA5">📄 PDF</button>'
      +'</div>'
    +'</div>';

  // Desenhar radar chart no canvas (sincrono) e gerar radarImg
  (function(){
    try{
      var _cv=document.getElementById('radar-canvas');
      if(!_cv||!_cv.getContext)return;
      var _ctx=_cv.getContext('2d');
      var _W=_cv.width,_H=_cv.height;
      var _cx=_W/2,_cy=_H/2,_r=Math.min(_W,_H)/2-30;
      var _labels=Object.keys(a.secaoMedias||{});
      var _values=_labels.map(function(l){return a.secaoMedias[l]||0;});
      var _N=_labels.length;
      if(_N<3)return;
      _ctx.clearRect(0,0,_W,_H);
      _ctx.strokeStyle='#e5e7eb';_ctx.lineWidth=1;
      for(var _g=1;_g<=5;_g++){
        _ctx.beginPath();
        for(var _i=0;_i<_N;_i++){
          var _ang=Math.PI*2*_i/_N-Math.PI/2;
          var _rr=_r*_g/5;
          var _x=_cx+_rr*Math.cos(_ang),_y=_cy+_rr*Math.sin(_ang);
          if(_i===0)_ctx.moveTo(_x,_y);else _ctx.lineTo(_x,_y);
        }
        _ctx.closePath();_ctx.stroke();
      }
      for(var _a2=0;_a2<_N;_a2++){
        var _ang2=Math.PI*2*_a2/_N-Math.PI/2;
        _ctx.beginPath();_ctx.moveTo(_cx,_cy);
        _ctx.lineTo(_cx+_r*Math.cos(_ang2),_cy+_r*Math.sin(_ang2));
        _ctx.stroke();
      }
      _ctx.beginPath();
      for(var _d=0;_d<_N;_d++){
        var _ang3=Math.PI*2*_d/_N-Math.PI/2;
        var _val=Math.max(0,Math.min(10,_values[_d]));
        var _rd=_r*_val/10;
        var _xd=_cx+_rd*Math.cos(_ang3),_yd=_cy+_rd*Math.sin(_ang3);
        if(_d===0)_ctx.moveTo(_xd,_yd);else _ctx.lineTo(_xd,_yd);
      }
      _ctx.closePath();
      _ctx.fillStyle='rgba(29,158,117,.25)';_ctx.fill();
      _ctx.strokeStyle='#1D9E75';_ctx.lineWidth=2;_ctx.stroke();
      for(var _p=0;_p<_N;_p++){
        var _ang4=Math.PI*2*_p/_N-Math.PI/2;
        var _val2=Math.max(0,Math.min(10,_values[_p]));
        var _rp=_r*_val2/10;
        var _xp=_cx+_rp*Math.cos(_ang4),_yp=_cy+_rp*Math.sin(_ang4);
        _ctx.beginPath();_ctx.arc(_xp,_yp,3,0,Math.PI*2);
        _ctx.fillStyle='#1D9E75';_ctx.fill();
      }
      _ctx.fillStyle='#374151';_ctx.font='9px -apple-system,sans-serif';_ctx.textAlign='center';_ctx.textBaseline='middle';
      for(var _k=0;_k<_N;_k++){
        var _ang5=Math.PI*2*_k/_N-Math.PI/2;
        var _xl=_cx+(_r+15)*Math.cos(_ang5),_yl=_cy+(_r+15)*Math.sin(_ang5);
        var _lbl=_labels[_k].length>15?_labels[_k].slice(0,13)+'..':_labels[_k];
        _ctx.fillText(_lbl,_xl,_yl);
      }
      radarImg=_cv.toDataURL('image/png');
    }catch(_e){}
  })();

  // Tabela macro de seções
  var macroRows=secoes.map(function(sv){
    var s=sv[0],v=sv[1];
    return '<tr>'
      +'<td style="padding:8px 12px;font-size:12.5px;color:#333;border-bottom:1px solid #f0f0f0">'+s+'</td>'
      +'<td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;width:130px">'+barHtml(v)+'</td>'
      +'<td style="padding:8px 12px;font-size:13px;font-weight:700;color:'+scoreColor(v)+';border-bottom:1px solid #f0f0f0;white-space:nowrap">'+v+'</td>'
      +'<td style="padding:8px 12px;border-bottom:1px solid #f0f0f0"><span style="font-size:10px;padding:2px 8px;border-radius:20px;background:'+scoreBg(v)+';color:'+scoreColor(v)+';font-weight:700">'+scoreLabel(v)+'</span></td>'
    +'</tr>';
  }).join('');

  // Detalhe por seção: perguntas + notas individuais
  var detalheHtml='';
  secoes.forEach(function(sv){
    var secao=sv[0], media=sv[1];
    var qs=pergNivel[secao]||[];
    if(!qs.length) return;

    // Linhas de perguntas
    var qRows=qs.map(function(pergunta, qi){
      var key=secao+'__'+qi;
      var nota=parseFloat(respostas[key])||5;
      return '<tr>'
        +'<td style="padding:7px 12px;font-size:11.5px;color:#374151;border-bottom:1px solid #f5f5f5;line-height:1.5">'+pergunta+'</td>'
        +'<td style="padding:7px 12px;width:110px;border-bottom:1px solid #f5f5f5">'+barHtml(nota,'90px')+'</td>'
        +'<td style="padding:7px 12px;text-align:center;font-size:13px;font-weight:800;color:'+scoreColor(nota)+';border-bottom:1px solid #f5f5f5;white-space:nowrap;width:48px">'+nota+'</td>'
        +'<td style="padding:7px 12px;border-bottom:1px solid #f5f5f5;width:100px"><span style="font-size:9px;padding:2px 7px;border-radius:20px;background:'+scoreBg(nota)+';color:'+scoreColor(nota)+';font-weight:700;white-space:nowrap">'+scoreLabel(nota)+'</span></td>'
      +'</tr>';
    }).join('');

    detalheHtml+='<div style="margin-bottom:20px;break-inside:avoid">'
      // Cabeçalho da seção
      +'<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f8f9fa;border-left:4px solid '+scoreColor(media)+';border-radius:0 6px 6px 0;margin-bottom:0">'
        +'<span style="font-size:13px;font-weight:700;color:#111">'+secao+'</span>'
        +'<div style="display:flex;align-items:center;gap:10px">'
          +'<span style="font-size:11px;color:#666">Média da seção</span>'
          +'<span style="font-size:18px;font-weight:800;color:'+scoreColor(media)+'">'+media+'</span>'
          +'<span style="font-size:10px;padding:2px 8px;border-radius:20px;background:'+scoreBg(media)+';color:'+scoreColor(media)+';font-weight:700">'+scoreLabel(media)+'</span>'
        +'</div>'
      +'</div>'
      // Tabela de perguntas
      +'<table style="width:100%;border-collapse:collapse">'
        +'<thead><tr style="background:#f8f9fa">'
          +'<th style="padding:6px 12px;text-align:left;font-size:9.5px;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Pergunta</th>'
          +'<th style="padding:6px 12px;font-size:9.5px;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Score</th>'
          +'<th style="padding:6px 12px;font-size:9.5px;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb;text-align:center">Nota</th>'
          +'<th style="padding:6px 12px;font-size:9.5px;color:#888;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb">Status</th>'
        +'</tr></thead>'
        +'<tbody>'+qRows+'</tbody>'
      +'</table>'
    +'</div>';
  });

  var dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  var html='<!DOCTYPE html><html><head><meta charset="UTF-8">'
    +'<title>Avalia\u00E7\u00E3o \u00B7 '+a.colaborador+'</title>'
    +'<style>'
    +'*{margin:0;padding:0;box-sizing:border-box}'
    +'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1a1a18;padding:36px}'
    +'@media print{body{padding:0}.np{display:none!important}@page{margin:15mm;size:A4}}'
    +'table{width:100%;border-collapse:collapse}'
    +'</style></head><body>'

    // Botão imprimir
    +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#1D9E75;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;font-size:14px;flex:1">Avalia\u00E7\u00E3o de Desempenho \u00B7 '+a.colaborador+'</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#1D9E75;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">\uD83D\uDDA8\uFE0F Imprimir / PDF</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">\u00D7</button>'
    +'</div><div class="np" style="height:52px"></div>'

    // Cabeçalho
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:3px solid #1D9E75">'
      +'<div>'
        +'<div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px">Squado · Gest\u00E3o de Pessoas</div>'
        +'<h1 style="font-size:22px;font-weight:800;margin-bottom:3px">Avalia\u00E7\u00E3o de Desempenho</h1>'
        +'<div style="font-size:16px;color:#1D9E75;font-weight:700">'+a.colaborador+'</div>'
        +'<div style="font-size:12px;color:#888;margin-top:4px">'+a.nivel+(col.area?' \u00B7 '+col.area:'')+'</div>'
      +'</div>'
      +'<div style="text-align:right">'
        +'<div style="font-size:10px;color:#999;margin-bottom:2px">Data da avalia\u00E7\u00E3o</div>'
        +'<div style="font-size:14px;font-weight:700">'+a.data+'</div>'
        +(a.avaliador?'<div style="font-size:11px;color:#888;margin-top:3px">Avaliador: '+a.avaliador+'</div>':'')
        +'<div style="margin-top:10px;text-align:center;background:#1D9E75;border-radius:10px;padding:10px 18px;display:inline-block">'
          +'<div style="font-size:9px;color:rgba(255,255,255,.8);text-transform:uppercase;letter-spacing:.08em">M\u00E9dia Geral</div>'
          +'<div style="font-size:32px;font-weight:900;color:#fff;line-height:1">'+a.mediaGeral+'</div>'
          +'<div style="font-size:9px;color:rgba(255,255,255,.7)">de 10</div>'
        +'</div>'
      +'</div>'
    +'</div>'

    // ── PÁGINA 1: Radar + Tabela Macro ────────────────────────
    +'<div style="display:flex;gap:24px;margin-bottom:24px;align-items:flex-start">'
      +'<div style="flex-shrink:0">'
        +'<div style="font-size:10px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Gr\u00E1fico Radar</div>'
        +'<img src="'+radarImg+'" style="width:220px;height:220px;display:block;border-radius:8px"/>'
      +'</div>'
      +'<div style="flex:1">'
        +'<div style="font-size:10px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Pontua\u00E7\u00E3o por Compet\u00EAncia</div>'
        +'<table><thead><tr>'
          +'<th style="text-align:left;padding:7px 12px;font-size:9.5px;color:#888;text-transform:uppercase;border-bottom:2px solid #eee">Compet\u00EAncia</th>'
          +'<th style="padding:7px 12px;font-size:9.5px;color:#888;text-transform:uppercase;border-bottom:2px solid #eee">Score</th>'
          +'<th style="padding:7px 12px;font-size:9.5px;color:#888;text-transform:uppercase;border-bottom:2px solid #eee;text-align:center">Nota</th>'
          +'<th style="padding:7px 12px;font-size:9.5px;color:#888;text-transform:uppercase;border-bottom:2px solid #eee">Status</th>'
        +'</tr></thead>'
        +'<tbody>'+macroRows+'</tbody></table>'
      +'</div>'
    +'</div>'

    // Pontos Positivos e Oportunidades
    +((a.pontosPos||a.oportunidades)
      ?'<div style="display:flex;gap:12px;margin-bottom:24px">'
        +(a.pontosPos?'<div style="flex:1;background:#E1F5EE;border-left:4px solid #1D9E75;border-radius:0 8px 8px 0;padding:12px 14px"><div style="font-size:9px;font-weight:700;color:#0F6E56;text-transform:uppercase;margin-bottom:6px">\u2705 Pontos Positivos</div><div style="font-size:12.5px;line-height:1.6">'+a.pontosPos.replace(/\n/g,'<br>')+'</div></div>':'')
        +(a.oportunidades?'<div style="flex:1;background:#FAEEDA;border-left:4px solid #854F0B;border-radius:0 8px 8px 0;padding:12px 14px"><div style="font-size:9px;font-weight:700;color:#854F0B;text-transform:uppercase;margin-bottom:6px">\uD83D\uDD27 Oportunidades de Melhoria</div><div style="font-size:12.5px;line-height:1.6">'+a.oportunidades.replace(/\n/g,'<br>')+'</div></div>':'')
      +'</div>'
      :'')

    // ── PÁGINA 2+: Detalhe por Seção ─────────────────────────
    +'<div style="page-break-before:always"></div>'
    +'<div style="margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #1D9E75">'
      +'<div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Squado · Avalia\u00E7\u00E3o de Desempenho</div>'
      +'<h2 style="font-size:18px;font-weight:800">Detalhe por Pergunta \u00B7 '+a.colaborador+'</h2>'
      +'<div style="font-size:11px;color:#888;margin-top:2px">'+a.data+(a.avaliador?' · Avaliador: '+a.avaliador:'')+' · Nível: '+a.nivel+'</div>'
    +'</div>'

    +detalheHtml

    // Rodapé
    +'<div style="margin-top:28px;padding-top:12px;border-top:1px solid #eee;display:flex;justify-content:space-between;font-size:9px;color:#bbb">'
      +'<span>Gestão de Pessoas</span>'
      +'<span>'+dataHoje+'</span>'
    +'</div>'
    +'</body></html>';

  var win=window.open('','_blank','width=1000,height=780');
  if(!win){alert('Permita pop-ups para gerar o relatório.');return;}
  win.document.write(html);win.document.close();
}


function delAvaliacao(id){if(!confirm('Excluir?'))return;avaliacoes=avaliacoes.filter(x=>x.id!==id);saveAll();closeModal();render(currentPage)}

// ══════════════════════════════════════════
// PERGUNTAS
// ══════════════════════════════════════════
function renderPerguntas(){
  const niveisDisp=Object.keys(perguntas);
  const ativo=window._pergNivelAtivo&&perguntas[window._pergNivelAtivo]?window._pergNivelAtivo:niveisDisp[0];
  return`<div class="card"><div style="font-size:12px;color:var(--txt2);margin-bottom:14px">Edite as perguntas por nível.</div>
    <div class="tabs" id="perg-tabs">${niveisDisp.map((n,i)=>`<div class="tab${n===ativo?' active':''}" style="display:inline-flex;align-items:center;gap:4px">
        <span onclick="switchPergTab('${n}',this.parentElement)">${n}</span>
        <span onclick="renomearNivel('${n}')" title="Renomear" style="cursor:pointer;opacity:.5;font-size:10px" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.5">✏️</span>
        <span onclick="excluirNivel('${n}')" title="Excluir" style="cursor:pointer;opacity:.5;font-size:10px;color:#A32D2D" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.5">✕</span>
      </div>`).join('')}<div class="tab" onclick="addNivelPerguntas()" style="color:var(--green)">+ Nível</div></div>
    <div id="perg-content">${renderPergTabContent(ativo)}</div></div>`;
}
function switchPergTab(nivel,el){window._pergNivelAtivo=nivel;document.querySelectorAll('#perg-tabs .tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.getElementById('perg-content').innerHTML=renderPergTabContent(nivel)}
function renderPergTabContent(nivel){
  const secs=perguntas[nivel]||{};
  return`<div>${Object.entries(secs).map(([sec,qs])=>`<div class="eval-section">
    <div class="eval-section-title">
      <span>${sec}</span>
      <div style="display:flex;gap:4px">
        <button class="btn btn-sm" onclick="addPergunta('${nivel}','${sec}')">+ Pergunta</button>
        <button class="btn btn-sm" onclick="renomearSecao('${nivel}','${sec}')" title="Renomear seção">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="excluirSecao('${nivel}','${sec}')" title="Excluir seção">✕</button>
      </div>
    </div>
    ${qs.map((q,qi)=>`<div class="edit-q-row"><input value="${q.replace(/"/g,'&quot;')}" onchange="updatePergunta('${nivel}','${sec}',${qi},this.value)"/><button class="btn btn-xs btn-danger" onclick="delPergunta('${nivel}','${sec}',${qi})">×</button></div>`).join('')}
  </div>`).join('')}<div class="flex gap-8 mt-12"><button class="btn btn-sm" onclick="addSecao('${nivel}')">+ Nova Seção</button><button class="btn btn-primary btn-sm" onclick="salvarPerguntas()">💾 Salvar</button></div></div>`;
}
function updatePergunta(nivel,sec,qi,val){if(perguntas[nivel]&&perguntas[nivel][sec])perguntas[nivel][sec][qi]=val}
function delPergunta(nivel,sec,qi){if(!confirm('Excluir?'))return;perguntas[nivel][sec].splice(qi,1);saveAll();render('perguntas')}
function addPergunta(nivel,sec){perguntas[nivel][sec].push('Nova pergunta...');saveAll();render('perguntas')}
function addSecao(nivel){const s=prompt('Nome da nova seção:');if(s&&!perguntas[nivel][s]){perguntas[nivel][s]=[];saveAll();render('perguntas')}}
function addNivelPerguntas(){const n=prompt('Nome do nível:');if(n&&!perguntas[n]){perguntas[n]={...perguntas['Estagiário']};saveAll();render('perguntas')}}
function salvarPerguntas(){saveAll();toast('Perguntas salvas!')}

function excluirNivel(nome){
  if(!confirm('Excluir o nível "'+nome+'" e todas as suas perguntas?'))return;
  delete perguntas[nome];
  window._pergNivelAtivo=null;
  saveAll();
  render('perguntas');
  toast('Nível excluído!');
}

function renomearNivel(nomeAtual){
  var novo=prompt('Novo nome para o nível "'+nomeAtual+'":',nomeAtual);
  if(!novo||novo===nomeAtual)return;
  if(perguntas[novo]){alert('Já existe um nível com esse nome.');return;}
  perguntas[novo]=perguntas[nomeAtual];
  delete perguntas[nomeAtual];
  window._pergNivelAtivo=novo;
  saveAll();
  render('perguntas');
  toast('Nível renomeado!');
}

function excluirSecao(nivel,secao){
  if(!confirm('Excluir a seção "'+secao+'" e todas as perguntas?'))return;
  delete perguntas[nivel][secao];
  saveAll();
  render('perguntas');
  toast('Seção excluída!');
}

function renomearSecao(nivel,secaoAtual){
  var novo=prompt('Novo nome para a seção "'+secaoAtual+'":',secaoAtual);
  if(!novo||novo===secaoAtual)return;
  if(perguntas[nivel][novo]){alert('Já existe uma seção com esse nome.');return;}
  perguntas[nivel][novo]=perguntas[nivel][secaoAtual];
  delete perguntas[nivel][secaoAtual];
  saveAll();
  render('perguntas');
  toast('Seção renomeada!');
}

// ══════════════════════════════════════════
// NÍVEIS
// ══════════════════════════════════════════

// ═══ PDI (módulo externo) ═══
// → public/js/pdi.js

// ═══════════════════════════════════════════════════════════════
// VALORES E CULTURA
// ═══════════════════════════════════════════════════════════════
function getValores(){
  return ls('valores_v1',null);
}
function saveValores(obj){lss('valores_v1',obj);if(typeof agendarSync==='function')agendarSync();}

// ══════════════════════════════════════════════════
// GESTÃO DE ÁREAS
// ══════════════════════════════════════════════════
function renderAvaliacaoHub(){
  const abaAtiva = currentPage === 'historico_aval' ? 'historico_aval'
                 : currentPage === 'perguntas'     ? 'perguntas'
                 : 'avaliacao';

  // Conteúdo de cada aba
  let conteudo = '';
  if (abaAtiva === 'avaliacao') {
    carregarRascunhoAval();
    conteudo = renderAvaliacao();
  } else if (abaAtiva === 'historico_aval') {
    conteudo = renderHistoricoAval('');
  } else if (abaAtiva === 'perguntas') {
    conteudo = renderPerguntas();
  }

  const tabs = [
    {id:'avaliacao',     icon:'📋', label:'Nova Avaliação'},
    {id:'historico_aval',icon:'🕐', label:'Histórico'},
    {id:'perguntas',     icon:'⚙️', label:'Configurar Perguntas'},
  ];

  const tabButtons = tabs.map(t => `
    <button onclick="go('${t.id}')"
      style="padding:8px 20px;border:none;${tabs.indexOf(t)>0?'border-left:0.5px solid var(--border2);':''}
             font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;
             ${abaAtiva===t.id?'background:var(--green);color:#fff':'background:var(--bg2);color:var(--txt2)'}">
      ${t.icon} ${t.label}
    </button>`).join('');

  return `
    <div style="display:flex;gap:4px;margin-bottom:18px">
      <button id="tab-aval-nova" class="btn btn-primary btn-sm" onclick="go('avaliacao')">📋 Nova Avaliação</button>
      <button id="tab-aval-hist" class="btn btn-sm" onclick="go('historico_aval')">🕐 Histórico</button>
      <button id="tab-aval-conf" class="btn btn-sm" onclick="go('perguntas')">⚙️ Configurar Perguntas</button>
    </div>
    ${conteudo}`;
}
