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
  }
})

var Store = mongoose.model('Store', StoreSchema)

module.exports = Store
