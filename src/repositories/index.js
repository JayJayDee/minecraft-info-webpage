const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { getMcApiRequester } = require('../mc-api-requester');
const { getSequelizeModel } = require('../mysql-sequelize');
const { PlayerEventRepository } = require('./player-event-repository');
const { ServerStatusRepository } = require('./server-status-repository');
const { UserPlaytimeRepository } = require('./user-playtime-repository');

const repositoryStore = {
	ServerStatusRepository: null,
	UserPlaytimeRepository: null,
	PlayerEventRepository: null
};

const initRepositories = (repoStore = repositoryStore) => {
	const logger = getLogger('repository');

	const mcApiRequester = getMcApiRequester();
	repoStore.ServerStatusRepository = new ServerStatusRepository({
		mcApiRequester
	});

	const userPlaytimeModel = getSequelizeModel('UserPlaytimeModel');
	const sequelizeInstance = getSequelizeModel('sequelize');
	repoStore.UserPlaytimeRepository = new UserPlaytimeRepository({
		userPlaytimeModel,
		sequelizeInstance,
		logger: getLogger('userPlaytimeRepository')
	});

	repoStore.PlayerEventRepository = new PlayerEventRepository({
		logger: getLogger('playerEventRepository')
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
