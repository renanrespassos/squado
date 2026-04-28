function renderColaboradores(search=''){
  const abaAtiva = window._colTab || 'ativos';
  let list = abaAtiva === 'desligados'
    ? colaboradores.filter(c => c.status === 'Desligado')
    : colaboradores.filter(c => c.status !== 'Desligado');

  if(search) list = list.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    (c.area||'').toLowerCase().includes(search.toLowerCase()) ||
    (c.nivel||'').toLowerCase().includes(search.toLowerCase())
  );

  // Filtros por área e nível
  var filtroArea = window._colFiltroArea || '';
  var filtroNivel = window._colFiltroNivel || '';
  if(filtroArea) list = list.filter(c => c.area === filtroArea);
  if(filtroNivel) list = list.filter(c => c.nivel === filtroNivel);

  // Ordenação
  var sortCol = window._colSort || 'nome';
  var sortDir = window._colSortDir || 'asc';
  list.sort(function(a,b){
    var va = (a[sortCol]||'').toLowerCase(), vb = (b[sortCol]||'').toLowerCase();
    if(sortCol === 'ultimaAval'){
      var avsA = avaliacoes.filter(x=>x.colaboradorId===a.id);
      var avsB = avaliacoes.filter(x=>x.colaboradorId===b.id);
      va = avsA.length ? avsA[avsA.length-1].mediaGeral : 0;
      vb = avsB.length ? avsB[avsB.length-1].mediaGeral : 0;
    }
    return sortDir==='asc' ? (va>vb?1:va<vb?-1:0) : (va<vb?1:va>vb?-1:0);
  });

  const totalAtivos = colaboradores.filter(c => c.status !== 'Desligado').length;
  const totalDesligados = colaboradores.filter(c => c.status === 'Desligado').length;

  // Áreas e níveis únicos pra filtros
  var areas = [...new Set(colaboradores.filter(c=>c.area).map(c=>c.area))].sort();
  var niveis = [...new Set(colaboradores.filter(c=>c.nivel).map(c=>c.nivel))].sort();

  var sortIcon = function(col){ return sortCol===col ? (sortDir==='asc'?'↑':'↓') : '<span style="opacity:.3">↕</span>'; };
  var sortClick = function(col){ return 'onclick="window._colSort=\''+col+'\';window._colSortDir=(window._colSort===\''+col+'\'&&window._colSortDir===\'asc\')?\'desc\':\'asc\';window._colSort=\''+col+'\';render(\'colaboradores\')"'; };

  const rows = list.map(c => {
    const avsC = avaliacoes.filter(a => a.colaboradorId === c.id);
    const lastAv = avsC.length ? avsC[avsC.length-1] : null;
    return [
      '<tr>',
      '<td style="width:32px;text-align:center">',
        '<input type="checkbox" class="col-sel" data-id="'+c.id+'" ',
        'onchange="atualizarBtnExcluirCols()" style="cursor:pointer;width:15px;height:15px"/>',
      '</td>',
      '<td>',
        '<span onclick="verCol(\''+c.id+'\')" ',
        'style="cursor:pointer;font-weight:600;color:var(--blue);text-decoration:underline;text-underline-offset:2px">',
        c.nome,
        '</span>',
      '</td>',
      '<td>'+nivelBadge(c.nivel)+'</td>',
      '<td>'+areaBadge(c.area)+'</td>',
      '<td style="color:var(--txt2);font-size:12px">'+(c.gestor||'—')+'</td>',
      '<td>'+(lastAv ? '<span class="badge badge-green">'+lastAv.mediaGeral+'</span>' : '<span style="font-size:10px;color:var(--txt3)">—</span>')+'</td>',
      '<td>'+((c.historico||[]).length?'<span class="badge badge-blue">'+(c.historico||[]).length+'</span>':'<span style="color:#9BA09E">—</span>')+'</td>',
      '<td>',
        '<span style="font-size:11px;padding:2px 8px;border-radius:20px;',
        'background:'+(c.status==='Ativo'?'var(--green-bg)':'var(--bg2)')+';',
        'color:'+(c.status==='Ativo'?'var(--green2)':'var(--txt2)')+'">',
        c.status,
        '</span>',
      '</td>',
      '</tr>'
    ].join('');
  }).join('');

  const tabBtn = (id, icon, label, count) =>
    '<button onclick="window._colTab=\''+id+'\';render(\'colaboradores\')" style="padding:7px 18px;border:none;'+(abaAtiva===id?'background:var(--green);color:#fff':'background:var(--bg2);color:var(--txt2)')+';font-size:13px;font-weight:600;cursor:pointer;transition:all .15s">'
    +icon+' '+label+' ('+count+')</button>';

  return [
    '<div>',
    '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">',
    '<div style="display:flex;align-items:center;gap:8px;background:#F5F6F4;border:1px solid #E0E2E0;border-radius:6px;padding:7px 12px">',
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9BA09E" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>',
    '<input id="col-search-input" placeholder="Buscar colaboradores..." oninput="renderColaboradores(this.value)" style="border:none;background:transparent;outline:none;flex:1;font-size:13px;color:#1A1F1D" value="'+search+'">',
    '</div>',
    '<div style="display:flex;align-items:center;justify-content:space-between">',
    '<div style="display:flex;gap:4px">',
      '<button onclick="window._colTab=\'ativos\';render(\'colaboradores\')" style="padding:6px 14px;border:none;cursor:pointer;border-radius:5px;font-family:\'Inter\',sans-serif;transition:all .12s;background:'+((window._colTab||'ativos')==='ativos'?'#E6EFEB':'transparent')+';color:'+((window._colTab||'ativos')==='ativos'?'#084231':'#6B7370')+';font-weight:'+((window._colTab||'ativos')==='ativos'?600:400)+'">'+' Ativos <span style="background:'+((window._colTab||'ativos')==='ativos'?'#0F6E56':'#E0E2E0')+';color:'+((window._colTab||'ativos')==='ativos'?'#fff':'#6B7370')+';border-radius:10px;padding:1px 7px;font-size:11px;font-weight:600">'+totalAtivos+'</span></button>',
      
      '<button onclick="window._colTab=\'desligados\';render(\'colaboradores\')" style="padding:6px 14px;border:none;cursor:pointer;border-radius:5px;font-family:\'Inter\',sans-serif;transition:all .12s;background:'+(window._colTab==='desligados'?'#E6EFEB':'transparent')+';color:'+(window._colTab==='desligados'?'#084231':'#6B7370')+';font-weight:'+(window._colTab==='desligados'?600:400)+'">'+' Desligados <span style="background:'+(window._colTab==='desligados'?'#0F6E56':'#E0E2E0')+';color:'+(window._colTab==='desligados'?'#fff':'#6B7370')+';border-radius:10px;padding:1px 7px;font-size:11px;font-weight:600">'+totalDesligados+'</span></button>',
    '</div>',
    '<button class="btn btn-primary btn-sm" onclick="openColForm()">+ Novo Colaborador</button>',
    '</div>','</div>',
    // Filtros por área e nível
    '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:center">',
      '<select onchange="window._colFiltroArea=this.value;render(\'colaboradores\')" style="padding:5px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:12px;color:#3A4240;background:#fff;cursor:pointer"><option value="">Todas as áreas</option>'+areas.map(function(a){return '<option value="'+a+'"'+(filtroArea===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select>',
      '<select onchange="window._colFiltroNivel=this.value;render(\'colaboradores\')" style="padding:5px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:12px;color:#3A4240;background:#fff;cursor:pointer"><option value="">Todos os níveis</option>'+niveis.map(function(n){return '<option value="'+n+'"'+(filtroNivel===n?' selected':'')+'>'+n+'</option>';}).join('')+'</select>',
      (filtroArea||filtroNivel?'<button onclick="window._colFiltroArea=\'\';window._colFiltroNivel=\'\';render(\'colaboradores\')" style="padding:4px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:11px;color:#6B7370;background:#fff;cursor:pointer">✕ Limpar filtros</button>':''),
      '<span style="flex:1"></span>',
      '<span style="font-size:11px;color:#9BA09E">'+list.length+' colaboradores</span>',
      '<button onclick="exportarColaboradoresCSV()" class="btn btn-sm" style="font-size:11px;padding:4px 10px;border:1px solid #E0E2E0;color:#6B7370">📥 CSV</button>',
    '</div>',
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">',
      '<button class="btn btn-danger btn-sm" id="btn-excluir-cols" onclick="excluirColsSelecionados()" style="display:none">🗑 Excluir selecionados</button>',
    '</div>',
    '<div class="card" style="padding:0;overflow:hidden"><div class="table-wrap"><table class="tbl">',
    '<thead><tr>',
      '<th style="width:32px"><input type="checkbox" onchange="document.querySelectorAll(\'.col-sel\').forEach(cb=>cb.checked=this.checked);atualizarBtnExcluirCols()" style="cursor:pointer"/></th>',
      '<th style="cursor:pointer" '+sortClick('nome')+'>Colaborador '+sortIcon('nome')+'</th>',
      '<th style="cursor:pointer" '+sortClick('nivel')+'>Nível '+sortIcon('nivel')+'</th>',
      '<th style="cursor:pointer" '+sortClick('area')+'>Área '+sortIcon('area')+'</th>',
      '<th>Gestor</th>',
      '<th>Últ. Aval.</th>',
      '<th>Movim.</th>',
      '<th>Status</th>',
    '</tr></thead>',
    '<tbody>'+rows+'</tbody>',
    '</table></div></div>',
    '</div>'
  ].join('');
}

function atualizarBtnExcluirCols(){
  const sel = document.querySelectorAll('.col-sel:checked').length;
  const btn = document.getElementById('btn-excluir-cols');
  if(btn){
    btn.style.display = sel > 0 ? '' : 'none';
    btn.textContent = '🗑 Excluir '+sel+' selecionado'+(sel!==1?'s':'');
  }
}

function excluirColsSelecionados(){
  const ids = [...document.querySelectorAll('.col-sel:checked')].map(cb => cb.dataset.id);
  if(!ids.length){ toast('Selecione ao menos um'); return; }
  if(!confirm('Excluir permanentemente '+ids.length+' colaborador(es)?')) return;
  colaboradores = colaboradores.filter(c => !ids.includes(c.id));
  saveAll();
  toast('✅ '+ids.length+' colaborador(es) excluído(s)!');
  render('colaboradores');
}

function exportarColaboradoresCSV(){
  var list = colaboradores.filter(function(c){return c.status!=='Desligado';});
  var csv = 'Nome,Nível,Área,Gestor,Status,Movimentações\n';
  list.forEach(function(c){
    csv += '"'+(c.nome||'')+'",'+(c.nivel||'')+','+(c.area||'')+',"'+(c.gestor||'')+'",'+(c.status||'')+','+(c.historico||[]).length+'\n';
  });
  var blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'colaboradores_squado_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click(); URL.revokeObjectURL(url);
  toast('📥 CSV exportado!');
}


// ═══════════════════════════════════════════════════════════════
// ORGANOGRAMA COM DRAG-AND-DROP
// ═══════════════════════════════════════════════════════════════
// Estrutura: nós virtuais para divisões + colaboradores
// orgPositions: { nodeId: {x,y} }

const NODE_W=170, NODE_H_BASE=100;
const CANVAS_W=3000, CANVAS_H=2000;

// Gera posições padrão se não existirem
