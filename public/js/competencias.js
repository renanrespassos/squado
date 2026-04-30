
// ═══════════════════════════════════════════════════════════════
// MATRIZ DE COMPETÊNCIAS
// ═══════════════════════════════════════════════════════════════
const MATRIZ_COMPETENCIAS = {

  // ─── COMPETÊNCIAS ESSENCIAIS (todos os cargos) ────────────
  essenciais: [
    {nome:'Acolhimento',        tipo:'Comportamental', desc:'Agir orientado pelos valores maristas, demonstrando cuidado e valorização do outro.'},
    {nome:'Aprendizado Contínuo',tipo:'Comportamental',desc:'Buscar o aprimoramento dos saberes, atuando com excelência.'},
    {nome:'Colaboração',        tipo:'Comportamental', desc:'Atuar de forma cooperativa, comprometendo-se com objetivos comuns.'},
    {nome:'Comunicação',        tipo:'Comportamental', desc:'Ouvir, compreender e partilhar, estabelecendo diálogos com transparência e objetividade.'},
    {nome:'Inovação',           tipo:'Comportamental', desc:'Propor e implementar novas ideias, gerando impacto positivo.'},
  ],

  // ─── PERFIS POR GRUPO OCUPACIONAL ─────────────────────────
  perfis: [

    // ────────────────────────────────
    // ASSISTENTE
    // ────────────────────────────────
    {
      id: 'assistente',
      cargo: 'Assistente de Laboratório',
      niveis: ['Assistente','Assistente I','Assistente II','Assistente III','Estagiário'],
      escolaridade: {basica:'Ensino Médio Completo', excelencia:'Ensino Superior Completo — Engenharias, Física, Química, Farmácia'},
      escopo: [
        'Executar atividades específicas de cunho técnico na área de atuação, realizando manutenções, avaliações e pareceres técnicos e controles.',
        'Honrar compromissos assumidos com parceiros da instituição.',
        'Atuar na implementação e manutenção dos processos relacionados à área de atuação, propondo melhorias.',
        'Ser referência para a equipe em relação ao alinhamento à missão, valores e cultura organizacional.',
      ],
      entregas: [
        'Executar os ensaios de avaliação da conformidade sob sua responsabilidade.',
        'Elaborar relatórios de avaliação da conformidade de ensaios sob sua responsabilidade.',
        'Propor e implementar melhorias nos processos de ensaios, bem como nas rotinas de trabalho.',
        'Apoiar o desenvolvimento de projetos e estudos técnicos para o laboratório.',
        'Contatar clientes e fornecedores para esclarecimentos técnicos, com conhecimento da coordenação.',
        'Estimar incertezas de medição, conforme requisitos normativos aplicáveis.',
      ],
      compGrupo: [
        {nome:'Assertividade',            tipo:'Comportamental', desc:'Agir com determinação e segurança, prestando serviços e informações com exatidão e esmero.'},
        {nome:'Capacidade de Realização', tipo:'Comportamental', desc:'Seguir orientações e contribuir para realização de tarefas e objetivos.'},
        {nome:'Multiplicador de Boas Práticas', tipo:'Comportamental', desc:'Transmitir e compartilhar conhecimentos e informações de forma clara, orientando pessoas na realização das atividades.'},
        {nome:'Organização',              tipo:'Comportamental', desc:'Organizar e sistematizar o próprio trabalho, identificando métodos que assegurem a continuidade do processo.'},
      ],
      compEspecificas: [
        {nome:'Aplicativos Office',                tipo:'Técnica', desc:'Criar e atualizar documentos em Word, Excel, PowerPoint etc.'},
        {nome:'Excel Avançado',                    tipo:'Técnica', desc:''},
        {nome:'Inglês Técnico',                    tipo:'Técnica', desc:'Ler, escrever e falar o idioma em nível técnico.'},
        {nome:'Sistemas de Gestão de Laboratórios',tipo:'Técnica', desc:''},
        {nome:'ISO/IEC 17025:2017',                tipo:'Técnica', desc:'Conhecer e aplicar os requisitos da norma de acreditação de laboratórios.'},
        {nome:'Ensaios da Área de Atuação',        tipo:'Técnica', desc:'Dominar os ensaios técnicos específicos da sua área (EMC, RF, Redes Móveis, Baterias etc.).'},
      ],
    },

    // ────────────────────────────────
    // ANALISTA
    // ────────────────────────────────
    {
      id: 'analista',
      cargo: 'Analista de Laboratório',
      niveis: ['Analista I','Analista II','Analista III'],
      escolaridade: {basica:'Ensino Superior Completo — Engenharias, Física, Química, Farmácia', excelencia:'Pós-Graduação Completa — Engenharias, Física, Química, Farmácia, Negócios'},
      escopo: [
        'Gerar e analisar informações e dados de processos, subsidiando a tomada de decisão.',
        'Conduzir e responder tecnicamente pelos processos e ferramentas da sua área de atuação.',
        'Estabelecer relações com parceiros internos ou externos, zelando pela reputação e imagem institucional.',
        'Sugerir e implementar melhorias nos processos e ferramentas da sua área de atuação.',
        'Desenvolver análises e estudos técnicos, gerando recomendações.',
        'Orientar tecnicamente a condução de processos de sua responsabilidade.',
        'Comprometer-se com a disseminação da missão, valores e cultura organizacional.',
      ],
      entregas: [
        'Assegurar permanentemente a conformidade das atividades do laboratório à norma NBR ISO/IEC 17025:2017.',
        'Aprovar relatórios de ensaios como signatário autorizado.',
        'Controlar o cumprimento de prazos acordados junto a clientes internos e externos.',
        'Desenvolver projetos e estudos técnicos para o laboratório.',
        'Propor e implementar atualizações e extensões de escopo do laboratório.',
        'Propor e implementar melhorias nos processos de ensaios e nas rotinas de trabalho.',
        'Desenvolver novos métodos de ensaios.',
        'Validar métodos de ensaios, conforme requisitos normativos aplicáveis.',
        'Estimar incertezas de medição, conforme requisitos normativos aplicáveis.',
      ],
      compGrupo: [
        {nome:'Agente de Mudança',       tipo:'Comportamental', desc:'Comunicar os benefícios das mudanças e aprimorar a qualificação de processos para atuar no novo cenário.'},
        {nome:'Capacidade Analítica',    tipo:'Comportamental', desc:'Analisar situações e informações, discriminando e interpretando os fatores de maneira imparcial, realizando avaliação crítica e conclusiva.'},
        {nome:'Foco em Melhoria Contínua',tipo:'Comportamental',desc:'Antecipar-se a situações-problema, sugerindo e implementando melhorias nos processos para aumentar resultados e satisfação dos parceiros.'},
        {nome:'Planejamento',            tipo:'Comportamental', desc:'Elaborar e executar planos, definindo metodologias e recursos, distribuindo prazos e tarefas, acompanhando a execução e avaliando resultados.'},
      ],
      compEspecificas: [
        {nome:'Aplicativos Office',                tipo:'Técnica', desc:'Criar e atualizar documentos em Word, Excel, PowerPoint etc.'},
        {nome:'Avaliação da Conformidade',         tipo:'Técnica', desc:''},
        {nome:'Excel Avançado',                    tipo:'Técnica', desc:''},
        {nome:'Gestão de Projetos',                tipo:'Técnica', desc:'Acompanhar, executar e controlar as etapas de um projeto utilizando técnicas de gerenciamento.'},
        {nome:'Inglês Intermediário',              tipo:'Técnica', desc:'Compreender e responder solicitações escritas e manter conversações coloquiais no idioma.'},
        {nome:'Sistemas de Gestão de Laboratórios',tipo:'Técnica', desc:''},
        {nome:'ISO/IEC 17025:2017',                tipo:'Técnica', desc:'Dominar os requisitos da norma e aplicar como signatário e responsável técnico.'},
        {nome:'Ensaios da Área de Atuação',        tipo:'Técnica', desc:'Dominar e liderar os ensaios técnicos específicos da sua área, incluindo validação e estimativa de incertezas.'},
      ],
    },

    // ────────────────────────────────
    // ESPECIALISTA / COORDENADOR
    // ────────────────────────────────
    {
      id: 'especialista',
      cargo: 'Especialista / Coordenador',
      niveis: ['Especialista','Coordenador','Gerente'],
      escolaridade: {basica:'Pós-Graduação Completa — Engenharias, Física, Química', excelencia:'Doutorado ou MBA — Engenharias, Física, Química, Negócios'},
      escopo: [
        'Definir diretrizes técnicas e estratégicas para o laboratório.',
        'Garantir a acreditação e conformidade plena com requisitos normativos e regulatórios.',
        'Representar o laboratório perante clientes, órgãos regulatórios e auditores externos.',
        'Desenvolver e reter talentos, promovendo cultura de excelência técnica.',
        'Gerir recursos, prazos e prioridades com visão sistêmica.',
        'Responder pela missão, valores e resultados globais do laboratório.',
      ],
      entregas: [
        'Garantir plena conformidade com a norma NBR ISO/IEC 17025:2017 em todos os processos.',
        'Coordenar e aprovar como signatário sênior os relatórios críticos de ensaio.',
        'Liderar processos de acreditação, extensão de escopo e auditorias externas.',
        'Definir estratégias de desenvolvimento técnico e de novos serviços.',
        'Gerir e desenvolver a equipe, garantindo capacitação e sucessão.',
        'Aprovar métodos novos, validações e estimativas de incerteza.',
        'Representar o laboratório em fóruns técnicos e junto a organismos regulatórios.',
        'Gerir indicadores de desempenho e reportar resultados à direção.',
      ],
      compGrupo: [
        {nome:'Visão Estratégica',        tipo:'Comportamental', desc:'Antecipar tendências e definir rumos de longo prazo para o laboratório.'},
        {nome:'Desenvolvimento de Pessoas',tipo:'Comportamental',desc:'Identificar potenciais, promover crescimento e construir times de alta performance.'},
        {nome:'Tomada de Decisão',        tipo:'Comportamental', desc:'Decidir com embasamento técnico e visão de risco, mesmo sob pressão e ambiguidade.'},
        {nome:'Gestão de Stakeholders',   tipo:'Comportamental', desc:'Construir e manter relacionamentos estratégicos com clientes, parceiros e reguladores.'},
        {nome:'Foco em Resultados',       tipo:'Comportamental', desc:'Mobilizar equipes para atingir e superar metas, mantendo qualidade e conformidade.'},
      ],
      compEspecificas: [
        {nome:'ISO/IEC 17025:2017 — Nível Avançado', tipo:'Técnica', desc:'Domínio completo da norma; condução de auditorias e renovação de acreditação.'},
        {nome:'Gestão de Projetos Avançada',         tipo:'Técnica', desc:'Liderar projetos complexos, multidisciplinares e de longo prazo.'},
        {nome:'Estatística e Metrologia',            tipo:'Técnica', desc:'Dominar incertezas de medição, rastreabilidade e análise estatística de dados.'},
        {nome:'Ensaios da Área — Nível Especialista',tipo:'Técnica', desc:'Maior autoridade técnica em EMC, RF, Redes Móveis ou área específica.'},
        {nome:'Inglês Avançado',                     tipo:'Técnica', desc:'Comunicação fluente para interação com clientes internacionais e normas estrangeiras.'},
        {nome:'Sistemas de Gestão de Laboratórios',  tipo:'Técnica', desc:''},
      ],
    },
  ],
};

