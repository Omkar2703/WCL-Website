import mongoose from 'mongoose'

const DatasetSchema = new mongoose.Schema(
  {
    DataName: { type: String, required: true },
    Description: String,
    ImagesLink: String,
    Authors: [String],
    PaperLink: String,
    DataLink: String
  },
  { timestamps: true }
)

export default mongoose.model('Dataset', DatasetSchema)
