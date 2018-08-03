const express = require('express');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/rangle-labs';
const app = express();
const PORT = 8080;

app.use('/users', require('./api/users'));
app.use('/agents', require('./api/agents'));
app.use('/projects', require('./api/projects'));
app.use('/technologies', require('./api/technologies'));

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() })
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    mesage: 'You deserve a pizza',
  })
});

app.listen(PORT, async () => {
  await mongoose.connect(uri)
  console.log(`Listening on ${PORT}`)
});
