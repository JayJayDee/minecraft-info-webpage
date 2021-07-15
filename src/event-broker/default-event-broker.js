
class DefaultEventBroker {

	constructor({
		logger,
		pubsubHandler
	}) {
		this._logger = logger;
		this._pubsubHandler = pubsubHandler;
	}
}

module.exports = { 
	DefaultEventBroker
};
