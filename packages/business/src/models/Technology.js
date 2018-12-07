const mongoose = require('mongoose')
const Schema = mongoose.Schema

const technologySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Technology', technologySchema)
