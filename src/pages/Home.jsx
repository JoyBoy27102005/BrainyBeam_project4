// Home page: public landing with simple welcome
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/common/Button'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'BrainyBeam | Home'
  }, [])

  return (
    <div>
      <Navbar />

      <div className="container py-5">

        <div className="text-center">

          <h1 className="display-4 fw-bold mb-3">
            Welcome to BrainyBeam
          </h1>

          <p className="lead mb-4">
            A modern Blood Bank Management System built using the MERN Stack to
            efficiently manage donors, patients, blood inventory, and donation
            records through a responsive and user-friendly interface.
          </p>

          <Button
            variant="primary"
            className="mt-2"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>

        </div>

      </div>
    </div>
  )
}