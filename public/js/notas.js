// ══════════════════════════════════════════════════════════════
// BLOCO DE NOTAS COM IA
// ══════════════════════════════════════════════════════════════
function renderNotas(search=''){
  const cfg=getIAConfig();
  const hasKey=!!(cfg.mode==='ollama'?cfg.ollamaUrl:cfg.remoteUrl);

  let list=[...notas];
  if(search)list=list.filter(n=>
    n.colNome.toLowerCase().includes(search.toLowerCase())||
    n.texto.toLowerCase().includes(search.toLowerCase())||
    (n.categoria||'').toLowerCase().includes(search.toLowerCase())
  );
  list.sort((a,b)=>(b.dataHora?b.dataHora.localeCompare(a.dataHora||''):0)||(b.data?b.data.localeCompare(a.data||''):0));

  const catColors={
    'Desempenho':{bg:'#E1F5EE',cor:'#0F6E56'},
    'Comportamento':{bg:'#E6F1FB',cor:'#185FA5'},
    'Técnico':{bg:'#FAEEDA',cor:'#854F0B'},
    'Reconhecimento':{bg:'#C0DD97',cor:'#3B6D11'},
    'Atenção':{bg:'#FCEBEB',cor:'#A32D2D'},
    'Desenvolvimento':{bg:'#EEEDFE',cor:'#534AB7'},
    'Geral':{bg:'var(--bg2)',cor:'var(--txt2)'}
  };
  const sentEmoji={'positivo':'😊','negativo':'😟','neutro':'😐'};

  const cats=[...new Set(notas.map(n=>n.categoria))].filter(Boolean);
  const colNames=[...new Set(notas.map(n=>n.colNome))].filter(n=>n&&n!=='Geral');
  const banner='';

  // Cards de notas
  const noteCards=list.length===0
    ?'<div class="card"><div class="empty-state">Nenhuma anotação ainda.<br>Escreva algo acima e clique "Organizar com IA".</div></div>'
    :list.map(function(n){
        const cc=catColors[n.categoria]||catColors['Geral'];
        const senti=sentEmoji[n.sentimento]||'';
        const hora=n.dataExib||n.data||'';
        return '<div class="note-card" style="border-left:3px solid '+cc.cor+'">'
          +'<div class="note-card-header">'
            +'<div class="flex items-center gap-8">'+av(n.colNome,false,true)
              +'<div><div class="note-col-name">'+n.colNome+'</div>'
              +(n.colArea?'<div style="font-size:9px;color:var(--txt3)">'+n.colArea+'</div>':'')
              +'</div>'
            +'</div>'
            +'<div class="flex items-center gap-6">'
              +(senti?'<span title="'+n.sentimento+'" style="font-size:14px">'+senti+'</span>':'')
              +'<span class="note-cat" style="background:'+cc.bg+';color:'+cc.cor+'">'+(n.categoria||'Geral')+'</span>'
              +'<span class="note-date">'+hora+'</span>'
              +'<button class="btn btn-xs btn-danger" onclick="delNota(\''+n.id+'\')">×</button>'
            +'</div>'
          +'</div>'
          +'<div class="note-text">'+(n.texto||'').replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</div>'
          +(n.rawOriginal&&n.rawOriginal!==n.texto
            ?'<div style="font-size:10px;color:var(--txt3);margin-top:6px;padding-top:5px;border-top:0.5px solid var(--border)">📝 '+(n.rawOriginal||'').slice(0,100).replace(/</g,'&lt;')+(n.rawOriginal.length>100?'...':'')+'</div>'
            :'')
        +'</div>';
      }).join('');

  // Sidebar: filtros
  const catBtns=cats.map(function(cat){
    const cc=catColors[cat]||catColors['Geral'];
    const cnt=notas.filter(n=>n.categoria===cat).length;
    return '<button class="btn btn-sm" style="width:100%;margin-bottom:5px;text-align:left;background:'+cc.bg+';color:'+cc.cor+';border-color:'+cc.cor+'30" onclick="document.getElementById(\'search-input\').value=\''+cat+'\';render(\'notas\',\''+cat+'\')">'+cat+' ('+cnt+')</button>';
  }).join('');

  const colBtns=colNames.slice(0,10).map(function(nome){
    const cnt=notas.filter(n=>n.colNome===nome).length;
    const col=colaboradores.find(c=>c.nome===nome);
    return '<div class="flex items-center gap-6 mb-6" style="cursor:pointer" onclick="verLineaTempo(\''+nome+'\')">'
      +av(nome,false,true)
      +'<span style="font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-decoration:underline;color:var(--blue)">'+nome.split(' ')[0]+'</span>'
      +'<span class="badge badge-blue" style="font-size:9px">'+cnt+'</span>'
    +'</div>';
  }).join('');

  // Select de colaborador na área de input
  const colSelect='<select id="notes-col-filtro" style="width:auto;font-size:12px;padding:5px 8px;border-radius:7px;border:0.5px solid var(--border2)">'
    +'<option value="">IA identifica automaticamente...</option>'
    +colaboradores.map(c=>'<option value="'+c.nome+'">'+c.nome+' ('+c.area+')</option>').join('')
    +'</select>';

  return banner
    +'<div class="notes-wrap">'
      +'<div class="notes-left">'
        +'<div class="notes-input-area">'
          +'<div class="section-title mb-6">\u270F\uFE0F Nova anota\u00E7\u00E3o</div>'
          +'<div style="font-size:11.5px;color:var(--txt3);margin-bottom:8px">Escreva livremente — a IA identifica o colaborador pelo nome e organiza automaticamente com data e hora.</div>'
          +'<div class="flex items-center gap-8 mb-8">'
            +'<span style="font-size:11px;color:var(--txt2);white-space:nowrap">\uD83D\uDC64 Colaborador:</span>'
            +colSelect
          +'</div>'
          +'<textarea class="notes-raw" id="notes-raw" placeholder="Ex: Bernardo se destacou hoje ajudando os colegas do RF com dificuldades t\u00E9cnicas&#10;Julia precisa melhorar prazos dos relat\u00F3rios&#10;Parab\u00E9ns ao Philipe pela aprova\u00E7\u00E3o na auditoria 17025"></textarea>'
          +'<div class="flex gap-8 mt-10 items-center" style="flex-wrap:wrap">'
            +'<button class="btn btn-purple" onclick="processarNota()" id="btn-processar">\uD83E\uDD16 Organizar com IA</button>'
            +'<button class="btn btn-sm" onclick="salvarNotaRapida()">\uD83D\uDCBE Salvar sem IA</button>'
            +'<button class="btn btn-sm" id="btn-voz" onclick="toggleTranscricaoVoz()" style="border-color:#A32D2D;color:#A32D2D">\uD83C\uDFA4 Ditar</button>'
            +'<span id="voz-status" style="font-size:10px;color:var(--txt3)"></span>'
          +'</div>'
        +'</div>'
        +'<div style="display:flex;align-items:center;justify-content:space-between;margin:14px 0 8px">'
          +'<div style="font-size:12px;font-weight:600;color:var(--txt)">'+(list.length)+' anota\u00E7\u00F5es</div>'
          +'<div class="flex gap-6">'
            +'<button class="btn btn-xs" onclick="render(\'notas\')" title="Ver todas">\u2715 Limpar filtro</button>'
          +'</div>'
        +'</div>'
        +'<div class="notes-cards-area">'+noteCards+'</div>'
      +'</div>'
      +'<div class="notes-right">'
        +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px">'
          +'<div style="font-size:10px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">\uD83D\uDCCB Por categoria</div>'
          +'<button class="btn btn-sm" style="width:100%;margin-bottom:6px;text-align:left" onclick="render(\'notas\')">Todas ('+notas.length+')</button>'
          +catBtns
        +'</div>'
        +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px">'
          +'<div style="font-size:10px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">\u23F0 Linha do tempo</div>'
          +'<div style="font-size:11px;color:var(--txt3);margin-bottom:8px">Clique para ver a linha do tempo do colaborador</div>'
          +(colBtns||'<div style="font-size:11px;color:var(--txt3)">Sem anota\u00E7\u00F5es ainda</div>')
        +'</div>'
        +'<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px">'
          +'<div style="font-size:10px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Resumo Semanal</div>'
          +'<button class="btn btn-sm" style="width:100%;margin-bottom:5px;background:#E1F5EE;color:#0F6E56;border-color:#0F6E56" onclick="mostrarResumoSemanal()">Gerar Resumo</button>'
        +'</div>'
        +'<button class="btn btn-danger btn-sm" style="width:100%" onclick="limparNotas()">\uD83D\uDDD1 Limpar tudo</button>'
      +'</div>'
    +'</div>';
}

