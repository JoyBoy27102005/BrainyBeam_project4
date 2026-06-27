import React, { useEffect } from 'react'
import Card from '../components/common/Card'

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'BrainyBeam | Privacy Policy'
  }, [])

  return (
    <div className="container py-4">
      <Card title="Privacy Policy">
        <p className="mb-3">
          Your privacy is important to us. The Blood Bank Management System is
          committed to protecting the personal information of donors, patients,
          and healthcare professionals.
        </p>

        <p className="mb-3">
          Information collected through this application is used solely for
          blood donation management, patient care, inventory tracking, and
          administrative purposes. Personal information is never sold or shared
          with third parties without proper authorization, except where required
          by law.
        </p>

        <p className="mb-3">
          We implement appropriate security measures to safeguard user data
          against unauthorized access, modification, or disclosure.
        </p>

        <p className="mb-0">
          By using this application, you agree to the collection and use of
          information in accordance with this Privacy Policy.
        </p>
      </Card>
    </div>
  )
}