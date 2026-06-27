import React from 'react'

export default function Loader() {
  return (
    <div className="bb-loader-wrapper" role="status" aria-live="polite" aria-label="Loading">
      <div className="bb-loader" />
    </div>
  )
}
