import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('prestigePacersUser')
    const savedAuth = localStorage.getItem('prestigePacersAuth')
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email, password) => {
    // In a real app, this would make an API call
    // For now, we'll just simulate a login
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0], // Simple name extraction
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('prestigePacersUser', JSON.stringify(userData))
      localStorage.setItem('prestigePacersAuth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('prestigePacersUser')
    localStorage.removeItem('prestigePacersAuth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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

