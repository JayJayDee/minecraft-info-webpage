const { WellKnownTopics } = require('../well-known-topics');
const { BaseJob } = require('./base-job');

class WritePlaytimeJob extends BaseJob {

	constructor({
		userPlaytimeRepository,
		serverStatusRepository,
		logger
	}) {
		super();
		this._userPlaytimeRepository = userPlaytimeRepository;
		this._serverStatusRepository = serverStatusRepository;
		this._logger = logger;
	}

	topicName() {
		return WellKnownTopics.TIME_EVERY_MINUTE();
	}

	async execute() {
		const onlinePlayers = await this._serverStatusRepository.findOnlinePlayers();
		const updatedPlayers = await this._userPlaytimeRepository.recordPlaytime(onlinePlayers);
		this._logger.debug(`playtime updated, numPlayers: ${updatedPlayers.length}`);
	}
}

module.exports = {
	WritePlaytimeJob
};
