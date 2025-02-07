// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQH9_2j6p9KIiMdeMelX5RdZZ3kCMH0M0",
  authDomain: "expense-tracker-4fdff.firebaseapp.com",
  projectId: "expense-tracker-4fdff",
  storageBucket: "expense-tracker-4fdff.firebasestorage.app",
  messagingSenderId: "293200569997",
  appId: "1:293200569997:web:543ed9a44d14ea8515e4c4",
  measurementId: "G-V88KGMGC3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
