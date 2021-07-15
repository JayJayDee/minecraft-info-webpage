
class InMemoryPubsubHandler {

	async createTopic({ topicName } = {}) {
		// NOT USING IN IN-MEMORY-HANDLER, maybe in another PUB-SUB infra
	}

	async topicExists({ topicName } = {}) {
		// NOT USING IN IN-MEMORY-HANDLER, maybe in another PUB-SUB infra
	}

	async getSubscribersFromTopic({ topicName } = {}) {

	}

	async addSubscribersToTopic({
		topicName,
		subscriptionId,
		subscriptionCallback
	} = {}) {
		
	}

	async removeSubscribersFromTopic({
		topicName,
		subscriptionId
	} = {}) {

	}
}

module.exports = {
	InMemoryPubsubHandler
};
