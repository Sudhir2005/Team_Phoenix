import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1-second delay
      localStorage.setItem('token', 'your_generated_token'); // Example token storage
      navigate('/protected'); // Redirect after successful signup
    } catch (err) {
      setError(err.message || "Signup failed.");
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="signup-label">Email</label>
            <input
              type="email"
              id="email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="signup-label">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password" className="signup-label">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`signup-button ${loading ? 'signup-button-disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <div className="signup-login-link">
            <a href="/login">Already have an account? Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
