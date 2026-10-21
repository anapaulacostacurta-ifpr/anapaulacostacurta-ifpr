import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,collection,addDoc,serverTimestamp,onSnapshot,GeoPoint,Timestamp,getDocs,writeBatch,runTransaction,query,orderBy,limit,startAfter,getDocsFromServer} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
const app=initializeApp({apiKey:'AIzaSyAKUEJbtFwDCb6Jv3YU059FpNS-drHlfMw',authDomain:'networking-taks.firebaseapp.com',projectId:'networking-taks',storageBucket:'networking-taks.firebasestorage.app',messagingSenderId:'949681143186',appId:'1:949681143186:web:73ab934af62f9f7e44154b'});
const auth=getAuth(app),db=getFirestore(app),$=s=>document.querySelector(s),root='patrulhaTempoV1';
const requiredIds=["activity", "agree", "authStatus", "availability", "back", "backStudents", "captureCenter", "centerLat", "centerLng", "checkGeo", "classNote", "classNoteStatus", "clearStages", "closeAnswers", "content", "eventFilter", "eventStatus", "eventSummary", "eventTimeline", "exit", "form", "geoAccuracy", "geoConsent", "geoFeedback", "geoNotice", "geoRadius", "geoTeacherFeedback", "identity", "loadClassNote", "login", "lookupStudent", "mode", "moreEvents", "openAnswers", "refreshEvents", "refreshStudents", "retryData", "reviewStatus", "saveClassNote", "saveGeo", "saveStages", "saveStudentNote", "saved", "selectAllStages", "send", "stageFeedback", "stageOptions", "status", "steps", "studentAnswers", "studentDetail", "studentHeading", "studentList", "studentListView", "studentMeta", "studentNote", "studentNoteStatus", "studentSearch", "studentUid", "teacherFeedback", "teacherPanel", "teacherState", "welcome"];
const missingIds=requiredIds.filter(id=>!document.getElementById(id));
if(missingIds.length)throw new Error('Arquivos incompatíveis: faltam elementos no index.html ('+missingIds.join(', ')+'). Publique todos os arquivos do mesmo pacote.');
const steps=[
{title:'Hipótese inicial',intro:'O inimigo já patrulha entre A e B. Agora deverá esperar dois segundos em cada ponto, antes de seguir para o outro. O restante do jogo deve continuar funcionando. Responda individualmente, antes de consultar os próximos materiais.',qs:['O que precisa mudar no comportamento atual?','Que informações o programa precisará guardar para controlar a espera?','Como poderá identificar que os dois segundos terminaram?','Represente sua proposta em passos ou descreva um esquema.']},
{title:'Investigue o tempo',intro:'Analise cada elemento novo. O operador += soma o valor da direita ao valor que já estava armazenado. Em Update(), Time.deltaTime representa o intervalo em segundos entre os quadros. Uma variável bool armazena true ou false.',code:'private float tempoEspera = 2f;\nprivate float tempoDecorrido = 0f;\nprivate bool esperando = false;\n\n// Compare as duas instruções:\ntempoDecorrido = Time.deltaTime;\ntempoDecorrido += Time.deltaTime;\n\n// Equivalência de +=:\ntempoDecorrido = tempoDecorrido + Time.deltaTime;',qs:['Qual função cada uma das três variáveis poderá desempenhar?','Qual a diferença entre atribuir Time.deltaTime e acumulá-lo com +=?','Por que verificar tempoDecorrido >= tempoEspera, em vez de igualdade exata?','Quando a contagem deveria começar e quando deveria voltar a zero?']},
{title:'Planeje a solução',intro:'Sem executar no Unity, organize a lógica do programa. Considere o que acontece ao movimentar, chegar, esperar e retomar. O objetivo é formular uma solução testável, sem precisar acertar toda a sintaxe.',qs:['Escreva os passos ou pseudocódigo da sua solução.','O que impede o movimento enquanto esperando for true?','O inimigo acabou de chegar a A. Preveja o comportamento imediato, durante a espera e ao final dela.','Proponha um teste: condições iniciais, ação e resultado esperado.']},
{title:'Simule no papel',intro:'Simulação simplificada: o inimigo chegou a A e a espera começa com tempoDecorrido = 0. Considere um intervalo fictício de 0,5 segundo por atualização, apenas para facilitar as contas. Na execução real, o intervalo pode variar.',qs:['Registre o valor acumulado nas quatro atualizações seguintes.','Em qual atualização a condição tempoDecorrido >= 2 fica verdadeira? Explique.','Se o temporizador voltasse a zero em toda atualização, o que aconteceria?','Que problema pode ocorrer na próxima chegada se a contagem anterior não for reiniciada?']},
{title:'Implemente e teste',intro:'Etapa de laboratório: use o planejamento já enviado. O inimigo deve começar em direção a A, esperar dois segundos em cada ponto e repetir a patrulha. Preserve a versão original e faça uma alteração por vez. Registre as ajudas recebidas. Digite aqui sua explicação; não é necessário transcrever o código completo.',qs:['Antes do teste: qual alteração fará e qual resultado prevê?','Após o teste: descreva o resultado observado em pelo menos duas idas e voltas.','Qual discrepância encontrou e como revisou a solução? Se não encontrou, explique como verificou.','Explique a função do temporizador e da variável esperando na sua implementação. Registre as ajudas recebidas.']},
{title:'Revise sua hipótese',intro:'Retome mentalmente a primeira explicação. Não é necessário afirmar que mudou de ideia: justifique tanto o que foi mantido quanto o que foi revisto.',qs:['O que manteve ou modificou em relação à hipótese inicial? Por quê?','Explique como posição, chegada, passagem do tempo e retomada do movimento se relacionam.','Novo desafio, sem testar ainda: como faria para esperar um segundo em A e três em B?','Que dúvida ainda permanece? Se não houver, descreva um cuidado importante para programar essa espera.']}
];
steps[0].code = `using UnityEngine;

public class Inimigo : MonoBehaviour
{
    private float moveSpeed = 3f;
    private Vector2 pontoA = new Vector2(-5f, 0f);
    private Vector2 pontoB = new Vector2(5f, 0f);
    private Vector2 targetPoint;

    void Start()
    {
        targetPoint = pontoA;
    }

    void Update()
    {
        transform.position = Vector2.MoveTowards(
            transform.position,
            targetPoint,
            moveSpeed * Time.deltaTime
        );

        if (transform.position.x == pontoA.x)
        {
            targetPoint = pontoB;
        }
        else if (transform.position.x == pontoB.x)
        {
            targetPoint = pontoA;
        }
    }
}`;
steps[0].intro += ' O código abaixo realiza a patrulha horizontal anterior, com o inimigo inicialmente em (0, 0, 0). Leia-o e proponha como acrescentar a espera, sem executá-lo ou modificar o registro inicial depois do envio.';
// Código-base da patrulha, ainda sem tempo de espera.
steps[2].code = steps[0].code;
steps[4].code = steps[0].code;
steps[2].intro += ' Consulte o código inicial abaixo para planejar suas alterações. Ele ainda não implementa a espera.';
steps[4].intro += ' O código inicial abaixo é a base para a implementação; acrescente o controle de espera conforme seu planejamento.';
steps[1].intro = 'Investigue na documentação oficial do Unity indicada abaixo. Leia a definição de Time.deltaTime e observe como o tempo é usado nos exemplos. Relacione a pesquisa às variáveis e instruções apresentadas; escreva com suas palavras e indique a fonte consultada nas respostas. Abrir os links em outra aba é permitido nesta etapa. Essas saídas podem aparecer no registro e não representam infração.';
steps[3].intro = 'Faça um teste de mesa: acompanhe no caderno as mudanças das variáveis, sem abrir o Unity. Não é necessário fotografar o caderno: registre os resultados e as explicações nos campos ao final. O intervalo de 0,5 segundo é fictício e serve apenas para facilitar as contas; na execução real, o intervalo entre quadros pode variar.';
steps[5].intro = 'Consulte abaixo suas respostas originais da primeira etapa. Compare-as com a compreensão construída ao longo da atividade. Elas estão preservadas e não podem ser editadas aqui. Não é necessário afirmar que mudou de ideia: justifique o que foi mantido ou revisto.';
function supplement(i){
 const box=document.createElement('section');box.className='study-guide';
 if(i===1){
  const title=document.createElement('h3');title.textContent='Fontes para investigação';box.append(title);
  const links=[['Time.deltaTime — definição e exemplo','https://docs.unity.com/en-us/engine/6000.0/script-reference/unityengine/time/deltatime'],['Introdução à programação em C# no Unity','https://docs.unity.com/en-us/engine/6000.6/manual/scripting/get-started/intro-to']];
  for(const [label,url] of links){let p=document.createElement('p'),a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';p.append(a);box.append(p)}
  const note=document.createElement('p');note.textContent='Roteiro: localize a definição de deltaTime, identifique sua unidade de medida e examine a multiplicação por uma taxa por segundo. Depois compare = e += nos trechos a seguir. O operador += é uma construção de C#, não um método específico do Unity.';box.append(note);
 }
 if(i===3){box.innerHTML=`<h3>Como realizar a simulação</h3><ol><li>No caderno, monte uma tabela com as colunas: atualização, tempo antes da soma, intervalo, tempo depois da soma, condição de término e ação prevista.</li><li>Considere que o inimigo acabou de chegar a A. Comece com <code>tempoDecorrido = 0</code>, <code>tempoEspera = 2</code> e <code>esperando = true</code>.</li><li>Em cada linha, some 0,5 ao tempo anterior, simulando <code>tempoDecorrido += Time.deltaTime</code>. Só depois da soma, avalie <code>tempoDecorrido &gt;= tempoEspera</code>.</li><li>Exemplo da primeira atualização: antes = 0; intervalo = 0,5; depois = 0,5. A condição 0,5 &gt;= 2 é falsa; portanto o inimigo continua esperando.</li><li>Complete as atualizações 2, 3 e 4. Para cada uma, registre se continua esperando ou se a condição permite encerrar a espera. Considere que o inimigo não se movimenta enquanto espera.</li><li>Ao atingir o limite, descreva a ação que sua proposta faria para retomar a patrulha. Explique também como prepararia o temporizador para a próxima chegada.</li><li>Transfira os resultados para as quatro respostas abaixo. Preserve no caderno sua simulação original.</li></ol>`;}
 if(i===5){let title=document.createElement('h3');title.textContent='Sua hipótese inicial — registro enviado';box.append(title);const initial=answers[0];if(initial?.respostas){steps[0].qs.forEach((q,j)=>{let h=document.createElement('h4');h.textContent=(j+1)+'. '+q;let p=document.createElement('p');p.className='original-answer';p.textContent=initial.respostas[j]||'Sem resposta registrada.';box.append(h,p)})}else{let p=document.createElement('p');p.textContent='Não foi possível localizar a hipótese inicial. Volte à primeira etapa e verifique seu envio antes de responder à revisão.';box.append(p)}}
 return box.childNodes.length?box:null;
}
let user=null,demo=false,index=0,answers=[],busy=false,hiddenAt=null,progressLoaded=false,loadingAccount=null;
let responsesOpen=false,controlReady=false,isTeacher=false,controlBusy=false,stopControl=null;
let geoConfig=null,geoReady=false,stopGeo=null,lastGeoLabel='',geoSaving=false,geoVersion=0;
const geoRef=doc(db,'patrulhaTempoControle','local');
let stageFlags=[false,false,false,false,false,false],stagesReady=false,stopStages=null,stagesSaving=false;
const stageRef=doc(db,'patrulhaTempoControle','etapas');
let students=[],selectedStudent=null,studentNoteVersion=null,classNoteVersion=null,studentNoteOriginal='',classNoteOriginal='',listLoading=false;
const eventNames={aba_oculta:'Página ficou oculta',retorno_aba:'Retorno à página',perda_foco:'Janela perdeu o foco',bloqueio_copy:'Tentativa de cópia bloqueada',bloqueio_cut:'Tentativa de recorte bloqueada',bloqueio_paste:'Tentativa de colagem bloqueada',bloqueio_drop:'Tentativa de soltar texto bloqueada'};
let timeline=[],eventCursor=null,eventHasMore=false,eventBusy=false,eventGeneration=0;
function resetEvents(){eventGeneration++;timeline=[];eventCursor=null;eventHasMore=false;eventBusy=false;$('#eventFilter').value='todos';$('#eventStatus').textContent='';renderEvents();}
function renderEvents(){
 const filter=$('#eventFilter').value;const visible=timeline.filter(e=>filter==='todos'||(filter==='bloqueios'?e.tipo?.startsWith('bloqueio_'):e.tipo===filter));
 $('#eventTimeline').replaceChildren();
 for(const record of visible){const item=document.createElement('li');const heading=document.createElement('strong');heading.textContent=eventNames[record.tipo]||record.tipo||'Evento sem tipo';const time=document.createElement('span');time.className='event-meta';const stage=Number.isInteger(record.etapa)&&record.etapa>=0&&record.etapa<6?(record.etapa+1)+'. '+steps[record.etapa].title:record.etapa===6?'Após a conclusão':'Etapa não identificada';time.textContent=dateLabel(record.em)+' · '+stage;
 item.append(heading,time);if(record.detalhe){let detail=document.createElement('p');detail.textContent=record.tipo==='retorno_aba'?'Tempo fora informado pelo navegador: '+record.detalhe:record.detalhe==='texto_atividade'?'Origem: texto da atividade.':record.detalhe;item.append(detail);}$('#eventTimeline').append(item);}
 const exits=timeline.filter(e=>e.tipo==='aba_oculta').length;const blocked=timeline.filter(e=>e.tipo?.startsWith('bloqueio_')).length;
 $('#eventSummary').textContent=timeline.length+' registro(s) carregado(s); '+exits+' saída(s) de aba e '+blocked+' tentativa(s) bloqueada(s). Exibindo '+visible.length+'. Mais recentes primeiro.';
 $('#moreEvents').hidden=!eventHasMore;$('#moreEvents').disabled=eventBusy;$('#refreshEvents').disabled=eventBusy;
 if(!visible.length&&!eventBusy){const li=document.createElement('li');li.textContent=timeline.length?'Nenhum evento corresponde ao filtro.':'Nenhum evento carregado. Ausência de registros não comprova ausência de ocorrências.';$('#eventTimeline').append(li);}
}
async function loadStudentEvents(reset=false){
 if(!isTeacher||!user||!selectedStudent||eventBusy)return;
 if(reset)resetEvents();
 const uid=selectedStudent.uid,viewer=user.uid,generation=eventGeneration;eventBusy=true;renderEvents();$('#eventStatus').textContent='Consultando eventos no Firebase…';
 try{const clauses=[orderBy('em','desc'),limit(100)];if(!reset&&eventCursor)clauses.push(startAfter(eventCursor));const result=await getDocsFromServer(query(collection(db,root,uid,'eventos'),...clauses));
 if(generation!==eventGeneration||selectedStudent?.uid!==uid||user?.uid!==viewer||!isTeacher)return;
 const seen=new Set(timeline.map(e=>e.id));for(const d of result.docs)if(!seen.has(d.id))timeline.push({id:d.id,...d.data()});eventCursor=result.docs.at(-1)||eventCursor;eventHasMore=result.docs.length===100;
 $('#eventStatus').textContent='Consulta concluída.'+(eventHasMore?' Há mais registros disponíveis.':' Todos os registros disponíveis foram carregados.');}
 catch(e){if(generation===eventGeneration&&selectedStudent?.uid===uid)$('#eventStatus').textContent='Não foi possível consultar os eventos: '+(e.code||e.message)+'. Atualize as regras do Firebase e verifique a conexão.';}
 finally{if(generation===eventGeneration&&selectedStudent?.uid===uid){eventBusy=false;renderEvents();}}
}
$('#refreshEvents').onclick=()=>loadStudentEvents(true);$('#moreEvents').onclick=()=>loadStudentEvents(false);$('#eventFilter').onchange=renderEvents;
function noteRef(uid){return doc(db,'patrulhaTempoObservacoes',uid);}
function dateLabel(value){return value?.toDate?value.toDate().toLocaleString('pt-BR'):'Horário não disponível';}
function noteVersion(snap){return snap.exists()?snap.data().alteradoEm?.toMillis?.()??null:null;}
function renderStudentList(){
 const term=$('#studentSearch').value.trim().toLocaleLowerCase('pt-BR');$('#studentList').replaceChildren();
 const found=students.filter(s=>(s.nome+' '+s.email).toLocaleLowerCase('pt-BR').includes(term));
 if(!found.length){let p=document.createElement('p');p.textContent=students.length?'Nenhum aluno corresponde à busca.':'Nenhum envio encontrado. Clique em Atualizar lista ou consulte um UID.';$('#studentList').append(p);return;}
 for(const student of found){const button=document.createElement('button');button.type='button';button.className='student-row';const name=document.createElement('strong');name.textContent=student.nome||'Aluno sem nome';const meta=document.createElement('span');meta.textContent=student.email+' · '+student.etapas.length+'/6 etapas enviadas';button.append(name,meta);button.onclick=()=>showStudent(student.uid);$('#studentList').append(button);}
}
async function readStudent(uid){
 const snap=await getDocs(collection(db,root,uid,'etapas'));const etapas=snap.docs.map(d=>({id:d.id,...d.data()})).filter(d=>Number.isInteger(d.etapa)&&d.etapa>=0&&d.etapa<6).sort((a,b)=>a.etapa-b.etapa);
 const first=etapas[0];return {uid,nome:first?.nome||'',email:first?.email||'',etapas};
}
async function discoverStudentIds(){
 // Inclui documentos-pai ausentes de versões antigas, sem alterar as respostas.
 const token=await user.getIdToken();let next='',ids=[];
 do{const url=new URL('https://firestore.googleapis.com/v1/projects/networking-taks/databases/(default)/documents/'+root);url.searchParams.set('showMissing','true');url.searchParams.set('pageSize','100');if(next)url.searchParams.set('pageToken',next);const response=await fetch(url,{headers:{Authorization:'Bearer '+token}});if(!response.ok){const e=new Error('Não foi possível listar os registros antigos.');e.code='lista-antiga-indisponivel';throw e;}const data=await response.json();ids.push(...(data.documents||[]).map(d=>d.name.split('/').at(-1)));next=data.nextPageToken||'';}while(next);
 return [...new Set(ids)];
}
async function refreshStudents(){
 if(!isTeacher||!user||listLoading)return;const uid=user.uid;listLoading=true;$('#refreshStudents').disabled=true;$('#reviewStatus').textContent='Buscando envios no Firebase…';
 try{let ids,legacyWarning='';try{ids=await discoverStudentIds();}catch{const snap=await getDocs(collection(db,root));ids=snap.docs.map(d=>d.id);legacyWarning=' A listagem de registros antigos não ficou disponível; se algum aluno não aparecer, consulte pelo UID.';}
 const results=[];let failures=0;for(let i=0;i<ids.length;i+=6){const batch=await Promise.allSettled(ids.slice(i,i+6).map(readStudent));for(const result of batch){if(result.status==='fulfilled'){if(result.value.etapas.length)results.push(result.value);}else failures++;}}
 if(user?.uid!==uid||!isTeacher)return;students=results.sort((a,b)=>(a.nome||a.email).localeCompare(b.nome||b.email,'pt-BR'));renderStudentList();$('#reviewStatus').textContent=students.length+' aluno(s) com envios.'+legacyWarning+(failures?' Não foi possível ler '+failures+' registro(s); tente atualizar novamente.':'');}
 catch(e){$('#reviewStatus').textContent='Não foi possível carregar os alunos: '+(e.code||e.message)+'. Confira as regras atualizadas do Firebase.';}
 finally{listLoading=false;$('#refreshStudents').disabled=false;}
}
function noteDirty(){return $('#studentNote').value!==studentNoteOriginal;}
async function showStudent(uid){
 if(!isTeacher||!user)return;
 if(selectedStudent&&noteDirty()&&!window.confirm('Há observações não salvas. Deseja abrir outro aluno sem salvá-las?'))return;
 const viewer=user.uid;$('#reviewStatus').textContent='Carregando respostas e observações…';
 try{const [student,note]=await Promise.all([readStudent(uid),getDoc(noteRef(uid))]);if(user?.uid!==viewer||!isTeacher)return;
 selectedStudent=student;resetEvents();$('#studentListView').hidden=true;$('#studentDetail').hidden=false;$('#studentHeading').textContent=student.nome||student.email||'Aluno';$('#studentMeta').textContent=(student.email||'Sem e-mail registrado')+' · '+student.etapas.length+'/6 etapas · UID: '+uid;
 $('#studentAnswers').replaceChildren();for(let i=0;i<6;i++){let section=document.createElement('details');let summary=document.createElement('summary');const record=student.etapas.find(s=>s.etapa===i);summary.textContent=(i+1)+'. '+steps[i].title+(record?' — enviada':' — não enviada');section.append(summary);if(record){let time=document.createElement('p');time.textContent='Enviada em '+dateLabel(record.enviadoEm);section.append(time);steps[i].qs.forEach((q,j)=>{let h=document.createElement('h4');h.textContent=(j+1)+'. '+q;let p=document.createElement('p');p.className='review-answer';p.textContent=record.respostas?.[j]||'Sem resposta registrada.';section.append(h,p)});}else{let p=document.createElement('p');p.textContent='Esta etapa ainda não foi enviada.';section.append(p)}$('#studentAnswers').append(section);}
 studentNoteOriginal=note.exists()?note.data().texto||'':'';$('#studentNote').value=studentNoteOriginal;studentNoteVersion=noteVersion(note);$('#studentNoteStatus').textContent=note.exists()?'Última atualização: '+dateLabel(note.data().alteradoEm):'Nenhuma observação salva para este aluno.';$('#reviewStatus').textContent='';loadStudentEvents(true);}
 catch(e){$('#reviewStatus').textContent='Não foi possível consultar o aluno: '+(e.code||e.message);}
}
async function saveNote(kind){
 if(!isTeacher||!user)return;const general=kind==='turma';if(!general&&!selectedStudent)return;const uid=general?'_turma':selectedStudent.uid;const input=general?$('#classNote'):$('#studentNote');const status=general?$('#classNoteStatus'):$('#studentNoteStatus');const button=general?$('#saveClassNote'):$('#saveStudentNote');const expected=general?classNoteVersion:studentNoteVersion;const text=input.value;
 if(text.length>20000){status.textContent='Use no máximo 20000 caracteres.';return;}
 button.disabled=true;status.textContent='Salvando observações…';
 try{const savedTime=await runTransaction(db,async transaction=>{const reference=noteRef(uid);const current=await transaction.get(reference);if(noteVersion(current)!==expected)throw new Error('As observações foram alteradas em outra sessão. Recarregue antes de salvar para não sobrescrever a outra versão.');transaction.set(reference,{texto:text,alteradoPor:user.uid,alteradoEm:serverTimestamp()});});
 const confirmed=await getDoc(noteRef(uid));if(general){classNoteVersion=noteVersion(confirmed);classNoteOriginal=text;}else if(selectedStudent?.uid===uid){studentNoteVersion=noteVersion(confirmed);studentNoteOriginal=text;}status.textContent='Observações salvas no Firebase.';}
 catch(e){status.textContent='Não foi possível salvar: '+(e.code||e.message);}
 finally{button.disabled=false;}
}
$('#refreshStudents').onclick=refreshStudents;$('#studentSearch').oninput=renderStudentList;
$('#lookupStudent').onclick=()=>{const uid=$('#studentUid').value.trim();if(!uid||uid.includes('/')){$('#reviewStatus').textContent='Informe um UID válido.';return;}showStudent(uid);};
$('#backStudents').onclick=()=>{if(noteDirty()&&!window.confirm('Voltar sem salvar suas observações?'))return;$('#studentDetail').hidden=true;$('#studentListView').hidden=false;selectedStudent=null;resetEvents();};
$('#saveStudentNote').onclick=()=>saveNote('aluno');$('#saveClassNote').onclick=()=>saveNote('turma');
$('#loadClassNote').onclick=async()=>{if(!isTeacher||!user)return;if($('#classNote').value!==classNoteOriginal&&!window.confirm('Recarregar e descartar as alterações não salvas?'))return;try{const snap=await getDoc(noteRef('_turma'));classNoteVersion=noteVersion(snap);classNoteOriginal=snap.exists()?snap.data().texto||'':'';$('#classNote').value=classNoteOriginal;$('#classNoteStatus').textContent=snap.exists()?'Última atualização: '+dateLabel(snap.data().alteradoEm):'Nenhuma observação geral salva.';}catch(e){$('#classNoteStatus').textContent='Não foi possível carregar: '+(e.code||e.message);}};

function stageReleased(i){return demo || (stagesReady && stageFlags[i]===true);}
steps.forEach((step,i)=>{const label=document.createElement('label');label.className='check';const input=document.createElement('input');input.type='checkbox';input.id='releaseStage'+i;const title=document.createElement('span');title.textContent=(i+1)+'. '+step.title;label.append(input,title);$('#stageOptions').append(label);});
$('#selectAllStages').onclick=()=>{if(isTeacher)for(let i=0;i<6;i++)$('#releaseStage'+i).checked=true;};
$('#clearStages').onclick=()=>{if(isTeacher)for(let i=0;i<6;i++)$('#releaseStage'+i).checked=false;};
$('#saveStages').onclick=async()=>{
 if(!user||!isTeacher||stagesSaving)return;
 const flags=steps.map((_,i)=>$('#releaseStage'+i).checked);
 stagesSaving=true;$('#saveStages').disabled=true;$('#stageFeedback').textContent='Salvando liberação das etapas…';
 try{await setDoc(stageRef,{liberadas:flags,alteradoPor:user.uid,alteradoEm:serverTimestamp()});$('#stageFeedback').textContent='Liberação das etapas salva no Firebase.';}
 catch(e){$('#stageFeedback').textContent='Não foi possível salvar: '+(e.code||e.message)+'. Confira as regras atualizadas.';}
 finally{stagesSaving=false;$('#saveStages').disabled=false;}
};

function distanceMeters(lat1,lon1,lat2,lon2){const rad=x=>x*Math.PI/180;const a=Math.sin(rad(lat2-lat1)/2)**2+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(rad(lon2-lon1)/2)**2;return 6371000*2*Math.atan2(Math.sqrt(a),Math.sqrt(Math.max(0,1-a)));}
function validGeoConfig(c){return !!c&&c.centro&&Number.isFinite(c.centro.latitude)&&Number.isFinite(c.centro.longitude)&&Number.isFinite(c.raioMetros)&&c.raioMetros>=10&&c.raioMetros<=10000&&Number.isFinite(c.maxPrecisaoMetros)&&c.maxPrecisaoMetros>=1&&c.maxPrecisaoMetros<=10000;}
function currentPosition(){return new Promise((resolve,reject)=>{if(!navigator.geolocation)return reject(new Error('Este navegador não oferece geolocalização.'));navigator.geolocation.getCurrentPosition(resolve,e=>reject(new Error(e.code===1?'Permissão de localização negada. Autorize nas configurações do navegador e tente novamente.':e.code===2?'Não foi possível obter a posição. Verifique o serviço de localização do dispositivo.':'Tempo esgotado ao localizar. Tente novamente.')),{enableHighAccuracy:true,maximumAge:0,timeout:25000});});}
async function locationForSubmission(){
 if(demo)return null;
 if(!$('#geoConsent').checked)throw new Error('Leia e marque a autorização de localização antes de enviar.');
 if(!geoReady||!validGeoConfig(geoConfig))throw new Error('A professora precisa configurar o local autorizado ou a conexão precisa ser restabelecida.');
 const version=geoVersion;const p=await currentPosition();
 if(version!==geoVersion||!geoReady||!validGeoConfig(geoConfig))throw new Error('O local autorizado mudou. Verifique novamente antes do envio.');
 const {latitude,longitude,accuracy}=p.coords;
 if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||!Number.isFinite(accuracy)||accuracy<=0)throw new Error('O dispositivo retornou uma medição inválida.');
 if(Date.now()-p.timestamp>120000||p.timestamp>Date.now()+10000)throw new Error('A medição de localização está desatualizada. Tente novamente.');
 const distance=distanceMeters(latitude,longitude,geoConfig.centro.latitude,geoConfig.centro.longitude);
 if(accuracy>geoConfig.maxPrecisaoMetros)throw new Error('Precisão insuficiente: margem de '+Math.ceil(accuracy)+' m; o máximo aceito é '+geoConfig.maxPrecisaoMetros+' m. Avise a professora.');
 if(distance>geoConfig.raioMetros)throw new Error('Você está a aproximadamente '+Math.round(distance)+' m do centro; o raio permitido é '+geoConfig.raioMetros+' m. Envio bloqueado.');
 lastGeoLabel='Dentro da área: distância aproximada '+Math.round(distance)+' m; precisão informada ±'+Math.ceil(accuracy)+' m. A localização será verificada novamente em cada envio.';
 $('#geoFeedback').textContent=lastGeoLabel;
 return {ponto:new GeoPoint(latitude,longitude),precisaoMetros:accuracy,coletadoEm:Timestamp.fromMillis(p.timestamp)};
}
$('#checkGeo').onclick=async()=>{if(demo)return;$('#checkGeo').disabled=true;$('#geoFeedback').textContent='Verificando localização…';try{await locationForSubmission()}catch(e){$('#geoFeedback').textContent=e.message}finally{$('#checkGeo').disabled=false}};
$('#captureCenter').onclick=async()=>{if(!isTeacher)return;$('#captureCenter').disabled=true;$('#geoTeacherFeedback').textContent='Solicitando sua localização…';try{const p=await currentPosition();$('#centerLat').value=p.coords.latitude.toFixed(7);$('#centerLng').value=p.coords.longitude.toFixed(7);$('#geoTeacherFeedback').textContent='Centro preenchido. Precisão informada: ±'+Math.ceil(p.coords.accuracy)+' m. Confira os valores e clique em Salvar local no Firebase.';}catch(e){$('#geoTeacherFeedback').textContent=e.message}finally{$('#captureCenter').disabled=false}};
$('#saveGeo').onclick=async()=>{
 if(!isTeacher||!user||geoSaving)return;
 const latText=$('#centerLat').value.trim(),lngText=$('#centerLng').value.trim();const lat=Number(latText),lng=Number(lngText),radius=Number($('#geoRadius').value),accuracy=Number($('#geoAccuracy').value);
 if(!latText||!lngText||!Number.isFinite(lat)||!Number.isFinite(lng)||lat< -90||lat>90||lng< -180||lng>180||!Number.isFinite(radius)||radius<10||radius>10000||!Number.isFinite(accuracy)||accuracy<1||accuracy>10000){$('#geoTeacherFeedback').textContent='Informe latitude de −90 a 90, longitude de −180 a 180, raio de 10 a 10000 m e precisão máxima de 1 a 10000 m.';return;}
 geoSaving=true;$('#saveGeo').disabled=true;$('#geoTeacherFeedback').textContent='Salvando local…';try{await setDoc(geoRef,{centro:new GeoPoint(lat,lng),raioMetros:radius,maxPrecisaoMetros:accuracy,alteradoPor:user.uid,alteradoEm:serverTimestamp()});$('#geoTeacherFeedback').textContent='Local autorizado salvo no Firebase.';}catch(e){$('#geoTeacherFeedback').textContent='Não foi possível salvar: '+(e.code||e.message)+'. Verifique as regras.';}finally{geoSaving=false;$('#saveGeo').disabled=false;}
};
const controlRef=doc(db,'patrulhaTempoControle','atividade');
function mayAnswer(){return demo || (progressLoaded && controlReady && responsesOpen && stageReleased(index) && geoReady && validGeoConfig(geoConfig))}
function updateAvailability(){
 const box=$('#availability');
 if(demo){box.textContent='Demonstração: os controles da turma não se aplicam e nenhuma resposta será enviada.';box.className='availability';}
 else{box.textContent=!controlReady?'Aguardando confirmação da liberação pela professora…':responsesOpen?'Respostas liberadas pela professora.':'Respostas bloqueadas pela professora. Você pode consultar a atividade. Seu rascunho permanece neste navegador.';box.className='availability '+(controlReady&&responsesOpen?'open':'closed');}
 $('#geoNotice').hidden=demo;
 if(!demo){if(!geoReady)$('#geoFeedback').textContent='Aguardando confirmação do local autorizado no Firebase…';else if(!validGeoConfig(geoConfig))$('#geoFeedback').textContent='Local autorizado ainda não configurado pela professora. O envio permanece bloqueado.';else $('#geoFeedback').textContent=lastGeoLabel||'Local configurado. Raio permitido: '+geoConfig.raioMetros+' m. Autorize e verifique sua posição antes de enviar.';}
 if(!demo&&controlReady&&responsesOpen&&index<6&&!answers[index]&&!stageReleased(index)){
 box.textContent=stagesReady?'Etapa '+(index+1)+' bloqueada pela professora. Você pode consultar o conteúdo e aguardar a liberação.':'Aguardando confirmação da liberação desta etapa no Firebase…';box.className='availability closed';}
 $('#teacherPanel').hidden=demo||!isTeacher;
 $('#teacherState').textContent=!controlReady?'Sem confirmação do servidor.':responsesOpen?'Situação atual: respostas liberadas.':'Situação atual: respostas bloqueadas.';
 $('#openAnswers').disabled=controlBusy;
 $('#closeAnswers').disabled=controlBusy;
 for(const ta of $('#form').querySelectorAll('textarea'))ta.readOnly=!!answers[index]||!mayAnswer();
 $('#send').disabled=busy||(!answers[index]&&!mayAnswer());
}
async function setupControl(){
 if(stopControl)stopControl();if(stopGeo)stopGeo();if(stopStages)stopStages();stageFlags=steps.map(()=>false);stagesReady=false;responsesOpen=false;controlReady=false;isTeacher=false;geoConfig=null;geoReady=false;lastGeoLabel='';geoVersion++;
 const currentUid=user.uid;
 try{const role=await getDoc(doc(db,'patrulhaTempoDocentes',currentUid));if(user?.uid!==currentUid)return;isTeacher=role.exists()&&role.data().ativo===true;}catch{isTeacher=false;}
 if(user?.uid!==currentUid)return;
 stopControl=onSnapshot(controlRef,{includeMetadataChanges:true},snapshot=>{
  if(user?.uid!==currentUid)return;
  controlReady=!snapshot.metadata.fromCache&&!snapshot.metadata.hasPendingWrites;
  responsesOpen=controlReady&&snapshot.exists()&&snapshot.data().aberto===true;
  updateAvailability();
 },()=>{responsesOpen=false;controlReady=false;updateAvailability();msg('Não foi possível confirmar a liberação. Verifique a conexão e as regras do Firebase; o envio está suspenso.');});
 stopStages=onSnapshot(stageRef,{includeMetadataChanges:true},snapshot=>{
  if(user?.uid!==currentUid)return;
  stagesReady=!snapshot.metadata.fromCache&&!snapshot.metadata.hasPendingWrites;
  const flags=stagesReady&&snapshot.exists()?snapshot.data().liberadas:null;
  stageFlags=Array.isArray(flags)&&flags.length===6&&flags.every(x=>typeof x==='boolean')?flags:steps.map(()=>false);
  if(isTeacher)for(let i=0;i<6;i++)$('#releaseStage'+i).checked=stageFlags[i];
  updateAvailability();
 },()=>{stagesReady=false;stageFlags=steps.map(()=>false);updateAvailability();});
 stopGeo=onSnapshot(geoRef,{includeMetadataChanges:true},snapshot=>{
  if(user?.uid!==currentUid)return;
  geoReady=!snapshot.metadata.fromCache&&!snapshot.metadata.hasPendingWrites;geoConfig=geoReady&&snapshot.exists()?snapshot.data():null;geoVersion++;lastGeoLabel='';
  if(isTeacher&&validGeoConfig(geoConfig)){$('#centerLat').value=geoConfig.centro.latitude;$('#centerLng').value=geoConfig.centro.longitude;$('#geoRadius').value=geoConfig.raioMetros;$('#geoAccuracy').value=geoConfig.maxPrecisaoMetros;}
  updateAvailability();
 },()=>{geoReady=false;geoConfig=null;geoVersion++;updateAvailability();});
 updateAvailability();
}
async function changeAvailability(open){
 if(!user||!isTeacher||controlBusy)return;
 controlBusy=true;updateAvailability();$('#teacherFeedback').textContent='Salvando controle no Firebase…';
 try{await setDoc(controlRef,{aberto:open,alteradoEm:serverTimestamp(),alteradoPor:user.uid});$('#teacherFeedback').textContent=open?'Respostas liberadas. Os alunos conectados receberão a atualização.':'Respostas bloqueadas. Novos envios não serão aceitos.';}
 catch(e){$('#teacherFeedback').textContent='Não foi possível alterar o controle: '+(e.code||e.message)+'. Confira as regras e sua autorização docente.';}
 finally{controlBusy=false;updateAvailability();}
}
$('#openAnswers').onclick=()=>changeAvailability(true);
$('#closeAnswers').onclick=()=>changeAvailability(false);
function msg(t){$('#status').textContent=t;if($('#authStatus'))$('#authStatus').textContent=t}function draftKey(i){return `${root}:${demo?'demo':user?.uid}:${i}`}
function ref(i){return doc(db,root,user.uid,'etapas',String(i))}
async function event(type,detail=''){if(demo||!user)return;try{await addDoc(collection(db,root,user.uid,'eventos'),{tipo:type,detalhe:detail,etapa:index,em:serverTimestamp()})}catch{ /* eventos não bloqueiam o envio das respostas */ }}
function render(){ $('#welcome').hidden=true;$('#activity').hidden=false;$('#identity').textContent=demo?'Visitante · demonstração':user.displayName||user.email;$('#mode').textContent=demo?'SEM ENVIO AO FIREBASE':'CONTA GOOGLE';$('#steps').replaceChildren();steps.forEach((s,i)=>{let b=document.createElement('button');b.className=i===index?'active':'';b.disabled=i>answers.length;b.innerHTML=`<b>${i<answers.length?'✓':i+1}</b><span>${s.title}</span>`;b.onclick=()=>{index=i;render()};$('#steps').append(b)});
$('#form').replaceChildren();$('#saved').hidden=true;$('#back').hidden=index===0;$('#send').hidden=false;
if(index===6){$('#content').innerHTML='<div class="success">✓</div><span class="eyebrow">PERCURSO CONCLUÍDO</span><h2>Uma explicação<br>em movimento.</h2><p>Todas as seis etapas foram enviadas. Você pode consultar seus registros nas etapas anteriores.</p>';$('#send').hidden=true;$('#saved').hidden=false;$('#saved').textContent=demo?'Demonstração concluída. Nenhuma resposta foi enviada.':'Respostas confirmadas no Firebase para '+user.email+'. Atividade: patrulhaTempoV1.';updateAvailability();return}
const s=steps[index];$('#content').replaceChildren();let e=document.createElement('div');e.className='eyebrow';e.textContent=`ETAPA ${index+1} DE 6`;$('#content').append(e);let h=document.createElement('h2');h.textContent=s.title;$('#content').append(h);let p=document.createElement('p');p.textContent=s.intro;$('#content').append(p);const extra=supplement(index);if(extra)$('#content').append(extra);if(s.code){let pre=document.createElement('pre');pre.textContent=s.code;$('#content').append(pre)}
let draft=[];try{draft=JSON.parse(localStorage.getItem(draftKey(index))||'[]')}catch{}
const sent=answers[index];s.qs.forEach((q,j)=>{let label=document.createElement('label');label.className='question';label.htmlFor='q'+j;label.textContent=`${j+1}. ${q}`;let ta=document.createElement('textarea');ta.id='q'+j;ta.required=true;ta.maxLength=12000;ta.value=sent?.respostas[j]??draft[j]??'';ta.readOnly=!!sent;ta.placeholder='Explique com suas palavras…';let counter=document.createElement('div');counter.className='counter';counter.textContent='Registro individual · rascunho neste navegador';ta.oninput=()=>{try{localStorage.setItem(draftKey(index),JSON.stringify([...$('#form').querySelectorAll('textarea')].map(x=>x.value)))}catch{} };$('#form').append(label,ta,counter)});$('#send').textContent=sent?'Próxima etapa →':'Salvar e continuar →';if(sent){$('#saved').hidden=false;$('#saved').textContent='Etapa enviada. Sua resposta original foi preservada.'} updateAvailability();}
async function load(){progressLoaded=false;msg('Google conectado. Recuperando seu progresso no Firebase…');answers=[];for(let i=0;i<6;i++){let snap=await getDoc(ref(i));if(!snap.exists())break;answers.push(snap.data())}index=answers.length;progressLoaded=true;$('#retryData').hidden=true;render();msg('')}
async function openAccount(u){
 if(loadingAccount===u.uid)return;
 loadingAccount=u.uid;progressLoaded=false;user=u;demo=false;answers=[];index=0;
 $('#login').disabled=true;$('#login').textContent='Conectado com Google';$('#exit').hidden=false;
 try{render();msg('Google conectado como '+(u.email||u.displayName)+'. Carregando atividade…');await setupControl();await load();}
 catch(e){if(user?.uid===u.uid){progressLoaded=false;render();$('#retryData').hidden=false;msg('O login Google foi concluído como '+(u.email||u.displayName)+', mas não foi possível carregar os dados da atividade. '+friendly(e));}}
 finally{loadingAccount=null;$('#login').disabled=false;$('#login').textContent='Entrar com Google →';}
}
$('#login').onclick=async()=>{
 if(!$('#agree').checked)return msg('Leia e marque as orientações antes de entrar.');
 if(auth.currentUser){await openAccount(auth.currentUser);return;}
 $('#login').disabled=true;
 try{msg('Abrindo a janela de login Google…');const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await signInWithPopup(auth,provider);}
 catch(e){msg(friendly(e));}
 finally{$('#login').disabled=false;}
};
$('#retryData').onclick=()=>{if(user)openAccount(user)};
function friendly(e){
 const code=e.code||'';
 if(code==='auth/unauthorized-domain')return 'Domínio não autorizado. No projeto networking-taks, abra Authentication → Settings → Authorized domains e adicione exatamente '+location.hostname+' (sem https e sem caminho).';
 if(code==='auth/popup-blocked')return 'O navegador bloqueou a janela do Google. Permita pop-ups para este site e clique novamente em Entrar com Google. Se estiver dentro de uma prévia, abra a URL em uma aba normal.';
 if(code==='auth/operation-not-allowed')return 'O login Google precisa ser habilitado no Firebase: Authentication → Sign-in method → Google.';
 if(code==='auth/popup-closed-by-user')return 'A janela de login foi fechada antes da conclusão. Tente novamente.';
 if(code==='auth/cancelled-popup-request')return 'Já existe uma tentativa de login. Feche a janela anterior e tente novamente.';
 if(code==='auth/network-request-failed')return 'Falha de rede ao acessar o Google/Firebase. Verifique a conexão e bloqueios da rede escolar.';
 if(code==='permission-denied')return 'O Firestore negou acesso. Confira as regras atualizadas e o cadastro docente; para envios, confira também a liberação das etapas e o local autorizado. Seu rascunho permanece neste navegador.';
 return 'Não foi possível concluir: '+(code||e.message||'erro desconhecido')+'.';
}

