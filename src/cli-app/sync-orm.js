require('dotenv/config');

const { initConfigurations } = require('../configurator');
const { getLogger } = require('../logger');
const { initSequelizeModels, getSequelizeModel } = require('../mysql-sequelize');

(async () => {
	const log = getLogger('orm-synchronizer');

	log.info('starting synchronization ...');

	initConfigurations();
	await initSequelizeModels();

	const sequelize = getSequelizeModel('sequelize');
	await sequelize.sync({ force: true });

	log.info('completed');
	process.exit(0);
})();
