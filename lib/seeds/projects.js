const Project = require('../models/Project');
const agents = require('./agents');
const technologies = require('./technologies');

const projects = [];

// PROJECTS
const project1 = new Project({
    title: 'DragonDrop',
    description: 'A game where you sort dragons by dragging them into piles.',
    difficulty: 3,
    status: 'Active',
    technologies: [technologies[3], technologies[4]],
    projectLead: agents[0],
    agents: [agents[0], agents[5]],
});

const project2 = new Project({
    title: 'Thrifty Gifties',
    description: 'An app to track your holiday gift spending.',
    difficulty: 4,
    status: 'Backlog',
    technologies: [technologies[0], technologies[2], technologies[5]],
    projectLead: agents[1],
    agents: [agents[1], agents[2], agents[4]],
  });


const project3 = new Project({
    title: 'HoverSpud',
    description: 'A game where you use a potato to reveal an image before the time runs out.',
    difficulty: 2,
    status: 'Hiatus',
    technologies: [technologies[0], technologies[1], technologies[3]],
    projectLead: agents[0],
    agents: [agents[3], agents[1], agents[0]],
  });

projects.push(project1, project2, project3);

module.exports = projects;
