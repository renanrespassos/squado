function renderDashboard(){
  const totalMov=colaboradores.reduce((a,c)=>a+(c.historico||[]).length,0);
  const mediaGeral=avaliacoes.length?Math.round(avaliacoes.reduce((a,av)=>a+av.mediaGeral,0)/avaliacoes.length*10)/10:0;
  const nivCount={};colaboradores.forEach(c=>{nivCount[c.nivel]=(nivCount[c.nivel]||0)+1});
  const recentAval=avaliacoes.slice(-4).reverse();
  // Card de trial
  const user = squadoGetUser();
  const diasTrial = user && user.trialExpira ? Math.max(0, Math.ceil((new Date(user.trialExpira) - new Date()) / 86400000)) : null;
  const trialCard = diasTrial !== null
    ? `<div class="stat-card" style="background:#E1F5EE;border-color:#9FE1CB;cursor:pointer" onclick="go('planos')"><div class="stat-label" style="color:#085041">TRIAL SQUADO</div><div class="stat-val" style="color:#0F6E56">${diasTrial}d</div><div class="stat-sub" style="color:#1D9E75">${diasTrial > 0 ? 'restantes' : 'expirado — clique pra assinar'}</div></div>`
    : `<div class="stat-card" style="cursor:pointer" onclick="go('planos')"><div class="stat-label">PLANO</div><div class="stat-val" style="color:var(--green2)">${(user&&user.plano||'Pro').charAt(0).toUpperCase()+(user&&user.plano||'pro').slice(1)}</div><div class="stat-sub">Ativo</div></div>`;

  // ── Aniversariantes do mês ──
  const hoje = new Date();
  const mesAtual = hoje.getMonth(); // 0-based
  const diaHoje = hoje.getDate();
  const nomesMes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const aniversariantes = colaboradores
    .filter(function(c){ return c.perfil && c.perfil.nascimento && c.status !== 'Desligado'; })
    .map(function(c){
      var partes = c.perfil.nascimento.split('-');
      var mes = parseInt(partes[1], 10) - 1;
      var dia = parseInt(partes[2], 10);
      var idade = hoje.getFullYear() - parseInt(partes[0], 10);
      return { nome: c.nome, dia: dia, mes: mes, idade: idade, id: c.id, nivel: c.nivel };
    })
    .filter(function(a){ return a.mes === mesAtual; })
    .sort(function(a, b){ return a.dia - b.dia; });

  var anivHtml = '';
  if(aniversariantes.length === 0){
    // Mostrar próximo aniversariante se não tem neste mês
    var todosAniv = colaboradores
      .filter(function(c){ return c.perfil && c.perfil.nascimento && c.status !== 'Desligado'; })
      .map(function(c){
        var p = c.perfil.nascimento.split('-');
        var anivEsteAno = new Date(hoje.getFullYear(), parseInt(p[1],10)-1, parseInt(p[2],10));
        if(anivEsteAno < hoje) anivEsteAno.setFullYear(anivEsteAno.getFullYear()+1);
        var diff = Math.ceil((anivEsteAno - hoje) / 86400000);
        return { nome: c.nome, dias: diff, data: anivEsteAno };
      })
      .sort(function(a,b){ return a.dias - b.dias; })
      .slice(0,3);
    if(todosAniv.length){
      anivHtml = '<div style="text-align:center;padding:12px;color:var(--txt3);font-size:11px;margin-bottom:8px">Nenhum aniversariante em '+nomesMes[mesAtual]+'</div>';
      todosAniv.forEach(function(a){
        anivHtml += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:12px"><span style="color:var(--txt3)">🎂</span><span style="flex:1">'+a.nome+'</span><span style="font-size:10px;color:var(--txt3)">em '+a.dias+'d</span></div>';
      });
    } else {
      anivHtml = '<div style="text-align:center;padding:16px;color:var(--txt3);font-size:12px">Cadastre datas de nascimento nos perfis.</div>';
    }
  } else {
    aniversariantes.forEach(function(a){
      var isHoje = a.dia === diaHoje;
      var isPast = a.dia < diaHoje;
      var badgeTxt = isHoje ? '🎂 Hoje!' : (a.dia < 10 ? '0'+a.dia : a.dia) + '/' + (mesAtual < 9 ? '0'+(mesAtual+1) : mesAtual+1);
      var badgeStyle = isHoje ? 'background:#FDE68A;color:#854F0B;font-weight:700' : (isPast ? 'background:var(--bg2);color:var(--txt3)' : 'background:#E1F5EE;color:#0F6E56');
      anivHtml += '<div class="flex items-center gap-10 mb-8 pb-8" style="border-bottom:0.5px solid var(--border);' + (isHoje ? 'background:#FFFBEB;margin:-4px -8px;padding:8px 8px;border-radius:8px;border:1px solid #FDE68A' : '') + '">'
        + av(a.nome)
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:12px;font-weight:600;cursor:pointer" onclick="verCol(\''+a.id+'\')">' + a.nome + '</div>'
        + '<div style="font-size:10px;color:var(--txt3)">' + (a.nivel||'') + ' · ' + a.idade + ' anos</div>'
        + '</div>'
        + '<span style="font-size:11px;padding:3px 8px;border-radius:6px;' + badgeStyle + '">' + badgeTxt + '</span>'
        + '</div>';
    });
  }

  // Contar próximos aniversariantes (próximos 7 dias)
  var proximoAniv = colaboradores
    .filter(function(c){ return c.perfil && c.perfil.nascimento && c.status !== 'Desligado'; })
    .map(function(c){
      var p = c.perfil.nascimento.split('-');
      var anivEsteAno = new Date(hoje.getFullYear(), parseInt(p[1],10)-1, parseInt(p[2],10));
      if(anivEsteAno < hoje) anivEsteAno.setFullYear(anivEsteAno.getFullYear()+1);
      var diff = Math.ceil((anivEsteAno - hoje) / 86400000);
      return { nome: c.nome, dias: diff };
    })
    .filter(function(a){ return a.dias > 0 && a.dias <= 7; })
    .sort(function(a,b){ return a.dias - b.dias; });

  var proximoTxt = proximoAniv.length > 0
    ? '<div style="margin-top:8px;padding-top:8px;border-top:0.5px solid var(--border);font-size:11px;color:var(--txt3)">📅 Próximos 7 dias: ' + proximoAniv.map(function(a){return '<b>'+a.nome+'</b> (em '+a.dias+'d)';}).join(', ') + '</div>'
    : '';

  return`<div class="stat-grid">
    <div class="stat-card"><div class="stat-label">Colaboradores</div><div class="stat-val">${colaboradores.length}</div><div class="stat-sub">Equipe ativa</div></div>
    <div class="stat-card"><div class="stat-label">Avaliações</div><div class="stat-val">${avaliacoes.length}</div><div class="stat-sub">Realizadas</div></div>
    <div class="stat-card"><div class="stat-label">Notas IA</div><div class="stat-val">${notas.length}</div><div class="stat-sub">Anotações</div></div>
    ${trialCard}
  </div>
  <div class="flex gap-12 mb-12" style="align-items:flex-start">
    <div class="card" style="flex:1;min-width:0">
      <div class="section-title mb-12">Distribuição por Nível</div>
      ${niveis.sort((a,b)=>a.ordem-b.ordem).map(n=>{const v=nivCount[n.nome]||0;return v>0?`
        <div class="flex items-center gap-8 mb-8">
          <div style="width:92px;flex-shrink:0">${nivelBadge(n.nome)}</div>
          <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${Math.round(v/colaboradores.length*100)}%;background:${n.cor}"></div></div>
          <div style="font-size:11px;font-weight:600;width:16px;text-align:right">${v}</div>
        </div>`:''}).join('')}
    </div>
    <div class="card" style="flex:1;min-width:0">
      <div class="section-title mb-12">🎂 Aniversariantes de ${nomesMes[mesAtual]}</div>
      ${anivHtml}
      ${proximoTxt}
    </div>
  </div>
  <div class="flex gap-12 mb-12" style="align-items:flex-start">
    <div class="card" style="flex:1;min-width:0">
      <div class="section-title mb-12">Avaliações Recentes</div>
      ${recentAval.length===0?`<div class="empty-state" style="padding:16px">Nenhuma avaliação.<br><button class="btn btn-primary btn-sm mt-8" onclick="go('avaliacao')">Iniciar</button></div>`:
      recentAval.map(a=>`<div class="flex items-center gap-10 mb-8 pb-8" style="border-bottom:0.5px solid var(--border)">
        ${av(a.colaborador)}<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.colaborador}</div>
        <div style="font-size:10px;color:var(--txt3)">${a.data}</div></div>
        <span class="badge badge-green" style="font-size:12px">${a.mediaGeral}</span>
      </div>`).join('')}
    </div>
    <div class="card" style="flex:1;min-width:0">
      <div class="section-title mb-10">Acesso rápido</div>
      <div class="flex gap-8 flex-wrap">
        <button class="btn btn-primary btn-sm" onclick="go('avaliacao')">Nova Avaliação</button>
        <button class="btn btn-sm" onclick="go('organograma')">Organograma</button>
        <button class="btn btn-sm" onclick="go('colaboradores')">Colaboradores</button>
        <button class="btn btn-sm" onclick="go('historico_aval')">Histórico</button>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════
// COLABORADORES — BUG CORRIGIDO
// ══════════════════════════════════════════
