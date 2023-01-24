const express = require('express')
const router = express.Router()

const { home } = require('../controllers/mainControllers')

router.get('/', home)

module.exports = router

