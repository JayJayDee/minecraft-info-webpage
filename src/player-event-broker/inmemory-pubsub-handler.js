
class InMemoryPubsubHandler {

	async createTopic({ topicName } = {}) {

	}

	async topicExists({ topicName } = {}) {

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
