function renderDashboard(){
  const user = squadoGetUser();
  const hoje = new Date();
  const hora = hoje.getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
  const nomeUser = (user && user.nome) ? user.nome.split(' ')[0] : 'Gestor';
  const diasSemana = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const nomesMes = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const dataExib = diasSemana[hoje.getDay()] + ', ' + hoje.getDate() + ' de ' + nomesMes[hoje.getMonth()] + ' de ' + hoje.getFullYear();

  const colsAtivos = colaboradores.filter(c => c.status !== 'Desligado');
  const mediaGeral = avaliacoes.length ? Math.round(avaliacoes.reduce((a,av)=>a+av.mediaGeral,0)/avaliacoes.length*10)/10 : 0;
  const _metas = ls('metas_v2',[]);
  const metasAtivas = _metas.filter(m => m.status !== 'Concluída' && m.status !== 'Cancelada');
  const metasProgresso = metasAtivas.length ? Math.round(metasAtivas.reduce((a,m) => a + (m.progresso||0), 0) / metasAtivas.length) : 0;
  const _pdis = typeof getPDIs==='function' ? getPDIs() : [];
  const pdisAtivos = _pdis.filter(p => p.status === 'Em andamento');
  const pdisAtrasados = _pdis.filter(p => p.status==='Em andamento' && p.dataProxRevisao && new Date(p.dataProxRevisao) < hoje);
  const pdisConcluidos = _pdis.filter(p => p.status === 'Concluído');

  const diasTrial = user && user.trialExpira ? Math.max(0, Math.ceil((new Date(user.trialExpira) - hoje) / 86400000)) : null;
  const plano = user && user.plano || 'trial';
  var trialBanner = '';
  if(plano === 'trial' && diasTrial !== null){
    trialBanner = '<div style="background:#E1F5EE;border:1px solid #9FE1CB;border-radius:8px;padding:8px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">'
      +'<div style="font-size:12px;color:#085041">Trial Squado: <strong style="color:#0F6E56">'+(diasTrial > 0 ? diasTrial+' dias restantes' : 'expirado')+'</strong> — acesso completo a todas as funcionalidades</div>'
      +'<button class="btn btn-sm" onclick="go(\'planos\')" style="background:#0F6E56;color:#fff;border-color:#0F6E56;padding:4px 14px;font-size:11px">Assinar agora</button>'
    +'</div>';
  }

  var semAval = colsAtivos.filter(c => !avaliacoes.find(a => a.colaboradorId===c.id)).length;
  var tarefas = [];
  if(semAval > 0) tarefas.push({icon:'📊',txt:semAval+' colaborador'+(semAval>1?'es':'')+' sem avaliação',action:"go('avaliacao')",cor:'#185FA5'});
  if(pdisAtrasados.length > 0) tarefas.push({icon:'⚠️',txt:pdisAtrasados.length+' PDI'+(pdisAtrasados.length>1?'s':'')+' com revisão atrasada',action:"go('pdi')",cor:'#A32D2D'});
  var anivHoje = colaboradores.filter(function(c){
    if(!c.perfil||!c.perfil.nascimento||c.status==='Desligado') return false;
    var p=c.perfil.nascimento.split('-');
    return parseInt(p[1],10)-1===hoje.getMonth() && parseInt(p[2],10)===hoje.getDate();
  });
  anivHoje.forEach(function(c){ tarefas.push({icon:'🎂',txt:'Aniversário de '+c.nome+' hoje!',action:"verCol('"+c.id+"')",cor:'#854F0B'}); });

  var pendenciasHtml = '';
  if(tarefas.length > 0){
    pendenciasHtml = '<div class="card" style="padding:12px 16px;margin-bottom:14px"><div class="section-title mb-8">📌 Pendências</div>'
      +tarefas.map(t => '<div onclick="'+t.action+'" style="display:flex;align-items:center;gap:8px;padding:7px 0;cursor:pointer;border-bottom:0.5px solid var(--border)">'
        +'<span style="font-size:14px">'+t.icon+'</span><span style="flex:1;font-size:12px;color:'+t.cor+'">'+t.txt+'</span><span style="font-size:10px;color:var(--txt3)">→</span></div>').join('')
    +'</div>';
  }

  const nivCount={};colaboradores.forEach(c=>{if(c.status!=='Desligado')nivCount[c.nivel]=(nivCount[c.nivel]||0)+1});
  var nivHtml = niveis.sort((a,b)=>a.ordem-b.ordem).map(n=>{
    var v=nivCount[n.nome]||0;
    if(v===0) return '';
    return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">'
      +'<div style="width:85px;flex-shrink:0">'+nivelBadge(n.nome)+'</div>'
      +'<div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:'+Math.round(v/colsAtivos.length*100)+'%;background:'+n.cor+'"></div></div>'
      +'<div style="font-size:11px;font-weight:600;width:18px;text-align:right">'+v+'</div>'
    +'</div>';
  }).join('');

  const mesAtual = hoje.getMonth();
  const diaHoje = hoje.getDate();
  const nomesMesMaiusc = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var aniversariantes = colaboradores
    .filter(c => c.perfil && c.perfil.nascimento && c.status !== 'Desligado')
    .map(c => { var p=c.perfil.nascimento.split('-'); return{nome:c.nome,dia:parseInt(p[2],10),mes:parseInt(p[1],10)-1,idade:hoje.getFullYear()-parseInt(p[0],10),id:c.id,nivel:c.nivel}; })
    .filter(a => a.mes === mesAtual).sort((a,b) => a.dia - b.dia);

  var anivHtml = '';
  if(aniversariantes.length === 0){
    var proxAniv = colaboradores.filter(c=>c.perfil&&c.perfil.nascimento&&c.status!=='Desligado')
      .map(c=>{var p=c.perfil.nascimento.split('-');var d=new Date(hoje.getFullYear(),parseInt(p[1],10)-1,parseInt(p[2],10));if(d<hoje)d.setFullYear(d.getFullYear()+1);return{nome:c.nome,dias:Math.ceil((d-hoje)/86400000),id:c.id};})
      .sort((a,b)=>a.dias-b.dias).slice(0,3);
    anivHtml='<div style="text-align:center;padding:8px;color:var(--txt3);font-size:11px;margin-bottom:6px">Nenhum aniversariante em '+nomesMesMaiusc[mesAtual]+'</div>';
    proxAniv.forEach(a=>{anivHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:11px"><span>🎂</span><span style="flex:1;cursor:pointer" onclick="verCol(\''+a.id+'\')">'+a.nome+'</span><span style="font-size:10px;color:var(--txt3)">em '+a.dias+'d</span></div>';});
  } else {
    aniversariantes.forEach(a=>{
      var isHoje=a.dia===diaHoje;var isPast=a.dia<diaHoje;
      var badgeTxt=isHoje?'🎂 Hoje!':(a.dia<10?'0'+a.dia:a.dia)+'/'+(mesAtual<9?'0'+(mesAtual+1):mesAtual+1);
      var badgeStyle=isHoje?'background:#FDE68A;color:#854F0B;font-weight:700':(isPast?'background:var(--bg2);color:var(--txt3)':'background:#E1F5EE;color:#0F6E56');
      anivHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:0.5px solid var(--border);'+(isHoje?'background:#FFFBEB;margin:-3px -6px;padding:6px;border-radius:6px;border:1px solid #FDE68A':'')+'">'
        +av(a.nome)+'<div style="flex:1;min-width:0"><div style="font-size:11px;font-weight:600;cursor:pointer" onclick="verCol(\''+a.id+'\')">'+a.nome+'</div><div style="font-size:9px;color:var(--txt3)">'+(a.nivel||'')+' · '+a.idade+' anos</div></div>'
        +'<span style="font-size:10px;padding:2px 8px;border-radius:6px;'+badgeStyle+'">'+badgeTxt+'</span></div>';
    });
  }

  const recentAval=avaliacoes.slice(-4).reverse();
  var avalHtml='';
  if(recentAval.length===0){
    avalHtml='<div style="text-align:center;padding:16px;color:var(--txt3);font-size:12px">Nenhuma avaliação.<br><button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="go(\'avaliacao\')">Iniciar</button></div>';
  } else {
    recentAval.forEach(a=>{
      var corN=a.mediaGeral>=7?'#0F6E56':a.mediaGeral>=5?'#854F0B':'#A32D2D';
      var bgN=a.mediaGeral>=7?'#E1F5EE':a.mediaGeral>=5?'#FAEEDA':'#FCEBEB';
      avalHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:0.5px solid var(--border)">'+av(a.colaborador)
        +'<div style="flex:1;min-width:0"><div style="font-size:11px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.colaborador+'</div><div style="font-size:9px;color:var(--txt3)">'+a.data+'</div></div>'
        +'<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:'+bgN+';color:'+corN+'">'+a.mediaGeral+'</span></div>';
    });
  }

  var metasHtml='';
  var topMetas=metasAtivas.slice(0,3);
  if(topMetas.length===0){
    metasHtml='<div style="text-align:center;padding:12px;color:var(--txt3);font-size:12px">Nenhuma meta ativa.<br><button class="btn btn-sm" style="margin-top:6px" onclick="go(\'metas\')">Criar meta</button></div>';
  } else {
    topMetas.forEach(m=>{
      var prog=m.progresso||0;
      var corP=prog>=70?'#0F6E56':prog>=40?'#185FA5':'#A32D2D';
      var col=colaboradores.find(c=>c.id===m.colaboradorId);
      metasHtml+='<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:0.5px solid var(--border);font-size:11px">'
        +'<div style="flex:1;min-width:0"><div style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(m.titulo||m.descricao||'Meta')+'</div>'
        +'<div style="font-size:9px;color:var(--txt3)">'+(col?col.nome:'—')+'</div></div>'
        +'<div style="width:50px"><div style="height:5px;background:var(--bg2);border-radius:3px;overflow:hidden"><div style="height:100%;border-radius:3px;background:'+corP+';width:'+prog+'%"></div></div></div>'
        +'<span style="font-size:10px;font-weight:600;color:'+corP+';width:28px;text-align:right">'+prog+'%</span></div>';
    });
  }

  var pdiResumoHtml='<div style="display:flex;gap:8px;margin-top:8px;padding-top:8px;border-top:0.5px solid var(--border)">'
    +'<div onclick="go(\'pdi\')" style="flex:1;background:#E1F5EE;border-radius:8px;padding:8px;text-align:center;cursor:pointer"><div style="font-size:16px;font-weight:600;color:#0F6E56">'+pdisAtivos.length+'</div><div style="font-size:9px;color:#085041">Em dia</div></div>'
    +'<div onclick="go(\'pdi\')" style="flex:1;background:#FCEBEB;border-radius:8px;padding:8px;text-align:center;cursor:pointer"><div style="font-size:16px;font-weight:600;color:#A32D2D">'+pdisAtrasados.length+'</div><div style="font-size:9px;color:#791F1F">Atrasados</div></div>'
    +'<div onclick="go(\'pdi\')" style="flex:1;background:#E6F1FB;border-radius:8px;padding:8px;text-align:center;cursor:pointer"><div style="font-size:16px;font-weight:600;color:#185FA5">'+pdisConcluidos.length+'</div><div style="font-size:9px;color:#0C447C">Concluídos</div></div>'
  +'</div>';

  return trialBanner
    +'<div style="margin-bottom:14px"><div style="font-size:18px;font-weight:700;color:var(--txt)">'+saudacao+', '+esc(nomeUser)+'!</div>'
    +'<div style="font-size:12px;color:var(--txt3)">'+dataExib+(tarefas.length?' — '+tarefas.length+' pendência'+(tarefas.length>1?'s':''):'')+'</div></div>'
    +'<div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">'
      +'<div class="stat-card" onclick="go(\'colaboradores\')" style="cursor:pointer"><div class="stat-label">COLABORADORES</div><div class="stat-val">'+colsAtivos.length+'</div><div class="stat-sub">Equipe ativa</div></div>'
      +'<div class="stat-card"><div class="stat-label">NOTA MÉDIA</div><div class="stat-val" style="color:'+(mediaGeral>=7?'#0F6E56':mediaGeral>=5?'#854F0B':'#A32D2D')+'">'+(mediaGeral||'—')+'</div><div class="stat-sub">de '+avaliacoes.length+' avaliações</div></div>'
      +'<div class="stat-card" onclick="go(\'metas\')" style="cursor:pointer"><div class="stat-label">METAS ATIVAS</div><div class="stat-val" style="color:#185FA5">'+metasAtivas.length+'</div><div class="stat-sub"><strong style="color:#0F6E56">'+metasProgresso+'%</strong> progresso médio</div></div>'
      +'<div class="stat-card" onclick="go(\'pdi\')" style="cursor:pointer"><div class="stat-label">PDIs ATIVOS</div><div class="stat-val" style="color:#854F0B">'+pdisAtivos.length+'</div><div class="stat-sub">'+(pdisAtrasados.length>0?'<span style="color:#A32D2D">'+pdisAtrasados.length+' atrasado'+(pdisAtrasados.length>1?'s':'')+'</span>':'todos em dia')+'</div></div>'
    +'</div>'
    +pendenciasHtml
    +'<div class="flex gap-12 mb-12" style="align-items:flex-start">'
      +'<div class="card" style="flex:1;min-width:0"><div class="section-title mb-12">Distribuição por nível</div>'+nivHtml+'</div>'
      +'<div class="card" style="flex:1;min-width:0"><div class="section-title mb-10">🎂 Aniversariantes de '+nomesMesMaiusc[mesAtual]+'</div>'+anivHtml+'</div>'
    +'</div>'
    +'<div class="flex gap-12 mb-12" style="align-items:flex-start">'
      +'<div class="card" style="flex:1;min-width:0"><div class="section-title mb-10">Avaliações recentes</div>'+avalHtml+'</div>'
      +'<div class="card" style="flex:1;min-width:0"><div class="section-title mb-10">Metas & OKR</div>'+metasHtml+pdiResumoHtml+'</div>'
    +'</div>';
}

// ══════════════════════════════════════════
// COLABORADORES — BUG CORRIGIDO
// ══════════════════════════════════════════
