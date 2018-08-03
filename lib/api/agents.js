const express = require('express');
const Router = express.Router;
const router = Router();
const Agent = require('../models/Agent');

router.get('/', async (req, res, next) => {
  try {
    console.log("get agents");
    const docs = await Agent.find();
    console.log(docs);
    res.status(200).send(docs);
  } catch (e) {
    next(e);
  }
})

module.exports = router;