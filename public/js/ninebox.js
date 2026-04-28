function renderNineBox(){
  // Posições salvas: {colId: {desempenho:1-3, potencial:1-3}}
  const posNB=ls('ninebox_v1',{});
  
  // Filtro por área
  var filtroAreaNB = window._nbFiltroArea || '';
  var areasNB = [...new Set(colaboradores.filter(c=>c.area&&c.status==='Ativo').map(c=>c.area))].sort();
  var colsAtivos = colaboradores.filter(c=>c.status==='Ativo'&&(!filtroAreaNB||c.area===filtroAreaNB));

  // Definições das 9 células (col=desempenho 1-3, row=potencial 3-1)
  const celulas=[
    // [desempenho, potencial, título, desc, cor]
    [1,3,'Enigma','Alto potencial, baixo desempenho. Pode estar mal posicionado ou sem engajamento.','#854F0B','#FAEEDA'],
    [2,3,'Estrela em Ascensão','Alto potencial, desempenho médio. Investir em desenvolvimento.','#185FA5','#E6F1FB'],
    [3,3,'Estrela','Alto potencial e alto desempenho. Talentos chave — reter e desenvolver.','#0F6E56','#E1F5EE'],
    [1,2,'Questionável','Potencial e desempenho médios-baixos. Avaliar fit e investimento.','#A32D2D','#FCEBEB'],
    [2,2,'Pilar Confiável','Potencial e desempenho médios. Sólido, necessita de desafios.','#534AB7','#EEEDFE'],
    [3,2,'Forte Desempenho','Alto desempenho, potencial médio. Especialistas valiosos.','#3B6D11','#C0DD97'],
    [1,1,'Baixa Entrega','Baixo potencial e desempenho. Plano de melhoria urgente.','#A32D2D','#FCEBEB'],
    [2,1,'Desempenho Médio','Médio potencial e desempenho. Estimular crescimento.','#854F0B','#FAEEDA'],
    [3,1,'Eficiente','Alto desempenho, menor potencial. Especialista entregador.','#085041','#9FE1CB'],
  ];

  // Separar colaboradores por célula
  const gridData={};
  celulas.forEach(c=>{ gridData[c[0]+'-'+c[1]]=[]; });
  // Sem posição → coluna "Não posicionado"
  const semPosicao=[];
  colsAtivos.forEach(col=>{
    const p=posNB[col.id];
    if(p&&p.desempenho&&p.potencial){
      const key=p.desempenho+'-'+p.potencial;
      if(gridData[key]) gridData[key].push(col);
      else gridData[key]=[col];
    } else {
      semPosicao.push(col);
    }
  });

  // Função para abrir modal de posicionamento
  function cardColNB(col){
    const p=posNB[col.id]||{};
    const ns=NIVEL_STYLE[col.nivel]||{cor:'#888',bg:'#eee'};
    return '<div style="display:flex;align-items:center;gap:6px;padding:4px 6px;background:rgba(255,255,255,.7);border-radius:7px;margin-bottom:4px;cursor:pointer" '
      +'data-colid="'+col.id+'" onclick="abrirPosNB(this.dataset.colid)">'
      +av(col.nome,false,true)
      +'<div style="flex:1;min-width:0;overflow:hidden">'
        +'<div style="font-size:11px;font-weight:600;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+col.nome.split(' ')[0]+'</div>'
        +'<div style="font-size:9px;color:#555">'+col.nivel+'</div>'
      +'</div>'
    +'</div>';
  }

  // Grid 3×3
  let grid='<div style="display:grid;grid-template-columns:32px 1fr 1fr 1fr;grid-template-rows:32px 1fr 1fr 1fr;gap:6px;margin-bottom:24px">';
  // Canto vazio
  grid+='<div></div>';
  // Cabeçalho colunas (desempenho)
  ['Baixo','Médio','Alto'].forEach(d=>{
    grid+='<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2);display:flex;align-items:center;justify-content:center">'+d+'</div>';
  });

  // Linhas (potencial = 3 down to 1)
  [3,2,1].forEach(pot=>{
    // Label da linha
    const potLabel=pot===3?'Alto':pot===2?'Médio':'Baixo';
    grid+='<div style="display:flex;align-items:center;justify-content:center">'
      +'<span style="font-size:10px;font-weight:700;color:var(--txt2);writing-mode:vertical-lr;transform:rotate(180deg)">'+potLabel+'</span>'
    +'</div>';

    // 3 células por linha
    [1,2,3].forEach(des=>{
      const cel=celulas.find(c=>c[0]===des&&c[1]===pot);
      const key=des+'-'+pot;
      const cols=gridData[key]||[];
      const [,,titulo,desc,cor,bg]=cel;

      grid+='<div style="background:'+bg+';border:1.5px solid '+cor+'40;border-radius:10px;padding:10px;min-height:140px;position:relative">'
        // Título da célula
        +'<div style="font-size:10px;font-weight:800;color:'+cor+';margin-bottom:2px">'+titulo+'</div>'
        +'<div style="font-size:9px;color:'+cor+';opacity:.75;margin-bottom:6px;line-height:1.3">'+desc+'</div>'
        // Colaboradores
        +'<div id="nb-cell-'+key+'">'
          +cols.map(col=>cardColNB(col)).join('')
        +'</div>'
        // Botão add
        +'<button class="btn btn-xs" style="margin-top:4px;font-size:9px;border-color:'+cor+'80;color:'+cor+'" '
          +'data-des="'+des+'" data-pot="'+pot+'" onclick="escolherColNB(this.dataset.des,this.dataset.pot)">+ Add</button>'
      +'</div>';
    });
  });
  grid+='</div>';

  // Legenda eixos
  const legenda='<div style="display:flex;justify-content:space-between;margin-bottom:20px;font-size:11px;color:var(--txt2)">'
    +'<div>⬆️ <strong>Potencial</strong> — capacidade de crescer e assumir desafios maiores</div>'
    +'<div>➡️ <strong>Desempenho</strong> — entrega e resultados atuais</div>'
  +'</div>';

  // Colaboradores sem posição
  const semPos=semPosicao.length
    ?'<div style="background:var(--bg2);border-radius:10px;padding:14px;margin-bottom:16px">'
      +'<div style="font-size:11px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Não posicionados ('+semPosicao.length+')</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:8px">'
        +semPosicao.map(col=>'<div style="display:flex;align-items:center;gap:6px;padding:6px 10px;background:var(--bg);border:0.5px solid var(--border);border-radius:8px;cursor:pointer" '
          +'data-colid="'+col.id+'" onclick="abrirPosNB(this.dataset.colid)">'
          +av(col.nome,false,true)
          +'<div><div style="font-size:11px;font-weight:600">'+col.nome.split(' ').slice(0,2).join(' ')+'</div>'
            +'<div style="font-size:9px;color:var(--txt3)">'+col.nivel+' · '+col.area+'</div>'
          +'</div>'
        +'</div>').join('')
      +'</div>'
    +'</div>'
    :'';

  // Botão exportar PDF + filtro por área
  const exportBtn='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">'
    +'<select onchange="window._nbFiltroArea=this.value;render(\'ninebox\')" style="padding:5px 10px;border:1px solid #E0E2E0;border-radius:5px;font-size:12px;color:#3A4240;background:#fff;cursor:pointer"><option value="">Todas as áreas</option>'+areasNB.map(function(a){return '<option value="'+a+'"'+(filtroAreaNB===a?' selected':'')+'>'+a+'</option>';}).join('')+'</select>'
    +'<button class="btn btn-sm" onclick="exportarPDFNineBox()" style="border-color:#185FA5;color:#185FA5">📄 Exportar PDF</button>'
  +'</div>';

  return exportBtn
    +legenda
    +'<div style="overflow-x:auto">'
      +'<div style="min-width:600px">'
        +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em">Desempenho →</div>'
        +'<div style="display:grid;grid-template-columns:32px 1fr;gap:6px">'
          +'<div style="display:flex;align-items:center;justify-content:center">'
            +'<span style="font-size:10px;font-weight:700;color:var(--txt2);writing-mode:vertical-lr;transform:rotate(180deg);text-transform:uppercase;letter-spacing:.06em">Potencial ↑</span>'
          +'</div>'
          +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:32px 1fr 1fr 1fr;gap:6px">'
            // Headers desempenho
            +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2);display:flex;align-items:center;justify-content:center">⬇️ Baixo</div>'
            +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2);display:flex;align-items:center;justify-content:center">➡️ Médio</div>'
            +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2);display:flex;align-items:center;justify-content:center">⬆️ Alto</div>'
            // Células
            +[3,2,1].map(pot=>{
              return [1,2,3].map(des=>{
                const cel=celulas.find(c=>c[0]===des&&c[1]===pot);
                const key=des+'-'+pot;
                const cols2=gridData[key]||[];
                const [,,titulo,desc,cor,bg]=cel;
                return '<div style="background:'+bg+';border:1.5px solid '+cor+'40;border-radius:10px;padding:10px;min-height:130px">'
                  +'<div style="font-size:10px;font-weight:800;color:'+cor+';margin-bottom:2px">'+titulo+'</div>'
                  +'<div style="font-size:9px;color:'+cor+';opacity:.8;margin-bottom:6px;line-height:1.3">'+desc+'</div>'
                  +'<div id="nb-cell-'+key+'">'
                    +cols2.map(col=>cardColNB(col)).join('')
                  +'</div>'
                  +'<button class="btn btn-xs" style="margin-top:4px;font-size:9px;border-color:'+cor+'80;color:'+cor+'" '
                    +'data-des="'+des+'" data-pot="'+pot+'" onclick="escolherColNB(this.dataset.des,this.dataset.pot)">+ Add</button>'
                +'</div>';
              }).join('');
            }).join('')
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +semPos;
}

