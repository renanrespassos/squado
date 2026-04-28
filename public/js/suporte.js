// ═══════════════════════════════════════════════════════════════
// SUPORTE — Chat IA para registrar e categorizar problemas
// ═══════════════════════════════════════════════════════════════

var suporteState = {
  mensagens: [],
  categoria: null,
  prioridade: null,
  resumo: null,
  enviando: false,
  ticketRegistrado: false
};

function renderSuporte(){
  var msgs = suporteState.mensagens;
  var msgsHtml = '';

  if(msgs.length === 0){
    msgsHtml = '<div style="display:flex;gap:10px;margin-bottom:16px">'
      +'<div style="width:36px;height:36px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🤖</div>'
      +'<div style="background:#F5F6F4;border-radius:0 12px 12px 12px;padding:14px 16px;max-width:80%;line-height:1.6;font-size:13px;color:#3A4240">'
        +'Olá! Sou o assistente de suporte do Squado. 👋<br><br>'
        +'Me conte o que está acontecendo e vou te ajudar a resolver. Posso:<br><br>'
        +'<span style="color:#0F6E56">●</span> Diagnosticar problemas técnicos<br>'
        +'<span style="color:#0F6E56">●</span> Responder dúvidas sobre a plataforma<br>'
        +'<span style="color:#0F6E56">●</span> Registrar sugestões de melhoria<br>'
        +'<span style="color:#0F6E56">●</span> Criar um ticket pra nossa equipe analisar<br><br>'
        +'<strong>Descreva seu problema ou dúvida:</strong>'
      +'</div>'
    +'</div>';
  } else {
    msgs.forEach(function(m){
      if(m.role === 'user'){
        msgsHtml += '<div style="display:flex;gap:10px;margin-bottom:16px;justify-content:flex-end">'
          +'<div style="background:#0F6E56;color:#fff;border-radius:12px 0 12px 12px;padding:12px 16px;max-width:75%;font-size:13px;line-height:1.5">'+esc(m.content)+'</div>'
        +'</div>';
      } else {
        var txt = (m.content||'').replace(/TICKET_REGISTRAR/g,'').replace(/DIAGNÓSTICO:/g,'<strong style="color:#0F6E56">📋 Diagnóstico:</strong>').replace(/CATEGORIA:\s*/g,'<span style="font-weight:700;color:#185FA5">Categoria:</span> ').replace(/PRIORIDADE:\s*/g,'<span style="font-weight:700;color:#854F0B">Prioridade:</span> ').replace(/RESUMO:\s*/g,'<span style="font-weight:700;color:#0F6E56">Resumo:</span> ').replace(/\n/g,'<br>');
        msgsHtml += '<div style="display:flex;gap:10px;margin-bottom:16px">'
          +'<div style="width:36px;height:36px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px">🤖</div>'
          +'<div style="background:#F5F6F4;border-radius:0 12px 12px 12px;padding:12px 16px;max-width:80%;font-size:13px;color:#3A4240;line-height:1.6">'+txt+'</div>'
        +'</div>';
      }
    });
  }

  // Sugestões rápidas quando chat está vazio
  var sugestoesHtml = '';
  if(msgs.length === 0){
    var sugs = [
      {icon:'🐛', txt:'Encontrei um bug no sistema'},
      {icon:'❓', txt:'Tenho uma dúvida sobre como usar'},
      {icon:'💡', txt:'Tenho uma sugestão de melhoria'},
      {icon:'💳', txt:'Problema com meu plano ou pagamento'},
      {icon:'🔄', txt:'Meus dados não estão sincronizando'},
      {icon:'🔒', txt:'Não consigo acessar minha conta'},
    ];
    sugestoesHtml = '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">'
      +sugs.map(function(s){ return '<button onclick="enviarMsgSuporte(\''+s.txt+'\')" style="display:flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid #E0E2E0;border-radius:8px;background:#fff;cursor:pointer;font-size:12px;color:#3A4240;transition:all .15s;font-family:inherit" onmouseover="this.style.borderColor=\'#0F6E56\';this.style.background=\'#E1F5EE\'" onmouseout="this.style.borderColor=\'#E0E2E0\';this.style.background=\'#fff\'">'+s.icon+' '+s.txt+'</button>'; }).join('')
    +'</div>';
  }

  // Botão de registrar ticket (quando IA diagnosticou)
  var ticketBtn = '';
  if(suporteState.categoria && !suporteState.ticketRegistrado){
    ticketBtn = '<div style="background:#E1F5EE;border:1px solid #9FE1CB;border-radius:10px;padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:12px">'
      +'<span style="font-size:20px">📋</span>'
      +'<div style="flex:1"><strong style="color:#0F6E56">Problema identificado</strong><br>'
        +'<span style="font-size:12px;color:#3A4240">'+esc(suporteState.categoria)+' · '+esc(suporteState.prioridade)+' · '+esc(suporteState.resumo||'')+'</span></div>'
      +'<button onclick="registrarTicketSuporte()" class="btn btn-primary btn-sm">Registrar ticket</button>'
    +'</div>';
  }
  if(suporteState.ticketRegistrado){
    ticketBtn = '<div style="background:#E1F5EE;border:1px solid #9FE1CB;border-radius:10px;padding:14px;margin-bottom:16px;text-align:center">'
      +'<span style="font-size:24px">✅</span><br>'
      +'<strong style="color:#0F6E56">Ticket registrado com sucesso!</strong><br>'
      +'<span style="font-size:12px;color:#3A4240">Nossa equipe vai analisar e responder em breve.</span><br>'
      +'<button onclick="resetarSuporte()" class="btn btn-sm" style="margin-top:10px">Novo atendimento</button>'
    +'</div>';
  }

  // Tickets anteriores
  var ticketsHtml = '';

  return '<div style="max-width:700px;margin:0 auto">'
    // Chat
    +'<div class="card" style="padding:0;overflow:hidden">'
      +'<div style="padding:14px 16px;border-bottom:1px solid #E0E2E0;display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:18px">💬</span>'
        +'<div><div style="font-size:14px;font-weight:700;color:#1A1F1D">Suporte Squado</div>'
        +'<div style="font-size:11px;color:#9BA09E">IA · Responde instantaneamente</div></div>'
        +'<span style="flex:1"></span>'
        +(msgs.length?'<button onclick="resetarSuporte()" class="btn btn-sm" style="font-size:10px">🔄 Novo chat</button>':'')
      +'</div>'
      +'<div id="suporte-msgs" style="padding:16px;max-height:400px;overflow-y:auto;background:#FCFCFA">'+msgsHtml+'</div>'
      +ticketBtn
      +sugestoesHtml
      +'<div style="padding:12px 16px;border-top:1px solid #E0E2E0;display:flex;gap:8px">'
        +'<input id="suporte-input" placeholder="Descreva seu problema..." style="flex:1;padding:10px 14px;border:1px solid #E0E2E0;border-radius:8px;font-size:13px;font-family:inherit" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();enviarMsgSuporte()}"'+(suporteState.enviando?' disabled':'')+'>'
        +'<button onclick="enviarMsgSuporte()" class="btn btn-primary" style="padding:10px 18px"'+(suporteState.enviando?' disabled':'')+'>'+( suporteState.enviando?'⏳':'Enviar')+'</button>'
      +'</div>'
    +'</div>'
    // Info
    +'<div style="margin-top:16px;display:flex;gap:12px">'
      +'<div class="card" style="flex:1;text-align:center;padding:14px"><div style="font-size:20px;margin-bottom:4px">📧</div><div style="font-size:11px;color:#3A4240"><strong>Email</strong><br>contato@squado.com.br</div></div>'
      +'<div class="card" style="flex:1;text-align:center;padding:14px"><div style="font-size:20px;margin-bottom:4px">⏱</div><div style="font-size:11px;color:#3A4240"><strong>Tempo de resposta</strong><br>Até 24h úteis</div></div>'
      +'<div class="card" style="flex:1;text-align:center;padding:14px"><div style="font-size:20px;margin-bottom:4px">📋</div><div style="font-size:11px;color:#3A4240"><strong>Status</strong><br><a href="#" onclick="verMeusTickets();return false" style="color:#0F6E56">Ver meus tickets</a></div></div>'
    +'</div>'
  +'</div>';
}

