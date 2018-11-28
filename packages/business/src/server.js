require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 8080
const User = require('./models/User')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

let uri
if (process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
  uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${
    process.env.MONGODB_URL
  }`
} else {
  uri = `mongodb://${process.env.MONGODB_URL}`
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

const app = express()
app.use(
  session({
    secret: 'rangle',
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json()) // necessary to parse the body of axios requests

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.REACT_APP_API_SERVER_URL}/users/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const domain = profile._json.domain
      if (domain !== 'rangle.io') {
        return done(`This domain is not authorized: ${domain}`)
      }

      User.findOneAndUpdate(
        {
          googleId: profile.id,
        },
        {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        },
        { upsert: true, new: true },
        (error, user) => {
          return done(error, user)
        },
      )
    },
  ),
)

const authRequired = (req, res, next) => {
  if (!req.user) {
    res.status(401)
    return res.end()
  }
  next()
}

app.use('/users', require('./api/users'))
app.use('/agents', authRequired, require('./api/agents'))
app.use('/mentorships', authRequired, require('./api/mentorships'))
app.use('/technologies', authRequired, require('./api/technologies'))

const statusCodes = {
  internalServer: 500,
  success: 200,
}

app.use((appErr, req, res, next) => {
  res.status(statusCodes.internalServer).json({ appErr: appErr.toString() })
})

app.use('/', express.static(path.join(__dirname, '../../presentation/build')))

app.get('/', (req, res) => {
  res.status(statusCodes.success).json({
    status: 'ok',
    mesage: 'You deserve a pizza',
  })
})

// if the user requests a route that isn't listed here (becuase react-router is taking care of the routing for it),
// direct the user to the index.html page so that react-router can take over the navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../presentation/build/index.html'))
})

app.listen(PORT, async () => {
  await mongoose.connect(
    uri,
    { useNewUrlParser: true },
  )
})