// ═══════════════════════════════════════════════════════════════
// LINHA DO TEMPO DO COLABORADOR
// ═══════════════════════════════════════════════════════════════
function verLineaTempo(colNome){
  const col = colaboradores.find(c=>c.nome===colNome);
  if(!col){ alert('Colaborador não encontrado'); return; }

  const catColors={
    'Desempenho':{bg:'#E1F5EE',cor:'#0F6E56'},
    'Comportamento':{bg:'#E6F1FB',cor:'#185FA5'},
    'Técnico':{bg:'#FAEEDA',cor:'#854F0B'},
    'Reconhecimento':{bg:'#C0DD97',cor:'#3B6D11'},
    'Atenção':{bg:'#FCEBEB',cor:'#A32D2D'},
    'Desenvolvimento':{bg:'#EEEDFE',cor:'#534AB7'},
    'Geral':{bg:'var(--bg2)',cor:'var(--txt2)'}
  };
  const sentEmoji={'positivo':'\uD83D\uDE0A','negativo':'\uD83D\uDE1F','neutro':'\uD83D\uDE10'};

  // Juntar todos os eventos: notas + avaliações + histórico
  const eventos=[];

  // Notas
  notas.filter(n=>n.colId===col.id).forEach(function(n){
    eventos.push({tipo:'nota',dataHora:n.dataHora||n.data+'T00:00',dataExib:n.dataExib||n.data,
      categoria:n.categoria,sentimento:n.sentimento,texto:n.texto,id:n.id});
  });

  // Avaliações
  avaliacoes.filter(a=>a.colaboradorId===col.id).forEach(function(a){
    eventos.push({tipo:'avaliacao',dataHora:a.data+'T12:00',dataExib:a.data,
      media:a.mediaGeral,avaliador:a.avaliador,id:a.id});
  });

  // Histórico de movimentações
  (col.historico||[]).forEach(function(h){
    eventos.push({tipo:'historico',dataHora:h.data+'T08:00',dataExib:h.data,
      tipoH:h.tipo,descricao:h.descricao});
  });

  // Ordenar do mais recente para o mais antigo
  eventos.sort(function(a,b){ return b.dataHora.localeCompare(a.dataHora); });

  // Renderizar timeline
  let timelineHtml='';
  if(eventos.length===0){
    timelineHtml='<div style="text-align:center;padding:30px;color:var(--txt3)">Nenhum registro encontrado.<br>Adicione notas ou avaliações para este colaborador.</div>';
  } else {
    let lastDate='';
    eventos.forEach(function(ev){
      const dateLabel=ev.dataExib?ev.dataExib.split(' ')[0]:ev.dataHora.slice(0,10);
      // Separador de data
      if(dateLabel!==lastDate){
        lastDate=dateLabel;
        timelineHtml+='<div style="text-align:center;margin:16px 0 10px">'
          +'<span style="font-size:10px;font-weight:700;color:var(--txt3);background:var(--bg2);padding:2px 12px;border-radius:20px;border:0.5px solid var(--border)">'+dateLabel+'</span>'
          +'</div>';
      }

      if(ev.tipo==='nota'){
        const cc=catColors[ev.categoria]||catColors['Geral'];
        const senti=sentEmoji[ev.sentimento]||'';
        timelineHtml+='<div style="display:flex;gap:12px;margin-bottom:12px">'
          +'<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'
            +'<div style="width:32px;height:32px;border-radius:50%;background:'+cc.bg+';border:2px solid '+cc.cor+';display:flex;align-items:center;justify-content:center;font-size:14px">'+senti+'</div>'
            +'<div style="width:2px;flex:1;background:var(--border);margin-top:4px;min-height:20px"></div>'
          +'</div>'
          +'<div style="flex:1;min-width:0;padding-bottom:4px">'
            +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">'
              +'<span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;background:'+cc.bg+';color:'+cc.cor+'">'+ev.categoria+'</span>'
              +'<span style="font-size:10px;color:var(--txt3)">'+( ev.dataExib||ev.dataHora.slice(0,16).replace('T',' '))+'</span>'
              +'<button class="btn btn-xs btn-danger" style="margin-left:auto" onclick="delNota(\''+ev.id+'\');verLineaTempo(\''+colNome+'\')">×</button>'
            +'</div>'
            +'<div style="font-size:12.5px;color:var(--txt);line-height:1.55;background:var(--bg2);border-radius:8px;padding:8px 10px">'+ev.texto.replace(/</g,'&lt;')+'</div>'
          +'</div>'
        +'</div>';

      } else if(ev.tipo==='avaliacao'){
        const scoreColor=ev.media>=8?'#0F6E56':ev.media>=6?'#854F0B':'#A32D2D';
        const scoreBg=ev.media>=8?'#E1F5EE':ev.media>=6?'#FAEEDA':'#FCEBEB';
        timelineHtml+='<div style="display:flex;gap:12px;margin-bottom:12px">'
          +'<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'
            +'<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;border:2px solid #185FA5;display:flex;align-items:center;justify-content:center;font-size:12px">\uD83D\uDCCB</div>'
            +'<div style="width:2px;flex:1;background:var(--border);margin-top:4px;min-height:20px"></div>'
          +'</div>'
          +'<div style="flex:1;min-width:0;padding-bottom:4px">'
            +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">'
              +'<span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;background:#E6F1FB;color:#185FA5">Avalia\u00E7\u00E3o</span>'
              +'<span style="font-size:10px;color:var(--txt3)">'+ev.dataExib+(ev.avaliador?' · '+ev.avaliador:'')+'</span>'
              +'<button class="btn btn-xs btn-primary btn-sm" style="margin-left:auto;font-size:9px" onclick="verAvaliacao(\''+ev.id+'\')">Ver</button>'
            +'</div>'
            +'<div style="font-size:12.5px;background:var(--bg2);border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:10px">'
              +'<span style="font-size:24px;font-weight:700;color:'+scoreColor+'">'+ev.media+'</span>'
              +'<span style="font-size:12px;color:var(--txt2)">m\u00E9dia geral</span>'
              +'<div style="flex:1;height:6px;background:var(--bg3);border-radius:3px;overflow:hidden"><div style="height:100%;width:'+( ev.media*10)+'%;background:'+scoreColor+';border-radius:3px"></div></div>'
            +'</div>'
          +'</div>'
        +'</div>';

      } else if(ev.tipo==='historico'){
        const hColors={'Promoção':{bg:'#C0DD97',cor:'#3B6D11'},'Treinamento':{bg:'#E6F1FB',cor:'#185FA5'}};
        const hc=hColors[ev.tipoH]||{bg:'var(--bg2)',cor:'var(--txt2)'};
        timelineHtml+='<div style="display:flex;gap:12px;margin-bottom:12px">'
          +'<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'
            +'<div style="width:32px;height:32px;border-radius:50%;background:'+hc.bg+';border:2px solid '+hc.cor+';display:flex;align-items:center;justify-content:center;font-size:12px">'
              +(ev.tipoH==='Promoção'?'\uD83C\uDF1F':'\uD83C\uDF93')
            +'</div>'
            +'<div style="width:2px;flex:1;background:var(--border);margin-top:4px;min-height:20px"></div>'
          +'</div>'
          +'<div style="flex:1;min-width:0;padding-bottom:4px">'
            +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">'
              +'<span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;background:'+hc.bg+';color:'+hc.cor+'">'+ev.tipoH+'</span>'
              +'<span style="font-size:10px;color:var(--txt3)">'+ev.dataExib+'</span>'
            +'</div>'
            +'<div style="font-size:12.5px;color:var(--txt2);background:var(--bg2);border-radius:8px;padding:8px 10px">'+ev.descricao.replace(/</g,'&lt;')+'</div>'
          +'</div>'
        +'</div>';
      }
    });
  }

  document.getElementById('modal-title').textContent='\u23F0 Linha do Tempo · '+colNome;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div class="flex items-center gap-12 mb-14">'+av(col.nome,true)
      +'<div style="flex:1"><div style="font-size:16px;font-weight:600">'+col.nome+'</div>'
      +'<div style="font-size:12px;color:var(--txt2)">'+col.area+'</div>'
      +'<div style="margin-top:6px">'+nivelBadge(col.nivel)+'</div></div>'
      +'<div style="text-align:right;font-size:11px;color:var(--txt3)">'
        +'<div>'+notas.filter(n=>n.colId===col.id).length+' notas</div>'
        +'<div>'+avaliacoes.filter(a=>a.colaboradorId===col.id).length+' avalia\u00E7\u00F5es</div>'
        +'<div>'+(col.historico||[]).length+' movimenta\u00E7\u00F5es</div>'
      +'</div>'
    +'</div>'
    +'<div style="max-height:60vh;overflow-y:auto;padding-right:4px" class="timeline-scroll">'+timelineHtml+'</div>'
    +'<div class="flex gap-8 mt-14">'
      +'<div style="display:flex;gap:8px;margin-top:16px">'
      +'<button onclick="iniciarAvaliacaoPara(\''+id+'\');closeModal()" style="background:#0F6E56;color:#fff;border:none;border-radius:6px;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer">📋 Avaliar</button>'
      +'<button onclick="verLineaTempo(\''+c.nome+'\')" style="background:transparent;color:#3A4240;border:1px solid #E0E2E0;border-radius:6px;padding:7px 14px;font-size:12px;cursor:pointer">⏰ Linha do Tempo</button>'
      +'<button onclick="quickAsk(\'Analise o perfil de '+c.nome.split(' ')[0]+' e sugira ações\');closeModal();go(\'agente\')" style="background:#F0EDF8;color:#534AB7;border:none;border-radius:6px;padding:7px 14px;font-size:12px;cursor:pointer">🤖 Analisar com IA</button>'
      +'</div>';
  document.getElementById('modal').style.display='flex';
}

