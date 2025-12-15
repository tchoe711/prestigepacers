import './Home.css'

function Home() {
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
          <div className="home-card">
            <h2>Rate People</h2>
            <p>Compare and rate professionals against each other to help build a better network.</p>
          </div>
          <div className="home-card">
            <h2>Edit Your Profile</h2>
            <p>Keep your profile up to date and showcase your professional achievements.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

