"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreSchema = new _mongoose.default.Schema({
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
    type: [{
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Produce'
    }],
    required: false
  }
});

var Store = _mongoose.default.model('Store', StoreSchema);

module.exports = Store;