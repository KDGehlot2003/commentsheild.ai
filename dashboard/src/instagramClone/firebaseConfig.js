import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCmgx8Gp1NHeFx2of6hvpeKM-uXnI-JmuA",
    authDomain: "insta-clone-88bb6.firebaseapp.com",
    projectId: "insta-clone-88bb6",
    storageBucket: "insta-clone-88bb6.appspot.com",
    messagingSenderId: "892918922073",
    appId: "1:892918922073:web:fa1acef39e9c6861326a48",
    measurementId: "G-XQTCRW9SDT"
  };

  const instagramCloneApp = !getApps().some(app => app.name === 'insta-clone')
  ? initializeApp(firebaseConfig, 'insta-clone')
  : getApp('insta-clone');

const instagramCloneAuth = getAuth(instagramCloneApp);
const instagramCloneDb = getFirestore(instagramCloneApp);

export { instagramCloneAuth, instagramCloneDb };