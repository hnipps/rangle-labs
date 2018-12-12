const express = require('express')
const Router = express.Router
const router = Router()
const Permission = require('../models/Permission')

router.get('/', async (req, res, next) => {
  try {
    const docs = await Permission.find()
    res.status(200).json({ docs })
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }
})
