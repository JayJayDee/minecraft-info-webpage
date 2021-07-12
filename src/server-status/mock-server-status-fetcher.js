
class MockServerStatusFetcher {

	async fetch() {
		return {
			allPlayers: [],
			onlinePlayers: []
		};
	}

	async playtimeRanks({
		take
	} = {}) {
		if (take === undefined) {
			return [];
		}
		return [];
	}
}

module.exports = { 
	MockServerStatusFetcher
};
