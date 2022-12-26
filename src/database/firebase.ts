// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhf27cuN0kINgRO7Afql29Qzpd4Z5FS2s",
  authDomain: "fb-disney.firebaseapp.com",
  projectId: "fb-disney",
  storageBucket: "fb-disney.appspot.com",
  messagingSenderId: "1060913778756",
  appId: "1:1060913778756:web:629a70b2c48fc0e3afec11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth();

export {app, provider, auth}