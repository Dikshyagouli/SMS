import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess, initialImageUrl }) => {
  const [image, setImage] = useState(initialImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('profilePicture', file); 
    try {
      const response = await axios.post('http://localhost:5000/api/upload/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl;
      setImage(imageUrl);
      onUploadSuccess(imageUrl); 
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      {image ? (
        <div className="profile-picture-preview">
          <img src={image} alt="Profile" className="profile-image" /> 
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="change-photo-label">
            Change Photo
          </label>
        </div>
      ) : (
        <div className="image-placeholder">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-photo-label">
            {loading ? 'Uploading...' : 'Upload Profile Picture'}
          </label>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ImageUpload;