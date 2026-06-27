import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function EmptyState({ message = 'No matching records found.' }) {
  const { theme } = useTheme()

  return (
    <div className="text-center py-4" data-theme={theme}>
      <p className="mb-0">{message}</p>
    </div>
  )
}
