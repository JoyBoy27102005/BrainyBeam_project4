import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const label = nextTheme === 'light' ? '☀ Light Mode' : '🌙 Dark Mode'

  return (
    <button
      className="bb-button bb-button-outline bb-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {label}
    </button>
  )
}
