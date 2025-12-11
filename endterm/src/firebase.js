// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-bUYgQnQLYLvfvoLSM58nZ_3J19h7Z3Y",
    authDomain: "starwar-fa9fc.firebaseapp.com",
    projectId: "starwar-fa9fc",
    // storageBucket: "starwar-fa9fc.firebasestorage.app",
    storageBucket: "starwar-fa9fc.appspot.com",
    messagingSenderId: "750076219476",
    appId: "1:750076219476:web:627016b98458b68d721dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized with:", firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firestore db:", db);


