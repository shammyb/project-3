import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
})
export default mongoose.model('Image', imageSchema)