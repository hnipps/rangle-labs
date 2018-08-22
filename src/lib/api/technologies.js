const express = require('express');
const Router = express.Router;
const router = Router();
const Technology = require('../models/Technology');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Technology.find();
    res.status(200).json({docs});
  } catch (err) {
    console.error("An error occurred:", err);
    next(err);
  }
});

// Add a new project
router.post("/", async (req, res) => {
  const technology = new Technology({
    name: req.body.name
  });

  technology
    .save()
    .then(doc => {
      res.status(200).send({ message: "success", payload: doc });
    })
    .catch(err => {
      console.error("An error occurred while adding a new technology:", err);
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
