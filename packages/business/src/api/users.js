require('dotenv').config()
const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/User')
const Agent = require('../models/Agent')

const passport = require('passport')

const findOrCreateAgentByUser = (user, res, next) => {
  Agent.findOne({ userId: user._id }, (err, agentByUserId) => {
    if (err) {
      console.error('Error finding agent by ID: ', err)
    }
    if (!agentByUserId) {
      const firstName = user.firstName.trim()
      const lastName = user.lastName.trim()
      Agent.findOneAndUpdate(
        { firstName, lastName },
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        { upsert: true, new: true },
        (err, agentByName) => {
          if (err) {
            console.error("An error occurred when finding an agent with this user's name: ", err)
            next(err)
          }
          if (agentByName) {
            res.redirect(
              `${process.env.CLIENT_URL}/login?loggedIn=true&firstTimeLogin=true&agentId=${
                agentByName._id
              }`,
            )
          }
        },
      )
    }
    if (agentByUserId) {
      res.redirect(`${process.env.CLIENT_URL}/login?loggedIn=true`)
      return
    }
  })
}

router.get('/', async (req, res, next) => {
  try {
    const docs = await User.find()

    res.status(200).send(docs)
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }
})

router.get('/current', async (req, res, next) => {
  try {
    const currentUser = req.user
    res.status(200).send(currentUser)
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }
})

router.post('/permissions/:permission_id/adduser/:emails', async (req, res) => {
  const { permission_id, emails } = req.params

  User.findOneAndUpdate(
    {
      emails: emails,
    },
    { $push: { permissions: permission_id } },
    { upsert: true, new: true },
  )
    .then(doc => {
      res.status(200).send({ message: 'success', payload: doc })
    })
    .catch(err => {
      console.error('An error occurred while adding a permission to a user.', err)
      res.status(500).send({ message: err.message })
    })
})

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google', [
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'email'],
    hostedDomain: 'rangle.io',
  }),
])

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {
    findOrCreateAgentByUser(req.user, res, next)
  },
)

module.exports = router
