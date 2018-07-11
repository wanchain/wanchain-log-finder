'use strict'

module.exports = (connection, DataTypes) => {
	const Event = connection.define('LogEvents', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		RemoteAddr: {
			type: DataTypes.STRING(60) 
		},
		TAG: {
			type: DataTypes.STRING(60)
		},
		PID: {
			type: DataTypes.INTEGER
		},
		Level: {
			type: DataTypes.STRING(60)
		},
		TimeReported: {
			type: DataTypes.DATE
		},
		ReceivedAt: {
			type: DataTypes.DATE
		},
		Message: {
			type: DataTypes.TEXT
		}
	}, { timestamps: false })

	return Event
}