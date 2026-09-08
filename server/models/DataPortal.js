import mongoose from 'mongoose'

const DataPortalSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: String,
    Image: String,
    Link: { type: String, required: true },
    KeyTopics: [String]
  },
  { timestamps: true }
)

export default mongoose.model('DataPortal', DataPortalSchema)
