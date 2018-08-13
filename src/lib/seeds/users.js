const User = require('../models/User')

const users = [];

const diana = new User({
	firstName: 'Diana',
  	lastName: 'Barry',
  	admin: true
});

const gilbert = new User({
    firstName: 'Gilbert',
    lastName: 'Blythe',
    admin: false
});

const ruby = new User({
    firstName: 'Ruby',
    lastName: 'Gillis',
    admin: false
});
  
users.push(diana, gilbert, ruby);

module.exports = users;
