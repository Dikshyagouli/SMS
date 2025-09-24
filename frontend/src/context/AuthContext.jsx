import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
 import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuth = () => {
 return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const storedToken = localStorage.getItem('token');
 if (storedToken) {
 try {
 const decoded = jwtDecode(storedToken); 
 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
 setUser({ role: decoded.role, email: decoded?.email || null, name: decoded?.name || null });
 } catch (err) {
 localStorage.removeItem('token');
 }
 }
 setLoading(false);
 }, []);

 const login = async (email, password) => {
 try {
 const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
 const { token } = res.data;
 localStorage.setItem('token', token);
 const decoded = jwtDecode(token);
 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 setUser({ role: decoded.role, email: decoded?.email || null, name: decoded?.name || null });
 return decoded.role;
 } catch (error) {
 throw new Error(error.response.data.message || 'Login failed');
 }
 };

 const logout = () => {
 localStorage.removeItem('token');
 setUser(null);
 };

 const register = async (userData) => {
 try {
 await axios.post('http://localhost:5000/api/auth/register', userData);
 } catch (error) {
 throw new Error(error.response.data.message || 'Registration failed');
 }
 };

 const value = {
 user,
 login,
 logout,
 register,
 loading,
 };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};