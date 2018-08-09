const express = require('express');
const Router = express.Router;
const router = Router();
const Agent = require('../models/Agent');

router.get('/', async (req, res, next) => {
  try {
    console.log("get agents");
    const docs = await Agent.find().populate('currentTechnologies').populate('aspirationalTechnologies');
    console.log(docs);
    res.status(200).send(docs);
    console.log("docs sent!")
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:agent_id', async (req, res, next) => {

  try {
      const { agent_id } = req.params;
      const docs = await Agent.findById(agent_id).populate('currentTechnologies').populate('aspirationalTechnologies');
      res.status(200).send(docs);
  } catch (err) {
      next(err);
  }
});

module.exports = router;