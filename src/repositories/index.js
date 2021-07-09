const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { ServerStatusRepository } = require('./server-status-repository');

const repositoryStore = {
	ServerStatusRepository: null
};

const initRepositories = (repoStore = repositoryStore) => {
	const logger = getLogger('repository');

	const minecraftRestHost = getConfiguration('MINECRAFT_REST_HOST');
	repoStore.ServerStatusRepository = new ServerStatusRepository({
		minecraftRestHost
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
