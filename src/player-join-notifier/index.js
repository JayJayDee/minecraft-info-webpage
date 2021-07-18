const { getEventBroker } = require('../event-broker');
const { getLogger } = require('../logger');
const { getMcApiRequester } = require('../mc-api-requester');
const { getRepository } = require('../repositories');
const { WellKnownTopics } = require('../well-known-topics');

const initPlayerJoinNotifier = () => {
	const logger = getLogger('playerJoinNotifier');
	const mcApiRequester = getMcApiRequester();
	const eventBroker = getEventBroker();
	const userPlayTimeRepository = getRepository('UserPlaytimeRepository');

	eventBroker.subscribe(
		WellKnownTopics.JOIN(),
		async (joinEventVO) => {
			// fetch user PlayTime record
			const playTimeRecords =
				await userPlayTimeRepository.findPlaytimes({
					uuid: joinEventVO.uuid
				});
			const playTimeVO =
				playTimeRecords.length > 0 ?
					playTimeRecords[0] : null;

			// build welcome message
			let additionalMessage = '';
			if (playTimeVO) {
				const { hour, minute } = playTimeVO.getHourMin();
				additionalMessage = `현재 플탐 ${hour}시간 ${minute}분 지리고`;
			}
			const message = 
				`${joinEventVO.nickname} 어서오고 ${additionalMessage}`;

			// send welcome mesage to joined player
			mcApiRequester.requestTell(
				joinEventVO.uuid,
				message
			);
		}
	);

	logger.info('playerJoinNotifier is ready');
};

module.exports = {
	initPlayerJoinNotifier
};
