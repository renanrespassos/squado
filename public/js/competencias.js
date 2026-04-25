
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

  // Estado: qual perfil está selecionado
  const sel = window._compSel || 'assistente';
  const perfil = perfis.find(p=>p.id===sel)||perfis[0];

  // Badges de tipo
  function tipoBadge(tipo){
    const cor = tipo==='Técnica'?'#185FA5':'#534AB7';
    const bg  = tipo==='Técnica'?'#E6F1FB':'#EEEDFE';
    return '<span style="font-size:9px;font-weight:700;padding:1px 7px;border-radius:20px;background:'+bg+';color:'+cor+'">'+tipo+'</span>';
  }

  // Card de competência
  function compCard(c, cor){
    return '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:12px;display:flex;gap:10px;align-items:flex-start">'
      +'<div style="flex:1;min-width:0">'
        +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">'
          +'<span style="font-size:12px;font-weight:700;color:var(--txt)">'+c.nome+'</span>'
          +tipoBadge(c.tipo)
        +'</div>'
        +(c.desc?'<div style="font-size:11px;color:var(--txt2);line-height:1.5">'+c.desc+'</div>':'')
      +'</div>'
    +'</div>';
  }

  // Tabs de perfil
  const tabs='<div style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;margin-bottom:20px;width:fit-content">'
    +perfis.map(p=>'<button onclick="window._compSel=\''+p.id+'\';render(\'competencias\')" '
      +'style="padding:8px 18px;border:none;border-left:0.5px solid var(--border2);font-size:12.5px;font-weight:600;cursor:pointer;'
      +'background:'+(p.id===sel?'var(--green)':'var(--bg2)')+';color:'+(p.id===sel?'#fff':'var(--txt2)')+';transition:all .15s">'
      +p.cargo+'</button>'
    ).join('')
  +'</div>';

  // Níveis aplicáveis
  const niveisHtml='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">'
    +perfil.niveis.map(n=>{
      const ns=NIVEL_STYLE[n]||{cor:'#888',bg:'#eee'};
      return '<span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:'+ns.bg+';color:'+ns.cor+'">'+n+'</span>';
    }).join('')
  +'</div>';

  // Escolaridade
  const escHtml='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">'
    +'<div style="background:var(--bg2);border-radius:8px;padding:12px">'
      +'<div style="font-size:9px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">📚 Escolaridade Básica</div>'
      +'<div style="font-size:12px;color:var(--txt)">'+perfil.escolaridade.basica+'</div>'
    +'</div>'
    +'<div style="background:var(--green-bg);border-radius:8px;padding:12px">'
      +'<div style="font-size:9px;font-weight:700;color:var(--green2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">⭐ Escolaridade de Excelência</div>'
      +'<div style="font-size:12px;color:var(--txt)">'+perfil.escolaridade.excelencia+'</div>'
    +'</div>'
  +'</div>';

  // Escopo
  const escopoHtml='<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:20px">'
    +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">🎯 Escopo do Grupo Ocupacional</div>'
    +'<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">'
      +perfil.escopo.map(e=>'<li style="font-size:12px;color:var(--txt);line-height:1.5">'+e+'</li>').join('')
    +'</ul>'
  +'</div>';

  // Entregas
  const entregasHtml='<div style="background:#E6F1FB;border:0.5px solid #185FA5;border-radius:10px;padding:14px;margin-bottom:20px">'
    +'<div style="font-size:11px;font-weight:700;color:#185FA5;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">📦 Entregas do Cargo</div>'
    +'<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px">'
      +perfil.entregas.map(e=>'<li style="font-size:12px;color:var(--txt);line-height:1.5">'+e+'</li>').join('')
    +'</ul>'
  +'</div>';

  // Competências Essenciais
  const essHtml='<div style="margin-bottom:20px">'
    +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">💎 Competências Essenciais <span style="font-size:10px;color:var(--txt3);font-weight:400">(todos os cargos)</span></div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">'
      +essenciais.map(c=>compCard(c,'#534AB7')).join('')
    +'</div>'
  +'</div>';

  // Competências do Grupo Ocupacional
  const grpHtml='<div style="margin-bottom:20px">'
    +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">🏆 Competências do Grupo Ocupacional</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">'
      +perfil.compGrupo.map(c=>compCard(c,'#185FA5')).join('')
    +'</div>'
  +'</div>';

  // Competências Específicas
  const espHtml='<div style="margin-bottom:24px">'
    +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">🔧 Competências Específicas</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">'
      +perfil.compEspecificas.map(c=>compCard(c,'#0F6E56')).join('')
    +'</div>'
  +'</div>';

  // Botão exportar PDF
  const exportBtn='<div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:16px">'
    +'<button class="btn btn-sm" onclick="editarCompetencias()" style="border-color:#854F0B;color:#854F0B">✏️ Editar Competências</button>'
    +'<button class="btn btn-sm" onclick="resetarCompetencias()" style="border-color:var(--txt3);color:var(--txt3)" title="Restaurar padrão">Restaurar padrão</button>'
    +'<button class="btn btn-sm" data-perfil="'+perfil.id+'" onclick="exportarPDFCompetencias(this.dataset.perfil)" style="border-color:#185FA5;color:#185FA5">📄 Exportar PDF</button>'
  +'</div>';

  return '<div>'
    +exportBtn
    +tabs
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">'
      +'<div>'
        +'<div style="font-size:18px;font-weight:800;color:var(--txt)">'+perfil.cargo+'</div>'
        +'<div style="font-size:11px;color:var(--txt3);margin-top:2px">Níveis aplicáveis:</div>'
      +'</div>'
    +'</div>'
    +niveisHtml
    +escHtml
    +escopoHtml
    +entregasHtml
    +essHtml
    +grpHtml
    +espHtml
  +'</div>';
}


