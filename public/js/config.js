function getGestorConfig(){
  return ls('gestor_config_v1', {
    nome: 'Renan Escobar',
    cargo: 'Coordenador',
    email: '',
    whatsapp: '',
    laboratorio: '',
    assinatura: '',
    saudacao: 'Olá',
    urlSistema: '',
  });
}
function saveGestorConfig(cfg){ lss('gestor_config_v1', cfg); }

function buildAssuntoEmail(tipo){
  const g = getGestorConfig();
  const tipos = {
    perfil:    'Atualize seu perfil — '+g.laboratorio,
    avaliacao: 'Sua avaliação está disponível — '+g.laboratorio,
    pdi:       'Seu PDI foi atualizado — '+g.laboratorio,
    nota:      'Novo recado do seu gestor — '+g.laboratorio,
    padrao:    'Mensagem de '+g.laboratorio,
  };
  return tipos[tipo||'perfil']||tipos.padrao;
}

function buildMsgColaborador(nomeCol, canal, tipo, extra){
  const g = getGestorConfig();
  const primeiro = nomeCol.split(' ')[0];
  const url = g.urlSistema ? '\n\n🔗 Link: '+g.urlSistema : '';
  const ass = '\n\n'+g.assinatura;

  const msgs = {
    perfil: {
      whats: g.saudacao+' '+primeiro+'! 👋\nSolicito que atualize seus dados no sistema de gestão do laboratório (celular, endereço, formação etc.).'+url+ass,
      email: g.saudacao+' '+primeiro+',\n\nSolicito que acesse o link abaixo para atualizar seus dados cadastrais no sistema de gestão do laboratório.\n\nSeus dados são importantes para mantermos o histórico de desenvolvimento atualizado.'+url+ass,
    },
    avaliacao: {
      whats: g.saudacao+' '+primeiro+'! 📋\nSua avaliação de desempenho está disponível no sistema. Acesse para conferir seu resultado e feedback.'+url+ass,
      email: g.saudacao+' '+primeiro+',\n\nSua avaliação de desempenho foi concluída e está disponível no sistema.\n\nAcesse pelo link abaixo para ver sua pontuação, pontos positivos e oportunidades de melhoria.'+url+ass,
    },
    pdi: {
      whats: g.saudacao+' '+primeiro+'! 🚀\nSeu Plano de Desenvolvimento Individual (PDI) foi atualizado. Acesse para conferir.'+url+ass,
      email: g.saudacao+' '+primeiro+',\n\nSeu Plano de Desenvolvimento Individual (PDI) foi atualizado no sistema.\n\nAcesse pelo link abaixo para ver suas metas, prazos e ações de desenvolvimento.'+url+ass,
    },
    nota: {
      whats: g.saudacao+' '+primeiro+'! 📝\n'+(extra||'Você tem um recado do seu gestor no sistema.')+url+ass,
      email: g.saudacao+' '+primeiro+',\n\n'+(extra||'Você tem um recado do seu gestor no sistema do laboratório.')+url+ass,
    },
  };

  const tipoKey = tipo||'perfil';
  const canalKey = canal==='whats'?'whats':'email';
  return (msgs[tipoKey]&&msgs[tipoKey][canalKey]) || msgs.perfil[canalKey];
}

function abrirConfigGestor(){
  const g = getGestorConfig();
  document.getElementById('modal-title').textContent = '⚙️ Configurações do Gestor';
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:12px;color:var(--txt2);margin-bottom:14px">Estes dados são usados nos envios de email e WhatsApp para os colaboradores.</div>'
    +'<div class="form-grid">'
      +'<div class="field-group"><div class="field-label">Seu nome *</div>'
        +'<input id="gcfg-nome" value="'+(g.nome||'')+'" placeholder="Renan Escobar"/></div>'
      +'<div class="field-group"><div class="field-label">Cargo</div>'
        +'<input id="gcfg-cargo" value="'+(g.cargo||'')+'" placeholder="Coordenador"/></div>'
      +'<div class="field-group"><div class="field-label">📧 Seu email (De:)</div>'
        +'<input id="gcfg-email" value="'+(g.email||'')+'" placeholder="renan@laboratorio.com" type="email"/></div>'
      +'<div class="field-group"><div class="field-label">📱 Seu WhatsApp (com DDD)</div>'
        +'<input id="gcfg-whats" value="'+(g.whatsapp||'')+'" placeholder="51999999999"/></div>'
      +'<div class="field-group form-full"><div class="field-label">🏢 Nome do laboratório</div>'
        +'<input id="gcfg-lab" value="'+(g.laboratorio||'')+'" placeholder="Nome do laboratório"/></div>'
      +'<div class="field-group form-full"><div class="field-label">🔗 URL do sistema (para incluir nos envios)</div>'
        +'<input id="gcfg-url" value="'+(g.urlSistema||'')+'" placeholder="http://localhost:3000/gestao_pessoas_v6.html"/></div>'
      +'<div class="field-group form-full"><div class="field-label">✍️ Assinatura automática nas mensagens</div>'
        +'<textarea id="gcfg-ass" rows="3" placeholder="Renan Escobar&#10;Coordenador — Squado">'+(g.assinatura||'')+'</textarea></div>'
      +'<div class="field-group"><div class="field-label">Saudação inicial</div>'
        +'<input id="gcfg-saud" value="'+(g.saudacao||'Olá')+'" placeholder="Olá, Bom dia, Prezado..."/></div>'
    +'</div>'
    +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      +'<button class="btn btn-primary" onclick="salvarConfigGestor()">💾 Salvar configurações</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function salvarConfigGestor(){
  const g = {
    nome:        ((document.getElementById('gcfg-nome')||{}).value||'').trim(),
    cargo:       ((document.getElementById('gcfg-cargo')||{}).value||'').trim(),
    email:       ((document.getElementById('gcfg-email')||{}).value||'').trim(),
    whatsapp:    ((document.getElementById('gcfg-whats')||{}).value||'').replace(/\D/g,''),
    laboratorio: ((document.getElementById('gcfg-lab')||{}).value||'').trim(),
    urlSistema:  ((document.getElementById('gcfg-url')||{}).value||'').trim(),
    assinatura:  ((document.getElementById('gcfg-ass')||{}).value||'').trim(),
    saudacao:    ((document.getElementById('gcfg-saud')||{}).value||'Olá').trim(),
  };
  saveGestorConfig(g);
  closeModal();
  toast('Configurações salvas! ✓');
}

