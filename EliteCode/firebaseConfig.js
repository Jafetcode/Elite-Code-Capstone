import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCrg8HnqRBqORmaL1GSZqgnxU-_Kmcf3Ac",
  authDomain: "elitecode-733d3.firebaseapp.com",
  projectId: "elitecode-733d3",
  storageBucket: "elitecode-733d3.firebasestorage.app",
  messagingSenderId: "260188248771",
  appId: "1:260188248771:web:e0eeb2493087bb4c3be076",
  measurementId: "G-LKRJY7K7VJ"
};

const FIREBASE_APP = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };
