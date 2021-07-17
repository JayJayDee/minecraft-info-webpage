
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

	async latestChats({
		take
	} = {}) {
		if (take === undefined) {
			return [];
		}
		return [];
	}

	async latestDeathForMainScene() {
		return null;
	}
}

module.exports = { 
	MockServerStatusFetcher
};
