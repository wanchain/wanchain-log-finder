'use strict'

const router = require('express').Router()
const controllers = require('../controllers')

router.get('/', (req, res) => {
	// res.render('index', { title: 'Wanchain Log Finder' })
	res.render('index')
})

router.post('/search', controllers.loadLogEvents)

module.exports = router