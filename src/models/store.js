import mongoose from 'mongoose'

var StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  produce: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produce' }],
    required: false
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // longitude comes first
      required: true
    }
  }
})

var Store = mongoose.model('Store', StoreSchema)

module.exports = Store
