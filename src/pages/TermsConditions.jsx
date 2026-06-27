import React, { useEffect } from 'react'
import Card from '../components/common/Card'

export default function TermsConditions() {
  useEffect(() => {
    document.title = 'BrainyBeam | Terms & Conditions'
  }, [])

  return (
    <div className="container py-4">
      <Card title="Terms & Conditions">
        <p className="mb-3">
          Welcome to the Blood Bank Management System. By accessing and using
          this application, you agree to comply with the following terms and
          conditions.
        </p>

        <p className="mb-3">
          Users are responsible for providing accurate and up-to-date
          information during registration and while using the system. Any
          misleading or false information may result in restricted access.
        </p>

        <p className="mb-3">
          The application is intended solely for blood donation management,
          donor registration, patient requests, and inventory tracking.
          Unauthorized use, misuse, or attempts to compromise system security
          are strictly prohibited.
        </p>

        <p className="mb-0">
          We reserve the right to update these terms at any time to improve
          system security, reliability, and compliance with applicable
          regulations.
        </p>
      </Card>
    </div>
  )
}