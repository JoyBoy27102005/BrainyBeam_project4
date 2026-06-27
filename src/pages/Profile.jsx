// Profile page: displays user picture, name, email and an edit button
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loader from '../components/common/Loader'
import Toast from '../components/common/Toast'

const PROFILE_STORAGE_KEY = 'bb_profile'

function getStoredProfile() {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

function saveProfileToStorage(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

const defaultProfile = {
  name: 'Guest User',
  email: 'guest@brainybeam.com',
  avatar: '/src/assets/avatar.svg'
}

export default function Profile(){
  const [user, setUser] = useState(defaultProfile)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: defaultProfile.name, email: defaultProfile.email })
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const storedProfile = getStoredProfile()
      const initialProfile = storedProfile || defaultProfile
      setUser(initialProfile)
      setForm({ name: initialProfile.name, email: initialProfile.email })

      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try{
        const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json().catch(() => null)
        if (res.ok && data) {
          const loadedProfile = {
            name: data.name || initialProfile.name,
            email: data.email || initialProfile.email,
            avatar: initialProfile.avatar
          }
          setUser(loadedProfile)
          setForm({ name: loadedProfile.name, email: loadedProfile.email })
          saveProfileToStorage(loadedProfile)
        }
      }catch(err){
        console.error('Profile load failed, using local storage or defaults.', err)
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  async function saveProfile(){
    if (!form.name || !form.email) {
      setToast({ message: 'Name and email are required.', type: 'warning' })
      return
    }

    const token = localStorage.getItem('token')
    let updatedProfile = { name: form.name, email: form.email, avatar: user.avatar }

    if (token) {
      try{
        const res = await fetch('/api/auth/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw new Error(data?.message || 'Failed to save profile')
        }
        if (!data) {
          throw new Error('Unexpected response from server.')
        }
        updatedProfile = {
          name: data.name || form.name,
          email: data.email || form.email,
          avatar: user.avatar
        }
      }catch(err){
        console.error(err)
        setToast({ message: err.message || 'Unable to save profile', type: 'error' })
        return
      }
    }

    setUser(updatedProfile)
    setForm({ name: updatedProfile.name, email: updatedProfile.email })
    saveProfileToStorage(updatedProfile)
    setEditing(false)
    setToast({ message: 'Profile updated successfully.', type: 'success' })
  }

  if (loading) return <div className="bb-center-screen"><Loader /></div>

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        <div className="row gy-4">
          <div className="col-md-4">
            <Card>
              <div className="text-center">
                <img src={user.avatar} alt="Avatar" className="avatar-img mb-3" />
                <h5>{user.name}</h5>
                <p className="text-muted">{user.email}</p>
              </div>
            </Card>
          </div>
          <div className="col-md-8">
            <Card title="Profile">
              {!editing ? (
                <div>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <Button variant="primary" onClick={() => setEditing(true)}>Edit profile</Button>
                </div>
              ) : (
                <div>
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    type="email"
                    required
                  />
                  <div className="d-flex flex-wrap gap-2">
                    <Button variant="success" onClick={saveProfile}>Save</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
