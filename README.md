# MERN Frontend (React) — Sample App

This is a simple React frontend scaffold (Vite) implementing a responsive Navbar, Dashboard layout with Sidebar, Profile page, routing, and basic auth simulation.

Getting started:

1. Install dependencies for the frontend and backend:

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

2. Configure backend environment:

Copy `server/.env.example` to `server/.env` and set `JWT_SECRET`.

**Note:** This backend uses in-memory user storage — no database setup required. User data persists during the server session.

3. Run servers during development (run two terminals):

```bash
# Terminal 1: frontend
npm run dev

# Terminal 2: backend
cd server
npm run dev
```

The frontend dev server proxies `/api` requests to the backend on `http://localhost:5000`.

This project uses React Router v6 and Bootstrap for styling. The backend provides basic auth endpoints for login and profile management. Authentication is JWT-based and the token is stored in `localStorage` for simplicity in this demo.
