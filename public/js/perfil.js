function verCol(id){
  const c=colaboradores.find(x=>x.id===id);if(!c)return;
  renderPerfilAba(id,'resumo');
}

function renderPerfilAba(id, aba){
  const c=colaboradores.find(x=>x.id===id);if(!c)return;
  const avsC=avaliacoes.filter(a=>a.colaboradorId===id);
  // Buscar funções do sistema de capacidade (funcoes_v4)
  const funcoesV4=ls('funcoes_v8',[]);
  const funcsCol=funcoesV4.filter(f=>(f.responsaveis||[]).find(r=>{
    const col=colaboradores.find(x=>x.id===id);
    return col&&(r.nome===col.nome);
  }));
  const _notasResumo=notas.filter(n=>n.colId===id);
  const p=c.perfil||{};

  const abas=[
    {id:'resumo',       label:'Resumo'},
    {id:'desenvolvimento', label:'Desenvolvimento'},
    {id:'avaliacoes',   label:'Avaliações'},
    {id:'funcoes_col',  label:'Funções'},
    {id:'historico',    label:'Histórico'},
    {id:'pessoal',      label:'Dados'},
  ];

  // Redirecionar abas antigas pra novas
  if(aba==='pdi_col'||aba==='metas_col'||aba==='okr_col') aba='desenvolvimento';
  if(aba==='notas_col'||aba==='compartilhar') aba='resumo';

  const ultimaAvalGlobal=avsC.length?avsC[avsC.length-1]:null;
  const _pdisCol=(typeof getPDIs==='function'?getPDIs():[]).filter(pp=>pp.colId===id);
  const _metasCol=metas.filter(m=>m.colId===id);
  const _pdiAtivo=_pdisCol.find(pp=>pp.status==='Em andamento');
  const _pdiPctVal=_pdiAtivo&&typeof pdiPct==='function'?pdiPct(_pdiAtivo):-1;

  // Header compacto com stats inline
  const headerHtml='<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">'
    +avLarge(c.nome)
    +'<div style="flex:1;min-width:0">'
      +'<div style="font-size:18px;font-weight:800;color:var(--txt)">'+c.nome+'</div>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">'+nivelBadge(c.nivel)+areaBadge(c.area)
        +(c.gestor?'<span style="font-size:10px;padding:2px 8px;border-radius:10px;background:var(--bg2);color:var(--txt3)">Gestor: '+c.gestor.split(' ')[0]+'</span>':'')
      +'</div>'
      +((p.email||p.celular)?'<div style="display:flex;gap:10px;margin-top:4px">'+(p.email?'<span style="font-size:11px;color:var(--txt3)">✉️ '+p.email+'</span>':'')+(p.celular?'<span style="font-size:11px;color:var(--txt3)">📱 '+p.celular+'</span>':'')+'</div>':'')
    +'</div>'
    +'<div style="display:flex;gap:6px;flex-shrink:0">'
      +(ultimaAvalGlobal?'<div style="background:var(--bg2);border-radius:8px;padding:6px 10px;text-align:center"><div style="font-size:16px;font-weight:800;color:var(--green)">'+ultimaAvalGlobal.mediaGeral+'</div><div style="font-size:9px;color:var(--txt3)">nota</div></div>':'')
      +(_metasCol.length?'<div style="background:var(--bg2);border-radius:8px;padding:6px 10px;text-align:center"><div style="font-size:16px;font-weight:800;color:var(--blue)">'+_metasCol.length+'</div><div style="font-size:9px;color:var(--txt3)">metas</div></div>':'')
      +(_pdiPctVal>=0?'<div style="background:var(--bg2);border-radius:8px;padding:6px 10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#854F0B">'+_pdiPctVal+'%</div><div style="font-size:9px;color:var(--txt3)">PDI</div></div>':'')
    +'</div>'
    +'<button class="btn btn-primary btn-sm" onclick="closeModal();setTimeout(()=>openColFormDirect(\''+id+'\'),100)" style="flex-shrink:0">✏️ Editar</button>'
  +'</div>';

  const tabsHtml=abas.map(a=>
    '<button onclick="renderPerfilAba(\''+id+'\',\''+a.id+'\')" '
    +'style="padding:7px 14px;border:none;background:'+(aba===a.id?'#E6EFEB':'transparent')+';'
    +'color:'+(aba===a.id?'#084231':'#6B7370')+';font-weight:'+(aba===a.id?'600':'400')+';'
    +'border-radius:5px;font-size:12.5px;cursor:pointer;font-family:\'Inter\',sans-serif;'
    +'white-space:nowrap;transition:all .12s">'
    +a.label
    +'</button>'
  ).join('');

  let conteudo='';

  // ── ABA RESUMO ──────────────────────────────────────────────
  if(aba==='resumo'){
    const ultimaAval=avsC.length?avsC[avsC.length-1]:null;
    const cargaFuncs=ls('funcoes_v8',null);
    const cargaP=cargaFuncs?calcCargaFuncao_pessoa(c.nome):null;

    conteudo=
      // Stats resumidos (header já mostra nome/avatar/badges)
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;margin-bottom:14px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800">'+avsC.length+'</div><div style="font-size:10px;color:var(--txt2)">Avaliações</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800">'+(c.historico||[]).length+'</div><div style="font-size:10px;color:var(--txt2)">Movimentações</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--blue)">'+metas.filter(function(m){return m.colId===id;}).length+'</div><div style="font-size:10px;color:var(--txt2)">Metas</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--green)">'+(ultimaAval?ultimaAval.mediaGeral:'-')+'</div><div style="font-size:10px;color:var(--txt2)">Última nota</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800">'+_notasResumo.length+'</div><div style="font-size:10px;color:var(--txt2)">Notas</div></div>'
      +'</div>'
      // Funções
      +(funcsCol.length>0?
        '<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Funções ('+funcsCol.length+')</div>'
        +'<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px">'
        +funcsCol.map(f=>{
          const col=colaboradores.find(x=>x.id===id);
          const resp=(f.responsaveis||[]).find(r=>col&&(r.nome===col.nome));
          const carga=calcCargaFuncao(f,qtdServicos)*(resp?resp.pct/100:1);
          const pctDed=resp?resp.pct:100;
          const c2=AREA_COLORS[f.area]||{cor:'#888',bg:'#eee'};
          return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg2);border-radius:8px;border-left:2px solid '+c2.cor+'">'
            +'<div style="flex:1;min-width:0">'
              +'<div style="font-size:12px;font-weight:600;color:var(--txt)">'+f.nome+'</div>'
              +'<div style="font-size:10px;color:var(--txt3)">'+f.area+' · '+pctDed+'% dedicação</div>'
            +'</div>'
            +'<div style="text-align:right;flex-shrink:0">'
              +'<div style="font-size:12px;font-weight:700;color:'+c2.cor+'">'+(carga/60).toFixed(1)+'h</div>'
              +'<div style="font-size:9px;color:var(--txt3)">/mês</div>'
            +'</div>'
          +'</div>';
        }).join('')+'</div>'
      :'')
      // Ações rápidas
      +'<div style="padding-top:12px;border-top:0.5px solid var(--border)">'
        +'<div style="font-size:10px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Ações rápidas</div>'
        +'<div style="display:flex;gap:6px;flex-wrap:wrap">'
          +'<button class="btn btn-sm" onclick="closeModal();setTimeout(()=>iniciarAvaliacaoPara(\''+id+'\'),100)" style="border-color:#0F6E56;color:#0F6E56">📊 Avaliar</button>'
          +'<button class="btn btn-sm" onclick="closeModal();setTimeout(()=>{criarPDI(\''+id+'\');go(\'pdi\');},100)" style="border-color:#185FA5;color:#185FA5">📈 Criar PDI</button>'
          +'<button class="btn btn-sm" onclick="quickAsk(\'Analise o perfil de '+c.nome.split(' ')[0]+' e sugira ações\');closeModal();go(\'agente\')" style="border-color:#534AB7;color:#534AB7">🤖 IA analisar</button>'
          +'<button class="btn btn-sm" onclick="abrirCompartilharSeletivo(\''+id+'\')" style="border-color:#854F0B;color:#854F0B">📧 Compartilhar</button>'
        +'</div>'
      +'</div>';
  }

  // ── ABA DADOS PESSOAIS ──────────────────────────────────────
  else if(aba==='pessoal'){
    // Token inclui: colId | tenantId | timestamp
    const _ltRawToken = squadoGetToken();
    const _ltTenant = _ltRawToken ? JSON.parse(atob(_ltRawToken.split('.')[1])).tenantId || '' : '';
    const linkToken = btoa(id + '|' + _ltTenant + '|' + Date.now());
    const linkUrl = 'https://squado.com.br/formulario?col=' + linkToken;
    conteudo=
      // Alerta de link de autopreenchimento
      '<div style="background:#F5F6F4;border:1px solid #E0E2E0;border-radius:8px;padding:14px;margin-bottom:16px">'
        +'<div style="font-size:12px;font-weight:600;color:#1A1F1D;margin-bottom:6px;display:flex;align-items:center;gap:6px">'+'<span style="background:#0F6E56;color:#fff;border-radius:4px;padding:2px 7px;font-size:10px;font-weight:700">LINK</span>'+' Autopreenchimento pelo colaborador</div>'
        +'<div style="font-size:11.5px;color:var(--txt2);margin-bottom:10px">Envie este link para o colaborador preencher os próprios dados (celular, endereço, formação, etc.)</div>'
        +'<div style="display:flex;gap:8px;flex-wrap:wrap">'
          +(p.email?
            '<a href="mailto:'+p.email+'?subject=Atualize+seu+perfil&body='+encodeURIComponent('Olá '+c.nome.split(' ')[0]+',\n\nPor favor acesse o link abaixo para atualizar seus dados cadastrais no sistema de gestão.\n\n👉 '+linkUrl+'\n\nEste link é pessoal e já vem com seus dados pré-identificados.\n\nAtt,\nEquipe de Gestão')+'" '
            +'style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:#185FA5;color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;font-family:\'Inter\',sans-serif">✉️ Email</a>'
          :'<span style="font-size:11px;color:var(--txt3)">⚠️ Cadastre o email para enviar</span>')
          +(p.celular?
            '<a href="https://wa.me/55'+p.celular.replace(/\D/g,'')+'?text='+encodeURIComponent('Olá '+c.nome.split(' ')[0]+', por favor acesse o link abaixo para atualizar seu perfil no sistema de gestão:\n\n'+linkUrl)+'" target="_blank" '
            +'style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:#25D366;color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;font-family:\'Inter\',sans-serif">📱 WhatsApp</a>'
          :'<span style="font-size:11px;color:var(--txt3)">⚠️ Cadastre o celular para WhatsApp</span>')
        +'</div>'
      +'</div>'
      // Formulário de dados pessoais
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
        +fg('Email', '<input id="p-email" value="'+(p.email||'')+'" placeholder="email@empresa.com" type="email"/>')
        +fg('Celular / WhatsApp', '<input id="p-celular" value="'+(p.celular||'')+'" placeholder="(51) 99999-9999"/>')
        +fg('Data de Nascimento', '<input id="p-nasc" type="date" value="'+(p.nascimento||'')+'"/>')
        +'<div class="field-group" style="grid-column:1/-1">'+flabel('Endereço completo')+'<input id="p-end" value="'+(p.endereco||'')+'" placeholder="Rua, número, bairro, cidade, CEP"/></div>'
        +'<div class="field-group" style="grid-column:1/-1">'+flabel('Formação Acadêmica')+'<textarea id="p-form" style="min-height:60px" placeholder="Ex: Técnico em Eletrônica – SENAI 2018&#10;Graduação em Engenharia Elétrica – PUCRS 2023">'+(p.formacao||'')+'</textarea></div>'
        +'<div class="field-group" style="grid-column:1/-1">'+flabel('Conhecimentos / Certificações Extras')+'<textarea id="p-conhec" style="min-height:80px" placeholder="Ex: Habilitado para ensaios de imunidade conduzida&#10;Curso de metrologia – INMETRO&#10;Inglês intermediário&#10;Python básico">'+(p.conhecimentos||'')+'</textarea></div>'
        +'<div class="field-group" style="grid-column:1/-1">'+flabel('Observações')+'<textarea id="p-obs" style="min-height:50px" placeholder="Informações adicionais...">'+(p.obs||'')+'</textarea></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;margin-top:14px;justify-content:flex-end">'
        +'<button class="btn btn-sm" onclick="renderPerfilAba(\''+id+'\',\'pessoal\')">Cancelar</button>'
        +'<button class="btn btn-primary btn-sm" onclick="salvarDadosPessoais(\''+id+'\')">💾 Salvar</button>'
      +'</div>';
  }

  // ── ABA MOVIMENTAÇÕES ───────────────────────────────────────
  else if(aba==='historico'){
    const hist=(c.historico||[]).slice().reverse();
    const tiposMovim=['Promoção','Treinamento','Advertência','Elogio','Aumento','Transferência de Área','Mudança de Cargo','Licença','Outro'];
    var dataAdm = c.dataAdmissao || (c.perfil && c.perfil.dataAdmissao) || '';
    conteudo=
      // Data de início (admissão)
      '<div style="background:var(--green-bg);border:1px solid #9FE1CB;border-radius:10px;padding:12px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px">'
        +'<span style="font-size:16px">📅</span>'
        +'<div style="flex:1">'
          +'<div style="font-size:11px;font-weight:600;color:#0F6E56">Data de início na empresa</div>'
          +'<input type="date" id="mov-admissao" value="'+dataAdm+'" onchange="salvarDataAdmissao(\''+id+'\',this.value)" style="font-size:13px;font-weight:600;border:none;background:transparent;color:#0F6E56;outline:none"/>'
        +'</div>'
        +(dataAdm?'<span style="font-size:11px;color:#0F6E56">'+Math.floor((new Date()-new Date(dataAdm))/(1000*60*60*24*365.25))+' anos</span>':'')
      +'</div>'
      // Formulário para nova movimentação
      +'<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:16px">'
        +'<div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:10px">➕ Registrar nova movimentação</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'
          +fg('Tipo', '<select id="mov-tipo">'
            +tiposMovim.map(t=>'<option>'+t+'</option>').join('')
          +'</select>')
          +fg('Data', '<input type="date" id="mov-data" value="'+new Date().toISOString().slice(0,10)+'"/>')
          +'<div class="field-group" style="grid-column:1/-1">'+flabel('Descrição')+'<input id="mov-desc" placeholder="Descreva a movimentação, ex: Promovido de Assistente I para Assistente II por desempenho acima da meta"/></div>'
        +'</div>'
        +'<button class="btn btn-primary btn-sm" onclick="salvarMovimentacao(\''+id+'\')">✅ Registrar</button>'
      +'</div>'
      // Lista de movimentações
      +(hist.length===0
        ?'<div style="text-align:center;padding:24px;color:var(--txt3)">Nenhuma movimentação registrada ainda.</div>'
        :'<div style="max-height:340px;overflow-y:auto">'
          +hist.map((h,i)=>{
            const tipoColors={
              'Promoção':'#3B6D11','Aumento':'#3B6D11','Elogio':'#1D9E75',
              'Treinamento':'#185FA5','Transferência de Área':'#534AB7','Mudança de Cargo':'#534AB7',
              'Advertência':'#A32D2D','Licença':'#854F0B','Outro':'#5F5E5A'
            };
            const cor=tipoColors[h.tipo]||'#888';
            const realIdx=(c.historico||[]).length-1-i;
            return '<div style="display:flex;gap:12px;margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--border)">'
              +'<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'
                +'<div style="width:32px;height:32px;border-radius:50%;background:'+(cor+'22')+';border:2px solid '+cor+';display:flex;align-items:center;justify-content:center;font-size:13px">'
                  +({'Promoção':'🌟','Treinamento':'🎓','Advertência':'⚠️','Elogio':'👏','Aumento':'💰','Transferência de Área':'🔄','Mudança de Cargo':'📋','Licença':'🏖️','Outro':'📌'}[h.tipo]||'📌')
                +'</div>'
                +(i<hist.length-1?'<div style="width:2px;flex:1;min-height:16px;background:var(--border);margin-top:4px"></div>':'')
              +'</div>'
              +'<div style="flex:1;min-width:0">'
                +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">'
                  +'<span style="font-size:10px;font-weight:700;padding:1px 8px;border-radius:20px;background:'+(cor+'22')+';color:'+cor+'">'+h.tipo+'</span>'
                  +'<span style="font-size:11px;color:var(--txt3)">'+h.data+'</span>'
                  +'<button class="btn btn-xs btn-danger" style="margin-left:auto" onclick="delMovimentacao(\''+id+'\','+realIdx+')">×</button>'
                +'</div>'
                +'<div style="font-size:13px;color:var(--txt);line-height:1.5">'+h.descricao+'</div>'
              +'</div>'
            +'</div>';
          }).join('')
        +'</div>'
      );
  }

  // ── ABA FUNÇÕES ──────────────────────────────────────────────
  else if(aba==='funcoes_col'){
    let funcoesV4=ls('funcoes_v8',null); if(!funcoesV4||!funcoesV4.length) funcoesV4=migrarFuncoes();
    // Funções em que este colaborador está como responsável
    const minhasFuncs=funcoesV4.filter(f=>(f.responsaveis||[]).find(r=>
      r.nome===c.nome||r.nome.toLowerCase()===c.nome.toLowerCase()
    ));
    // Todas as outras funções (para adicionar)
    const outrasFuncs=funcoesV4.filter(f=>!minhasFuncs.find(m=>m.id===f.id));
    // Agrupar por área
    const byArea={};
    minhasFuncs.forEach(f=>{if(!byArea[f.area])byArea[f.area]=[];byArea[f.area].push(f);});

    const funcCards=Object.entries(byArea).map(([area,funcs])=>{
      const c2=AREA_COLORS[area]||{cor:'#888',bg:'#eee'};
      return '<div style="margin-bottom:14px">'
        +'<div style="font-size:11px;font-weight:700;color:'+c2.cor+';text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;display:flex;align-items:center;gap:6px">'
          +'<span style="width:8px;height:8px;border-radius:50%;background:'+c2.cor+';display:inline-block"></span>'+area
        +'</div>'
        +funcs.map(f=>{
          const resp=(f.responsaveis||[]).find(r=>r.nome===c.nome);
          const pct=resp?resp.pct:100;
          const carga=calcCargaFuncao(f,qtdServicos)*(pct/100);
          return '<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg2);border-radius:9px;margin-bottom:6px;border:0.5px solid var(--border)">'
            +'<div style="flex:1;min-width:0">'
              +'<div style="font-size:13px;font-weight:600">'
                +'<span onclick="abrirFuncaoDeColaborador(\''+encodeURIComponent(f.id)+'\')" '
                  +'style="color:var(--blue);cursor:pointer;text-decoration:underline;text-underline-offset:2px" '
                  +'title="Editar esta função">'+f.nome+'</span>'
                +'<span onclick="abrirFuncaoDeColaborador(\''+encodeURIComponent(f.id)+'\')" '
                  +'style="font-size:9px;color:var(--blue);opacity:.6;margin-left:5px;cursor:pointer">↗</span>'
              +'</div>'
              +'<div style="font-size:10px;color:var(--txt3);margin-top:2px">'
                +(f.tipoTempo==='fixo_mes'?'⏱ fixo':'⚡ '+f.pctServicos+'% dos serviços')+' · '+f.tempoMin+'min'
              +'</div>'
            +'</div>'
            +'<div style="text-align:right;flex-shrink:0">'
              +'<div style="font-size:12px;font-weight:800;color:var(--green)">'+(carga/60).toFixed(1)+'h<span style="font-size:9px;font-weight:400;color:var(--txt3)">/mês</span></div>'
            +'</div>'
            +'<div style="display:flex;align-items:center;gap:6px;border-left:0.5px solid var(--border);padding-left:10px">'
              +'<span style="font-size:10px;color:var(--txt3)">Ded.</span>'
              +'<input type="number" min="1" max="100" id="ded-'+f.id+'" value="'+pct+'" data-funcid="'+f.id+'" data-colid="'+id+'" style="width:52px;text-align:center;font-size:12px;font-weight:700;border:0.5px solid var(--border2);border-radius:6px;padding:3px 6px;color:var(--green)" onchange="atualizarDedicacaoEl(this)"/>'
              +'<span style="font-size:10px;color:var(--txt3)">%</span>'
              +'<button class="btn btn-xs btn-primary" onclick="salvarDedicacaoInput(\''+f.id+'\',\''+id+'\')" title="Salvar">💾</button>'
              +'<button class="btn btn-xs btn-danger" data-colid="'+id+'" data-funcid="'+encodeURIComponent(f.id)+'" onclick="removerDeFuncao(this.dataset.colid,decodeURIComponent(this.dataset.funcid))" title="Remover desta função">×</button>'
            +'</div>'
          +'</div>';
        }).join('')
      +'</div>';
    }).join('');

    // Select para adicionar em nova função
    const addSelect=outrasFuncs.length?
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
        +'<select id="add-func-select" style="flex:1;min-width:180px">'
          +'<option value="">Selecionar função...</option>'
          +outrasFuncs.map(f=>'<option value="'+f.id+'">'+f.area+' → '+f.nome+'</option>').join('')
        +'</select>'
        +'<div style="display:flex;align-items:center;gap:6px">'
          +'<input type="number" id="add-func-pct" min="1" max="100" value="100" style="width:60px;text-align:center" placeholder="%"/>'
          +'<span style="font-size:11px;color:var(--txt3)">%</span>'
        +'</div>'
        +'<button class="btn btn-primary btn-sm" onclick="adicionarAFuncao(\''+id+'\')">+ Adicionar</button>'
      +'</div>'
      :'<div style="font-size:11px;color:var(--txt3)">Todas as funções já estão atribuídas.</div>';

    conteudo=
      // Stats rápidos
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:16px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center">'
          +'<div style="font-size:20px;font-weight:800;color:var(--blue)">'+minhasFuncs.length+'</div>'
          +'<div style="font-size:10px;color:var(--txt2)">Funções</div>'
        +'</div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center">'
          +'<div style="font-size:20px;font-weight:800;color:var(--green)">'
            +(minhasFuncs.reduce((acc,f)=>{
              const r=(f.responsaveis||[]).find(r=>r.nome===c.nome);
              return acc+calcCargaFuncao(f,qtdServicos)*(r?r.pct/100:1);
            },0)/60).toFixed(0)+'h'
          +'</div>'
          +'<div style="font-size:10px;color:var(--txt2)">Horas/mês</div>'
        +'</div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center">'
          +'<div style="font-size:20px;font-weight:800;color:var(--amber)">'
            +[...new Set(minhasFuncs.map(f=>f.area))].length
          +'</div>'
          +'<div style="font-size:10px;color:var(--txt2)">Áreas</div>'
        +'</div>'
      +'</div>'
      // Funções atuais
      +(minhasFuncs.length?funcCards:'<div style="text-align:center;padding:20px;color:var(--txt3)">Nenhuma função atribuída ainda.</div>')
      // Adicionar função
      +'<div style="border-top:0.5px solid var(--border);padding-top:14px;margin-top:6px">'
        +'<div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:8px">➕ Atribuir nova função</div>'
        +addSelect
      +'</div>'
      ;
  }


  // ── ABA PDI ──────────────────────────────────────────────────
  else if(aba==='pdi_col'){
    var pdisCol=getPDIs().filter(function(p){return p.colId===id;}).sort(function(a,b){return(b.dataCriacao||'').localeCompare(a.dataCriacao||'');});
    var ativo=pdisCol.find(function(p){return p.status==='Em andamento';})||pdisCol[0];
    var pct=ativo?Math.round((ativo.acoes||[]).reduce(function(a,ac){return a+(ac.progresso||0);},0)/Math.max((ativo.acoes||[]).length,1)):0;
    var corP=pct>=80?'var(--green)':pct>=50?'#854F0B':'var(--blue)';
    conteudo=
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:16px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--blue)">'+pdisCol.length+'</div><div style="font-size:10px;color:var(--txt2)">PDIs</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--green)">'+(ativo?(ativo.acoes||[]).length:0)+'</div><div style="font-size:10px;color:var(--txt2)">Ações ativas</div></div>'
        +'<div style="background:'+(ativo?'var(--green-bg)':'var(--bg2)')+';border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:'+corP+'">'+pct+'%</div><div style="font-size:10px;color:var(--txt2)">Progresso</div></div>'
      +'</div>'
      +(ativo
        ?'<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:12px">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
            +'<div style="font-size:13px;font-weight:700">'+(ativo.ciclo||ativo.objetivo||'PDI Ativo')+'</div>'
            +'<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:var(--green-bg);color:var(--green2)">'+ativo.status+'</span>'
          +'</div>'
          +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
            +'<div style="flex:1;height:6px;background:var(--bg3);border-radius:3px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+corP+';border-radius:3px"></div></div>'
            +'<span style="font-size:12px;font-weight:800;color:'+corP+'">'+pct+'%</span>'
          +'</div>'
          +(ativo.acoes||[]).slice(0,4).map(function(a){
            return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">'
              +'<span>'+(a.status==='Concluída'?'✅':a.status==='Em andamento'?'🔵':'⭕')+'</span>'
              +'<span style="font-size:11px;color:var(--txt);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+a.descricao+'</span>'
              +'<span style="font-size:10px;font-weight:700;color:var(--txt3)">'+a.progresso+'%</span>'
            +'</div>';
          }).join('')
          +((ativo.acoes||[]).length>4?'<div style="font-size:10px;color:var(--txt3)">+ '+((ativo.acoes||[]).length-4)+' ações</div>':'')
        +'</div>'
        :'<div style="text-align:center;padding:20px;color:var(--txt3)">Nenhum PDI ativo.</div>')
      +'<div style="display:flex;gap:8px">'
        +'<button class="btn btn-primary btn-sm" data-col="'+id+'" onclick="abrirPDI(this.dataset.col)">🚀 '+(ativo?'Abrir PDI':'Criar PDI')+'</button>'
        +(ativo?'<button class="btn btn-xs" data-col="'+id+'" onclick="abrirPDI(this.dataset.col)">✏️ Editar</button>':'')
        +(ativo?'<button class="btn btn-xs btn-danger" onclick="if(confirm(\'Excluir este PDI?\')){var pdis=getPDIs();var idx=pdis.findIndex(function(p){return p.colId===\''+id+'\'&&p.status===\'Em andamento\'});if(idx>=0){pdis.splice(idx,1);lss(\'pdis_v3\',pdis);saveAll();renderPerfilAba(\''+id+'\',\'pdi_col\');toast(\'PDI excluído!\')}}">×</button>':'')
      +'</div>';
  }

  // ── ABA AVALIAÇÕES ──────────────────────────────────────────
  else if(aba==='avaliacoes'){
    conteudo=
      (avsC.length===0
        ?'<div style="text-align:center;padding:30px;color:var(--txt3)">Nenhuma avaliação ainda.<br><button class="btn btn-primary btn-sm" style="margin-top:12px" onclick="iniciarAvaliacaoPara(\''+id+'\');closeModal()">📋 Fazer primeira avaliação</button></div>'
        :'<div style="max-height:400px;overflow-y:auto">'
          +[...avsC].reverse().map(a=>{
            function sc(v){return v>=8?'#0F6E56':v>=5?'#854F0B':'#A32D2D';}
            const secoes=Object.entries(a.secaoMedias||{});
            return '<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:10px">'
              +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">'
                +'<div style="flex:1"><div style="font-size:12.5px;font-weight:600">'+a.data+(a.avaliador?' · '+a.avaliador:'')+'</div>'
                +nivelBadge(a.nivel)+'</div>'
                +'<div style="font-size:28px;font-weight:900;color:'+sc(a.mediaGeral)+'">'+a.mediaGeral+'</div>'
                +'<div style="display:flex;gap:6px">'
                  +'<button class="btn btn-xs" onclick="closeModal();setTimeout(function(){verAvaliacao(\''+a.id+'\')},150)">📄 PDF</button>'
                +'</div>'
              +'</div>'
              +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">'
                +secoes.map(sv=>'<div style="display:flex;align-items:center;gap:6px"><span style="font-size:10px;color:var(--txt2);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+sv[0]+'</span>'
                  +'<div style="width:60px;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden"><div style="height:100%;width:'+(sv[1]*10)+'%;background:'+sc(sv[1])+'"></div></div>'
                  +'<span style="font-size:11px;font-weight:700;color:'+sc(sv[1])+'">'+sv[1]+'</span></div>'
                ).join('')
              +'</div>'
            +'</div>';
          }).join('')
        +'</div>'
      )
      +'<div style="margin-top:12px;padding-top:12px;border-top:0.5px solid var(--border);display:flex;gap:8px">'
        +'<button class="btn btn-primary btn-sm" onclick="iniciarAvaliacaoPara(\''+id+'\');closeModal()">📋 Nova avaliação</button>'
      +'</div>';
  }

  // ── ABA METAS ─────────────────────────────────────────────────
  else if(aba==='metas_col'){
    var smartCol=metas.filter(function(m){return m.tipo==='smart'&&m.colId===id;});
    var totalMetas=smartCol.length;
    var concluidas=smartCol.filter(function(m){return m.status==='Concluída'||m.progresso>=100;}).length;
    var pctGeral=totalMetas?Math.round(smartCol.reduce(function(a,m){return a+(m.progresso||0);},0)/totalMetas):0;

    function miniCardSmart(m){
      var p=m.progresso||0;var cor=p>=100?'var(--green)':p>=60?'#854F0B':'#185FA5';
      var stBg={Pendente:'#FAEEDA','Em andamento':'#E6F1FB','Concluída':'#E1F5EE','No prazo':'#E1F5EE','Em risco':'#FAEEDA','Atrasada':'#FCEBEB'}[m.status]||'var(--bg3)';
      var stCor={Pendente:'#854F0B','Em andamento':'#185FA5','Concluída':'#0F6E56','No prazo':'#0F6E56','Em risco':'#854F0B','Atrasada':'#A32D2D'}[m.status]||'var(--txt3)';
      return '<div style="background:var(--bg2);border-radius:9px;padding:12px;margin-bottom:8px;border-left:3px solid '+cor+'">'
        +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
          +'<div style="flex:1"><div style="font-size:12px;font-weight:700;color:var(--txt)">'+m.titulo+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+(m.prazo?'Prazo: '+m.prazo:'Sem prazo')+' · <span style="color:'+stCor+'">'+(m.status||'Pendente')+'</span></div></div>'
          +'<span style="font-size:14px;font-weight:800;color:'+cor+'">'+p+'%</span>'
        +'</div>'
        +'<div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden;margin-bottom:6px"><div style="height:100%;width:'+Math.min(p,100)+'%;background:'+cor+';border-radius:2px"></div></div>'
        +'<div style="display:flex;gap:4px">'
          +'<button class="btn btn-xs" onclick="closeModal();setTimeout(function(){openMetaForm(\''+m.id+'\')},150)" style="font-size:10px">✏️ Editar</button>'
          +'<button class="btn btn-xs btn-danger" onclick="if(confirm(\'Excluir?\')){delMeta(\''+m.id+'\');renderPerfilAba(\''+id+'\',\'metas_col\')}" style="font-size:10px">×</button>'
        +'</div>'
      +'</div>';
    }

    conteudo=
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:14px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--blue)">'+totalMetas+'</div><div style="font-size:10px;color:var(--txt2)">Metas</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--green)">'+concluidas+'</div><div style="font-size:10px;color:var(--txt2)">Concluídas</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:#854F0B">'+pctGeral+'%</div><div style="font-size:10px;color:var(--txt2)">Progresso</div></div>'
      +'</div>'
      +(smartCol.length?'<div style="max-height:300px;overflow-y:auto;margin-bottom:14px">'+smartCol.map(miniCardSmart).join('')+'</div>'
        :'<div style="text-align:center;padding:30px;color:var(--txt3)">Nenhuma meta atribuída.</div>')
      +'<div style="display:flex;gap:8px;padding-top:12px;border-top:0.5px solid var(--border)">'
        +'<button class="btn btn-purple btn-sm" onclick="closeModal();setTimeout(function(){openMetaFormCol(\''+id+'\')},150)">✅ + Nova Meta</button>'
      +'</div>';
  }

  // ── ABA NOTAS ─────────────────────────────────────────────────
  else if(aba==='notas_col'){
    var notasCol=notas.filter(function(n){return n.colId===id;});
    notasCol.sort(function(a,b){return (b.dataHora||b.data||'').localeCompare(a.dataHora||a.data||'');});

    var sentColors={positivo:'#0F6E56',neutro:'#854F0B',negativo:'#A32D2D',alerta:'#993C1D'};
    var sentIcons={positivo:'🟢',neutro:'🟡',negativo:'🔴',alerta:'🟠'};

    function notaCard(n,idx){
      var sc=sentColors[n.sentimento]||'var(--txt3)';
      var si=sentIcons[n.sentimento]||'⚪';
      return '<div style="background:var(--bg2);border-radius:8px;padding:10px 12px;margin-bottom:6px;border-left:3px solid '+sc+'">'
        +'<div style="display:flex;align-items:flex-start;gap:8px">'
          +'<span style="font-size:12px">'+si+'</span>'
          +'<div style="flex:1;min-width:0">'
            +'<div style="font-size:12px;color:var(--txt);line-height:1.5">'+n.texto+'</div>'
            +'<div style="font-size:10px;color:var(--txt3);margin-top:4px">'+(n.categoria?n.categoria+' · ':'')+( n.dataExib||n.data||'')+'</div>'
          +'</div>'
          +'<button class="btn btn-xs btn-danger" onclick="if(confirm(\'Excluir nota?\')){notas.splice(notas.indexOf(notas.filter(function(x){return x.colId===\''+id+'\'}).sort(function(a,b){return(b.dataHora||b.data||\'\').localeCompare(a.dataHora||a.data||\'\')})['+idx+']),1);saveAll();renderPerfilAba(\''+id+'\',\'notas_col\')}" style="font-size:9px;padding:1px 4px">×</button>'
        +'</div>'
      +'</div>';
    }

    conteudo=
      '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--blue)">'+notasCol.length+'</div><div style="font-size:10px;color:var(--txt2)">Anotações</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--green)">'+notasCol.filter(function(n){return n.sentimento==='positivo';}).length+'</div><div style="font-size:10px;color:var(--txt2)">Positivas</div></div>'
      +'</div>'
      // Criar nota
      +'<div style="background:var(--bg2);border-radius:10px;padding:12px;margin-bottom:14px">'
        +'<textarea id="perfil-nota-texto" placeholder="Escreva uma anotação sobre '+c.nome.split(' ')[0]+'..." style="width:100%;min-height:60px;font-size:12px;border:1px solid var(--border);border-radius:6px;padding:8px;resize:vertical;font-family:inherit"></textarea>'
        +'<div style="display:flex;gap:6px;margin-top:6px;align-items:center">'
          +'<select id="perfil-nota-sent" style="font-size:11px;padding:3px 6px;border-radius:4px;border:1px solid var(--border)">'
            +'<option value="neutro">🟡 Neutro</option><option value="positivo">🟢 Positivo</option><option value="negativo">🔴 Negativo</option><option value="alerta">🟠 Alerta</option>'
          +'</select>'
          +'<select id="perfil-nota-cat" style="font-size:11px;padding:3px 6px;border-radius:4px;border:1px solid var(--border)">'
            +'<option value="Observação">Observação</option><option value="Desempenho">Desempenho</option><option value="Comportamento">Comportamento</option><option value="Feedback">Feedback</option><option value="1:1">1:1</option>'
          +'</select>'
          +'<div style="flex:1"></div>'
          +'<button class="btn btn-primary btn-xs" onclick="_salvarNotaPerfil(\''+id+'\')">💾 Salvar nota</button>'
        +'</div>'
      +'</div>'
      +(notasCol.length===0?'<div style="text-align:center;padding:20px;color:var(--txt3)">Nenhuma anotação.</div>':'')
      +'<div style="max-height:300px;overflow-y:auto">'+notasCol.map(notaCard).join('')+'</div>'
      +'<div style="display:flex;gap:8px;padding-top:12px;border-top:0.5px solid var(--border);margin-top:12px">'
      +'</div>';
  }

  // ── ABA OKR ────────────────────────────────────────────────────
  else if(aba==='okr_col'){
    var okrsArea=metas.filter(function(m){return m.tipo==='okr'&&m.area===c.area;});
    var totalOkrs=okrsArea.length;
    var totalKrs=okrsArea.reduce(function(a,o){return a+(o.keyResults||[]).length;},0);
    function okrPctCalc(okr){var krs=okr.keyResults||[];if(!krs.length)return 0;return Math.round(krs.reduce(function(a,kr){var al=parseFloat(kr.alvo)||1;var at=parseFloat(kr.atual)||0;return a+Math.min(100,Math.round(at/al*100));},0)/krs.length);}
    var pctMed=totalOkrs?Math.round(okrsArea.reduce(function(a,o){return a+okrPctCalc(o);},0)/totalOkrs):0;

    function miniOkrCard(o){
      var krs=o.keyResults||[];var pct=okrPctCalc(o);
      var cor=pct>=80?'var(--green)':pct>=50?'#854F0B':'#A32D2D';
      return '<div style="background:var(--bg2);border-radius:9px;padding:12px;margin-bottom:8px;border-left:3px solid '+cor+'">'
        +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
          +'<span style="font-size:14px">🎯</span>'
          +'<div style="flex:1"><div style="font-size:12px;font-weight:700;color:var(--txt)">'+o.objetivo+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+krs.length+' KRs'+(o.periodo?' · '+o.periodo:'')+'</div></div>'
          +'<span style="font-size:14px;font-weight:800;color:'+cor+'">'+pct+'%</span>'
        +'</div>'
        +'<div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden;margin-bottom:6px"><div style="height:100%;width:'+pct+'%;background:'+cor+'"></div></div>'
        +krs.map(function(kr,i){var ka=parseFloat(kr.alvo)||1;var kc=parseFloat(kr.atual)||0;var kp=Math.min(100,Math.round(kc/ka*100));var done=kp>=100;
          return '<div style="display:flex;align-items:center;gap:6px;font-size:11px;margin-bottom:2px"><span style="color:'+(done?'var(--green)':'var(--txt3)')+'">'+( done?'✅':'⭕')+'</span><span style="flex:1;color:var(--txt)">'+kr.titulo+'</span><span style="color:var(--txt2)">'+kc+'/'+ka+'</span></div>';
        }).join('')
        +'<div style="display:flex;gap:4px;margin-top:6px">'
          +'<button class="btn btn-xs" onclick="closeModal();setTimeout(function(){openOKRForm(\''+o.id+'\')},150)" style="font-size:10px">✏️ Editar</button>'
          +'<button class="btn btn-xs btn-primary" onclick="closeModal();setTimeout(function(){editarKRs(\''+o.id+'\')},150)" style="font-size:10px">📊 KRs</button>'
        +'</div>'
      +'</div>';
    }

    var c2=AREA_COLORS[c.area]||{cor:'#888',bg:'#eee'};
    conteudo=
      '<div style="background:'+c2.bg+';border-radius:8px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:16px;font-weight:800;color:'+c2.cor+'">'+( c.area||'Sem área')+'</span>'
        +'<span style="font-size:11px;color:var(--txt2)">OKRs da área de '+c.nome.split(' ')[0]+'</span>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-bottom:14px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--blue)">'+totalOkrs+'</div><div style="font-size:10px;color:var(--txt2)">OKRs</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800">'+totalKrs+'</div><div style="font-size:10px;color:var(--txt2)">Key Results</div></div>'
        +'<div style="background:var(--bg2);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:'+(pctMed>=70?'var(--green)':'#854F0B')+'">'+pctMed+'%</div><div style="font-size:10px;color:var(--txt2)">Progresso</div></div>'
      +'</div>'
      +(okrsArea.length?'<div style="max-height:300px;overflow-y:auto">'+okrsArea.map(miniOkrCard).join('')+'</div>'
        :'<div style="text-align:center;padding:30px;color:var(--txt3)">Nenhum OKR definido para a área '+(c.area||'')+'.</div>')
      +'<div style="display:flex;gap:8px;padding-top:12px;border-top:0.5px solid var(--border);margin-top:12px">'
        +'<button class="btn btn-primary btn-sm" onclick="closeModal();setTimeout(function(){openOKRFormArea(\''+(c.area||'')+'\')},150)">🎯 + Novo OKR</button>'
      +'</div>';
  }

  // ── ABA COMPARTILHAR ───────────────────────────────────────────
  else if(aba==='compartilhar'){
    var emailCol = p.email || '';
    var smartCount = metas.filter(function(m){return m.tipo==='smart'&&m.colId===id;}).length;
    var okrCount = metas.filter(function(m){return m.tipo==='okr'&&m.area===c.area;}).length;
    var pdisCount = (typeof getPDIs==='function'?getPDIs():[]).filter(function(pd){return pd.colId===id;}).length;
    var notasCount = notas.filter(function(n){return n.colId===id;}).length;
    var histCount = (c.historico||[]).length;
    var funcsCount = (ls('funcoes_v8',null)||[]).filter(function(f){return(f.responsaveis||[]).some(function(r){return r.nome===c.nome;});}).length;

    function chkItem(chkId, icon, label, count, extra){
      var disabled = count === 0;
      return '<label style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg2);border-radius:8px;cursor:'+(disabled?'not-allowed':'pointer')+';opacity:'+(disabled?'0.5':'1')+'">'
        +'<input type="checkbox" id="share-'+chkId+'" '+(disabled?'disabled':'')+' style="width:16px;height:16px;accent-color:#1D9E75;cursor:pointer"/>'
        +'<span style="font-size:16px">'+icon+'</span>'
        +'<div style="flex:1">'
          +'<div style="font-size:13px;font-weight:600;color:var(--txt)">'+label+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+count+' registro'+(count!==1?'s':'')+'</div>'
        +'</div>'
        +(extra||'')
      +'</label>';
    }

    // Notas com seletor de período
    var notasExtra = '<select id="share-notas-periodo" style="font-size:10px;padding:2px 6px;border-radius:4px;border:1px solid var(--border);color:var(--txt2)">'
      +'<option value="semanal">Semanal</option>'
      +'<option value="mensal">Mensal</option>'
      +'<option value="trimestral">Trimestral</option>'
      +'<option value="semestral">Semestral</option>'
    +'</select>';

    conteudo =
      '<div style="text-align:center;margin-bottom:16px">'
        +'<div style="font-size:16px;font-weight:700;color:var(--txt)">📧 Compartilhar informações com '+c.nome.split(' ')[0]+'</div>'
        +'<div style="font-size:12px;color:var(--txt3);margin-top:4px">Selecione o que deseja enviar por email</div>'
      +'</div>'
      // Email destino
      +'<div style="background:var(--bg2);border-radius:8px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:14px">✉️</span>'
        +'<div style="flex:1">'
          +'<div style="font-size:11px;color:var(--txt3)">Enviar para</div>'
          +'<input id="share-email" value="'+emailCol+'" placeholder="email@exemplo.com" style="font-size:13px;font-weight:600;border:none;background:transparent;width:100%;color:var(--txt);outline:none"/>'
        +'</div>'
      +'</div>'
      // Checkboxes
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">'
        +chkItem('funcoes','📌','Funções',funcsCount)
        +chkItem('avaliacoes','📊','Avaliações',avsC.length)
        +chkItem('metas','✅','Metas SMART',smartCount)
        +chkItem('pdi','🚀','PDI',pdisCount)
        +chkItem('okr','🎯','OKR da área',okrCount)
        +chkItem('notas','📝','Notas',notasCount,notasExtra)
        +chkItem('movimentacoes','🕐','Movimentações',histCount)
      +'</div>'
      // Selecionar tudo
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">'
        +'<label style="font-size:11px;color:var(--txt2);cursor:pointer;display:flex;align-items:center;gap:4px">'
          +'<input type="checkbox" id="share-all" onchange="document.querySelectorAll(\'[id^=share-]:not(#share-all):not(#share-email):not(#share-notas-periodo)\').forEach(function(c){if(!c.disabled)c.checked=this.checked}.bind(this))" style="accent-color:#1D9E75"/> Selecionar tudo'
        +'</label>'
      +'</div>'
      // Botão enviar
      +'<div style="display:flex;gap:8px;justify-content:flex-end;padding-top:14px;border-top:0.5px solid var(--border)">'
        +'<button class="btn btn-sm" onclick="renderPerfilAba(\''+id+'\',\'resumo\')">Voltar</button>'
        +'<button class="btn btn-primary" onclick="enviarCompartilhar(\''+id+'\')" style="padding:8px 24px">📧 Abrir no email</button>'
      +'</div>';
  }

  // ── ABA DESENVOLVIMENTO (PDI + Metas + OKR unificados) ────
  else if(aba==='desenvolvimento'){
    var _subTab=window._devSubTab||'pdi';
    var subTabs='<div style="display:flex;gap:4px;margin-bottom:14px">'
      +'<button onclick="window._devSubTab=\'pdi\';renderPerfilAba(\''+id+'\',\'desenvolvimento\')" class="btn btn-sm" style="'+(_subTab==='pdi'?'background:var(--green);color:#fff;border-color:var(--green)':'')+'">📈 PDI</button>'
      +'<button onclick="window._devSubTab=\'metas\';renderPerfilAba(\''+id+'\',\'desenvolvimento\')" class="btn btn-sm" style="'+(_subTab==='metas'?'background:var(--blue);color:#fff;border-color:var(--blue)':'')+'">🎯 Metas</button>'
      +'<button onclick="window._devSubTab=\'okr\';renderPerfilAba(\''+id+'\',\'desenvolvimento\')" class="btn btn-sm" style="'+(_subTab==='okr'?'background:#534AB7;color:#fff;border-color:#534AB7':'')+'">📊 OKR</button>'
      +'<button onclick="window._devSubTab=\'notas\';renderPerfilAba(\''+id+'\',\'desenvolvimento\')" class="btn btn-sm" style="'+(_subTab==='notas'?'background:#854F0B;color:#fff;border-color:#854F0B':'')+'">📝 Notas</button>'
    +'</div>';

    var devContent='';
    if(_subTab==='pdi'){
      var pdisC=(typeof getPDIs==='function'?getPDIs():[]).filter(pp=>pp.colId===id);
      if(pdisC.length===0){
        devContent='<div style="text-align:center;padding:24px;color:var(--txt3)"><div style="font-size:32px;margin-bottom:8px">📈</div><div style="font-size:13px;margin-bottom:12px">Nenhum PDI criado ainda</div><button class="btn btn-primary btn-sm" onclick="closeModal();setTimeout(()=>{criarPDI(\''+id+'\');go(\'pdi\');},100)">Criar PDI</button></div>';
      } else {
        devContent=pdisC.map(pp=>{
          var pct=typeof pdiPct==='function'?pdiPct(pp):0;
          var cor=pct>=80?'var(--green)':pct>=50?'#854F0B':'var(--blue)';
          return '<div style="background:var(--bg2);border-radius:8px;padding:12px;margin-bottom:8px">'
            +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-size:13px;font-weight:700">'+(pp.ciclo||'PDI')+'</span><span style="font-size:14px;font-weight:800;color:'+cor+'">'+pct+'%</span></div>'
            +'<div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+cor+'"></div></div>'
            +'<div style="font-size:10px;color:var(--txt3);margin-top:4px">Status: '+(pp.status||'Em andamento')+'</div>'
          +'</div>';
        }).join('');
      }
    } else if(_subTab==='metas'){
      var metasC=metas.filter(m=>m.colId===id);
      if(metasC.length===0){
        devContent='<div style="text-align:center;padding:24px;color:var(--txt3)"><div style="font-size:32px;margin-bottom:8px">🎯</div><div style="font-size:13px;margin-bottom:12px">Nenhuma meta criada</div><button class="btn btn-primary btn-sm" onclick="closeModal();openMetaFormCol(\''+id+'\')">Criar Meta</button></div>';
      } else {
        devContent=metasC.map(m=>{
          var cor=(m.progresso||0)>=80?'var(--green)':(m.progresso||0)>=50?'#854F0B':'var(--blue)';
          return '<div style="background:var(--bg2);border-radius:8px;padding:10px;margin-bottom:6px">'
            +'<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:600">'+(m.titulo||m.objetivo||'Meta')+'</span><span style="font-size:12px;font-weight:700;color:'+cor+'">'+(m.progresso||0)+'%</span></div>'
            +'<div style="font-size:10px;color:var(--txt3);margin-top:2px">'+(m.status||'Em andamento')+(m.prazo?' · Prazo: '+m.prazo:'')+'</div>'
          +'</div>';
        }).join('');
      }
    } else if(_subTab==='okr'){
      var okrsC=okrs.filter(o=>(o.area||'')===(c.area||''));
      devContent=okrsC.length?okrsC.map(o=>{
        var pct=typeof okrPct==='function'?okrPct(o):0;
        return '<div style="background:var(--bg2);border-radius:8px;padding:10px;margin-bottom:6px">'
          +'<div style="display:flex;justify-content:space-between"><span style="font-size:12px;font-weight:600">'+(o.objetivo||'OKR')+'</span><span style="font-size:12px;font-weight:700;color:#534AB7">'+pct+'%</span></div>'
        +'</div>';
      }).join(''):'<div style="text-align:center;padding:24px;color:var(--txt3)">Nenhum OKR na área '+c.area+'</div>';
    } else {
      var notasC=notas.filter(n=>n.colId===id);
      devContent=notasC.length?notasC.slice(0,10).map(n=>{
        return '<div style="background:var(--bg2);border-radius:8px;padding:10px;margin-bottom:6px">'
          +'<div style="font-size:12px;color:var(--txt)">'+esc(n.texto||'')+'</div>'
          +'<div style="font-size:10px;color:var(--txt3);margin-top:4px">'+(n.categoria||'')+(n.data?' · '+n.data:'')+'</div>'
        +'</div>';
      }).join(''):'<div style="text-align:center;padding:24px;color:var(--txt3)">Nenhuma nota registrada</div>';
    }
    conteudo=subTabs+devContent;
  }

  // Montar modal completo
  document.getElementById('modal-title').textContent='';
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    // Header compacto
    headerHtml
    // Tabs
    +'<div style="display:flex;gap:4px;padding:4px;background:#F5F6F4;border-radius:7px;margin-bottom:14px;overflow-x:auto;-webkit-overflow-scrolling:touch">'+tabsHtml+'</div>'
    // Conteúdo
    +conteudo;
  document.getElementById('modal').style.display='flex';
}

