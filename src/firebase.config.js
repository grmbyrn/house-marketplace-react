import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrgHWeXcLBI2NM8C5fEgpB97bJwl1hl4Q",
  authDomain: "house-marketplace-app-e7ea4.firebaseapp.com",
  projectId: "house-marketplace-app-e7ea4",
  storageBucket: "house-marketplace-app-e7ea4.appspot.com",
  messagingSenderId: "764003349698",
  appId: "1:764003349698:web:73895af793cfa8ab06b75b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()