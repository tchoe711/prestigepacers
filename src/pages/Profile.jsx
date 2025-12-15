import { useState } from 'react'
import './Profile.css'

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    bio: '',
    email: '',
    location: '',
  })

  const [achievements, setAchievements] = useState([])
  const [showAddAchievement, setShowAddAchievement] = useState(false)
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    date: '',
    verificationLink: '',
    verificationStatus: 'pending', // pending, verified, rejected
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAchievementChange = (e) => {
    setNewAchievement({
      ...newAchievement,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setAchievements([
        ...achievements,
        {
          ...newAchievement,
          id: Date.now(),
        },
      ])
      setNewAchievement({
        title: '',
        description: '',
        date: '',
        verificationLink: '',
        verificationStatus: 'pending',
      })
      setShowAddAchievement(false)
    }
  }

  const handleRemoveAchievement = (id) => {
    setAchievements(achievements.filter((ach) => ach.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to a backend
    alert('Profile saved successfully!')
  }

  const getVerificationBadgeClass = (status) => {
    switch (status) {
      case 'verified':
        return 'badge-verified'
      case 'rejected':
        return 'badge-rejected'
      default:
        return 'badge-pending'
    }
  }

  const getVerificationBadgeText = (status) => {
    switch (status) {
      case 'verified':
        return '✓ Verified'
      case 'rejected':
        return '✗ Rejected'
      default:
        return '⏳ Pending'
    }
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Edit Your Profile</h1>
        <p className="profile-subtitle">
          Update your information and showcase your professional achievements
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Basic Information</h2>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>About</h2>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="6"
              />
            </div>
          </div>

          {/* Achievements Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Achievements</h2>
              <button
                type="button"
                className="add-achievement-button"
                onClick={() => setShowAddAchievement(!showAddAchievement)}
              >
                {showAddAchievement ? 'Cancel' : '+ Add Achievement'}
              </button>
            </div>

            {showAddAchievement && (
              <div className="add-achievement-form">
                <div className="form-group">
                  <label htmlFor="achievement-title">Achievement Title *</label>
                  <input
                    type="text"
                    id="achievement-title"
                    name="title"
                    value={newAchievement.title}
                    onChange={handleAchievementChange}
                    placeholder="e.g., Best Employee of the Year"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="achievement-description">Description *</label>
                  <textarea
                    id="achievement-description"
                    name="description"
                    value={newAchievement.description}
                    onChange={handleAchievementChange}
                    placeholder="Describe your achievement..."
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="achievement-date">Date</label>
                  <input
                    type="date"
                    id="achievement-date"
                    name="date"
                    value={newAchievement.date}
                    onChange={handleAchievementChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="achievement-link">Verification Link/Proof</label>
                  <input
                    type="url"
                    id="achievement-link"
                    name="verificationLink"
                    value={newAchievement.verificationLink}
                    onChange={handleAchievementChange}
                    placeholder="https://example.com/certificate or link to proof"
                  />
                  <small className="form-hint">
                    Provide a link to certificate, award, or other proof of this achievement
                  </small>
                </div>

                <button
                  type="button"
                  className="save-achievement-button"
                  onClick={handleAddAchievement}
                >
                  Add Achievement
                </button>
              </div>
            )}

            {achievements.length === 0 && !showAddAchievement && (
              <div className="empty-state">
                <p>No achievements added yet. Click "Add Achievement" to get started.</p>
              </div>
            )}

            <div className="achievements-list">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-header">
                    <div className="achievement-title-row">
                      <h3>{achievement.title}</h3>
                      <span className={`verification-badge ${getVerificationBadgeClass(achievement.verificationStatus)}`}>
                        {getVerificationBadgeText(achievement.verificationStatus)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="remove-achievement-button"
                      onClick={() => handleRemoveAchievement(achievement.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                  {achievement.date && (
                    <p className="achievement-date">Date: {new Date(achievement.date).toLocaleDateString()}</p>
                  )}
                  {achievement.verificationLink && (
                    <a
                      href={achievement.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="verification-link"
                    >
                      View Verification Proof →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile

