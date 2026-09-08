import mongoose from 'mongoose'

const GrantFundSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Agency: String,
    ProjectInvestigator: String
  },
  { timestamps: true }
)

export default mongoose.model('GrantFund', GrantFundSchema)
