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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to a backend
    alert('Profile saved successfully!')
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Edit Your Profile</h1>
        <p className="profile-subtitle">
          Update your information and showcase your professional achievements
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-section">
            <h2>Basic Information</h2>
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

          <div className="profile-section">
            <h2>About</h2>
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

