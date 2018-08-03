const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Agent', agentSchema)