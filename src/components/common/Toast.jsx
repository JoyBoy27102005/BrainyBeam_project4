import React, { useEffect, useState } from 'react'

export default function Toast({ message, type = 'info', duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)

    return () => window.clearTimeout(timer)
  }, [duration, onClose])

  if (!visible || !message) return null

  return (
    <div className={`bb-toast bb-toast-${type}`} role="status" aria-live="polite">
      {message}
      <button className="bb-toast-close" onClick={() => { setVisible(false); onClose?.() }} aria-label="Dismiss notification">×</button>
    </div>
  )
}
