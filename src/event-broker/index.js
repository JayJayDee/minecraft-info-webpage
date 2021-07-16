const { getLogger } = require('../logger');
const { DefaultEventBroker } = require('./default-event-broker');

const brokerInstancesStore = {
	Default: null
};

const initEventBroker = (store = brokerInstancesStore) => {
	const logger = getLogger('event-broker-default');

	store.Default = new DefaultEventBroker({
		logger
	});
};

const getEventBroker = (module = 'Default', store = brokerInstancesStore) => {
	const brokerInstance = store[module];
	if (!brokerInstance) {
		throw new Error(`there are no brokerInstance for the name: ${module}`);
	}
	return brokerInstance;
}

module.exports = {
	initEventBroker,
	getEventBroker
};
