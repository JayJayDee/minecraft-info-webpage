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

	initCronjobApp();
	initTelegramBot(
		getConfiguration('TG_TOKEN'),
		getConfiguration('MINECRAFT_REST_HOST')
	);
	startCronjobTrigger();

	webserver.listen(port, () =>
		log.info(`the webserver has been started, port: ${port}`)
	);
})();
