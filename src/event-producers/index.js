const { getEventBroker } = require('../event-broker');
const { PlayerEventProducer } = require('./player-event-producer');
const { WellKnownTopics } = require('../well-known-topics');
const { getLogger } = require('../logger');

const eventProducerInstancesStore = {
	PlayerEvent: null
};

const initEventProducers = (store = eventProducerInstancesStore) => {
	const eventBroker = getEventBroker();

	store.PlayerEvent = new PlayerEventProducer({
		eventBroker,
		logger: getLogger('playerEventProducer')
	});
};

const getEventProducer = (key, store = eventProducerInstancesStore) => {
	const eventProducerInstance = store[key];
	if (!eventProducerInstance) {
		throw new Error(`there is no eventProducer instance with key: ${key}`)		
	}
	return eventProducerInstance;
};

module.exports = {
	initEventProducers,
	getEventProducer,

	WellKnownTopics
};
