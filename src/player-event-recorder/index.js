const { getConfiguration } = require('../configurator');
const { getEventBroker } = require('../event-broker');
const { getLogger } = require('../logger');
const { getRepository } = require('../repositories');
const { WellKnownTopics } = require('../well-known-topics');

const initPlayerEventRecorder = () => {
	const logger = getLogger('playerEventRecorder');
	const eventBroker = getEventBroker();
	const playerEventRepository = getRepository('PlayerEventRepository');
	const enableEventRecorder = getConfiguration('ENABLE_EVENT_RECORDER');

	if (enableEventRecorder) {
		// 채팅 이벤트 subscribe
		eventBroker.subscribe(
			WellKnownTopics.CHAT(),
			(chatEventVO) =>
				playerEventRepository.insertPlayerEvent(
					chatEventVO.toPlayerEventVO()
				));

		// 로그인 이벤트 subscribe
		eventBroker.subscribe(
			WellKnownTopics.JOIN(),
			(joinEventVO) =>
				playerEventRepository.insertPlayerEvent(
					joinEventVO.toPlayerEventVO()
				));

		// 사망 이벤트 subscribe
		eventBroker.subscribe(
			WellKnownTopics.DEATH(),
			(deathEventVO) =>
				playerEventRepository.insertPlayerEvent(
					deathEventVO.toPlayerEventVO()
				));

		// 클라이언트 종료 이벤트 subscribe
		eventBroker.subscribe(
			WellKnownTopics.QUIT(),
			(quitEventVO) =>
				playerEventRepository.insertPlayerEvent(
					quitEventVO.toPlayerEventVO()
				));
		logger.info('playerEventRecorder is enabled and ready');

	} else {
		logger.info('playerEventRecorder is DISABLED -> ENABLE_EVENT_RECORDER env-variable is not set');
	}
};

module.exports = {
	initPlayerEventRecorder
};
