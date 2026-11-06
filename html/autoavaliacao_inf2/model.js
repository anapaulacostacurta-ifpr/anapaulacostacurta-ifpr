import {CONFIG} from './config.js';
export const STEP_NAMES=['Identificação','Participação','Aprendizagem','Reflexão','Revisão'];
export const empty=()=>({turma:'',disciplina:'',periodo:'',ratings:{},reflection:{}});
export function validate(d,step){if(step===0)return ['turma','disciplina','periodo'].every(k=>typeof d[k]==='string'&&d[k].trim().length>0&&d[k].length<=120);if(step===1||step===2)return CONFIG.sections[step-1].items.every(([id])=>Number.isInteger(d.ratings[id])&&d.ratings[id]>=1&&d.ratings[id]<=5);if(step===3)return CONFIG.reflection.every(([id])=>typeof d.reflection[id]==='string'&&d.reflection[id].trim().length>=3&&d.reflection[id].length<=3000);return [0,1,2,3].every(i=>validate(d,i))}
export function labelFor(id,value){const sec=CONFIG.sections.find(s=>s.items.some(([k])=>k===id));return sec?.scale[value-1]||'Não informado'}
export function record(user,d){if(!validate(d,4))throw Error('Há respostas pendentes. Revise as etapas.');return {activityId:CONFIG.activityId,version:1,uid:user.uid,email:user.email,nome:user.displayName||user.email,turma:d.turma.trim(),disciplina:d.disciplina.trim(),periodo:d.periodo.trim(),ratings:{...d.ratings},reflection:{...d.reflection}}}
export function escapeHTML(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
