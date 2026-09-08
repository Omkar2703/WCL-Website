import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

import authRoutes from './routes/auth.js'
import newsRoutes from './routes/news.js'
import updatesRoutes from './routes/updates.js'
import datasetsRoutes from './routes/datasets.js'
import grantsRoutes from './routes/grants.js'
import researchAreasRoutes from './routes/researchAreas.js'
import dataPortalsRoutes from './routes/dataPortals.js'
import peopleRoutes from './routes/people.js'
import publicationsRoutes from './routes/publications.js'
import contactRoutes from './routes/contact.js'
import droughtRoutes from './routes/drought.js'

const app = express()

app.use(cors({ origin: (process.env.CLIENT_ORIGIN || '*').split(',') }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/updates', updatesRoutes)
app.use('/api/datasets', datasetsRoutes)
app.use('/api/grants', grantsRoutes)
app.use('/api/research-areas', researchAreasRoutes)
app.use('/api/data-portals', dataPortalsRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/publications', publicationsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/drought', droughtRoutes)

// Centralized error handler -- every route above is async and can throw;
// this keeps a bad request from crashing the process.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong.' })
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Water & Climate Lab API listening on port ${PORT}`))
})