function delNota(id){notas=notas.filter(n=>n.id!==id);lss('notas',notas);agendarSync();render('notas')}
function limparNotas(){if(!confirm('Apagar todas as anotações?'))return;notas=[];lss('notas',notas);agendarSync();render('notas')}

function _getPeriodoConfig(tipo){
  var now=new Date();var start=new Date(now);
  if(tipo==='semanal'){start.setDate(now.getDate()-now.getDay()+(now.getDay()===0?-6:1));}
  else if(tipo==='mensal'){start=new Date(now.getFullYear(),now.getMonth(),1);}
  else if(tipo==='trimestral'){var q=Math.floor(now.getMonth()/3)*3;start=new Date(now.getFullYear(),q,1);}
  else if(tipo==='semestral'){var s=now.getMonth()<6?0:6;start=new Date(now.getFullYear(),s,1);}
  start.setHours(0,0,0,0);
  var labels={'semanal':'Semanal','mensal':'Mensal','trimestral':'Trimestral','semestral':'Semestral'};
  return {start:start,label:labels[tipo]||tipo,startISO:start.toISOString().slice(0,10)};
}
function _filtrarNotasPorPeriodo(tipo){
  var cfg=_getPeriodoConfig(tipo);
  return notas.filter(function(n){return (n.data||n.dataHora||'')>=cfg.startISO;});
}
function _periodoLabel(tipo){
  var cfg=_getPeriodoConfig(tipo);
  var now=new Date();
  if(tipo==='semanal'){
    var sun=new Date(cfg.start);sun.setDate(sun.getDate()+6);
    return cfg.start.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})+' a '+sun.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'});
  }
  if(tipo==='mensal') return cfg.start.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  if(tipo==='trimestral'){var q=Math.floor(cfg.start.getMonth()/3)+1;return q+'o Trimestre '+cfg.start.getFullYear();}
  if(tipo==='semestral'){var s=cfg.start.getMonth()<6?'1o':'2o';return s+' Semestre '+cfg.start.getFullYear();}
  return '';
}