async function enviarMsgSuporte(msgPredefinida){
  var input = document.getElementById('suporte-input');
  var msg = msgPredefinida || (input ? input.value.trim() : '');
  if(!msg || suporteState.enviando) return;

  // Adicionar mensagem do usuário
  suporteState.mensagens.push({role:'user', content:msg});
  suporteState.enviando = true;
  render('suporte');

  // Scroll pro final
  setTimeout(function(){ var el=document.getElementById('suporte-msgs'); if(el)el.scrollTop=el.scrollHeight; },100);

  try{
    var token = squadoGetToken();
    var r = await fetch(SQUADO_API+'/api/suporte/ia',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({mensagens:suporteState.mensagens})
    });
    var d = await r.json();

    if(d.resposta){
      suporteState.mensagens.push({role:'assistant', content:d.resposta});
      if(d.categoria) suporteState.categoria = d.categoria;
      if(d.prioridade) suporteState.prioridade = d.prioridade;
      if(d.resumo) suporteState.resumo = d.resumo;
      if(d.registrar) registrarTicketSuporte();
    } else {
      suporteState.mensagens.push({role:'assistant', content:'Desculpe, ocorreu um erro. Tente novamente ou envie um email para contato@squado.com.br'});
    }
  }catch(e){
    suporteState.mensagens.push({role:'assistant', content:'Erro de conexão. Verifique sua internet e tente novamente.'});
  }

  suporteState.enviando = false;
  render('suporte');
  setTimeout(function(){ var el=document.getElementById('suporte-msgs'); if(el)el.scrollTop=el.scrollHeight; var inp=document.getElementById('suporte-input');if(inp){inp.value='';inp.focus();} },100);
}

