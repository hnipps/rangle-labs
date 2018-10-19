const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  currentTechnologies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],
  aspirationalTechnologies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],
  available: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Agent', agentSchema)
