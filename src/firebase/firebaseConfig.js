// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDSd3k_1p6NDBJkp3wUBMS1Ht-J8g9X2Bs",
    authDomain: "mobile-app-387f4.firebaseapp.com",
    projectId: "mobile-app-387f4",
    storageBucket: "mobile-app-387f4.firebasestorage.app",
    messagingSenderId: "735612131127",
    appId: "1:735612131127:web:c741d9d973dc1df5176cb2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
