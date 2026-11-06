import {STAGES} from './config.js?v=20261106-video6-7';
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function availability(id,control,responses){if(responses[id])return 'submitted';const index=STAGES.findIndex(([s])=>s===id);if(index<0||control?.[id]!==true)return 'locked';if(index>0&&!responses[STAGES[index-1][0]])return 'prerequisite';return 'open'}
export function validateAnswers(content,answers){return Array.isArray(content.questions)&&content.questions.length>0&&content.questions.every(q=>typeof answers[q.id]==='string'&&answers[q.id].trim().length>0&&answers[q.id].length<=4000)&&(content.title!=='Implementação e testes no Packet Tracer'||validDrive(answers.q1)&&completeTables(answers))&&(content.kind!=='riddle'||answers.q1?.trim()==='192.168.10.130')}
export function safeVideo(value){if(!value||!value.trim())return null;try{const u=new URL(value,window.location.href);return ['https:','http:'].includes(u.protocol)&&(!value.startsWith('http:')||['localhost','127.0.0.1'].includes(u.hostname))?u.href:null}catch{return null}}

export function validDrive(v){try{const u=new URL(v);return u.protocol==='https:'&&u.hostname==='drive.google.com'&&( /^\/file\/d\/[^/]+/.test(u.pathname)||(u.pathname==='/open'&&!!u.searchParams.get('id')))}catch{return false}}

export function completeTables(a){try{const d=JSON.parse(a.q2),t=JSON.parse(a.q3);const rows=(v,n,m)=>Array.isArray(v)&&v.length===n&&v.every(r=>Array.isArray(r)&&r.length===m&&r.every(x=>typeof x==='string'&&x.trim().length>0&&x.length<=120));return d.type==='config-gateways-v1'&&t.type==='sector-tests-v1'&&rows(d.config,4,5)&&rows(d.gateways,4,2)&&rows(t.rows,6,2)}catch{return false}}
