import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initial, validateContent, type Content } from './content';

export const firebaseConfig = {
  apiKey: 'AIzaSyBDkxG769Yklin4XkbKcTTQ9D6S1FqZ6qE',
  authDomain: 'zzzzzzzz-666ac.firebaseapp.com',
  databaseURL: 'https://zzzzzzzz-666ac-default-rtdb.firebaseio.com',
  projectId: 'zzzzzzzz-666ac',
  storageBucket: 'zzzzzzzz-666ac.firebasestorage.app',
  messagingSenderId: '338670424058',
  appId: '1:338670424058:web:fbf2fa743994e047529e43',
  measurementId: 'G-JEKT60W68G',
};

export function getFirebase() {
  const app = getApps().find(a=>a.name==='hanna-zzzzzzzz-666ac') ?? initializeApp(firebaseConfig, 'hanna-zzzzzzzz-666ac');
  return { auth: getAuth(app) };
}

async function databaseRequest(method:'GET'|'PUT',payload?:unknown):Promise<unknown> {
  const url=new URL(firebaseConfig.databaseURL+'/sites/hanna.json');
  if(method==='PUT'){
    const current=getFirebase().auth.currentUser;
    if(!current)throw new Error('Inicia sesión con Google para guardar tus cambios.');
    url.searchParams.set('auth',await current.getIdToken(true));
  }
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  try{
    const response=await fetch(url.toString(),{method,cache:'no-store',headers:{'Content-Type':'application/json'},body:payload===undefined?undefined:JSON.stringify(payload),signal:controller.signal});
    const body=await response.json() as {error?:string}|null;
    if(!response.ok){const error=new Error(response.status===401||response.status===403?'Firebase rechazó el guardado. Comprueba que entraste con vasquezpalparoy@gmail.com.':(body?.error||'No se pudo conectar con Realtime Database.'));Object.assign(error,{code:response.status===401||response.status===403?'permission-denied':'unavailable'});throw error;}
    return body;
  }catch(e){if((e as {name?:string})?.name==='AbortError'){throw new Error(method==='PUT'?'Firebase no confirmó el guardado a tiempo. Tus cambios siguen en el editor; comprueba la conexión antes de reintentar.':'Firebase no respondió. Revisa tu conexión y pulsa Ver estado de conexión con Firebase.');}throw e;}
  finally{clearTimeout(timeout)}
}

export async function readFirebaseContent(): Promise<Content | null> {
  const value=await databaseRequest('GET') as {content?:unknown}|null;
  if(value===null)return null;
  if(!value||typeof value.content!=='object')throw new Error('El contenido guardado en /sites/hanna no tiene el formato esperado.');
  return validateContent({...initial,...value.content});
}

export async function saveFirebaseContent(value:Content) {
  const {auth}=getFirebase();
  await auth.authStateReady();
  if(!auth.currentUser)throw new Error('Inicia sesión con Google para guardar tus cambios.');
  if(auth.currentUser.email?.toLowerCase()!=='vasquezpalparoy@gmail.com'||!auth.currentUser.emailVerified)throw new Error('Para guardar, entra con la cuenta de Google verificada vasquezpalparoy@gmail.com.');
  const content=validateContent(value);
  await databaseRequest('PUT',{
    schemaVersion:1,
    content,
    updatedBy:auth.currentUser.uid,
    updatedAt:{'.sv':'timestamp'},
  });
}

export async function signInToFirebase(){
  const provider=new GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  return signInWithPopup(getFirebase().auth,provider);
}
export async function signOutOfFirebase(){return signOut(getFirebase().auth)}

export function firebaseMessage(error:unknown) {
  const code=(error as {code?:string})?.code;
  if(code==='permission-denied')return 'Firebase no permitió guardar. Entra con vasquezpalparoy@gmail.com y vuelve a intentarlo. Tus cambios siguen en el editor.';
  if(code==='auth/unauthorized-domain')return 'Añade hanna.grafiplotvasquez.com a los dominios autorizados de Firebase Authentication en el proyecto zzzzzzzz-666ac.';
  if(code==='auth/operation-not-allowed')return 'Activa el proveedor Google en Firebase Authentication → Métodos de acceso del proyecto zzzzzzzz-666ac.';
  if(code==='auth/popup-blocked')return 'El navegador bloqueó la ventana de Google. Permite ventanas emergentes y vuelve a intentarlo.';
  if(code==='auth/popup-closed-by-user'||code==='auth/cancelled-popup-request')return 'Inicio de sesión cancelado. Puedes volver a intentarlo.';
  if(code==='unavailable'||code==='auth/network-request-failed')return 'No se pudo conectar con Firebase. Revisa tu conexión y vuelve a intentarlo.';
  return error instanceof Error ? error.message : 'No se pudo completar la operación. Vuelve a intentarlo.';
}
