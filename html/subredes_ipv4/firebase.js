// Firebase Web configuration is public; database access is controlled by rules.
window.ACTIVITY_CONFIG = {
 provider: 'firebase', video: 'video.mp4', endpoint: 'firebase',
 firebase: {
 apiKey: 'AIzaSyAKUEJbtFwDCb6Jv3YU059FpNS-drHlfMw',
 authDomain: 'networking-taks.firebaseapp.com', projectId: 'networking-taks',
 storageBucket: 'networking-taks.firebasestorage.app', messagingSenderId: '949681143186',
 appId: '1:949681143186:web:73ab934af62f9f7e44154b'
 }
};
let firebaseReady;
window.firebaseSave = async function(payload) {
 if (!firebaseReady) firebaseReady = (async()=>{
  const base='https://www.gstatic.com/firebasejs/11.10.0/';
  const [app, authSDK, fs] = await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js'),import(base+'firebase-firestore.js')]);
  const instance=app.initializeApp(window.ACTIVITY_CONFIG.firebase);
  const auth=authSDK.getAuth(instance);
  await authSDK.setPersistence(auth, authSDK.browserLocalPersistence);
  await auth.authStateReady();
  if(!auth.currentUser) await authSDK.signInAnonymously(auth);
  return {auth,fs,db:fs.getFirestore(instance)};
 })().catch(e=>{firebaseReady=null;throw e});
 const {auth,fs,db}=await firebaseReady;
 const uid=auth.currentUser.uid;
 const owner=localStorage.getItem('subredes-owner-'+payload.session);
 if(owner && owner!==uid) throw Error('A conta deste navegador mudou. Preserve a cópia JSON e solicite ajuda à professora.');
 localStorage.setItem('subredes-owner-'+payload.session,uid);
 const ref=fs.doc(db,'participantes',uid,'envios',payload.id);
 // A fixed document ID makes retries idempotent. Only server acknowledgements count.
 const existing=await fs.getDocFromServer(ref);
 if(existing.exists()) return;
 const encoded=JSON.stringify(payload);
 if(new TextEncoder().encode(encoded).length>200000)throw Error('Registro muito grande. Baixe a cópia e solicite ajuda à professora.');
 await fs.setDoc(ref,{
  uid,session:payload.session,kind:payload.kind,
  nome:String(payload.student.nome||'').slice(0,200),
  turma:String(payload.student.turma||'').slice(0,100),
  payload:encoded,receivedAt:fs.serverTimestamp()
 });
};
