const express = require('express');
const Router = express.Router;
const router = Router();
const Project = require('../models/Project');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Project.find().populate('agents').populate('technologies');
    console.log("DOICS", docs);
    res.status(200).json({docs});
  } catch (e) {
    next(e);
  }
});
module.exports = router;