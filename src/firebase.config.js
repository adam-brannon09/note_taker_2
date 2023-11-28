// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzluD7T_nYUGvWoUokrsWkurYAaQfptGs",
    authDomain: "notes-8ed18.firebaseapp.com",
    projectId: "notes-8ed18",
    storageBucket: "notes-8ed18.appspot.com",
    messagingSenderId: "424687718886",
    appId: "1:424687718886:web:c9a2a96f71b18369750627"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);