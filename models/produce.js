import mongoose from 'mongoose'

var ProduceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  carbon: {
    type: Number,
    required: true
  }
})

var Produce = mongoose.model('Produce', ProduceSchema)

module.exports = Produce
