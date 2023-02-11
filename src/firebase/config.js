// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqjDBUfjFByBuKvMKxW15u3wXYsjdJ8pA",
  authDomain: "react-curso-dcebb.firebaseapp.com",
  projectId: "react-curso-dcebb",
  storageBucket: "react-curso-dcebb.appspot.com",
  messagingSenderId: "729288528521",
  appId: "1:729288528521:web:ab627d8a88356d4d45ec58"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
