const express = require('express');
const Router = express.Router;
const router = Router();
const Technology = require('../models/Technology');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Technology.find();
    // console.log("DOICS", docs);
    res.status(200).json({docs});
  } catch (e) {
    next(e);
  }
})

module.exports = router;