'use strict'

require('dotenv').load()
const cluster = require('cluster')
const db = require('../db')

function startWorker() {
	var worker = cluster.fork();
	console.log('APP CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster) {
	require('os').cpus().forEach(function() {
		startWorker();
	})
	cluster.on('disconnect', (worker) => {
		console.log('APP CLUSTER: Worker %d disconnected from the cluster.', worker.id);
	})
	cluster.on('exit', (worker, code, signal) => {
		console.log('APP CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
		startWorker();
	})
} else {
	db.connection
		.sync()
		.then(() => {
			// app.listen(app.get('port'), () => {
			// 	log(chalk.yellow(`==> 🚧 app server listening on ${SERVER_PORT}`))
			// })
			require('../index')();
		}) 
		.catch(err => {
			console.log('db connection error: ', err)
		})
}