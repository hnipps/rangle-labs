const business = require('business')
const User = business.models.user

const users = []

const diana = new User({
  firstName: 'Diana',
  lastName: 'Barry',
  role: 'user',
})

const gilbert = new User({
  firstName: 'Gilbert',
  lastName: 'Blythe',
  role: 'user',
})

const ruby = new User({
  firstName: 'Ruby',
  lastName: 'Gillis',
  role: 'user',
})

users.push(diana, gilbert, ruby)

module.exports = users
