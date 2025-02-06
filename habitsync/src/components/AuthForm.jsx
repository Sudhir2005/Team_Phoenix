import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaUser, FaCalendar, FaBirthdayCake } from "react-icons/fa";
import { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider, 
  doc, 
  setDoc 
} from "../firebase"; // Firebase imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthForm.css"; // Updated styles

const AuthForm = ({ isSignup, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle Signup/Login with Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    try {
      let userCredential;
  
      if (isSignup) {
        try {
          // 🔹 Check if email is already in use
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
  
          // 🔹 Store user details in Firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            name,
            age,
            dob,
            createdAt: new Date().toISOString(),
          });
  
          console.log("✅ User registered:", user);
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            setError("This email is already registered. Please log in.");
          } else if (error.code === "auth/invalid-email") {
            setError("Invalid email format. Please check and try again.");
          } else if (error.code === "auth/weak-password") {
            setError("Password is too weak. Please use a stronger password.");
          } else {
            setError("Signup failed. Try again.");
          }
          throw error; // Stop execution if there's an error
        }
      } else {
        // 🔹 Attempt login for existing user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in:", userCredential.user);
      }
  
      // 🔹 Store auth token & navigate to dashboard
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
  
    } catch (err) {
      console.error("🔥 Error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        age: "",
        dob: "",
        createdAt: new Date().toISOString(),
      }, { merge: true });

      console.log("✅ Google Sign-In Successful:", user);
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("🔥 Google Sign-In Error:", error);
      setError("Google Sign-In failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* 🎆 Floating Particles for Animation */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} style={{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}
      </div>

      <motion.div className="auth-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className={`text-center ${isSignup ? "text-success" : "text-primary"}`}>{isSignup ? "Sign Up" : "Login"}</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="mb-3 input-group">
                <span className="input-group-text"><FaUser /></span>
                <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text"><FaCalendar /></span>
                <input type="number" className="form-control" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text"><FaBirthdayCake /></span>
                <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} required />
              </div>
            </>
          )}

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {isSignup && (
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          <button type="submit" className="btn w-100 btn-primary">{loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}</button>

          <button type="button" className="btn w-100 btn-danger mt-3" onClick={handleGoogleSignIn} disabled={loading}>
            <FaGoogle /> Sign in with Google
          </button>

          {/* ✅ Sign Up Link in Login Page */}
          {!isSignup && (
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup" className="text-success fw-bold">Sign Up</Link>
            </p>
          )}

          {/* ✅ Login Link in Signup Page */}
          {isSignup && (
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link>
            </p>
          )}

        </form>
      </motion.div>
    </div>
  );
};

export default AuthForm;
