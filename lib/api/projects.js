const express = require('express');
const Router = express.Router;
const router = Router();
const Project = require('../models/Project');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Project.find().populate('agents').populate('technologies');
    console.log("DOICS", docs);
    res.status(200).json({docs});
  } catch (err) {
    next(err);
  }
});

router.get('/:project_id', async (req, res, next) => {

  try {
      const { project_id } = req.params;
      const docs = await Project.findById(project_id).populate('agents').populate('technologies');
      res.status(200).send(docs);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
