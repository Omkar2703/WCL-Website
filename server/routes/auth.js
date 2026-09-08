import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
  if (!admin) return res.status(401).json({ message: 'Invalid email or password.' })

  const valid = await bcrypt.compare(password, admin.passwordHash)
  if (!valid) return res.status(401).json({ message: 'Invalid email or password.' })

  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } })
})

export default router
