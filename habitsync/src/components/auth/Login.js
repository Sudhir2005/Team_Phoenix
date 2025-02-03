import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1-second delay
      localStorage.setItem('token', 'your_generated_token'); // Example token
      if (props.setIsAuthenticated) props.setIsAuthenticated(true);
      navigate('/protected'); // Adjust path as needed
    } catch (err) {
      setError(err.message || 'Login failed.');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`login-button ${loading ? 'login-button-disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="login-signup-link">
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
