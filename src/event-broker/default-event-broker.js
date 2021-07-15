
class DefaultEventBroker {

	constructor({
		logger,
		pubsubHandler
	}) {
		this._logger = logger;
		this._pubsubHandler = pubsubHandler;
	}

	_precheckTopicCondition(topicName) {
		if (this._pubsubHandler.topicExists({ topicName }) === false) {
			this._pubsubHandler.createTopic({ topicName });
		}
	}
	
	_generateSubscriptionId() {
		
	}

	publish(topicName, payload) {
		this._precheckTopicCondition(topicName);
	}

	subscribe(topicName, subscriptionCallback) {
		this._precheckTopicCondition(topicName);
	}

	unsubscribe(topicName, subscriptionId) {
		this._precheckTopicCondition(topicName);
	}
}

module.exports = { 
	DefaultEventBroker
};
