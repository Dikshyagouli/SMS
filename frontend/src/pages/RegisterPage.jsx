import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-legacy-wrap">
        <div className="auth-legacy">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-title">REGISTER</h2>
            </div>
            {error && <div className="auth-alert">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="auth-label">Full name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="auth-label">Username (Email)</label>
              <input
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="auth-label">Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <div className="aux-links">
              <div>Already have an account? <a href="/">Sign in</a></div>
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;