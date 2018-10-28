"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProduceSchema = new _mongoose.default.Schema({
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
});

var Produce = _mongoose.default.model('Produce', ProduceSchema);

module.exports = Produce;