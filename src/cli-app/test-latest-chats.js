require('dotenv/config');

const { initConfigurations } = require('../configurator');
const { getLogger } = require('../logger');
const { initMcApiRequester } = require('../mc-api-requester');
const { initSequelizeModels } = require('../mysql-sequelize');
const { initRepositories } = require('../repositories');
const { initServerStatusModules, getServerStatusModule } = require('../server-status');

(async () => {
	const log = getLogger('test-latest-chats');

	log.info('begin');

	initConfigurations();
	await initSequelizeModels();
	initMcApiRequester();
	initRepositories();
	initServerStatusModules();

	const statusFetcher = getServerStatusModule('ServerStatusFetcher');

	const chats = await statusFetcher.latestChats({ take: 20 });
	log.info(chats);

	log.info('ended');
	process.exit(0);
})();
