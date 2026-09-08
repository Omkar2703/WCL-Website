import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js'
import mongoose from 'mongoose'

import Admin from '../models/Admin.js'
import Person from '../models/Person.js'
import Publication from '../models/Publication.js'
import NewsItem from '../models/NewsItem.js'
import RecentUpdate from '../models/RecentUpdate.js'
import Dataset from '../models/Dataset.js'
import GrantFund from '../models/GrantFund.js'
import ResearchArea from '../models/ResearchArea.js'
import DataPortal from '../models/DataPortal.js'

// Reuses the same data files the client falls back to, so the seeded
// database and the offline demo data never drift apart. If you move or
// rename the client project, update these relative paths.
import { PeopleData } from '../../client/src/data/PeopleData.js'
import { PublicationsData } from '../../client/src/data/PublicationsData.js'
import { NewsData } from '../../client/src/data/NewsData.js'
import { RecentUpdatesData } from '../../client/src/data/RecentUpdatesData.js'
import { Dataset as DatasetData } from '../../client/src/data/DataSetsData.js'
import { GrantsAndFundsData } from '../../client/src/data/GrantsAndFundsData.js'
import { ResearchAreasData } from '../../client/src/data/ResearchAreasData.js'
import { DataPortalsData } from '../../client/src/data/DataPortalsData.js'

async function seedCollection(Model, docs, label) {
  await Model.deleteMany({})
  await Model.insertMany(docs)
  console.log(`  ${label}: ${docs.length} documents`)
}

async function run() {
  await connectDB()

  console.log('Seeding collections...')
  await seedCollection(
    Person,
    PeopleData.map((p) => ({ ...p, PageClassification: (p.PageClassification || '').trim() || 'Current' })),
    'People'
  )
  await seedCollection(Publication, PublicationsData, 'Publications')
  await seedCollection(NewsItem, NewsData, 'News')
  await seedCollection(RecentUpdate, RecentUpdatesData, 'Recent updates')
  await seedCollection(Dataset, DatasetData, 'Datasets')
  await seedCollection(GrantFund, GrantsAndFundsData, 'Grants & funds')
  await seedCollection(ResearchArea, ResearchAreasData, 'Research areas')
  await seedCollection(DataPortal, DataPortalsData, 'Data portals')

  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const existing = await Admin.findOne({ email: adminEmail })
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10)
      await Admin.create({ email: adminEmail, passwordHash, name: 'Admin' })
      console.log(`Created admin account: ${adminEmail}`)
    } else {
      console.log(`Admin account already exists: ${adminEmail}`)
    }
  } else {
    console.log('ADMIN_EMAIL / ADMIN_PASSWORD not set -- skipping admin creation.')
  }

  console.log('Done.')
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
