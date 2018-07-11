'use strict'

require('dotenv').load()
const Sequelize = require('sequelize')
const Event = require('./event')

const connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	dialect: process.env.DATABASE_DIALECT,
	timezone: '+08:00'
})

const db = {}
db.Sequelize = Sequelize
db.connection = connection

db.Event = Event(connection, Sequelize)

module.exports = db