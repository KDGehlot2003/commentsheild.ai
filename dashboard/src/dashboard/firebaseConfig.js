import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAZkkIfB8knSDX1SZadmQ3M9DOUuC9ZGlE",
    authDomain: "test-7fa2a.firebaseapp.com",
    projectId: "test-7fa2a",
    storageBucket: "test-7fa2a.appspot.com",
    messagingSenderId: "769491321894",
    appId: "1:769491321894:web:95af5f1f132a71122fd2e7",
    measurementId: "G-3VQJMYMF27"
  };

  
  const dashboardApp = !getApps().some(app => app.name === 'test')
  ? initializeApp(firebaseConfig, 'test')
  : getApp('test');

const dashboardAuth = getAuth(dashboardApp);
const dashboardDb = getFirestore(dashboardApp);

export { dashboardAuth, dashboardDb };