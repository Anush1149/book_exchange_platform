// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACdSMtBqABNgXvftWGO-hNF2reG0SAGBs",
  authDomain: "book-d7e59.firebaseapp.com",
  projectId: "book-d7e59",
  storageBucket: "book-d7e59.firebasestorage.app",
  messagingSenderId: "833314992715",
  appId: "1:833314992715:web:ee1e70dd8bd2b2f4e413ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();