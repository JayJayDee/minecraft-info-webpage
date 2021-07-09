
class ServerStatusFetcher {

	constructor({
		serverStatusRepository,
		logger
	}) {
		this._serverStatusRepo = serverStatusRepository,
		this._logger = logger;
	}

	async fetch() {
		const allPlayers = await this._serverStatusRepo.findAllPlayers();
		const onlinePlayers = await this._serverStatusRepo.findOnlinePlayers();

		return {
			allPlayers,
			onlinePlayers
		};
	}
}

module.exports = { 
	ServerStatusFetcher
};
