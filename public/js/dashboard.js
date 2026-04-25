function renderDashboard(){
  const totalMov=colaboradores.reduce((a,c)=>a+(c.historico||[]).length,0);
  const mediaGeral=avaliacoes.length?Math.round(avaliacoes.reduce((a,av)=>a+av.mediaGeral,0)/avaliacoes.length*10)/10:0;
  const nivCount={};colaboradores.forEach(c=>{nivCount[c.nivel]=(nivCount[c.nivel]||0)+1});
  const recentAval=avaliacoes.slice(-4).reverse();
  // Card de trial
  const user = squadoGetUser();
  const diasTrial = user && user.trialExpira ? Math.max(0, Math.ceil((new Date(user.trialExpira) - new Date()) / 86400000)) : null;
  const trialCard = diasTrial !== null
    ? `<div class="stat-card" style="background:#E1F5EE;border-color:#9FE1CB"><div class="stat-label" style="color:#085041">Trial Squado</div><div class="stat-val" style="color:#0F6E56">${diasTrial}d</div><div class="stat-sub" style="color:#1D9E75">${diasTrial > 0 ? 'restantes' : 'expirado'}</div></div>`
    : `<div class="stat-card"><div class="stat-label">Plano</div><div class="stat-val" style="color:var(--green2)">Pro</div><div class="stat-sub">Ativo</div></div>`;
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
      <div class="section-title mb-12">Avaliações Recentes</div>
      ${recentAval.length===0?`<div class="empty-state" style="padding:16px">Nenhuma avaliação.<br><button class="btn btn-primary btn-sm mt-8" onclick="go('avaliacao')">Iniciar</button></div>`:
      recentAval.map(a=>`<div class="flex items-center gap-10 mb-8 pb-8" style="border-bottom:0.5px solid var(--border)">
        ${av(a.colaborador)}<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.colaborador}</div>
        <div style="font-size:10px;color:var(--txt3)">${a.data}</div></div>
        <span class="badge badge-green" style="font-size:12px">${a.mediaGeral}</span>
      </div>`).join('')}
    </div>
  </div>
  <div class="card"><div class="section-title mb-10">Acesso rápido</div>
    <div class="flex gap-8 flex-wrap">
      <button class="btn btn-primary btn-sm" onclick="go('avaliacao')">Nova Avaliação</button>
      <button class="btn btn-sm" onclick="go('organograma')">Organograma</button>
      
      <button class="btn btn-sm" onclick="go('colaboradores')">Colaboradores</button>
      <button class="btn btn-sm" onclick="go('historico_aval')">Histórico</button>
    </div>
  </div>`;
}

// ══════════════════════════════════════════
// COLABORADORES — BUG CORRIGIDO
// ══════════════════════════════════════════
