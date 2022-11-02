// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "conference-room-reservat-c23d2.firebaseapp.com",
  projectId: "conference-room-reservat-c23d2",
  storageBucket: "conference-room-reservat-c23d2.appspot.com",
  messagingSenderId: "304907757143",
  appId: "1:304907757143:web:e2fb9ffeb055d8a9372512"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()