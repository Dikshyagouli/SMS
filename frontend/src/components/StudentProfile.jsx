import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/students/me/profile"
        );
        setProfile(res.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          setError(
            "No profile found. Please contact admin to create your student record."
          );
        } else if (err?.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const API_BASE = "http://localhost:5000";

  const initials = useMemo(() => {
    if (!profile?.name) return "";
    return profile.name
      .split(" ")
      .map((p) => p.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }, [profile]);

  const resolveUrl = (url) => {
    if (!url) return null;
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("data:")
    )
      return url;
    return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const avatarSrc = resolveUrl(profile?.profilePicture);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div className="profile-empty">No profile found.</div>;

  return (
    <div className="profile-card">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {avatarSrc ? (
            <img src={avatarSrc} alt={profile.name} />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="profile-identity">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>
      </div>

      {/* Content */}
      <div className="profile-content">
        <div className="profile-section">
          <h3 className="profile-section-title">Details</h3>
          <div className="profile-grid">
            <div className="profile-field">
              <label>Age</label>
              <div className="value">{profile.age}</div>
            </div>
            <div className="profile-field">
              <label>Course</label>
              <div className="value">{profile.course}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
