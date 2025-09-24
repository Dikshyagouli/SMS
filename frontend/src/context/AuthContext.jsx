import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // fixed import

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL.replace(/\/+$/, '');

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser({ role: decoded.role, email: decoded?.email, name: decoded?.name });
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ role: decoded.role, email: decoded?.email, name: decoded?.name });
      return decoded.role;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, userData);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
