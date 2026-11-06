import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,collection,getDocs,serverTimestamp,onSnapshot,Timestamp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
const app=initializeApp({apiKey:'AIzaSyAKUEJbtFwDCb6Jv3YU059FpNS-drHlfMw',authDomain:'networking-taks.firebaseapp.com',projectId:'networking-taks',storageBucket:'networking-taks.firebasestorage.app',messagingSenderId:'949681143186',appId:'1:949681143186:web:73ab934af62f9f7e44154b'});
const auth=getAuth(app),db=getFirestore(app),$=id=>document.getElementById(id);
const questions=[
 ['O que você aprendeu nas últimas aulas?','Descreva algo que agora consegue explicar ou fazer melhor. Se ainda não percebeu avanços, conte o que está tentando compreender.'],
 ['O que foi mais difícil para você?','Conte uma situação concreta: o que precisava fazer e onde encontrou dificuldade. Se não teve dificuldades, diga o que exigiu mais atenção.'],
 ['O que você ainda precisa compreender melhor ou praticar?','Pense em algo que ainda precisa de ajuda para fazer ou explicar. Não é necessário se comparar com os colegas.'],
 ['O que você fez quando encontrou uma dificuldade?','Explique o que tentou e se isso ajudou. Se recebeu ajuda de alguém ou de alguma ferramenta, conte o que conseguiu compreender com ela. Se não encontrou dificuldades, descreva como organizou seus estudos.'],
 ['O que facilitaria sua aprendizagem nas próximas aulas?','Você pode comentar as explicações, os exemplos, o tempo, as perguntas, os recursos ou a organização da aula. Escolha o que faz diferença para você e explique por quê.'],
 ['O que você pode fazer para continuar aprendendo?','Indique uma ação possível, como pedir ajuda sobre uma dúvida específica, praticar um conteúdo ou organizar um momento de estudo.']
];
const TZ='America/Sao_Paulo';
function todayKey(now=new Date()){const p=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now),get=k=>p.find(x=>x.type===k).value;return get('year')+'-'+get('month')+'-'+get('day');}
function dayWindow(day){if(!/^\d{4}-\d{2}-\d{2}$/.test(day))throw Error('Informe uma data válida.');const start=new Date(day+'T00:00:00-03:00');if(!Number.isFinite(start.getTime())||todayKey(start)!==day)throw Error('Informe uma data válida.');return {inicio:Timestamp.fromDate(start),fim:Timestamp.fromMillis(start.getTime()+86400000)};}
function dateName(day){return /^\d{4}-\d{2}-\d{2}$/.test(day)?day.split('-').reverse().join('/'):day;}
function agendaOpen(item,now=Date.now()){return !!item&&item.liberada===true&&item.inicio?.toMillis()<=now&&now<item.fim?.toMillis();}
let account=null,teacher=false,submitted=false,busy=false,rows=[],session=0,ready=false,agendaReady=false,agenda=[],selectedDay='',records=new Map(),legacy=null,stopAgenda=null,loadingDay=0,scheduleBusy=false,teacherLoad=0;
const fields=()=>[$('turma'),...questions.map((_,i)=>$('q'+i))];
const draft=()=>fields().map(x=>x.value);
const draftKey=(uid,day)=>'autoavaliacao-agendada-v2:'+uid+':'+day;
function message(t){$('status').textContent=t;}
function editable(){return !!account&&agendaReady&&ready&&!submitted&&!busy&&agendaOpen(agenda.find(x=>x.data===selectedDay));}
function saveDraft(){if(!account||!selectedDay||submitted||!ready)return;try{localStorage.setItem(draftKey(account.uid,selectedDay),JSON.stringify(draft()));}catch{}}
function progress(){$('progress').textContent=questions.filter((_,i)=>$('q'+i).value.trim()).length+' de 6 reflexões preenchidas';}
function lock(value){fields().forEach(x=>x.disabled=value);$('send').disabled=value;}
function responseRef(day,uid){return doc(db,'autoavaliacaoAgenda',day,'respostas',uid);}
function showAvailability(){
 const item=agenda.find(x=>x.data===selectedDay),open=agendaReady&&agendaOpen(item);
 $('form').hidden=!account||!ready||(!submitted&&!open);$('send').hidden=submitted;
 lock(!editable());$('daySelect').disabled=busy||!agendaReady;
 if(!account)return;
 if(!agendaReady){message('Não foi possível confirmar a agenda. Aguarde a conexão ou recarregue.');return;}
 if(!selectedDay){message('Nenhuma data de autoavaliação cadastrada. Aguarde a professora.');return;}
 if(!ready)return;
 if(submitted)message('Autoavaliação de '+dateName(selectedDay)+' já enviada. Seu registro está preservado para consulta.');
 else if(!item?.liberada)message('A autoavaliação de '+dateName(selectedDay)+' está suspensa. Aguarde a liberação da professora.');
 else if(Date.now()<item.inicio.toMillis())message('Autoavaliação agendada para '+dateName(selectedDay)+'. Aguarde essa data para responder.');
 else if(!open)message('O prazo da autoavaliação de '+dateName(selectedDay)+' terminou. Você poderá responder nas próximas datas agendadas.');
 else message('Autoavaliação de '+dateName(selectedDay)+' liberada até o fim deste dia, no horário de Brasília.');
}
questions.forEach(([q,hint],i)=>{const box=document.createElement('section');box.className='question';const label=document.createElement('label');label.htmlFor='q'+i;label.textContent=(i+1)+'. '+q;const p=document.createElement('p');p.id='hint'+i;p.textContent=hint;const ta=document.createElement('textarea');ta.id='q'+i;ta.required=true;ta.maxLength=6000;ta.rows=4;ta.placeholder='Escreva com suas palavras…';ta.setAttribute('aria-describedby',p.id);ta.oninput=()=>{saveDraft();progress();};box.append(label,p,ta);$('questions').append(box);});
$('turma').oninput=saveDraft;
async function openDay(day){
 if(!account||busy)return;saveDraft();const version=++loadingDay,uid=account.uid;selectedDay=day;ready=false;submitted=false;fields().forEach(x=>x.value='');$('form').hidden=true;lock(true);$('daySelect').value=day;
 if(!day){ready=true;showAvailability();return;}message('Consultando seu envio de '+dateName(day)+'…');
 try{const snap=await getDoc(responseRef(day,uid));if(version!==loadingDay||account?.uid!==uid)return;let values;
 if(snap.exists()){const data=snap.data();records.set(day,data);submitted=true;values=[data.turma,...data.respostas];}
 else{try{values=JSON.parse(localStorage.getItem(draftKey(uid,day))||'null');}catch{}}
 if(Array.isArray(values)&&values.length===7)fields().forEach((f,i)=>f.value=typeof values[i]==='string'?values[i]:'');ready=true;progress();showAvailability();}
 catch(e){if(version===loadingDay){message('Não foi possível consultar a data: '+(e.code||e.message)+'. Recarregue para tentar novamente.');$('form').hidden=true;}}
}
$('daySelect').onchange=()=>openDay($('daySelect').value);
function buildDayOptions(){const old=selectedDay;$('daySelect').replaceChildren();for(const item of agenda){const o=document.createElement('option');o.value=item.data;o.textContent=dateName(item.data)+(item.liberada?'':' — suspensa');$('daySelect').append(o);}const next=agenda.some(x=>x.data===old)?old:agenda.find(x=>agendaOpen(x))?.data||agenda.find(x=>x.data>=todayKey())?.data||agenda.at(-1)?.data||'';$('daySelect').value=next;if(next!==selectedDay||!ready)openDay(next);else showAvailability();}
function displayRecord(target,data,title){const section=document.createElement('details'),summary=document.createElement('summary');summary.textContent=title;section.append(summary);questions.forEach(([q],i)=>{const h=document.createElement('h4'),p=document.createElement('p');h.textContent=(i+1)+'. '+q;p.textContent=data.respostas?.[i]||'';p.className='answer';section.append(h,p);});target.append(section);}
function renderLegacy(){$('legacy').replaceChildren();$('legacy').hidden=!legacy;if(legacy)displayRecord($('legacy'),legacy,'Meu envio anterior à agenda — '+(legacy.enviadoEm?.toDate?.().toLocaleDateString('pt-BR',{timeZone:TZ})||'data não informada'));}
function renderAgenda(){
 $('scheduleList').replaceChildren();for(const item of agenda){const line=document.createElement('div');line.className='schedule-row';const span=document.createElement('span');span.textContent=dateName(item.data)+' · '+(item.liberada?'programada':'suspensa');const button=document.createElement('button');button.type='button';button.className='secondary';button.textContent=item.liberada?'Suspender':'Liberar';button.disabled=scheduleBusy;button.onclick=()=>toggleDay(item);line.append(span,button);$('scheduleList').append(line);}
 if(!agenda.length)$('scheduleList').textContent='Nenhuma data cadastrada.';
}
$('login').onclick=async()=>{if(busy)return;busy=true;$('login').disabled=true;try{await signInWithPopup(auth,new GoogleAuthProvider());}catch(e){message('Não foi possível entrar: '+(e.code||e.message));}finally{busy=false;$('login').disabled=false;showAvailability();}};
$('logout').onclick=async()=>{if(busy||scheduleBusy)return;saveDraft();try{await signOut(auth);}catch(e){message('Não foi possível sair: '+(e.code||e.message));}};
onAuthStateChanged(auth,async user=>{
 ++session;++loadingDay;++teacherLoad;const generation=session;stopAgenda?.();stopAgenda=null;account=user;teacher=false;submitted=false;ready=false;agendaReady=false;agenda=[];records=new Map();selectedDay='';legacy=null;rows=[];
 $('teacher').hidden=true;$('calendar').hidden=!user;$('form').hidden=true;$('legacy').hidden=true;$('detail').replaceChildren();$('studentList').replaceChildren();$('scheduleList').replaceChildren();$('daySelect').replaceChildren();$('export').disabled=true;$('logout').hidden=!user;$('login').hidden=!!user;$('identity').textContent=user?(user.displayName||'Estudante')+' · '+user.email:'';fields().forEach(x=>x.value='');lock(true);if(!user){message('Entre com sua conta Google para consultar as datas de autoavaliação.');return;}
 message('Consultando agenda e permissões…');
 try{const role=await getDoc(doc(db,'autoavaliacaoDocentes',user.uid));if(generation!==session)return;teacher=role.exists()&&role.data().ativo===true;$('teacher').hidden=!teacher;
 stopAgenda=onSnapshot(collection(db,'autoavaliacaoAgenda'),{includeMetadataChanges:true},snap=>{if(generation!==session)return;agendaReady=!snap.metadata.fromCache;if(!agendaReady){showAvailability();return;}agenda=snap.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.data===x.id&&x.inicio?.toMillis&&x.fim?.toMillis).sort((a,b)=>a.data.localeCompare(b.data));buildDayOptions();if(teacher)renderAgenda();},e=>{if(generation!==session)return;agendaReady=false;showAvailability();message('Não foi possível ler a agenda: '+(e.code||e.message)+'. Instale as regras atualizadas do pacote.');});
 try{const old=await getDoc(doc(db,'autoavaliacaoGeralV1',user.uid));if(generation===session){legacy=old.exists()?old.data():null;renderLegacy();}}catch{if(generation===session)$('historyStatus').textContent='O envio antigo não pôde ser consultado. Ele não foi apagado; verifique as regras.';}
 }catch(e){if(generation===session)message('Não foi possível carregar: '+(e.code||e.message)+'. Verifique as regras e recarregue.');}
});
$('form').onsubmit=async e=>{e.preventDefault();if(!editable()||!$('form').reportValidity())return;const turma=$('turma').value.trim(),respostas=questions.map((_,i)=>$('q'+i).value.trim());if(!turma||respostas.some(x=>!x)){message('Preencha a turma e as seis reflexões.');return;}const day=selectedDay,uid=account.uid;if(!confirm('Enviar a autoavaliação de '+dateName(day)+'? Depois do envio, as respostas desta data não poderão ser editadas.'))return;busy=true;lock(true);$('daySelect').disabled=true;$('logout').disabled=true;message('Salvando sua autoavaliação…');try{await setDoc(responseRef(day,uid),{nome:account.displayName||'',email:account.email,turma,respostas,enviadoEm:serverTimestamp(),versao:2,dataAvaliacao:day});submitted=true;try{localStorage.removeItem(draftKey(uid,day));}catch{}message('Autoavaliação enviada com sucesso.');}
 catch(e){message('Não foi possível enviar: '+(e.code||e.message)+'. A data pode ter encerrado ou sido suspensa. Seu rascunho foi preservado.');saveDraft();}finally{busy=false;$('logout').disabled=false;lock(!editable());$('daySelect').disabled=!agendaReady;$('send').hidden=submitted;if(submitted)showAvailability();}};
