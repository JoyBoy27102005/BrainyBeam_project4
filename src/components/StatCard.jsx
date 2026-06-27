// Small reusable statistic card used on the dashboard
import React from 'react'
import Card from './common/Card'

export default function StatCard({ title, value, icon }) {
  return (
    <div className="col-sm-6 col-lg-3 mb-3">
      <Card className="h-100 bb-stat-card">
        <div className="d-flex align-items-center h-100">
          <div className="me-3 stat-icon">{icon}</div>
          <div>
            <div className="text-muted small">{title}</div>
            <div className="h5 mb-0">{value}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
