require('dotenv/config');

const { initConfigurations, getConfiguration } = require('./configurator');
const { startCronjobTrigger } = require('./cronjob-trigger');
const { initExpressApp } = require('./express-app');
const { getLogger } = require('./logger');
const { initSequelizeModels } = require('./mysql-sequelize');
const { initEventBroker } = require('./event-broker');
const { initRepositories } = require('./repositories');
const { initServerStatusModules } = require('./server-status');
const { initTelegramBot } = require('./tg-app');
const { initEventProducers } = require('./event-producers');
const { initMcApiRequester } = require('./mc-api-requester');
const { initCronjobApp } = require('./cronjob-app');
const { initPlayerEventRecorder } = require('./player-event-recorder');
const { initAccidentFreeNotifier } = require('./accident-free-notifier');
const { initPlayerJoinNotifier } = require('./player-join-notifier');
const { initSnapshotWorker } = require('./snapshot-worker');

(async () => {
	const log = getLogger('bootstrap');

	initConfigurations();

	initMcApiRequester();
	await initSequelizeModels();

	initRepositories();
	initEventBroker();
	initEventProducers();

	initServerStatusModules();

	const port = getConfiguration('HTTP_PORT');
	const webserver = initExpressApp();

	initTelegramBot(
		getConfiguration('TG_TOKEN'),
		getConfiguration('MINECRAFT_REST_HOST')
	);

	initPlayerEventRecorder();
	initPlayerJoinNotifier();

	const { enabled } = startCronjobTrigger();
	if (enabled) {
		initSnapshotWorker();
		initCronjobApp();
		initAccidentFreeNotifier();
	}

	webserver.listen(port, () =>
		log.info(`the webserver has been started, port: ${port}`)
	);
})();
