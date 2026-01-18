import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoj261EZnyxeHi_hrHIPTOJou3-WvUEg4",
  authDomain: "smartdepartmentwebsite.firebaseapp.com",
  projectId: "smartdepartmentwebsite",
  storageBucket: "smartdepartmentwebsite.firebasestorage.app",
  messagingSenderId: "699641391986",
  appId: "1:699641391986:web:62b978a444244b6ede0beb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
