// ═══════════════════════════════════════════════════════════════
// NOTAS PARTICULARES — Checklist pessoal com proteção por senha
// ═══════════════════════════════════════════════════════════════

// Usa sessionStorage pra manter desbloqueado durante a sessão do browser
function npIsUnlocked(){ return sessionStorage.getItem('squado_np_unlocked')==='1'; }
function npSetUnlocked(v){ sessionStorage.setItem('squado_np_unlocked', v?'1':'0'); }

function getNP(){ try{return JSON.parse(localStorage.getItem('squado_notas_part')||'[]');}catch(e){return [];} }
function saveNP(list){ localStorage.setItem('squado_notas_part', JSON.stringify(list)); if(typeof agendarSync==='function') agendarSync(); }

function renderNotasParticularesPage(){
  var senhaExiste = !!localStorage.getItem('squado_notas_senha');

  if(!senhaExiste){
    return '<div style="max-width:400px;margin:60px auto;text-align:center">'
      +'<div style="font-size:48px;margin-bottom:12px">🔒</div>'
      +'<div style="font-size:18px;font-weight:700;color:var(--txt);margin-bottom:6px">Definir senha</div>'
      +'<div style="font-size:13px;color:var(--txt3);margin-bottom:20px">Crie uma senha para proteger suas notas.</div>'
      +'<input id="np-senha1" type="password" autocomplete="new-password" placeholder="Nova senha (mín. 4 caracteres)" style="width:100%;padding:12px;border:1px solid var(--border2);border-radius:8px;font-size:14px;margin-bottom:8px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/>'
      +'<input id="np-senha2" type="password" autocomplete="new-password" placeholder="Confirmar senha" style="width:100%;padding:12px;border:1px solid var(--border2);border-radius:8px;font-size:14px;margin-bottom:16px;box-sizing:border-box;background:var(--bg);color:var(--txt)" onkeydown="if(event.key===\'Enter\')npDefinirSenha()"/>'
      +'<button onclick="npDefinirSenha()" class="btn btn-primary" style="width:100%;padding:12px;font-size:14px">Definir e acessar</button>'
    +'</div>';
  }

  if(!npIsUnlocked()){
    return '<div style="max-width:400px;margin:60px auto;text-align:center">'
      +'<div style="font-size:48px;margin-bottom:12px">🔒</div>'
      +'<div style="font-size:18px;font-weight:700;color:var(--txt);margin-bottom:6px">Notas protegidas</div>'
      +'<div style="font-size:13px;color:var(--txt3);margin-bottom:20px">Digite sua senha para acessar.</div>'
      +'<input id="np-senha-acesso" type="password" autocomplete="current-password" placeholder="Sua senha" autofocus style="width:100%;padding:12px;border:1px solid var(--border2);border-radius:8px;font-size:14px;margin-bottom:16px;box-sizing:border-box;background:var(--bg);color:var(--txt)" onkeydown="if(event.key===\'Enter\')npVerificarSenha()"/>'
      +'<button onclick="npVerificarSenha()" class="btn btn-primary" style="width:100%;padding:12px;font-size:14px;margin-bottom:10px">Desbloquear</button>'
      +'<div><a onclick="npResetarSenha()" style="font-size:11px;color:var(--txt3);cursor:pointer;text-decoration:underline">Esqueci a senha (apaga tudo)</a></div>'
    +'</div>';
  }

  var list = getNP();
  var pendentes = list.filter(function(n){return !n.done;});
  var concluidas = list.filter(function(n){return n.done;});

  var html = '<div style="max-width:640px;margin:0 auto">';

  // Input nova tarefa
  html += '<div style="display:flex;gap:8px;margin-bottom:16px">'
    +'<input id="np-nova-tarefa" placeholder="Nova tarefa..." style="flex:1;padding:12px 14px;border:1px solid var(--border2);border-radius:10px;font-size:14px;font-family:inherit;background:var(--bg);color:var(--txt)" onkeydown="if(event.key===\'Enter\')npAdicionarTarefa()"/>'
    +'<button onclick="npAdicionarTarefa()" class="btn btn-primary" style="padding:12px 20px;font-size:14px;border-radius:10px">+ Adicionar</button>'
  +'</div>';

  // Stats
  html += '<div style="display:flex;gap:16px;margin-bottom:16px">'
    +'<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--txt3)"><span style="font-weight:700;color:var(--txt);font-size:16px">'+list.length+'</span> total</div>'
    +'<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#854F0B"><span style="font-weight:700;font-size:16px">'+pendentes.length+'</span> pendentes</div>'
    +'<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#0F6E56"><span style="font-weight:700;font-size:16px">'+concluidas.length+'</span> concluídas</div>'
  +'</div>';

  // Tarefas pendentes
  if(pendentes.length > 0){
    pendentes.forEach(function(n){
      var idx = list.indexOf(n);
      var priCor = {alta:'#A32D2D',media:'#854F0B',baixa:'#185FA5'}[n.prioridade||'media']||'#854F0B';
      var priBg = {alta:'#FCEBEB',media:'#FAEEDA',baixa:'#E6F1FB'}[n.prioridade||'media']||'#FAEEDA';
      var priLabel = {alta:'🔴 Alta',media:'🟡 Média',baixa:'🔵 Baixa'}[n.prioridade||'media']||'🟡 Média';
      html += '<div style="display:flex;align-items:flex-start;gap:12px;padding:14px 16px;background:var(--bg);border:1px solid var(--border);border-radius:12px;margin-bottom:6px;border-left:3px solid '+priCor+'">'
        +'<input type="checkbox" onchange="npToggle('+idx+')" style="margin-top:2px;width:20px;height:20px;cursor:pointer;accent-color:#0F6E56;flex-shrink:0"/>'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:14px;color:var(--txt);line-height:1.5">'+esc(n.texto)+'</div>'
          +'<div style="display:flex;gap:8px;margin-top:6px;align-items:center">'
            +'<span style="font-size:10px;color:var(--txt3)">'+n.data+(n.hora?' · '+n.hora:'')+'</span>'
            +'<span onclick="npEditarPrioridade('+idx+')" style="font-size:10px;padding:2px 8px;border-radius:10px;background:'+priBg+';color:'+priCor+';font-weight:600;cursor:pointer" title="Clique pra mudar">'+priLabel+'</span>'
          +'</div>'
        +'</div>'
        +'<button onclick="npExcluir('+idx+')" style="border:none;background:transparent;cursor:pointer;font-size:16px;padding:4px 6px;color:var(--txt3);opacity:.5" title="Excluir">&times;</button>'
      +'</div>';
    });
  } else if(list.length === 0){
    html += '<div style="text-align:center;padding:48px 20px;color:var(--txt3)"><div style="font-size:48px;margin-bottom:8px;opacity:.5">✅</div><div style="font-size:15px;font-weight:700;color:var(--txt2);margin-bottom:6px">Nenhuma tarefa ainda</div><div style="font-size:13px">Use o campo acima pra adicionar tarefas e lembretes.</div></div>';
  } else {
    html += '<div style="text-align:center;padding:24px;color:#0F6E56;font-size:14px;font-weight:600">🎉 Todas as tarefas concluídas!</div>';
  }

  // Concluídas colapsável
  if(concluidas.length > 0){
    html += '<div style="margin-top:12px">'
      +'<div onclick="var el=document.getElementById(\'np-concluidas\');var s=document.getElementById(\'np-seta\');if(el.style.display===\'none\'){el.style.display=\'block\';s.textContent=\'▾\';}else{el.style.display=\'none\';s.textContent=\'▸\';}" style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:8px 0;color:var(--txt3);font-size:12px;font-weight:600;user-select:none">'
        +'<span id="np-seta">▸</span> Concluídas ('+concluidas.length+')'
      +'</div>'
      +'<div id="np-concluidas" style="display:none">';
    concluidas.forEach(function(n){
      var idx = list.indexOf(n);
      html += '<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;margin-bottom:4px;opacity:.5">'
        +'<input type="checkbox" checked onchange="npToggle('+idx+')" style="margin-top:2px;width:20px;height:20px;cursor:pointer;accent-color:#0F6E56;flex-shrink:0"/>'
        +'<div style="flex:1"><div style="font-size:13px;color:var(--txt3);text-decoration:line-through">'+esc(n.texto)+'</div>'
        +'<span style="font-size:10px;color:var(--txt3);opacity:.6">'+n.data+'</span></div>'
        +'<button onclick="npExcluir('+idx+')" style="border:none;background:transparent;cursor:pointer;font-size:14px;padding:4px;color:var(--txt3);opacity:.4">&times;</button>'
      +'</div>';
    });
    html += '</div></div>';
  }

  // Footer
  html += '<div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'
    +(concluidas.length>0?'<button onclick="npLimparConcluidas()" class="btn btn-sm" style="font-size:10px;color:var(--txt3);border-color:var(--border)">🧹 Limpar concluídas</button>':'<span></span>')
    +'<button onclick="npSetUnlocked(false);render(\'notas-particulares\')" class="btn btn-sm" style="font-size:10px;color:var(--txt3);border-color:var(--border)">🔒 Bloquear</button>'
  +'</div>';

  html += '</div>';
  return html;
}

