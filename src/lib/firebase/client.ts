import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNXQR-um1l_1vo8pgeP6u-FPhiKNvV3rM",
  authDomain: "denami-dcb5d.firebaseapp.com",
  projectId: "denami-dcb5d",
  storageBucket: "denami-dcb5d.firebasestorage.app",
  messagingSenderId: "656174306851",
  appId: "1:656174306851:web:de8418c5fbf38f21644396",
  measurementId: "G-Q0QJ6509H3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
