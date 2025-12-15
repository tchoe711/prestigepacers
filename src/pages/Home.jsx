import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  const handleRatingClick = () => {
    navigate('/rating')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-hero">
          <h1>Welcome to Prestige Pacers</h1>
          <p className="home-subtitle">
            Connect, rate, and build your professional network
          </p>
        </div>
        <div className="home-content">
          <div className="home-card" onClick={handleRatingClick}>
            <h2>Rate People</h2>
            <p>Compare and rate professionals against each other to help build a better network.</p>
            <button className="home-card-button" onClick={(e) => { e.stopPropagation(); handleRatingClick(); }}>
              Go to Rating Page →
            </button>
          </div>
          <div className="home-card" onClick={handleProfileClick}>
            <h2>Edit Your Profile</h2>
            <p>Keep your profile up to date and showcase your professional achievements.</p>
            <button className="home-card-button" onClick={(e) => { e.stopPropagation(); handleProfileClick(); }}>
              Go to Profile Page →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

