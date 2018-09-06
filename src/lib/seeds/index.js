require("dotenv").config();
const User = require('../models/User');
const Agent = require('../models/Agent');
const Project = require('../models/Project');
const Technology = require('../models/Technology');

const users = require('./users');
const agents = require('./agents');
const projects = require('./projects');
const technologies = require('./technologies');

const mongoose = require('mongoose');
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`;

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
    console.log("NOW TRUNCATED - ALL OLD DATA DELETED");

    // save all our users into the database
    await Promise.all(users.map(user => user.save()));
    console.log("USERS SAVED");

    // save our projects into the database
    await Promise.all(projects.map(project => {       
            return project.save();
        }
    ));
    console.log("PROJECTS SAVED");

    // save our agents into the database
    await Promise.all(agents.map(agent => {        
            return agent.save();
        }
    ));
    console.log("AGENTS SAVED");

    await Promise.all(technologies.map(technology => {     
        return technology.save();
        }
    ));
    console.log("TECHNOLOGIES SAVED");

    // close the connection
    mongoose.connection.close()
}

makeSeeds();
