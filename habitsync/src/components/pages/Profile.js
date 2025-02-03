import React, { useState } from 'react';
import './Profile.css'; // Add your custom styles

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = { // Replace with actual user data
    name: 'John Doe',
    email: 'john.doe@example.com',
    level: 10,
    badges: ['Streak Master', 'Early Bird'],
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg', // Placeholder avatar image
  };

  // Toggle editing state (could trigger a modal for real editing)
  const toggleEdit = () => setIsEditing((prevState) => !prevState);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-header">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-name">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-info">
        <p><strong>Level:</strong> {user.level}</p>
      </div>

      <div className="profile-badges">
        <h3>Badges</h3>
        <div className="badge-list">
          {user.badges.map((badge, index) => (
            <div key={index} className="badge">
              <img
                src={`https://www.example.com/badge-icons/${badge.toLowerCase().replace(' ', '-')}.png`} // Placeholder for badge icon
                alt={badge}
                className="badge-icon"
              />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={toggleEdit} className="edit-button">
        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
      </button>

      {isEditing && (
        <div className="edit-profile-form">
          <p>Here you would add a form or a modal for editing user details.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
