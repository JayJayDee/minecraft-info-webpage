const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { getSequelizeModel } = require('../mysql-sequelize');
const { ServerStatusRepository } = require('./server-status-repository');
const { UserPlaytimeRepository } = require('./user-playtime-repository');

const repositoryStore = {
	ServerStatusRepository: null,
	UserPlaytimeRepository: null
};

const initRepositories = (repoStore = repositoryStore) => {
	const logger = getLogger('repository');

	const minecraftRestHost = getConfiguration('MINECRAFT_REST_HOST');
	repoStore.ServerStatusRepository = new ServerStatusRepository({
		minecraftRestHost
	});

	const userPlaytimeModel = getSequelizeModel('UserPlaytimeModel');
	const sequelizeInstance = getSequelizeModel('sequelize');
	repoStore.UserPlaytimeRepository = new UserPlaytimeRepository({
		userPlaytimeModel,
		sequelizeInstance,
		logger: getLogger('userPlaytimeRepository')
	});

	logger.info('repositories are ready');
};

const getRepository = (key, repoStore = repositoryStore) => {
	const repo = repoStore[key];
	if (!repo) {
		throw new Error(`there are no repository named: ${key}`);
	}
	return repo;
};

module.exports = {
	initRepositories,
	getRepository
};