// Helpers de UI
function avLarge(nome){
  return '<div style="width:56px;height:56px;border-radius:10px;background:'+avColor(nome)+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;flex-shrink:0">'+initials(nome)+'</div>';
}
function fg(label, input){
  return '<div class="field-group">'+flabel(label)+input+'</div>';
}
function flabel(label){
  return '<div class="field-label">'+label+'</div>';
}
function calcCargaFuncao_pessoa(nome){
  try{
    const funcoesV2=ls('funcoes_v8',[]);
    let total=0;
    funcoesV2.forEach(f=>{
      (f.responsaveis||[]).forEach(r=>{
        if(r.nome===nome){
          total+=calcCargaFuncao(f,qtdServicos)*(r.pct/100);
        }
      });
    });
    return total;
  }catch(e){return 0;}
}

// ─── Salvar dados pessoais ────────────────────────────────────
function salvarDadosPessoais(id){
  const i=colaboradores.findIndex(x=>x.id===id);if(i<0)return;
  colaboradores[i].perfil=Object.assign(colaboradores[i].perfil||{},{
    email:    ((document.getElementById('p-email')||{}).value||'').trim()||'',
    celular:  ((document.getElementById('p-celular')||{}).value||'').trim()||'',
    nascimento:(document.getElementById('p-nasc')||{}).value||'',
    endereco: ((document.getElementById('p-end')||{}).value||'').trim()||'',
    formacao: ((document.getElementById('p-form')||{}).value||'').trim()||'',
    conhecimentos:((document.getElementById('p-conhec')||{}).value||'').trim()||'',
    obs:      ((document.getElementById('p-obs')||{}).value||'').trim()||'',
  });
  saveAll();
  toast('Dados pessoais salvos! ✓');
  renderPerfilAba(id,'pessoal');
}

