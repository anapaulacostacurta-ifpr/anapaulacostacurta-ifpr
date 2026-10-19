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
window.activityUser=null;
function googleUser(user){return user && !user.isAnonymous && user.providerData.some(p=>p.providerId==='google.com')}
function ready(){
 if(!firebaseReady)firebaseReady=(async()=>{
  const base='https://www.gstatic.com/firebasejs/11.10.0/';
  const [app,authSDK,fs]=await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js'),import(base+'firebase-firestore.js')]);
  const instance=app.initializeApp(window.ACTIVITY_CONFIG.firebase);
  const auth=authSDK.getAuth(instance);
  // Session-only login reduces unintended persistence on shared school computers.
  await authSDK.setPersistence(auth,authSDK.browserSessionPersistence);
  await auth.authStateReady();
  authSDK.onAuthStateChanged(auth,user=>{
   window.activityUser=googleUser(user)?{uid:user.uid,nome:user.displayName||'',email:user.email||''}:null;
   window.dispatchEvent(new Event('activityauth'));
  });
  return {auth,authSDK,fs,db:fs.getFirestore(instance)};
 })().catch(e=>{firebaseReady=null;throw e});
 return firebaseReady;
}
window.prepareGoogle=ready;
window.googleLogin=async()=>{
 const {auth,authSDK}=await ready();
 const provider=new authSDK.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
 return authSDK.signInWithPopup(auth,provider);
};
window.googleLogout=async()=>{const {auth,authSDK}=await ready();await authSDK.signOut(auth)};
window.firebaseSave=async function(payload){
 const {auth,fs,db}=await ready();const user=auth.currentUser;
 if(!googleUser(user))throw Error('Entre com sua conta Google antes de enviar.');
 if(payload.student.uid!==user.uid)throw Error('A conta mudou. Recarregue a página.');
 const ref=fs.doc(db,'participantes',user.uid,'envios',payload.id);
 const existing=await fs.getDocFromServer(ref);if(existing.exists())return;
 const encoded=JSON.stringify(payload);
 if(new TextEncoder().encode(encoded).length>200000)throw Error('Registro muito grande. Preserve a cópia JSON.');
 await fs.setDoc(ref,{uid:user.uid,email:user.email,session:payload.session,kind:payload.kind,
 nome:String(payload.student.nome||user.displayName||'').slice(0,200),turma:String(payload.student.turma||'').slice(0,100),
 payload:encoded,receivedAt:fs.serverTimestamp()});
};
// Exposes initialized SDK to the teacher page; authorization remains in Firestore rules.
window.getTeacherServices=ready;
