const { BaseEventProducer } = require('./base-event-producer');

class PlayerEventProducer extends BaseEventProducer {

	constructor({
		eventBroker
	}) {
		super();
		this._eventBroker = eventBroker;
	}

	publish(fromPayload) {
		
	}
}

module.exports = {
	PlayerEventProducer
};
