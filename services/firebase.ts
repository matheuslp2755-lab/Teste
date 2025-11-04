import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWe0t5ZB0bIJeRQ0n9FdqJx5tjs2ZThjU", // This key is from the user's provided code
  authDomain: "mp-social2.firebaseapp.com",
  projectId: "mp-social2",
  storageBucket: "mp-social2.firebasestorage.app", // Reverted to original value
  messagingSenderId: "915646701847",
  appId: "1:915646701847:web:6d9d8851f4a4811abe1752"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };