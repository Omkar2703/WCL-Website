import mongoose from 'mongoose'

const ResearchAreaSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    KeyTopics: [String],
    Image: String,
    PageLink: { type: String, required: true, unique: true },
    Para1: String,
    Para2: String,
    Para3: String,
    Para4: String,
    Questions: [String],
    RelatedPapers: [String]
  },
  { timestamps: true }
)

export default mongoose.model('ResearchArea', ResearchAreaSchema)
