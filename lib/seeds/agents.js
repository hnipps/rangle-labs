const Agent = require('../models/Agent');

const agents = [];

const marian = new Agent({
	firstName: 'Marian',
  	lastName: 'Halcombe',
  	role: 'Developer'
});

const walter = new Agent({
    firstName: 'Walter ',
    lastName: 'Hartright',
    role: 'Designer'
});

const laura = new Agent({
    firstName: 'Laura',
    lastName: 'Fairlie',
    role: 'Developer'
});

const percival = new Agent({
    firstName: 'Percival',
    lastName: 'Glyde',
    role: 'Scrum Master'
});
  
const fosco = new Agent({
    firstName: 'Isidor',
    lastName: 'Fosco',
    role: 'Designer'
});
  
const anne = new Agent({
    firstName: 'Anne',
    lastName: 'Catherick',
    role: 'Developer'
});
  
agents.push(marian, walter, laura, percival, fosco, anne);

module.exports = agents;