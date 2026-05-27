
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function openTab(id){
  $$('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===id));
  $$('.panel').forEach(p=>p.classList.toggle('active', p.id===id));
}
function toggleAcc(el){ el.closest('.accordion').classList.toggle('open'); }
function newInspection(){
  localStorage.removeItem('rjp_amv_current');
  document.querySelectorAll('input, textarea').forEach(x=>x.value='');
  document.querySelectorAll('select').forEach(x=>x.selectedIndex=0);
  alert('Nova inspeção iniciada.');
}
function saveInspection(){
  const data = {};
  document.querySelectorAll('[name]').forEach(el=>data[el.name]=el.value);
  data.savedAt = new Date().toISOString();
  localStorage.setItem('rjp_amv_current', JSON.stringify(data));
  const hist = JSON.parse(localStorage.getItem('rjp_amv_history')||'[]');
  hist.unshift(data);
  localStorage.setItem('rjp_amv_history', JSON.stringify(hist.slice(0,50)));
  alert('Inspeção guardada localmente.');
  renderHistory();
}
function exportJSON(){
  const data = localStorage.getItem('rjp_amv_current') || '{}';
  const blob = new Blob([data], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'inspecao_amv_rjp.json';
  a.click();
}
function printPDF(){ window.print(); }
function renderStations(){
  const sel = $('#estacao');
  window.RJP_DATA.estacoes.forEach(e=>{
    const o=document.createElement('option'); o.value=e.nome; o.textContent=e.nome; sel.appendChild(o);
  });
}
function renderMPS(){
  const container = $('#mpsContainer');
  for(const [group, items] of Object.entries(window.RJP_DATA.mps)){
    const acc = document.createElement('section');
    acc.className = 'accordion';
    acc.innerHTML = `<div class="acc-head" onclick="toggleAcc(this)">${group}<span>ABRIR</span></div><div class="acc-body"></div>`;
    const body = acc.querySelector('.acc-body');
    items.forEach(item=>{
      body.insertAdjacentHTML('beforeend', `
        <div class="item">
          <div class="item-title">${item}</div>
          <div class="status-row">
            <button class="status ok" type="button">Conforme</button>
            <button class="status warn" type="button">Atenção</button>
            <button class="status bad" type="button">Deficiente</button>
          </div>
          <label>Observações</label>
          <textarea name="mps_${group}_${item}" placeholder="Observações / anomalias / intervenção"></textarea>
        </div>`);
    });
    container.appendChild(acc);
  }
}
function renderHistory(){
  const hist = JSON.parse(localStorage.getItem('rjp_amv_history')||'[]');
  $('#history').innerHTML = hist.length ? hist.map(h=>`<div class="item"><b>${h.estacao||'Sem estação'} — ${h.pk||'Sem PK'}</b><br><span class="note">${h.savedAt||''}</span></div>`).join('') : '<p class="note">Sem inspeções guardadas.</p>';
}
document.addEventListener('DOMContentLoaded',()=>{
  renderStations(); renderMPS(); renderHistory();
});