function mostrarResumo(tipo){
  tipo=tipo||window._resumoPeriodo||'semanal';
  window._resumoPeriodo=tipo;
  var notasFiltradas=_filtrarNotasPorPeriodo(tipo);
  var periodoTxt=_periodoLabel(tipo);

  // Agrupar por colaborador
  var porCol={};
  notasFiltradas.forEach(function(n){var k=n.colNome||'Geral';if(!porCol[k])porCol[k]=[];porCol[k].push(n);});
  var colNames=Object.keys(porCol).sort();

  // Tabs de período
  var tabs='<div style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;margin-bottom:14px">';
  ['semanal','mensal','trimestral','semestral'].forEach(function(p){
    var active=p===tipo;
    tabs+='<button class="btn" style="flex:1;padding:7px;border:none;cursor:pointer;font-size:11.5px;font-weight:600;border-right:0.5px solid var(--border2);'
      +(active?'background:var(--primary);color:#fff':'background:var(--bg2);color:var(--txt2)')
      +'" onclick="mostrarResumo(\''+p+'\')">'+p.charAt(0).toUpperCase()+p.slice(1)+'</button>';
  });
  tabs+='</div>';

  var html='<div style="max-height:65vh;overflow-y:auto">'
    +tabs
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
      +'<div><span style="font-size:13px;font-weight:700;color:var(--txt)">'+periodoTxt+'</span>'
      +'<span style="font-size:11px;color:var(--txt3);margin-left:8px">'+notasFiltradas.length+' nota'+(notasFiltradas.length!==1?'s':'')+'</span></div>'
      +'<div style="display:flex;gap:6px">'
        +'<button class="btn btn-xs" onclick="copiarResumo(\''+tipo+'\')">Copiar tudo</button>'
      +'</div>'
    +'</div>';

  if(colNames.length===0){
    html+='<div style="text-align:center;padding:30px;color:var(--txt3)">Nenhuma anotacao neste periodo.</div>';
  }
  colNames.forEach(function(colNome){
    var ns=porCol[colNome];
    var col=colaboradores.find(function(c){return c.nome===colNome;});
    var emailCol=col?col.email:'';
    ns.sort(function(a,b){return (a.data||'').localeCompare(b.data||'');});
    var catColors={'Desempenho':'#0F6E56','Comportamento':'#185FA5','Técnico':'#854F0B','Reconhecimento':'#3B6D11','Atenção':'#A32D2D','Desenvolvimento':'#534AB7','Geral':'#666'};

    html+='<div style="border:0.5px solid var(--border);border-radius:10px;margin-bottom:10px;overflow:hidden">'
      +'<div style="background:var(--bg2);padding:9px 14px;display:flex;align-items:center;gap:8px">'
        +av(colNome,false,true)
        +'<span style="font-size:12px;font-weight:600;color:var(--txt);flex:1">'+colNome+'</span>'
        +'<span style="font-size:10px;color:var(--txt3)">'+ns.length+' nota'+(ns.length!==1?'s':'')+'</span>'
        +'<button class="btn btn-xs" onclick="copiarResumoCol(\''+tipo+'\',\''+colNome.replace(/'/g,"\\'")+'\')">Copiar</button>'
        +(emailCol?'<button class="btn btn-xs" style="background:#E1F5EE;color:#0F6E56;border-color:#0F6E56" onclick="emailResumoCol(\''+tipo+'\',\''+colNome.replace(/'/g,"\\'")+'\')">Email</button>':'')
      +'</div>'
      +'<div style="padding:8px 14px">';
    ns.forEach(function(n){
      var cor=catColors[n.categoria]||'#666';
      html+='<div style="display:flex;gap:8px;margin-bottom:4px;font-size:11.5px;line-height:1.5">'
        +'<span style="color:var(--txt3);white-space:nowrap;min-width:45px">'+(n.data||'').slice(5)+'</span>'
        +'<span style="color:'+cor+';font-weight:600;white-space:nowrap;min-width:70px">['+(n.categoria||'Geral')+']</span>'
        +'<span style="color:var(--txt)">'+n.texto+'</span>'
      +'</div>';
    });
    html+='</div></div>';
  });
  html+='</div>';

  document.getElementById('modal-title').textContent='Resumo '+_getPeriodoConfig(tipo).label;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=html
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-sm" onclick="closeModal()">Fechar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}
// Alias pra compatibilidade com botão existente
function mostrarResumoSemanal(){mostrarResumo('semanal');}

function _buildResumoTexto(tipo,filterColNome){
  var periodoTxt=_periodoLabel(tipo);
  var lista=_filtrarNotasPorPeriodo(tipo);
  if(filterColNome)lista=lista.filter(function(n){return n.colNome===filterColNome;});
  var porCol={};
  lista.forEach(function(n){var k=n.colNome||'Geral';if(!porCol[k])porCol[k]=[];porCol[k].push(n);});
  var txt='RESUMO '+_getPeriodoConfig(tipo).label.toUpperCase()+' — '+periodoTxt+'\n';
  txt+='='+(new Array(40)).join('=')+'\n\n';
  Object.keys(porCol).sort().forEach(function(nome){
    var ns=porCol[nome];
    txt+=nome+' ('+ns.length+' anotacao'+(ns.length!==1?'es':'')+')\n';
    ns.sort(function(a,b){return (a.data||'').localeCompare(b.data||'');});
    ns.forEach(function(n){txt+='  - '+(n.data||'').slice(5)+' ['+(n.categoria||'Geral')+'] '+n.texto+'\n';});
    txt+='\n';
  });
  txt+='---\nGerado por Squado · squado.com.br';
  return txt;
}

function copiarResumo(tipo){
  navigator.clipboard.writeText(_buildResumoTexto(tipo)).then(function(){toast('Resumo copiado!');}).catch(function(){prompt('Copie:',_buildResumoTexto(tipo));});
}
function copiarResumoCol(tipo,colNome){
  navigator.clipboard.writeText(_buildResumoTexto(tipo,colNome)).then(function(){toast('Resumo de '+colNome+' copiado!');}).catch(function(){});
}
function emailResumoSemana(weekKey){mostrarResumo('semanal');}
function copiarResumoSemana(weekKey){copiarResumo('semanal');}
function emailResumoCol(tipo,colNome){
  var col=colaboradores.find(function(c){return c.nome===colNome;});
  var emailTo=col&&col.email?col.email:'';
  var txt=_buildResumoTexto(tipo,colNome);
  var periodoTxt=_periodoLabel(tipo);
  var subject=encodeURIComponent('Resumo '+_getPeriodoConfig(tipo).label+' — '+colNome+' — '+periodoTxt);
  var body=encodeURIComponent(txt);
  window.open('mailto:'+emailTo+'?subject='+subject+'&body='+body,'_blank');
}
function emailResumoColaborador(weekKey,colNome){emailResumoCol('semanal',colNome);}

// ─── Email de andamento do PDI ───────────────────────────────
function emailAndamentoPDI(colId){
  var pdis=getPDIs().filter(function(p){return p.colId===colId;});
  var col=colaboradores.find(function(c){return c.id===colId;});if(!col)return;
  var ativo=pdis.find(function(p){return p.status==='Em andamento';})||pdis[0];
  if(!ativo){alert('Nenhum PDI encontrado.');return;}
  var pct=Math.round((ativo.acoes||[]).reduce(function(a,ac){return a+(ac.progresso||0);},0)/Math.max((ativo.acoes||[]).length,1));
  var dataHoje=new Date().toLocaleDateString('pt-BR');
  var txt='ANDAMENTO DO PDI\n';
  txt+='='+(new Array(40)).join('=')+'\n\n';
  txt+='Colaborador: '+col.nome+'\n';
  txt+='Nivel: '+(col.nivel||'')+' | Area: '+(col.area||'')+'\n';
  txt+='Ciclo: '+(ativo.ciclo||'')+'\n';
  txt+='Status: '+ativo.status+'\n';
  txt+='Progresso geral: '+pct+'%\n';
  txt+='Data: '+dataHoje+'\n\n';
  if(ativo.competencias&&ativo.competencias.length){
    txt+='COMPETENCIAS EM DESENVOLVIMENTO\n';
    ativo.competencias.forEach(function(c){txt+='  - '+c+'\n';});
    txt+='\n';
  }
  txt+='ACOES ('+((ativo.acoes||[]).length)+')\n';
  txt+='-'+(new Array(40)).join('-')+'\n';
  (ativo.acoes||[]).forEach(function(a,i){
    var icon=a.status==='Concluída'?'[OK]':a.status==='Em andamento'?'[>>]':'[  ]';
    txt+=(i+1)+'. '+icon+' '+a.descricao+'\n';
    txt+='   Tipo: '+(a.tipo||'-')+' | Status: '+a.status+' | Progresso: '+a.progresso+'%';
    if(a.prazo)txt+=' | Prazo: '+a.prazo;
    txt+='\n';
  });
  if(ativo.revisoes&&ativo.revisoes.length){
    txt+='\nULTIMAS REVISOES\n';
    ativo.revisoes.slice(-3).reverse().forEach(function(r){
      txt+='  '+r.data+': '+r.nota+'\n';
    });
  }
  if(ativo.dataProxRevisao)txt+='\nProxima revisao prevista: '+ativo.dataProxRevisao+'\n';
  txt+='\n---\nGerado por Squado · squado.com.br';
  var emailTo=col.email||'';
  var subject=encodeURIComponent('Andamento PDI — '+col.nome+' — '+dataHoje);
  window.open('mailto:'+emailTo+'?subject='+subject+'&body='+encodeURIComponent(txt),'_blank');
}

// ─── Email de avaliação de desempenho ────────────────────────
function emailAvaliacao(avalId){
  var a=avaliacoes.find(function(x){return x.id===avalId;});if(!a)return;
  var col=colaboradores.find(function(c){return c.nome===a.colaborador;})||{nome:a.colaborador,email:''};
  var dataHoje=new Date().toLocaleDateString('pt-BR');
  var txt='AVALIACAO DE DESEMPENHO\n';
  txt+='='+(new Array(40)).join('=')+'\n\n';
  txt+='Colaborador: '+a.colaborador+'\n';
  txt+='Nivel: '+(a.nivel||'')+'\n';
  txt+='Data da avaliacao: '+(a.data||'')+'\n';
  if(a.avaliador)txt+='Avaliador: '+a.avaliador+'\n';
  txt+='Media geral: '+a.mediaGeral+'/10\n\n';
  txt+='RESULTADOS POR SECAO\n';
  txt+='-'+(new Array(40)).join('-')+'\n';
  var secoes=Object.entries(a.secaoMedias||{});
  secoes.forEach(function(sv){
    var barra='';var val=sv[1];
    for(var i=0;i<10;i++)barra+=i<Math.round(val)?'█':'░';
    txt+='  '+sv[0]+': '+barra+' '+val+'/10'+(val>=8?' (Excelente)':val>=5?' (Em desenvolvimento)':' (Critico)')+'\n';
  });
  if(a.pontosPos){txt+='\nPONTOS POSITIVOS\n'+a.pontosPos+'\n';}
  if(a.oportunidades){txt+='\nOPORTUNIDADES DE MELHORIA\n'+a.oportunidades+'\n';}
  // Incluir notas do colaborador (resumo)
  var notasCol=notas.filter(function(n){return n.colNome===a.colaborador;});
  if(notasCol.length){
    txt+='\nANOTACOES DO GESTOR ('+notasCol.length+')\n';
    notasCol.slice(-5).forEach(function(n){
      txt+='  - '+(n.data||'').slice(5)+' ['+(n.categoria||'Geral')+'] '+n.texto+'\n';
    });
    if(notasCol.length>5)txt+='  ... e mais '+(notasCol.length-5)+' anotacoes\n';
  }
  txt+='\n---\nGerado por Squado · squado.com.br';
  var emailTo=col.email||'';
  var subject=encodeURIComponent('Avaliacao de Desempenho — '+a.colaborador+' — '+(a.data||dataHoje));
  window.open('mailto:'+emailTo+'?subject='+subject+'&body='+encodeURIComponent(txt),'_blank');
}

function salvarNotaRapida(){
  const raw=((document.getElementById('notes-raw')||{}).value||'');if(!raw)return;
  notas.push({id:uid(),colId:'geral',colNome:'Geral',categoria:'Geral',texto:raw,data:new Date().toISOString().slice(0,10),dataHora:new Date().toISOString()});
  lss('notas',notas);agendarSync();if(document.getElementById('notes-raw'))document.getElementById('notes-raw').value='';
  render('notas');toast('Nota salva!');
}

async function processarNota(){
  const raw=((document.getElementById('notes-raw')||{}).value||'');
  if(!raw){alert('Escreva uma anotação primeiro.');return;}
  const btn=document.getElementById('btn-processar');
  if(btn){btn.disabled=true;btn.textContent='⏳ Processando...';}

  const nomesList=colaboradores.map(c=>c.nome+' ('+c.area+')').join(', ');
  const colFiltro=(document.getElementById('notes-col-filtro')||{}).value||'';

  const promptExtra = colFiltro
    ? 'O colaborador desta anotação é ESPECIFICAMENTE: '+colFiltro+'. Use este nome.'
    : 'Identifique o colaborador pelo nome ou sobrenome mencionado na anotação. Se não identificar claramente, use "Geral".';

  const prompt='Você é um assistente de RH. Analise a anotação abaixo de um gestor de laboratório industrial.\n\n'
    +'COLABORADORES DA EQUIPE: '+nomesList+'\n\n'
    +'CATEGORIAS POSSÍVEIS: Desempenho, Comportamento, Técnico, Reconhecimento, Atenção, Desenvolvimento, Geral\n\n'
    +promptExtra+'\n\n'
    +'ANOTAÇÃO DO GESTOR: "'+raw+'"\n\n'
    +'Responda SOMENTE com JSON array válido (sem markdown, sem explicações), cada item com:\n'
    +'{"colNome":"nome EXATO do colaborador como listado acima, ou Geral","categoria":"categoria","texto":"anotação organizada e objetiva em português, máximo 200 chars","sentimento":"positivo|neutro|negativo"}\n\n'
    +'Se mencionar múltiplos colaboradores distintos, crie um item para cada.';

  try{
    let text = await callClaude([{role:'user',content:prompt}], 700);
    text = text.replace(/```json/g,'').replace(/```/g,'');
    // Extrair só o JSON array
    const m = text.match(/\[[\s\S]*\]/);
    let items = [];
    try{ items = JSON.parse(m?m[0]:text); }
    catch{
      // Fallback local: tentar identificar colaborador pelo nome no texto
      const rawLow = raw.toLowerCase();
      const colEncontrado = colaboradores.find(c => {
        const partes = c.nome.toLowerCase().split(' ');
        return partes.some(p => p.length > 3 && rawLow.includes(p));
      });
      items=[{
        colNome: colFiltro || (colEncontrado ? colEncontrado.nome : 'Geral'),
        categoria: 'Geral',
        texto: raw.slice(0,200),
        sentimento: 'neutro'
      }];
    }

    const now = new Date();
    const dataHora = now.toISOString().slice(0,16); // YYYY-MM-DDTHH:MM
    const dataExib = now.toLocaleDateString('pt-BR')+' '+now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});

    items.forEach(function(item){
      // Busca exata primeiro, depois parcial
      let col = colaboradores.find(c=>c.nome.toLowerCase()===( item.colNome||'').toLowerCase());
      if(!col) col = colaboradores.find(c=>c.nome.toLowerCase().includes((item.colNome||'').toLowerCase().split(' ')[0])&&item.colNome!=='Geral');
      notas.push({
        id:uid(),
        colId:col?col.id:'geral',
        colNome:col?col.nome:(item.colNome||'Geral'),
        colArea:col?col.area:'',
        categoria:item.categoria||'Geral',
        sentimento:item.sentimento||'neutro',
        texto:item.texto||raw.slice(0,200),
        rawOriginal:raw,
        dataHora:dataHora,
        data:now.toISOString().slice(0,10),
        dataExib:dataExib,
      });
    });

    lss('notas',notas);
    agendarSync();
    const ta=document.getElementById('notes-raw');
    if(ta)ta.value='';
    render('notas');
    toast(items.length+' nota'+(items.length!==1?'s':'')+' salva'+(items.length!==1?'s':'')+' ✓');
  } catch(e){
    if(e.message==='NO_API_KEY') return;
    // Fallback sem IA
    const col = colFiltro ? colaboradores.find(c=>c.nome===colFiltro) : null;
    const now = new Date();
    notas.push({id:uid(),colId:col?col.id:'geral',colNome:col?col.nome:'Geral',colArea:col?col.area:'',
      categoria:'Geral',sentimento:'neutro',texto:raw.slice(0,200),rawOriginal:raw,
      dataHora:now.toISOString().slice(0,16),data:now.toISOString().slice(0,10),
      dataExib:now.toLocaleDateString('pt-BR')+' '+now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})});
    lss('notas',notas);
    agendarSync();
    const ta=document.getElementById('notes-raw');if(ta)ta.value='';
    render('notas');toast('Nota salva (sem IA)');
  }
  if(btn){btn.disabled=false;btn.textContent='🤖 Organizar com IA';}
}

