// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrg8HnqRBqORmaL1GSZqgnxU-_Kmcf3Ac",
  authDomain: "elitecode-733d3.firebaseapp.com",
  projectId: "elitecode-733d3",
  storageBucket: "elitecode-733d3.firebasestorage.app",
  messagingSenderId: "260188248771",
  appId: "1:260188248771:web:e0eeb2493087bb4c3be076",
  measurementId: "G-LKRJY7K7VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);