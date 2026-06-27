import React, { useEffect } from 'react'
import Card from '../components/common/Card'

export default function About() {
  useEffect(() => {
    document.title = 'BrainyBeam | About'
  }, [])

  return (
    <div className="container py-4">
      <Card title="About Blood Bank Management System">
        <p className="mb-3">
          The <strong>Blood Bank Management System</strong> is a modern web
          application designed to simplify the management of blood donors,
          patients, blood inventory, and donation records.
        </p>

        <p className="mb-3">
          The system helps hospitals and blood banks maintain accurate records,
          improve the efficiency of blood requests, and ensure that blood units
          are tracked securely throughout the donation process.
        </p>

        <p className="mb-0">
          Developed using the <strong>MERN Stack</strong>, this project focuses
          on usability, responsive design, security, and efficient data
          management while providing a clean and user-friendly experience.
        </p>
      </Card>
    </div>
  )
}