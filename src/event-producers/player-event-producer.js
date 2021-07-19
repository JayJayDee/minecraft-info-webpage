const { BaseEventProducer } = require('./base-event-producer');
const { WellKnownTopics } = require('../well-known-topics');
const { ChatEventVO, DeathEventVO, JoinEventVO, QuitEventVO } = require('./vo');

class PlayerEventProducer extends BaseEventProducer {

	constructor({
		eventBroker,
		logger
	}) {
		super();
		this._eventBroker = eventBroker;
		this._logger = logger;
	}

	produce(payload) {
		const { eventType } = payload;

		const nickName =
			payload.playerName ? payload.playerName :
				payload.player.displayName ? payload.player.displayName : null;

		if (nickName && nickName.includes('-bot')) {
			// bot 종류 무시
			return;
		}

		if (eventType === 'PlayerChat') {
			this._eventBroker.publish(
				WellKnownTopics.CHAT(),
				ChatEventVO.fromEventAPIResponse(payload)
			);

		} else if (eventType === 'PlayerDeath') {
			this._eventBroker.publish(
				WellKnownTopics.DEATH(),
				DeathEventVO.fromEventAPIResponse(payload)
			);

		} else if (eventType === 'PlayerJoin') {
			this._eventBroker.publish(
				WellKnownTopics.JOIN(),
				JoinEventVO.fromEventAPIResponse(payload)
			);

		} else if (eventType === 'PlayerQuit') {
			this._eventBroker.publish(
				WellKnownTopics.QUIT(),
				QuitEventVO.fromEventAPIResponse(payload)
			);

		} else {
			this._logger.debug(`unknown eventType: ${eventType}, ignored`);
		}
	}
}

module.exports = {
	PlayerEventProducer
};
