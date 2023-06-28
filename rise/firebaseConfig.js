import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw2Oq4bhwfc7P5K4QqixegdkW4xsEPKOU",
  authDomain: "rise-d1a89.firebaseapp.com",
  projectId: "rise-d1a89",
  storageBucket: "rise-d1a89.appspot.com",
  messagingSenderId: "821789523449",
  appId: "1:821789523449:web:e83b08a061b263ac8f9128",
  measurementId: "G-6LWWE63LBV"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);