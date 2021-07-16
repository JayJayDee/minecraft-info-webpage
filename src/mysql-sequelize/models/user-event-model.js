
const userEventModel = ({ sequelize, DataTypes, commonOpts }) =>
	sequelize.define('UserEvent', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		type: {
			type: DataTypes.ENUM(['PlayerChat', 'PlayerDeath', 'PlayerJoin', 'PlayerQuit']),
			allowNull: false
		},

		uuid: {
			type: DataTypes.STRING(50),
			allowNull: true
		},

		nickname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		
		message: {
			type: DataTypes.STRING(250),
			allowNull: true
		}
	}, {
		...commonOpts,
		indexes: [
			{ fields: [ 'type' ] },
			{ fields: [ 'uuid', 'type' ] }
		]
	});

module.exports = {
	userEventModel
};
