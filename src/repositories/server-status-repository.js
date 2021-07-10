const axios = require('axios');

const { ServerPlayerVO } = require('./vo/server-player');

class ServerStatusRepository {

	constructor({
		minecraftRestHost
	}) {
		this._minecraftRestHost = minecraftRestHost;
	}

	async findAllPlayers() {
		const url = `${this._minecraftRestHost}/v1/players/all`;
		const body = await axios.get(url);
		if (body.data) {
			return body.data.map(ServerPlayerVO.fromSeverResponseElement);
		}
	}

	async findOnlinePlayers() {
		const url = `${this._minecraftRestHost}/v1/players`;
		const body = await axios.get(url);
		if (body.data) {
			return body.data.map(ServerPlayerVO.fromSeverResponseElement);
		}
	}
}

module.exports = {
	ServerStatusRepository
};