function renderNiveis(){
  return`<div class="card" style="padding:0;overflow:hidden"><div class="table-wrap"><table class="tbl">
    <thead><tr><th>Ordem</th><th>Nível</th><th>Pessoas</th><th>Preview</th><th>Ações</th></tr></thead>
    <tbody>${niveis.sort((a,b)=>a.ordem-b.ordem).map(n=>{const count=colaboradores.filter(c=>c.nivel===n.nome).length;return`<tr>
      <td style="color:var(--txt2)">${n.ordem}</td><td style="font-weight:600">${n.nome}</td>
      <td><span class="badge badge-blue">${count}</span></td><td>${nivelBadge(n.nome)}</td>
      <td><div class="flex gap-6"><button class="btn btn-sm" onclick="openNivelForm('${n.id}')">Editar</button>${count===0?`<button class="btn btn-sm btn-danger" onclick="delNivel('${n.id}')">×</button>`:''}</div></td>
    </tr>`;}).join('')}</tbody>
  </table></div></div>`;
}
function openNivelForm(id=null){
  const n=id?niveis.find(x=>x.id===id):{};
  document.getElementById('modal-title').textContent=id?'Editar Nível':'Novo Nível';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=`
    <div class="form-grid">
      <div class="field-group form-full"><div class="field-label">Nome *</div><input id="nl-nome" value="${n.nome||''}" oninput="updateNivelPreview()"/></div>
      <div class="field-group"><div class="field-label">Ordem</div><input id="nl-ordem" type="number" value="${n.ordem||niveis.length+1}" min="1"/></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;grid-column:2">
        <div class="field-group"><div class="field-label">Cor texto</div><input id="nl-cor" type="color" value="${n.cor||'#185FA5'}" style="height:34px;padding:2px 5px" oninput="updateNivelPreview()"/></div>
        <div class="field-group"><div class="field-label">Cor fundo</div><input id="nl-bg" type="color" value="${n.bg||'#E6F1FB'}" style="height:34px;padding:2px 5px" oninput="updateNivelPreview()"/></div>
      </div>
      <div class="field-group form-full"><div class="field-label">Preview</div><div id="nl-prev" style="padding:6px">${nivelBadge(n.nome||'Nível')}</div></div>
    </div>
    <div class="flex gap-8 mt-14 justify-between">
      ${id&&colaboradores.filter(c=>c.nivel===n.nome).length===0?`<button class="btn btn-danger btn-sm" onclick="delNivel('${id}')">Excluir</button>`:'<div></div>'}
      <div class="flex gap-8"><button class="btn btn-sm" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="saveNivel('${id||''}')">Salvar</button></div>
    </div>`;
  document.getElementById('modal').style.display='flex';
}
function updateNivelPreview(){const nome=document.getElementById('nl-nome').value||'Nível';const cor=document.getElementById('nl-cor').value;const bg=document.getElementById('nl-bg').value;document.getElementById('nl-prev').innerHTML=`<span class="nivel-pill" style="color:${cor};background:${bg};border-color:${cor}40">${nome}</span>`}
function saveNivel(id){
  const nome=((document.getElementById('nl-nome')||{}).value||'').trim();if(!nome)return;
  const obj={id:id||uid(),nome,ordem:parseInt(document.getElementById('nl-ordem').value)||niveis.length+1,cor:document.getElementById('nl-cor').value,bg:document.getElementById('nl-bg').value};
  if(id){const i=niveis.findIndex(x=>x.id===id);niveis[i]=obj}else{niveis.push(obj);if(!perguntas[nome])perguntas[nome]={...perguntas['Estagiário']}}
  niveis.sort((a,b)=>a.ordem-b.ordem).forEach((n,i)=>n.ordem=i+1);
  saveAll();closeModal();toast('Nível salvo!');render(currentPage);
}
function delNivel(id){if(!confirm('Excluir?'))return;const n=niveis.find(x=>x.id===id);niveis=niveis.filter(x=>x.id!==id);if(n)delete perguntas[n.nome];niveis.sort((a,b)=>a.ordem-b.ordem).forEach((n,i)=>n.ordem=i+1);saveAll();closeModal();render(currentPage)}
// ═══ METAS (módulo externo) ═══
// → public/js/metas.js

// ═══ IA (módulo externo) ═══
// → public/js/ia.js


// ═══════════════════════════════════════════════════════════════
// PERFIL COMPLETO DO COLABORADOR — COM ABAS
// ═══════════════════════════════════════════════════════════════


// ── FUNÇÕES, ÁREAS E VALORES ──
function openFuncaoForm(id=null){
  const f=id?funcoes.find(x=>x.id===id):{colaboradores:[]};
  const isEdit=!!id;
  document.getElementById('modal-title').textContent=isEdit?'Editar Função':'Nova Função';
  document.getElementById('modal-box').classList.add('modal-lg');
  const areas=Object.keys(AREA_COLORS);
  document.getElementById('modal-body').innerHTML=`
    <div class="form-grid mb-16">
      <div class="field-group form-full"><div class="field-label">Nome da Função *</div><input id="ff-nome" value="${f.nome||''}" placeholder="Ex: Ensaios de RF"/></div>
      <div class="field-group"><div class="field-label">Área principal</div><select id="ff-area">${areas.map(a=>`<option value="${a}"${f.area===a?' selected':''}>${a}</option>`).join('')}</select></div>
      <div class="field-group"><div class="field-label">Tempo estimado (h/semana)</div><input id="ff-tempo" type="number" min="1" max="40" value="${f.tempoSemana||8}"/></div>
    </div>
    <div class="divider"></div>
    <div class="section-title mb-12">Colaboradores vinculados e % de tempo</div>
    <div id="ff-cols-list">${renderFuncaoColList(f.colaboradores||[])}</div>
    <div class="mt-8">
      <select id="ff-add-col" style="width:auto;margin-right:8px">
        <option value="">Adicionar colaborador...</option>
        ${colaboradores.filter(c=>!(f.colaboradores||[]).find(x=>x.colId===c.id)).map(c=>`<option value="${c.id}">${c.nome} (${c.nivel})</option>`).join('')}
      </select>
      <button class="btn btn-sm" onclick="addColToFunc()">+ Adicionar</button>
    </div>
    <div class="flex gap-8 mt-16 justify-between">
      ${isEdit?`<button class="btn btn-danger btn-sm" onclick="delFuncao('${id}')">Excluir</button>`:'<div></div>'}
      <div class="flex gap-8"><button class="btn btn-sm" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="saveFuncao('${id||''}')">💾 Salvar</button></div>
    </div>`;
  document.getElementById('modal').style.display='flex';
}
function renderFuncaoColList(cols){
  tempFuncCols=cols.map(x=>({...x}));
  if(!cols.length)return'<div style="font-size:12px;color:var(--txt3);padding:8px 0">Nenhum colaborador vinculado ainda.</div>';
  return cols.map(fc=>{const col=colaboradores.find(x=>x.id===fc.colId);if(!col)return'';
    return`<div class="flex items-center gap-10 mb-8 pb-8" style="border-bottom:0.5px solid var(--border)" id="ffc_${fc.colId}">
      ${av(col.nome,false,true)}<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600">${col.nome}</div><div style="font-size:10px;color:var(--txt3)">${col.nivel} · ${col.area}</div></div>
      <div class="flex items-center gap-8"><span style="font-size:11px;color:var(--txt2)">%:</span>
      <input type="number" min="0" max="100" value="${fc.pct||0}" style="width:60px;padding:3px 6px;font-size:11px" onchange="updateTempColPct('${fc.colId}',this.value)"/>
      <button class="btn btn-xs btn-danger" onclick="removeTempCol('${fc.colId}')">×</button></div>
    </div>`;}).join('');
}
function updateTempColPct(colId,val){const fc=tempFuncCols.find(x=>x.colId===colId);if(fc)fc.pct=parseInt(val)||0}
function removeTempCol(colId){
  tempFuncCols=tempFuncCols.filter(x=>x.colId!==colId);
  (() => { const _e=document.getElementById('ffc_'+colId); if(_e)_e.remove(); })();
  const col=colaboradores.find(x=>x.id===colId);
  if(col){const sel=document.getElementById('ff-add-col');const opt=document.createElement('option');opt.value=col.id;opt.textContent=col.nome+' ('+col.nivel+')';sel.appendChild(opt);}
}
function addColToFunc(){
  const sel=document.getElementById('ff-add-col');const colId=sel.value;if(!colId)return;
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  tempFuncCols.push({colId,pct:50});
  (() => { const _qr2=sel.querySelector(`option[value="${colId}"]`); if(_qr2)_qr2.remove(); })();sel.value='';
  const container=document.getElementById('ff-cols-list');
  const div=document.createElement('div');div.id='ffc_'+colId;div.className='flex items-center gap-10 mb-8 pb-8';div.style.borderBottom='0.5px solid var(--border)';
  div.innerHTML=`${av(col.nome,false,true)}<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600">${col.nome}</div><div style="font-size:10px;color:var(--txt3)">${col.nivel} · ${col.area}</div></div>
    <div class="flex items-center gap-8"><span style="font-size:11px;color:var(--txt2)">%:</span>
    <input type="number" min="0" max="100" value="50" style="width:60px;padding:3px 6px;font-size:11px" onchange="updateTempColPct('${colId}',this.value)"/>
    <button class="btn btn-xs btn-danger" onclick="removeTempCol('${colId}')">×</button></div>`;
  container.appendChild(div);
}
function saveFuncao(id){
  const nome=((document.getElementById('ff-nome')||{}).value||'').trim();if(!nome)return;
  const obj={id:id||uid(),nome,area:document.getElementById('ff-area').value,tempoSemana:parseInt(document.getElementById('ff-tempo').value)||8,colaboradores:[...tempFuncCols]};
  if(id){const i=funcoes.findIndex(x=>x.id===id);funcoes[i]=obj}else funcoes.push(obj);
  colaboradores.forEach(c=>{c.funcoes=funcoes.filter(f=>f.colaboradores.find(fc=>fc.colId===c.id)).map(f=>f.nome)});
  saveAll();closeModal();toast('Função salva!');render(currentPage);
}
function delFuncao(id){if(!confirm('Excluir?'))return;funcoes=funcoes.filter(x=>x.id!==id);saveAll();closeModal();render(currentPage)}

// ═══ AVALIAÇÃO (módulo externo) ═══
// → public/js/avaliacao.js

function renderNiveisAreas(){
  const abaNiveis = `
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div style="font-size:12px;color:var(--txt2)">${niveis.length} níveis cadastrados</div>
        <button class="btn btn-primary btn-sm" onclick="openNivelForm()">+ Novo Nível</button>
      </div>
      ${renderNiveis()}
    </div>`;

  const abaAreas = `
    <div>
      ${renderAreas()}
    </div>`;

  // Aba ativa baseada na página atual
  const abaAtiva = currentPage === 'areas' ? 'areas' : 'niveis';

  return `
    <div style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;width:fit-content;margin-bottom:18px">
      <button id="tab-niveis-btn" class="btn btn-primary btn-sm" onclick="go('niveis')">📈 Níveis de Cargo</button>
      <button id="tab-areas-btn" class="btn btn-primary btn-sm" onclick="go('areas')">🏷️ Áreas da Equipe</button>
    </div>
    ${abaAtiva === 'niveis' ? abaNiveis : abaAreas}`;
}

function renderAreas(){
  const areas = Object.entries(AREA_COLORS);
  const rows = areas.map(([nome, s]) => {
    const colsN = colaboradores.filter(c=>c.area===nome).length;
    const funcsN = ls('funcoes_v8',[]).filter(f=>f.area===nome).length;
    const enc = encodeURIComponent(nome);
    const podeExcluir = colsN===0 && funcsN===0;
    return `<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:0.5px solid var(--border)">
      <div style="width:28px;height:28px;border-radius:7px;background:${s.bg};border:2px solid ${s.cor};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:var(--txt)">${nome}</div>
        <div style="font-size:11px;color:var(--txt3)">${colsN} colaborador${colsN!==1?'es':''} · ${funcsN} função${funcsN!==1?'ões':''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <div style="width:14px;height:14px;border-radius:3px;background:${s.cor}"></div>
        <span style="font-size:10px;color:var(--txt3);font-family:monospace">${s.cor}</span>
      </div>
      <button class="btn btn-xs" onclick="editarArea('${enc}')">✏️ Editar</button>
      ${podeExcluir
        ? `<button class="btn btn-xs btn-danger" onclick="excluirArea('${enc}')">🗑</button>`
        : `<button class="btn btn-xs" disabled style="opacity:.3" title="Área em uso">🗑</button>`}
    </div>`;
  }).join('');

  return `<div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <div style="font-size:12px;color:var(--txt2)">${areas.length} áreas cadastradas</div>
      <button class="btn btn-primary btn-sm" onclick="novaArea()">+ Nova Área</button>
    </div>
    <div style="border:0.5px solid var(--border);border-radius:10px;overflow:hidden">${rows}</div>
    <div style="margin-top:14px;font-size:11px;color:var(--txt3)">
      💡 As áreas aparecem automaticamente no organograma, capacidade e funções dos colaboradores.
    </div>
  </div>`;
}

function novaArea(){
  const idx = Object.keys(AREA_COLORS).length % AREA_PALETTE.length;
  const paleta = AREA_PALETTE[idx];
  _showAreaModal(null, {cor: paleta.cor, bg: paleta.bg});
}

function editarArea(nomeEncoded){
  const nome = decodeURIComponent(nomeEncoded);
  const s = AREA_COLORS[nome] || {cor:'#5F5E5A', bg:'#D3D1C7'};
  _showAreaModal(nome, s);
}

function excluirArea(nomeEncoded){
  const nome = decodeURIComponent(nomeEncoded);
  const colsNaArea = colaboradores.filter(c => c.area === nome).length;
  const funcsNaArea = ls('funcoes_v8',[]).filter(f => f.area === nome).length;
  if (colsNaArea > 0 || funcsNaArea > 0) {
    toast('Área em uso — não pode excluir'); return;
  }
  if (!confirm('Excluir área "'+nome+'"?')) return;
  const novas = {...AREA_COLORS};
  delete novas[nome];
  salvarAreas(novas);
  toast('Área excluída!');
  render('areas');
}

function _showAreaModal(nomeAtual, s){
  document.getElementById('modal-title').textContent = nomeAtual ? 'Editar Área' : 'Nova Área';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML =
    '<div class="form-grid">'
      + '<div class="field-group form-full"><div class="field-label">Nome da Área *</div>'
        + '<input id="area-nome" value="'+(nomeAtual||'')+'" placeholder="Ex: Qualidade, Projetos..."/>'
      + '</div>'
      + '<div class="field-group"><div class="field-label">Cor principal (texto/borda)</div>'
        + '<input id="area-cor" type="color" value="'+s.cor+'" style="width:100%;height:40px;border-radius:8px;border:0.5px solid var(--border);cursor:pointer;padding:2px"/>'
      + '</div>'
      + '<div class="field-group"><div class="field-label">Cor de fundo</div>'
        + '<input id="area-bg" type="color" value="'+s.bg+'" style="width:100%;height:40px;border-radius:8px;border:0.5px solid var(--border);cursor:pointer;padding:2px"/>'
      + '</div>'
      + '<div class="field-group form-full">'
        + '<div class="field-label">Prévia</div>'
        + '<div id="area-preview" style="display:flex;gap:8px;align-items:center;padding:10px;background:var(--bg2);border-radius:8px">'
          + '<div style="width:24px;height:24px;border-radius:6px;background:'+s.bg+';border:2px solid '+s.cor+'"></div>'
          + '<span style="font-size:13px;font-weight:700;color:'+s.cor+'">'+( nomeAtual||'Nova Área')+'</span>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">'
      + '<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      + `<button class="btn btn-primary" onclick="salvarAreaModal('${encodeURIComponent(nomeAtual||'')}')">💾 Salvar</button>`
    + '</div>';

  // Preview ao vivo
  const update = () => {
    const cor = document.getElementById('area-cor').value;
    const bg = document.getElementById('area-bg').value;
    const nome = document.getElementById('area-nome').value || 'Nova Área';
    document.getElementById('area-preview').innerHTML =
      '<div style="width:24px;height:24px;border-radius:6px;background:'+bg+';border:2px solid '+cor+'"></div>'
      + '<span style="font-size:13px;font-weight:700;color:'+cor+'">'+nome+'</span>';
  };
  document.getElementById('modal').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('area-nome').addEventListener('input', update);
    document.getElementById('area-cor').addEventListener('input', update);
    document.getElementById('area-bg').addEventListener('input', update);
  }, 100);
}

function salvarAreaModal(nomeAtualEncoded){
  const nomeAtual = decodeURIComponent(nomeAtualEncoded);
  const novoNome = (document.getElementById('area-nome').value||'').trim();
  const cor = document.getElementById('area-cor').value;
  const bg = document.getElementById('area-bg').value;
  if (!novoNome) { alert('Nome obrigatório'); return; }

  const novas = {...AREA_COLORS};

  // Se renomeando, migrar colaboradores e funções
  if (nomeAtual && nomeAtual !== novoNome) {
    delete novas[nomeAtual];
    // Migrar colaboradores
    colaboradores.forEach(c => { if (c.area === nomeAtual) c.area = novoNome; });
    // Migrar funções
    let funcs = ls('funcoes_v8', []);
    funcs.forEach(f => { if (f.area === nomeAtual) f.area = novoNome; });
    lss('funcoes_v8', funcs);
  }

  novas[novoNome] = {cor, bg};
  salvarAreas(novas);
  closeModal();
  toast('Área salva! ✓');
  render('areas');
}

function renderValores(){
  const vCustom=getValores();
  const _titulos=(vCustom?.titulos)||{};
  // Categorias disponíveis com títulos editáveis
  var categorias=[
    {key:'pucrs',label:_titulos.pucrs||'Valores da Instituição',cor:'#185FA5',sub:'Fundamentos da identidade institucional'},
    {key:'labelo',label:_titulos.labelo||'Valores da Unidade',cor:'#0F6E56',sub:'Os pilares que guiam a operação'},
    {key:'naoNegociamos',label:_titulos.naoNeg||'Não Negociamos',cor:'#A32D2D',sub:'Comportamentos que não são aceitos'},
    {key:'responsabilidades',label:_titulos.resps||'Responsabilidades',cor:'#854F0B',sub:'Compromissos de todos os colaboradores'},
    {key:'pilares',label:_titulos.pilares||'Pilares',cor:'#534AB7',sub:'Fundamentos da excelência operacional'},
    {key:'outros',label:_titulos.outros||'Outros',cor:'#3B6D11',sub:'Valores e princípios adicionais'},
  ];
  // Quais categorias estão ativas
  var ativas=ls('valores_categorias_ativas',['pucrs','labelo','naoNegociamos','responsabilidades','pilares']);

  // Dados de cada categoria
  var dados={
    pucrs:vCustom?vCustom.pucrs:[
      {icon:'❤️',nome:'Amor ao Trabalho',desc:'Dedicação, paixão e entrega em tudo que fazemos.'},
      {icon:'🔥',nome:'Audácia',desc:'Coragem para inovar, ousar e buscar novos caminhos.'},
      {icon:'👨‍👩‍👧‍👦',nome:'Espírito de Família',desc:'União, confiança mútua e cuidado genuíno com o próximo.'},
      {icon:'🙏',nome:'Espiritualidade',desc:'Abertura ao transcendente e ao sentido mais profundo da vida.'},
      {icon:'🌟',nome:'Presença',desc:'Estar inteiramente disponível — de corpo, mente e coração.'},
      {icon:'🌿',nome:'Simplicidade',desc:'Clareza, objetividade e ausência de pretensão no agir.'},
      {icon:'🤝',nome:'Solidariedade',desc:'Compromisso com o bem comum e com quem mais precisa.'},
    ],
    labelo:vCustom?vCustom.labelo:[
      {icon:'💚',nome:'Vida',desc:'Cuidado com a saúde, segurança e bem-estar de todos.'},
      {icon:'👥',nome:'Pessoas',desc:'Desenvolvimento humano como centro da nossa missão.'},
      {icon:'⭐',nome:'Cliente',desc:'Excelência na entrega e satisfação de quem nos escolhe.'},
      {icon:'📈',nome:'Resultado',desc:'Comprometimento com metas, qualidade e impacto real.'},
    ],
    naoNegociamos:vCustom?vCustom.naoNegociamos:[
      {icon:'⏰',text:'Atrasos sem aviso ou justificativa prévia.'},
      {icon:'🧹',text:'Falta de organização ou bagunça no laboratório.'},
      {icon:'🚫',text:'Falas negativas da instituição ou dos clientes.'},
      {icon:'👔',text:'Informalidade excessiva, improviso ou falta de preparo.'},
      {icon:'🔁',text:'Errar várias vezes a mesma coisa sem buscar aprendizado.'},
      {icon:'💬',text:'Ironia, desdém, comentários atravessados ou desrespeito.'},
    ],
    responsabilidades:vCustom?vCustom.responsabilidades:[
      {icon:'🧹',nome:'Organização',desc:'Manter bancadas, equipamentos e áreas comuns organizados.'},
      {icon:'🦺',nome:'EPI',desc:'Utilizar equipamentos de proteção individual conforme exigido.'},
      {icon:'⏰',nome:'Horários',desc:'Respeitar os horários de entrada, saída e intervalos.'},
      {icon:'👔',nome:'Postura Profissional',desc:'Manter conduta ética e comunicação respeitosa.'},
    ],
    pilares:vCustom?vCustom.pilares:[
      {icon:'📋',nome:'Organização',itens:['Bancadas','Serviços em andamento','Itens do laboratório']},
      {icon:'🤝',nome:'Respeito',itens:['Com os colegas','Com o cliente']},
      {icon:'✅',nome:'Responsabilidade',itens:['Com as entregas']},
      {icon:'⚙️',nome:'Processo',itens:[]},
      {icon:'🎯',nome:'Postura',itens:[]},
    ],
    outros:vCustom&&vCustom.outros?vCustom.outros:[],
  };

  // Bolhas de categorias
  var bolhasHtml='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">';
  categorias.forEach(function(cat){
    var isAtiva=ativas.indexOf(cat.key)>=0;
    bolhasHtml+='<button onclick="toggleCategValor(\''+cat.key+'\')" style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;border:2px solid '+(isAtiva?cat.cor:'var(--border)')+';background:'+(isAtiva?cat.cor+'15':'var(--bg)')+';color:'+(isAtiva?cat.cor:'var(--txt3)')+';font-size:12px;font-weight:'+(isAtiva?'700':'400')+';cursor:pointer;font-family:inherit;transition:all .15s">'
      +(isAtiva?'✓ ':'')+cat.label
    +'</button>';
  });
  bolhasHtml+='</div>';

  // Botões de ação
  var acoesHtml='<div style="display:flex;gap:8px" class="no-print">'
    +'<button class="btn btn-sm" onclick="abrirValoresIA()" style="border-color:#534AB7;color:#534AB7">🤖 Criar com IA</button>'
    +'<button class="btn btn-sm" onclick="editarValores()" style="border-color:#854F0B;color:#854F0B">✏️ Editar</button>'
    +'<button class="btn btn-sm" onclick="imprimirValores()" style="border-color:#185FA5;color:#185FA5">🖨 Imprimir</button>'
  +'</div>';

  // Renderizar seções ativas
  var secoesHtml='';

  function secTitle(title, sub, cor){
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid '+cor+'">'
      +'<div><div style="font-size:16px;font-weight:800;color:var(--txt)">'+title+'</div>'
      +'<div style="font-size:11px;color:var(--txt3)">'+sub+'</div></div>'
    +'</div>';
  }

  function renderCards(items,cor,tipo){
    if(!items||!items.length)return '<div style="text-align:center;padding:20px;color:var(--txt3);font-size:12px">Nenhum item cadastrado. Clique em "Editar" pra adicionar.</div>';
    if(tipo==='nn'){
      return '<div style="background:#FCEBEB;border:0.5px solid rgba(163,45,45,.2);border-radius:12px;padding:20px;margin-bottom:0">'
        +'<div style="display:flex;flex-direction:column;gap:10px">'
        +items.map(function(n){return '<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 14px;background:rgba(255,255,255,.6);border-radius:8px">'
          +'<div style="font-size:12.5px;color:#374151;line-height:1.6"><span style="font-weight:700;color:#A32D2D">Não negociamos </span>'+(n.text||n.desc||'')+'</div>'
        +'</div>';}).join('')+'</div></div>';
    }
    if(tipo==='pilares'){
      return '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:0">'
        +items.map(function(p){
          return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:16px;border-top:3px solid '+cor+'">'
            +'<div style="font-size:13px;font-weight:800;color:'+cor+';margin-bottom:6px">'+p.nome+'</div>'
            +(p.desc?'<div style="font-size:11px;color:var(--txt2);line-height:1.5;margin-bottom:8px">'+p.desc+'</div>':'')
            +((p.itens||[]).length?'<ul style="margin:0;padding-left:16px;display:flex;flex-direction:column;gap:4px">'+(p.itens||[]).map(function(i){return '<li style="font-size:11.5px;color:var(--txt2)">'+i+'</li>';}).join('')+'</ul>':'')
          +'</div>';
        }).join('')+'</div>';
    }
    return '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:0">'
      +items.map(function(v){return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:12px;padding:16px;border-left:3px solid '+cor+'">'
        +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:4px">'+(v.nome||'')+'</div>'
        +'<div style="font-size:11.5px;color:var(--txt2);line-height:1.5">'+(v.desc||'')+'</div>'
      +'</div>';}).join('')+'</div>';
  }

  categorias.forEach(function(cat){
    if(ativas.indexOf(cat.key)<0) return;
    var tipo=cat.key==='naoNegociamos'?'nn':cat.key==='pilares'?'pilares':'cards';
    secoesHtml+='<div class="card" style="padding:20px;margin-bottom:12px">'
      +secTitle(cat.label,cat.sub,cat.cor)
      +renderCards(dados[cat.key],cat.cor,tipo)
    +'</div>';
  });

  // Categorias customizadas no display
  var customCatsV=ls('valores_custom_categorias',[]);
  customCatsV.forEach(function(cc){
    if(ativas.indexOf(cc.key)<0) return;
    var items=dados[cc.key]||(vCustom&&vCustom[cc.key])||[];
    var tipo='cards';
    secoesHtml+='<div class="card" style="padding:20px;margin-bottom:12px">'
      +secTitle(cc.label,cc.sub||'Valores personalizados',cc.cor||'#888')
      +renderCards(items,cc.cor||'#888',tipo)
    +'</div>';
  });

  if(!secoesHtml) secoesHtml='<div style="text-align:center;padding:40px;color:var(--txt3)"><div style="font-size:40px;margin-bottom:8px">⭐</div><div style="font-size:14px;font-weight:600;margin-bottom:6px">Nenhuma seção ativa</div><div style="font-size:12px">Clique em "✏️ Editar" pra selecionar as seções visíveis.</div></div>';

  return '<div style="max-width:900px">'
    // Card header com botões (SEM bolhas - ficam no editar)
    +'<div class="card" style="padding:16px;margin-bottom:12px">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'
        +'<div style="font-size:12px;color:var(--txt3)">'+ativas.length+' seções ativas · <span style="color:var(--txt2);cursor:pointer;text-decoration:underline" onclick="editarValores()">Editar seções visíveis</span></div>'
        +acoesHtml
      +'</div>'
    +'</div>'
    // Conteúdo
    +secoesHtml
  +'</div>';
}

// ── Toggle categoria de valores (dentro do editar) ────────
function toggleCategValor(key){
  var ativas=ls('valores_categorias_ativas',['pucrs','labelo','naoNegociamos','responsabilidades','pilares']);
  var idx=ativas.indexOf(key);
  if(idx>=0) ativas.splice(idx,1);
  else ativas.push(key);
  lss('valores_categorias_ativas',ativas);
  render('valores');
}

function toggleCategValorEdit(key){
  var ativas=ls('valores_categorias_ativas',['pucrs','labelo','naoNegociamos','responsabilidades','pilares']);
  var idx=ativas.indexOf(key);
  if(idx>=0) ativas.splice(idx,1);
  else ativas.push(key);
  lss('valores_categorias_ativas',ativas);
  editarValores();
}

function adicionarCatCustomValor(){
  var nome=prompt('Nome da nova seção:');
  if(!nome||!nome.trim())return;
  nome=nome.trim();
  var customs=ls('valores_custom_categorias',[]);
  var key='vcustom_'+nome.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
  if(customs.find(function(c){return c.key===key;})){toast('Já existe');return;}
  var cores=['#0891B2','#9333EA','#D97706','#059669','#DC2626','#7C3AED'];
  var cor=cores[customs.length%cores.length];
  customs.push({key:key,label:nome,cor:cor});
  lss('valores_custom_categorias',customs);
  var ativas=ls('valores_categorias_ativas',[]);
  ativas.push(key);
  lss('valores_categorias_ativas',ativas);
  toast('✅ Seção "'+nome+'" adicionada!');
  editarValores();
}

function removerCatCustomValor(key){
  if(!confirm('Remover esta seção?'))return;
  var customs=ls('valores_custom_categorias',[]);
  customs=customs.filter(function(c){return c.key!==key;});
  lss('valores_custom_categorias',customs);
  var ativas=ls('valores_categorias_ativas',[]);
  ativas=ativas.filter(function(k){return k!==key;});
  lss('valores_categorias_ativas',ativas);
  toast('Seção removida');
  editarValores();
}

// ── Criar Valores com IA ─────────────────────────────────────
function abrirValoresIA(){
  var categorias=[
    {key:'pucrs',label:'Valores da Instituição',emoji:'🏛'},
    {key:'labelo',label:'Valores da Unidade/Equipe',emoji:'👥'},
    {key:'naoNegociamos',label:'Não Negociamos',emoji:'🚫'},
    {key:'responsabilidades',label:'Responsabilidades',emoji:'📋'},
    {key:'pilares',label:'Pilares',emoji:'🏗'},
    {key:'outros',label:'Outros Valores',emoji:'⭐'},
  ];

  var html='<div style="font-size:14px;font-weight:700;margin-bottom:8px">O que deseja criar?</div>'
    +'<div style="font-size:12px;color:var(--txt3);margin-bottom:14px">Selecione as categorias e descreva o contexto da sua organização.</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">';
  categorias.forEach(function(c){
    html+='<button onclick="this.classList.toggle(\'vl-ia-sel\');this.style.borderColor=this.classList.contains(\'vl-ia-sel\')?\'#534AB7\':\'#E0E2E0\';this.style.background=this.classList.contains(\'vl-ia-sel\')?\'#F3F0FF\':\'#fff\';this.style.fontWeight=this.classList.contains(\'vl-ia-sel\')?\'700\':\'400\'" class="vl-ia-opt" data-key="'+c.key+'" style="display:flex;align-items:center;gap:6px;padding:8px 14px;border:1.5px solid #E0E2E0;border-radius:16px;background:#fff;font-size:12px;color:#3A4240;cursor:pointer;font-family:inherit;transition:all .15s">'
      +c.emoji+' '+c.label+'</button>';
  });
  html+='</div>'
    +'<div style="font-size:12px;font-weight:600;margin-bottom:6px">Contexto da organização:</div>'
    +'<textarea id="vl-ia-contexto" placeholder="Descreva sua organização, setor de atuação, cultura desejada...\nEx: Somos um laboratório de ensaios elétricos, valorizamos qualidade, segurança e inovação." style="width:100%;min-height:80px;padding:10px 12px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical;box-sizing:border-box;background:var(--bg);color:var(--txt)"></textarea>'
    +'<div style="font-size:12px;font-weight:600;margin-top:10px;margin-bottom:6px">Quantos itens por categoria?</div>'
    +'<select id="vl-ia-qtd" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;background:var(--bg);color:var(--txt)">'
      +'<option value="3">3 itens</option><option value="5" selected>5 itens</option><option value="7">7 itens</option>'
    +'</select>'
    +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      +'<button class="btn btn-primary" onclick="gerarValoresIA()" style="background:#534AB7;border-color:#534AB7">🤖 Gerar com IA</button>'
    +'</div>';

  document.getElementById('modal-title').textContent='🤖 Criar Valores com IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

async function gerarValoresIA(){
  var selecionados=[];
  document.querySelectorAll('.vl-ia-opt.vl-ia-sel').forEach(function(b){selecionados.push(b.dataset.key);});
  if(!selecionados.length){toast('Selecione pelo menos uma categoria');return;}
  var contexto=((document.getElementById('vl-ia-contexto')||{}).value||'').trim();
  if(!contexto){toast('Descreva o contexto da organização');return;}
  var qtd=(document.getElementById('vl-ia-qtd')||{}).value||'5';

  closeModal();
  toast('🤖 Gerando valores...');

  var catLabels={pucrs:'Valores da Instituição',labelo:'Valores da Unidade',naoNegociamos:'Não Negociamos (comportamentos inaceitáveis)',responsabilidades:'Responsabilidades (compromissos de todos)',pilares:'Pilares (fundamentos operacionais)',outros:'Outros Valores'};

  var prompt='Gere valores e cultura organizacional para:\nContexto: '+contexto+'\n\nCategories para gerar:\n';
  selecionados.forEach(function(k){prompt+='- '+catLabels[k]+': '+qtd+' itens\n';});
  prompt+='\nFormato JSON (sem markdown):\n{'
    +selecionados.map(function(k){
      if(k==='naoNegociamos') return '"naoNegociamos":[{"text":"..."}]';
      if(k==='pilares') return '"pilares":[{"nome":"...","itens":["..."]}]';
      return '"'+k+'":[{"nome":"...","desc":"..."}]';
    }).join(',')+'}\nRetorne APENAS JSON puro.';

  try{
    var token=squadoGetToken();
    var r=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:[
        {role:'system',content:'Responda APENAS com JSON válido, sem markdown, sem backticks.'},
        {role:'user',content:prompt}
      ],max_tokens:2000})
    });
    var d=await r.json();
    var resposta=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
    var jsonMatch=resposta.match(/\{[\s\S]*\}/);
    if(!jsonMatch) throw new Error('Sem JSON');
    var gerado=JSON.parse(jsonMatch[0]);

    // Mesclar com valores existentes
    var vAtual=getValores()||{};
    selecionados.forEach(function(k){if(gerado[k])vAtual[k]=gerado[k];});
    saveValores(vAtual);

    // Ativar categorias geradas
    var ativas=ls('valores_categorias_ativas',['pucrs','labelo','naoNegociamos','responsabilidades','pilares']);
    selecionados.forEach(function(k){if(ativas.indexOf(k)<0)ativas.push(k);});
    lss('valores_categorias_ativas',ativas);

    toast('✅ Valores gerados!');
    render('valores');
  }catch(e){
    console.error('Erro IA valores:',e);
    toast('❌ Erro ao gerar. Tente novamente.');
  }
}


