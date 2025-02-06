import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc // ✅ Fix: Ensure getDoc is imported
} from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// 🔥 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVko019zvPTSymOJPTB34Q5Yg-sHxG2T8",
  authDomain: "habitsync-c53fb.firebaseapp.com",
  projectId: "habitsync-c53fb",
  storageBucket: "habitsync-c53fb.appspot.com",
  messagingSenderId: "1068406146411",
  appId: "1:1068406146411:web:288c57667ed2024648b82e",
  measurementId: "G-2ETPRP7C7S"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export Firebase services
export { 
  db, 
  auth, 
  googleProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  doc, 
  setDoc, 
  getDoc // ✅ Fix: Ensure getDoc is exported
};
