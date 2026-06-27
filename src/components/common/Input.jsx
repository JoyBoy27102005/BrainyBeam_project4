import React, { useId } from 'react'

export default function Input({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  id,
  className = '',
  ariaLabel
}) {
  const autoId = useId()
  const inputId = id || `input-${autoId}`

  return (
    <div className={`bb-form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="bb-form-label">
          {label}
          {required && <span className="bb-required">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        className={`bb-input ${error ? 'bb-input-error-field' : ''}`.trim()}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error && (
        <span
          id={`${inputId}-error`}
          className="bb-input-error"
        >
          {error}
        </span>
      )}
    </div>
  )
}