async function writeSchedule(day,liberada){const window=dayWindow(day);await setDoc(doc(db,'autoavaliacaoAgenda',day),{data:day,...window,liberada,alteradoPor:account.uid,alteradoEm:serverTimestamp()});}
$('scheduleForm').onsubmit=async e=>{e.preventDefault();if(!teacher||scheduleBusy||!account)return;const day=$('scheduleDate').value;try{dayWindow(day);if(day<todayKey())throw Error('Escolha hoje ou uma data futura.');if(agenda.some(x=>x.data===day))throw Error('Essa data já foi cadastrada. Use Liberar ou Suspender na lista.');scheduleBusy=true;$('scheduleSave').disabled=true;await writeSchedule(day,true);$('scheduleStatus').textContent='Data '+dateName(day)+' agendada. Você pode cadastrar outras datas.';$('scheduleDate').value='';}catch(e){$('scheduleStatus').textContent='Não foi possível agendar: '+(e.code||e.message);}finally{scheduleBusy=false;$('scheduleSave').disabled=false;renderAgenda();}};
async function toggleDay(item){if(!teacher||scheduleBusy)return;scheduleBusy=true;renderAgenda();try{await writeSchedule(item.data,!item.liberada);$('scheduleStatus').textContent='Data '+dateName(item.data)+(item.liberada?' suspensa.':' liberada. O prazo continua sendo o dia cadastrado.');}catch(e){$('scheduleStatus').textContent='Não foi possível alterar: '+(e.code||e.message);}finally{scheduleBusy=false;renderAgenda();}}
function renderList(){const term=$('search').value.toLocaleLowerCase('pt-BR'),filter=$('responseDate').value;$('studentList').replaceChildren();const found=rows.filter(x=>(!filter||x.dataAvaliacao===filter)&&(x.nome+' '+x.email+' '+x.turma).toLocaleLowerCase('pt-BR').includes(term));for(const row of found){const button=document.createElement('button');button.type='button';button.className='student';button.textContent=(row.nome||row.email)+' · '+row.turma+' · '+(row.dataAvaliacao==='legado'?'Envio anterior':dateName(row.dataAvaliacao));button.onclick=()=>{$('detail').replaceChildren();const h=document.createElement('h3');h.textContent=row.nome||row.email;const p=document.createElement('p');p.textContent=row.email+' · '+row.turma+' · '+(row.enviadoEm?.toDate?.().toLocaleString('pt-BR',{timeZone:TZ})||'Sem horário');$('detail').append(h,p);displayRecord($('detail'),row,'Ver as seis respostas');$('detail').querySelector('details').open=true;$('detail').focus();};$('studentList').append(button);}if(!found.length)$('studentList').textContent='Nenhuma resposta encontrada para os filtros selecionados.';$('teacherStatus').textContent=found.length+' envio(s) exibido(s) de '+rows.length+' carregado(s).';}
$('search').oninput=renderList;$('responseDate').onchange=renderList;
$('refresh').onclick=async()=>{if(!teacher||!account)return;const generation=++teacherLoad,uid=account.uid;$('refresh').disabled=true;$('teacherStatus').textContent='Consultando respostas por data…';try{const result=[];for(const item of agenda){const snap=await getDocs(collection(db,'autoavaliacaoAgenda',item.data,'respostas'));result.push(...snap.docs.map(d=>({uid:d.id,...d.data()})));}const old=await getDocs(collection(db,'autoavaliacaoGeralV1'));result.push(...old.docs.map(d=>({uid:d.id,...d.data(),dataAvaliacao:'legado'})));if(generation!==teacherLoad||account?.uid!==uid||!teacher)return;rows=result.sort((a,b)=>b.dataAvaliacao.localeCompare(a.dataAvaliacao)||(a.nome||'').localeCompare(b.nome||'','pt-BR'));$('responseDate').replaceChildren();for(const [value,label] of [['','Todas as datas'],...agenda.map(x=>[x.data,dateName(x.data)]),['legado','Envios anteriores à agenda']]){const o=document.createElement('option');o.value=value;o.textContent=label;$('responseDate').append(o);}renderList();$('export').disabled=!rows.length;}catch(e){$('teacherStatus').textContent='Não foi possível carregar todos os envios: '+(e.code||e.message);}finally{$('refresh').disabled=false;}};
$('export').onclick=()=>{if(!teacher||!rows.length)return;const blob=new Blob([JSON.stringify(rows.map(x=>({...x,enviadoEm:x.enviadoEm?.toDate?.().toISOString()||null})),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='autoavaliacoes-discentes-por-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
setInterval(showAvailability,15000);
window.addEventListener('beforeunload',e=>{if(ready&&!submitted&&draft().some(x=>x.trim())){saveDraft();e.preventDefault();e.returnValue='';}});
message('Entre com sua conta Google para consultar as datas de autoavaliação.');
