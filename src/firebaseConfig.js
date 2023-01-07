import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDThK6lSl-nGcenmPmDcSkqt_WE7ww9A7s",
  authDomain: "vue-3-vite-app.firebaseapp.com",
  projectId: "vue-3-vite-app",
  storageBucket: "vue-3-vite-app.appspot.com",
  messagingSenderId: "142334175267",
  appId: "1:142334175267:web:6cb7d61c46e8b2c9e76996",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const db = getFirestore();
export { auth, db };
