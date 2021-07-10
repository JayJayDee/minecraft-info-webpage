const cron = require('node-cron');
const { getLogger } = require('../logger');

const initCronjobApp = () => {
	const logger = getLogger('cronjob');

	cron.schedule('* * * * *', async () => {
		logger.info('starting per-min job');
		logger.info('completed');
	});

	logger.info('all cronjobs ready');
};

module.exports = {
	initCronjobApp
};
