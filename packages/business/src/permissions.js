const User = require('./models/User')

const ADMIN = {
  canAddMentorship: true,
  canRemoveMentorship: true,
  canViewAllMentorships: true,
  canEditMentorships: true,
}

const USER = {
  canAddMentorship: false,
  canRemoveMentorship: true,
  canViewAllMentorships: false,
  canEditMentorships: true,
}

const Roles = { user: USER, admin: ADMIN }

function permissions(...requiredPermissions) {
  const isAllowed = roleToCheck =>
    !requiredPermissions.filter(requiredPermission => {
      return !hasPermission(roleToCheck, requiredPermission)
    }).length

  // returns permission middleware
  return (req, res, next) => {
    User.findOne({ googleId: req.user.googleId }, 'role').then(
      doc => {
        if (isAllowed(doc.role)) next()
        // role is allowed, so continue on the next middleware
        else {
          res.status(403).send({ message: 'Forbidden' })
        }
      },
      err => {
        console.error('An error occurred while finding a user:', err)
        res.status(500).send({ message: err.message })
      },
    )
  }
}

function hasPermission(roleToCheck, requiredPermission) {
  const foundRole = Roles[roleToCheck]
  const foundPermission = foundRole[requiredPermission]
  if (foundPermission) {
    return true
  }
  return false
}

module.exports = { permissions, hasPermission }
