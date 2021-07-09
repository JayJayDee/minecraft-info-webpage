
const userPlaytimeModel = ({ sequelize, DataTypes, commonOpts }) =>
	sequelize.define('UserPlaytime', {
		uuid: {
			type: DataTypes.STRING(30),
			allowNull: false,
			primaryKey: true
		},

		minPlayed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			default: 1
		}
	}, {
		...commonOpts
	});

module.exports = {
	userPlaytimeModel
};
