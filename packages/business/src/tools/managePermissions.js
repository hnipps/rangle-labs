const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User')

let uri
if (process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD) {
  uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${
    process.env.MONGODB_URL
  }`
} else {
  uri = `mongodb://${process.env.MONGODB_URL}`
}

mongoose.connect(
  uri,
  { useNewUrlParser: true },
).then(
    () => { 
        User.findOneAndUpdate(
            {
               emails: [{type: 'account',value:'nick.yang@rangle.io'}]
            },
            {
                permissions: []
            },
            { upsert: true, new: true },
        )
     },
err => { console.error(err) }
);
)


