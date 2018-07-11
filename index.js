'use strict'

require('dotenv').load()
const path = require('path')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const chalk  = require('chalk')
const log = console.log
const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 3000
// const db = require('./db')

app.set('port', SERVER_PORT)
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

function startServer() {
	app.listen(app.get('port'), () => {
				log(chalk.yellow(`==> 🚧 app server listening on ${SERVER_PORT}`))
			})
	// db.connection
	// 	.sync()
	// 	.then(() => {
	// 		app.listen(app.get('port'), () => {
	// 			log(chalk.yellow(`==> 🚧 app server listening on ${SERVER_PORT}`))
	// 		})
	// 	}) 
	// 	.catch(err => {
	// 		console.log('db connection error: ', err)
	// 	})
}

if (require.main === module) {
  // application run directly; start app server
  startServer();
} else {
  // application imported as a module via "require": export function to create server
  module.exports = startServer;
}