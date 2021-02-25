import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema({
  caption: { type: String, required: false },
  url: { type: String, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
})
export default mongoose.model('Image', imageSchema)