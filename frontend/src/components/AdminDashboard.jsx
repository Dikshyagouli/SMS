import React, { useEffect, useMemo } from 'react';
import { useStudents } from '../context/StudentContext.jsx';

const AdminDashboard = () => {
  const { students, totalStudents, loading, error, getAllStudents } = useStudents();

  useEffect(() => {
    getAllStudents(1, 50);
  }, [getAllStudents]);

  const stats = useMemo(() => ({ total: totalStudents || students.length }), [totalStudents, students]);

  return (
    <div className="admin-dashboard">
      <div className="dash-header">
        <div>
          <h2 className="dash-title">Admin Dashboard</h2>
          <p className="dash-subtitle">Overview of students and recent activity</p>
        </div>
        <div className="dash-actions">
          <button className="dash-refresh" onClick={() => getAllStudents(1, 50)}>Refresh</button>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card gradient-1">
          <div className="metric">{stats.total}</div>
          <div className="label">Total Students</div>
        </div>
        <div className="dashboard-card gradient-2">
          <div className="metric">{students.filter(s => s.age >= 18).length}</div>
          <div className="label">18+ Students</div>
        </div>
        <div className="dashboard-card gradient-3">
          <div className="metric">{new Set(students.map(s => s.course)).size}</div>
          <div className="label">Courses</div>
        </div>
      </div>

      <div className="dashboard-table-wrap">
        <h3 className="section-title">Students</h3>
        {loading && <div>Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <div className="table-container fancy-table">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.age}</td>
                    <td>{s.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