// ─── Editar Valores ──────────────────────────────────────
function editarValores(){
  const vCustom=getValores();
  const pucrs=vCustom?vCustom.pucrs:[
    {icon:'❤️',nome:'Amor ao Trabalho',desc:'Dedicação, paixão e entrega em tudo que fazemos.'},
    {icon:'🔥',nome:'Audácia',desc:'Coragem para inovar, ousar e buscar novos caminhos.'},
    {icon:'👨\u200d👩\u200d👧\u200d👦',nome:'Espírito de Família',desc:'União, confiança mútua e cuidado genuíno com o próximo.'},
    {icon:'🙏',nome:'Espiritualidade',desc:'Abertura ao transcendente e ao sentido mais profundo da vida.'},
    {icon:'🌟',nome:'Presença',desc:'Estar inteiramente disponível — de corpo, mente e coração.'},
    {icon:'🌿',nome:'Simplicidade',desc:'Clareza, objetividade e ausência de pretensão no agir.'},
    {icon:'🤝',nome:'Solidariedade',desc:'Compromisso com o bem comum e com quem mais precisa.'},
  ];
  const labelo=vCustom?vCustom.labelo:[
    {icon:'💚',nome:'Vida',desc:'Cuidado com a saúde, segurança e bem-estar de todos.'},
    {icon:'👥',nome:'Pessoas',desc:'Desenvolvimento humano como centro da nossa missão.'},
    {icon:'⭐',nome:'Cliente',desc:'Excelência na entrega e satisfação de quem nos escolhe.'},
    {icon:'📈',nome:'Resultado',desc:'Comprometimento com metas, qualidade e impacto real.'},
  ];
  const naoNeg=vCustom?vCustom.naoNegociamos:[
    {icon:'⏰',text:'Atrasos sem aviso ou justificativa prévia.'},
    {icon:'🧹',text:'Falta de organização ou bagunça no laboratório.'},
    {icon:'🚫',text:'Falas negativas da instituição ou dos clientes.'},
    {icon:'👔',text:'Informalidade excessiva, improviso ou falta de preparo.'},
    {icon:'🔁',text:'Errar várias vezes a mesma coisa sem buscar aprendizado.'},
    {icon:'💬',text:'Ironia, desdém, comentários atravessados ou desrespeito.'},
  ];
  const pilares=vCustom?vCustom.pilares:[
    {icon:'📋',nome:'Organização'},{icon:'🤝',nome:'Respeito'},
    {icon:'✅',nome:'Responsabilidade'},{icon:'⚙️',nome:'Processo'},
    {icon:'🎯',nome:'Postura'}
  ];
  const resps=vCustom?vCustom.responsabilidades:[
    {icon:'🧹',nome:'Organização do Laboratório'},
    {icon:'🦺',nome:'Jaleco e EPI'},
    {icon:'⏰',nome:'Horários de Trabalho e Intervalos'},
    {icon:'👔',nome:'Postura Profissional'},
    {icon:'📋',nome:'ISO IEC 17025:2017'},
    {icon:'🔬',nome:'Conhecimento Técnico da Área'},
  ];
  // Títulos customizáveis
  const titulos=vCustom?.titulos||{pucrs:'Valores Institucionais',labelo:'Valores da Empresa',naoNeg:'Não Negociamos',resps:'Responsabilidades',pilares:'Pilares'};

  // Bolhas de seleção dentro do editar
  var ativas=ls('valores_categorias_ativas',['pucrs','labelo','naoNegociamos','responsabilidades','pilares']);
  var catsDef=[
    {key:'pucrs',label:'🏛 Valores da Instituição',cor:'#185FA5'},
    {key:'labelo',label:'👥 Valores da Unidade',cor:'#0F6E56'},
    {key:'naoNegociamos',label:'🚫 Não Negociamos',cor:'#A32D2D'},
    {key:'responsabilidades',label:'📋 Responsabilidades',cor:'#854F0B'},
    {key:'pilares',label:'🏗 Pilares',cor:'#534AB7'},
    {key:'outros',label:'⭐ Outros',cor:'#3B6D11'},
  ];
  var customCatsV=ls('valores_custom_categorias',[]);
  customCatsV.forEach(function(cc){catsDef.push({key:cc.key,label:cc.label,cor:cc.cor||'#888',custom:true});});

  var bolhasEdit='<div style="margin-bottom:14px;padding:12px;background:var(--bg2);border-radius:10px">'
    +'<div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:8px">Seções a exibir:</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px">';
  catsDef.forEach(function(cat){
    var isAtiva=ativas.indexOf(cat.key)>=0;
    bolhasEdit+='<button onclick="toggleCategValorEdit(\''+cat.key+'\',this)" style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:16px;border:2px solid '+(isAtiva?cat.cor:'var(--border)')+';background:'+(isAtiva?cat.cor+'15':'var(--bg)')+';color:'+(isAtiva?cat.cor:'var(--txt3)')+';font-size:11px;font-weight:'+(isAtiva?'700':'400')+';cursor:pointer;font-family:inherit;transition:all .15s">'
      +(isAtiva?'✓ ':'')+cat.label
      +(cat.custom?'<span onclick="event.stopPropagation();removerCatCustomValor(\''+cat.key+'\')" style="margin-left:4px;color:#A32D2D;font-weight:700" title="Remover">×</span>':'')
    +'</button>';
  });
  bolhasEdit+='<button onclick="adicionarCatCustomValor()" style="padding:6px 12px;border-radius:16px;border:2px dashed var(--border);background:var(--bg);color:var(--txt3);font-size:11px;cursor:pointer;font-family:inherit">+ Outro</button>'
  +'</div></div>';

  // Seções de edição para categorias customizadas
  var customSecoesEdit='';
  customCatsV.forEach(function(cc){
    var items=vCustom&&vCustom[cc.key]?vCustom[cc.key]:[];
    customSecoesEdit+='<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
      +secTitle(cc.key,cc.label)
      +listaEditavel(cc.key,items,'nome');
  });
  // Seção "outros" padrão
  var outrosItems=vCustom&&vCustom.outros?vCustom.outros:[];
  var outrosSecao='<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
    +secTitle('outros','Outros')
    +listaEditavel('outros',outrosItems,'nome');

  function secTitle(id,label){
    return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'
      +'<input id="ve-title-'+id+'" value="'+label.replace(/"/g,'&quot;')+'" style="font-size:12px;font-weight:700;color:var(--txt);flex:1;border:none;border-bottom:1px solid var(--border2);background:transparent;padding:2px 0"/>'
    +'</div>';
  }

  function listaEditavel(id,itens,campo){
    const temDesc = campo==='nome' && itens[0]?.desc!==undefined;
    return '<div id="ve-'+id+'" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px">'
      +itens.map((it,i)=>{
        const val=(it[campo]||it.nome||it.text||'').replace(/"/g,'&quot;');
        const desc=(it.desc||'').replace(/"/g,'&quot;');
        if(temDesc){
          return '<div class="ve-row" style="display:flex;gap:6px;align-items:stretch">'
            +'<div style="flex:1;background:var(--bg2);border:0.5px solid var(--border);border-radius:6px;padding:6px 8px;display:flex;flex-direction:column;gap:3px">'
              +'<input value="'+val+'" data-id="'+id+'" data-idx="'+i+'" placeholder="Nome do valor" style="font-size:12px;font-weight:600;border:none;background:transparent;padding:0"/>'
              +'<input value="'+desc+'" data-id="'+id+'" data-desc="'+i+'" placeholder="Descrição..." style="font-size:11px;color:var(--txt2);border:none;background:transparent;padding:0"/>'
            +'</div>'
            +'<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>'
          +'</div>';
        } else {
          return '<div class="ve-row" style="display:flex;gap:6px;align-items:center">'
            +'<input value="'+val+'" data-id="'+id+'" data-idx="'+i+'" style="flex:1;font-size:12px"/>'
            +'<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>'
          +'</div>';
        }
      }).join('')
    +'</div>'
    +'<button class="btn btn-xs" data-id="'+id+'" data-campo="'+campo+'" onclick="addItemValor(this)">+ Adicionar</button>';
  }

  document.getElementById('modal-title').textContent='Editar Valores e Cultura';
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="max-height:65vh;overflow-y:auto;padding-right:4px">'
      +bolhasEdit
      +secTitle('pucrs',titulos.pucrs)
      +listaEditavel('pucrs',pucrs,'nome')
      +'<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
      +secTitle('labelo',titulos.labelo)
      +listaEditavel('labelo',labelo,'nome')
      +'<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
      +secTitle('naoNeg',titulos.naoNeg)
      +listaEditavel('naoNeg',naoNeg,'text')
      +'<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
      +secTitle('resps',titulos.resps)
      +listaEditavel('resps',resps,'nome')
      +'<div style="border-top:0.5px solid var(--border);margin:12px 0"></div>'
      +secTitle('pilares',titulos.pilares)
      +listaEditavel('pilares',pilares,'nome')
      +outrosSecao
      +customSecoesEdit
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      +'<button class="btn btn-primary btn-sm" onclick="salvarEdicaoValores()">Salvar Valores</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}
function addItemValor(btn){
  const id=btn.dataset.id;
  const campo=btn.dataset.campo||'nome';
  const container=document.getElementById('ve-'+id);
  if(!container)return;
  const idx=container.querySelectorAll('input').length;
  const div=document.createElement('div');
  div.style.cssText='display:flex;gap:6px;align-items:center';
  div.innerHTML='<input placeholder="Novo item..." data-id="'+id+'" data-idx="'+idx+'" style="flex:1;font-size:12px"/>'
    +'<button class="btn btn-xs btn-danger" data-id="'+id+'" onclick="this.parentElement.remove()">×</button>';
  container.appendChild(div);
}

function lerListaValores(id,campo,iconPadrao){
  const container=document.getElementById('ve-'+id);
  if(!container)return[];
  return Array.from(container.querySelectorAll('input')).map(function(inp){
    const v=(inp.value||'').trim();
    if(!v)return null;
    var obj={icon:iconPadrao||'•'};
    obj[campo]=v;
    return obj;
  }).filter(Boolean);
}

async function salvarEdicaoValores(){
  const vOrig=getValores()||{};
  const defaultPucrs=[
    {icon:'❤️',nome:'Amor ao Trabalho',desc:'Dedicação, paixão e entrega em tudo que fazemos.'},
    {icon:'🔥',nome:'Audácia',desc:'Coragem para inovar, ousar e buscar novos caminhos.'},
    {icon:'👨\u200d👩\u200d👧\u200d👦',nome:'Espírito de Família',desc:'União, confiança mútua e cuidado genuíno com o próximo.'},
    {icon:'🙏',nome:'Espiritualidade',desc:'Abertura ao transcendente e ao sentido mais profundo da vida.'},
    {icon:'🌟',nome:'Presença',desc:'Estar inteiramente disponível — de corpo, mente e coração.'},
    {icon:'🌿',nome:'Simplicidade',desc:'Clareza, objetividade e ausência de pretensão no agir.'},
    {icon:'🤝',nome:'Solidariedade',desc:'Compromisso com o bem comum e com quem mais precisa.'},
  ];
  const defaultLabelo=[
    {icon:'💚',nome:'Vida',desc:'Cuidado com a saúde, segurança e bem-estar de todos.'},
    {icon:'👥',nome:'Pessoas',desc:'Desenvolvimento humano como centro da nossa missão.'},
    {icon:'⭐',nome:'Cliente',desc:'Excelência na entrega e satisfação de quem nos escolhe.'},
    {icon:'📈',nome:'Resultado',desc:'Comprometimento com metas, qualidade e impacto real.'},
  ];
  const origPucrs  = vOrig.pucrs  || defaultPucrs;
  const origLabelo = vOrig.labelo || defaultLabelo;
  const origNaoNeg = vOrig.naoNegociamos || [];
  const origResps  = vOrig.responsabilidades || [];
  const origPilares= vOrig.pilares || [];

  function coletarLista(id,campo,origArr){
    const container=document.getElementById('ve-'+id);
    if(!container) return origArr;
    const rows=[...container.querySelectorAll('input[data-idx]')];
    const descs=[...container.querySelectorAll('input[data-desc]')];
    const descMap={};
    descs.forEach(d=>{ descMap[d.getAttribute('data-desc')]=d.value; });
    return rows.map((inp,i)=>{
      const origIt = origArr[parseInt(inp.getAttribute('data-idx'))||i] || {};
      const it = {...origIt};
      if(campo==='text') it.text=inp.value;
      else {
        it.nome=inp.value;
        const di=inp.getAttribute('data-idx');
        if(descMap[di]!==undefined) it.desc=descMap[di];
      }
      return it;
    });
  }
  function getTitulo(id){ return document.getElementById('ve-title-'+id)?.value||''; }

  const v={
    pucrs:        coletarLista('pucrs','nome',origPucrs),
    labelo:       coletarLista('labelo','nome',origLabelo),
    naoNegociamos:coletarLista('naoNeg','text',origNaoNeg),
    responsabilidades:coletarLista('resps','nome',origResps),
    pilares:      coletarLista('pilares','nome',origPilares),
    outros:       coletarLista('outros','nome',vOrig.outros||[]),
    titulos:{
      pucrs:  getTitulo('pucrs'),
      labelo: getTitulo('labelo'),
      naoNeg: getTitulo('naoNeg'),
      resps:  getTitulo('resps'),
      pilares:getTitulo('pilares'),
      outros: getTitulo('outros'),
    }
  };
  // Salvar categorias customizadas
  var customCatsVS=ls('valores_custom_categorias',[]);
  customCatsVS.forEach(function(cc){
    v[cc.key]=coletarLista(cc.key,'nome',vOrig[cc.key]||[]);
    v.titulos[cc.key]=getTitulo(cc.key);
  });

  // Salvar localmente
  lss('valores_v1',v);

  // Feedback visual
  const btn=document.querySelector('#modal [onclick*="salvarEdicaoValores"]');
  if(btn){btn.disabled=true;btn.textContent='⏳ Salvando...';}

  // Enviar DIRETAMENTE para a nuvem via apiCall (sem depender do sync)
  try {
    await apiCall('PUT','/api/config',{valores:v});
  } catch(e){ console.warn('valores save error:',e); }

  // Fechar modal e re-renderizar APÓS confirmação da nuvem
  closeModal();
  render('valores');
  toast('✅ Valores salvos!');
}
function resetarValores(){
  if(!confirm('Restaurar valores ao padrão original? As edições serão perdidas.'))return;
  localStorage.removeItem('valores_v1');
  toast('Valores restaurados ao padrão!');
  render('valores');
}

function imprimirValores(){
  const pucrs=[
    {icon:'❤️',nome:'Amor ao Trabalho',desc:'Dedicação, paixão e entrega em tudo que fazemos.'},
    {icon:'🔥',nome:'Audácia',desc:'Coragem para inovar, ousar e buscar novos caminhos.'},
    {icon:'👨‍👩‍👧‍👦',nome:'Espírito de Família',desc:'União, confiança mútua e cuidado genuíno com o próximo.'},
    {icon:'🙏',nome:'Espiritualidade',desc:'Abertura ao transcendente e ao sentido mais profundo da vida.'},
    {icon:'🌟',nome:'Presença',desc:'Estar inteiramente disponível — de corpo, mente e coração.'},
    {icon:'🌿',nome:'Simplicidade',desc:'Clareza, objetividade e ausência de pretensão no agir.'},
    {icon:'🤝',nome:'Solidariedade',desc:'Compromisso com o bem comum e com quem mais precisa.'},
  ];
  const labelo=[
    {icon:'💚',nome:'Vida',desc:'Cuidado com a saúde, segurança e bem-estar de todos.'},
    {icon:'👥',nome:'Pessoas',desc:'Desenvolvimento humano como centro da nossa missão.'},
    {icon:'⭐',nome:'Cliente',desc:'Excelência na entrega e satisfação de quem nos escolhe.'},
    {icon:'📈',nome:'Resultado',desc:'Comprometimento com metas, qualidade e impacto real.'},
  ];
  const naoNegociamos=[
    'Atrasos sem aviso ou justificativa prévia.',
    'Falta de organização ou bagunça no laboratório.',
    'Falas negativas da instituição ou dos clientes.',
    'Informalidade excessiva, improviso ou falta de preparo no dia a dia ou na presença do cliente.',
    'Errar várias vezes a mesma coisa sem buscar aprendizado ou apoio.',
    'Ironia, desdém, comentários atravessados ou desrespeito, seja presencial ou em mensagens.',
  ];
  const responsabilidades=[
    {icon:'🧹',nome:'Organização do Laboratório',desc:'Manter bancadas, equipamentos e áreas comuns organizados e limpos.'},
    {icon:'🦺',nome:'Jaleco e EPI',desc:'Utilizar jaleco e equipamentos de proteção individual conforme exigido.'},
    {icon:'⏰',nome:'Horários de Trabalho e Intervalos',desc:'Respeitar os horários de entrada, saída e intervalos estabelecidos.'},
    {icon:'👔',nome:'Postura Profissional',desc:'Manter conduta ética, comunicação respeitosa e apresentação adequada.'},
    {icon:'📋',nome:'ISO IEC 17025:2017',desc:'Conhecer e cumprir os requisitos da norma de acreditação do laboratório.'},
    {icon:'🔬',nome:'Conhecimento Técnico da Área',desc:'Manter e desenvolver continuamente o conhecimento técnico específico da sua área de atuação.'},
  ];

  const pilares=[
    {icon:'📋',nome:'Organização',cor:'#185FA5',itens:['Bancadas do Laboratório','Serviços em andamento','Itens do laboratório']},
    {icon:'🤝',nome:'Respeito',cor:'#0F6E56',itens:['Com os colegas','Com o cliente']},
    {icon:'✅',nome:'Responsabilidade',cor:'#854F0B',itens:['Com as entregas']},
    {icon:'⚙️',nome:'Processo',cor:'#534AB7',itens:[]},
    {icon:'🎯',nome:'Postura',cor:'#3B6D11',itens:[]},
  ];
  const dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  const html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Valores e Cultura</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}'
    +'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}'
    +'@media print{body{padding:0}.np{display:none!important}@page{margin:18mm;size:A4}}'
    +'h2{font-size:18px;font-weight:800;margin:24px 0 12px;padding-bottom:8px}'
    +'</style></head><body>'
    // Botão imprimir
    +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#185FA5;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;font-size:14px;flex:1">Valores e Cultura</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#185FA5;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">Imprimir / PDF</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button>'
    +'</div><div class="np" style="height:52px"></div>'
    // Cabeçalho
    +'<div style="text-align:center;padding-bottom:20px;border-bottom:3px solid #185FA5;margin-bottom:28px">'
      +'<div style="font-size:9px;font-weight:700;color:#185FA5;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Squado</div>'
      +'<div style="font-size:28px;font-weight:900;color:#111827;margin-bottom:4px">Valores e Cultura</div>'
      +'<div style="font-size:11px;color:#9ca3af">'+dataHoje+'</div>'
    +'</div>'
    // PUCRS
    +'<h2 style="color:#185FA5;border-bottom:2px solid #dbeafe">Valores Institucionais</h2>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px">'
      +pucrs.map(v=>'<div style="border:1px solid #dbeafe;border-radius:10px;padding:12px;border-left:3px solid #185FA5">'
        
        +'<div style="font-size:12px;font-weight:700;margin-bottom:3px">'+v.nome+'</div>'
        +'<div style="font-size:10px;color:#6b7280;line-height:1.5">'+(v.desc||'')+'</div>'
      +'</div>').join('')
    +'</div>'
    // LABELO
    +'<h2 style="color:#0F6E56;border-bottom:2px solid #E1F5EE">Valores da Empresa</h2>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px">'
      +labelo.map(v=>'<div style="border:1px solid #E1F5EE;border-radius:10px;padding:14px;text-align:center;border-top:3px solid #0F6E56">'
        
        +'<div style="font-size:13px;font-weight:800;margin-bottom:4px">'+v.nome+'</div>'
        +'<div style="font-size:10px;color:#6b7280;line-height:1.5">'+(v.desc||'')+'</div>'
      +'</div>').join('')
    +'</div>'
    // Não Negociamos
    +'<h2 style="color:#A32D2D;border-bottom:2px solid #FCEBEB">Não Negociamos</h2>'
    +'<div style="background:#FCEBEB;border-radius:10px;padding:16px;margin-bottom:24px">'
      +naoNegociamos.map(n=>'<div style="display:flex;align-items:baseline;gap:10px;padding:7px 0;border-bottom:1px solid rgba(163,45,45,.1)">'
        +'<span style="color:#A32D2D;font-weight:700;font-size:11px;white-space:nowrap">✗ Não negociamos</span>'
        +'<span style="font-size:11.5px;color:#374151">'+n+'</span>'
      +'</div>').join('')
    +'</div>'
    // Pilares
    +'<h2 style="color:#854F0B;border-bottom:2px solid #FAEEDA">Responsabilidades</h2>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px">'
      +[
        {icon:'🧹',nome:'Organização do Laboratório',desc:'Bancadas, equipamentos e áreas comuns organizados e limpos.'},
        {icon:'🦺',nome:'Jaleco e EPI',desc:'Utilizar jaleco e equipamentos de proteção conforme exigido.'},
        {icon:'⏰',nome:'Horários de Trabalho e Intervalos',desc:'Respeitar entrada, saída e intervalos estabelecidos.'},
        {icon:'👔',nome:'Postura Profissional',desc:'Conduta ética, comunicação respeitosa e apresentação adequada.'},
        {icon:'📋',nome:'ISO IEC 17025:2017',desc:'Conhecer e cumprir os requisitos da norma de acreditação.'},
        {icon:'🔬',nome:'Conhecimento Técnico da Área',desc:'Desenvolver continuamente o conhecimento técnico da área.'},
      ].map(r=>'<div style="border:1px solid #FAEEDA;border-radius:10px;padding:12px;border-left:3px solid #854F0B">'
        
        +'<div style="font-size:11px;font-weight:700;margin-bottom:3px">'+r.nome+'</div>'
        +'<div style="font-size:10px;color:#6b7280;line-height:1.5">'+(r.desc||'')+'</div>'
      +'</div>').join('')
    +'</div>'
    +'<h2 style="color:#534AB7;border-bottom:2px solid #EEEDFE">Pilares</h2>'
    +'<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:24px">'
      +pilares.map(p=>'<div style="border:1px solid '+p.cor+'33;border-radius:10px;padding:12px;border-top:3px solid '+p.cor+'">'
        
        +'<div style="font-size:12px;font-weight:800;color:'+p.cor+';margin-bottom:6px">'+p.nome+'</div>'
        +((p.itens||[]).length?'<ul style="padding-left:14px;margin:0">'
          +(p.itens||[]).map(i=>'<li style="font-size:10px;color:#6b7280;margin-bottom:3px">'+i+'</li>').join('')
        +'</ul>':'')
      +'</div>').join('')
    +'</div>'
    // Rodapé
    +'<div style="margin-top:32px;padding-top:12px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">'
      +'<span>Squado</span>'
      +'<span>'+dataHoje+'</span>'
    +'</div>'
    +'</body></html>';
  const w=window.open('','_blank','width=1000,height=780');
  if(!w){alert('Permita pop-ups.');return;}
  w.document.write(html);w.document.close();
}


// ═══════════════════════════════════════════════════════════════
// NINE-BOX — MATRIZ DE TALENTOS
// ═══════════════════════════════════════════════════════════════
// ═══ ninebox.js (módulo externo) ═══
