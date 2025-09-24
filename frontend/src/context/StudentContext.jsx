import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';

export const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  const { user } = useAuth();
  const API_URL = `${process.env.REACT_APP_API_URL.replace(/\/+$/, '')}/api/students`;

  // Get auth headers
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const getAllStudents = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, getAuthConfig());
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setTotalStudents(response.data.totalStudents);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve students.');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (user?.role === 'admin') {
      getAllStudents();
    }
  }, [getAllStudents, user]);

  const addStudent = async (student) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, student, getAuthConfig());
      setStudents((prev) => [...prev, response.data]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, getAuthConfig());
      setStudents((prev) =>
        prev.map((student) => (student._id === id ? response.data : student))
      );
      setError(null);
    } catch (err) {
      console.error('Failed to update student:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to update student.');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      setStudents((prev) => prev.filter((student) => student._id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        totalPages,
        totalStudents,
        getAllStudents,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
