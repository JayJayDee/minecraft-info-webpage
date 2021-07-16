const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { getRepository } = require('../repositories');
const { MockServerStatusFetcher } = require('./mock-server-status-fetcher');
const { ServerStatusFetcher } = require('./server-status-fetcher');

const moduleStore = {
	ServerStatusFetcher: null
};

const initServerStatusModules = (modStore = moduleStore) => {
	const mockStatusFetcher = getConfiguration('ENABLE_MOCK_STATUS_FETCHER');
	const logger = getLogger('servstatus-fetcher');

	// ENABLE_MOCK_STATUS_FETCHER 플래그 set시, mock모듈 로 대체
	if (mockStatusFetcher) {
		modStore.ServerStatusFetcher = new MockServerStatusFetcher();
		logger.info('MOCK serverStatusFetcher is ready (for dev)');
		return;
	}

	const serverStatusRepository = getRepository('ServerStatusRepository');
	const userPlaytimeRepository = getRepository('UserPlaytimeRepository');
	const userEventRepository = getRepository('PlayerEventRepository');

	modStore.ServerStatusFetcher = new ServerStatusFetcher({
		serverStatusRepository,
		userPlaytimeRepository,
		userEventRepository,
		logger
	});
	logger.info('serverStatusFetcher is ready');
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