// ─── Movimentações ────────────────────────────────────────────
function salvarMovimentacao(id){
  const tipo=(document.getElementById('mov-tipo')||{}).value;
  const data=(document.getElementById('mov-data')||{}).value;
  const desc=((document.getElementById('mov-desc')||{}).value||'');
  if(!desc){alert('Informe uma descrição.');return;}
  const i=colaboradores.findIndex(x=>x.id===id);if(i<0)return;
  if(!colaboradores[i].historico)colaboradores[i].historico=[];
  colaboradores[i].historico.push({data,tipo,descricao:desc});
  saveAll();toast('Movimentação registrada!');
  renderPerfilAba(id,'historico');
}

function delMovimentacao(id,idx){
  if(!confirm('Excluir esta movimentação?'))return;
  const i=colaboradores.findIndex(x=>x.id===id);if(i<0)return;
  colaboradores[i].historico.splice(idx,1);
  saveAll();toast('Removida!');
  renderPerfilAba(id,'historico');
}

// ─── Formulário do gestor (novo/editar) ──────────────────────
function openColFormDirect(id){const c=colaboradores.find(x=>x.id===id);if(!c)return;_showColForm(id,c);}
function openColForm(id=null){const c=id?colaboradores.find(x=>x.id===id):{};_showColForm(id,c||{});}

