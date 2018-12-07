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
  googleId: {
    type: String,
    required: false,
  },
  emails: {
    type: Object,
    required: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
})

module.exports = mongoose.model('User', userSchema)