function getMatrizCompetencias(){
  const saved=ls('matriz_comp_v1',null);
  return saved||MATRIZ_COMPETENCIAS;
}
function saveMatrizCompetencias(m){lss('matriz_comp_v1',m);if(typeof agendarSync==='function')agendarSync();}

function renderCompetencias(){
  const mc=getMatrizCompetencias();
  const perfis = mc.perfis;
  const essenciais = mc.essenciais;
  const sel = window._compSel || (perfis[0]?perfis[0].id:'assistente');
  const perfil = perfis.find(p=>p.id===sel)||perfis[0];
  if(!perfil) return '<div class="card" style="text-align:center;padding:40px"><div style="font-size:40px;margin-bottom:8px">📋</div><div style="font-size:14px;font-weight:600">Nenhum perfil de competências cadastrado</div><div style="font-size:12px;color:var(--txt3);margin-top:6px">Clique em "🤖 Criar com IA" pra gerar uma matriz completa.</div><br><button class="btn btn-primary" onclick="abrirCompetenciasIA()">🤖 Criar com IA</button></div>';

  // Categorias selecionáveis
  var categorias=[
    {key:'essenciais',label:'Essenciais',cor:'#534AB7',emoji:'💎'},
    {key:'grupo',label:'Grupo Ocupacional',cor:'#185FA5',emoji:'🏆'},
    {key:'especificas',label:'Específicas',cor:'#0F6E56',emoji:'🔧'},
    {key:'escolaridade',label:'Escolaridade',cor:'#854F0B',emoji:'📚'},
    {key:'escopo',label:'Escopo',cor:'#3B6D11',emoji:'🎯'},
    {key:'entregas',label:'Entregas',cor:'#A32D2D',emoji:'📦'},
  ];
  var ativas=ls('comp_categorias_ativas',['essenciais','grupo','especificas','escolaridade','escopo','entregas']);

  function tipoBadge(tipo){
    const cor = tipo==='Técnica'?'#185FA5':'#534AB7';
    const bg  = tipo==='Técnica'?'#E6F1FB':'#EEEDFE';
    return '<span style="font-size:9px;font-weight:700;padding:1px 7px;border-radius:20px;background:'+bg+';color:'+cor+'">'+tipo+'</span>';
  }
  function compCard(c){
    return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px">'
      +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">'
        +'<span style="font-size:12px;font-weight:700;color:var(--txt)">'+c.nome+'</span>'
        +tipoBadge(c.tipo)
      +'</div>'
      +(c.desc?'<div style="font-size:11px;color:var(--txt2);line-height:1.5">'+c.desc+'</div>':'')
    +'</div>';
  }

  // Bolhas de categorias
  var secoesHtml='';

  if(ativas.indexOf('escolaridade')>=0){
    var escExiste=perfil.escolaridade&&perfil.escolaridade.basica&&perfil.escolaridade.basica!=='—';
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#854F0B;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #854F0B">📚 Escolaridade</div>'
      +(escExiste?'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'
        +'<div style="background:var(--bg2);border-radius:8px;padding:12px"><div style="font-size:9px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Básica</div><div style="font-size:12px;color:var(--txt)">'+perfil.escolaridade.basica+'</div></div>'
        +'<div style="background:var(--green-bg);border-radius:8px;padding:12px"><div style="font-size:9px;font-weight:700;color:var(--green2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Excelência</div><div style="font-size:12px;color:var(--txt)">'+perfil.escolaridade.excelencia+'</div></div>'
      +'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem dados. Use "✏️ Editar" ou "🤖 Criar com IA".</div>')
    +'</div>';
  }
  if(ativas.indexOf('escopo')>=0){
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#3B6D11;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #3B6D11">🎯 Escopo do Grupo Ocupacional</div>'
      +(perfil.escopo&&perfil.escopo.length?'<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">'+perfil.escopo.map(function(e){return '<li style="font-size:12px;color:var(--txt);line-height:1.5">'+e+'</li>';}).join('')+'</ul>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem dados.</div>')
    +'</div>';
  }
  if(ativas.indexOf('entregas')>=0){
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#A32D2D;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #A32D2D">📦 Entregas do Cargo</div>'
      +(perfil.entregas&&perfil.entregas.length?'<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">'+perfil.entregas.map(function(e){return '<li style="font-size:12px;color:var(--txt);line-height:1.5">'+e+'</li>';}).join('')+'</ul>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem dados.</div>')
    +'</div>';
  }
  if(ativas.indexOf('essenciais')>=0){
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#534AB7;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #534AB7">💎 Competências Essenciais <span style="font-size:10px;color:var(--txt3);font-weight:400">(todos os cargos)</span></div>'
      +(essenciais&&essenciais.length?'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px">'+essenciais.map(function(c){return compCard(c);}).join('')+'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem competências essenciais. Use "🤖 Criar com IA".</div>')
    +'</div>';
  }
  if(ativas.indexOf('grupo')>=0){
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#185FA5;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #185FA5">🏆 Competências do Grupo Ocupacional</div>'
      +(perfil.compGrupo&&perfil.compGrupo.length?'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px">'+perfil.compGrupo.map(function(c){return compCard(c);}).join('')+'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem competências do grupo.</div>')
    +'</div>';
  }
  if(ativas.indexOf('especificas')>=0){
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:#0F6E56;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #0F6E56">🔧 Competências Específicas</div>'
      +(perfil.compEspecificas&&perfil.compEspecificas.length?'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px">'+perfil.compEspecificas.map(function(c){return compCard(c);}).join('')+'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem competências específicas.</div>')
    +'</div>';
  }

  // Categorias customizadas
  var customCats=ls('comp_custom_categorias',[]);
  customCats.forEach(function(cc){
    if(ativas.indexOf(cc.key)<0)return;
    var items=(perfil[cc.key]||mc[cc.key]||[]);
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:'+(cc.cor||'#888')+';margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid '+(cc.cor||'#888')+'">'+cc.label+'</div>'
      +(items.length?'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px">'+items.map(function(c){return compCard(c);}).join('')+'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem dados. Use "✏️ Editar".</div>')
    +'</div>';
  });

  // Categorias customizadas
  var customCats=ls('comp_custom_categorias',[]);
  customCats.forEach(function(cc){
    if(ativas.indexOf(cc.key)<0) return;
    var items=perfil[cc.key]||[];
    secoesHtml+='<div class="card" style="padding:16px;margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:'+(cc.cor||'#888')+';margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid '+(cc.cor||'#888')+'">'+cc.label+'</div>'
      +(items.length?'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px">'+items.map(function(c){return compCard(c);}).join('')+'</div>':'<div style="text-align:center;padding:14px;color:var(--txt3);font-size:12px">Sem dados. Use "✏️ Editar" pra adicionar.</div>')
    +'</div>';
  });

  var niveisHtml='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">'
    +perfil.niveis.map(function(n){var ns=NIVEL_STYLE[n]||{cor:'#888',bg:'#eee'};return '<span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:'+ns.bg+';color:'+ns.cor+'">'+n+'</span>';}).join('')
  +'</div>';

  return '<div>'
    // Card header com botões
    +'<div class="card" style="padding:16px;margin-bottom:12px">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'
        +'<div style="font-size:12px;color:var(--txt3)">'+ativas.length+' seções ativas · '+perfis.length+' cargos · <span style="color:var(--txt2);cursor:pointer;text-decoration:underline" onclick="editarCompetencias()">Editar seções visíveis</span></div>'
        +'<div style="display:flex;gap:8px">'
          +'<button class="btn btn-sm" onclick="abrirCompetenciasIA()" style="border-color:#534AB7;color:#534AB7">🤖 Criar com IA</button>'
          +'<button class="btn btn-sm" onclick="editarCompetencias()" style="border-color:#854F0B;color:#854F0B">✏️ Editar</button>'
          +'<button class="btn btn-sm" data-perfil="'+perfil.id+'" onclick="exportarPDFCompetencias(this.dataset.perfil)" style="border-color:#185FA5;color:#185FA5">📄 PDF</button>'
        +'</div>'
      +'</div>'
    +'</div>'
    // Tabs de perfil com drag-and-drop
    +'<div id="comp-tabs-sortable" style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;margin-bottom:14px;width:fit-content">'
      +perfis.map(function(p,pi){return '<div draggable="true" ondragstart="compDragStart(event,'+pi+')" ondragover="event.preventDefault()" ondrop="compDrop(event,'+pi+')" onclick="window._compSel=\''+p.id+'\';render(\'competencias\')" '
        +'style="padding:8px 18px;border-left:0.5px solid var(--border2);font-size:12.5px;font-weight:600;cursor:grab;user-select:none;'
        +'background:'+(p.id===sel?'var(--green)':'var(--bg2)')+';color:'+(p.id===sel?'#fff':'var(--txt2)')+';transition:all .15s">'
        +p.cargo+'</div>';}).join('')
    +'</div>'
    +'<div style="font-size:16px;font-weight:800;color:var(--txt);margin-bottom:4px">'+perfil.cargo+'</div>'
    +'<div style="font-size:11px;color:var(--txt3);margin-bottom:8px">Níveis aplicáveis:</div>'
    +niveisHtml
    +secoesHtml
  +'</div>';
}

