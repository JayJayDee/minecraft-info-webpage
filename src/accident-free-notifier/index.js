const { getEventBroker } = require('../event-broker');
const { getLogger } = require('../logger');
const { getMcApiRequester } = require('../mc-api-requester');
const { getRepository } = require('../repositories');
const { WellKnownTopics } = require('../well-known-topics');
const { DefaultAccidentFreeNotifier } = require('./default-accident-free-notifier');

/**
 * 무사고 N분/N시간 알리미 init/Dependency injection
 */
const initAccidentFreeNotifier = () => {
	const logger = getLogger('accidentFreeNotifier');
	const eventBroker = getEventBroker();
	const mcApiRequester = getMcApiRequester();
	const userEventRepository = getRepository('PlayerEventRepository');

	const notifier = new DefaultAccidentFreeNotifier({
		mcApiRequester,
		userEventRepository,
		logger
	});

	eventBroker.subscribe(
		WellKnownTopics.DEATH(),
		(playerDeathVO) => notifier.triggerPlayerDeath(playerDeathVO)
	);

	eventBroker.subscribe(
		WellKnownTopics.TIME_HOURLY_AFTER_5MIN(),
		() => notifier.notifyAccidentFreeRecord()
	);

	logger.info('accidentFreeNotifier is ready');
};

module.exports = {
	initAccidentFreeNotifier
};
