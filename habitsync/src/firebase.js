import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile,
  signOut
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

// ✅ Function to save user details in Firestore
const saveUserData = async (user) => {
  if (!user) return;
  
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName || "User",
      email: user.email,
      profilePic: user.photoURL || "https://i.imgur.com/I80W1Q0.png",
      createdAt: new Date(),
    });
  }
};

// ✅ Sign up function
const signUpWithEmail = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });

  await saveUserData(userCredential.user);
};

// ✅ Google sign-in function
const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await saveUserData(result.user);
};

// ✅ Logout function
const logout = async () => {
  await signOut(auth);
};

// ✅ Export Firebase services
export { 
  db, 
  auth, 
  googleProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signUpWithEmail,
  signInWithGoogle,
  logout,
  doc, 
  setDoc, 
  getDoc 
};
