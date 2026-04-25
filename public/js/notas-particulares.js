function abrirNotasParticulares(){
  const SENHA_KEY = 'squado_notas_senha';
  const senhaAtual = localStorage.getItem(SENHA_KEY);

  if(!senhaAtual){
    // Primeira vez — definir senha
    document.getElementById('modal-title').textContent = '🔒 Definir Senha das Notas Particulares';
    document.getElementById('modal-box').classList.remove('modal-lg');
    document.getElementById('modal-body').innerHTML =
      '<div style="font-size:12px;color:var(--txt3);margin-bottom:12px">Esta senha protege suas notas particulares. Guarde-a em local seguro.</div>'      +'<div class="field-group"><div class="field-label">Nova senha</div><input id="np-senha1" type="password" placeholder="Mínimo 4 caracteres"/></div>'      +'<div class="field-group" style="margin-top:8px"><div class="field-label">Confirmar senha</div><input id="np-senha2" type="password" placeholder="Repita a senha"/></div>'      +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">'        +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'        +'<button class="btn btn-primary" onclick="definirSenhaNP()">Definir e Abrir</button>'      +'</div>';
    document.getElementById('modal').style.display='flex';
  } else {
    // Pedir senha
    document.getElementById('modal-title').textContent = '🔒 Notas Particulares';
    document.getElementById('modal-box').classList.remove('modal-lg');
    document.getElementById('modal-body').innerHTML =
      '<div style="font-size:12px;color:var(--txt3);margin-bottom:12px">Digite a senha para acessar suas notas particulares.</div>'      +'<div class="field-group"><div class="field-label">Senha</div><input id="np-senha-acesso" type="password" placeholder="Sua senha" autofocus/></div>'      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px">'        +'<button class="btn btn-sm" onclick="resetarSenhaNP()" style="color:var(--txt3);border-color:var(--border);font-size:11px">Esqueci a senha</button>'        +'<div style="display:flex;gap:8px">'          +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'          +'<button class="btn btn-primary" onclick="verificarSenhaNP()">Entrar</button>'        +'</div>'      +'</div>';
    document.getElementById('modal').style.display='flex';
    setTimeout(()=>{ const el=document.getElementById('np-senha-acesso'); if(el){el.focus();el.addEventListener('keydown',e=>{if(e.key==='Enter')verificarSenhaNP();});} },100);
  }
}

function definirSenhaNP(){
  const s1=(document.getElementById('np-senha1')||{}).value||'';
  const s2=(document.getElementById('np-senha2')||{}).value||'';
  if(s1.length<4){alert('Senha deve ter pelo menos 4 caracteres');return;}
  if(s1!==s2){alert('As senhas não conferem');return;}
  localStorage.setItem('squado_notas_senha', btoa(s1));
  closeModal();
  renderNotasParticulares();
}

function verificarSenhaNP(){
  const digitada=(document.getElementById('np-senha-acesso')||{}).value||'';
  const salva=localStorage.getItem('squado_notas_senha');
  if(btoa(digitada)===salva){
    closeModal();
    renderNotasParticulares();
  } else {
    alert('Senha incorreta. Tente novamente.');
    const el=document.getElementById('np-senha-acesso');
    if(el){el.value='';el.focus();}
  }
}

function resetarSenhaNP(){
  if(!confirm('ATENÇÃO: Resetar a senha apagará TODAS as notas particulares permanentemente. Continuar?')) return;
  localStorage.removeItem('squado_notas_senha');
  localStorage.removeItem('squado_notas_part');
  closeModal();
  toast('Senha e notas particulares resetadas.');
}

function renderNotasParticulares(){
  const notas_part = JSON.parse(localStorage.getItem('squado_notas_part')||'[]');
  document.getElementById('modal-title').textContent = '🔒 Notas Particulares';
  document.getElementById('modal-box').classList.add('modal-lg');

  const rows = notas_part.map((n,i) => `
    <div style="border:0.5px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px">
      <div style="display:flex;align-items:flex-start;gap:8px">
        <div style="flex:1">
          <div style="font-size:10px;color:var(--txt3);margin-bottom:4px">${n.data} ${n.hora?'· '+n.hora:''}</div>
          <div style="font-size:13px;color:var(--txt);white-space:pre-wrap">${n.texto}</div>
        </div>
        <button class="btn btn-xs btn-danger" onclick="excluirNotaParticular(${i})">×</button>
      </div>
    </div>`).join('') || '<div style="text-align:center;color:var(--txt3);padding:24px">Nenhuma nota ainda.</div>';

  document.getElementById('modal-body').innerHTML =
    '<div style="margin-bottom:12px">'      +'<textarea id="np-nova" placeholder="Escreva sua nota particular..." style="min-height:80px;width:100%"></textarea>'      +'<div style="display:flex;justify-content:flex-end;margin-top:6px">'        +'<button class="btn btn-primary btn-sm" onclick="salvarNotaParticular()">💾 Salvar Nota</button>'      +'</div>'    +'</div>'    +'<div style="max-height:400px;overflow-y:auto">'+rows+'</div>'    +'<div style="display:flex;justify-content:space-between;margin-top:12px;border-top:0.5px solid var(--border);padding-top:10px">'      +'<button class="btn btn-sm" onclick="resetarSenhaNP()" style="color:var(--txt3);border-color:var(--border);font-size:11px">🔑 Alterar/Resetar senha</button>'      +'<button class="btn" onclick="closeModal()">Fechar</button>'    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function salvarNotaParticular(){
  const texto=(document.getElementById('np-nova')||{}).value||'';
  if(!texto.trim()){toast('Escreva algo antes de salvar');return;}
  const notas_part = JSON.parse(localStorage.getItem('squado_notas_part')||'[]');
  const agora = new Date();
  notas_part.unshift({
    texto: texto.trim(),
    data: agora.toLocaleDateString('pt-BR'),
    hora: agora.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})
  });
  localStorage.setItem('squado_notas_part', JSON.stringify(notas_part));
  toast('Nota salva! 🔒');
  renderNotasParticulares();
}

function excluirNotaParticular(idx){
  if(!confirm('Excluir esta nota?')) return;
  const notas_part = JSON.parse(localStorage.getItem('squado_notas_part')||'[]');
  notas_part.splice(idx,1);
  localStorage.setItem('squado_notas_part', JSON.stringify(notas_part));
  renderNotasParticulares();
}

