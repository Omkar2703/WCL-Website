import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Programme: String,
    Department: String,
    ResearchInterests: String,
    Image: String,
    Email: String,
    PageClassification: { type: String, enum: ['Professor', 'Current', 'Intern', 'Alumni'], default: 'Current' },
    Category: String,
    Education: [String],
    Researchs: [String],
    Achievements: [String],
    Conferences: [String],
    Publications: [String],
    SocialLinks: {
      GoogleScholar: String,
      ResearchGate: String,
      Linkedin: String,
      Twitter: String,
      PortfolioWebsite: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('Person', PersonSchema)
