// App root: sets up routes and global layout
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

import DonorHistory from './pages/DonorHistory'
import PatientHistory from './pages/PatientHistory'
import DonationHistory from './pages/DonationHistory'
import InventoryHistory from './pages/InventoryHistory'

import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import ServerError from './pages/ServerError'

import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="app-root">
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* History Pages */}
        <Route
          path="/dashboard/donor-history"
          element={
            <ProtectedRoute>
              <DonorHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/patient-history"
          element={
            <ProtectedRoute>
              <PatientHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/donation-history"
          element={
            <ProtectedRoute>
              <DonationHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/inventory-history"
          element={
            <ProtectedRoute>
              <InventoryHistory />
            </ProtectedRoute>
          }
        />
      
        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Error Pages */}
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>
    </div>
  )
}