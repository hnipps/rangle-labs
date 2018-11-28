require('dotenv').config()

const business = require('business')
const models = business.models
const User = models.user
const Agent = models.agent
const Mentorship = models.mentorship
const Technology = models.technology

const users = require('./users')
const agents = require('./agents')
const mentorships = require('./mentorships')
const technologies = require('./technologies')

const mongoose = require('mongoose')
let uri
if (process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
  uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${
    process.env.MONGODB_URL
  }`
} else {
  uri = `mongodb://${process.env.MONGODB_URL}`
}

const truncateDatabase = async () => {
  // here we delete all our data so that we can start afresh
  return Promise.all([
    User.deleteMany(),
    Agent.deleteMany(),
    Mentorship.deleteMany(),
    Technology.deleteMany(),
  ])
}

const makeSeeds = async () => {
  // connect to our mongo database
  await mongoose.connect(uri)
  console.log('NOW CONNECTED')

  // delete all old data in the database
  await truncateDatabase()
  console.log('NOW TRUNCATED - ALL OLD DATA DELETED')

  // save all our users into the database
  await Promise.all(users.map(user => user.save()))
  console.log('USERS SAVED')

  // save our mentorships into the database
  await Promise.all(
    mentorships.map(mentorships => {
      return mentorships.save()
    }),
  )
  console.log('MENTORSHIPS SAVED')

  // save our agents into the database
  await Promise.all(
    agents.map(agent => {
      return agent.save()
    }),
  )
  console.log('AGENTS SAVED')

  await Promise.all(
    technologies.map(technology => {
      return technology.save()
    }),
  )
  console.log('TECHNOLOGIES SAVED')

  // close the connection
  mongoose.connection.close()
}

makeSeeds()
