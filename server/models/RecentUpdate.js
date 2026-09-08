import mongoose from 'mongoose'

const RecentUpdateSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    ImageLink: String,
    ArticleLink: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('RecentUpdate', RecentUpdateSchema)
