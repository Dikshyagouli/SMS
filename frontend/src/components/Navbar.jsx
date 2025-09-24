import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user && user.role === 'admin';

  return (
    <nav className="navbar-pill-container">
      <ul className="navbar-pill-links">
        {!isAdmin && (
          <li>
            <Link to="/home" className={`nav-pill-link ${location.pathname === '/home' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
        )}
        {isAdmin && (
          <>
            <li>
              <Link to="/new-student" className={`nav-pill-link ${location.pathname === '/new-student' ? 'active' : ''}`}>
                Add Student
              </Link>
            </li>
            <li>
              <Link to="/student-details" className={`nav-pill-link ${location.pathname === '/student-details' ? 'active' : ''}`}>
                Student Details
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className={`nav-pill-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                Dashboard
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/goals" className={`nav-pill-link ${location.pathname === '/goals' ? 'active' : ''}`}>
            Goals & Objectives
          </Link>
        </li>
        <li>
          <Link to="/about" className={`nav-pill-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About Us
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile" className={`nav-pill-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                <img src="/homeSide.png" alt="Profile" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              </Link>
            </li>
            <li>
              <button onClick={logout} className="nav-pill-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className={`nav-pill-link ${location.pathname === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;