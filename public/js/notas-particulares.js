// ═══════════════════════════════════════════════════════════════
// NOTAS PARTICULARES — Lista de tarefas com checks
// ═══════════════════════════════════════════════════════════════

var _npDesbloqueado = false;

function getNP(){ return JSON.parse(localStorage.getItem('squado_notas_part')||'[]'); }
function saveNP(list){ localStorage.setItem('squado_notas_part', JSON.stringify(list)); }

function renderNotasParticularesPage(){
  var senhaExiste = !!localStorage.getItem('squado_notas_senha');

  if(!_npDesbloqueado){
    if(!senhaExiste){
      return '<div style="max-width:400px;margin:60px auto;text-align:center">'
        +'<div style="font-size:48px;margin-bottom:12px">🔒</div>'
        +'<div style="font-size:18px;font-weight:700;color:#1A1F1D;margin-bottom:6px">Definir senha</div>'
        +'<div style="font-size:13px;color:#9BA09E;margin-bottom:20px">Crie uma senha para proteger suas notas particulares.</div>'
        +'<input id="np-senha1" type="password" placeholder="Nova senha (mín. 4 caracteres)" style="width:100%;padding:12px;border:1px solid #E0E2E0;border-radius:8px;font-size:14px;margin-bottom:8px;box-sizing:border-box"/>'
        +'<input id="np-senha2" type="password" placeholder="Confirmar senha" style="width:100%;padding:12px;border:1px solid #E0E2E0;border-radius:8px;font-size:14px;margin-bottom:16px;box-sizing:border-box" onkeydown="if(event.key===\'Enter\')npDefinirSenha()"/>'
        +'<button onclick="npDefinirSenha()" class="btn btn-primary" style="width:100%;padding:12px;font-size:14px">Definir e acessar</button>'
      +'</div>';
    } else {
      return '<div style="max-width:400px;margin:60px auto;text-align:center">'
        +'<div style="font-size:48px;margin-bottom:12px">🔒</div>'
        +'<div style="font-size:18px;font-weight:700;color:#1A1F1D;margin-bottom:6px">Notas protegidas</div>'
        +'<div style="font-size:13px;color:#9BA09E;margin-bottom:20px">Digite sua senha para acessar.</div>'
        +'<input id="np-senha-acesso" type="password" placeholder="Sua senha" style="width:100%;padding:12px;border:1px solid #E0E2E0;border-radius:8px;font-size:14px;margin-bottom:16px;box-sizing:border-box" onkeydown="if(event.key===\'Enter\')npVerificarSenha()"/>'
        +'<button onclick="npVerificarSenha()" class="btn btn-primary" style="width:100%;padding:12px;font-size:14px;margin-bottom:10px">Desbloquear</button>'
        +'<div><a onclick="npResetarSenha()" style="font-size:11px;color:#9BA09E;cursor:pointer;text-decoration:underline">Esqueci a senha (apaga todas as notas)</a></div>'
      +'</div>';
    }
  }

  var list = getNP();
  var pendentes = list.filter(function(n){return !n.done;});
  var concluidas = list.filter(function(n){return n.done;});

  var html = '<div style="max-width:640px;margin:0 auto">';

  // Input nova tarefa
  html += '<div class="card" style="padding:14px;margin-bottom:16px">'
    +'<div style="display:flex;gap:8px">'
      +'<input id="np-nova-tarefa" placeholder="Adicionar tarefa ou anotação..." style="flex:1;padding:10px 14px;border:1px solid #E0E2E0;border-radius:8px;font-size:13px;font-family:inherit" onkeydown="if(event.key===\'Enter\')npAdicionarTarefa()"/>'
      +'<button onclick="npAdicionarTarefa()" class="btn btn-primary" style="padding:10px 16px">+ Adicionar</button>'
    +'</div>'
  +'</div>';

  // Stats
  html += '<div style="display:flex;gap:8px;margin-bottom:14px;font-size:12px;color:#9BA09E">'
    +'<span>total '+list.length+'</span>'
    +'<span>·</span>'
    +'<span>pendentes '+pendentes.length+'</span>'
    +'<span>·</span>'
    +'<span>concluídas '+concluidas.length+'</span>'
  +'</div>';

  // Tarefas pendentes
  if(pendentes.length > 0){
    html += '<div style="margin-bottom:20px">';
    pendentes.forEach(function(n){
      var idx = list.indexOf(n);
      var priCor = {alta:'#A32D2D',media:'#854F0B',baixa:'#185FA5'}[n.prioridade||'media']||'#854F0B';
      var priBg = {alta:'#FCEBEB',media:'#FAEEDA',baixa:'#E6F1FB'}[n.prioridade||'media']||'#FAEEDA';
      var priLabel = {alta:'Alta',media:'Média',baixa:'Baixa'}[n.prioridade||'media']||'Média';
      html += '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;background:#fff;border:1px solid #E0E2E0;border-radius:10px;margin-bottom:6px;transition:all .15s" onmouseover="this.style.borderColor=\'#0F6E56\'" onmouseout="this.style.borderColor=\'#E0E2E0\'">'
        +'<input type="checkbox" onchange="npToggle('+idx+')" style="margin-top:3px;width:18px;height:18px;cursor:pointer;accent-color:#0F6E56;flex-shrink:0"/>'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:13px;color:#1A1F1D;line-height:1.5">'+esc(n.texto)+'</div>'
          +'<div style="display:flex;gap:8px;margin-top:4px;align-items:center">'
            +'<span style="font-size:10px;color:#9BA09E">'+n.data+(n.hora?' · '+n.hora:'')+'</span>'
            +'<span onclick="npEditarPrioridade('+idx+')" style="font-size:9px;padding:1px 6px;border-radius:8px;background:'+priBg+';color:'+priCor+';font-weight:600;cursor:pointer" title="Clique pra mudar prioridade">'+priLabel+'</span>'
          +'</div>'
        +'</div>'
        +'<button onclick="npExcluir('+idx+')" style="border:none;background:transparent;cursor:pointer;font-size:14px;padding:4px;color:#C0C0BC" title="Excluir">&times;</button>'
      +'</div>';
    });
    html += '</div>';
  } else if(list.length === 0){
    html += '<div style="text-align:center;padding:40px;color:#9BA09E"><div style="font-size:40px;margin-bottom:8px;opacity:.5">📝</div><div style="font-size:14px;font-weight:600;color:#3A4240;margin-bottom:4px">Nenhuma tarefa ainda</div><div style="font-size:12px">Adicione sua primeira tarefa acima.</div></div>';
  }

  // Concluídas (colapsável)
  if(concluidas.length > 0){
    html += '<div style="margin-top:8px">'
      +'<div onclick="var el=document.getElementById(\'np-concluidas\');el.style.display=el.style.display===\'none\'?\'block\':\'none\'" style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:8px 0;color:#9BA09E;font-size:12px;font-weight:600">'
        +'<span id="np-seta">▸</span> Concluídas ('+concluidas.length+')'
      +'</div>'
      +'<div id="np-concluidas" style="display:none">';
    concluidas.forEach(function(n){
      var idx = list.indexOf(n);
      html += '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;background:#F9FAF8;border:1px solid #F0F1EF;border-radius:10px;margin-bottom:4px;opacity:.6">'
        +'<input type="checkbox" checked onchange="npToggle('+idx+')" style="margin-top:3px;width:18px;height:18px;cursor:pointer;accent-color:#0F6E56;flex-shrink:0"/>'
        +'<div style="flex:1"><div style="font-size:13px;color:#9BA09E;text-decoration:line-through">'+esc(n.texto)+'</div>'
        +'<span style="font-size:10px;color:#C0C0BC">'+n.data+'</span></div>'
        +'<button onclick="npExcluir('+idx+')" style="border:none;background:transparent;cursor:pointer;font-size:14px;padding:4px;color:#C0C0BC">&times;</button>'
      +'</div>';
    });
    html += '</div></div>';
  }

  // Footer
  html += '<div style="margin-top:20px;padding-top:14px;border-top:1px solid #E0E2E0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'
    +'<button onclick="npResetarSenha()" class="btn btn-sm" style="font-size:10px;color:#9BA09E;border-color:#E0E2E0">🔑 Alterar senha</button>'
    +(concluidas.length>0?'<button onclick="npLimparConcluidas()" class="btn btn-sm" style="font-size:10px;color:#9BA09E;border-color:#E0E2E0">🧹 Limpar concluídas</button>':'')
    +'<button onclick="_npDesbloqueado=false;render(\'notas-particulares\')" class="btn btn-sm" style="font-size:10px;color:#9BA09E;border-color:#E0E2E0">🔒 Bloquear</button>'
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
  _npDesbloqueado=true;
  toast('Senha definida!');
  render('notas-particulares');
}

function npVerificarSenha(){
  var digitada=(document.getElementById('np-senha-acesso')||{}).value||'';
  var salva=localStorage.getItem('squado_notas_senha');
  if(btoa(digitada)===salva){
    _npDesbloqueado=true;
    render('notas-particulares');
  } else {
    alert('Senha incorreta.');
    var el=document.getElementById('np-senha-acesso');
    if(el){el.value='';el.focus();}
  }
}

function npResetarSenha(){
  if(!confirm('Resetar a senha apagará TODAS as notas particulares. Continuar?')) return;
  localStorage.removeItem('squado_notas_senha');
  localStorage.removeItem('squado_notas_part');
  _npDesbloqueado=false;
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
  toast('Tarefa adicionada!');
  render('notas-particulares');
  setTimeout(function(){var el=document.getElementById('np-nova-tarefa');if(el)el.focus();},50);
}

function npToggle(idx){
  var list=getNP();
  if(list[idx]) list[idx].done=!list[idx].done;
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
