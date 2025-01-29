require('dotenv').config()
const express = require('express')
const { urlPost, urlGet } = require('../controllers/zkController')

const router = express.Router()

router.post('/shorten', urlPost)
router.get('/:shortened_id', urlGet)

module.exports = router