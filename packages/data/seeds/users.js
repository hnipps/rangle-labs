const business = require('business')
const User = business.models.user

const users = []

const diana = new User({
  firstName: 'Diana',
  lastName: 'Barry',
})

const gilbert = new User({
  firstName: 'Gilbert',
  lastName: 'Blythe',
})

const ruby = new User({
  firstName: 'Ruby',
  lastName: 'Gillis',
})

users.push(diana, gilbert, ruby)

module.exports = users
