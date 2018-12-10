const business = require('business')
const Permission = business.models.permission

const permissions = []

// PERMISSION
const permission1 = new Permission({
  name: 'canManageMentorships',
})

permissions.push(permission1)

module.exports = permissions
