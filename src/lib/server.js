const express = require('express');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/rangle-labs';
const app = express();
const PORT = 8080;

app.use('/users', require('./api/users'));
app.use('/agents', require('./api/agents'));
app.use('/projects', require('./api/projects'));
app.use('/technologies', require('./api/technologies'));

const statusCodes = {
  internalServer: 500,
  success: 200,
};

app.use((appErr, req, res, next) => {
  res.status(statusCodes.internalServer).json({ appErr: appErr.toString() });
});

app.get('/', (req, res) => {
  res.status(statusCodes.success).json({
    status: 'ok',
    mesage: 'You deserve a pizza',
  });
});

app.listen(PORT, async () => {
  await mongoose.connect(uri);
});
