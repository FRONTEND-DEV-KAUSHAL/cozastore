// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi10pFn_TI3NWx15mv0vdC7Vo4s65tZxk",
  authDomain: "cozastore-73789.firebaseapp.com",
  projectId: "cozastore-73789",
  storageBucket: "cozastore-73789.appspot.com",
  messagingSenderId: "911237714950",
  appId: "1:911237714950:web:cafe95e6fe7c103cdd5f87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);