import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaGoogle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = ({ isSignup, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("token", "your_generated_token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(isSignup ? "Signup failed. Try again." : "Invalid login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In Coming Soon! 🚀");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <motion.div
        className="card auth-card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "20px" }}
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
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Confirm Password (Signup Only) */}
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`btn w-100 ${isSignup ? "btn-success" : "btn-primary"}`}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
          </motion.button>

          {/* Google Sign-In */}
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

        {/* Toggle Between Login & Signup */}
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
