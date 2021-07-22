require('dotenv/config');

const { initConfigurations } = require('../configurator');
const { getLogger } = require('../logger');
const { initSequelizeModels } = require('../mysql-sequelize');
const { initRepositories } = require('../repositories');
const { initServerStatusModules, getServerStatusModule } = require('../server-status');

(async () => {
	const log = getLogger('test-overworld-info');

	log.info('begin');

	initConfigurations();
	await initSequelizeModels();
	initRepositories();
	initServerStatusModules();

	const statusFetcher = getServerStatusModule('ServerStatusFetcher');

	const ranks = await statusFetcher.playtimeRanks();
	log.info(ranks);

	log.info('ended');
	process.exit(0);
})();
