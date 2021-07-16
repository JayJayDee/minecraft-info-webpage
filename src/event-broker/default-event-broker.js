const { nanoid } = require('nanoid');

class DefaultEventBroker {

	constructor({
		logger
	}) {
		this._logger = logger;
		this._topicMap = new Map();
	}

	_getTopicOrCreate(topicName) {
		const topicInstance = this._topicMap.get(topicName);
		if (!topicInstance) {
			this._topicMap.set(topicName, new Map());
			return this._topicMap.get(topicName);
		}
		return topicInstance;
	}

	publish(topicName, payload) {
		const topic = this._getTopicOrCreate(topicName);
		const keys = Array.from(topic.keys());
		for (const key of keys) {
			topic.get(key)(payload);
		}
	}

	subscribe(topicName, subscriptionCallback) {
		const subscriptionId = nanoid(10);
		const topic = this._getTopicOrCreate(topicName);

		topic.set(subscriptionId, subscriptionCallback);
		return subscriptionId;
	}

	unsubscribe(topicName, subscriptionId) {
		const topic = this._getTopicOrCreate(topicName);
		topic.delete(subscriptionId);
	}
}

module.exports = { 
	DefaultEventBroker
};