function _showColForm(id,c){
  var isEdit = !!id;
  window._wizardStep = 1;
  window._wizardData = {
    nome: c.nome||'', email: (c.perfil||{}).email||'', celular: (c.perfil||{}).celular||'',
    nascimento: (c.perfil||{}).nascimento||'', admissao: (c.perfil||{}).admissao||'',
    nivel: c.nivel||'', area: c.area||'', cargo: (c.perfil||{}).cargo||'',
    status: c.status||'Ativo', gestor: c.gestor||'',
    funcoes: [], id: id||''
  };
  _renderWizardStep(isEdit);
}

function _renderWizardStep(isEdit){
  var d = window._wizardData;
  var step = window._wizardStep;
  var nivelOpts=niveis.sort((a,b)=>a.ordem-b.ordem).map(n=>'<option value="'+n.nome+'"'+(d.nivel===n.nome?' selected':'')+'>'+n.nome+'</option>').join('');
  var areaOpts=Object.keys(AREA_COLORS).map(a=>'<option value="'+a+'"'+(d.area===a?' selected':'')+'>'+a+'</option>').join('');
  var gestorOpts=colaboradores.filter(x=>!d.id||x.id!==d.id).map(x=>'<option value="'+x.nome+'"'+(d.gestor===x.nome?' selected':'')+'>'+x.nome+'</option>').join('');

  document.getElementById('modal-title').textContent=(isEdit?'Editar':'Novo')+' Colaborador';
  document.getElementById('modal-box').classList.remove('modal-lg');

  // Barra de progresso
  var steps=['Dados básicos','Cargo e área','Funções','Revisão'];
  var progHtml='<div style="display:flex;gap:4px;margin-bottom:18px">';
  steps.forEach(function(s,i){
    var active=i+1===step;var done=i+1<step;
    progHtml+='<div style="flex:1;text-align:center">'
      +'<div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;margin:0 auto 4px;font-size:12px;font-weight:700;'
        +(done?'background:#0F6E56;color:#fff':active?'background:#0F6E56;color:#fff':'background:var(--bg2);color:var(--txt3)')
      +'">'+(done?'✓':(i+1))+'</div>'
      +'<div style="font-size:10px;color:'+(active?'#0F6E56':'var(--txt3)')+'">'+s+'</div>'
    +'</div>';
  });
  progHtml+='</div>';

  var content='';

  if(step===1){
    content='<div class="form-grid">'
      +'<div class="field-group form-full"><div class="field-label">Nome completo *</div><input id="wz-nome" value="'+esc(d.nome)+'" placeholder="Nome completo do colaborador"/></div>'
      +'<div class="field-group"><div class="field-label">Email</div><input id="wz-email" type="email" value="'+esc(d.email)+'" placeholder="email@empresa.com"/></div>'
      +'<div class="field-group"><div class="field-label">Celular / WhatsApp</div><input id="wz-cel" value="'+esc(d.celular)+'" placeholder="(51) 9 9999-9999"/></div>'
      +'<div class="field-group"><div class="field-label">Data de nascimento</div><input id="wz-nasc" type="date" value="'+d.nascimento+'"/></div>'
      +'<div class="field-group"><div class="field-label">Data de admissão</div><input id="wz-adm" type="date" value="'+d.admissao+'"/></div>'
      +'<div class="field-group"><div class="field-label">Gestor direto</div><select id="wz-gestor"><option value="">— Sem gestor —</option>'+gestorOpts+'</select></div>'
    +'</div>';
  } else if(step===2){
    content='<div class="form-grid">'
      +'<div class="field-group"><div class="field-label">Nível de Cargo *</div><select id="wz-nivel">'+nivelOpts+'</select></div>'
      +'<div class="field-group"><div class="field-label">Área *</div><select id="wz-area">'+areaOpts+'</select></div>'
      +'<div class="field-group form-full"><div class="field-label">Cargo / Título (opcional)</div><input id="wz-cargo" value="'+esc(d.cargo)+'" placeholder="Ex: Técnico de Ensaios"/></div>'
      +'<div class="field-group"><div class="field-label">Status</div><select id="wz-status">'+['Ativo','Férias','Afastado','Inativo','Desligado'].map(function(s){return '<option value="'+s+'"'+(d.status===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select></div>'
    +'</div>'
    // Botões de criação inline
    +'<div style="display:flex;gap:8px;margin-top:10px;padding-top:10px;border-top:0.5px solid var(--border)">'
      +'<button class="btn btn-sm" onclick="document.getElementById(\'wz-novo-nivel\').style.display=document.getElementById(\'wz-novo-nivel\').style.display===\'none\'?\'block\':\'none\'" style="border-color:#0F6E56;color:#0F6E56">+ Novo nível</button>'
      +'<button class="btn btn-sm" onclick="document.getElementById(\'wz-nova-area\').style.display=document.getElementById(\'wz-nova-area\').style.display===\'none\'?\'block\':\'none\'" style="border-color:#185FA5;color:#185FA5">+ Nova área</button>'
    +'</div>'
    // Form inline: Novo nível
    +'<div id="wz-novo-nivel" style="display:none;margin-top:10px;padding:12px;background:var(--bg2);border-radius:8px;border:1px solid var(--border)">'
      +'<div style="font-size:12px;font-weight:600;margin-bottom:8px;color:#0F6E56">Criar novo nível</div>'
      +'<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">'
        +'<div style="flex:1;min-width:120px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Nome *</div><input id="wz-nn-nome" placeholder="Ex: Analista Sr" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<div style="width:60px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Ordem</div><input id="wz-nn-ordem" type="number" value="'+(niveis.length+1)+'" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<button onclick="wzCriarNivel()" class="btn btn-primary btn-sm" style="padding:6px 14px;background:#0F6E56">Criar</button>'
      +'</div>'
    +'</div>'
    // Form inline: Nova área
    +'<div id="wz-nova-area" style="display:none;margin-top:10px;padding:12px;background:var(--bg2);border-radius:8px;border:1px solid var(--border)">'
      +'<div style="font-size:12px;font-weight:600;margin-bottom:8px;color:#185FA5">Criar nova área</div>'
      +'<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">'
        +'<div style="flex:1;min-width:150px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Nome da área *</div><input id="wz-na-nome" placeholder="Ex: Engenharia" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<button onclick="wzCriarArea()" class="btn btn-primary btn-sm" style="padding:6px 14px;background:#185FA5">Criar</button>'
      +'</div>'
    +'</div>';
  } else if(step===3){
    var funcoesDisp=ls('funcoes_v8',[]);
    // Inicializar dedicações se não existir
    if(!d.funcoesDedicacao) d.funcoesDedicacao={};
    content='<div style="font-size:12px;color:var(--txt2);margin-bottom:10px">Selecione as funções e defina a dedicação (%):</div>'
      +'<div style="max-height:220px;overflow-y:auto;margin-bottom:10px">';
    if(funcoesDisp.length===0){
      content+='<div style="text-align:center;padding:16px;color:var(--txt3);font-size:12px">Nenhuma função cadastrada ainda.</div>';
    } else {
      funcoesDisp.forEach(function(f){
        var checked=d.funcoes.indexOf(f.nome)>=0;
        var pctVal=d.funcoesDedicacao[f.nome]||100;
        content+='<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border:0.5px solid var(--border);border-radius:8px;margin-bottom:4px">'
          +'<input type="checkbox" class="wz-func-check" data-nome="'+esc(f.nome)+'" '+(checked?'checked':'')+' onchange="wzToggleFunc(this)" style="accent-color:#0F6E56;width:16px;height:16px;cursor:pointer;flex-shrink:0">'
          +'<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600">'+esc(f.nome)+'</div><div style="font-size:10px;color:var(--txt3)">'+(f.area||'')+(f.tempoMin?' · ~'+f.tempoMin+'min':'')+'</div></div>'
          +'<div style="display:flex;align-items:center;gap:3px;flex-shrink:0;'+(checked?'':'opacity:.3;pointer-events:none')+'" id="wz-pct-wrap-'+esc(f.nome).replace(/\s/g,'_')+'">'
            +'<input type="number" class="wz-func-pct" data-nome="'+esc(f.nome)+'" value="'+pctVal+'" min="1" max="100" style="width:48px;padding:3px 6px;border:1px solid var(--border);border-radius:4px;font-size:11px;text-align:center;background:var(--bg);color:var(--txt)">'
            +'<span style="font-size:10px;color:var(--txt3)">%</span>'
          +'</div>'
        +'</div>';
      });
    }
    content+='</div>'
    // Botão criar função inline
    +'<button class="btn btn-sm" onclick="document.getElementById(\'wz-nova-func\').style.display=document.getElementById(\'wz-nova-func\').style.display===\'none\'?\'block\':\'none\'" style="border-color:#854F0B;color:#854F0B;margin-bottom:8px">+ Nova função</button>'
    // Form inline: Nova função
    +'<div id="wz-nova-func" style="display:none;padding:12px;background:var(--bg2);border-radius:8px;border:1px solid var(--border)">'
      +'<div style="font-size:12px;font-weight:600;margin-bottom:8px;color:#854F0B">Criar nova função</div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">'
        +'<div style="flex:1;min-width:140px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Nome da função *</div><input id="wz-nf-nome" placeholder="Ex: Calibração de Equipamentos" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<div style="width:90px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Área</div><select id="wz-nf-area" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;background:var(--bg);color:var(--txt)"><option value="">—</option>'+Object.keys(typeof AREA_COLORS!=='undefined'?AREA_COLORS:{}).map(function(a){return '<option value="'+a+'">'+a+'</option>';}).join('')+'</select></div>'
        +'<div style="width:90px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Tipo tempo</div><select id="wz-nf-tipo" onchange="var p=document.getElementById(\'wz-nf-pct-wrap\');if(p)p.style.display=this.value===\'por_servico\'?\'block\':\'none\'" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;background:var(--bg);color:var(--txt)"><option value="por_servico">Por serviço</option><option value="fixo_mes">Fixo/mês</option></select></div>'
        +'<div style="width:60px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">Tempo (min)</div><input id="wz-nf-tempo" type="number" value="30" min="1" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<div id="wz-nf-pct-wrap" style="width:60px"><div style="font-size:10px;color:var(--txt3);margin-bottom:3px">% Serviços</div><input id="wz-nf-pct" type="number" value="100" min="1" max="100" style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:12px;box-sizing:border-box;background:var(--bg);color:var(--txt)"/></div>'
        +'<button onclick="wzCriarFuncao()" class="btn btn-primary btn-sm" style="padding:6px 14px;background:#854F0B">Criar</button>'
      +'</div>'
    +'</div>';
  } else {
    // Passo 4: Revisão
    content='<div style="background:var(--bg2);border-radius:10px;padding:16px;margin-bottom:12px">'
      +'<div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:8px">'+esc(d.nome||'Nome não informado')+'</div>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">'+(d.nivel?nivelBadge(d.nivel):'')+(d.area?areaBadge(d.area):'')+'</div>'
      +'<div style="font-size:12px;color:var(--txt2);line-height:1.8">'
        +(d.email?'📧 '+d.email+'<br>':'')
        +(d.celular?'📱 '+d.celular+'<br>':'')
        +(d.gestor?'👤 Gestor: '+d.gestor+'<br>':'')
        +(d.cargo?'💼 '+d.cargo+'<br>':'')
        +(d.status?'🔘 Status: '+d.status:'')
      +'</div>'
      +(d.funcoes.length?'<div style="margin-top:8px;padding-top:8px;border-top:0.5px solid var(--border);font-size:11px;color:var(--txt2)">Funções: '+d.funcoes.map(function(fn){var pct=(d.funcoesDedicacao||{})[fn]||100;return fn+' ('+pct+'%)';}).join(', ')+'</div>':'')
    +'</div>';
  }

  // Botões de navegação
  var btns='<div style="display:flex;justify-content:space-between;margin-top:14px">';
  if(step>1) btns+='<button class="btn btn-sm" onclick="wizardBack('+isEdit+')">← Voltar</button>';
  else btns+='<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>';
  if(step<4) btns+='<button class="btn btn-primary" onclick="wizardNext('+isEdit+')">Próximo →</button>';
  else btns+='<button class="btn btn-primary" onclick="wizardSave(\''+d.id+'\')">💾 '+(isEdit?'Salvar alterações':'Cadastrar colaborador')+'</button>';
  btns+='</div>';

  document.getElementById('modal-body').innerHTML=progHtml+content+btns;
  document.getElementById('modal').style.display='flex';
}

function wizardNext(isEdit){
  var d=window._wizardData;var step=window._wizardStep;
  // Salvar dados do passo atual
  if(step===1){
    d.nome=((document.getElementById('wz-nome')||{}).value||'').trim();
    d.email=(document.getElementById('wz-email')||{}).value||'';
    d.celular=(document.getElementById('wz-cel')||{}).value||'';
    d.nascimento=(document.getElementById('wz-nasc')||{}).value||'';
    d.admissao=(document.getElementById('wz-adm')||{}).value||'';
    d.gestor=(document.getElementById('wz-gestor')||{}).value||'';
    if(!d.nome){alert('Nome é obrigatório');return;}
  } else if(step===2){
    d.nivel=(document.getElementById('wz-nivel')||{}).value||'';
    d.area=(document.getElementById('wz-area')||{}).value||'';
    d.cargo=(document.getElementById('wz-cargo')||{}).value||'';
    d.status=(document.getElementById('wz-status')||{}).value||'Ativo';
  } else if(step===3){
    d.funcoes=[];d.funcoesDedicacao=d.funcoesDedicacao||{};
    document.querySelectorAll('.wz-func-check:checked').forEach(function(cb){
      var nome=cb.dataset.nome;d.funcoes.push(nome);
      var pi=document.querySelector('.wz-func-pct[data-nome="'+nome+'"]');
      if(pi)d.funcoesDedicacao[nome]=parseInt(pi.value)||100;
    });
  }
  window._wizardStep=Math.min(4,step+1);
  _renderWizardStep(isEdit);
}

function wizardBack(isEdit){
  // Salvar dados do passo atual antes de voltar
  var d=window._wizardData;var step=window._wizardStep;
  if(step===2){
    d.nivel=(document.getElementById('wz-nivel')||{}).value||d.nivel;
    d.area=(document.getElementById('wz-area')||{}).value||d.area;
    d.cargo=(document.getElementById('wz-cargo')||{}).value||d.cargo;
    d.status=(document.getElementById('wz-status')||{}).value||d.status;
  } else if(step===3){
    d.funcoes=[];d.funcoesDedicacao=d.funcoesDedicacao||{};
    document.querySelectorAll('.wz-func-check:checked').forEach(function(cb){
      var nome=cb.dataset.nome;d.funcoes.push(nome);
      var pi=document.querySelector('.wz-func-pct[data-nome="'+nome+'"]');
      if(pi)d.funcoesDedicacao[nome]=parseInt(pi.value)||100;
    });
  }
  window._wizardStep=Math.max(1,step-1);
  _renderWizardStep(isEdit);
}

function wizardSave(id){
  var d=window._wizardData;
  var existente=id?colaboradores.find(x=>x.id===id):null;
  var perfilAtual=(existente&&existente.perfil)||{};
  var obj={
    id:id||uid(),nome:d.nome,nivel:d.nivel,area:d.area,status:d.status,gestor:d.gestor,
    historico:existente?existente.historico||[]:[],
    funcoes:existente?existente.funcoes||[]:[],
    perfil:Object.assign(perfilAtual,{email:d.email,celular:d.celular,nascimento:d.nascimento,admissao:d.admissao,cargo:d.cargo}),
  };
  if(id){var i=colaboradores.findIndex(x=>x.id===id);if(i>=0)colaboradores[i]=obj;}
  else colaboradores.push(obj);

  // Atribuir colaborador como responsável nas funções selecionadas
  var funcsAll=ls('funcoes_v8',[]);
  var nomeCol=d.nome;
  d.funcoes.forEach(function(fNome){
    var func=funcsAll.find(function(f){return f.nome===fNome;});
    if(!func)return;
    if(!func.responsaveis)func.responsaveis=[];
    // Remover se já existe (pra atualizar %)
    func.responsaveis=func.responsaveis.filter(function(r){return r.nome!==nomeCol;});
    // Adicionar com a dedicação definida
    var pct=(d.funcoesDedicacao||{})[fNome]||100;
    func.responsaveis.push({nome:nomeCol,pct:pct});
  });
  lss('funcoes_v8',funcsAll);

  saveAll();closeModal();toast(id?'Colaborador atualizado!':'✅ Colaborador cadastrado!');render(currentPage);
}

// ── Criação inline no wizard ─────────────────────────────────
function wzCriarNivel(){
  var nome=((document.getElementById('wz-nn-nome')||{}).value||'').trim();
  if(!nome){toast('Digite o nome do nível');return;}
  // Verificar se já existe
  if(niveis.find(function(n){return n.nome.toLowerCase()===nome.toLowerCase();})){toast('Nível já existe');return;}
  var ordem=parseInt((document.getElementById('wz-nn-ordem')||{}).value)||niveis.length+1;
  var cores=['#0F6E56','#185FA5','#534AB7','#854F0B','#A32D2D','#3B6D11','#8B5CF6','#0891B2'];
  var bgCores=['#E1F5EE','#E6F1FB','#F3F0FF','#FAEEDA','#FCEBEB','#E8F5E0','#EDE9FE','#E0F7FA'];
  var idx=niveis.length%cores.length;
  var novoNivel={id:uid(),nome:nome,ordem:ordem,cor:cores[idx],bg:bgCores[idx]};
  niveis.push(novoNivel);
  niveis.sort(function(a,b){return a.ordem-b.ordem;});
  // Criar perguntas padrão pro novo nível
  if(!perguntas[nome]){
    var primeiroNivel=Object.keys(perguntas)[0];
    perguntas[nome]=primeiroNivel?JSON.parse(JSON.stringify(perguntas[primeiroNivel])):{};
  }
  saveAll();
  toast('✅ Nível "'+nome+'" criado!');
  // Atualizar o wizard mantendo os dados
  window._wizardData.nivel=nome;
  _renderWizardStep(!!window._wizardData.id);
}

function wzCriarArea(){
  var nome=((document.getElementById('wz-na-nome')||{}).value||'').trim();
  if(!nome){toast('Digite o nome da área');return;}
  if(AREA_COLORS[nome]){toast('Área já existe');return;}
  // Paleta de cores pra áreas
  var paleta=[
    {cor:'#0F6E56',bg:'#E1F5EE'},{cor:'#185FA5',bg:'#E6F1FB'},{cor:'#854F0B',bg:'#FAEEDA'},
    {cor:'#534AB7',bg:'#F3F0FF'},{cor:'#A32D2D',bg:'#FCEBEB'},{cor:'#3B6D11',bg:'#E8F5E0'},
    {cor:'#0891B2',bg:'#E0F7FA'},{cor:'#9333EA',bg:'#F3E8FF'}
  ];
  var idx=Object.keys(AREA_COLORS).length%paleta.length;
  AREA_COLORS[nome]=paleta[idx];
  lss('areas_config',AREA_COLORS);
  saveAll();
  toast('✅ Área "'+nome+'" criada!');
  window._wizardData.area=nome;
  _renderWizardStep(!!window._wizardData.id);
}

function wzCriarFuncao(){
  var nome=((document.getElementById('wz-nf-nome')||{}).value||'').trim();
  if(!nome){toast('Digite o nome da função');return;}
  var area=(document.getElementById('wz-nf-area')||{}).value||'';
  var tempo=parseInt((document.getElementById('wz-nf-tempo')||{}).value)||30;
  var tipoTempo=(document.getElementById('wz-nf-tipo')||{}).value||'por_servico';
  var pctServicos=parseInt((document.getElementById('wz-nf-pct')||{}).value)||100;
  if(tipoTempo==='fixo_mes') pctServicos=100;
  var funcs=ls('funcoes_v8',[]);
  if(funcs.find(function(f){return f.nome.toLowerCase()===nome.toLowerCase();})){toast('Função já existe');return;}
  funcs.push({
    id:uid(),nome:nome,area:area,
    tempoMin:tempo,tipoTempo:tipoTempo,pctServicos:pctServicos,
    servicos:[],responsaveis:[],
    descricao:'',created:new Date().toISOString()
  });
  lss('funcoes_v8',funcs);
  saveAll();
  toast('✅ Função "'+nome+'" criada!');
  // Marcar a nova função como selecionada com 100% dedicação
  window._wizardData.funcoes.push(nome);
  if(!window._wizardData.funcoesDedicacao) window._wizardData.funcoesDedicacao={};
  window._wizardData.funcoesDedicacao[nome]=100;
  _renderWizardStep(!!window._wizardData.id);
}

// Toggle de visibilidade do campo de % quando marca/desmarca função
function wzToggleFunc(cb){
  var nome=cb.dataset.nome;
  var wrapId='wz-pct-wrap-'+nome.replace(/\s/g,'_');
  var wrap=document.getElementById(wrapId);
  if(wrap){
    if(cb.checked){wrap.style.opacity='1';wrap.style.pointerEvents='auto';}
    else{wrap.style.opacity='.3';wrap.style.pointerEvents='none';}
  }
}

// ── Compartilhar seletivo ────────────────────────────────────
function abrirCompartilharSeletivo(id){
  var c=colaboradores.find(x=>x.id===id);if(!c)return;
  var p=c.perfil||{};
  document.getElementById('modal-title').textContent='📧 Compartilhar perfil de '+c.nome.split(' ')[0];
  document.getElementById('modal-box').classList.remove('modal-lg');

  var items=[
    {key:'dados',label:'Dados cadastrais',desc:'Nome, nível, área, gestor, cargo',icon:'👤',checked:true},
    {key:'avaliacao',label:'Última avaliação',desc:'Nota geral, notas por seção, observações',icon:'📊',checked:true},
    {key:'pdi',label:'PDI ativo',desc:'Plano de desenvolvimento com ações e progresso',icon:'📈',checked:true},
    {key:'metas',label:'Metas SMART',desc:'Metas individuais com progresso e prazos',icon:'🎯',checked:false},
    {key:'competencias',label:'Competências esperadas',desc:'Matriz de competências do nível/cargo',icon:'📋',checked:false},
    {key:'notas',label:'Notas do gestor',desc:'Anotações internas — nunca compartilhadas',icon:'🔒',checked:false,disabled:true},
  ];

  var checksHtml=items.map(function(it){
    return '<label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:0.5px solid var(--border);border-radius:8px;margin-bottom:5px;cursor:'+(it.disabled?'not-allowed':'pointer')+';opacity:'+(it.disabled?'.5':'1')+'">'
      +'<input type="checkbox" class="share-check" data-key="'+it.key+'" '+(it.checked?'checked':'')+(it.disabled?' disabled':'')+' style="margin-top:2px;accent-color:#0F6E56;width:16px;height:16px">'
      +'<div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--txt)">'+it.label+(it.disabled?' <span style="font-size:9px;padding:1px 6px;border-radius:8px;background:#FCEBEB;color:#A32D2D;font-weight:600">Sensível</span>':'')+'</div>'
      +'<div style="font-size:11px;color:var(--txt3)">'+it.desc+'</div></div>'
      +'<span style="font-size:14px">'+it.icon+'</span>'
    +'</label>';
  }).join('');

  var envioHtml='<div style="font-size:13px;font-weight:500;margin:14px 0 8px">Como enviar</div>'
    +'<div style="display:flex;gap:6px">'
      +'<button onclick="enviarPerfil(\''+id+'\',\'email\')" class="btn btn-sm" style="flex:1;text-align:center;padding:10px">✉️<br><span style="font-size:11px">Email</span></button>'
      +'<button onclick="enviarPerfil(\''+id+'\',\'whatsapp\')" class="btn btn-sm" style="flex:1;text-align:center;padding:10px">💬<br><span style="font-size:11px">WhatsApp</span></button>'
      +'<button onclick="enviarPerfil(\''+id+'\',\'link\')" class="btn btn-sm" style="flex:1;text-align:center;padding:10px">🔗<br><span style="font-size:11px">Copiar link</span></button>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg2);border-radius:8px;margin-top:10px;font-size:11px;color:var(--txt3)">'
      +'🔐 O link é pessoal, expira em 7 dias e só mostra os dados selecionados.'
    +'</div>';

  document.getElementById('modal-body').innerHTML=checksHtml+envioHtml;
  document.getElementById('modal').style.display='flex';
}

function enviarPerfil(id,metodo){
  var c=colaboradores.find(x=>x.id===id);if(!c)return;
  var selecionados=[];
  document.querySelectorAll('.share-check:checked').forEach(function(cb){selecionados.push(cb.dataset.key);});
  
  var texto='*Perfil: '+c.nome+'*\n'+c.nivel+' · '+c.area+'\n';
  if(selecionados.indexOf('avaliacao')>=0){
    var avs=avaliacoes.filter(a=>a.colaboradorId===id);
    var last=avs.length?avs[avs.length-1]:null;
    if(last) texto+='Última avaliação: '+last.mediaGeral+' ('+last.data+')\n';
  }
  if(selecionados.indexOf('pdi')>=0){
    var pdis=(typeof getPDIs==='function'?getPDIs():[]).filter(p=>p.colId===id);
    if(pdis.length) texto+='PDI: '+(pdis[0].ciclo||'Ativo')+'\n';
  }
  if(selecionados.indexOf('metas')>=0){
    var ms=metas.filter(m=>m.colId===id);
    if(ms.length) texto+='Metas: '+ms.length+' ativas\n';
  }
  texto+='\nSquado · squado.com.br';

  if(metodo==='email'){
    var p=(c.perfil||{});
    var mailto='mailto:'+(p.email||'')+'?subject='+encodeURIComponent('Squado — Perfil '+c.nome)+'&body='+encodeURIComponent(texto);
    window.open(mailto);
  } else if(metodo==='whatsapp'){
    var p2=(c.perfil||{});
    var cel=(p2.celular||'').replace(/\D/g,'');
    window.open('https://wa.me/55'+cel+'?text='+encodeURIComponent(texto));
  } else {
    navigator.clipboard.writeText(texto).then(function(){toast('📋 Perfil copiado!');});
  }
  closeModal();
}

function saveCol(id){
  const nome=((document.getElementById('fc-nome')||{}).value||'').trim();
  if(!nome){alert('Nome obrigatório');return;}
  // Verificar nome duplicado (ignorar o próprio colaborador ao editar)
  const nomeNorm=nome.toLowerCase();
  const duplicado=colaboradores.find(x=>x.nome.toLowerCase()===nomeNorm && x.id!==id);
  if(duplicado){alert('Já existe um colaborador com o nome "'+duplicado.nome+'". Use um nome diferente.');return;}
  const nivel=(document.getElementById('fc-nivel')||{}).value||'Assistente I';
  const area=(document.getElementById('fc-area')||{}).value||'EMC';
  const status=(document.getElementById('fc-status')||{}).value||'Ativo';
  const gestor=(document.getElementById('fc-gestor')||{}).value||'';
  const emailQuick=((document.getElementById('fc-email-quick')||{}).value||'');
  const celQuick=((document.getElementById('fc-cel-quick')||{}).value||'');
  const existente=id?colaboradores.find(x=>x.id===id):null;
  const perfilAtual=(existente&&existente.perfil)||{};
  const obj={
    id:id||uid(),nome,nivel,area,status,gestor,
    historico:existente?existente.historico||[]:[],
    funcoes:existente?existente.funcoes||[]:[],
    perfil:Object.assign(perfilAtual,{
      email:emailQuick||perfilAtual.email||'',
      celular:celQuick||perfilAtual.celular||'',
    }),
  };
  if(id){const i=colaboradores.findIndex(x=>x.id===id);if(i>=0)colaboradores[i]=obj;}
  else colaboradores.push(obj);
  saveAll();closeModal();toast('Colaborador salvo!');render(currentPage);
}

function delCol(id){
  // Oferecer opções: desligar (mantém histórico) ou excluir permanente
  document.getElementById('modal-title').textContent='⚠️ Encerrar Vínculo';
  document.getElementById('modal-box').classList.remove('modal-lg');
  const col=colaboradores.find(x=>x.id===id);
  if(!col)return;
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:13px;color:var(--txt);margin-bottom:16px">O que deseja fazer com <strong>'+col.nome+'</strong>?</div>'
    +'<div style="display:flex;flex-direction:column;gap:10px">'
      +'<button class="btn" data-id="'+id+'" onclick="desligarCol(this.dataset.id)" style="padding:14px;border:1.5px solid #854F0B;border-radius:10px;text-align:left;background:#FAEEDA">'
        +'<div style="font-size:13px;font-weight:700;color:#854F0B">📦 Desligar / Encerrar vínculo</div>'
        +'<div style="font-size:11px;color:#854F0B;margin-top:3px;opacity:.85">Mantém todo o histórico, avaliações, notas e PDI. O colaborador fica como Desligado.</div>'
      +'</button>'
      +'<button class="btn" data-id="'+id+'" onclick="excluirColPermanente(this.dataset.id)" style="padding:14px;border:1.5px solid #A32D2D;border-radius:10px;text-align:left;background:#FCEBEB">'
        +'<div style="font-size:13px;font-weight:700;color:#A32D2D">🗑️ Excluir permanentemente</div>'
        +'<div style="font-size:11px;color:#A32D2D;margin-top:3px;opacity:.85">Remove todos os dados. Ação irreversível.</div>'
      +'</button>'
      +'<button class="btn" onclick="closeModal()" style="margin-top:4px">Cancelar</button>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function desligarCol(id){
  const i=colaboradores.findIndex(x=>x.id===id);if(i<0)return;
  const col=colaboradores[i];
  const nomeCol=col.nome;
  if(!col.historico)col.historico=[];
  col.historico.push({
    data:new Date().toISOString().slice(0,10),
    tipo:'Desligamento',
    descricao:'Vínculo encerrado. Colaborador desligado da equipe.'
  });
  col.status='Desligado';
  // Remover de todas as funções de capacidade ao desligar
  let funcoesV8=ls('funcoes_v8',null);
  if(funcoesV8&&funcoesV8.length){
    funcoesV8=funcoesV8.map(f=>({
      ...f,
      responsaveis:(f.responsaveis||[]).filter(r=>
        r.nome!==nomeCol && r.nome.toLowerCase()!==nomeCol.toLowerCase()
      )
    }));
    lss('funcoes_v8',funcoesV8);
  }
  saveAll();closeModal();
  toast(nomeCol+' desligado. Histórico mantido ✓');
  render(currentPage);
}

function demitirCol(id){
  if(!confirm('Confirmar demissão? O colaborador será marcado como Desligado e o histórico será registrado.')) return;
  const col = colaboradores.find(x=>x.id===id); if(!col) return;
  const dataHoje = new Date().toISOString().slice(0,10);
  col.status = 'Desligado';
  if(!col.historico) col.historico = [];
  col.historico.push({tipo:'Desligamento', data: dataHoje, obs:'Demitido pela empresa', registradoPor: squadoGetUser()?.email||''});
  saveAll();
  closeModal();
  toast('Colaborador desligado e histórico registrado.');
  render(currentPage);
}

function solicitouDemissaoCol(id){
  if(!confirm('Registrar que o colaborador solicitou demissão?')) return;
  const col = colaboradores.find(x=>x.id===id); if(!col) return;
  const dataHoje = new Date().toISOString().slice(0,10);
  col.status = 'Desligado';
  if(!col.historico) col.historico = [];
  col.historico.push({tipo:'Desligamento', data: dataHoje, obs:'Pedido de demissão — solicitado pelo colaborador', registradoPor: squadoGetUser()?.email||''});
  saveAll();
  closeModal();
  toast('Pedido de demissão registrado no histórico.');
  render(currentPage);
}

function excluirColPermanente(id){
  if(!confirm('Excluir PERMANENTEMENTE? Esta ação não pode ser desfeita.'))return;
  const col=colaboradores.find(x=>x.id===id);
  if(!col)return;
  const nomeCol=col.nome;
  // Remover do array de colaboradores
  colaboradores=colaboradores.filter(x=>x.id!==id);
  // Remover de avaliações, notas, PDIs
  avaliacoes=avaliacoes.filter(a=>a.colaboradorId!==id);
  notas=notas.filter(n=>n.colId!==id);
  const pdis=getPDIs().filter(p=>p.colId!==id);savePDIs(pdis);
  // Remover de todas as funções de capacidade (funcoes_v8)
  let funcoesV8=ls('funcoes_v8',null);
  if(funcoesV8&&funcoesV8.length){
    funcoesV8=funcoesV8.map(f=>({
      ...f,
      responsaveis:(f.responsaveis||[]).filter(r=>
        r.nome!==nomeCol && r.nome.toLowerCase()!==nomeCol.toLowerCase()
      )
    }));
    lss('funcoes_v8',funcoesV8);
  }
  // Remover do organograma
  const orgPos=ls('orgPos_v2',{});
  if(orgPos[id]){delete orgPos[id];lss('orgPos_v2',orgPos);}
  // Remover conexões de organograma que envolvem este colaborador
  const orgConns=ls('orgConns',[]);
  const orgConnsFiltered=orgConns.filter(conn=>conn.from!==id&&conn.to!==id);
  lss('orgConns',orgConnsFiltered);
  // Remover do ninebox
  const posNB=ls('ninebox_pos',{});
  if(posNB[id]){delete posNB[id];lss('ninebox_pos',posNB);}
  // Remover metas do colaborador
  const metas=ls('metas_v2',[]).filter(m=>m.colId!==id);
  lss('metas_v2',metas);
  saveAll();closeModal();toast('Excluído permanentemente.');render(currentPage);
}



// ═══════════════════════════════════════════════════════════════
// OPERAÇÕES DE FUNÇÕES POR COLABORADOR (no perfil)
// ═══════════════════════════════════════════════════════════════
function adicionarAFuncaoEl(el){
  adicionarAFuncao(el.dataset.colid);
}
function adicionarAFuncao(colId){
  const funcId=(document.getElementById('add-func-select')||{}).value;
  const pct=parseInt((document.getElementById('add-func-pct')||{}).value||100);
  if(!funcId){alert('Selecione uma função.');return;}
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  let funcoesV4=ls('funcoes_v8',null);
  if(!funcoesV4||funcoesV4.length===0) funcoesV4=migrarFuncoes();
  const idx=funcoesV4.findIndex(f=>f.id===funcId);
  if(idx<0){toast('Função não encontrada. Recarregue a página.');return;}
  // Verificar se já está
  const jaEsta=(funcoesV4[idx].responsaveis||[]).find(r=>r.nome===col.nome);
  if(jaEsta){toast('Já está nesta função!');return;}
  if(!funcoesV4[idx].responsaveis)funcoesV4[idx].responsaveis=[];
  funcoesV4[idx].responsaveis.push({nome:col.nome,pct});
  lss('funcoes_v8',funcoesV4);
  saveAll();
  toast('Adicionado à função! ✓');
  renderPerfilAba(colId,'funcoes_col');
}

function removerDeFuncaoEl(el){
  var colid = el.dataset ? el.dataset.colid : el.getAttribute('data-colid');
  var funcid = el.dataset ? el.dataset.funcid : el.getAttribute('data-funcid');
  if(colid && funcid) removerDeFuncao(colid, funcid);
}
function removerDeFuncao(colId,funcId){
  if(!confirm('Remover desta função?'))return;
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  let funcoesV4=ls('funcoes_v8',null);
  if(!funcoesV4||funcoesV4.length===0) funcoesV4=migrarFuncoes();
  const nomeCol=col.nome.toLowerCase();
  // Buscar por ID exato
  let idx=funcoesV4.findIndex(f=>f.id===funcId);
  if(idx<0){
    // Fallback: ID pode ser nome da função (gerado dinamicamente)
    idx=funcoesV4.findIndex(f=>f.nome===funcId);
  }
  if(idx<0){
    // Fallback: buscar pela função que TEM o colaborador E cujo id/nome bate
    idx=funcoesV4.findIndex(f=>
      (f.responsaveis||[]).some(r=>r.nome.toLowerCase()===nomeCol) &&
      (f.id===funcId||f.nome===funcId)
    );
  }
  if(idx<0){
    // Último recurso: qualquer função que tenha este colaborador e cujo id começa igual
    idx=funcoesV4.findIndex(f=>
      (f.responsaveis||[]).some(r=>r.nome.toLowerCase()===nomeCol) &&
      (funcId.startsWith(f.id)||f.id.startsWith(funcId))
    );
  }
  if(idx<0){toast('Função não encontrada. Tente recarregar a página.');return;}
  funcoesV4[idx].responsaveis=(funcoesV4[idx].responsaveis||[]).filter(r=>
    r.nome.toLowerCase()!==nomeCol
  );
  lss('funcoes_v8',funcoesV4);
  saveAll();
  toast('Removido da função!');
  renderPerfilAba(colId,'funcoes_col');
}

function salvarDedicacaoInput(funcId, colId){
  var input = document.getElementById('ded-'+funcId);
  if(!input) input = document.querySelector('[data-funcid="'+funcId+'"][type="number"]');
  var val = input ? parseInt(input.value) : 100;
  if(isNaN(val)||val<1) val=1;
  if(val>100) val=100;
  atualizarDedicacao(colId, funcId, val);
  toast('Dedicação salva! ✓');
  renderPerfilAba(colId, 'funcoes_col');
}

function atualizarDedicacaoEl(el){
  const colId=el.dataset.colid;
  const funcId=el.dataset.funcid;
  atualizarDedicacao(colId,funcId,el.value);
}
function atualizarDedicacao(colId,funcId,novoPct){
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  let funcoesV4=ls('funcoes_v8',null);
  if(!funcoesV4||!funcoesV4.length) funcoesV4=migrarFuncoes();
  const idx=funcoesV4.findIndex(f=>f.id===funcId);if(idx<0)return;
  const rIdx=(funcoesV4[idx].responsaveis||[]).findIndex(r=>
    r.nome===col.nome
  );
  if(rIdx>=0){
    funcoesV4[idx].responsaveis[rIdx].pct=parseInt(novoPct)||100;
    lss('funcoes_v8',funcoesV4);
    toast('Dedicação atualizada! ✓');
  }
}

// ─── Abrir perfil do colaborador na aba Funções (a partir de Capacidade) ────
function verColCapacidade(colId){
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  document.getElementById('modal-title').textContent='';
  document.getElementById('modal-box').classList.add('modal-lg');
  renderPerfilAba(colId,'funcoes_col');
  document.getElementById('modal').style.display='flex';
}

// ── Salvar nota direto do perfil ──────────────────────────────
function _salvarNotaPerfil(colId){
  var txt=document.getElementById('perfil-nota-texto');
  if(!txt||!txt.value.trim()){alert('Escreva algo.');return;}
  var sent=document.getElementById('perfil-nota-sent');
  var cat=document.getElementById('perfil-nota-cat');
  var col=colaboradores.find(function(c){return c.id===colId;});
  var nota={
    id:uid(),colId:colId,colaborador:col?col.nome:'',colNome:col?col.nome:'',
    texto:txt.value.trim(),
    sentimento:sent?sent.value:'neutro',
    categoria:cat?cat.value:'Observação',
    data:new Date().toISOString().slice(0,10),
    dataExib:new Date().toLocaleDateString('pt-BR'),
    dataHora:new Date().toISOString()
  };
  notas.push(nota);
  saveAll();
  toast('Nota salva! 📝');
  renderPerfilAba(colId,'notas_col');
}

// ── Salvar data de admissão ────────────────────────────────────
function salvarDataAdmissao(colId, val){
  var i=colaboradores.findIndex(function(c){return c.id===colId;});
  if(i<0) return;
  colaboradores[i].dataAdmissao = val;
  if(!colaboradores[i].perfil) colaboradores[i].perfil = {};
  colaboradores[i].perfil.dataAdmissao = val;
  saveAll();
  toast('Data de início salva! ✅');
}

// ── Compartilhar por email (mailto:) ──────────────────────────
function enviarCompartilhar(colId){
  var col=colaboradores.find(function(c){return c.id===colId;});
  if(!col)return;
  var nome=col.nome;
  var emailTo=document.getElementById('share-email');
  if(!emailTo||!emailTo.value.trim()){alert('Informe o email de destino.');return;}
  var email=emailTo.value.trim();

  var secs=[];
  ['funcoes','avaliacoes','metas','pdi','okr','notas','movimentacoes'].forEach(function(s){
    var chk=document.getElementById('share-'+s);
    if(chk&&chk.checked) secs.push(s);
  });
  if(!secs.length){alert('Selecione pelo menos um item para compartilhar.');return;}

  var corpo='Olá '+nome.split(' ')[0]+',\n\nSegue abaixo as informações compartilhadas:\n';

  // ── Funções ──
  if(secs.indexOf('funcoes')>=0){
    var funcoesV4=ls('funcoes_v8',null)||[];
    var minhasFuncs=funcoesV4.filter(function(f){return(f.responsaveis||[]).some(function(r){return r.nome===nome;});});
    corpo+='\n━━━ 📌 FUNÇÕES ━━━\n';
    minhasFuncs.forEach(function(f){
      var resp=(f.responsaveis||[]).find(function(r){return r.nome===nome;});
      corpo+='• '+f.nome+' ('+f.area+') — Dedicação: '+(resp?resp.pct:100)+'%\n';
    });
  }

  // ── Avaliações ──
  if(secs.indexOf('avaliacoes')>=0){
    var avsCol=avaliacoes.filter(function(a){return a.colaboradorId===colId||a.colaborador===nome;});
    corpo+='\n━━━ 📊 AVALIAÇÕES ━━━\n';
    avsCol.slice().reverse().forEach(function(a){
      corpo+='• '+a.data+' — Média: '+a.mediaGeral+(a.avaliador?' (por '+a.avaliador+')':'')+'\n';
    });
    if(avsCol.length){
      corpo+='(Para gerar o PDF da avaliação, acesse a aba Avaliações no perfil do colaborador)\n';
    }
  }

  // ── Metas SMART ──
  if(secs.indexOf('metas')>=0){
    var smartCol=metas.filter(function(m){return m.tipo==='smart'&&m.colId===colId;});
    corpo+='\n━━━ ✅ METAS ━━━\n';
    smartCol.forEach(function(m){
      corpo+='• '+m.titulo+' — '+(m.progresso||0)+'% ('+(m.status||'Pendente')+')'+(m.prazo?' Prazo: '+m.prazo:'')+'\n';
    });
    if(!smartCol.length) corpo+='Nenhuma meta atribuída.\n';
  }

  // ── PDI ──
  if(secs.indexOf('pdi')>=0){
    var pdisCol=(typeof getPDIs==='function'?getPDIs():[]).filter(function(pd){return pd.colId===colId;});
    corpo+='\n━━━ 🚀 PDI ━━━\n';
    pdisCol.forEach(function(pd){
      var acoes=pd.acoes||[];
      var pct=acoes.length?Math.round(acoes.reduce(function(a,ac){return a+(ac.progresso||0);},0)/acoes.length):0;
      corpo+='• '+(pd.ciclo||pd.objetivo||'PDI')+' — '+pct+'% concluído\n';
      acoes.forEach(function(ac){ corpo+='  ○ '+(ac.descricao||'Ação')+' ('+(ac.progresso||0)+'%)\n'; });
    });
    if(!pdisCol.length) corpo+='Nenhum PDI criado.\n';
  }

  // ── OKR ──
  if(secs.indexOf('okr')>=0){
    var okrsArea=metas.filter(function(m){return m.tipo==='okr'&&m.area===col.area;});
    corpo+='\n━━━ 🎯 OKR — '+(col.area||'Equipe')+' ━━━\n';
    okrsArea.forEach(function(o){
      var krs=o.keyResults||[];
      var pct=krs.length?Math.round(krs.reduce(function(a,kr){var al=parseFloat(kr.alvo)||1;var at=parseFloat(kr.atual)||0;return a+Math.min(100,Math.round(at/al*100));},0)/krs.length):0;
      corpo+='• '+o.objetivo+' — '+pct+'%\n';
      krs.forEach(function(kr){ corpo+='  ○ '+kr.titulo+' ('+( parseFloat(kr.atual)||0)+'/'+( parseFloat(kr.alvo)||1)+')\n'; });
    });
    if(!okrsArea.length) corpo+='Nenhum OKR para esta área.\n';
  }

  // ── Notas ──
  if(secs.indexOf('notas')>=0){
    var periodo=document.getElementById('share-notas-periodo');
    var periodoVal=periodo?periodo.value:'mensal';
    var diasMap={semanal:7,mensal:30,trimestral:90,semestral:180};
    var diasFiltro=diasMap[periodoVal]||30;
    var agora=new Date();
    var notasCol=notas.filter(function(n){
      if(n.colId!==colId)return false;
      var d=new Date(n.dataHora||n.data);
      return(agora-d)/(1000*60*60*24)<=diasFiltro;
    });
    var periodoLabel={semanal:'Última semana',mensal:'Último mês',trimestral:'Último trimestre',semestral:'Último semestre'}[periodoVal];
    var sentLabels={positivo:'(+)',neutro:'(~)',negativo:'(-)',alerta:'(!)'}; 
    corpo+='\n━━━ 📝 NOTAS — '+periodoLabel+' ━━━\n';
    notasCol.forEach(function(n){
      corpo+='• '+(sentLabels[n.sentimento]||'')+' '+n.texto+' ['+(n.dataExib||n.data||'')+']\n';
    });
    if(!notasCol.length) corpo+='Nenhuma nota no período.\n';
  }

  // ── Movimentações ──
  if(secs.indexOf('movimentacoes')>=0){
    var hist=(col.historico||[]).slice().reverse();
    corpo+='\n━━━ 🕐 MOVIMENTAÇÕES ━━━\n';
    hist.forEach(function(h){
      corpo+='• '+h.tipo+' — '+h.data+': '+h.descricao+'\n';
    });
    if(!hist.length) corpo+='Nenhuma movimentação registrada.\n';
  }

  corpo+='\n—\nSquado · Gestão de Equipes\nhttps://squado.com.br';

  var assunto='Squado — Informações de '+nome;

  // Copiar corpo pro clipboard sempre
  var ta=document.createElement('textarea');ta.value=corpo;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);

  // Abrir Gmail compose (funciona melhor que mailto pra body)
  var gmailUrl='https://mail.google.com/mail/?view=cm&to='+encodeURIComponent(email)+'&su='+encodeURIComponent(assunto)+'&body='+encodeURIComponent(corpo);
  
  // Se URL muito longa, abrir só com subject e avisar do clipboard
  if(gmailUrl.length > 8000){
    gmailUrl='https://mail.google.com/mail/?view=cm&to='+encodeURIComponent(email)+'&su='+encodeURIComponent(assunto);
    toast('📋 Conteúdo copiado! Cole no corpo do email com Ctrl+V');
  }

  window.open(gmailUrl,'_blank');
  toast('📧 Email aberto no Gmail! (conteúdo também copiado)');
}