onAuthStateChanged(auth,async u=>{
 user=u;$('#exit').hidden=!u;
 if(u){await openAccount(u);}
 else{progressLoaded=false;$('#activity').hidden=true;$('#welcome').hidden=false;msg('Conexão pronta. Marque as orientações e entre com sua conta Google.');}
},e=>msg('Não foi possível verificar sua sessão. '+friendly(e)));
$('#exit').onclick=async()=>{try{await signOut(auth);location.reload()}catch(e){msg(friendly(e))}};
$('#back').onclick=()=>{index--;render()};
$('#send').onclick=async()=>{if(busy)return;if(answers[index]){index++;render();return}if(!mayAnswer()){updateAvailability();return msg('O envio está bloqueado, a etapa não foi liberada ou falta confirmar a configuração no Firebase.')}if(!$('#form').reportValidity())return;const values=[...$('#form').querySelectorAll('textarea')].map(x=>x.value.trim());if(values.some(v=>!v))return msg('Preencha todas as respostas com suas palavras.');busy=true;$('#send').disabled=true;try{msg(demo?'Avançando na demonstração…':'Verificando localização antes de enviar…');const location=await locationForSubmission();if(!demo&&!mayAnswer())throw new Error('O envio foi bloqueado durante a verificação. Seu rascunho foi preservado.');let data={respostas:values,etapa:index,email:demo?'demo':user.email,nome:demo?'Visitante':user.displayName||'',enviadoEm:demo?new Date().toISOString():serverTimestamp()};if(!demo){data.localizacao=location;msg('Localização aprovada. Salvando no Firebase…');const batch=writeBatch(db);batch.set(ref(index),data);batch.set(doc(db,root,user.uid),{nome:user.displayName||'',email:user.email,atualizadoEm:serverTimestamp()});await batch.commit();}answers.push(data);localStorage.removeItem(draftKey(index));index++;render();msg(demo?'Demonstração: nenhum envio realizado.':'Etapa salva no Firebase.')}catch(e){msg(friendly(e))}finally{busy=false;updateAvailability()}};
// Proteção dos enunciados por comandos usuais do navegador.
function protectedActivityText(target){
 const el=target?.nodeType===3?target.parentElement:target;
 return !!el?.closest?.('#content, #saved, #form .question, #welcome .notice');
}
function editableTarget(target){return !!target?.closest?.('input, textarea, [contenteditable="true"]');}
function selectedProtectedText(){
 const selection=window.getSelection?.();
 return !!selection&&[selection.anchorNode,selection.focusNode].some(protectedActivityText);
}
function blockActivityCopy(e,kind='copy'){
 e.preventDefault();
 if(e.clipboardData)e.clipboardData.setData('text/plain','');
 event(kind==='cut'?'bloqueio_cut':'bloqueio_copy','texto_atividade');
 msg('A cópia do texto da atividade está bloqueada. Leia o enunciado no site e escreva sua própria resposta.');
}
for(const type of ['copy','cut','paste','drop'])document.addEventListener(type,e=>{
 if((type==='copy'||type==='cut')&&(protectedActivityText(e.target)||selectedProtectedText())){blockActivityCopy(e,type);return;}
 if(e.target.closest?.('#form')&&e.target.matches?.('textarea,input')){e.preventDefault();event('bloqueio_'+type);msg('Copiar, recortar, colar e arrastar texto estão bloqueados nos campos. Digite sua própria resposta.');}
});
for(const type of ['selectstart','dragstart'])document.addEventListener(type,e=>{
 if(!editableTarget(e.target)&&protectedActivityText(e.target)){e.preventDefault();}
});
document.addEventListener('contextmenu',e=>{
 if(!editableTarget(e.target)&&protectedActivityText(e.target)){e.preventDefault();}
});
document.addEventListener('keydown',e=>{
 if(!(e.ctrlKey||e.metaKey)||editableTarget(e.target)||e.target.closest?.('#teacherPanel'))return;
 const key=e.key.toLowerCase();
 if((key==='c'||key==='x')&&(protectedActivityText(e.target)||selectedProtectedText()||!$('#activity').hidden)){blockActivityCopy(e,key==='x'?'cut':'copy');}
 else if(key==='a'&&!$('#activity').hidden){e.preventDefault();msg('A seleção do texto da atividade está bloqueada.');}
});
document.addEventListener('visibilitychange',()=>{if($('#activity').hidden)return;if(document.hidden){hiddenAt=Date.now();event('aba_oculta')}else{event('retorno_aba',hiddenAt?String(Math.round((Date.now()-hiddenAt)/1000))+' segundos':'');hiddenAt=null}});
window.addEventListener('blur',()=>{if(!$('#activity').hidden)event('perda_foco')});
