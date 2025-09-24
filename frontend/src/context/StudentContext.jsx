import React, { createContext, useState, useEffect, useContext ,useCallback} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';
export const StudentContext = createContext();

export const useStudents = () => {
  return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const { user } = useAuth();

  const API_URL = 'http://localhost:5000/api/students';

  const getAllStudents = useCallback ( async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setTotalStudents(response.data.totalStudents);
      setError(null);
    } catch (err) {
      setError('Failed to retrieve students.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      getAllStudents();
    }
  }, [getAllStudents, user]);

  const addStudent = async (student) => {
    try {
      const response = await axios.post(API_URL, student);
      setStudents([...students, response.data]);
    } catch (err) {
      setError('Failed to add student.');
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? response.data : student
        )
      );
      setError(null);
    } catch (err) {
      console.error('Failed to update student:', err.response.data);
      setError(err.response.data.message || 'Failed to update student.');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete student.');
    }
  };

  const value = {
    students,
    loading,
    error,
    totalPages,
    totalStudents,
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};