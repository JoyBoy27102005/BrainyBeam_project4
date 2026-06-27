const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')

// POST /api/auth/login
// Accepts { email, name } — creates or updates user and returns a token
router.post('/login', async (req, res) => {
  const { email, name } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })

  try{
    let user = await User.findOne({ email })
    if (!user) {
      user = new User({ email, name: name || email.split('@')[0] })
      await user.save()
    } else if (name && user.name !== name) {
      user.name = name
      await user.save()
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ token, user: { name: user.name, email: user.email } })
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/auth/me — protected
router.get('/me', auth, async (req, res) => {
  try{
    const user = await User.findById(req.userId).select('-__v')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ name: user.name, email: user.email })
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/auth/me — update profile (protected)
router.put('/me', auth, async (req, res) => {
  try{
    const { name, email } = req.body
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (name) user.name = name
    if (email) user.email = email
    await user.save()
    res.json({ name: user.name, email: user.email })
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