// ═══════════════════════════════════════════════════════════════
// TRANSCRIÇÃO POR VOZ — Speech Recognition API
// ═══════════════════════════════════════════════════════════════

var _vozRecognition = null;
var _vozAtiva = false;

function toggleTranscricaoVoz(){
  if(_vozAtiva){
    pararTranscricao();
    return;
  }

  // Verificar suporte
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){
    toast('⚠️ Seu navegador não suporta transcrição de voz. Use o Chrome.');
    return;
  }

  _vozRecognition = new SpeechRecognition();
  _vozRecognition.continuous = true;
  _vozRecognition.interimResults = true;
  _vozRecognition.lang = 'pt-BR';
  _vozRecognition.maxAlternatives = 1;

  var textarea = document.getElementById('notes-raw');
  var btnVoz = document.getElementById('btn-voz');
  var statusEl = document.getElementById('voz-status');
  var textoAntes = textarea ? textarea.value : '';
  var textoFinal = '';

  _vozRecognition.onstart = function(){
    _vozAtiva = true;
    if(btnVoz){
      btnVoz.textContent = '⏹ Parar';
      btnVoz.style.background = '#A32D2D';
      btnVoz.style.color = '#fff';
      btnVoz.style.borderColor = '#A32D2D';
      btnVoz.style.animation = 'skeleton-pulse 1.5s infinite';
    }
    if(statusEl) statusEl.textContent = '🔴 Gravando... fale agora';
    toast('🎤 Gravação iniciada — fale agora');
  };

  _vozRecognition.onresult = function(event){
    var interimTranscript = '';
    var finalTranscript = '';
    for(var i = event.resultIndex; i < event.results.length; i++){
      var transcript = event.results[i][0].transcript;
      if(event.results[i].isFinal){
        finalTranscript += transcript + '. ';
      } else {
        interimTranscript += transcript;
      }
    }
    if(finalTranscript){
      textoFinal += finalTranscript;
    }
    // Mostrar texto final + interim no textarea
    if(textarea){
      var prefixo = textoAntes ? textoAntes + '\n' : '';
      textarea.value = prefixo + textoFinal + interimTranscript;
      textarea.scrollTop = textarea.scrollHeight;
    }
    if(statusEl) statusEl.textContent = '🔴 Gravando... ' + (textoFinal.split(' ').length - 1) + ' palavras';
  };

  _vozRecognition.onerror = function(event){
    console.error('Erro voz:', event.error);
    if(event.error === 'not-allowed'){
      toast('⚠️ Permissão de microfone negada. Permita o acesso nas configurações do navegador.');
    } else if(event.error === 'no-speech'){
      if(statusEl) statusEl.textContent = '⚠️ Nenhuma fala detectada';
    } else {
      toast('⚠️ Erro: ' + event.error);
    }
    pararTranscricao();
  };

  _vozRecognition.onend = function(){
    // Se ainda está ativa, reiniciar (continuous mode pode parar)
    if(_vozAtiva){
      try { _vozRecognition.start(); } catch(e) { pararTranscricao(); }
    }
  };

  try {
    _vozRecognition.start();
  } catch(e){
    toast('⚠️ Erro ao iniciar gravação: ' + e.message);
    pararTranscricao();
  }
}

function pararTranscricao(){
  _vozAtiva = false;
  if(_vozRecognition){
    try { _vozRecognition.stop(); } catch(e){}
    _vozRecognition = null;
  }
  var btnVoz = document.getElementById('btn-voz');
  var statusEl = document.getElementById('voz-status');
  if(btnVoz){
    btnVoz.textContent = '🎤 Ditar';
    btnVoz.style.background = '';
    btnVoz.style.color = '#A32D2D';
    btnVoz.style.borderColor = '#A32D2D';
    btnVoz.style.animation = '';
  }
  if(statusEl) statusEl.textContent = '✅ Transcrição finalizada';
  setTimeout(function(){ if(statusEl) statusEl.textContent = ''; }, 3000);
}
