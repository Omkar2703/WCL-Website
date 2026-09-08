import mongoose from 'mongoose'

const NewsItemSchema = new mongoose.Schema(
  {
    Date: { type: String, required: true },
    SourceName: String,
    ArticleName: { type: String, required: true },
    ArticleLink: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('NewsItem', NewsItemSchema)
