import React from 'react'

export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bb-card ${className}`.trim()}>
      {title && <div className="bb-card-header"><h3>{title}</h3></div>}
      <div className="bb-card-body">{children}</div>
    </div>
  )
}