function npDefinirSenha(){
  var s1=(document.getElementById('np-senha1')||{}).value||'';
  var s2=(document.getElementById('np-senha2')||{}).value||'';
  if(s1.length<4){alert('Senha deve ter pelo menos 4 caracteres');return;}
  if(s1!==s2){alert('As senhas não conferem');return;}
  localStorage.setItem('squado_notas_senha', btoa(s1));
  npSetUnlocked(true);
  if(typeof agendarSync==='function') agendarSync();
  toast('Senha definida!');
  render('notas-particulares');
}

function npVerificarSenha(){
  var digitada=(document.getElementById('np-senha-acesso')||{}).value||'';
  var salva=localStorage.getItem('squado_notas_senha');
  if(btoa(digitada)===salva){
    npSetUnlocked(true);
    render('notas-particulares');
  } else {
    alert('Senha incorreta.');
    var el=document.getElementById('np-senha-acesso');
    if(el){el.value='';el.focus();}
  }
}

function npResetarSenha(){
  if(!confirm('Resetar a senha apagará TODAS as notas. Continuar?')) return;
  localStorage.removeItem('squado_notas_senha');
  localStorage.removeItem('squado_notas_part');
  npSetUnlocked(false);
  toast('Senha e notas resetadas.');
  render('notas-particulares');
}

