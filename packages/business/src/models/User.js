const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    default: 'user',
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('User', userSchema)
