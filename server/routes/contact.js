import { Router } from 'express'
import ContactMessage from '../models/ContactMessage.js'
import { requireAdmin } from '../middleware/auth.js'
import { notifyAdmin } from '../utils/mailer.js'

const router = Router()

// Public: anyone can submit the contact form.
router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' })
  }
  const saved = await ContactMessage.create({ name, email, message })
  notifyAdmin(saved).catch((err) => console.error('Contact notification email failed:', err.message))
  res.status(201).json({ message: 'Message received.' })
})

// Admin only: read and manage submissions.
router.get('/', requireAdmin, async (req, res) => {
  const messages = await ContactMessage.find().sort('-createdAt')
  res.json(messages)
})

router.delete('/:id', requireAdmin, async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router
