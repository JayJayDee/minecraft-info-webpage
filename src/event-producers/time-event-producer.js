const { WellKnownTopics } = require('../well-known-topics');
const { BaseEventProducer } = require('./base-event-producer');
const { HourlyEventVO, MinutelyEventVO } = require('./vo');

class TimeEventProducer extends BaseEventProducer {

	constructor({
		eventBroker,
		logger
	}) {
		super();
		this._eventBroker = eventBroker;
		this._logger = logger;
	}
	
	produce(payload) {
		const { now, eventType } = payload;

		if (eventType === 'HOURLY') {
			this._eventBroker.publish(
				WellKnownTopics.TIME_HOURLY(),
				new HourlyEventVO({ createdAt: now })
			);

		} else if (eventType === 'HOURLY_AFTER_5MIN') {
			this._eventBroker.publish(
				WellKnownTopics.TIME_HOURLY_AFTER_5MIN(),
				new HourlyEventVO({ createdAt: now })
			);

		} else if (eventType === 'MINUTELY') {
			this._eventBroker.publish(
				WellKnownTopics.TIME_EVERY_MINUTE(),
				new MinutelyEventVO({ createdAt: now })
			);

		} else {
			this._logger.debug(`unknown eventType: ${eventType}, ignored`);
		}
	}
}

module.exports = {
	TimeEventProducer
};
