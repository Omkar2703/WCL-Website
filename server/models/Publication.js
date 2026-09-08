import mongoose from 'mongoose'

const PublicationSchema = new mongoose.Schema(
  {
    PublicationTitle: { type: String, required: true },
    Authors: [String],
    PublicationYear: String,
    PublicationLink: String,
    PublicationType: { type: String, default: 'Journal Articles (published/accepted)' }
  },
  { timestamps: true }
)

export default mongoose.model('Publication', PublicationSchema)
