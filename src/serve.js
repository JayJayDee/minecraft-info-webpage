require('dotenv/config');
const { initConfigurations, getConfiguration } = require('./configurator');
const { initExpressApp } = require('./express-app');
const { initRepositories } = require('./repositories');
const { initServerStatusModules } = require('./server-status');

(async () => {
	initConfigurations();
	initRepositories();
	initServerStatusModules();

	const port = getConfiguration('HTTP_PORT');
	const webserver = initExpressApp();

	webserver.listen(port, () =>
		console.log(`the webserver has been started, port: ${port}`)
	);
})();
