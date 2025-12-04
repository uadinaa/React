import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQEhe_2kJeCkE5T3cbXehG1XmhoDGYAmg",
    authDomain: "routing-cdfaf.firebaseapp.com",
    projectId: "routing-cdfaf",
    storageBucket: "routing-cdfaf.firebaseapp.com",
    // storageBucket: "routing-cdfaf.appspot.com",
    messagingSenderId: "1002624693462",
    appId: "1:1002624693462:web:4108d8764130e5b0e80577",
    measurementId: "G-ESYG7JGY7R"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized with:", firebaseConfig);


export const auth = getAuth(app);

