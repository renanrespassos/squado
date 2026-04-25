// ═══════════════════════════════════════════════════════════════
// SEED DE FUNÇÕES COM MODELO DE CAPACIDADE
// ═══════════════════════════════════════════════════════════════
const SEED_FUNCOES_CAPACIDADE = [
  // ENTRADA E DEVOLUÇÃO
  {area:'Entrada e Devolucao',nome:'Fotos',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Antoni Cruz',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Entrada no LABTRACK',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Isadora Maria',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Entrada no Atlas',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Isadora Maria',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Montar Minutas',tempoMin:10,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Guilherme',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Assinaturas IDs',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Isadora Maria',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Emendas dos IDs',tempoMin:30,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Isadora Maria',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Planilha ETS',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Guilherme',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Gerar Minutas',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Guilherme',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Devolver Serviços',tempoMin:5,tipoTempo:'por_servico',pctServicos:100,responsaveis:[{nome:'Kaua Lima',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Buscar Serviços',tempoMin:10,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Claudio Henrique',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Procurar Serviços',tempoMin:10,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Claudio Henrique',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Ensaio de Aquecimento',tempoMin:10,tipoTempo:'por_servico',pctServicos:60,responsaveis:[{nome:'Arthur Lima',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Ensaio de Choque Elétrico',tempoMin:10,tipoTempo:'por_servico',pctServicos:20,responsaveis:[{nome:'Arthur Lima',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Fechar Relatórios 17087',tempoMin:10,tipoTempo:'por_servico',pctServicos:60,responsaveis:[{nome:'Arthur Lima',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Assinar Relatórios 17087',tempoMin:10,tipoTempo:'por_servico',pctServicos:60,responsaveis:[{nome:'Arthur Lima',pct:100}]},
  {area:'Entrada e Devolucao',nome:'Emendas 17087',tempoMin:30,tipoTempo:'por_servico',pctServicos:12,responsaveis:[{nome:'Arthur Lima',pct:100}]},
  // EMC
  {area:'EMC',nome:'Ensaios Radiados',tempoMin:30,tipoTempo:'por_servico',pctServicos:55,responsaveis:[{nome:'Julia Marchant',pct:50},{nome:'Eduardo Altnetter',pct:50}]},
  {area:'EMC',nome:'Ensaio de Imunidade',tempoMin:40,tipoTempo:'por_servico',pctServicos:55,responsaveis:[{nome:'Julia Marchant',pct:100}]},
  {area:'EMC',nome:'Intensidade de Campo',tempoMin:150,tipoTempo:'por_servico',pctServicos:25,responsaveis:[{nome:'Julia Marchant',pct:100}]},
  {area:'EMC',nome:'Ensaio Conduzido',tempoMin:30,tipoTempo:'por_servico',pctServicos:25,responsaveis:[{nome:'Lucas Menegoto',pct:100}]},
  {area:'EMC',nome:'Imunidade Conduzida',tempoMin:80,tipoTempo:'por_servico',pctServicos:25,responsaveis:[{nome:'Cristian Giovani',pct:100}]},
  {area:'EMC',nome:'Configurações EMC',tempoMin:60,tipoTempo:'por_servico',pctServicos:25,responsaveis:[{nome:'Fernando Barbosa',pct:50},{nome:'Joao de Paula',pct:50}]},
  {area:'EMC',nome:'Fechar Relatório EMC',tempoMin:20,tipoTempo:'por_servico',pctServicos:55,responsaveis:[{nome:'Lucas Menegoto',pct:50},{nome:'Eduardo Altnetter',pct:50}]},
  {area:'EMC',nome:'Assinar EMC',tempoMin:20,tipoTempo:'por_servico',pctServicos:55,responsaveis:[{nome:'Philipe Vasques',pct:100}]},
  {area:'EMC',nome:'Emendas EMC',tempoMin:30,tipoTempo:'por_servico',pctServicos:11,responsaveis:[{nome:'Eduardo Altnetter',pct:100}]},
  {area:'EMC',nome:'Ensaio Acompanhado',tempoMin:3840,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Cristian Giovani',pct:50},{nome:'Julia Marchant',pct:50}]},
  {area:'EMC',nome:'Estudo de Norma EMC',tempoMin:1920,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Elinaldo dos Reis',pct:50},{nome:'Renan E S Passos',pct:50}]},
  {area:'EMC',nome:'Dúvidas Comercial EMC',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Philipe Vasques',pct:50},{nome:'Elinaldo dos Reis',pct:50}]},
  {area:'EMC',nome:'Reuniões EMC',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Fernando Barbosa',pct:50},{nome:'Joao de Paula',pct:50}]},
  {area:'EMC',nome:'Auxílio Clientes',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Elinaldo dos Reis',pct:100}]},
  {area:'EMC',nome:'Ensaios Eletrodomésticos',tempoMin:120,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Cristian Giovani',pct:70},{nome:'Julia Marchant',pct:30}]},
  {area:'EMC',nome:'Fechar Relatório Eletrodomésticos',tempoMin:45,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Cristian Giovani',pct:100}]},
  {area:'EMC',nome:'Eletromédicos',tempoMin:480,tipoTempo:'por_servico',pctServicos:2,responsaveis:[{nome:'Philipe Vasques',pct:100}]},
  {area:'EMC',nome:'Fechar Relatório Eletromédicos',tempoMin:60,tipoTempo:'por_servico',pctServicos:2,responsaveis:[{nome:'Philipe Vasques',pct:100}]},
  {area:'EMC',nome:'TVs - CISPR 32',tempoMin:120,tipoTempo:'por_servico',pctServicos:3,responsaveis:[{nome:'Julia Marchant',pct:80},{nome:'Cristian Giovani',pct:20}]},
  // RF — ENSAIO 14448
  {area:'RF',nome:'Configurações RF',tempoMin:120,tipoTempo:'por_servico',pctServicos:40,responsaveis:[{nome:'Georgia dos Reis',pct:40},{nome:'Marcelo Benfato',pct:40},{nome:'Israel de Azevedo',pct:20}]},
  {area:'RF',nome:'Ensaio de Wi-Fi',tempoMin:480,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Rafael Ledur',pct:100}]},
  {area:'RF',nome:'Ensaio de DFS',tempoMin:60,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Joao Daneres',pct:100}]},
  {area:'RF',nome:'Ensaio SAR',tempoMin:60,tipoTempo:'por_servico',pctServicos:20,responsaveis:[{nome:'Joao Daneres',pct:100}]},
  {area:'RF',nome:'Ensaio de BT',tempoMin:120,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Rafael Ledur',pct:100}]},
  {area:'RF',nome:'Ensaio de Lora',tempoMin:120,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Joao Daneres',pct:100}]},
  {area:'RF',nome:'Emendas RF',tempoMin:30,tipoTempo:'por_servico',pctServicos:8,responsaveis:[{nome:'Joao Vitor Torres',pct:100}]},
  {area:'RF',nome:'Fechar Relatório RF',tempoMin:30,tipoTempo:'por_servico',pctServicos:40,responsaveis:[{nome:'Joao Vitor Torres',pct:100}]},
  {area:'RF',nome:'Assinar RF',tempoMin:10,tipoTempo:'por_servico',pctServicos:40,responsaveis:[{nome:'Bernardo Nogueira',pct:100}]},
  {area:'RF',nome:'Reuniões RF',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Georgia dos Reis',pct:50},{nome:'Marcelo Benfato',pct:50}]},
  {area:'RF',nome:'Dúvidas Comercial RF',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Bernardo Nogueira',pct:80},{nome:'Renan E S Passos',pct:20}]},
  // REDES MÓVEIS
  {area:'Redes Moveis',nome:'IPV6',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  {area:'Redes Moveis',nome:'Ensaios Funcionais (2G, 3G e 4G)',tempoMin:480,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  {area:'Redes Moveis',nome:'Reuniões Redes Móveis',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  {area:'Redes Moveis',nome:'Retestes',tempoMin:480,tipoTempo:'por_servico',pctServicos:4,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  {area:'Redes Moveis',nome:'Funcional',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  {area:'Redes Moveis',nome:'Fechar Relatórios IPV6',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Eduardo de Oliveira',pct:50},{nome:'Lauren Stefani',pct:50}]},
  // BATERIAS
  {area:'Baterias e Acustica',nome:'Ensaio de Baterias',tempoMin:90,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  {area:'Baterias e Acustica',nome:'Fechar Relatórios Baterias',tempoMin:30,tipoTempo:'por_servico',pctServicos:10,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  {area:'Baterias e Acustica',nome:'Organizar Powerbanks',tempoMin:30,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  // ENSAIOS ACÚSTICOS
  {area:'Baterias e Acustica',nome:'Ensaio Acústico',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  {area:'Baterias e Acustica',nome:'Relatórios Ensaio Acústico',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  {area:'Baterias e Acustica',nome:'Fotos dos serviços acústico',tempoMin:60,tipoTempo:'por_servico',pctServicos:5,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  // TV
  {area:'Outros Ensaios',nome:'Ensaio de TV - Segurança e Eficiência',tempoMin:120,tipoTempo:'por_servico',pctServicos:2,responsaveis:[{nome:'Fabricio Nobre',pct:100}]},
  {area:'Outros Ensaios',nome:'Desenvolvimento de Melhorias',tempoMin:2400,tipoTempo:'fixo_mes',pctServicos:0,responsaveis:[{nome:'Joao Pinheiro',pct:100}]},
];

// Migrar funcoes antigas para novo formato se necessário
function migrarFuncoes(){
  const existente = ls('funcoes_v8', null);
  if(existente) return existente;
  // Criar novo array com IDs estáveis baseados em nome+area (não uid())
  function stableId(nome, area){
    // Hash único: nome + area sem truncar a parte crítica
    const str = nome + '||' + area;
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = Math.imul(31, h) + str.charCodeAt(i) | 0; }
    const p1 = btoa(encodeURIComponent(nome)).replace(/[^a-zA-Z0-9]/g,'').slice(0,12);
    const p2 = btoa(encodeURIComponent(area)).replace(/[^a-zA-Z0-9]/g,'').slice(0,8);
    return 'fn_' + p1 + p2 + (h >>> 0).toString(36);
  }
  const novasFuncoes = SEED_FUNCOES_CAPACIDADE.map(f => ({
    id: stableId(f.nome, f.area),
    nome: f.nome,
    area: f.area,
    tempoMin: f.tempoMin,
    tipoTempo: f.tipoTempo || 'por_servico',
    pctServicos: f.pctServicos ?? f.pctAmostras ?? 100,
    responsaveis: f.responsaveis || [],
    colaboradores: (f.responsaveis||[]).map(r => {
      const col = colaboradores.find(c => c.nome === r.nome);
      return col ? {colId: col.id, pct: r.pct} : null;
    }).filter(Boolean),
    tempoSemana: Math.round(f.tempoMin * (f.pctServicos/100) * 50 / 60 / 4) || 8,
  }));
  lss('funcoes_v8', novasFuncoes);
  return novasFuncoes;
}

// ═══════════════════════════════════════════════════════════════
// CÁLCULOS DE CAPACIDADE
// ═══════════════════════════════════════════════════════════════
const MIN_MES_DISPONIVEL = 9600; // 160h × 60min por pessoa por mês

function calcCargaFuncao(f, amostras) {
  if (f.tipoTempo === 'fixo_mes') return f.tempoMin || 0;
  // pctServicos pode ser undefined em funções antigas (era pctAmostras) — usar fallback
  const pct = f.pctServicos ?? f.pctAmostras ?? 100;
  const tempo = f.tempoMin || 0;
  const qtd = amostras || 0;
  const result = qtd * (pct / 100) * tempo;
  return isNaN(result) ? 0 : result;
}

function calcCargaPorPessoa(amostras) {
  // Retorna {nome: minutos_totais} — só colaboradores que existem e estão Ativos
  const nomesAtivos = new Set(colaboradores.filter(c => c.status === 'Ativo').map(c => c.nome));
  const carga = {};
  const funcoesAtivas = ls('funcoes_v8', migrarFuncoes());
  funcoesAtivas.forEach(f => {
    const total = calcCargaFuncao(f, amostras);
    (f.responsaveis || []).forEach(r => {
      // Só inclui se o colaborador ainda existe e está ativo
      if (!nomesAtivos.has(r.nome)) return;
      if (!carga[r.nome]) carga[r.nome] = 0;
      carga[r.nome] += total * (r.pct / 100);
    });
  });
  return carga;
}

// ═══════════════════════════════════════════════════════════════
// RENDER CAPACIDADE — PAINEL MACRO
// ═══════════════════════════════════════════════════════════════
function renderCapacidade() {
  const funcoesV2 = ls('funcoes_v8', migrarFuncoes());
  const amostras = parseInt(qtdServicos) || 50;
  const _diasUteis = parseInt(ls('cap_dias_uteis', 22)) || 22;
  const _sobrecarrPct = parseInt(ls('cap_sobrecarga_pct', 100)) || 100;
  const cargaPessoa = calcCargaPorPessoa(amostras);

  // Agrupar por área
  const byArea = {};
  funcoesV2.forEach(f => {
    if (!byArea[f.area]) byArea[f.area] = [];
    byArea[f.area].push(f);
  });

  // Stats globais
  const totalFuncoes = funcoesV2.length;
  const pessoas = Object.keys(cargaPessoa);
  const MIN_MES_PESSOA = 8 * 60 * _diasUteis;
  const LIMITE_SOBRECARGA = MIN_MES_PESSOA * (_sobrecarrPct / 100);
  const sobrecarregadas = pessoas.filter(p => cargaPessoa[p] > LIMITE_SOBRECARGA).sort((a,b) => cargaPessoa[b] - cargaPessoa[a]);
  const totalMinFunc = funcoesV2.reduce((acc, f) => acc + calcCargaFuncao(f, amostras), 0);

  // Calcular capacidade disponível por tipo de contrato
  const DIAS_UTEIS = _diasUteis;
  const MIN_FUNCIONARIO = 8 * 60 * DIAS_UTEIS;  // 8h/dia = 10560 min/mês
  const MIN_ESTAGIARIO  = 6 * 60 * DIAS_UTEIS;  // 6h/dia = 7920 min/mês
  const NIVEIS_EST = ['Estagiário'];
  const nFuncionarios = colaboradores.filter(c => !NIVEIS_EST.includes(c.nivel) && c.status === 'Ativo').length;
  const nEstagiarios  = colaboradores.filter(c =>  NIVEIS_EST.includes(c.nivel) && c.status === 'Ativo').length;
  const minDisponiveisTotal = (nFuncionarios * MIN_FUNCIONARIO) + (nEstagiarios * MIN_ESTAGIARIO);
  const horasDisponiveisTotal = minDisponiveisTotal / 60;
  const horasDemandaTotal = totalMinFunc / 60;
  const pctUsoTotal = minDisponiveisTotal > 0 ? Math.round(totalMinFunc / minDisponiveisTotal * 100) : 0;
  const deficit = totalMinFunc > minDisponiveisTotal;
  const faltamPessoas = deficit ? ((totalMinFunc - minDisponiveisTotal) / MIN_FUNCIONARIO).toFixed(1) : 0;

  // Cor de ocupação
  function ocuCor(pct) {
    if (pct >= 100) return '#A32D2D';
    if (pct >= 80) return '#854F0B';
    if (pct >= 60) return '#185FA5';
    return '#1D9E75';
  }
  function ocuBg(pct) {
    if (pct >= 100) return '#FCEBEB';
    if (pct >= 80) return '#FAEEDA';
    if (pct >= 60) return '#E6F1FB';
    return '#E1F5EE';
  }
  function horas(min) { return (min/60).toFixed(1)+'h'; }
  function pctOcu(min) { return Math.round(min/MIN_MES_PESSOA*100); }

  // Cards de pessoas — incluir TODOS os colaboradores ativos (mesmo os sem funções = 0%)
  // Adicionar colaboradores ativos que não têm nenhuma função atribuída
  colaboradores.filter(c => c.status === 'Ativo').forEach(c => {
    if (!cargaPessoa[c.nome]) cargaPessoa[c.nome] = 0;
  });
  const pessoas_todos = Object.keys(cargaPessoa);
  // Cards de pessoas — ordenadas por ocupação decrescente
  const pessoasOrdenadas = pessoas_todos.sort((a,b) => cargaPessoa[b] - cargaPessoa[a]);

  const pessoaCards = pessoasOrdenadas.map(nome => {
    const min = cargaPessoa[nome];
    const pct = pctOcu(min);
    const cor = ocuCor(pct);
    const bg = ocuBg(pct);
    const col = colaboradores.find(c => c.nome === nome);
    const nivel = col ? col.nivel : '';
    const area = col ? col.area : '';
    const colId2 = col ? col.id : '';
    const minhasFuncs = funcoesV2.filter(f => (f.responsaveis||[]).find(r => r.nome === nome));

    let card = '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:11px;padding:14px;border-left:3px solid '+cor+';transition:box-shadow .15s"'
      +(colId2?' data-colid="'+colId2+'" onclick="verColCapacidade(this.dataset.colid)" style="background:var(--bg);border:0.5px solid var(--border);border-radius:11px;padding:14px;border-left:3px solid '+cor+';cursor:pointer;transition:box-shadow .15s" onmouseover="this.style.boxShadow=\'0 4px 14px rgba(0,0,0,.1)\'" onmouseout="this.style.boxShadow=\'none\'"':'')+'>';

    card += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">'
      + av(nome, false, false)
      + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:13px;font-weight:700;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+nome+'</div>'
        + (nivel ? '<div style="font-size:10px;color:var(--txt3)">'+nivel+(area?' · '+area:'')+'</div>' : '')
      + '</div>'
      + '<div style="text-align:right">'
        + '<div style="font-size:18px;font-weight:800;color:'+cor+'">'+pct+'%</div>'
        + '<div style="font-size:9px;color:var(--txt3);white-space:nowrap">'+horas(min)+' / 160h</div>'
      + '</div>'
    + '</div>';

    // Barra de ocupação
    card += '<div style="height:8px;background:var(--bg3);border-radius:4px;overflow:visible;margin-bottom:8px;position:relative">'
      + '<div style="height:100%;width:'+Math.min(pct,100)+'%;background:'+cor+';border-radius:4px;transition:width .4s"></div>'
      + (pct > 100 ? '<div style="position:absolute;top:-2px;right:0;width:12px;height:12px;background:#A32D2D;border-radius:50%;border:2px solid white;font-size:8px;display:flex;align-items:center;justify-content:center;color:white">!</div>' : '')
    + '</div>';

    // Mini lista de funções
    card += '<div style="max-height:80px;overflow-y:auto">';
    minhasFuncs.slice(0,5).forEach(function(f){
      const cF = calcCargaFuncao(f, amostras);
      const resp = (f.responsaveis||[]).find(r => r.nome === nome);
      const minResp = cF * (resp ? resp.pct/100 : 1);
      card += '<div style="display:flex;justify-content:space-between;font-size:10.5px;padding:2px 0;border-bottom:0.5px solid var(--border)">'
        + '<span style="color:var(--txt2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70%">'+f.nome+'</span>'
        + '<span style="color:var(--txt3);flex-shrink:0">'+horas(minResp)+'</span>'
      + '</div>';
    });
    if(minhasFuncs.length > 5) card += '<div style="font-size:9px;color:var(--txt3);text-align:center;padding-top:2px">+' + (minhasFuncs.length-5) + ' funções</div>';
    card += '</div>';

    // Botões de acesso rápido
    if(col){
      card += '<div style="margin-top:8px;padding-top:8px;border-top:0.5px solid var(--border);display:flex;gap:6px">'
        + '<button class="btn btn-xs" onclick="event.stopPropagation();verCol(\''+col.id+'\')" style="flex:1">👤 Perfil</button>'
        + '<button class="btn btn-xs btn-purple" onclick="event.stopPropagation();verColCapacidade(\''+col.id+'\')" style="flex:1">📌 Funções</button>'
      + '</div>';
    }

    card += '</div>';
    return card;
  }).join('');

  // Tabela de funções por área — com indicador de pessoas ideais
  const MIN_FUNC_MES = 8 * 60 * 22; // 10560 min/mês por funcionário

  const tabelaAreas = Object.entries(byArea).map(([area, funcs]) => {
    const c2 = AREA_COLORS[area] || {cor:'#888', bg:'#eee'};
    const totalArea = funcs.reduce((acc, f) => acc + calcCargaFuncao(f, amostras), 0);

    // Pessoas ideais = horas totais da área ÷ horas disponíveis por funcionário
    const pessoasIdeais = totalArea / MIN_FUNC_MES;
    const pessoasIdeaisInt = Math.ceil(pessoasIdeais);
    // Pessoas reais alocadas na área (únicas)
    const nomesArea = new Set();
    funcs.forEach(f => (f.responsaveis||[]).forEach(r => nomesArea.add(r.nome)));
    const pessoasReais = nomesArea.size;
    const deficit_area = pessoasIdeaisInt > pessoasReais;

    const nomesAtivosSet = new Set(colaboradores.filter(c=>c.status==='Ativo').map(c=>c.nome));
    const rows = funcs.map(f => {
      const cF = calcCargaFuncao(f, amostras);
      // Pessoas ideais por função individual
      const piFunc = cF / MIN_FUNC_MES;
      // Só mostrar responsáveis que ainda existem e estão ativos
      const respAtivos = (f.responsaveis||[]).filter(r=>nomesAtivosSet.has(r.nome));
      const respStr = respAtivos.map(r => {
        const colR = colaboradores.find(x=>x.nome===r.nome);
        const nome = r.nome.split(' ')[0]+'('+r.pct+'%)';
        return colR
          ? '<span onclick="verCol(\''+colR.id+'\')" style="cursor:pointer;color:var(--blue);text-decoration:underline;text-underline-offset:2px">'+nome+'</span>'
          : nome;
      }).join(', ') || '—';
      return '<tr>'
        + '<td style="padding:7px 4px 7px 10px;width:32px"><input type="checkbox" class="func-sel" data-fid="'+encodeURIComponent(f.id)+'" style="cursor:pointer;width:15px;height:15px" onchange="onFuncSelect()" /></td>'
        + '<td style="padding:7px 10px;font-size:12px;color:var(--txt)">'+f.nome+'</td>'
        + '<td style="padding:7px 10px;font-size:11px;color:var(--txt2);text-align:center">'
          + (f.tipoTempo==='fixo_mes'
              ? '<span style="background:#EEEDFE;color:#534AB7;padding:1px 6px;border-radius:10px;font-size:10px">fixo</span>'
              : f.pctServicos+'% dos serviços')
        + '</td>'
        + '<td style="padding:7px 10px;font-size:11px;color:var(--txt2);text-align:center">'
          + (f.tipoTempo==='fixo_mes' ? horas(f.tempoMin)+'/mês' : f.tempoMin+'min/serviço')
        + '</td>'
        + '<td style="padding:7px 10px;text-align:center">'
          + '<div style="font-size:13px;font-weight:800;color:var(--green)">'+horas(cF)+'</div>'
          + '<div style="font-size:9px;color:var(--txt3)">'+(piFunc<0.1?'<0.1':piFunc.toFixed(1))+' pessoa'+(piFunc>=2?'s':'')+'</div>'
        + '</td>'
        + '<td style="padding:7px 10px;font-size:11px;color:var(--txt2)">'+respStr+'</td>'
        + (function(){
            var somaR=(f.responsaveis||[]).reduce(function(a,r){return a+r.pct;},0);
            var ok=somaR===100, mais=somaR>100;
            var cor=ok?'var(--green)':mais?'#A32D2D':'#854F0B';
            var bg=ok?'#E1F5EE':mais?'#FCEBEB':'#FAEEDA';
            var icon=ok?'✅ ':mais?'⬆️ ':'⬇️ ';
            return '<td style="padding:7px 10px;text-align:center">'
              +'<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;background:'+bg+';color:'+cor+'" title="Soma das dedicações dos responsáveis">'
              +icon+somaR+'%</span></td>';
          })()
        + '<td style="padding:7px 10px;text-align:center"><button class="btn btn-xs" data-fid="'+encodeURIComponent(f.id)+'" onclick="editarFuncaoCapacidade(decodeURIComponent(this.dataset.fid))">Editar</button></td>'
      + '</tr>';
    }).join('');

    // Badge de pessoas ideais vs reais
    const badgePessoas = '<div style="display:flex;align-items:center;gap:6px;margin-left:auto">'
      + '<span style="font-size:11px;color:'+c2.cor+';opacity:.8">'+horas(totalArea)+'/mês</span>'
      + '<span style="width:0.5px;height:14px;background:'+c2.cor+';opacity:.3"></span>'
      + '<span style="font-size:11px;font-weight:700;color:'+(deficit_area?'#A32D2D':c2.cor)+'">'
        + pessoasIdeaisInt+(pessoasIdeaisInt===1?' pessoa ideal':' pessoas ideais')
      + '</span>'
      + '<span style="font-size:10px;padding:1px 7px;border-radius:20px;font-weight:700;'
        + 'background:'+(deficit_area?'#FCEBEB':'var(--green-bg)')+';'
        + 'color:'+(deficit_area?'#A32D2D':'var(--green2)')+';">'
        + (deficit_area?'⚠️ '+pessoasReais+' alocada'+(pessoasReais!==1?'s':''):'✅ '+pessoasReais+' alocada'+(pessoasReais!==1?'s':''))
      + '</span>'
    + '</div>';

    return '<div style="margin-bottom:20px">'
      + '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:'+c2.bg+';border-left:3px solid '+c2.cor+';border-radius:8px;margin-bottom:8px;flex-wrap:wrap;gap:6px">'
        + '<span style="font-size:13px;font-weight:700;color:'+c2.cor+'">'+area+'</span>'
        + '<span style="font-size:11px;color:'+c2.cor+';opacity:.6">'+funcs.length+' funções</span>'
        + badgePessoas
      + '</div>'
      + '<div style="overflow-x:auto;border-radius:8px;border:0.5px solid var(--border)">'
        + '<table style="width:100%;border-collapse:collapse;min-width:600px">'
          + '<thead><tr style="background:var(--bg2)">'
            + '<th style="padding:7px 4px 7px 10px;width:32px"><input type="checkbox" style="cursor:pointer" title="Selecionar todas" onchange="toggleSelectAllFuncs(this)" /></th>'
            + '<th style="padding:7px 10px;text-align:left;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;user-select:none" onclick="sortAreaFuncs(\'nome\')">Função ⇅</th>'
            + '<th style="padding:7px 10px;text-align:center;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Cobertura</th>'
            + '<th style="padding:7px 10px;text-align:center;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;user-select:none" onclick="sortAreaFuncs(\'tempo\')">Tempo Unit. ⇅</th>'
            + '<th style="padding:7px 10px;text-align:center;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;user-select:none" onclick="sortAreaFuncs(\'total\')">Total/mês ↓</th>'
            + '<th style="padding:7px 10px;text-align:left;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Responsáveis</th>'
            + '<th style="padding:7px 10px;text-align:center;font-size:10px;color:var(--txt2);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Cobertura</th>'
            + '<th style="padding:7px 10px;width:60px"></th>'
          + '</tr></thead>'
          + '<tbody>'+rows+'</tbody>'
        + '</table>'
      + '</div>'
    + '</div>';
  }).join('');

  return ''
  // Barra de controle de amostras
  + '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:11px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">'
    + '<div style="font-size:13px;font-weight:700;color:var(--txt)">📦 Serviços por mês:</div>'
    + '<div style="display:flex;align-items:center;gap:10px">'
      + '<button class="btn btn-sm" onclick="ajustarServicos(-5)" style="font-size:16px;padding:4px 10px">−</button>'
      + '<input type="number" id="inp-servicos" value="'+qtdServicos+'" min="1" max="9999" '
        + 'style="width:80px;text-align:center;font-size:20px;font-weight:800;color:var(--green);border:2px solid var(--green);border-radius:8px;padding:4px 8px" '
        + 'onchange="setServicos(this.value)" oninput="setServicos(this.value)"/>'
      + '<button class="btn btn-sm" onclick="ajustarServicos(5)" style="font-size:16px;padding:4px 10px">+</button>'
    + '</div>'
    + '<div style="font-size:11px;color:var(--txt3)">→ Cálculos atualizam automaticamente</div>'
    + '<div style="margin-left:auto;display:flex;gap:8px">'
      + '<button class="btn btn-sm" onclick="gerarRelatorioCapacidade()" style="border-color:#185FA5;color:#185FA5">📄 Relatório PDF</button>'
      + '<button class="btn btn-sm btn-primary" onclick="abrirNovaFuncaoCapacidade()">+ Nova Função</button>'
      + '<button class="btn btn-sm btn-danger" id="btn-excluir-sel" onclick="excluirFuncoesSelecionadas()" style="display:none">🗑 Excluir selecionadas</button>'
    + '</div>'
  + '<div style="border-top:0.5px solid var(--border);padding-top:10px;margin-top:10px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">'
    + '<span style="font-size:12px;font-weight:600;color:var(--txt2)">📅 Dias úteis:</span>'
    + '<input type="number" value="'+_diasUteis+'" min="1" max="31" style="width:55px;text-align:center;font-size:14px;font-weight:700;border:1.5px solid var(--border2);border-radius:7px;padding:3px 6px" onchange="setCapConfig(\'dias\',this.value)" oninput="setCapConfig(\'dias\',this.value)"/>'
    + '<span style="font-size:12px;font-weight:600;color:var(--txt2)">⚠️ Limite sobrecarga:</span>'
    + '<input type="number" value="'+_sobrecarrPct+'" min="1" max="999" step="1" style="width:64px;text-align:center;font-size:14px;font-weight:700;border:1.5px solid var(--border2);border-radius:7px;padding:3px 6px" onchange="setCapConfig(\'sobre\',this.value)" oninput="setCapConfig(\'sobre\',this.value)"/>'
    + '<span style="font-size:12px;color:var(--txt3)">%</span>'
  + '</div>'
  + '</div>'

  // Stats macro — 6 cards
  + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px">'
    // Card 1: Demanda total
    + '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:var(--txt2);margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">⏱ Demanda Total</div>'
      + '<div style="font-size:22px;font-weight:800;color:var(--txt)">'+horas(totalMinFunc)+'</div>'
      + '<div style="font-size:10px;color:var(--txt3)">horas/mês com '+qtdServicos+' serviços</div>'
      + '<div style="margin-top:5px;font-size:11px;font-weight:600;color:var(--blue)">👤 '+Math.ceil(totalMinFunc/(8*60*_diasUteis))+' pessoa'+(Math.ceil(totalMinFunc/(8*60*_diasUteis))!==1?'s':'')+' ideais</div>'
    + '</div>'
    // Card 2: Capacidade disponível
    + '<div style="background:'+(deficit?'#FCEBEB':'var(--green-bg)')+';border:0.5px solid '+(deficit?'rgba(163,45,45,.3)':'rgba(29,158,117,.3)')+';border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:'+(deficit?'#A32D2D':'var(--green2)')+';margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">✅ Capacidade Disponível</div>'
      + '<div style="font-size:22px;font-weight:800;color:'+(deficit?'#A32D2D':'var(--green)')+'">'+horasDisponiveisTotal.toFixed(0)+'h</div>'
      + '<div style="font-size:10px;color:'+(deficit?'#A32D2D':'var(--green2)')+'">'+nFuncionarios+' func. (8h) + '+nEstagiarios+' est. (6h) × 22 dias</div>'
    + '</div>'
    // Card 3: % Utilização
    + '<div style="background:'+(pctUsoTotal>=100?'#FCEBEB':pctUsoTotal>=80?'#FAEEDA':'var(--bg)')+';border:0.5px solid var(--border);border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:var(--txt2);margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">📊 Utilização da Equipe</div>'
      + '<div style="font-size:22px;font-weight:800;color:'+(pctUsoTotal>=100?'#A32D2D':pctUsoTotal>=80?'#854F0B':'var(--green)')+'">'+pctUsoTotal+'%</div>'
      + '<div style="font-size:10px;color:var(--txt3);margin-bottom:6px">da capacidade instalada</div>'
      + '<div style="height:6px;background:var(--bg3);border-radius:3px;overflow:hidden">'
        + '<div style="height:100%;width:'+Math.min(pctUsoTotal,100)+'%;background:'+(pctUsoTotal>=100?'#A32D2D':pctUsoTotal>=80?'#854F0B':'var(--green)')+';border-radius:3px"></div>'
      + '</div>'
    + '</div>'
  + '</div>'
  + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">'
    // Card 4: Funcionários vs Estagiários
    + '<div style="background:var(--bg);border:0.5px solid var(--border);border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:var(--txt2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">👥 Equipe Ativa</div>'
      + '<div style="display:flex;gap:16px">'
        + '<div><div style="font-size:20px;font-weight:800;color:var(--blue)">'+nFuncionarios+'</div><div style="font-size:10px;color:var(--txt3)">Funcionários<br>8h/dia</div></div>'
        + '<div style="width:0.5px;background:var(--border)"></div>'
        + '<div><div style="font-size:20px;font-weight:800;color:var(--amber)">'+nEstagiarios+'</div><div style="font-size:10px;color:var(--txt3)">Estagiários<br>6h/dia</div></div>'
      + '</div>'
    + '</div>'
    // Card 5: Sobrecarregados
    + '<div style="background:'+(sobrecarregadas.length>0?'#FCEBEB':'var(--green-bg)')+';border:0.5px solid var(--border);border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:var(--txt2);margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">⚠️ Sobrecarregados</div>'
      + '<div style="font-size:22px;font-weight:800;color:'+(sobrecarregadas.length>0?'#A32D2D':'var(--green)')+'">'+sobrecarregadas.length+'</div>'
      + '<div style="font-size:10px;color:var(--txt3)">pessoas acima de 100%</div>'
    + '</div>'
    // Card 6: Déficit / Superávit
    + '<div style="background:'+(deficit?'#FCEBEB':'var(--green-bg)')+';border:0.5px solid '+(deficit?'rgba(163,45,45,.3)':'rgba(29,158,117,.3)')+';border-radius:10px;padding:13px">'
      + '<div style="font-size:10px;color:'+(deficit?'#A32D2D':'var(--green2)')+';margin-bottom:3px;text-transform:uppercase;letter-spacing:.05em;font-weight:600">'+(deficit?'🔴 Déficit de Pessoal':'🟢 Capacidade Ociosa')+'</div>'
      + '<div style="font-size:22px;font-weight:800;color:'+(deficit?'#A32D2D':'var(--green)')+'">'+Math.abs(parseFloat(deficit ? faltamPessoas : (horasDisponiveisTotal - horasDemandaTotal).toFixed(0)))+''+(deficit?'':'h')+'</div>'
      + '<div style="font-size:10px;color:'+(deficit?'#A32D2D':'var(--green2)')+'">'+( deficit ? 'funcionários necessários para cobrir' : 'horas sobrando por mês')+'</div>'
    + '</div>'
  + '</div>'

  // Alertas de sobrecarga
  + (sobrecarregadas.length > 0
    ? '<div style="background:#FCEBEB;border:0.5px solid rgba(163,45,45,.3);border-radius:10px;padding:14px;margin-bottom:16px">'
        + '<div style="font-size:12px;font-weight:700;color:#A32D2D;margin-bottom:8px">⚠️ ATENÇÃO — Pessoas sobrecarregadas (>100%)</div>'
        + sobrecarregadas.map(p => {
            const pct = pctOcu(cargaPessoa[p]);
            const col = colaboradores.find(c=>c.nome===p);
            const colId = col ? col.id : '';
            return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;padding:5px 8px;border-radius:7px;cursor:pointer;transition:background .15s" '
              +(colId ? 'onclick="renderPerfilAba(\''+colId+'\',\'funcoes_col\')" onmouseover="this.style.background=\'rgba(163,45,45,.08)\'" onmouseout="this.style.background=\'\'"' : '')+'>'
              + av(p,false,true)
              + '<span style="font-size:12px;font-weight:600;color:#A32D2D'+(colId?';text-decoration:underline;text-decoration-style:dotted':'')+'">'+p+'</span>'
              + '<span style="font-size:11px;color:#854F0B;margin-left:auto">'+pct+'% de ocupação · '+horas(cargaPessoa[p])+'</span>'
              + (colId ? '<span style="font-size:10px;color:#A32D2D;opacity:.6">→ Funções</span>' : '')
            + '</div>';
          }).join('')
      + '</div>'
    : '')

  // TABS: Pessoas | Por Área
  + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">'
    + '<div style="display:flex;gap:0;border:0.5px solid var(--border2);border-radius:8px;overflow:hidden;width:fit-content">'
      + '<button id="tab-cap-pessoas" class="btn btn-primary btn-sm" onclick="switchCapTab(\'pessoas\')">👥 Por Pessoa</button>'
      + '<button id="tab-cap-areas" class="btn btn-sm" onclick="switchCapTab(\'areas\')">📋 Por Área / Função</button>'
    + '</div>'
    + '<button class="btn btn-sm btn-danger" id="btn-excluir-selecionadas" onclick="excluirFuncoesSelecionadas()" style="display:none">🗑 Excluir selecionadas</button>'
    + '<button class="btn btn-sm" onclick="render(\'capacidade\')" style="display:flex;align-items:center;gap:5px;border-color:var(--green);color:var(--green)">🔄 Atualizar</button>'
  + '</div>'

  + '<div id="cap-panel-pessoas" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">'
    + pessoaCards
  + '</div>'

  + '<div id="cap-panel-areas" style="display:none">'
    + tabelaAreas
  + '</div>';
}

function switchCapTab(tab) {
  _capTab = tab; // salvar aba ativa globalmente
  const isPessoas = tab === 'pessoas';
  document.getElementById('cap-panel-pessoas').style.display = isPessoas ? 'grid' : 'none';
  document.getElementById('cap-panel-areas').style.display  = isPessoas ? 'none' : 'block';
  document.getElementById('tab-cap-pessoas').style.background = isPessoas ? 'var(--green)' : 'var(--bg2)';
  document.getElementById('tab-cap-pessoas').style.color = isPessoas ? '#fff' : 'var(--txt2)';
  document.getElementById('tab-cap-areas').style.background  = isPessoas ? 'var(--bg2)' : 'var(--green)';
  document.getElementById('tab-cap-areas').style.color  = isPessoas ? 'var(--txt2)' : '#fff';
}

function ajustarServicos(delta) {
  qtdServicos = Math.max(1, qtdServicos + delta);
  lss('qtdServicos', qtdServicos);
  render('capacidade');
}

function setCapConfig(tipo, val) {
  const n = parseInt(val);
  if (isNaN(n) || n < 1) return;
  if (tipo === 'dias') lss('cap_dias_uteis', Math.min(31, Math.max(1, n)));
  else if (tipo === 'sobre') lss('cap_sobrecarga_pct', Math.min(200, Math.max(50, n)));
  clearTimeout(window._capConfigTimer);
  window._capConfigTimer = setTimeout(() => render('capacidade'), 600);
}

function setServicos(val) {
  const n = parseInt(val);
  if (n > 0) {
    qtdServicos = n;
    lss('qtdServicos', qtdServicos);
    render('capacidade');
  }
}

// ═══════════════════════════════════════════════════════════════
// EDITAR FUNÇÃO DE CAPACIDADE (modal rico)
// ═══════════════════════════════════════════════════════════════
// ── Seleção múltipla de funções ───────────────────────
function toggleSelectAllFuncs(checkbox) {
  document.querySelectorAll('.func-sel').forEach(cb => { cb.checked = checkbox.checked; });
  onFuncSelect();
}
function onFuncSelect() {
  const sel = document.querySelectorAll('.func-sel:checked');
  // Atualizar ambos os botões possíveis
  ['btn-excluir-selecionadas','btn-excluir-sel'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = sel.length > 0 ? '' : 'none';
      btn.textContent = '🗑 Excluir ' + sel.length + (sel.length === 1 ? ' função' : ' funções');
    }
  });
}
function excluirFuncoesSelecionadas() {
  const sel = Array.from(document.querySelectorAll('.func-sel:checked'));
  if (!sel.length) return;
  if (!confirm('Excluir ' + sel.length + ' função(ões) selecionada(s)?')) return;
  const ids = sel.map(cb => decodeURIComponent(cb.dataset.fid));
  let funcsAtual = ls('funcoes_v8', []);
  funcsAtual = funcsAtual.filter(f => !ids.includes(f.id));
  lss('funcoes_v8', funcsAtual);
  saveAll();
  toast('✅ ' + ids.length + ' função(ões) excluída(s)!');
  render('capacidade');
  setTimeout(() => switchCapTab('areas'), 10);
}

function abrirFuncaoDeColaborador(encodedId) {
  const id = decodeURIComponent(encodedId);
  closeModal();
  // Ir para capacidade, aba áreas, e abrir modal de edição da função
  go('capacidade');
  setTimeout(() => {
    switchCapTab('areas');
    setTimeout(() => editarFuncaoCapacidade(id), 300);
  }, 150);
}

function editarFuncaoCapacidade(id) {
  const funcoesV2 = ls('funcoes_v8', migrarFuncoes());
  let f = funcoesV2.find(x => x.id === id);
  if (!f) {
    f = funcoesV2.find(x => x.id === id || x.id.replace(/[^a-z0-9]/gi,'') === id.replace(/[^a-z0-9]/gi,''));
  }
  if (!f) return;
  _showFuncCapModal(f, false);
}



function toggleTodosChecks(el) {
  document.querySelectorAll('.func-check').forEach(c => c.checked = el.checked);
}

function abrirNovaFuncaoCapacidade() {
  _showFuncCapModal({
    id: null, area: 'EMC', nome: '', tempoMin: 10,
    tipoTempo: 'por_servico', pctServicos: 100, responsaveis: []
  }, true);
}

function _showFuncCapModal(f, isNew) {
  const areas = Object.keys(AREA_COLORS);
  let respRows = (f.responsaveis||[]).map((r,i) =>
    '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px" id="resp-row-'+i+'">'
      + '<select data-resp-nome="'+i+'" style="flex:2;font-size:12px"><option value="">Selecionar...</option>'+colaboradores.filter(c=>c.status==='Ativo').sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>'<option value="'+c.nome+'"'+(c.nome===r.nome?' selected':'')+'>'+c.nome+' ('+c.nivel+')</option>').join('')+'</select>'
      + '<input type="number" value="'+r.pct+'" min="1" max="100" placeholder="%" data-resp-pct="'+i+'" style="width:70px"/>'
      + '<span style="font-size:11px;color:var(--txt3)">%</span>'
      + '<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>'
    + '</div>'
  ).join('');

  document.getElementById('modal-title').textContent = isNew ? '+ Nova Função' : '✏️ Editar: '+f.nome;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML =
    '<div class="form-grid mb-12">'
      + '<div class="field-group form-full"><div class="field-label">Nome da Função *</div><input id="fc-nome" value="'+(f.nome||'')+'" placeholder="Ex: Ensaios Radiados"/></div>'
      + '<div class="field-group"><div class="field-label">Área</div><select id="fc-area">'+areas.map(a=>'<option value="'+a+'"'+(f.area===a?' selected':'')+'>'+a+'</option>').join('')+'</select></div>'
      + '<div class="field-group"><div class="field-label">Tipo de Tempo</div>'
        + '<select id="fc-tipo" onchange="updateFCTipoView()">'
          + '<option value="por_servico"'+(f.tipoTempo==='por_servico'?' selected':'')+'>Por serviço</option>'
          + '<option value="fixo_mes"'+(f.tipoTempo==='fixo_mes'?' selected':'')+'>Fixo por mês</option>'
        + '</select>'
      + '</div>'
      + '<div class="field-group"><div class="field-label" id="lbl-tempo">Minutos por serviço</div><input id="fc-tempo" type="number" min="1" value="'+(f.tempoMin||10)+'"/></div>'
      + '<div class="field-group" id="div-pct-servicos"><div class="field-label">% dos serviços que passam</div><div style="display:flex;align-items:center;gap:8px"><input id="fc-pct" type="number" min="0" max="100" value="'+(f.pctServicos||100)+'" style="width:80px"/><span style="font-size:12px;color:var(--txt2)">%</span></div></div>'
      + '<div class="field-group"><div class="field-label">Estimativa automática</div><div id="fc-estimativa" style="padding:8px;background:var(--green-bg);border-radius:7px;font-size:12px;color:var(--green2);font-weight:600">—</div></div>'
    + '</div>'
    + '<div class="divider"></div>'
    + '<div style="font-size:13px;font-weight:600;color:var(--txt);margin-bottom:10px">Responsáveis e dedicação</div>'
    + '<div id="resp-list">'+respRows+'</div>'
    + '<button class="btn btn-sm mt-4" onclick="addRespRow()">+ Adicionar responsável</button>'
    + '<div class="flex gap-8 mt-16 justify-between">'
      + (!isNew ? '<button class="btn btn-danger btn-sm" onclick="deletarFuncaoCapacidade(\''+f.id+'\')">Excluir</button>' : '<div></div>')
      + '<div class="flex gap-8">'
        + '<button class="btn btn-sm" onclick="closeModal()">Cancelar</button>'
        + '<button class="btn btn-primary" onclick="salvarFuncaoCapacidade(\''+( f.id||'')+'\')">💾 Salvar</button>'
      + '</div>'
    + '</div>';
  document.getElementById('modal').style.display = 'flex';
  updateFCTipoView();
  updateFCEstimativa();
  // Listeners em tempo real
  ['fc-tempo','fc-pct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateFCEstimativa);
  });
}

function updateFCTipoView() {
  const tipo = (document.getElementById('fc-tipo')||{}).value;
  const divPct = document.getElementById('div-pct-servicos');
  const lbl = document.getElementById('lbl-tempo');
  if (tipo === 'fixo_mes') {
    if (divPct) divPct.style.display = 'none';
    if (lbl) lbl.textContent = 'Minutos por mês (total fixo)';
  } else {
    if (divPct) divPct.style.display = '';
    if (lbl) lbl.textContent = 'Minutos por serviço';
  }
  updateFCEstimativa();
}

function updateFCEstimativa() {
  const tipo = (document.getElementById('fc-tipo')||{}).value || 'por_servico';
  const tempo = parseInt((document.getElementById('fc-tempo')||{}).value||0);
  const pct = parseInt((document.getElementById('fc-pct')||{}).value||100);
  const el = document.getElementById('fc-estimativa');
  if (!el) return;
  if (tipo === 'fixo_mes') {
    el.textContent = (tempo/60).toFixed(1)+'h fixas por mês';
  } else {
    const min = qtdServicos * (pct/100) * tempo;
    el.textContent = (min/60).toFixed(1)+'h/mês com '+qtdServicos+' amostras ('+pct+'% × '+tempo+'min)';
  }
}

function addRespRow() {
  const list = document.getElementById('resp-list');
  const i = Date.now();
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:8px';
  const opts = '<option value="">Selecionar colaborador...</option>'
    + colaboradores.filter(c=>c.status==='Ativo').sort((a,b)=>a.nome.localeCompare(b.nome))
        .map(c=>'<option value="'+c.nome+'">'+c.nome+' ('+c.nivel+')</option>').join('');
  div.innerHTML = '<select data-resp-nome="'+i+'" style="flex:2;font-size:12px">'+opts+'</select>'
    + '<input type="number" value="100" min="1" max="100" placeholder="%" data-resp-pct="'+i+'" style="width:70px"/>'
    + '<span style="font-size:11px;color:var(--txt3)">%</span>'
    + '<button class="btn btn-xs btn-danger" onclick="this.parentElement.remove()">×</button>';
  list.appendChild(div);
}

function salvarFuncaoCapacidade(id) {
  const nome = ((document.getElementById('fc-nome')||{}).value||'').trim();
  if (!nome) { alert('Nome obrigatório'); return; }
  // Ler responsáveis
  const respRows = [];
  document.querySelectorAll('#resp-list [data-resp-nome]').forEach(el => {
    const key = el.dataset.respNome;
    const pctEl = document.querySelector('#resp-list [data-resp-pct="'+key+'"]');
    const n = (el.value||'').trim();
    const p = parseInt((pctEl&&pctEl.value)||100);
    if (n) respRows.push({nome:n, pct:p});
  });

  const obj = {
    id: id || uid(),
    nome,
    area: document.getElementById('fc-area').value,
    tipoTempo: document.getElementById('fc-tipo').value,
    tempoMin: parseInt(document.getElementById('fc-tempo').value)||10,
    pctServicos: parseInt((document.getElementById('fc-pct')||{}).value||0),
    responsaveis: respRows,
    colaboradores: respRows.map(r => {
      const col = colaboradores.find(c => c.nome === r.nome);
      return col ? {colId: col.id, pct: r.pct} : null;
    }).filter(Boolean),
    tempoSemana: 8,
  };

  let funcoesV2 = ls('funcoes_v8', migrarFuncoes());
  if (id) {
    const idx = funcoesV2.findIndex(x => x.id === id);
    if (idx >= 0) funcoesV2[idx] = obj; else funcoesV2.push(obj);
  } else {
    funcoesV2.push(obj);
  }
  lss('funcoes_v8', funcoesV2);
  saveAll(); // persiste e agenda sync para nuvem
  closeModal();
  toast('Função salva! ✓');
  render('capacidade');
}

function deletarFuncaoCapacidade(id) {
  if (!confirm('Excluir esta função?')) return;
  let funcoesV2 = ls('funcoes_v8', migrarFuncoes());
  funcoesV2 = funcoesV2.filter(x => x.id !== id);
  lss('funcoes_v8', funcoesV2);
  saveAll();
  closeModal();
  toast('Excluída!');
  render('capacidade');
}


</script>

<!-- Módulos JS extraídos -->
<script src="js/avaliacao.js"></script>
<script src="js/pdi.js"></script>
<script src="js/competencias.js"></script>
<script src="js/metas.js"></script>
<script src="js/ia.js"></script>
<script src="js/notas.js"></script>

<!-- Overlay mobile -->
<div class="sidebar-overlay" id="sidebar-overlay" onclick="closeMobSidebar()"></div>
<!-- Nav mobile inferior -->
<nav class="mob-nav" id="mob-nav">
  <div class="mob-nav-item" id="mobnav-mais" onclick="toggleMobSidebar()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg><span>Menu</span></div>
  <div class="mob-nav-item" id="mobnav-colaboradores" onclick="go('colaboradores')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg><span>Equipe</span></div>
  <div class="mob-nav-item" id="mobnav-avaliacao" onclick="go('avaliacao_hub')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg><span>Avaliação</span></div>
  <div class="mob-nav-item" id="mobnav-agente" onclick="go('agente')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg><span>IA</span></div>
  <div class="mob-nav-item" id="mobnav-dashboard" onclick="go('dashboard')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Início</span></div>
</nav>
<!-- Botão hambúrguer -->
<button class="mob-menu-btn" id="mob-menu-btn" onclick="toggleMobSidebar()" title="Menu">☰</button>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- TELA DE LOGIN / REGISTRO SQUADO                                -->
<!-- ═══════════════════════════════════════════════════════════════ -->
<div id="squado-auth-overlay" style="display:none;position:fixed;inset:0;z-index:99999;background:#FCFCFA;font-family:'Archivo',sans-serif;overflow-y:auto;flex-direction:column">
<style>
#squado-auth-overlay{font-family:'Archivo',sans-serif}
</style>
<!-- Ticker animado -->
<div class="sq-login-ticker">
  <div class="sq-login-ticker-inner">
    CICLO Q2 ABERTO &nbsp;·&nbsp; UPTIME 99.97% &nbsp;·&nbsp; SP · BRASIL &nbsp;·&nbsp; &gt; NOVA RELEASE · V6.0 &nbsp;·&nbsp; 240 EMPRESAS ATIVAS &nbsp;·&nbsp;
    CICLO Q2 ABERTO &nbsp;·&nbsp; UPTIME 99.97% &nbsp;·&nbsp; SP · BRASIL &nbsp;·&nbsp; &gt; NOVA RELEASE · V6.0 &nbsp;·&nbsp; 240 EMPRESAS ATIVAS &nbsp;·&nbsp;
  </div>
</div>
<div class="sq-login-grid">
  <div class="sq-col-premissa">
    <div>
      <div class="sq-label"><div class="sq-label-dot"></div>001 / PREMISSA</div>
      <div class="sq-headline">GENTE<br><em>NÃO É</em><br><span class="dim">PLANILHA.</span></div>
      <div class="sq-desc">Squado é o sistema operacional para empresas que tratam talento como ativo estratégico — com método, evidência e ritmo.</div>
    </div>
    <div class="sq-metrics">
      <div class="sq-metric"><div class="sq-metric-label">Companhias</div><div class="sq-metric-val">240+</div></div>
      <div class="sq-metric"><div class="sq-metric-label">Avaliações/mês</div><div class="sq-metric-val">12k</div></div>
    </div>
  </div>
  <div class="sq-col-identidade">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;color:rgba(255,255,255,.35);margin-bottom:32px;align-self:flex-start">002 / IDENTIDADE</div>
    <svg width="180" height="180" viewBox="0 0 200 200" fill="none" style="margin-bottom:32px">
      <rect x="30" y="30" width="140" height="30" fill="#0F6E56"/>
      <rect x="30" y="30" width="30" height="80" fill="#0F6E56"/>
      <rect x="30" y="90" width="140" height="30" fill="#0F6E56"/>
      <rect x="140" y="90" width="30" height="80" fill="#0F6E56"/>
      <rect x="30" y="140" width="140" height="30" fill="#0F6E56"/>
      <circle cx="160" cy="45" r="12" fill="#FCFCFA"/>
    </svg>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;width:100%">
      <div style="background:#0F6E56;padding:8px 12px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#fff;letter-spacing:.06em">0F6E56</div>
      <div style="background:#FCFCFA;padding:8px 12px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#0E0E0E;letter-spacing:.06em">FCFCFA</div>
    </div>
  </div>
  <div class="sq-col-acesso">
    <div class="sq-label"><div class="sq-label-dot"></div>003 / ACESSO</div>
    <div class="sq-login-title">ENTRAR.</div>
    <div class="sq-login-sub">Acesse o sistema com sua conta corporativa.</div>
    <div class="sq-tabs">
      <button class="sq-tab active" id="tab-login" onclick="squadoShowTab('login')">Entrar</button>
      <button class="sq-tab" id="tab-registro" onclick="squadoShowTab('registro')">Criar conta</button>
    </div>
    <div id="form-login">
      <div class="sq-field">
        <div class="sq-field-header"><span class="sq-field-label">E-mail</span><span class="sq-field-label" style="opacity:.5">OBRIGATÓRIO</span></div>
        <input id="sq-login-email" type="email" class="sq-input" placeholder="voce@empresa.com" autocomplete="email"/>
      </div>
      <div class="sq-field">
        <div class="sq-field-header"><span class="sq-field-label">Senha</span><button class="sq-field-link" onclick="document.getElementById('squado-forgot-pw').style.display='block'">RECUPERAR</button></div>
        <input id="sq-login-senha" type="password" class="sq-input" placeholder="••••••••" autocomplete="current-password"/>
      </div>
      <div class="sq-checkbox-row">
        <input type="checkbox" class="sq-checkbox" id="sq-remember"/><label for="sq-remember" class="sq-checkbox-label">Manter conectado</label>
      </div>
      <div id="sq-login-erro" style="display:none;color:#A6311F;font-size:12px;padding:4px 0;font-family:'Inter',sans-serif"></div>
      <button class="sq-btn-login" id="sq-login-btn" onclick="squadoLogin()">ENTRAR NA PLATAFORMA <span>↗</span></button>
      <div class="sq-divider">— OU VIA SSO —</div>
      <div class="sq-sso-grid">
        <button class="sq-sso-btn">↳ Google</button>
        <button class="sq-sso-btn">⊞ Microsoft</button>
      </div>
      <div class="sq-login-footer-txt">Sem conta? <a onclick="squadoShowTab('registro')">Solicitar acesso</a></div>
      <div id="squado-forgot-pw" style="display:none;margin-top:16px;padding:16px;background:#F4F3EE;border:1px solid #E0E2E0">
        <div class="sq-field-label" style="margin-bottom:10px">RECUPERAR SENHA</div>
        <input id="sq-forgot-email" type="email" class="sq-input" placeholder="seu@email.com" style="margin-bottom:12px"/>
        <button class="sq-btn-login" style="margin-bottom:0" onclick="squadoRecuperarSenha()">ENVIAR LINK <span>→</span></button>
      </div>
    </div>
    <div id="form-registro" style="display:none">
      <div class="sq-field">
        <div class="sq-field-header"><span class="sq-field-label">Nome completo</span></div>
        <input id="sq-reg-nome" type="text" class="sq-input" placeholder="Seu nome"/>
      </div>
      <div class="sq-field">
        <div class="sq-field-header"><span class="sq-field-label">E-mail corporativo</span></div>
        <input id="sq-reg-email" type="email" class="sq-input" placeholder="voce@empresa.com"/>
      </div>
      <div class="sq-field">
        <div class="sq-field-header"><span class="sq-field-label">Senha</span></div>
        <input id="sq-reg-pass" type="password" class="sq-input" placeholder="Mínimo 8 caracteres"/>
      </div>
      <button class="sq-btn-login" onclick="squadoRegistro()">CRIAR CONTA <span>↗</span></button>
      <div class="sq-login-footer-txt" style="margin-top:12px">Já tem conta? <a onclick="squadoShowTab('login')">Entrar</a></div>
    </div>
  </div>
</div>
<!-- Botão sair mobile removido — integrado na nav inferior -->
<div id="squado-sair-mobile" style="display:none"></div>

<script>

// ── RELATÓRIO PDF DE CAPACIDADE ──
function gerarRelatorioCapacidade(){
  const funcoesV2=ls('funcoes_v8',migrarFuncoes());
  const amostras=qtdServicos;
  const cargaPessoa=calcCargaPorPessoa(amostras);
  const DIAS_UTEIS=22;
  const MIN_FUNC=8*60*DIAS_UTEIS, MIN_EST=6*60*DIAS_UTEIS;
  const NIVEIS_EST=['Estagiário'];
  const nFunc=colaboradores.filter(c=>!NIVEIS_EST.includes(c.nivel)&&c.status==='Ativo').length;
  const nEst=colaboradores.filter(c=>NIVEIS_EST.includes(c.nivel)&&c.status==='Ativo').length;
  const minDisp=(nFunc*MIN_FUNC)+(nEst*MIN_EST);
  const totalMinFunc=funcoesV2.reduce((acc,f)=>acc+calcCargaFuncao(f,amostras),0);
  const pctUso=minDisp>0?Math.round(totalMinFunc/minDisp*100):0;
  const deficit=totalMinFunc>minDisp;
  const faltam=deficit?((totalMinFunc-minDisp)/MIN_FUNC).toFixed(1):0;
  const pessoas=Object.keys(cargaPessoa).sort((a,b)=>cargaPessoa[b]-cargaPessoa[a]);
  const sobrecarregadas=pessoas.filter(p=>cargaPessoa[p]>MIN_FUNC).sort((a,b)=>cargaPessoa[b]-cargaPessoa[a]);
  function h(min){return(min/60).toFixed(1)+'h';}
  function pct(min){return Math.round(min/MIN_FUNC*100);}
  function scC(p){return p>=100?'#A32D2D':p>=80?'#854F0B':p>=60?'#185FA5':'#1D9E75';}
  function scB(p){return p>=100?'#FCEBEB':p>=80?'#FAEEDA':p>=60?'#E6F1FB':'#E1F5EE';}

  // Agrupar funções por área
  const byArea={};
  funcoesV2.forEach(f=>{if(!byArea[f.area])byArea[f.area]=[];byArea[f.area].push(f);});

  // Tabela de pessoas
  const pessoaRows=pessoas.map(nome=>{
    const min=cargaPessoa[nome];const p=pct(min);
    const col=colaboradores.find(c=>c.nome===nome);
    const bar='<div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden"><div style="height:100%;width:'+Math.min(p,100)+'%;background:'+scC(p)+';border-radius:4px"></div></div>';
    return '<tr style="'+(p>=100?'background:#fff8f8':'')+'"><td style="padding:8px 12px;font-size:12px;font-weight:600">'+nome+'</td>'
      +'<td style="padding:8px 12px;font-size:11px;color:#6b7280">'+(col?col.nivel+' · '+col.area:'')+'</td>'
      +'<td style="padding:8px 12px;width:160px">'+bar+'</td>'
      +'<td style="padding:8px 12px;text-align:center;font-size:14px;font-weight:800;color:'+scC(p)+'">'+p+'%</td>'
      +'<td style="padding:8px 12px;text-align:center;font-size:12px;color:#374151">'+h(min)+'</td>'
      +'<td style="padding:8px 12px;text-align:center;font-size:12px;color:'+(p>=100?'#A32D2D':'#6b7280')+'">'+(p>=100?'⚠️ ACIMA DA CAPACIDADE':'OK')+'</td>'
    +'</tr>';
  }).join('');

  // Tabela de funções por área
  const funcRows=Object.entries(byArea).map(([area,funcs])=>{
    const areaTotal=funcs.reduce((acc,f)=>acc+calcCargaFuncao(f,amostras),0);
    const nomesAreaPDF = new Set(); funcs.forEach(f=>(f.responsaveis||[]).forEach(r=>nomesAreaPDF.add(r.nome)));
    const piArea = Math.ceil(areaTotal/(8*60*22));
    const realPDF = nomesAreaPDF.size;
    const deficitA = piArea > realPDF;
    const header='<tr style="background:#f0fdf4"><td colspan="5" style="padding:8px 14px;font-size:12px;font-weight:800;color:#0F6E56;border-top:2px solid #1D9E75">'
      +area+' — Total: '+h(areaTotal)+'/mês'
      +'<span style="margin-left:12px;font-size:11px;font-weight:700;padding:2px 10px;border-radius:20px;'
        +'background:'+(deficitA?'#FCEBEB':'#E1F5EE')+';color:'+(deficitA?'#A32D2D':'#0F6E56')+'">'
        +piArea+' pessoa'+(piArea!==1?'s':'')+' ideal'+(piArea!==1?'is':'')
        +' · '+(deficitA?'⚠️ '+realPDF+' alocada'+(realPDF!==1?'s':''):'✅ '+realPDF+' alocada'+(realPDF!==1?'s':''))
      +'</span>'
    +'</td></tr>';
    const rows=funcs.map(f=>{
      const cF=calcCargaFuncao(f,amostras);
      const resps=(f.responsaveis||[]).map(r=>r.nome.split(' ')[0]+'('+r.pct+'%)').join(', ');
      return '<tr><td style="padding:7px 12px;font-size:11.5px;padding-left:24px">'+f.nome+'</td>'
        +'<td style="padding:7px 12px;font-size:11px;color:#6b7280;text-align:center">'
          +(f.tipoTempo==='fixo_mes'?'<span style="background:#EEEDFE;color:#534AB7;padding:1px 7px;border-radius:10px;font-size:10px">fixo</span>':f.pctServicos+'% dos serviços')
        +'</td>'
        +'<td style="padding:7px 12px;font-size:11px;color:#374151;text-align:center">'
          +(f.tipoTempo==='fixo_mes'?h(f.tempoMin)+'/mês':f.tempoMin+'min/serviço')
        +'</td>'
        +'<td style="padding:7px 12px;font-size:12px;font-weight:700;color:#1D9E75;text-align:center">'+h(cF)+'</td>'
        +'<td style="padding:7px 12px;font-size:11px;color:#6b7280">'+resps+'</td>'
      +'</tr>';
    }).join('');
    return header+rows;
  }).join('');

  const dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  const html='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'
    +'<title>Relatório de Capacidade</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}'
    +'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}'
    +'@media print{body{padding:0}.no-print{display:none!important}@page{margin:20mm;size:A4}}'
    +'table{border-collapse:collapse;width:100%}'
    +'th{background:#f9fafb;text-align:left;padding:8px 12px;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;font-weight:700;border-bottom:2px solid #e5e7eb}'
    +'td{border-bottom:1px solid #f3f4f6}'
    +'</style>'
    +'<div class="no-print" style="position:fixed;top:0;left:0;right:0;background:#1D9E75;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;font-size:14px;flex:1">Relatório de Capacidade</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#1D9E75;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer;font-size:13px">🖨 Imprimir / Salvar PDF</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,0.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button>'
    +'</div>'
    +'<div class="no-print" style="height:52px"></div>'

    // CABEÇALHO
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1D9E75;margin-bottom:24px">'
      +'<div>'
        +'<div style="font-size:9px;font-weight:700;color:#1D9E75;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px">Squado</div>'
        +'<div style="font-size:26px;font-weight:900;color:#111827;margin-bottom:4px">Relatório de Gestão de Capacidade</div>'
        +'<div style="font-size:13px;color:#6b7280">Análise de carga de trabalho · Justificativa de dimensionamento</div>'
        +'<div style="font-size:11px;color:#9ca3af;margin-top:4px">Gerado em '+dataHoje+' · Base: '+qtdServicos+' amostras/mês</div>'
      +'</div>'
      +'<div style="text-align:center;background:'+(deficit?'#FCEBEB':'#E1F5EE')+';border-radius:12px;padding:14px 22px;border:2px solid '+(deficit?'#A32D2D':'#1D9E75')+'">'
        +'<div style="font-size:36px;font-weight:900;color:'+(deficit?'#A32D2D':'#1D9E75')+'">'+pctUso+'%</div>'
        +'<div style="font-size:10px;color:'+(deficit?'#A32D2D':'#0F6E56')+';font-weight:700;text-transform:uppercase;letter-spacing:.06em">Utilização</div>'
      +'</div>'
    +'</div>'

    // 6 INDICADORES MACRO
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">'
      +'<div style="background:#f9fafb;border-radius:10px;padding:14px;border-left:4px solid #1D9E75">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280;margin-bottom:4px">⏱ Demanda Total</div>'
        +'<div style="font-size:26px;font-weight:900;color:#111827">'+h(totalMinFunc)+'</div>'
        +'<div style="font-size:11px;color:#6b7280">horas/mês com '+qtdServicos+' serviços</div>'
      +'</div>'
      +'<div style="background:'+(deficit?'#FCEBEB':'#E1F5EE')+';border-radius:10px;padding:14px;border-left:4px solid '+(deficit?'#A32D2D':'#1D9E75')+'">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:'+(deficit?'#A32D2D':'#0F6E56')+';margin-bottom:4px">✅ Capacidade Instalada</div>'
        +'<div style="font-size:26px;font-weight:900;color:'+(deficit?'#A32D2D':'#1D9E75')+'">'+(minDisp/60).toFixed(0)+'h</div>'
        +'<div style="font-size:11px;color:'+(deficit?'#A32D2D':'#0F6E56')+'">'+nFunc+' func. × 8h/dia + '+nEst+' est. × 6h/dia × '+DIAS_UTEIS+' dias</div>'
      +'</div>'
      +'<div style="background:'+(deficit?'#FCEBEB':'#E1F5EE')+';border-radius:10px;padding:14px;border-left:4px solid '+(deficit?'#A32D2D':'#1D9E75')+'">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:'+(deficit?'#A32D2D':'#0F6E56')+';margin-bottom:4px">'+(deficit?'🔴 Déficit':'🟢 Superávit')+'</div>'
        +'<div style="font-size:26px;font-weight:900;color:'+(deficit?'#A32D2D':'#1D9E75')+'">'+(deficit?faltam+' pessoas':h(minDisp-totalMinFunc))+'</div>'
        +'<div style="font-size:11px;color:'+(deficit?'#A32D2D':'#0F6E56')+'">'+(deficit?'funcionários adicionais necessários':'de folga por mês')+'</div>'
      +'</div>'
      +'<div style="background:#f9fafb;border-radius:10px;padding:14px;border-left:4px solid #185FA5">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280;margin-bottom:4px">👥 Equipe Ativa</div>'
        +'<div style="font-size:26px;font-weight:900;color:#185FA5">'+(nFunc+nEst)+'</div>'
        +'<div style="font-size:11px;color:#6b7280">'+nFunc+' funcionários + '+nEst+' estagiários</div>'
      +'</div>'
      +'<div style="background:'+(sobrecarregadas.length>0?'#FCEBEB':'#E1F5EE')+';border-radius:10px;padding:14px;border-left:4px solid '+(sobrecarregadas.length>0?'#A32D2D':'#1D9E75')+'">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:'+(sobrecarregadas.length>0?'#A32D2D':'#0F6E56')+';margin-bottom:4px">⚠️ Sobrecarregados</div>'
        +'<div style="font-size:26px;font-weight:900;color:'+(sobrecarregadas.length>0?'#A32D2D':'#1D9E75')+'">'+sobrecarregadas.length+'</div>'
        +'<div style="font-size:11px;color:'+(sobrecarregadas.length>0?'#A32D2D':'#0F6E56')+'">pessoas acima de 100% de ocupação</div>'
      +'</div>'
      +'<div style="background:#f9fafb;border-radius:10px;padding:14px;border-left:4px solid #854F0B">'
        +'<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#6b7280;margin-bottom:4px">🔢 FTEs Necessários</div>'
        +'<div style="font-size:26px;font-weight:900;color:#854F0B">'+(totalMinFunc/MIN_FUNC).toFixed(1)+'</div>'
        +'<div style="font-size:11px;color:#6b7280">equivalente em tempo integral (8h/dia)</div>'
      +'</div>'
    +'</div>'

    // BARRA DE UTILIZAÇÃO VISUAL
    +'<div style="background:#f9fafb;border-radius:10px;padding:16px;margin-bottom:24px">'
      +'<div style="display:flex;justify-content:space-between;margin-bottom:8px">'
        +'<span style="font-size:12px;font-weight:700;color:#374151">Utilização da Capacidade Instalada</span>'
        +'<span style="font-size:12px;font-weight:700;color:'+(deficit?'#A32D2D':'#1D9E75')+'">'+h(totalMinFunc)+' / '+(minDisp/60).toFixed(0)+'h ('+pctUso+'%)</span>'
      +'</div>'
      +'<div style="height:14px;background:#e5e7eb;border-radius:7px;overflow:hidden">'
        +'<div style="height:100%;width:'+Math.min(pctUso,100)+'%;background:'+(deficit?'#A32D2D':pctUso>=80?'#854F0B':'#1D9E75')+';border-radius:7px"></div>'
      +'</div>'
      +(sobrecarregadas.length>0
        ?'<div style="margin-top:10px;padding:10px 14px;background:#FCEBEB;border-radius:8px;border-left:3px solid #A32D2D">'
          +'<div style="font-size:11px;font-weight:700;color:#A32D2D;margin-bottom:4px">Pessoas acima da capacidade:</div>'
          +'<div style="font-size:11px;color:#374151">'+sobrecarregadas.map(p=>{const pp=pct(cargaPessoa[p]);return p+' ('+pp+'%)';}).join(' · ')+'</div>'
        +'</div>'
        :'')
    +'</div>'

    // PÁGINA 2 — CARGA POR PESSOA
    +'<div style="page-break-before:always"></div>'
    +'<div style="font-size:14px;font-weight:800;color:#111827;margin-bottom:4px;padding-top:8px">Carga de Trabalho por Colaborador</div>'
    +'<div style="font-size:11px;color:#6b7280;margin-bottom:14px">Ordenado por ocupação (maior para menor) · 160h disponíveis/mês para funcionários</div>'
    +'<table style="margin-bottom:28px">'
      +'<thead><tr><th>Colaborador</th><th>Cargo / Área</th><th style="width:150px">Ocupação</th><th style="text-align:center">%</th><th style="text-align:center">Horas/mês</th><th style="text-align:center">Status</th></tr></thead>'
      +'<tbody>'+pessoaRows+'</tbody>'
    +'</table>'

    // PÁGINA 3 — FUNÇÕES POR ÁREA
    +'<div style="page-break-before:always"></div>'
    +'<div style="font-size:14px;font-weight:800;color:#111827;margin-bottom:4px;padding-top:8px">Detalhamento de Funções por Área</div>'
    +'<div style="font-size:11px;color:#6b7280;margin-bottom:14px">Base de cálculo: '+qtdServicos+' amostras/mês · '+DIAS_UTEIS+' dias úteis</div>'
    +'<table style="margin-bottom:28px">'
      +'<thead><tr>'
        +'<th onclick="sortAreaFuncs(\'nome\')" style="cursor:pointer;user-select:none">Função <span id=\"sa-nome\">⇅</span></th>'
        +'<th style="text-align:center">Cobertura</th>'
        +'<th onclick="sortAreaFuncs(\'tempo\')" style="text-align:center;cursor:pointer;user-select:none">Tempo Unit. <span id=\"sa-tempo\">⇅</span></th>'
        +'<th onclick="sortAreaFuncs(\'total\')" style="text-align:center;cursor:pointer;user-select:none">Total/mês <span id=\"sa-total\">⇅</span></th>'
        +'<th>Responsáveis</th>'
      +'</tr></thead>'
      +'<tbody>'+funcRows+'</tbody>'
    +'</table>'

    +(deficit
      ?'<div style="page-break-before:always"></div>'
        +'<div style="background:#FCEBEB;border-radius:12px;padding:20px 24px;border:2px solid #A32D2D;margin-bottom:20px">'
          +'<div style="font-size:16px;font-weight:800;color:#A32D2D;margin-bottom:8px">🔴 Justificativa de Contratação</div>'
          +'<div style="font-size:13px;color:#374151;line-height:1.7;margin-bottom:12px">'
            +'Com o volume atual de <strong>'+qtdServicos+' amostras/mês</strong>, a demanda total de trabalho é de <strong>'+h(totalMinFunc)+'/mês</strong>, '
            +'enquanto a capacidade instalada é de <strong>'+(minDisp/60).toFixed(0)+'h/mês</strong> ('+(nFunc+nEst)+' pessoas). '
            +'Isso representa um <strong>déficit de '+(totalMinFunc-minDisp<0?0:h(totalMinFunc-minDisp))+'/mês ('+( pctUso-100)+'% acima da capacidade)</strong>.<br><br>'
            +'<strong>'+sobrecarregadas.length+' colaboradores</strong> operam acima de 100% de ocupação: '
            +sobrecarregadas.map(p=>p.split(' ')[0]+' ('+pct(cargaPessoa[p])+'%)').join(', ')+'.<br><br>'
            +'Para normalizar a carga de trabalho sem comprometer a qualidade e os prazos, '
            +'recomenda-se a contratação de <strong>'+faltam+' funcionário(s) adicional(is)</strong>.'
          +'</div>'
          +'<table style="background:white;border-radius:8px;overflow:hidden">'
            +'<tr style="background:#f9fafb"><th style="padding:8px 14px;text-align:left">Cenário</th><th style="padding:8px 14px;text-align:center">Pessoas</th><th style="padding:8px 14px;text-align:center">Cap. Disponível</th><th style="padding:8px 14px;text-align:center">Utilização</th><th style="padding:8px 14px;text-align:center">Status</th></tr>'
            +'<tr><td style="padding:8px 14px;font-weight:600">Atual</td><td style="padding:8px 14px;text-align:center">'+(nFunc+nEst)+'</td><td style="padding:8px 14px;text-align:center">'+(minDisp/60).toFixed(0)+'h</td><td style="padding:8px 14px;text-align:center;color:#A32D2D;font-weight:700">'+pctUso+'%</td><td style="padding:8px 14px;text-align:center;color:#A32D2D;font-weight:700">⚠️ Déficit</td></tr>'
            +'<tr style="background:#f0fdf4"><td style="padding:8px 14px;font-weight:700;color:#1D9E75">Com +'+Math.ceil(parseFloat(faltam))+' Func.</td><td style="padding:8px 14px;text-align:center;color:#1D9E75;font-weight:700">'+(nFunc+nEst+Math.ceil(parseFloat(faltam)))+'</td><td style="padding:8px 14px;text-align:center;color:#1D9E75;font-weight:700">'+((minDisp+Math.ceil(parseFloat(faltam))*MIN_FUNC)/60).toFixed(0)+'h</td><td style="padding:8px 14px;text-align:center;color:#1D9E75;font-weight:700">'+Math.round(totalMinFunc/(minDisp+Math.ceil(parseFloat(faltam))*MIN_FUNC)*100)+'%</td><td style="padding:8px 14px;text-align:center;color:#1D9E75;font-weight:700">✅ Normalizado</td></tr>'
          +'</table>'
        +'</div>'
      :'')

    // RODAPÉ
    +'<div style="margin-top:32px;padding-top:14px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">'
      +'<span>Gestão de Pessoas</span>'
      +'<span>'+dataHoje+' · Gerado automaticamente pelo sistema</span>'
    +'</div>'
    +'</body></html>';

  const w=window.open('','_blank','width=1000,height=780');
  if(!w){alert('Permita pop-ups para gerar o relatório.');return;}
  w.document.write(html);
  w.document.close();
}


// Sort tabela de áreas
window._sortAreaCol = 'total'; window._sortAreaDir = -1;
function sortAreaFuncs(col){
  if(window._sortAreaCol===col) window._sortAreaDir *= -1;
  else { window._sortAreaCol=col; window._sortAreaDir=-1; }
  ['nome','tempo','total'].forEach(c=>{
    const el=document.getElementById('sa-'+c);
    if(el) el.textContent=c===window._sortAreaCol?(window._sortAreaDir===-1?'↓':'↑'):'⇅';
  });
  // Re-ordernar as linhas de cada tabela de área
  document.querySelectorAll('table[data-area]').forEach(table=>{
    const tbody=table.querySelector('tbody');
    if(!tbody) return;
    const rows=[...tbody.querySelectorAll('tr')];
    rows.sort((a,b)=>{
      let va=0,vb=0;
      if(window._sortAreaCol==='nome'){
        va=a.cells[1]?.textContent||'';
        vb=b.cells[1]?.textContent||'';
        return window._sortAreaDir*(va<vb?-1:va>vb?1:0);
      } else if(window._sortAreaCol==='tempo'){
        va=parseFloat(a.cells[3]?.textContent)||0;
        vb=parseFloat(b.cells[3]?.textContent)||0;
      } else {
        va=parseFloat(a.cells[4]?.querySelector('div')?.textContent)||0;
        vb=parseFloat(b.cells[4]?.querySelector('div')?.textContent)||0;
      }
      return window._sortAreaDir*(vb-va);
    });
    rows.forEach(r=>tbody.appendChild(r));
  });
}

window._sortAreaCol='total';window._sortAreaDir=-1;
function sortAreaFuncs(col){
  if(window._sortAreaCol===col)window._sortAreaDir*=-1;
  else{window._sortAreaCol=col;window._sortAreaDir=-1;}
  document.querySelectorAll('#cap-panel-areas tbody').forEach(tbody=>{
    const rows=[...tbody.querySelectorAll('tr')];
    rows.sort((a,b)=>{
      let va,vb;
      if(window._sortAreaCol==='nome'){
        va=(a.cells[1]?.textContent||'').trim();
        vb=(b.cells[1]?.textContent||'').trim();
        return window._sortAreaDir*(va<vb?-1:va>vb?1:0);
      } else if(window._sortAreaCol==='tempo'){
        va=parseFloat(a.cells[3]?.textContent)||0;
        vb=parseFloat(b.cells[3]?.textContent)||0;
      } else {
        const da=a.cells[4]?.querySelector('div');
        const db=b.cells[4]?.querySelector('div');
        va=parseFloat(da?.textContent)||0;
        vb=parseFloat(db?.textContent)||0;
      }
      return window._sortAreaDir*(vb-va);
    });
    rows.forEach(r=>tbody.appendChild(r));
  });
  // Atualizar indicadores nos TH
  document.querySelectorAll('#cap-panel-areas th[onclick]').forEach(th=>{
    const txt=th.textContent.replace(/[↑↓⇅]/g,'').trim();
    const isActive=th.getAttribute('onclick')?.includes(window._sortAreaCol);
    th.innerHTML=txt+' '+(isActive?(window._sortAreaDir===-1?'↓':'↑'):'⇅');
  });
}

function excluirSecao(nivel,sec){
  if(!confirm('Excluir a seção "'+sec+'" e todas as perguntas?'))return;
  if(perguntas[nivel])delete perguntas[nivel][sec];
  saveAll();render('perguntas');toast('Seção excluída!');
}
function renomearSecao(nivel,sec){
  const novo=prompt('Novo nome da seção:',sec);
  if(!novo||novo===sec)return;
  if(perguntas[nivel]){
    const qs=perguntas[nivel][sec];
    delete perguntas[nivel][sec];
    perguntas[nivel][novo]=qs;
  }
  saveAll();render('perguntas');toast('Seção renomeada!');
}
function excluirNivel(nivel){
  if(!confirm('Excluir o nível "'+nivel+'" e todas as suas perguntas?'))return;
  delete perguntas[nivel];
  saveAll();render('perguntas');toast('Nível excluído!');
}
function renomearNivel(nivel){
  const novo=prompt('Novo nome do nível:',nivel);
  if(!novo||novo===nivel)return;
  perguntas[novo]=perguntas[nivel];
  delete perguntas[nivel];
  saveAll();render('perguntas');toast('Nível renomeado!');
}
