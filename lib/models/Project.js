const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type:  Number,
        required: false
    },
    status: {
      type: String,
      required: false,
    },
    technologies: [{
        type: Schema.Types.ObjectId, 
        ref: 'Technology',
    }],
    projectLead: [{
        type: Schema.Types.ObjectId,
        ref: 'Agent',
    }],
    agents: [{
        type: Schema.Types.ObjectId, 
        ref: 'Agent'
    }],
})

module.exports = mongoose.model('Project', projectSchema);
