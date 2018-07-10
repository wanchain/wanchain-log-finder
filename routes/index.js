const router = require('express').Router()
const controllers = require('../controllers')

router.get('/', (req, res) => {
	res.render('index', { title: 'Wanchain Log Finder' })
})

router.post('/search', controllers.loadLogEvents)

module.exports = router