// ─── Posicionar colaborador no Nine-Box ──────────────────────
function abrirPosNB(colId){
  const col=colaboradores.find(x=>x.id===colId);if(!col)return;
  const posNB=ls('ninebox_v1',{});
  const p=posNB[colId]||{};
  const desatual=p.desempenho||0;
  const potatual=p.potencial||0;

  const celulas=[
    [1,3,'Enigma','#854F0B','#FAEEDA'],
    [2,3,'Estrela em Ascensão','#185FA5','#E6F1FB'],
    [3,3,'⭐ Estrela','#0F6E56','#E1F5EE'],
    [1,2,'Questionável','#A32D2D','#FCEBEB'],
    [2,2,'Pilar Confiável','#534AB7','#EEEDFE'],
    [3,2,'Forte Desempenho','#3B6D11','#C0DD97'],
    [1,1,'Baixa Entrega','#A32D2D','#FCEBEB'],
    [2,1,'Desempenho Médio','#854F0B','#FAEEDA'],
    [3,1,'⚡ Eficiente','#085041','#9FE1CB'],
  ];

  document.getElementById('modal-title').textContent='🎯 Posicionar no Nine-Box · '+col.nome;
  document.getElementById('modal-box').classList.add('modal-lg');
  document.getElementById('modal-body').innerHTML=
    '<div style="margin-bottom:14px;font-size:12px;color:var(--txt2)">Selecione a célula que melhor representa '+col.nome.split(' ')[0]+' <strong>hoje</strong>:</div>'
    +'<div style="display:grid;grid-template-columns:40px 1fr 1fr 1fr;gap:6px;margin-bottom:16px">'
      +'<div></div>'
      +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2)">⬇️ Baixo Desempenho</div>'
      +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2)">➡️ Médio</div>'
      +'<div style="text-align:center;font-size:10px;font-weight:700;color:var(--txt2)">⬆️ Alto</div>'
      +[3,2,1].map(pot=>{
        const potLabel=pot===3?'Alto ↑':pot===2?'Médio':' Baixo ↓';
        return '<div style="display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:var(--txt2)">'+potLabel+'</div>'
          +[1,2,3].map(des=>{
            const cel=celulas.find(c=>c[0]===des&&c[1]===pot);
            const [,,nome,cor,bg]=cel;
            const selecionado=(desatual===des&&potatual===pot);
            return '<div style="border:2px solid '+(selecionado?cor:'transparent')+';background:'+bg+';border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .15s" '
              +'data-des="'+des+'" data-pot="'+pot+'" data-colid="'+colId+'" '
              +'onclick="salvarPosNB(this.dataset.colid,this.dataset.des,this.dataset.pot)" '
              +'onmouseover="this.style.transform=\'scale(1.03)\'" onmouseout="this.style.transform=\'\'"> '
              +'<div style="font-size:11px;font-weight:800;color:'+cor+'">'+(selecionado?'✓ ':'')+nome+'</div>'
            +'</div>';
          }).join('');
      }).join('')
    +'</div>'
    +(desatual?'<div style="text-align:center">'
      +'<button class="btn btn-xs btn-danger" data-colid="'+colId+'" onclick="removerPosNB(this.dataset.colid)">Remover do Nine-Box</button>'
    +'</div>':'');
  document.getElementById('modal').style.display='flex';
}

function escolherColNB(des,pot){
  document.getElementById('modal-title').textContent='➕ Adicionar colaborador';
  document.getElementById('modal-box').classList.remove('modal-lg');
  const posNB=ls('ninebox_v1',{});
  const disponiveis=colaboradores.filter(c=>c.status==='Ativo'&&(!posNB[c.id]||!posNB[c.id].desempenho));
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:12px;color:var(--txt2);margin-bottom:12px">Selecione quem adicionar a esta célula:</div>'
    +'<div style="display:flex;flex-direction:column;gap:6px;max-height:60vh;overflow-y:auto">'
      +disponiveis.map(c=>'<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--bg2);border-radius:8px;cursor:pointer;'
        +'border:0.5px solid var(--border)" data-colid="'+c.id+'" data-des="'+des+'" data-pot="'+pot+'" onclick="salvarPosNB(this.dataset.colid,this.dataset.des,this.dataset.pot)">'
        +av(c.nome,false,false)
        +'<div><div style="font-size:12px;font-weight:600">'+c.nome+'</div>'
          +'<div style="font-size:10px;color:var(--txt3)">'+c.nivel+' · '+c.area+'</div>'
        +'</div>'
      +'</div>').join('')
      +(disponiveis.length===0?'<div style="text-align:center;padding:20px;color:var(--txt3)">Todos os colaboradores já estão posicionados.</div>':'')
    +'</div>'
    +'<div style="margin-top:12px;text-align:right"><button class="btn btn-sm" onclick="closeModal()">Cancelar</button></div>';
  document.getElementById('modal').style.display='flex';
}

