import React from 'react';
import { FaCheckCircle, FaRocket, FaWheelchair, FaChartLine } from "react-icons/fa";

const GoalsPage = () => {
  const goals = [
    { 
      title: "Goal 1: Improve Data Accuracy", 
      description: "Implement real-time data validation and error checking to ensure all student records are complete and correct.", 
      icon: <FaCheckCircle className="text-green-500 text-2xl" /> 
    },
    { 
      title: "Goal 2: Enhance User Experience", 
      description: "Redesign key user interfaces to be more intuitive and responsive, reducing the time required for administrative tasks.", 
      icon: <FaRocket className="text-blue-500 text-2xl" /> 
    },
    { 
      title: "Goal 3: Increase Accessibility", 
      description: "Ensure the platform is fully accessible to users with disabilities by following WCAG 2.1 guidelines.", 
      icon: <FaWheelchair className="text-purple-500 text-2xl" /> 
    },
    { 
      title: "Goal 4: Expand Reporting", 
      description: "Develop new analytics and reporting tools to provide deeper insights into student performance and trends.", 
      icon: <FaChartLine className="text-red-500 text-2xl" /> 
    },
  ];

  return (
    <div className="goals-page-container">
      <h1 className="goals-title">Our Key Goals & Objectives</h1>
      <p className="goals-intro">
        Our roadmap is driven by a commitment to continuous improvement. Here are the core objectives we are focused on achieving.
      </p>

      <div className="goals-grid">
        {goals.map((goal, index) => (
          <div key={index} className="goal-card">
            <div className="goal-icon">{goal.icon}</div>
            <h2 className="goal-title-card">{goal.title}</h2>
            <p className="goal-description">{goal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
