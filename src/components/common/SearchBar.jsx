import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function SearchBar({ placeholder = 'Search...', value = '', onChange, className = '' }) {
  const { theme } = useTheme()

  return (
    <label className={`d-flex flex-column gap-2 ${className}`.trim()}>
      <span className="visually-hidden">Search</span>
      <input
        type="search"
        className="bb-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
        data-theme={theme}
      />
    </label>
  )
}
