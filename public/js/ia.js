function getIAConfig(){
  const raw = localStorage.getItem('gp8_iaconfig');
  if(raw){ 
    try{ 
      const cfg = JSON.parse(raw);
      // Migrar modelos antigos/pesados para modelos leves
      const modelosPesados=['gemma3:4b','gemma3:12b','llama3.1','llama3','mistral','mistral-nemo','gemma2','deepseek-r1:8b'];
      if(!cfg.ollamaModel || cfg.ollamaModel==='llama3.2' || modelosPesados.includes(cfg.ollamaModel)){
        cfg.ollamaModel='llama3.2:1b';
        try{ localStorage.setItem('gp8_iaconfig', JSON.stringify(cfg)); }catch{}
      }
      return cfg;
    }catch{} 
  }
  return { mode:'cloud', ollamaUrl: DEFAULT_OLLAMA_URL, ollamaModel: DEFAULT_OLLAMA_MODEL, remoteUrl:'', remoteKey:'', remoteModel:'' };
}
function saveIAConfig(cfg){ localStorage.setItem('gp8_iaconfig', JSON.stringify(cfg)); }
function getActiveCfg(){ return getIAConfig(); }

function checkApiKey(){
  const cfg = getIAConfig();
  if(cfg.mode==='cloud') return true; // Cloud usa backend, sem config necessária
  const ok = cfg.mode==='ollama' ? !!(cfg.ollamaUrl) : !!(cfg.remoteUrl && cfg.remoteKey);
  if(!ok){ showApiKeyModal(); return false; }
  return true;
}

// ─── wrapper unificado ────────────────────────────────────────
async function callClaude(messages, maxTokens=1000){
  if(!checkApiKey()) throw new Error('NO_API_KEY');
  const cfg = getIAConfig();

  // ── Modo Cloud: proxy via backend Squado ──
  if(cfg.mode==='cloud'){
    const token=squadoGetToken();
    if(!token) throw new Error('Faça login para usar a IA.');
    const resp=await fetch(SQUADO_API+'/api/ai/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({messages:messages,max_tokens:maxTokens})
    });
    if(!resp.ok){
      const err=await resp.json().catch(()=>({}));
      throw new Error(err.erro||'Erro '+resp.status+' ao consultar IA.');
    }
    const data=await resp.json();
    return data.content||'';
  }

  // ── Modo Ollama / Remoto (legado) ──
  const isOllama = cfg.mode === 'ollama';
  const baseUrl = isOllama
    ? (cfg.ollamaUrl||DEFAULT_OLLAMA_URL).replace(/\/+$/,'')
    : (cfg.remoteUrl||'').replace(/\/+$/,'');
  const model = isOllama
    ? (cfg.ollamaModel||DEFAULT_OLLAMA_MODEL)
    : (cfg.remoteModel||DEFAULT_OLLAMA_MODEL);

  const endpoint = `${baseUrl}/v1/chat/completions`;
  const headers  = { 'Content-Type': 'application/json' };
  if(!isOllama && cfg.remoteKey) headers['Authorization'] = `Bearer ${cfg.remoteKey}`;

  let resp;
  try {
    resp = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
        stream: false,
      })
    });
  } catch(netErr){
    throw new Error(
      isOllama
        ? `Sem conexão com o Ollama em ${baseUrl}.\n\nVerifique:\n1. O Ollama está rodando? (ollama serve)\n2. Rode com: OLLAMA_ORIGINS=* ollama serve\n3. Ou abra o HTML via servidor local (npx serve .)`
        : `Sem conexão com o servidor remoto em ${baseUrl}.`
    );
  }

  if(!resp.ok){
    let errMsg = '';
    try { const e = await resp.json(); errMsg = (e.error&&e.error.message)||JSON.stringify(e); } catch{}
    if(resp.status===401) throw new Error('Credenciais inválidas. Verifique a API Key/token.');
    if(resp.status===404){
      try{
        const tr=await fetch(baseUrl+'/v1/models');
        if(tr.ok){const td=await tr.json();const avail=(td.data||td.models||[]).map(m=>m.id||m.name);
          if(avail.length>0) throw new Error('Modelo "'+model+'" n\u00E3o encontrado.\n\nModelos dispon\u00EDveis no seu Ollama: '+avail.join(', ')+'\n\nAcesse \u2699\uFE0F Config. IA e selecione um dos modelos acima, ou baixe com: ollama pull gemma3:4b');
        }
      }catch(e2){if(e2.message.includes('dispon')) throw e2;}
      throw new Error('Modelo "'+model+'" n\u00E3o encontrado. Rode no terminal: ollama pull '+model);
    }
    throw new Error(`Erro ${resp.status}: ${errMsg||'verifique as configurações'}`);
  }

  const data = await resp.json();
  return (data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)
      || (data.message&&data.message.content)
      || data.response
      || '';
}

