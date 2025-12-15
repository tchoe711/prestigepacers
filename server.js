import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware
app.use(cors())
app.use(express.json())

// Database file path
const DB_PATH = path.join(__dirname, 'data', 'database.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Initialize database
async function initDatabase() {
  await ensureDataDir()
  try {
    await fs.access(DB_PATH)
  } catch {
    const initialData = {
      users: [],
      profiles: {},
    }
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2))
  }
}

// Read database
async function readDatabase() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return { users: [], profiles: {} }
  }
}

// Write database
async function writeDatabase(data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing database:', error)
    return false
  }
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Register (for initial setup)
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const db = await readDatabase()
    const existingUser = db.users.find((u) => u.email === email)

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString(),
    }

    db.users.push(newUser)
    db.profiles[newUser.id] = {
      userId: newUser.id,
      name: newUser.name,
      title: '',
      company: '',
      bio: '',
      email: newUser.email,
      location: '',
      achievements: [],
    }

    await writeDatabase(db)

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const db = await readDatabase()
    const user = db.users.find((u) => u.email === email)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const db = await readDatabase()
    const profile = db.profiles[req.user.id]

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.json(profile)
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { name, title, company, bio, email, location, achievements } = req.body

    const db = await readDatabase()

    if (!db.profiles[req.user.id]) {
      db.profiles[req.user.id] = {
        userId: req.user.id,
        name: '',
        title: '',
        company: '',
        bio: '',
        email: req.user.email,
        location: '',
        achievements: [],
      }
    }

    const profile = db.profiles[req.user.id]

    // Update profile fields
    if (name !== undefined) profile.name = name
    if (title !== undefined) profile.title = title
    if (company !== undefined) profile.company = company
    if (bio !== undefined) profile.bio = bio
    if (email !== undefined) profile.email = email
    if (location !== undefined) profile.location = location
    if (achievements !== undefined) profile.achievements = achievements

    profile.updatedAt = new Date().toISOString()

    await writeDatabase(db)

    res.json(profile)
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Verify token
app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user })
})

// Start server
async function startServer() {
  await initDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

startServer().catch(console.error)