async function registrarTicketSuporte(){
  if(suporteState.ticketRegistrado) return;
  try{
    var token = squadoGetToken();
    var ultimaMsg = suporteState.mensagens.filter(function(m){return m.role==='user';}).pop();
    await fetch(SQUADO_API+'/api/suporte/ticket',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({
        mensagem: ultimaMsg ? ultimaMsg.content : '',
        categoria: suporteState.categoria || 'Geral',
        prioridade: suporteState.prioridade || 'Média',
        resumo: suporteState.resumo || '',
        historico: suporteState.mensagens
      })
    });
    suporteState.ticketRegistrado = true;
    toast('✅ Ticket registrado!');
    render('suporte');
  }catch(e){
    toast('❌ Erro ao registrar ticket');
  }
}

function resetarSuporte(){
  suporteState = {mensagens:[],categoria:null,prioridade:null,resumo:null,enviando:false,ticketRegistrado:false};
  render('suporte');
}

async function verMeusTickets(){
  try{
    var token = squadoGetToken();
    var r = await fetch(SQUADO_API+'/api/suporte/tickets',{headers:{'Authorization':'Bearer '+token}});
    var d = await r.json();
    var tickets = d.tickets || [];
    if(!tickets.length){ toast('Nenhum ticket registrado ainda.'); return; }

    var html = '<div style="max-height:400px;overflow-y:auto">'
      +tickets.map(function(t){
        var corPri = {Alta:'#A32D2D',Média:'#854F0B',Baixa:'#185FA5'}[t.prioridade]||'#888';
        var corCat = {Bug:'#A32D2D',Dúvida:'#185FA5',Sugestão:'#0F6E56',Conta:'#854F0B',Dados:'#534AB7'}[t.categoria]||'#888';
        return '<div style="padding:12px;border-bottom:1px solid #F0F1EF">'
          +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">'
            +'<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:'+corCat+'20;color:'+corCat+';font-weight:700">'+esc(t.categoria)+'</span>'
            +'<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:'+corPri+'20;color:'+corPri+';font-weight:700">'+esc(t.prioridade)+'</span>'
            +'<span style="flex:1"></span>'
            +'<span style="font-size:10px;color:#9BA09E">'+(t.criado_em||'').slice(0,10)+'</span>'
          +'</div>'
          +'<div style="font-size:13px;color:#3A4240">'+esc(t.resumo||t.mensagem||'')+'</div>'
        +'</div>';
      }).join('')
    +'</div>';
    openModal('Meus Tickets de Suporte', html);
  }catch(e){
    toast('Erro ao carregar tickets');
  }
}
