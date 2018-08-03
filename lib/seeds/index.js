
const User = require('../models/User');
const Agent = require('../models/Agent');
const Project = require('../models/Project');
const Technology = require('../models/Technology');

const users = require('./users');
const agents = require('./agents');
const projects = require('./projects');
const tecnologies = require('./technologies');

const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/rangle-labs';


const truncateDatabase = async () => {
  // here we delete all our data so that we can start afresh
  return Promise.all([User.deleteMany(), Agent.deleteMany(), Project.deleteMany(), Technology.deleteMany()]);
}

const makeSeeds = async () => {
    // connect to our mongo database
    await mongoose.connect(uri)
    console.log("NOW CONNECTED");
    // delete all old data in the database
    await truncateDatabase()
    console.log("NOW TRUNCATED");
    // save all our data into the database
    await Promise.all(users.map(user => user.save()));

    console.log("USERS SAVED");

    // save our artists into the database
    // and all the artworks for each artist
    await Promise.all(projects.map(project => {
            project.agents.map(agent => {
                return agent.save()
            });
            project.technologies.map(technology => {
                return technology.save()
            });         
            return project.save();
        }
    ));

    console.log("PROEJCETS SAVED");

    // close the connection
    mongoose.connection.close()
}

makeSeeds();
