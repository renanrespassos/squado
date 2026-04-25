var _adminTenants = [];
var _adminLoading = false;

async function _adminFetchTenants(){
  _adminLoading = true;
  try {
    const r = await apiCall('GET','/api/admin/tenants');
    _adminTenants = Array.isArray(r) ? r : [];
  } catch(e){
    console.error('admin fetch err', e);
    _adminTenants = [];
    toast('Erro ao carregar tenants');
  }
  _adminLoading = false;
}

function _planoBadge(p){
  const colors = {trial:'#F59E0B',standard:'#3B82F6',pro:'#10B981'};
  const bg = {trial:'#FEF3C7',standard:'#DBEAFE',pro:'#D1FAE5'};
  return '<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;background:'+(bg[p]||'#E5E7EB')+';color:'+(colors[p]||'#6B7280')+'">'+(p||'?').toUpperCase()+'</span>';
}

function _trialStatus(t){
  if(t.plano!=='trial') return '<span style="color:var(--txt2)">—</span>';
  if(!t.trial_expira) return '<span style="color:#DC2626">Sem data</span>';
  const exp = new Date(t.trial_expira);
  const dias = Math.ceil((exp - new Date())/(1000*60*60*24));
  if(dias < 0) return '<span style="color:#DC2626;font-weight:600">Expirado há '+Math.abs(dias)+'d</span>';
  if(dias <= 3) return '<span style="color:#F59E0B;font-weight:600">'+dias+'d restantes</span>';
  return '<span style="color:#10B981">'+dias+'d restantes</span>';
}

function renderAdmin(search){
  if(_adminLoading) return '<div class="card" style="padding:40px;text-align:center">Carregando...</div>';
  if(!_adminTenants.length){
    _adminFetchTenants().then(()=>render('admin'));
    return '<div class="card" style="padding:40px;text-align:center">Carregando contas...</div>';
  }
  const s = (search||'').toLowerCase();
  const list = _adminTenants.filter(t => !s || (t.email||'').toLowerCase().includes(s) || (t.nome||'').toLowerCase().includes(s) || (t.empresa||'').toLowerCase().includes(s));
  
  const total = _adminTenants.length;
  const totalTrial = _adminTenants.filter(t=>t.plano==='trial').length;
  const totalStandard = _adminTenants.filter(t=>t.plano==='standard').length;
  const totalPro = _adminTenants.filter(t=>t.plano==='pro').length;
  
  return `<div class="card" style="margin-bottom:14px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
      <div style="padding:12px;border-radius:8px;background:var(--bg-soft)"><div style="font-size:11px;color:var(--txt2);text-transform:uppercase;letter-spacing:.5px">Total</div><div style="font-size:24px;font-weight:700;margin-top:4px">${total}</div></div>
      <div style="padding:12px;border-radius:8px;background:#FEF3C7"><div style="font-size:11px;color:#92400E;text-transform:uppercase;letter-spacing:.5px">Trial</div><div style="font-size:24px;font-weight:700;margin-top:4px;color:#92400E">${totalTrial}</div></div>
      <div style="padding:12px;border-radius:8px;background:#DBEAFE"><div style="font-size:11px;color:#1E40AF;text-transform:uppercase;letter-spacing:.5px">Standard</div><div style="font-size:24px;font-weight:700;margin-top:4px;color:#1E40AF">${totalStandard}</div></div>
      <div style="padding:12px;border-radius:8px;background:#D1FAE5"><div style="font-size:11px;color:#065F46;text-transform:uppercase;letter-spacing:.5px">Pro</div><div style="font-size:24px;font-weight:700;margin-top:4px;color:#065F46">${totalPro}</div></div>
    </div>
  </div>
  <div class="card" style="padding:0;overflow:hidden">
    <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px">
      <input type="text" placeholder="Buscar por email, nome ou empresa..." value="${search||''}" oninput="render('admin',this.value)" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px">
      <button class="btn btn-xs" onclick="_adminFetchTenants().then(()=>render('admin'))">↻ Atualizar</button>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:12.5px">
      <thead><tr style="background:var(--bg-soft);text-transform:uppercase;font-size:10.5px;letter-spacing:.5px;color:var(--txt2)">
        <th style="text-align:left;padding:10px 14px">Conta</th>
        <th style="text-align:left;padding:10px 8px">Empresa</th>
        <th style="text-align:center;padding:10px 8px">Plano</th>
        <th style="text-align:left;padding:10px 8px">Trial</th>
        <th style="text-align:center;padding:10px 8px">Col.</th>
        <th style="text-align:center;padding:10px 8px">Aval.</th>
        <th style="text-align:center;padding:10px 8px">Ativo</th>
        <th style="text-align:right;padding:10px 14px">Ações</th>
      </tr></thead>
      <tbody>${list.map(t => `<tr style="border-top:1px solid var(--border)">
        <td style="padding:10px 14px"><div style="font-weight:600">${t.nome||'?'}</div><div style="color:var(--txt2);font-size:11.5px">${t.email||''}</div></td>
        <td style="padding:10px 8px">${t.empresa||'<span style=\'color:var(--txt3)\'>—</span>'}</td>
        <td style="padding:10px 8px;text-align:center">${_planoBadge(t.plano)}</td>
        <td style="padding:10px 8px">${_trialStatus(t)}</td>
        <td style="padding:10px 8px;text-align:center">${t.qtd_colaboradores||0}</td>
        <td style="padding:10px 8px;text-align:center">${t.qtd_avaliacoes||0}</td>
        <td style="padding:10px 8px;text-align:center">${t.ativo?'<span style=\'color:#10B981\'>●</span>':'<span style=\'color:#DC2626\'>●</span>'}</td>
        <td style="padding:10px 14px;text-align:right;white-space:nowrap">
          <button class="btn btn-xs" onclick="_adminExtend('${t.id}','${(t.nome||'').replace(/'/g,'')}')"  title="Estender trial">+Dias</button>
          <button class="btn btn-xs" onclick="_adminChangePlano('${t.id}','${t.plano}','${(t.nome||'').replace(/'/g,'')}')" title="Trocar plano">Plano</button>
          <button class="btn btn-xs" onclick="_adminToggleAtivo('${t.id}',${t.ativo},'${(t.nome||'').replace(/'/g,'')}')" title="${t.ativo?'Desativar':'Ativar'}">${t.ativo?'Desat.':'Ativar'}</button>
        </td>
      </tr>`).join('')}</tbody>
    </table>
    ${list.length===0?'<div style="padding:40px;text-align:center;color:var(--txt2)">Nenhuma conta encontrada.</div>':''}
  </div>`;
}

async function _adminExtend(id, nome){
  const days = parseInt(prompt('Quantos dias adicionar ao trial de ' + nome + '?', '30'), 10);
  if(!days || days < 1) return;
  try {
    const r = await apiCall('POST','/api/admin/tenants/'+id+'/extend-trial',{days});
    toast('Trial estendido!');
    await _adminFetchTenants();
    render('admin');
  } catch(e){ alert('Erro: '+(e.message||e)); }
}

async function _adminChangePlano(id, atual, nome){
  const plano = prompt('Novo plano para ' + nome + ' (trial / standard / pro):\nAtual: ' + atual, atual);
  if(!plano) return;
  const p = plano.trim().toLowerCase();
  if(!['trial','standard','pro'].includes(p)){ alert('Plano inválido.'); return; }
  try {
    await apiCall('PUT','/api/admin/tenants/'+id+'/plano',{plano:p});
    toast('Plano alterado para '+p+'!');
    await _adminFetchTenants();
    render('admin');
  } catch(e){ alert('Erro: '+(e.message||e)); }
}

async function _adminToggleAtivo(id, atual, nome){
  const acao = atual ? 'desativar' : 'ativar';
  if(!confirm('Confirma '+acao+' a conta de ' + nome + '?')) return;
  try {
    await apiCall('PUT','/api/admin/tenants/'+id+'/ativo',{ativo:!atual});
    toast('Conta '+(atual?'desativada':'ativada')+'!');
    await _adminFetchTenants();
    render('admin');
  } catch(e){ alert('Erro: '+(e.message||e)); }
}

// Revelar menu admin se usuario for admin (chamado no login/load)
function _revealAdminMenu(){
  const user = squadoGetUser();
  if(!user) return;
  const adminEmails = ['renanresp@gmail.com']; // hardcoded: mesmo da env ADMIN_EMAILS
  if(adminEmails.includes((user.email||'').toLowerCase())){
    const sec = document.getElementById('nav-admin-section');
    const item = document.getElementById('nav-admin-item');
    if(sec) sec.style.display = '';
    if(item) item.style.display = '';
  }
}
setTimeout(_revealAdminMenu, 500);
setTimeout(_revealAdminMenu, 2000);

// ══════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════