async function salvarPosNB(colId,des,pot){
  const posNB=ls('ninebox_v1',{});
  posNB[colId]={desempenho:parseInt(des),potencial:parseInt(pot),data:new Date().toISOString().slice(0,10)};
  lss('ninebox_v1',posNB);
  try{ await apiCall('POST','/api/ninebox',{colaborador_id:colId,desempenho:parseInt(des),potencial:parseInt(pot)}); }catch(e){console.warn('ninebox save err',e);}
  closeModal();
  toast('Posição salva! ✓');
  render('ninebox');
}

async function removerPosNB(colId){
  const posNB=ls('ninebox_v1',{});
  delete posNB[colId];
  lss('ninebox_v1',posNB);
  try{ await apiCall('DELETE','/api/ninebox/'+colId); }catch(e){console.warn('ninebox del err',e);}
  closeModal();
  toast('Removido do Nine-Box!');
  render('ninebox');
}

function exportarPDFNineBox(){
  const posNB=ls('ninebox_v1',{});
  const celulas=[
    [1,3,'Enigma','#854F0B','#FAEEDA'],
    [2,3,'Estrela em Ascensão','#185FA5','#E6F1FB'],
    [3,3,'Estrela','#0F6E56','#E1F5EE'],
    [1,2,'Questionável','#A32D2D','#FCEBEB'],
    [2,2,'Pilar Confiável','#534AB7','#EEEDFE'],
    [3,2,'Forte Desempenho','#3B6D11','#C0DD97'],
    [1,1,'Baixa Entrega','#A32D2D','#FCEBEB'],
    [2,1,'Desempenho Médio','#854F0B','#FAEEDA'],
    [3,1,'Eficiente','#085041','#9FE1CB'],
  ];
  const gridData={};
  celulas.forEach(c=>{ gridData[c[0]+'-'+c[1]]=[]; });
  colaboradores.filter(c=>c.status==='Ativo').forEach(col=>{
    const p=posNB[col.id];
    if(p&&p.desempenho&&p.potencial){
      const key=p.desempenho+'-'+p.potencial;
      if(gridData[key]) gridData[key].push(col);
    }
  });
  const posicionados=colaboradores.filter(c=>c.status==='Ativo'&&posNB[c.id]&&posNB[c.id].desempenho).length;
  const dataHoje=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});

  const html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Nine-Box</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:36px}'
    +'@media print{body{padding:0}.np{display:none!important}@page{margin:15mm;size:A4 landscape}}'
    +'</style></head><body>'
    +'<div class="np" style="position:fixed;top:0;left:0;right:0;background:#185FA5;padding:10px 24px;display:flex;align-items:center;gap:12px;z-index:999">'
      +'<span style="color:#fff;font-weight:700;flex:1">Nine-Box</span>'
      +'<button onclick="window.print()" style="background:#fff;color:#185FA5;border:none;padding:7px 20px;border-radius:7px;font-weight:700;cursor:pointer">🖨 Imprimir</button>'
      +'<button onclick="window.close()" style="background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 12px;border-radius:7px;cursor:pointer">×</button>'
    +'</div><div class="np" style="height:52px"></div>'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:20px;border-bottom:2px solid #185FA5;padding-bottom:12px">'
      +'<div><div style="font-size:9px;font-weight:700;color:#185FA5;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">Squado</div>'
        +'<div style="font-size:22px;font-weight:900">Nine-Box · Matriz de Talentos</div></div>'
      +'<div style="text-align:right;font-size:11px;color:#6b7280"><div>'+dataHoje+'</div><div>'+posicionados+' colaboradores posicionados</div></div>'
    +'</div>'
    +'<div style="text-align:center;font-size:10px;font-weight:700;color:#6b7280;margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em">Desempenho →</div>'
    +'<div style="display:grid;grid-template-columns:28px 1fr 1fr 1fr;grid-template-rows:28px 1fr 1fr 1fr;gap:6px">'
      +'<div></div>'
      +['⬇️ Baixo','➡️ Médio','⬆️ Alto'].map(d=>'<div style="text-align:center;font-size:10px;font-weight:700;color:#6b7280;display:flex;align-items:center;justify-content:center">'+d+'</div>').join('')
      +[3,2,1].map(pot=>{
        const potLabel=pot===3?'Alto ↑':pot===2?'Médio':'Baixo ↓';
        return '<div style="display:flex;align-items:center;justify-content:center"><span style="font-size:9px;font-weight:700;color:#6b7280;writing-mode:vertical-lr;transform:rotate(180deg)">'+potLabel+'</span></div>'
          +[1,2,3].map(des=>{
            const cel=celulas.find(c=>c[0]===des&&c[1]===pot);
            const key=des+'-'+pot;
            const cols=gridData[key]||[];
            const [,,nome,cor,bg]=cel;
            return '<div style="background:'+bg+';border:1.5px solid '+cor+'50;border-radius:10px;padding:10px;min-height:120px">'
              +'<div style="font-size:10px;font-weight:800;color:'+cor+';margin-bottom:6px">'+nome+' ('+cols.length+')</div>'
              +cols.map(c=>'<div style="font-size:10px;padding:3px 6px;background:rgba(255,255,255,.8);border-radius:5px;margin-bottom:3px;font-weight:600">'+c.nome+'<br><span style="font-size:9px;font-weight:400;color:#6b7280">'+c.nivel+'</span></div>').join('')
            +'</div>';
          }).join('');
      }).join('')
    +'</div>'
    +'<div style="margin-top:28px;padding-top:10px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">'
      +'<span>Squado</span>'
      +'<span>'+dataHoje+' · Gerado automaticamente</span>'
    +'</div>'
    +'</body></html>';
  const w=window.open('','_blank','width=1100,height=780');
  if(!w){alert('Permita pop-ups.');return;}
  w.document.write(html);w.document.close();
}

// ═══ COMPETÊNCIAS (módulo externo) ═══
// → public/js/competencias.js



// ─── Envio WhatsApp ──────────────────────────────────────────
