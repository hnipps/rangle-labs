const express = require('express');
const Router = express.Router;
const router = Router();
const Agent = require('../models/Agent');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Agent.find().populate('currentTechnologies').populate('aspirationalTechnologies');
    res.status(200).send(docs);
  } catch (err) {
    console.log("An error occorred:", err);
    next(err);
  }
});

router.get('/:agent_id', async (req, res, next) => {

  try {
      const { agent_id } = req.params;
      const docs = await Agent.findById(agent_id).populate('currentTechnologies').populate('aspirationalTechnologies');
      res.status(200).send(docs);
  } catch (err) {
      console.log("An error occorred:", err);
      next(err);
  }
});

module.exports = router;
