const { ServerPlayerVO } = require('./vo/server-player');

class ServerStatusRepository {

	constructor({
		mcApiRequester
	}) {
		this._mcApiRequester = mcApiRequester;
	}

	async findWorldStatuses() {
		// TODO: to be implemented
	}

	async findAllPlayers() {
		const allPlayersRaw = await this._mcApiRequester.requestAllPlayers();
		if (!allPlayersRaw) {
			return [];
		}
		return allPlayersRaw.map(ServerPlayerVO.fromSeverResponseElement);
	}

	async findOnlinePlayers() {
		const onlinePlayersRaw = await this._mcApiRequester.requestOnlinePlayers();
		if (!onlinePlayersRaw) {
			return [];
		}
		return onlinePlayersRaw.map(ServerPlayerVO.fromSeverResponseElement);
	}
}

module.exports = {
	ServerStatusRepository
};
