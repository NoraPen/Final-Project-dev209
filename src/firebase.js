// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-m-cT8wan3vd6dd_OpX7Q9FbNFdptkO8",
  authDomain: "minicloset-7b457.firebaseapp.com",
  projectId: "minicloset-7b457",
  storageBucket: "minicloset-7b457.firebasestorage.app",
  messagingSenderId: "778991947958",
  appId: "1:778991947958:web:6785dbe0376910663b1617",
  measurementId: "G-047W3YVXPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);