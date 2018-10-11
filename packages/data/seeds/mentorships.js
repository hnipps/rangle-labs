const agents = require('./agents');
const technologies = require('./technologies');
const business = require('business');
const Mentorship = business.models.mentorship;

const mentorships = [];

// MENTORSHIPS
const mentorship1 = new Mentorship({
  title: 'Game Progression',
  description: 'Building a website that tracks a users progressions through a game.' ,
  difficulty: 3,
  status: 'Hiatus',
  technologies: [technologies[3], technologies[4]],
  mentorshipLead: agents[3],
  agents: [agents[0], agents[5]],
});

mentorships.push(mentorship1);

module.exports = mentorships;
