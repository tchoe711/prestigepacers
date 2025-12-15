import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Sign in to Prestige Pacers</h1>
            <p>Stay updated on your professional world</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>

          <div className="login-footer">
            <p>
              New to Prestige Pacers? <a href="/signup">Join now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

