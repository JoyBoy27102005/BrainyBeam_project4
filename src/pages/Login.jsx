// Login page: simple form that stores a fake auth token in localStorage
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Toast from '../components/common/Toast'

export default function Login(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)

    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })

      let data = null
      try {
        data = await res.json()
      } catch {
        throw new Error('Unexpected response from server. Please try again.')
      }

      if (!res.ok) throw new Error(data?.message || 'Login failed')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user_name', data.user.name)
      localStorage.setItem('user_email', data.user.email)
      setToast({ message: 'Login successful. Redirecting…', type: 'success' })
      window.setTimeout(() => navigate('/dashboard'), 700)
    }catch(err){
      setError(err.message)
      setToast({ message: err.message, type: 'error' })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="bb-center-screen">
      <div className="bb-card bb-login-card p-4">
        <h4 className="mb-3">Login</h4>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={submit}>
          <Input
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            placeholder="Your email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="w-100">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  )
}
