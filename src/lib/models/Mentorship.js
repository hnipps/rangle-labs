const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorshipSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  difficulty: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Technology"
    }
  ],
  mentorshipLead: [
    {
      type: Schema.Types.ObjectId,
      ref: "Agent"
    }
  ],
  agents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Agent"
    }
  ],
  trelloBoardUrl: {
    type: String,
    required: false
  },
  githubUrl: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
