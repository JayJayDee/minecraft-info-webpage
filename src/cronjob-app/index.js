const cron = require('node-cron');
const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { NotifyEveryHourJob } = require('./notify-every-time-job');

const initCronjobApp = () => {
	const logger = getLogger('cronjob');

	// Per-min jobs
	cron.schedule('* * * * *', async () => {
		
	});

	// Hourly jobs
	const minecraftRestHost = getConfiguration('MINECRAFT_REST_HOST');
	const hourlyJobs = [
		new NotifyEveryHourJob({ minecraftRestHost })
	];
	cron.schedule('0 * * * *', async () => {
		logger.debug('staring per-hour job');
		for (job of hourlyJobs) {
			await job.execute();
		}
		logger.debug('completed');
	});

	logger.info('all cronjobs ready');
};

module.exports = {
	initCronjobApp
};
