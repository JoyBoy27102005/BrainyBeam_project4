import React, { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children, closeOnOverlayClick = true }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return
    const firstFocusable = dialogRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (firstFocusable) {
      firstFocusable.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleOverlayClick(event) {
    if (!closeOnOverlayClick) return
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="bb-modal-overlay" onClick={handleOverlayClick} role="presentation">
      <div
        className="bb-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bb-modal-title"
      >
        <div className="bb-modal-header">
          {title && <h2 id="bb-modal-title">{title}</h2>}
          <button className="bb-modal-close" type="button" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="bb-modal-body">{children}</div>
      </div>
    </div>
  )
}
