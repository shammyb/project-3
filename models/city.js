import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// city schema with embedded schema
const commentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  image: { type: String },

  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: true
})



const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  about: { type: String },
  country: { type: String },
  currency: { type: String },
  continent: { type: String },
  language: { type: String },
  image: { type: String, required: true },
  long: { type: String },
  lat: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
  
})

citySchema.plugin(uniqueValidator)

export default mongoose.model('City', citySchema)
