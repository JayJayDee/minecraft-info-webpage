const cron = require('node-cron');

const { getConfiguration } = require('../configurator');
const { getEventProducer } = require('../event-producers');
const { getLogger } = require('../logger');

const startCronjobTrigger = () => {
	const logger = getLogger('cronjob-trigger');
	const timeEventProducer = getEventProducer('TimeEvent');
	const enableCronjob = getConfiguration('ENABLE_CRONTAB_TRIGGER');

	if (enableCronjob) {
		cron.schedule('* * * * *', () =>
			timeEventProducer.produce({
				now: new Date(),
				eventType: 'MINUTELY'
			}));
	
		cron.schedule('0 * * * *', () =>
			timeEventProducer.produce({
				now: new Date(),
				eventType: 'HOURLY'
			}));

		cron.schedule('5 * * * *', () =>
			timeEventProducer.produce({
				now: new Date(),
				eventType: 'HOURLY_AFTER_5MIN'
			}));

		cron.schedule('0 15 * * *', () =>
			timeEventProducer.produce({
				now: new Date(),
				eventType: 'EVERYDAY_MIDNIGHT'
			}));

		logger.info('cronjob-trigger is enabled and ready');
		return { enabled: true };

	} else {
		logger.info('cronjob-trigger is DISABLED  -> ENABLE_CRONTAB_TRIGGER env-variable is not set');
		return { enabled: false };
	}
};

module.exports = {
	startCronjobTrigger
};
