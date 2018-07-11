'use strict'

const moment = require('moment')
const { Op } = require('Sequelize')
const db = require('../db')
const {
	Event
} = db

const defaultStartDate = '2018-01-01 00:00:00'
const defaultEndDate = '2030-12-31 12:59:59'

module.exports.loadLogEvents = (req, res) => {
	const { body } = req
	const { 
		ip, 
		tag, 
		pid, 
		level, 
		timeReported, 
		receivedAt, 
		msg 
	} = body
	
	let timeReportedArgs,
		timeReportedPoint,
		timeReportedOffset,
		timeReportedFrom,
		timeReportedTo,

		timeReceivedArgs,
		timeReceivedPoint,
		timeReceivedOffset,
		timeReceivedFrom,
		timeReceivedTo

	timeReportedArgs = timeReported.trim().split(';')
	timeReceivedArgs = receivedAt.trim().split(';')

	timeReportedPoint = timeReportedArgs[0]
	timeReportedOffset = timeReportedArgs[1]

	timeReceivedPoint = timeReceivedArgs[0]
	timeReceivedOffset = timeReceivedArgs[1]

	isValidReportedTime = moment(timeReportedPoint).isValid()
	isValidReceivedTime = moment(timeReceivedPoint).isValid()

	timeReportedFrom = isValidReportedTime ? moment(timeReportedPoint).subtract(timeReportedOffset, 'minutes') : moment(defaultStartDate)
	timeReportedTo = isValidReportedTime ? moment(timeReportedPoint).add(timeReportedOffset, 'minutes') : moment(defaultEndDate)
	// console.log(timeReportedFrom)
	// console.log(timeReportedTo)

	timeReceivedFrom = isValidReceivedTime ? moment(timeReceivedPoint).subtract(timeReceivedOffset, 'minutes') : moment(defaultStartDate)
	timeReceivedTo = isValidReceivedTime ? moment(timeReceivedPoint).add(timeReceivedOffset, 'minutes') : moment(defaultEndDate)
	// console.log(timeReceivedFrom)
	// console.log(timeReceivedTo)

	Event
		.findAll({
			where: {
				RemoteAddr: {
					[Op.like]: `%${ip}%`
				},
				TAG: {
					[Op.like]: `%${tag}%`
				},
				PID: {
					[Op.like]: `%${pid}%`
				},
				Level: {
					[Op.like]: `%${level}%`
				},
				TimeReported: { 
					[Op.gt]: timeReportedFrom,
					[Op.lt]: timeReportedTo
				},
				ReceivedAt: {
					[Op.gt]: timeReceivedFrom,
					[Op.lt]: timeReceivedTo
				},
				Message: {
					[Op.like]: `%${msg}%`
				}
			},
			limit: 500,
			order: [['ReceivedAt', 'DESC']]
		})
		.then(result => {
			res.render('search-result', {
        		// title: 'Search Result',
        		logs: result
    		});
		})
		.catch(err => {
			console.log(err)
		})
}