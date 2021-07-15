const { BaseEventProducer } = require('./base-event-producer');
const { WellKnownTopics } = require('../well-known-topics');
const { ChatEventVO, DeathEventVO } = require('./vo');

class PlayerEventProducer extends BaseEventProducer {

	constructor({
		eventBroker,
		logger
	}) {
		super();
		this._eventBroker = eventBroker;
		this._logger = logger;
	}

	handleEvent(payload) {
		const { eventType } = payload;

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

		} else {
			this._logger.debug(`unknown eventType: ${eventType}, ignored`);
		}
	}
}

module.exports = {
	PlayerEventProducer
};
