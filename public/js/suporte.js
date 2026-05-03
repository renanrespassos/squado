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
  var user=squadoGetUser();
  var nomeUser=user&&user.nome?user.nome:'';
  var emailUser=user&&user.email?user.email:'';
  var tickets=ls('suporte_tickets',[])||[];

  var ticketsHtml='';
  if(tickets.length){
    ticketsHtml='<div style="margin-top:20px"><div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">\u{1F4CB} Seus tickets</div>';
    tickets.slice().reverse().forEach(function(t){
      var statusCor=t.status==='Resolvido'?'#0F6E56':t.status==='Em andamento'?'#854F0B':'#185FA5';
      var statusBg=t.status==='Resolvido'?'#E1F5EE':t.status==='Em andamento'?'#FAEEDA':'#E6F1FB';
      ticketsHtml+='<div class="card" style="padding:12px 16px;margin-bottom:8px">'
        +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'
          +'<span style="font-size:12px;font-weight:600;color:var(--txt)">'+t.assunto+'</span>'
          +'<span style="font-size:10px;padding:2px 10px;border-radius:20px;background:'+statusBg+';color:'+statusCor+';font-weight:600">'+t.status+'</span>'
        +'</div>'
        +'<div style="font-size:11px;color:var(--txt3)">'+t.categoria+' \u00b7 '+t.prioridade+' \u00b7 '+t.data+'</div>'
        +'<div style="font-size:11px;color:var(--txt2);margin-top:4px">'+t.descricao.slice(0,100)+(t.descricao.length>100?'...':'')+'</div>'
      +'</div>';
    });
    ticketsHtml+='</div>';
  }

  return '<div style="max-width:700px;margin:0 auto">'
    +'<div class="card" style="padding:24px">'
      +'<div style="text-align:center;margin-bottom:20px">'
        +'<div style="font-size:32px;margin-bottom:8px">\u{1F4AC}</div>'
        +'<div style="font-size:18px;font-weight:800;color:var(--txt)">Como podemos ajudar?</div>'
        +'<div style="font-size:12px;color:var(--txt3)">Preencha o formul\u00e1rio abaixo e nossa equipe responder\u00e1 em breve.</div>'
      +'</div>'

      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'
        +'<div class="field-group"><div class="field-label">Nome</div>'
          +'<input id="sup-nome" value="'+nomeUser+'" placeholder="Seu nome"/></div>'
        +'<div class="field-group"><div class="field-label">Email</div>'
          +'<input id="sup-email" value="'+emailUser+'" placeholder="Seu email"/></div>'
      +'</div>'

      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'
        +'<div class="field-group"><div class="field-label">Categoria *</div>'
          +'<select id="sup-cat">'
            +'<option value="">Selecione...</option>'
            +'<option>Bug / Erro</option>'
            +'<option>D\u00favida de uso</option>'
            +'<option>Sugest\u00e3o de melhoria</option>'
            +'<option>Problema de acesso</option>'
            +'<option>Solicita\u00e7\u00e3o de recurso</option>'
            +'<option>Outro</option>'
          +'</select></div>'
        +'<div class="field-group"><div class="field-label">Prioridade</div>'
          +'<select id="sup-prio">'
            +'<option>Normal</option>'
            +'<option>Baixa</option>'
            +'<option>Alta</option>'
            +'<option>Urgente</option>'
          +'</select></div>'
      +'</div>'

      +'<div class="field-group" style="margin-bottom:10px"><div class="field-label">Assunto *</div>'
        +'<input id="sup-assunto" placeholder="Resuma o problema em poucas palavras"/></div>'

      +'<div class="field-group" style="margin-bottom:14px"><div class="field-label">Descri\u00e7\u00e3o detalhada *</div>'
        +'<textarea id="sup-desc" rows="5" placeholder="Descreva o que aconteceu, os passos para reproduzir o problema, e o que esperava que acontecesse..."></textarea></div>'

      +'<div style="display:flex;gap:8px;justify-content:flex-end">'
        +'<button class="btn btn-sm" onclick="limparFormSuporte()">Limpar</button>'
        +'<button class="btn btn-primary btn-sm" onclick="enviarTicketSuporte()">\u{1F4E8} Enviar Ticket</button>'
      +'</div>'
    +'</div>'
    +ticketsHtml
  +'</div>';
}

function limparFormSuporte(){
  ['sup-cat','sup-assunto','sup-desc'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.tagName==='SELECT'?el.selectedIndex=0:el.value='';}
  });
}

async function enviarTicketSuporte(){
  var cat=(document.getElementById('sup-cat')||{}).value;
  var assunto=(document.getElementById('sup-assunto')||{}).value;
  var desc=(document.getElementById('sup-desc')||{}).value;
  var nome=(document.getElementById('sup-nome')||{}).value;
  var email=(document.getElementById('sup-email')||{}).value;
  var prio=(document.getElementById('sup-prio')||{}).value||'Normal';

  if(!cat){toast('Selecione uma categoria.');return;}
  if(!assunto){toast('Informe o assunto.');return;}
  if(!desc||desc.length<10){toast('Descreva o problema com mais detalhes (min 10 caracteres).');return;}

  var ticket={
    id:uid(),nome:nome,email:email,
    categoria:cat,prioridade:prio,assunto:assunto,descricao:desc,
    status:'Aberto',data:new Date().toISOString().slice(0,10),
    timestamp:new Date().toISOString()
  };

  // Salvar localmente
  var tickets=ls('suporte_tickets',[])||[];
  tickets.push(ticket);
  lss('suporte_tickets',tickets);

  // Enviar pro backend
  try{
    var token=squadoGetToken();
    await fetch(SQUADO_API+'/api/suporte/ticket',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify(ticket)
    });
  }catch(e){console.warn('Suporte ticket err:',e);}

  toast('\u2705 Ticket enviado com sucesso! Responderemos em breve.');
  render('suporte');
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
