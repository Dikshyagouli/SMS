import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      navigate(role === 'admin' ? '/admin/dashboard' : '/profile');
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
              <h2 className="auth-title">LOGIN</h2>
            </div>
            {error && <div className="auth-alert">{error}</div>}
            <div className="role-toggle">
              <label><input type="radio" name="role" defaultChecked /> Admin</label>
              <label><input type="radio" name="role" /> Student</label>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="auth-label">Username:-</label>
              <input
                type="email"
                className="auth-input"
                placeholder="your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="auth-label">Password:-</label>
              <input
                type="password"
                className="auth-input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="auth-button">login</button>
            </form>
            <div className="aux-links">
              <div>new user? <a href="/register">Sign Up</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;