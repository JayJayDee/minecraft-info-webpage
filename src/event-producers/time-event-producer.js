const { BaseEventProducer } = require('./base-event-producer');
const { HourlyEventVO } = require('./vo/hourly-event-vo');
const { MinutelyEventVO } = require('./vo/minutely-event-vo');

class TimeEventProducer extends BaseEventProducer {

	constructor({
		eventBroker,
		logger
	}) {
		super();
		this._eventBroker = eventBroker;
		this._logger = logger;
	}
	
	handleEvent(payload) {
		const { now, eventType } = payload;

		if (eventType === 'HOURLY') {
			return new HourlyEventVO({
				createdAt: now
			});

		} else if (eventType === 'MINUTELY') {
			return new MinutelyEventVO({
				createdAt: now
			});

		} else {
			this._logger.debug(`unknown eventType: ${eventType}, ignored`);
		}
	}
}

module.exports = {
	TimeEventProducer
};
