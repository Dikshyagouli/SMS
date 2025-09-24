import React, { useState, useEffect } from 'react';
import { useStudents } from '../context/StudentContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const StudentList = ({ setCurrentStudent }) => {
  const { students, loading, error, deleteStudent, getAllStudents, totalPages } = useStudents();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents(currentPage);
  }, [currentPage, getAllStudents]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredStudents = students.filter((student) => {
    const nameMatch = (student.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const courseMatch = (student.course || '').toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || courseMatch;
  });

  const handleEdit = (student) => {
    if (setCurrentStudent && typeof setCurrentStudent === 'function') {
      setCurrentStudent(student);
      navigate('/new-student');
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="list-page-container">
      <div className="list-header-wrapper">
        <h2 className="list-title">Student List</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/new-student" className="add-student-btn">
          Add New Student
        </Link>
      </div>
      
      {filteredStudents.length > 0 ? (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-students-message">
          No students found.
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentList;