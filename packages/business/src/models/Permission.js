const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  access: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Permission', permissionSchema)
