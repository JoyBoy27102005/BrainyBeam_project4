// Responsive top navigation bar with logo and links
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './common/Button'
import Modal from './common/Modal'
import ThemeToggle from './common/ThemeToggle'

export default function Navbar() {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    setShowLogoutModal(false)
    navigate('/login')
  }

  const closeNav = () => setNavOpen(false)

  return (
    <>
      <nav className="navbar navbar-expand-lg bb-navbar">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand d-flex align-items-center"
            to="/"
            onClick={closeNav}
          >
            <img
              src="/src/assets/logo.svg"
              alt="Logo"
              className="brand-logo me-2"
            />
            <span>BrainyBeam</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="mainNav"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}
            id="mainNav"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

              {/* Existing Links */}

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Contact
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/privacy-policy"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Privacy
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Terms
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  onClick={closeNav}
                >
                  Profile
                </NavLink>
              </li>

              <li className="nav-item d-flex align-items-center ms-2">
                <ThemeToggle />
              </li>

              <li className="nav-item ms-2">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(true)}
                  ariaLabel="Logout"
                >
                  Logout
                </Button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm logout"
      >
        <p>Are you sure you want to sign out?</p>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="outline"
            onClick={() => setShowLogoutModal(false)}
            ariaLabel="Cancel logout"
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
            ariaLabel="Confirm logout"
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  )
}