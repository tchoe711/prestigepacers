import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">in</span>
          <span className="logo-company">Prestige Pacers</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rating" className="nav-link">Rate People</Link>
          <Link to="/profile" className="nav-link">Edit Profile</Link>
          {isAuthenticated ? (
            <>
              <span className="nav-user">Welcome, {user?.name || user?.email}</span>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-button">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

