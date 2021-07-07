
class ServerStatusFetcher {

	constructor({
		serverStatusRepository
	}) {
		this._serverStatusRepo = serverStatusRepository
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
