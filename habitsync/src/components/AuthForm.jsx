import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
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
import "./AuthForm.css"; // Add a separate CSS file for styles

const AuthForm = ({ isSignup, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Signup/Login
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
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
        });
  
        console.log("✅ User registered:", user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in:", userCredential.user);
      }
  
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      setIsAuthenticated(true);
  
      console.log("🔄 Redirecting to dashboard...");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("🔥 Error:", err);
  
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please check your email.");
      } else {
        setError(isSignup ? "Signup failed. Try again." : "Invalid login.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        profilePic: user.photoURL,
        createdAt: new Date().toISOString(),
      }, { merge: true });

      console.log("✅ Google Sign-In Success:", user);

      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("🔥 Google Sign-In Error:", error);
      setError("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-center ${isSignup ? "text-success" : "text-primary"}`}>
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <p className="text-center text-muted">
          {isSignup ? "Create your account 🎉" : "Welcome back! 😊"}
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaEnvelope color="#2E8B57" />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaLock color="#2E8B57" />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light">
                <FaLock color="#2E8B57" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <motion.button
            type="submit"
            className={`btn w-100 ${isSignup ? "btn-success" : "btn-primary"}`}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-outline-dark w-100 mt-3 d-flex align-items-center justify-content-center"
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGoogle className="me-2" /> Sign in with Google
          </motion.button>
        </form>

        <p className="text-center mt-3">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <Link to={isSignup ? "/login" : "/signup"} className="fw-bold text-decoration-none ms-1">
            {isSignup ? "Login here" : "Sign up here"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