function npAdicionarTarefa(){
  var input=document.getElementById('np-nova-tarefa');
  var texto=(input||{}).value||'';
  if(!texto.trim()){toast('Escreva algo');return;}
  var list=getNP();
  var agora=new Date();
  list.unshift({texto:texto.trim(),data:agora.toLocaleDateString('pt-BR'),hora:agora.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),done:false,prioridade:'media'});
  saveNP(list);
  toast('✅ Tarefa adicionada!');
  render('notas-particulares');
  setTimeout(function(){var el=document.getElementById('np-nova-tarefa');if(el)el.focus();},100);
}

function npToggle(idx){
  var list=getNP();
  if(list[idx]){list[idx].done=!list[idx].done;}
  saveNP(list);
  render('notas-particulares');
}

function npExcluir(idx){
  var list=getNP();
  list.splice(idx,1);
  saveNP(list);
  render('notas-particulares');
}

function npEditarPrioridade(idx){
  var list=getNP();
  var item=list[idx];if(!item)return;
  var p=['baixa','media','alta'];
  var atual=p.indexOf(item.prioridade||'media');
  item.prioridade=p[(atual+1)%3];
  saveNP(list);
  toast('Prioridade: '+(item.prioridade==='alta'?'Alta':item.prioridade==='media'?'Média':'Baixa'));
  render('notas-particulares');
}

function npLimparConcluidas(){
  if(!confirm('Remover todas as concluídas?'))return;
  saveNP(getNP().filter(function(n){return !n.done;}));
  toast('Concluídas removidas');
  render('notas-particulares');
}

function abrirNotasParticulares(){ go('notas-particulares'); }
