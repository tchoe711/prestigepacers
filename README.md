# Prestige Pacers

A modern React application built with Vite and Express backend.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

#### Option 1: Run both frontend and backend together
```bash
npm run dev:all
```

#### Option 2: Run separately

Start the backend server:
```bash
npm run dev:server
```

In a separate terminal, start the frontend:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

### First Time Setup

1. Start the backend server
2. Register a new account by making a POST request to `/api/register` with:
   ```json
   {
     "email": "your@email.com",
     "password": "yourpassword",
     "name": "Your Name"
   }
   ```
   Or use a tool like Postman, or create a simple registration page.

3. Login with your credentials at `/login`

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Express** - Backend server
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON Database** - File-based database (can be replaced with MongoDB, PostgreSQL, etc.)

## Project Structure

```
prestigepacers/
├── src/
│   ├── components/     # React components
│   ├── context/        # React context (Auth)
│   ├── pages/         # Page components
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
├── server.js          # Express backend server
├── data/              # Database files (auto-created)
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `GET /api/verify` - Verify JWT token (protected)
- `GET /api/health` - Health check

## Features

- User authentication with JWT
- Protected routes
- Profile management with achievements
- Achievement verification system
- Rating system for comparing professionals

## Database

The application uses a JSON file-based database located in `data/database.json`. This is suitable for development and can be easily replaced with a proper database (MongoDB, PostgreSQL, etc.) in production.
