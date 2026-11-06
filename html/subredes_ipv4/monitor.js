// Registros de atenção são indícios de interação, não prova de consulta externa.
export function installMonitor({context,services}){
 const key='seq-monitor-pending-v1';let queue=[];try{queue=JSON.parse(localStorage.getItem(key))||[]}catch{}let flushing=false,lastFocus=0,lastPopup=0;
 const persist=()=>{try{localStorage.setItem(key,JSON.stringify(queue))}catch{}};
 async function flush(){const s=services();if(flushing||!s?.auth.currentUser)return;flushing=true;try{for(const item of [...queue]){if(item.uid!==s.auth.currentUser.uid)continue;await s.fs.setDoc(s.fs.doc(s.db,'sequencias',item.sequenceId,'alunos',item.uid,'eventos',item.id),{tipo:item.tipo,stage:item.stage,email:item.email,clientAt:item.clientAt,em:s.fs.serverTimestamp()});queue=queue.filter(x=>x.id!==item.id);persist()}}catch{}finally{flushing=false}}
 function record(tipo){const c=context();if(!c)return;queue.push({...c,id:crypto.randomUUID(),tipo,clientAt:new Date().toISOString()});persist();void flush()}
 function popup(text){if(Date.now()-lastPopup<1500)return;lastPopup=Date.now();let box=document.querySelector('#monitorDialog');if(!box){box=document.createElement('dialog');box.id='monitorDialog';box.innerHTML='<h2>Atenção à atividade</h2><p></p><button type="button">Entendi</button>';box.querySelector('button').onclick=()=>box.close();document.body.append(box)}box.querySelector('p').textContent=text;if(!box.open)box.showModal()}
 for(const type of ['copy','cut','paste','drop'])document.addEventListener(type,e=>{if(!context()||e.target?.closest?.('[data-allow-paste]'))return;e.preventDefault();record('bloqueio_'+type);popup('Copiar, recortar e colar estão bloqueados durante a atividade. A tentativa foi registrada para envio à professora. O campo de link do Google Drive permite colar.');},true);
 function lost(type){if(!context())return;record(type);if(Date.now()-lastFocus>1200){lastFocus=Date.now();const c=context();popup(c.stage==='etapa5'?'Mudança de tela detectada e registrada para envio à professora. Nesta etapa, o uso do Packet Tracer e do Drive faz parte da tarefa.':'Saída da tela da atividade detectada e registrada para envio à professora. Retorne para continuar.')}}
 window.addEventListener('blur',()=>lost('perda_foco'));document.addEventListener('visibilitychange',()=>{if(document.hidden)lost('aba_oculta');else{record('retorno');void flush()}});
 window.addEventListener('focus',()=>{void flush()});window.addEventListener('online',flush);
 window.addEventListener('beforeunload',e=>{if(!context())return;record('tentativa_saida');e.preventDefault();e.returnValue=''});
 setInterval(flush,10000);
}
