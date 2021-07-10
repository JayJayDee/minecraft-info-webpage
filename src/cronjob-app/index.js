const cron = require('node-cron');
const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { getRepository } = require('../repositories');
const { NotifyEveryHourJob } = require('./notify-every-time-job');
const { WritePlaytimeJob } = require('./write-playtime-job');

const initCronjobApp = () => {
	const logger = getLogger('cronjob');

	// Per-min jobs
	const userPlaytimeRepository = getRepository('UserPlaytimeRepository');
	const serverStatusRepository = getRepository('ServerStatusRepository');

	const disableCronjob = getConfiguration('DISABLE_CRONJOB');

	if (!disableCronjob) {
		const perMinJobs = [
			new WritePlaytimeJob({
				userPlaytimeRepository,
				serverStatusRepository,
				logger: getLogger('writePlaytimeJob')
			})
		];
		cron.schedule('* * * * *', async () => {
			for (job of perMinJobs) {
				await job.execute();
			}
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

		logger.info('all cronjobs are ready and registered');

	} else {
		logger.info('cronjobs ignored, cause -> DISABLE_CRONJOB=true');
	}
};

module.exports = {
	initCronjobApp
};
