const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  allowedAccounts: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('Permission', permissionSchema)
