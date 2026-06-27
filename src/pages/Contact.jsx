import React, { useState, useEffect } from 'react'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Toast from '../components/common/Toast'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    document.title = 'BrainyBeam | Contact'
  }, [])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function validate() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required.'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setShowToast(true)

    setForm({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <>
      <div className="container py-4">
        <Card title="Contact Us">

          <p className="text-muted mb-4">
            We'd love to hear from you. Fill out the form below or reach us using the contact information.
          </p>

          <div className="mb-4">
            <p><strong>Email:</strong> support@lifelinebloodbank.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Address:</strong> Ahmedabad, Gujarat, India</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <div className="bb-form-group">
              <label className="bb-form-label">
                Message <span className="bb-required">*</span>
              </label>

              <textarea
                className={`bb-input ${errors.message ? 'bb-input-error-field' : ''}`}
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
              />

              {errors.message && (
                <small className="bb-input-error">
                  {errors.message}
                </small>
              )}
            </div>

            <Button type="submit">
              Send Message
            </Button>

          </form>

        </Card>
      </div>

      {showToast && (
        <Toast
          type="success"
          message="Your message has been sent successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}