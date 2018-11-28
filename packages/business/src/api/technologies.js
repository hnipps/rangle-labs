const express = require('express')
const Router = express.Router
const router = Router()
const Technology = require('../models/Technology')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Technology.find()
    res.status(200).json({ docs })
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }
})

// Add a new technology
router.post('/', async (req, res) => {
  const technology = new Technology({
    name: req.body.name,
  })

  technology
    .save()
    .then(doc => {
      res.status(200).send({ message: 'success', payload: doc })
    })
    .catch(err => {
      console.error('An error occurred while adding a new technology:', err)
      res.status(500).send({ message: err.message })
    })
})

// Delete a technology
router.delete('/:technology_id', async (req, res, next) => {
  console.log('DELETING A TECHNOLOGY')
  try {
    const { technology_id } = req.params
    const doc = await Technology.findByIdAndRemove(technology_id)
    res.status(204).send(doc)
  } catch (err) {
    console.log('An error occurred while deleting a technology:', err)
    next(err)
  }
})

module.exports = router
