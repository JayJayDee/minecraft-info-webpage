require('dotenv/config');
const { initConfigurations, getConfiguration } = require('./configurator');
const { initExpressApp } = require('./express-app');
const { getLogger } = require('./logger');
const { initRepositories } = require('./repositories');
const { initServerStatusModules } = require('./server-status');

(async () => {
	const log = getLogger('bootstrap');
	initConfigurations();
	initRepositories();
	initServerStatusModules();

	const port = getConfiguration('HTTP_PORT');
	const webserver = initExpressApp();

	webserver.listen(port, () =>
		log.info(`the webserver has been started, port: ${port}`)
	);
})();
