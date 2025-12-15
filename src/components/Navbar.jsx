import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar

