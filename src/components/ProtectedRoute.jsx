// Simple protected route wrapper that checks localStorage 'auth' flag
import React from 'react'
import { Navigate } from 'react-router-dom'

// ProtectedRoute checks for presence of a JWT token in localStorage
export default function ProtectedRoute({ children }) {
  const token = !!localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}