// ─── Modal de configuração ────────────────────────────────────
function showApiKeyModal(){
  const cfg = getIAConfig();
  document.getElementById('modal-title').textContent = 'Configurar IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML = `
    <div style="font-size:12px;color:var(--txt2);line-height:1.6;margin-bottom:14px">
      Configure qual backend de IA sera usado pelo Agente, Bloco de Notas e Avaliações.
    </div>

    <!-- TABS de modo -->
    <div style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;margin-bottom:16px">
      <button id="tab-cloud" onclick="switchIATab('cloud')"
        style="flex:1;padding:8px;border:none;cursor:pointer;font-size:12.5px;font-weight:600;transition:all .15s;
               background:${cfg.mode==='cloud'?'var(--green)':'var(--bg2)'};color:${cfg.mode==='cloud'?'#fff':'var(--txt2)'}">
        ☁️ Nuvem
      </button>
      <button id="tab-ollama" onclick="switchIATab('ollama')"
        style="flex:1;padding:8px;border:none;border-left:0.5px solid var(--border2);cursor:pointer;font-size:12.5px;font-weight:600;transition:all .15s;
               background:${cfg.mode==='ollama'?'var(--green)':'var(--bg2)'};color:${cfg.mode==='ollama'?'#fff':'var(--txt2)'}">
        Ollama Local
      </button>
      <button id="tab-remote" onclick="switchIATab('remote')"
        style="flex:1;padding:8px;border:none;border-left:0.5px solid var(--border2);cursor:pointer;font-size:12.5px;font-weight:600;transition:all .15s;
               background:${cfg.mode==='remote'?'var(--green)':'var(--bg2)'};color:${cfg.mode==='remote'?'#fff':'var(--txt2)'}">
        Servidor Remoto
      </button>
    </div>

    <!-- Cloud -->
    <div id="panel-cloud" style="display:${cfg.mode==='cloud'?'block':'none'}">
      <div style="background:var(--green-bg);border-radius:8px;padding:11px 13px;margin-bottom:12px;font-size:12px;color:var(--green2);line-height:1.6">
        <strong>IA na Nuvem (recomendado)</strong><br>
        A IA roda nos servidores do Squado. Nenhuma configuracao necessaria.<br>
        Modelo: Llama 3.1 8B — rapido e otimizado para gestao de equipes.
      </div>
    </div>

    <!-- Ollama -->
    <div id="panel-ollama" style="display:${cfg.mode==='ollama'?'block':'none'}">
      <div style="background:var(--green-bg);border-radius:8px;padding:11px 13px;margin-bottom:12px;font-size:12px;color:var(--green2);line-height:1.6">
        <strong>Instalacao do Ollama:</strong><br>
        1. Acesse <a href="https://ollama.com/download" target="_blank" style="color:var(--green2)">ollama.com/download</a> e instale<br>
        2. Baixe um modelo: <code style="background:#d1fae5;padding:1px 5px;border-radius:4px">ollama pull gemma3:4b</code><br>
        3. Suba com CORS liberado:<br>
        &nbsp;&nbsp;&nbsp;<strong>Windows:</strong> <code style="background:#d1fae5;padding:1px 5px;border-radius:4px">set OLLAMA_ORIGINS=* && ollama serve</code><br>
        &nbsp;&nbsp;&nbsp;<strong>Mac/Linux:</strong> <code style="background:#d1fae5;padding:1px 5px;border-radius:4px">OLLAMA_ORIGINS=* ollama serve</code>
      </div>
      <div class="form-grid">
        <div class="field-group form-full">
          <div class="field-label">URL do Ollama</div>
          <input id="ia-ollama-url" value="${cfg.ollamaUrl||DEFAULT_OLLAMA_URL}" placeholder="http://localhost:11434"/>
        </div>
        <div class="field-group form-full">
          <div class="field-label">Modelo</div>
          <select id="ia-ollama-model">
            ${[
              {v:'llama3.2:1b', l:'llama3.2:1b — Ultra leve (~1GB)'},
              {v:'qwen2.5:0.5b',l:'qwen2.5:0.5b — Minimo (~400MB)'},
              {v:'gemma3:1b',   l:'gemma3:1b — Leve (~1.5GB)'},
              {v:'gemma3:4b',   l:'gemma3:4b — Medio (~4GB RAM)'},
            ].map(m=>`<option value="${m.v}"${(cfg.ollamaModel||DEFAULT_OLLAMA_MODEL)===m.v?' selected':''}>${m.l}</option>`).join('')}
          </select>
        </div>
      </div>
      <button class="btn btn-sm mt-8" onclick="testOllamaConn()" id="btn-test-ollama">Testar conexao</button>
      <div id="ollama-test-result" style="font-size:11px;margin-top:6px;color:var(--txt3)"></div>
    </div>

    <!-- Remoto -->
    <div id="panel-remote" style="display:${cfg.mode==='remote'?'block':'none'}">
      <div style="background:var(--blue-bg);border-radius:8px;padding:11px 13px;margin-bottom:12px;font-size:12px;color:var(--blue);line-height:1.6">
        <strong>Servidor Remoto (OpenAI-compatible):</strong><br>
        Informe a URL, modelo e API Key de qualquer provedor OpenAI-compatible.
      </div>
      <div class="form-grid">
        <div class="field-group form-full">
          <div class="field-label">URL do servidor</div>
          <input id="ia-remote-url" value="${cfg.remoteUrl||''}" placeholder="https://api.groq.com/openai"/>
        </div>
        <div class="field-group form-full">
          <div class="field-label">Modelo</div>
          <input id="ia-remote-model" value="${cfg.remoteModel||'llama-3.1-8b-instant'}" placeholder="llama-3.1-8b-instant"/>
        </div>
        <div class="field-group form-full">
          <div class="field-label">API Key</div>
          <input id="ia-remote-key" type="password" value="${cfg.remoteKey||''}" placeholder="sk-... ou gsk_..."/>
        </div>
      </div>
    </div>

    <div class="flex gap-8 mt-16 justify-between">
      <button class="btn btn-sm" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-sm" onclick="resetarModeloIA()" style="border-color:#854F0B;color:#854F0B" title="Limpa a configuração salva e usa gemma3:1b">↺ Resetar modelo</button>
      <button class="btn btn-primary" onclick="saveIAConfigFromModal()">💾 Salvar configuração</button>
    </div>`;
  document.getElementById('modal').style.display='flex';
  // Auto-detectar modelos ao abrir
  setTimeout(()=>{ const u=document.getElementById('ia-ollama-url'); if(u&&u.value) testOllamaConn(); },400);
}function switchIATab(mode){
  document.getElementById('panel-cloud').style.display  = mode==='cloud'?'block':'none';
  document.getElementById('panel-ollama').style.display = mode==='ollama'?'block':'none';
  document.getElementById('panel-remote').style.display = mode==='remote'?'block':'none';
  document.getElementById('tab-cloud').style.background  = mode==='cloud'?'var(--green)':'var(--bg2)';
  document.getElementById('tab-cloud').style.color       = mode==='cloud'?'#fff':'var(--txt2)';
  document.getElementById('tab-ollama').style.background = mode==='ollama'?'var(--green)':'var(--bg2)';
  document.getElementById('tab-ollama').style.color      = mode==='ollama'?'#fff':'var(--txt2)';
  document.getElementById('tab-remote').style.background = mode==='remote'?'var(--green)':'var(--bg2)';
  document.getElementById('tab-remote').style.color      = mode==='remote'?'#fff':'var(--txt2)';
}

async function testOllamaConn(){
  const rawUrl = ((document.getElementById('ia-ollama-url')||{}).value||'').trim().replace(/\/+$/,'');
  const res    = document.getElementById('ollama-test-result');
  const btn    = document.getElementById('btn-test-ollama');
  if(!rawUrl){ if(res){res.textContent='Informe a URL primeiro.';res.style.color='var(--danger)';}return; }
  if(btn){ btn.disabled=true; btn.textContent='⏳ Testando...'; }
  if(res){ res.innerHTML='<span style="color:var(--txt3)">Verificando...</span>'; }

  // Gerar variantes de URL para tentar (localhost ↔ 127.0.0.1)
  const urlVariants = [rawUrl];
  if(rawUrl.includes('localhost')) urlVariants.push(rawUrl.replace('localhost','127.0.0.1'));
  else if(rawUrl.includes('127.0.0.1')) urlVariants.push(rawUrl.replace('127.0.0.1','localhost'));

  let ok=false, okUrl='', modelList=[];

  for(const baseUrl of urlVariants){
    if(ok) break;
    // Tentativa 1: /v1/models (OpenAI-compat)
    try{
      const r = await fetch(baseUrl+'/v1/models',{signal:AbortSignal.timeout(4000)});
      if(r.ok){
        const d = await r.json();
        modelList=(d.data||d.models||[]).map(m=>m.id||m.name);
        ok=true; okUrl=baseUrl;
      }
    }catch(e1){}

    // Tentativa 2: /api/tags (nativa Ollama)
    if(!ok){
      try{
        const r2=await fetch(baseUrl+'/api/tags',{signal:AbortSignal.timeout(4000)});
        if(r2.ok){
          const d2=await r2.json();
          modelList=(d2.models||[]).map(m=>m.name);
          ok=true; okUrl=baseUrl;
        }
      }catch(e2){}
    }
  }

  if(ok){
    const models=modelList.join(', ')||'nenhum modelo carregado';
    if(res){
      res.innerHTML='✅ Conectado em <strong>'+okUrl+'</strong>!<br>'
        +'<span style="font-size:11px;color:var(--green)">Modelos disponíveis: <strong>'+models+'</strong></span>';
      res.style.color='var(--green)';
    }
    // Atualizar URL no campo se usou variante
    if(okUrl !== rawUrl){
      const urlEl=document.getElementById('ia-ollama-url');
      if(urlEl) urlEl.value=okUrl;
    }
    // Popular select de modelos — preferir gemma3:1b se disponível
    const sel=document.getElementById('ia-ollama-model');
    if(sel&&modelList.length>0){
      const cur=sel.value;
      // Se o modelo atual é pesado e gemma3:1b está disponível, sugerir a troca
      const temLeve = modelList.some(m=>m==='gemma3:1b'||m==='llama3.2:1b');
      const modeloPesado = ['gemma3:4b','gemma3:12b','llama3.1','llama3','mistral'].includes(cur);
      const melhor = temLeve ? (modelList.find(m=>m==='llama3.2:1b')||modelList.find(m=>m==='qwen2.5:0.5b')||modelList.find(m=>m==='gemma3:1b')||cur) : cur;
      const selecionar = (modeloPesado && temLeve) ? melhor : cur;
      sel.innerHTML=modelList.map(m=>'<option value="'+m+'"'+(m===selecionar?' selected':'')+'>'+m+(m==='gemma3:1b'?' ✓ leve':m==='gemma3:4b'?' (mais RAM)':'')+' </option>').join('');
      // Salvar automaticamente se trocou para modelo mais leve
      if(selecionar !== cur){
        const cfg=getIAConfig();
        cfg.ollamaModel=selecionar;
        saveIAConfig(cfg);
        if(res) res.innerHTML+='<br><span style="font-size:11px;color:var(--green)">✓ Modelo atualizado para <strong>'+selecionar+'</strong> (mais leve)</span>';
      }
    }
  } else {
    if(res){
      const isFile = window.location.protocol==='file:';
      res.innerHTML='❌ Sem conexão com <strong>'+rawUrl+'</strong><br>'
        +'<span style="font-size:11px;line-height:1.9;color:#5a5a56">'
        +(isFile
          ? '⚠️ <strong>Arquivo aberto via file://</strong> — CORS pode bloquear mesmo com OLLAMA_ORIGINS=*<br>'
            +'<strong>Solução recomendada:</strong> sirva via servidor local:<br>'
            +'<code style="background:#f5f5f3;padding:2px 6px;border-radius:3px;font-size:10px">npx serve .</code> → acesse <code style="background:#f5f5f3;padding:2px 6px;border-radius:3px;font-size:10px">http://localhost:3000</code><br>'
          : '')
        +'① Ollama rodando? <code style="background:#f5f5f3;padding:1px 4px;border-radius:3px">ollama serve</code><br>'
        +'② CORS liberado? <code style="background:#f5f5f3;padding:1px 4px;border-radius:3px">OLLAMA_ORIGINS=* ollama serve</code><br>'
        +'③ Modelo instalado? <code style="background:#f5f5f3;padding:1px 4px;border-radius:3px">ollama pull gemma3:4b</code>'
        +'</span>';
      res.style.color='var(--danger)';
    }
  }
  if(btn){btn.disabled=false;btn.textContent='🔍 Testar conexão';}
}

function resetarModeloIA(){
  const cfg = getIAConfig();
  cfg.ollamaModel = 'llama3.2:1b';
  saveIAConfig(cfg);
  const sel = document.getElementById('ia-ollama-model');
  if(sel){
    Array.from(sel.options).forEach(function(opt){ opt.selected = (opt.value === 'llama3.2:1b'); });
    if(!Array.from(sel.options).some(o=>o.value==='llama3.2:1b')){
      var opt = document.createElement('option');
      opt.value = 'llama3.2:1b'; opt.text = 'llama3.2:1b ✓ Ultra leve'; opt.selected = true;
      sel.insertBefore(opt, sel.firstChild);
    }
  }
  toast('Modelo definido para llama3.2:1b (ultra leve) — clique Salvar!');
}

function saveIAConfigFromModal(){
  const cloudVisible  = (document.getElementById('panel-cloud')||{style:{}}).style.display !== 'none';
  const ollamaVisible = (document.getElementById('panel-ollama')||{style:{}}).style.display !== 'none';
  const mode = cloudVisible ? 'cloud' : ollamaVisible ? 'ollama' : 'remote';
  let cfg;
  if(mode === 'cloud'){
    cfg = { mode:'cloud', ollamaUrl:'', ollamaModel:'', remoteUrl:'', remoteKey:'', remoteModel:'' };
  } else if(mode === 'ollama'){
    const url   = ((document.getElementById('ia-ollama-url')||{}).value||'').trim().replace(/\/+$/,'');
    const model = (document.getElementById('ia-ollama-model')||{}).value || DEFAULT_OLLAMA_MODEL;
    if(!url){ alert('Informe a URL do Ollama.'); return; }
    cfg = { mode, ollamaUrl: url, ollamaModel: model, remoteUrl:'', remoteKey:'', remoteModel:'' };
  } else {
    const url   = ((document.getElementById('ia-remote-url')||{}).value||'');
    const model = ((document.getElementById('ia-remote-model')||{}).value||'llama-3.1-8b-instant');
    const key   = ((document.getElementById('ia-remote-key')||{}).value||'');
    if(!url){ alert('Informe a URL do servidor remoto.'); return; }
    cfg = { mode, ollamaUrl:'', ollamaModel:'', remoteUrl: url, remoteKey: key, remoteModel: model };
  }
  saveIAConfig(cfg);
  closeModal();
  toast('Configuracao de IA salva!');
  render(currentPage);
}

// Manter compatibilidade com saveApiKey (chamado em saveApiKey modal antigo)
function saveApiKey(){ saveIAConfigFromModal(); }

// ══════════════════════════════════════════════════════════════
// AGENTE IA
// ══════════════════════════════════════════════════════════════
function buildContextoIA(){
  const totalMov=colaboradores.reduce((a,c)=>a+(c.historico||[]).length,0);
  const semAval=colaboradores.filter(c=>!avaliacoes.find(a=>a.colaboradorId===c.id));
  const mediaGeral=avaliacoes.length?Math.round(avaliacoes.reduce((a,av)=>a+av.mediaGeral,0)/avaliacoes.length*10)/10:0;
  return `Você é um assistente especialista em Gestão de Pessoas para um laboratório industrial de qualidade (EMC e Telecom).
Ajude o gestor com análises e sugestões práticas. Use português brasileiro, seja objetivo e acionável.

DADOS DO LABORATÓRIO:
- Colaboradores: ${colaboradores.length} | Movimentações: ${totalMov} | Avaliações: ${avaliacoes.length} | Média geral: ${mediaGeral}
- Sem avaliação: ${semAval.length} (${semAval.slice(0,4).map(c=>c.nome.split(' ')[0]).join(', ')}${semAval.length>4?'...':''})
- Notas registradas: ${notas.length}

EQUIPE:
${colaboradores.map(c=>{const avsC=avaliacoes.filter(a=>a.colaboradorId===c.id);const lastAv=avsC.length?avsC[avsC.length-1]:null;return `• ${c.nome} | ${c.nivel} | ${c.area} | Mov: ${(c.historico||[]).length} | ${lastAv?'Média: '+lastAv.mediaGeral:'SEM AVALIAÇÃO'}`;}).join('\n')}

ÚLTIMAS AVALIAÇÕES:
${avaliacoes.slice(-5).reverse().map(a=>`• ${a.colaborador} (${a.nivel}): média ${a.mediaGeral} em ${a.data}`).join('\n')||'Nenhuma.'}

${notas.length?`NOTAS RECENTES:\n${notas.slice(-4).reverse().map(n=>`• [${n.colNome}/${n.categoria}] ${n.texto.slice(0,90)}`).join('\n')}`:''}`;
}

function scrollAiToBottom(){const msgs=document.getElementById('ai-messages');if(msgs)msgs.scrollTop=msgs.scrollHeight;}

function renderAgente(){
  const cfg=getIAConfig();
  const hasKey=cfg.mode==='cloud'||!!(cfg.mode==='ollama'?cfg.ollamaUrl:cfg.remoteUrl);
  const semAval=colaboradores.filter(c=>!avaliacoes.find(a=>a.colaboradorId===c.id)).length;

  // Montar mensagens
  let msgsHtml='';
  if(aiHistory.length===0){
    msgsHtml='<div class="ai-msg"><div class="ai-bot-avatar">\u{1F916}</div>'
      +'<div class="ai-bubble bot">Ol\u00E1! Sou o Assistente de Gest\u00E3o do Laborat\u00F3rio. '
      +'Tenho acesso a todos os dados da equipe.\n\nPosso ajudar com:\n'
      +'\u2022 An\u00E1lise de desempenho\n'
      +'\u2022 Identificar quem precisa de avalia\u00E7\u00E3o urgente\n'
      +'\u2022 Sugerir PDI e planos de desenvolvimento\n'
      +'\u2022 Analisar tend\u00EAncias e movimenta\u00E7\u00F5es\n\n'
      +'O que deseja saber?</div></div>';
  } else {
    aiHistory.forEach(function(m){
      var side=m.role==='user'?'user-msg':'';
      var bubble=m.role==='user'?'user':'bot';
      var avatar=m.role!=='user'?'<div class="ai-bot-avatar">\u{1F916}</div>':'';
      var txt=(m.content||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').split('\n').join('<br>');
      msgsHtml+='<div class="ai-msg '+side+'">'+avatar+'<div class="ai-bubble '+bubble+'">'+txt+'</div></div>';
    });
  }

  // Botões de sugestão
  var sugs=['Quem precisa de avalia\u00E7\u00E3o urgente?','Analise a equipe de EMC','Estagi\u00E1rios prontos para progress\u00E3o?','Sugira a\u00E7\u00F5es de desenvolvimento','Resumo executivo da equipe'];
  var sugBtns='';
  sugs.forEach(function(q,i){ window['_sq'+i]=q; sugBtns+='<button class="btn btn-xs" onclick="quickAsk(window._sq'+i+')">'+q+'</button>'; });

  return ''
    +'<div class="ai-wrap">'
      +'<div class="ai-left">'
        +'<div class="ai-messages" id="ai-messages">'+msgsHtml+'</div>'
        +'<div class="ai-input-row">'
          +'<textarea class="ai-input-field" id="ai-input" placeholder="Pergunte sobre a equipe..." rows="2" id="ai-input-ta"></textarea>'
          +'<button class="btn btn-purple" onclick="sendAiMsg()" id="ai-send-btn" style="align-self:flex-end;padding:9px 16px">Enviar</button>'
        +'</div>'
        +'<div class="flex gap-6 mt-8 flex-wrap"><span style="font-size:10px;color:var(--txt3)">Sugest\u00F5es:</span>'+sugBtns+'</div>'
      +'</div>'
      +'<div class="ai-right">'
        +'<div class="ai-ctx-card">'
          +'<div class="ai-ctx-title">\u{1F4CA} Contexto atual</div>'
          +'<div style="font-size:12px;color:var(--txt2);line-height:2">'
            +'<div>\u{1F465} '+colaboradores.length+' colaboradores</div>'
            +'<div>\u{1F4CB} '+avaliacoes.length+' avalia\u00E7\u00F5es</div>'
            +'<div>\u{1F4DD} '+notas.length+' notas</div>'
            +'<div>\u26A0\uFE0F '+semAval+' sem avalia\u00E7\u00E3o</div>'
          +'</div>'
        +'</div>'
        +'<div class="ai-ctx-card">'
          +'<div class="ai-ctx-title">\u{1F3AF} A\u00E7\u00F5es r\u00E1pidas</div>'
          +'<button class="ai-ctx-btn" onclick="quickAsk(_sq0)">\u26A0\uFE0F Sem avalia\u00E7\u00E3o</button>'
          +'<button class="ai-ctx-btn" onclick="quickAsk(_sq2)">\u{1F4C8} Progress\u00E3o</button>'
          +'<button class="ai-ctx-btn" onclick="quickAsk(_sq4)">\u{1F4C4} Resumo executivo</button>'
          +'<button class="ai-ctx-btn" onclick="quickAsk(\'Quais colaboradores com mais movimenta\u00E7\u00F5es?\')">\u{1F504} Movimenta\u00E7\u00F5es</button>'
          +'<button class="ai-ctx-btn" onclick="quickAsk(\'Sugira um PDI para a equipe de EMC\')">\u{1F393} PDI para EMC</button>'
        +'</div>'
        +'<div class="ai-ctx-card">'
          +'<button class="btn btn-sm btn-danger" style="width:100%" onclick="clearAiHistory()">\u{1F5D1} Limpar conversa</button>'
        +'</div>'
      +'</div>'
    +'</div>';
}

// Adicionar listener de Enter no textarea após renderizar
function _bindAiEnter(){
  var ta=document.getElementById('ai-input');
  if(ta&&!ta._bound){
    ta._bound=true;
    ta.addEventListener('keydown',function(e){
      if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAiMsg();}
    });
  }
}

function clearAiHistory(){if(!confirm('Limpar histórico?'))return;aiHistory=[];lss('aiHistory',aiHistory);render('agente')}

async function sendAiMsg(){
  const input=document.getElementById('ai-input');
  const msg=((input&&input.value)||'').trim();if(!msg)return;
  input.value='';
  const btn=document.getElementById('ai-send-btn');if(btn)btn.disabled=true;
  aiHistory.push({role:'user',content:msg});
  const msgs=document.getElementById('ai-messages');
  if(msgs){
    msgs.innerHTML+=`<div class="ai-msg user-msg"><div class="ai-bubble user">${msg.replace(/</g,'&lt;')}</div></div>`;
    msgs.innerHTML+=`<div class="ai-msg" id="ai-loading"><div class="ai-bot-avatar">🤖</div><div class="ai-bubble loading">Analisando os dados da equipe...</div></div>`;
    msgs.scrollTop=msgs.scrollHeight;
  }
  try{
    const ctx=buildContextoIA();
    const messages=[
      {role:'user',content:ctx+'\n\nResponda a pergunta a seguir de forma prática e objetiva.'},
      {role:'assistant',content:'Entendido! Analisarei os dados e responderei de forma prática.'},
      ...aiHistory.slice(-12).map(m=>({role:m.role,content:m.content})),
    ];
    const reply = await callClaude(messages, 1000);
    (() => { var _al=document.getElementById('ai-loading'); if(_al)_al.remove(); })();
    aiHistory.push({role:'assistant',content:reply});
    lss('aiHistory',aiHistory);
    if(msgs){
      msgs.innerHTML+=`<div class="ai-msg"><div class="ai-bot-avatar">🤖</div><div class="ai-bubble bot">${reply.replace(/</g,'&lt;').replace(/\n/g,'<br>')}</div></div>`;
      msgs.scrollTop=msgs.scrollHeight;
    }
  } catch(e){
    (() => { var _al=document.getElementById('ai-loading'); if(_al)_al.remove(); })();
    if(e.message==='NO_API_KEY')return;
    if(msgs){
      let errTxt = e.message||'Erro ao conectar com a IA.';
      // Traduzir erros comuns do Ollama
      if(errTxt.includes('model failed to load') || errTxt.includes('500'))
        errTxt = '⚠️ Modelo não carregou (RAM insuficiente).\n\nSoluções (do mais leve para o maior):\n① ollama pull llama3.2:1b  (~1GB RAM)\n② ollama pull qwen2.5:0.5b (~400MB RAM)\n③ Feche outros apps para liberar memória\n\nDepois configure em ⚙️ Configurar IA → escolha o modelo instalado';
      else if(errTxt.includes('Sem conexão') || errTxt.includes('fetch'))
        errTxt = '⚠️ Sem conexão com o Ollama.\n\nRode no Terminal:\nOLLAMA_ORIGINS=* ollama serve';
      msgs.innerHTML+=`<div class="ai-msg"><div class="ai-bot-avatar">🤖</div><div class="ai-bubble bot" style="color:var(--danger);white-space:pre-wrap">${errTxt.replace(/</g,'&lt;')}</div></div>`;
      msgs.scrollTop=msgs.scrollHeight;
    }
  }
  if(btn)btn.disabled=false;
}

function quickAsk(q){
  const input=document.getElementById('ai-input');
  if(input){input.value=q;sendAiMsg();}
  else{go('agente');setTimeout(()=>{const inp=document.getElementById('ai-input');if(inp){inp.value=q;sendAiMsg();}},150);}
}

// ═══ NOTAS (módulo externo) ═══
// → public/js/notas.js

// IA na avaliação
let aiSugestoes='';
async function gerarSugestoesIA(){
  if(!avalState.colId){alert('Selecione um colaborador primeiro.');return}
  const c=colaboradores.find(x=>x.id===avalState.colId);if(!c)return;
  const btn=document.getElementById('btn-ia-aval');if(btn){btn.disabled=true;btn.textContent='⏳ Analisando...'}
  // Fallback: usar nível mais próximo se o nível exato não existir
  const _niv=avalState.nivel;
  const p=perguntas[_niv]||perguntas['Assistente I']||{};
  const scores=Object.entries(p).map(([sec,qs])=>{const avg=qs.reduce((_,q,qi)=>(avalState.respostas[sec+'__'+qi]||5)+_,0)/Math.max(qs.length,1);return sec+': '+Math.round(avg*10)/10;}).join(', ');
  const notasCol=notas.filter(n=>n.colId===c.id).map(n=>`[${n.categoria}] ${n.texto}`).join('; ');
  const avsCol=avaliacoes.filter(a=>a.colaboradorId===c.id);
  const prompt=`Analise os dados e sugira 4-5 ações práticas para o desenvolvimento deste colaborador.

COLABORADOR: ${c.nome} | ${c.nivel} | ${c.area}
SCORES ATUAIS: ${scores}
HISTÓRICO: ${(c.historico||[]).map(h=>h.descricao).join('; ')||'Nenhum'}
NOTAS: ${notasCol||'Nenhuma'}
AVALIAÇÕES ANTERIORES: ${avsCol.length} avaliação(ões)${avsCol.length?' | Última média: '+avsCol[avsCol.length-1].mediaGeral:''}

Para cada ação: use emoji, bold no título, descreva o prazo e o motivo baseado nos dados. Seja específico para laboratório de qualidade (EMC/Telecom).`;
  try{
    const text = await callClaude([{role:'user',content:prompt}], 700);
    aiSugestoes=text.split('\n').filter(l=>l).map(l=>`<div class="ai-sug-item">${l.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/</g,'&lt;')}</div>`).join('');
    const wrap=document.getElementById('ai-sug-aval-wrap');
    if(wrap)wrap.innerHTML=`<div class="ai-suggestion-box"><div class="ai-sug-title">🤖 Sugestões de ações para ${c.nome.split(' ')[0]}</div>${aiSugestoes}</div>`;
  } catch(e){
    const wrap=document.getElementById('ai-sug-aval-wrap');
    if(wrap)wrap.innerHTML=`<div class="ai-suggestion-box"><div class="ai-sug-title">🤖 Sugestões</div><div class="ai-sug-item" style="color:var(--danger)">Erro ao conectar com a IA.</div></div>`;
  }
  if(btn){btn.disabled=false;btn.textContent='🤖 Gerar sugestões de IA'}
}
