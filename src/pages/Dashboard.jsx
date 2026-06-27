// Dashboard layout: contains Sidebar, Topbar and Blood Bank statistics
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import StatCard from '../components/StatCard'
import Navbar from '../components/Navbar'
import Card from '../components/common/Card'
import Loader from '../components/common/Loader'

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'BrainyBeam | Dashboard'

    const frame = window.requestAnimationFrame(() => setLoading(false))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function toggleSidebar() {
    setShowSidebar(v => !v)
  }

  if (loading) {
    return (
      <div className="bb-center-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <aside className="sidebar d-none d-md-block p-3">
          <Sidebar />
        </aside>

        <aside className={`sidebar d-md-none p-3${showSidebar ? ' show' : ''}`}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </aside>

        <main className="content-area">

          <Topbar onToggleSidebar={toggleSidebar} />

          <div className="container-fluid px-0">

            <h2 className="mb-4 fw-bold">
              🩸 Blood Bank Dashboard
            </h2>

            <div className="row g-3">

              <StatCard
                title="Total Donors"
                value="1,248"
                icon="🩸"
              />

              <StatCard
                title="Blood Units Available"
                value="356"
                icon="❤️"
              />

              <StatCard
                title="Active Patients"
                value="84"
                icon="🏥"
              />

              <StatCard
                title="Emergency Requests"
                value="12"
                icon="🚑"
              />

            </div>

            <div className="row mt-4">

              <div className="col-lg-7 mb-4">

                <Card title="Recent Activities">

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item bg-transparent text-light border-secondary">
                      🩸 Rahul Sharma donated O+ blood.
                    </li>

                    <li className="list-group-item bg-transparent text-light border-secondary">
                      ❤️ 2 units of B+ added to inventory.
                    </li>

                    <li className="list-group-item bg-transparent text-light border-secondary">
                      🏥 Emergency request received from Civil Hospital.
                    </li>

                    <li className="list-group-item bg-transparent text-light border-secondary">
                      👤 Priya Patel registered as a new donor.
                    </li>

                    <li className="list-group-item bg-transparent text-light border-secondary">
                      📦 Inventory updated successfully.
                    </li>

                  </ul>

                </Card>

              </div>

              <div className="col-lg-5 mb-4">

                <Card title="Blood Stock">

                  <table className="table align-middle mb-0">

                    <thead>

                      <tr>

                        <th>Group</th>

                        <th>Units</th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr><td>A+</td><td>48</td></tr>
                      <tr><td>B+</td><td>39</td></tr>
                      <tr><td>O+</td><td>82</td></tr>
                      <tr><td>AB+</td><td>24</td></tr>
                      <tr><td>O-</td><td>18</td></tr>

                    </tbody>

                  </table>

                </Card>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}