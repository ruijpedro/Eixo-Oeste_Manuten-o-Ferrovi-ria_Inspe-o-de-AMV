const sections = [
  {title:'Identificação do AMV', fields:[['linha','Linha / Ramal','select',['Linha do Oeste','Ramal','Outra']],['pk','PK','text'],['estacao','Estação / Local','text'],['amv','N.º AMV','text'],['tipo','Tipo de AMV','select',['Aparelho simples direito','Aparelho simples esquerdo','Travessão','Outro']],['via','Via','text'],['data','Data da inspeção','date'],['inspetor','Inspetor','text','RJP'],['meteo','Condições meteorológicas','text']]},
  {title:'Agulhas', fields:[['agulhas_estado','Estado','select',['Bom','Aceitável','Deficiente','Crítico']],['agulhas_obs','Observações','textarea']]},
  {title:'Contra-agulhas', fields:[['contra_estado','Estado','select',['Bom','Aceitável','Deficiente','Crítico']],['contra_obs','Observações','textarea']]},
  {title:'Coração', fields:[['coracao_estado','Estado','select',['Bom','Aceitável','Deficiente','Crítico']],['coracao_obs','Observações','textarea']]},
  {title:'Contracarril', fields:[['contracarril_estado','Estado','select',['Bom','Aceitável','Deficiente','Crítico']],['contracarril_obs','Observações','textarea']]},
  {title:'Travessas e Fixações', fields:[['travessas_estado','Travessas','select',['Bom','Aceitável','Deficiente','Crítico']],['fixacoes_estado','Fixações','select',['Bom','Aceitável','Deficiente','Crítico']],['travessas_obs','Observações','textarea']]},
  {title:'Geometria / Medições', fields:[['bitola','Bitola medida (mm)','number'],['folga','Folga / Abertura (mm)','number'],['desgaste','Desgaste observado','text'],['medicoes_obs','Observações','textarea']]},
  {title:'Aparelhos de Manobra e Lubrificação', fields:[['manobra_estado','Aparelho de manobra','select',['Bom','Aceitável','Deficiente','Crítico']],['lub_estado','Lubrificação','select',['Bom','Aceitável','Deficiente','Crítico']],['manobra_obs','Observações','textarea']]},
  {title:'Não Conformidades', fields:[['anomalia','Descrição da anomalia','textarea'],['prioridade','Prioridade','select',['Baixa','Média','Alta','Crítica']],['intervencao','Intervenção necessária','text'],['prazo','Prazo recomendado','text']]},
  {title:'Fotografias', fields:[['foto','Adicionar fotografias','file'],['foto_obs','Notas das fotografias','textarea']]},
  {title:'Resumo e Assinatura', fields:[['estado_final','Estado final','select',['Operacional','Condicionado','Intervenção necessária','Interdição/Crítico']],['resumo','Resumo técnico','textarea'],['assinatura','Assinatura / validação','text','RJP']]}
];

const form = document.getElementById('inspectionForm');
function render(){
  form.innerHTML = sections.map((s,i)=>`<details class="section" ${i===0?'open':''}><summary>${i+1}. ${s.title}<span>abrir</span></summary><div class="fields">${s.fields.map(fieldHtml).join('')}</div></details>`).join('');
  loadInspection(); updateWarnCount();
  form.addEventListener('change', updateWarnCount); form.addEventListener('input', updateWarnCount);
}
function fieldHtml(f){const [id,label,type,extra]=f; let val= typeof extra==='string'?extra:''; let full=type==='textarea'||type==='file'?' full':''; if(type==='select') return `<div class="field${full}"><label for="${id}">${label}</label><select id="${id}" name="${id}"><option value="">Selecionar</option>${extra.map(x=>`<option>${x}</option>`).join('')}</select></div>`; if(type==='textarea') return `<div class="field${full}"><label for="${id}">${label}</label><textarea id="${id}" name="${id}">${val}</textarea></div>`; return `<div class="field${full}"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" value="${val}" /></div>`}
function data(){return Object.fromEntries(new FormData(form).entries())}
function saveInspection(){localStorage.setItem('amv_inspecao_atual', JSON.stringify(data())); alert('Inspeção guardada localmente.');}
function loadInspection(){const raw=localStorage.getItem('amv_inspecao_atual'); if(!raw) return; const d=JSON.parse(raw); Object.entries(d).forEach(([k,v])=>{const el=form.elements[k]; if(el && el.type!=='file') el.value=v;});}
function newInspection(){if(confirm('Criar nova inspeção e limpar campos?')){localStorage.removeItem('amv_inspecao_atual'); render();}}
function exportJson(){const blob=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='inspecao_amv_rjp.json'; a.click();}
function updateWarnCount(){const d=data(); const n=Object.values(d).filter(v=>['Deficiente','Crítico','Alta','Crítica','Intervenção necessária','Interdição/Crítico'].includes(v)).length; document.getElementById('warnCount').textContent=n;}
function fakeSync(){saveInspection(); alert('Base preparada para sincronização Google Sheets/Drive. Próxima fase: ligar Apps Script/endpoint.');}
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});} 
function openFirstSection(name){document.querySelectorAll('.section').forEach(d=>{d.open=d.querySelector('summary').textContent.includes(name)}); document.querySelector('.section[open]')?.scrollIntoView({behavior:'smooth'});} 
function openSettings(){alert('Definições: autor RJP, templates Excel, PDF, Google Sheets e Drive.');}
if('serviceWorker' in navigator){navigator.serviceWorker.register('./service-worker.js').catch(()=>{});} render();
