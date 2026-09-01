import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARsjW3ScztN3MKcD0LasRCfdnY6Gy-PfQ",
  authDomain: "listacontactos-4b1ef.firebaseapp.com",
  projectId: "listacontactos-4b1ef",
  storageBucket: "listacontactos-4b1ef.firebasestorage.app",
  messagingSenderId: "362059964161",
  appId: "1:362059964161:web:8acb185daf78991a05c500"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);