// Drag-and-drop dos perfis
var _compDragIdx=null;
function compDragStart(e,idx){_compDragIdx=idx;e.dataTransfer.effectAllowed='move';}
function compDrop(e,toIdx){
  e.preventDefault();
  if(_compDragIdx===null||_compDragIdx===toIdx)return;
  var mc=JSON.parse(JSON.stringify(getMatrizCompetencias()));
  var item=mc.perfis.splice(_compDragIdx,1)[0];
  mc.perfis.splice(toIdx,0,item);
  saveMatrizCompetencias(mc);
  _compDragIdx=null;
  render('competencias');
}

// Toggle categoria de competências
function toggleCategComp(key){
  var ativas=ls('comp_categorias_ativas',['essenciais','grupo','especificas','escolaridade','escopo','entregas']);
  var idx=ativas.indexOf(key);
  if(idx>=0)ativas.splice(idx,1);else ativas.push(key);
  lss('comp_categorias_ativas',ativas);
  render('competencias');
}

// Criar Competências com IA
function abrirCompetenciasIA(){
  var perfis=(getMatrizCompetencias()||{}).perfis||[];
  var niveisDisp=niveis.sort(function(a,b){return a.ordem-b.ordem;}).map(function(n){return n.nome;});

  var html='<div style="font-size:14px;font-weight:700;margin-bottom:8px">Gerar Matriz de Competências com IA</div>'
    +'<div style="font-size:12px;color:var(--txt3);margin-bottom:14px">A IA vai criar perfis de competências com escolaridade, escopo, entregas e competências técnicas/comportamentais.</div>';

  // Selecionar o que gerar
  var opcoes=[
    {key:'essenciais',label:'Competências Essenciais',emoji:'💎'},
    {key:'grupo',label:'Competências do Grupo',emoji:'🏆'},
    {key:'especificas',label:'Competências Específicas',emoji:'🔧'},
    {key:'escolaridade',label:'Escolaridade exigida',emoji:'📚'},
    {key:'escopo',label:'Escopo do cargo',emoji:'🎯'},
    {key:'entregas',label:'Entregas esperadas',emoji:'📦'},
  ];
  html+='<div style="font-size:12px;font-weight:600;margin-bottom:6px">O que gerar:</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">';
  opcoes.forEach(function(o){
    html+='<button onclick="this.classList.toggle(\'cp-ia-sel\');this.style.borderColor=this.classList.contains(\'cp-ia-sel\')?\'#534AB7\':\'#E0E2E0\';this.style.background=this.classList.contains(\'cp-ia-sel\')?\'#F3F0FF\':\'#fff\';this.style.fontWeight=this.classList.contains(\'cp-ia-sel\')?\'700\':\'400\'" class="cp-ia-opt cp-ia-sel" data-key="'+o.key+'" style="display:flex;align-items:center;gap:5px;padding:6px 12px;border:1.5px solid #534AB7;border-radius:16px;background:#F3F0FF;font-size:11px;color:#3A4240;cursor:pointer;font-family:inherit;font-weight:700;transition:all .15s">'
      +o.emoji+' '+o.label+'</button>';
  });
  html+='</div>';

  // Perfis/cargos
  html+='<div style="font-size:12px;font-weight:600;margin-bottom:6px">Cargos/perfis para gerar:</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">';
  if(niveisDisp.length>0){
    niveisDisp.forEach(function(n){
      html+='<button onclick="this.classList.toggle(\'cp-ia-nv\');this.style.borderColor=this.classList.contains(\'cp-ia-nv\')?\'#0F6E56\':\'#E0E2E0\';this.style.background=this.classList.contains(\'cp-ia-nv\')?\'#E1F5EE\':\'#fff\';this.style.fontWeight=this.classList.contains(\'cp-ia-nv\')?\'700\':\'400\'" class="cp-ia-nivel cp-ia-nv" data-nivel="'+n+'" style="padding:6px 12px;border:1.5px solid #0F6E56;border-radius:16px;background:#E1F5EE;font-size:11px;color:#3A4240;cursor:pointer;font-family:inherit;font-weight:700;transition:all .15s">'+n+'</button>';
    });
  }
  html+='</div>';

  // Contexto
  html+='<div style="font-size:12px;font-weight:600;margin-bottom:6px">Contexto (setor, tipo de empresa, foco):</div>'
    +'<textarea id="cp-ia-contexto" placeholder="Ex: Laboratório de ensaios elétricos, foco em qualidade e acreditação ISO 17025" style="width:100%;min-height:60px;padding:10px 12px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical;box-sizing:border-box;background:var(--bg);color:var(--txt)"></textarea>'
    +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">'
      +'<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
      +'<button class="btn btn-primary" onclick="gerarCompetenciasIA()" style="background:#534AB7;border-color:#534AB7">🤖 Gerar</button>'
    +'</div>';

  document.getElementById('modal-title').textContent='🤖 Criar Competências com IA';
  document.getElementById('modal-box').classList.remove('modal-lg');
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

async function gerarCompetenciasIA(){
  var selecionados=[];
  document.querySelectorAll('.cp-ia-opt.cp-ia-sel').forEach(function(b){selecionados.push(b.dataset.key);});
  var niveisEscolhidos=[];
  document.querySelectorAll('.cp-ia-nivel.cp-ia-nv').forEach(function(b){niveisEscolhidos.push(b.dataset.nivel);});
  var contexto=((document.getElementById('cp-ia-contexto')||{}).value||'').trim();
  if(!niveisEscolhidos.length){toast('Selecione pelo menos um cargo/nível');return;}
  if(!contexto){toast('Descreva o contexto');return;}

  closeModal();
  toast('🤖 Gerando competências... pode levar até 30s por cargo');

  var mc=getMatrizCompetencias()||{perfis:[],essenciais:[]};

  for(var ni=0;ni<niveisEscolhidos.length;ni++){
    var nivel=niveisEscolhidos[ni];

    var prompt='Você é especialista em RH e gestão de competências no Brasil.\n'
      +'Gere uma matriz de competências COMPLETA para o cargo "'+nivel+'".\n'
      +'Contexto: '+contexto+'\n\n'
      +'Retorne um JSON com TODAS essas chaves:\n'
      +'{\n'
      +'  "escolaridade": {"basica": "formação mínima", "excelencia": "formação ideal"},\n'
      +'  "escopo": ["responsabilidade 1", "responsabilidade 2", "responsabilidade 3", "responsabilidade 4"],\n'
      +'  "entregas": ["entrega 1", "entrega 2", "entrega 3"],\n'
      +'  "essenciais": [{"nome": "nome", "tipo": "Comportamental", "desc": "descrição curta"}],\n'
      +'  "compGrupo": [{"nome": "nome", "tipo": "Técnica", "desc": "descrição curta"}],\n'
      +'  "compEspecificas": [{"nome": "nome", "tipo": "Técnica", "desc": "descrição curta"}]\n'
      +'}\n\n'
      +'REGRAS IMPORTANTES:\n'
      +'- essenciais: gere EXATAMENTE 4 competências COMPORTAMENTAIS\n'
      +'- compGrupo: gere EXATAMENTE 4 competências do grupo (mix técnica/comportamental)\n'
      +'- compEspecificas: gere EXATAMENTE 4 competências TÉCNICAS do cargo\n'
      +'- tipo deve ser EXATAMENTE "Técnica" ou "Comportamental"\n'
      +'- escopo: EXATAMENTE 4 itens\n'
      +'- entregas: EXATAMENTE 3 itens\n'
      +'- Português brasileiro\n'
      +'- APENAS JSON. Sem markdown. Sem backticks. Sem texto.';

    try{
      var token=squadoGetToken();
      var r=await fetch(SQUADO_API+'/api/ai/chat',{
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
        body:JSON.stringify({messages:[
          {role:'system',content:'Responda SOMENTE com JSON válido. Proibido usar markdown ou backticks. Proibido texto fora do JSON.'},
          {role:'user',content:prompt}
        ],max_tokens:2000})
      });
      var d=await r.json();
      var resposta=(d.content||'').replace(/```json/g,'').replace(/```/g,'').trim();
      var jsonMatch=resposta.match(/\{[\s\S]*\}/);
      if(!jsonMatch){console.error('Sem JSON para '+nivel);continue;}
      var gerado=JSON.parse(jsonMatch[0]);

      var perfilId=nivel.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
      var perfilExistente=mc.perfis.find(function(p){return p.id===perfilId||p.cargo===nivel;});
      
      if(perfilExistente){
        if(gerado.escolaridade)perfilExistente.escolaridade=gerado.escolaridade;
        if(gerado.escopo)perfilExistente.escopo=gerado.escopo;
        if(gerado.entregas)perfilExistente.entregas=gerado.entregas;
        if(gerado.compGrupo)perfilExistente.compGrupo=gerado.compGrupo;
        if(gerado.compEspecificas)perfilExistente.compEspecificas=gerado.compEspecificas;
      } else {
        mc.perfis.push({
          id:perfilId,cargo:nivel,niveis:[nivel],
          escolaridade:gerado.escolaridade||{basica:'a definir',excelencia:'a definir'},
          escopo:gerado.escopo||[],entregas:gerado.entregas||[],
          compGrupo:gerado.compGrupo||[],compEspecificas:gerado.compEspecificas||[]
        });
      }
      if(gerado.essenciais&&gerado.essenciais.length){
        gerado.essenciais.forEach(function(e){
          if(!mc.essenciais.find(function(x){return x.nome===e.nome;})) mc.essenciais.push(e);
        });
      }
      toast('✅ '+nivel+' gerado!');
    }catch(e){
      console.error('Erro IA comp '+nivel+':',e);
      toast('⚠️ Erro em '+nivel);
    }
  }

  saveMatrizCompetencias(mc);
  var primeiroPerfil=mc.perfis.find(function(p){
    return niveisEscolhidos.some(function(n){return p.cargo===n||p.id===n.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');});
  });
  if(primeiroPerfil) window._compSel=primeiroPerfil.id;
  toast('✅ Todas as competências geradas!');
  render('competencias');
}


// ─── Editar Matriz de Competências ──────────────────────
function editarCompetencias(){
  const mc=getMatrizCompetencias();
  const sel=window._compSel||'assistente';
  const perfil=mc.perfis.find(p=>p.id===sel)||mc.perfis[0];

  document.getElementById('modal-title').textContent='Editar Competências · '+perfil.cargo;
  document.getElementById('modal-box').classList.add('modal-lg');

  // Categorias ativas
  var ativas=ls('comp_categorias_ativas',['essenciais','grupo','especificas','escolaridade','escopo','entregas']);
  var categorias=[
    {key:'essenciais',label:'💎 Essenciais',cor:'#534AB7'},
    {key:'grupo',label:'🏆 Grupo Ocupacional',cor:'#185FA5'},
    {key:'especificas',label:'🔧 Específicas',cor:'#0F6E56'},
    {key:'escolaridade',label:'📚 Escolaridade',cor:'#854F0B'},
    {key:'escopo',label:'🎯 Escopo',cor:'#3B6D11'},
    {key:'entregas',label:'📦 Entregas',cor:'#A32D2D'},
  ];
  // Categorias customizadas
  var customCats=ls('comp_custom_categorias',[]);
  customCats.forEach(function(cc){categorias.push({key:cc.key,label:cc.label,cor:cc.cor||'#888',custom:true});});

  var bolhasEdit='<div style="margin-bottom:14px;padding:12px;background:var(--bg2);border-radius:10px">'
    +'<div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:8px">Seções a exibir:</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:6px">';
  categorias.forEach(function(cat){
    var isAtiva=ativas.indexOf(cat.key)>=0;
    bolhasEdit+='<button onclick="toggleCategCompEdit(\''+cat.key+'\',this)" style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:16px;border:2px solid '+(isAtiva?cat.cor:'var(--border)')+';background:'+(isAtiva?cat.cor+'15':'var(--bg)')+';color:'+(isAtiva?cat.cor:'var(--txt3)')+';font-size:11px;font-weight:'+(isAtiva?'700':'400')+';cursor:pointer;font-family:inherit;transition:all .15s">'
      +(isAtiva?'✓ ':'')+cat.label
      +(cat.custom?'<span onclick="event.stopPropagation();removerCatCustom(\''+cat.key+'\')" style="margin-left:4px;color:#A32D2D;font-weight:700" title="Remover">×</span>':'')
    +'</button>';
  });
  bolhasEdit+='<button onclick="adicionarCatCustom()" style="padding:6px 12px;border-radius:16px;border:2px dashed var(--border);background:var(--bg);color:var(--txt3);font-size:11px;cursor:pointer;font-family:inherit">+ Outro</button>'
  +'</div></div>';

  // Helper: seção de competências (nome + tipo + desc)
  function secaoHtml(titulo,cor,itens,dataKey){
    return '<div style="margin-bottom:14px;padding:12px;background:'+cor+'08;border-radius:10px;border:1px solid '+cor+'20">'
      +'<div style="font-size:12px;font-weight:700;color:'+cor+';margin-bottom:8px">'+titulo+'</div>'
      +'<div id="comp-edit-'+dataKey+'" style="display:flex;flex-direction:column;gap:6px">'
        +itens.map((c,i)=>'<div style="display:grid;grid-template-columns:2fr 1fr 2fr auto;gap:6px;align-items:center">'
          +'<input value="'+c.nome.replace(/"/g,'&quot;')+'" data-sec="'+dataKey+'" data-idx="'+i+'" data-field="nome" placeholder="Nome" style="font-size:12px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/>'
          +'<select data-sec="'+dataKey+'" data-idx="'+i+'" data-field="tipo" style="font-size:11px;padding:6px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)">'
            +'<option'+(c.tipo==='Comportamental'?' selected':'')+'>Comportamental</option>'
            +'<option'+(c.tipo==='Técnica'?' selected':'')+'>Técnica</option>'
          +'</select>'
          +'<input value="'+(c.desc||'').replace(/"/g,'&quot;')+'" data-sec="'+dataKey+'" data-idx="'+i+'" data-field="desc" placeholder="Descrição (opcional)" style="font-size:11px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/>'
          +'<button onclick="this.closest(\'div[style*=grid]\').remove()" style="border:none;background:#FCEBEB;color:#A32D2D;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:14px">×</button>'
        +'</div>').join('')
      +'</div>'
      +'<button onclick="adicionarItemComp(\''+dataKey+'\')" style="margin-top:6px;padding:4px 12px;border:1px dashed '+cor+';border-radius:6px;background:transparent;color:'+cor+';font-size:11px;cursor:pointer;font-family:inherit">+ Adicionar competência</button>'
    +'</div>';
  }

  // Helper: lista de textos simples
  function listaHtml(titulo,cor,itens,dataKey,placeholder){
    return '<div style="margin-bottom:14px;padding:12px;background:'+cor+'08;border-radius:10px;border:1px solid '+cor+'20">'
      +'<div style="font-size:12px;font-weight:700;color:'+cor+';margin-bottom:8px">'+titulo+'</div>'
      +'<div id="comp-edit-'+dataKey+'" style="display:flex;flex-direction:column;gap:6px">'
        +(itens||[]).map((t,i)=>'<div style="display:flex;gap:6px;align-items:center">'
          +'<input value="'+(t||'').replace(/"/g,'&quot;')+'" data-lista="'+dataKey+'" style="font-size:12px;flex:1;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)" placeholder="'+placeholder+'"/>'
          +'<button onclick="this.parentElement.remove()" style="border:none;background:#FCEBEB;color:#A32D2D;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:14px">×</button>'
        +'</div>').join('')
      +'</div>'
      +'<button onclick="adicionarItemLista(\''+dataKey+'\',\''+placeholder+'\')" style="margin-top:6px;padding:4px 12px;border:1px dashed '+cor+';border-radius:6px;background:transparent;color:'+cor+';font-size:11px;cursor:pointer;font-family:inherit">+ Adicionar item</button>'
    +'</div>';
  }

  // Tabs dos perfis
  var tabsHtml='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">';
  mc.perfis.forEach(function(p){
    var active=p.id===sel?'background:var(--primary);color:#fff':'background:var(--bg2);color:var(--txt)';
    tabsHtml+='<button class="btn btn-xs" style="'+active+'" onclick="window._compSel=\''+p.id+'\';editarCompetencias()">'+p.cargo+'</button>';
  });
  tabsHtml+='<button class="btn btn-xs" style="background:#E1F5EE;color:#0F6E56" onclick="criarNovoPerfil()">+ Novo Perfil</button></div>';

  // Adicionar seções customizadas ao editar
  var customCatsEdit=ls('comp_custom_categorias',[]);
  var customSecoes='';
  customCatsEdit.forEach(function(cc){
    customSecoes+='<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      +secaoHtml(cc.label,cc.cor,perfil[cc.key]||mc[cc.key]||[],cc.key);
  });
  
  document.getElementById('modal-body').innerHTML=
    '<div style="max-height:65vh;overflow-y:auto;padding-right:4px">'
      +bolhasEdit
      +tabsHtml
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">Dados do Perfil</div>'
      +'<div style="margin-bottom:14px"><div class="field-label">Nome do Cargo</div><input id="comp-edit-cargo" value="'+perfil.cargo.replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/></div>'
      +'<div style="margin-bottom:14px"><div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">ESCOLARIDADE</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
          +'<div><div class="field-label">Basica</div><input id="comp-edit-esc-basica" value="'+(perfil.escolaridade&&perfil.escolaridade.basica||'').replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/></div>'
          +'<div><div class="field-label">Excelencia</div><input id="comp-edit-esc-excelencia" value="'+(perfil.escolaridade&&perfil.escolaridade.excelencia||'').replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/></div>'
        +'</div></div>'
      +listaHtml('📊 Níveis Aplicáveis','#854F0B',perfil.niveis,'niveis','Ex: Assistente I')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      +listaHtml('🎯 Escopo do Grupo','#3B6D11',perfil.escopo,'escopo','Descreva uma responsabilidade')
      +listaHtml('📦 Entregas do Cargo','#A32D2D',perfil.entregas,'entregas','Descreva uma entrega esperada')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      +secaoHtml('💎 Competências Essenciais (todos os cargos)','#534AB7',mc.essenciais,'essenciais')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      +secaoHtml('🏆 Competências do Grupo — '+perfil.cargo,'#185FA5',perfil.compGrupo||[],'compGrupo')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      +secaoHtml('🔧 Competências Específicas — '+perfil.cargo,'#0F6E56',perfil.compEspecificas||[],'compEspecificas')
      +customSecoes
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +(mc.perfis.length>1?'<button class="btn btn-sm" style="border-color:#DC2626;color:#DC2626" onclick="excluirPerfilComp(\''+sel+'\')">Excluir Perfil</button>':'<div></div>')
      +'<div style="display:flex;gap:8px"><button class="btn btn-sm" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="salvarEdicaoCompetencias(\''+sel+'\')">Salvar</button></div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

// Toggle categoria dentro do editar
function toggleCategCompEdit(key,btn){
  var ativas=ls('comp_categorias_ativas',['essenciais','grupo','especificas','escolaridade','escopo','entregas']);
  var idx=ativas.indexOf(key);
  if(idx>=0)ativas.splice(idx,1);else ativas.push(key);
  lss('comp_categorias_ativas',ativas);
  // Re-renderizar o editar pra refletir a mudança
  editarCompetencias();
}

// Adicionar categoria customizada "Outro"
function adicionarCatCustom(){
  var nome=prompt('Nome da nova seção:');
  if(!nome||!nome.trim())return;
  nome=nome.trim();
  var customs=ls('comp_custom_categorias',[]);
  var key='custom_'+nome.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
  if(customs.find(function(c){return c.key===key;})){toast('Já existe');return;}
  var cores=['#0891B2','#9333EA','#D97706','#059669','#DC2626','#7C3AED'];
  var cor=cores[customs.length%cores.length];
  customs.push({key:key,label:nome,cor:cor});
  lss('comp_custom_categorias',customs);
  // Ativar a nova categoria
  var ativas=ls('comp_categorias_ativas',[]);
  ativas.push(key);
  lss('comp_categorias_ativas',ativas);
  toast('✅ Seção "'+nome+'" adicionada!');
  editarCompetencias();
}

// Remover categoria customizada
function removerCatCustom(key){
  if(!confirm('Remover esta seção?'))return;
  var customs=ls('comp_custom_categorias',[]);
  customs=customs.filter(function(c){return c.key!==key;});
  lss('comp_custom_categorias',customs);
  var ativas=ls('comp_categorias_ativas',[]);
  ativas=ativas.filter(function(k){return k!==key;});
  lss('comp_categorias_ativas',ativas);
  toast('Seção removida');
  editarCompetencias();
}

function adicionarItemComp(dataKey){
  var container=document.getElementById('comp-edit-'+dataKey);
  if(!container)return;
  var idx=container.children.length;
  var div=document.createElement('div');
  div.style.cssText='display:grid;grid-template-columns:2fr 1fr 2fr auto;gap:6px;align-items:center';
  div.innerHTML='<input placeholder="Nome da competência" data-sec="'+dataKey+'" data-idx="'+idx+'" data-field="nome" style="font-size:12px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/>'
    +'<select data-sec="'+dataKey+'" data-idx="'+idx+'" data-field="tipo" style="font-size:11px;padding:6px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"><option>Comportamental</option><option>Técnica</option></select>'
    +'<input placeholder="Descrição (opcional)" data-sec="'+dataKey+'" data-idx="'+idx+'" data-field="desc" style="font-size:11px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)"/>'
    +'<button onclick="this.closest(\'div[style*=grid]\').remove()" style="border:none;background:#FCEBEB;color:#A32D2D;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:14px">×</button>';
  container.appendChild(div);
}

function adicionarItemLista(dataKey,placeholder){
  var container=document.getElementById('comp-edit-'+dataKey);
  if(!container)return;
  var div=document.createElement('div');
  div.style.cssText='display:flex;gap:6px;align-items:center';
  div.innerHTML='<input data-lista="'+dataKey+'" style="font-size:12px;flex:1;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--txt)" placeholder="'+placeholder+'"/>'
    +'<button onclick="this.parentElement.remove()" style="border:none;background:#FCEBEB;color:#A32D2D;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:14px">×</button>';
  container.appendChild(div);
}

function criarNovoPerfil(){
  var nome=prompt('Nome do novo perfil (ex: Diretor, Gerente):');
  if(!nome||!nome.trim())return;
  nome=nome.trim();
  var mc=JSON.parse(JSON.stringify(getMatrizCompetencias()));
  var id=nome.toLowerCase().replace(/[^a-z0-9]/g,'_');
  if(mc.perfis.find(function(p){return p.id===id})){alert('Perfil com esse nome ja existe.');return;}
  mc.perfis.push({id:id,cargo:nome,niveis:[],escolaridade:{basica:'',excelencia:''},escopo:[],entregas:[],compGrupo:[],compEspecificas:[]});
  saveMatrizCompetencias(mc);
  window._compSel=id;
  editarCompetencias();
  toast('Perfil "'+nome+'" criado!');
}

function excluirPerfilComp(perfilId){
  if(!confirm('Excluir este perfil? As competencias e dados serao perdidos.'))return;
  var mc=JSON.parse(JSON.stringify(getMatrizCompetencias()));
  mc.perfis=mc.perfis.filter(function(p){return p.id!==perfilId});
  saveMatrizCompetencias(mc);
  window._compSel=mc.perfis.length?mc.perfis[0].id:'';
  closeModal();toast('Perfil excluido!');render('competencias');
}

function removerItemComp(btn){
  btn.closest('div[style*="grid"]').remove();
}

function salvarEdicaoCompetencias(perfilId){
  const mc=JSON.parse(JSON.stringify(getMatrizCompetencias())); // deep clone

  function lerSecao(key){
    const container=document.getElementById('comp-edit-'+key);
    if(!container)return null;
    const rows=container.querySelectorAll('[data-field="nome"]');
    const result=[];
    rows.forEach(function(inp){
      const nome=(inp.value||'').trim();
      if(!nome)return;
      const idx=inp.dataset.idx;
      const tipoEl=container.querySelector('[data-field="tipo"][data-idx="'+idx+'"]');
      const descEl=container.querySelector('[data-field="desc"][data-idx="'+idx+'"]');
      const tipo=tipoEl?tipoEl.value:'Comportamental';
      const desc=descEl?(descEl.value||'').trim():'';
      result.push({nome,tipo,desc});
    });
    return result;
  }

  function lerLista(key){
    const container=document.getElementById('comp-edit-'+key);
    if(!container)return null;
    const inputs=container.querySelectorAll('[data-lista="'+key+'"]');
    const result=[];
    inputs.forEach(function(inp){var v=(inp.value||'').trim();if(v)result.push(v);});
    return result;
  }

  // Salvar essenciais
  const ess=lerSecao('essenciais');
  if(ess)mc.essenciais=ess;

  // Salvar no perfil correto
  const pi=mc.perfis.findIndex(p=>p.id===perfilId);
  if(pi>=0){
    // Competências
    const grp=lerSecao('compGrupo');
    const esp=lerSecao('compEspecificas');
    if(grp)mc.perfis[pi].compGrupo=grp;
    if(esp)mc.perfis[pi].compEspecificas=esp;
    // Cargo
    var cargoEl=document.getElementById('comp-edit-cargo');
    if(cargoEl&&cargoEl.value.trim())mc.perfis[pi].cargo=cargoEl.value.trim();
    // Escolaridade
    var escBas=document.getElementById('comp-edit-esc-basica');
    var escExc=document.getElementById('comp-edit-esc-excelencia');
    mc.perfis[pi].escolaridade={basica:escBas?escBas.value:'',excelencia:escExc?escExc.value:''};
    // Listas
    var niv=lerLista('niveis');if(niv)mc.perfis[pi].niveis=niv;
    var esc=lerLista('escopo');if(esc)mc.perfis[pi].escopo=esc;
    var ent=lerLista('entregas');if(ent)mc.perfis[pi].entregas=ent;
    // Categorias customizadas
    var customCatsSave=ls('comp_custom_categorias',[]);
    customCatsSave.forEach(function(cc){
      var customData=lerSecao(cc.key);
      if(customData)mc.perfis[pi][cc.key]=customData;
    });
  }

  saveMatrizCompetencias(mc);
  closeModal();
  toast('Competencias salvas!');
  render('competencias');
}

function resetarCompetencias(){
  if(!confirm('Restaurar competências para o padrão original? As edições serão perdidas.'))return;
  localStorage.removeItem('matriz_comp_v1');
  toast('Competências restauradas ao padrão!');
  render('competencias');
}

function exportarPDFCompetencias(perfilId){
  const perfil=MATRIZ_COMPETENCIAS.perfis.find(p=>p.id===perfilId)||MATRIZ_COMPETENCIAS.perfis[0];
  const essenciais=MATRIZ_COMPETENCIAS.essenciais;
  const dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  function tipoBadgePDF(tipo){
    const cor=tipo==='Técnica'?'#185FA5':'#534AB7';
    const bg=tipo==='Técnica'?'#E6F1FB':'#EEEDFE';
    return '<span style="font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;background:'+bg+';color:'+cor+'">'+tipo+'</span>';
  }
  function compRow(c){
    return '<tr><td style="padding:7px 10px;font-size:11.5px;font-weight:600">'+c.nome+'</td>'
      +'<td style="padding:7px 10px">'+tipoBadgePDF(c.tipo)+'</td>'
      +'<td style="padding:7px 10px;font-size:11px;color:#374151">'+c.desc+'</td></tr>';
  }

  const nivelBadgesPDF=perfil.niveis.map(n=>'<span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;border:1px solid #185FA5;color:#185FA5;margin-right:6px">'+n+'</span>').join('');

  const html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Matriz de Competências · '+perfil.cargo+'</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:36px}'
    +'@media print{body{padding:0}.np{display:none!important}@page{margin:15mm;size:A4}}'
    +'table{width:100%;border-collapse:collapse}th{background:#f9fafb;text-align:left;padding:8px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;font-weight:700;border-bottom:2px solid #e5e7eb}td{border-bottom:1px solid #f3f4f6}'
    +'h3{font-size:13px;font-weight:700;color:#374151;margin:20px 0 8px;padding:6px 10px;background:#f9fafb;border-left:3px solid #185FA5;border-radius:0 6px 6px 0}'
    +'</style></head><body>'
    +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#185FA5;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;flex:1">Matriz de Competências · '+perfil.cargo+'</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#185FA5;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">🖨 Imprimir</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button>'
    +'</div><div class="np" style="height:52px"></div>'
    // Cabeçalho
    +'<div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #185FA5;padding-bottom:14px;margin-bottom:22px">'
      +'<div>'
        +'<div style="font-size:9px;font-weight:700;color:#185FA5;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Squado</div>'
        +'<div style="font-size:24px;font-weight:900;margin-bottom:4px">Matriz de Competências</div>'
        +'<div style="font-size:15px;font-weight:700;color:#374151">'+perfil.cargo+'</div>'
        +'<div style="margin-top:8px">'+nivelBadgesPDF+'</div>'
      +'</div>'
      +'<div style="text-align:right;font-size:11px;color:#6b7280"><div>'+dataHoje+'</div></div>'
    +'</div>'
    // Escolaridade
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">'
      +'<div style="background:#f9fafb;border-radius:8px;padding:12px">'
        +'<div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:4px">📚 Escolaridade Básica</div>'
        +'<div style="font-size:11.5px">'+perfil.escolaridade.basica+'</div>'
      +'</div>'
      +'<div style="background:#E1F5EE;border-radius:8px;padding:12px">'
        +'<div style="font-size:9px;font-weight:700;color:#0F6E56;text-transform:uppercase;margin-bottom:4px">⭐ Escolaridade de Excelência</div>'
        +'<div style="font-size:11.5px">'+perfil.escolaridade.excelencia+'</div>'
      +'</div>'
    +'</div>'
    // Escopo
    +'<h3>🎯 Escopo do Grupo Ocupacional</h3>'
    +'<ul style="padding-left:18px;margin-bottom:4px">'
      +perfil.escopo.map(e=>'<li style="font-size:11.5px;padding:3px 0;line-height:1.5">'+e+'</li>').join('')
    +'</ul>'
    // Entregas
    +'<h3 style="border-left-color:#185FA5">📦 Entregas do Cargo</h3>'
    +'<ul style="padding-left:18px;margin-bottom:4px">'
      +perfil.entregas.map(e=>'<li style="font-size:11.5px;padding:3px 0;line-height:1.5">'+e+'</li>').join('')
    +'</ul>'
    // Comp Essenciais
    +'<h3 style="border-left-color:#534AB7">💎 Competências Essenciais</h3>'
    +'<table><thead><tr><th>Competência</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>'
      +essenciais.map(compRow).join('')
    +'</tbody></table>'
    // Comp Grupo
    +'<h3 style="border-left-color:#185FA5">🏆 Competências do Grupo Ocupacional</h3>'
    +'<table><thead><tr><th>Competência</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>'
      +perfil.compGrupo.map(compRow).join('')
    +'</tbody></table>'
    // Comp Específicas
    +'<h3 style="border-left-color:#0F6E56">🔧 Competências Específicas</h3>'
    +'<table><thead><tr><th>Competência</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>'
      +perfil.compEspecificas.map(compRow).join('')
    +'</tbody></table>'
    // Rodapé
    +'<div style="margin-top:28px;padding-top:10px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">'
      +'<span>Gestão de Pessoas</span>'
      +'<span>'+dataHoje+'</span>'
    +'</div>'
    +'</body></html>';

  var w=window.open('','_blank','width=1000,height=780');
  if(!w){alert('Permita pop-ups.');return;}
  w.document.write(html);w.document.close();
}
