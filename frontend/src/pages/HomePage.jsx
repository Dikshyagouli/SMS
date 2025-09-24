import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

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
    
    <div className="homepage">
      {currentPage === "home" && (
        <div
          className="hero"
          style={{ backgroundImage: "url('/homebackground.jpg')" }}
        >
          <div className="overlay"></div>

          <div className="hero-content">
            <div className="hero-text">
              <h1>Student Management System</h1>
              <p>
                A Student management system is the way in which an organization manages the interrelated parts of its students in order to achieve its objectives.
              </p>
               <button
          onClick={() => navigate("/about")}
          className="learn-more-btn"
        >
          Learn More
        </button>
            </div>
            <div className="auth-card">
              <div className="auth-card-header">
                <h2 className="auth-title">LOGIN</h2>
              </div>

              {error && <div className="auth-alert">{error}</div>}

              <div className="role-toggle">
                <label>
                  <input type="radio" name="role" defaultChecked /> Admin
                </label>
                <label>
                  <input type="radio" name="role" /> Student
                </label>
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

                <button type="submit" className="auth-button">
                  Login
                </button>
              </form>

              <div className="aux-links">
                <div>
                  New user? <a href="/register">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "about" && (
        <div className="about-page">
          <h1>About Us</h1>
          <p>
            This is a simple About Us page demonstrating navigation without a
            routing library. You can add more detailed information here about
            your school system.
          </p>
          <button onClick={() => setCurrentPage("home")}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
