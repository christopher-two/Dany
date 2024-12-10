import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCGhok9gjK32Kxh1cOvzyRDKakYo_18X94",
    authDomain: "dany-66632.firebaseapp.com",
    projectId: "dany-66632",
    storageBucket: "dany-66632.appspot.com",
    messagingSenderId: "690594176497",
    appId: "1:690594176497:web:bc1eb46c196ba8ff48f850",
    measurementId: "G-EZG99KE5LJ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { database };
export { storage };
export { db };