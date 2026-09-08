import { Router } from 'express'
import axios from 'axios'
import * as cheerio from 'cheerio'

const router = Router()

const SOURCE_URL = 'https://indiadroughtmonitor.in/'
let cache = { fetchedAt: 0, payload: null }
const CACHE_MS = 60 * 60 * 1000 // 1 hour -- the source updates daily

// Lightweight proxy/cache in front of the lab's own drought monitor site.
// The client currently embeds indiadroughtmonitor.in directly via <iframe>
// (see client/src/pages/DroughtMonitor.jsx), so this endpoint isn't wired
// into the UI yet -- it's here for when the page needs to render specific
// figures (e.g. this week's D0-D4 severity map) rather than the whole site.
// Update the CSS selector below to match whatever the source page uses for
// its "last updated" figure/caption before relying on this in production.
router.get('/', async (req, res) => {
  if (Date.now() - cache.fetchedAt < CACHE_MS && cache.payload) {
    return res.json(cache.payload)
  }
  try {
    const { data: html } = await axios.get(SOURCE_URL, { timeout: 10000 })
    const $ = cheerio.load(html)
    const payload = {
      sourceUrl: SOURCE_URL,
      pageTitle: $('title').first().text().trim(),
      fetchedAt: new Date().toISOString()
    }
    cache = { fetchedAt: Date.now(), payload }
    res.json(payload)
  } catch (err) {
    res.status(502).json({ message: 'Could not reach indiadroughtmonitor.in', error: err.message })
  }
})

export default router
