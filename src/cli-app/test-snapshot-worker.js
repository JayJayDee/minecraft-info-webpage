require('dotenv/config');

const { initConfigurations } = require('../configurator');
const { getLogger } = require('../logger');
const { initMcApiRequester } = require('../mc-api-requester');
const { initSequelizeModels } = require('../mysql-sequelize');
const { initRepositories } = require('../repositories');
const { initSnapshotWorker, getSnapshotWorker } = require('../snapshot-worker');

(async () => {
	const log = getLogger('test-snapshot-worker');

	log.info('begin');

	initMcApiRequester();
	initConfigurations();
	await initSequelizeModels();
	initRepositories();
	initSnapshotWorker();

	const worker = getSnapshotWorker();
	await worker.start();

	log.info('ended');
	process.exit(0);
})();
