const { getEventBroker } = require('../event-broker');
const { getLogger } = require('../logger');
const { getRepository } = require('../repositories');
const { WellKnownTopics } = require('../well-known-topics');

const initPlayerEventRecorder = () => {
	const logger = getLogger('playerEventRecorder');
	const eventBroker = getEventBroker();
	const playerEventRepository = getRepository('PlayerEventRepository');

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

	logger.info('playerEventRecorder is ready');
};

module.exports = {
	initPlayerEventRecorder
};
