const http = require('http')
const path = require('path')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const chalk  = require('chalk')
const log = console.log
const app = express()
const server = http.createServer(app)
const API_PORT = process.env.API_PORT || 5000
const db = require('./db')

app.set('port', API_PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', require('./routes'))

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

db.connection
	.sync()
	.then(() => {
		server.listen(app.get('port'), () => {
			log(chalk.yellow(`==> 🚧 app server listening on ${API_PORT}`))
		})
	}) 
	.catch(err => {
		console.log('db connection error: ', err)
	})
