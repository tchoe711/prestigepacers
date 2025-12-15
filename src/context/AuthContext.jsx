import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const API_URL = 'http://localhost:3001/api'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem('prestigePacersToken')
    const savedUser = localStorage.getItem('prestigePacersUser')
    
    if (savedToken && savedUser) {
      // Verify token with backend
      verifyToken(savedToken).then((valid) => {
        if (valid) {
          setToken(savedToken)
          setUser(JSON.parse(savedUser))
          setIsAuthenticated(true)
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('prestigePacersToken')
          localStorage.removeItem('prestigePacersUser')
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(`${API_URL}/verify`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
        },
      })
      return response.ok
    } catch (error) {
      console.error('Token verification error:', error)
      return false
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
      }

      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      localStorage.setItem('prestigePacersToken', data.token)
      localStorage.setItem('prestigePacersUser', JSON.stringify(data.user))
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('prestigePacersToken')
    localStorage.removeItem('prestigePacersUser')
  }

  const getAuthToken = () => {
    return token || localStorage.getItem('prestigePacersToken')
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      getAuthToken,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

