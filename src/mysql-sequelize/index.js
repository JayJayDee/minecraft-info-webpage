const { Sequelize, DataTypes } = require('sequelize');

const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { userPlaytimeModel, userEventModel } = require('./models');

const modelInstancesStore = {
	UserPlaytimeModel: null,
	UserEventModel: null,
	sequelize: null
};

const initSequelizeModels = async (store = modelInstancesStore) => {
	const logger = getLogger('mysql');
	const host = getConfiguration('MYSQL_HOST');

	const sequelize = new Sequelize({
		host,
		port: getConfiguration('MYSQL_PORT'),
		database: getConfiguration('MYSQL_DATABASE'),
		username: getConfiguration('MYSQL_USER'),
		password: getConfiguration('MYSQL_PASSWORD'),
		dialect: 'mysql',
		logging: false
	});
	await sequelize.authenticate();
	logger.info(`connection established, host: ${host}`);

	const commonOpts = {
		underscored: true
	};

	store.sequelize = sequelize;
	store.UserPlaytimeModel = userPlaytimeModel({
		sequelize,
		DataTypes,
		commonOpts
	});
	store.UserEventModel = userEventModel({
		sequelize,
		DataTypes,
		commonOpts
	});
};

const getSequelizeModel = (key, store = modelInstancesStore) => {
	const modelInst = store[key];
	if (!modelInst) {
		throw new Error(`model not exist with key: ${key}`);
	}
	return modelInst;
};

module.exports = {
	initSequelizeModels,
	getSequelizeModel
};