// ─── Editar Matriz de Competências ──────────────────────
function editarCompetencias(){
  const mc=getMatrizCompetencias();
  const sel=window._compSel||'assistente';
  const perfil=mc.perfis.find(p=>p.id===sel)||mc.perfis[0];

  document.getElementById('modal-title').textContent='Editar Competencias · '+perfil.cargo;
  document.getElementById('modal-box').classList.add('modal-lg');

  // Helper: seção de competências (nome + tipo)
  function secaoHtml(titulo,itens,dataKey){
    return '<div style="margin-bottom:14px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">'+titulo+'</div>'
      +'<div id="comp-edit-'+dataKey+'" style="display:flex;flex-direction:column;gap:6px">'
        +itens.map((c,i)=>'<div style="display:grid;grid-template-columns:2fr 1fr auto;gap:6px;align-items:center">'
          +'<input value="'+c.nome.replace(/"/g,'&quot;')+'" data-sec="'+dataKey+'" data-idx="'+i+'" data-field="nome" style="font-size:12px"/>'
          +'<select data-sec="'+dataKey+'" data-idx="'+i+'" data-field="tipo" style="font-size:12px">'
            +'<option'+(c.tipo==='Comportamental'?' selected':'')+'>Comportamental</option>'
            +'<option'+(c.tipo==='Técnica'?' selected':'')+'>Técnica</option>'
          +'</select>'
          +'<button class="btn btn-xs btn-danger" onclick="this.closest(\'div[style*=grid]\').remove()">×</button>'
        +'</div>').join('')
      +'</div>'
      +'<button class="btn btn-xs" style="margin-top:6px" onclick="adicionarItemComp(\''+dataKey+'\')">+ Adicionar</button>'
    +'</div>';
  }

  // Helper: lista de textos simples (entregas, escopo, niveis)
  function listaHtml(titulo,itens,dataKey,placeholder){
    return '<div style="margin-bottom:14px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">'+titulo+'</div>'
      +'<div id="comp-edit-'+dataKey+'" style="display:flex;flex-direction:column;gap:6px">'
        +(itens||[]).map((t,i)=>'<div style="display:flex;gap:6px;align-items:center">'
          +'<input value="'+(t||'').replace(/"/g,'&quot;')+'" data-lista="'+dataKey+'" style="font-size:12px;flex:1" placeholder="'+placeholder+'"/>'
          +'<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>'
        +'</div>').join('')
      +'</div>'
      +'<button class="btn btn-xs" style="margin-top:6px" onclick="adicionarItemLista(\''+dataKey+'\',\''+placeholder+'\')">+ Adicionar</button>'
    +'</div>';
  }

  // Tabs dos perfis
  var tabsHtml='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">';
  mc.perfis.forEach(function(p){
    var active=p.id===sel?'background:var(--primary);color:#fff':'background:var(--bg2);color:var(--txt)';
    tabsHtml+='<button class="btn btn-xs" style="'+active+'" onclick="window._compSel=\''+p.id+'\';editarCompetencias()">'+p.cargo+'</button>';
  });
  tabsHtml+='<button class="btn btn-xs" style="background:#E1F5EE;color:#0F6E56" onclick="criarNovoPerfil()">+ Novo Perfil</button></div>';

  document.getElementById('modal-body').innerHTML=
    '<div style="max-height:65vh;overflow-y:auto;padding-right:4px">'
      +tabsHtml
      // Dados do perfil
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">Dados do Perfil</div>'
      +'<div style="margin-bottom:14px"><div class="field-label">Nome do Cargo</div><input id="comp-edit-cargo" value="'+perfil.cargo.replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%"/></div>'
      // Escolaridade
      +'<div style="margin-bottom:14px"><div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">ESCOLARIDADE</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
          +'<div><div class="field-label">Basica</div><input id="comp-edit-esc-basica" value="'+(perfil.escolaridade&&perfil.escolaridade.basica||'').replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%"/></div>'
          +'<div><div class="field-label">Excelencia</div><input id="comp-edit-esc-excelencia" value="'+(perfil.escolaridade&&perfil.escolaridade.excelencia||'').replace(/"/g,'&quot;')+'" style="font-size:12px;width:100%"/></div>'
        +'</div></div>'
      // Níveis aplicáveis
      +listaHtml('Niveis Aplicaveis',perfil.niveis,'niveis','Ex: Assistente I')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      // Escopo do grupo
      +listaHtml('Escopo do Grupo',perfil.escopo,'escopo','Descreva uma responsabilidade do escopo')
      // Entregas do cargo
      +listaHtml('Entregas do Cargo',perfil.entregas,'entregas','Descreva uma entrega esperada')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      // Essenciais
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">Competencias Essenciais</div>'
      +secaoHtml('Essenciais (todos os cargos)',mc.essenciais,'essenciais')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      // Grupo Ocupacional
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">Grupo Ocupacional — '+perfil.cargo+'</div>'
      +secaoHtml('Competencias do Grupo',perfil.compGrupo||[],'compGrupo')
      +'<div style="border-top:0.5px solid var(--border);margin:14px 0"></div>'
      // Específicas
      +'<div style="font-size:13px;font-weight:700;color:var(--txt);margin-bottom:10px">Especificas — '+perfil.cargo+'</div>'
      +secaoHtml('Competencias Especificas',perfil.compEspecificas||[],'compEspecificas')
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border)">'
      +(mc.perfis.length>1?'<button class="btn btn-sm" style="border-color:#DC2626;color:#DC2626" onclick="excluirPerfilComp(\''+sel+'\')">Excluir Perfil</button>':'<div></div>')
      +'<div style="display:flex;gap:8px"><button class="btn btn-sm" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="salvarEdicaoCompetencias(\''+sel+'\')">Salvar</button></div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
}

function adicionarItemComp(dataKey){
  var container=document.getElementById('comp-edit-'+dataKey);
  if(!container)return;
  var idx=container.children.length;
  var div=document.createElement('div');
  div.style.cssText='display:grid;grid-template-columns:2fr 1fr auto;gap:6px;align-items:center';
  div.innerHTML='<input placeholder="Nome da competencia" data-sec="'+dataKey+'" data-idx="'+idx+'" data-field="nome" style="font-size:12px"/>'
    +'<select data-sec="'+dataKey+'" data-idx="'+idx+'" data-field="tipo" style="font-size:12px"><option>Comportamental</option><option>Técnica</option></select>'
    +'<button class="btn btn-xs btn-danger" onclick="this.closest(\'div[style*=grid]\').remove()">×</button>';
  container.appendChild(div);
}

function adicionarItemLista(dataKey,placeholder){
  var container=document.getElementById('comp-edit-'+dataKey);
  if(!container)return;
  var div=document.createElement('div');
  div.style.cssText='display:flex;gap:6px;align-items:center';
  div.innerHTML='<input data-lista="'+dataKey+'" style="font-size:12px;flex:1" placeholder="'+placeholder+'"/>'
    +'<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>';
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
      const tipo=tipoEl?tipoEl.value:'Comportamental';
      result.push({nome,tipo,desc:''});
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
