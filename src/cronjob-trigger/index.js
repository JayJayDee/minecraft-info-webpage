const cron = require('node-cron');

const { getConfiguration } = require('../configurator');
const { getEventProducer } = require('../event-producers');
const { getLogger } = require('../logger');

const startCronjobTrigger = () => {
	const logger = getLogger('cronjob-trigger');
	const timeEventProducer = getEventProducer('TimeEvent');
	const disableCronjob = getConfiguration('DISABLE_CRONJOB');

	if (!disableCronjob) {
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

		logger.info('cronjob trigger started');

	} else {
		logger.info('cronjob trigger disabled, cause -> DISABLE_CRONJOB=true');
	}
};

module.exports = {
	startCronjobTrigger
};
