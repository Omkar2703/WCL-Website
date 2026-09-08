import { Router } from 'express'
import { requireAdmin } from '../middleware/auth.js'

// Every simple content collection (news, updates, datasets, grants, research
// areas, data portals, people, publications) follows the same public-read /
// admin-write shape, so it's generated once here instead of eight times.
export function makeCrudRouter(Model, { sort = '-createdAt' } = {}) {
  const router = Router()

  router.get('/', async (req, res) => {
    const items = await Model.find().sort(sort)
    res.json(items)
  })

  router.get('/:id', async (req, res) => {
    const item = await Model.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found.' })
    res.json(item)
  })

  router.post('/', requireAdmin, async (req, res) => {
    const item = await Model.create(req.body)
    res.status(201).json(item)
  })

  router.put('/:id', requireAdmin, async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Not found.' })
    res.json(item)
  })

  router.delete('/:id', requireAdmin, async (req, res) => {
    await Model.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })

  return router
}
