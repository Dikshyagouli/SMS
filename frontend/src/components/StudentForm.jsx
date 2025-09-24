import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext.jsx';
import ImageUpload from './ImageUpload.jsx';

const StudentForm = ({ currentStudent, setCurrentStudent }) => {
  const { addStudent, updateStudent } = useStudents();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({ name: '', email: '', age: '', course: '' ,profilePicture:''});
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleImageUploadSuccess = (imageUrl) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      profilePicture: imageUrl,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (currentStudent) {
    const { _id, createdAt, updatedAt, __v, ...updatedStudentData } = student;
    updateStudent(_id, updatedStudentData); 
  } else {
    addStudent(student);
  }
  setStudent({ name: '', email: '', age: '', course: '', profilePicture: '' });
  setCurrentStudent(null);
  navigate('/student-details');
};

  return (
    <div className="form-page-container">
      <div className="form-content-wrapper">
        <div className="form-card">
          <h5 className="form-header">
            {currentStudent ? 'Update Student' : 'Add New Student'}
          </h5>
          <form onSubmit={handleSubmit} className="student-form">
            <ImageUpload 
              onUploadSuccess={handleImageUploadSuccess} 
              initialImageUrl={student.profilePicture}
            />
            <div className="form-input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                className="form-input"
                name="age"
                value={student.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                type="text"
                className="form-input"
                name="course"
                value={student.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="form-button primary">
                {currentStudent ? 'Update' : 'Add'}
              </button>
              <Link to="/student-details" className="form-button secondary">
                Back to List
              </Link>
            </div>
          </form>
        </div>
        <div className="form-image-wrapper">
          <img
            src="/form.png"
            alt="Student studying illustration"
            className="student-image"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentForm;