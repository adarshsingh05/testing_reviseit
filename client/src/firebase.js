// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZHF_91cmim4Jz_0UZgOAsgvOheoQTUes",
  authDomain: "reviseit-51dc7.firebaseapp.com",
  projectId: "reviseit-51dc7",
  storageBucket: "reviseit-51dc7.firebasestorage.app",
  messagingSenderId: "303446625021",
  appId: "1:303446625021:web:b2f1ddbe16efb276978c94",
  measurementId: "G-Y14Z05X3W0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);