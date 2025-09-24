import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext.jsx';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentList from './components/StudentList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoalsPage from './pages/GoalsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import './App.css';
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import StudentProfile from './components/StudentProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const AppContent = () => {
  const location = useLocation();
  const [currentStudent, setCurrentStudent] = useState(null); 

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}

      <StudentProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<PrivateRoute />}>
          <Route
            path="/new-student"
            element={
              <div className="container mt-4">
                <StudentForm 
                  currentStudent={currentStudent} 
                  setCurrentStudent={setCurrentStudent} 
                />
              </div>
            }
          />
          
          <Route
            path="/student-details"
            element={
              <div className="container mt-4">
                <StudentList setCurrentStudent={setCurrentStudent} />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="container mt-4">
                <StudentProfile />
              </div>
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        </Routes>
      </StudentProvider>
      {location.pathname !== '/login' && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
