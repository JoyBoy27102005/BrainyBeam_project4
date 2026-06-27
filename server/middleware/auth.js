// JWT auth middleware: expects Authorization: Bearer <token>
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.userId = payload.id
    next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}
