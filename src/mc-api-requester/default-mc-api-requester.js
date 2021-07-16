const axios = require('axios');

class DefaultMinecraftAPIRequester {
	constructor({
		minecraftRestHost
	}) {
		this._minecraftRestHost = minecraftRestHost;
	}

	async requestAllPlayers() {
		const url = `${this._minecraftRestHost}/v1/players/all`;
		const body = await axios.get(url);
		if (body.data) {
			return body.data;
		}
		return null;
	}

	async requestOnlinePlayers() {
		const url = `${this._minecraftRestHost}/v1/players`;
		const body = await axios.get(url);
		if (body.data) {
			return body.data;
		}
		return null;
	}

	async requestBroadcast(message) {
		const url = `${this._minecraftRestHost}/v1/chat/broadcast`;
		const params = new URLSearchParams();
		params.append('message', message);
		await axios.post(url, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}
}

module.exports = {
	DefaultMinecraftAPIRequester
};
