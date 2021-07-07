const { getRepository } = require('../repositories');
const { ServerStatusFetcher } = require('./server-status-fetcher');

const moduleStore = {
	ServerStatusFetcher: null
};

const initServerStatusModules = (modStore = moduleStore) => {
	const serverStatusRepository = getRepository('ServerStatusRepository');
	moduleStore.ServerStatusFetcher = new ServerStatusFetcher({
		serverStatusRepository
	});
};

const getServerStatusModule = (key, modStore = moduleStore) => {
	const mod = modStore[key];
	if (!mod) {
		throw new Error(`there are no server-status moudle named: ${key}`);
	}
	return mod;
};

module.exports = {
	initServerStatusModules,
	getServerStatusModule
};
