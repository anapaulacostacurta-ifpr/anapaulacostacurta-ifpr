import {STAGES} from './config.js';
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function availability(id,control,responses){if(responses[id])return 'submitted';const index=STAGES.findIndex(([s])=>s===id);if(index<0||control?.[id]!==true)return 'locked';if(index>0&&!responses[STAGES[index-1][0]])return 'prerequisite';return 'open'}
export function validateAnswers(content,answers){return Array.isArray(content.questions)&&content.questions.length>0&&content.questions.every(q=>typeof answers[q.id]==='string'&&answers[q.id].trim().length>0&&answers[q.id].length<=4000)&&(content.title!=='Implementação e testes no Packet Tracer'||validDrive(answers.q1))&&(content.kind!=='riddle'||answers.q1?.trim()==='192.168.10.130')}
export function safeVideo(value){if(!value||!value.trim())return null;try{const u=new URL(value,window.location.href);return ['https:','http:'].includes(u.protocol)&&(!value.startsWith('http:')||['localhost','127.0.0.1'].includes(u.hostname))?u.href:null}catch{return null}}

export function validDrive(v){try{const u=new URL(v);return u.protocol==='https:'&&u.hostname==='drive.google.com'&&( /^\/file\/d\/[^/]+/.test(u.pathname)||(u.pathname==='/open'&&!!u.searchParams.get('id')))}catch{return false}}
