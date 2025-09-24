import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <h1 className="about-title">About the Student Management System</h1>
      <p className="about-intro">
        Our platform is designed to streamline academic administration and enhance the learning experience for students and staff alike. We're committed to creating an intuitive and powerful tool.
      </p>
      
      <div className="about-content">
        <div className="mission-vision-section">
          <div className="mission-card">
            <h2 className="section-title">Our Mission</h2>
            <p>To provide an efficient and easy-to-use digital solution that helps educational institutions manage student data with precision and care, freeing up valuable time for teaching and mentorship.</p>
          </div>
          <div className="vision-card">
            <h2 className="section-title">Our Vision</h2>
            <p>To be the leading platform for academic management, continually evolving to meet the needs of a dynamic educational landscape and supporting the success of every student.</p>
          </div>
        </div>
        
        <div className="our-story-section">
          <div className="story-image-container">
            <img 
              src="/about.jpg" 
              alt="Our Story" 
              className="story-image"
            />
          </div>
          <div className="story-text">
            <h2 className="section-title">Our Story</h2>
            <p>This journey began with a clear vision: simplifying the way schools and colleges handle their daily operations. We noticed that managing attendance, fees, examinations, and other student-related tasks often became scattered across different systems, making it difficult for educators and administrators to stay organized.</p>
            <p>With this challenge in mind, we developed Student Management Software a single, integrated platform designed to bring everything together. From attendance tracking to library and hostel management, each feature was built to reduce workload, improve accuracy, and foster better communication.</p>
            <p>Every module whether it’s transport management, homework assignments, or ID card generation was designed to be intuitive and practical, ensuring schools can focus less on paperwork and more on nurturing students.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
