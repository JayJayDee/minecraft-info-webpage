const { ServerPlayerVO } = require('./vo/server-player');
const { WorldStatusVO } = require('./vo/world-status-vo');

class ServerStatusRepository {

	constructor({
		mcApiRequester
	}) {
		this._mcApiRequester = mcApiRequester;
	}

	async findWorldStatuses() {
		const allWorldsRaw = await this._mcApiRequester.requestWorlds();
		if (!allWorldsRaw) {
			return [];
		}
		return allWorldsRaw.map(WorldStatusVO.fromSeverResponseElement);
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
