require('dotenv/config');

const { initConfigurations, getConfiguration } = require('../configurator');
const { NotifyEveryHourJob } = require('../cronjob-app/notify-every-time-job');
const { getLogger } = require('../logger');

(async () => {
	const log = getLogger('notify-hourly-job-test');

	log.info('begin');

	initConfigurations();
	const minecraftRestHost = getConfiguration('MINECRAFT_REST_HOST');
	const job = new NotifyEveryHourJob({ minecraftRestHost });

	await job.execute();

	log.info('ended');
	process.exit(0);
})();
