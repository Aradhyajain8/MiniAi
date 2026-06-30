// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI8hsa_aQjxmJSIaqMVoAGpCpnCY0o_IY",
  authDomain: "geminiclone-f04cc.firebaseapp.com",
  projectId: "geminiclone-f04cc",
  storageBucket: "geminiclone-f04cc.firebasestorage.app",
  messagingSenderId: "578454641897",
  appId: "1:578454641897:web:2c88db30cd090a0f3c2478",
  measurementId: "G-51926X489J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);