// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtvd2fDtNxZ7XerI-NIB61YD52A96KiIw",
  authDomain: "journalapp-c722f.firebaseapp.com",
  projectId: "journalapp-c722f",
  storageBucket: "journalapp-c722f.appspot.com",
  messagingSenderId: "295991498369",
  appId: "1:295991498369:web:91f68e3f0a93c9ec911f80"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth( firebaseApp );
const firebaseDB = getFirestore( firebaseApp );

firebaseAuth.languageCode = 'es';

export { firebaseApp, firebaseAuth, firebaseDB }